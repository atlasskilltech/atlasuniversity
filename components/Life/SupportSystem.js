import { lifeContent } from '@/lib/lifeContent';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Your Support System, Away from Home" — port of `life-at-atlas.php:742-799`
 * (`div.section > .container > (.h2-tag.mrg16, .sub-heading,
 *   .swiper.common-swiper > 6x .card-type-e)`).
 *
 * The same `.card-type-e` carousel as "The council members"; this instance
 * carries the second Webflow variant, which paints the portrait ring
 * `#07f6a0` instead of `#5cbdca` and sets the name to weight 700.
 *
 * A `<div class="section">` upstream rather than a `<section>`, and its
 * container is Webflow's `.w-layout-blockcontainer.container.w-container`,
 * which measures the same as every other `.container` on the page.
 */
export default function SupportSystem() {
  const { support } = lifeContent;

  return (
    /* ref div.section */
    <div className={SECTION}>
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{support.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{support.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper */}
      <PeopleCarousel people={support.people} tone="mint" />
    </div>
  );
}
