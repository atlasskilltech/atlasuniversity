import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import DbNotice from '@/components/Admin/KeyDates/DbNotice';
import KeyDatesManager from '@/components/Admin/KeyDates/Manager';
import { loadPageDetail } from '@/lib/keydates/admin';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Key Dates — ATLAS Admin' };

/* /admin/keydates/<page> — one page's key-dates tables: edit, hide, reset, and add new ones */
export default async function KeyDatesPage({ params }) {
  await requireAdminPage();
  const detail = await loadPageDetail((await params).page);
  if (!detail) notFound();
  const { page } = detail;
  return (
    <AdminShell active="keydates">
      <p className="mb-2 text-[13px]">
        <Link href="/admin/keydates" className="text-[#5b6170] hover:text-[#14161a] hover:underline">
          ← All key-dates pages
        </Link>
      </p>
      <PageHeader title={`${page.school} · ${page.title}`} description={page.route}>
        <a href={page.route} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center rounded-lg border border-[#d6d9e0] bg-white px-3.5 text-[14px] font-medium hover:bg-[#f4f5f7]">
          Open page ↗
        </a>
      </PageHeader>
      <DbNotice dbError={detail.dbError} />
      <KeyDatesManager detail={detail} />
    </AdminShell>
  );
}
