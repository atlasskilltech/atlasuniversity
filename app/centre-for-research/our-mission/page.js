import InnerPageHero from '@/components/ui/InnerPageHero';
import AboutStory from '@/components/Partnership/AboutStory';
import Objectives from '@/components/CentreForResearch/Objectives';
import { about, missionPage } from '@/lib/centreForResearchContent';

const TITLE = 'Our Mission – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = missionPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/our-mission' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/our-mission — the "Our Mission" card of /centre-for-research's "Research and
 * Innovation" section. No reference page exists for it; it is composed only from content and
 * components /centre-for-research already has: the hero (its photograph, with the card's mission
 * statement as the lead), "About Center for research" and "Our Objectives".
 */
export default function CentreForResearchMissionPage() {
  return (
    <>
      <InnerPageHero hero={missionPage.hero} />

      <AboutStory
        story={{ heading: about.heading, text: about.text, image: about.image }}
        container="webflow"
        spacer={false}
        headingMargin={32}
        photoClip
      />

      <Objectives />
    </>
  );
}
