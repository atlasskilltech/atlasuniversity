import { campusContent } from '@/lib/campusContent';
import ContentCardB, { SHAPING_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Fueling learning with the right resources" — port of
 * `campus-atlas.php:329-393` (`section#campus-spaces.section > .container >
 * (.h2-tag.mrg16, .sub-heading, .shaping-wrapper > 3x .card-content-b)`).
 *
 * The same in-container `.card-content-b` rows as "Purpose-Built for Holistic
 * Learning", three of them, all photographs.
 *
 * `id="campus-spaces"` is dropped here: the reference authors that id on four
 * sections and only the first keeps it.
 */
export default function LibraryResources() {
  const { library } = campusContent;

  return (
    /* ref section#campus-spaces.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{library.heading}</h2>
        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{library.subheading}</div>

        {/* ref .shaping-wrapper */}
        <div className={SHAPING_WRAPPER}>
          {library.cards.map((card) => (
            <ContentCardB key={card.title} item={card} mediaClassName="max-md:h-[220px]" />
          ))}
        </div>
      </div>
    </section>
  );
}
