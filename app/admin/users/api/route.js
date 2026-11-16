import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { addUser, deleteUser, updateUser, UserError } from '@/lib/news/auth/users';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * POST { action: 'add', email, role, tabs } | { action: 'update', id, role, tabs } | { action: 'delete', id }
 * Admins only: requireAdminApi reads the tab from this URL (/admin/users/…), and only admins may open it.
 */
export async function POST(request) {
  const auth = await requireAdminApi(request);
  if (auth.response) return auth.response;
  let body;
  try {
    body = JSON.parse((await readBodyLimited(request, 4096)).toString('utf8') || '{}');
  } catch (e) {
    if (e instanceof BodyError) return fail(e.status, e.code, e.message);
    return fail(400, 'bad_request', 'Invalid request.');
  }
  const actor = auth.session.user;
  const id = Number(body?.id);
  try {
    if (body?.action === 'add') return json({ ok: true, user: await addUser(body, actor) });
    if (body?.action === 'update') {
      if (!Number.isInteger(id) || id <= 0) return fail(400, 'bad_request', 'Invalid user.');
      return json({ ok: true, user: await updateUser(id, body, actor) });
    }
    if (body?.action === 'delete') {
      if (!Number.isInteger(id) || id <= 0) return fail(400, 'bad_request', 'Invalid user.');
      await deleteUser(id, actor);
      return json({ ok: true });
    }
    return fail(400, 'bad_request', 'Unknown action.');
  } catch (e) {
    if (e instanceof UserError) return fail(e.status, e.code, e.message);
    return fail(503, 'database_unavailable', 'The admin database is unavailable.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
