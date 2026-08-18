/**
 * Instagram / Meta Graph configuration.
 *
 * Everything here is non-secret and safe to keep in source: the IG business id
 * and page id are public identifiers, and the handle is public. The **access
 * token is deliberately absent** — it is read straight from
 * `process.env.META_ACCESS_TOKEN` at its two points of use, `posts.js` and
 * `mediaUrl.js`, both `server-only`, and is never returned, logged or
 * serialised.
 *
 * Copy `.env.example` to `.env.local` and put the token there. `.gitignore`
 * already excludes `.env*.local`.
 */

const num = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const instagramConfig = {
  businessId: process.env.INSTAGRAM_BUSINESS_ID || '17841449043892932',
  pageId: process.env.FACEBOOK_PAGE_ID || '108001881594146',
  apiVersion: process.env.META_API_VERSION || 'v21.0',
  handle: process.env.INSTAGRAM_HANDLE || 'atlasskilltechuniversity',
  /* cache_duration = 900 — 15 minutes */
  cacheSeconds: num(process.env.META_CACHE_DURATION, 900),
  /*
   * cache_thumbnails = true. Kept for parity with the reference's own config
   * and no longer switchable: media is always served through
   * `/api/instagram/media/<id>`, because the alternative — a signed fbcdn URL
   * in the HTML — expires within hours, and downloading to disk cannot survive
   * a read-only serverless filesystem. The HTTP cache does the caching now.
   */
  cacheThumbnails: true,
};

export const profileUrl = `https://www.instagram.com/${instagramConfig.handle}/`;
