import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import IconHeading from '../IconHeading';
import CardTypeE from '../CardTypeE';
import { BLUE_CLR_TEXT, BLUE_DESC_WRAP, COMMON_WRAPPER, COMMON_WRAPPER_LG, SUB_1 } from './ui';

/**
 * #6 "Student Welfare" (`atlas-isdi-advantage/the-isdi-advantage/index.php:978-1161`).
 *
 *   section#student-welfare.section >
 *     .icon-heading (its `.icon-main-title` repeats the section's own id, so it is
 *                    dropped there and kept on the section)
 *     .w-layout-blockcontainer.container >
 *       .blue-desc-wrap > .blue-clr-text
 *       .common-wrapper    "Academic & Career support"  -> .zoom-slider-wrap
 *       .common-wrapper    "Wellbeing & Student Life"   -> .swiper.common-swiper
 *       .common-wrapper-lg "Embracing Every Identity"   -> .center-image-full-wrap
 *       .common-wrapper-lg "Meet your campus family"    -> .swiper.common-swiper
 *
 * The first two groups hold the SAME card (`.slider-card-wrapper`, 800 x 475, r24,
 * a photograph under a `#002637`->`#040404cc` scrim) in two different sliders: the
 * first is `.swiper.zoom-slider-lg`, which scales its neighbours to 0.65 and pulls
 * the next card in by -100px above 768; the second is a plain `.common-swiper`.
 * Hence `group.zoomed`.
 *
 * Measured at 1440 / 768 / 390:
 *   .slider-card-wrapper   800 x 475, r24 (346 x 475 at <=767, unscaled)
 *   .slide-content-a       absolute, column, bottom-aligned, pb50 pl40
 *                          (p20 at <=767), gradient scrim, z1
 *   .slide-title-a         32px/0.5 500 white with a 12px **#ec1376** bottom
 *                          border — the "bar"; `.no-bar` zeroes its width, and
 *                          two of the five cards carry it. 24px at <=767.
 *   .slide-description-a   18px/1.5, pt16, max-width 70% (14px/1.5, pt8 at <=767)
 *   .blue-clr-text         24px/1.5 #011136
 *   .sub-heading-1         18px/1.8 300, pr50 (1.5 and pr0 at <=767)
 *
 * **The `data-slider-card-a-bg` script is dead here too.** Every card carries that
 * attribute and the page ships the listener for it, but the listener targets
 * `.slider-card-a` and the cards are `.slider-card-wrapper` — the same dead script
 * /life-at-atlas documents. All five cards also carry the SAME attribute value, a
 * leftover; what actually paints is the authored `img.slide-image-a`, which is what
 * this renders. Not reproduced.
 */
function SlideCard({ card }) {
  return (
    /* ref .slider-card-wrapper */
    <div className="relative flex h-[475px] w-[800px] flex-none items-end overflow-hidden rounded-3xl max-md:w-full">
      {/* ref img.slide-image-a */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="inline-block h-full w-full max-w-full object-cover align-middle"
      />
      {/* ref .slide-content-a */}
      <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(rgba(0,38,55,0),rgba(4,4,4,.8))] pb-[50px] pl-10 max-md:p-5">
        {/* ref .slide-title-a (+ .no-bar) */}
        <div
          className={cx(
            'text-[32px] font-medium leading-[0.5] text-white max-md:text-[24px] max-md:leading-[0.5]',
            !card.noBar && 'border-0 border-b-[12px] border-solid border-[#ec1376]'
          )}
        >
          {withBreaks(card.title)}
        </div>
        {/* ref .slide-description-a */}
        <div className="max-w-[70%] pt-4 text-[18px] leading-[1.5] text-white max-md:pt-2 max-md:text-[14px]">
          {withBreaks(card.text)}
        </div>
      </div>
    </div>
  );
}

const LEAD = { blue: BLUE_CLR_TEXT, sub1: SUB_1, sub: SUB };

function Group({ group }) {
  const head = (
    <>
      <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(group.heading)}</h2>
      {/* the four groups do not agree on their lead: two are `.blue-clr-text`
          (24px/1.5 #011136), one `.sub-heading-1` (18px/1.8) and one a plain
          `.sub-heading` (24px/1.4) — so the class travels with the group */}
      <div className={LEAD[group.lead] || BLUE_CLR_TEXT}>{withBreaks(group.sub)}</div>
    </>
  );

  return (
    <div className={group.wide ? COMMON_WRAPPER_LG : COMMON_WRAPPER}>
      {/* the heading and the full-width photograph sit in `.container`; the three
          sliders must NOT — `Carousel` and `ZoomSliderLg` pad their own track by the
          container inset to reproduce the reference's `overflow: visible` bleed, so
          nesting one inside `.container` applies the inset twice and starts the first
          card 62px right (measured 161 against the reference's 99) */}
      <div className={CONTAINER}>{head}</div>

      {group.zoom.length > 0 &&
        (group.zoomed ? (
          /* ref .zoom-slider-wrap — `padding-top: 56px` at EVERY width, unlike the
             plain `.swiper.common-swiper` beside it, which drops to 40 at <=767 */
          <div className="pt-14">
            <ZoomSliderLg>
              {group.zoom.map((card, i) => (
                <SlideCard key={`${i}-${card.title}`} card={card} />
              ))}
            </ZoomSliderLg>
          </div>
        ) : (
          /* ref .swiper.common-swiper */
          <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
            {group.zoom.map((card, i) => (
              <SlideCard key={`${i}-${card.title}`} card={card} />
            ))}
          </Carousel>
        ))}

      {group.image && (
        /* ref .center-image-full-wrap.mrgtp — a plain block, so it keeps the container */
        <div className={cx(CONTAINER, 'relative mb-[5px] mt-14 overflow-hidden max-md:mt-10')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={group.image.src}
            srcSet={group.image.srcSet}
            sizes={group.image.sizes}
            alt={group.image.alt}
            loading="lazy"
            decoding="async"
            className="w-full max-w-full align-middle"
          />
        </div>
      )}

      {group.cardsE.length > 0 && (
        /* ref .swiper.common-swiper > .card-type-e.swiper-slide */
        <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
          {group.cardsE.map((person, i) => (
            <CardTypeE key={`${i}-${person.text}`} person={{ name: person.text, role: person.tx, image: person.image }} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default function StudentWelfare({ data }) {
  return (
    /* ref section#student-welfare.section */
    <section id="student-welfare" data-block="welfare" className={SECTION}>
      <IconHeading num={data.icon.num} title={data.icon.title} size="lg" />

      <div className={CONTAINER}>
        {/* ref .blue-desc-wrap > .blue-clr-text */}
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_CLR_TEXT}>{withBreaks(data.lead)}</div>
        </div>
      </div>

      {data.groups.map((group, i) => (
        <Group key={`${i}-${group.heading}`} group={group} />
      ))}
    </section>
  );
}
