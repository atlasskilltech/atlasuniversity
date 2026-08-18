import { successContent } from '@/lib/successContent';
import GridGallery from '@/components/ui/GridGallery';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Students at work" — port of `success-stories-atlas.php:309-357`
 * (`.section > .container > (h2.h2-tag.mrgtbm0, .grid-gallery.h2-tag >
 *   8 x .grid-card)`).
 *
 * The same wall as "Startups founded by ATLAS ISME Alumni", with two
 * differences the reference makes on purpose:
 *
 *  - the gallery itself carries `.h2-tag`, so it inherits that class's
 *    margins: `margin-top: 56px` from `.grid-gallery` wins above 768px and
 *    `.h2-tag`'s `margin-bottom: 32px` / `margin-top: 40px` apply below it;
 *  - two of the eight cards are a repeated pattern tile with an empty
 *    `.grid-txt-wrapper`, so they carry no name and no caption;
 *  - the caption is `.title-txt-grid2` (weight 400) rather than
 *    `.title-txt-grid` (500), and unlike its sibling it keeps 18px/32 all the
 *    way down — the 767px rule names only `.title-txt-grid`.
 *
 * The first card is a bare `.grid-card` with no size modifier, which is the
 * reference's own markup, not an omission.
 */
export default function StudentsAtWork() {
  const { students } = successContent;

  return (
    /* ref .section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgtbm0 */}
        <h2 className={`mb-0 ${H2}`}>{students.heading}</h2>

        {/* ref .grid-gallery.h2-tag */}
        <GridGallery
          cards={students.cards}
          className="max-md:mb-8"
          name="z-[3] text-xl font-bold leading-6 text-atlas-cyan"
          caption="z-[3] text-[18px] font-normal leading-8 text-white"
        />
      </div>
    </div>
  );
}
