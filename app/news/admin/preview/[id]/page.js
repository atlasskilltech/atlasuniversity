import Link from 'next/link';
import { notFound } from 'next/navigation';
import { preload } from 'react-dom';
import { requireAdminPage } from '@/lib/news/auth/admin';
import { getArticle } from '@/lib/news/cms/articles';
import { listCategories } from '@/lib/news/cms/categories';
import { toPublicArticle } from '@/lib/news/cms/preview';
import { toId } from '@/lib/news/cms/validate';
import ArticleView from '@/components/News/Public/ArticleView';
import { THEME_CLASSES } from '@/components/News/Public/theme';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import { formatDateTime, StateBadge } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Preview — ATLAS News Admin', robots: { index: false, follow: false, nocache: true } };

/*
 * /news/admin/preview/[id] — any article (draft, scheduled, live) rendered with the public article layout.
 * It lives under /news/admin because the admin cookie is scoped to that path: the preview needs the
 * session, and the public /news routes never receive it. Never cached, never indexed (admin headers).
 */
export default async function ArticlePreviewPage({ params }) {
  await requireAdminPage();
  const id = toId((await params).id);
  if (!id || Number.isNaN(id)) notFound();
  let article;
  let categories;
  try {
    [article, categories] = await Promise.all([getArticle(id), listCategories()]);
  } catch (e) {
    return (
      <div className="mx-auto max-w-[900px] p-6">
        <DbUnavailable title="Preview" code={e?.code} />
      </div>
    );
  }
  if (!article) notFound();
  preload('/assets/fonts/newsreader-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  const view = toPublicArticle(article, categories);

  return (
    <>
      <div className="sticky top-0 z-30 border-b border-[#f5d9a8] bg-[#fff8eb]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-[13.5px] text-[#7a4b00]">
          <p className="flex flex-wrap items-center gap-2">
            <strong>Preview</strong>
            <StateBadge state={article.state} />
            <span>
              {article.state === 'live'
                ? 'This is the saved version, as it appears on the site.'
                : article.state === 'scheduled'
                  ? `Not public yet — goes live ${formatDateTime(article.publishedAt)}.`
                  : article.state === 'trash'
                    ? 'In Trash — not on the site.'
                    : 'Draft — not on the site.'}
            </span>
          </p>
          <Link href={`/news/admin/articles/${article.id}`} className="font-semibold underline">
            Back to editor
          </Link>
        </div>
      </div>
      <div data-news-root="" className={`${THEME_CLASSES} min-h-dvh bg-news-paper pb-24 font-sans text-news-ink antialiased`}>
        <ArticleView article={view} jsonLd={false} />
      </div>
    </>
  );
}
