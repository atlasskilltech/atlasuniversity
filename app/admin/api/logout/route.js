import { assertSameOrigin, fail, logout } from '@/lib/news/auth/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** POST → revokes the session in the database and clears the cookie. */
export async function POST(request) {
  if (!assertSameOrigin(request)) return fail(403, 'forbidden_origin', 'Cross-origin request refused.');
  try {
    return await logout(request);
  } catch (e) {
    return fail(503, 'database_unavailable', 'The News database is unavailable.', { 'X-News-Error': String(e.code || 'error') });
  }
}
