/**
 * ATLAS News — WordPress import: find the best local copy of a WordPress upload and store it.
 *
 * Local copies come from one or more "media roots", each laid out like wp-content/uploads
 * (<yyyy>/<mm>/<file>). For an attachment the candidates are tried best first:
 *   1. WordPress's original upload (the pre-"-scaled" file, `original_image`)
 *   2. the attached file (WordPress's own "-scaled" full size, or the original when it was small)
 *   3. the size variants, largest first (e.g. the 2048-px copy)
 * The chosen file and the reason are reported ("original" | "wp-scaled" | "resized").
 *
 * Storage reuses the CMS media pipeline (processImage → WebP renditions, putIfAbsent → S3, never
 * overwriting). Keys are content-addressed AND dated by the WordPress upload month, so a rerun produces
 * exactly the same keys:   assets/news/media/<yyyy>/<mm>/<sha256[0..20]>-<rendition>.webp
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { NEWS_S3_ROOT, T } from '../config.js';
import { processImage, ImageRejected } from '../media/images.js';
import { putIfAbsent, publicUrl, s3Config } from '../storage/s3.js';

const VIDEO_TYPES = { '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime' };
export const MAX_VIDEO_BYTES = 500 * 1024 * 1024;

/** Strip WordPress's "-1024x683" size suffix and "-scaled" from an uploads path. */
export function baseUploadPath(p) {
  return String(p || '').replace(/-\d{2,5}x\d{2,5}(?=\.[a-z0-9]+$)/i, '').replace(/-scaled(?=\.[a-z0-9]+$)/i, '');
}

export function makeLocator(roots) {
  const cache = new Map();
  return (rel) => {
    if (!rel) return null;
    if (cache.has(rel)) return cache.get(rel);
    let hit = null;
    for (const r of roots) {
      const f = path.join(r, ...rel.split('/'));
      try {
        if (fs.statSync(f).isFile()) {
          hit = f;
          break;
        }
      } catch {
        /* not in this root */
      }
    }
    cache.set(rel, hit);
    return hit;
  };
}

/** Ordered candidate upload paths for an attachment (or a bare uploads path with no attachment). */
export function candidates(att, refPath) {
  const out = [];
  const push = (p, why) => p && !out.some((c) => c.path === p) && out.push({ path: p, why });
  if (att) {
    push(att.originalFile, 'original');
    push(att.file, att.originalFile ? 'wp-scaled' : 'original');
    for (const s of [...att.sizes].sort((a, b) => (b.width || 0) - (a.width || 0))) push(s.file, 'resized');
  }
  if (refPath) {
    const base = baseUploadPath(refPath);
    push(base, 'original');
    push(base.replace(/(\.[a-z0-9]+)$/i, '-scaled$1'), 'wp-scaled');
    push(refPath, 'resized');
  }
  return out;
}

/** SHA-256 of a file, streamed (never the whole file in memory). */
export function sha256File(file) {
  return new Promise((resolve, reject) => {
    const h = createHash('sha256');
    fs.createReadStream(file).on('data', (c) => h.update(c)).on('error', reject).on('end', () => resolve(h.digest('hex')));
  });
}

/** yyyy/mm of a WordPress uploads path, for a stable S3 key (falls back to 0000/00). */
const monthOf = (rel) => /^(\d{4})\/(\d{2})\//.exec(rel || '')?.slice(1, 3).join('/') || '0000/00';

/**
 * Store one image (or reuse the row that already holds it). Returns { mediaId, created, reused, row }.
 * `conn` is a mysql2 connection or the pool's `query` helper wrapped as { q(sql, params) }.
 */
