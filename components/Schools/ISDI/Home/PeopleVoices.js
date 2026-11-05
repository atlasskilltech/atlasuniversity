import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import QuoteCard from './QuoteCard';
import InViewVideo from './InViewVideo';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/* ref .sub-heading-3 — /schools/isdi/isdi-for-outstation's testimonials lead is this,
   not `.sub-heading` (SUB). The two measure the same above 768, but at <=767
   `.sub-heading` adds `padding-top: 20` that `.sub-heading-3` does not, so SUB is 20px
   taller there. `data.subVariant === 'sub3'` selects it; every other page keeps SUB. */
const SUB_3 =
  'pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:pb-5 max-md:text-[16px] max-md:leading-[1.5]';

/**
 * "The People Who Know Us Best" — port of reference/schools/isdi/index.php:3749-3827.
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *     .swiper.common-swiper-full > 4 x .testimonial-card.bgc1.isdi)
 *
 * `QuoteCard` with a Webflow background video in place of the photo:
 * `.testimonial-video` is 325 x 440 beside the quote (full card width x 440
 * above it below 768), the clip covering it over the card's #193e90. The videos
 * are `autoplay muted playsinline` without `loop`, so each plays through once;
 * here they start when scrolled into view (see `InViewVideo`).
 *
 * The slider has no `.mrgtp0`: pt56, pt20 below 768.
 */
export default function PeopleVoices({ data }) {
  return (
    <section data-block="people" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={data.subVariant === 'sub3' ? SUB_3 : SUB}>{data.sub}</div>
      </div>
      {/* ref .swiper.common-swiper-full */}
      <div className="pt-14 max-md:pt-5">
        <Carousel autoplay={false} bullets="isdi-overlay">
          {data.cards.map((card, i) => (
            /* index-qualified: /schools/isdi/parents-corner repeats one quote across
               three cards (an upstream duplication), so the text alone is not unique */
            <QuoteCard key={`${i}-${card.text}`} card={card} quoteIcon={data.quoteIcon} bgImage={data.bgImage}>
              {/* ref .testimonial-video.w-background-video */}
              <div className="relative z-10 h-[440px] w-[325px] max-w-full flex-none overflow-clip text-white max-md:w-full">
                <InViewVideo
                  sources={card.video.sources}
                  src={card.video.src}
                  type={card.video.type}
                  poster={card.video.poster}
                  loop={false}
                  className="absolute inset-0 -z-[100] h-full w-full"
                />
              </div>
            </QuoteCard>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
