import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The small shapes /schools/isdi/atlas-isdi-advantage/industry-centric-approach
 * repeats. Each measured on production at 1440 / 1280 / 991 / 767 / 479 / 390.
 */

export { CONTAINER } from '../Home/ui';

/* ref .common-wrapper — pt50 at every width. The rule is `.isdi-page
   .common-wrapper` in the ISDI header.php's inline `<style>` (shared by every page
   of the school, not this page's own), which is (0,2,0) and beats the sheet's
   56 / 40 — the compound-over-media trap /atlas-isdi-advantage records. */
export const COMMON_WRAPPER = 'pt-[50px]';

/* ref .common-wrapper-lg — pt100 */
export const COMMON_WRAPPER_LG = 'pt-[100px]';

/* ref .sub-heading-1 — 18px/1.8 300, pr50; 1.5 and pr0 at <=767 */
export const SUB_1 =
  'pr-[50px] text-[18px] font-light leading-[1.8] max-md:pr-0 max-md:leading-[1.5]';

/* ref .sub-heading-1.mrgbtm — the same with 56px of bottom padding */
export const SUB_1_MRGBTM = cx(SUB_1, 'pb-14');

/* ref .head-wrap.mrgbtm — row, space-between, bottom-aligned, mb56; a stretched
   column with mb20 and `justify-content: flex-start` at <=767 */
export const HEAD_WRAP_MRGBTM =
  'mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start';

/* ref .tt-wrap — `flex: 0 1 auto` above 767, `margin-bottom: 20px` from 767 down
   and `margin-right: 20px` only from 479 down */
export const TT_WRAP = 'flex-initial max-md:mb-5 max-sm:mr-5';

/**
 * A `.sub-heading` whose copy mixes plain text and `<strong>`. A string stays a
 * string; the `<strong>` carries an explicit `font-bold`, because Preflight's
 * relative `bolder` resolves against the parent rather than being a flat 700.
 */
export function Runs({ value }) {
  if (value == null) return null;
  if (typeof value === 'string') return withBreaks(value);
  return value.map((run, i) =>
    run === null ? (
      <br key={i} />
    ) : typeof run === 'string' ? (
      <span key={i}>{run}</span>
    ) : (
      <strong key={i} className="font-bold">
        {run.strong}
      </strong>
    )
  );
}

/*
 * `.slide-wrap.extra-padding` — the logo marquee. The shape moved to
 * `components/Schools/ISDI/LogoStrip` when the Success Snapshot page turned out to
 * render it twice; `.extra-padding`'s padding-top is the base class's own 40px, so
 * the two instances are the same strip. Re-exported so this page's imports stand.
 */
export { default as LogoStrip } from '../LogoStrip';
