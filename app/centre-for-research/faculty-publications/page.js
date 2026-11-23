import InnerPageHero from '@/components/ui/InnerPageHero';
import ResearchPapers from '@/components/Success/ResearchPapers';
import ThoughtLeadership from '@/components/Home/ThoughtLeadership';
import { publicationsPage } from '@/lib/centreForResearchContent';

/* Thought Leadership reads the dashboard blog feed live, cached 60s — the homepage's cadence */
export const revalidate = 60;

const TITLE = 'Faculty Publications – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = publicationsPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/faculty-publications' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/faculty-publications — the "Faculty Publications" card of /centre-for-research's
 * "Research and Innovation". Built only from sections the site already has, both unchanged:
 * /success-stories-atlas's "Research Papers" and the homepage's Thought Leadership feed.
 */
export default function CentreForResearchPublicationsPage() {
  return (
    <>
      <InnerPageHero hero={publicationsPage.hero} />
      <ResearchPapers />
      <ThoughtLeadership />
    </>
  );
}
