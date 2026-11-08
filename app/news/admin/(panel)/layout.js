import { requireAdminPage } from '@/lib/news/auth/admin';
import LogoutButton from '@/components/News/Admin/LogoutButton';

export const dynamic = 'force-dynamic';

/* Every page in this group requires an admin session; without one the visitor is sent to the login. */
export default async function NewsAdminPanelLayout({ children }) {
  await requireAdminPage();
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-[#e3e5ea] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-3 px-4">
          <p className="truncate text-[15px] font-semibold">
            ATLAS News <span className="font-normal text-[#5b6170]">· Admin</span>
          </p>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-4 py-6 sm:py-8">{children}</main>
    </>
  );
}
