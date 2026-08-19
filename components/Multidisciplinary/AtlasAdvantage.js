import { advantage } from '@/lib/multidisciplinaryContent';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "The ATLAS Advantage: Redefining Education for a New Era" — port of
 * `atlas-multidisciplinary.php:37-69`
 * (`section.section > .container > (.head-wrap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading.mrgbtm), .common-flex-26-wrap >
 *   3 x .career-sup-card.ugdx)`).
 *
 * Three cards on the shared `components/ui/CareerSupportCard`, which carries
 * the measurements. The title here is `.cr-title.atlas` — the base
 * `.cr-title` (Manrope 32/500, 24px below 768px) recoloured white, which is
 * exactly what the `manrope` variant already renders for
 * /success-stories-atlas's `.cr-title.white`. There is no badge on these three.
 *
 * The two indigo washes are `.css-content-wrapper.atlas-bg-1/-2`, the same pair
 * /advantages/atlas-advantages "Learning Without Borders" uses; they are
 * painted only by the stylesheet, so they travel as data.
 *
 * `.head-wrap` here is the plain one — no `.top`, no second slot.
 */
export default function AtlasAdvantage() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          <div className="max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{advantage.heading}</h2>
            {/* ref .sub-heading.mrgbtm */}
            <div className={SUB_INNER_MRGBTM}>{advantage.subheading}</div>
          </div>
        </div>

        {/* ref .common-flex-26-wrap */}
        <div className={CAREER_CARD_ROW}>
          {advantage.cards.map((card) => (
            <CareerSupportCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
