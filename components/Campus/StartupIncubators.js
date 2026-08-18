import { campusContent } from '@/lib/campusContent';
import SupportCard, { SUPPORT_CARD_ROW } from '@/components/Campus/SupportCard';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Startup Incubators" — port of `campus-atlas.php:222-249`
 * (`section#campus-spaces.section > .container > (.h2-tag,
 *   .common-flex-26-wrap > 3x .career-sup-card.ugdx)`).
 *
 * Heading with no sub-heading, so `.h2-tag` carries its own 56px trailing gap
 * (32px below 768px) rather than `.mrg16`'s 16px. The cards are the shared
 * `SupportCard`; these three have no `.cr-sub-desc.atlas` lead line.
 *
 * `id="campus-spaces"` is the reference's, but it authors that same id on four
 * separate sections. Duplicate ids are invalid, so it is kept only on the first
 * of them ("Purpose-Built for Holistic Learning") and dropped here.
 */
export default function StartupIncubators() {
  const { incubators } = campusContent;

  return (
    /* ref section#campus-spaces.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .h2-tag — a <div> upstream, promoted to the heading it is */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{incubators.heading}</h2>

        {/* ref .common-flex-26-wrap */}
        <div className={SUPPORT_CARD_ROW}>
          {incubators.cards.map((card) => (
            <SupportCard key={card.title.join(' ')} item={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
