import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero } from '@/lib/thoughtLeadershipsContent';
import { tabs, cards } from '@/lib/schools/ugdx/thoughtLeadershipsContent';

export const metadata = {
  title: 'uGDX - Thought Leaderships',
  description: 'Ready for tech learning? Explore AI, ML, CS, robotics, eligibility, course structure and admissions process.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/ugdx/thought-leaderships/' },
};

/**
 * /schools/ugdx/thought-leaderships — reference/ugdx/thought-leaderships/index.php. The ATLAS listing's
 * two blocks (`TLHero` — the same publication photograph, byte-identical — and `BlogSection`) with the
 * uGDX tab active in the uGDX red #EB1F3C, whose active and hovered tabs carry white text (the page's
 * own <style>). The cards are a snapshot of the UAT feed — lib/schools/ugdx/thoughtLeadershipsContent.js.
 */
export default function UgdxThoughtLeadershipsPage() {
  return (
    <>
      <div data-block="hero">
        <TLHero hero={hero} />
      </div>
      <div data-block="blog-section">
        <BlogSection tabs={tabs} cards={cards} accent="#EB1F3C" accentText="#fff" />
      </div>
    </>
  );
}
