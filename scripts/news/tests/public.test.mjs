/**
 * ATLAS News — Phase D public read model, against a disposable LOCAL database
 * (`<NEWS_TEST_DB_NAME minus _test>_public_test`; same guards as db.test.mjs).
 *
 *   1. EQUIVALENCE: seeded with the Stage 2 sample content, the MySQL read model returns the same
 *      homepage, articles, category pages, navigation and related stories as the approved Stage 2
 *      fixture repository (scripts/news/tests/fixtures/reference-repository.js). The components are
 *      unchanged, so equal data means equal pages. The one intended difference: "Most read" is now the
 *      curated Editor's Picks.
 *   2. PRIVACY: drafts, scheduled-for-later and trashed articles never come out of any public query.
 *   3. Empty database, pagination, curation rules, redirects, indexing default.
 * Run with the alias hook (npm run news:test sets it): node --import ./scripts/map/register.mjs
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';

const E = process.env;
const NAME = E.NEWS_TEST_DB_NAME ? E.NEWS_TEST_DB_NAME.replace(/_test$/, '_public_test') : '';
const skip = E.NEWS_TEST_DB_NAME ? false : 'set NEWS_TEST_DB_NAME (a local *_test database) to run the public read-model tests';

let admin;
let q; // the new read model (lib/news/public/queries.js)
let ref; // the Stage 2 fixture repository (oracle)
let seed;
let T;
let run;
let pool;
let PUBLIC_BASE;

before(async () => {
  if (skip) return;
  if (!/_test$/.test(E.NEWS_TEST_DB_NAME) || !/^(127\.0\.0\.1|localhost)$/.test(E.NEWS_TEST_DB_HOST || '')) {
    throw new Error('refusing: NEWS_TEST_DB_NAME must end in _test and NEWS_TEST_DB_HOST must be local');
  }
  admin = await mysql.createConnection({ host: E.NEWS_TEST_DB_HOST, port: Number(E.NEWS_TEST_DB_PORT || 3306), user: E.NEWS_TEST_DB_USER, password: E.NEWS_TEST_DB_PASSWORD ?? '', timezone: 'Z' });
  /* UTC on both sides, exactly like the app's pool (lib/news/db/pool.js) */
  await admin.query("SET time_zone = '+00:00'");
  await admin.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin.query(`CREATE DATABASE \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.query(`USE \`${NAME}\``);
  /* a predictable public S3 host for media URLs (no request is ever made to it) */
  Object.assign(process.env, {
    DB_HOST: E.NEWS_TEST_DB_HOST, DB_PORT: E.NEWS_TEST_DB_PORT || '3306', DB_USER: E.NEWS_TEST_DB_USER, DB_PASSWORD: E.NEWS_TEST_DB_PASSWORD ?? '', DB_NAME: NAME,
    ASSETS_S3_BUCKET: 'test-bucket', ASSETS_S3_REGION: 'ap-south-1', ASSETS_S3_PREFIX: '', ASSETS_S3_ENDPOINT: '', NEXT_PUBLIC_ASSET_BASE_URL: '',
  });
  PUBLIC_BASE = 'https://test-bucket.s3.ap-south-1.amazonaws.com/';
  pool = await import('../../../lib/news/db/pool.js');
  await (await import('../../../lib/news/db/migrate.js')).migrateUp();
  T = (await import('../../../lib/news/config.js')).T;
  run = async (sql, params) => (await admin.query(sql, params))[0];
  seed = await import('./seed-sample.mjs');
  q = await import('../../../lib/news/public/queries.js');
  ref = await import('./fixtures/reference-repository.js');
});

after(async () => {
  if (skip) return;
  await pool?.closePool();
  await admin?.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin?.end();
});

/* ------------------------------------------------------------------------------------ normalising */

