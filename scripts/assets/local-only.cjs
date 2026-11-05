/**
 * Asset folders that are NOT moved to S3 (docs/assets-s3.md, "What stays local").
 *
 * They stay in `public/assets/`, stay tracked in git and ship with the Next.js app, so they are served
 * from the site's own origin in every build:
 *
 *   assets/fonts/   the 16 WOFF2 faces. Same-origin fonts need no CORS, and the `@font-face` sources
 *                   in app/globals.css and the preload in app/layout.js keep working unchanged.
 *   assets/brand/   the brand page (358 files). Its download buttons use `<a download="…">`, which
 *                   browsers ignore on cross-origin links, and its PDF tools load their libraries and
 *                   pdf.js worker from assets/brand/vendor/.
 *
 * The single source of truth for: the build-time URL rewrite (asset-url-rewrite.cjs), and the S3
 * scripts' file walk, manifest and reference checks (lib.mjs / check.mjs). Add a folder here and every
 * one of them excludes it.
 */
'use strict';

/** Path prefixes relative to public/, always ending in a slash. */
const LOCAL_ONLY = ['assets/fonts/', 'assets/brand/'];

/** `assets/…` (or `/assets/…`) -> true when that path stays local. */
function isLocalOnly(rel) {
  const r = String(rel).replace(/^\/+/, '');
  return LOCAL_ONLY.some((p) => r.startsWith(p));
}

module.exports = { LOCAL_ONLY, isLocalOnly };
