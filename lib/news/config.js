/**
 * ATLAS News — module-wide constants.
 *
 * Every News table carries the one prefix below, and every SQL statement in lib/news reads table names
 * from `T`, never from string literals. Moving News to its own database later is therefore a matter of
 * pointing the pool (lib/news/db/pool.js) at different credentials; renaming the prefix is one edit here
 * plus a migration.
 *
 * This file is plain data with no imports, so the CLI scripts (scripts/news/*) and the app share it.
 */
export const NEWS_TABLE_PREFIX = 'atlasnews_';

const t = (name) => `${NEWS_TABLE_PREFIX}${name}`;

/** Table names. Keep in sync with lib/news/db/migrations.js. */
export const T = Object.freeze({
  migrations: t('schema_migrations'),
  media: t('media'),
  categories: t('categories'),
  tags: t('tags'),
  posts: t('posts'),
  postCategories: t('post_categories'),
  postTags: t('post_tags'),
  homepageSlots: t('homepage_slots'),
  redirects: t('redirects'),
  settings: t('settings'),
  sessions: t('admin_sessions'),
  loginAttempts: t('login_attempts'),
});

/** Display name used for every post's byline (approved decision: no per-person authors yet). */
export const DEFAULT_AUTHOR_NAME = 'ATLAS News Desk';

/** At most this many categories can appear in the public News navigation. */
export const MAX_MENU_CATEGORIES = 8;

/** Slugs a post or category may never take: they are, or will be, routes of their own. */
export const RESERVED_SLUGS = Object.freeze([
  'admin', 'api', 'category', 'categories', 'tag', 'tags', 'feed', 'rss', 'page', 'search', 'preview',
  'author', 'authors', 'sitemap', 'sitemap.xml', 'robots.txt', 'archive', 'latest', 'wp-admin',
  'wp-content', 'wp-includes', 'wp-json', 'wp-login.php', 'xmlrpc.php',
]);

/** S3 key root for everything News uploads. Lives under the bucket's public `assets/` prefix (the
 *  bucket policy and next/image remotePatterns both cover `assets/**`), but in its own sub-tree so it is
 *  never confused with the repo's tracked assets: nothing under it is written to assets.manifest.json. */
export const NEWS_S3_ROOT = 'assets/news';

/** Admin cookie: scoped to /news/admin so it is never sent to any other route of the site. */
export const ADMIN_COOKIE_PATH = '/news/admin';
export const ADMIN_COOKIE_BASENAME = 'atlasnews_admin';
