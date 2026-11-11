/**
 * ATLAS News — Stage 3 CMS validation (pure; no database).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  HOMEPAGE_ZONES, HOMEPAGE_ZONE_NAMES, likePattern, listParams, normaliseCanonical, normaliseSlug, parseDate, toId,
  validateArticle, validateCategory, validateHomepage,
} from '../../../lib/news/cms/validate.js';

const NOW = new Date('2026-11-09T10:00:00.000Z');
const base = { title: 'Campus opens', contentHtml: '<p>Body</p>', categoryIds: [3], status: 'draft' };

test('article: a draft needs only a title; slug is generated; author defaults', () => {
  const { value, errors } = validateArticle({ title: '  New  <b>campus</b> & labs ', status: 'draft' }, { now: NOW });
  assert.deepEqual(errors, {});
  assert.equal(value.title, 'New campus & labs');
  assert.equal(value.slug, 'new-campus-and-labs');
  assert.equal(value.authorName, 'ATLAS News Desk');
  assert.equal(value.publishedAt, null);
  assert.deepEqual(validateArticle({ status: 'draft' }, { now: NOW }).errors.title, 'Enter a title.');
});

test('article: publish/schedule rules for dates, body and categories', () => {
  /* published without a date → now */
  let r = validateArticle({ ...base, status: 'published' }, { now: NOW });
  assert.deepEqual(r.errors, {});
  assert.equal(r.value.publishedAt.toISOString(), NOW.toISOString());
  /* published in the future → told to schedule */
  r = validateArticle({ ...base, status: 'published', publishedAt: '2026-11-10T10:00:00Z' }, { now: NOW });
  assert.match(r.errors.publishedAt, /Scheduled/);
  /* scheduled needs a future date */
  assert.match(validateArticle({ ...base, status: 'scheduled' }, { now: NOW }).errors.publishedAt, /Choose when/);
  assert.match(validateArticle({ ...base, status: 'scheduled', publishedAt: '2026-11-08T10:00:00Z' }, { now: NOW }).errors.publishedAt, /future/);
  r = validateArticle({ ...base, status: 'scheduled', publishedAt: '2026-11-10T09:30:00+05:30' }, { now: NOW });
  assert.deepEqual(r.errors, {});
  assert.equal(r.value.publishedAt.toISOString(), '2026-11-10T04:00:00.000Z', 'offset honoured, stored as UTC');
  /* publishing needs a body and a category; a draft does not */
  r = validateArticle({ title: 'x', status: 'published', contentHtml: '<script>x</script>' }, { now: NOW });
  assert.ok(r.errors.contentHtml && r.errors.categoryIds);
  assert.deepEqual(validateArticle({ title: 'x', status: 'draft' }, { now: NOW }).errors, {});
  assert.match(validateArticle({ ...base, status: 'live' }, { now: NOW }).errors.status, /draft, scheduled or published/);
  assert.match(validateArticle({ ...base, publishedAt: '10/11/2026' }, { now: NOW }).errors.publishedAt, /valid date/);
});

test('article: body is sanitised (H1 → H2, scripts gone) and size-capped', () => {
  const r = validateArticle({ ...base, contentHtml: '<h1>Pasted</h1><p onclick="x">a<script>b</script></p><h6>small</h6>' }, { now: NOW });
  assert.equal(r.value.contentHtml, '<h2>Pasted</h2><p>a</p><h6>small</h6>');
  assert.match(validateArticle({ ...base, contentHtml: 'x'.repeat(2 * 1024 * 1024 + 1) }, { now: NOW }).errors.contentHtml, /too large/);
});

test('article: categories, primary category and ids', () => {
  let r = validateArticle({ ...base, categoryIds: ['4', 4, 7], primaryCategoryId: 9 }, { now: NOW });
  assert.deepEqual(r.value.categoryIds, [9, 4, 7], 'deduplicated, primary added first');
  assert.equal(r.value.primaryCategoryId, 9);
  r = validateArticle({ ...base, categoryIds: [5, 6] }, { now: NOW });
  assert.equal(r.value.primaryCategoryId, 5, 'first category is primary by default');
  assert.ok(validateArticle({ ...base, categoryIds: ['x'] }, { now: NOW }).errors.categoryIds);
  assert.ok(validateArticle({ ...base, categoryIds: 'nope' }, { now: NOW }).errors.categoryIds);
  assert.ok(validateArticle({ ...base, featuredMediaId: '1; DROP' }, { now: NOW }).errors.featuredMediaId);
  assert.equal(validateArticle({ ...base, featuredMediaId: '' }, { now: NOW }).value.featuredMediaId, null);
});

test('slugs: generated, validated, reserved refused, an existing legacy slug kept as-is', () => {
  assert.deepEqual(normaliseSlug('', { fallback: 'Hello World!', maxLength: 400 }), { slug: 'hello-world' });
  assert.deepEqual(normaliseSlug('My-Slug', { fallback: '', maxLength: 400 }), { slug: 'my-slug' });
  assert.match(normaliseSlug('admin', { fallback: '', maxLength: 400 }).error, /reserved/);
  assert.match(normaliseSlug('has space', { fallback: '', maxLength: 400 }).error, /lower-case/);
  assert.match(normaliseSlug('', { fallback: '!!!', maxLength: 400 }).error, /Enter a slug/);
  const legacy = '%e0%a4%ae-atlas';
  assert.match(normaliseSlug(legacy, { fallback: '', maxLength: 400 }).error, /lower-case/, 'a new legacy-style slug is refused');
  assert.deepEqual(normaliseSlug(legacy, { fallback: '', currentSlug: legacy, maxLength: 400 }), { slug: legacy }, 'the existing one is kept');
});

