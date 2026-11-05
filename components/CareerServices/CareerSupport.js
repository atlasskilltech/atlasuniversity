import { careerServicesContent } from '@/lib/careerServicesContent';
import CareerSupportCard, { CAREER_CARD_ROW } from '@/components/ui/CareerSupportCard';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Our Career Support Services" — port of
 * `atlas-career-services.php:600-674` (`section.section > .container >
 * (.head-wrap > .tt-wrap > (h2.h2-tag.mrg16, .sub-heading.mrgbtm),
 *  .common-flex-26-wrap > 9 x .career-sup-card.ugdx)`).
 *
 * The same nine cards /success-stories-atlas carries, on the shared
 * `CareerSupportCard`. This page's titles are `.cr-title.isdi` — Poppins rather
 * than Manrope — which is the `poppins` variant, the same one
 * /advantages/atlas-advantages "Learning Without Borders" uses.
 */
export default function CareerSupport() {
  const { careerSupport } = careerServicesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
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
            <CareerSupportCard key={card.title} card={card} titleVariant="poppins" />
          ))}
        </div>
      </div>
    </section>
  );
}
