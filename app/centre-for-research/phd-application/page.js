import InnerPageHero from '@/components/ui/InnerPageHero';
import DropdownFaq from '@/components/ui/DropdownFaq';
import { hero, sections } from '@/lib/phdApplicationContent';

const TITLE = 'PhD Applications – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION =
  'PhD applications at ATLAS SkillTech University: programmes, admission procedure, selection process, fees, eligibility and downloads.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/phd-application' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/phd-application — the "PhD Application" card of /centre-for-research's "Research
 * and Innovation", from the content of production's /phdapplications page (supplied by ATLAS): the
 * `.main-cover-section-isme` hero (InnerPageHero) and a Webflow-dropdown accordion of 13 sections
 * (DropdownFaq, rich answers, no heading — the page comments its heading out — and no search panel).
 */
export default function CentreForResearchPhdPage() {
  return (
    <>
      <InnerPageHero hero={hero} />
      <DropdownFaq data={sections} search={null} />
    </>
  );
}
