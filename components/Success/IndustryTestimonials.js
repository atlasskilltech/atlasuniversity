import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import TestimonialCard from '@/components/ui/TestimonialCard';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Industry Testimonials" — port of `success-stories-atlas.php:582-643`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, h2.sub-heading,
 *   .swiper.common-swiper-full > 4 x .testimonial-card.bgc1.atlas)`).
 *
 * Four landscape cards: a portrait on the left, the quote and attribution on
 * an indigo panel to the right, with a vector wash behind the text.
 *
 * The card is `components/ui/TestimonialCard`, shared with
 * /advantages/atlas-career-services, which uses it twice; it carries the
 * measurements and the note on the reference's `width: 100%` blow-up.
 */
export default function IndustryTestimonials() {
  const { testimonials } = successContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{testimonials.heading}</h2>

        {/* ref h2.sub-heading — rendered as a <div>: it is a lead, not a
            heading, and the reference's own outline is wrong here */}
        <div className={SUB_INNER}>{testimonials.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper-full */}
      <Carousel className="pt-14 max-md:pt-5">
        {testimonials.cards.map((card) => (
          <TestimonialCard key={card.name} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
