/**
 * ATLAS News CMS — categories.
 *
 *   - the News navigation is the tree of categories with `show_in_menu`, in `menu_order`: a top-level menu
 *     entry is a ROOT category in the menu, and its dropdown lists its sub-categories that are also in the
 *     menu (any depth). At most MAX_MENU_CATEGORIES (8) TOP-LEVEL entries; sub-entries are not limited.
 *     The count is taken with the category rows locked, so two editors cannot both add the 8th;
 *   - a category with articles (Trash included) cannot be deleted — the editor is told how many and asked
 *     to move them first. Nothing is cascaded away;
 *   - renaming a slug adds a 301 from the old category URL;
 *   - HIERARCHY (migration 0003): a category may have a parent (`parent_id`, NULL = root). Setting or
 *     changing a parent is checked with EVERY category row locked, so concurrent edits cannot combine
 *     into a cycle: the parent must exist, may not be the category itself or one of its descendants,
 *     and the resulting tree may not be deeper than MAX_CATEGORY_DEPTH. A category with children cannot
 *     be deleted (the foreign key is ON DELETE RESTRICT; the CMS refuses first, with a message).
 *     An input WITHOUT `parentId` leaves the parent unchanged; only an explicit null makes a root.
 *   - public category URLs stay flat (/news/category/<slug>) whatever the nesting.
 */
import { MAX_MENU_CATEGORIES, T } from '../config.js';
import { query, withTransaction } from '../db/pool.js';
import { shapeMediaRow } from '../media/shape.js';
import { assertValid, CmsError, notFound } from './errors.js';
import { MAX_CATEGORY_DEPTH, validateCategory } from './validate.js';

const run = async (conn, sql, params = []) => (await conn.execute(sql, params))[0];
const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

