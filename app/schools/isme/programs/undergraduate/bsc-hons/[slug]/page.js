import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaKeys, bbaMetadata } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/undergraduate/bsc-hons/<slug>.php — B.Sc (Hons.) Finance and
 * B.Sc. in Economics and Data Analytics. The BBA single-programme template (hero, figures, tabs +
 * curriculum, Why, execution, voices, guide, eligibility, banner, search, FAQ), so they render from
 * the same extracted data (lib/schools/isme/bba). B.Sc Finance repeats two block kinds — a second
 * testimonial carousel ("Hear from CFA leadership") and a second execution carousel ("Why ATLAS is
 * the Right Choice") — which `BbaPage` renders in the page's own order.
 */
const FAMILY = 'bsc-hons';

export const dynamicParams = false;

export function generateStaticParams() {
  return bbaKeys(FAMILY).map((k) => ({ slug: k.slice(FAMILY.length + 1) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return bbaMetadata(`${FAMILY}/${slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BbaPage pageKey={`${FAMILY}/${slug}`} />;
}
