import InnerPageHero from '@/components/ui/InnerPageHero';
import Startups from '@/components/Success/Startups';
import StartupsFounded from '@/components/Success/StartupsFounded';
import Backing from '@/components/Entrepreneurship/Backing';
import Founders from '@/components/Entrepreneurship/Founders';
import { startupPage } from '@/lib/centreForResearchContent';

const TITLE = 'Student Startup – Centre for Research | ATLAS SkillTech University';
const DESCRIPTION = startupPage.hero.text;

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: 'https://atlasuniversity.edu.in/centre-for-research/student-startup' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /centre-for-research/student-startup — the "Student Startup" card of /centre-for-research's "Research
 * and Innovation". Built only from sections the site already has, all unchanged:
 * /success-stories-atlas's "Startups" and "Startups founded by ATLAS ISME Alumni", and
 * /advantages/atlas-enterprenurship's "All the backing you need" and "From Campus to Company".
 */
export default function CentreForResearchStartupPage() {
  return (
    <>
      <InnerPageHero hero={startupPage.hero} />
      <Startups />
      <StartupsFounded />
      <Backing />
      <Founders />
    </>
  );
}
