import 'server-only';

/*
 * Atlas blog API — the live dashboard feed, used exactly as the reference PHP does.
 *
 * Three endpoints, all used by the reference:
 *   - GET /                  — the 20 newest published blogs across every school
 *                              (reference/index.php — the HOMEPAGE "Thought Leadership" carousel)
 *   - GET /by-school/{school} — one school's blog cards
 *                              (reference/.../thought-leaderships/index.php — the five LISTINGS)
 *   - GET /by-slug/{slug}     — one blog's full content (reference/.../blog/index.php — the DETAIL pages)
 *
 * Verified against the live API on 2026-11-12 (dashboard.atlasskilltech.app and the reference's
 * uat-dashboard host return byte-identical responses):
 *   - envelope `{ success: true, count, data: [...] }`; an unknown school is `success: true, count: 0`;
 *   - every item carries blog_id, title, slug, author, school, date_label ("November, 2026"),
 *     published_date (null on every item), link (absolute production URL), image (absolute URL on
 *     atlasuniversity.edu.in), alt_text, status, created_at, updated_at;
 *   - the API already returns only `status === 'published'` (`?status=draft` answers 0 items) and
 *     orders by blog_id descending, i.e. newest first. There is no pagination: by-school returns the
 *     school's whole list, the root returns 20.
 * The `status` / `school` checks below are kept anyway, because the reference makes them.
 *
 * FRESHNESS. Every request is cached in Next's Data Cache for BLOG_REVALIDATE_S seconds and tagged
 * `atlas-blogs` (+ `atlas-blogs:<school>`), and every page that renders the feed exports the same
 * `revalidate`. So a create / edit / publish / unpublish / delete in the dashboard reaches the
 * homepage, every listing and the detail page within about a minute — stale-while-revalidate: the
 * first request after the window still gets the previous render and triggers a background refresh.
 * The tags exist so a dashboard webhook can later call `revalidateTag('atlas-blogs')` for an instant
 * refresh; the dashboard does not offer one today (see the Thought Leadership notes in CLAUDE.md).
 *
 * FAILURE. A failed or malformed response is NEVER replaced by an old snapshot at runtime: the page
 * throws (see `feedOrThrow`), and Next keeps serving the last successfully generated page and retries
 * on the next request. Only a BUILD that cannot reach the API falls back to the bundled snapshot, and
 * says so in the server log and in a `data-blog-source="snapshot"` attribute on the section.
 *
 * The base URL is configurable via ATLAS_BLOGS_API_BASE (server-only; no credential is involved —
 * the feed is public and no token is ever put in the URL).
 */

const DEFAULT_API_BASE = 'https://dashboard.atlasskilltech.app/api/atlas-blogs';
const API_BASE = (process.env.ATLAS_BLOGS_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, '');
const TIMEOUT_MS = 10000; // ref CURLOPT_TIMEOUT 10
const SITE = 'https://atlasuniversity.edu.in';

/** Seconds a feed response is reused before it is re-read. Pages export the same value. */
export const BLOG_REVALIDATE_S = 60;
/** Cache tag on every feed request — `revalidateTag(BLOG_CACHE_TAG)` refreshes them all. */
export const BLOG_CACHE_TAG = 'atlas-blogs';

export const BLOG_SCHOOLS = ['atlas', 'isdi', 'isme', 'ugdx', 'law'];
const HOME_LIMIT = 20; // ref index.php array_slice(…, 0, 20)

async function fetchJson(url, tags) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      next: { revalidate: BLOG_REVALIDATE_S, tags: [BLOG_CACHE_TAG, ...tags] },
    });
    if (res.status === 404) return { ok: false, notfound: true, reason: 'HTTP 404' };
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    try {
      return { ok: true, data: await res.json() };
    } catch {
      return { ok: false, reason: 'invalid JSON' };
    }
  } catch (err) {
    return { ok: false, reason: err?.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : 'network error' };
  } finally {
    clearTimeout(t);
  }
}

function warn(endpoint, reason) {
  // Server log only. The endpoint is public; nothing secret is printed.
  console.warn(`[atlas-blogs] ${endpoint} unavailable: ${reason}`);
}

/* The detail route each school's blogs live under on this site (ref the `link` paths). */
function detailPath(school, slug) {
  if (!slug) return null;
  const s = encodeURIComponent(slug);
  return school === 'atlas' ? `/atlas-blog/${s}` : `/schools/${school}/blog/${s}`;
}

/* The API's `link` is an absolute production URL (https://atlasuniversity.edu.in/atlas-blog/x or
 * …/schools/isme/blog/x). Keep only its path so the card opens the local detail route. A link that
 * is missing, malformed or points at another host falls back to the route built from the slug. */
function cardHref(item) {
  const link = typeof item.link === 'string' ? item.link.trim() : '';
  if (link) {
    try {
      const u = new URL(link, SITE);
      const path = u.pathname.replace(/\/+$/, '');
      if (u.hostname.replace(/^www\./, '') === 'atlasuniversity.edu.in' && /^\/(atlas-blog|schools\/[a-z]+\/blog)\/[^/]+$/.test(path)) {
        return path;
      }
    } catch {
      /* fall through */
    }
  }
  return detailPath(item.school, typeof item.slug === 'string' ? item.slug.trim() : '');
}

