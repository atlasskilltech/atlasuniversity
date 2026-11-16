import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import AdminShell from '@/components/Admin/AdminShell';
import { CARD, INPUT, LABEL, MUTED, PageHeader, cx, formatDateTime } from '@/components/News/Admin/ui';
import { ACTIVITY_TABS, RETENTION_DAYS, activityUsers, listActivity } from '@/lib/admin/activity';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Activity — ATLAS Admin' };

const TAB_TONE = {
  news: 'bg-[#eef2ff] text-[#3b4fc4]',
  keydates: 'bg-[#fff4d6] text-[#7a5600]',
  users: 'bg-[#e7f6ec] text-[#11733b]',
  'sign-in': 'bg-[#f1f2f4] text-[#4a4f5c]',
};
const tabLabel = (k) => ACTIVITY_TABS.find((t) => t.key === k)?.label || k;
const FILTERS = ['user', 'tab', 'from', 'to', 'q'];

function qs(params, over = {}) {
  const p = new URLSearchParams();
  for (const k of [...FILTERS, 'page']) {
    const v = k in over ? over[k] : params[k];
    if (v) p.set(k, v);
  }
  const s = p.toString();
  return s ? `?${s}` : '';
}

/*
 * /admin/activity — admins only (requireAdminPage({ tab: 'activity' }); the export route checks the same
 * through requireAdminApi). Who did what and when, newest first, with before/after values. Read-only:
 * nothing here can change or delete a row.
 */
