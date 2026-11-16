import { fail, json, requireAdminApi } from '@/lib/news/auth/admin';
import { BodyError, readBodyLimited } from '@/lib/news/http/body';
import { addUser, deleteUser, findUserById, updateUser, UserError } from '@/lib/news/auth/users';
import { diffFields, logActivity } from '@/lib/admin/activity';
import { TABS } from '@/lib/admin/access';
import { newsClientIp } from '@/lib/news/http/clientIp';

const tabNames = (tabs) => TABS.filter((t) => (tabs || []).includes(t.key)).map((t) => t.label);
const roleName = (r) => (r === 'admin' ? 'Admin' : r === 'user' ? 'Normal user' : '');
/** what a user can open, as the log shows it */
const ACCESS = [
  ['role', 'Role', roleName],
  ['tabs', 'Tabs', (t) => tabNames(t)],
];

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
  const log = (action, summary, target, changes) =>
    logActivity({ user: actor, tab: 'users', action, summary, target, targetUrl: '/admin/users', details: { changes }, ip: newsClientIp(request) });
  try {
    if (body?.action === 'add') {
      const user = await addUser(body, actor);
      await log('user.add', 'Added user', user.email, diffFields({}, user, ACCESS));
      return json({ ok: true, user });
    }
    if (body?.action === 'update') {
      if (!Number.isInteger(id) || id <= 0) return fail(400, 'bad_request', 'Invalid user.');
      const before = await findUserById(id);
      const user = await updateUser(id, body, actor);
      const changes = diffFields(before, user, ACCESS);
      if (changes.length) await log('user.access', 'Changed access', user.email, changes);
      return json({ ok: true, user });
    }
    if (body?.action === 'delete') {
      if (!Number.isInteger(id) || id <= 0) return fail(400, 'bad_request', 'Invalid user.');
      const before = await findUserById(id);
      await deleteUser(id, actor);
      await log('user.delete', 'Deleted user', before?.email, diffFields(before, {}, ACCESS));
      return json({ ok: true });
    }
    return fail(400, 'bad_request', 'Unknown action.');
  } catch (e) {
    if (e instanceof UserError) return fail(e.status, e.code, e.message);
    return fail(503, 'database_unavailable', 'The admin database is unavailable.', { 'X-News-Error': String(e?.code || 'error') });
  }
}
