import { beginGoogleSignIn } from '@/lib/news/auth/admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET → Google's account chooser (only atlasuniversity.edu.in accounts are offered). */
export function GET(request) {
  return beginGoogleSignIn(request);
}
