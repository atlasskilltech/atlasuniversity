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
  const article = (await hydrate(rows, { withBody: true }))[0] || null;
  if (!article) return null;
  /* the breadcrumb: the primary category's full ancestor path, root first */
  const tree = await loadCategoryTree();
  const primary = article.category ? tree.bySlug.get(article.category.slug) : null;
  article.categoryPath = primary ? categoryPath(tree, primary.id).map(mapCategory) : [];
  return article;
}

/** Same primary category first, then any shared category, then the newest — never the article itself. */
export async function getRelatedArticles(article, limit = 3) {
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${LIVE} AND p.slug <> ? ORDER BY p.published_at DESC, p.id DESC LIMIT 40`, [article.slug]);
  const all = await hydrate(rows);
  const shared = (a) => a.categories.filter((c) => article.categories.some((x) => x.slug === c.slug)).length;
  const score = (a) => (a.category?.slug && a.category.slug === article.category?.slug ? 10 : 0) + shared(a);
  return [...all].sort((a, b) => score(b) - score(a) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}

/* ------------------------------------------------------------------------------------ category tree */

/**
 * The whole category table (a few dozen rows) as an in-memory tree. Every hierarchy question — a
 * category's descendants, its ancestor path — is answered from this one read; walks are bounded by the
 * number of categories, so even a corrupted loop cannot run forever.
 */
export async function loadCategoryTree() {
  const rows = await query(`SELECT id, parent_id, slug, name, description, seo_title, seo_description FROM ${T.categories}`);
  const byId = new Map();
  const bySlug = new Map();
  const children = new Map();
  for (const r of rows) {
    const node = { ...r, id: Number(r.id), parent: r.parent_id ? Number(r.parent_id) : null };
    byId.set(node.id, node);
    bySlug.set(node.slug, node);
  }
  for (const n of byId.values()) {
    if (n.parent === null) continue;
    if (!children.has(n.parent)) children.set(n.parent, []);
    children.get(n.parent).push(n.id);
  }
  return { byId, bySlug, children };
}

/** The category and every descendant, at any depth (ids). */
export function descendantIds(tree, id) {
  const out = new Set();
  const stack = [id];
  while (stack.length && out.size <= tree.byId.size) {
    const x = stack.pop();
    if (out.has(x)) continue;
    out.add(x);
    for (const c of tree.children.get(x) || []) stack.push(c);
  }
  return [...out];
}

/** Root → … → the category (tree nodes). Empty for an unknown id. */
export function categoryPath(tree, id) {
  const path = [];
  const seen = new Set();
  for (let x = tree.byId.get(id); x && !seen.has(x.id); x = x.parent === null ? null : tree.byId.get(x.parent)) {
    seen.add(x.id);
    path.unshift(x);
  }
  return path;
}

/** SQL + params: a LIVE post assigned to ANY of these categories. EXISTS, so a post assigned to a parent
 *  and to its child is still one row (no duplicates), and pagination counts each post once. */
function inCategories(ids) {
  return { sql: `${LIVE} AND EXISTS (SELECT 1 FROM ${T.postCategories} pc WHERE pc.post_id = p.id AND pc.category_id IN (${ids.map(() => '?').join(',')}))`, params: ids };
}

/**
 * An old WordPress nested category URL → the flat ATLAS News URL, or null (→ 404).
 *   segments: the path after /news/category/, decoded, e.g. ['industry', 'masterclass'] or
 *             ['industry', 'masterclass', 'page', '2']
 * Redirects ONLY when the segments are the category's complete ancestor chain from the root, in order —
 * a wrong, partial or reordered chain is not a redirect, it is a 404. Never resolves a single segment
 * (that is the normal category route), so it can never redirect to itself or chain.
 */
export async function resolveLegacyCategoryPath(segments, tree = null) {
  if (!Array.isArray(segments) || segments.length < 2 || segments.length > 12 || segments.some((s) => typeof s !== 'string' || !s || s.length > 200)) return null;
  let chain = segments;
  let page = 1;
  if (chain.length >= 3 && chain[chain.length - 2] === 'page') {
    if (!/^[1-9]\d{0,3}$/.test(chain[chain.length - 1])) return null;
    page = Number(chain[chain.length - 1]);
    chain = chain.slice(0, -2);
  }
  if (chain.length < 2) return null;
  const t = tree || (await loadCategoryTree());
  const last = t.bySlug.get(chain[chain.length - 1]);
  if (!last) return null;
  const path = categoryPath(t, last.id).map((n) => n.slug);
  if (path.length !== chain.length || path.some((s, i) => s !== chain[i])) return null;
  return { to: categoryUrl(last.slug, page) };
}

async function newestInCategory(categorySlug, limit) {
  const tree = await loadCategoryTree();
  const node = tree.bySlug.get(categorySlug);
  if (!node) return [];
  const f = inCategories(descendantIds(tree, node.id));
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${f.sql} ORDER BY p.published_at DESC, p.id DESC LIMIT ${Number(limit)}`, f.params);
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

/**
 * One page of a category archive: page 1 leads with its newest story. null for an unknown category.
 * The archive holds every live article assigned to the category OR ANY OF ITS DESCENDANTS (as WordPress
 * category archives do), each article once, newest first.
 */
export async function getCategoryPage(slug, page = 1) {
  const tree = await loadCategoryTree();
  const node = tree.bySlug.get(String(slug));
  if (!node) return null;
  const category = mapCategory(node);
  const f = inCategories(descendantIds(tree, node.id));
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.posts} p WHERE ${f.sql}`, f.params);
  const total = Number(n);
  const totalPages = Math.max(1, Math.ceil(Math.max(0, total - 1) / CATEGORY_PAGE_SIZE));
  if (page < 1 || page > totalPages) return { category, outOfRange: true, totalPages };
  const offset = page === 1 ? 0 : 1 + (page - 1) * CATEGORY_PAGE_SIZE;
  const limit = page === 1 ? 1 + CATEGORY_PAGE_SIZE : CATEGORY_PAGE_SIZE;
  const rows = await query(`SELECT ${COLS} FROM ${T.posts} p WHERE ${f.sql} ORDER BY p.published_at DESC, p.id DESC LIMIT ${limit} OFFSET ${offset}`, f.params);
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
