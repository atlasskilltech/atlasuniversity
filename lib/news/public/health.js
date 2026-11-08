/**
 * ATLAS News — public database health, shared IN-PROCESS between the request proxy (proxy.js) and the
 * public read model (repository.js). Both run in the same Node.js process (Next 16 runs the proxy on the
 * Node.js runtime), so the state lives on `globalThis` under a Symbol.for key.
 *
 *   dbAvailable()      cached health: when the database is up, re-checked at most every UP_TTL with one
 *                      `SELECT 1` (bounded by PING_TIMEOUT); when down, every DOWN_TTL; for a page with no
 *                      cached copy, a result at most COLD_TTL old. Concurrent callers
 *                      share one in-flight check. A real query failing with a connection-class error marks
 *                      it down immediately (markDbDown), and any successful query marks it up.
 *   rememberGood(path) a public path this process has rendered successfully — its data is in the data
 *   isGood(path)       cache, so during an outage it is still served (last-known-good). Bounded LRU.
 *
 * Not `server-only`: the unit tests use it, and so does the proxy bundle.
 */
import { NewsDbConfigError, rawQuery } from '../db/pool.js';

const KEY = Symbol.for('atlasnews.public.health');
export const UP_TTL = 10_000;
export const DOWN_TTL = 3_000;
/* a page with NO cached copy is checked against a fresh result: it would fail without the database */
export const COLD_TTL = 250;
export const PING_TIMEOUT = 1_500;
const GOOD_MAX = 5_000;

function state() {
  const g = globalThis;
  if (!g[KEY]) g[KEY] = { up: true, checkedAt: 0, inflight: null, good: new Map() };
  return g[KEY];
}

/** Errors that mean "the database cannot be reached / used", not "this query is wrong". */
const CONNECTION_CODES = new Set([
  'ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'EHOSTUNREACH', 'ENETUNREACH', 'EAI_AGAIN', 'EPIPE',
  'PROTOCOL_CONNECTION_LOST', 'PROTOCOL_SEQUENCE_TIMEOUT', 'POOL_CLOSED', 'ER_ACCESS_DENIED_ERROR',
  'ER_BAD_DB_ERROR', 'ER_CON_COUNT_ERROR', 'ER_SERVER_SHUTDOWN', 'ER_TOO_MANY_USER_CONNECTIONS', 'NEWS_DB_TIMEOUT',
]);
export function isConnectionError(e) {
  return e instanceof NewsDbConfigError || CONNECTION_CODES.has(e?.code);
}

export function markDbDown(now = Date.now()) {
  const s = state();
  s.up = false;
  s.checkedAt = now;
}
export function markDbUp(now = Date.now()) {
  const s = state();
  s.up = true;
  s.checkedAt = now;
}

async function ping() {
  let timer;
  try {
    await Promise.race([
      rawQuery('SELECT 1'),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'NEWS_DB_TIMEOUT' })), PING_TIMEOUT);
      }),
    ]);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * true when the News database is usable. Never throws. `maxAge` overrides how old a cached result may be
 * (the proxy passes COLD_TTL for a path with no last-known-good copy).
 */
export async function dbAvailable(now = Date.now(), maxAge = null) {
  const s = state();
  if (now - s.checkedAt < (maxAge ?? (s.up ? UP_TTL : DOWN_TTL))) return s.up;
  if (!s.inflight) {
    s.inflight = ping().then((ok) => {
      s.up = ok;
      s.checkedAt = Date.now();
      s.inflight = null;
      return ok;
    });
  }
  return s.inflight;
}

/** Normalise a request path the same way the proxy and the pages see it. */
export function normalisePath(p) {
  let out = String(p || '/');
  try {
    out = decodeURIComponent(out);
  } catch {
    /* keep it as given */
  }
  return out.length > 1 ? out.replace(/\/+$/, '') : out;
}

export function rememberGood(path) {
  const { good } = state();
  const k = normalisePath(path);
  good.delete(k);
  good.set(k, Date.now());
  if (good.size > GOOD_MAX) good.delete(good.keys().next().value);
}
export function isGood(path) {
  return state().good.has(normalisePath(path));
}

/** test hook: forget everything */
export function resetHealth() {
  delete globalThis[KEY];
}
