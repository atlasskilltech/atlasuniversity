import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePagePaths, ismePageMetadata, loadIsmePage } from '@/lib/schools/isme/pages/load';

/*
 * reference/schools/isme/thought-leaderships/*.php — the ISME articles (header image, breadcrumbs,
 * title, jump list, rich text, tags), rendered from the data extracted from each article's production
 * markup (lib/schools/isme/pages). The listing (thought-leaderships/index.php) is its own route.
 */
const PREFIX = '/schools/isme/thought-leaderships/';

export const dynamicParams = false;

export function generateStaticParams() {
  return ismePagePaths(PREFIX).map((p) => ({ slug: p.slice(PREFIX.length) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return ismePageMetadata(PREFIX + slug);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const page = await loadIsmePage(PREFIX + slug);
  if (!page) notFound();
  return <IsmePage page={page} />;
}
