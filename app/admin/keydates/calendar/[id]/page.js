import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { PageHeader } from '@/components/News/Admin/ui';
import DbNotice from '@/components/Admin/KeyDates/DbNotice';
import CalendarManager from '@/components/Admin/KeyDates/CalendarManager';
import { loadCalendarDetail } from '@/lib/keydates/admin';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Shared key dates — ATLAS Admin' };

/* /admin/keydates/calendar/<id> — one calendar shown on several pages, edited once for all of them */
export default async function CalendarPage({ params }) {
  await requireAdminPage();
  const detail = await loadCalendarDetail((await params).id);
  if (!detail) notFound();
  return (
    <AdminShell active="keydates">
      <p className="mb-2 text-[13px]">
        <Link href="/admin/keydates" className="text-[#5b6170] hover:text-[#14161a] hover:underline">
          ← All key dates
        </Link>
      </p>
      <PageHeader title={detail.calendar.title} description={`Shared key dates · shown on ${detail.copies.length} page${detail.copies.length > 1 ? 's' : ''}`} />
      <DbNotice dbError={detail.dbError} />
      <CalendarManager detail={detail} />
    </AdminShell>
  );
}
