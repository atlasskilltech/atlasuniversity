import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero, tabs, cards as fallbackCards } from '@/lib/thoughtLeadershipsContent';
import { getBlogsBySchool } from '@/lib/schools/isdi/blog/api';

/* Revalidate so a blog added in the dashboard appears on the listing within ~1 minute. */
export const revalidate = 60;

/*
 * ref reference/thought-leaderships/thought-leaderships/index.php `$title` / `$description`,
 * transcribed as authored. Served at the trailing-slash URL on production (`/thought-leaderships/`),
 * the form the school TL tab strips and the homepage cross-link to.
 */
const TITLE = 'ATLAS - Thought Leaderships';
const DESCRIPTION =
  'Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers.';
const URL = 'https://atlasuniversity.edu.in/thought-leaderships/';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: 'atlas, contact',
  alternates: { canonical: URL },
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
 * /thought-leaderships — the ATLAS main Thought-Leadership listing.
 *
 * Two blocks: a 658px image hero (`TLHero`) and `#blog-section` — a five-school tab strip (ATLAS
 * active, teal #6EC1C2) over a `.common-flex-16-wrap` grid of blog cards. The cards are read LIVE
 * from the `atlas-blogs/by-school/atlas` feed (the reference curls the same endpoint per request),
 * each linking to the live `/atlas-blog/{slug}` detail route. The snapshot in
 * lib/thoughtLeadershipsContent.js is kept only as a fallback if the feed is unreachable.
 */
export default async function ThoughtLeadershipsPage() {
  const live = await getBlogsBySchool('atlas');
  const cards = live.cards.length ? live.cards : fallbackCards;
  return (
    <>
      <TLHero hero={hero} />
      <BlogSection tabs={tabs} cards={cards} />
    </>
  );
}
