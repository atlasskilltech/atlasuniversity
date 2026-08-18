import { campusContent } from '@/lib/campusContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Studios, Labs, and Classrooms" — port of `campus-atlas.php:394-469`
 * (`section#campus-spaces.section > .container > (.h2-tag.mrg16,
 *   .sub-heading.mrgbtm, .swiper.zoom-slider-lg.mrg-lft > 6x .swiper-slide)`).
 *
 * The carousel mechanism — the 0.6 / 0.65 / 1 scale ladder, the next card's
 * -100px pull, 2s autoplay, loop and bullets below 568px — is the shared
 * `ZoomSliderLg`, which also drives the two instances on /life-at-atlas and
 * which carries the notes on what the reference does and does not do here.
 * Only `.mrg-lft` is this page's: `margin-left: 20%`, cancelled below 768px.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .slider-card-e-ugdx      800 x 478, radius 32/0      width 100%
 *   .slider-card-e-atlas-2   bottom half, #00263700 14%  padding 0 16 24
 *                            -> #040404e6, padding
 *                            0 40 50 0
 *   .slide-cd-atlas-2        24px/1, 600, #072058 on     same
 *                            #5cbdca, padding 8 15
 */
export default function StudiosLabs() {
  const { studios } = campusContent;

  return (
    /* ref section#campus-spaces.section — the id is kept only on the first of
       the four sections the reference gives it to */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{studios.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{studios.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrg-lft */}
        <ZoomSliderLg className="ml-[20%] max-md:ml-0" label={studios.heading}>
          {studios.slides.map((slide) => (
            /* ref .slider-card-e-ugdx */
            <div
              key={slide.title}
              className="relative block h-[478px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]"
            >
              {/* ref img.slide-card-e-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image.src}
                srcSet={slide.image.srcSet}
                sizes="(max-width: 790px) 100vw, 790px"
                alt={slide.image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {/* ref .slider-card-e-atlas-2 */}
              <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 flex-col items-start justify-end bg-[linear-gradient(#00263700_14%,#040404e6)] pb-[50px] pr-10 max-md:px-4 max-md:pb-6">
                {/* ref .slide-cd-e-flex */}
                <div className="flex w-full items-center justify-between">
                  {/* ref .slide-cd-e-lt — a block, so as a flex item it shrinks
                      to its text */}
                  <div>
                    {/* ref .slide-cd-atlas-2 */}
                    <div className="bg-atlas-cyan px-[15px] py-2 text-[24px] font-semibold leading-none text-[#072058]">
                      {slide.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
