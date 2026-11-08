/**
 * ATLAS News CMS — input validation. PURE: no database, no Next.js, so the unit tests cover every rule.
 *
 * Each `validate…` returns `{ value, errors }`. `errors` maps a field name to one human-readable message
 * (shown next to that field in the admin); `value` is the normalised input the service layer writes.
 * The service layer adds the checks that need the database (slug uniqueness, the 8-category menu limit,
 * referenced rows existing).
 */
import { DEFAULT_AUTHOR_NAME, MAX_MENU_CATEGORIES } from '../config.js';
import { sanitizeArticleHtml, sanitizePlainText, slugify, validateSlug } from '../content/sanitize.js';

export const ARTICLE_STATUSES = Object.freeze(['draft', 'scheduled', 'published']);

/* ------------------------------------------------------------------------------------ homepage */

/**
 * Homepage zones, in page order. `positions` are the fixed `atlasnews_homepage_slots.position` values each
 * zone owns: position is the table's primary key (globally unique), so every zone has its own range and
 * the order inside a zone is the order of its positions. `max` = how many stories the zone shows.
 */
export const HOMEPAGE_ZONES = Object.freeze([
  { zone: 'hero_centre', label: 'Hero — centre (lead story)', max: 1, base: 1 },
  { zone: 'hero_left', label: 'Hero — left column', max: 2, base: 2 },
  { zone: 'hero_right', label: 'Hero — right column', max: 2, base: 4 },
  { zone: 'featured', label: 'Featured', max: 1, base: 10 },
  { zone: 'picks', label: "Editor's Picks", max: 5, base: 20 },
]);
export const HOMEPAGE_ZONE_NAMES = Object.freeze(HOMEPAGE_ZONES.map((z) => z.zone));
export const zoneLabel = (zone) => HOMEPAGE_ZONES.find((z) => z.zone === zone)?.label || zone;
/** position → zone, for rows read back from the table */
export const positionFor = (zone, index) => HOMEPAGE_ZONES.find((z) => z.zone === zone).base + index;

/* ------------------------------------------------------------------------------------ helpers */

const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
const text = (v, max) => sanitizePlainText(typeof v === 'string' ? v : '', max);
const optText = (v, max) => text(v, max) || null;
/** A positive integer id, or null. Strings of digits are accepted (form values). */
export function toId(v) {
  if (v === null || v === undefined || v === '') return null;
  const n = typeof v === 'number' ? v : /^\d{1,15}$/.test(String(v)) ? Number(v) : NaN;
  return Number.isSafeInteger(n) && n > 0 ? n : NaN;
}
const bool = (v) => v === true || v === 1 || v === '1' || v === 'true' || v === 'on';

/** ISO 8601 (with an explicit offset or Z) → Date, or null for empty, or NaN-date for garbage. */
export function parseDate(v) {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/.test(v)) return new Date(NaN);
  return new Date(v);
}
const validDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

const SLUG_MESSAGES = {
  empty: 'Enter a slug.',
  too_long: 'The slug is too long.',
  reserved: 'That slug is reserved for a News page. Choose another.',
  invalid_characters: 'Use lower-case letters, numbers and single hyphens only (e.g. "new-campus-opens").',
};

/**
 * Slug for a post or category. Empty → generated from `fallback` (the title or name). A slug equal to
 * `currentSlug` is accepted as-is even if it is a percent-encoded WordPress slug, so editing an imported
 * article never forces its URL to change.
 */
export function normaliseSlug(raw, { fallback, currentSlug = null, maxLength }) {
  let slug = typeof raw === 'string' ? raw.trim() : '';
  if (currentSlug && slug === currentSlug) return { slug };
  if (!slug) slug = slugify(fallback, Math.min(maxLength, 120));
  else slug = slug.toLowerCase();
  if (!slug) return { error: 'Enter a slug, or a title it can be made from.' };
  const v = validateSlug(slug, { maxLength });
  return v.ok ? { slug } : { error: SLUG_MESSAGES[v.reason] || 'Invalid slug.' };
}

/**
 * Canonical URL override: empty (use the article's own URL), an absolute https URL, or a site-relative
 * path. Nothing else — a canonical pointing at javascript: or another scheme is refused.
 */
export function normaliseCanonical(raw) {
  const v = typeof raw === 'string' ? raw.trim() : '';
  if (!v) return { value: null };
  if (v.length > 600) return { error: 'The canonical URL is too long (600 characters at most).' };
  if (/^\/(?!\/)[^\s]*$/.test(v)) return { value: v };
  try {
    const u = new URL(v);
    if (u.protocol === 'https:' && !u.username && !u.password) return { value: u.toString() };
  } catch {
    /* fall through */
  }
  return { error: 'Use a full https:// address or a path starting with "/".' };
}

/* ------------------------------------------------------------------------------------ articles */

