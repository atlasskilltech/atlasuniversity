/**
 * ATLAS News — WordPress import (lib/news/import/*).
 *
 * Pure tests (always run): dump parsing, the model's decisions, and the Gutenberg → HTML converter.
 * Database tests (need NEWS_TEST_DB_NAME, a local *_test database): a full import of a small synthetic dump
 * into `<NEWS_TEST_DB_NAME minus _test>_wpimport_test` with the local S3 stand-in — counts, hierarchy,
 * drafts, redirects, a rerun that changes nothing, and a post edited in the CMS that a rerun leaves alone.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import mysql from 'mysql2/promise';
import sharp from 'sharp';
import { parseWordPressDump, phpUnserialize } from '../../../lib/news/import/wpdump.js';
import { buildModel, clipWords } from '../../../lib/news/import/model.js';
import { convertPost, youtubeId } from '../../../lib/news/import/convert.js';
import { candidates } from '../../../lib/news/import/media.js';

/* ------------------------------------------------------------------ a tiny phpMyAdmin-style dump */
const P = 'wpx_';
const sqlVal = (v) => (v === null ? 'NULL' : typeof v === 'number' ? String(v) : `'${String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`);
function table(name, cols, rows) {
  const create = `CREATE TABLE \`${P}${name}\` (\n${cols.map((c) => `  \`${c}\` text`).join(',\n')}\n) ENGINE=InnoDB;\n`;
  const ins = rows.length ? `INSERT INTO \`${P}${name}\` (${cols.map((c) => `\`${c}\``).join(', ')}) VALUES\n${rows.map((r) => `(${cols.map((c) => sqlVal(r[c] ?? null)).join(', ')})`).join(',\n')};\n` : '';
  return create + ins;
}
const POSTCOLS = ['ID', 'post_author', 'post_date', 'post_date_gmt', 'post_content', 'post_title', 'post_excerpt', 'post_status', 'post_name', 'post_modified', 'post_modified_gmt', 'post_parent', 'menu_order', 'post_type', 'post_mime_type'];
const post = (o) => ({ post_author: '1', post_excerpt: '', post_parent: '0', menu_order: '0', post_mime_type: '', post_modified: o.post_date, post_modified_gmt: o.post_date_gmt ?? o.post_date, ...o });
const U = 'https://atlasuniversity.edu.in/news/wp-content/uploads';
const attMeta = (file, w, h, sizes = {}) => {
  const ser = (s) => `s:${Buffer.byteLength(s)}:"${s}";`;
  const sz = Object.entries(sizes).map(([k, [f, sw, sh]]) => `${ser(k)}a:3:{${ser('file')}${ser(f)}${ser('width')}i:${sw};${ser('height')}i:${sh};}`).join('');
  return `a:4:{${ser('width')}i:${w};${ser('height')}i:${h};${ser('file')}${ser(file)}${ser('sizes')}a:${Object.keys(sizes).length}:{${sz}}}`;
};

const BODY1 = [
  '<!-- wp:paragraph --><p>Opening line with <a href="https://atlasuniversity.edu.in/news/other-story/">a link</a> &amp; more.</p><!-- /wp:paragraph -->',
  '<!-- wp:spacer --><div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div><!-- /wp:spacer -->',
  `<!-- wp:image {"id":100} --><figure class="wp-block-image aligncenter size-large"><img src="${U}/2023/05/photo-1024x683.jpg" alt="" class="wp-image-100"/><figcaption class="wp-element-caption">Caption <strong>here</strong></figcaption></figure><!-- /wp:image -->`,
  `<!-- wp:gallery --><figure class="wp-block-gallery has-nested-images columns-3 is-cropped"><figure class="wp-block-image size-large"><img src="${U}/2023/05/photo-300x200.jpg" class="wp-image-100"/></figure><figure class="wp-block-image"><img src="${U}/2023/05/second.jpg" class="wp-image-101"/></figure><figcaption class="blocks-gallery-caption">Gallery caption</figcaption></figure><!-- /wp:gallery -->`,
  '<!-- wp:heading {"level":1} --><h1 class="wp-block-heading has-background" style="background-color:#e3f2fd">Big heading</h1><!-- /wp:heading -->',
  '<!-- wp:columns --><div class="wp-block-columns"><div class="wp-block-column"><p>Left</p></div><div class="wp-block-column"><p>Right <mark class="has-inline-color">marked</mark></p></div></div><!-- /wp:columns -->',
  '<!-- wp:pullquote --><figure class="wp-block-pullquote"><blockquote><p>Think ahead</p><cite>Someone</cite></blockquote></figure><!-- /wp:pullquote -->',
  '<!-- wp:embed {"url":"https://youtu.be/R_QTiErhEss"} --><figure class="wp-block-embed is-provider-youtube wp-block-embed-youtube"><div class="wp-block-embed__wrapper">\nhttps://youtu.be/R_QTiErhEss\n</div></figure><!-- /wp:embed -->',
  '<!-- wp:embed {"url":"https://vimeo.com/123"} --><figure class="wp-block-embed is-provider-vimeo"><div class="wp-block-embed__wrapper">https://vimeo.com/123</div></figure><!-- /wp:embed -->',
  `<!-- wp:video {"id":102} --><figure class="wp-block-video"><video controls src="${U}/2023/05/clip.mp4"></video></figure><!-- /wp:video -->`,
  '<!-- wp:paragraph --><p></p><!-- /wp:paragraph -->',
  '<!-- wp:image --><figure class="wp-block-image"><img src="" alt=""/></figure><!-- /wp:image -->',
  '<!-- wp:html --><iframe width="560" height="315" src="https://www.youtube.com/embed/Z_9_fjHQJK4" frameborder="0" allowfullscreen></iframe><script>alert(1)</script><!-- /wp:html -->',
].join('\n\n');

function dumpSql() {
  const posts = [
    post({ ID: '10', post_date: '2023-05-10 08:00:00', post_content: BODY1, post_title: 'Rock &amp; Roll Day', post_status: 'publish', post_name: 'rock-roll-day', post_type: 'post' }),
    post({ ID: '11', post_date: '2023-06-01 09:30:00', post_content: '<!-- wp:paragraph --><p>Second story.</p><!-- /wp:paragraph -->', post_title: 'Second', post_status: 'publish', post_name: 'second-story', post_type: 'post' }),
    post({ ID: '12', post_date: '2024-01-02 10:00:00', post_date_gmt: '0000-00-00 00:00:00', post_content: '<!-- wp:paragraph --><p>Not ready.</p><!-- /wp:paragraph -->', post_title: 'Draft idea', post_status: 'draft', post_name: '', post_type: 'post' }),
    post({ ID: '13', post_date: '2023-07-01 10:00:00', post_content: '<p>secret</p>', post_title: 'Private', post_status: 'private', post_name: 'private-one', post_type: 'post' }),
    post({ ID: '100', post_date: '2023-05-10 07:00:00', post_content: '', post_title: 'photo', post_status: 'inherit', post_name: 'photo', post_type: 'attachment', post_mime_type: 'image/jpeg', post_excerpt: 'Attachment caption' }),
    post({ ID: '101', post_date: '2023-05-10 07:00:00', post_content: '', post_title: 'second', post_status: 'inherit', post_name: 'second', post_type: 'attachment', post_mime_type: 'image/jpeg' }),
    post({ ID: '102', post_date: '2023-05-10 07:00:00', post_content: '', post_title: 'clip', post_status: 'inherit', post_name: 'clip', post_type: 'attachment', post_mime_type: 'video/mp4' }),
    post({ ID: '103', post_date: '2023-05-10 07:00:00', post_content: '', post_title: 'gone', post_status: 'inherit', post_name: 'gone', post_type: 'attachment', post_mime_type: 'image/jpeg' }),
    /* the header menu: a page link, Industry, and Masterclass under it; plus a theme demo menu */
    ...[['300', '1', 'Home'], ['301', '2', ''], ['302', '3', ''], ['400', '1', 'Vibe Weather']].map(([ID, order, title]) =>
      post({ ID, post_date: '2023-01-01 00:00:00', post_content: '', post_title: title, post_status: 'publish', post_name: ID, post_type: 'nav_menu_item', menu_order: order })),
    post({ ID: '200', post_date: '2023-01-01 00:00:00', post_content: '', post_title: 'Home', post_status: 'publish', post_name: 'home', post_type: 'page' }),
  ];
  const elementor = JSON.stringify([
    { elType: 'section', elements: [{ elType: 'column', elements: [
      { elType: 'widget', widgetType: 'posts-block-item-two', settings: { post_categories: [], post_number: 3, post_block_title: "What's Happening" } },
      { elType: 'widget', widgetType: 'posts-blocklist', settings: { post_block_title: 'x', post_list_sec_title: 'TOP HEADLINES', post_categories: ['events', 'masterclass'], post_number: 5 } },
    ] }] },
    { elType: 'section', elements: [{ elType: 'column', elements: [{ elType: 'widget', widgetType: 'heading', settings: { title: '<span>More Stories</span>' } }] }] },
    { elType: 'section', elements: [{ elType: 'column', elements: [
      { elType: 'widget', widgetType: 'posts-tab-one', settings: { tab_title_text: 'ACADEMICS', post_number: 6, tabs: [{ tab_menu_name: 'All', post_categories: ['industry'] }, { tab_menu_name: 'Events', post_categories: ['events'] }, { tab_menu_name: 'INSOFE', post_categories: ['insofe'] }] } },
      { elType: 'widget', widgetType: 'image', settings: { image: { url: 'https://example.com/banner.png' } } },
    ] }] },
    { elType: 'section', elements: [{ elType: 'column', elements: [
      { elType: 'widget', widgetType: 'heading', settings: { title: 'LATEST' } },
      { elType: 'widget', widgetType: 'posts-video-block', settings: { video_post_block_title: 'GLOBAL CONNECT', post_categories: ['globalconnect'], post_number: 3 } },
    ] }] },
  ]);
  const meta = [
    ['200', '_elementor_data', elementor],
    ['300', '_menu_item_type', 'post_type'], ['300', '_menu_item_object', 'page'], ['300', '_menu_item_object_id', '200'], ['300', '_menu_item_menu_item_parent', '0'],
    ['301', '_menu_item_type', 'taxonomy'], ['301', '_menu_item_object', 'category'], ['301', '_menu_item_object_id', '2'], ['301', '_menu_item_menu_item_parent', '0'],
    ['302', '_menu_item_type', 'taxonomy'], ['302', '_menu_item_object', 'category'], ['302', '_menu_item_object_id', '3'], ['302', '_menu_item_menu_item_parent', '301'],
    ['400', '_menu_item_type', 'custom'], ['400', '_menu_item_object', 'custom'], ['400', '_menu_item_object_id', '400'], ['400', '_menu_item_url', '#'],
    ['10', '_thumbnail_id', '100'], ['11', '_thumbnail_id', '103'], ['10', '_yoast_wpseo_title', 'Rock &amp; Roll | ATLAS'],
    ['10', '_yoast_wpseo_metadesc', 'A description. '.repeat(45)], ['10', '_yoast_wpseo_primary_category', '3'], ['10', '_wp_old_slug', 'rock-day'],
    ['100', '_wp_attached_file', '2023/05/photo.jpg'], ['100', '_wp_attachment_metadata', attMeta('2023/05/photo.jpg', 1600, 1067, { large: ['photo-1024x683.jpg', 1024, 683], medium: ['photo-300x200.jpg', 300, 200] })],
    ['100', '_wp_attachment_image_alt', 'Students on stage'],
    ['101', '_wp_attached_file', '2023/05/second.jpg'], ['102', '_wp_attached_file', '2023/05/clip.mp4'], ['103', '_wp_attached_file', '2023/05/gone.jpg'],
  ].map(([post_id, meta_key, meta_value], i) => ({ meta_id: String(i + 1), post_id, meta_key, meta_value }));
  const terms = [[1, 'Events &amp; Festivals', 'events'], [2, 'Industry', 'industry'], [3, 'Masterclass', 'masterclass'], [4, 'Homepage', 'homepage'], [5, 'Design', 'design-tag'], [6, 'Unused', 'unused-tag'], [7, 'Student Newsletter', 'student-newsletter'], [8, 'Footer Menu', 'footer-menu']];
  const tt = [[1, 1, 'category', 0], [2, 2, 'category', 0], [3, 3, 'category', 2], [4, 4, 'category', 0], [5, 5, 'post_tag', 0], [6, 6, 'post_tag', 0], [7, 7, 'nav_menu', 0], [8, 8, 'nav_menu', 0]];
  const rel = [[10, 1], [10, 3], [10, 4], [10, 5], [11, 3], [12, 2], [13, 1], [300, 7], [301, 7], [302, 7], [400, 8]];
  return [
    table('posts', POSTCOLS, posts),
    table('postmeta', ['meta_id', 'post_id', 'meta_key', 'meta_value'], meta),
    table('terms', ['term_id', 'name', 'slug', 'term_group', 'term_order'], terms.map(([a, b, c]) => ({ term_id: String(a), name: b, slug: c, term_group: '0', term_order: '0' }))),
    table('term_taxonomy', ['term_taxonomy_id', 'term_id', 'taxonomy', 'description', 'parent', 'count'], tt.map(([a, b, c, d]) => ({ term_taxonomy_id: String(a), term_id: String(b), taxonomy: c, description: '', parent: String(d), count: '0' }))),
    table('term_relationships', ['object_id', 'term_taxonomy_id', 'term_order'], rel.map(([a, b]) => ({ object_id: String(a), term_taxonomy_id: String(b), term_order: '0' }))),
    table('options', ['option_id', 'option_name', 'option_value', 'autoload'], [{ option_id: '1', option_name: 'home', option_value: 'https://atlasuniversity.edu.in/news/', autoload: 'yes' }, { option_id: '2', option_name: 'admin_email', option_value: 'secret@example.com', autoload: 'yes' }, { option_id: '3', option_name: 'page_on_front', option_value: '200', autoload: 'yes' }]),
    /* a plugin table sharing the prefix must not be mistaken for the core one */
    'CREATE TABLE `wpx_pmxe_posts` (\n  `id` text\n) ENGINE=InnoDB;\n',
  ].join('\n');
}

/* ------------------------------------------------------------------ pure */

test('dump: core prefix detected past a plugin table; escapes, NULL and option allow-list', () => {
  const t = parseWordPressDump(dumpSql());
  assert.equal(t.prefix, P);
  assert.equal(t.posts.length, 12, 'posts, attachments and menu items — never pages, revisions or products');
  assert.ok(t.posts[0].post_content.includes('\n\n'), 'escaped newlines restored');
  assert.deepEqual(t.options.map((o) => o.option_name), ['home', 'page_on_front'], 'non-allow-listed options (admin_email) are never read');
});

test('php unserialize counts UTF-8 bytes', () => {
  assert.deepEqual(phpUnserialize('a:2:{s:4:"file";s:13:"2023/é/x.jpg";s:5:"width";i:10;}'), { file: '2023/é/x.jpg', width: 10 });
});

test('model: the header menu and the homepage sections come from the dump, not from code', () => {
  const m = buildModel(parseWordPressDump(dumpSql()));
  assert.equal(m.menu.name, 'Student Newsletter', 'the menu with the most categories, not the theme demo menu');
  assert.deepEqual(m.menu.items, [{ termId: 2, order: 10 }, { termId: 3, order: 10 }]);
  assert.deepEqual(m.menu.ignored, ['Home'], 'the page link is not a category');
  assert.deepEqual(m.menu.mismatches, []);
  const h = m.homepage;
  assert.deepEqual(h.sections.map((s) => [s.id, s.layout, s.title, s.width]), [
    ['wp1', 'headlines', 'Top Headlines', 'full'],
    ['wp2', 'heading', 'More Stories', undefined],
    ['wp3', 'tabs', 'Academics', 'full'],
  ]);
  assert.deepEqual(h.sections[0].termIds, [1, 3]);
  assert.deepEqual(h.sections[2].tabs.map((t) => [t.label, t.termIds]), [['All', [2]], ['Events', [1]]]);
  assert.deepEqual(h.skipped.map((s) => s.widget), ['posts-block-item-two', 'posts-tab-one tab', 'image', 'posts-video-block', 'heading'],
    'every old block that is not reproduced is reported, with its reason');
});

test('homepage sections: validation', async () => {
  const { validateHomepageSections } = await import('../../../lib/news/cms/homepageSections.js');
  const known = new Set([1, 2, 3]);
  const ok = validateHomepageSections({ sections: [
    { id: 'a', layout: 'headlines', title: '  Top  Headlines ', categoryIds: ['1', 2, 2, 'x'], count: 5, offset: 0, width: 'half' },
    { id: 'b', layout: 'heading', title: 'More' },
    { id: 'c', layout: 'tabs', title: 'Academics', count: 6, tabs: [{ label: 'All', categoryIds: [1] }, { label: 'ISDI', categoryIds: [2] }] },
  ] }, known);
  assert.equal(ok.ok, true, JSON.stringify(ok.errors));
  assert.deepEqual(ok.value[0], { id: 'a', layout: 'headlines', title: 'Top Headlines', width: 'half', categoryIds: [1, 2], count: 5, offset: 0, tabs: [] });
  assert.deepEqual([ok.value[1].count, ok.value[1].categoryIds], [0, []]);
  const bad = validateHomepageSections({ sections: [
    { layout: 'nope', categoryIds: [9], count: 0 },
    { layout: 'heading', title: '' },
    { layout: 'tabs', count: 3, tabs: [{ label: '', categoryIds: [] }] },
    { layout: 'grid', categoryIds: [], count: 13, offset: 30 },
  ] }, known);
  assert.equal(bad.ok, false);
  for (const k of ['sections.0.layout', 'sections.0.categoryIds', 'sections.0.count', 'sections.1.title', 'sections.2.tabs', 'sections.2.tabs.0.label', 'sections.2.tabs.0.categoryIds', 'sections.3.categoryIds', 'sections.3.count', 'sections.3.offset']) {
    assert.ok(bad.errors[k], `expected an error at ${k}: ${JSON.stringify(bad.errors)}`);
  }
  assert.equal(validateHomepageSections({ sections: 'x' }, known).ok, false);
});

test('model: statuses, hierarchy, primary category, SEO, old slugs', () => {
  const m = buildModel(parseWordPressDump(dumpSql()));
  assert.deepEqual(m.posts.map((p) => [p.wpId, p.status]), [[10, 'published'], [11, 'published'], [12, 'draft']]);
  assert.equal(m.skipped.private, 1);
  const p = m.posts[0];
  assert.equal(p.title, 'Rock & Roll Day');
  assert.equal(p.primaryTermId, 3, 'Yoast primary');
  assert.equal(m.posts[1].primaryTermId, 3);
  assert.equal(m.posts[2].primaryTermId, 2);
  assert.equal(p.seoTitle, 'Rock & Roll | ATLAS');
  assert.ok(p.seoDescriptionCut && p.seoDescription.length <= 500 && p.seoDescription.endsWith('…'));
  assert.deepEqual(p.oldSlugs, ['rock-day']);
  assert.equal(m.posts[2].publishedAt, null, 'a draft has no publication date');
  assert.deepEqual(m.categories.map((c) => [c.slug, c.depth]), [['events', 0], ['industry', 0], ['homepage', 0], ['masterclass', 1]]);
  assert.equal(m.categories.find((c) => c.slug === 'masterclass').parentTermId, 2);
  assert.deepEqual(m.tags.map((t) => t.slug), ['design-tag'], 'only tags used by an imported post');
  assert.equal(m.attachments.get(100).alt, 'Students on stage');
  assert.equal(m.attachmentByFile.get('2023/05/photo-1024x683.jpg'), 100);
  /* rule-based primary: deepest category, never Homepage when there is another */
  assert.equal(clipWords('one two three', 8).text, 'one two…');
});

test('converter: every block type maps to the editorial vocabulary; nothing silently dropped', () => {
  const m = buildModel(parseWordPressDump(dumpSql()));
  const seen = [];
  const r = convertPost(m.posts[0].contentRaw, {
    site: m.site,
    image: (ref) => {
      seen.push(ref);
      return ref.attachmentId === 101 ? null : { src: 'https://cdn.test/a.webp', width: 1600, height: 1067, alt: 'from library' };
    },
    video: () => ({ src: 'https://cdn.test/v.mp4', type: 'video/mp4' }),
  });
  const h = r.html;
  assert.ok(!/wp:|wp-block|style=|<script|<h1|<mark/.test(h), h);
  assert.ok(h.includes('<a href="/news/other-story">a link</a> &amp; more'), 'internal links become site-relative');
  assert.ok(/<figure class="align-center"><img src="https:\/\/cdn.test\/a.webp" alt="from library" width="1600" height="1067"[^>]*\/><figcaption>Caption <strong>here<\/strong><\/figcaption><\/figure>/.test(h), h);
  assert.ok(h.includes('<div class="news-gallery is-cols-3"><figure class="news-gallery-item">'));
  assert.ok(h.includes(`src="${U}/2023/05/second.jpg"`), 'an unresolved image keeps its WordPress URL (reported, not dropped)');
  assert.ok(h.includes('<p>Gallery caption</p></div>'));
  assert.ok(h.includes('<h2>Big heading</h2>'));
  assert.ok(h.includes('<div class="news-columns is-cols-2"><div class="news-column"><p>Left</p></div><div class="news-column"><p>Right marked</p></div></div>'));
  assert.ok(h.includes('<blockquote class="news-pullquote"><p>Think ahead</p><cite>Someone</cite></blockquote>'));
  assert.equal((h.match(/youtube-nocookie\.com\/embed\/(R_QTiErhEss|Z_9_fjHQJK4)/g) || []).length, 2, 'embed block and raw iframe');
  assert.ok(h.includes('<p><a href="https://vimeo.com/123">https://vimeo.com/123</a></p>'), 'a non-YouTube embed becomes a link');
  assert.ok(h.includes('<figure class="news-video"><video controls preload="metadata" playsinline><source src="https://cdn.test/v.mp4" type="video/mp4" /></video></figure>') || h.includes('<source src="https://cdn.test/v.mp4" type="video/mp4"'), h);
  assert.ok(!h.includes('<p></p>'));
  assert.equal(r.report.imagesMissing.length, 1);
  assert.deepEqual(r.report.embedsAsLinks, ['https://vimeo.com/123']);
  assert.deepEqual(r.report.emptyInSource, ['img']);
  assert.deepEqual(r.report.droppedBySanitizer, {});
  const http = convertPost('<figure class="wp-block-image"><img src="x" class="wp-image-5"/></figure>', { site: m.site, image: () => ({ src: 'http://insecure.test/a.webp' }), video: () => null });
  assert.deepEqual(http.report.droppedBySanitizer, { img: 1 }, 'an image the sanitiser removes is reported');
  assert.equal(r.report.internalLinks, 1);
  assert.equal(r.excerpt, 'Opening line with a link & more.');
  assert.equal(youtubeId('https://www.youtube.com/watch?v=vjIdf6KzC64&t=3'), 'vjIdf6KzC64');
});

test('media candidates: original first, then WordPress\'s scaled copy, then sizes largest first', () => {
  const att = { file: '2023/05/a-scaled.jpg', originalFile: '2023/05/a.jpg', sizes: [{ file: '2023/05/a-300x200.jpg', width: 300 }, { file: '2023/05/a-2048x1365.jpg', width: 2048 }] };
  assert.deepEqual(candidates(att, null).map((c) => [c.path, c.why]), [['2023/05/a.jpg', 'original'], ['2023/05/a-scaled.jpg', 'wp-scaled'], ['2023/05/a-2048x1365.jpg', 'resized'], ['2023/05/a-300x200.jpg', 'resized']]);
  assert.deepEqual(candidates(null, '2023/05/b-1024x683.jpg').map((c) => c.path), ['2023/05/b.jpg', '2023/05/b-scaled.jpg', '2023/05/b-1024x683.jpg']);
});

/* ------------------------------------------------------------------ database */
const E = process.env;
const NAME = E.NEWS_TEST_DB_NAME ? E.NEWS_TEST_DB_NAME.replace(/_test$/, '_wpimport_test') : '';
const skip = E.NEWS_TEST_DB_NAME ? false : 'set NEWS_TEST_DB_NAME (a local *_test database) to run the WordPress import database tests';
let admin;
let stub;
let mod = {};
let T;
let media;

before(async () => {
  if (skip) return;
  if (!/_test$/.test(E.NEWS_TEST_DB_NAME) || !/^(127\.0\.0\.1|localhost)$/.test(E.NEWS_TEST_DB_HOST || '')) {
    throw new Error('refusing: NEWS_TEST_DB_NAME must end in _test and NEWS_TEST_DB_HOST must be local');
  }
  admin = await mysql.createConnection({ host: E.NEWS_TEST_DB_HOST, port: Number(E.NEWS_TEST_DB_PORT || 3306), user: E.NEWS_TEST_DB_USER, password: E.NEWS_TEST_DB_PASSWORD ?? '' });
  await admin.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin.query(`CREATE DATABASE \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  const { startS3Stub } = await import('./s3-stub.mjs');
  stub = await startS3Stub();
  Object.assign(process.env, {
    DB_HOST: E.NEWS_TEST_DB_HOST, DB_PORT: E.NEWS_TEST_DB_PORT || '3306', DB_USER: E.NEWS_TEST_DB_USER, DB_PASSWORD: E.NEWS_TEST_DB_PASSWORD ?? '', DB_NAME: NAME,
    ASSETS_S3_BUCKET: 'stub-bucket', AWS_S3_BUCKET: 'stub-bucket', ASSETS_S3_REGION: 'us-east-1', AWS_REGION: 'us-east-1', ASSETS_S3_PREFIX: '',
    ASSETS_S3_ENDPOINT: `http://127.0.0.1:${stub.port}`, NEXT_PUBLIC_ASSET_BASE_URL: 'https://cdn.test.invalid/stub-bucket',
    AWS_ACCESS_KEY_ID: 'stub-key', AWS_SECRET_ACCESS_KEY: 'stub-secret', AWS_SESSION_TOKEN: '', AWS_PROFILE: '',
  });
  mod = {
    ...(await import('../../../lib/news/db/migrate.js')),
    ...(await import('../../../lib/news/db/pool.js')),
    ...(await import('../../../lib/news/import/importer.js')),
  };
  T = (await import('../../../lib/news/config.js')).T;
  await mod.migrateUp();
  /* the uploads tree: the ORIGINAL of 100 is missing, its 1024 copy present; 101 present; 103 absent */
  media = fs.mkdtempSync(path.join(os.tmpdir(), 'wpimport-'));
  fs.mkdirSync(path.join(media, '2023', '05'), { recursive: true });
  const jpg = (w, h, r) => sharp({ create: { width: w, height: h, channels: 3, background: { r, g: 90, b: 140 } } }).jpeg().toBuffer();
  fs.writeFileSync(path.join(media, '2023/05/photo-1024x683.jpg'), await jpg(1024, 683, 10));
  fs.writeFileSync(path.join(media, '2023/05/second.jpg'), await jpg(800, 600, 200));
  fs.writeFileSync(path.join(media, '2023/05/clip.mp4'), Buffer.concat([Buffer.from([0, 0, 0, 0x18]), Buffer.from('ftypmp42'), Buffer.alloc(64)]));
});

