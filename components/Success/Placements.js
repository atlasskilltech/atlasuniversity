import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import PlacementCard from '@/components/ui/PlacementCard';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Placements" — port of `success-stories-atlas.php:167-308`
 * (`.section > .container > (h2.h2-tag.mrg32, .sub-heading,
 *   .swiper.common-swiper > 11 x .placement-card.atlas)`).
 *
 * Eleven portrait cards, each with the employer's logo in the top-right corner
 * and an indigo plate across the bottom carrying the name, course and batch.
 *
 * The card is `components/ui/PlacementCard`, shared with
 * /advantages/atlas-industry-centric-approach "Student Success Stories"; it
 * carries the measurements. This page uses its 30% logo and leaves the card
 * itself transparent (`.placement-card.atlas`).
 */
export default function Placements() {
  const { placements } = successContent;

  return (
    /* ref .section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg32 */}
        <h2 className={`mb-8 ${H2}`}>{placements.heading}</h2>

        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{placements.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper — a sibling of .container so the track
          bleeds to the viewport edge */}
      <Carousel className="pt-14 max-md:pt-10">
        {placements.cards.map((card) => (
          <PlacementCard key={card.name + card.batch} card={card} />
        ))}
      </Carousel>
    </div>
  );
}
