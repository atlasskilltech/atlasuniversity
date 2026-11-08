/**
 * ATLAS News — Stage 3 CMS service tests against a disposable LOCAL database.
 *
 *   NEWS_TEST_DB_HOST=127.0.0.1 NEWS_TEST_DB_USER=root NEWS_TEST_DB_PASSWORD= NEWS_TEST_DB_NAME=atlasnews_stage3_test npm run news:test
 *
 * Uses its own database (`<NEWS_TEST_DB_NAME minus _test>_cms_test`) because node --test runs test files
 * in parallel and db.test.mjs drops/recreates NEWS_TEST_DB_NAME. Same guards: local host, `_test` name.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';

const E = process.env;
const NAME = E.NEWS_TEST_DB_NAME ? E.NEWS_TEST_DB_NAME.replace(/_test$/, '_cms_test') : '';
const skip = E.NEWS_TEST_DB_NAME ? false : 'set NEWS_TEST_DB_NAME (a local *_test database) to run the CMS database tests';

let admin;
let m = {};
let T;
const NOW = () => new Date();
const PAST = '2026-01-01T00:00:00.000Z';

before(async () => {
  if (skip) return;
  if (!/_test$/.test(E.NEWS_TEST_DB_NAME) || !/^(127\.0\.0\.1|localhost)$/.test(E.NEWS_TEST_DB_HOST || '')) {
    throw new Error('refusing: NEWS_TEST_DB_NAME must end in _test and NEWS_TEST_DB_HOST must be local');
  }
  admin = await mysql.createConnection({ host: E.NEWS_TEST_DB_HOST, port: Number(E.NEWS_TEST_DB_PORT || 3306), user: E.NEWS_TEST_DB_USER, password: E.NEWS_TEST_DB_PASSWORD ?? '' });
  await admin.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin.query(`CREATE DATABASE \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.query(`CREATE TABLE \`${NAME}\`.survey_responses (id INT PRIMARY KEY AUTO_INCREMENT, answer VARCHAR(50)) ENGINE=InnoDB`);
  await admin.query(`INSERT INTO \`${NAME}\`.survey_responses (answer) VALUES ('a'), ('b')`);
  Object.assign(process.env, { DB_HOST: E.NEWS_TEST_DB_HOST, DB_PORT: E.NEWS_TEST_DB_PORT || '3306', DB_USER: E.NEWS_TEST_DB_USER, DB_PASSWORD: E.NEWS_TEST_DB_PASSWORD ?? '', DB_NAME: NAME });
  m = {
    ...(await import('../../../lib/news/db/migrate.js')),
    ...(await import('../../../lib/news/db/pool.js')),
    ...(await import('../../../lib/news/cms/articles.js')),
    ...(await import('../../../lib/news/cms/categories.js')),
    ...(await import('../../../lib/news/cms/homepage.js')),
    ...(await import('../../../lib/news/cms/media.js')),
    ...(await import('../../../lib/news/cms/dashboard.js')),
    CmsError: (await import('../../../lib/news/cms/errors.js')).CmsError,
  };
  T = (await import('../../../lib/news/config.js')).T;
  await m.migrateUp();
});

after(async () => {
  if (skip) return;
  await m.closePool?.();
  await admin?.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin?.end();
});

/** assert.rejects with a CmsError of this status/code; returns the error */
async function cmsRejects(promise, status, code) {
  let err;
  await assert.rejects(promise, (e) => {
    err = e;
    return e instanceof m.CmsError && e.status === status && (!code || e.code === code);
  });
  return err;
}
const media = async (sha = 'a') => (await m.query(`INSERT INTO ${T.media} (storage_key, sha256, mime_type, original_filename, alt_text)
  VALUES (?, ?, 'image/webp', ?, 'Alt')`, [`assets/news/media/2026/11/${sha.repeat(20)}-full.webp`, sha.repeat(64), `${sha}.jpg`])).insertId;

let cat1;
let cat2;