after(async () => {
  if (skip) return;
  await mod.closePool?.();
  await stub?.close();
  await admin?.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin?.end();
  if (media) fs.rmSync(media, { recursive: true, force: true });
});

const model = () => buildModel(parseWordPressDump(dumpSql()));
const count = async (t, where = '1=1') => Number((await mod.query(`SELECT COUNT(*) n FROM ${t} WHERE ${where}`))[0].n);

test('import: dry run writes nothing', { skip }, async () => {
  const r = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: true });
  assert.equal(r.posts.published.created, 2);
  assert.equal(r.posts.draft.created, 1);
  assert.equal(await count(T.posts), 0);
  assert.equal(await count(T.media), 0);
  assert.equal(stub.log.filter((e) => e.method === 'PUT').length, 0, 'no S3 write in a dry run');
});

test('import: batched phases — one medium per batch, resumable, and posts refuse to start early', { skip }, async () => {
  const r1 = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'images', batch: 1 });
  assert.deepEqual([r1.progress.newThisRun, r1.progress.imagesStored, r1.progress.imagesPending, r1.progress.imagesNoLocalCopy], [1, 1, 1, 1]);
  assert.equal(await count(T.posts), 0, 'an images batch writes no posts');
  await assert.rejects(mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'posts' }), /refusing to write posts: 1 images and 1 videos/);
  assert.equal(await count(T.posts), 0);
  const r2 = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'images', batch: 1 });
  assert.deepEqual([r2.progress.newThisRun, r2.progress.imagesStored, r2.progress.imagesPending], [1, 2, 0], 'the second batch resumes where the first stopped');
  const r3 = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'images', batch: 1 });
  assert.equal(r3.progress.newThisRun, 0, 'nothing is re-processed once stored');
  const v = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'videos', batch: 5 });
  assert.deepEqual([v.progress.videosStored, v.progress.videosPending], [1, 0]);
  assert.equal(await count(T.media), 3);
});

