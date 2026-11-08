/**
 * ATLAS News — HTML sanitisation and text/slug validation.
 *
 * Article bodies are stored ALREADY sanitised (on every save and on import) and sanitised AGAIN when
 * rendered, so a row edited outside the app, or a future change to the allow-list, can never ship a
 * script. The allow-list is deliberately small — the editorial vocabulary the Stage 3 editor and the
 * Stage 4 WordPress conversion produce:
 *
 *   text      p br h2 h3 h4 strong b em i u s sub sup blockquote cite code pre hr
 *   lists     ul ol li
 *   links     a[href title target rel]  — http(s), mailto, tel, site-relative; target=_blank gets
 *             rel="noopener noreferrer"
 *   media     figure figcaption img[src srcset sizes alt width height loading decoding]
 *             video[controls preload poster playsinline muted loop] source[src type]
 *             iframe — only YouTube (youtube-nocookie.com / youtube.com /embed/…)
 *   tables    table caption thead tbody tfoot tr th td[colspan rowspan scope]
 *   layout    a fixed set of class names on figure/div/ul (galleries, embeds, alignment) — never style=
 *
 * Gone in all cases: <script>/<style> and their content, event handlers, style attributes, javascript:
 * and data: URLs (images included), forms, objects, embeds, SVG and MathML.
 */
import sanitizeHtml from 'sanitize-html';
import { RESERVED_SLUGS } from '../config.js';

const CLASS_ALLOW = [
  'news-gallery', 'news-gallery-item', 'news-embed', 'news-embed-youtube', 'news-video', 'news-table',
  'news-pullquote', 'news-columns', 'news-column', 'align-left', 'align-right', 'align-center', 'align-wide',
  'align-full', 'is-cols-2', 'is-cols-3', 'is-cols-4',
];

const YOUTUBE_EMBED = /^https:\/\/(www\.)?(youtube-nocookie\.com|youtube\.com)\/embed\/[A-Za-z0-9_-]{6,20}(\?[A-Za-z0-9_=&;%-]*)?$/;

/** Media sources: https only (or site-relative), and — when an asset base is configured — the
 *  sanitizer still accepts any https host, because legacy content may reference another host until the
 *  Stage 4 import rewrites it. Scripts can never come from an <img>/<source>, so this is safe. */
const httpsOrRelative = (v) => /^https:\/\//i.test(v) || /^\/(?!\/)/.test(v);

const ARTICLE_OPTIONS = {
  allowedTags: [
    'p', 'br', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'blockquote', 'cite', 'code',
    'pre', 'hr', 'ul', 'ol', 'li', 'a', 'figure', 'figcaption', 'img', 'video', 'source', 'iframe', 'table',
    'caption', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'div', 'span',
  ],
  disallowedTagsMode: 'discard',
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'srcset', 'sizes', 'alt', 'width', 'height', 'loading', 'decoding'],
    video: ['controls', 'preload', 'poster', 'playsinline', 'muted', 'loop', 'width', 'height'],
    source: ['src', 'type'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'loading', 'referrerpolicy'],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan', 'scope'],
    ol: ['start', 'reversed'],
    figure: ['class'],
    div: ['class'],
    ul: ['class'],
    span: ['class'],
    blockquote: ['class'],
  },
  allowedClasses: {
    figure: CLASS_ALLOW,
    div: CLASS_ALLOW,
    ul: CLASS_ALLOW,
    span: ['align-left', 'align-right', 'align-center'],
    blockquote: ['news-pullquote'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['https'], source: ['https'], video: ['https'], iframe: ['https'] },
  allowedSchemesAppliedToAttributes: ['href', 'src', 'cite', 'poster'],
  allowProtocolRelative: false,
  allowedIframeHostnames: ['www.youtube-nocookie.com', 'youtube-nocookie.com', 'www.youtube.com', 'youtube.com'],
  allowIframeRelativeUrls: false,
  nonTextTags: ['script', 'style', 'textarea', 'option', 'noscript', 'template', 'svg', 'math', 'object', 'embed'],
  enforceHtmlBoundary: true,
  parseStyleAttributes: false,
  transformTags: {
    b: 'strong',
    i: 'em',
    a: (tagName, attribs) => {
      const out = { ...attribs };
      if (out.target && out.target !== '_blank') delete out.target;
      if (out.target === '_blank') out.rel = 'noopener noreferrer';
      else if (out.rel) out.rel = out.rel.split(/\s+/).filter((r) => ['nofollow', 'noopener', 'noreferrer', 'sponsored', 'ugc'].includes(r)).join(' ') || undefined;
      return { tagName, attribs: out };
    },
    img: (tagName, attribs) => {
      const out = { ...attribs, loading: attribs.loading === 'eager' ? 'eager' : 'lazy', decoding: 'async' };
      if (!out.alt) out.alt = '';
      return { tagName, attribs: out };
    },
    iframe: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: 'lazy', referrerpolicy: 'strict-origin-when-cross-origin' },
    }),
  },
  exclusiveFilter: (frame) => {
    if (frame.tag === 'iframe') return !YOUTUBE_EMBED.test(frame.attribs.src || '');
    if (frame.tag === 'img') return !httpsOrRelative(frame.attribs.src || '');
    if (frame.tag === 'source') return !httpsOrRelative(frame.attribs.src || '');
    return false;
  },
};

/** Sanitise an article body. Always returns a string. */
export function sanitizeArticleHtml(html) {
  if (typeof html !== 'string' || !html) return '';
  return sanitizeHtml(html, ARTICLE_OPTIONS).trim();
}

/** Plain text: every tag removed, entities decoded once, whitespace collapsed, length capped. */
export function sanitizePlainText(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  const text = sanitizeHtml(value, { allowedTags: [], allowedAttributes: {}, nonTextTags: ARTICLE_OPTIONS.nonTextTags })
    /* decode once: &amp; LAST, so "&amp;lt;" becomes the text "&lt;", not "<" */
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.slice(0, maxLength);
}

/* ------------------------------------------------------------------------------------ slugs */

/** A URL slug from free text: lower-case ASCII letters, digits and single hyphens. */
export function slugify(text, maxLength = 200) {
  return String(text || '')
    .normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLength)
    .replace(/-+$/g, '');
}

/**
 * Validate a slug. New content: `[a-z0-9]` words joined by single hyphens. `{ legacy: true }` (the
 * WordPress import only) additionally accepts the percent-encoded slugs WordPress produced for
 * non-ASCII titles, so old URLs keep working. Reserved route names are always refused.
 */
export function validateSlug(slug, { legacy = false, maxLength = 400 } = {}) {
  if (typeof slug !== 'string' || !slug) return { ok: false, reason: 'empty' };
  if (slug.length > maxLength) return { ok: false, reason: 'too_long' };
  if (RESERVED_SLUGS.includes(slug.toLowerCase())) return { ok: false, reason: 'reserved' };
  const re = legacy ? /^(?:[a-z0-9]|%[0-9a-f]{2})+(?:-(?:[a-z0-9]|%[0-9a-f]{2})+)*$/i : /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return re.test(slug) ? { ok: true } : { ok: false, reason: 'invalid_characters' };
}
