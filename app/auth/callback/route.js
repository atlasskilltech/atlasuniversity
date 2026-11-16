import { completeGoogleSignIn } from '@/lib/news/auth/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /auth/callback — where Google sends the admin back after "Sign in with Google". This URL is the
 * Authorised redirect URI registered on the Google OAuth client, which is why it sits outside /admin.
 * Everything is checked in lib/news/auth/admin.js (completeGoogleSignIn).
 */
export function GET(request) {
  return completeGoogleSignIn(request);
}
