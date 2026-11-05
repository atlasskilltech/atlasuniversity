import LifeHero from '@/components/Life/LifeHero';
import StatBand from '@/components/ui/StatBand';
import AboutStory from '@/components/Partnership/AboutStory';
import VideoBlock from '@/components/Partnership/VideoBlock';
import { SummerIntro, SummerVoices } from '@/components/Partnership/Summer';
import { SummerTabs, SummerCoverflow, SummerBeyond } from '@/components/Partnership/SummerClient';
import {
  hero,
  intro,
  stats,
  story,
  experiencesHeading,
  experienceTabs,
  diariesHeading,
  diaries,
  learning,
  beyond,
  voicesHeading,
  voices,
} from '@/lib/partnership/internationalSummerschool';

/* ref international-summerschool.php `$title` / `$description` — the generic "ATLAS Advantage" pair the
   partnership pages share (the source's dash is mis-encoded; the intended en dash is used). */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/international-summerschool' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /advantages/partnership/international-summerschool — partnership page 5/6. Unlike its siblings it is
 * built on the /life-at-atlas sheet and loads no Tailwind CDN, so it keeps Webflow's 1366px container.
 * In production's order: the /life-at-atlas photo-column hero (8 per column, no scrim, no title) · the
 * "International Summer Schools" intro · a 5-card stat band · About · "Global Summer Student
 * Experiences" (4 region tabs of photo walls) · "Summer School Diaries" (7-reel coverflow) ·
 * "International Summer Learning" (YouTube) · "Experiences Beyond Borders" (12 video cards) ·
 * "Global Voices, Student Stories" (5 testimonial cards).
 */
export default function InternationalSummerschoolPage() {
  return (
    <>
      <LifeHero data={hero} />
      <SummerIntro data={intro} />
      <StatBand data={stats} variant="figureSm" />
      <AboutStory story={story} container="webflow" spacer={false} align="stretch" imgAlign="middle" />
      <SummerTabs heading={experiencesHeading} tabs={experienceTabs} />
      <SummerCoverflow heading={diariesHeading} reels={diaries} />
      <VideoBlock heading={learning.heading} text={learning.text} youtubeId={learning.youtubeId} container="webflow" />
      <SummerBeyond heading={beyond.heading} lead={beyond.lead} cards={beyond.cards} />
      <SummerVoices heading={voicesHeading} cards={voices} />
    </>
  );
}
