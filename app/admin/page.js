import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell, { TOOLS, toolsFor } from '@/components/Admin/AdminShell';

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
  return (
    <AdminShell>
      <h1 className="text-[28px] font-semibold leading-tight">Admin</h1>
      <p className="mt-1 text-[14px] text-[#5b6170]">{user.name ? `Hello, ${user.name}. ` : ''}Choose a tool to manage.</p>
      {deniedTool ? (
        <p role="alert" className="mt-4 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] text-[#b42318]">
          You don’t have access to {deniedTool.title}. Ask an admin to give you that tab.
        </p>
      ) : null}
      {!tools.length ? (
        <p className="mt-6 rounded-2xl bg-white p-6 text-[15px] text-[#5b6170] ring-1 ring-[#e3e5ea]">
          You are signed in, but no tabs have been given to you yet. Ask an admin to give you access in the Users tab.
        </p>
      ) : null}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(20,22,26,0.06)] ring-1 ring-[#e3e5ea] transition hover:ring-[#14161a]"
          >
            <span className="text-[13px] font-medium text-[#5b6170]">{t.label}</span>
            <span className="mt-1 text-[20px] font-semibold">{t.title}</span>
            <span className="mt-2 text-[14px] text-[#5b6170]">{t.description}</span>
            <span className="mt-5 text-[14px] font-medium text-[#14161a] group-hover:underline">{t.cta} →</span>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