/** Upper bound for a stored body (MEDIUMTEXT holds 16 MB; nothing editorial comes close to 2 MB). */
export const MAX_CONTENT_BYTES = 2 * 1024 * 1024;

/**
 * Validate an article submitted from the editor.
 *   input: { title, slug, excerpt, contentHtml, status, publishedAt, featuredMediaId, ogMediaId,
 *            categoryIds, primaryCategoryId, authorName, seoTitle, seoDescription, canonicalUrl }
 *   opts:  { now: Date, currentSlug }
 * Status rules:
 *   draft      — only the title is required; publishedAt is kept if given (it is the planned date).
 *   published  — publishedAt defaults to now and may not be in the future (that is "scheduled").
 *   scheduled  — publishedAt is required and must be in the future.
 *   published/scheduled additionally need a body and at least one category.
 */
export function validateArticle(input, { now = new Date(), currentSlug = null } = {}) {
  const errors = {};
  if (!isObj(input)) return { value: null, errors: { _: 'Send the article as a JSON object.' } };

  const title = text(input.title, 500);
  if (!title) errors.title = 'Enter a title.';

  const s = normaliseSlug(input.slug, { fallback: title, currentSlug, maxLength: 400 });
  if (s.error) errors.slug = s.error;

  const excerpt = optText(input.excerpt, 1000);

  const rawHtml = typeof input.contentHtml === 'string' ? input.contentHtml : '';
  let contentHtml = '';
  if (Buffer.byteLength(rawHtml, 'utf8') > MAX_CONTENT_BYTES) errors.contentHtml = 'The article body is too large.';
  else contentHtml = sanitizeArticleHtml(rawHtml);

  const status = ARTICLE_STATUSES.includes(input.status) ? input.status : null;
  if (!status) errors.status = 'Choose draft, scheduled or published.';

  let publishedAt = parseDate(input.publishedAt);
  if (publishedAt && !validDate(publishedAt)) {
    errors.publishedAt = 'Enter a valid date and time.';
    publishedAt = null;
  }
  if (status === 'published') {
    if (!publishedAt) publishedAt = new Date(now);
    else if (publishedAt.getTime() > now.getTime() + 60_000) errors.publishedAt = 'That date is in the future — choose "Scheduled" to publish it later.';
  }
  if (status === 'scheduled') {
    if (!publishedAt) errors.publishedAt = 'Choose when the article should be published.';
    else if (publishedAt.getTime() <= now.getTime()) errors.publishedAt = 'A scheduled date must be in the future. To publish now, choose "Published".';
  }

  const ids = (field) => {
    const id = toId(input[field]);
    if (Number.isNaN(id)) errors[field] = 'Invalid selection.';
    return Number.isNaN(id) ? null : id;
  };
  const featuredMediaId = ids('featuredMediaId');
  const ogMediaId = ids('ogMediaId');

  let categoryIds = [];
  if (input.categoryIds !== undefined && !Array.isArray(input.categoryIds)) errors.categoryIds = 'Invalid categories.';
  else {
    const parsed = (input.categoryIds || []).map(toId);
    if (parsed.some((x) => x === null || Number.isNaN(x))) errors.categoryIds = 'Invalid categories.';
    else categoryIds = [...new Set(parsed)];
  }
  if (categoryIds.length > 20) errors.categoryIds = 'Choose at most 20 categories.';
  let primaryCategoryId = ids('primaryCategoryId');
  if (primaryCategoryId && !categoryIds.includes(primaryCategoryId)) categoryIds.unshift(primaryCategoryId);
  if (!primaryCategoryId) primaryCategoryId = categoryIds[0] || null;

  if (status && status !== 'draft') {
    if (!contentHtml) errors.contentHtml = errors.contentHtml || 'Write the article before publishing it.';
    if (!categoryIds.length) errors.categoryIds = errors.categoryIds || 'Choose at least one category before publishing.';
  }

  const authorName = text(input.authorName, 150) || DEFAULT_AUTHOR_NAME;
  const seoTitle = optText(input.seoTitle, 255);
  const seoDescription = optText(input.seoDescription, 500);
  const canonical = normaliseCanonical(input.canonicalUrl);
  if (canonical.error) errors.canonicalUrl = canonical.error;

  return {
    errors,
    value: {
      title, slug: s.slug || null, excerpt, contentHtml, status, publishedAt, featuredMediaId, ogMediaId,
      categoryIds, primaryCategoryId, authorName, seoTitle, seoDescription, canonicalUrl: canonical.value ?? null,
    },
  };
}

/* ------------------------------------------------------------------------------------ categories */

