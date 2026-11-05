import { lifeContent } from '@/lib/lifeContent';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "The council members" — port of `life-at-atlas.php:477-544`
 * (`section.section > .container > (.head-wrap.top > (.tt-wrap,
 *   a.button-regular), .swiper.common-swiper > 5x .card-type-e)`).
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .head-wrap.top           row, space-between,         column, stretch,
 *                            align-start                 gap 16, margin-bottom
 *                                                        16 (space-around
 *                                                        below 480)
 */
export default function CouncilMembers() {
  const { councilMembers } = lifeContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{councilMembers.heading}</h2>
            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{councilMembers.subheading}</div>
          </div>

          {/* ref a.button-regular (atlas variant) */}
          <ButtonRegular href={councilMembers.action.href}>
            {councilMembers.action.label}
          </ButtonRegular>
        </div>
      </div>

      {/* ref .swiper.common-swiper */}
      <PeopleCarousel people={councilMembers.people} tone="atlas-blue" />
    </section>
  );
}
