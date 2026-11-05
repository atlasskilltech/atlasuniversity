import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePageMetadata, loadIsmePage } from '@/lib/schools/isme/pages/load';

/*
 * /schools/isme/life@atlas-isme/test — reference/schools/isme/life@atlas-isme/test.php, an unlinked
 * Webflow-export draft of the Life@ATLAS ISME page that production still serves: the Life hero and the
 * anchor menu, then an empty <p>, and no footer (its links point at sections the draft never authors —
 * transcribed as authored). The ISME footer is stepped aside for it in ISMEChromeOnly. A real folder
 * because the segment carries a literal `@` (see ../life-at-atlas-is-me-campus-experience).
 */
const PATH = '/schools/isme/life@atlas-isme/test';

export function generateMetadata() {
  return ismePageMetadata(PATH);
}

export default async function Page() {
  const page = await loadIsmePage(PATH);
  if (!page) notFound();
  return <IsmePage page={page} />;
}
