/**
 * ATLAS News — one `atlasnews_media` row → the object the admin and the public read model use.
 * Shared by the upload service and the CMS (no `server-only`, so the database tests can use it).
 * Public URLs are derived from the stored keys at read time, so a CDN in front of the bucket later
 * changes no rows.
 */
import { publicUrl, s3Config } from '../storage/s3.js';

export function shapeMediaRow(row) {
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
    variants: (Array.isArray(variants) ? variants : []).map((v) => ({ ...v, url: publicUrl(cfg, v.key) })),
    createdAt: row.created_at,
    deletedAt: row.deleted_at ?? null,
  };
}

/** The rendition to show at a given display width (falls back to the primary file). */
export function mediaVariantUrl(media, name) {
  return media?.variants?.find((v) => v.name === name)?.url || media?.url || null;
}
