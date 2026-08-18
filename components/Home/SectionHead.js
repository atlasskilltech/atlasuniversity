/**
 * The `.head-wrap` / `.container` scaffolding shared by most homepage
 * sections, and the two heading shapes the reference uses:
 *
 *   `h2.h2-tag.mrg42`  — heading only, 42px below   (leadership, advantages)
 *   `.head-wrap.mrgbtm32 > .tt-wrap > (h2.h2-tag.mrg16, .sub-heading)`
 *                      — heading + sub-heading      (advisory, news)
 *
 * Measured responsive cascade (identical to the programme sections):
 *   section    60px padding >=768px, 40px below
 *   container  1366 max-w, 62 / 30 (<=991) / 22 (<=767) inset
 *   h2         44px/1.2 >=768px, 36px below
 *   sub        24px/1.4 + 50px right pad >=768px; 16px/1.5 + 20px vertical
 *              pad at 480-767; no vertical pad <=479
 */

/* ref .container */
export const CONTAINER =
  'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

/* ref .section */
export const SECTION = 'block overflow-hidden py-[60px] max-md:py-10';

/* ref .h2-tag — `position: relative` on all three references; the mrg*
   modifier supplies the bottom margin */
export const H2 =
  'relative text-6xl font-medium text-[#1a1a1a] max-md:text-5xl max-md:leading-[1.2]';

/* ref .sub-heading */
export const SUB =
  'pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:py-0';

/*
 * The same `.sub-heading`, as the inner pages' stylesheets define it. Identical
 * to `SUB` except at <=479px: index.php's sheet zeroes the vertical padding
 * there, about-us.php's and campus-atlas.php's keep the 20px. Measured on all
 * three references — this is a real difference between the sheets, not a
 * per-page override, so the constants are separate rather than parameterised.
 */
export const SUB_INNER =
  'pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5]';

/*
 * `.sub-heading.mrgbtm` — the same sub-heading with a trailing gap:
 *   >=992  padding-bottom 56      <=767  padding 0, margin-bottom 20
 *   >=768  padding-bottom 20      <=479  padding-bottom 20
 */
export const SUB_INNER_MRGBTM =
  'pb-14 pr-[50px] text-2xl font-light leading-[1.4] max-lg:pb-5 ' +
  'max-md:mb-5 max-md:pb-0 max-md:pt-0 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:pb-5';

/**
 * `.head-wrap.mrgbtm32 > .tt-wrap` — heading above a sub-heading.
 * `children` render as the head-wrap's second flex child, which is where the
 * reference puts a section-level button when it has one.
 */
export default function SectionHead({ heading, subheading, children }) {
  return (
    /* ref .head-wrap.mrgbtm32 */
    <div className="mb-8 flex items-end justify-between max-md:flex-col max-md:justify-start max-md:items-stretch max-sm:mb-0">
      {/* ref .tt-wrap */}
      <div className="max-md:mb-5 max-sm:mr-5">
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>
        {subheading && <div className={SUB}>{subheading}</div>}
      </div>
      {children}
    </div>
  );
}
