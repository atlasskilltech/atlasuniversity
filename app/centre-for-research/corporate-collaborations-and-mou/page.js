import InnerPageHero from '@/components/ui/InnerPageHero';
import Relations from '@/components/IndustryPartnership/Relations';
import Scope from '@/components/IndustryPartnership/Scope';
import RecruitmentPartners from '@/components/Industry/RecruitmentPartners';
import { recruiters } from '@/lib/industryPartnershipContent';
import { corporatePage } from '@/lib/centreForResearchContent';

const TITLE = 'Corporate Collaborations & MoU – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = corporatePage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/corporate-collaborations-and-mou' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/corporate-collaborations-and-mou — the "Corporate Collaborations & MoU" card of
 * /centre-for-research's "Research and Innovation". Built only from /atlas-industry-partnership's own
 * sections, all unchanged: "Industry Partnerships and MoU's", "Scope of Partnerships" and
 * "Our Recruitment Partners".
 */
export default function CentreForResearchCorporatePage() {
  return (
    <>
      <InnerPageHero hero={corporatePage.hero} />
      <Relations />
      <Scope />
      <RecruitmentPartners data={recruiters} />
    </>
  );
}
