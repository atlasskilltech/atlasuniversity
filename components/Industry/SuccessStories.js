import { successStories } from '@/lib/industryContent';
import Carousel from '@/components/Carousel/Carousel';
import PlacementCard from '@/components/ui/PlacementCard';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Student Success Stories" — port of
 * `atlas-industry-centric-approach.php:942-1006`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm,
 *   .swiper.common-swiper.mrgtp0 > 5 x .placement-card-atlas)`).
 *
 * The shared `components/ui/PlacementCard` on its filled variant: this page's
 * `.placement-card-atlas` paints the card `#41418e`, which /success-stories'
 * `.placement-card.atlas` leaves transparent. It shows below 768px, where the
 * card becomes a column and the photograph no longer fills it.
 *
 * The employer logo is `.p-company-img-atlas` (20% wide) on the first card and
 * `.p-company-img` (30%) on the other four — the reference's own markup, so
 * each card carries its own width.
 *
 * None of the five authors a `.placement-batch`, so none is rendered.
 */
export default function SuccessStories() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{successStories.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM}>{successStories.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 — a sibling of .container so the
          track bleeds to the viewport edge */}
      <Carousel>
        {successStories.cards.map((card) => (
          <PlacementCard key={card.name} card={card} logoWidth={card.logoWidth} filled />
        ))}
      </Carousel>
    </section>
  );
}
