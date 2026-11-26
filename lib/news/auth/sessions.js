/**
 * ATLAS News — database-backed admin sessions.
 *
 * The browser holds a 256-bit random token in an HttpOnly cookie; the database holds only its SHA-256,
 * so a leaked database row cannot be replayed as a cookie. A session ends at whichever comes first:
 *   - IDLE_MS of inactivity (last_seen_at is refreshed at most once every TOUCH_MS),
 *   - ABSOLUTE_MS after login (expires_at),
 *   - logout (revoked_at).
 * Expired and revoked rows are pruned opportunistically at login.
 *
 * Pure database logic; cookie handling lives in lib/news/auth/admin.js.
 */
import { createHash, randomBytes } from 'node:crypto';
import { T } from '../config.js';
import { query } from '../db/pool.js';
import { rowToUser } from './users.js';

export const IDLE_MS = 12 * 60 * 60 * 1000;
export const ABSOLUTE_MS = 7 * 24 * 60 * 60 * 1000;
const TOUCH_MS = 5 * 60 * 1000;

export const hashToken = (token) => createHash('sha256').update(token).digest('hex');

/** Tokens are base64url of 32 random bytes — exactly 43 characters. */
export const looksLikeToken = (t) => typeof t === 'string' && /^[A-Za-z0-9_-]{43}$/.test(t);

const clip = (s, n) => (typeof s === 'string' ? s.slice(0, n) : null);

export async function createSession({ userId = null, ip, userAgent } = {}) {
  const token = randomBytes(32).toString('base64url');
  const expiresAt = new Date(Date.now() + ABSOLUTE_MS);
  await query(
    `INSERT INTO ${T.sessions} (user_id, token_hash, expires_at, ip, user_agent) VALUES (?, ?, ?, ?, ?)`,
    [userId, hashToken(token), expiresAt, clip(ip, 45), clip(userAgent, 255)],
  );
  return { token, expiresAt };
}

/**
 * The live session for `token` with its user, or null. A session must belong to a user who still exists
 * (the old password sessions have no user and stop working); the user's role and tabs are read here on
 * every request, so a change in the Users tab takes effect at once. Refreshes last_seen_at when it is
 * older than TOUCH_MS.
 */
export async function validateSession(token) {
  if (!looksLikeToken(token)) return null;
  const rows = await query(
    `SELECT s.id, s.created_at, s.last_seen_at, s.expires_at,
            u.id AS user_id, u.email, u.name, u.role, u.tabs, u.s3_folder, u.created_by, u.last_login_at, u.created_at AS user_created_at
     FROM ${T.sessions} s JOIN ${T.adminUsers} u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > UTC_TIMESTAMP(3)
       AND s.last_seen_at > (UTC_TIMESTAMP(3) - INTERVAL ? SECOND)`,
    [hashToken(token), Math.floor(IDLE_MS / 1000)],
  );
  const s = rows[0];
  if (!s) return null;
  if (Date.now() - new Date(s.last_seen_at).getTime() > TOUCH_MS) {
    await query(`UPDATE ${T.sessions} SET last_seen_at = UTC_TIMESTAMP(3) WHERE id = ?`, [s.id]);
  }
  const user = rowToUser({ id: s.user_id, email: s.email, name: s.name, role: s.role, tabs: s.tabs, s3_folder: s.s3_folder, created_by: s.created_by, last_login_at: s.last_login_at, created_at: s.user_created_at });
  return { id: s.id, createdAt: s.created_at, expiresAt: s.expires_at, user };
}

export async function revokeSession(token) {
  if (!looksLikeToken(token)) return;
  await query(`UPDATE ${T.sessions} SET revoked_at = UTC_TIMESTAMP(3) WHERE token_hash = ? AND revoked_at IS NULL`, [hashToken(token)]);
}

/** Revoke every session (used when the password changes). Returns the number revoked. */
export async function revokeAllSessions() {
  const r = await query(`UPDATE ${T.sessions} SET revoked_at = UTC_TIMESTAMP(3) WHERE revoked_at IS NULL`);
  return r.affectedRows ?? 0;
}

/** Delete sessions that can no longer be used (expired, idle-expired, or revoked over a day ago). */
export async function pruneSessions() {
  await query(
    `DELETE FROM ${T.sessions}
     WHERE expires_at < UTC_TIMESTAMP(3)
        OR last_seen_at < (UTC_TIMESTAMP(3) - INTERVAL ? SECOND)
        OR (revoked_at IS NOT NULL AND revoked_at < (UTC_TIMESTAMP(3) - INTERVAL 1 DAY))`,
    [Math.floor(IDLE_MS / 1000)],
  );
}
