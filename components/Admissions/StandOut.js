import { standOut } from '@/lib/integratedAdmissionsContent';
import Carousel from '@/components/Carousel/Carousel';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "What Makes You Stand Out" — port of `integrated-admissions.php:311-390`
 * (`section.section > .container > (.head-wrap.top > .tt-wrap >
 *   (h2.h2-tag.mrg16, h2.sub-heading), .swiper.common-swiper >
 *   8 x .swiper-slide > .core-atlas-card > .core-content >
 *   (.core-card-title-atlas, .core-card-subs))`).
 *
 * Eight indigo cards on the shared `.common-swiper` — `slidesPerView: 'auto'`,
 * `spaceBetween: 24`, 5s autoplay, clickable bullets
 * (`assets/include/footer.php:355-379`), which is what `Carousel` reproduces.
 *
 * `.core-atlas-card` is new to the rebuild: the class exists only on the three
 * Admissions references, and all three use it, so the section takes its copy as
 * `data` rather than reading its own export.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .swiper.common-swiper    padding-top 56              padding-top 40, or 0
 *                                                          with `.mrg-mob-tp-0`
 *                                                          (/admissions/pg-admissions)
 *   .swiper-slide            396 wide, margin-right 24   360 wide
 *   .core-atlas-card         396 wide, min-height 207,   360 wide
 *                            #41418e, radius 32px 0
 *   .core-content            flex column, justify-end,   padding-left 20
 *                            align-start, height auto,
 *                            padding 0 25px 0 35px
 *   .core-card-title-atlas   24px/700, padding 28 0 16, white
 *   .core-card-subs          16px, padding 0 0 26, white
 *
 * `.core-content` is `height: auto` inside a `min-height: 207px` card, so
 * `justify-content: flex-end` never has spare space to distribute and the copy
 * sits at the top with the remainder of the 207px empty below it — which is
 * what the reference paints, verified against a screenshot rather than inferred
 * from the declaration.
 *
 * `.core-content` also carries `position: sticky` with `z-index: 1` and no
 * inset, so it never actually sticks — but `z-index` only applies to a
 * positioned box, so the pair is reproduced as authored rather than dropped.
 */

/* ref .head-wrap.top */
const HEAD_WRAP =
  'flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch '
  + 'max-md:gap-4 max-sm:justify-around';

export default function StandOut({ data = standOut }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className={HEAD_WRAP}>
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>

            {/* ref h2.sub-heading — marked up as an <h2> upstream, so it
                carries Webflow's base `margin: 20px 0 10px`, which is exactly
                what SUB_H2 restates on a <div> */}
            <div className={SUB_H2}>{data.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper — a sibling of `.container`: the track is
          `overflow: visible` upstream and bleeds to the viewport edge, which
          Carousel reproduces by padding its own track by the container inset */}
      <div className={cx('pt-14', data.noMobileTopPadding ? 'max-md:pt-0' : 'max-md:pt-10')}>
        <Carousel>
          {data.cards.map((card, i) => (
            /* ref .core-atlas-card */
            <div
              key={`${i}-${card.title}`}
              className="min-h-[207px] w-[396px] flex-none rounded-tl-[32px] rounded-br-[32px] bg-[#41418e] max-md:w-[360px]"
            >
              {/* ref .core-content */}
              <div className="sticky z-[1] flex h-auto flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
                {/* ref .core-card-title-atlas */}
                <div className="pb-4 pt-7 text-2xl font-bold text-white">{card.title}</div>
                {/* ref .core-card-subs */}
                <div className="pb-[26px] text-base text-white">{card.text}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
