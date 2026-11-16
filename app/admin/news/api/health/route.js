import { json, requireAdminApi } from '@/lib/news/auth/admin';
import { foundationHealth } from '@/lib/news/health';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/** GET → foundation status (admin only). No secret, hash or credential is ever included. */
export async function GET(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  return json(await foundationHealth());
}
