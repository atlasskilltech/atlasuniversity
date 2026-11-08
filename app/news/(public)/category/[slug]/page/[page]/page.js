import { notFound, permanentRedirect } from 'next/navigation';
import CategoryListing from '@/components/News/Public/CategoryListing';
import { categoryUrl, getCategoryPage, getIndexingEnabled, getNavigation } from '@/lib/news/public/repository';
import { rememberGood } from '@/lib/news/public/health';
import { categoryMetadata, NOINDEX } from '@/lib/news/public/seo';

/* Pages 2..n of a category. Page 1 lives at /news/category/[slug]; /page/1 redirects there. */
export const dynamic = 'force-dynamic';

const parsePage = (raw) => (/^[1-9]\d{0,3}$/.test(raw) ? Number(raw) : null);

export async function generateMetadata({ params }) {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page) return { robots: NOINDEX };
  try {
    const [data, indexing] = await Promise.all([getCategoryPage(slug, page), getIndexingEnabled()]);
    return data && !data.outOfRange ? categoryMetadata(data.category, page, categoryUrl(slug, page), indexing) : { robots: NOINDEX };
  } catch {
    return { robots: NOINDEX };
  }
}

export default async function NewsCategoryPagedPage({ params }) {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page) notFound();
  if (page === 1) permanentRedirect(categoryUrl(slug));
  const [data, nav] = await Promise.all([getCategoryPage(slug, page), getNavigation()]);
  if (!data || data.outOfRange) notFound();
  rememberGood(categoryUrl(slug, page)); /* last-known-good during a database outage (proxy.js) */
  return <CategoryListing data={data} nav={nav} />;
}
