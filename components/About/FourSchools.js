import { fourSchools } from '@/lib/homeContent';
import SecondaryButton from '@/components/ui/SecondaryButton';
import SearchQuestion from '@/components/About/SearchQuestion';

/**
 * "Four Schools. One University. Infinite Possibilities." — port of
 * reference/index.php:1994-2053
 * (`div.section > .container > (h2.h2-tag.mrg16, .sub-heading,
 *   .atlas-cards-wrapper > (.atlas-cards-grid, more-questions.php))`).
 *
 * Not a carousel and not four plain cards: `.atlas-cards-grid` is a wrapping
 * flex row of four 50%-wide, 499px-tall `.atlas-square-card-a`s with **no gap**,
 * clipped by the grid's own `36px 0` radius so only the outer block is rounded.
 * Each card is a full-bleed photo with an absolutely-positioned overlay
 * covering its bottom 80%, carrying a transparent -> #261f5c gradient, the
 * school logo, its name and a "Know More" link. Below 768px the cards go
 * full width and the overlay's row flips to `column-reverse`, putting the
 * button above the logo and name. Nothing here is interactive beyond the links.
 *
 * The section also carries the shared chat panel after the grid — see
 * SearchQuestion.
 *
 * ── Measured off the reference ────────────────────────────────────────────
 *                        >=768px                <=767px
 *   section              60px padding           40px
 *   .atlas-cards-grid    mt 42, mb 12, wrap,    same
 *                        radius 36px 0, clipped
 *   .atlas-square-card-a 50% wide, 499px tall   100% wide
 *   .atlas-sq-content-a  bottom 0, height 80%,  padding 0 18 20
 *                        padding 0 32 40
 *   .common-flex.btm-…   row, space-between,    column-reverse,
 *                        items flex-end, gap 24 items flex-start
 *   .atlas-sq-title-a    24px/1.2               32px/1.2
 *   .secondary-btn       12px/700, #5cbdca,     14px, display flex
 *                        #000, radius 24
 */

function SchoolCard({ school }) {
  return (
    /* ref .atlas-square-card-a */
    <div className="relative w-1/2 flex-[0_auto] max-md:w-full">
      {/* ref .atlas-sq-image-a */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={school.image}
        srcSet={school.srcSet}
        sizes="100vw"
        alt={school.alt}
        loading="lazy"
        decoding="async"
        className="block h-[499px] w-full object-cover"
      />

      {/* ref .atlas-sq-content-a */}
      <div className="absolute inset-x-0 bottom-0 flex h-[80%] items-end justify-between bg-gradient-to-b from-[#261f5c00] to-[#261f5c] px-8 pb-10 max-md:px-[18px] max-md:pb-5">
        {/* ref .common-flex.btm-justify */}
        <div className="flex w-full flex-row items-end justify-between gap-6 text-white max-md:flex-col-reverse max-md:items-start">
          {/* ref .atlas-sq-cont-wrp-a — an unstyled block upstream */}
          <div>
            {/* ref .atlas-sq-logo — no CSS size, so each logo is intrinsic */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={school.logo.src}
              width={school.logo.width}
              height={school.logo.height}
              alt={school.logo.alt}
              loading="lazy"
              decoding="async"
              className="mb-[14px]"
            />

            {/* ref .atlas-sq-title-a */}
            <div className="text-2xl leading-[1.2] text-white max-md:text-[32px]">
              {school.title}
            </div>
          </div>

          {/* ref .atlas-sq-btn */}
          <div className="flex-none">
            <SecondaryButton href={school.href} variant="atlas">
              Know More
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FourSchools() {
  const { heading, subheading, schools } = fourSchools;

  return (
    /* ref div.section */
    <div className="block overflow-hidden py-[60px] max-md:py-10">
      {/* ref .container */}
      <div className="relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
        {/* ref .h2-tag.mrg16 */}
        <h2 className="mb-4 text-6xl font-medium text-[#1a1a1a] max-md:mb-2 max-md:text-5xl max-md:leading-[1.2]">
          {heading}
        </h2>

        {/* ref .sub-heading */}
        <div className="pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:py-0">
          {subheading}
        </div>

        {/* ref .atlas-cards-wrapper */}
        <div className="overflow-visible rounded-[32px]">
          {/* ref .atlas-cards-grid */}
          <div className="mb-3 mt-[42px] flex w-full flex-wrap items-start justify-start overflow-hidden rounded-tl-[36px] rounded-br-[36px]">
            {schools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>

          <SearchQuestion />
        </div>
      </div>
    </div>
  );
}
