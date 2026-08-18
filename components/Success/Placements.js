import { successContent } from '@/lib/successContent';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Placements" — port of `success-stories-atlas.php:167-308`
 * (`.section > .container > (h2.h2-tag.mrg32, .sub-heading,
 *   .swiper.common-swiper > 11 x .placement-card.atlas)`).
 *
 * Eleven portrait cards, each with the employer's logo in the top-right corner
 * and an indigo plate across the bottom carrying the name, course and batch.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   .placement-card.atlas  398 x 542, radius 32px 0,  298 wide, column flex
 *                          clipped
 *   .p-card-img            100% x 414, clipped        flex 1
 *   .p-card-main-img       cover, object-position     unchanged
 *                          50% 0
 *   .p-company-img         absolute top 5% right 5%,  max-width 70
 *                          width 30%
 *   .p-content-wrapper     absolute bottom, #41418e,  unchanged
 *     .atlas               padding 20 30
 *   .p-card-name           32px, 500, #fff            22px
 *   .placement-course      18px, #fff                 16px
 *   .placement-batch       14px, #fff                 12px
 *
 * The card keeps its 542px height below 768px while `.p-card-img` becomes
 * `flex: 1`, so the photograph absorbs whatever the text plate leaves.
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
          /* ref .placement-card.atlas */
          <div
            key={card.name + card.batch}
            className="relative h-[542px] w-[398px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]
                       max-md:flex max-md:w-[298px] max-md:flex-col"
          >
            {/* ref .p-card-img */}
            <div className="relative h-[414px] w-full overflow-hidden max-md:h-auto max-md:flex-1">
              {/* ref img.p-card-main-img */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                srcSet={card.image.srcSet}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 939.9609375px"
                alt={card.image.alt}
                loading="lazy"
                className="inline-block h-full w-full object-cover object-[50%_0%]"
              />

              {/* ref img.p-company-img */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.logo.src}
                srcSet={card.logo.srcSet}
                alt={card.logo.alt}
                loading="lazy"
                className="absolute right-[5%] top-[5%] z-10 block w-[30%] max-w-none max-md:w-full max-md:max-w-[70px]"
              />
            </div>

            {/* ref .p-content-wrapper.atlas */}
            <div className="absolute inset-x-0 bottom-0 w-full bg-[#41418e] px-[30px] py-5">
              {/* ref .txt-block-linkedin */}
              <div className="flex items-center justify-between">
                {/* ref .p-card-name */}
                <div className="text-[32px] font-medium text-white max-md:text-[22px]">
                  {card.name}
                </div>
              </div>

              {/* ref .placement-course */}
              <div className="text-[18px] text-white max-md:text-[16px]">{card.course}</div>

              {/* ref .placement-batch */}
              <div className="text-[14px] text-white max-md:text-[12px]">{card.batch}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