test('import: posts, hierarchy, media, drafts, redirects — and every gap reported', { skip }, async () => {
  const r = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'posts' });
  assert.deepEqual([r.posts.published.created, r.posts.draft.created], [2, 1]);
  assert.deepEqual([r.categories.created, r.categories.existing, r.tags.created, r.tags.existing], [0, 4, 0, 1], 'created by the first (images) batch, reused here');
  assert.deepEqual([r.media.imagesCreated, r.media.imagesReused, r.media.videosCreated, r.media.videosReused], [0, 2, 0, 1], 'the posts phase stores no media');
  assert.equal(r.media.sourceKinds.resized, 1, 'photo came from WordPress\'s 1024 copy, and says so');
  assert.deepEqual(r.featured.missing.map((f) => f.wpId), [11], 'post 11\'s featured image has no local copy');
  assert.deepEqual(r.missingImages.map((x) => x.attachmentId), [103]);
  assert.equal(r.redirects.created, 1);
  assert.deepEqual(r.duplicates, { posts: 0, categories: 0, tags: 0, media: 0, redirects: 0 });
  assert.equal(r.slugAdjusted.length, 1, 'the draft had no slug');

  const [p10] = await mod.query(`SELECT * FROM ${T.posts} WHERE legacy_wp_id = 10`);
  assert.equal(p10.status, 'published');
  assert.equal(p10.slug, 'rock-roll-day');
  assert.equal(p10.title, 'Rock & Roll Day');
  assert.equal(p10.author_name, 'ATLAS News Desk');
  assert.equal(p10.published_at.toISOString(), '2023-05-10T08:00:00.000Z');
  assert.ok(p10.featured_media_id);
  assert.ok(p10.content_html.includes('<img src="https://cdn.test.invalid/stub-bucket/assets/news/media/2023/05/'), 'body images point at the stored renditions');
  assert.equal((p10.content_html.match(/<img /g) || []).length, 3, 'figure + both gallery images');
  assert.ok(p10.content_html.includes('.mp4" type="video/mp4"'));
  assert.equal(p10.legacy_url, 'https://atlasuniversity.edu.in/news/rock-roll-day/');
  const [primary] = await mod.query(`SELECT c.slug, p.slug parent FROM ${T.categories} c LEFT JOIN ${T.categories} p ON p.id = c.parent_id WHERE c.id = ?`, [p10.primary_category_id]);
  assert.deepEqual({ ...primary }, { slug: 'masterclass', parent: 'industry' });
  assert.equal(await count(T.postCategories, `post_id = ${p10.id}`), 3);
  assert.equal(await count(T.postTags, `post_id = ${p10.id}`), 1);
  const [red] = await mod.query(`SELECT from_path, to_path, status_code, source FROM ${T.redirects}`);
  assert.deepEqual({ ...red }, { from_path: '/news/rock-day', to_path: '/news/rock-roll-day', status_code: 301, source: 'wp_old_slug' });
  const [d] = await mod.query(`SELECT status, published_at, slug FROM ${T.posts} WHERE legacy_wp_id = 12`);
  assert.deepEqual({ ...d }, { status: 'draft', published_at: null, slug: 'draft-idea' });
  assert.equal(await count(T.posts, 'legacy_wp_id = 13'), 0, 'private posts are never imported');
  const [img] = await mod.query(`SELECT legacy_wp_id, legacy_path, alt_text, caption FROM ${T.media} WHERE legacy_wp_id = 100`);
  assert.deepEqual({ ...img }, { legacy_wp_id: 100, legacy_path: '2023/05/photo-1024x683.jpg', alt_text: 'Students on stage', caption: 'Attachment caption' });
  assert.ok(stub.log.filter((e) => e.method === 'PUT').every((e) => e.key.startsWith('/stub-bucket/assets/news/media/')));
});

