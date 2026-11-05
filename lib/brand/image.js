/*
 * Image processing for the /brand Image Tools — a 1:1 port of reference/brand/image-tools.html.
 * Everything runs in the browser through the Canvas API; nothing is uploaded.
 */
import { fmtBytes } from './utils';

export const MAX_FILE_BYTES = 30 * 1024 * 1024; // 30 MB per file
export const MAX_DIM = 10000; // guard against absurd canvas sizes
export const MAX_FILES = 40;
export const ACCEPT = '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp';
export const TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve) => {
    if (canvas.toBlob) return canvas.toBlob(resolve, type, quality);
    try {
      const bin = atob(canvas.toDataURL(type, quality).split(',')[1]);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
      resolve(new Blob([arr], { type }));
    } catch {
      resolve(null);
    }
  });
}

export function detectSupport() {
  let canvas = false;
  let webp = false;
  try {
    const c = document.createElement('canvas');
    canvas = !!(c.getContext && c.getContext('2d') && (c.toBlob || c.toDataURL));
    c.width = c.height = 1;
    webp = c.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  } catch {
    /* unsupported */
  }
  return { canvas, webp };
}

export const normalizeType = (t) => (t === 'image/jpg' ? 'image/jpeg' : t);
export const extFor = (mime) => ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' })[mime] || 'img';
export function typeFromExt(name) {
  const m = /\.([a-z0-9]+)$/i.exec(name || '');
  const e = m ? m[1].toLowerCase() : '';
  return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[e] || '';
}

export function validateFile(file) {
  const declared = normalizeType(file.type || '') || typeFromExt(file.name);
  if ((file.type || '').includes('gif') || /\.gif$/i.test(file.name)) {
    return "Animated GIFs aren't supported — the animation can't be preserved. Convert to JPG, PNG or WebP first.";
  }
  if ((file.type || '').includes('svg') || /\.svg$/i.test(file.name)) {
    return "SVG is a vector format and isn't supported. Export it to PNG, then use it here.";
  }
  if (!TYPES.includes(declared)) return 'Unsupported file type. Please use JPG/JPEG, PNG or WebP.';
  if (file.size > MAX_FILE_BYTES) return `This file is larger than ${fmtBytes(MAX_FILE_BYTES)} and was skipped.`;
  return null;
}

/* Load a File into an <img>. Caller revokes `url`. */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (!img.naturalWidth || !img.naturalHeight) {
        URL.revokeObjectURL(url);
        reject(new Error('This image appears to be empty or corrupt.'));
        return;
      }
      resolve({ img, url, width: img.naturalWidth, height: img.naturalHeight, type: normalizeType(file.type) || typeFromExt(file.name) });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('This file could not be read as an image.'));
    };
    img.src = url;
  });
}

/* "Keep original" resolves to the source type, falling back to PNG. */
export function effectiveFormat(selected, sourceType) {
  if (selected !== 'original') return selected;
  const t = normalizeType(sourceType || '');
  return TYPES.includes(t) ? t : 'image/png';
}

/*
 * Draw the source (optionally cropped) onto a canvas at the target size and encode it.
 * opts: { format, quality (0..1), maxW, maxH, targetW, targetH, bg, crop: {x,y,w,h} }
 */
export async function processImage(source, opts) {
  let sx = 0;
  let sy = 0;
  let sw = source.width;
  let sh = source.height;
  if (opts.crop) {
    sx = Math.max(0, Math.min(opts.crop.x, source.width - 1));
    sy = Math.max(0, Math.min(opts.crop.y, source.height - 1));
    sw = Math.max(1, Math.min(opts.crop.w, source.width - sx));
    sh = Math.max(1, Math.min(opts.crop.h, source.height - sy));
  }
  let dw = sw;
  let dh = sh;
  if (opts.targetW || opts.targetH) {
    dw = opts.targetW || Math.round(sw * (opts.targetH / sh));
    dh = opts.targetH || Math.round(sh * (opts.targetW / sw));
  } else if (opts.maxW || opts.maxH) {
    const scale = Math.min((opts.maxW || Infinity) / sw, (opts.maxH || Infinity) / sh, 1);
    dw = Math.round(sw * scale);
    dh = Math.round(sh * scale);
  }
  dw = Math.max(1, Math.min(MAX_DIM, Math.round(dw)));
  dh = Math.max(1, Math.min(MAX_DIM, Math.round(dh)));

  const canvas = document.createElement('canvas');
  canvas.width = dw;
  canvas.height = dh;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context is unavailable in this browser.');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  if (opts.format === 'image/jpeg') {
    ctx.fillStyle = opts.bg || '#FFFFFF';
    ctx.fillRect(0, 0, dw, dh);
  }
  ctx.drawImage(source.img, sx, sy, sw, sh, 0, 0, dw, dh);
  const q = opts.format === 'image/png' ? undefined : opts.quality != null ? opts.quality : 0.85;
  const blob = await canvasToBlob(canvas, opts.format, q);
  if (!blob || !blob.size) throw new Error('The browser could not generate the output image.');
  return { blob, width: dw, height: dh, type: opts.format };
}
