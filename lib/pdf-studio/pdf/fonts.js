/* =====================================================================
   Fonts for the PDF export.

   A sheet is rasterised by drawing it inside an SVG <foreignObject>.
   That image is an isolated document: it cannot reach the page's
   stylesheets and it cannot load font files by URL. So the @font-face
   rules already in use are collected here and rewritten with the font
   binaries inlined, and that CSS is planted inside the image.

   The fonts are self-hosted by next/font and therefore same-origin, so
   they can simply be fetched. The result is cached for the session.
   ===================================================================== */

let cached = null;

const FONT_FACE_RULE = 5; // CSSRule.FONT_FACE_RULE

/* The PDF Studio's own two families (lib/pdf-studio/fonts.js). The ATLAS
   site loads many more faces on every page; only these are ever used on a
   sheet, so only these are inlined - the rest would just make every
   rasterised page carry dozens of unused font files. */
const SHEET_FAMILIES = /\bAtlas(Display|Text)\b/;

function fontFaceRules() {
  const rules = [];
  for (const sheet of Array.from(document.styleSheets)) {
    let list;
    try {
      list = sheet.cssRules;
    } catch {
      continue; // a cross-origin stylesheet; nothing we can read
    }
    if (!list) continue;
    for (const rule of Array.from(list)) {
      if (rule.type === FONT_FACE_RULE) rules.push(rule);
    }
  }
  // Should a browser ever report the families differently, fall back to
  // every face rather than drawing the sheets in a fallback font.
  const own = rules.filter((rule) =>
    SHEET_FAMILIES.test(rule.style.getPropertyValue('font-family')),
  );
  return own.length ? own : rules;
}

async function toDataUri(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not read font ${url}`);
  const buffer = await response.arrayBuffer();

  let binary = '';
  const bytes = new Uint8Array(buffer);
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode.apply(
      null,
      bytes.subarray(i, i + CHUNK),
    );
  }
  const type = response.headers.get('content-type') || 'font/woff2';
  return `data:${type};base64,${btoa(binary)}`;
}

/**
 * A face's url() exactly as the stylesheet wrote it, made absolute.
 *
 * Ported note: Next 15 (the standalone studio) wrote next/font's sources as
 * absolute /_next/static/media/... paths. This site's Next 16 / Turbopack
 * build writes them RELATIVE to the stylesheet (../media/...), and the CSSOM
 * hands them back unresolved - fetched as-is they resolve against the page
 * and 404, and the sheets silently drew in a fallback face. Resolving
 * against the stylesheet's own URL works for both.
 */
function absolute(url, rule) {
  try {
    return new URL(url, rule.parentStyleSheet?.href || document.baseURI).href;
  } catch {
    return url;
  }
}

/**
 * Every @font-face in use, with its `src` rewritten to inline data.
 * Faces whose files cannot be read are dropped rather than failing the
 * export: the sheet still rasterises, using whatever the fallback is.
 */
export async function collectFontCss() {
  if (cached) return cached;

  const rules = fontFaceRules();
  const urls = new Map();

  for (const rule of rules) {
    const src = rule.style.getPropertyValue('src');
    for (const match of src.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
      if (match[2].startsWith('data:')) continue;
      const url = absolute(match[2], rule);
      if (!urls.has(url)) urls.set(url, null);
    }
  }

  await Promise.all(
    Array.from(urls.keys()).map(async (url) => {
      try {
        urls.set(url, await toDataUri(url));
      } catch {
        urls.set(url, null);
      }
    }),
  );

  const css = rules
    .map((rule) => {
      let text = rule.cssText;
      let complete = true;
      text = text.replace(/url\((['"]?)([^'")]+)\1\)/g, (whole, _q, url) => {
        if (url.startsWith('data:')) return whole;
        const data = urls.get(absolute(url, rule));
        if (!data) {
          complete = false;
          return whole;
        }
        return `url(${data})`;
      });
      return complete ? text : null;
    })
    .filter(Boolean)
    .join('\n');

  cached = css;
  return cached;
}
