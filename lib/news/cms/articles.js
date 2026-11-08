/**
 * ATLAS News CMS — articles (atlasnews_posts + atlasnews_post_categories).
 *
 * Rules enforced here, on top of lib/news/cms/validate.js:
 *   - every write runs in ONE transaction; the post row is locked (FOR UPDATE) before it is changed;
 *   - OPTIMISTIC LOCKING: an update must carry the `updatedAt` the editor loaded; if someone saved in
 *     between, the update is refused with 409 instead of silently overwriting their work;
 *   - slugs are unique across every post, including those in Trash;
 *   - changing the slug of an article that has ever been public adds a 301 from the old URL (and repoints
 *     older redirects to the new URL, so there are no chains);
 *   - nothing is ever hard-deleted: "delete" moves an article to Trash (deleted_at) and takes it off the
 *     homepage; restoring brings it back AS A DRAFT, so it is never republished by accident;
 *   - SCHEDULING NEEDS NO CRON: a published or scheduled article is public once published_at has passed
 *     (`state` below), and the public pages re-check at least every 60 seconds.
 *
 * Not `server-only` so the database tests can drive it; only server code (route handlers, server
 * components) imports it.
 */
import { T } from '../config.js';
import { query, withTransaction } from '../db/pool.js';
import { shapeMediaRow } from '../media/shape.js';
import { assertValid, CmsError, notFound } from './errors.js';
import { ARTICLE_SORTS, likePattern, validateArticle, zoneLabel } from './validate.js';

const run = async (conn, sql, params = []) => (await conn.execute(sql, params))[0];

/** SQL for the article's effective state: what a reader sees right now. */
export const STATE_SQL = `CASE
  WHEN p.deleted_at IS NOT NULL THEN 'trash'
  WHEN p.status = 'draft' THEN 'draft'
  WHEN p.published_at IS NOT NULL AND p.published_at <= UTC_TIMESTAMP(3) THEN 'live'
  ELSE 'scheduled' END`;

const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

/* ------------------------------------------------------------------------------------ reads */

/**
 * One page of the article list.
 *   { page, pageSize, q (title/slug search), filter (all|live|scheduled|draft|trash), sort, categoryId }
 * "all" excludes Trash.
 */