/** input: { name, slug, description, showInMenu, menuOrder, isFeatured, imageMediaId, seoTitle, seoDescription } */
export function validateCategory(input, { currentSlug = null } = {}) {
  const errors = {};
  if (!isObj(input)) return { value: null, errors: { _: 'Send the category as a JSON object.' } };
  const name = text(input.name, 200);
  if (!name) errors.name = 'Enter a name.';
  const s = normaliseSlug(input.slug, { fallback: name, currentSlug, maxLength: 200 });
  if (s.error) errors.slug = s.error;
  let menuOrder = null;
  if (input.menuOrder !== null && input.menuOrder !== undefined && input.menuOrder !== '') {
    menuOrder = Number(input.menuOrder);
    if (!Number.isInteger(menuOrder) || menuOrder < 0 || menuOrder > 999) {
      errors.menuOrder = 'Use a whole number from 0 to 999.';
      menuOrder = null;
    }
  }
  const imageMediaId = toId(input.imageMediaId);
  if (Number.isNaN(imageMediaId)) errors.imageMediaId = 'Invalid image.';
  return {
    errors,
    value: {
      name, slug: s.slug || null, description: optText(input.description, 2000), showInMenu: bool(input.showInMenu), menuOrder,
      isFeatured: bool(input.isFeatured), imageMediaId: Number.isNaN(imageMediaId) ? null : imageMediaId,
      seoTitle: optText(input.seoTitle, 255), seoDescription: optText(input.seoDescription, 500),
    },
  };
}
export { MAX_MENU_CATEGORIES };

/* ------------------------------------------------------------------------------------ homepage */

/**
 * input: { zones: { hero_centre: [postId], hero_left: [id, id], … } } — ids in display order.
 * Rejects unknown zones, over-capacity zones and — the approved rule — the same article in two slots.
 * `titles` (optional Map id → title) makes the duplicate message name the article.
 * Returns value = [{ zone, position, postId }].
 */
export function validateHomepage(input, { titles = new Map() } = {}) {
  const errors = {};
  if (!isObj(input) || !isObj(input.zones)) return { value: null, errors: { _: 'Send { zones: { zone: [articleId, …] } }.' } };
  for (const key of Object.keys(input.zones)) {
    if (!HOMEPAGE_ZONE_NAMES.includes(key)) errors[key] = `Unknown homepage area "${String(key).slice(0, 40)}".`;
  }
  const value = [];
  const seen = new Map(); // postId → zone
  for (const z of HOMEPAGE_ZONES) {
    const list = input.zones[z.zone] ?? [];
    if (!Array.isArray(list)) {
      errors[z.zone] = 'Invalid list.';
      continue;
    }
    if (list.length > z.max) {
      errors[z.zone] = `${z.label} holds at most ${z.max} ${z.max === 1 ? 'article' : 'articles'}.`;
      continue;
    }
    list.forEach((raw, i) => {
      const postId = toId(raw);
      if (!postId || Number.isNaN(postId)) {
        errors[z.zone] = 'Invalid article.';
        return;
      }
      if (seen.has(postId)) {
        const name = titles.get(postId) ? `“${titles.get(postId)}”` : `Article #${postId}`;
        errors[z.zone] = `${name} is already placed in ${zoneLabel(seen.get(postId))}. An article can occupy only one homepage slot — remove it there first.`;
        return;
      }
      seen.set(postId, z.zone);
      value.push({ zone: z.zone, position: z.base + i, postId });
    });
  }
  return { value, errors };
}

/* ------------------------------------------------------------------------------------ media */

export function validateMediaMeta(input) {
  if (!isObj(input)) return { value: null, errors: { _: 'Send { alt, caption }.' } };
  return { errors: {}, value: { alt: optText(input.alt, 500), caption: optText(input.caption, 2000) } };
}

/* ------------------------------------------------------------------------------------ list queries */

export const ARTICLE_SORTS = Object.freeze({
  updated: 'p.updated_at DESC, p.id DESC',
  published: 'p.published_at IS NULL, p.published_at DESC, p.id DESC',
  created: 'p.created_at DESC, p.id DESC',
  title: 'p.title ASC, p.id ASC',
});
export const ARTICLE_FILTERS = Object.freeze(['all', 'live', 'scheduled', 'draft', 'trash']);

/** Normalise list parameters from a URLSearchParams or plain object. */
export function listParams(params, { maxPageSize = 100, defaultPageSize = 20 } = {}) {
  const get = (k) => (typeof params?.get === 'function' ? params.get(k) : params?.[k]) ?? '';
  const page = Math.max(1, Math.min(10_000, Number.parseInt(get('page'), 10) || 1));
  const pageSize = Math.max(1, Math.min(maxPageSize, Number.parseInt(get('pageSize'), 10) || defaultPageSize));
  const q = sanitizePlainText(String(get('q')), 200);
  const filter = ARTICLE_FILTERS.includes(get('filter')) ? get('filter') : 'all';
  const sort = Object.hasOwn(ARTICLE_SORTS, get('sort')) ? get('sort') : 'updated';
  const categoryId = toId(get('category'));
  return { page, pageSize, q, filter, sort, categoryId: Number.isNaN(categoryId) ? null : categoryId };
}

/** Escape a user search string for a LIKE pattern (the value is still bound as a parameter). */
export const likePattern = (q) => `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
