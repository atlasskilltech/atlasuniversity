import { learning } from '@/lib/internationalisationContent';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "World-Class Learning. Right Here. Right Now." — port of
 * `atlas-internationalisation.php:995-1035`
 * (`section.section > .container > (h2.h2-tag.mrg16, .sub-heading.mrgbtm,
 *   .center-image-full-wrap-atlas > .w-embed-youtubevideo > iframe)`).
 *
 * A heading, a lead and a YouTube embed in a `32px 0` clipped frame — the same
 * `.center-image-full-wrap-atlas` construction /advantages/atlas-career-services
 * "Career Connect" and /advantages/atlas-industry-centric-approach "Industry
 * Led Events on Campus" use, at the reference's own 56.17% padding ratio.
 *
 * The `.common-wrapper > .instagram-wrapper > .grid-gallery-flex` wall of eight
 * portrait cards that follows the embed is commented out upstream — 22 lines —
 * so it is absent here, and none of its images were downloaded.
 */
export default function WorldClassLearning() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{learning.heading}</h2>

        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{learning.subheading}</div>

        {/* ref .center-image-full-wrap-atlas > .w-embed-youtubevideo */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          <div className="relative pt-[56.17021276595745%]">
            <iframe
              src={learning.embed}
              title={learning.heading}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
