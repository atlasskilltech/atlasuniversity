import Link from 'next/link';
import LogoutButton from '@/components/News/Admin/LogoutButton';
import { cx } from '@/components/News/Admin/ui';
import { canOpen } from '@/lib/admin/access';
import { getAdminSession } from '@/lib/news/auth/admin';

/**
 * The ATLAS admin's own chrome (/admin and every tool page that is not the News admin, which keeps its
 * own header): the title, the tool tabs, who is signed in, "View site" and "Sign out". Add a tool to TOOLS
 * (and its key to lib/admin/access.js TABS) and it appears here and on the /admin home page. Each user
 * sees only the tabs they may open; admins also see Users.
 */
export const TOOLS = [
  {
    key: 'news',
    href: '/admin/news',
    label: 'News',
    title: 'ATLAS News',
    description: 'Articles, categories, the News homepage and the media library.',
    cta: 'Open News dashboard',
  },
  {
    key: 'keydates',
    href: '/admin/keydates',
    label: 'Key Dates',
    title: 'Key Dates',
    description: 'Every admissions key-dates table on the website: see where they are, edit dates, add rows, columns and tables.',
    cta: 'Open Key Dates',
  },
  {
    key: 'hackathon',
    href: '/admin/hackathon',
    label: 'ATLAS Hackathon',
    title: 'ATLAS Hackathon Registrations',
    description: 'Teams registered for ATLAS Hackathon 2026: view, search, edit, delete, download, re-send the confirmation email, and open or close the form.',
    cta: 'Open registrations',
  },
  {
    key: 'map',
    href: '/admin/map',
    label: 'University Map',
    title: 'University Map',
    description: 'The interactive map of the whole website: every school, programme and page, with fees, eligibility, key dates, CRM widgets and page health. Admins only.',
    cta: 'Open the map',
  },
  {
    key: 'users',
    href: '/admin/users',
    label: 'Users',
    title: 'Users & access',
    description: 'Who can sign in with Google, whether they are an admin, and which tabs each user can open.',
    cta: 'Manage users',
  },
  {
    key: 'activity',
    href: '/admin/activity',
    label: 'Activity',
    title: 'Activity log',
    description: 'Who did what, and when: every sign-in, News change, Key Dates edit and user change, with before and after values.',
    cta: 'View activity',
  },
];

/** The tools `user` may open. */
export const toolsFor = (user) => TOOLS.filter((t) => canOpen(user, t.key));

export default async function AdminShell({ active, children }) {
  const session = await getAdminSession();
  const user = session?.user || null;
  const tools = toolsFor(user);
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#e3e5ea] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex h-14 items-center justify-between gap-3">
            <p className="truncate text-[15px] font-semibold">
              <Link href="/admin" className="hover:underline">
                ATLAS <span className="font-normal text-[#5b6170]">· Admin</span>
              </Link>
            </p>
            <div className="flex items-center gap-2">
              {user ? (
                <span className="hidden max-w-[340px] truncate text-[13px] text-[#5b6170] md:inline" title={user.email}>
                  {user.email} · {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
              ) : null}
              <a href="/" target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center rounded-lg px-3 text-[14px] font-medium text-[#5b6170] hover:bg-[#f4f5f7] hover:text-[#14161a] sm:inline-flex">
                View site ↗
              </a>
              <LogoutButton />
            </div>
          </div>
          <nav aria-label="Admin tools" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {tools.map((t) => (
              <Link
                key={t.key}
                href={t.href}
                aria-current={active === t.key ? 'page' : undefined}
                className={cx(
                  'whitespace-nowrap border-b-2 px-3 py-2.5 text-[14px] font-medium transition',
                  active === t.key ? 'border-[#14161a] text-[#14161a]' : 'border-transparent text-[#5b6170] hover:text-[#14161a]'
                )}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8">{children}</main>
    </>
  );
}
