/**
 * ATLAS Hackathon 2026 — class strings shared by the register and success pages.
 *
 * register.php / success.php name these as classes (`card-panel`, `field-input`, `btn-primary`, …)
 * defined in their partials/header.php, which was not supplied. They are built from the landing page's
 * own vocabulary (index.html) so the three pages read as one site: the dark `panel` cards with a white/10
 * border, cyan focus, Saira Condensed uppercase labels, the yellow→fuchsia call-to-action gradient.
 * The reference's two custom utilities, `bg-grid` and `clip-tag`, are written out the same way the
 * landing page's are (components/Hackathon/Landing.js).
 */
export const BG_GRID =
  'bg-[linear-gradient(rgb(34_211_238/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(34_211_238/0.07)_1px,transparent_1px)] bg-[length:44px_44px]';
export const CLIP_TAG = '[clip-path:polygon(0_0,100%_0,calc(100%_-_14px)_100%,0_100%)]';

export const CARD_PANEL = 'rounded-3xl border border-white/10 bg-hk-panel p-5 n640:p-8';

export const FIELD_LABEL = 'mb-2 block font-hk-display text-[15px]/[20px] font-bold uppercase tracking-[0.12em] text-slate-300';
export const FIELD_INPUT =
  'block min-h-12 w-full rounded-xl border border-white/15 bg-hk-night/70 px-4 py-3 text-[16px]/[24px] text-white placeholder:text-slate-500 transition focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30';
export const FIELD_INVALID = 'border-rose-400/70 focus:border-rose-400 focus:ring-rose-400/30';
export const FIELD_HINT = 'mt-1.5 text-[14px]/[20px] text-slate-400';
export const FIELD_ERROR = 'mt-1.5 flex items-start gap-1.5 text-[14px]/[20px] font-medium text-rose-300';

export const BTN_PRIMARY =
  'group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-500 px-7 font-hk-display text-[20px]/[28px] font-extrabold uppercase tracking-wide text-hk-night shadow-[0_10px_40px_-10px_rgb(250_204_21/0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_rgb(217_70_239/0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-70';
export const BTN_GHOST =
  'inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-7 font-hk-display text-[20px]/[28px] font-bold uppercase tracking-wide text-white transition hover:border-cyan-300/60 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300';
