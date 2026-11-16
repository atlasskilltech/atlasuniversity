import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import LogoutButton from '@/components/News/Admin/LogoutButton';

/*
 * /admin — the ATLAS admin hub. Each tool of the site's back office is a tab here; today that is
 * ATLAS News, whose admin lives at /admin/news (moved from /news/admin; the old paths 308-redirect).
 * It shares the News admin's sign-in: the session cookie is scoped to /admin, so one login covers the
 * hub and every tool under it. Never indexed, never cached (next.config.mjs headers()), and the ATLAS
 * site chrome is hidden here (components/Schools/MainSiteOnly).
 */
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'ATLAS Admin',
  description: 'ATLAS SkillTech University administration.',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

/* One entry per admin tool. Add a tool here and it appears as a tab and as a card. */
const TOOLS = [
  {
    href: '/admin/news',
    label: 'News',
    title: 'ATLAS News',
    description: 'Articles, categories, the News homepage and the media library.',
    cta: 'Open News dashboard',
  },
];

export default async function AdminHomePage() {
  await requireAdminPage();
  return (
    <div className="min-h-dvh bg-[#f4f5f7] text-[#14161a] antialiased">
      <header className="sticky top-0 z-20 border-b border-[#e3e5ea] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex h-14 items-center justify-between gap-3">
            <p className="truncate text-[15px] font-semibold">
              ATLAS <span className="font-normal text-[#5b6170]">· Admin</span>
            </p>
            <div className="flex items-center gap-2">
              <a href="/" target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center rounded-lg px-3 text-[14px] font-medium text-[#5b6170] hover:bg-[#f4f5f7] hover:text-[#14161a] sm:inline-flex">
                View site ↗
              </a>
              <LogoutButton />
            </div>
          </div>
          <nav aria-label="Admin tools" className="-mb-px flex gap-1 overflow-x-auto [scrollbar-width:none]">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-[14px] font-medium text-[#5b6170] transition hover:text-[#14161a]"
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8">
        <h1 className="text-[28px] font-semibold leading-tight">Admin</h1>
        <p className="mt-1 text-[14px] text-[#5b6170]">Choose a tool to manage.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
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
      </main>
    </div>
  );
}
