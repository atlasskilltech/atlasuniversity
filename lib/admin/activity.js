/**
 * ATLAS Admin — the activity log (atlasnews_activity_log): who did what, when, with before/after values.
 *
 *   logActivity(entry)     record one action. NEVER throws: a log failure must not undo or fail the
 *                          change it describes (it is reported to the server log instead).
 *   listActivity(filters)  the Activity tab and its CSV export (admins only — enforced by the caller).
 *
 * Rows copy the user's email and name, so history outlives a deleted user. Nothing in the admin can
 * edit or delete a row; rows older than RETENTION_DAYS are pruned, at most once an hour, on write.
 *
 * Plain module (no `server-only`) so the tests can use it.
 */
import { T } from '../news/config.js';
import { query } from '../news/db/pool.js';

export const RETENTION_DAYS = 365;
export const ACTIVITY_TABS = Object.freeze([
  { key: 'news', label: 'News' },
  { key: 'keydates', label: 'Key Dates' },
  { key: 'hackathon', label: 'ATLAS Hackathon' },
  { key: 'users', label: 'Users' },
  { key: 'sign-in', label: 'Sign-in' },
]);

const clip = (s, n) => (s == null ? null : String(s).slice(0, n));
const MAX_CHANGES = 60;
const MAX_VALUE = 500;

/** A value as the log shows it: short, single-line text. */
export function showValue(v) {
  if (v == null || v === '') return '(empty)';
  if (Array.isArray(v)) return v.length ? v.map(showValue).join(', ') : '(none)';
  if (typeof v === 'boolean') return v ? 'Yes' : 'No';
  const s = String(v).replace(/\s+/g, ' ').trim();
  return s.length > MAX_VALUE ? `${s.slice(0, MAX_VALUE - 1)}…` : s || '(empty)';
}

/** [{ field, from, to }] for every labelled field that differs between `before` and `after`.
 *  `fields` is [[key, label, format?]]; format(value) turns a raw value into comparable text. */
export function diffFields(before, after, fields) {
  const out = [];
  for (const [key, label, format] of fields) {
    const f = format || ((x) => x);
    const a = showValue(f(before?.[key]));
    const b = showValue(f(after?.[key]));
    if (a !== b) out.push({ field: label, from: a, to: b });
  }
  return out;
}

let lastPrune = 0;
async function pruneMaybe() {
  if (Date.now() - lastPrune < 60 * 60 * 1000) return;
  lastPrune = Date.now();
  await query(`DELETE FROM ${T.activity} WHERE created_at < (UTC_TIMESTAMP(3) - INTERVAL ? DAY)`, [RETENTION_DAYS]);
}

/**
 * Record one action.
 *   user     { id, email, name } — the signed-in admin (or { email } for a refused sign-in)
 *   tab      'news' | 'keydates' | 'hackathon' | 'users' | 'sign-in'
 *   action   machine code ('article.publish'); summary: the same in words ('Published article')
 *   target   what it was done to ('UG Admissions — B.Des'); targetUrl: where to see it
 *   details  { changes: [{ field, from, to }], note, pages }
 */
export async function logActivity({ user, tab, action, summary, target = null, targetUrl = null, details = null, ip = null }) {
  try {
    let d = details;
    if (d?.changes?.length > MAX_CHANGES) d = { ...d, changes: d.changes.slice(0, MAX_CHANGES), more: d.changes.length - MAX_CHANGES };
    const empty = !d || (!d.changes?.length && !d.note && !d.pages?.length);
    await query(
      `INSERT INTO ${T.activity} (user_id, user_email, user_name, tab, action, summary, target, target_url, details, ip)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user?.id || null, clip(user?.email, 191), clip(user?.name, 191), clip(tab, 32), clip(action, 64), clip(summary, 255),
        clip(target, 500), clip(targetUrl, 600), empty ? null : JSON.stringify(d), clip(ip, 45)],
    );
    await pruneMaybe();
  } catch (e) {
    console.error(`[activity] could not record ${action}: ${e?.code || e?.name || 'error'}`);
  }
}

function parseDetails(raw) {
  if (raw == null) return null;
  if (typeof raw === 'object') return raw;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Filters → WHERE. Dates are India days (the admin is in IST). */
function where({ user, tab, action, from, to, q } = {}) {
  const w = [];
  const p = [];
  if (user) {
    w.push('user_email = ?');
    p.push(String(user).toLowerCase());
  }
  if (tab && ACTIVITY_TABS.some((t) => t.key === tab)) {
    w.push('tab = ?');
    p.push(tab);
  }
  if (action) {
    w.push('action LIKE ?');
    p.push(`${String(action).replace(/[%_]/g, '')}%`);
  }
  if (from && DAY.test(from)) {
    w.push("created_at >= CONVERT_TZ(?, '+05:30', '+00:00')");
    p.push(`${from} 00:00:00`);
  }
  if (to && DAY.test(to)) {
    w.push("created_at < CONVERT_TZ(DATE_ADD(?, INTERVAL 1 DAY), '+05:30', '+00:00')");
    p.push(`${to} 00:00:00`);
  }
  if (q) {
    w.push('(summary LIKE ? OR target LIKE ? OR user_email LIKE ?)');
    const like = `%${String(q).replace(/[%_]/g, '').slice(0, 100)}%`;
    p.push(like, like, like);
  }
  return { sql: w.length ? `WHERE ${w.join(' AND ')}` : '', params: p };
}

const shape = (r) => ({
  id: Number(r.id),
  at: r.created_at ? new Date(r.created_at).toISOString() : null,
  userEmail: r.user_email,
  userName: r.user_name,
  tab: r.tab,
  action: r.action,
  summary: r.summary,
  target: r.target,
  targetUrl: r.target_url,
  details: parseDetails(r.details),
  ip: r.ip,
});

/** One page of the log, newest first, with the total count. */
export async function listActivity(filters = {}, { page = 1, pageSize = 50 } = {}) {
  const { sql, params } = where(filters);
  const size = Math.min(500, Math.max(1, Number(pageSize) || 50));
  const pg = Math.max(1, Number(page) || 1);
  const [rows, count] = await Promise.all([
    query(`SELECT * FROM ${T.activity} ${sql} ORDER BY created_at DESC, id DESC LIMIT ${size} OFFSET ${(pg - 1) * size}`, params),
    query(`SELECT COUNT(*) AS n FROM ${T.activity} ${sql}`, params),
  ]);
  return { items: rows.map(shape), total: Number(count[0]?.n || 0), page: pg, pageSize: size };
}

/** Everyone who appears in the log (for the user filter). */
export async function activityUsers() {
  const rows = await query(`SELECT user_email, MAX(user_name) AS name, MAX(created_at) AS last FROM ${T.activity} WHERE user_email IS NOT NULL GROUP BY user_email ORDER BY last DESC`);
  return rows.map((r) => ({ email: r.user_email, name: r.name, lastAt: r.last ? new Date(r.last).toISOString() : null }));
}
