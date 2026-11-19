import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell, { TOOLS, toolsFor } from '@/components/Admin/AdminShell';
import HomeTools from '@/components/Admin/HomeTools';

/*
 * /admin — the ATLAS admin hub. Each tool of the site's back office is a tab here: ATLAS News
 * (/admin/news, moved from /news/admin; the old paths 308-redirect) and Key Dates (/admin/keydates).
 * One sign-in (/admin/login) covers the hub and every tool under it: the session cookie is scoped to
 * /admin. Never indexed, never cached (next.config.mjs headers()), no site chrome (MainSiteOnly).
 */
export const dynamic = 'force-dynamic';

export default async function AdminHomePage({ searchParams }) {
  const { user } = await requireAdminPage();
  const tools = toolsFor(user);
  const { denied } = (await searchParams) || {};
  const deniedTool = TOOLS.find((t) => t.key === denied);
  const row = (k, v) => (
    <div className="flex justify-between gap-3 border-b border-[#eef0f3] px-4 py-2 text-[13px] last:border-b-0">
      <dt className="text-[#5b6170]">{k}</dt>
      <dd className="min-w-0 truncate text-right font-medium text-[#14161a]" title={String(v)}>{v}</dd>
    </div>
  );
  return (
    <AdminShell>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3">
        <h1 className="text-[22px] font-semibold leading-tight">Admin</h1>
        <p className="text-[13.5px] text-[#5b6170]">{user.name ? `Hello, ${user.name}. ` : ''}Choose a tool to manage.</p>
      </div>
      {deniedTool ? (
        <p role="alert" className="mb-3 rounded-md bg-[#fdecea] px-4 py-2.5 text-[14px] text-[#b42318]">
          You don’t have access to {deniedTool.title}. Ask an admin to give you that tab.
        </p>
      ) : null}
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        {tools.length ? (
          <HomeTools tools={tools.map(({ key, href, label, title, description, group }) => ({ key, href, label, title, description, group }))} />
        ) : (
          <p className="rounded-md bg-white px-4 py-3 text-[14px] text-[#5b6170] ring-1 ring-[#e3e5ea]">
            You are signed in, but no tabs have been given to you yet. Ask an admin to give you access in the Users tab.
          </p>
        )}
        <aside className="overflow-hidden rounded-md bg-white ring-1 ring-[#e3e5ea]">
          <h2 className="border-b border-[#e3e5ea] bg-[#fafbfc] px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.05em] text-[#5b6170]">General information</h2>
          <dl>
            {user.name ? row('Name', user.name) : null}
            {row('Email', user.email)}
            {row('Role', user.role === 'admin' ? 'Admin' : 'User')}
            {row('Tools you can open', tools.length)}
          </dl>
        </aside>
      </div>
    </AdminShell>
  );
}
