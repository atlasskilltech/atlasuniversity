/**
 * ATLAS News — image validation and optimisation (sharp).
 *
 * Accepted: JPEG, PNG, WebP, AVIF — identified by their magic bytes AND by sharp's own decoder, and the
 * two must agree. Everything else is refused, notably:
 *   - SVG (it is a script-capable document, not an image — a stored-XSS vector);
 *   - HEIC/HEIF (the prebuilt sharp binaries cannot decode HEVC; phones can share as JPEG);
 *   - GIF (animation would be silently lost — not worth it for news photography);
 *   - anything whose extension or declared type disagrees with its bytes.
 * Limits: MAX_UPLOAD_BYTES on the file, MAX_INPUT_PIXELS on the decoded image (decompression bombs).
 *
 * Output — every rendition is WebP, re-encoded from decoded pixels, which means:
 *   - EXIF, GPS, XMP, IPTC and camera data are gone (sharp writes no metadata unless asked to);
 *   - the stored orientation is applied first (`rotate()`), so nothing depends on an EXIF flag;
 *   - colour is converted to sRGB.
 * Renditions (never upscaled; a smaller source simply yields fewer):
 *   thumb 480 · card 960 · article 1600 · full ≤ 2400 on the long edge.
 */
import { createHash } from 'node:crypto';
import sharp from 'sharp';

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
export const MAX_INPUT_PIXELS = 50_000_000;
export const ACCEPTED_MIME = Object.freeze(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
export const RENDITIONS = Object.freeze([
  { name: 'thumb', width: 480 },
  { name: 'card', width: 960 },
  { name: 'article', width: 1600 },
]);
const FULL_MAX = 2400;
const WEBP = { quality: 82, effort: 4, smartSubsample: true };

export class ImageRejected extends Error {
  constructor(message, code = 'image_rejected') {
    super(message);
    this.name = 'ImageRejected';
    this.code = code;
  }
}

/** Identify the container from its leading bytes. Returns a MIME type or null. */
export function sniffMime(buf) {
  if (!buf || buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') return 'image/webp';
  if (buf.toString('latin1', 4, 8) === 'ftyp') {
    const brand = buf.toString('latin1', 8, 12);
    if (brand === 'avif' || brand === 'avis') return 'image/avif';
    if (/^(heic|heix|hevc|hevx|mif1|msf1)$/.test(brand)) return 'image/heic';
  }
  if (buf.toString('latin1', 0, 4) === 'GIF8') return 'image/gif';
  const head = buf.toString('utf8', 0, Math.min(buf.length, 512)).trimStart().toLowerCase();
  if (head.startsWith('<?xml') || head.startsWith('<svg') || head.includes('<svg')) return 'image/svg+xml';
  if (head.startsWith('<!doctype') || head.startsWith('<html')) return 'text/html';
  return null;
}

const SHARP_FORMAT = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', heif: 'image/avif' };

/**
 * Validate an upload and produce its renditions.
 * @returns {{ sha256, sourceMime, width, height, renditions: [{name,width,height,bytes,buffer}] }}
 */
export async function processImage(input, { declaredMime } = {}) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  if (!buf.length) throw new ImageRejected('The file is empty.', 'empty');
  if (buf.length > MAX_UPLOAD_BYTES) throw new ImageRejected(`Images must be ${MAX_UPLOAD_BYTES / 1024 / 1024} MB or smaller.`, 'too_large');

  const sniffed = sniffMime(buf);
  if (sniffed === 'image/svg+xml') throw new ImageRejected('SVG files are not accepted.', 'svg');
  if (sniffed === 'image/heic') throw new ImageRejected('HEIC photos are not supported — share or export as JPEG.', 'heic');
  if (sniffed === 'image/gif') throw new ImageRejected('GIF files are not accepted — use JPEG, PNG or WebP.', 'gif');
  if (!sniffed || !ACCEPTED_MIME.includes(sniffed)) throw new ImageRejected('Only JPEG, PNG, WebP and AVIF images are accepted.', 'unsupported');
  if (declaredMime && declaredMime !== 'application/octet-stream' && declaredMime !== sniffed) {
    throw new ImageRejected('The file type does not match its contents.', 'type_mismatch');
  }

  let meta;
  try {
    meta = await sharp(buf, { limitInputPixels: MAX_INPUT_PIXELS, failOn: 'error' }).metadata();
  } catch (e) {
    const big = /pixel limit/i.test(String(e?.message));
    throw new ImageRejected(big ? 'The image has too many pixels.' : 'The image could not be read — it may be corrupt.', big ? 'too_many_pixels' : 'corrupt');
  }
  const decoded = SHARP_FORMAT[meta.format];
  if (!decoded || decoded !== sniffed) throw new ImageRejected('The file type does not match its contents.', 'type_mismatch');
  if ((meta.pages || 1) > 1) throw new ImageRejected('Animated or multi-page images are not accepted.', 'animated');
  if (!meta.width || !meta.height) throw new ImageRejected('The image has no dimensions.', 'corrupt');

  /* dimensions after applying EXIF orientation */
  const swap = meta.orientation >= 5 && meta.orientation <= 8;
  const srcW = swap ? meta.height : meta.width;
  const srcH = swap ? meta.width : meta.height;

  const base = () => sharp(buf, { limitInputPixels: MAX_INPUT_PIXELS, failOn: 'error' }).rotate().toColorspace('srgb');
  const encode = async (pipeline, name) => {
    const { data, info } = await pipeline.webp(WEBP).toBuffer({ resolveWithObject: true });
    return { name, width: info.width, height: info.height, bytes: data.length, buffer: data };
  };

  const renditions = [];
  for (const r of RENDITIONS) {
    if (srcW > r.width) renditions.push(await encode(base().resize({ width: r.width, withoutEnlargement: true }), r.name));
  }
  const longest = Math.max(srcW, srcH);
  renditions.push(await encode(
    longest > FULL_MAX ? base().resize({ width: FULL_MAX, height: FULL_MAX, fit: 'inside', withoutEnlargement: true }) : base(),
    'full',
  ));

  const full = renditions.at(-1);
  return {
    sha256: createHash('sha256').update(buf).digest('hex'),
    sourceMime: sniffed,
    width: full.width,
    height: full.height,
    renditions,
  };
}
