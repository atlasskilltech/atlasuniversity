import { lifeContent } from '@/lib/lifeContent';
import Carousel from '@/components/Carousel/Carousel';
import PortCardH from '@/components/ui/PortCardH';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Win on and off the field" — port of `life-at-atlas.php:386-463`
 * (`section#sports.section > .container > (.h2-tag.mrg16, .black-desc-text,
 *   .swiper.common-swiper > 4x .port-card-h-wrap.atlas)`).
 *
 * A plain `.common-swiper`, so it is the shared `Carousel`; the card is the
 * shared `PortCardH`, the same one /campus-atlas uses for "Food on Campus".
 * `.common-swiper` carries `padding-top: 56px`, 40 below 768px.
 *
 * Unlike "Student favourites" further down the page, the strip here has no
 * `.card-type-h-wrapper` around it — which changes nothing, that wrapper is
 * `padding-top: 0`.
 */
export default function SportsFacilities() {
  const { sports } = lifeContent;

  return (
    /* ref section#sports.section */
    <section id="sports" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{sports.heading}</h2>
        {/* ref .black-desc-text */}
        <div className="max-w-full flex-1 text-2xl text-black max-md:text-lg">{sports.text}</div>
      </div>

      {/* ref .swiper.common-swiper */}
      <Carousel className="pt-14 max-md:pt-10">
        {sports.items.map((item) => (
          <PortCardH key={item.title} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
