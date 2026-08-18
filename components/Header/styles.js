/**
 * Tailwind class strings for the header, kept in one place so every repeated
 * element (12 utility links, 20 menu links, ...) is byte-identical.
 *
 * Each constant is annotated with the reference rule it reproduces
 * (reference/assets/include/header.php + the Webflow page CSS).
 */

/* ── top utility bar ─────────────────────────────────────────────────────── */

// ref .topnavbar { height:48px } + @media(min-width:992px){ position:fixed; top:0; z-index:1100 }
export const TOPBAR =
  'h-topbar transition-all duration-500 ease-wf ' +
  'lg:fixed lg:top-0 lg:left-0 lg:w-full lg:z-1100 ' +
  'max-lg:h-auto max-lg:transition-opacity ' +
  'max-md:static max-md:block max-md:w-full max-md:m-0';

export const TOPBAR_RETRACTED = 'lg:-translate-y-full lg:pointer-events-none';

// ref .top-menu-bar.atlas-bg -> background-color:#000
export const TOPBAR_INNER =
  'relative flex justify-end items-end text-right bg-black pl-10 pr-5 ' +
  'max-lg:flex-col max-lg:justify-start max-lg:items-stretch max-lg:text-left max-lg:px-0 ' +
  'max-md:items-start';

// ref .tp-links
export const TP_LINK =
  'flex justify-start items-center text-white py-[15px] px-3 text-xs no-underline ' +
  'max-lg:justify-between max-lg:w-full max-lg:pl-8 max-lg:pr-[26px] max-lg:text-sm ' +
  'max-lg:border-b max-lg:border-b-[#ffffff4d] ' +
  'max-md:flex-[0_auto] max-md:text-left max-md:border-t max-md:border-t-[#eeeeee66]';

// ref .icon-link-mob { display:none } + @media(max-width:767px){ display:block }
export const TP_ICON = 'hidden max-md:block';

/* ── main bar ────────────────────────────────────────────────────────────── */

// ref .second-header-wrapper { height:156px } + @media(min-width:992px){ position:fixed; top:48px; z-index:1090 }
export const MAINBAR =
  'h-mainbar overflow-visible transition-all duration-500 ease-wf ' +
  'lg:fixed lg:left-0 lg:w-full lg:z-1090 ' +
  'max-lg:h-auto max-lg:pt-0 ' +
  'max-md:block max-md:w-full';

export const MAINBAR_RETRACTED = 'lg:-translate-y-[105%] lg:pointer-events-none';

// ref .logo-container
export const LOGO_BAR =
  'flex justify-start items-center gap-8 px-[30px] py-6 ' +
  'bg-[#0000004d] backdrop-blur-[5px] ' +
  'max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-100 max-lg:w-full max-lg:h-logobar ' +
  'max-md:gap-2.5 max-md:backdrop-blur-[10px] max-md:py-0 max-md:pl-2.5 max-md:pr-5 ' +
  'max-sm:gap-[5px]';

// ref .hamburger-menu — hidden on desktop, 24x24 content-box + 10px padding on mobile
export const HAMBURGER =
  'flex-none p-2.5 hidden box-content max-lg:block max-lg:w-6 max-lg:h-6 cursor-pointer';

// ref .hamb-close-icon — revealed by `.show`
export const CLOSE_ICON = 'box-content w-6 h-6 p-2.5 hidden cursor-pointer';

export const LOGO_WRAP = 'flex-none leading-[0]';
export const LOGO_LINK = 'flex-none order-none block w-auto max-w-none leading-[0] no-underline';
export const LOGO_IMG = 'flex-none w-auto block max-lg:w-[150px] max-md:w-full';

// ref form.search-br — the flex spacer that pushes the CTAs right
export const SEARCH_SPACER = 'flex-1 m-0 flex relative max-md:h-[38px] max-md:hidden';

// ref .logo-btn-wrap
export const CTA_WRAP =
  'flex-none flex gap-8 max-md:z-11 max-md:static max-md:w-auto max-md:ml-auto max-md:text-left';
// ref .logo-btn-wrap.hide-btn -> display:none only at <=767px
export const CTA_WRAP_HIDDEN = 'flex-none flex gap-8 max-md:hidden';

// ref .secondary-btn:where(.w-variant-25d04a90-…) -> atlas variant
export const BTN_CYAN =
  'flex-none block rounded-3xl px-4 py-2.5 text-xs font-bold no-underline ' +
  'text-black bg-atlas-cyan transition-colors duration-300 hover:opacity-90';
export const BTN_CYAN_RESPONSIVE =
  BTN_CYAN +
  ' max-md:flex max-md:justify-center max-md:items-center max-md:h-auto max-md:text-sm max-md:text-left';