/** an image as the pages use it: which file, its box, its text. URLs differ (local file vs S3 key). */
function img(i, side) {
  if (!i) return null;
  const file = side === 'ref' ? seed.sampleKey(i.src) : i.src.replace(PUBLIC_BASE, '').replace(/-v\d+$/, '');
  return { file, width: i.width, height: i.height, alt: i.alt || '', caption: i.caption || '' };
}
/** the fields every component reads */
const card = (a, side) =>
  a && {
    slug: a.slug, url: a.url, title: a.title, excerpt: a.excerpt, publishedAt: a.publishedAt, updatedAt: a.updatedAt,
    authorName: a.authorName, readingMinutes: a.readingMinutes, image: img(a.image, side), category: a.category, categories: a.categories,
  };
const full = (a, side) => a && { ...card(a, side), contentHtml: a.contentHtml, seoTitle: a.seoTitle, seoDescription: a.seoDescription };

/* ------------------------------------------------------------------------------------ 0. empty */

test('empty database: a quiet homepage, no navigation, 404s — never sample content', { skip }, async () => {
  const h = await q.getHomepage();
  assert.deepEqual({ ...h }, { lead: null, companions: [], spotlight: null, latest: [], sections: [], configured: null, picks: [], categories: [] });
  assert.deepEqual(await q.getNavigation(), []);
  assert.equal(await q.getArticleBySlug('a-graduating-class-steps-into-a-world-still-being-written'), null);
  assert.equal(await q.getCategoryPage('academic', 1), null);
  assert.equal(await q.getIndexingEnabled(), false, 'indexing defaults to off');
});

/* ------------------------------------------------------------------------------------ 1. equivalence */

test('equivalence: seeded with the Stage 2 content, every public query matches the approved Stage 2 output', { skip }, async () => {
  const s = await seed.seedSample(run);
  assert.equal(s.postId.size, seed.ARTICLES.length);

  /* navigation */
  /* the navigation is now a tree; the Stage 2 seed has no sub-categories in the menu, so every entry's children are [] */
  assert.deepEqual(await q.getNavigation(), (await ref.getNavigation()).map((c) => ({ ...c, children: [] })));

  /* homepage: hero (lead + 2 left + 2 right), latest, sections, spotlight */
  const [h, r] = [await q.getHomepage(), await ref.getHomepage()];
  assert.deepEqual(card(h.lead, 'new'), card(r.lead, 'ref'), 'lead');
  assert.deepEqual(h.companions.map((a) => card(a, 'new')), r.companions.map((a) => card(a, 'ref')), 'hero side stories, in order');
  assert.equal(h.companions.length, 4);
  assert.deepEqual(card(h.spotlight, 'new'), card(r.spotlight, 'ref'), 'Featured = the big read');
  assert.deepEqual(h.latest.map((a) => card(a, 'new')), r.latest.map((a) => card(a, 'ref')), 'latest');
  assert.deepEqual(
    h.sections.map((x) => ({ category: x.category, articles: x.articles.map((a) => card(a, 'new')) })),
    r.sections.map((x) => ({ category: x.category, articles: x.articles.map((a) => card(a, 'ref')) })),
    'category sections',
  );
  /* the intended change: curated Editor's Picks (Stage 2's list minus the story already in a slot) */
  assert.deepEqual(h.picks.map((a) => a.slug), s.picks);
  assert.deepEqual(h.picks.map((a) => card(a, 'new')), r.trending.filter((a) => s.picks.includes(a.slug)).map((a) => card(a, 'ref')));

  /* every article, its body, metadata fields and related stories */
  for (const a of seed.ARTICLES) {
    const [na, ra] = [await q.getArticleBySlug(a.slug), await ref.getArticleBySlug(a.slug)];
    assert.deepEqual(full(na, 'new'), full(ra, 'ref'), a.slug);
    assert.equal(na.canonicalUrl, null);
    const [nr, rr] = [await q.getRelatedArticles(na, 3), await ref.getRelatedArticles(ra, 3)];
    assert.deepEqual(nr.map((x) => card(x, 'new')), rr.map((x) => card(x, 'ref')), `related to ${a.slug}`);
  }

  /* every category page, including page 2+ and out-of-range */
  for (const c of seed.CATEGORIES) {
    const first = await ref.getCategoryPage(c.slug, 1);
    for (let p = 1; p <= first.totalPages + 1; p++) {
      const [nc, rc] = [await q.getCategoryPage(c.slug, p), await ref.getCategoryPage(c.slug, p)];
      const shape = (d, side) => (d.outOfRange ? d : { ...d, featured: card(d.featured, side), items: d.items.map((x) => card(x, side)) });
      assert.deepEqual(shape(nc, 'new'), shape(rc, 'ref'), `${c.slug} page ${p}`);
    }
  }
  assert.ok((await q.getCategoryPage('student-life', 2)).items.length > 0, 'a real page 2 exists in the sample');
});

