import 'server-only';

/**
 * ATLAS News — temporary password-only admin authentication.
 *
 * THE ONE PLACE TO REPLACE LATER. Every admin page and API asks this module, and only this module,
 * whether the request is an admin: `getAdminSession()` (server components), `requireAdminPage()`
 * (pages/layouts — redirects to the login form) and `requireAdminApi(request)` (route handlers — 401).
 * Swapping the password for real accounts (SSO, per-user logins) means rewriting `login()` and the
 * session lookup here; nothing else changes.
 *
 * Password source, in order:
 *   1. NEWS_ADMIN_PASSWORD_HASH — optional env var holding a scrypt hash (never the password);
 *   2. the `admin_password_hash` setting in atlasnews_settings, written by
 *      `npm run news:admin -- set-password` (reads the password from stdin, never from argv).
 * The production environment was deliberately left unchanged, so (2) is the expected source.
 *
 * Cookie: HttpOnly, SameSite=Strict, Path=/news/admin (never sent to any other route), Secure and
 * `__Secure-` prefixed over HTTPS. Logins over plain HTTP are refused except on localhost, because the
 * password and the session token would otherwise cross the network in clear text.
 *
 * CSRF: SameSite=Strict plus `assertSameOrigin()` on every state-changing request.
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_BASENAME, ADMIN_COOKIE_PATH } from '../config.js';
import { getSetting, SETTING } from '../db/settings.js';
import { parseHash, verifyPassword } from './password.js';
import { checkLoginAllowed, pruneLoginAttempts, recordLoginAttempt } from './rateLimit.js';
import { ABSOLUTE_MS, createSession, pruneSessions, revokeSession, validateSession } from './sessions.js';
import { newsClientIp as clientIp } from '../http/clientIp.js';

const SECURE_NAME = `__Secure-${ADMIN_COOKIE_BASENAME}`;
const PLAIN_NAME = ADMIN_COOKIE_BASENAME;
const LOCAL_HOSTS = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;

/* ------------------------------------------------------------------------------------ transport */

function requestHost(request) {
  return (request.headers.get('x-forwarded-host') || request.headers.get('host') || '').split(',')[0].trim();
}

/** True when the browser reached us over HTTPS (directly or via the proxy in front of Next). */
export function isHttps(request) {
  const proto = (request.headers.get('x-forwarded-proto') || '').split(',')[0].trim().toLowerCase();
  if (proto) return proto === 'https';
  try {
    return new URL(request.url).protocol === 'https:';
  } catch {
    return false;
  }
}

/** HTTPS, or a local development host. */
export function transportAllowed(request) {
  return isHttps(request) || LOCAL_HOSTS.test(requestHost(request));
}

/**
 * CSRF guard for state-changing requests: the Origin header must be present and name this host, and a
 * Sec-Fetch-Site header, when the browser sends one, must say same-origin. (Stricter than /api/search,
 * which tolerates a missing Origin — a write API should not.)
 */
export function assertSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  let host;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  if (host.toLowerCase() !== requestHost(request).toLowerCase()) return false;
  const site = request.headers.get('sec-fetch-site');
  return !site || site === 'same-origin';
}

/* ------------------------------------------------------------------------------------ responses */

export const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  'X-Robots-Tag': 'noindex, nofollow',
  'X-Content-Type-Options': 'nosniff',
};

export function json(body, status = 200, extra = {}) {
  return Response.json(body, { status, headers: { ...NO_STORE_HEADERS, ...extra } });
}

export const fail = (status, code, message, extra = {}) => json({ error: message, code }, status, extra);

/* ------------------------------------------------------------------------------------ password */

async function storedPasswordHash() {
  const fromEnv = (process.env.NEWS_ADMIN_PASSWORD_HASH || '').trim();
  if (fromEnv) return parseHash(fromEnv) ? { hash: fromEnv, source: 'env' } : { hash: null, source: 'env-invalid' };
  const fromDb = await getSetting(SETTING.adminPasswordHash, null);
  return { hash: parseHash(fromDb) ? fromDb : null, source: fromDb ? 'database' : 'unset' };
}

/** For the health panel: where the hash comes from, never the hash itself. */
export async function passwordSource() {
  return (await storedPasswordHash()).source;
}

/* ------------------------------------------------------------------------------------ cookies */