test('categories: create, slug clash, 8-item menu limit, rename → redirect, refuse to delete when in use', { skip }, async () => {
  cat1 = (await m.createCategory({ name: 'Campus Life', showInMenu: true, menuOrder: 1 })).id;
  cat2 = (await m.createCategory({ name: 'Research' })).id;
  await cmsRejects(m.createCategory({ name: 'Campus life', slug: 'campus-life' }), 409, 'slug_taken');
  for (let i = 0; i < 7; i++) await m.createCategory({ name: `Menu ${i}`, showInMenu: true });
  const full = await cmsRejects(m.createCategory({ name: 'Ninth', showInMenu: true }), 409, 'menu_full');
  assert.match(full.fields.showInMenu, /maximum/);
  await cmsRejects(m.updateCategory(cat2, { name: 'Research', showInMenu: true }), 409, 'menu_full');
  /* an existing menu category can still be edited */
  await m.updateCategory(cat1, { name: 'Campus Life', showInMenu: true, menuOrder: 2, isFeatured: true });

  const r = await m.updateCategory(cat2, { name: 'Research', slug: 'research-and-innovation' });
  assert.equal(r.redirectFrom, '/news/category/research');
  const [red] = await m.query(`SELECT to_path, status_code FROM ${T.redirects} WHERE from_path = '/news/category/research'`);
  assert.deepEqual({ ...red }, { to_path: '/news/category/research-and-innovation', status_code: 301 });

  const list = await m.listCategories();
  assert.equal(list.filter((c) => c.showInMenu).length, 8);
  assert.equal(list.find((c) => c.id === cat1).isFeatured, true);
  /* empty categories delete cleanly */
  const extra = (await m.createCategory({ name: 'Temporary' })).id;
  await m.deleteCategory(extra);
  assert.equal(await m.getCategory(extra), null);
});

let a1;
let a1Updated;

test('articles: create draft, validation errors, slug uniqueness, reference checks', { skip }, async () => {
  const bad = await cmsRejects(m.createArticle({ status: 'published', title: '' }), 400, 'validation');
  assert.ok(bad.fields.title && bad.fields.contentHtml && bad.fields.categoryIds);
  const r = await m.createArticle({ title: 'First story', status: 'draft', contentHtml: '<h1>H</h1><p>Body<script>x</script></p>', categoryIds: [cat1] });
  a1 = r.id;
  assert.equal(r.slug, 'first-story');
  const art = await m.getArticle(a1);
  assert.equal(art.contentHtml, '<h2>H</h2><p>Body</p>', 'stored sanitised, H1 converted');
  assert.equal(art.state, 'draft');
  assert.equal(art.authorName, 'ATLAS News Desk');
  assert.deepEqual(art.categoryIds, [cat1]);
  a1Updated = art.updatedAt;
  await cmsRejects(m.createArticle({ title: 'First story', status: 'draft' }), 409, 'slug_taken');
  await cmsRejects(m.createArticle({ title: 'X', status: 'draft', categoryIds: [999999] }), 400, 'validation');
  await cmsRejects(m.createArticle({ title: 'Y', status: 'draft', featuredMediaId: 999999 }), 400, 'validation');
});

test('articles: optimistic locking refuses a stale save and writes nothing', { skip }, async () => {
  const input = { title: 'First story', status: 'draft', contentHtml: '<p>v2</p>', categoryIds: [cat1] };
  await cmsRejects(m.updateArticle(a1, input, {}), 409, 'edit_conflict');
  await cmsRejects(m.updateArticle(a1, input, { expectedUpdatedAt: '2020-01-01T00:00:00.000Z' }), 409, 'edit_conflict');
  assert.equal((await m.getArticle(a1)).contentHtml, '<h2>H</h2><p>Body</p>', 'nothing written');
  const ok = await m.updateArticle(a1, input, { expectedUpdatedAt: a1Updated });
  assert.notEqual(ok.updatedAt, a1Updated, 'every save produces a new version');
  /* the version the editor had is now stale */
  await cmsRejects(m.updateArticle(a1, input, { expectedUpdatedAt: a1Updated }), 409, 'edit_conflict');
  a1Updated = ok.updatedAt;
});

test('articles: publishing, then a slug change on a live article leaves a 301 (no chains)', { skip }, async () => {
  const pub = await m.updateArticle(a1, { title: 'First story', status: 'published', publishedAt: PAST, contentHtml: '<p>v2</p>', categoryIds: [cat1, cat2], primaryCategoryId: cat2 }, { expectedUpdatedAt: a1Updated });
  let art = await m.getArticle(a1);
  assert.equal(art.state, 'live');
  assert.deepEqual(art.categoryIds, [cat2, cat1], 'primary first');
  const r1 = await m.updateArticle(a1, { title: 'First story', slug: 'first-story-renamed', status: 'published', publishedAt: PAST, contentHtml: '<p>v2</p>', categoryIds: [cat1] }, { expectedUpdatedAt: pub.updatedAt });
  assert.equal(r1.redirectFrom, '/news/first-story');
  const r2 = await m.updateArticle(a1, { title: 'First story', slug: 'first-story-final', status: 'published', publishedAt: PAST, contentHtml: '<p>v2</p>', categoryIds: [cat1] }, { expectedUpdatedAt: r1.updatedAt });
  const reds = await m.query(`SELECT from_path, to_path FROM ${T.redirects} WHERE from_path LIKE '/news/first-story%' ORDER BY from_path`);
  assert.deepEqual(reds.map((x) => [x.from_path, x.to_path]), [
    ['/news/first-story', '/news/first-story-final'],
    ['/news/first-story-renamed', '/news/first-story-final'],
  ]);
  /* renaming a DRAFT never leaves a redirect */
  const d = await m.createArticle({ title: 'Unpublished idea', status: 'draft' });
  const dart = await m.getArticle(d.id);
  const rd = await m.updateArticle(d.id, { title: 'Unpublished idea', slug: 'unpublished-idea-2', status: 'draft' }, { expectedUpdatedAt: dart.updatedAt });
  assert.equal(rd.redirectFrom, null);
  a1Updated = r2.updatedAt;
  art = await m.getArticle(a1);
  assert.equal(art.slug, 'first-story-final');
});

