import { advantagesContent } from '@/lib/advantagesContent';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Your Support System, Away from Home" — port of
 * `atlas-advantages.php:550-607` (`section.section >
 * .w-layout-blockcontainer.container > (h2.h2-tag.mrg16, .sub-heading,
 *  .swiper.common-swiper > 6 x .card-type-e)`).
 *
 * The same section /life-at-atlas carries, with the same six people, so it is
 * the shared `PeopleCarousel`. The one difference is the Webflow variant: this
 * page's cards are `atlas-blue` (a `#5cbdca` portrait ring, name at weight
 * 600) where /life-at-atlas's are `mint`.
 */
export default function SupportSystem() {
  const { people } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .w-layout-blockcontainer.container.w-container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{people.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{people.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper */}
      <PeopleCarousel people={people.people} tone="atlas-blue" />
    </section>
  );
}
