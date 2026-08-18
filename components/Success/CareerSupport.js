import { successContent } from '@/lib/successContent';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Our Career Support Services" — port of `success-stories-atlas.php:644-718`
 * (`section.section > .container > (.head-wrap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading.mrgbtm), .common-flex-26-wrap >
 *   9 x .career-sup-card.ugdx)`).
 *
 * Nine cards in a centred wrapping row: photograph on top, indigo caption
 * block below carrying a title and a paragraph.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                 <=767px
 *   .common-flex-26-wrap       wrap, centre, gap 24    same
 *   .career-sup-card.ugdx      398 x 622, column,      width 100%,
 *                              radius 36px top-left,   height auto
 *                              clipped
 *   .career-sup-img            height 340              240
 *   .csservice-card-main-img   cover, height 101%      object-position 50% 76%
 *   .css-content-wrapper       flex 1, padding         padding-bottom 20
 *     .atlas-bg-1/2            20 35 8, radius
 *                              bottom-right 36
 *   .cr-title.white            32px/1.3, 500, #fff     24px
 *   .cr-sub-desc.mt16          16px/1.3, margin-top    14px/1.3 at 768-991,
 *                              16                      16px/1.4 below 768
 *
 * `.atlas-bg-1` and `.atlas-bg-2` are the same indigo with different vector
 * washes, both painted only by the stylesheet, so they travel as data. Both
 * files are the ones /campus-atlas already brought in locally.
 */
export default function CareerSupport() {
  const { careerSupport } = successContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{careerSupport.heading}</h2>

            {/* ref .sub-heading.mrgbtm */}
            <div className={SUB_INNER_MRGBTM}>{careerSupport.subheading}</div>
          </div>
        </div>

        {/* ref .common-flex-26-wrap */}
        <div className="flex flex-wrap items-start justify-center gap-6">
          {careerSupport.cards.map((card) => (
            /* ref .career-sup-card.ugdx */
            <div
              key={card.title}
              className="flex h-[622px] w-[398px] flex-none flex-col items-stretch overflow-hidden rounded-tl-[36px]
                         max-md:h-auto max-md:w-full"
            >
              {/* ref .career-sup-img.atlas-link */}
              <div className="relative h-[340px] w-auto max-md:h-[240px]">
                {/* ref img.csservice-card-main-img */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  alt={card.image.alt}
                  loading="lazy"
                  className="block h-[101%] w-full max-w-none object-cover max-md:object-[50%_76%]"
                />
              </div>

              {/* ref .css-content-wrapper.atlas-bg-* */}
              <div
                className="flex-1 rounded-br-[36px] px-[35px] pb-2 pt-5 max-md:pb-5"
                style={{
                  backgroundColor: card.background,
                  backgroundImage: `url(${card.backgroundImage})`,
                  backgroundPosition: card.backgroundPosition,
                }}
              >
                {/* ref .cr-title.white */}
                <div className="text-[32px] font-medium leading-[1.3] text-white max-md:text-[24px]">
                  {card.title}
                </div>

                {/* ref .cr-sub-desc.mt16 */}
                <div className="mt-4 text-[16px] leading-[1.3] text-white max-lg:text-[14px] max-lg:leading-[1.3] max-md:text-[16px] max-md:leading-[1.4]">
                  {card.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
