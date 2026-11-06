import GreenCard from './GreenCard';
import { COMMON_WRAPPER } from '@/components/ui/ContentCardB';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "Live where you learn. Grow where you stay." — `section#campus-green.section > .container >
 * (h2.h2-tag.mrg16, .black-desc-text, .common-wrapper > 4 x .card-content-b)`.
 *
 * The heading and lead are /campus-atlas's `GreenCampus` (same markup, same measured values:
 * `.black-desc-text` 24px/1.5 black, 18px at <=767); the four rows differ in copy, in media (all four
 * are photographs here) and in this page's card skin, so they render through `GreenCard`.
 */
export default function Sustainability({ green }) {
  return (
    /* ref section#campus-green.section */
    <section id={green.id} className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{green.heading}</h2>
        {/* ref .black-desc-text */}
        <div className="max-w-full text-2xl text-black max-md:text-lg">{green.subheading}</div>

        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          {green.cards.map((card, i) => (
            <GreenCard key={i} item={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
