/**
 * ATLAS News CMS — categories.
 *
 *   - at most MAX_MENU_CATEGORIES (8) may be shown in the News navigation; the count is taken with the
 *     category rows locked, so two editors cannot both add the 8th;
 *   - a category with articles (Trash included) cannot be deleted — the editor is told how many and asked
 *     to move them first. Nothing is cascaded away;
 *   - renaming a slug adds a 301 from the old category URL.
 */
import { MAX_MENU_CATEGORIES, T } from '../config.js';
import { query, withTransaction } from '../db/pool.js';
import { shapeMediaRow } from '../media/shape.js';
import { assertValid, CmsError, notFound } from './errors.js';
import { validateCategory } from './validate.js';

const run = async (conn, sql, params = []) => (await conn.execute(sql, params))[0];
const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

function shape(r, media) {
  return {
    id: Number(r.id),
    name: r.name,
    slug: r.slug,
    description: r.description || '',
    showInMenu: Boolean(r.show_in_menu),
    menuOrder: r.menu_order === null ? null : Number(r.menu_order),
    isFeatured: Boolean(r.is_featured),
    imageMediaId: r.image_media_id ? Number(r.image_media_id) : null,
    image: media || null,
    seoTitle: r.seo_title || '',
    seoDescription: r.seo_description || '',
    articleCount: r.article_count === undefined ? undefined : Number(r.article_count),
    liveCount: r.live_count === undefined ? undefined : Number(r.live_count),
    updatedAt: iso(r.updated_at),
  };
}

/** Every category with article counts (not in Trash; and of those, live now), menu ones first. */
export async function listCategories() {
  const rows = await query(
    `SELECT c.*, m.id AS m_id, m.storage_key AS m_key, m.variants AS m_variants, m.alt_text AS m_alt,
            (SELECT COUNT(*) FROM ${T.postCategories} pc JOIN ${T.posts} p ON p.id = pc.post_id
              WHERE pc.category_id = c.id AND p.deleted_at IS NULL) AS article_count,
            (SELECT COUNT(*) FROM ${T.postCategories} pc JOIN ${T.posts} p ON p.id = pc.post_id
              WHERE pc.category_id = c.id AND p.deleted_at IS NULL AND p.status <> 'draft' AND p.published_at <= UTC_TIMESTAMP(3)) AS live_count
       FROM ${T.categories} c LEFT JOIN ${T.media} m ON m.id = c.image_media_id
      ORDER BY c.show_in_menu DESC, c.menu_order IS NULL, c.menu_order, c.name`,
  );
  return rows.map((r) => shape(r, r.m_id ? shapeMediaRow({ id: r.m_id, storage_key: r.m_key, variants: r.m_variants, alt_text: r.m_alt }) : null));
}

export async function getCategory(id) {
  const rows = await query(`SELECT * FROM ${T.categories} WHERE id = ?`, [id]);
  if (!rows.length) return null;
  const media = rows[0].image_media_id ? (await query(`SELECT * FROM ${T.media} WHERE id = ?`, [rows[0].image_media_id]))[0] : null;
  return shape(rows[0], shapeMediaRow(media));
}

async function checks(conn, v, exceptId = 0) {
  const dup = await run(conn, `SELECT id FROM ${T.categories} WHERE slug = ? AND id <> ?`, [v.slug, exceptId]);
  if (dup.length) throw new CmsError(409, 'slug_taken', 'Another category already uses this slug.', { slug: 'Another category already uses this slug.' });
  if (v.showInMenu) {
    /* lock every menu row so the count cannot change under us */
    const inMenu = await run(conn, `SELECT id FROM ${T.categories} WHERE show_in_menu = 1 AND id <> ? FOR UPDATE`, [exceptId]);
    if (inMenu.length >= MAX_MENU_CATEGORIES) {
      const msg = `The navigation already shows ${MAX_MENU_CATEGORIES} categories, the maximum. Remove one from the menu first.`;
      throw new CmsError(409, 'menu_full', msg, { showInMenu: msg });
    }
  }
  if (v.imageMediaId) {
    const m = await run(conn, `SELECT deleted_at FROM ${T.media} WHERE id = ?`, [v.imageMediaId]);
    if (!m.length || m[0].deleted_at) throw new CmsError(400, 'validation', 'That image is no longer in the media library.', { imageMediaId: 'That image is no longer in the media library.' });
  }
}

export async function createCategory(input) {
  const check = validateCategory(input);
  assertValid(check);
  const v = check.value;
  return withTransaction(async (conn) => {
    await checks(conn, v);
    const res = await run(
      conn,
      `INSERT INTO ${T.categories} (slug, name, description, image_media_id, show_in_menu, menu_order, is_featured, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [v.slug, v.name, v.description, v.imageMediaId, v.showInMenu ? 1 : 0, v.menuOrder, v.isFeatured ? 1 : 0, v.seoTitle, v.seoDescription],
    );
    await run(conn, `DELETE FROM ${T.redirects} WHERE from_path = ?`, [`/news/category/${v.slug}`]);
    return { id: Number(res.insertId), slug: v.slug };
  });
}

export async function updateCategory(id, input) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug FROM ${T.categories} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Category');
    const cur = rows[0];
    const check = validateCategory(input, { currentSlug: cur.slug });
    assertValid(check);
    const v = check.value;
    await checks(conn, v, id);
    await run(
      conn,
      `UPDATE ${T.categories} SET slug = ?, name = ?, description = ?, image_media_id = ?, show_in_menu = ?, menu_order = ?, is_featured = ?,
              seo_title = ?, seo_description = ? WHERE id = ?`,
      [v.slug, v.name, v.description, v.imageMediaId, v.showInMenu ? 1 : 0, v.menuOrder, v.isFeatured ? 1 : 0, v.seoTitle, v.seoDescription, id],
    );
    let redirectFrom = null;
    if (v.slug !== cur.slug) {
      const from = `/news/category/${cur.slug}`;
      const to = `/news/category/${v.slug}`;
      await run(conn, `DELETE FROM ${T.redirects} WHERE from_path = ?`, [to]);
      await run(
        conn,
        `INSERT INTO ${T.redirects} (from_path, to_path, status_code, source) VALUES (?, ?, 301, 'manual')
         ON DUPLICATE KEY UPDATE to_path = VALUES(to_path), status_code = 301`,
        [from, to],
      );
      await run(conn, `UPDATE ${T.redirects} SET to_path = ? WHERE to_path = ?`, [to, from]);
      redirectFrom = from;
    }
    return { id: Number(id), slug: v.slug, redirectFrom };
  });
}

/** Delete an EMPTY category. Refused (409) while any article — Trash included — uses it. */
export async function deleteCategory(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug, name FROM ${T.categories} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Category');
    const [{ n }] = await run(
      conn,
      `SELECT COUNT(DISTINCT p.id) AS n FROM ${T.posts} p
         LEFT JOIN ${T.postCategories} pc ON pc.post_id = p.id
        WHERE pc.category_id = ? OR p.primary_category_id = ?`,
      [id, id],
    );
    if (Number(n) > 0) {
      throw new CmsError(409, 'category_in_use', `“${rows[0].name}” is used by ${n} ${Number(n) === 1 ? 'article' : 'articles'} (Trash included). Move them to another category before deleting it.`);
    }
    await run(conn, `DELETE FROM ${T.categories} WHERE id = ?`, [id]);
    return { id: Number(id), slug: rows[0].slug };
  });
}