export async function listArticles({ page = 1, pageSize = 20, q = '', filter = 'all', sort = 'updated', categoryId = null } = {}) {
  const where = [];
  const params = [];
  if (filter === 'trash') where.push('p.deleted_at IS NOT NULL');
  else {
    where.push('p.deleted_at IS NULL');
    if (filter === 'draft') where.push(`p.status = 'draft'`);
    if (filter === 'live') where.push(`p.status <> 'draft' AND p.published_at <= UTC_TIMESTAMP(3)`);
    if (filter === 'scheduled') where.push(`p.status <> 'draft' AND (p.published_at IS NULL OR p.published_at > UTC_TIMESTAMP(3))`);
  }
  if (q) {
    where.push('(p.title LIKE ? OR p.slug LIKE ?)');
    params.push(likePattern(q), likePattern(q));
  }
  if (categoryId) {
    where.push(`EXISTS (SELECT 1 FROM ${T.postCategories} pc WHERE pc.post_id = p.id AND pc.category_id = ?)`);
    params.push(categoryId);
  }
  const whereSql = `WHERE ${where.join(' AND ')}`;
  const order = ARTICLE_SORTS[sort] || ARTICLE_SORTS.updated;
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.posts} p ${whereSql}`, params);
  const total = Number(n);
  const offset = (page - 1) * pageSize;
  /* LIMIT/OFFSET are validated integers (listParams); inlined because prepared LIMIT ? is not portable */
  const rows = await query(
    `SELECT p.id, p.title, p.slug, p.status, p.published_at, p.updated_at, p.created_at, p.deleted_at, p.author_name,
            ${STATE_SQL} AS state, c.name AS category_name, c.slug AS category_slug,
            m.storage_key AS thumb_key, m.variants AS thumb_variants, m.id AS thumb_id,
            hs.zone AS homepage_zone
       FROM ${T.posts} p
       LEFT JOIN ${T.categories} c ON c.id = p.primary_category_id
       LEFT JOIN ${T.media} m ON m.id = p.featured_media_id
       LEFT JOIN ${T.homepageSlots} hs ON hs.post_id = p.id
       ${whereSql}
      ORDER BY ${order}
      LIMIT ${Number(pageSize)} OFFSET ${Number(offset)}`,
    params,
  );
  return {
    items: rows.map((r) => ({
      id: Number(r.id),
      title: r.title,
      slug: r.slug,
      status: r.status,
      state: r.state,
      publishedAt: iso(r.published_at),
      updatedAt: iso(r.updated_at),
      createdAt: iso(r.created_at),
      deletedAt: iso(r.deleted_at),
      category: r.category_name ? { name: r.category_name, slug: r.category_slug } : null,
      thumb: r.thumb_id ? shapeMediaRow({ id: r.thumb_id, storage_key: r.thumb_key, variants: r.thumb_variants }) : null,
      homepage: r.homepage_zone ? { zone: r.homepage_zone, label: zoneLabel(r.homepage_zone) } : null,
    })),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

/** Everything the editor needs for one article (any state, Trash included). */
export async function getArticle(id) {
  const rows = await query(
    `SELECT p.*, ${STATE_SQL} AS state, hs.zone AS homepage_zone
       FROM ${T.posts} p LEFT JOIN ${T.homepageSlots} hs ON hs.post_id = p.id WHERE p.id = ?`,
    [id],
  );
  const r = rows[0];
  if (!r) return null;
  const [cats, media] = await Promise.all([
    query(`SELECT category_id FROM ${T.postCategories} WHERE post_id = ? ORDER BY category_id`, [id]),
    r.featured_media_id || r.og_media_id
      ? query(`SELECT * FROM ${T.media} WHERE id IN (?, ?)`, [r.featured_media_id || 0, r.og_media_id || 0])
      : Promise.resolve([]),
  ]);
  const byId = new Map(media.map((m) => [Number(m.id), shapeMediaRow(m)]));
  const primary = r.primary_category_id ? Number(r.primary_category_id) : null;
  const categoryIds = cats.map((c) => Number(c.category_id));
  return {
    id: Number(r.id),
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt || '',
    contentHtml: r.content_html || '',
    status: r.status,
    state: r.state,
    publishedAt: iso(r.published_at),
    featuredMedia: byId.get(Number(r.featured_media_id)) || null,
    ogMedia: byId.get(Number(r.og_media_id)) || null,
    /* primary first, so the editor shows it as the main category */
    categoryIds: primary ? [primary, ...categoryIds.filter((c) => c !== primary)] : categoryIds,
    primaryCategoryId: primary,
    authorName: r.author_name,
    seoTitle: r.seo_title || '',
    seoDescription: r.seo_description || '',
    canonicalUrl: r.canonical_url || '',
    legacyWpId: r.legacy_wp_id ? Number(r.legacy_wp_id) : null,
    legacyUrl: r.legacy_url || null,
    createdAt: iso(r.created_at),
    updatedAt: iso(r.updated_at),
    deletedAt: iso(r.deleted_at),
    homepage: r.homepage_zone ? { zone: r.homepage_zone, label: zoneLabel(r.homepage_zone) } : null,
  };
}

/* ------------------------------------------------------------------------------------ write helpers */

async function assertRefs(conn, v) {
  if (v.categoryIds.length) {
    const found = await run(conn, `SELECT id FROM ${T.categories} WHERE id IN (${v.categoryIds.map(() => '?').join(',')})`, v.categoryIds);
    if (found.length !== v.categoryIds.length) throw new CmsError(400, 'validation', 'A selected category no longer exists.', { categoryIds: 'A selected category no longer exists. Reload and choose again.' });
  }
  for (const field of ['featuredMediaId', 'ogMediaId']) {
    if (!v[field]) continue;
    const m = await run(conn, `SELECT id, deleted_at FROM ${T.media} WHERE id = ?`, [v[field]]);
    if (!m.length || m[0].deleted_at) throw new CmsError(400, 'validation', 'A selected image is no longer in the media library.', { [field]: 'This image is no longer in the media library.' });
  }
}

async function assertSlugFree(conn, slug, exceptId = 0) {
  const rows = await run(conn, `SELECT id, deleted_at FROM ${T.posts} WHERE slug = ? AND id <> ?`, [slug, exceptId]);
  if (rows.length) {
    const msg = rows[0].deleted_at ? 'Another article in Trash uses this slug.' : 'Another article already uses this slug.';
    throw new CmsError(409, 'slug_taken', msg, { slug: msg });
  }
}

async function writeCategories(conn, postId, ids) {
  await run(conn, `DELETE FROM ${T.postCategories} WHERE post_id = ?`, [postId]);
  for (const cid of ids) await run(conn, `INSERT INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?)`, [postId, cid]);
}

/** The article now owns /news/<slug>: drop any redirect that would shadow it. */
async function claimPath(conn, slug) {
  await run(conn, `DELETE FROM ${T.redirects} WHERE from_path = ?`, [`/news/${slug}`]);
}

/* ------------------------------------------------------------------------------------ writes */

export async function createArticle(input, { now = new Date() } = {}) {
  const check = validateArticle(input, { now });
  assertValid(check);
  const v = check.value;
  return withTransaction(async (conn) => {
    await assertSlugFree(conn, v.slug);
    await assertRefs(conn, v);
    const res = await run(
      conn,
      `INSERT INTO ${T.posts}
         (slug, title, excerpt, content_html, status, published_at, featured_media_id, og_media_id, primary_category_id,
          author_name, seo_title, seo_description, canonical_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [v.slug, v.title, v.excerpt, v.contentHtml, v.status, v.publishedAt, v.featuredMediaId, v.ogMediaId, v.primaryCategoryId,
        v.authorName, v.seoTitle, v.seoDescription, v.canonicalUrl],
    );
    await writeCategories(conn, res.insertId, v.categoryIds);
    await claimPath(conn, v.slug);
    return { id: Number(res.insertId), slug: v.slug };
  });
}

