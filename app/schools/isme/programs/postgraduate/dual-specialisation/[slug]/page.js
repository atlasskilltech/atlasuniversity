import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaKeys, bbaMetadata } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/postgraduate/dual-specialisation/<slug>.php — the MBA pages on the BBA
 * template's chassis (hero, figures, "Choose Your Specialisation", curriculum, shared lower blocks),
 * rendered from the data extracted from their production markup (see lib/schools/isme/mba).
 */
const FAMILY = 'dual-specialisation';

export const dynamicParams = false;

export function generateStaticParams() {
  return bbaKeys(FAMILY, 'mba').map((k) => ({ slug: k.slice(FAMILY.length + 1) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return bbaMetadata(`${FAMILY}/${slug}`, 'mba');
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BbaPage pageKey={`${FAMILY}/${slug}`} ns="mba" />;
}
