import BbaPage from '@/components/Schools/ISME/Bba/BbaPage';
import { bbaMetadata, bbaRootKeys } from '@/lib/schools/isme/bba/load';

/*
 * reference/schools/isme/programs/postgraduate/<slug>.php — the four standalone postgraduate
 * programme pages (MBA – Financial Planning & Applied Finance, MBA in FinTech, MBA in Investment
 * Banking, PG Diploma in AI-Driven Digital Branding & Advertising). Same programme-detail template
 * as the MBA dual / hyper-specialisation pages, so they render from the same extracted data
 * (lib/schools/isme/mba). Sibling static folders (dual-specialisation/, mba-hyper/, …) win over
 * this dynamic segment.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return bbaRootKeys('mba').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return bbaMetadata(slug, 'mba');
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <BbaPage pageKey={slug} ns="mba" />;
}
