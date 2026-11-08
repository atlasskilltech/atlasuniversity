import 'server-only';

/**
 * ATLAS News — the public read model. THE ONLY MODULE THE PUBLIC PAGES READ (Phase D: MySQL).
 *
 * Every function is ./queries.js wrapped in Next's data cache:
 *   - tag `news-public`, expired IMMEDIATELY by every admin write (lib/news/cms/http.js), so a publish,
 *     edit, unpublish, trash, homepage or category change shows on the next request;
 *   - `revalidate: 30` as the safety net for everything the tag cannot reach: OTHER processes (each PM2
 *     process keeps its own tag state) and SCHEDULED articles (no cron). Next serves an expired entry once
 *     while it refreshes, so 30 s here bounds the delay at 60 s: every process shows a change — and every
 *     scheduled article appears — within a minute, and no process can serve stale data indefinitely.
 * A cached value that fails to refresh (database briefly down) keeps being served until it can be
 * refreshed (last-known-good). Connection failures flip the shared health flag (./health.js) so the proxy
 * can answer a page that has NO cached copy with a proper 503.
 *
 * The public pages render on request (never at build time), so `next build` never needs the database.
 */
import { unstable_cache } from 'next/cache';
import * as q from './queries.js';
import { isConnectionError, markDbDown, markDbUp } from './health.js';

export const NEWS_PUBLIC_TAG = 'news-public';
export const REVALIDATE_SECONDS = 30;
/* every query reports the database's health: up on success, down on a connection-class failure */
const guard = (fn) => async (...args) => {
  try {
    const out = await fn(...args);
    markDbUp();
    return out;
  } catch (e) {
    if (isConnectionError(e)) markDbDown();
    throw e;
  }
};
const cached = (fn, key) => unstable_cache(guard(fn), ['atlasnews-public', key], { tags: [NEWS_PUBLIC_TAG], revalidate: REVALIDATE_SECONDS });

export { articleUrl, categoryUrl, CATEGORY_PAGE_SIZE, readingMinutes } from './queries.js';

export const getNavigation = cached(q.getNavigation, 'navigation');
export const getCategoryBySlug = cached(q.getCategoryBySlug, 'category');
export const getArticleBySlug = cached(q.getArticleBySlug, 'article');
export const getHomepage = cached(q.getHomepage, 'homepage');
export const getCategoryPage = cached(q.getCategoryPage, 'category-page');
export const findRedirect = cached(q.findRedirect, 'redirect');
export const getIndexingEnabled = cached(q.getIndexingEnabled, 'indexing');
/* keyed on the article's slug only: the article object itself is not a stable cache key */
const relatedBySlug = cached(async (slug) => {
  const article = await q.getArticleBySlug(slug);
  return article ? q.getRelatedArticles(article, 3) : [];
}, 'related');
export const getRelatedArticles = (article) => relatedBySlug(article.slug);
