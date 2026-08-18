import 'server-only';

import { instagramConfig } from '@/lib/instagram/config';
import { httpGet } from '@/lib/instagram/httpGet';
import { imageSize } from '@/lib/instagram/imageSize';
import { mediaPath, PROFILE_MEDIA_ID, stillUrl } from '@/lib/instagram/mediaUrl';

/**
 * Server-only: the Instagram feed for "The Action never stops!".
 *
 * Supersedes `latestPost.js`, which could only ever resolve one post. The
 * section now shows a page of PAGE_SIZE real posts with a Load More that walks
 * Meta's own pagination cursor.
 *
 * ── One request per page ──────────────────────────────────────────────────
 * Everything the grid AND the viewer need — media, carousel children, counts,
 * profile-independent fields and the comments edge — is asked for in a single
 * media-edge request per page. Nine posts cost one Graph call, not nine. If the
 * token lacks `instagram_manage_comments` the whole request would fail on that
 * one field, so a failure is retried once without it and those posts are marked
 * `commentsStatus: 'unavailable'` rather than "no comments".
 *
 * ── Secrets ───────────────────────────────────────────────────────────────
 * `META_ACCESS_TOKEN` is read here and nowhere else. It is never returned,
 * logged, or embedded in an error. Note that Meta's `paging.next` is a full URL
 * **with the token in the query string** — it is deliberately never stored and
 * never returned; only the opaque `after` cursor is kept, and the request URL is
 * rebuilt server-side. Graph error bodies are not echoed either: they quote the
 * failing request, token included.
 *
 * ── Cache (cache_duration = 900) ──────────────────────────────────────────
 *   { fetchedAt, pageSize, profile, posts: [...], next, exhausted }
 * `posts` is newest-first and grows as Load More walks the cursor, so a second
 * visitor clicking Load More is served from memory instead of hitting Meta
 * again. A stale entry is refreshed; if the refresh fails the stale entry is
 * still served, because a real-but-old grid beats an empty section. Refreshing
 * page 1 resets the walk: newer posts shift everything, so an old cursor would
 * tear.
 *
 * The cache lives in module scope, NOT on disk. It used to be a JSON file next
 * to the downloaded media in `public/`, which cannot work on Vercel: the
 * deployment filesystem is read-only and a lambda's `/tmp` is per-instance and
 * ephemeral, so the write silently failed and every request refetched — and
 * Load More, which needed the stored cursor, failed outright. A module-scope
 * entry is warm for the life of an instance and simply rebuilt when it is not;
 * `getMoreInstagramPosts` re-walks from page 1 on a cold start rather than
 * giving up.
 */

/** Posts per page — the section shows at least 9, and Load More adds 9 more. */
export const PAGE_SIZE = 9;

const MEDIA_FIELDS = [
  'id',
  'media_type',
  'media_product_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'caption',
  'timestamp',
  'username',
  'like_count',
  'comments_count',
  'children{id,media_type,media_url,thumbnail_url,permalink}',
];

const COMMENTS_FIELD =
  'comments.limit(30){id,text,username,timestamp,like_count,replies.limit(10){id,text,username,timestamp,like_count}}';

