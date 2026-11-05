import { lifeContent } from '@/lib/lifeContent';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Intercollegiate events" — port of `life-at-atlas.php:328-385`
 * (`section#intercollegiate-events.section > .container > (.h2-tag.mrg24,
 *   .sub-heading, .swiper.zoom-slider-lg.mrgtp > 6x .slider-card-d.atlas)`).
 *
 * The shared `ZoomSliderLg` carries the carousel mechanism; `.mrgtp` is this
 * instance's own 56px top margin, 20px below 992px.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .slider-card-d.atlas     800 x 478, radius 32/0,     width 100%
 *                            clipped
 *   .slider-card-d-image     100% x 100%, cover          same
 *   .slider-content-d        pinned bottom-left, column, same
 *                            align-start, padding 0 0 32
 *   .slider-title-d.atlas    18px/1, 600, #072058 on     same
 *                            #5cbdca, padding 10 18
 *   .slider-title-sub-d      14px/1.2, 500, #fff on      same
 *                            #072058, min-width 350,
 *                            padding 10 18
 */
export default function IntercollegiateEvents() {
  const { events } = lifeContent;

  return (
    /* ref section#intercollegiate-events.section */
    <section id="intercollegiate-events" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg24 */}
        <h2 className={`mb-6 ${H2}`}>{events.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{events.subheading}</div>

        {/* ref .swiper.zoom-slider-lg.mrgtp */}
        <ZoomSliderLg className="mt-14 max-lg:mt-5" label={events.heading}>
          {events.cards.map((card) => (
            /* ref .slider-card-d.atlas */
            <div
              key={card.title}
              className="relative block h-[478px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]"
            >
              {/* ref img.slider-card-d-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                srcSet={card.image.srcSet}
                sizes="(max-width: 991px) 100vw, 800px"
                alt={card.image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />

              {/* ref .slider-content-d */}
              <div className="absolute bottom-0 left-0 z-[1] flex flex-col items-start justify-start pb-8">
                {/* ref .slider-title-d.atlas */}
                <div className="block bg-atlas-cyan px-[18px] py-2.5 text-[18px] font-semibold leading-none text-[#072058]">
                  {card.title}
                </div>
                {/* ref .slider-title-sub-d */}
                {card.subtitle && (
                  <div className="block min-w-[350px] bg-[#072058] px-[18px] py-2.5 text-[14px] font-medium leading-[1.2] text-white">
                    {card.subtitle}
                  </div>
                )}
              </div>
            </div>
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}
