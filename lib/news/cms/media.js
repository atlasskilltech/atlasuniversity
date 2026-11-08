/**
 * ATLAS News CMS — media library reads, metadata edits, usage and deletion.
 * (Uploading lives in lib/news/media/service.js.)
 *
 * DELETION IS NON-DESTRUCTIVE. "Delete" removes an image from the library (atlasnews_media.deleted_at),
 * and only when nothing uses it: not a featured image, not a social image, not a category image, and not
 * referenced inside any article body (Trash included, so restoring an article can never break it). The
 * S3 objects are NOT removed — the app never deletes from the bucket. Purging unreferenced objects is a
 * separate, approved-later operation.
 */
import { T } from '../config.js';
import { query, withTransaction } from '../db/pool.js';
import { shapeMediaRow } from '../media/shape.js';
import { assertValid, CmsError, notFound } from './errors.js';
import { likePattern, validateMediaMeta } from './validate.js';

const run = async (conn, sql, params = []) => (await conn.execute(sql, params))[0];

/** One page of the library, newest first. q searches file name, alt text and caption. */
export async function listMedia({ page = 1, pageSize = 30, q = '' } = {}) {
  const where = ['kind = ?', 'deleted_at IS NULL'];
  const params = ['image'];
  if (q) {
    where.push('(original_filename LIKE ? OR alt_text LIKE ? OR caption LIKE ?)');
    params.push(likePattern(q), likePattern(q), likePattern(q));
  }
  const w = `WHERE ${where.join(' AND ')}`;
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.media} ${w}`, params);
  const rows = await query(
    `SELECT * FROM ${T.media} ${w} ORDER BY created_at DESC, id DESC LIMIT ${Number(pageSize)} OFFSET ${Number((page - 1) * pageSize)}`,
    params,
  );
  const total = Number(n);
  return { items: rows.map(shapeMediaRow), total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) };
}

export async function getMediaItem(id) {
  const rows = await query(`SELECT * FROM ${T.media} WHERE id = ?`, [id]);
  return shapeMediaRow(rows[0]);
}

export async function updateMediaMeta(id, input) {
  const check = validateMediaMeta(input);
  assertValid(check);
  const res = await query(`UPDATE ${T.media} SET alt_text = ?, caption = ? WHERE id = ? AND deleted_at IS NULL`, [check.value.alt, check.value.caption, id]);
  if (!res.affectedRows) throw notFound('Image');
  return getMediaItem(id);
}

/**
 * Where an image is used. Body references are found by the image's content hash, which is part of every
 * rendition key (…/<sha256[0..20]>-<rendition>.webp), so any rendition or URL form is caught.
 */
export async function mediaUsage(id, conn = null) {
  const q = conn ? (sql, p) => run(conn, sql, p) : query;
  const rows = await q(`SELECT id, sha256, storage_key FROM ${T.media} WHERE id = ?`, [id]);
  if (!rows.length) return null;
  const stem = `${rows[0].sha256.slice(0, 20)}-`;
  const [asFeatured, asOg, asCategory, inBody] = await Promise.all([
    q(`SELECT id, title FROM ${T.posts} WHERE featured_media_id = ? ORDER BY id LIMIT 20`, [id]),
    q(`SELECT id, title FROM ${T.posts} WHERE og_media_id = ? ORDER BY id LIMIT 20`, [id]),
    q(`SELECT id, name AS title FROM ${T.categories} WHERE image_media_id = ? ORDER BY id LIMIT 20`, [id]),
    q(`SELECT id, title FROM ${T.posts} WHERE content_html LIKE ? ORDER BY id LIMIT 20`, [likePattern(stem)]),
  ]);
  const list = (rs) => rs.map((r) => ({ id: Number(r.id), title: r.title }));
  const usage = { featured: list(asFeatured), social: list(asOg), categories: list(asCategory), inBody: list(inBody) };
  usage.total = usage.featured.length + usage.social.length + usage.categories.length + usage.inBody.length;
  return usage;
}

/** Remove an unused image from the library (soft delete). 409 with the usage list when it is in use. */
export async function deleteMedia(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, deleted_at FROM ${T.media} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Image');
    if (rows[0].deleted_at) return { id: Number(id), alreadyDeleted: true };
    const usage = await mediaUsage(id, conn);
    if (usage.total) {
      const e = new CmsError(409, 'media_in_use', `This image is still used in ${usage.total} ${usage.total === 1 ? 'place' : 'places'}. Remove it there first.`);
      e.usage = usage;
      throw e;
    }
    await run(conn, `UPDATE ${T.media} SET deleted_at = UTC_TIMESTAMP(3) WHERE id = ?`, [id]);
    return { id: Number(id) };
  });
}
