import { notFound, permanentRedirect } from 'next/navigation';
import CategoryListing from '@/components/News/Public/CategoryListing';
import { categoryUrl, findRedirect, getCategoryPage, getIndexingEnabled, getNavigation } from '@/lib/news/public/repository';
import { rememberGood } from '@/lib/news/public/health';
import { categoryMetadata, NOINDEX } from '@/lib/news/public/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const [data, indexing] = await Promise.all([getCategoryPage(slug, 1), getIndexingEnabled()]);
    return data && !data.outOfRange ? categoryMetadata(data.category, 1, categoryUrl(slug), indexing) : { robots: NOINDEX };
  } catch {
    return { robots: NOINDEX };
  }
}

export default async function NewsCategoryPage({ params }) {
  const { slug } = await params;
  const [data, nav] = await Promise.all([getCategoryPage(slug, 1), getNavigation()]);
  if (!data) {
    /* a renamed category: follow its stored redirect */
    const r = await findRedirect(`/news/category/${slug}`);
    if (r && r.to !== `/news/category/${slug}`) permanentRedirect(r.to);
    notFound();
  }
  if (data.outOfRange) notFound();
  rememberGood(categoryUrl(slug)); /* last-known-good during a database outage (proxy.js) */
  return <CategoryListing data={data} nav={nav} />;
}
