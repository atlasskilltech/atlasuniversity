import { entrepreneurshipContent } from '@/lib/entrepreneurshipContent';
import PhotoColumns from '@/components/ui/PhotoColumns';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * "All the backing you need – In One Place" — port of
 * `atlas-enterprenurship.php:547-590` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading.mrgbtm32, .grid-gallery-flex.sm.atlas >
 *  3 x .grid-column.sm > 2 x .inst-img-wrap)`).
 *
 * The frame is `components/ui/PhotoColumns`, shared with /campus-atlas
 * "A campus built to learn, live & thrive" — measured identical.
 *
 * Two of the six captions are empty in the reference, which paints only the
 * scrim over that photograph; rendered as authored.
 */
export default function Backing() {
  const { backing } = entrepreneurshipContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{backing.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm32 — a lead, not a heading */}
        <div className={SUB_H2_MRGBTM32}>{backing.subheading}</div>

        {/* ref .grid-gallery-flex.sm.atlas */}
        <PhotoColumns columns={backing.columns} />
      </div>
    </section>
  );
}
