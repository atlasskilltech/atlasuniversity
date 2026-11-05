import { advantagesContent } from '@/lib/advantagesContent';
import TertiaryTabs from '@/components/ui/TertiaryTabs';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "Supporting You Every Step of the Way" — port of
 * `atlas-advantages.php:480-520` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading, .tertiary-tabs.mrgtp)`).
 *
 * The widget is `components/ui/TertiaryTabs`, shared with /life-at-atlas's
 * "Wellness is success" — measured identical in the strip, the panel, the
 * image and both text lines. This page's `.tr-cont-wrapper` carries no
 * `.atlas`, so the panel is square with `overflow: visible`, hence
 * `rounded={false}`.
 */
export default function SupportingYou() {
  const { support } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{support.heading}</h2>

        {/* ref h2.sub-heading — a lead, not a heading */}
        <div className={SUB_H2}>{support.subheading}</div>

        {/* ref .tertiary-tabs.mrgtp */}
        <TertiaryTabs
          tabs={support.tabs}
          label={support.heading}
          idPrefix="support"
          rounded={false}
        />
      </div>
    </section>
  );
}
