/*
 * The Bootstrap 4.6 + Bootstrap 3.4.1 cascade the lp23/24/25 pages render under, restated as
 * Tailwind strings. Upstream loads BOTH frameworks (BS4 locally, then BS3 from a CDN), and what
 * the measurements show is the sum of the two:
 *
 *   .container   BS3's fixed `width` capped by BS4's `max-width` -> 540 / 720 / 960 / 1140 at
 *                576 / 768 / 992 / 1200, 15px gutters. Non-overlapping ranges, because arbitrary
 *                media variants are not emitted in min-width order.
 *   clearfix     every BS3 `.container` carries `::before/::after { display: table }`, so a child's
 *                margin never collapses through it — `flow-root` here.
 *   .row / .col  BS4 flex row (-15px), cols `position: relative; width: 100%; padding 0 15px;
 *                min-height: 1px` (the BS3 min-height is why an empty image column is a 1px strip
 *                below 992), `flex: 0 0 N/12` from the column's breakpoint up.
 *   html         BS3 sets `font-size: 10px`, so every BS4 rem value is 10px-based (card padding
 *                12.5px, `.mt-3` 10px, `.mt-4` 15px).
 *   body         'Montserrat', sans-serif (no such face is loaded — see lib/landing/lp2x/fonts.js),
 *                14px / 1.42857, #333.
 *   h1-h3        margin 20px 0 10px, h4 10px 0 10px, line-height 1.1; p margin 0 0 10px (BS3).
 */
export const FONT_M = "font-['Montserrat',sans-serif]";
export const FONT_MXB = 'font-[family-name:var(--font-lp2x-mxb)]';
export const FONT_R = 'font-[family-name:var(--font-lp2x-roboto),var(--font-lp2x-roboto-ext),sans-serif]';

export const CONTAINER =
  'mx-auto flow-root w-full px-[15px] [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:max-w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:max-w-[960px] [@media(min-width:1200px)]:max-w-[1140px]';

/* a `.container` nested inside another with `.p-0`: BS3's fixed width still applies (750 / 970 /
   1170, capped by BS4's max-width), so from 768 up it is WIDER than its parent's content box and
   overflows it to the right, as upstream (section11) */
export const CONTAINER_NESTED =
  'flow-root w-full p-0 [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:w-[960px] [@media(min-width:1200px)]:w-[1140px]';

export const ROW = '-mx-[15px] flex flex-wrap';
/* a column's box without its gutters, for the columns that restate their own padding (two padding
   utilities in one class list are resolved by stylesheet order, not by the order written) */
export const COL_BOX = 'relative min-h-[1px] w-full';
export const COL = `${COL_BOX} px-[15px]`;

/* `col-md-N` (BS4 flex from 768; BS3's floats from 992 resolve to the same width) */
export const MD = {
  3: 'md:max-w-[25%] md:flex-[0_0_25%]',
  4: 'md:max-w-[33.333333%] md:flex-[0_0_33.333333%]',
  5: 'md:max-w-[41.666667%] md:flex-[0_0_41.666667%]',
  6: 'md:max-w-[50%] md:flex-[0_0_50%]',
  7: 'md:max-w-[58.333333%] md:flex-[0_0_58.333333%]',
  8: 'md:max-w-[66.666667%] md:flex-[0_0_66.666667%]',
  9: 'md:max-w-[75%] md:flex-[0_0_75%]',
  12: 'md:max-w-full md:flex-[0_0_100%]',
};
/* `col-lg-N` (992 up) */
export const LG = {
  4: 'lg:max-w-[33.333333%] lg:flex-[0_0_33.333333%]',
  5: 'lg:max-w-[41.666667%] lg:flex-[0_0_41.666667%]',
  7: 'lg:max-w-[58.333333%] lg:flex-[0_0_58.333333%]',
  8: 'lg:max-w-[66.666667%] lg:flex-[0_0_66.666667%]',
};

/* the outlined display heading every band uses: transparent fill, 1.2px white stroke, 800, -2px */
export const OUTLINE =
  "font-['Montserrat',sans-serif] font-extrabold leading-none tracking-[-2px] text-transparent [-webkit-text-stroke:1.2px_#fff]";

/* `h2.section6-heading1` / `.section11-heading1` (Montserrat-ExtraBold, synthetic-bolded) */
export const KICKER = `${FONT_MXB} my-[10px] text-[30px] font-extrabold leading-[1.1] text-white max-md:text-[24px]`;
