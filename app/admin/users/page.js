import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import UsersManager from '@/components/Admin/Users/UsersManager';
import { ALLOWED_DOMAIN, TABS } from '@/lib/admin/access';
import { listUsers } from '@/lib/news/auth/users';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Users — ATLAS Admin' };

/*
 * /admin/users — admins only. Who may sign in with Google, their role (Admin: every tab + this one;
 * Normal user: only the tabs ticked for them), and adding, changing or deleting them.
 */
export default async function UsersPage() {
  const { user } = await requireAdminPage({ tab: 'users' });
  let users = [];
  let dbError = false;
  try {
    users = await listUsers();
  } catch {
    dbError = true;
  }
  const plain = users.map((u) => ({ ...u, lastLoginAt: u.lastLoginAt ? new Date(u.lastLoginAt).toISOString() : null, createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : null }));
  return (
    <AdminShell active="users">
      <PageHeader
        title="Users & access"
        description={`People who can sign in with their @${ALLOWED_DOMAIN} Google account. Admins can open every tab and manage users; a normal user sees only the tabs ticked for them.`}
      />
      {dbError ? (
        <p role="alert" className="mb-4 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] text-[#b42318]">
          The admin database could not be read. Please try again shortly.
        </p>
      ) : (
        <UsersManager users={plain} tabs={TABS} me={user.id} domain={ALLOWED_DOMAIN} />
      )}
    </AdminShell>
  );
}
