import { cx } from '@/lib/cx';
import { SUB } from '../Home/ui';

/**
 * The small shapes /schools/isdi/success-stories/success-snapshot repeats. Each
 * measured on production at 1440 / 1280 / 991 / 768 / 479 / 390.
 */

export { CONTAINER, SECTION, H2, H2_MB, SUB, SUB_MRGBTM } from '../Home/ui';

/*
 * ref .common-wrapper — **pt50 at EVERY width**, and the rule is not this page's.
 * The sheet says 56 / 40 (<=767); `assets/include/header.php` — the ISDI header,
 * shared by every page of the school — carries
 * `.isdi-page .common-wrapper { padding-top: 50px }` in its inline `<style>`, which
 * is (0,2,0) and beats both. Measured 50 at 1440 / 768 / 390. Reading the sheet
 * alone was +6px on two blocks here.
 */
export const COMMON_WRAPPER = 'pt-[50px]';

/* ref .sub-heading-1 — 18px/1.8 300, pr50; 1.5 and pr0 at <=767 */
export const SUB_1 =
  'pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]';

/*
 * ref .sub-heading.mrg-tp-34 — 34px of top padding at EVERY width. The <=767 rule
 * that gives a plain `.sub-heading` `padding-top: 20px` is (0,1,0) and this is
 * (0,2,0), so the compound survives it; `pt-*` is emitted after `py-*` in Tailwind's
 * own order, so the two in one class list resolve the same way.
 */
export const SUB_MRG_TP_34 = cx(SUB, 'pt-[34px] max-md:pt-[34px]');

/* ref .blue-desc-wrap — flex, space-between, items-start, pt56; pt40 at <=767 and
   a gap-2 column at <=479 */
export const BLUE_DESC_WRAP =
  'flex items-start justify-between pt-14 max-md:pt-10 max-sm:flex-col max-sm:gap-2';

/*
 * ref .blue-desc-text — `flex: 1` (basis 0%), `min-width: auto` (the default, and
 * declared), `max-width: 100%`, 24px; 18px at <=767. NO `min-w-0`: the reference
 * floors it at its min-content, the trap `StatsBand` and `SummerSchool/Stats` record.
 *
 * **It declares no line-height, so it INHERITS one — and that is two values.** The
 * class sets only `font-size`, so in `.blue-desc-wrap` it takes the page's unitless
 * 1.5 (36px) and in Placements' `.sub-heading` it takes that class's 1.4 (33.6px).
 * A `text-2xl` here would pin 1.5 in both and cost 12px on the Placements lead —
 * hence the arbitrary `text-[24px]`, which sets no line-height at all.
 */
export const BLUE_DESC_TEXT = 'max-w-full flex-1 text-[24px] max-md:text-[18px]';

/* ref .blue-wrapper.isdi-blue-5 — #173a87, white, weight 300, pb56 (40 at <=767) */
export const BLUE_WRAPPER = 'bg-[#173a87] pb-14 font-light text-white max-md:pb-10';