/* ------------------------------------------------------------------------------------ 2. privacy */

test('privacy: drafts, scheduled-for-later and trashed articles are invisible to every public query', { skip }, async () => {
  const slug = 'sensorium-when-a-courtyard-became-a-runway';
  const id = (await run(`SELECT id FROM ${T.posts} WHERE slug = ?`, [slug]))[0].id;
  const everywhere = async () => {
    const h = await q.getHomepage();
    const onHome = [h.lead, ...h.companions, h.spotlight, ...h.latest, ...h.sections.flatMap((x) => x.articles), ...h.picks].filter(Boolean).some((a) => a.slug === slug);
    const inCats = [];
    for (const c of seed.CATEGORIES) {
      const p1 = await q.getCategoryPage(c.slug, 1);
      for (let p = 1; p <= p1.totalPages; p++) {
        const d = await q.getCategoryPage(c.slug, p);
        if ([d.featured, ...d.items].filter(Boolean).some((a) => a.slug === slug)) inCats.push(c.slug);
      }
    }
    const other = await q.getArticleBySlug('a-graduating-class-steps-into-a-world-still-being-written');
    const inRelated = (await q.getRelatedArticles(other, 50)).some((a) => a.slug === slug);
    return { bySlug: Boolean(await q.getArticleBySlug(slug)), onHome, inCats: inCats.length > 0, inRelated };
  };
  assert.deepEqual(await everywhere(), { bySlug: true, onHome: true, inCats: true, inRelated: true }, 'baseline: live');

  for (const [label, sql] of [
    ['draft', `UPDATE ${T.posts} SET status = 'draft' WHERE id = ?`],
    ['scheduled for tomorrow', `UPDATE ${T.posts} SET status = 'scheduled', published_at = UTC_TIMESTAMP(3) + INTERVAL 1 DAY WHERE id = ?`],
    ['published but dated in the future', `UPDATE ${T.posts} SET status = 'published', published_at = UTC_TIMESTAMP(3) + INTERVAL 1 HOUR WHERE id = ?`],
    ['in Trash', `UPDATE ${T.posts} SET deleted_at = UTC_TIMESTAMP(3) WHERE id = ?`],
    ['no publication date', `UPDATE ${T.posts} SET status = 'published', published_at = NULL WHERE id = ?`],
  ]) {
    const [orig] = await run(`SELECT status, published_at, deleted_at FROM ${T.posts} WHERE id = ?`, [id]);
    await run(sql, [id]);
    assert.deepEqual(await everywhere(), { bySlug: false, onHome: false, inCats: false, inRelated: false }, label);
    await run(`UPDATE ${T.posts} SET status = ?, published_at = ?, deleted_at = ? WHERE id = ?`, [orig.status, orig.published_at, orig.deleted_at, id]);
  }
  /* a scheduled article appears by itself once its time has passed — no cron */
  await run(`UPDATE ${T.posts} SET status = 'scheduled', published_at = UTC_TIMESTAMP(3) - INTERVAL 1 SECOND WHERE id = ?`, [id]);
  assert.equal((await everywhere()).bySlug, true, 'scheduled + time passed = live');
  /* restore the Stage 2 date */
  await run(`UPDATE ${T.posts} SET status = 'published', published_at = ? WHERE id = ?`, [new Date(seed.ARTICLES.find((a) => a.slug === slug).publishedAt), id]);
});