// ref .secondary-btn:where(.w-variant-71409380-…) -> transparent-bg variant
export const BTN_OUTLINE =
  'flex-none block rounded-3xl px-[15px] py-2 text-xs font-semibold no-underline ' +
  'text-white bg-transparent border border-white ' +
  'transition-colors duration-300 hover:bg-white hover:text-black';

/* ── menu container / drawer ─────────────────────────────────────────────── */

// ref drawer CSS: fixed / left:-100% / h:100vh / pt:80 / pb:72 / opacity:0
export const MENU_CONTAINER =
  'max-lg:fixed max-lg:top-0 max-lg:w-full max-lg:h-screen ' +
  'max-lg:bg-white max-lg:pt-20 max-lg:pb-18 max-lg:overflow-auto ' +
  'max-lg:transition-all max-lg:duration-200 max-lg:ease-in';
export const MENU_CONTAINER_CLOSED = 'max-lg:-left-full max-lg:-z-[1] max-lg:opacity-0';
export const MENU_CONTAINER_OPEN = 'max-lg:left-0 max-lg:z-10 max-lg:opacity-100';

// ref .mega-menus.atlas-menu
export const MEGA_MENU =
  'relative flex justify-around items-stretch overflow-visible ' +
  'bg-[#0000004d] backdrop-blur-[5px] border-t border-t-[#ffffff4d] ' +
  'max-lg:flex-col max-lg:justify-start max-lg:items-stretch max-lg:bg-white ' +
  'max-lg:border-t-0 max-lg:backdrop-filter-none max-lg:pt-0 max-lg:z-[1] ' +
  'max-lg:transition-opacity max-lg:duration-200';

/* ── nav items ───────────────────────────────────────────────────────────── */

/*
 * ref .nav-link { position: static } — this matters. The sub-nav is
 * `position:absolute`, so its containing block must be `.mega-menus`
 * (position:relative). Making the wrapper relative shrinks the panel to the
 * width of a single nav item.
 */
export const NAV_ITEM =
  'group/nav static flex flex-[0_auto] items-center gap-2 p-0 text-white bg-transparent ' +
  'max-lg:block max-lg:justify-start max-lg:items-start';

// ref .text-link + the hover underline from the header's inline <style>
const TEXT_LINK_BASE =
  'relative flex flex-[0_auto] justify-start items-center gap-2 p-4 ' +
  'text-white cursor-pointer no-underline ' +
  "after:absolute after:left-0 after:-bottom-1 after:h-2 after:w-full after:z-[1] " +
  "after:bg-atlas-teal after:hidden lg:group-hover/nav:after:block lg:after:content-[''] ";

export const NAV_TRIGGER =
  TEXT_LINK_BASE +
  'w-auto text-left bg-transparent border-0 ' +
  'max-lg:flex max-lg:w-full max-lg:flex-1 max-lg:justify-between max-lg:px-8 ' +
  'max-lg:text-black max-lg:border-b max-lg:border-b-[#eee] ' +
  'max-md:items-center max-md:text-sm';

export const NAV_PLAIN_LINK =
  TEXT_LINK_BASE +
  'max-lg:flex-1 max-lg:justify-between max-lg:px-8 max-lg:text-black ' +
  'max-lg:border-b max-lg:border-b-[#eee] max-md:text-sm';

// ref .nav-arrow — inverted on mobile, rotated to a chevron on phones
export const NAV_ARROW = 'transition-transform duration-300 max-lg:invert max-md:-rotate-90';
export const NAV_ARROW_OPEN = 'lg:-rotate-180';

/* ── sub-nav panels ──────────────────────────────────────────────────────── */

/*
 * Level-1 panel. On mobile it is offset to y=80 so the injected drawer header
 * is not buried under the fixed 80px logo bar (the logo bar deliberately stays
 * on top so the close button is always reachable).
 */
export const SUBNAV =
  'hidden absolute top-full left-0 z-0 w-full h-auto bg-white overflow-hidden ' +
  'lg:transition-[opacity,visibility] lg:duration-300 ' +
  'max-lg:block max-lg:fixed max-lg:top-20 max-lg:left-0 max-lg:w-full ' +
  'max-lg:h-[calc(100vh-80px)] max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

export const PANEL_CLOSED =
  'lg:opacity-0 lg:invisible ' +
  'max-lg:-translate-x-[101%] max-lg:opacity-0 max-lg:pointer-events-none max-lg:z-10';
export const SUBNAV_OPEN =
  'lg:flex lg:opacity-100 lg:visible ' +
  'max-lg:translate-x-0 max-lg:opacity-100 max-lg:pointer-events-auto max-lg:z-[100]';

