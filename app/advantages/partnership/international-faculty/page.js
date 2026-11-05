import InnerPageHero from '@/components/ui/InnerPageHero';
import StatBand from '@/components/ui/StatBand';
import AboutStory from '@/components/Partnership/AboutStory';
import FacultyGrid from '@/components/Partnership/FacultyGrid';
import VideoFeature from '@/components/Partnership/VideoFeature';
import NewsFeature from '@/components/Partnership/NewsFeature';
import PartnershipTestimonials from '@/components/Partnership/PartnershipTestimonials';
import {
  hero,
  stats,
  story,
  facultyHeading,
  faculty,
  facultyWeek,
  masterClasses,
  news,
  testimonialsLead,
  testimonials,
} from '@/lib/partnership/internationalFaculty';

/* ref international-faculty.php `$title` / `$description` — the generic "ATLAS Advantage" pair the
   partnership pages share (the source file's dash is mis-encoded; the intended en dash is used). */
const TITLE = 'ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: 'https://atlasuniversity.edu.in/advantages/partnership/international-faculty' },
  openGraph: { siteName: 'ATLAS SKILLTECH UNIVERSITY', title: TITLE, url: 'https://atlasuniversity.edu.in/', type: 'website', description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

/**
 * /advantages/partnership/international-faculty — partnership page 4/6, a Tailwind-CDN hybrid in
 * production's block order: InnerPageHero (+ lead) · StatBand (`figure`) · About story · "The World
 * Comes to ATLAS" (24 faculty cards) · "International Faculty Week" (YouTube) · the Mint news
 * feature · "Faculty Testimonials" (the six /global-immersions student videos, uncapped, no loop) ·
 * "International Faculty Master Classes" (YouTube).
 */
export default function InternationalFacultyPage() {
  const heroData = {
    title: hero.title,
    text: hero.text,
    image: { src: hero.src, srcSet: hero.srcSet, sizes: '(max-width: 1366px) 100vw, 1366px', alt: hero.alt },
  };
  return (
    <>
      <InnerPageHero hero={heroData} />
      <StatBand data={stats} variant="figure" />
      <AboutStory story={story} />
      <FacultyGrid heading={facultyHeading} faculty={faculty} />
      <VideoFeature {...facultyWeek} />
      <NewsFeature news={news} />
      <PartnershipTestimonials
        heading="Faculty Testimonials"
        lead={testimonialsLead}
        testimonials={testimonials}
        variant="carouselFull"
        loop={false}
      />
      <VideoFeature {...masterClasses} />
    </>
  );
}
