import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { CARD, MUTED, PageHeader, formatDateTime } from '@/components/News/Admin/ui';
import { loadOverview } from '@/lib/keydates/admin';
import { SCHOOLS } from '@/lib/keydates/registry';
import DbNotice from '@/components/Admin/KeyDates/DbNotice';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Key Dates — ATLAS Admin' };

/*
 * /admin/keydates — every page on the website that shows key dates, with how many tables and dates each
 * one has, and the totals. "Manage" opens a page's tables to edit them, hide them or add new ones.
 */
export default async function KeyDatesOverview() {
  await requireAdminPage();
  const { pages, totals, dbError } = await loadOverview();
  const stats = [
    ['Pages showing key dates', totals.pages],
    ['Key-dates tables', totals.tables],
    ['Key dates (total)', totals.dates],
    ['Changed in admin', totals.edited],
  ];
  return (
    <AdminShell active="keydates">
      <PageHeader title="Key Dates" description="Every key-dates table on the website. Open a page to change dates, add rows and columns, merge cells, hide a table or add a new one." />
      <DbNotice dbError={dbError} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(([label, n]) => (
          <div key={label} className={CARD}>
            <p className={MUTED}>{label}</p>
            <p className="mt-1 text-[32px] font-semibold leading-none">{n}</p>
          </div>
        ))}
      </div>

      {SCHOOLS.map((school) => {
        const rows = pages.filter((p) => p.school === school);
        if (!rows.length) return null;
        return (
          <section key={school} className={`${CARD} mt-6`}>
            <h2 className="text-[17px] font-semibold">
              {school} <span className="font-normal text-[#5b6170]">· {rows.length} page{rows.length > 1 ? 's' : ''}, {rows.reduce((n, p) => n + p.dates, 0)} key dates</span>
            </h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-[14px]">
                <thead className="text-[12.5px] uppercase tracking-wide text-[#6b7180]">
                  <tr className="border-b border-[#e3e5ea]">
                    <th className="py-2 pr-3 font-semibold">Page</th>
                    <th className="py-2 pr-3 font-semibold">Tables</th>
                    <th className="py-2 pr-3 font-semibold">Key dates</th>
                    <th className="py-2 pr-3 font-semibold">Changes</th>
                    <th className="py-2 pr-3 font-semibold">Last change</th>
                    <th className="py-2 font-semibold" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => {
                    const changes = [p.edited && `${p.edited} edited`, p.hidden && `${p.hidden} hidden`, p.added && `${p.added} added`].filter(Boolean).join(', ');
                    return (
                      <tr key={p.id} className="border-b border-[#f0f1f3] last:border-0">
                        <td className="py-3 pr-3">
                          <Link href={`/admin/keydates/${p.id}`} className="font-medium hover:underline">
                            {p.title}
                          </Link>
                          <a href={p.route} target="_blank" rel="noopener noreferrer" className="block break-all text-[12.5px] text-[#5b6170] hover:text-[#14161a]">
                            {p.route} ↗
                          </a>
                        </td>
                        <td className="py-3 pr-3">{p.tables}</td>
                        <td className="py-3 pr-3 font-semibold">{p.dates}</td>
                        <td className="py-3 pr-3 text-[#5b6170]">{changes || 'As built'}</td>
                        <td className="py-3 pr-3 text-[#5b6170]">{p.lastEdit ? formatDateTime(p.lastEdit) : '—'}</td>
                        <td className="py-3 text-right">
                          <Link href={`/admin/keydates/${p.id}`} className="inline-flex h-9 items-center rounded-lg border border-[#d6d9e0] px-3 font-medium hover:bg-[#f4f5f7]">
                            Manage
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
      <p className={`${MUTED} mt-6`}>
        A key date is a table cell holding a date or a status such as “Closed” or “Applications Open”. The ~95 ISME BBA programme pages only
        have a “Key Dates” button linking to the BBA Admissions page above, so they are not listed separately.
      </p>
    </AdminShell>
  );
}