export async function storeImage(db, { file, rel, attachment, dryRun, lookupOnly = false }) {
  /* already imported (a rerun): no file read, no image processing */
  const prior = attachment?.id
    ? await db.q(`SELECT id, legacy_path FROM ${T.media} WHERE legacy_wp_id = ?`, [attachment.id])
    : await db.q(`SELECT id, legacy_path FROM ${T.media} WHERE legacy_path = ? AND kind = 'image' ORDER BY id LIMIT 1`, [rel]);
  if (prior.length) return { mediaId: Number(prior[0].id), created: false, reused: 'legacy', storedPath: prior[0].legacy_path };
  if (lookupOnly === 'fast') return { mediaId: null, pending: true };
  if (lookupOnly) {
    /* the same bytes may already be stored under another attachment: a streamed hash, no decoding */
    const sha = await sha256File(file);
    const bySha = await db.q(`SELECT id, legacy_path FROM ${T.media} WHERE sha256 = ? AND kind = 'image' ORDER BY id LIMIT 1`, [sha]);
    if (bySha.length) return { mediaId: Number(bySha[0].id), created: false, reused: 'sha256', storedPath: bySha[0].legacy_path };
    /* not stored: a file that cannot be decoded is a FAILURE (reported, the next candidate is tried);
       a good file simply has not been stored yet */
    await processImage(fs.readFileSync(file));
    return { mediaId: null, pending: true };
  }
  const img = await processImage(fs.readFileSync(file));
  const bySha = await db.q(`SELECT id, legacy_wp_id FROM ${T.media} WHERE sha256 = ? AND kind = 'image' ORDER BY id LIMIT 1`, [img.sha256]);
  if (bySha.length) {
    if (attachment?.id && !bySha[0].legacy_wp_id && !dryRun) {
      await db.q(`UPDATE ${T.media} SET legacy_wp_id = ?, legacy_path = COALESCE(legacy_path, ?) WHERE id = ? AND legacy_wp_id IS NULL`, [attachment.id, rel, bySha[0].id]);
    }
    return { mediaId: Number(bySha[0].id), created: false, reused: 'sha256' };
  }
  if (dryRun) return { mediaId: null, created: true, dryRun: true, width: img.width, height: img.height };

  const stem = `${NEWS_S3_ROOT}/media/${monthOf(rel)}/${img.sha256.slice(0, 20)}`;
  const variants = [];
  for (const r of img.renditions) {
    const key = `${stem}-${r.name}.webp`;
    await putIfAbsent(key, r.buffer, { contentType: 'image/webp' });
    variants.push({ name: r.name, width: r.width, height: r.height, bytes: r.bytes, key });
  }
  const full = variants.find((v) => v.name === 'full');
  const res = await db.q(
    `INSERT INTO ${T.media}
       (kind, storage_key, sha256, mime_type, source_mime, byte_size, width, height, variants, alt_text, caption, original_filename, legacy_wp_id, legacy_path)
     VALUES ('image', ?, ?, 'image/webp', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [full.key, img.sha256, img.sourceMime, full.bytes, full.width, full.height, JSON.stringify(variants),
      attachment?.alt ? attachment.alt.slice(0, 500) : null, attachment?.caption ? attachment.caption.slice(0, 2000) : null,
      path.basename(rel).slice(0, 255), attachment?.id || null, rel],
  );
  return { mediaId: Number(res.insertId), created: true };
}

/** Store one video file as-is (no transcoding). */
export async function storeVideo(db, { file, rel, dryRun, lookupOnly = false }) {
  const ext = path.extname(file).toLowerCase();
  const type = VIDEO_TYPES[ext];
  if (!type) throw new ImageRejected(`unsupported video type ${ext}`, 'unsupported');
  const prior = await db.q(`SELECT id FROM ${T.media} WHERE legacy_path = ? AND kind = 'video' ORDER BY id LIMIT 1`, [rel]);
  if (prior.length) return { mediaId: Number(prior[0].id), created: false, type };
  if (lookupOnly) return { mediaId: null, pending: true, type };
  const size = fs.statSync(file).size;
  if (size > MAX_VIDEO_BYTES) throw new ImageRejected(`video larger than ${MAX_VIDEO_BYTES} bytes`, 'too_large');
  const buf = fs.readFileSync(file);
  const sha = createHash('sha256').update(buf).digest('hex');
  const existing = await db.q(`SELECT id FROM ${T.media} WHERE sha256 = ? AND kind = 'video' ORDER BY id LIMIT 1`, [sha]);
  if (existing.length) return { mediaId: Number(existing[0].id), created: false, type };
  if (dryRun) return { mediaId: null, created: true, dryRun: true, type };
  const key = `${NEWS_S3_ROOT}/media/${monthOf(rel)}/${sha.slice(0, 20)}${ext === '.m4v' ? '.mp4' : ext}`;
  await putIfAbsent(key, buf, { contentType: type });
  const res = await db.q(
    `INSERT INTO ${T.media} (kind, storage_key, sha256, mime_type, source_mime, byte_size, original_filename, legacy_path)
     VALUES ('video', ?, ?, ?, ?, ?, ?, ?)`,
    [key, sha, type, type, size, path.basename(rel).slice(0, 255), rel],
  );
  return { mediaId: Number(res.insertId), created: true, type };
}

/** The URL an article body uses for a media row: the 1600-px rendition when there is one. */
export function bodyImage(row) {
  const cfg = s3Config();
  let variants = row.variants;
  if (typeof variants === 'string') variants = JSON.parse(variants);
  const v = (variants || []).find((x) => x.name === 'article') || (variants || []).find((x) => x.name === 'full');
  return v ? { src: publicUrl(cfg, v.key), width: v.width, height: v.height, alt: row.alt_text || '' } : { src: publicUrl(cfg, row.storage_key), width: row.width, height: row.height, alt: row.alt_text || '' };
}

export const videoUrl = (row) => ({ src: publicUrl(s3Config(), row.storage_key), type: row.mime_type });
