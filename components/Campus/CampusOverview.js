import { campusContent } from '@/lib/campusContent';
import PhotoColumns from '@/components/ui/PhotoColumns';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "A campus built to learn, live & thrive" — port of
 * `campus-atlas.php:75-117` (`section#overview-campus.section > .container >
 * (h2.h2-tag, .grid-gallery-flex.sm.atlas > 3x .grid-column.sm >
 *  2x .inst-img-wrap)`).
 *
 * Six photographs in a clipped `32px 0` frame, each captioned over a scrim.
 * The frame is `components/ui/PhotoColumns`, shared with
 * /advantages/atlas-enterprenurship, which carries the measurements.
 */
export default function CampusOverview() {
  const { overview } = campusContent;

  return (
    /* ref section#overview-campus.section */
    <section id="overview-campus" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{overview.heading}</h2>

        {/* ref .grid-gallery-flex.sm.atlas */}
        <PhotoColumns columns={overview.columns} />
      </div>
    </section>
  );
}
