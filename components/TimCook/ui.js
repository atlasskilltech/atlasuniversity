/*
 * Shared class strings for /timcook — the reference's assets/css/main.css component rules restated
 * as Tailwind utilities (its tokens: ink #07080a, ink-2 #0e1014, bone #f3f1ec, mist #a4a29d,
 * paper #eeeae2, sun #f4cf4a, line rgba(243,241,236,.12), ease-out cubic-bezier(0.22,1,0.36,1),
 * --gutter clamp(1.25rem,3vw,3rem) — set on the page root).
 *
 * The reference is authored with the Tailwind v4 browser build; its `sm` (640) and `lg` (1024) are
 * this config's `n640` / `n1024`, and v4's text-xs / text-sm carry 1rem / 1.25rem line-heights
 * where this config pins 1.5, so those are restated as arbitrary values.
 */

export const SANS = "font-[TcSans,ui-sans-serif,system-ui,-apple-system,'Segoe_UI',sans-serif]";
export const SERIF = 'font-[TcSerif,ui-serif,Georgia,serif] italic font-normal';
export const MONO = 'font-[TcMono,ui-monospace,SFMono-Regular,Menlo,monospace]';

/* .mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 */
export const CONTAINER = 'mx-auto max-w-[1440px] px-5 n640:px-8 n1024:px-12';

/* .section */
export const SECTION = 'py-[clamp(6rem,14vw,12rem)]';

/* .section-head (+ --dark) */
export const SECTION_HEAD = 'mb-[clamp(2.5rem,6vw,5rem)] flex items-center gap-4 border-b border-[rgba(243,241,236,.12)] pb-5';
export const SECTION_HEAD_DARK = 'mb-[clamp(2.5rem,6vw,5rem)] flex items-center gap-4 border-b border-[rgba(7,8,10,.14)] pb-5';

/* .eyebrow — without its display / alignment, which differ per use */
const EYEBROW_TYPE = `${MONO} text-[.72rem] uppercase tracking-[.2em]`;
export const EYEBROW = `inline-flex items-center gap-3 ${EYEBROW_TYPE} text-[#a4a29d]`;
export const EYEBROW_DARK = `inline-flex items-center gap-3 ${EYEBROW_TYPE} text-[rgba(7,8,10,.6)]`;
export const EYEBROW_HERO = `inline-flex items-start gap-3 ${EYEBROW_TYPE} leading-[1.8] text-[#a4a29d]`;
export const EYEBROW_FINALE = `flex items-center justify-center gap-3 ${EYEBROW_TYPE} text-[#a4a29d]`;
export const EYEBROW_NUM = 'text-[#f4cf4a]';
export const EYEBROW_NUM_DARK = 'text-[#9a7400]';

/* .display-2 / .display-3 */
export const DISPLAY_2 = '[font-size:clamp(2.6rem,7vw,7rem)] font-semibold leading-[.95] tracking-[-0.045em]';
export const DISPLAY_3 = '[font-size:clamp(2rem,4.2vw,4rem)] font-semibold leading-none tracking-[-0.04em]';
/* `.display-2 em` — serif italic 400, -0.02em */
export const EM = `${SERIF} tracking-[-0.02em]`;

/* .body-lg / .body */
export const BODY_LG = '[font-size:clamp(1.05rem,1.35vw,1.3rem)] leading-[1.6]';
export const BODY = 'text-[1rem] leading-[1.7]';

/* .link */
export const LINK =
  "relative text-[#f3f1ec] no-underline after:absolute after:inset-x-0 after:-bottom-[3px] after:h-px after:origin-left after:scale-x-[.25] after:bg-current after:opacity-50 after:content-[''] after:[transition:transform_.5s_cubic-bezier(0.22,1,0.36,1),opacity_.3s] hover:after:scale-x-100 hover:after:opacity-100 focus-visible:after:scale-x-100 focus-visible:after:opacity-100";

/* .btn-ghost (display set per use) */
export const BTN_GHOST =
  'items-center gap-2 rounded-full border border-[rgba(243,241,236,.22)] bg-[rgba(243,241,236,.03)] px-[1.1rem] py-[.65rem] text-[.85rem] text-[#f3f1ec] [transition:background_.3s,border-color_.3s,color_.3s] hover:border-[#f3f1ec] hover:bg-[#f3f1ec] hover:text-[#07080a]';

/* .reveal-frame (+ .leaf) */
export const FRAME = 'relative overflow-hidden rounded-[4px] bg-[#0e1014]';
export const FRAME_LEAF = 'relative overflow-hidden rounded-[17.7%_0_17.7%_0/31.4%_0_31.4%_0] bg-[#0e1014]';

/** A heading's runs: plain strings and `{ em }` serif-italic spans (the reference's `<em>`). */
export function Runs({ runs, emClassName = EM }) {
  return runs.map((r, i) => (typeof r === 'string' ? r : <em key={i} className={emClassName}>{r.em}</em>));
}
