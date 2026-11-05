import 'server-only';

import { instagramConfig } from '@/lib/instagram/config';
import { httpGet } from '@/lib/instagram/httpGet';

/**
 * Server-only: resolve one Meta media id to the CDN URL that is valid *right
 * now*, and shape the internal path the browser is given instead.
 *
 * ── Why this exists ───────────────────────────────────────────────────────
 * Meta signs its CDN URLs and expires them within hours, so a raw fbcdn URL can
 * never go into the HTML. The previous answer was to download every file into
 * `public/assets/images/instagram/` and serve it from disk — which works on a
 * long-lived box and cannot work on Vercel, where the deployment filesystem is
 * read-only and a lambda's `/tmp` is per-instance and ephemeral. The browser is
 * now given `/api/instagram/media/<id>` and the bytes are fetched on demand.
 *
 * ── The id is enough ──────────────────────────────────────────────────────
 * Verified against the live Graph API: a CAROUSEL_ALBUM child id resolves on its
 * own (`/{child-id}?fields=media_type,media_url` -> 200 with `media_url`), so one
 * route covers IMAGE, VIDEO/REELS and every slide of an album without the client
 * ever naming a parent or an index.
 *
 * `META_ACCESS_TOKEN` is read here and in `posts.js`, nowhere else, and never
 * leaves the server: not in the returned value, not in an error, not in a log.
 * Graph error bodies quote the failing request — token included — so only the
 * status is ever surfaced.
 */

/** The public path for a media id. The only media URL the browser ever sees. */
export function mediaPath(id) {
  return `/api/instagram/media/${encodeURIComponent(id)}`;
}

/** Reserved id for the account's profile picture, which is not a media object. */
export const PROFILE_MEDIA_ID = 'profile';

/* Meta media ids are digit strings; the profile alias is the one exception. */
const VALID_ID = /^[0-9]{1,32}$/;

export function isValidMediaId(id) {
  return id === PROFILE_MEDIA_ID || VALID_ID.test(id);
}

function graphUrl(pathname, params) {
  const url = new URL(`https://graph.facebook.com/${instagramConfig.apiVersion}/${pathname}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }
  return url;
}

/**
 * The still image for one media object, whatever its type — the same rule the
 * feed uses, so the proxy serves exactly the frame the grid was built from.
 *   IMAGE  media_url
 *   VIDEO  thumbnail_url, the poster frame; nothing here ever autoplays, and a
 *          direct lookup of a VIDEO does not return `media_url` at all.
 */
export function stillUrl(media) {
  if (!media) return null;
  if (media.media_type === 'VIDEO') return media.thumbnail_url || media.media_url || null;
  return media.media_url || media.thumbnail_url || null;
}

/**
 * Current CDN URL for `id`, or `null`. Throws nothing: the caller decides what
 * a failure should look like.
 */
export async function resolveMediaUrl(id, token) {
  if (!token || !isValidMediaId(id)) return null;

  try {
    if (id === PROFILE_MEDIA_ID) {
      const response = await httpGet(
        graphUrl(instagramConfig.businessId, {
          fields: 'profile_picture_url',
          access_token: token,
        }),
      );
      if (response.status !== 200) return null;
      return JSON.parse(response.body.toString('utf8')).profile_picture_url || null;
    }

    const response = await httpGet(
      graphUrl(id, {
        fields: 'id,media_type,media_url,thumbnail_url',
        access_token: token,
      }),
    );
    if (response.status !== 200) return null;
    return stillUrl(JSON.parse(response.body.toString('utf8')));
  } catch {
    return null;
  }
}