function imageUrl(src) {
  if (typeof src !== 'string' || !src.trim()) return '';
  try {
    const u = new URL(src.trim(), SITE);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : '';
  } catch {
    return '';
  }
}

/**
 * Turn raw feed items into cards `{ id, title, date, href, image, alt, school }`, in the API's own
 * order (newest first). Drops anything unpublished, any item of the wrong school, anything with no
 * title or no usable link, and duplicates (by blog_id, then by href).
 */
function toCards(items, school) {
  const seen = new Set();
  const cards = [];
  for (const c of items) {
    if (!c || typeof c !== 'object' || c.status !== 'published') continue;
    if (school && c.school !== school) continue;
    if (!school && !BLOG_SCHOOLS.includes(c.school)) continue;
    const title = typeof c.title === 'string' ? c.title.trim() : '';
    const href = cardHref(c);
    if (!title || !href) continue;
    const key = c.blog_id != null ? `id:${c.blog_id}` : `href:${href}`;
    if (seen.has(key) || seen.has(`href:${href}`)) continue;
    seen.add(key);
    seen.add(`href:${href}`);
    cards.push({
      id: c.blog_id ?? href,
      title,
      date: typeof c.date_label === 'string' ? c.date_label.trim() : '',
      href,
      image: imageUrl(c.image),
      alt: typeof c.alt_text === 'string' ? c.alt_text : '',
      school: c.school,
    });
  }
  return cards;
}

async function getCards(endpoint, tags, school, limit) {
  const r = await fetchJson(`${API_BASE}${endpoint}`, tags);
  if (!r.ok) {
    warn(endpoint || '/', r.reason);
    return { status: 'error', cards: [] };
  }
  if (!r.data || r.data.success !== true || !Array.isArray(r.data.data)) {
    warn(endpoint || '/', 'unexpected response shape');
    return { status: 'error', cards: [] };
  }
  const cards = toCards(r.data.data, school);
  return { status: 'ok', cards: limit ? cards.slice(0, limit) : cards };
}

/**
 * The homepage carousel: ref index.php curls the root endpoint, keeps `status === 'published'` and
 * slices to 20.
 * @returns {Promise<{status:'ok'|'error', cards:Array}>}
 */
export function getLatestBlogs() {
  return getCards('', ['atlas-blogs:latest'], null, HOME_LIMIT);
}

/**
 * One school's listing: ref thought-leaderships/index.php curls `by-school/{school}` and keeps cards
 * whose `status === 'published'` and `school === {school}`.
 * @returns {Promise<{status:'ok'|'error', cards:Array}>}
 */
export function getBlogsBySchool(school) {
  if (!BLOG_SCHOOLS.includes(school)) return Promise.resolve({ status: 'error', cards: [] });
  return getCards(`/by-school/${encodeURIComponent(school)}`, [`atlas-blogs:${school}`], school);
}

/**
 * Which cards a page renders. A good response is always used as is — even an empty one, so
 * unpublishing a school's last blog really empties its listing. A failed response:
 *   - during `next build` → the bundled snapshot, logged and marked `source: 'snapshot'`, so a build
 *     never fails just because the dashboard is down;
 *   - at runtime → throws. Next then keeps serving the last successfully generated page (ISR) and
 *     retries on the next request, instead of swapping current blogs for months-old ones.
 * @returns {{cards:Array, source:'live'|'snapshot'}}
 */
export function feedOrThrow(result, snapshot, label) {
  if (result.status === 'ok') return { cards: result.cards, source: 'live' };
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    console.warn(`[atlas-blogs] ${label}: feed unavailable at build time — rendering the bundled snapshot`);
    return { cards: snapshot, source: 'snapshot' };
  }
  throw new Error(`[atlas-blogs] ${label}: feed unavailable — keeping the previously generated page`);
}

/**
 * Fetch one published blog by slug for a given school.
 *
 * `school` defaults to `'isdi'` so the ISDI blog detail page is unchanged; the other blog routes
 * pass their own school. The reference `blog/index.php` validates the fetched blog against the URL's
 * school context (`candidate.school === currentSchool`) and `status === 'published'`, which this
 * mirrors exactly — so an unpublished, deleted or moved blog becomes "not found" within
 * BLOG_REVALIDATE_S.
 * @returns {Promise<{status:'ok',blog:object}|{status:'notfound'}|{status:'error'}>}
 */
export async function getBlogBySlug(slug, school = 'isdi') {
  if (!slug || typeof slug !== 'string') return { status: 'notfound' };

  const endpoint = `/by-slug/${encodeURIComponent(slug)}`;
  const r = await fetchJson(`${API_BASE}${endpoint}`, [`atlas-blogs:${school}`]);
  if (r.notfound) return { status: 'notfound' };
  if (!r.ok) {
    warn(endpoint, r.reason);
    return { status: 'error' };
  }

  const candidate = r.data && r.data.success === true ? r.data.data : null;
  if (!candidate || candidate.school !== school || candidate.status !== 'published') {
    return { status: 'notfound' };
  }
  return { status: 'ok', blog: candidate };
}
