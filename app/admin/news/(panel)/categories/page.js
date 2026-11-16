import { requireAdminPage } from '@/lib/news/auth/admin';
import { listCategories } from '@/lib/news/cms/categories';
import CategoryManager from '@/components/News/Admin/CategoryManager';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import { PageHeader } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Categories — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function CategoriesPage() {
  await requireAdminPage();
  let items;
  try {
    items = await listCategories();
  } catch (e) {
    return <DbUnavailable title="Categories" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Categories" description="Sections of ATLAS News, the navigation and their order." />
      <CategoryManager items={items} />
    </div>
  );
}
