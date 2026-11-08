/**
 * ATLAS News — persistent login rate limiting (atlasnews_login_attempts).
 *
 * Stored in the database rather than in memory so a pm2 reload or a second process cannot reset it.
 * Two limits, both on FAILED attempts in a sliding window:
 *   - per client IP: PER_IP failures per WINDOW lock that IP until the oldest one ages out;
 *   - global: GLOBAL failures per WINDOW (a distributed guess from many IPs) lock everyone.
 * A successful login does not erase the record; it simply stops adding failures.
 */
import { T } from '../config.js';
import { query } from '../db/pool.js';

export const WINDOW_SECONDS = 15 * 60;
export const PER_IP = 5;
export const GLOBAL = 50;

/** { allowed, retryAfter } — retryAfter in seconds when blocked. */
export async function checkLoginAllowed(ip) {
  const rows = await query(
    `SELECT
       SUM(ip = ?) AS ip_fails,
       COUNT(*) AS all_fails,
       MIN(CASE WHEN ip = ? THEN attempted_at END) AS ip_oldest,
       MIN(attempted_at) AS all_oldest
     FROM ${T.loginAttempts}
     WHERE succeeded = 0 AND attempted_at > (UTC_TIMESTAMP(3) - INTERVAL ? SECOND)`,
    [ip, ip, WINDOW_SECONDS],
  );
  const r = rows[0] || {};
  const retry = (oldest) => Math.max(1, Math.ceil((new Date(oldest).getTime() + WINDOW_SECONDS * 1000 - Date.now()) / 1000));
  if (Number(r.ip_fails) >= PER_IP) return { allowed: false, retryAfter: retry(r.ip_oldest), scope: 'ip' };
  if (Number(r.all_fails) >= GLOBAL) return { allowed: false, retryAfter: retry(r.all_oldest), scope: 'global' };
  return { allowed: true };
}

export async function recordLoginAttempt(ip, succeeded) {
  await query(`INSERT INTO ${T.loginAttempts} (ip, succeeded) VALUES (?, ?)`, [String(ip).slice(0, 45), succeeded ? 1 : 0]);
}

/** Drop records older than a day (kept that long only for review). */
export async function pruneLoginAttempts() {
  await query(`DELETE FROM ${T.loginAttempts} WHERE attempted_at < (UTC_TIMESTAMP(3) - INTERVAL 1 DAY)`);
}
