import { successContent } from '@/lib/successContent';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Master's Progressions" — port of `success-stories-atlas.php:719-831`
 * (`section#master-progressions.section > .container > (.head-wrap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading), .swiper.common-swiper >
 *   11 x .transfer-card)`).
 *
 * Eleven portrait cards under a bottom-anchored scrim carrying the student's
 * name, their degree and the university's logo.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                  <=767px
 *   .transfer-card           282 x 388, radius        object-position
 *     .atlas / .round        32px 0, clipped          50% 30% on the photo
 *   .transfer-card-img       100% x 100%, cover
 *   .overlay                 bottom 55%, transparent  height 90%
 *                            -> #000e6 at 86%, z 0
 *   .transfer-card-content   absolute left/right 25,  same
 *                            bottom 26, z 20
 *   .transt-cd-name          24px/1, 500, #fff
 *   .transf-cd-degre         14px/1.1, padding-top
 *                            10, padding-bottom 16,
 *                            1px white rule,
 *                            margin-bottom 19
 *
 * `.transfer-card.atlas` and `.transfer-card.round` are the same declaration;
 * the reference uses both spellings across the eleven cards.
 *
 * Eight of the eleven university logos carry no class at all and three carry
 * `.transf-un-logo`, which the stylesheet never defines — so every logo renders
 * at its natural size and the class is decoration in the markup only.
 */

export default function MastersProgressions() {
  const { progressions } = successContent;

  return (
    /* ref section#master-progressions.section */
    <section id="master-progressions" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{progressions.heading}</h2>

            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{progressions.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper */}
      <Carousel className="pt-14 max-md:pt-10">
        {progressions.cards.map((card, index) => (
          /* ref .transfer-card.atlas / .round */
          <div
            /* two students appear twice in the reference's own list, so the
               index is part of the key */
            key={card.name + index}
            className="relative h-[388px] w-[282px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]"
          >
            {/* ref img.transfer-card-img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              srcSet={card.image.srcSet}
              sizes="100vw"
              alt={card.image.alt}
              loading="lazy"
              className="h-full w-full object-cover max-md:object-[50%_30%]"
            />

            {/* ref .overlay */}
            <div className="absolute inset-x-0 bottom-0 z-0 h-[55%] bg-[linear-gradient(#00263700,#00263700_6%,#000000e6_86%)] max-md:h-[90%]" />

            {/* ref .transfer-card-content */}
            <div className="absolute inset-x-0 bottom-[26px] z-20 mx-[25px]">
              {/* ref .transt-cd-name */}
              <div className="text-[24px] font-medium leading-none text-white">{card.name}</div>

              {/* ref .transf-cd-degre */}
              <div className="mb-[19px] border-b border-white pb-4 pt-2.5 text-[14px] font-normal leading-[1.1] text-white">
                {withBreaks(card.degree)}
              </div>

              {card.logo && (
                /* ref img.transf-un-logo (undefined in the stylesheet) */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={card.logo.src} alt={card.logo.alt} loading="lazy" />
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
