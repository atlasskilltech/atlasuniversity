import { lifeContent } from '@/lib/lifeContent';
import TertiaryTabs from '@/components/ui/TertiaryTabs';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Wellness is success" — port of `life-at-atlas.php:672-712`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading,
 *   .tertiary-tabs.mrgtp > (.tertiary-tabs-menu.mrg-tab,
 *   .tertiary-tabs-content > 3x .tr-cont-wrapper.atlas))`).
 *
 * The widget itself is `components/ui/TertiaryTabs`, shared with
 * /advantages/atlas-advantages; this page's panels carry `.atlas`, which is
 * the rounded variant.
 */
export default function WellnessTabs() {
  const { wellness } = lifeContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{wellness.heading}</h2>
        {/* ref h2.sub-heading — rendered as a <div>, it is not a heading */}
        <div className="mb-2.5 mt-5 pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5]">
          {wellness.subheading}
        </div>

        {/* ref .tertiary-tabs.mrgtp */}
        <TertiaryTabs tabs={wellness.tabs} label={wellness.heading} idPrefix="wellness" />
      </div>
    </section>
  );
}
