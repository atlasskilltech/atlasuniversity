import Hero from '@/components/Schools/ISDI/About/Hero';
import BlogSection from '@/components/Schools/ISDI/ThoughtLeadership/BlogSection';
import { hero, tabs, cards } from '@/lib/schools/isme/thoughtLeadershipsContent';

/*
 * reference/schools/isme/thought-leaderships/index.php — the ISME blog listing: the ISDI Thought
 * Leadership page's template (658px image hero, school tabs, 285 x 517 cards) on the ISME skin (mint
 * tabs and "Read now" pills), over a snapshot of the blog API feed production renders.
 */
export const metadata = {
  title: 'ISME - Thought Leaderships',
  alternates: { canonical: '/schools/isme/thought-leaderships' },
};

export default function Page() {
  return (
    <main>
      <Hero data={hero} />
      <div data-block="blog">
        <BlogSection tabs={tabs} cards={cards} skin="isme" />
      </div>
    </main>
  );
}
