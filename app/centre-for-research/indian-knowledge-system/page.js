import InnerPageHero from '@/components/ui/InnerPageHero';
import DropdownFaq from '@/components/ui/DropdownFaq';
import { TextSection, PhotoRow } from '@/components/CentreForResearch/Blocks';
import { iksPage } from '@/lib/centreForResearchContent';
import { intro, atAtlas, benefits, activitiesIntro, activities } from '@/lib/centreForResearchIksContent';

const TITLE = 'Indian Knowledge System – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = iksPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/indian-knowledge-system' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/indian-knowledge-system — the "Indian Knowledge System" card of
 * /centre-for-research's "Research and Innovation", from the content ATLAS supplied on 2026-11-23
 * (the old WordPress IKS page). Laid out in the site's own pieces: the hero, a text section, and the
 * Webflow-dropdown accordion the PhD page uses, three times (each with its own id).
 */
export default function CentreForResearchIksPage() {
  return (
    <>
      <InnerPageHero hero={iksPage.hero} />
      <TextSection heading={intro.heading} lead={intro.lead} paragraphs={intro.paragraphs} columns={3} />
      <DropdownFaq id="iks-at-atlas" data={atAtlas} search={null} />
      <DropdownFaq id="iks-benefits" data={benefits} search={null} />
      <TextSection heading={activitiesIntro.heading} paragraphs={activitiesIntro.paragraphs} columns={1}>
        <PhotoRow photos={activitiesIntro.photos} />
      </TextSection>
      <DropdownFaq id="iks-activities" data={activities} search={null} />
    </>
  );
}
