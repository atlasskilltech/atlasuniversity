import { testimonials } from '@/lib/industryContent';
import Carousel from '@/components/Carousel/Carousel';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "Industry Testimonials" — port of
 * `atlas-industry-centric-approach.php:1022-1109`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, h2.sub-heading,
 *   .swiper.common-swiper-full.mrgtp0 > 6 x .testimonial-card.bgc1.atlas)`).
 *
 * Six landscape cards on the shared `components/ui/TestimonialCard`, which
 * carries the measurements and the note on the reference's `width: 100%`
 * blow-up between 568 and 767px — the one place this page overflows
 * horizontally, and the one thing here deliberately not reproduced.
 */
export default function Testimonials() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{testimonials.heading}</h2>

        {/* ref h2.sub-heading — a lead, not a heading, but it is an <h2>
            upstream, so Webflow's base `margin: 20px 0 10px` applies */}
        <div className={SUB_H2}>{testimonials.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 */}
      <Carousel>
        {testimonials.cards.map((card) => (
          <TestimonialCard key={card.name} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
