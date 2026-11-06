import SupportCard, { SUPPORT_CARD_ROW } from '@/components/ui/SupportCard';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import AccessibilityMosaic from './AccessibilityMosaic';

/**
 * "Live Where You Learn" — `section#campus-housing.section > .container > (.h2-tag.mrg16,
 * .sub-heading.mrgbtm, .center-image-full-wrap-atlas, .common-wrapper > .common-flex-26-wrap,
 * #differently-abled)`.
 *
 * The same markup as /campus-atlas's `LiveWhereYouLearn` down to the residence cards (shared
 * `SupportCard`), but it embeds a different YouTube video and closes with a four-cell accessibility
 * band where that section has the eight-cell housing mosaic, so it composes the same pieces here
 * rather than adding a mode to the finished section.
 *
 *   .center-image-full-wrap-atlas   radius 32 0, clipped; the frame's ratio is the reference's own
 *                                   inline `padding-top: 56.17021276595745%`
 */
export default function Housing({ housing, cards }) {
  return (
    /* ref section#campus-housing.section */
    <section id={housing.id} className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag.mrg16 (a div upstream; rendered as the section heading) */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{housing.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{housing.subheading}</div>

        {/* ref .center-image-full-wrap-atlas > .w-embed-youtubevideo */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          <div className="relative pt-[56.17021276595745%]">
            <iframe
              src={housing.embed}
              title={housing.embedTitle}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>

        {/* ref .common-wrapper > .common-flex-26-wrap */}
        <div className={COMMON_WRAPPER}>
          <div className={SUPPORT_CARD_ROW}>
            {cards.map((card) => (
              <SupportCard key={card.title.join(' ')} item={card} />
            ))}
          </div>
        </div>

        <AccessibilityMosaic id={housing.mosaicId} cells={housing.mosaic} />
      </div>
    </section>
  );
}