function cookieOptions(secure, maxAgeSeconds) {
  return { httpOnly: true, sameSite: 'strict', secure, path: ADMIN_COOKIE_PATH, maxAge: maxAgeSeconds };
}

function cookieHeader(name, value, opts) {
  const parts = [`${name}=${value}`, `Path=${opts.path}`, `Max-Age=${opts.maxAge}`, 'HttpOnly', 'SameSite=Strict'];
  if (opts.secure) parts.push('Secure');
  return parts.join('; ');
}

function readToken(cookieStore) {
  return cookieStore.get(SECURE_NAME)?.value || cookieStore.get(PLAIN_NAME)?.value || null;
}

function tokenFromRequest(request) {
  const raw = request.headers.get('cookie') || '';
  const map = new Map();
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > 0) map.set(part.slice(0, i).trim(), part.slice(i + 1).trim());
  }
  return map.get(SECURE_NAME) || map.get(PLAIN_NAME) || null;
}

/* ------------------------------------------------------------------------------------ login/logout */

/**
 * Attempt a login. Returns a Response (route handlers return it as-is).
 * Order: transport → rate limit → constant-time verification → record → session + cookie.
 */
export async function login(request, password) {
  if (!transportAllowed(request)) return fail(403, 'https_required', 'The admin panel must be used over HTTPS.');
  const ip = clientIp(request);
  const gate = await checkLoginAllowed(ip);
  if (!gate.allowed) {
    return fail(429, 'rate_limited', 'Too many failed attempts. Try again later.', { 'Retry-After': String(gate.retryAfter) });
  }
  const { hash } = await storedPasswordHash();
  /* verifyPassword always runs scrypt, so an unset hash costs the same time as a wrong password */
  const ok = await verifyPassword(password, hash);
  await recordLoginAttempt(ip, ok);
  if (!ok) {
    if (!hash) return fail(503, 'not_configured', 'The admin password has not been set up yet.');
    return fail(401, 'invalid_password', 'Incorrect password.');
  }
  /* housekeeping on the rare successful path, never on the hot path */
  await Promise.allSettled([pruneSessions(), pruneLoginAttempts()]);
  const { token } = await createSession({ ip, userAgent: request.headers.get('user-agent') });
  const secure = isHttps(request);
  const res = json({ ok: true });
  res.headers.append('Set-Cookie', cookieHeader(secure ? SECURE_NAME : PLAIN_NAME, token, cookieOptions(secure, Math.floor(ABSOLUTE_MS / 1000))));
  return res;
}

export async function logout(request) {
  const token = tokenFromRequest(request);
  if (token) await revokeSession(token);
  const res = json({ ok: true });
  /* clear both spellings */
  res.headers.append('Set-Cookie', cookieHeader(SECURE_NAME, '', cookieOptions(true, 0)));
  res.headers.append('Set-Cookie', cookieHeader(PLAIN_NAME, '', cookieOptions(false, 0)));
  return res;
}

/* ------------------------------------------------------------------------------------ guards */

/** Server components: the current admin session or null. Never throws on a database outage — the
 *  caller decides (the login page shows the form; protected pages redirect). */
export async function getAdminSession() {
  const token = readToken(await cookies());
  if (!token) return null;
  try {
    return await validateSession(token);
  } catch {
    return null;
  }
}

/** Pages/layouts: the session, or a redirect to the login form. */
export async function requireAdminPage() {
  const s = await getAdminSession();
  if (!s) redirect('/news/admin/login');
  return s;
}

/**
 * Route handlers: `{ session }` when allowed, otherwise `{ response }` to return immediately.
 * `write: true` (the default for anything but GET/HEAD) also enforces the same-origin check.
 */
export async function requireAdminApi(request, { write = !['GET', 'HEAD'].includes(request.method) } = {}) {
  if (!transportAllowed(request)) return { response: fail(403, 'https_required', 'The admin panel must be used over HTTPS.') };
  if (write && !assertSameOrigin(request)) return { response: fail(403, 'forbidden_origin', 'Cross-origin request refused.') };
  const token = tokenFromRequest(request);
  let session = null;
  try {
    session = token ? await validateSession(token) : null;
  } catch (e) {
    return { response: fail(503, 'database_unavailable', 'The News database is unavailable.', { 'X-News-Error': String(e.code || 'error') }) };
  }
  if (!session) return { response: fail(401, 'unauthorized', 'Please sign in.') };
  return { session };
}
