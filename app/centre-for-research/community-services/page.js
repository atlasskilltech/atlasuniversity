import InnerPageHero from '@/components/ui/InnerPageHero';
import ServiceLearning from '@/components/Life/ServiceLearning';
import ViksitSlider from '@/components/IndustryPartnership/ViksitSlider';
import { communityPage } from '@/lib/centreForResearchContent';

const TITLE = 'Community Services – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = communityPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/community-services' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/community-services — the "Community Services" card of /centre-for-research's
 * "Research and Innovation". Built only from sections the site already has, both unchanged:
 * /life-at-atlas's "Service learning and SSR" and /atlas-industry-partnership's partnerships with
 * government bodies and NGOs.
 */
export default function CentreForResearchCommunityPage() {
  return (
    <>
      <InnerPageHero hero={communityPage.hero} />
      <ServiceLearning />
      <ViksitSlider />
    </>
  );
}
