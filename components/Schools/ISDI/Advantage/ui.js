import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The small shapes /schools/isdi/atlas-isdi-advantage repeats across its nine
 * numbered sections. Each measured on production at 1440 / 768 / 390.
 */

/* ref .blue-wrapper.isdi-blue-5 — #173a87, white, weight 300, pb56 (40 at <=767).
   The same wrapper `About/IconSection` paints, but this page puts it inside a
   section that already carries its own `.icon-heading`, so it travels alone. */
export const BLUE_WRAPPER = 'bg-[#173a87] pb-14 font-light text-white max-md:pb-10';

/* ref .common-wrapper — pt50 */
export const COMMON_WRAPPER = 'pt-[50px]';

/* ref .common-wrapper-lg — pt100 */
export const COMMON_WRAPPER_LG = 'pt-[100px]';

/* ref .blue-desc-wrap — row, space-between, top-aligned, pt56; a column with an
   8px gap and pt40 at <=767 */
export const BLUE_DESC_WRAP =
  'flex items-start justify-between pt-14 max-md:pt-10 max-sm:flex-col max-sm:gap-2';

/* ref .sub-heading-1 — 18px/1.8 300, pr50; 1.5 and pr0 at <=767. The same face as
   `Home/ui`'s SUB_1_MRGBTM without that one's 56px of bottom padding. */
export const SUB_1 = 'pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]';

/*
 * ref .sub-heading.isdi-blue-text — `{ color: #011136; font-size: 18px; line-height: 1.7 }`.
 * It is a COMPOUND selector (0,2,0), so it survives the `@media (max-width: 767px)`
 * rule that takes a plain `.sub-heading` to 16px — the size and the ratio hold at every
 * width. Reading it as a recoloured `.sub-heading` was +37.6px above 768 and -138.9
 * below. The nth instance of that trap in this rebuild.
 *
 * The compound overrides the size, the ratio and the colour — and nothing else, so the
 * plain `.sub-heading`'s `@media (max-width: 767px) { padding: 20px 0 }` still applies.
 * Dropping that was a further -40px at 700.
 */
export const SUB_BLUE_TEXT =
  'pr-[50px] text-[18px] font-light leading-[1.7] text-[#011136] max-md:py-5 max-md:pr-0';

/* ref .blue-clr-text — 24px/1.5 #011136, at every width (no <=767 rule) */
export const BLUE_CLR_TEXT = 'text-[24px] leading-[1.5] text-[#011136]';

/* ref .h3-tag — 32px/1.2 500 white, mb32; 22px at <=767 */
export const H3_TAG = 'mb-8 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px]';

/* ref .head-wrap — row, space-between, bottom-aligned; a stretched column at <=767
   whose `.tt-wrap` then takes mr20 mb20 */
export const HEAD_WRAP =
  'flex items-end justify-between max-md:flex-col max-md:items-stretch';
export const TT_WRAP = 'max-md:mb-5 max-md:mr-5';

/**
 * `.slide-wrap` — the 5000px logo row Webflow interaction `a-22` drives: 2184px of
 * linear travel over 30s that snaps back and repeats, which is the project's
 * existing `animate-slide-wrap` keyframe.
 *
 * The two instances on this page carry different padding modifiers, measured at
 * every width (and the misspelling is the reference's own):
 *   .extra-padding     pt40 px40 pb20  -> 146 tall   (Industry Connect)
 *   .custom-paddning   pt56 px40 pb0   -> 129 tall   (Global Exposure)
 */
const PAD = { extra: 'px-10 pb-5 pt-10', custom: 'px-10 pb-0 pt-14' };

export function LogoStrip({ logos, pad = 'extra' }) {
  return (
    /* ref .slide-wrap.extra-padding / .slide-wrap.custom-paddning */
    <div className={cx('flex w-[5000px] animate-slide-wrap items-center will-change-transform motion-reduce:animate-none', PAD[pad])}>
      {logos.map((logo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${i}-${logo.src}`}
          src={logo.src}
          width={logo.width}
          height={logo.height}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className={cx('max-w-full align-middle', logo.spaced && 'mr-[200px] max-md:mr-20')}
        />
      ))}
    </div>
  );
}

/**
 * `.port-card-i-wrap.isdi` — the infrastructure card. A photograph with a pink plate
 * across its foot and the same triangular notch `../FacultyCard` uses, but a
 * different box, so it is its own shape:
 *
 *   card    324 x 400 at EVERY width, r16, #072058, clipped
 *   plate   absolute at the bottom, 324 x 76.8, p24, #ec1376
 *   label   `.port-card-i-text` 24px/1.2 white
 *   notch   29 x 24, 20px above the plate, 30px in, in the plate's colour
 *   image   324 x 400
 */
export function PortCardI({ card }) {
  return (
    /* ref .port-card-i-wrap.isdi */
    <div className="relative flex h-[400px] w-[324px] flex-none items-end justify-center overflow-hidden rounded-2xl bg-[#072058] text-white">
      {/* ref img.port-card-i-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full max-w-full object-cover align-middle"
      />

      {/* ref .port-card-i-txt-wrap.isdi */}
      <div className="absolute inset-x-0 bottom-0 flex items-end bg-[#ec1376] p-6">
        {/* ref .port-card-i-text */}
        <div className="text-[24px] leading-[1.2]">{withBreaks(card.text)}</div>

        {/* ref .port-card-i-arrow.isdi — the notch over the plate's top edge */}
        <div className="absolute -top-5 left-[30px] h-6 w-[29px] text-[#ec1376]">
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            aria-hidden="true"
            className="inline-block leading-none"
          >
            <path d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </div>
  );
}
