import Hero from '@/components/Schools/ISDI/About/Hero';
import BlogSection from '@/components/Schools/ISDI/ThoughtLeadership/BlogSection';
import { hero, tabs, cards as fallbackCards } from '@/lib/schools/isme/thoughtLeadershipsContent';
import { getBlogsBySchool, feedOrThrow } from '@/lib/schools/isdi/blog/api';

/*
 * reference/schools/isme/thought-leaderships/index.php — the ISME blog listing: the ISDI Thought
 * Leadership page's template (658px image hero, school tabs, 285 x 517 cards) on the ISME skin (mint
 * tabs and "Read now" pills). The cards are read LIVE from `atlas-blogs/by-school/isme`; the snapshot
 * is kept only as a fallback. This BlogSection takes `card.image` as `{ src, alt }`.
 */
export const metadata = {
  title: 'ISME - Thought Leaderships',
  alternates: { canonical: '/schools/isme/thought-leaderships' },
};

/* Re-read the dashboard feed every minute (BLOG_REVALIDATE_S): create / edit / publish / unpublish /
   delete in the dashboard shows here within about a minute. */
export const revalidate = 60;

export default async function Page() {
  const { cards: feed, source } = feedOrThrow(await getBlogsBySchool('isme'), fallbackCards, 'isme listing');
  const cards =
    source === 'live'
      ? feed.map((c) => ({ id: c.id, title: c.title, date: c.date, href: c.href, image: { src: c.image, alt: c.alt } }))
      : feed;
  return (
    <main>
      <Hero data={hero} />
      <div data-block="blog">
        <BlogSection tabs={tabs} cards={cards} source={source} skin="isme" />
      </div>
    </main>
  );
}
