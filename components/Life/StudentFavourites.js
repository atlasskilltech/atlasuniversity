import { lifeContent } from '@/lib/lifeContent';
import Carousel from '@/components/Carousel/Carousel';
import PortCardH from '@/components/ui/PortCardH';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Student favourites" — port of `life-at-atlas.php:953-1053`
 * (`section.section > .container > (.head-wrap > .tt-wrap,
 *   .card-type-h-wrapper > .swiper.common-swiper >
 *   5x .port-card-h-wrap.atlas)`).
 *
 * Same shape as /campus-atlas "Food on Campus" — the same `Carousel`, the same
 * shared `PortCardH`, four of the same five photographs — with this page's own
 * heading and one different card.
 */
export default function StudentFavourites() {
  const { favourites } = lifeContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch max-md:justify-start">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{favourites.heading}</h2>
            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{favourites.subheading}</div>
          </div>
        </div>
      </div>

      {/* ref .card-type-h-wrapper > .swiper.common-swiper */}
      <Carousel className="pt-14 max-md:pt-10">
        {favourites.items.map((item) => (
          <PortCardH key={item.title} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
