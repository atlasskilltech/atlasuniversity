import { notFound } from 'next/navigation';
import IsmePage from '@/components/Schools/ISME/Sections/IsmePage';
import { ismePageMetadata, ismePagePaths, loadIsmePage } from '@/lib/schools/isme/pages/load';
import { withIsmeKeyDates } from '@/lib/keydates/store';

/*
 * The ISME one-off pages that have no folder of their own (Admissions, …), each rendered from the
 * data the page extractor took out of its production markup (lib/schools/isme/pages). Static and
 * dynamic sibling routes — programs/**, events/[slug], thought-leaderships/[slug] — are more
 * specific and keep precedence; this route serves only the paths listed below, and 404s the rest.
 */
const BASE = '/schools/isme/';
const OWN_ROUTES = ['events/', 'thought-leaderships/'];

/* Paths not in generateStaticParams are not 404'd up front (`dynamicParams = false`) but by `notFound()`
   below, because Next answers a `dynamicParams = false` route's on-demand revalidation (an admin Key
   Dates save) with NoFallbackError — every revalidated page here turned into a 404. Unknown paths still
   404: loadIsmePage() returns null for anything outside lib/schools/isme/pages, and the more specific
   sibling routes (events/, thought-leaderships/, life@atlas-isme/, programs/postgraduate/[slug]) keep
   precedence over this catch-all. */
export const dynamicParams = true;

/* the Admissions and Scholarships pages' key dates come from the admin (/admin/keydates): re-checked at
   most every 60 s (lib/keydates/store); every other page here is unaffected by the value */
export const revalidate = 60;

export function generateStaticParams() {
  return ismePagePaths(BASE)
    .map((p) => p.slice(BASE.length))
    .filter((p) => !OWN_ROUTES.some((r) => p.startsWith(r)))
    /* a path with a literal `@` has a folder of its own (life@atlas-isme/…), and so does the PG overview,
       which the sibling `programs/postgraduate/[slug]` route would otherwise claim */
    .filter((p) => !p.includes('@') && p !== 'programs/postgraduate/postgraduate-programs')
    .map((p) => ({ slug: p.split('/') }));
}

const pathOf = async (params) => BASE + (await params).slug.map(decodeURIComponent).join('/');

export async function generateMetadata({ params }) {
  return ismePageMetadata(await pathOf(params));
}

export default async function Page({ params }) {
  const page = await loadIsmePage(await pathOf(params));
  if (!page) notFound();
  return <IsmePage page={await withIsmeKeyDates(page)} />;
}