/**
 * Update an article. `expectedUpdatedAt` (ISO, from the editor's last load) is REQUIRED: a mismatch
 * means someone else saved in the meantime → 409, nothing written. Returns { id, slug, redirectFrom }.
 */
export async function updateArticle(id, input, { expectedUpdatedAt, now = new Date() } = {}) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug, status, published_at, updated_at, deleted_at FROM ${T.posts} WHERE id = ? FOR UPDATE`, [id]);
    const cur = rows[0];
    if (!cur) throw notFound('Article');
    if (cur.deleted_at) throw new CmsError(409, 'in_trash', 'This article is in Trash. Restore it before editing.');
    if (!expectedUpdatedAt || iso(cur.updated_at) !== iso(expectedUpdatedAt)) {
      throw new CmsError(409, 'edit_conflict', 'This article was changed by someone else after you opened it. Reload to see the latest version — your edits have not been saved.');
    }
    const check = validateArticle(input, { now, currentSlug: cur.slug });
    assertValid(check);
    const v = check.value;
    if (v.slug !== cur.slug) await assertSlugFree(conn, v.slug, id);
    await assertRefs(conn, v);

    await run(
      conn,
      `UPDATE ${T.posts} SET slug = ?, title = ?, excerpt = ?, content_html = ?, status = ?, published_at = ?, featured_media_id = ?,
              og_media_id = ?, primary_category_id = ?, author_name = ?, seo_title = ?, seo_description = ?, canonical_url = ?,
              updated_at = UTC_TIMESTAMP(3)
        WHERE id = ?`,
      [v.slug, v.title, v.excerpt, v.contentHtml, v.status, v.publishedAt, v.featuredMediaId, v.ogMediaId, v.primaryCategoryId,
        v.authorName, v.seoTitle, v.seoDescription, v.canonicalUrl, id],
    );
    await writeCategories(conn, id, v.categoryIds);

    let redirectFrom = null;
    if (v.slug !== cur.slug) {
      await claimPath(conn, v.slug);
      const wasPublic = cur.status !== 'draft' && cur.published_at && new Date(cur.published_at).getTime() <= now.getTime();
      if (wasPublic) {
        const from = `/news/${cur.slug}`;
        const to = `/news/${v.slug}`;
        await run(
          conn,
          `INSERT INTO ${T.redirects} (from_path, to_path, status_code, source) VALUES (?, ?, 301, 'manual')
           ON DUPLICATE KEY UPDATE to_path = VALUES(to_path), status_code = 301`,
          [from, to],
        );
        /* no chains: anything that pointed at the old URL now points straight at the new one */
        await run(conn, `UPDATE ${T.redirects} SET to_path = ? WHERE to_path = ?`, [to, from]);
        redirectFrom = from;
      }
    }
    /* a draft cannot hold a homepage slot (the public page would show nothing there) */
    let removedFromHomepage = false;
    if (v.status === 'draft') {
      const r = await run(conn, `DELETE FROM ${T.homepageSlots} WHERE post_id = ?`, [id]);
      removedFromHomepage = r.affectedRows > 0;
    }
    const [{ updated_at: updatedAt }] = await run(conn, `SELECT updated_at FROM ${T.posts} WHERE id = ?`, [id]);
    return { id: Number(id), slug: v.slug, updatedAt: iso(updatedAt), redirectFrom, removedFromHomepage };
  });
}

/** Copy an article as a new draft: no date, no legacy ids, no homepage slot, a free "-copy" slug. */
export async function duplicateArticle(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT * FROM ${T.posts} WHERE id = ?`, [id]);
    const src = rows[0];
    if (!src) throw notFound('Article');
    const base = `${String(src.slug).replace(/%[0-9a-f]{2}/gi, '').replace(/-+$/, '').slice(0, 360) || 'article'}-copy`;
    let slug = base;
    for (let n = 2; (await run(conn, `SELECT 1 FROM ${T.posts} WHERE slug = ?`, [slug])).length; n++) {
      if (n > 200) throw new CmsError(409, 'slug_taken', 'Could not find a free slug for the copy.');
      slug = `${base}-${n}`;
    }
    const title = `Copy of ${src.title}`.slice(0, 500);
    const res = await run(
      conn,
      `INSERT INTO ${T.posts}
         (slug, title, excerpt, content_html, status, published_at, featured_media_id, og_media_id, primary_category_id,
          author_name, seo_title, seo_description, canonical_url)
       VALUES (?, ?, ?, ?, 'draft', NULL, ?, ?, ?, ?, ?, ?, NULL)`,
      [slug, title, src.excerpt, src.content_html, src.featured_media_id, src.og_media_id, src.primary_category_id,
        src.author_name, src.seo_title, src.seo_description],
    );
    await run(conn, `INSERT INTO ${T.postCategories} (post_id, category_id) SELECT ?, category_id FROM ${T.postCategories} WHERE post_id = ?`, [res.insertId, id]);
    return { id: Number(res.insertId), slug };
  });
}

