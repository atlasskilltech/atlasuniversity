import TLHero from '@/components/ThoughtLeadership/TLHero';
import BlogSection from '@/components/ThoughtLeadership/BlogSection';
import { hero, tabs, cards } from '@/lib/thoughtLeadershipsContent';

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
 * active, teal #6EC1C2) over a `.common-flex-16-wrap` grid of 35 blog cards. The cards are a
 * per-request snapshot of the UAT `atlas-blogs/by-school/atlas` feed (see
 * lib/thoughtLeadershipsContent.js), each linking to the live `/atlas-blog/{slug}` detail route.
 */
export default function ThoughtLeadershipsPage() {
  return (
    <>
      <TLHero hero={hero} />
      <BlogSection tabs={tabs} cards={cards} />
    </>
  );
}
