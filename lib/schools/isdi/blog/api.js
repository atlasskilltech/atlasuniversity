import 'server-only';

/*
 * ISDI blog detail — the live Atlas blog API, reused exactly as the reference does.
 *
 * ref reference/schools/isdi/blog/index.php: the page is a blog DETAIL template (the
 * listing is /schools/isdi/thought-leaderships). It reads the slug from the clean URL,
 * curls `atlas-blogs/by-slug/{slug}`, and renders a single published blog whose `school`
 * matches the page's school ("isdi" here). This is the same endpoint the thought-leaderships
 * listing and the ATLAS homepage Thought Leadership section draw from — no new API, no new
 * infrastructure. The feed is UAT.
 *
 * Validation mirrors the PHP exactly: HTTP 200, `success === true`, non-empty `data`,
 * `data.school === "isdi"`, and `data.status === "published"` — anything else is "not found".
 */

const API_BASE = 'https://uat-dashboard.atlasskilltech.app/api/atlas-blogs';
const SCHOOL = 'isdi';
const TIMEOUT_MS = 10000; // ref CURLOPT_TIMEOUT 10

/**
 * Fetch one published ISDI blog by slug.
 * @returns {Promise<{status:'ok',blog:object}|{status:'notfound'}|{status:'error'}>}
 */
export async function getBlogBySlug(slug) {
  if (!slug || typeof slug !== 'string') return { status: 'notfound' };

  const url = `${API_BASE}/by-slug/${encodeURIComponent(slug)}`;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
      // Keep the detail fresh without freezing it into the build, the same 15-min
      // cadence the homepage feed uses. This also keeps the fetch out of `no-store`,
      // so a transient slug still revalidates rather than refetching on every hit.
      next: { revalidate: 900 },
    });
  } catch {
    // network / timeout / abort — distinct from "not found"
    return { status: 'error' };
  } finally {
    clearTimeout(t);
  }

  if (res.status === 404) return { status: 'notfound' };
  if (!res.ok) return { status: 'error' };

  let data;
  try {
    data = await res.json();
  } catch {
    return { status: 'error' };
  }

  const candidate = data && data.success === true ? data.data : null;
  if (
    !candidate ||
    candidate.school !== SCHOOL ||
    candidate.status !== 'published'
  ) {
    return { status: 'notfound' };
  }

  return { status: 'ok', blog: candidate };
}
