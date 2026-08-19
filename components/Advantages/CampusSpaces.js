import { advantagesContent } from '@/lib/advantagesContent';
import PhotoMosaic from '@/components/ui/PhotoMosaic';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "A Place to Learn, Grow, Create, and Belong" — port of
 * `atlas-advantages.php:193-236` (`section.section > .container >
 * (h2.h2-tag.mrg16, h2.sub-heading, .bl-card-wrapper-isme > the eight-cell
 *  mosaic)`).
 *
 * The mosaic is `components/ui/PhotoMosaic`, shared with /campus-atlas and
 * /life-at-atlas — identical in every grid property. It differs here in one
 * respect only: `.bl-card-wrapper-isme` carries no `.atlas`, so the wrapper is
 * square and each cell rounds itself instead (every `.img-N` here carries
 * `.atlas`, which is where the 32px corners live). Hence `rounded="cell"`.
 */
export default function CampusSpaces() {
  const { campus } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{campus.heading}</h2>

        {/* ref h2.sub-heading — rendered as a <div>, it is a lead not a heading */}
        <div className={SUB_H2}>{campus.subheading}</div>

        {/* ref .bl-card-wrapper-isme */}
        <PhotoMosaic cells={campus.mosaic} rounded="cell" />
      </div>
    </section>
  );
}