export default async function ActivityPage({ searchParams }) {
  await requireAdminPage({ tab: 'activity' });
  const sp = (await searchParams) || {};
  const params = Object.fromEntries(FILTERS.map((k) => [k, typeof sp[k] === 'string' ? sp[k].slice(0, 200) : '']));
  const page = Math.max(1, Number(sp.page) || 1);
  let data = { items: [], total: 0, page, pageSize: 50 };
  let users = [];
  let dbError = false;
  try {
    [data, users] = await Promise.all([listActivity(params, { page, pageSize: 50 }), activityUsers()]);
  } catch {
    dbError = true;
  }
  const pages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const filtered = FILTERS.some((k) => params[k]);

  return (
    <AdminShell active="activity">
      <PageHeader title="Activity log" description={`Every sign-in and every change made in the admin: who, when, what and on what, with before and after values. Kept for ${RETENTION_DAYS} days. Only admins can see this page, and nobody can edit or delete it.`} />

      <form method="get" className={cx(CARD, 'grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:items-end')}>
        <label className="lg:col-span-2">
          <span className={LABEL}>Person</span>
          <select name="user" defaultValue={params.user} className={INPUT}>
            <option value="">Everyone</option>
            {users.map((u) => (
              <option key={u.email} value={u.email}>
                {u.name ? `${u.name} (${u.email})` : u.email}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={LABEL}>Tab</span>
          <select name="tab" defaultValue={params.tab} className={INPUT}>
            <option value="">All</option>
            {ACTIVITY_TABS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className={LABEL}>From</span>
          <input type="date" name="from" defaultValue={params.from} className={INPUT} />
        </label>
        <label>
          <span className={LABEL}>To</span>
          <input type="date" name="to" defaultValue={params.to} className={INPUT} />
        </label>
        <label>
          <span className={LABEL}>Search</span>
          <input type="search" name="q" defaultValue={params.q} placeholder="Article, page, email…" className={INPUT} />
        </label>
        <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-6">
          <button type="submit" className="inline-flex h-10 items-center rounded-lg bg-[#14161a] px-4 text-[14px] font-medium text-white hover:bg-[#2b2f38]">
            Apply filters
          </button>
          {filtered ? (
            <Link href="/admin/activity" className="inline-flex h-10 items-center rounded-lg border border-[#d6d9e0] px-4 text-[14px] font-medium hover:bg-[#f4f5f7]">
              Clear
            </Link>
          ) : null}
          <a href={`/admin/activity/export${qs(params, { page: '' })}`} className="inline-flex h-10 items-center rounded-lg border border-[#d6d9e0] px-4 text-[14px] font-medium hover:bg-[#f4f5f7]">
            Download CSV (Excel)
          </a>
        </div>
      </form>

      {dbError ? (
        <p role="alert" className="mt-4 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] text-[#b42318]">
          The activity log could not be read. Please try again shortly.
        </p>
      ) : (
        <section className={cx(CARD, 'mt-6')}>
          <p className={MUTED}>
            {data.total.toLocaleString('en-IN')} {data.total === 1 ? 'entry' : 'entries'}
            {filtered ? ' match these filters' : ''} · newest first · times in IST
          </p>
          {data.items.length ? (
            <ul className="mt-3">
              {data.items.map((e) => {
                const changes = e.details?.changes || [];
                const hasMore = changes.length || e.details?.note || e.details?.pages?.length;
                return (
                  <li key={e.id} className="border-b border-[#f0f1f3] py-3 last:border-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-4">
                      <time dateTime={e.at} className="shrink-0 text-[13px] text-[#5b6170] sm:w-[190px]">
                        {formatDateTime(e.at)}
                      </time>
                      <div className="min-w-0 flex-1">
                        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
                          <Link href={`/admin/activity${qs({ user: e.userEmail })}`} className="font-semibold hover:underline" title={e.userEmail || ''}>
                            {e.userName || e.userEmail || 'Unknown'}
                          </Link>
                          <span className={cx('rounded-full px-2 py-0.5 text-[11.5px] font-semibold', TAB_TONE[e.tab])}>{tabLabel(e.tab)}</span>
                          <span>{e.summary}</span>
                          {e.target ? (
                            e.targetUrl ? (
                              <Link href={e.targetUrl} className="break-all font-medium hover:underline">
                                {e.target}
                              </Link>
                            ) : (
                              <span className="break-all font-medium">{e.target}</span>
                            )
                          ) : null}
                        </p>
                        {e.userName && e.userEmail ? <p className="text-[12.5px] text-[#6b7180]">{e.userEmail}</p> : null}
                        {hasMore ? (
                          <details className="mt-2 rounded-lg bg-[#f7f8fa] px-3 py-2 text-[13px]">
                            <summary className="cursor-pointer font-medium text-[#2b2f38]">
                              {changes.length ? `${changes.length + (e.details?.more || 0)} change${changes.length + (e.details?.more || 0) === 1 ? '' : 's'}` : 'Details'}
                            </summary>
                            {changes.length ? (
                              <div className="mt-2 overflow-x-auto">
                                <table className="w-full table-fixed text-left">
                                  <thead className="text-[11.5px] uppercase tracking-wide text-[#6b7180]">
                                    <tr>
                                      <th className="w-[30%] py-1 pr-3 font-semibold">What</th>
                                      <th className="py-1 pr-3 font-semibold">Before</th>
                                      <th className="py-1 font-semibold">After</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {changes.map((c, i) => (
                                      <tr key={`${c.field}-${i}`} className="align-top">
                                        <td className="py-1 pr-3 font-medium [overflow-wrap:anywhere]">{c.field}</td>
                                        <td className="py-1 pr-3 text-[#b42318] [overflow-wrap:anywhere]">{c.from}</td>
                                        <td className="py-1 text-[#11733b] [overflow-wrap:anywhere]">{c.to}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                {e.details?.more ? <p className="mt-1 text-[#6b7180]">…and {e.details.more} more</p> : null}
                              </div>
                            ) : null}
                            {e.details?.note ? <p className="mt-2 text-[#4a4f5c]">{e.details.note}</p> : null}
                            {e.details?.pages?.length ? <p className="mt-2 text-[#4a4f5c]">Pages changed: {e.details.pages.join('; ')}</p> : null}
                          </details>
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-6 text-[14px] text-[#5b6170]">{filtered ? 'Nothing matches these filters.' : 'No activity has been recorded yet.'}</p>
          )}
          {pages > 1 ? (
            <nav aria-label="Pages" className="mt-4 flex items-center justify-between gap-3 text-[14px]">
              {page > 1 ? (
                <Link href={`/admin/activity${qs(params, { page: String(page - 1) })}`} className="rounded-lg border border-[#d6d9e0] px-3 py-1.5 hover:bg-[#f4f5f7]">
                  ← Newer
                </Link>
              ) : (
                <span />
              )}
              <span className="text-[#5b6170]">
                Page {page} of {pages}
              </span>
              {page < pages ? (
                <Link href={`/admin/activity${qs(params, { page: String(page + 1) })}`} className="rounded-lg border border-[#d6d9e0] px-3 py-1.5 hover:bg-[#f4f5f7]">
                  Older →
                </Link>
              ) : (
                <span />
              )}
            </nav>
          ) : null}
        </section>
      )}
    </AdminShell>
  );
}
