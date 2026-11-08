import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import { listArticles } from '@/lib/news/cms/articles';
import { listCategories } from '@/lib/news/cms/categories';
import { listParams } from '@/lib/news/cms/validate';
import ArticleRowActions from '@/components/News/Admin/ArticleRowActions';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import { BTN_PRIMARY, BTN_SECONDARY, CARD, cx, formatDateTime, INPUT, MUTED, PageHeader, StateBadge } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Articles — ATLAS News Admin', robots: { index: false, follow: false } };

const FILTERS = [
  ['all', 'All'],
  ['live', 'Live'],
  ['scheduled', 'Scheduled'],
  ['draft', 'Drafts'],
  ['trash', 'Trash'],
];
const SORTS = [
  ['updated', 'Last edited'],
  ['published', 'Publication date'],
  ['created', 'Date created'],
  ['title', 'Title A–Z'],
];

/* Search, filter, sort and pagination are plain GET parameters: every view has a shareable URL and works
   without JavaScript. Row actions (duplicate, trash, restore) are the only client code on the page. */
export default async function ArticlesPage({ searchParams }) {
  await requireAdminPage();
  const sp = await searchParams;
  const p = listParams(sp);
  let data;
  let categories;
  try {
    [data, categories] = await Promise.all([listArticles(p), listCategories()]);
  } catch (e) {
    return <DbUnavailable title="Articles" code={e?.code} />;
  }
  const href = (over) => {
    const q = new URLSearchParams();
    const merged = { q: p.q, filter: p.filter, sort: p.sort, category: p.categoryId || '', page: 1, ...over };
    for (const [k, v] of Object.entries(merged)) if (v && !(k === 'page' && v === 1) && !(k === 'filter' && v === 'all') && !(k === 'sort' && v === 'updated')) q.set(k, String(v));
    const s = q.toString();
    return `/news/admin/articles${s ? `?${s}` : ''}`;
  };

  return (
    <div>
      <PageHeader title="Articles" description={`${data.total} ${data.total === 1 ? 'article' : 'articles'}${p.filter !== 'all' ? ` · ${FILTERS.find((f) => f[0] === p.filter)[1]}` : ''}`}>
        <Link href="/news/admin/articles/new" className={BTN_PRIMARY}>
          New article
        </Link>
      </PageHeader>

      <div className="mb-4 flex flex-wrap gap-1.5" role="tablist" aria-label="Filter">
        {FILTERS.map(([key, label]) => (
          <Link
            key={key}
            href={href({ filter: key })}
            aria-current={p.filter === key ? 'page' : undefined}
            className={cx('rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition', p.filter === key ? 'bg-[#14161a] text-white' : 'bg-white text-[#2b2f38] hover:bg-[#e9ebef]')}
          >
            {label}
          </Link>
        ))}
      </div>

      <form method="get" className={cx(CARD, 'mb-4 grid gap-3 !p-4 sm:grid-cols-[1fr_200px_180px_auto]')}>
        {p.filter !== 'all' ? <input type="hidden" name="filter" value={p.filter} /> : null}
        <label className="sr-only" htmlFor="q">Search</label>
        <input id="q" name="q" defaultValue={p.q} placeholder="Search title or slug…" className={INPUT} />
        <label className="sr-only" htmlFor="category">Category</label>
        <select id="category" name="category" defaultValue={p.categoryId || ''} className={INPUT}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="sort">Sort</label>
        <select id="sort" name="sort" defaultValue={p.sort} className={INPUT}>
          {SORTS.map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </select>
        <button type="submit" className={BTN_SECONDARY}>
          Apply
        </button>
      </form>

      <div className={cx(CARD, '!p-0 overflow-hidden')}>
        {data.items.length ? (
          <ul className="divide-y divide-[#eef0f3]">
            {data.items.map((a) => (
              <li key={a.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
                <div className="hidden h-14 w-20 shrink-0 overflow-hidden rounded-md bg-[#eef0f3] sm:block">
                  {a.thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element -- admin thumbnail, already a 480px rendition
                    <img src={a.thumb.variants.find((v) => v.name === 'thumb')?.url || a.thumb.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StateBadge state={a.state} />
                    {a.homepage ? <span className="rounded-full bg-[#fff4e5] px-2.5 py-0.5 text-[12px] font-semibold text-[#9a5b00]">Homepage · {a.homepage.label}</span> : null}
                  </div>
                  <Link href={`/news/admin/articles/${a.id}`} className="mt-1 block truncate text-[15px] font-semibold hover:underline">
                    {a.title}
                  </Link>
                  <p className="mt-0.5 truncate text-[12.5px] text-[#6b7180]">
                    /news/{a.slug}
                    {a.category ? ` · ${a.category.name}` : ''}
                    {' · '}
                    {a.state === 'draft' || a.state === 'trash' ? `edited ${formatDateTime(a.updatedAt)}` : formatDateTime(a.publishedAt)}
                  </p>
                </div>
                <ArticleRowActions id={a.id} state={a.state} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={cx(MUTED, 'p-6')}>{p.q || p.categoryId ? 'No articles match.' : p.filter === 'trash' ? 'Trash is empty.' : 'No articles yet.'}</p>
        )}
      </div>

      {data.totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-4 flex items-center justify-between">
          {data.page > 1 ? <Link className={BTN_SECONDARY} href={href({ page: data.page - 1 })}>← Previous</Link> : <span />}
          <span className="text-[13px] text-[#5b6170]">
            Page {data.page} of {data.totalPages}
          </span>
          {data.page < data.totalPages ? <Link className={BTN_SECONDARY} href={href({ page: data.page + 1 })}>Next →</Link> : <span />}
        </nav>
      ) : null}
    </div>
  );
}
