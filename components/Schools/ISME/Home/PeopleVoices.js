import Carousel from '@/components/Carousel/Carousel';
import QuoteCard from '@/components/Schools/ISDI/Home/QuoteCard';
import InViewVideo from '@/components/Schools/ISDI/Home/InViewVideo';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * ISME "The People Who Know Us Best" — `section.section > .container > (h2.h2-tag.mrg16,
 * .sub-heading, .swiper.common-swiper-full)` in reference/schools/isme/index.php. The card is the
 * ISDI `QuoteCard` on its `isme` variant, with a Webflow background video (325 x 440 beside the
 * quote; full card width x 440 above it below 768) that loops, and the 56px play icon at 24/24 from
 * the top-right corner opening the film in the shared VideoModal through `data-video`.
 *
 * Deviation, shared with every testimonial carousel in this rebuild: between 568 and 767 the
 * reference's card is `width: 100%` of an auto-width slide and blows out to ~995px; it is held to
 * the container width here.
 */
/* `.container-16` (Non-Mumbai) — Webflow's 1366px container, not the ISME ladder */
const WIDE = 'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

export default function PeopleVoices({ data, block = 'people' }) {
  /* `data.inContainer` — the carousel sits INSIDE the heading's container ('wide' = `.container-16`,
     'tw' = `.container`), so it does not bleed */
  const box = data.inContainer === 'wide' ? WIDE : CONTAINER;
  return (
    <section data-block={block} className={SECTION}>
      <div className={box}>
        {/* ref h2.h2-tag.mrg16 (16 / 8), or `.mrgtbm0` (0) where a page authors it with no lead */}
        <h2 className={`${H2} ${data.headingMb === 'mrgtbm0' ? 'mb-0' : 'mb-4 max-md:mb-2'}`}>{data.heading}</h2>
        {/* B.Sc Finance's "Hear from CFA leadership" comments its lead out */}
        {data.sub != null && (
          <div
            className={
              data.subVariant === 'sub4'
                ? /* `.sub-heading-4` (Non-Mumbai) — 24px/1.4 300, pr50; 16px/1.5 and pr0 at <=767 */
                  'pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:text-[16px] max-md:leading-[1.5]'
                : SUB_INNER
            }
          >
            {data.sub}
          </div>
        )}
      </div>
      {/* `.swiper-wrapper { align-items: center }` (Webflow) — inert while every card is 440 tall,
          visible once the content-height student cards are in the track */}
      <div className={data.inContainer ? box : undefined}>
      <Carousel
        bleed={!data.inContainer}
        autoplay={false}
        arrowStyle="isme"
        bullets="inline-overlay"
        align={data.cards.some((c) => c.image && c.kind === 'student') ? 'center' : 'stretch'}
        /* `.common-swiper-full.mrgtp0` (the industry-centric testimonials) — no top padding */
        className={data.swiperPt0 ? undefined : 'pt-14 max-md:pt-5'}
      >
        {data.cards.map((card, i) =>
          card.image ? (
            /* ref .student-card.bgc1 (the programme pages' photo card, content height) — or a photo in
               the fixed 620 x 440 `.testimonial-card` ("What Our Partners Say") */
            <QuoteCard
              key={`${i}-${card.name}`}
              card={card}
              quoteIcon={card.quoteIcon}
              bgImage={data.bgImage}
              variant={card.kind === 'testimonial' ? 'isme' : 'isme-student'}
            >
              {/* ref img.student-image — 50% wide at its own ratio, stretched to the row; 320 tall at <=767 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="w-1/2 flex-[0_1_auto] object-cover object-center max-md:block max-md:h-[320px] max-md:w-full max-md:max-w-none"
              />
            </QuoteCard>
          ) : (
          <QuoteCard
            key={`${i}-${card.name}`}
            card={card}
            quoteIcon={card.quoteIcon}
            bgImage={data.bgImage}
            variant={card.kind === 'student' ? 'isme-student-video' : 'isme'}
          >
            {/* ref .testimonial-video.w-background-video */}
            <div className="relative z-10 h-[440px] w-[325px] max-w-full flex-none overflow-clip text-white max-md:w-full">
              <InViewVideo
                sources={card.video.sources}
                poster={card.video.poster}
                className="absolute inset-0 -z-[100] h-full w-full"
              />
              {card.play && (
                /* ref a.play-icon */
                <a
                  href="#"
                  data-video={card.play.url}
                  aria-label={`Play ${card.name}'s video`}
                  className="absolute right-6 top-6 block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- 56px play glyph */}
                  <img src={card.play.icon} width={56} height={56} alt="" loading="lazy" className="block" />
                </a>
              )}
            </div>
          </QuoteCard>
          )
        )}
      </Carousel>
      </div>
    </section>
  );
}