function graphUrl(pathname, params) {
  const url = new URL(`https://graph.facebook.com/${instagramConfig.apiVersion}/${pathname}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, value);
  }
  return url;
}

/**
 * The local path the browser gets for one media id, plus the media's real pixel
 * size when the caller needs it.
 *
 * Nothing is written to disk and no remote URL is returned: an expiring fbcdn
 * URL in the HTML is exactly the failure mode this exists to avoid, and a
 * downloaded file is exactly what Vercel cannot keep. `/api/instagram/media/<id>`
 * resolves the current CDN URL server-side on every request instead.
 *
 * ── Why dimensions still get measured ─────────────────────────────────────
 * The viewer sizes its media pane to the post's own aspect ratio, and the Graph
 * API does not return dimensions — so they came out of the downloaded bytes.
 * Removing the download would flatten every post to 1:1, which is a visual
 * change, so the header is still read: a `Range: bytes=0-65535` request, whose
 * body is measured and dropped. Verified against fbcdn — it answers 206 with
 * exactly the requested slice.
 *
 * Only the cover of each post is measured, because only the cover's ratio is
 * ever used (`InstagramPostModal` takes `aspectOf(slides[0])` and every later
 * slide is `object-contain` inside that frame). Nine measurements per page, not
 * one per carousel child.
 */
async function probeMedia(remoteUrl, id, { measure = false } = {}) {
  if (!id) return null;
  const src = mediaPath(id);
  if (!measure || !remoteUrl) return { src, width: null, height: null };

  try {
    const { status, body } = await httpGet(remoteUrl, { headers: { Range: 'bytes=0-65535' } });
    if ((status !== 200 && status !== 206) || !body.length) return { src, width: null, height: null };
    return { src, width: null, height: null, ...(imageSize(body) || {}) };
  } catch {
    /* the ratio falls back to square, exactly as it does for an unmeasurable
       file today — the media itself still renders through the route */
    return { src, width: null, height: null };
  }
}

/**
 * One slide of the viewer: a local path plus, for the cover, its real
 * dimensions. A carousel child has its own media id and resolves on its own
 * through the same route, so every slide of an album is addressable.
 */
async function toSlide(media, index) {
  if (!media?.id) return null;
  const probed = await probeMedia(stillUrl(media), media.id, { measure: index === 0 });
  if (!probed) return null;
  return {
    id: media.id,
    type: media.media_type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
    image: probed.src,
    width: probed.width ?? null,
    height: probed.height ?? null,
  };
}

/** Shape a comment (and its real replies) down to the fields the viewer shows. */
function toComment(raw) {
  if (!raw?.id || typeof raw.text !== 'string') return null;
  return {
    id: raw.id,
    username: raw.username || null,
    text: raw.text,
    timestamp: raw.timestamp || null,
    likeCount: typeof raw.like_count === 'number' ? raw.like_count : null,
    replies: (raw.replies?.data || []).map(toComment).filter(Boolean),
  };
}

/**
 * One Graph media object -> one post the UI can render. A CAROUSEL_ALBUM keeps
 * all of its children as slides (one post, one card, complete carousel in the
 * viewer); anything else has exactly one slide. Returns `null` if no media could
 * be stored locally, since the alternative is a URL that 403s within the hour.
 */
async function toPost(media, profile, withComments) {
  const sources =
    media.media_type === 'CAROUSEL_ALBUM' && media.children?.data?.length
      ? media.children.data
      : [media];

  const slides = (await Promise.all(sources.map((item, i) => toSlide(item, i)))).filter(Boolean);
  if (!slides.length) return null;

  const comments = withComments ? (media.comments?.data || []).map(toComment).filter(Boolean) : [];
  const commentsStatus = !withComments ? 'unavailable' : comments.length ? 'ok' : 'empty';

  return {
    id: media.id,
    mediaType: media.media_type || 'IMAGE',
    productType: media.media_product_type || null,
    permalink: media.permalink || null,
    caption: media.caption || '',
    timestamp: media.timestamp || null,
    username: profile.username || media.username || instagramConfig.handle,
    fullName: profile.fullName || null,
    avatar: profile.avatar || null,
    likeCount: typeof media.like_count === 'number' ? media.like_count : null,
    commentCount: typeof media.comments_count === 'number' ? media.comments_count : null,
    media: slides,
    comments,
    commentsStatus,
  };
}

/**
 * One page of the media edge.
 *
 * `after` is Meta's opaque cursor. Asking for the comments field can fail the
 * whole request when the token lacks the scope, so that failure is retried once
 * without comments instead of losing the page.
 */
async function fetchPage(token, after) {
  const request = (fields) =>
    httpGet(
      graphUrl(`${instagramConfig.businessId}/media`, {
        fields,
        limit: String(PAGE_SIZE),
        after,
        access_token: token,
      }),
    );

  let withComments = true;
  let response = await request([...MEDIA_FIELDS, COMMENTS_FIELD].join(','));

  if (response.status !== 200) {
    withComments = false;
    response = await request(MEDIA_FIELDS.join(','));
  }
  /* Status only — a Graph error body quotes the failing request, token included */
  if (response.status !== 200) throw new Error(`graph-${response.status}`);

  const body = JSON.parse(response.body.toString('utf8'));
  return {
    media: Array.isArray(body?.data) ? body.data : [],
    /* Only the opaque cursor. `body.paging.next` is a full URL carrying the
       access token and must never be stored or handed onwards. */
    after: body?.paging?.next ? body?.paging?.cursors?.after || null : null,
    withComments,
  };
}

/**
 * Handle, display name and the avatar's local path — one call per refresh.
 *
 * The picture is not a media object, so it has no media id; the proxy route
 * reserves the alias `profile` for it and resolves `profile_picture_url` on
 * demand. Same mechanism, same guarantees, nothing written to disk.
 */
async function fetchProfile(token) {
  try {
    const response = await httpGet(
      graphUrl(instagramConfig.businessId, {
        fields: 'username,name,profile_picture_url',
        access_token: token,
      }),
    );
    if (response.status !== 200) return {};
    const body = JSON.parse(response.body.toString('utf8'));
    return {
      username: body.username,
      fullName: body.name,
      avatar: body.profile_picture_url ? mediaPath(PROFILE_MEDIA_ID) : null,
    };
  } catch {
    /* the viewer falls back to the configured handle and initials */
    return {};
  }
}

/*
 * The walked feed, for the life of this server instance. Deliberately not a
 * file: see the note at the top of this module.
 */
let cache = null;

function readCache() {
  return cache?.posts?.length ? cache : null;
}

function writeCache(entry) {
  cache = entry;
}

/** Fresh page 1, replacing the cached walk. Throws if Meta cannot be reached. */
async function refreshFirstPage(token) {
  const [profile, page] = await Promise.all([fetchProfile(token), fetchPage(token, undefined)]);
  const posts = (
    await Promise.all(page.media.map((media) => toPost(media, profile, page.withComments)))
  ).filter(Boolean);

  const entry = {
    fetchedAt: Date.now(),
    pageSize: PAGE_SIZE,
    profile,
    posts,
    next: page.after,
    exhausted: !page.after,
  };
  if (posts.length) writeCache(entry);
  return entry;
}

/**
 * Fetch the page after `entry`'s cursor and append it, deduplicated by media id
 * — a shifted feed must never be able to show one post twice. Returns the new
 * entry; throws if Meta cannot be reached.
 */
async function appendNextPage(entry, token) {
  const page = await fetchPage(token, entry.next);
  const shaped = (
    await Promise.all(
      page.media.map((media) => toPost(media, entry.profile || {}, page.withComments)),
    )
  ).filter(Boolean);

  /* mandatory: never the same media id twice */
  const seen = new Set(entry.posts.map((post) => post.id));
  const next = {
    ...entry,
    posts: [...entry.posts, ...shaped.filter((post) => !seen.has(post.id))],
    next: page.after,
    exhausted: !page.after,
  };
  writeCache(next);
  return next;
}

/**
 * The first page for the section, plus whether a Load More is worth showing.
 *
 * Never throws — the homepage must render either way — and never returns
 * anything token-derived.
 */
export async function getInstagramFeed() {
  const cached = readCache();
  const fresh =
    cached && Date.now() - cached.fetchedAt < instagramConfig.cacheSeconds * 1000;

  let entry = cached;
  if (!fresh) {
    const token = process.env.META_ACCESS_TOKEN;
    if (token) {
      try {
        entry = await refreshFirstPage(token);
      } catch {
        /* Meta is down or the token is rejected: keep serving the stale entry */
      }
    }
  }

  if (!entry?.posts?.length) return { posts: [], hasMore: false };

  return {
    posts: entry.posts.slice(0, PAGE_SIZE),
    hasMore: entry.posts.length > PAGE_SIZE || Boolean(entry.next),
  };
}

/**
 * The next page after `offset` posts, for Load More.
 *
 * Pages already walked are served from the cache; beyond that it follows Meta's
 * `after` cursor — never a recomputed offset, and never the same page twice.
 * Posts already in the cache are deduplicated by media id before appending, so
 * a shifted feed cannot produce a repeat. Throws on failure so the caller can
 * keep the posts already on screen and offer a retry.
 *
 * The cache is in memory, so on a serverless platform this call can land on an
 * instance that has never built the feed. That is not a failure: page 1 is
 * rebuilt and the cursor walked forward until the requested offset is covered,
 * which costs one Graph call per page already on the visitor's screen. The old
 * on-disk cache made this an outright `no-feed` error on Vercel, since the file
 * it needed could never have been written.
 */
export async function getMoreInstagramPosts(offset) {
  const from = Number.isInteger(offset) && offset > 0 ? offset : 0;
  const token = process.env.META_ACCESS_TOKEN;
  let cached = readCache();

  /* cold instance: rebuild page 1 before anything else can be walked */
  if (!cached) {
    if (!token) throw new Error('no-token');
    cached = await refreshFirstPage(token);
    if (!cached.posts.length) throw new Error('no-feed');
  }

  /* and walk forward until the offset the client is showing is covered */
  while (cached.posts.length <= from && cached.next) {
    if (!token) throw new Error('no-token');
    cached = await appendNextPage(cached, token);
  }

  /* already walked this far — no Graph call needed */
  if (cached.posts.length > from) {
    return {
      posts: cached.posts.slice(from, from + PAGE_SIZE),
      hasMore: cached.posts.length > from + PAGE_SIZE || Boolean(cached.next),
    };
  }

  if (!cached.next) return { posts: [], hasMore: false };
  if (!token) throw new Error('no-token');

  const before = cached.posts.length;
  const entry = await appendNextPage(cached, token);

  return { posts: entry.posts.slice(before), hasMore: Boolean(entry.next) };
}
