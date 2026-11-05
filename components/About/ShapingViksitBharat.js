import { aboutContent } from '@/lib/aboutContent';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Shaping a Viksit Bharat, Together" — port of `about-us.php:461-544`
 * (`section.section > (.container > (h2, .sub-heading), .shaping-wrapper >
 *   4x .card-content-b)`).
 *
 * Four full-bleed 50/50 rows that alternate: the `default` variant puts the
 * copy on the left, the `switch` variant puts it on the right. The heading pair
 * sits in a normal container; the rows themselves span the viewport — unlike
 * /campus-atlas, which renders the same rows inside its container. That is the
 * only difference between the two pages' use of `ContentCardB`, so the row is
 * shared and the wrapper stays here.
 */
export default function ShapingViksitBharat() {
  const { shaping } = aboutContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{shaping.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{shaping.subheading}</div>
      </div>

      {/* ref .shaping-wrapper */}
      <div className={SHAPING_WRAPPER}>
        {shaping.items.map((item) => (
          <ContentCardB key={item.title} item={item} />
        ))}
      </div>
    </section>
  );
}
