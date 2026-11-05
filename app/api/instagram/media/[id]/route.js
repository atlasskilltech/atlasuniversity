import { httpGet } from '@/lib/instagram/httpGet';
import { isValidMediaId, resolveMediaUrl } from '@/lib/instagram/mediaUrl';

/**
 * Streams one Instagram media item to the browser.
 *
 *   browser -> /api/instagram/media/<media-id>
 *           -> Graph lookup with META_ACCESS_TOKEN (server-side only)
 *           -> current fbcdn URL
 *           -> bytes, streamed back
 *
 * This replaces the previous `/instagram-media/<name>` route, which read files
 * that `lib/instagram/posts.js` had written into `public/assets/images/instagram/`.
 * That works on a long-lived server and cannot work on Vercel: the deployment
 * filesystem is read-only, `/tmp` is per-instance and ephemeral, and anything
 * Load More or an ISR refresh downloaded after the build simply would not exist
 * for the next request — so every one of those images 404'd.
 *
 * Nothing about the URL the browser receives is secret: a media id is already in
 * the page as `post.id`. The access token and the signed CDN URL never leave the
 * server — not in the HTML, not in client JS, not in a query string, not in a
 * response header.
 *
 * ── Caching ───────────────────────────────────────────────────────────────
 * `s-maxage=900, stale-while-revalidate=3600` matches the feed's own 900s
 * window, so the CDN serves the bytes and Meta is asked at most once per window
 * per image. Media bytes never change under a given id, but the *signed URL*
 * does, so this is a time window rather than `immutable`. The profile picture
 * can change under its stable alias, so it gets the same window and no more.
 *
 * ── Failure ───────────────────────────────────────────────────────────────
 * A malformed id (400) or a missing token (503) is a request-level fault and
 * gets a real status. A media-level fault — Graph unreachable, an expired URL,
 * a type with no still frame — instead returns a 1x1 transparent PNG with 200
 * and a 60s window, because a broken-image icon in the middle of the grid is
 * worse than an empty tile showing the card's own background, and the short
 * window means it heals itself on the next pass. The reason is still
 * inspectable, in `X-Media-Status`.
 */

export const runtime = 'nodejs';

/* 1x1 transparent PNG — the graceful fallback, never a broken-image icon. */
const BLANK = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64',
);

/** Meta serves JPEG, PNG or WebP; the type comes from the bytes, not a name. */
function contentType(buffer) {
  if (buffer.length > 12) {
    if (buffer.readUInt16BE(0) === 0xffd8) return 'image/jpeg';
    if (buffer.readUInt32BE(0) === 0x89504e47) return 'image/png';
    if (buffer.toString('latin1', 0, 4) === 'RIFF' && buffer.toString('latin1', 8, 12) === 'WEBP') {
      return 'image/webp';
    }
  }
  return 'application/octet-stream';
}

function blank(status) {
  return new Response(BLANK, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': String(BLANK.length),
      'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300',
      'X-Media-Status': status,
    },
  });
}

export async function GET(request, { params }) {
  const { id } = await params;

  if (!isValidMediaId(id)) return new Response('Bad request', { status: 400 });

  const token = process.env.META_ACCESS_TOKEN;
  if (!token) return new Response('Instagram media is not configured', { status: 503 });

  const url = await resolveMediaUrl(id, token);
  if (!url) return blank('unresolved');

  try {
    const { status, body } = await httpGet(url);
    if (status !== 200 || !body.length) return blank(`upstream-${status}`);

    return new Response(body, {
      headers: {
        'Content-Type': contentType(body),
        'Content-Length': String(body.length),
        'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
      },
    });
  } catch {
    return blank('fetch-failed');
  }
}