test('import: a rerun changes nothing and uploads nothing', { skip }, async () => {
  const before = await mod.query(`SELECT id, updated_at, content_html FROM ${T.posts} ORDER BY id`);
  const puts = stub.log.filter((e) => e.method === 'PUT').length;
  const r = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false });
  assert.deepEqual([r.posts.published.created, r.posts.published.updated, r.posts.published.unchanged], [0, 0, 2]);
  assert.deepEqual([r.posts.draft.created, r.posts.draft.updated, r.posts.draft.unchanged], [0, 0, 1]);
  assert.deepEqual([r.categories.created, r.tags.created, r.media.imagesCreated, r.media.videosCreated, r.redirects.created], [0, 0, 0, 0, 0]);
  assert.equal(stub.log.filter((e) => e.method === 'PUT').length, puts);
  assert.deepEqual(await mod.query(`SELECT id, updated_at, content_html FROM ${T.posts} ORDER BY id`), before);
  assert.deepEqual([await count(T.posts), await count(T.categories), await count(T.tags), await count(T.media), await count(T.redirects)], [3, 4, 1, 3, 1]);
});

test('import: a post edited in the CMS is never overwritten; a WordPress change to an untouched post is applied', { skip }, async () => {
  await mod.query(`UPDATE ${T.posts} SET title = 'Edited by an editor' WHERE legacy_wp_id = 10`);
  const m = model();
  m.posts.find((p) => p.wpId === 11).title = 'Second (updated in WordPress)';
  m.posts.find((p) => p.wpId === 11).modifiedAt = new Date('2024-02-02T00:00:00Z');
  m.posts.find((p) => p.wpId === 10).title = 'Should not land';
  const r = await mod.runImport({ model: m, mediaRoots: [media], dryRun: false });
  assert.deepEqual(r.protectedPosts.map((p) => p.wpId), [10]);
  assert.equal(r.posts.published.updated, 1);
  assert.equal((await mod.query(`SELECT title FROM ${T.posts} WHERE legacy_wp_id = 10`))[0].title, 'Edited by an editor');
  const [p11] = await mod.query(`SELECT title, updated_at FROM ${T.posts} WHERE legacy_wp_id = 11`);
  assert.equal(p11.title, 'Second (updated in WordPress)');
  assert.equal(p11.updated_at.toISOString(), '2024-02-02T00:00:00.000Z');
  assert.equal(await count(T.posts), 3, 'still no duplicates');
});

