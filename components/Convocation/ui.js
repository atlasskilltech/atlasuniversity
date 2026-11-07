/*
 * Shared class strings for /convocation — the reference's @theme tokens and css/styles.css
 * components restated as Tailwind utilities.
 *
 * Tokens: ink #0e0e33, ink-2 #17174a, gown #3434d1, gold #d6ae55, gold-light #efd592,
 * stole #f5f6fc, teal #10a8b6 (focus ring), radius-media .375rem, ease-expo cubic-bezier(0.16,1,0.3,1).
 *
 * Breakpoints: the reference is a Tailwind v4 browser-build page, so its `sm` (640) / `lg` (1024)
 * are this config's `n640` / `n1024`; `md` (768) and `xl` (1280) are the same. Its custom `desk:`
 * variant — `(min-width:1024px) and (orientation:landscape)` — is written out as the arbitrary
 * variant `[@media(min-width:1024px)_and_(orientation:landscape)]:` wherever it is used.
 *
 * In the reference `.wrap`, `.btn` & co. sit in `@layer components`, so any utility on the same
 * element overrides them. Here everything is a utility, so where a reference element overrides a
 * component value at the same breakpoint, the component part is left out of the class list (e.g.
 * buttons carry no display — it is set per use) or the override is marked important.
 */

export const DISPLAY = 'font-[CvDisplay,Georgia,serif]';
export const SANS = 'font-[CvSans,ui-sans-serif,system-ui,sans-serif]';

/* .wrap: one gutter system for every section */
export const WRAP = 'mx-auto w-full max-w-[90rem] px-4 n640:px-6 n1024:px-10';

/* @theme --text-display-* / --text-lead (size + line-height + letter-spacing) */
export const DISPLAY_XL = `${DISPLAY} [font-size:clamp(3.25rem,9vw,9rem)] leading-[0.92] tracking-[-0.02em]`;
export const DISPLAY_LG = `${DISPLAY} [font-size:clamp(2.5rem,5.4vw,5.5rem)] leading-[1.02] tracking-[-0.015em]`;
export const DISPLAY_MD = `${DISPLAY} [font-size:clamp(2rem,3.3vw,3.375rem)] leading-[1.06]`;
export const DISPLAY_SM = `${DISPLAY} [font-size:clamp(1.5rem,2.1vw,2.125rem)] leading-[1.15]`;
export const LEAD = '[font-size:clamp(1.0625rem,1.2vw,1.25rem)] leading-[1.6]';

/* v4 text-sm (0.875rem / 1.25rem) */
export const TEXT_SM = 'text-[0.875rem] leading-[1.25rem]';

/* .btn (display set per use) + size; .btn:not(.btn--sm) shrinks at <=479 */
const BTN_BASE =
  'items-center justify-center rounded-full font-semibold leading-none whitespace-nowrap will-change-transform [transition:background-color_.35s_cubic-bezier(0.16,1,0.3,1),color_.35s_cubic-bezier(0.16,1,0.3,1),border-color_.35s_cubic-bezier(0.16,1,0.3,1)] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:flex-none';
export const BTN = `${BTN_BASE} min-h-[3.25rem] gap-[0.625rem] px-[1.625rem] text-[0.9375rem] max-sm:min-h-[3rem] max-sm:gap-2 max-sm:px-[1.125rem] max-sm:text-[0.875rem]`;
export const BTN_SM = `${BTN_BASE} min-h-[2.5rem] gap-[0.625rem] px-[1.125rem] text-[0.875rem]`;
export const BTN_GOLD = 'bg-[#d6ae55] text-[#0e0e33] hover:bg-[#efd592]';
export const BTN_LINE = 'border border-[rgb(245_246_252/0.35)] text-[#f5f6fc] hover:border-[#f5f6fc] hover:bg-[#f5f6fc] hover:text-[#0e0e33]';
export const BTN_INK = 'bg-[#0e0e33] text-[#f5f6fc] hover:bg-[#3434d1]';
export const BTN_LINE_INK = 'border border-[rgb(14_14_51/0.25)] text-[#0e0e33] hover:border-[#0e0e33] hover:bg-[#0e0e33] hover:text-[#f5f6fc]';

/* .icon-btn (display set per use: `grid`) */
export const ICON_BTN =
  'h-12 w-12 place-items-center rounded-full border border-[rgb(245_246_252/0.25)] text-[#f5f6fc] [transition:background-color_.3s_ease,color_.3s_ease,border-color_.3s_ease] hover:border-[#f5f6fc] hover:bg-[#f5f6fc] hover:text-[#0e0e33] [&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]';

/* .play-badge */
export const PLAY_BADGE =
  'absolute grid place-items-center rounded-full bg-[#f5f6fc] text-[#0e0e33] [transition:transform_.5s_cubic-bezier(0.16,1,0.3,1),background-color_.3s_ease] [&_svg]:ml-[2px] [&_svg]:h-[0.875rem] [&_svg]:w-[0.875rem]';

export const MEDIA_RADIUS = 'rounded-[0.375rem]';

export function ArrowOut() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function PlayGlyph({ className }) {
  return (
    <svg viewBox="0 0 12 14" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 0l12 7-12 7z" />
    </svg>
  );
}
