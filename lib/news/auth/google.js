/**
 * ATLAS Admin — Google sign-in (OpenID Connect, authorization-code flow with PKCE).
 *
 *   1. /admin/api/auth/google        → a random `state`, `nonce` and PKCE verifier go into a short-lived
 *                                       HttpOnly cookie scoped to the callback; the browser is sent to
 *                                       Google with `hd` = the university domain.
 *   2. /auth/callback (Google back)   → the state must match the cookie; the code is exchanged at
 *                                       Google's token endpoint (with the client secret and the PKCE
 *                                       verifier) and the returned ID token's issuer, audience, expiry,
 *                                       nonce, verified email and Workspace domain (`hd`) are checked.
 *
 * The ID token arrives directly from Google's token endpoint over TLS, which OpenID Connect Core
 * §3.1.3.7 accepts in place of a signature check. Then the email must be an account in the Users tab
 * (or the owner, ADMIN_BOOTSTRAP_EMAIL) — a university address alone is not enough.
 *
 * Settings (server environment, never in the repository):
 *   GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET   the "Web application" OAuth client
 *   GOOGLE_REDIRECT_URI                      optional; default <this site>/auth/callback
 *   ADMIN_BOOTSTRAP_EMAIL                    the owner (always an admin)
 *   ADMIN_ALLOWED_DOMAIN                     optional; default atlasuniversity.edu.in
 */
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { ALLOWED_DOMAIN, emailAllowed } from '../../admin/access.js';

export const OAUTH_COOKIE = 'atlas_admin_oauth';
export const CALLBACK_PATH = '/auth/callback';
const AUTHORIZE_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const ISSUERS = new Set(['https://accounts.google.com', 'accounts.google.com']);
const STATE_TTL_S = 10 * 60;

export function googleConfig() {
  const clientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
  const clientSecret = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
  return { clientId, clientSecret, configured: Boolean(clientId && clientSecret) };
}

export class SignInError extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

const b64url = (buf) => Buffer.from(buf).toString('base64url');
const rand = () => b64url(randomBytes(32));

/** https://host of the request as the browser saw it (behind the proxy too). */
export function publicOrigin(request) {
  const url = new URL(request.url);
  const proto = (request.headers.get('x-forwarded-proto') || '').split(',')[0].trim() || url.protocol.replace(':', '');
  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || url.host).split(',')[0].trim();
  return `${proto}://${host}`;
}

export function redirectUri(request) {
  return (process.env.GOOGLE_REDIRECT_URI || '').trim() || `${publicOrigin(request)}${CALLBACK_PATH}`;
}

/** Step 1: where to send the browser, and the cookie value that proves the round trip is ours. */
export function startSignIn(request) {
  const { clientId } = googleConfig();
  const state = rand();
  const nonce = rand();
  const verifier = rand();
  const challenge = b64url(createHash('sha256').update(verifier).digest());
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri(request),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    nonce,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    hd: ALLOWED_DOMAIN,
    prompt: 'select_account',
  });
  return { url: `${AUTHORIZE_URL}?${params}`, cookieValue: `${state}.${nonce}.${verifier}`, maxAge: STATE_TTL_S };
}

function sameString(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

function decodeJwtPayload(jwt) {
  const parts = String(jwt || '').split('.');
  if (parts.length !== 3) throw new SignInError('bad_token');
  try {
    return JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
  } catch {
    throw new SignInError('bad_token');
  }
}

/** Check an ID token's claims. Exported for the tests. Returns { email, name }. */
export function checkClaims(claims, { clientId, nonce, now = Date.now() }) {
  if (!claims || !ISSUERS.has(claims.iss)) throw new SignInError('bad_token');
  const aud = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!aud.includes(clientId)) throw new SignInError('bad_token');
  if (typeof claims.exp !== 'number' || claims.exp * 1000 < now - 60_000) throw new SignInError('bad_token');
  if (!nonce || !sameString(claims.nonce || '', nonce)) throw new SignInError('bad_token');
  if (claims.email_verified !== true && claims.email_verified !== 'true') throw new SignInError('wrong_domain');
  if (String(claims.hd || '').toLowerCase() !== ALLOWED_DOMAIN || !emailAllowed(claims.email)) throw new SignInError('wrong_domain');
  return { email: String(claims.email).toLowerCase(), name: claims.name ? String(claims.name) : null };
}

/**
 * Step 2: validate Google's answer. `cookieValue` is the cookie set in step 1.
 * Returns { email, name } of a verified university account, or throws SignInError.
 */
export async function finishSignIn(request, cookieValue) {
  const url = new URL(request.url);
  if (url.searchParams.get('error')) throw new SignInError('cancelled');
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const [cState, nonce, verifier] = String(cookieValue || '').split('.');
  if (!code || !state || !cState || !verifier || !sameString(state, cState)) throw new SignInError('expired');

  const { clientId, clientSecret } = googleConfig();
  let res;
  try {
    res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri(request),
        grant_type: 'authorization_code',
        code_verifier: verifier,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new SignInError('google_unreachable');
  }
  const body = await res.json().catch(() => ({}));
  if (!res.ok || !body.id_token) throw new SignInError('expired');
  return checkClaims(decodeJwtPayload(body.id_token), { clientId, nonce });
}