/* ------------------------------------------------------------------------------------ 3. curation, edges */

test('homepage curation: empty Featured and Editor’s Picks stay empty (never auto-filled); a non-live slot is skipped', { skip }, async () => {
  const before = await q.getHomepage();
  const saved = await run(`SELECT * FROM ${T.homepageSlots} ORDER BY position`);
  await run(`DELETE FROM ${T.homepageSlots} WHERE zone IN ('featured', 'picks')`);
  let h = await q.getHomepage();
  assert.equal(h.spotlight, null, 'no Featured block');
  assert.deepEqual(h.picks, [], "no Editor's Picks block");
  assert.equal(h.companions.length, 4, 'hero still full');

  /* the centre slot's article goes back to draft: the lead falls back to the newest live story */
  const lead = saved.find((x) => x.zone === 'hero_centre').post_id;
  await run(`UPDATE ${T.posts} SET status = 'draft' WHERE id = ?`, [lead]);
  h = await q.getHomepage();
  assert.notEqual(h.lead.slug, before.lead.slug);
  assert.ok(![h.lead, ...h.companions, ...h.latest].some((a) => a.slug === before.lead.slug), 'the draft appears nowhere');
  /* each story at most once outside Editor's Picks */
  const shown = [h.lead, ...h.companions, h.spotlight, ...h.latest, ...h.sections.flatMap((x) => x.articles)].filter(Boolean).map((a) => a.slug);
  assert.equal(new Set(shown).size, shown.length);
  await run(`UPDATE ${T.posts} SET status = 'published' WHERE id = ?`, [lead]);

  /* hero slots with no curation at all: lead and side stories are the newest */
  await run(`DELETE FROM ${T.homepageSlots}`);
  h = await q.getHomepage();
  const newest = (await run(`SELECT slug FROM ${T.posts} WHERE status <> 'draft' AND deleted_at IS NULL AND published_at <= UTC_TIMESTAMP(3) ORDER BY published_at DESC, id DESC LIMIT 5`)).map((x) => x.slug);
  assert.deepEqual([h.lead.slug, ...h.companions.map((a) => a.slug)], newest);
  for (const r of saved) await run(`INSERT INTO ${T.homepageSlots} (position, zone, post_id) VALUES (?, ?, ?)`, [r.position, r.zone, r.post_id]);
});

test('pagination, unknown slugs, redirects, legacy encoded slugs and the indexing setting', { skip }, async () => {
  const p1 = await q.getCategoryPage('student-life', 1);
  assert.equal(p1.page, 1);
  assert.ok(p1.featured && p1.items.length <= 6);
  assert.deepEqual(await q.getCategoryPage('student-life', p1.totalPages + 1), { category: p1.category, outOfRange: true, totalPages: p1.totalPages });
  assert.equal(await q.getCategoryPage('no-such-category', 1), null);
  assert.equal(await q.getArticleBySlug("x' OR '1'='1"), null);
  assert.equal(await q.getArticleBySlug('a'.repeat(5000)), null);

  await run(`INSERT INTO ${T.redirects} (from_path, to_path, status_code, source) VALUES ('/news/old-wp-slug', '/news/placement-season-decoded', 301, 'wp_old_slug')`);
  assert.deepEqual(await q.findRedirect('/news/old-wp-slug'), { to: '/news/placement-season-decoded', status: 301 });
  assert.equal(await q.findRedirect('/news/nothing-here'), null);

  /* a WordPress percent-encoded slug is found from the decoded form Next.js passes */
  const decoded = 'मराठी-news';
  const stored = encodeURIComponent(decoded).toLowerCase();
  await run(`UPDATE ${T.posts} SET slug = ? WHERE slug = 'placement-season-decoded'`, [stored]);
  assert.equal((await q.getArticleBySlug(decoded))?.slug, stored);
  await run(`UPDATE ${T.posts} SET slug = 'placement-season-decoded' WHERE slug = ?`, [stored]);

  /* indexing: off by default, on only for an explicit true */
  assert.equal(await q.getIndexingEnabled(), false);
  for (const [v, expect] of [['"true"', false], ['1', false], ['"yes"', false], ['true', true], ['false', false]]) {
    await run(`REPLACE INTO ${T.settings} (setting_key, setting_value) VALUES ('indexing_enabled', ?)`, [v]);
    assert.equal(await q.getIndexingEnabled(), expect, `stored ${v}`);
  }
  await run(`DELETE FROM ${T.settings} WHERE setting_key = 'indexing_enabled'`);
});

