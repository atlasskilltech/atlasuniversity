import { requireAdminPage } from '@/lib/news/auth/admin';
import { listCategories } from '@/lib/news/cms/categories';
import ArticleForm from '@/components/News/Admin/ArticleForm';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'New article — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function NewArticlePage() {
  await requireAdminPage();
  let categories;
  try {
    categories = await listCategories();
  } catch (e) {
    return <DbUnavailable title="New article" code={e?.code} />;
  }
  return <ArticleForm initial={null} categories={categories.map((c) => ({ id: c.id, name: c.name }))} />;
}
