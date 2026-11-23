import InnerPageHero from '@/components/ui/InnerPageHero';
import ShapingViksitBharat from '@/components/About/ShapingViksitBharat';
import ViksitSlider from '@/components/IndustryPartnership/ViksitSlider';
import { viksitPage } from '@/lib/centreForResearchContent';

const TITLE = 'VIKSIT Bharat – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = viksitPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/viksit-bharat' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/viksit-bharat — the "VIKSIT Bharat" card of /centre-for-research's "Research and
 * Innovation". Built only from sections the site already has: About Us's "Shaping a Viksit Bharat,
 * Together" and /atlas-industry-partnership's "Driving India's Vision of Viksit Bharat Together".
 */
export default function CentreForResearchViksitPage() {
  return (
    <>
      <InnerPageHero hero={viksitPage.hero} />
      <ShapingViksitBharat />
      <ViksitSlider />
    </>
  );
}
