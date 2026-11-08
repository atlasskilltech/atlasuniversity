import { requireAdminPage } from '@/lib/news/auth/admin';
import { searchPlaceableArticles } from '@/lib/news/cms/articles';
import { getHomepageCuration } from '@/lib/news/cms/homepage';
import DbUnavailable from '@/components/News/Admin/DbUnavailable';
import HomepageManager from '@/components/News/Admin/HomepageManager';
import { PageHeader } from '@/components/News/Admin/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Homepage — ATLAS News Admin', robots: { index: false, follow: false } };

export default async function HomepagePage() {
  await requireAdminPage();
  let initial;
  try {
    const [curation, candidates] = await Promise.all([getHomepageCuration(), searchPlaceableArticles('', 20)]);
    initial = { ...curation, candidates };
  } catch (e) {
    return <DbUnavailable title="Homepage" code={e?.code} />;
  }
  return (
    <div>
      <PageHeader title="Homepage" description="Choose the stories for the hero, Featured and Editor's Picks. Latest and the category sections fill themselves." />
      <HomepageManager initial={initial} />
    </div>
  );
}
