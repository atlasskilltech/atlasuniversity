import { notFound } from 'next/navigation';
import CategoryListing from '@/components/News/Public/CategoryListing';
import { categoryUrl, getCategoryPage, getNavigation, listCategoryPaging } from '@/lib/news/public/repository';
import { categoryMetadata } from '@/lib/news/public/seo';

export async function generateStaticParams() {
  return (await listCategoryPaging()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getCategoryPage(slug, 1);
  return data ? categoryMetadata(data.category, 1, categoryUrl(slug)) : {};
}

export default async function NewsCategoryPage({ params }) {
  const { slug } = await params;
  const [data, nav] = await Promise.all([getCategoryPage(slug, 1), getNavigation()]);
  if (!data || data.outOfRange) notFound();
  return <CategoryListing data={data} nav={nav} />;
}
