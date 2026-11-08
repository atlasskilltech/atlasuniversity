import { notFound, permanentRedirect } from 'next/navigation';
import CategoryListing from '@/components/News/Public/CategoryListing';
import { categoryUrl, getCategoryPage, getNavigation, listCategoryPaging } from '@/lib/news/public/repository';
import { categoryMetadata } from '@/lib/news/public/seo';

/* Pages 2..n of a category. Page 1 lives at /news/category/[slug]; /page/1 redirects there. */
export async function generateStaticParams() {
  const paging = await listCategoryPaging();
  return paging.flatMap(({ slug, totalPages }) => Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ slug, page: String(i + 2) })));
}

const parsePage = (raw) => (/^[1-9]\d{0,3}$/.test(raw) ? Number(raw) : null);

export async function generateMetadata({ params }) {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page) return {};
  const data = await getCategoryPage(slug, page);
  return data && !data.outOfRange ? categoryMetadata(data.category, page, categoryUrl(slug, page)) : {};
}

export default async function NewsCategoryPagedPage({ params }) {
  const { slug, page: raw } = await params;
  const page = parsePage(raw);
  if (!page) notFound();
  if (page === 1) permanentRedirect(categoryUrl(slug));
  const [data, nav] = await Promise.all([getCategoryPage(slug, page), getNavigation()]);
  if (!data || data.outOfRange) notFound();
  return <CategoryListing data={data} nav={nav} />;
}