test('scheduling needs no cron: a scheduled article turns live when its time passes', { skip }, async () => {
  const future = new Date(Date.now() + 3600_000).toISOString();
  const s = await m.createArticle({ title: 'Scheduled piece', status: 'scheduled', publishedAt: future, contentHtml: '<p>x</p>', categoryIds: [cat1] });
  assert.equal((await m.getArticle(s.id)).state, 'scheduled');
  /* time passes (simulated by moving the date, as a clock would) */
  await m.query(`UPDATE ${T.posts} SET published_at = UTC_TIMESTAMP(3) - INTERVAL 1 SECOND WHERE id = ?`, [s.id]);
  assert.equal((await m.getArticle(s.id)).state, 'live');
  const live = await m.listArticles({ filter: 'live' });
  assert.ok(live.items.some((x) => x.id === s.id));
});

test('homepage: one slot per article (validator + DB), drafts/trash refused, zone always validated', { skip }, async () => {
  const p2 = (await m.createArticle({ title: 'Second', status: 'published', publishedAt: PAST, contentHtml: '<p>x</p>', categoryIds: [cat1] })).id;
  const draft = (await m.createArticle({ title: 'Draft only', status: 'draft' })).id;
  await m.saveHomepageCuration({ zones: { hero_centre: [a1], picks: [p2] } });
  let cur = await m.getHomepageCuration();
  assert.deepEqual(cur.zones.map((z) => z.zone), ['hero_centre', 'hero_left', 'hero_right', 'featured', 'picks']);
  assert.equal(cur.zones[0].items[0].id, a1);
  assert.equal(cur.zones[4].items[0].id, p2);

  const dup = await cmsRejects(m.saveHomepageCuration({ zones: { hero_centre: [a1], picks: [p2, a1] } }), 400, 'validation');
  assert.match(dup.fields.picks, /“First story” is already placed in Hero — centre \(lead story\)\. An article can occupy only one homepage slot/);
  await cmsRejects(m.saveHomepageCuration({ zones: { picks: [draft] } }), 400, 'validation');
  await cmsRejects(m.saveHomepageCuration({ zones: { sidebar: [p2] } }), 400, 'validation');
  /* a refused save changed nothing */
  cur = await m.getHomepageCuration();
  assert.equal(cur.zones[0].items[0].id, a1);
  /* the table itself still enforces one slot per post (UNIQUE post_id from 0001) */
  await assert.rejects(m.query(`INSERT INTO ${T.homepageSlots} (position, zone, post_id) VALUES (30, 'picks', ?)`, [a1]), /ER_DUP_ENTRY/);
  /* the list shows where an article sits */
  const list = await m.listArticles({ q: 'First story' });
  assert.equal(list.items[0].homepage.zone, 'hero_centre');
});

test('trash: removes the homepage slot, hides from lists; restore returns a DRAFT; nothing hard-deleted', { skip }, async () => {
  const t = await m.trashArticle(a1);
  assert.equal(t.removedFromHomepage, true);
  assert.equal((await m.getHomepageCuration()).zones[0].items.length, 0);
  assert.ok(!(await m.listArticles({})).items.some((x) => x.id === a1));
  assert.ok((await m.listArticles({ filter: 'trash' })).items.some((x) => x.id === a1));
  await cmsRejects(m.updateArticle(a1, { title: 'x', status: 'draft' }, { expectedUpdatedAt: a1Updated }), 409, 'in_trash');
  /* the slug stays reserved while in Trash */
  const clash = await cmsRejects(m.createArticle({ title: 'x', slug: 'first-story-final', status: 'draft' }), 409, 'slug_taken');
  assert.match(clash.message, /Trash/);
  await m.restoreArticle(a1);
  const back = await m.getArticle(a1);
  assert.equal(back.state, 'draft', 'restored as a draft — never republished by accident');
  assert.equal(back.contentHtml, '<p>v2</p>');
  const [{ n }] = await m.query(`SELECT COUNT(*) AS n FROM ${T.posts}`);
  assert.ok(Number(n) >= 5);
});

