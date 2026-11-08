import { assertSameOrigin, fail, login, transportAllowed } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX_BODY = 2048;

/** POST { password } → sets the HttpOnly session cookie. Rate limited per IP (lib/news/auth/rateLimit). */
export async function POST(request) {
  if (!transportAllowed(request)) return fail(403, 'https_required', 'The admin panel must be used over HTTPS.');
  if (!assertSameOrigin(request)) return fail(403, 'forbidden_origin', 'Cross-origin request refused.');
  let raw;
  try {
    /* bounded read: never buffers more than MAX_BODY bytes, whatever the client declares */
    raw = (await readBodyLimited(request, MAX_BODY)).toString('utf8');
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.message);
    return fail(400, 'bad_request', 'Invalid request.');
  }
  let password;
  try {
    ({ password } = JSON.parse(raw || '{}'));
  } catch {
    return fail(400, 'bad_request', 'Invalid request.');
  }
  if (typeof password !== 'string' || !password) return fail(400, 'bad_request', 'Password required.');
  try {
    return await login(request, password);
  } catch (e) {
    return fail(503, 'database_unavailable', 'The News database is unavailable.', { 'X-News-Error': String(e.code || 'error') });
  }
}
