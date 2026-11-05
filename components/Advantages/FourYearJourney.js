import { advantagesContent } from '@/lib/advantagesContent';
import CoreCardSlider from '@/components/Advantages/CoreCardSlider';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "The 4 Year Journey to Success" — port of `atlas-advantages.php:975-1045`
 * (`section.section > .container > (h2.h2-tag.mrg16, .sub-heading.mrgbtm,
 *   .swiper.common-swiper-full.mrgtp0 > 4 x .core-cards.atlas)`).
 *
 * /advantages/atlas-enterprenurship repeats this section verbatim
 * (`atlas-enterprenurship.php:250-320`) — same four cards, same copy, same
 * images — so it takes `data` and that page passes its own transcription.
 *
 * The same hover-reveal card as "ATLAS's Core Advantages", on the same shared
 * `CoreCardSlider`. The only difference is `.size-big` on both text lines —
 * 54px title over 24px body instead of 36/16 — which the two `<style>` blocks
 * embedded in the page leave untouched, so the hover behaviour is identical.
 */
export default function FourYearJourney({ data = advantagesContent.journey }) {
  const journey = data;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{journey.heading}</h2>
        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{journey.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 */}
      <CoreCardSlider cards={journey.cards} background={journey.cardBackground} size="big" />
    </section>
  );
}
