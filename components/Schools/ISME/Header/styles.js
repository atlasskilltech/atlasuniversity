
/**
 * ISME header skin — the shared school header (components/Schools/ISDI/Header) with ISME's
 * measurements. Everything not overridden here is the ISDI string, because the two references
 * are the same Webflow chassis. Every override was measured with getComputedStyle on
 * https://atlasuniversity.edu.in/schools/isme/ (1440 / 991 / 390, menus opened and hovered):
 *
 *   font            Manrope (`body-isme`), not Poppins — the project's own body face, so ROOT
 *                   drops the ISDI font class and inherits it
 *   utility bar     #009FE0 (`.top-menu-bar` without ISDI's `.isdi-bg`) — `atlas.blue`
 *   nav underline   8px #07F6A0 (`atlas.mint`) instead of ISDI pink
 *   row hover       #07F6A0 background, padding 5/10, weight 600, text stays #2B2B2B, the row's
 *                   arrow inverted — ISDI's is pink, white text, weight 500
 *   level 1         386px floor (470 / 390 on the `.ht-1` / `.ht-2` menus); ISDI's is 600
 *   level 3         420px (the sheet's default); the BBA list is `.level-3.bba-lvl-3` → 600px
 *   Apply / Continue  `responsive-mint`: #07F6A0 / black 12px/600; on phones the Apply pill is
 *                   white, 12px/12, 32px tall
 *
 * Whole literal class strings, so the Tailwind scanner sees each one.
 */

export * from '@/components/Schools/ISDI/Header/styles';

// ref .header over `body.body-isme` — Manrope (the body face), #333
export const ROOT = 'w-full text-[#333] max-lg:h-auto max-lg:overflow-auto max-md:block';

// ref .top-menu-bar — #009FE0
export const TOPBAR_INNER =
  'relative flex justify-end items-end text-right bg-atlas-blue pl-10 pr-5 ' +
  'max-lg:flex-col max-lg:justify-start max-lg:items-stretch max-lg:text-left max-lg:px-0 ' +
  'max-md:items-start';

// ref .text-link + the mint 8px underline from the ISME header's inline <style>
const TEXT_LINK_BASE =
  'relative flex flex-[0_auto] justify-start items-center gap-2 p-4 ' +
  'text-white cursor-pointer no-underline ' +
  'after:absolute after:left-0 after:-bottom-1 after:h-2 after:w-full after:z-[1] ' +
  "after:bg-atlas-mint after:hidden lg:group-hover/nav:after:block lg:after:content-[''] " +
  'max-lg:flex-1 max-lg:justify-between max-lg:px-8 max-lg:text-black ' +
  'max-lg:border-b max-lg:border-b-[#eee] max-md:text-sm';

export const NAV_TRIGGER = TEXT_LINK_BASE + ' w-auto text-start bg-transparent border-0 max-lg:w-full';
export const NAV_PLAIN_LINK = TEXT_LINK_BASE;

// ref ul.level-1 — `min-height: 386px`; `.level-1.ht-1` 470px and `.ht-2` 390px (the ISME sheet)
export const LEVEL_1 =
  'relative flex flex-col flex-none justify-start items-stretch w-1/4 min-h-[386px] ' +
  'm-0 py-8 pl-8 pr-0 list-none bg-white border-r border-r-[#2b2b2b1a] shadow-level-1 ' +
  'max-lg:w-full max-lg:p-0';
export const LEVEL_1_BY_PANEL = {
  ht1:
    'relative flex flex-col flex-none justify-start items-stretch w-1/4 min-h-[470px] ' +
    'm-0 py-8 pl-8 pr-0 list-none bg-white border-r border-r-[#2b2b2b1a] shadow-level-1 ' +
    'max-lg:w-full max-lg:p-0',
  ht2:
    'relative flex flex-col flex-none justify-start items-stretch w-1/4 min-h-[390px] ' +
    'm-0 py-8 pl-8 pr-0 list-none bg-white border-r border-r-[#2b2b2b1a] shadow-level-1 ' +
    'max-lg:w-full max-lg:p-0',
};

// ref ul.level-3 — 420px from the sheet; `.bba-lvl-3` is 600px
export const LEVEL_3 =
  'hidden absolute top-0 left-full z-[1] flex-none w-[420px] h-full m-0 p-8 list-none ' +
  'bg-atlas-panel shadow-level-3 backdrop-blur-[54px] ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'max-lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full ' +
  'max-lg:p-0 max-lg:bg-white max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';
export const LEVEL_3_WIDE =
  'hidden absolute top-0 left-full z-[1] flex-none w-[600px] h-full m-0 p-8 list-none ' +
  'bg-atlas-panel shadow-level-3 backdrop-blur-[54px] ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'max-lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full ' +
  'max-lg:p-0 max-lg:bg-white max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

const LINK =
  'flex flex-row items-center gap-[5px] mb-0 py-[5px] no-underline cursor-pointer ' +
  'text-atlas-ink transition-all duration-200 ' +
  'max-lg:w-full max-lg:px-4 max-lg:py-3.5 max-lg:text-sm max-lg:bg-white ' +
  'max-lg:border-b max-lg:border-b-[#ddd]';

// ref `.level-N-item:hover .level-N-link { padding: 5px 10px; background: #07F6A0; font-weight: 600 }`
export const LINK_BY_LEVEL = {
  1: `${LINK} bg-white lg:group-hover/l1:px-2.5 lg:group-hover/l1:bg-atlas-mint lg:group-hover/l1:font-semibold`,
  2: `${LINK} max-w-full bg-transparent lg:group-hover/l2:px-2.5 lg:group-hover/l2:bg-atlas-mint lg:group-hover/l2:font-semibold`,
  3: `${LINK} max-w-full bg-transparent lg:group-hover/l3:px-2.5 lg:group-hover/l3:bg-atlas-mint lg:group-hover/l3:font-semibold`,
};

// ref header.php: `.mega-menus .sub-nav .link-arrow { opacity: 0 }`, shown and inverted while its
// row is hovered (ISDI's is always visible and turns white). The drawer below 992 shows it.
const ARROW = 'block w-[22px] max-w-full transition-[filter,opacity] duration-200 lg:opacity-0';
export const ARROW_BY_LEVEL = {
  1: `${ARROW} lg:group-hover/l1:opacity-100 lg:group-hover/l1:invert`,
  2: `${ARROW} lg:group-hover/l2:opacity-100 lg:group-hover/l2:invert`,
  3: `${ARROW} lg:group-hover/l3:opacity-100 lg:group-hover/l3:invert`,
};

// ref .secondary-btn.w-variant-e18fe969… ("responsive-mint") — #07F6A0, black 12px/600
export const BTN_PINK =
  'flex-none block rounded-3xl px-4 py-2.5 text-xs font-semibold no-underline ' +
  'text-black bg-atlas-mint';
export const BTN_PINK_RESPONSIVE =
  BTN_PINK +
  ' max-md:flex max-md:justify-center max-md:items-center max-md:bg-white max-md:leading-3';