// ref ul.level-1
export const LEVEL_1 =
  'relative flex flex-col flex-none justify-start items-stretch w-1/4 h-auto min-h-[330px] ' +
  'm-0 pt-8 pb-8 pl-8 pr-0 list-none bg-white border-r border-r-[#2b2b2b1a] shadow-level-1 ' +
  'max-lg:w-full max-lg:min-h-0 max-lg:p-0 max-lg:shadow-none max-lg:border-r-0';

export const LEVEL_1_ITEM =
  'group/l1 flex static text-left text-atlas-ink mb-2 list-none max-lg:mb-0';
// the reference's empty <li>: an 8px gap on desktop, collapsed on mobile
export const LEVEL_1_SPACER =
  'flex static text-left text-atlas-ink mb-2 list-none max-lg:mb-0 max-lg:hidden';

export const LEVEL_1_LINK =
  'flex flex-row items-center gap-[5px] mb-0 py-[5px] no-underline cursor-pointer ' +
  'text-atlas-ink bg-white transition-all duration-200 ' +
  'lg:group-hover/l1:px-2.5 lg:group-hover/l1:bg-atlas-teal ' +
  'lg:group-hover/l1:text-white lg:group-hover/l1:font-medium ' +
  'max-lg:w-full max-lg:px-4 max-lg:py-3.5 max-lg:text-sm max-lg:border-b max-lg:border-b-[#ddd]';

export const TEXT_LNK = 'flex-none font-normal no-underline max-lg:pointer-events-none';

// ref .link-arrow { width:22px } — white glyph, so it only becomes visible on
// hover, when the row turns teal. Reproduced as-is.
export const LINK_ARROW =
  'w-[22px] transition-[filter,opacity] duration-200 ' +
  'lg:group-hover/l1:brightness-0 lg:group-hover/l1:invert';
export const LINK_ARROW_L2 =
  'w-[22px] transition-[filter,opacity] duration-200 ' +
  'lg:group-hover/l2:brightness-0 lg:group-hover/l2:invert';

/*
 * ref ul.level-2 (inline <style> in header.php):
 *   position:absolute; inset:0 auto auto 100%; width:330px; background:#f5f5f5
 * On mobile it sits at top:0 of its already-offset, transformed parent panel.
 */
export const LEVEL_2 =
  'hidden absolute top-0 left-full z-[1] flex-none w-[330px] h-full mb-0 ' +
  'pt-8 pb-8 pl-8 pr-0 list-none bg-atlas-panel ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'max-lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full ' +
  'max-lg:p-0 max-lg:bg-white max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

export const LEVEL_2_OPEN =
  'lg:block lg:opacity-100 lg:visible ' +
  'max-lg:translate-x-0 max-lg:opacity-100 max-lg:pointer-events-auto max-lg:z-[100]';

export const LEVEL_2_ITEM = 'group/l2 flex font-normal mb-2 max-lg:mb-0';

export const LEVEL_2_LINK =
  'flex flex-row items-center gap-[5px] mb-0 py-[5px] no-underline cursor-pointer ' +
  'text-atlas-ink bg-transparent transition-all duration-200 ' +
  'lg:group-hover/l2:px-2.5 lg:group-hover/l2:bg-atlas-teal ' +
  'lg:group-hover/l2:text-white lg:group-hover/l2:font-medium ' +
  'max-lg:w-full max-lg:px-4 max-lg:py-3.5 max-lg:text-sm max-lg:bg-white ' +
  'max-lg:border-b max-lg:border-b-[#ddd]';

// ref .nav-image-container
export const NAV_IMAGE_WRAP =
  'absolute top-0 right-0 bottom-auto left-auto flex-1 w-3/4 h-full mr-0 p-8 ' +
  'bg-atlas-panel shadow-nav-image max-lg:hidden';
export const NAV_IMAGE = 'object-cover w-full h-full block';

/* ── mobile drawer chrome ────────────────────────────────────────────────── */

// ref .drawer-header (generated by JS in the reference)
export const DRAWER_HEADER =
  'sticky top-0 z-[2] flex items-center gap-2.5 px-4 py-[15px] ' +
  'bg-[#e0e0e0] border-b border-b-[#ccc] text-base font-bold text-black';
export const DRAWER_BACK =
  'mr-2.5 flex items-center cursor-pointer font-bold text-[#333] bg-transparent border-0 p-0';

// ref .mobile-bottom-buttons + .btm-links
export const BOTTOM_BAR = 'hidden max-lg:flex max-lg:transition-opacity max-lg:duration-200';
export const BOTTOM_BAR_PINNED =
  'max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:z-10';
export const BTM_LINK =
  'block w-full h-btmbar text-center text-sm leading-[68px] no-underline';
export const BTM_LINK_APPLY = `${BTM_LINK} text-black bg-atlas-mint`;
export const BTM_LINK_VISIT = `${BTM_LINK} text-white bg-atlas-deep`;
