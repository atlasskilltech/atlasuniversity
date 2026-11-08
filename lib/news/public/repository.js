/**
 * ATLAS News — the public read model. THE ONLY MODULE THE PUBLIC PAGES READ.
 *
 * Every page and component under app/news/(public) and components/News/Public receives the plain objects
 * this module returns and nothing else, so moving from fixtures to the `atlasnews_` MySQL tables is a
 * change inside this file: replace the `source` functions below with queries (posts WHERE status =
 * 'published' AND published_at <= UTC_TIMESTAMP() AND deleted_at IS NULL, joined to categories, media and
 * homepage_slots) and keep the mapping. No UI component changes.
 *
 *   Article  { slug, url, title, excerpt, contentHtml, publishedAt, updatedAt, authorName, readingMinutes,
 *              image: { src, width, height, alt, caption } | null,
 *              category: { slug, name, url }, categories: [{ slug, name, url }], seoTitle, seoDescription }
 *   Category { slug, name, description, url, seoTitle, seoDescription }
 *
 * All functions are async on purpose: the database version will be.
 */
import { MAX_MENU_CATEGORIES } from '../config.js';
import { resolveMedia } from './images.js';
import { CATEGORIES } from './fixtures/categories.js';
import { ARTICLES, HOMEPAGE_SLOTS, TRENDING } from './fixtures/articles.js';

/** Where the public pages read from. 'fixtures' = the Stage 2 sample content (pages are noindex). */
export const NEWS_PUBLIC_SOURCE = 'fixtures';
export const NEWS_PUBLIC_IS_SAMPLE = NEWS_PUBLIC_SOURCE === 'fixtures';

/** Articles per category page (page 1 additionally leads with one featured story). */
export const CATEGORY_PAGE_SIZE = 6;

const WORDS_PER_MINUTE = 225;

/** Side stories in the homepage hero (half each side of the lead). */
const HERO_SIDE_STORIES = 4;

/* ------------------------------------------------------------------------------------ urls */

export const articleUrl = (slug) => `/news/${slug}`;
export const categoryUrl = (slug, page = 1) => (page > 1 ? `/news/category/${slug}/page/${page}` : `/news/category/${slug}`);

/* ------------------------------------------------------------------------------------ source (fixtures) */

const source = {
  categories: async () => CATEGORIES,
  posts: async () => ARTICLES,
  homepageSlots: async () => HOMEPAGE_SLOTS,
  trending: async () => TRENDING,
};

/* ------------------------------------------------------------------------------------ mapping */

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

const mapCategory = (c) => ({
  slug: c.slug,
  name: c.name,
  description: c.description || '',
  url: categoryUrl(c.slug),
  seoTitle: c.seoTitle || null,
  seoDescription: c.seoDescription || null,
});

function mapArticle(row, categoriesBySlug) {
  const cats = (row.categories?.length ? row.categories : [row.primaryCategory])
    .map((s) => categoriesBySlug.get(s))
    .filter(Boolean)
    .map(mapCategory);
  const primary = categoriesBySlug.get(row.primaryCategory);
  return {
    slug: row.slug,
    url: articleUrl(row.slug),
    title: row.title,
    excerpt: row.excerpt || '',
    contentHtml: row.contentHtml || '',
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt || row.publishedAt,
    authorName: row.authorName || 'ATLAS News Desk',
    readingMinutes: readingMinutes(row.contentHtml),
    image: resolveMedia(row.featuredMedia),
    category: primary ? mapCategory(primary) : cats[0] || null,
    categories: cats,
    seoTitle: row.seoTitle || null,
    seoDescription: row.seoDescription || null,
  };
}

