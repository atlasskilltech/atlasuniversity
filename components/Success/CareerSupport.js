import { successContent } from '@/lib/successContent';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Our Career Support Services" — port of `success-stories-atlas.php:644-718`
 * (`section.section > .container > (.head-wrap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading.mrgbtm), .common-flex-26-wrap >
 *   9 x .career-sup-card.ugdx)`).
 *
 * Nine cards in a centred wrapping row: photograph on top, indigo caption
 * block below carrying a title and a paragraph.
 *
 * The card is `components/ui/CareerSupportCard`, shared with
 * /advantages/atlas-advantages; this page's carries `.cr-title.white`, the
 * Manrope 32/500 title, and no circular badge.
 *
 * `.atlas-bg-1` and `.atlas-bg-2` are the same indigo with different vector
 * washes, both painted only by the stylesheet, so they travel as data. Both
 * files are the ones /campus-atlas already brought in locally.
 */
export default function CareerSupport() {
  const { careerSupport } = successContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{careerSupport.heading}</h2>

            {/* ref .sub-heading.mrgbtm */}
            <div className={SUB_INNER_MRGBTM}>{careerSupport.subheading}</div>
          </div>
        </div>

        {/* ref .common-flex-26-wrap */}
        <div className={CAREER_CARD_ROW}>
          {careerSupport.cards.map((card) => (
            <CareerSupportCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