test('duplicate: a new draft with a free slug, same body and categories, no date or slot', { skip }, async () => {
  const d1 = await m.duplicateArticle(a1);
  const d2 = await m.duplicateArticle(a1);
  assert.equal(d1.slug, 'first-story-final-copy');
  assert.equal(d2.slug, 'first-story-final-copy-2');
  const c = await m.getArticle(d1.id);
  assert.equal(c.title, 'Copy of First story');
  assert.equal(c.status, 'draft');
  assert.equal(c.publishedAt, null);
  assert.equal(c.homepage, null);
  assert.equal(c.contentHtml, '<p>v2</p>');
  assert.deepEqual(c.categoryIds, (await m.getArticle(a1)).categoryIds);
});

test('list: search (LIKE-escaped), filters, category, sort, pagination', { skip }, async () => {
  const all = await m.listArticles({ pageSize: 2, page: 1 });
  assert.equal(all.items.length, 2);
  assert.ok(all.totalPages >= 3);
  assert.equal((await m.listArticles({ q: '%' })).total, 0, '% is a literal, not a wildcard');
  assert.ok((await m.listArticles({ q: 'Copy of' })).total >= 2);
  assert.ok((await m.listArticles({ filter: 'draft' })).items.every((x) => x.state === 'draft'));
  assert.ok((await m.listArticles({ categoryId: cat2 })).total >= 0);
  const titles = (await m.listArticles({ sort: 'title', pageSize: 100 })).items.map((x) => x.title);
  assert.deepEqual(titles, [...titles].sort((x, y) => x.localeCompare(y, 'en', { sensitivity: 'base' })));
});

test('categories: delete refused while articles (Trash included) use it', { skip }, async () => {
  const e = await cmsRejects(m.deleteCategory(cat1), 409, 'category_in_use');
  assert.match(e.message, /Campus Life” is used by \d+ articles/);
  assert.ok(await m.getCategory(cat1));
});

test('media: usage across featured, social, category image and article bodies; delete only when unused', { skip }, async () => {
  const img = await media('b');
  const unused = await media('c');
  const art = (await m.createArticle({ title: 'With image', status: 'draft', featuredMediaId: img })).id;
  let u = await m.mediaUsage(img);
  assert.equal(u.featured[0].id, art);
  let e = await cmsRejects(m.deleteMedia(img), 409, 'media_in_use');
  assert.equal(e.usage.total, 1);
  /* referenced only inside a body, via any rendition URL */
  const cur = await m.getArticle(art);
  await m.updateArticle(art, { title: 'With image', status: 'draft', contentHtml: `<p><img src="https://cdn.example.com/assets/news/media/2026/11/${'b'.repeat(20)}-card.webp" alt=""></p>` }, { expectedUpdatedAt: cur.updatedAt });
  u = await m.mediaUsage(img);
  assert.equal(u.featured.length, 0);
  assert.equal(u.inBody[0].id, art);
  e = await cmsRejects(m.deleteMedia(img), 409, 'media_in_use');
  /* category image */
  await m.updateCategory(cat2, { name: 'Research', slug: 'research-and-innovation', imageMediaId: unused });
  await cmsRejects(m.deleteMedia(unused), 409, 'media_in_use');
  await m.updateCategory(cat2, { name: 'Research', slug: 'research-and-innovation', imageMediaId: null });
  /* now unused → removed from the library, row kept, hidden from the list, and not attachable */
  await m.deleteMedia(unused);
  const [row] = await m.query(`SELECT deleted_at FROM ${T.media} WHERE id = ?`, [unused]);
  assert.ok(row.deleted_at, 'soft-deleted, the row (and the S3 object) are kept');
  assert.ok(!(await m.listMedia({})).items.some((x) => x.id === unused));
  await cmsRejects(m.createArticle({ title: 'Z', status: 'draft', featuredMediaId: unused }), 400, 'validation');
  /* metadata edits and search */
  await m.updateMediaMeta(img, { alt: 'A student <b>presents</b>', caption: 'Demo day' });
  assert.equal((await m.getMediaItem(img)).alt, 'A student presents');
  assert.equal((await m.listMedia({ q: 'Demo' })).items[0].id, img);
});

test('dashboard: real counts only', { skip }, async () => {
  const d = await m.dashboardSummary();
  const [{ live }] = await m.query(`SELECT COUNT(*) AS live FROM ${T.posts} WHERE deleted_at IS NULL AND status <> 'draft' AND published_at <= UTC_TIMESTAMP(3)`);
  assert.equal(d.articles.live, Number(live));
  assert.equal(d.categories.inMenu, 8);
  assert.equal(d.homepage.capacity, 11);
  assert.ok(Array.isArray(d.recent) && d.recent.length > 0);
  assert.equal(d.readership, undefined, 'no analytics figures exist');
  const [s] = await admin.query(`SELECT COUNT(*) AS n FROM \`${NAME}\`.survey_responses`);
  assert.equal(Number(s[0].n), 2, 'unrelated table untouched');
  void NOW;
});
