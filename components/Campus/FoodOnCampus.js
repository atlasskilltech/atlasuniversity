import { campusContent } from '@/lib/campusContent';
import Carousel from '@/components/Carousel/Carousel';
import PortCardH from '@/components/ui/PortCardH';
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
 * The card is the shared `components/ui/PortCardH` — the same
 * `.port-card-h-wrap.atlas` that /life-at-atlas uses for its sports facilities
 * and its "Student favourites"; that component carries the measurements.
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
          <PortCardH key={item.title} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
