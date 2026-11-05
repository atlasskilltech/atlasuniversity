import 'server-only';

/**
 * Best-effort, in-memory, per-IP rate limiting for /api/search.
 *
 * Every AI Search request costs an OpenAI call, and the page is public, so the
 * route needs *some* brake. This one is a fixed set of sliding windows kept in
 * module scope:
 *
 *   SEARCH_LIMITS   8 requests per minute and 40 per hour, per client IP
 *
 * Scope, stated plainly: the store lives in one server instance's memory. On a
 * single long-lived `next start` that is a real per-IP limit; on a serverless
 * platform each instance keeps its own count, so a determined client spread
 * across instances gets more. It stops accidental loops, refresh storms and
 * casual scripting — it is not abuse protection against a distributed attacker.
 * For that, put a shared store (Redis/KV) or the platform's own rate limiting
 * in front of the route; the call site would not change.
 *
 * Memory is bounded: an entry is pruned once all its timestamps fall outside
 * the longest window, and the map is swept at most once a minute.
 */

export const SEARCH_LIMITS = [
  { windowMs: 60 * 1000, max: 8 },
  { windowMs: 60 * 60 * 1000, max: 40 },
];

const LONGEST = Math.max(...SEARCH_LIMITS.map((l) => l.windowMs));
const hits = new Map(); // ip -> number[] (request timestamps, oldest first)
let lastSweep = 0;

function sweep(now) {
  if (now - lastSweep < 60 * 1000) return;
  lastSweep = now;
  for (const [ip, times] of hits) {
    if (!times.length || now - times[times.length - 1] > LONGEST) hits.delete(ip);
  }
}

/**
 * Records one request for `ip` and reports whether it is allowed.
 * Returns `{ ok: true }` or `{ ok: false, retryAfter }` (seconds).
 */
export function takeToken(ip, now = Date.now()) {
  sweep(now);
  const times = (hits.get(ip) || []).filter((t) => now - t < LONGEST);

  for (const { windowMs, max } of SEARCH_LIMITS) {
    const inWindow = times.filter((t) => now - t < windowMs);
    if (inWindow.length >= max) {
      const retryAfter = Math.max(1, Math.ceil((inWindow[0] + windowMs - now) / 1000));
      hits.set(ip, times);
      return { ok: false, retryAfter };
    }
  }

  times.push(now);
  hits.set(ip, times);
  return { ok: true };
}

/** The client IP as the proxy in front of Next reports it. */
export function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
