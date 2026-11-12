import Hero from '@/components/Schools/ISDI/About/Hero';
import BlogSection from '@/components/Schools/ISDI/ThoughtLeadership/BlogSection';
import { hero, tabs, cards as fallbackCards } from '@/lib/schools/isdi/thoughtLeadershipsContent';
import { getBlogsBySchool, feedOrThrow } from '@/lib/schools/isdi/blog/api';

/* Re-read the dashboard feed every minute (BLOG_REVALIDATE_S): create / edit / publish / unpublish /
   delete in the dashboard shows here within about a minute. */
export const revalidate = 60;

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
 * The cards are read LIVE from the `atlas-blogs/by-school/isdi` feed (the reference curls the same
 * endpoint); the snapshot in `lib/schools/isdi/thoughtLeadershipsContent.js` is kept only as a
 * fallback. The `type-b-responsive` card is this page's own shape, so `BlogSection` is local rather
 * than the shared `CardA`, and it takes `card.image` as `{ src, alt }`.
 */
export default async function ThoughtLeadershipsPage() {
  const { cards: feed, source } = feedOrThrow(await getBlogsBySchool('isdi'), fallbackCards, 'isdi listing');
  const cards =
    source === 'live'
      ? feed.map((c) => ({ id: c.id, title: c.title, date: c.date, href: c.href, image: { src: c.image, alt: c.alt } }))
      : feed;
  return (
    <main id="isdi-thought-leaderships" className="font-poppins-isdi text-base text-[#333]">
      <Hero data={hero} />
      <BlogSection tabs={tabs} cards={cards} source={source} />
    </main>
  );
}
