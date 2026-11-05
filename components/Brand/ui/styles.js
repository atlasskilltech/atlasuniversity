/*
 * Class strings shared across components/Brand. Transcribed from the reference's own Tailwind
 * (reference/brand/*.html, Play CDN): its `sm` / `lg` are the stock 640 / 1024, which are this
 * project's `n640` / `n1024`; `md` / `xl` are equal. Colours are the `brand.*` tokens.
 */

/* ref `mx-auto max-w-page px-4 sm:px-6 lg:px-10` (max-w-page = 84rem) */
export const PAGE = 'mx-auto w-full max-w-[84rem] px-4 n640:px-6 n1024:px-10';
export const SECTION_Y = 'py-16 n640:py-20';

/* ref section headings */
export const H2 = 'text-3xl font-extrabold leading-[1.15] tracking-tight text-brand-indigo n640:text-4xl';
export const H3 = 'text-xl font-bold text-brand-indigo';
export const LEAD = 'mt-4 leading-relaxed';

/* ref .bg-checker — the transparency grid behind logos */
export const CHECKER = 'bg-white [background-image:repeating-conic-gradient(#DFDFDF_0_25%,transparent_0_50%)] [background-size:16px_16px]';

/* stage backgrounds a logo preview can take (ref BG_CLASSES) */
export const STAGE_BG = { light: 'bg-brand-paper', dark: 'bg-brand-indigo', checker: CHECKER };
/* the product green tile (ref GREEN_STAGE) */
export const GREEN_STAGE = { background: 'linear-gradient(160deg,#59BF96 0%,#1BA27E 100%)' };

/* form controls used by the tools (ref inputs / selects) */
export const FIELD =
  'mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm text-brand-ink ring-1 ring-inset ring-brand-line focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal';
export const SELECT =
  'mt-1.5 block w-full rounded-lg border-0 bg-brand-paper px-3 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal';
export const LABEL = 'block text-xs font-semibold text-brand-ink';
export const TEXTAREA =
  'block w-full resize-y rounded-xl border-0 bg-brand-paper p-4 text-sm leading-relaxed text-brand-ink ring-1 ring-inset ring-brand-line focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal';
export const MONO_TEXTAREA = `${TEXTAREA} font-mono text-xs`;
export const CARD = 'rounded-2xl bg-white p-5 ring-1 ring-brand-line n640:p-6';

/* buttons (ref) */
export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-lg border-0 bg-brand-indigo px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-teal focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-indigo';
export const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-indigo';
export const BTN_SECONDARY =
  'inline-flex items-center justify-center gap-2 rounded-lg border-0 bg-transparent px-4 py-2.5 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-indigo/30 transition hover:bg-brand-indigo hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-indigo';
export const BTN_SMALL =
  'inline-flex items-center gap-1.5 rounded-lg border-0 bg-transparent px-3 py-1.5 text-xs font-bold text-brand-indigo ring-1 ring-brand-line transition hover:bg-brand-indigo hover:text-white';

/* status line colours (ref setStatus kinds) */
export const STATUS = { err: 'text-brand-ugdx', ok: 'text-brand-teal', '': 'text-brand-ink' };
