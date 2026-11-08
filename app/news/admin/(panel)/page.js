import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import { dashboardSummary } from '@/lib/news/cms/dashboard';
import { BTN_PRIMARY, CARD, cx, formatDateTime, MUTED, PageHeader, StateBadge } from '@/components/News/Admin/ui';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard — ATLAS News Admin', robots: { index: false, follow: false } };

function Stat({ label, value, href, note }) {
  return (
    <Link href={href} className={cx(CARD, 'block transition hover:shadow-[0_2px_8px_rgba(16,24,40,0.10)]')}>
      <p className="text-[13px] font-medium text-[#5b6170]">{label}</p>
      <p className="mt-1 text-[30px] font-semibold leading-none tabular-nums">{value}</p>
      {note ? <p className="mt-2 text-[12.5px] text-[#6b7180]">{note}</p> : null}
    </Link>
  );
}

/* Every figure is a COUNT over the News tables. There are no readership numbers: no analytics source exists. */
export default async function NewsAdminDashboard() {
  await requireAdminPage();
  let d;
  try {
    d = await dashboardSummary();
  } catch (e) {
    return <DbUnavailable title="Dashboard" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Dashboard" description="What is on ATLAS News right now.">
        <Link href="/news/admin/articles/new" className={BTN_PRIMARY}>
          New article
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Stat label="Live articles" value={d.articles.live} href="/news/admin/articles?filter=live" />
        <Stat label="Scheduled" value={d.articles.scheduled} href="/news/admin/articles?filter=scheduled" />
        <Stat label="Drafts" value={d.articles.drafts} href="/news/admin/articles?filter=draft" />
        <Stat label="In Trash" value={d.articles.trash} href="/news/admin/articles?filter=trash" />
        <Stat label="Categories" value={d.categories.total} href="/news/admin/categories" note={`${d.categories.inMenu} of 8 in the navigation`} />
        <Stat label="Homepage slots filled" value={`${d.homepage.filled}/${d.homepage.capacity}`} href="/news/admin/homepage" />
        <Stat label="Images in library" value={d.media.total} href="/news/admin/media" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className={cx(CARD, 'min-w-0')}>
          <h2 className="text-[16px] font-semibold">Coming up</h2>
          {d.upcoming.length ? (
            <ul className="mt-3 divide-y divide-[#eef0f3]">
              {d.upcoming.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 py-2.5">
                  <Link href={`/news/admin/articles/${a.id}`} className="min-w-0 truncate text-[14px] font-medium hover:underline">
                    {a.title}
                  </Link>
                  <span className="shrink-0 text-[13px] text-[#5b6170]">{formatDateTime(a.publishedAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={cx(MUTED, 'mt-3')}>Nothing scheduled.</p>
          )}
        </section>
        <section className={cx(CARD, 'min-w-0')}>
          <h2 className="text-[16px] font-semibold">Recently edited</h2>
          {d.recent.length ? (
            <ul className="mt-3 divide-y divide-[#eef0f3]">
              {d.recent.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-4 py-2.5">
                  <Link href={`/news/admin/articles/${a.id}`} className="min-w-0 truncate text-[14px] font-medium hover:underline">
                    {a.title}
                  </Link>
                  <StateBadge state={a.state} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={cx(MUTED, 'mt-3')}>No articles yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
