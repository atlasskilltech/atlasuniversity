import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Industry Testimonials" — port of `success-stories-atlas.php:582-643`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, h2.sub-heading,
 *   .swiper.common-swiper-full > 4 x .testimonial-card.bgc1.atlas)`).
 *
 * Four landscape cards: a portrait on the left, the quote and attribution on
 * an indigo panel to the right, with a vector wash behind the text.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                  <=767px
 *   .testimonial-card        620 x 440, row,          column, height auto
 *     .bgc1.atlas            #41418e, radius 32px 0,
 *                            clipped
 *   .student-image           50% wide, full height,   100% x 320
 *                            cover
 *   .student-text            flex 1, padding 40 32    height 280, padding
 *                                                     20 12
 *   .st-quote                padding 24, z 1          width 100%
 *   .st-text                 20px                     16px
 *   .quote                   absolute 5 / 5, 16px
 *   .st-details              padding-left 24, z 1     width 100%
 *   .st-course.isdi          14px, #fff
 *   .bg-image                absolute 0 0, cover, z 0
 *
 * ── One reference defect, not reproduced ──────────────────────────────────
 * `.testimonial-card` is `width: 100%` below 768px inside a `slidesPerView:
 * 'auto'` Swiper slide, so between 568 and 767px the percentage resolves
 * against an auto width and the card measures 1127px at a 700px viewport —
 * exactly the blow-up the homepage testimonials hit. Below 568px the inline
 * rule in `header.php` gives the slide `width: 100%` and the card comes out
 * right again. The container width is used explicitly here instead, which is
 * what the reference renders everywhere the bug does not bite.
 *
 * `.st-course.st-name.isdi` carries the name and the company in one div split
 * by a `<br>`, the company in a `<strong>`.
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
          /* ref .testimonial-card.bgc1.atlas */
          <div
            key={card.name}
            className="flex h-[440px] w-[620px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-[#41418e]
                       max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col"
          >
            {/* ref img.student-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              className="block w-1/2 object-cover object-center max-md:h-[320px] max-md:w-full"
            />

            {/* ref .student-text */}
            <div className="relative h-full flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:px-3 max-md:py-5">
              {/* ref .st-quote */}
              <div className="relative z-[1] p-6 max-md:w-full">
                {/* ref .st-text */}
                <div className="text-xl max-md:text-[16px] max-md:leading-6">{card.text}</div>

                {/* ref img.quote */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.quoteIcon}
                  alt=""
                  loading="lazy"
                  className="absolute left-[5px] top-[5px]"
                />
              </div>

              {/* ref .st-details */}
              <div className="relative z-[1] pl-6 max-md:w-full">
                {/* ref .st-course.st-name.isdi */}
                <div className="text-[14px] text-white">
                  {card.name}
                  <br />
                  <strong>{card.company}</strong>
                </div>
              </div>

              {/* ref img.bg-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.bgImage}
                alt=""
                loading="lazy"
                className="absolute left-0 top-0 z-0 block h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
