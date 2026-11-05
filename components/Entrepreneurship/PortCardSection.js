import Carousel from '@/components/Carousel/Carousel';
import PortCardM from '@/components/ui/PortCardM';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * The two `.port-card-m-wrap-atlas` carousels on
 * /advantages/atlas-enterprenurship:
 *
 *   "More Than a Degree: A Step-by-Step Venture Journey"  `:35`   6 cards
 *   "From Classroom Idea to IP: 8 Steps of IPR Enablement" `:375`  8 cards
 *
 * Both are `.swiper.common-swiper.mrgtp0` over the shared `PortCardM` — the
 * same card the homepage's "Industry on Campus" uses, minus its logo strip. So
 * one component takes the data and which sub-heading modifier the section
 * carries.
 *
 * The leads are `<h2 class="sub-heading …">` on both, which is why they use the
 * `SUB_H2_*` constants rather than `SUB_INNER_*`: Webflow's base sheet gives
 * every `h2` `margin: 20px 0 10px`.
 */
export default function PortCardSection({ data, lead = 'mrgbtm' }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm / .mrgbtm32 — a lead, not a heading */}
        <div className={lead === 'mrgbtm32' ? SUB_H2_MRGBTM32 : SUB_H2_MRGBTM}>
          {data.subheading}
        </div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 — a sibling of .container, so the
          track bleeds to the viewport edge the way `overflow: visible` does */}
      <Carousel>
        {data.cards.map((card) => (
          <PortCardM key={card.name} item={card} />
        ))}
      </Carousel>
    </section>
  );
}
