import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import { dashboardSummary } from '@/lib/news/cms/dashboard';
import { BTN_PRIMARY, cx, formatDateTime, MUTED, PageHeader, PANEL, PANEL_HEAD, StateBadge } from '@/components/News/Admin/ui';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard — ATLAS News Admin', robots: { index: false, follow: false } };

const ICON = {
  live: 'M5 12l4 4L19 6',
  scheduled: 'M12 7v5l3 2M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z',
  drafts: 'M4 20h4L19 9l-4-4L4 16v4ZM14 6l4 4',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
  categories: 'M4 5h7v7H4zM13 5h7v7h-7zM4 14h7v6H4zM13 14h7v6h-7z',
  homepage: 'M3 10.5 12 3l9 7.5M5 9v11h14V9',
  media: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a1.5 1.5 0 1 0 0-.01',
};

/* One cPanel-style tile: icon, label, figure — the whole tile links where it did before. */
function Stat({ label, value, href, note, icon }) {
  return (
    <Link href={href} className="group -mb-px -mr-px flex min-w-0 items-center gap-3 border-b border-r border-[#eef0f3] px-3 py-3 sm:px-4 transition hover:bg-[#f4f5f7]">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-[#f4f5f7] text-[#14161a] ring-1 ring-[#e3e5ea] group-hover:bg-white">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={ICON[icon]} />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block text-[12.5px] font-medium text-[#5b6170] group-hover:underline">{label}</span>
        <span className="block text-[20px] font-semibold leading-tight tabular-nums">{value}</span>
        {note ? <span className="block truncate text-[12px] text-[#6b7180]">{note}</span> : null}
      </span>
    </Link>
  );
}

function ArticleList({ title, items, empty, right }) {
  return (
    <section className={cx(PANEL, 'min-w-0')}>
      <h2 className={PANEL_HEAD}>{title}</h2>
      {items.length ? (
        <ul className="divide-y divide-[#eef0f3]">
          {items.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-4 px-4 py-2 hover:bg-[#fafbfc]">
              <Link href={`/admin/news/articles/${a.id}`} className="min-w-0 truncate text-[14px] font-medium hover:underline">
                {a.title}
              </Link>
              {right(a)}
            </li>
          ))}
        </ul>
      ) : (
        <p className={cx(MUTED, 'px-4 py-3')}>{empty}</p>
      )}
    </section>
  );
}

/* Every figure is a COUNT over the News tables. There are no readership numbers: no analytics source exists. */
export default async function NewsAdminDashboard() {
  await requireAdminPage({ tab: 'news' });
  let d;
  try {
    d = await dashboardSummary();
  } catch (e) {
    return <DbUnavailable title="Dashboard" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Dashboard" description="What is on ATLAS News right now.">
        <Link href="/admin/news/articles/new" className={BTN_PRIMARY}>
          New article
        </Link>
      </PageHeader>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className={cx(PANEL, 'xl:col-span-2')}>
          <h2 className={PANEL_HEAD}>Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <Stat icon="live" label="Live articles" value={d.articles.live} href="/admin/news/articles?filter=live" />
            <Stat icon="scheduled" label="Scheduled" value={d.articles.scheduled} href="/admin/news/articles?filter=scheduled" />
            <Stat icon="drafts" label="Drafts" value={d.articles.drafts} href="/admin/news/articles?filter=draft" />
            <Stat icon="trash" label="In Trash" value={d.articles.trash} href="/admin/news/articles?filter=trash" />
            <Stat icon="categories" label="Categories" value={d.categories.total} href="/admin/news/categories" note={`${d.categories.inMenu} of 8 in the navigation`} />
            <Stat icon="homepage" label="Homepage slots filled" value={`${d.homepage.filled}/${d.homepage.capacity}`} href="/admin/news/homepage" />
            <Stat icon="media" label="Images in library" value={d.media.total} href="/admin/news/media" />
          </div>
        </section>
        <ArticleList
          title="Coming up"
          items={d.upcoming}
          empty="Nothing scheduled."
          right={(a) => <span className="shrink-0 text-[13px] text-[#5b6170]">{formatDateTime(a.publishedAt)}</span>}
        />
        <ArticleList title="Recently edited" items={d.recent} empty="No articles yet." right={(a) => <StateBadge state={a.state} />} />
      </div>
    </div>
  );
}
