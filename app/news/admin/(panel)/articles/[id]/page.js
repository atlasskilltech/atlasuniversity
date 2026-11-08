import { notFound } from 'next/navigation';
import Link from 'next/link';
import { requireAdminPage } from '@/lib/news/auth/admin';
import { getArticle } from '@/lib/news/cms/articles';
import { listCategories } from '@/lib/news/cms/categories';
import { toId } from '@/lib/news/cms/validate';
import ArticleForm from '@/components/News/Admin/ArticleForm';
import ArticleRowActions from '@/components/News/Admin/ArticleRowActions';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import { CARD, PageHeader, StateBadge } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Edit article — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function EditArticlePage({ params }) {
  await requireAdminPage();
  const id = toId((await params).id);
  if (!id || Number.isNaN(id)) notFound();
  let article;
  let categories;
  try {
    [article, categories] = await Promise.all([getArticle(id), listCategories()]);
  } catch (e) {
    return <DbUnavailable title="Edit article" code={e?.code} />;
  }
  if (!article) notFound();
  if (article.state === 'trash') {
    return (
      <div>
        <Link href="/news/admin/articles?filter=trash" className="text-[13px] font-medium text-[#5b6170]">← Trash</Link>
        <PageHeader title={article.title} />
        <div className={CARD}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[14px]">
              <StateBadge state="trash" /> This article is in Trash and is not on the site. Restore it to edit it.
            </p>
            <ArticleRowActions id={article.id} state="trash" />
          </div>
        </div>
      </div>
    );
  }
  return <ArticleForm initial={article} categories={categories.map((c) => ({ id: c.id, name: c.name }))} />;
}
