import InnerPageHero from '@/components/ui/InnerPageHero';
import Patents from '@/components/Success/Patents';
import PortCardSection from '@/components/Entrepreneurship/PortCardSection';
import { entrepreneurshipContent } from '@/lib/entrepreneurshipContent';
import { CardSection } from '@/components/CentreForResearch/Blocks';
import { patentsPage, patentHighlights } from '@/lib/centreForResearchContent';

const TITLE = 'Patents & Innovations – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = patentsPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/patents-and-innovations' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/patents-and-innovations — the "Patents & Innovations" card of
 * /centre-for-research's "Research and Innovation". Built only from sections the site already has:
 * /success-stories-atlas's "Patents & Copyrights" and /advantages/atlas-enterprenurship's
 * "8 Steps of IPR Enablement Flow", both rendered unchanged.
 */
export default function CentreForResearchPatentsPage() {
  return (
    <>
      <InnerPageHero hero={patentsPage.hero} />
      <Patents />
      <CardSection heading={patentHighlights.heading} cards={patentHighlights.cards} />
      <PortCardSection data={entrepreneurshipContent.ipr} lead="mrgbtm32" />
    </>
  );
}
