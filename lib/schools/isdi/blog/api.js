import 'server-only';

/*
 * Atlas blog API — the live feed, reused exactly as the reference PHP does.
 *
 * Two endpoints, both used by the reference:
 *   - by-slug/{slug}   — one blog's full content   (reference/.../blog/index.php, the DETAIL page)
 *   - by-school/{school} — a school's blog cards    (reference/.../thought-leaderships/index.php, the LISTING)
 *
 * This is the same endpoint the ATLAS homepage Thought Leadership section draws from. Adding a blog
 * in the dashboard (JSON) therefore reflects on the site as soon as the feed is re-read — the blog
 * DETAIL pages already read it live, and the thought-leadership LISTINGS now do too (they used to be
 * a frozen snapshot, which is why only older posts showed).
 *
 * The base URL is configurable via the ATLAS_BLOGS_API_BASE environment variable so the deployment
 * can point at UAT or production without a code change; it defaults to the exact host the reference
 * PHP curls (uat-dashboard...). Set it in the environment to switch, e.g.
 *   ATLAS_BLOGS_API_BASE=https://dashboard.atlasskilltech.app/api/atlas-blogs
 */

const DEFAULT_API_BASE = 'https://uat-dashboard.atlasskilltech.app/api/atlas-blogs';
const API_BASE = (process.env.ATLAS_BLOGS_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, '');
const TIMEOUT_MS = 10000; // ref CURLOPT_TIMEOUT 10

/* Listing feed freshness. The reference curls per request (always fresh); we revalidate on a short
 * cadence so a newly-added blog appears within ~1 minute without an upstream call on every visit.
 * No token is ever in the request URL, so caching the response is safe. */
const LIST_REVALIDATE_S = 60;
const DETAIL_REVALIDATE_S = 900;

async function fetchJson(url, revalidate) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      next: { revalidate },
    });
    if (res.status === 404) return { ok: false, notfound: true };
    if (!res.ok) return { ok: false };
    try {
      return { ok: true, data: await res.json() };
    } catch {
      return { ok: false };
    }
  } catch {
    // network / timeout / abort
    return { ok: false };
  } finally {
    clearTimeout(t);
  }
}

/**
 * Fetch one published blog by slug for a given school.
 *
 * `school` defaults to `'isdi'` so the ISDI blog detail page is unchanged; the other blog routes
 * pass their own school. The reference `blog/index.php` validates the fetched blog against the URL's
 * school context (`candidate.school === currentSchool`) and `status === 'published'`, which this
 * mirrors exactly.
 * @returns {Promise<{status:'ok',blog:object}|{status:'notfound'}|{status:'error'}>}
 */
export async function getBlogBySlug(slug, school = 'isdi') {
  if (!slug || typeof slug !== 'string') return { status: 'notfound' };

  const r = await fetchJson(
    `${API_BASE}/by-slug/${encodeURIComponent(slug)}`,
    DETAIL_REVALIDATE_S
  );
  if (r.notfound) return { status: 'notfound' };
  if (!r.ok) return { status: 'error' };

  const candidate = r.data && r.data.success === true ? r.data.data : null;
  if (!candidate || candidate.school !== school || candidate.status !== 'published') {
    return { status: 'notfound' };
  }
  return { status: 'ok', blog: candidate };
}

/* The API's `link` is an absolute production URL (e.g. https://atlasuniversity.edu.in/atlas-blog/x
 * or .../schools/isme/blog/x). Keep only the path so the card opens the local detail route instead
 * of leaving the site — the same local paths the previous snapshot used. */
function localHref(link) {
  if (!link || typeof link !== 'string') return '#';
  try {
    const u = new URL(link, 'https://atlasuniversity.edu.in');
    return u.pathname.replace(/\/+$/, '') || '#';
  } catch {
    return '#';
  }
}

/**
 * Fetch the published blog cards for a school's Thought-Leadership listing.
 *
 * Mirrors reference/.../thought-leaderships/index.php: curl `by-school/{school}`, require
 * `success === true`, then keep only cards whose `status === 'published'` and `school === {school}`.
 * Cards are normalised to `{ title, date, href, image, alt }` — `date` from `date_label`, `alt` from
 * `alt_text`, `href` from the `link` path, `image` the CMS's own URL (a stable, public, token-free
 * URL, used directly as the reference does).
 *
 * @returns {Promise<{status:'ok',cards:Array}|{status:'error',cards:[]}>}
 */
export async function getBlogsBySchool(school) {
  if (!school || typeof school !== 'string') return { status: 'error', cards: [] };

  const r = await fetchJson(
    `${API_BASE}/by-school/${encodeURIComponent(school)}`,
    LIST_REVALIDATE_S
  );
  if (!r.ok || !r.data || r.data.success !== true || !Array.isArray(r.data.data)) {
    return { status: 'error', cards: [] };
  }

  const cards = r.data.data
    .filter((c) => c && c.status === 'published' && c.school === school)
    .map((c) => ({
      title: c.title ?? '',
      date: c.date_label ?? '',
      href: localHref(c.link),
      image: c.image ?? '',
      alt: c.alt_text ?? '',
    }));

  return { status: 'ok', cards };
}
