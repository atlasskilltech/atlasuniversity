import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePagePaths, ismePageMetadata, loadIsmePage } from '@/lib/schools/isme/pages/load';

/*
 * reference/schools/isme/events/*.php — the ISME events pages: a photographic hero, banded
 * event sections (galleries, sliders, videos) and the "Explore by Experience" cards, rendered from
 * the data extracted from each page's production markup (lib/schools/isme/pages).
 */
const PREFIX = '/schools/isme/events/';

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
