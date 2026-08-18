import 'server-only';

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { instagramConfig } from '@/lib/instagram/config';
import { httpGet } from '@/lib/instagram/httpGet';
import { imageSize } from '@/lib/instagram/imageSize';

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
 * visitor clicking Load More is served from disk instead of hitting Meta again.
 * A stale entry is refreshed; if the refresh fails the stale entry is still
 * served, because a real-but-old grid beats an empty section. Refreshing page 1
 * resets the walk: newer posts shift everything, so an old cursor would tear.
 */

const CACHE_DIR = path.join(process.cwd(), 'public', 'assets', 'images', 'instagram');
const CACHE_FILE = path.join(CACHE_DIR, 'feed.json');

/*
 * Media is served through a route handler rather than as a plain public asset:
 * `next start` snapshots `public/` at boot and 404s anything written later, which
 * would break every image Load More downloads at runtime. See
 * app/instagram-media/[name]/route.js — the files still live in CACHE_DIR.
 */
const PUBLIC_BASE = '/instagram-media';

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
 * Download `remoteUrl` into the cache dir and return `{ src, width, height }`
 * with a **local** path, or `null`. Never returns a remote URL: an expiring
 * fbcdn URL in the HTML is exactly the failure mode the reference's thumbnail
 * cache exists to avoid.
 *
 * The filename is keyed on the media id, `social_cache/thumbs/<id>.jpg` style,
 * and NOT on the remote URL. Meta re-signs its CDN URLs on every read, so
 * hashing the URL would write a fresh copy of the same unchanged frame on every
 * refresh and grow the directory without bound. A media id's bytes never change,
 * so a hit is reused as-is; `revalidate` is for the profile picture, which can.
 */
async function cacheMedia(remoteUrl, key, { revalidate = false } = {}) {
  if (!instagramConfig.cacheThumbnails || !remoteUrl) return null;
  const name = `${key}.jpg`;
  const file = path.join(CACHE_DIR, name);
  const src = `${PUBLIC_BASE}/${name}`;

  let existing = null;
  try {
    existing = await readFile(file);
    if (!revalidate) return { src, ...(imageSize(existing) || {}) };
  } catch {
    /* not cached yet — fall through and fetch it */
  }

  try {
    const { status, body: buffer } = await httpGet(remoteUrl);
    if (status !== 200 || !buffer.length) throw new Error('unavailable');
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(file, buffer);
    return { src, ...(imageSize(buffer) || {}) };
  } catch {
    /* read-only filesystem or network error: an already-cached copy still
       beats nothing, otherwise the caller drops this item */
    return existing ? { src, ...(imageSize(existing) || {}) } : null;
  }
}

/**
 * The still image for one media item, whatever its type.
 *   IMAGE  media_url
 *   VIDEO  thumbnail_url — the poster frame. The reference never autoplays and
 *          neither does this; `media_url` is only a last resort so a video with
 *          no poster still shows something rather than nothing.
 */
function stillUrl(media) {
  if (media.media_type === 'VIDEO') return media.thumbnail_url || media.media_url;
  return media.media_url || media.thumbnail_url;
}

/** One slide of the viewer: a local image plus its real dimensions. */
async function toSlide(media, index) {
  const cached = await cacheMedia(stillUrl(media), `${media.id || 'slide'}-${index}`);
  if (!cached) return null;
  return {
    id: media.id || `slide-${index}`,
    type: media.media_type === 'VIDEO' ? 'VIDEO' : 'IMAGE',
    image: cached.src,
    width: cached.width ?? null,
    height: cached.height ?? null,
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

/** Handle, display name and locally cached avatar — one call per refresh. */
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
    const avatar = await cacheMedia(
      body.profile_picture_url,
      `profile-${instagramConfig.businessId}`,
      /* the account can change its picture; this only runs on a real refresh */
      { revalidate: true },
    );
    return { username: body.username, fullName: body.name, avatar: avatar?.src || null };
  } catch {
    /* the viewer falls back to the configured handle and initials */
    return {};
  }
}

async function readCache() {
  try {
    const parsed = JSON.parse(await readFile(CACHE_FILE, 'utf8'));
    if (!Array.isArray(parsed?.posts) || !parsed.posts.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function writeCache(entry) {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(CACHE_FILE, JSON.stringify(entry, null, 1), 'utf8');
  } catch {
    /* non-fatal: we just refetch next time */
  }
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
  if (posts.length) await writeCache(entry);
  return entry;
}

/**
 * The first page for the section, plus whether a Load More is worth showing.
 *
 * Never throws — the homepage must render either way — and never returns
 * anything token-derived.
 */
export async function getInstagramFeed() {
  const cached = await readCache();
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
 */
export async function getMoreInstagramPosts(offset) {
  const from = Number.isInteger(offset) && offset > 0 ? offset : 0;
  const cached = await readCache();
  if (!cached) throw new Error('no-feed');

  /* already walked this far — no Graph call needed */
  if (cached.posts.length > from) {
    return {
      posts: cached.posts.slice(from, from + PAGE_SIZE),
      hasMore: cached.posts.length > from + PAGE_SIZE || Boolean(cached.next),
    };
  }

  if (!cached.next) return { posts: [], hasMore: false };

  const token = process.env.META_ACCESS_TOKEN;
  if (!token) throw new Error('no-token');

  const page = await fetchPage(token, cached.next);
  const shaped = (
    await Promise.all(
      page.media.map((media) => toPost(media, cached.profile || {}, page.withComments)),
    )
  ).filter(Boolean);

  /* mandatory: never the same media id twice */
  const seen = new Set(cached.posts.map((post) => post.id));
  const added = shaped.filter((post) => !seen.has(post.id));

  const entry = {
    ...cached,
    posts: [...cached.posts, ...added],
    next: page.after,
    exhausted: !page.after,
  };
  await writeCache(entry);

  return { posts: added, hasMore: Boolean(page.after) };
}
