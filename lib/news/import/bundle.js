/**
 * ATLAS News — WordPress import bundle: the verified result of a LOCAL import, carried to the production
 * server and applied there (the production database only accepts connections from the application server).
 *
 * Contents — only approved News content, read back from the local import database:
 *   categories (with their parent), tags, media rows (S3 keys, checksums, dimensions — the objects themselves
 *   are uploaded separately), the imported posts (published + drafts), their category/tag links and old-slug
 *   redirects. Never: WordPress users, private posts, passwords, options, comments or any other table.
 *   Media URLs in the article bodies are stored as `{{NEWS_ASSET}}/assets/news/...` and resolved on the server
 *   with ITS storage settings, so the bundle never carries a local or stand-in address.
 *
 * At rest and in transit the bundle is AES-256-GCM encrypted (it contains unpublished drafts):
 *   file = "ANWB1" | iv (12 bytes) | auth tag (16) | ciphertext of gzip(JSON)
 * The key never travels with the file. Its fingerprint (SHA-256 of the file) is what an operator confirms
 * before the real import.
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { gunzipSync, gzipSync } from 'node:zlib';
import { T } from '../config.js';
import { getPool } from '../db/pool.js';
import { sanitizeArticleHtml } from '../content/sanitize.js';
import { objectKey, publicUrl, s3Config } from '../storage/s3.js';
import { applyHomepageSections, applyMenu, countDuplicates, iso, readLedger, upsertTerms, writePost } from './write.js';

const MAGIC = Buffer.from('ANWB1');
export const ASSET_TOKEN = '{{NEWS_ASSET}}';
const TOKEN_RE = /\{\{NEWS_ASSET\}\}\/(assets\/news\/[^"'\s)<>]+)/g;
const LOCK = 'atlasnews_wp_import';

/* ------------------------------------------------------------------ crypto */

export function encryptBundle(obj, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) throw new Error('bundle key must be 32 bytes');
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([c.update(gzipSync(Buffer.from(JSON.stringify(obj)), { level: 9 })), c.final()]);
  return Buffer.concat([MAGIC, iv, c.getAuthTag(), ct]);
}

export function decryptBundle(buf, key) {
  if (!Buffer.isBuffer(key) || key.length !== 32) throw new Error('bundle key must be 32 bytes (base64)');
  if (!buf.subarray(0, 5).equals(MAGIC)) throw new Error('not an ATLAS News import bundle');
  const d = createDecipheriv('aes-256-gcm', key, buf.subarray(5, 17));
  d.setAuthTag(buf.subarray(17, 33));
  let plain;
  try {
    plain = Buffer.concat([d.update(buf.subarray(33)), d.final()]);
  } catch {
    throw new Error('the bundle could not be decrypted: wrong key or a damaged file');
  }
  return JSON.parse(gunzipSync(plain).toString('utf8'));
}

export const fingerprint = (buf) => createHash('sha256').update(buf).digest('hex');

/* ------------------------------------------------------------------ export (local) */

const parseJson = (v) => (typeof v === 'string' ? JSON.parse(v) : v);

