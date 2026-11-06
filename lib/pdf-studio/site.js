/* =====================================================================
   Where the PDF Studio is served from.

   Integrated into the ATLAS University site, the studio, its flipbook
   viewer and the page building the embed code are all the SAME
   application, so the public origin is simply the origin the studio is
   open on - https://atlasuniversity.edu.in in production, the dev server
   locally. No configuration value is needed for it. (The standalone
   studio read NEXT_PUBLIC_SITE_URL because it ran on its own host.)

   Embed codes are pasted into other websites, so the dialog still warns
   when that origin only resolves on this machine.
   ===================================================================== */

/** Where every PDF Studio route lives on this site. */
export const STUDIO_BASE = '/pdf-studio';

/** True for an origin that only resolves on the machine serving it. */
export function isLocalOrigin(origin) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?$/i.test(
    origin || '',
  );
}

/** The origin to build an embed code from: the one the studio is open on. */
export function resolveOrigin() {
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

/** The public viewer path for a document. */
export function flipbookPath(docId) {
  return `${STUDIO_BASE}/flipbook/${docId}`;
}

/** The full public viewer URL for a document. */
export function flipbookUrl(docId, origin = resolveOrigin()) {
  return `${origin}${flipbookPath(docId)}`;
}

/** Escape a string for use inside a double-quoted HTML attribute. */
function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * What an external site pastes in.
 *
 * It has to stand on its own: dropped into an otherwise empty .html or
 * .php file, with nothing else on the page, it should give a flipbook
 * that reaches the edges of the window and raises no scrollbars. So
 * everything it needs travels with it.
 *
 *   display:block  an iframe is inline by default, and the line box
 *                  under it adds about 4px - enough on its own to start
 *                  the page scrolling.
 *
 *   width:100%     fills whatever it lands in: a bare body, a WordPress
 *                  block, a responsive column.
 *
 *   body:has(> .atlas-flipbook){margin:0}
 *                  the white band above and below the frame is the 8px
 *                  margin every browser puts on <body>, and it belongs
 *                  to the host page, not to the viewer - measured, the
 *                  viewer's own html and body already carry no margin or
 *                  padding at all. It can only be answered from the host
 *                  side, so the snippet answers it, and narrowly: the
 *                  rule applies only where the frame is a DIRECT child
 *                  of <body>, which is the bare-embed case. Nested in a
 *                  real page - a template, an article, a block - it
 *                  never matches and the host's own spacing is left
 *                  exactly as it was.
 *
 *   heights        edge to edge at 100dvh once that margin is gone, and
 *                  calc(100dvh - 16px) otherwise, so a browser too old
 *                  for :has() still shows no scrollbar - just the 8px
 *                  band. `dvh` tracks a mobile browser's address bar
 *                  sliding in and out; the `vh` line before each one is
 *                  the fallback for anything that cannot parse dynamic
 *                  viewport units, which drops the declaration it does
 *                  not understand and keeps the one it does.
 */
export function embedCode(
  docId,
  { origin = resolveOrigin(), title = '' } = {},
) {
  return [
    '<style>',
    '  .atlas-flipbook{display:block;width:100%;border:0;',
    '    height:calc(100vh - 16px);height:calc(100dvh - 16px)}',
    '  body:has(> .atlas-flipbook){margin:0}',
    '  body:has(> .atlas-flipbook) .atlas-flipbook{height:100vh;height:100dvh}',
    '</style>',
    '<iframe',
    '  class="atlas-flipbook"',
    `  src="${flipbookUrl(docId, origin)}"`,
    ...(title ? [`  title="${attr(title)}"`] : []),
    '  allow="fullscreen"',
    '  allowfullscreen',
    '  loading="lazy">',
    '</iframe>',
  ].join('\n');
}