/* ------------------------------------------------------------------------------------ 4. hierarchy */

test('hierarchy: a parent archive includes children and deeper descendants, each article once, paginated in order', { skip }, async () => {
  const id = async (slug) => (await run(`SELECT id FROM ${T.categories} WHERE slug = ?`, [slug]))[0].id;
  const post = async (slug) => (await run(`SELECT id FROM ${T.posts} WHERE slug = ?`, [slug]))[0].id;
  const academic = await id('academic');
  const child = (await run(`INSERT INTO ${T.categories} (parent_id, slug, name) VALUES (?, 'academic-labs', 'Labs')`, [academic])).insertId;
  const grand = (await run(`INSERT INTO ${T.categories} (parent_id, slug, name) VALUES (?, 'academic-labs-robotics', 'Robotics')`, [child])).insertId;
  /* X only in the grandchild; Y in the parent AND the child (must not be listed twice) */
  const X = 'sensorium-when-a-courtyard-became-a-runway';
  const Y = 'placement-season-decoded';
  const x = await post(X);
  const y = await post(Y);
  await run(`INSERT INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?)`, [x, grand]);
  await run(`INSERT IGNORE INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?), (?, ?)`, [y, academic, y, child]);

  const expected = (await run(
    `SELECT DISTINCT p.slug, p.published_at, p.id FROM ${T.posts} p JOIN ${T.postCategories} pc ON pc.post_id = p.id
      WHERE pc.category_id IN (?, ?, ?) AND p.deleted_at IS NULL AND p.status <> 'draft' AND p.published_at <= UTC_TIMESTAMP(3)
      ORDER BY p.published_at DESC, p.id DESC`, [academic, child, grand])).map((r) => r.slug);
  const first = await q.getCategoryPage('academic', 1);
  const all = [first.featured.slug, ...first.items.map((a) => a.slug)];
  for (let p = 2; p <= first.totalPages; p++) all.push(...(await q.getCategoryPage('academic', p)).items.map((a) => a.slug));
  assert.equal(first.total, expected.length, 'count = distinct live articles in the subtree');
  assert.deepEqual(all, expected, 'every article once, newest first, across all pages');
  assert.ok(all.includes(X), 'grandchild article is in the root archive');
  assert.equal(all.filter((s) => s === Y).length, 1, 'an article in two levels of the same branch is listed once');
  assert.deepEqual((await q.getCategoryPage('academic', first.totalPages + 1)).outOfRange, true);
  /* the child archive: its own + the grandchild's; the grandchild: only its own */
  const c1 = await q.getCategoryPage('academic-labs', 1);
  assert.deepEqual([c1.featured.slug, ...c1.items.map((a) => a.slug)].sort(), [X, Y].sort());
  const g1 = await q.getCategoryPage('academic-labs-robotics', 1);
  assert.deepEqual([g1.featured.slug, ...g1.items.map((a) => a.slug)], [X]);

  /* breadcrumbs: X's primary category becomes the grandchild → the full path, root first */
  const before = (await run(`SELECT primary_category_id FROM ${T.posts} WHERE id = ?`, [x]))[0].primary_category_id;
  await run(`UPDATE ${T.posts} SET primary_category_id = ? WHERE id = ?`, [grand, x]);
  const ax = await q.getArticleBySlug(X);
  assert.deepEqual(ax.categoryPath.map((c) => c.slug), ['academic', 'academic-labs', 'academic-labs-robotics']);
  assert.equal(ax.category.slug, 'academic-labs-robotics');
  assert.deepEqual(ax.categoryPath.map((c) => c.url), ['/news/category/academic', '/news/category/academic-labs', '/news/category/academic-labs-robotics'], 'flat URLs');
  assert.deepEqual((await q.getArticleBySlug('a-graduating-class-steps-into-a-world-still-being-written')).categoryPath.map((c) => c.slug), ['student-life'], 'a root primary: path of one');

  /* tidy */
  await run(`UPDATE ${T.posts} SET primary_category_id = ? WHERE id = ?`, [before, x]);
  await run(`DELETE FROM ${T.postCategories} WHERE category_id IN (?, ?) OR (post_id = ? AND category_id = ?)`, [child, grand, y, academic]);
  await run(`DELETE FROM ${T.categories} WHERE id = ?`, [grand]);
  await run(`DELETE FROM ${T.categories} WHERE id = ?`, [child]);
});

