import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The card shapes Life@ATLAS ISDI introduces, and the two wrappers its
 * `.icon-heading` sections use that `About/IconSection` does not own.
 *
 * Everything here was measured on production at 1440 / 768 / 390.
 */

/* ref `.blue-desc-text` — the lead inside a `.blue-wrapper.isdi-blue-5`.
   24px dropping to 18 at <=767, and `flex: 1; max-width: 100%` because it is a
   flex child of `.blue-desc-wrap`: without the `flex-1` it would size to its
   max-content and wrap differently.
   `.f18` is the Student Council variant — 18px at EVERY width (a compound
   selector beats the <=767 rule) and, unlike the base class, it declares its own
   `line-height: 1.8` rather than inheriting the page's 1.5. That 5.4px a line is
   worth 26.5px on the council lead alone. */
export const BLUE_DESC = 'max-w-full flex-1 text-2xl leading-[1.5] text-white max-md:text-[18px]';
export const BLUE_DESC_F18 = 'max-w-full flex-1 text-[18px] leading-[1.8] text-white';

/* ref `.black-desc-text` — the lead inside a `.white-wrapper`. The class declares
   `color: #000`, not the page's #1a1a1a. */
export const BLACK_DESC = 'max-w-full flex-1 text-2xl leading-[1.5] text-black max-md:text-[18px]';

/* ref `.blue-desc-wrap` / `.white-desc-wrap` — the row the lead sits in, and the
   reason four blocks measured 56px short before it was rendered. Both are
   `display: flex; justify-content: space-between; align-items: flex-start` with
   `padding-top: 56px` and no bottom padding; only the colour differs.
   The breakpoints are NOT the same pair: the blue wrap goes to 40px of top
   padding at <=767 and turns into an 8px-gap column at <=479, while the white one
   goes to 20px AND becomes a 10px-gap column at <=767, tightening to 8px at <=479.
   `.mrgbtm` on the white wrap is `margin-bottom: 56px` at every width. */
export const BLUE_DESC_WRAP =
  'flex items-start justify-between pt-14 text-white max-md:pt-10 max-sm:flex-col max-sm:gap-2';
export const WHITE_DESC_WRAP =
  'flex items-start justify-between pt-14 text-black max-md:flex-col max-md:gap-2.5 max-md:pt-5 max-sm:gap-2';
export const WHITE_DESC_WRAP_MB = `${WHITE_DESC_WRAP} mb-14`;

/**
 * ref `.square-card-a.isdi` — the Student Clubs card.
 *
 *   .square-card-a        612 wide (100% at <=767), relative; `.isdi` r16 + clipped
 *   img.sq-image-a        NOT DECLARED in any of the three sheets — so the
 *                         photograph is the project's own `inline-block;
 *                         max-width: 100%` reset at its INTRINSIC width, which the
 *                         srcset gives as 611w inside a 612px card. Forcing
 *                         `w-full` on it scales the card 612/611 and made the
 *                         whole carousel 0.8px tall.
 *   .sq-content-a         the bottom HALF under `linear-gradient(#18429f00, #000)`,
 *                         space-between row, bottom-aligned, pb40 px32
 *                         (pb20 px18 at <=767)
 *   .common-flex.center   gap 24, wrap, space-between, centred — and
 *                         COLUMN-REVERSE at <=767, where the mark sits above the
 *                         title rather than beside it
 *   .sq-title-a           40px/1.2 white (32 at <=767)
 *   .sq-sb-title-a.white  24px/1.4 white (18 at <=767) — the base class is the mint
 *                         `--primary-color-isme`, which `.white` overrides
 *   img.sq-rt-img-a       the club mark, `flex: 0 auto` (grow 0, SHRINK 1), intrinsic
 */
