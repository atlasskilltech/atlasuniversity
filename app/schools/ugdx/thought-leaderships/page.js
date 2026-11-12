import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero } from '@/lib/thoughtLeadershipsContent';
import { tabs, cards as fallbackCards } from '@/lib/schools/ugdx/thoughtLeadershipsContent';
import { getBlogsBySchool, feedOrThrow } from '@/lib/schools/isdi/blog/api';

export const metadata = {
  title: 'uGDX - Thought Leaderships',
  description: 'Ready for tech learning? Explore AI, ML, CS, robotics, eligibility, course structure and admissions process.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/ugdx/thought-leaderships/' },
};

/* Re-read the dashboard feed every minute (BLOG_REVALIDATE_S): create / edit / publish / unpublish /
   delete in the dashboard shows here within about a minute. */
export const revalidate = 60;

/**
 * /schools/ugdx/thought-leaderships — reference/ugdx/thought-leaderships/index.php. The ATLAS listing's
 * two blocks (`TLHero` — the same publication photograph, byte-identical — and `BlogSection`) with the
 * uGDX tab active in the uGDX red #EB1F3C, whose active and hovered tabs carry white text (the page's
 * own <style>). The cards are read LIVE from `atlas-blogs/by-school/ugdx`; the snapshot in
 * lib/schools/ugdx/thoughtLeadershipsContent.js is kept only as a fallback.
 */
export default async function UgdxThoughtLeadershipsPage() {
  const { cards, source } = feedOrThrow(await getBlogsBySchool('ugdx'), fallbackCards, 'ugdx listing');
  return (
    <>
      <div data-block="hero">
        <TLHero hero={hero} />
      </div>
      <div data-block="blog-section">
        <BlogSection tabs={tabs} cards={cards} source={source} accent="#EB1F3C" accentText="#fff" />
      </div>
    </>
  );
}
