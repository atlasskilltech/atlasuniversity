/**
 * TEST-ONLY: write the Stage 2 sample content (./fixtures — illustrative stories, never real news) into a
 * disposable `*_test` database, in exactly the shape the CMS stores. Used by public.test.mjs to prove
 * that the database-backed public pages reproduce the approved Stage 2 pages story for story.
 *
 * Never used by the application, never pointed at a real database (the callers refuse non-`_test` names).
 * Fixture images are local site files, not S3 objects: each gets a media row under
 * `assets/news/media/sample/…`, with the file's own size, so the layout data matches exactly.
 * Loading the fixtures needs the `@/` alias hook: node --import ./scripts/map/register.mjs
 */
import { createHash } from 'node:crypto';
import { T } from '../../../lib/news/config.js';
import { CATEGORIES } from './fixtures/categories.js';
import { ARTICLES, HOMEPAGE_SLOTS, TRENDING } from './fixtures/articles.js';

export { ARTICLES, CATEGORIES, HOMEPAGE_SLOTS, TRENDING };

/** the media key a fixture image is stored under (its local path, flattened) */
/** a UTC DATETIME(3) literal — independent of the seeding connection's time zone */
const utc = (d) => new Date(d).toISOString().slice(0, 23).replace('T', ' ');

export const sampleKey = (src) => `assets/news/media/sample/${src.replace(/^\/assets\//, '').replace(/[^a-z0-9.]+/gi, '_')}`;

/** run(sql, params) → rows; a mysql2 connection already USE-ing the test database */
/** `slots: false` leaves the homepage curation to the caller (e.g. through the CMS API) and returns the
 *  zones it would have written as `zones` (post ids). */
export async function seedSample(run, { slots = true } = {}) {
  const catId = new Map();
  for (const c of CATEGORIES) {
    const r = await run(
      `INSERT INTO ${T.categories} (slug, name, description, show_in_menu, menu_order, seo_title, seo_description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [c.slug, c.name, c.description || null, c.showInMenu ? 1 : 0, c.menuOrder ?? null, c.seoTitle || null, c.seoDescription || null],
    );
    catId.set(c.slug, r.insertId);
  }
  /* one media row per distinct image + alt + caption (a fixture can give a shared photo its own caption) */
  const mediaId = new Map();
  const mediaFor = async (m) => {
    if (!m) return null;
    const k = JSON.stringify([m.src, m.alt, m.caption || null]);
    if (mediaId.has(k)) return mediaId.get(k);
    const key = `${sampleKey(m.src)}#${mediaId.size}`.replace('#', '-v');
    const variants = [{ name: 'article', width: m.width, height: m.height, bytes: 0, key }];
    const r = await run(
      `INSERT INTO ${T.media} (storage_key, sha256, mime_type, byte_size, width, height, variants, alt_text, caption, original_filename)
       VALUES (?, ?, 'image/webp', 0, ?, ?, ?, ?, ?, ?)`,
      [key, createHash('sha256').update(k).digest('hex'), m.width, m.height, JSON.stringify(variants), m.alt || null, m.caption || null, m.src.split('/').pop()],
    );
    mediaId.set(k, r.insertId);
    return r.insertId;
  };
  const postId = new Map();
  for (const a of ARTICLES) {
    const fm = await mediaFor(a.featuredMedia);
    const published = utc(a.publishedAt);
    const r = await run(
      `INSERT INTO ${T.posts} (slug, title, excerpt, content_html, status, published_at, featured_media_id, primary_category_id, author_name,
                               seo_title, seo_description, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [a.slug, a.title, a.excerpt, a.contentHtml, a.status, published, fm, catId.get(a.primaryCategory), a.authorName,
        a.seoTitle, a.seoDescription, published, utc(a.updatedAt || a.publishedAt)],
    );
    postId.set(a.slug, r.insertId);
    for (const c of a.categories?.length ? a.categories : [a.primaryCategory]) {
      await run(`INSERT INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?)`, [r.insertId, catId.get(c)]);
    }
  }
  /* Stage 2's five slots → zones: lead, three hero companions (2 left, 1 right — the 4th is topped up),
     the spotlight (Featured). Its "Most read" list becomes Editor's Picks, minus any story already in a
     slot (one article, one slot). */
  const [s0, s1, s2, s3, s4] = HOMEPAGE_SLOTS;
  const placed = [['hero_centre', 1, s0], ['hero_left', 2, s1], ['hero_left', 3, s2], ['hero_right', 4, s3], ['featured', 10, s4]];
  const picks = TRENDING.filter((s) => !HOMEPAGE_SLOTS.includes(s));
  picks.forEach((s, i) => placed.push(['picks', 20 + i, s]));
  const zones = {};
  for (const [zone, position, slug] of placed) {
    (zones[zone] ||= []).push(postId.get(slug));
    if (slots) await run(`INSERT INTO ${T.homepageSlots} (position, zone, post_id) VALUES (?, ?, ?)`, [position, zone, postId.get(slug)]);
  }
  return { catId, postId, mediaId, picks, zones };
}
