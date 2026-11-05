import Hero from '@/components/Schools/ISDI/About/Hero';
import BlogSection from '@/components/Schools/ISDI/ThoughtLeadership/BlogSection';
import { hero, tabs, cards } from '@/lib/schools/isdi/thoughtLeadershipsContent';

/*
 * ref reference/schools/isdi/thought-leaderships/index.php `$title` / `$description`,
 * transcribed as authored. Served at the trailing-slash url on production (a directory
 * with an index.php); the menu's "About Us > Thought Leadership" links the slashless form.
 */
const TITLE = 'ISDI - Thought Leaderships';
const DESCRIPTION = 'Get in touch with Atlas Skilltech.';
const URL = 'https://atlasuniversity.edu.in/schools/isdi/thought-leaderships';

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
 * /schools/isdi/thought-leaderships — the ISDI header's "About Us > Thought Leadership".
 * Two blocks: a 658px image hero (`About/Hero`, image form) and `#blog-section` — a
 * five-school tab strip (ISDI active) over a `.common-flex-16-wrap` grid of 44 blog cards.
 *
 * The cards are a per-request snapshot of the UAT `atlas-blogs/by-school/isdi` feed,
 * transcribed from the production render into `lib/schools/isdi/thoughtLeadershipsContent.js`
 * (the same treatment the ATLAS homepage Thought Leadership section gets). The `type-b-responsive`
 * card is this page's own shape, so `BlogSection` is local rather than the shared `CardA`.
 */
export default function ThoughtLeadershipsPage() {
  return (
    <main id="isdi-thought-leaderships" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={hero} />
      <BlogSection tabs={tabs} cards={cards} />
    </main>
  );
}
