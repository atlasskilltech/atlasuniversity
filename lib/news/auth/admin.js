import 'server-only';

/**
 * ATLAS Admin — authentication and access (Google sign-in, roles, per-tab access).
 *
 * Every admin page and API asks this module, and only this module, who the visitor is:
 *   getAdminSession()                  server components: { id, user } or null
 *   requireAdminPage({ tab })          pages: the session, a redirect to /admin/login, or (signed in but
 *                                      not allowed this tab) a redirect to /admin?denied=<tab>
 *   requireAdminApi(request)           route handlers: { session } or { response } (401 / 403). The tab is
 *                                      read from the URL (/admin/<tab>/…), so every API under a tab's
 *                                      folder is covered without naming it.
 *
 * Sign-in is Google only (lib/news/auth/google.js); who may sign in, and what they may open, is the
 * Users tab (lib/news/auth/users.js, lib/admin/access.js). Roles and tabs are read from the database on
 * every request, so a change in the Users tab applies on the user's next click.
 *
 * Session cookie: HttpOnly, SameSite=Strict, Path=/admin, Secure and `__Secure-` prefixed over HTTPS.
 * Sign-in over plain HTTP is refused except on localhost.
 *
 * CSRF: SameSite=Strict plus `assertSameOrigin()` on every state-changing request.
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_BASENAME, ADMIN_COOKIE_PATH } from '../config.js';
import { canOpen, tabForPath } from '../../admin/access.js';
import { CALLBACK_PATH, finishSignIn, googleConfig, OAUTH_COOKIE, SignInError, startSignIn } from './google.js';
import { checkLoginAllowed, pruneLoginAttempts, recordLoginAttempt } from './rateLimit.js';
import { userForSignIn } from './users.js';
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

/* ------------------------------------------------------------------------------------ status */

/** For the health panel: whether Google sign-in is configured, never the values. */
export function signInStatus() {
  if (!googleConfig().configured) return 'google: not configured';
  return process.env.ADMIN_BOOTSTRAP_EMAIL ? 'google' : 'google: no ADMIN_BOOTSTRAP_EMAIL';
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

/* ------------------------------------------------------------------------------------ sign-in */

function loginRedirect(request, error) {
  const res = new Response(null, { status: 303, headers: { ...NO_STORE_HEADERS, Location: `/admin/login${error ? `?error=${error}` : ''}` } });
  /* the one-time OAuth cookie is spent either way */
  res.headers.append('Set-Cookie', `${OAUTH_COOKIE}=; Path=${CALLBACK_PATH}; Max-Age=0; HttpOnly; SameSite=Lax${isHttps(request) ? '; Secure' : ''}`);
  return res;
}

/** GET /admin/api/auth/google → off to Google's account chooser. */
export function beginGoogleSignIn(request) {
  if (!transportAllowed(request)) return loginRedirect(request, 'https_required');
  if (!googleConfig().configured) return loginRedirect(request, 'not_configured');
  const { url, cookieValue, maxAge } = startSignIn(request);
  const res = new Response(null, { status: 302, headers: { ...NO_STORE_HEADERS, Location: url } });
  /* SameSite=Lax: it must come back on Google's top-level redirect to the callback */
  res.headers.append('Set-Cookie', `${OAUTH_COOKIE}=${cookieValue}; Path=${CALLBACK_PATH}; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${isHttps(request) ? '; Secure' : ''}`);
  return res;
}

/*
 * The session cookie is SameSite=Strict, and a browser does not send a Strict cookie on a navigation
 * that started on another site — which includes a redirect chain that began at Google. So the callback
 * does not 302 to /admin: it answers with a tiny page that navigates there itself, a same-site
 * navigation that does carry the cookie.
 */
function signedInPage() {
  const html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex">'
    + '<meta http-equiv="refresh" content="0;url=/admin"><title>Signing in…</title></head>'
    + '<body style="font-family:system-ui,sans-serif;padding:40px"><p>Signed in. <a href="/admin">Continue to the admin</a></p></body></html>';
  return new Response(html, {
    status: 200,
    headers: { ...NO_STORE_HEADERS, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; frame-ancestors 'none'", 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY' },
  });
}

function readCookie(request, name) {
  for (const part of (request.headers.get('cookie') || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

/** GET /auth/callback — Google returns here. Checks everything, then starts a session. */
export async function completeGoogleSignIn(request) {
  if (!transportAllowed(request)) return loginRedirect(request, 'https_required');
  if (!googleConfig().configured) return loginRedirect(request, 'not_configured');
  const ip = clientIp(request);
  let user;
  try {
    const gate = await checkLoginAllowed(ip);
    if (!gate.allowed) return loginRedirect(request, 'rate_limited');
    let who;
    try {
      who = await finishSignIn(request, readCookie(request, OAUTH_COOKIE));
    } catch (e) {
      if (e instanceof SignInError) {
        if (e.code !== 'cancelled') await recordLoginAttempt(ip, false);
        return loginRedirect(request, e.code);
      }
      throw e;
    }
    user = await userForSignIn(who.email, who.name);
    await recordLoginAttempt(ip, Boolean(user));
    if (!user) return loginRedirect(request, 'not_allowed');
    await Promise.allSettled([pruneSessions(), pruneLoginAttempts()]);
    const { token } = await createSession({ userId: user.id, ip, userAgent: request.headers.get('user-agent') });
    const secure = isHttps(request);
    const res = signedInPage();
    res.headers.append('Set-Cookie', cookieHeader(secure ? SECURE_NAME : PLAIN_NAME, token, cookieOptions(secure, Math.floor(ABSOLUTE_MS / 1000))));
    res.headers.append('Set-Cookie', `${OAUTH_COOKIE}=; Path=${CALLBACK_PATH}; Max-Age=0; HttpOnly; SameSite=Lax${secure ? '; Secure' : ''}`);
    return res;
  } catch {
    return loginRedirect(request, 'database_unavailable');
  }
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

/**
 * Pages/layouts: the session, or a redirect to the login form. With `tab`, a signed-in user who may not
 * open that tab is sent to the admin home, which says so.
 */
export async function requireAdminPage({ tab } = {}) {
  const s = await getAdminSession();
  if (!s) redirect('/admin/login');
  if (tab && !canOpen(s.user, tab)) redirect(`/admin?denied=${encodeURIComponent(tab)}`);
  return s;
}

/**
 * Route handlers: `{ session }` when allowed, otherwise `{ response }` to return immediately.
 * `write: true` (the default for anything but GET/HEAD) also enforces the same-origin check.
 */
export async function requireAdminApi(request, { write = !['GET', 'HEAD'].includes(request.method) } = {}) {
  /* the tab comes from the URL: /admin/news/api/… needs News, /admin/users/api needs an admin */
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
  let tab = null;
  try {
    tab = tabForPath(new URL(request.url).pathname);
  } catch {
    tab = null;
  }
  if (tab && !canOpen(session.user, tab)) return { response: fail(403, 'forbidden_tab', 'You do not have access to this part of the admin.') };
  return { session };
}