test('import: a slug already used by a CMS article is not overwritten — the WordPress post is reported', { skip }, async () => {
  await mod.query(`INSERT INTO ${T.posts} (slug, title, content_html, status) VALUES ('fresh-one', 'Made in the CMS', '<p>x</p>', 'draft')`);
  const m = model();
  m.posts.push({ ...m.posts[1], wpId: 99, slug: 'fresh-one', oldSlugs: [] });
  const r = await mod.runImport({ model: m, mediaRoots: [media], dryRun: false });
  assert.deepEqual(r.skippedPosts.map((s) => [s.wpId, s.reason]), [[99, 'slug used by an article created in the CMS (not overwritten)']]);
  assert.equal((await mod.query(`SELECT title FROM ${T.posts} WHERE slug = 'fresh-one'`))[0].title, 'Made in the CMS');
});

test('import: the old menu and homepage become CMS data — rendered from the database, editor changes protected', { skip }, async () => {
  const pub = await import('../../../lib/news/public/queries.js');
  const { saveHomepageSections, getHomepageSections } = await import('../../../lib/news/cms/homepageSections.js');
  const cat = async (slug) => (await mod.query(`SELECT id, show_in_menu, menu_order FROM ${T.categories} WHERE slug = ?`, [slug]))[0];
  assert.deepEqual([(await cat('industry')).show_in_menu, (await cat('industry')).menu_order, (await cat('masterclass')).show_in_menu, (await cat('events')).show_in_menu], [1, 10, 1, 0]);

  const nav = await pub.getNavigation();
  assert.deepEqual(nav.map((c) => [c.name, c.children.map((x) => x.name)]), [['Industry', ['Masterclass']]], 'a dropdown from the category tree');

  const hs = await getHomepageSections();
  assert.deepEqual(hs.sections.map((s) => [s.layout, s.title]), [['headlines', 'Top Headlines'], ['heading', 'More Stories'], ['tabs', 'Academics']]);
  assert.deepEqual(hs.sections[0].categoryIds.sort(), [(await cat('events')).id, (await cat('masterclass')).id].sort(), 'WordPress term ids became this database\'s category ids');

  const home = await pub.getHomepage();
  assert.deepEqual(home.sections, [], 'configured sections replace the automatic category sections');
  assert.deepEqual(home.configured.map((s) => s.layout), ['headlines', 'heading', 'tabs']);
  assert.ok(home.configured[0].articles.length >= 1 && home.configured[2].tabs.length === 2, JSON.stringify(home.configured.map((s) => [s.layout, s.articles?.length, s.tabs?.length])));

  /* a rerun changes nothing */
  const again = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'posts' });
  assert.deepEqual([again.menu.set, again.menu.protected.length, again.homepage.result], [0, 0, 'unchanged']);

  /* editors change the menu order and a section title in the CMS: a rerun leaves both alone */
  await mod.query(`UPDATE ${T.categories} SET menu_order = 5 WHERE slug = 'industry'`);
  await saveHomepageSections({ sections: hs.sections.map((s, i) => (i === 0 ? { ...s, title: 'Headlines (edited)' } : s)) });
  const third = await mod.runImport({ model: model(), mediaRoots: [media], dryRun: false, phase: 'posts' });
  assert.deepEqual(third.menu.protected.map((p) => p.termId), [2]);
  assert.equal(third.homepage.result, 'protected');
  assert.equal((await cat('industry')).menu_order, 5);
  assert.equal((await getHomepageSections()).sections[0].title, 'Headlines (edited)');
});