/** Published, newest first. */
async function publishedArticles() {
  const [cats, rows] = await Promise.all([source.categories(), source.posts()]);
  const bySlug = new Map(cats.map((c) => [c.slug, c]));
  const now = Date.now();
  return rows
    .filter((r) => r.status === 'published' && r.publishedAt && Date.parse(r.publishedAt) <= now)
    .map((r) => mapArticle(r, bySlug))
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

const inCategory = (article, slug) => article.categories.some((c) => c.slug === slug);

/* ------------------------------------------------------------------------------------ queries */

/** Categories shown in the News navigation, in menu order. */
export async function getNavigation() {
  const cats = await source.categories();
  return cats
    .filter((c) => c.showInMenu)
    .sort((a, b) => (a.menuOrder ?? 999) - (b.menuOrder ?? 999))
    .slice(0, MAX_MENU_CATEGORIES)
    .map(mapCategory);
}

export async function getCategoryBySlug(slug) {
  const c = (await source.categories()).find((x) => x.slug === slug);
  return c ? mapCategory(c) : null;
}

export async function getArticleBySlug(slug) {
  return (await publishedArticles()).find((a) => a.slug === slug) || null;
}

/** Same primary category first, then any shared category, then the newest — never the article itself. */
export async function getRelatedArticles(article, limit = 3) {
  const all = (await publishedArticles()).filter((a) => a.slug !== article.slug);
  const shared = (a) => a.categories.filter((c) => article.categories.some((x) => x.slug === c.slug)).length;
  const score = (a) => (a.category?.slug === article.category?.slug ? 10 : 0) + shared(a);
  return [...all].sort((a, b) => score(b) - score(a) || Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}

/**
 * Everything the homepage shows, each story at most once outside the "Most read" list:
 * hero (lead + 4 side stories), the latest strip, the spotlight and one block per menu category.
 */
export async function getHomepage() {
  const [all, slots, trendingSlugs, nav] = await Promise.all([publishedArticles(), source.homepageSlots(), source.trending(), getNavigation()]);
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const used = new Set();
  const take = (a) => {
    if (a) used.add(a.slug);
    return a;
  };

  const slotted = slots.map((s) => bySlug.get(s)).filter(Boolean);
  const lead = take(slotted[0] || all[0]);
  const spotlight = take(slotted[4] || null);
  /* the hero has four side stories (two each side of the lead): the slotted companions, topped up with
     the newest stories not already placed */
  const companions = slotted.slice(1, 4).map(take);
  for (const a of all) {
    if (companions.length >= HERO_SIDE_STORIES) break;
    if (!used.has(a.slug)) companions.push(take(a));
  }
  const latest = all.filter((a) => !used.has(a.slug)).slice(0, 4).map(take);

  const sections = [];
  for (const category of nav) {
    const pool = all.filter((a) => inCategory(a, category.slug) && !used.has(a.slug));
    if (pool.length < 2) continue;
    sections.push({ category, articles: pool.slice(0, 4).map(take) });
    if (sections.length === 3) break;
  }

  const trending = trendingSlugs.map((s) => bySlug.get(s)).filter(Boolean).slice(0, 5);
  return { lead, companions, spotlight, latest, sections, trending, categories: nav };
}

/** One page of a category: page 1 leads with a featured story. Returns null for an unknown category. */
export async function getCategoryPage(slug, page = 1) {
  const category = await getCategoryBySlug(slug);
  if (!category) return null;
  const all = (await publishedArticles()).filter((a) => inCategory(a, slug));
  const [featured, ...rest] = all;
  const totalPages = Math.max(1, Math.ceil(rest.length / CATEGORY_PAGE_SIZE));
  if (page < 1 || page > totalPages) return { category, outOfRange: true, totalPages };
  const items = rest.slice((page - 1) * CATEGORY_PAGE_SIZE, page * CATEGORY_PAGE_SIZE);
  return { category, featured: page === 1 ? featured || null : null, items, page, totalPages, total: all.length };
}

/* ------------------------------------------------------------------------------------ static params */

export async function listArticleSlugs() {
  return (await publishedArticles()).map((a) => a.slug);
}

/** [{ slug, totalPages }] for every category. */
export async function listCategoryPaging() {
  const cats = await source.categories();
  return Promise.all(cats.map(async (c) => ({ slug: c.slug, totalPages: (await getCategoryPage(c.slug, 1)).totalPages })));
}
