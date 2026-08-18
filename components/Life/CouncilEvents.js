import { lifeContent } from '@/lib/lifeContent';
import SupportCard, { SUPPORT_CARD_ROW } from '@/components/ui/SupportCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Events organized by the Student Council" — port of
 * `life-at-atlas.php:545-573` (`section.section > .container > (h2.h2-tag.mrg16,
 * .sub-heading.mrgbtm, .common-flex-26-wrap > 3x .career-sup-card.ugdx)`).
 *
 * The cards are the shared `SupportCard` — the same `.career-sup-card.ugdx`
 * /campus-atlas uses for "Startup Incubators" and both pages use for their
 * residences — with this section's own three photographs and copy.
 */
export default function CouncilEvents() {
  const { councilEvents } = lifeContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{councilEvents.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{councilEvents.subheading}</div>

        {/* ref .common-flex-26-wrap */}
        <div className={SUPPORT_CARD_ROW}>
          {councilEvents.cards.map((card) => (
            <SupportCard key={card.title.join(' ')} item={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
