import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AboutStory from '@/components/Partnership/AboutStory';
import PartnersGrid from '@/components/Partnership/PartnersGrid';
import Opportunities from '@/components/Partnership/Opportunities';
import VideoBlock from '@/components/Partnership/VideoBlock';
import PartnershipTestimonials from '@/components/Partnership/PartnershipTestimonials';
import {
  hero,
  stats,
  story,
  partners,
  opportunities,
  testimonials,
  atlasSection,
  testimonialsLead,
} from '@/lib/partnership/globalPathways';

/*
 * ref advantages/partnership/global-pathways.php `$title` / `$description`, transcribed as
 * authored (the generic "ATLAS Advantage" title/description this page carries upstream).
 */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/global-pathways' },
  openGraph: {
    siteName: 'ATLAS SKILLTECH UNIVERSITY',
    title: TITLE,
    url: 'https://atlasuniversity.edu.in/',
    type: 'website',
    description: DESCRIPTION,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /advantages/partnership/global-pathways — first of the six Advantages → Partnership pages.
 * A Tailwind-CDN hybrid: InnerPageHero + StatBand (Webflow chrome) over three Tailwind-authored
 * sections, so the Tailwind sections carry `.lp-bs` to reproduce production's Bootstrap-overridden
 * spacing. Linked from the ATLAS header and from the Advantages internationalisation page.
 */
export default function GlobalPathwaysPage() {
  const heroData = {
    title: hero.title,
    text: hero.text,
    image: {
      src: hero.src,
      srcSet: hero.srcSet,
      sizes: '(max-width: 1366px) 100vw, 1366px',
      alt: hero.alt,
    },
  };
  return (
    <>
      <InnerPageHero hero={heroData} />
      {/* ref `.top-cards-wrapper` — the partnership pages put the FIGURE (`.sm-text-isme`, 36px via
          the page's own <style>) first and a centred 20px `.large-text` caption second: StatBand's
          `figure` variant, whose first slot is `label` */}
      <StatBand data={stats.map((s) => ({ ...s, label: s.value, value: s.label }))} variant="figure" />
      <AboutStory story={story} />
      <PartnersGrid heading="Start your Undergraduate Journey at ATLAS and complete your studies at a Leading Global University" cards={partners} />
      <Opportunities heading="Global Pathway Opportunities" items={opportunities} />
      <PartnershipTestimonials heading="Student Testimonials" lead={testimonialsLead} testimonials={testimonials} />
      {/* ref global-pathways.php:1190 — live on production; missing from the first port */}
      <VideoBlock heading={atlasSection.heading} text={atlasSection.text} youtubeId={atlasSection.youtubeId} />
    </>
  );
}
