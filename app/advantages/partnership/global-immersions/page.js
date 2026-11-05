import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AboutStory from '@/components/Partnership/AboutStory';
import ExperienceTabs from '@/components/Partnership/ExperienceTabs';
import ReelsCarousel from '@/components/Partnership/ReelsCarousel';
import PartnershipTestimonials from '@/components/Partnership/PartnershipTestimonials';
import VideoBlock from '@/components/Partnership/VideoBlock';
import {
  hero,
  stats,
  story,
  experienceHeading,
  experienceTabs,
  reelsHeading,
  reels,
  atlasSection,
  testimonialsLead,
  testimonials,
} from '@/lib/partnership/globalImmersions';

/* ref global-immersions.php `$title` / `$description` — the generic "ATLAS Advantage" pair. */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/global-immersions' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /advantages/partnership/global-immersions — partnership page 3/6. A Tailwind-CDN hybrid:
 * InnerPageHero (title + "Explore Engage and Evolve your Horizons" lead, no buttons) + StatBand
 * (4 cards) + About story + a 16-city "Global Experiences" pill-tab set of elective cards + a 12
 * "reels" video grid/carousel + a "Global Immersions at ATLAS" YouTube section + 6 student video
 * testimonials. `.container` is Webflow's under the Tailwind CDN's container ladder (TW_CONTAINER).
 */
export default function GlobalImmersionsPage() {
  const heroData = {
    title: hero.title,
    text: hero.text,
    image: { src: hero.src, srcSet: hero.srcSet, sizes: '(max-width: 1366px) 100vw, 1366px', alt: hero.alt },
  };
  return (
    <>
      <InnerPageHero hero={heroData} />
      {/* ref `.top-cards-wrapper` — the partnership pages put the FIGURE (`.sm-text-isme`, 36px via
          the page's own <style>) first and a centred 20px `.large-text` caption second: StatBand's
          `figure` variant, whose first slot is `label` */}
      <StatBand data={stats.map((s) => ({ ...s, label: s.value, value: s.label }))} variant="figure" />
      <AboutStory story={story} />

      <ExperienceTabs heading={experienceHeading} tabs={experienceTabs} />

      <ReelsCarousel heading={reelsHeading} reels={reels} />

      {/* ref §3 "Global Immersions at ATLAS" (shared VideoBlock) */}
      <VideoBlock heading={atlasSection.heading} text={atlasSection.lead} youtubeId={atlasSection.youtubeId} />

      <PartnershipTestimonials heading="Student Testimonials" lead={testimonialsLead} testimonials={testimonials} variant="carousel" />
    </>
  );
}
