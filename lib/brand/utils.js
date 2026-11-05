/*
 * Small helpers shared by the /brand page and its tools — ported from the reference scripts
 * (reference/brand/index.html, image-tools.html, text-converter.html, assets/js/pdf-tools.js).
 */

/* ---------- color (WCAG 2.1) — ref index.html ---------- */
export function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export const rgbString = (hex) => `rgb(${hexToRgb(hex).join(', ')})`;

export function luminance(hex) {
  const c = hexToRgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrast(a, b) {
  const l1 = luminance(a);
  const l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
export function grade(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA large';
  return 'Graphics only';
}
/* readable text on a swatch: white or ATLAS Indigo, whichever contrasts more */
export const onColor = (hex) => (contrast(hex, '#FFFFFF') >= contrast(hex, '#342B7C') ? '#FFFFFF' : '#342B7C');

/* ---------- sizes ---------- */
/* the brand kit's decimal sizes (ref index.html fmtSize) */
export function fmtKitSize(bytes) {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}
/* the tools' binary sizes (ref image-tools / pdf-tools fmtSize) */
export function fmtBytes(bytes) {
  if (bytes == null) return '—';
  if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(2)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
}
export function baseName(name) {
  const i = name.lastIndexOf('.');
  return i > 0 ? name.slice(0, i) : name;
}

/* ---------- clipboard (ref copy / fallbackCopy) ---------- */
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand('copy');
  } catch {
    ok = false;
  }
  document.body.removeChild(ta);
  return ok;
}
/** resolves true when the text reached the clipboard */
export async function copyText(text) {
  if (!text) return false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopy(text);
    }
  }
  return fallbackCopy(text);
}

/* ---------- downloads (ref downloadBlob) ---------- */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export const downloadBytes = (bytes, filename, mime) =>
  downloadBlob(new Blob([bytes], { type: mime || 'application/octet-stream' }), filename);
export function downloadText(filename, text, mime, bom) {
  downloadBlob(new Blob(bom ? ['﻿', text] : [text], { type: mime || 'text/plain;charset=utf-8' }), filename);
}

export const raf = () => new Promise((r) => requestAnimationFrame(() => r()));

/* expand a compact logo group (data.js) into file entries with local hrefs */
export function expandGroups(groups) {
  return groups.map((g) => ({
    id: g.id,
    title: g.title,
    subtitle: g.subtitle,
    logos: g.logos.map((l) => ({
      id: l.id,
      name: l.name,
      bg: l.bg,
      note: l.note,
      preview: l.preview || `${g.dir}${l.id}.${l.files[0][0]}`,
      files: l.files.map(([ext, size, px, href]) => ({
        ext,
        size,
        px: px || null,
        href: href || `${g.dir}${l.id}.${ext}`,
        /* the filename the browser saves — the brand-kit name, even for a reused file */
        filename: `${l.id}.${ext}`,
      })),
    })),
  }));
}
