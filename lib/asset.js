/**
 * The one place an asset URL is built.
 *
 * Every file under `public/assets/` keeps its path: the code refers to it as `/assets/…`, exactly as
 * today. `NEXT_PUBLIC_ASSET_BASE_URL` decides where that path is served from:
 *
 *   unset / empty   -> `/assets/…` unchanged, served by Next.js from the local `public/` folder
 *   set             -> `${base}/assets/…`, served straight from the public S3 bucket, e.g.
 *                      https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/images/campus.webp
 *                      (direct S3 HTTPS — no CloudFront, no CDN in front)
 *
 * so local development, staging and production differ only by that one variable, and clearing it is
 * the rollback. Components do not need to call this helper: the `/assets/…` literals already in the
 * code are rewritten to the same URL at build time by scripts/assets/asset-url-loader.cjs (JS) and
 * scripts/assets/postcss-asset-url.cjs (compiled CSS), which use the same variable. Use `asset()` for a
 * path assembled at runtime that no literal covers.
 *
 * The value is public (a bucket hostname, not a credential) and Next.js inlines
 * `NEXT_PUBLIC_*` variables at BUILD time — it must be present in the environment that runs
 * `next build`. It must ALSO be present where `next start` runs: next.config.mjs is evaluated again at
 * server start, and only then adds the S3 host to `images.remotePatterns` (without it, `next/image`
 * answers 400 for S3 images).
 *
 * Rendering an asset never needs AWS credentials; only `npm run assets:sync` (scripts/assets/) does.
 * See docs/assets-s3.md.
 */

/* `process.env.NEXT_PUBLIC_…` must be written out literally for Next.js to inline it in client code */
const RAW_BASE = process.env.NEXT_PUBLIC_ASSET_BASE_URL || '';

/** The configured base URL without a trailing slash, or '' when assets are served locally. */
export const ASSET_BASE_URL = RAW_BASE.trim().replace(/\/+$/, '');

const PASS_THROUGH = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i; // http:, https:, data:, blob:, mailto:, protocol-relative

/* Folders that stay on the site's own origin in every build (fonts, brand): the same list as
   scripts/assets/local-only.cjs, which the build-time rewrite and the S3 scripts read. Keep both in step. */
const LOCAL_ONLY = /^\/assets\/(?:fonts|brand)\//;

/**
 * `/assets/images/x.png` -> `${ASSET_BASE_URL}/assets/images/x.png`.
 * Absolute URLs, data/blob URLs and non-asset paths are returned untouched, so the helper is safe to
 * apply to any `src`/`href` value. `null`/`undefined` pass through (optional fields stay optional).
 */
export function asset(path) {
  if (typeof path !== 'string' || path === '') return path;
  if (!ASSET_BASE_URL || PASS_THROUGH.test(path)) return path;
  if (!path.startsWith('/assets/') || LOCAL_ONLY.test(path)) return path;
  return ASSET_BASE_URL + path;
}

/**
 * A `srcset` string: every candidate URL is passed through `asset()`, descriptors are kept.
 * `"/assets/a-500.png 500w, /assets/a.png 1366w"` -> `"${base}/assets/a-500.png 500w, …"`.
 * Candidates are split on a comma followed by whitespace — a comma inside a filename (several asset
 * names contain one) is not followed by a space, and the HTML parser splits the same way.
 */
export function assetSrcSet(srcSet) {
  if (typeof srcSet !== 'string' || srcSet === '' || !ASSET_BASE_URL) return srcSet;
  return srcSet
    .split(/,\s+/)
    .map((candidate) => {
      const trimmed = candidate.trim();
      const space = trimmed.search(/\s/);
      if (space === -1) return asset(trimmed);
      return asset(trimmed.slice(0, space)) + trimmed.slice(space);
    })
    .join(', ');
}

/** A CSS `url("…")` value for an inline background — `style={{ backgroundImage: assetCss(path) }}`. */
export function assetCss(path) {
  if (typeof path !== 'string' || path === '') return 'none';
  return `url("${asset(path).replace(/["\\]/g, '\\$&')}")`;
}
