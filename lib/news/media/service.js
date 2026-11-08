import 'server-only';

/**
 * ATLAS News — media library service: validate → optimise → store in S3 → record in atlasnews_media.
 *
 * Keys are content-addressed:  assets/news/media/<yyyy>/<mm>/<sha256[0..20]>-<rendition>.webp
 * The same source uploaded twice returns the existing record instead of storing a second copy
 * (de-duplicated on the SHA-256 of the uploaded bytes). Only S3 keys and metadata reach MySQL — never
 * image bytes. Rendition keys are stored relative to the bucket prefix, and public URLs are derived at
 * read time, so a future CDN in front of the bucket changes no rows.
 */
import { NEWS_S3_ROOT, T } from '../config.js';
import { query } from '../db/pool.js';
import { putIfAbsent, publicUrl, s3Config } from '../storage/s3.js';
import { processImage } from './images.js';

const clip = (s, n) => (typeof s === 'string' && s.trim() ? s.trim().slice(0, n) : null);

/** Strip a client-supplied file name to something safe to keep as a label (never used as a key). */
function safeFilename(name) {
  return clip(String(name || '').replace(/[\\/]+/g, '_').replace(/[^\p{L}\p{N}._ -]+/gu, ''), 255);
}

function shapeRow(row) {
  if (!row) return null;
  const cfg = s3Config();
  let variants = row.variants;
  if (typeof variants === 'string') {
    try {
      variants = JSON.parse(variants);
    } catch {
      variants = [];
    }
  }
  return {
    id: Number(row.id),
    kind: row.kind,
    url: publicUrl(cfg, row.storage_key),
    width: row.width,
    height: row.height,
    mimeType: row.mime_type,
    bytes: Number(row.byte_size),
    alt: row.alt_text,
    caption: row.caption,
    filename: row.original_filename,
    variants: (variants || []).map((v) => ({ ...v, url: publicUrl(cfg, v.key) })),
    createdAt: row.created_at,
  };
}

export async function getMedia(id) {
  const rows = await query(`SELECT * FROM ${T.media} WHERE id = ?`, [id]);
  return shapeRow(rows[0]);
}

/**
 * Store one uploaded image. `keyPrefix` defaults to the media library; the health check uses its own
 * sub-tree so test objects are never mixed with editorial media.
 */
export async function uploadImage({ buffer, filename, declaredMime, alt, caption, keyPrefix = `${NEWS_S3_ROOT}/media` }) {
  const img = await processImage(buffer, { declaredMime });

  const existing = await query(`SELECT * FROM ${T.media} WHERE sha256 = ? AND kind = 'image' ORDER BY id LIMIT 1`, [img.sha256]);
  if (existing.length) return { media: shapeRow(existing[0]), deduplicated: true };

  const now = new Date();
  const stem = `${keyPrefix}/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${img.sha256.slice(0, 20)}`;
  const variants = [];
  for (const r of img.renditions) {
    const rel = `${stem}-${r.name}.webp`;
    await putIfAbsent(rel, r.buffer, { contentType: 'image/webp' });
    variants.push({ name: r.name, width: r.width, height: r.height, bytes: r.bytes, key: rel });
  }
  const full = variants.find((v) => v.name === 'full');

  const res = await query(
    `INSERT INTO ${T.media}
       (kind, storage_key, sha256, mime_type, source_mime, byte_size, width, height, variants, alt_text, caption, original_filename)
     VALUES ('image', ?, ?, 'image/webp', ?, ?, ?, ?, ?, ?, ?, ?)`,
    [full.key, img.sha256, img.sourceMime, full.bytes, full.width, full.height, JSON.stringify(variants),
      clip(alt, 500), clip(caption, 2000), safeFilename(filename)],
  );
  return { media: await getMedia(res.insertId), deduplicated: false };
}
