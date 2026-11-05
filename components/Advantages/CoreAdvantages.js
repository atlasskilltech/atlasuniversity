import { advantagesContent } from '@/lib/advantagesContent';
import CoreCardSlider from '@/components/Advantages/CoreCardSlider';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "ATLAS's Core Advantages" — port of `atlas-advantages.php:44-169`
 * (`section.section > .container > (h2.h2-tag,
 *   .swiper.common-swiper-full.mrgtp0 > 9 x .core-cards.atlas)`).
 *
 * Nine hover-reveal cards on the shared `CoreCardSlider`. `.mrgtp0` removes the
 * `padding-top: 56` a plain `.common-swiper-full` would carry, which `Carousel`
 * never adds — so nothing extra is needed here.
 *
 * The heading shares its text with the homepage's "ATLAS's Core Advantages",
 * but that section is a different card entirely (`.atlas-card-type-b`: a
 * photograph with the copy laid over it, no hover), so the two are separate
 * components rather than one with a variant.
 */
export default function CoreAdvantages() {
  const { core } = advantagesContent;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag */}
        <h2 className={`mb-14 max-md:mb-8 ${H2}`}>{core.heading}</h2>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 — a sibling of .container, so
          the track bleeds to the viewport edge the way `overflow: visible` does */}
      <CoreCardSlider cards={core.cards} background={core.cardBackground} />
    </section>
  );
}
