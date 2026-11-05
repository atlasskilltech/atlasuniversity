import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePageMetadata, loadIsmePage } from '@/lib/schools/isme/pages/load';

/*
 * /schools/isme/programs/postgraduate/postgraduate-programs — the PG overview, rendered from the extracted
 * page data like the `[...slug]` catch-all's pages. It needs a folder of its own because the sibling
 * `programs/postgraduate/[slug]` (the PG programme pages) is more specific than the catch-all and would
 * otherwise claim this path and 404 it.
 */
const PATH = '/schools/isme/programs/postgraduate/postgraduate-programs';

export function generateMetadata() {
  return ismePageMetadata(PATH);
}

export default async function Page() {
  const page = await loadIsmePage(PATH);
  if (!page) notFound();
  return <IsmePage page={page} />;
}
