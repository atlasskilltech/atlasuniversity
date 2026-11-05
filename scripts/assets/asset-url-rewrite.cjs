/**
 * The rewrite rules that point `/assets/…` at the public asset host (docs/assets-s3.md).
 *
 * Shared by the two build-time hooks so they cannot drift apart:
 *   - asset-url-loader.cjs   (Turbopack loader over app/, components/, lib/ JavaScript and JSON)
 *   - postcss-asset-url.cjs  (PostCSS plugin over the compiled CSS, after Tailwind)
 *
 * Nothing in the source changes: the code keeps writing `/assets/…`, and the rewrite runs only while
 * `NEXT_PUBLIC_ASSET_BASE_URL` is set for `next build` / `next dev`. Empty or unset = no rewrite, the
 * files are served from `public/` exactly as before — which is also the rollback.
 *
 * Folders listed in local-only.cjs (fonts, brand) are never rewritten: they stay on the site's own
 * origin in every build.
 */
'use strict';
const { LOCAL_ONLY } = require('./local-only.cjs');

/** The configured base without a trailing slash, or '' (no rewrite). Validated like next.config.mjs. */
function assetBase() {
  const raw = (process.env.NEXT_PUBLIC_ASSET_BASE_URL || '').trim().replace(/\/+$/, '');
  if (!raw) return '';
  if (!/^https?:\/\/[^/\s'"`()]+(?:\/[^\s'"`()]*)?$/i.test(raw)) {
    throw new Error(`NEXT_PUBLIC_ASSET_BASE_URL is not an absolute http(s) URL: "${raw}"`);
  }
  return raw;
}

/* `/assets/` NOT followed by a local-only folder: (?!fonts\/|brand\/) */
const KEEP = LOCAL_ONLY.map((p) => p.slice('assets/'.length).replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('|');
const A = `\\/assets\\/(?!${KEEP})`;

/**
 * JavaScript / JSX / JSON source. Only three shapes are rewritten — a survey of every `/assets/`
 * occurrence in app/, components/ and lib/ found nothing else that emits a URL:
 *
 *   1. a string or template literal that STARTS with /assets/   '/assets/x.png'  "/assets/…"  `/assets/…`
 *   2. a further srcSet candidate after ", "                     '/assets/a.webp 500w, /assets/b.webp 800w'
 *   3. an inline-style url() that starts a literal               backgroundImage: 'url(/assets/x.png)'
 *
 * Deliberately NOT rewritten:
 *   - Tailwind arbitrary values  `bg-[url('/assets/…')]`, `bg-[url(/assets/…)]`. Tailwind generates CSS
 *     from the class name in the SOURCE file; rewriting the class here would desynchronise the two. The
 *     generated CSS is rewritten by the PostCSS plugin instead. Rule 1 skips a quote preceded by `url(`;
 *     rules 2 and 3 cannot match inside a class name (no `, ` and no leading `url(` there).
 *   - external URLs such as `https://…/assets/…` — the /assets/ is not at the start of a literal.
 *   - anything under a local-only folder (local-only.cjs).
 */
const JS_RULES = [
  [new RegExp(`(?<!url\\()(['"\`])${A}`, 'g'), (base) => `$1${base}/assets/`],
  [new RegExp(`(,[ \\t]+)${A}`, 'g'), (base) => `$1${base}/assets/`],
  [new RegExp(`(['"\`])url\\((['"]?)${A}`, 'g'), (base) => `$1url($2${base}/assets/`],
];
const CSS_RULE = new RegExp(`url\\(\\s*(['"]?)${A}`, 'g');

function rewriteJs(source, base) {
  if (!base || source.indexOf('/assets/') === -1) return source;
  let out = source;
  for (const [re, to] of JS_RULES) out = out.replace(re, to(base));
  return out;
}

/** A CSS value: `url(/assets/…)`, `url('/assets/…')`, `url("/assets/…")`. */
function rewriteCssValue(value, base) {
  if (!base || value.indexOf('/assets/') === -1) return value;
  return value.replace(CSS_RULE, `url($1${base}/assets/`);
}

module.exports = { assetBase, rewriteJs, rewriteCssValue };
