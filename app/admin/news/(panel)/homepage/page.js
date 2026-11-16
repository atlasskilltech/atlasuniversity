import { requireAdminPage } from '@/lib/news/auth/admin';
import { searchPlaceableArticles } from '@/lib/news/cms/articles';
import { getHomepageCuration } from '@/lib/news/cms/homepage';
import { getHomepageSections } from '@/lib/news/cms/homepageSections';
import { listCategories } from '@/lib/news/cms/categories';
import HomepageSectionsManager from '@/components/News/Admin/HomepageSectionsManager';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import HomepageManager from '@/components/News/Admin/HomepageManager';
import { PageHeader } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Homepage — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function HomepagePage() {
  await requireAdminPage();
  let initial;
  let sections;
  let categories;
  try {
    const [curation, candidates, hs, cats] = await Promise.all([getHomepageCuration(), searchPlaceableArticles('', 20), getHomepageSections(), listCategories()]);
    initial = { ...curation, candidates };
    sections = hs;
    categories = cats.map((c) => ({ id: c.id, name: c.name, parentId: c.parentId, menuOrder: c.menuOrder }));
  } catch (e) {
    return <DbUnavailable title="Homepage" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Homepage" description="Choose the stories for the hero, Featured and Editor's Picks. Latest fills itself; the sections below choose their stories from their categories." />
      <HomepageManager initial={initial} />
      <HomepageSectionsManager initial={sections} categories={categories} />
    </div>
  );
}
