/**
 * ATLAS News — category hierarchy (migration 0003 + lib/news/cms/categories.js), against a disposable
 * LOCAL database: `<NEWS_TEST_DB_NAME minus _test>_tree_test` (same guards as db.test.mjs).
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';

const E = process.env;
const NAME = E.NEWS_TEST_DB_NAME ? E.NEWS_TEST_DB_NAME.replace(/_test$/, '_tree_test') : '';
const skip = E.NEWS_TEST_DB_NAME ? false : 'set NEWS_TEST_DB_NAME (a local *_test database) to run the category hierarchy tests';

let admin;
let m = {};
let T;

before(async () => {
  if (skip) return;
  if (!/_test$/.test(E.NEWS_TEST_DB_NAME) || !/^(127\.0\.0\.1|localhost)$/.test(E.NEWS_TEST_DB_HOST || '')) {
    throw new Error('refusing: NEWS_TEST_DB_NAME must end in _test and NEWS_TEST_DB_HOST must be local');
  }
  admin = await mysql.createConnection({ host: E.NEWS_TEST_DB_HOST, port: Number(E.NEWS_TEST_DB_PORT || 3306), user: E.NEWS_TEST_DB_USER, password: E.NEWS_TEST_DB_PASSWORD ?? '' });
  await admin.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin.query(`CREATE DATABASE \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  Object.assign(process.env, { DB_HOST: E.NEWS_TEST_DB_HOST, DB_PORT: E.NEWS_TEST_DB_PORT || '3306', DB_USER: E.NEWS_TEST_DB_USER, DB_PASSWORD: E.NEWS_TEST_DB_PASSWORD ?? '', DB_NAME: NAME });
  m = {
    ...(await import('../../../lib/news/db/migrate.js')),
    ...(await import('../../../lib/news/db/pool.js')),
    ...(await import('../../../lib/news/cms/categories.js')),
    ...(await import('../../../lib/news/cms/articles.js')),
    CmsError: (await import('../../../lib/news/cms/errors.js')).CmsError,
    MAX: (await import('../../../lib/news/cms/validate.js')).MAX_CATEGORY_DEPTH,
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

async function cmsRejects(promise, status, code) {
  let err;
  await assert.rejects(promise, (e) => {
    err = e;
    return e instanceof m.CmsError && e.status === status && (!code || e.code === code);
  });
  return err;
}
const make = async (name, parentId) => (await m.createCategory(parentId === undefined ? { name } : { name, parentId })).id;
const byId = async () => new Map((await m.listCategories()).map((c) => [c.id, c]));
const snapshot = async () => (await m.query(`SELECT id, parent_id FROM ${T.categories} ORDER BY id`)).map((r) => `${r.id}:${r.parent_id}`).join(',');

const ids = {};

test('roots: created without a parent, or with parentId null', { skip }, async () => {
  ids.industry = await make('Industry');
  ids.global = await make('Global', null);
  const c = await byId();
  assert.equal(c.get(ids.industry).parentId, null);
  assert.equal(c.get(ids.industry).depth, 1);
  assert.equal(c.get(ids.global).parentId, null);
});

test('children and four-level nesting (the WordPress maximum), with depth and child counts', { skip }, async () => {
  ids.masterclass = await make('Masterclass', ids.industry);
  ids.l3 = await make('Leadership Series', ids.masterclass);
  ids.l4 = await make('Leadership 2026', ids.l3);
  /* the same display name under another parent is allowed (slugs stay unique) */
  ids.gMasterclass = (await m.createCategory({ name: 'Masterclass', slug: 'masterclass-global', parentId: ids.global })).id;
  const c = await byId();
  assert.deepEqual([ids.industry, ids.masterclass, ids.l3, ids.l4].map((i) => c.get(i).depth), [1, 2, 3, 4]);
  assert.equal(c.get(ids.l4).parentId, ids.l3);
  assert.equal(c.get(ids.industry).childCount, 1);
  assert.equal(c.get(ids.gMasterclass).parentId, ids.global);
  assert.equal((await m.getCategory(ids.l4)).parentId, ids.l3);
});

test('invalid parents are refused and nothing is written', { skip }, async () => {
  const before = await snapshot();
  let e = await cmsRejects(m.createCategory({ name: 'Orphan', parentId: 999999 }), 400, 'validation');
  assert.match(e.fields.parentId, /does not exist/);
  e = await cmsRejects(m.createCategory({ name: 'Bad', parentId: 'x' }), 400, 'validation');
  assert.ok(e.fields.parentId);
  await cmsRejects(m.updateCategory(ids.l3, { name: 'Leadership Series', parentId: 999999 }), 400, 'validation');
  assert.equal(await snapshot(), before);
});

test('circular hierarchy is impossible: itself, its child, or any descendant', { skip }, async () => {
  const before = await snapshot();
  let e = await cmsRejects(m.updateCategory(ids.masterclass, { name: 'Masterclass', parentId: ids.masterclass }), 400, 'category_cycle');
  assert.match(e.fields.parentId, /own parent/);
  e = await cmsRejects(m.updateCategory(ids.industry, { name: 'Industry', parentId: ids.masterclass }), 409, 'category_cycle');
  assert.match(e.fields.parentId, /“Masterclass” is inside this category/);
  await cmsRejects(m.updateCategory(ids.industry, { name: 'Industry', parentId: ids.l4 }), 409, 'category_cycle');
  assert.equal(await snapshot(), before, 'nothing changed');
});

