import { campusContent } from '@/lib/campusContent';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Food on Campus" — port of `campus-atlas.php:516-616`
 * (`section.section > .container > (.head-wrap > .tt-wrap,
 *   .card-type-h-wrapper > .swiper.common-swiper > 5x .swiper-slide >
 *   .port-card-h-wrap.atlas)`).
 *
 * A plain `.common-swiper`, so it is the shared `Carousel` — the same
 * `slidesPerView: 'auto', spaceBetween: 24, autoplay, mousewheel, pagination`
 * initialiser the homepage carousels use, with bullets appearing below 568px.
 * `.common-swiper` carries `padding-top: 56px` (40 below 768px) here, where the
 * homepage's instances cancel it with `.mrgtp0`.
 *
 * ── Measured cascade — the card does not change with width ────────────────
 *   .port-card-h-wrap.atlas   295 x 519, radius 32/0, clipped
 *   .port-card-h-image        width 100%, height auto, object-cover — every
 *                             photo is authored at exactly 295x519
 *   .port-card-atlas-wrap     pinned to the bottom, #41418e, padding 24, row,
 *                             align-end
 *   .port-card-h-text         24px/1.2, 400, #fff
 *   .port-card-h-distance     `.white` -> 18px/1.2, 400, #fff, padding-top 10
 *   .port-card-m-arrow-atlas  29x21 notch at top:-19 left:30, scale(.8),
 *                             `currentColor` resolving to its own #41418e
 *
 * The carousel is a sibling of `.container`, not a child: its track applies the
 * container's own inset itself, and nesting it would double that inset.
 */
export default function FoodOnCampus() {
  const { food } = campusContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{food.heading}</h2>
            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{food.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .card-type-h-wrapper > .swiper.common-swiper */}
      <Carousel className="pt-14 max-md:pt-10">
        {food.items.map((item) => (
          /* ref .port-card-h-wrap.atlas */
          <div
            key={item.title}
            className="relative block h-[519px] w-[295px] flex-none items-end justify-center overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white"
          >
            {/* ref img.port-card-h-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image.src}
              alt={item.image.alt}
              loading="lazy"
              className="mx-auto block w-full object-cover"
            />

            {/* ref .port-card-atlas-wrap */}
            <div className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end bg-atlas-footer p-6">
              {/* ref .port-card-h-detail */}
              <div className="relative w-full flex-none">
                {/* ref .port-card-h-text */}
                <div className="text-[24px] font-normal leading-[1.2] text-white">
                  {item.title}
                </div>
                {/* ref .port-card-h-distance.white */}
                <div className="pt-2.5 text-[18px] font-normal leading-[1.2] text-white">
                  {item.place}
                </div>
              </div>

              {/* ref .port-card-m-arrow-atlas > .svg-icon-triangle */}
              <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8] text-atlas-footer">
                <svg
                  width="29"
                  height="21"
                  viewBox="0 0 29 21"
                  fill="none"
                  aria-hidden="true"
                  className="block"
                >
                  <path
                    d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
