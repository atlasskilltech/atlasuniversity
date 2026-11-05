/*
 * Shared scaffolding for the /advantages/partnership/* pages.
 *
 * These pages are Webflow markup that ALSO loads the Tailwind Play CDN. Because the markup uses
 * Webflow's `.container` class, Tailwind generates its own `.container` rule for it, and that rule
 * (later in the cascade) replaces Webflow's `max-width: 1366px` with Tailwind's ladder:
 *   100% <640 · 640 · 768 (>=768) · 1024 (>=1024) · 1280 (>=1280) · 1536 (>=1536)
 * Webflow's padding (62 / 30 at <=991 / 22 at <=767) and `margin: 0 auto` still apply. Measured on
 * production collaborative-projects at 1920 / 1440 / 1100 / 992 / 900 / 768 / 568 / 390 — e.g. the
 * content box is 644px at x=174 at 992. Approximating it with `max-w-7xl` is right only from 1280.
 */
export const TW_CONTAINER =
  'relative z-[1] mx-auto w-full px-[62px] max-lg:px-[30px] max-md:px-[22px] ' +
  'n640:max-w-[640px] md:max-w-[768px] n1024:max-w-[1024px] xl:max-w-[1280px] ' +
  '[@media(min-width:1536px)]:max-w-[1536px]';

/* ref .section — 60px vertical padding, 40 at <=767, clipped */
export const WF_SECTION = 'block overflow-hidden py-[60px] max-md:py-10';

/*
 * ref `.head-wrap > .tt-wrap > (h2.h2-tag.mrg16, .sub-heading.mrgbtm)`:
 *   .head-wrap   flex, space-between, items-end; column + stretch at <=767
 *   .tt-wrap     margin-bottom 20 at <=767, + margin-right 20 at <=479
 *   .h2-tag.mrg16  44px/1.2 500 #1a1a1a, mb 16; 36px and mb 8 at <=767
 */
export const HEAD_WRAP = 'flex items-end justify-between max-md:flex-col max-md:items-stretch';
export const TT_WRAP = 'max-md:mb-5 max-sm:mr-5 max-sm:flex-[0_auto]';
export const H2_MRG16 =
  'relative mb-4 mt-0 text-[44px] font-medium leading-[1.2] text-[#1a1a1a] max-md:mb-2 max-md:text-[36px]';

/*
 * ref `.head-wrap.top` — row, items-start; at <=767 a column with a 16px gap, stretch and a 16px
 * bottom margin (space-around at <=479, which a single child cannot show).
 */
export const HEAD_WRAP_TOP =
  'flex items-start justify-between max-md:mb-4 max-md:flex-col max-md:items-stretch max-md:gap-4 max-sm:justify-around';