test('legacy nested category URLs: only a complete root-to-category chain resolves; everything else is a 404', { skip }, async () => {
  const academic = (await run(`SELECT id FROM ${T.categories} WHERE slug = 'academic'`))[0].id;
  const industry = (await run(`SELECT id FROM ${T.categories} WHERE slug = 'industry'`))[0].id;
  const a1 = (await run(`INSERT INTO ${T.categories} (parent_id, slug, name) VALUES (?, 'masterclass', 'Masterclass')`, [industry])).insertId;
  const a2 = (await run(`INSERT INTO ${T.categories} (parent_id, slug, name) VALUES (?, 'masterclass-series', 'Series')`, [a1])).insertId;
  /* the same NAME under another parent, different slug: never ambiguous, because slugs are unique */
  const g1 = (await run(`INSERT INTO ${T.categories} (parent_id, slug, name) VALUES (?, 'masterclass-academic', 'Masterclass')`, [academic])).insertId;
  const R = (segs) => q.resolveLegacyCategoryPath(segs);
  assert.deepEqual(await R(['industry', 'masterclass']), { to: '/news/category/masterclass' });
  assert.deepEqual(await R(['industry', 'masterclass', 'masterclass-series']), { to: '/news/category/masterclass-series' });
  assert.deepEqual(await R(['industry', 'masterclass', 'page', '3']), { to: '/news/category/masterclass/page/3' }, 'pagination kept');
  assert.deepEqual(await R(['industry', 'masterclass', 'page', '1']), { to: '/news/category/masterclass' }, 'page 1 is the base URL');
  assert.deepEqual(await R(['academic', 'masterclass-academic']), { to: '/news/category/masterclass-academic' }, 'same name, other branch');
  for (const bad of [
    ['academic', 'masterclass'], /* real slugs, wrong ancestor */
    ['masterclass', 'masterclass-series'], /* partial chain, root missing */
    ['masterclass-series', 'masterclass', 'industry'], /* reversed */
    ['industry', 'masterclass-series'], /* skips a level */
    ['industry', 'nope'], ['nope', 'masterclass'], /* unknown */
    ['industry'], /* a single segment is the normal route, never a redirect */
    ['industry', 'masterclass', 'page'], ['industry', 'masterclass', 'page', 'x'], ['industry', 'masterclass', 'page', '0'],
    ['industry', 'masterclass', 'extra', 'page', '2'], ['industry', 'masterclass', 'junk'],
    ['', 'masterclass'], [], 'industry/masterclass', ['industry', 'x'.repeat(300)],
  ]) {
    assert.equal(await R(bad), null, JSON.stringify(bad).slice(0, 80));
  }
  await run(`DELETE FROM ${T.categories} WHERE id IN (?, ?)`, [a2, g1]);
  await run(`DELETE FROM ${T.categories} WHERE id = ?`, [a1]);
});
