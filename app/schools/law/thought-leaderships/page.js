import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero } from '@/lib/thoughtLeadershipsContent';
import { tabs, cards as fallbackCards } from '@/lib/schools/law/thoughtLeadershipsContent';
import { getBlogsBySchool, feedOrThrow } from '@/lib/schools/isdi/blog/api';

export const metadata = {
  title: 'LAW - Thought Leaderships',
  description: 'Explore law programs, legal careers, faculty expertise, curriculum, opportunities and learning for future lawyers.',
  alternates: { canonical: 'https://atlasuniversity.edu.in/schools/law/thought-leaderships/' },
};

/* Re-read the dashboard feed every minute (BLOG_REVALIDATE_S): create / edit / publish / unpublish /
   delete in the dashboard shows here within about a minute. */
export const revalidate = 60;

/**
 * /schools/law/thought-leaderships — reference/law/thought-leaderships/index.php. The ATLAS listing's
 * two blocks (`TLHero` — the same publication photograph, byte-identical — and `BlogSection`) with the
 * LAW tab active in the Law orange #CB5827, whose active and hovered tabs carry white text (the page's
 * own <style>). The cards are read LIVE from `atlas-blogs/by-school/law`; the snapshot in
 * lib/schools/law/thoughtLeadershipsContent.js is kept only as a fallback.
 */
export default async function LawThoughtLeadershipsPage() {
  const { cards, source } = feedOrThrow(await getBlogsBySchool('law'), fallbackCards, 'law listing');
  return (
    <>
      <div data-block="hero">
        <TLHero hero={hero} />
      </div>
      <div data-block="blog-section">
        <BlogSection tabs={tabs} cards={cards} source={source} accent="#CB5827" accentText="#fff" />
      </div>
    </>
  );
}
