import InnerPageHero from '@/components/ui/InnerPageHero';
import WorldMap from '@/components/International/WorldMap';
import GlobalPartnerships from '@/components/International/GlobalPartnerships';
import { internationalPage } from '@/lib/centreForResearchContent';

const TITLE = 'International Collaborations – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = internationalPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/international-collaborations' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/international-collaborations — the "International Collaborations" card of
 * /centre-for-research's "Research and Innovation". Built only from sections the site already has:
 * /advantages/atlas-internationalisation's world map and "Our Global Partnerships", both unchanged.
 */
export default function CentreForResearchInternationalPage() {
  return (
    <>
      <InnerPageHero hero={internationalPage.hero} />
      <WorldMap />
      <GlobalPartnerships />
    </>
  );
}