/** Read the imported rows back from the (local) import database into a bundle object. */
export async function exportBundle({ source = {} } = {}) {
  const pool = getPool();
  const q = async (sql, params = []) => (await pool.execute(sql, params))[0];
  const cfg = s3Config();
  const base = publicUrl(cfg, 'assets/news/x').replace(/assets\/news\/x$/, '');

  const catRows = await q(`SELECT c.id, c.slug, c.name, c.description, c.legacy_wp_term_id, p.legacy_wp_term_id parent_term
    FROM ${T.categories} c LEFT JOIN ${T.categories} p ON p.id = c.parent_id WHERE c.legacy_wp_term_id IS NOT NULL ORDER BY c.id`);
  const byTerm = new Map(catRows.map((r) => [Number(r.legacy_wp_term_id), r]));
  const depth = (r) => {
    let d = 0;
    let p = r.parent_term && byTerm.get(Number(r.parent_term));
    while (p && d < 20) {
      d += 1;
      p = p.parent_term && byTerm.get(Number(p.parent_term));
    }
    return d;
  };
  const categories = catRows
    .map((r) => ({ termId: Number(r.legacy_wp_term_id), slug: r.slug, name: r.name, description: r.description || '', parentTermId: r.parent_term ? Number(r.parent_term) : null, depth: depth(r) }))
    .sort((a, b) => a.depth - b.depth || a.termId - b.termId);
  const tags = (await q(`SELECT slug, name, legacy_wp_term_id FROM ${T.tags} WHERE legacy_wp_term_id IS NOT NULL ORDER BY id`))
    .map((r) => ({ termId: Number(r.legacy_wp_term_id), slug: r.slug, name: r.name }));

  const media = (await q(`SELECT * FROM ${T.media} WHERE deleted_at IS NULL ORDER BY id`)).map((r) => ({
    ref: Number(r.id), kind: r.kind, storageKey: r.storage_key, sha256: r.sha256, mimeType: r.mime_type, sourceMime: r.source_mime,
    byteSize: Number(r.byte_size), width: r.width, height: r.height, variants: parseJson(r.variants), alt: r.alt_text, caption: r.caption,
    originalFilename: r.original_filename, legacyWpId: r.legacy_wp_id ? Number(r.legacy_wp_id) : null, legacyPath: r.legacy_path,
  }));

  const posts = [];
  for (const r of await q(`SELECT * FROM ${T.posts} WHERE legacy_wp_id IS NOT NULL AND deleted_at IS NULL ORDER BY legacy_wp_id`)) {
    const cats = (await q(`SELECT c.legacy_wp_term_id t FROM ${T.postCategories} pc JOIN ${T.categories} c ON c.id = pc.category_id WHERE pc.post_id = ? ORDER BY c.legacy_wp_term_id`, [r.id])).map((x) => Number(x.t));
    const tagIds = (await q(`SELECT t.legacy_wp_term_id t FROM ${T.postTags} pt JOIN ${T.tags} t ON t.id = pt.tag_id WHERE pt.post_id = ? ORDER BY t.legacy_wp_term_id`, [r.id])).map((x) => Number(x.t));
    const primary = r.primary_category_id ? (await q(`SELECT legacy_wp_term_id t FROM ${T.categories} WHERE id = ?`, [r.primary_category_id]))[0]?.t : null;
    const oldSlugs = (await q(`SELECT from_path FROM ${T.redirects} WHERE to_path = ? AND source = 'wp_old_slug' ORDER BY from_path`, [`/news/${r.slug}`])).map((x) => x.from_path.replace(/^\/news\//, ''));
    const html = r.content_html.split(`${base}assets/news/`).join(`${ASSET_TOKEN}/assets/news/`);
    posts.push({
      wpId: Number(r.legacy_wp_id), status: r.status, slug: r.slug, title: r.title, excerpt: r.excerpt, html,
      publishedAt: iso(r.published_at), updatedAt: iso(r.updated_at), createdAt: iso(r.created_at), featuredRef: r.featured_media_id ? Number(r.featured_media_id) : null,
      primaryTermId: primary ? Number(primary) : null, categoryTermIds: cats, tagTermIds: tagIds,
      seoTitle: r.seo_title, seoDescription: r.seo_description, legacyUrl: r.legacy_url, oldSlugs,
    });
  }
  if (posts.some((p) => p.status === 'scheduled')) throw new Error('unexpected scheduled post in the import database');

  /* the navigation (categories in the menu) and the homepage sections, as WordPress term ids */
  const menu = (await q(`SELECT legacy_wp_term_id t, menu_order o FROM ${T.categories} WHERE show_in_menu = 1 AND legacy_wp_term_id IS NOT NULL ORDER BY legacy_wp_term_id`))
    .map((r) => ({ termId: Number(r.t), order: r.o === null ? null : Number(r.o) }));
  const termOfId = new Map((await q(`SELECT id, legacy_wp_term_id t FROM ${T.categories} WHERE legacy_wp_term_id IS NOT NULL`)).map((r) => [Number(r.id), Number(r.t)]));
  const hsRow = await q(`SELECT setting_value FROM ${T.settings} WHERE setting_key = 'homepage_sections'`);
  const toTerms = (ids) => (ids || []).map((id) => termOfId.get(id)).filter(Boolean);
  const homepage = hsRow.length
    ? (JSON.parse(hsRow[0].setting_value).sections || []).map((s) => ({
      id: s.id, layout: s.layout, title: s.title, width: s.width, count: s.count, offset: s.offset,
      termIds: toTerms(s.categoryIds), tabs: (s.tabs || []).map((t) => ({ label: t.label, termIds: toTerms(t.categoryIds) })),
    }))
    : [];
  /* nothing local may leave the machine */
  const leaks = posts.filter((p) => p.html.includes(base) || /127\.0\.0\.1|localhost|stub-bucket/.test(p.html));
  if (leaks.length) throw new Error(`${leaks.length} posts still reference the local storage address`);
  return {
    format: 'atlas-news-wp-import', version: 1, createdAt: new Date().toISOString(), source,
    counts: { categories: categories.length, tags: tags.length, media: media.length, posts: posts.length, published: posts.filter((p) => p.status === 'published').length, drafts: posts.filter((p) => p.status === 'draft').length, redirects: posts.reduce((n, p) => n + p.oldSlugs.length, 0), menuItems: menu.length, homepageSections: homepage.length },
    categories, tags, media, posts, menu, homepage,
  };
}

/* ------------------------------------------------------------------ apply (server) */

function newApplyReport(dryRun) {
  return {
    startedAt: new Date().toISOString(), dryRun,
    categories: { created: 0, existing: 0, adopted: 0, errors: [] },
    tags: { created: 0, existing: 0, adopted: 0, errors: [] },
    media: { created: 0, existing: 0, linked: 0 },
    storage: { checked: 0, present: 0, missing: [], errors: [] },
    posts: { published: { created: 0, updated: 0, unchanged: 0, protected: 0, skipped: 0 }, draft: { created: 0, updated: 0, unchanged: 0, protected: 0, skipped: 0 } },
    skippedPosts: [], protectedPosts: [], slugAdjusted: [], unresolvedMedia: [],
    redirects: { created: 0, existing: 0, skipped: [] },
    menu: { set: 0, unchanged: 0, protected: [], topLevel: null },
    homepage: { result: null, count: 0 },
    duplicates: null,
  };
}

/** HEAD every storage object the bundle references (all renditions). */
async function checkStorage(bundle, report, concurrency = 16) {
  const cfg = s3Config();
  if (!cfg.configured) throw new Error('S3 is not configured on this server');
  const { S3Client, HeadObjectCommand } = await import('@aws-sdk/client-s3');
  const s3 = new S3Client({ region: cfg.region, ...(cfg.endpoint ? { endpoint: cfg.endpoint, forcePathStyle: true } : {}), maxAttempts: 3 });
  const keys = [...new Set(bundle.media.flatMap((m) => [m.storageKey, ...(m.variants || []).map((v) => v.key)]))];
  let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < keys.length) {
      const key = keys[i++];
      report.storage.checked += 1;
      try {
        await s3.send(new HeadObjectCommand({ Bucket: cfg.bucket, Key: objectKey(cfg, key) }));
        report.storage.present += 1;
      } catch (e) {
        if (e?.$metadata?.httpStatusCode === 404) report.storage.missing.push(key);
        else report.storage.errors.push(`${key}: ${e.name}`);
      }
    }
  }));
}

