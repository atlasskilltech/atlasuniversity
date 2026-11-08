/**
 * ATLAS News — the public read model's SQL (Phase D). PURE DATABASE CODE: no Next.js, so the database
 * tests call it directly. The pages never import this file — they import ./repository.js, which wraps
 * every function here in Next's data cache.
 *
 * VISIBILITY — the one rule every query below applies (`LIVE`):
 *     not in Trash  AND  status is published or scheduled  AND  published_at has passed (UTC)
 * Drafts never appear; a scheduled article appears the moment its time passes (no cron). Nothing here
 * returns a draft, a future-dated article or a trashed one, by slug or in any list.
 *
 * Shapes (unchanged from Stage 2, so no component changes):
 *   Article  { slug, url, title, excerpt, contentHtml, publishedAt, updatedAt, authorName, readingMinutes,
 *              image: { src, width, height, alt, caption } | null, category, categories,
 *              seoTitle, seoDescription, canonicalUrl, ogImage }
 *   Category { slug, name, description, url, seoTitle, seoDescription }
 */
import { MAX_MENU_CATEGORIES, T } from '../config.js';
import { query } from '../db/pool.js';
import { getSetting, SETTING } from '../db/settings.js';
import { shapeMediaRow } from '../media/shape.js';

export const CATEGORY_PAGE_SIZE = 6;
const WORDS_PER_MINUTE = 225;
/** stories either side of the lead in the hero */
const HERO_SIDE = 2;

export const LIVE = `p.deleted_at IS NULL AND p.status <> 'draft' AND p.published_at IS NOT NULL AND p.published_at <= UTC_TIMESTAMP(3)`;
const COLS = `p.id, p.slug, p.title, p.excerpt, p.content_html, p.published_at, p.updated_at, p.author_name, p.seo_title,
  p.seo_description, p.canonical_url, p.primary_category_id, p.featured_media_id, p.og_media_id`;

/* ------------------------------------------------------------------------------------ urls + text */

export const articleUrl = (slug) => `/news/${slug}`;
export const categoryUrl = (slug, page = 1) => (page > 1 ? `/news/category/${slug}/page/${page}` : `/news/category/${slug}`);

