import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminNav from '@/components/News/Admin/AdminNav';
import LogoutButton from '@/components/News/Admin/LogoutButton';

export const dynamic = 'force-dynamic';

/* Every page in this group requires an admin session; without one the visitor is sent to the login.
   (Each page ALSO checks the session itself — a layout is not re-run on client navigation.) */
export default async function NewsAdminPanelLayout({ children }) {
  await requireAdminPage();
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-[#e3e5ea] bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[1200px] px-4">
          <div className="flex h-14 items-center justify-between gap-3">
            <p className="truncate text-[15px] font-semibold">
              ATLAS News <span className="font-normal text-[#5b6170]">· Admin</span>
            </p>
            <div className="flex items-center gap-2">
              <a href="/news" target="_blank" rel="noopener noreferrer" className="hidden h-9 items-center rounded-lg px-3 text-[14px] font-medium text-[#5b6170] hover:bg-[#f4f5f7] hover:text-[#14161a] sm:inline-flex">
                View site ↗
              </a>
              <LogoutButton />
            </div>
          </div>
          <AdminNav />
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:py-8">{children}</main>
    </>
  );
}