test('a category moves with its whole subtree; slugs (public URLs) do not change', { skip }, async () => {
  const slugs = async () => (await m.query(`SELECT slug FROM ${T.categories} WHERE id IN (?, ?)`, [ids.l3, ids.l4])).map((r) => r.slug).sort();
  const s0 = await slugs();
  const r = await m.updateCategory(ids.l3, { name: 'Leadership Series', parentId: ids.global });
  assert.equal(r.parentId, ids.global);
  let c = await byId();
  assert.equal(c.get(ids.l3).depth, 2);
  assert.equal(c.get(ids.l4).depth, 3, 'the child came along');
  assert.equal(c.get(ids.l4).parentId, ids.l3);
  assert.deepEqual(await slugs(), s0);
  /* back under Masterclass (4 levels again), then to the root and back */
  await m.updateCategory(ids.l3, { name: 'Leadership Series', parentId: ids.masterclass });
  await m.updateCategory(ids.l3, { name: 'Leadership Series', parentId: null });
  assert.equal((await byId()).get(ids.l3).depth, 1);
  await m.updateCategory(ids.l3, { name: 'Leadership Series', parentId: ids.masterclass });
  c = await byId();
  assert.equal(c.get(ids.l4).depth, 4);
});

test('compatibility: an update WITHOUT parentId (the current form) never moves a category', { skip }, async () => {
  const r = await m.updateCategory(ids.l4, { name: 'Leadership 2026', description: 'edited by an older form' });
  assert.equal(r.parentId, ids.l3, 'parent kept');
  assert.equal((await m.getCategory(ids.l4)).description, 'edited by an older form');
});

test('depth limit: no chain deeper than MAX_CATEGORY_DEPTH, including by moving a subtree', { skip }, async () => {
  let parent = ids.l4; // level 4
  const extra = [];
  for (let level = 5; level <= m.MAX; level++) {
    parent = await make(`Level ${level}`, parent);
    extra.push(parent);
  }
  const e = await cmsRejects(m.createCategory({ name: 'Too deep', parentId: parent }), 409, 'category_too_deep');
  assert.match(e.fields.parentId, new RegExp(`at most ${m.MAX} levels`));
  /* moving the 3-level subtree under Level 4 would make 7 levels */
  const deep = await make('Deep root');
  const d2 = await make('Deep 2', deep);
  await make('Deep 3', d2);
  await cmsRejects(m.updateCategory(deep, { name: 'Deep root', parentId: ids.l4 }), 409, 'category_too_deep');
  assert.equal((await byId()).get(deep).parentId, null, 'not moved');
  /* tidy the extra levels (leaf first) */
  for (const i of [...extra].reverse()) await m.deleteCategory(i);
});

test('deletion: refused while sub-categories exist (named in the message), allowed for an empty leaf', { skip }, async () => {
  const before = await snapshot();
  const e = await cmsRejects(m.deleteCategory(ids.industry), 409, 'category_has_children');
  assert.match(e.message, /“Industry” has 1 sub-category \(“Masterclass”\)/);
  await cmsRejects(m.deleteCategory(ids.l3), 409, 'category_has_children');
  assert.equal(await snapshot(), before, 'no descendant deleted or re-rooted');
  const leaf = await make('Temporary leaf', ids.global);
  await m.deleteCategory(leaf);
  assert.equal(await m.getCategory(leaf), null);
});

test('deletion: a leaf that still has articles is refused (existing rule unchanged)', { skip }, async () => {
  await m.createArticle({ title: 'Leadership talk', status: 'draft', categoryIds: [ids.l4] });
  const e = await cmsRejects(m.deleteCategory(ids.l4), 409, 'category_in_use');
  assert.match(e.message, /used by 1 article/);
});

test('existing rules still hold for nested categories: menu limit, slug rename redirect', { skip }, async () => {
  for (let i = 0; i < 8; i++) await m.createCategory({ name: `Menu ${i}`, showInMenu: true });
  /* the limit counts TOP-LEVEL entries only: a ninth root is refused, a sub-category in a dropdown is not */
  await cmsRejects(m.createCategory({ name: 'Ninth', showInMenu: true }), 409, 'menu_full');
  const sub = await m.createCategory({ name: 'Ninth (sub)', showInMenu: true, parentId: ids.global });
  assert.ok(sub.id, 'a sub-category may join the menu with 8 top-level entries');
  await cmsRejects(m.updateCategory(sub.id, { name: 'Ninth (sub)', showInMenu: true, parentId: null }), 409, 'menu_full');
  const r = await m.updateCategory(ids.masterclass, { name: 'Masterclass', slug: 'masterclasses' });
  assert.equal(r.redirectFrom, '/news/category/masterclass');
  assert.equal(r.parentId, ids.industry, 'renaming the slug keeps the parent');
});

test('concurrency: two simultaneous opposite moves cannot create a cycle', { skip }, async () => {
  const x = await make('Concurrent X');
  const y = await make('Concurrent Y');
  const results = await Promise.allSettled([
    m.updateCategory(x, { name: 'Concurrent X', parentId: y }),
    m.updateCategory(y, { name: 'Concurrent Y', parentId: x }),
  ]);
  const ok = results.filter((r) => r.status === 'fulfilled').length;
  assert.equal(ok, 1, 'exactly one move succeeds');
  const rejected = results.find((r) => r.status === 'rejected');
  assert.ok(rejected.reason instanceof m.CmsError && rejected.reason.code === 'category_cycle', String(rejected.reason?.code || rejected.reason));
  const c = await byId();
  assert.ok(!(c.get(x).parentId === y && c.get(y).parentId === x), 'no two-node loop');
});