/** Move to Trash (soft delete) and take the article off the homepage. Idempotent. */
export async function trashArticle(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug, deleted_at FROM ${T.posts} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Article');
    const slot = await run(conn, `DELETE FROM ${T.homepageSlots} WHERE post_id = ?`, [id]);
    if (!rows[0].deleted_at) await run(conn, `UPDATE ${T.posts} SET deleted_at = UTC_TIMESTAMP(3) WHERE id = ?`, [id]);
    return { id: Number(id), slug: rows[0].slug, removedFromHomepage: slot.affectedRows > 0 };
  });
}

/** Bring an article back from Trash — always as a draft, so restoring never republishes it. */
export async function restoreArticle(id) {
  return withTransaction(async (conn) => {
    const rows = await run(conn, `SELECT id, slug, deleted_at FROM ${T.posts} WHERE id = ? FOR UPDATE`, [id]);
    if (!rows.length) throw notFound('Article');
    if (rows[0].deleted_at) await run(conn, `UPDATE ${T.posts} SET deleted_at = NULL, status = 'draft' WHERE id = ?`, [id]);
    return { id: Number(id), slug: rows[0].slug };
  });
}

/** Small list for pickers (homepage manager): published/scheduled, not in Trash, title search. */
export async function searchPlaceableArticles(q = '', limit = 20) {
  const params = [];
  let where = `p.deleted_at IS NULL AND p.status <> 'draft'`;
  if (q) {
    where += ' AND (p.title LIKE ? OR p.slug LIKE ?)';
    params.push(likePattern(q), likePattern(q));
  }
  const rows = await query(
    `SELECT p.id, p.title, p.slug, p.published_at, ${STATE_SQL} AS state, hs.zone AS homepage_zone
       FROM ${T.posts} p LEFT JOIN ${T.homepageSlots} hs ON hs.post_id = p.id
      WHERE ${where} ORDER BY p.published_at DESC, p.id DESC LIMIT ${Math.max(1, Math.min(50, Number(limit) || 20))}`,
    params,
  );
  return rows.map((r) => ({
    id: Number(r.id), title: r.title, slug: r.slug, state: r.state, publishedAt: iso(r.published_at),
    homepage: r.homepage_zone ? { zone: r.homepage_zone, label: zoneLabel(r.homepage_zone) } : null,
  }));
}
