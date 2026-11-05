import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePageMetadata, loadIsmePage } from '@/lib/schools/isme/pages/load';

/*
 * /schools/isme/life@atlas-isme/life-at-atlas-is-me-campus-experience — rendered from the extracted
 * page data exactly as the `[...slug]` catch-all renders the other one-off pages. It needs a folder of
 * its own because the segment carries a literal `@`: a statically generated catch-all param holding
 * `@` is matched only by its percent-encoded spelling, so the link the ISME menu actually sends would
 * 404. A real folder serves the literal form, as /schools/isdi/life@atlas-isdi already does.
 */
const PATH = '/schools/isme/life@atlas-isme/life-at-atlas-is-me-campus-experience';

export function generateMetadata() {
  return ismePageMetadata(PATH);
}

export default async function Page() {
  const page = await loadIsmePage(PATH);
  if (!page) notFound();
  return <IsmePage page={page} />;
}
