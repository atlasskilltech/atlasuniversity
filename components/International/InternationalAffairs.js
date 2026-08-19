import { affairs } from '@/lib/internationalisationContent';
import PeopleCarousel from '@/components/Life/PeopleCarousel';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Office of International Affairs" — port of
 * `atlas-internationalisation.php:1589-1635`
 * (`section.section > .container > .head-wrap > .tt-wrap >
 *   (h2.h2-tag.mrg16, .sub-heading, .swiper.common-swiper >
 *    3 x .card-type-e.swiper-slide)`).
 *
 * The shared `PeopleCarousel` on its `atlas-blue` variant — a #5cbdca portrait
 * ring with the name at weight 600, which is what the card's
 * `w-variant-b965d5e8…` on `.cd-tye-image-wrap` selects. Identical to the
 * carousels /life-at-atlas, /advantages/atlas-advantages and
 * /advantages/atlas-career-services already render.
 *
 * ── The slider is inside the `.tt-wrap`, not beside `.container` ──────────
 * This is the only carousel in the rebuild that is not a sibling of
 * `.container`: the reference nests it as the third child of `.tt-wrap`,
 * under the heading and the lead. So it does not bleed to the viewport edge,
 * and `.tt-wrap` — a `flex: 0 auto` item — is sized by it:
 *
 *              >=768px                          <=767px
 *   .head-wrap row, space-between, align-end    column, stretch
 *   .tt-wrap   798 = the three 242px cards      the container width
 *              plus their 24px gaps, held
 *              there by `min-width: auto`
 *   .swiper    padding-top 56, overflow visible padding-top 40
 *
 * At 768-830px the three cards therefore run past the viewport and are clipped
 * by `.section { overflow: hidden }` — the reference's own arithmetic.
 * `md:w-max` reproduces the 798 without naming it, and `bleed={false}` stops
 * `Carousel` adding the container inset a second time.
 *
 * A fourth `.card-type-e` is commented out upstream — 8 lines — so three
 * people render, not four. Autoplay is stopped by the page's own trailing
 * script, which reaches `.common-swiper` as well as the three
 * `.common-swiper-full`s.
 */
export default function InternationalAffairs() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap — `flex: 0 auto`, so above 768px it is as wide as the
              carousel's own max-content and no wider */}
          <div className="md:w-max max-md:mb-5 max-sm:mr-5">
            {/* ref h2.h2-tag.mrg16 */}
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{affairs.heading}</h2>
            {/* ref .sub-heading */}
            <div className={SUB_INNER}>{affairs.subheading}</div>

            {/* ref .swiper.common-swiper */}
            <PeopleCarousel people={affairs.people} tone="atlas-blue" autoplay={false} bleed={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
