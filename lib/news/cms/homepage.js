/**
 * ATLAS News CMS — homepage curation (atlasnews_homepage_slots).
 *
 * Zones and their position ranges live in lib/news/cms/validate.js (HOMEPAGE_ZONES). The approved rule —
 * ONE ARTICLE, ONE SLOT across the whole homepage — is enforced three times: by the validator (with a
 * message naming the article and the area it already occupies), here against the database, and by the
 * table's own UNIQUE (post_id). The zone value is always checked in code, whatever the server's SQL mode.
 *
 * A save replaces the whole curation in one transaction, so the homepage is never half-updated.
 */
import { T } from '../config.js';
import { query, withTransaction } from '../db/pool.js';
import { shapeMediaRow } from '../media/shape.js';
import { STATE_SQL } from './articles.js';
import { assertValid, CmsError } from './errors.js';
import { HOMEPAGE_ZONES, HOMEPAGE_ZONE_NAMES, validateHomepage } from './validate.js';

const run = async (conn, sql, params = []) => (await conn.execute(sql, params))[0];
const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

/** { zones: [{ zone, label, max, items: [{ id, title, slug, state, publishedAt, thumb }] }] } */
export async function getHomepageCuration() {
  const rows = await query(
    `SELECT hs.position, hs.zone, p.id, p.title, p.slug, p.published_at, ${STATE_SQL} AS state,
            m.id AS m_id, m.storage_key AS m_key, m.variants AS m_variants
       FROM ${T.homepageSlots} hs
       JOIN ${T.posts} p ON p.id = hs.post_id
       LEFT JOIN ${T.media} m ON m.id = p.featured_media_id
      ORDER BY hs.position`,
  );
  return {
    zones: HOMEPAGE_ZONES.map((z) => ({
      zone: z.zone,
      label: z.label,
      max: z.max,
      items: rows
        .filter((r) => r.zone === z.zone && HOMEPAGE_ZONE_NAMES.includes(r.zone))
        .map((r) => ({
          id: Number(r.id), title: r.title, slug: r.slug, state: r.state, publishedAt: iso(r.published_at),
          thumb: r.m_id ? shapeMediaRow({ id: r.m_id, storage_key: r.m_key, variants: r.m_variants }) : null,
        })),
    })),
  };
}

/**
 * Replace the curation. input = { zones: { hero_centre: [id], hero_left: [id, id], … } }.
 * Every article must exist, be out of Trash and be published or scheduled (a draft would leave a hole).
 */
export async function saveHomepageCuration(input) {
  return withTransaction(async (conn) => {
    const ids = [...new Set(Object.values(input?.zones || {}).flat().map(Number).filter((n) => Number.isSafeInteger(n) && n > 0))];
    const posts = ids.length
      ? await run(conn, `SELECT id, title, status, deleted_at FROM ${T.posts} WHERE id IN (${ids.map(() => '?').join(',')}) FOR UPDATE`, ids)
      : [];
    const titles = new Map(posts.map((p) => [Number(p.id), p.title]));
    const check = validateHomepage(input, { titles });
    assertValid(check);
    const byId = new Map(posts.map((p) => [Number(p.id), p]));
    for (const slot of check.value) {
      const p = byId.get(slot.postId);
      const label = HOMEPAGE_ZONES.find((z) => z.zone === slot.zone).label;
      if (!p) throw new CmsError(400, 'validation', `An article in ${label} no longer exists.`, { [slot.zone]: 'An article here no longer exists. Reload and choose again.' });
      if (p.deleted_at) throw new CmsError(400, 'validation', `“${p.title}” is in Trash.`, { [slot.zone]: `“${p.title}” is in Trash and cannot be placed on the homepage.` });
      if (p.status === 'draft') throw new CmsError(400, 'validation', `“${p.title}” is a draft.`, { [slot.zone]: `“${p.title}” is a draft. Publish or schedule it first.` });
      /* defence in depth: the validator guarantees this already */
      if (!HOMEPAGE_ZONE_NAMES.includes(slot.zone)) throw new CmsError(400, 'validation', 'Unknown homepage area.');
    }
    await run(conn, `DELETE FROM ${T.homepageSlots}`);
    for (const s of check.value) {
      await run(conn, `INSERT INTO ${T.homepageSlots} (position, zone, post_id) VALUES (?, ?, ?)`, [s.position, s.zone, s.postId]);
    }
    return { slots: check.value.length };
  });
}