/**
 * Apply a decrypted bundle to the configured database. Dry run by default: every count is computed against
 * the real tables, nothing is written. A real run refuses to start unless every referenced storage object
 * exists. Same idempotency and editor protection as the importer (lib/news/import/write.js).
 */
export async function applyBundle(bundle, { dryRun = true, log = () => {}, checkObjects = true } = {}) {
  if (bundle?.format !== 'atlas-news-wp-import' || bundle.version !== 1) throw new Error('unsupported bundle format');
  const report = newApplyReport(dryRun);
  const pool = getPool();
  const q = async (sql, params = []) => (await pool.execute(sql, params))[0];

  if (checkObjects) {
    await checkStorage(bundle, report);
    log(`storage: ${report.storage.present}/${report.storage.checked} objects present, ${report.storage.missing.length} missing, ${report.storage.errors.length} errors`);
    if (!dryRun && (report.storage.missing.length || report.storage.errors.length)) throw new Error('refusing to import: referenced media objects are missing from storage');
  }

  const lockConn = await pool.getConnection();
  const [[{ db: dbName }]] = await lockConn.query('SELECT DATABASE() AS db');
  const lockName = `${LOCK}:${dbName}`;
  const [[lock]] = await lockConn.query('SELECT GET_LOCK(?, 5) AS ok', [lockName]);
  if (Number(lock.ok) !== 1) {
    lockConn.release();
    throw new Error('another WordPress import is running against this database');
  }
  try {
    const catId = await upsertTerms(q, { table: T.categories, items: bundle.categories, dryRun, section: report.categories, label: 'category' });
    const tagId = await upsertTerms(q, { table: T.tags, items: bundle.tags, dryRun, section: report.tags, label: 'tag' });

    /* media rows: matched on content (sha256 + kind); a row the CMS already has is linked, never duplicated */
    const mediaId = new Map();
    for (const m of bundle.media) {
      const prev = await q(`SELECT id, legacy_wp_id FROM ${T.media} WHERE sha256 = ? AND kind = ? ORDER BY id LIMIT 1`, [m.sha256, m.kind]);
      if (prev.length) {
        mediaId.set(m.ref, Number(prev[0].id));
        if (m.legacyWpId && !prev[0].legacy_wp_id) {
          const taken = await q(`SELECT id FROM ${T.media} WHERE legacy_wp_id = ?`, [m.legacyWpId]);
          if (!taken.length) {
            if (!dryRun) await q(`UPDATE ${T.media} SET legacy_wp_id = ?, legacy_path = COALESCE(legacy_path, ?) WHERE id = ?`, [m.legacyWpId, m.legacyPath, prev[0].id]);
            report.media.linked += 1;
            continue;
          }
        }
        report.media.existing += 1;
        continue;
      }
      if (dryRun) {
        mediaId.set(m.ref, -m.ref);
      } else {
        const r = await q(
          `INSERT INTO ${T.media} (kind, storage_key, sha256, mime_type, source_mime, byte_size, width, height, variants, alt_text, caption, original_filename, legacy_wp_id, legacy_path)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [m.kind, m.storageKey, m.sha256, m.mimeType, m.sourceMime, m.byteSize, m.width, m.height, m.variants ? JSON.stringify(m.variants) : null,
            m.alt, m.caption, m.originalFilename, m.legacyWpId, m.legacyPath],
        );
        mediaId.set(m.ref, Number(r.insertId));
      }
      report.media.created += 1;
    }
    log(`terms and media: categories +${report.categories.created}, tags +${report.tags.created}, media +${report.media.created} (${report.media.existing} existing, ${report.media.linked} linked)`);

    const cfg = s3Config();
    const ledger = await readLedger(q);
    for (const p of bundle.posts) {
      const html = p.html.replace(TOKEN_RE, (_, rel) => publicUrl(cfg, rel));
      if (html.includes(ASSET_TOKEN)) {
        report.unresolvedMedia.push(p.wpId);
        report.skippedPosts.push({ wpId: p.wpId, slug: p.slug, status: p.status, reason: 'an asset reference could not be resolved' });
        report.posts[p.status].skipped += 1;
        continue;
      }
      /* the stored body must survive the sanitiser unchanged in media (https storage URLs only) */
      const count = (h) => (h.match(/<(img|source|iframe)\b/g) || []).length;
      if (count(sanitizeArticleHtml(html)) !== count(html)) {
        report.skippedPosts.push({ wpId: p.wpId, slug: p.slug, status: p.status, reason: 'the sanitiser would remove media (storage URL not https?)' });
        report.posts[p.status].skipped += 1;
        continue;
      }
      const featuredMediaId = p.featuredRef ? mediaId.get(p.featuredRef) : null;
      const outcome = await writePost(
        { ...p, html, featuredMediaId: featuredMediaId && featuredMediaId > 0 ? featuredMediaId : dryRun ? featuredMediaId : null },
        { pool, q, dryRun, report, ledger, catId, tagId },
      );
      report.posts[p.status][outcome] += 1;
    }
    /* navigation + homepage sections (optional in the bundle: absent in bundles made before they existed) */
    if (Array.isArray(bundle.menu) && bundle.menu.length) await applyMenu(q, { items: bundle.menu, catId, dryRun, section: report.menu });
    if (Array.isArray(bundle.homepage)) await applyHomepageSections(q, { sections: bundle.homepage, catId, dryRun, section: report.homepage });
    if (!dryRun) report.duplicates = await countDuplicates(q);
  } finally {
    await lockConn.query('SELECT RELEASE_LOCK(?)', [lockName]).catch(() => {});
    lockConn.release();
  }
  report.finishedAt = new Date().toISOString();
  return report;
}