function shape(r, media) {
  return {
    id: Number(r.id),
    parentId: r.parent_id ? Number(r.parent_id) : null,
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
  const items = rows.map((r) => shape(r, r.m_id ? shapeMediaRow({ id: r.m_id, storage_key: r.m_key, variants: r.m_variants, alt_text: r.m_alt }) : null));
  /* depth (1 = root) and child count, for display; the order above is unchanged */
  const byId = new Map(items.map((c) => [c.id, c]));
  const children = new Map();
  for (const c of items) if (c.parentId) children.set(c.parentId, (children.get(c.parentId) || 0) + 1);
  for (const c of items) {
    let depth = 1;
    for (let x = byId.get(c.parentId); x && depth <= items.length; x = byId.get(x.parentId)) depth++;
    c.depth = depth;
    c.childCount = children.get(c.id) || 0;
  }
  return items;
}

/**
 * Validate a parent change for category `id` (null when creating) → `parentId` (null = root).
 * Locks EVERY category row for the rest of the transaction, so two concurrent moves cannot combine into a
 * cycle. Throws a CmsError carrying a `parentId` field message.
 */
async function checkParent(conn, id, parentId) {
  const rows = await run(conn, `SELECT id, parent_id, name FROM ${T.categories} ORDER BY id FOR UPDATE`);
  if (parentId === null) return;
  const byId = new Map(rows.map((r) => [Number(r.id), { parent: r.parent_id ? Number(r.parent_id) : null, name: r.name }]));
  const fail = (status, code, msg) => {
    throw new CmsError(status, code, msg, { parentId: msg });
  };
  if (!byId.has(parentId)) fail(400, 'validation', 'That parent category does not exist.');
  if (id !== null && parentId === id) fail(400, 'category_cycle', 'A category cannot be its own parent.');
  /* walk up from the new parent: meeting the moved category means it would become its own ancestor */
  let depthOfParent = 0;
  for (let x = parentId, guard = 0; x !== null; x = byId.get(x)?.parent ?? null) {
    if (x === id) fail(409, 'category_cycle', `“${byId.get(parentId).name}” is inside this category, so it cannot become its parent.`);
    depthOfParent++;
    if (++guard > rows.length) fail(409, 'category_cycle', 'The existing hierarchy contains a loop. Fix it before moving categories.');
  }
  /* the moved category takes its whole subtree with it: that must still fit under the limit */
  let height = 1;
  if (id !== null) {
    const kids = new Map();
    for (const [cid, v] of byId) {
      if (v.parent === null) continue;
      if (!kids.has(v.parent)) kids.set(v.parent, []);
      kids.get(v.parent).push(cid);
    }
    const walk = (cid, h) => {
      height = Math.max(height, h);
      if (h > MAX_CATEGORY_DEPTH) return;
      for (const k of kids.get(cid) || []) walk(k, h + 1);
    };
    walk(id, 1);
  }
  if (depthOfParent + height > MAX_CATEGORY_DEPTH) {
    fail(409, 'category_too_deep', `Categories can be nested at most ${MAX_CATEGORY_DEPTH} levels deep; this would make ${depthOfParent + height}.`);
  }
}

export async function getCategory(id) {
  const rows = await query(`SELECT * FROM ${T.categories} WHERE id = ?`, [id]);
  if (!rows.length) return null;
  const media = rows[0].image_media_id ? (await query(`SELECT * FROM ${T.media} WHERE id = ?`, [rows[0].image_media_id]))[0] : null;
  return shape(rows[0], shapeMediaRow(media));
}

async function checks(conn, v, exceptId = 0, parentId = null) {
  const dup = await run(conn, `SELECT id FROM ${T.categories} WHERE slug = ? AND id <> ?`, [v.slug, exceptId]);
  if (dup.length) throw new CmsError(409, 'slug_taken', 'Another category already uses this slug.', { slug: 'Another category already uses this slug.' });
  if (v.showInMenu && parentId === null) {
    /* a top-level menu entry: lock every top-level menu row so the count cannot change under us */
    const inMenu = await run(conn, `SELECT id FROM ${T.categories} WHERE show_in_menu = 1 AND parent_id IS NULL AND id <> ? FOR UPDATE`, [exceptId]);
    if (inMenu.length >= MAX_MENU_CATEGORIES) {
      const msg = `The navigation already shows ${MAX_MENU_CATEGORIES} top-level categories, the maximum. Remove one from the menu first, or add this one as a sub-category.`;
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
    const parentId = v.parentId ?? null;
    if (parentId !== null) await checkParent(conn, null, parentId);
    await checks(conn, v, 0, parentId);
    const res = await run(
      conn,
      `INSERT INTO ${T.categories} (parent_id, slug, name, description, image_media_id, show_in_menu, menu_order, is_featured, seo_title, seo_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [parentId, v.slug, v.name, v.description, v.imageMediaId, v.showInMenu ? 1 : 0, v.menuOrder, v.isFeatured ? 1 : 0, v.seoTitle, v.seoDescription],
    );
    await run(conn, `DELETE FROM ${T.redirects} WHERE from_path = ?`, [`/news/category/${v.slug}`]);
    return { id: Number(res.insertId), slug: v.slug };
  });
}

export async function updateCategory(id, input) {
  return withTransaction(async (conn) => {
    /* a request that may move the category locks the WHOLE tree first, in id order — the same order
       checkParent uses — so two opposite moves queue instead of deadlocking, and the second one then
       sees the first and is refused as a cycle */
    if (input && typeof input === 'object' && Object.hasOwn(input, 'parentId')) {
      await run(conn, `SELECT id FROM ${T.categories} ORDER BY id FOR UPDATE`);
    }
    const rows = await run(conn, `SELECT id, slug, parent_id FROM ${T.categories} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Category');
    const cur = rows[0];
    const check = validateCategory(input, { currentSlug: cur.slug });
    assertValid(check);
    const v = check.value;
    const current = cur.parent_id ? Number(cur.parent_id) : null;
    /* absent → unchanged; only a real change is checked (and locks the tree) */
    const parentId = v.parentId === undefined ? current : v.parentId;
    if (parentId !== current) await checkParent(conn, Number(id), parentId);
    await checks(conn, v, id, parentId);
    await run(
      conn,
      `UPDATE ${T.categories} SET parent_id = ?, slug = ?, name = ?, description = ?, image_media_id = ?, show_in_menu = ?, menu_order = ?, is_featured = ?,
              seo_title = ?, seo_description = ? WHERE id = ?`,
      [parentId, v.slug, v.name, v.description, v.imageMediaId, v.showInMenu ? 1 : 0, v.menuOrder, v.isFeatured ? 1 : 0, v.seoTitle, v.seoDescription, id],
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
    return { id: Number(id), slug: v.slug, parentId, redirectFrom };
  });
}

/**
 * Delete an EMPTY category. Refused (409) while it has sub-categories — they are never deleted with it nor
 * silently re-rooted — and while any article (Trash included) uses it.
 */
export async function deleteCategory(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug, name FROM ${T.categories} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Category');
    const kids = await run(conn, `SELECT name FROM ${T.categories} WHERE parent_id = ? ORDER BY name FOR UPDATE`, [id]);
    if (kids.length) {
      const list = kids.slice(0, 3).map((k) => `“${k.name}”`).join(', ') + (kids.length > 3 ? ` and ${kids.length - 3} more` : '');
      throw new CmsError(409, 'category_has_children', `“${rows[0].name}” has ${kids.length} sub-${kids.length === 1 ? 'category' : 'categories'} (${list}). Move or delete them first.`);
    }
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