export function SquareCardA({ card }) {
  return (
    /* ref .square-card-a.isdi */
    /* `.square-card-a` is `width: 100%` below 768, and at <=568 the slide it sits
       in is `width: 100%` of the SWIPER — which is inside `.container`, so 44px
       narrower than the viewport. Our track bleeds, so the container width has to
       be restated, exactly as `Home/Electives` already does. */
    <div className="relative w-[612px] overflow-hidden rounded-2xl max-md:w-full max-mcm:w-[calc(100vw-44px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
      />
      {/* ref .sq-content-a */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-between bg-[linear-gradient(#18429f00,#000)] px-8 pb-10 max-md:px-[18px] max-md:pb-5">
        {/* ref .common-flex.center */}
        <div className="flex w-full flex-wrap items-center justify-between gap-6 max-md:flex-col-reverse max-md:items-start">
          {/* ref .sq-cont-wrp-a */}
          <div>
            {/* ref .sq-title-a */}
            <div className="text-[40px] leading-[1.2] text-white max-md:text-[32px]">
              {card.title}
            </div>
            {/* ref .sq-sb-title-a.white — the Stage card's subtitle carries an
                authored `<br>` ("Society for Talent Generation<br>& Entertainment") */}
            <div className="text-2xl leading-[1.4] text-white max-md:text-[18px]">
              {withBreaks(card.subtitle)}
            </div>
          </div>
          {/* ref img.sq-rt-img-a */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.logo.src}
            alt={card.logo.alt}
            loading="lazy"
            decoding="async"
            className="max-w-full flex-initial align-middle"
          />
        </div>
      </div>
    </div>
  );
}

/* ref `.prod-card-f-blue-txt-wrap.<tone>` and its arrow — the only two tones */
const F_TONE = { blue: 'bg-[#173a87]', pink: 'bg-[#ec1376]' };
const F_ARROW = { blue: 'text-[#173a87]', pink: 'text-[#ec1376]' };

/**
 * ref `.port-card-f-wrap.isdi` — the Sports card, and the ONE shape on this page
 * that no existing component already renders.
 *
 *   .port-card-f-wrap        295 x 519, `flex: none`, #072058, clipped, relative;
 *                            `.isdi` adds r16
 *   img.port-card-f-image    `width: 100%; height: auto`, cover, centred
 *   .prod-card-f-blue-txt-wrap  the plate: absolute at the bottom, full width,
 *                            padding 24, bottom-aligned row, #173a87 / #ec1376
 *   .port-card-f-detail      `flex: none`, width 100%, relative
 *   .prod-card-f-text.isdi   24px/1.2 500 white (the base is mint and 700)
 *   .prod-card-f-course      18px/1.5 400 white, pt10
 *   .prod-card-f-blue-arrow  the notch: absolute, top -20, left 30, coloured to
 *                            match the plate, holding a 29x21 triangle
 */
export function PortCardF({ card }) {
  const tone = F_TONE[card.tone] ?? F_TONE.blue;
  return (
    /* ref .port-card-f-wrap.isdi */
    <div className="relative h-[519px] w-[295px] flex-none overflow-hidden rounded-2xl bg-[#072058]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="mx-auto block h-auto w-full object-cover"
      />
      {/* ref .prod-card-f-blue-txt-wrap.<tone> */}
      <div className={cx('absolute inset-x-0 bottom-0 flex w-full items-end p-6', tone)}>
        {/* ref .port-card-f-detail */}
        <div className="relative w-full flex-none">
          {/* ref .prod-card-f-text.isdi */}
          <div className="text-2xl font-medium leading-[1.2] text-white">{card.title}</div>
          {/* ref .prod-card-f-course */}
          <div className="pt-2.5 text-[18px] font-normal leading-[1.5] text-white">
            {card.note}
          </div>
        </div>
        {/* ref .prod-card-f-blue-arrow.<tone> — the notch above the plate's left edge */}
        <div className={cx('absolute -top-5 left-[30px] w-full', F_ARROW[card.tone] ?? F_ARROW.blue)}>
          {/* ref .svg-icon-triangle */}
          <div className="inline-block w-full leading-none">
            <svg width="29" height="21" viewBox="0 0 29 21" fill="none" aria-hidden="true">
              <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
