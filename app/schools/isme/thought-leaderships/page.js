import Hero from '@/components/Schools/ISDI/About/Hero';
import BlogSection from '@/components/Schools/ISDI/ThoughtLeadership/BlogSection';
import { hero, tabs, cards as fallbackCards } from '@/lib/schools/isme/thoughtLeadershipsContent';
import { getBlogsBySchool } from '@/lib/schools/isdi/blog/api';

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

/* Revalidate so a blog added in the dashboard appears on the listing within ~1 minute. */
export const revalidate = 60;

export default async function Page() {
  const live = await getBlogsBySchool('isme');
  const cards = live.cards.length
    ? live.cards.map((c) => ({ title: c.title, date: c.date, href: c.href, image: { src: c.image, alt: c.alt } }))
    : fallbackCards;
  return (
    <main>
      <Hero data={hero} />
      <div data-block="blog">
        <BlogSection tabs={tabs} cards={cards} skin="isme" />
      </div>
    </main>
  );
}