test('canonical URL: https or site-relative only', () => {
  assert.deepEqual(normaliseCanonical(''), { value: null });
  assert.deepEqual(normaliseCanonical('/news/x'), { value: '/news/x' });
  assert.deepEqual(normaliseCanonical('https://atlasuniversity.edu.in/news/x'), { value: 'https://atlasuniversity.edu.in/news/x' });
  for (const bad of ['http://x.com', 'javascript:alert(1)', '//evil.com/x', 'https://u:p@x.com/', 'ftp://x', 'news/x', `/${'a'.repeat(700)}`]) {
    assert.ok(normaliseCanonical(bad).error, bad);
  }
});

test('category: name, slug, menu order, booleans', () => {
  const { value, errors } = validateCategory({ name: 'Campus Life', showInMenu: 'on', isFeatured: true, menuOrder: '3' });
  assert.deepEqual(errors, {});
  assert.equal(value.slug, 'campus-life');
  assert.equal(value.showInMenu, true);
  assert.equal(value.menuOrder, 3);
  assert.ok(validateCategory({ name: 'x', menuOrder: -1 }).errors.menuOrder);
  assert.ok(validateCategory({ name: 'x', menuOrder: 1.5 }).errors.menuOrder);
  assert.ok(validateCategory({}).errors.name);
  assert.match(validateCategory({ name: 'Category' }).errors.slug, /reserved/);
});

test('category parent: absent = unchanged, null = root, an id = that parent, anything else refused', () => {
  assert.equal(validateCategory({ name: 'A' }).value.parentId, undefined, 'absent: an older form can never re-root a category');
  assert.equal(validateCategory({ name: 'A', parentId: null }).value.parentId, null);
  assert.equal(validateCategory({ name: 'A', parentId: '' }).value.parentId, null);
  assert.equal(validateCategory({ name: 'A', parentId: '12' }).value.parentId, 12);
  assert.equal(validateCategory({ name: 'A', parentId: 7 }).value.parentId, 7);
  for (const bad of ['x', -1, 0, 1.5, '12; DROP', [3]]) assert.ok(validateCategory({ name: 'A', parentId: bad }).errors.parentId, String(bad));
});

test('homepage: zones are exactly the approved five, with fixed capacities and position ranges', () => {
  assert.deepEqual(HOMEPAGE_ZONE_NAMES, ['hero_centre', 'hero_left', 'hero_right', 'featured', 'picks']);
  assert.deepEqual(HOMEPAGE_ZONES.map((z) => z.max), [1, 2, 2, 1, 5]);
  /* every position is unique and fits TINYINT UNSIGNED */
  const positions = HOMEPAGE_ZONES.flatMap((z) => Array.from({ length: z.max }, (_, i) => z.base + i));
  assert.equal(new Set(positions).size, positions.length);
  assert.ok(positions.every((p) => p >= 1 && p <= 255));
});

test('homepage: one article, one slot — a clear message names the article and where it already is', () => {
  const titles = new Map([[11, 'Convocation 2026']]);
  const r = validateHomepage({ zones: { hero_centre: [11], picks: [12, 11] } }, { titles });
  assert.match(r.errors.picks, /“Convocation 2026” is already placed in Hero — centre \(lead story\)\. An article can occupy only one homepage slot/);
  const ok = validateHomepage({ zones: { hero_centre: ['11'], hero_left: [12, 13], picks: [14] } });
  assert.deepEqual(ok.errors, {});
  assert.deepEqual(ok.value, [
    { zone: 'hero_centre', position: 1, postId: 11 },
    { zone: 'hero_left', position: 2, postId: 12 },
    { zone: 'hero_left', position: 3, postId: 13 },
    { zone: 'picks', position: 20, postId: 14 },
  ]);
});

test('homepage: unknown zones, over-capacity and bad ids are refused (server-side, whatever the SQL mode)', () => {
  assert.match(validateHomepage({ zones: { sidebar: [1] } }).errors.sidebar, /Unknown homepage area/);
  assert.match(validateHomepage({ zones: { hero_centre: [1, 2] } }).errors.hero_centre, /at most 1 article/);
  assert.match(validateHomepage({ zones: { picks: [1, 2, 3, 4, 5, 6] } }).errors.picks, /at most 5/);
  assert.ok(validateHomepage({ zones: { picks: ['x'] } }).errors.picks);
  assert.ok(validateHomepage({ zones: { picks: 'x' } }).errors.picks);
  assert.ok(validateHomepage({}).errors._);
  assert.ok(validateHomepage({ zones: { __proto__: [1] } }).errors);
});

test('list params and LIKE escaping', () => {
  const p = listParams(new URLSearchParams('page=0&pageSize=999&filter=bogus&sort=evil;DROP&q=%3Cb%3Ex%3C/b%3E&category=4'));
  assert.deepEqual(p, { page: 1, pageSize: 100, q: 'x', filter: 'all', sort: 'updated', categoryId: 4 });
  assert.equal(likePattern('50%_off\\'), '%50\\%\\_off\\\\%');
  assert.equal(toId('007'), 7);
  assert.ok(Number.isNaN(toId('-1')));
  assert.ok(Number.isNaN(parseDate('2026-11-09').getTime()), 'a date without time/offset is refused');
});
