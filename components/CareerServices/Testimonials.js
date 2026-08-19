import Carousel from '@/components/Carousel/Carousel';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM } from '@/components/Home/SectionHead';

/**
 * The two `.testimonial-card` carousels on /advantages/atlas-career-services:
 *
 *   "Industry Testimonials"  `atlas-career-services.php:260`  7 cards, with a lead
 *   "Student Testimonials"   `atlas-career-services.php:552`  3 cards, no lead
 *
 * Both are `.swiper.common-swiper-full.mrgtp0` over the shared
 * `TestimonialCard`, so one component takes the data and an optional lead.
 *
 * The first section's heading pair is `h2.h2-tag.mrgbtm0` + `h2.sub-heading
 * .mrgbtm`; the second is a bare `h2.h2-tag`, whose own 56px bottom margin
 * carries the gap instead.
 */
export default function Testimonials({ data }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag(.mrgbtm0) */}
        <h2 className={`${data.subheading ? 'mb-0' : 'mb-14 max-md:mb-8'} ${H2}`}>
          {data.heading}
        </h2>

        {/* ref h2.sub-heading.mrgbtm — a lead, not a heading */}
        {data.subheading && <div className={SUB_H2_MRGBTM}>{data.subheading}</div>}
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 — a sibling of .container, so the
          track bleeds to the viewport edge the way `overflow: visible` does */}
      <Carousel>
        {data.cards.map((card) => (
          <TestimonialCard key={card.name} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
