import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import { CONTAINER, SECTION, H2, SUB_H2_MRGBTM, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * The six identical `.card-type-f` carousels on
 * /advantages/atlas-industry-centric-approach — a heading, a lead and a
 * bleeding strip of partner-logo cards:
 *
 *   "Industry Projects & Capstones"   `:460`  6 cards
 *   "Industry Visits"                 `:512`  7 cards
 *   "Bootcamp"                        `:571`  6 cards, `.mrgbtm32` lead
 *   "Industry Mentorship Program"     `:623`  6 cards
 *   "Leadership Series"               `:838`  6 cards
 *   "Future Skills"                   `:890`  6 cards
 *
 * Each is `section.section > .container > (h2.h2-tag.mrg16,
 * h2.sub-heading.mrgbtm, .swiper.common-swiper.mrgtp-0 > N x .card-type-f)`.
 * Only the copy, the cards and — on "Bootcamp" alone — the lead's modifier
 * differ, so one component takes all six.
 *
 * `.mrgtp-0` zeroes `.common-swiper`'s top padding; the reference's own
 * `padding-top: 56px` (40 below 768px) is therefore not applied. Bullets
 * appear below 568px, which is `Carousel`'s own behaviour.
 *
 * `.sub-heading.mrgbtm32` is weight 400 with a 32px trailing gap, against
 * `.mrgbtm`'s weight 300 and 56px — a real difference, not a spacing tweak,
 * hence the two constants rather than a margin override.
 */
export default function PartnerCardSection({ data, wide, id }) {
  return (
    /* ref section.section */
    <section id={id} className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{data.heading}</h2>

        {/* ref h2.sub-heading.mrgbtm / .mrgbtm32 — a lead, not a heading */}
        <div className={wide ? SUB_H2_MRGBTM32 : SUB_H2_MRGBTM}>{data.subheading}</div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp-0 — a sibling of .container so the
          track bleeds to the viewport edge */}
      <Carousel>
        {data.cards.map((card, index) => (
          <CardTypeF key={`${card.image.src}-${index}`} card={card} />
        ))}
      </Carousel>
    </section>
  );
}
