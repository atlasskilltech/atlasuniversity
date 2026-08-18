import 'server-only';

/**
 * Intrinsic pixel size of a JPEG / PNG / WebP buffer, or `null`.
 *
 * The Graph API does not return media dimensions, and the viewer needs the real
 * aspect ratio: Instagram's desktop viewer sizes its media pane to the post
 * (portrait 4:5, square, landscape 1.91:1, reels 9:16) instead of forcing a box
 * and distorting the image. Since the media is downloaded to disk anyway, the
 * dimensions are read straight out of the file header — no dependency needed.
 */
export function imageSize(buffer) {
  if (!buffer || buffer.length < 24) return null;

  /* PNG: 8-byte signature, then IHDR length+type, then width/height as BE u32. */
  if (buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  /* WebP: 'RIFF' .... 'WEBP' — VP8 / VP8L / VP8X carry the size differently. */
  if (buffer.toString('latin1', 0, 4) === 'RIFF' && buffer.toString('latin1', 8, 12) === 'WEBP') {
    const kind = buffer.toString('latin1', 12, 16);
    if (kind === 'VP8X') {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (kind === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    return null;
  }

  /* JPEG: walk the marker chain to the start-of-frame, which carries the size. */
  if (buffer.readUInt16BE(0) !== 0xffd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];

    /* padding / standalone markers carry no length field */
    if (marker === 0xff || (marker >= 0xd0 && marker <= 0xd9) || marker === 0x01) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    /* SOF0..SOF15, minus the non-frame DHT/JPG/DAC markers */
    const isFrame =
      marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;

    if (isFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }
    if (length < 2) return null;
    offset += 2 + length;
  }

  return null;
}
