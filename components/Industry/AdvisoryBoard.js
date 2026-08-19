import { advisors } from '@/lib/industryContent';
import Carousel from '@/components/Carousel/Carousel';
import AdvisorCard from '@/components/ui/AdvisorCard';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Steering Excellence, Guiding ATLAS" — port of
 * `atlas-industry-centric-approach.php:36-105`
 * (`section.section.extraspace > .container > (.head-wrap.top >
 *   (.tt-wrap > (h2.h2-tag.mrg16, .sub-heading.mrgbtm), a.btn-primary),
 *   .swiper.common-swiper.mrgtp0 > 6 x .card-type-d)`).
 *
 * Six of the fourteen advisors the homepage carousel shows, on the shared
 * `components/ui/AdvisorCard`.
 *
 * ── Not the homepage's section shell ──────────────────────────────────────
 * The cards are the same and the head-wrap is not, so this is its own section
 * rather than `components/Home/AdvisoryBoard` with a `data` prop:
 *
 *   homepage / about-us  `.head-wrap.mrgbtm32` — align-end, margin-bottom 32
 *   here                 `.head-wrap.top`      — align-start, no bottom
 *                                                margin; at <=767 a 16px gap
 *                                                and margin-bottom 16, and at
 *                                                <=479 `justify-content:
 *                                                space-around`
 *
 * and the lead is `.sub-heading.mrgbtm` (a trailing gap of 56px, 20 below
 * 992px) rather than the homepage's plain `.sub-heading`.
 *
 * `.section.extraspace` is `padding-top: 120px`, dropping to 40 below 768px —
 * the section's own padding, on top of `.section`'s 60/40.
 *
 * The button links to the full advisory-board page, which the reference writes
 * as `<?php echo $domain ?>advisory-board-industry-academia-leaders`.
 *
 * Three of the six author an `a.play-icon` with no `<img>` inside it, which
 * computes to 0x0 — so only three cards show a play button, even though a
 * fourth (Anant Goenka) still carries a `data-video`. The icon therefore
 * travels per person rather than once for the section.
 */
export default function AdvisoryBoard() {
  return (
    /* ref section.section.extraspace */
    <section className={`${SECTION} pt-[120px] max-md:pt-10`}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <div className="flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{advisors.heading}</h2>
            <div className={SUB_INNER_MRGBTM}>{advisors.subheading}</div>
          </div>

          {/* ref a.btn-primary on its `9df390f6…` (atlas) variant */}
          <PrimaryButton href={advisors.button.href}>{advisors.button.label}</PrimaryButton>
        </div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 — a sibling of .container so the
          track bleeds to the viewport edge */}
      <Carousel>
        {advisors.people.map((person) => (
          <AdvisorCard key={person.name} person={person} />
        ))}
      </Carousel>
    </section>
  );
}
