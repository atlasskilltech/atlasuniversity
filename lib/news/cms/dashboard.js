/**
 * ATLAS News CMS — dashboard figures. Every number is a COUNT over the News tables; nothing is estimated
 * and there are no readership statistics (there is no analytics source).
 */
import { T } from '../config.js';
import { query } from '../db/pool.js';
import { STATE_SQL } from './articles.js';
import { HOMEPAGE_ZONES } from './validate.js';

const iso = (d) => (d instanceof Date ? d.toISOString() : d ? new Date(d).toISOString() : null);

export async function dashboardSummary() {
  const [[counts], [cats], [media], [slots], upcoming, recent] = await Promise.all([
    query(
      `SELECT
         SUM(p.deleted_at IS NULL AND p.status <> 'draft' AND p.published_at <= UTC_TIMESTAMP(3)) AS live,
         SUM(p.deleted_at IS NULL AND p.status <> 'draft' AND (p.published_at IS NULL OR p.published_at > UTC_TIMESTAMP(3))) AS scheduled,
         SUM(p.deleted_at IS NULL AND p.status = 'draft') AS drafts,
         SUM(p.deleted_at IS NOT NULL) AS trash
       FROM ${T.posts} p`,
    ),
    query(`SELECT COUNT(*) AS total, SUM(show_in_menu = 1) AS in_menu FROM ${T.categories}`),
    query(`SELECT COUNT(*) AS total FROM ${T.media} WHERE deleted_at IS NULL AND kind = 'image'`),
    query(`SELECT COUNT(*) AS filled FROM ${T.homepageSlots}`),
    query(
      `SELECT p.id, p.title, p.published_at FROM ${T.posts} p
        WHERE p.deleted_at IS NULL AND p.status <> 'draft' AND p.published_at > UTC_TIMESTAMP(3)
        ORDER BY p.published_at LIMIT 5`,
    ),
    query(`SELECT p.id, p.title, p.updated_at, ${STATE_SQL} AS state FROM ${T.posts} p WHERE p.deleted_at IS NULL ORDER BY p.updated_at DESC LIMIT 6`),
  ]);
  const n = (v) => Number(v || 0);
  return {
    articles: { live: n(counts.live), scheduled: n(counts.scheduled), drafts: n(counts.drafts), trash: n(counts.trash) },
    categories: { total: n(cats.total), inMenu: n(cats.in_menu) },
    media: { total: n(media.total) },
    homepage: { filled: n(slots.filled), capacity: HOMEPAGE_ZONES.reduce((a, z) => a + z.max, 0) },
    upcoming: upcoming.map((r) => ({ id: Number(r.id), title: r.title, publishedAt: iso(r.published_at) })),
    recent: recent.map((r) => ({ id: Number(r.id), title: r.title, updatedAt: iso(r.updated_at), state: r.state })),
  };
}