function plainText(html) {
  return String(html || '')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
export function readingMinutes(html) {
  const words = plainText(html).split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

/* ------------------------------------------------------------------------------------ mapping */

export const mapCategory = (c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description || '',
  url: categoryUrl(c.slug),
  seoTitle: c.seo_title || null,
  seoDescription: c.seo_description || null,
});

/** A media row → the image object the public components take (the largest web rendition, ≤1600 px). */
export function publicImage(row) {
  const m = shapeMediaRow(row);
  if (!m) return null;
  const v = m.variants.find((x) => x.name === 'article') || m.variants.find((x) => x.name === 'full');
  return { src: v?.url || m.url, width: v?.width || m.width || 1600, height: v?.height || m.height || 900, alt: m.alt || '', caption: m.caption || '' };
}

/**
 * Rows → Articles, with their categories and images fetched in two batched queries.
 * `withBody` keeps contentHtml (the article page); lists drop it after computing the reading time.
 */
async function hydrate(rows, { withBody = false } = {}) {
  if (!rows.length) return [];
  const ids = rows.map((r) => r.id);
  const mediaIds = [...new Set(rows.flatMap((r) => [r.featured_media_id, r.og_media_id]).filter(Boolean))];
  const [cats, media] = await Promise.all([
    query(
      `SELECT pc.post_id, c.* FROM ${T.postCategories} pc JOIN ${T.categories} c ON c.id = pc.category_id
        WHERE pc.post_id IN (${ids.map(() => '?').join(',')}) ORDER BY c.menu_order IS NULL, c.menu_order, c.name`,
      ids,
    ),
    mediaIds.length ? query(`SELECT * FROM ${T.media} WHERE id IN (${mediaIds.map(() => '?').join(',')})`, mediaIds) : [],
  ]);
  const mediaById = new Map(media.map((m) => [Number(m.id), m]));
  const catsByPost = new Map();
  for (const c of cats) {
    const list = catsByPost.get(Number(c.post_id)) || [];
    list.push(c);
    catsByPost.set(Number(c.post_id), list);
  }
  return rows.map((r) => {
    const rowCats = catsByPost.get(Number(r.id)) || [];
    const primary = rowCats.find((c) => Number(c.id) === Number(r.primary_category_id)) || rowCats[0] || null;
    const ordered = primary ? [primary, ...rowCats.filter((c) => c !== primary)] : rowCats;
    return {
      slug: r.slug,
      url: articleUrl(r.slug),
      title: r.title,
      excerpt: r.excerpt || '',
      contentHtml: withBody ? r.content_html || '' : '',
      publishedAt: iso(r.published_at),
      updatedAt: iso(r.updated_at || r.published_at),
      authorName: r.author_name || 'ATLAS News Desk',
      readingMinutes: readingMinutes(r.content_html),
      image: publicImage(mediaById.get(Number(r.featured_media_id))),
      ogImage: publicImage(mediaById.get(Number(r.og_media_id))),
      category: primary ? mapCategory(primary) : null,
      categories: ordered.map(mapCategory),
      seoTitle: r.seo_title || null,
      seoDescription: r.seo_description || null,
      canonicalUrl: r.canonical_url || null,
    };
  });
}

/* ------------------------------------------------------------------------------------ queries */

/** Categories in the News navigation, in menu order (at most 8). */
export async function getNavigation() {
  const rows = await query(
    `SELECT * FROM ${T.categories} WHERE show_in_menu = 1 ORDER BY menu_order IS NULL, menu_order, name LIMIT ${MAX_MENU_CATEGORIES}`,
  );
  return rows.map(mapCategory);
}

export async function getCategoryBySlug(slug) {
  const rows = await query(`SELECT * FROM ${T.categories} WHERE slug = ?`, [String(slug)]);
  return rows.length ? mapCategory(rows[0]) : null;
}

/**
 * The slugs a request may match. Next.js hands route params DECODED; WordPress stored non-ASCII slugs
 * percent-ENCODED in lower case, so an imported URL is looked up in both forms.
 */
export function slugCandidates(slug) {
  const s = String(slug || '');
  const encoded = /[^\x20-\x7e]/.test(s) ? encodeURIComponent(s).toLowerCase() : null;
  return [...new Set([s, encoded].filter(Boolean))];
}

/** One LIVE article by slug, with its body; null for drafts, scheduled, trashed or unknown slugs. */
export async function getArticleBySlug(slug) {
  const cands = slugCandidates(slug);
  if (!cands.length || cands.some((c) => c.length > 600)) return null;
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE p.slug IN (${cands.map(() => '?').join(',')}) AND ${LIVE} LIMIT 1`, cands);
  return (await hydrate(rows, { withBody: true }))[0] || null;
}

/** Same primary category first, then any shared category, then the newest — never the article itself. */
export async function getRelatedArticles(article, limit = 3) {
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${LIVE} AND p.slug <> ? ORDER BY p.published_at DESC, p.id DESC LIMIT 40`, [article.slug]);
  const all = await hydrate(rows);
  const shared = (a) => a.categories.filter((c) => article.categories.some((x) => x.slug === c.slug)).length;
  const score = (a) => (a.category?.slug && a.category.slug === article.category?.slug ? 10 : 0) + shared(a);
  return [...all].sort((a, b) => score(b) - score(a) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}

async function newestInCategory(categorySlug, limit) {
  const rows = await query(
    `SELECT ${COLS} FROM ${T.posts} p
      WHERE ${LIVE} AND EXISTS (SELECT 1 FROM ${T.postCategories} pc JOIN ${T.categories} c ON c.id = pc.category_id
                                 WHERE pc.post_id = p.id AND c.slug = ?)
      ORDER BY p.published_at DESC, p.id DESC LIMIT ${Number(limit)}`,
    [categorySlug],
  );
  return hydrate(rows);
}

/**
 * The homepage, from the CMS curation (atlasnews_homepage_slots) plus the newest stories:
 *   lead       the Hero — centre article, else the newest story
 *   companions Hero — left (2) then Hero — right (2); each side is topped up with the newest unused
 *              stories, so the hero never has a hole
 *   latest     the four newest stories not already shown
 *   spotlight  the Featured article — or null: an empty Featured area is NOT filled automatically
 *   sections   up to three menu categories with at least two unused stories (four each)
 *   picks      Editor's Picks, in order — curated only; empty means the block is not shown
 * A slotted article that is not live (scheduled for later, unpublished, trashed) is skipped, so the
 * curation can never expose it. Each story appears at most once outside Editor's Picks.
 */
export async function getHomepage() {
  const [slotRows, newestRows, nav] = await Promise.all([
    query(
      `SELECT hs.zone, hs.position, ${COLS} FROM ${T.homepageSlots} hs JOIN ${T.posts} p ON p.id = hs.post_id
        WHERE ${LIVE} ORDER BY hs.position`,
    ),
    query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${LIVE} ORDER BY p.published_at DESC, p.id DESC LIMIT 40`),
    getNavigation(),
  ]);
  const [slotted, newest] = await Promise.all([hydrate(slotRows), hydrate(newestRows)]);
  const zone = (z) => slotted.filter((_, i) => slotRows[i].zone === z);
  const used = new Set();
  const take = (a) => {
    if (a) used.add(a.slug);
    return a;
  };
  const nextUnused = () => newest.find((a) => !used.has(a.slug)) || null;

  const centre = zone('hero_centre');
  const left = zone('hero_left');
  const right = zone('hero_right');
  const featured = zone('featured');
  const picks = zone('picks');
  /* every curated story is claimed first, so automatic top-ups never duplicate one */
  [...centre, ...left, ...right, ...featured].forEach(take);

  const lead = centre[0] || take(nextUnused());
  for (const side of [left, right]) {
    while (side.length < HERO_SIDE) {
      const a = nextUnused();
      if (!a) break;
      side.push(take(a));
    }
  }
  const companions = [...left.slice(0, HERO_SIDE), ...right.slice(0, HERO_SIDE)];
  const spotlight = featured[0] || null;
  const latest = newest.filter((a) => !used.has(a.slug)).slice(0, 4).map(take);

  const sections = [];
  for (const category of nav) {
    if (sections.length === 3) break;
    const pool = (await newestInCategory(category.slug, 16)).filter((a) => !used.has(a.slug));
    if (pool.length < 2) continue;
    sections.push({ category, articles: pool.slice(0, 4).map(take) });
  }

  return { lead: lead || null, companions, spotlight, latest, sections, picks: picks.slice(0, 5), categories: nav };
}

/** One page of a category: page 1 leads with its newest story. null for an unknown category. */
export async function getCategoryPage(slug, page = 1) {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;
  const inCat = `${LIVE} AND EXISTS (SELECT 1 FROM ${T.postCategories} pc JOIN ${T.categories} c ON c.id = pc.category_id WHERE pc.post_id = p.id AND c.slug = ?)`;
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.posts} p WHERE ${inCat}`, [slug]);
  const total = Number(n);
  const totalPages = Math.max(1, Math.ceil(Math.max(0, total - 1) / CATEGORY_PAGE_SIZE));
  if (page < 1 || page > totalPages) return { category, outOfRange: true, totalPages };
  const offset = page === 1 ? 0 : 1 + (page - 1) * CATEGORY_PAGE_SIZE;
  const limit = page === 1 ? 1 + CATEGORY_PAGE_SIZE : CATEGORY_PAGE_SIZE;
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${inCat} ORDER BY p.published_at DESC, p.id DESC LIMIT ${limit} OFFSET ${offset}`, [slug]);
  const list = await hydrate(rows);
  const featured = page === 1 ? list.shift() || null : null;
  return { category, featured, items: list, page, totalPages, total };
}

/** A stored redirect for an exact public path (old WordPress slugs, renamed slugs), or null. */
export async function findRedirect(path) {
  const rows = await query(`SELECT to_path, status_code FROM ${T.redirects} WHERE from_path = ? LIMIT 1`, [String(path).slice(0, 600)]);
  return rows.length ? { to: rows[0].to_path, status: Number(rows[0].status_code) } : null;
}

/** `indexing_enabled` (atlasnews_settings). Anything but an explicit true means noindex. */
export async function getIndexingEnabled() {
  return (await getSetting(SETTING.indexingEnabled, false)) === true;
}