/* ------------------------------------------------------------------ bundle: export → encrypt → apply */

test('bundle: AES-256-GCM round trip; a wrong key or a single changed byte is refused', async () => {
  const { encryptBundle, decryptBundle, fingerprint } = await import('../../../lib/news/import/bundle.js');
  const { randomBytes } = await import('node:crypto');
  const key = randomBytes(32);
  const enc = encryptBundle({ format: 'x', posts: [{ title: 'Unpublished draft' }] }, key);
  assert.ok(!enc.includes(Buffer.from('Unpublished draft')), 'nothing readable in the file');
  assert.equal(decryptBundle(enc, key).posts[0].title, 'Unpublished draft');
  assert.throws(() => decryptBundle(enc, randomBytes(32)), /wrong key or a damaged file/);
  const bad = Buffer.from(enc);
  bad[bad.length - 1] ^= 1;
  assert.throws(() => decryptBundle(bad, key), /wrong key or a damaged file/);
  assert.notEqual(fingerprint(enc), fingerprint(bad));
});

test('bundle: export from the import database, apply into a fresh database — identical, idempotent, editor-safe', { skip }, async () => {
  const { exportBundle, applyBundle, ASSET_TOKEN } = await import('../../../lib/news/import/bundle.js');
  const bundle = await exportBundle();
  assert.deepEqual(bundle.counts, { categories: 4, tags: 1, media: 3, posts: 3, published: 2, drafts: 1, redirects: 1, menuItems: 2, homepageSections: 3 });
  assert.ok(bundle.posts.every((p) => !p.html.includes('cdn.test.invalid')), 'no storage address leaves the machine');
  assert.ok(bundle.posts.find((p) => p.wpId === 10).html.includes(`${ASSET_TOKEN}/assets/news/media/2023/05/`));
  assert.ok(!JSON.stringify(bundle).includes('Private'), 'private posts are not in the import database, so not in the bundle');

  /* a second database standing in for production, with an article and a category made in the CMS */
  const target = NAME.replace(/_test$/, '_apply_test');
  await admin.query(`DROP DATABASE IF EXISTS \`${target}\``);
  await admin.query(`CREATE DATABASE \`${target}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await mod.closePool();
  process.env.DB_NAME = target;
  process.env.NEXT_PUBLIC_ASSET_BASE_URL = 'https://cdn.production.invalid';
  try {
    await mod.migrateUp();
    await mod.query(`INSERT INTO ${T.categories} (slug, name) VALUES ('industry', 'Industry (made in the CMS)')`);
    const dry = await applyBundle(bundle, { dryRun: true });
    assert.deepEqual([dry.storage.present, dry.storage.missing.length], [dry.storage.checked, 0]);
    assert.deepEqual([dry.categories.created, dry.categories.adopted, dry.media.created], [3, 1, 3]);
    assert.deepEqual([dry.posts.published.created, dry.posts.draft.created], [2, 1]);
    assert.equal(await count(T.posts), 0, 'a dry run writes nothing');
    assert.equal(await count(T.media), 0);

    const run = await applyBundle(bundle, { dryRun: false });
    assert.deepEqual([run.posts.published.created, run.posts.draft.created, run.redirects.created], [2, 1, 1]);
    assert.deepEqual(run.duplicates, { posts: 0, categories: 0, tags: 0, media: 0, redirects: 0 });
    const [p10] = await mod.query(`SELECT title, content_html, primary_category_id FROM ${T.posts} WHERE legacy_wp_id = 10`);
    assert.ok(p10.content_html.includes('<img src="https://cdn.production.invalid/assets/news/media/2023/05/'), 'asset references resolve to THIS server\'s storage');
    assert.ok(!p10.content_html.includes(ASSET_TOKEN));
    assert.equal((await mod.query(`SELECT name FROM ${T.categories} WHERE slug = 'industry'`))[0].name, 'Industry (made in the CMS)', 'a CMS category is linked, never renamed');

    /* the navigation and the homepage sections travel with the bundle, mapped to THIS database's ids */
    const pub = await import('../../../lib/news/public/queries.js');
    assert.deepEqual((await pub.getNavigation()).map((c) => [c.name, c.children.map((x) => x.name)]), [['Industry (made in the CMS)', ['Masterclass']]]);
    assert.equal(run.homepage.result, 'written');
    const hs = JSON.parse((await mod.query(`SELECT setting_value FROM ${T.settings} WHERE setting_key = 'homepage_sections'`))[0].setting_value);
    const targetIds = new Set((await mod.query(`SELECT id FROM ${T.categories}`)).map((r) => Number(r.id)));
    assert.ok(hs.sections.length === 3 && hs.sections.every((x) => [...x.categoryIds, ...x.tabs.flatMap((t) => t.categoryIds)].every((id) => targetIds.has(id))));

    const again = await applyBundle(bundle, { dryRun: false });
    assert.deepEqual([again.posts.published.unchanged, again.posts.draft.unchanged, again.media.created, again.categories.created], [2, 1, 0, 0]);
    await mod.query(`UPDATE ${T.posts} SET title = 'Fixed by an editor' WHERE legacy_wp_id = 10`);
    const third = await applyBundle(bundle, { dryRun: false });
    assert.deepEqual(third.protectedPosts.map((p) => p.wpId), [10]);
    assert.equal((await mod.query(`SELECT title FROM ${T.posts} WHERE legacy_wp_id = 10`))[0].title, 'Fixed by an editor');

    /* storage missing an object: a real run refuses before writing anything */
    const broken = { ...bundle, media: [...bundle.media, { ...bundle.media[0], ref: 999, sha256: 'f'.repeat(64), storageKey: 'assets/news/media/2023/05/missing-full.webp', variants: [] }] };
    await assert.rejects(applyBundle(broken, { dryRun: false }), /referenced media objects are missing/);
  } finally {
    await mod.closePool();
    process.env.DB_NAME = NAME;
    await admin.query(`DROP DATABASE IF EXISTS \`${target}\``);
  }
});
