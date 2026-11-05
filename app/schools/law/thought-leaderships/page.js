import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero } from '@/lib/thoughtLeadershipsContent';
import { tabs, cards } from '@/lib/schools/law/thoughtLeadershipsContent';

export const metadata = {
  title: 'LAW - Thought Leaderships',
  description: 'Explore law programs, legal careers, faculty expertise, curriculum, opportunities and learning for future lawyers.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/law/thought-leaderships/' },
};

/**
 * /schools/law/thought-leaderships — reference/law/thought-leaderships/index.php. The ATLAS listing's
 * two blocks (`TLHero` — the same publication photograph, byte-identical — and `BlogSection`) with the
 * LAW tab active in the Law orange #CB5827, whose active and hovered tabs carry white text (the page's
 * own <style>). The cards are a snapshot of the UAT feed — lib/schools/law/thoughtLeadershipsContent.js.
 */
export default function LawThoughtLeadershipsPage() {
  return (
    <>
      <div data-block="hero">
        <TLHero hero={hero} />
      </div>
      <div data-block="blog-section">
        <BlogSection tabs={tabs} cards={cards} accent="#CB5827" accentText="#fff" />
      </div>
    </>
  );
}
