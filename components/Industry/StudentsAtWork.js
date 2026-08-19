import { students } from '@/lib/industryContent';
import GridGallery from '@/components/ui/GridGallery';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Students at Work" — port of
 * `atlas-industry-centric-approach.php:1007-1021`
 * (`section.section > .container > (h2.h2-tag.mrgbtm0, .grid-gallery >
 *   8 x .grid-card-atlas)`).
 *
 * The shared `GridGallery` on its `atlas` card. None of the eight cards
 * authors a `.grid-txt-wrapper`, so the wall is photographs only — no names,
 * no captions.
 */
export default function StudentsAtWork() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgbtm0 */}
        <h2 className={`mb-0 ${H2}`}>{students.heading}</h2>

        {/* ref .grid-gallery */}
        <GridGallery cards={students.cards} variant="atlas" />
      </div>
    </section>
  );
}
