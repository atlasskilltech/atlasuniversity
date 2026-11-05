/**
 * Tailwind class strings for the ISDI header, kept in one place so every
 * repeated element (6 utility links, 100+ menu rows) is byte-identical.
 *
 * Every value was measured with getComputedStyle on
 * https://atlasuniversity.edu.in/schools/isdi/ at 1920-360px — desktop UA from
 * 992 up, mobile UA below — rather than read out of the stylesheets. Sources:
 * reference/schools/isdi/assets/include/header.php (markup + two inline
 * <style> blocks) over the ISDI page sheet.
 *
 * The chassis is the same Webflow header component the ATLAS site uses, but
 * this is deliberately NOT built on `components/Header/styles.js`: the ISDI
 * page sheet differs in enough places (pink palette, Poppins, a third menu
 * level, a 600px panel, borders/shadows kept on mobile, no button hover states)
 * that sharing would mean re-skinning a finished component.
 */

/* ── header root ─────────────────────────────────────────────────────────── */

// ref .header — `position: static`, so its declared z-index: 1000 creates no
// stacking context and is left out; over `body.isdi-page` (Poppins, #333)
export const ROOT =
  'w-full font-poppins-isdi text-[#333] ' +
  'max-lg:h-auto max-lg:overflow-auto max-md:block';

/* ── top utility bar ─────────────────────────────────────────────────────── */

// ref .topnavbar + header.php @media (min-width: 992px) { fixed; top 0; z 1100; transition .5s }
export const TOPBAR =
  'h-topbar transition-all duration-500 ease-wf ' +
  'lg:fixed lg:top-0 lg:left-0 lg:w-full lg:z-1100 ' +
  'max-lg:h-auto max-lg:transition-opacity ' +
  'max-md:static max-md:block max-md:w-full max-md:m-0';

export const TOPBAR_RETRACTED = 'lg:-translate-y-full lg:pointer-events-none';

// ref .top-menu-bar.isdi-bg — #ec1376
export const TOPBAR_INNER =
  'relative flex justify-end items-end text-right bg-isdi-pink pl-10 pr-5 ' +
  'max-lg:flex-col max-lg:justify-start max-lg:items-stretch max-lg:text-left max-lg:px-0 ' +
  'max-md:items-start';

// ref .tp-links — 12px, 15/12 padding; a bordered full-width row in the drawer
export const TP_LINK =
  'flex justify-start items-center text-white py-[15px] px-3 text-xs no-underline ' +
  'max-lg:justify-between max-lg:w-full max-lg:pl-8 max-lg:pr-[26px] max-lg:text-sm ' +
  'max-lg:border-b max-lg:border-b-[#ffffff4d] ' +
  'max-md:flex-[0_auto] max-md:text-left max-md:border-t max-md:border-t-[#eeeeee66]';

/*
 * ref .logo-text — "ATLAS SkillTech University". Desktop: absolutely pinned to
 * the left of the pink bar (top 15 / left 32, 14px). Drawer: an ordinary
 * full-width row, but without the borders .tp-links carries.
 */
export const LOGO_TEXT =
  'absolute top-[15px] left-8 flex flex-none justify-between items-center ' +
  'text-sm text-white no-underline ' +
  'max-lg:static max-lg:w-full max-lg:py-[15px] max-lg:pl-8 max-lg:pr-[26px]';

// ref .icon-link-mob — `width="24" height="24"`, shown on phones only
export const TP_ICON = 'hidden w-6 h-6 max-md:block';

/* ── main bar ────────────────────────────────────────────────────────────── */

// ref .second-header-wrapper — fixed 156px bar under the 48px utility bar
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

// ref .hamburger-menu / .hamb-close-icon — 24x24 content-box + 10px padding.
// The ISDI sheet inverts the open close icon from 991 down (`.hamb-close-icon.show
// { filter: invert() }`) and resets it at 767 (`filter: none`): white on
// tablets, black on phones.
export const HAMBURGER =
  'flex-none p-2.5 hidden box-content max-lg:block max-lg:w-6 max-lg:h-6 cursor-pointer';
export const CLOSE_ICON =
  'box-content w-6 h-6 p-2.5 hidden cursor-pointer max-lg:invert max-md:invert-0';

// ref .logo > a.m-link > img.logo-main-isme — 232x34, 150x22 from 991 down
export const LOGO_WRAP = 'block flex-none leading-[0]';
export const LOGO_LINK = 'inline-block flex-none max-w-full leading-[0] no-underline';
export const LOGO_IMG = 'block flex-none max-w-full h-auto w-[232px] max-lg:w-[150px]';

// ref form.search-br — both inputs are commented out upstream; the empty form
// is still the flex spacer that pushes the buttons right
export const SEARCH_SPACER = 'relative flex flex-1 m-0 max-md:hidden';

// ref .logo-btn-wrap / .logo-btn-wrap.hide-btn (hidden below 768)
export const CTA_WRAP =
  'flex-none flex gap-8 max-md:z-11 max-md:static max-md:w-auto max-md:ml-auto max-md:text-left';
export const CTA_WRAP_HIDDEN = 'flex-none flex gap-8 max-md:hidden';

/*
 * ref .secondary-btn with `data-wf--button-secondary--variant="pink"` but no
 * variant class, so it is the base rule: #d20158, 12px/600, 10/16 padding.
 * No hover state — measured, nothing changes.
 */
export const BTN_PINK =
  'flex-none block rounded-3xl px-4 py-2.5 text-xs font-semibold no-underline ' +
  'text-white bg-atlas-cta';
export const BTN_PINK_RESPONSIVE =
  BTN_PINK +
  ' max-md:flex max-md:justify-center max-md:items-center max-md:h-auto max-md:text-sm max-md:text-left';

// ref .secondary-btn.w-variant-71409380-… ("transparent-bg"). No hover state.
export const BTN_OUTLINE =
  'flex-none block rounded-3xl px-[15px] py-2 text-xs font-semibold no-underline ' +
  'text-white bg-transparent border border-white';

/* ── menu container / drawer ─────────────────────────────────────────────── */

// ref .drawer-menu-code-isdi: fixed / left:-100% / h:100vh / pt:80 / pb:72 / opacity:0
export const MENU_CONTAINER =
  'max-lg:fixed max-lg:top-0 max-lg:w-full max-lg:h-screen ' +
  'max-lg:bg-white max-lg:pt-20 max-lg:pb-18 max-lg:overflow-auto ' +
  'max-lg:transition-all max-lg:duration-200 max-lg:ease-in';
export const MENU_CONTAINER_CLOSED = 'max-lg:-left-full max-lg:-z-[1] max-lg:opacity-0';
export const MENU_CONTAINER_OPEN = 'max-lg:left-0 max-lg:z-10 max-lg:opacity-100';

/*
 * ref .mega-menus.isdi-menu. On mobile the reference keeps the 1px translucent
 * top border (invisible on white, but it is why every row sits at y=81) and the
 * `backdrop-filter`. The filter is NOT kept: it makes this box the containing
 * block for the `position: fixed` drawers, which is what pushes each one 81px
 * down and 81px past the bottom of the screen in the reference. The drawers are
 * placed at y=81 explicitly instead (see SUBNAV).
 */
export const MEGA_MENU =
  'relative flex justify-around items-stretch overflow-visible ' +
  'bg-[#0000004d] backdrop-blur-[5px] border-t border-t-[#ffffff4d] ' +
  'max-lg:flex-col max-lg:bg-white max-lg:backdrop-filter-none ' +
  'max-lg:transition-opacity max-lg:duration-200 ' +
  'max-md:justify-start max-md:z-[1]';

/* ── nav items ───────────────────────────────────────────────────────────── */

/*
 * ref .nav-link { position: static } — the sub-nav is `position:absolute`, so
 * its containing block must be `.mega-menus`, not the item.
 */
export const NAV_ITEM =
  'group/nav static flex flex-[0_auto] items-center gap-2 p-0 text-white bg-transparent ' +
  'max-lg:justify-start max-md:block max-md:items-start';

// ref .text-link + the pink 8px underline from the header's inline <style>
const TEXT_LINK_BASE =
  'relative flex flex-[0_auto] justify-start items-center gap-2 p-4 ' +
  'text-white cursor-pointer no-underline ' +
  'after:absolute after:left-0 after:-bottom-1 after:h-2 after:w-full after:z-[1] ' +
  "after:bg-isdi-pink after:hidden lg:group-hover/nav:after:block lg:after:content-[''] " +
  'max-lg:flex-1 max-lg:justify-between max-lg:px-8 max-lg:text-black ' +
  'max-lg:border-b max-lg:border-b-[#eee] max-md:text-sm';

export const NAV_TRIGGER = TEXT_LINK_BASE + ' w-auto text-start bg-transparent border-0 max-lg:w-full';
export const NAV_PLAIN_LINK = TEXT_LINK_BASE;

// ref .nav-arrow — flips open on desktop; inverted in the drawer, a chevron on phones
export const NAV_ARROW = 'block transition-transform duration-300 max-lg:invert max-md:-rotate-90';
export const NAV_ARROW_OPEN = 'lg:-rotate-180';

// ref `.nav-link a.text-link .icon-link-mob` — 12x12, phones only
export const NAV_LINK_ICON = 'hidden w-3 h-3 max-md:block';

/* ── panels ──────────────────────────────────────────────────────────────── */

/*
 * Level-1 panel. Desktop: absolute, full menu width, 600px (the height comes
 * from `.level-1 { min-height: 600px !important }`). Mobile: a full-screen
 * drawer placed at y=81 — where the reference paints it — and sized to the
 * space that is actually left, so the last rows stay reachable.
 */
export const SUBNAV =
  'hidden absolute top-full left-0 z-0 w-full h-auto bg-white overflow-hidden ' +
  'lg:transition-[opacity,visibility] lg:duration-300 ' +
  'max-lg:block max-lg:fixed max-lg:top-[81px] max-lg:left-0 max-lg:w-full ' +
  'max-lg:h-[calc(100vh-81px)] max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

// closed state shared by every panel level
export const PANEL_CLOSED =
  'lg:opacity-0 lg:invisible ' +
  'max-lg:-translate-x-[101%] max-lg:opacity-0 max-lg:pointer-events-none max-lg:z-10';
export const SUBNAV_OPEN =
  'lg:flex lg:opacity-100 lg:visible ' +
  'max-lg:translate-x-0 max-lg:opacity-100 max-lg:pointer-events-auto max-lg:z-[100]';
export const LEVEL_OPEN =
  'lg:block lg:opacity-100 lg:visible ' +
  'max-lg:translate-x-0 max-lg:opacity-100 max-lg:pointer-events-auto max-lg:z-[100]';

/*
 * ref ul.level-1 — 25% wide, 600px tall. On mobile the reference keeps the
 * 600px floor, the right border and the upward shadow (the sticky drawer header
 * covers the shadow).
 */
export const LEVEL_1 =
  'relative flex flex-col flex-none justify-start items-stretch w-1/4 min-h-[600px] ' +
  'm-0 py-8 pl-8 pr-0 list-none bg-white border-r border-r-[#2b2b2b1a] shadow-level-1 ' +
  'max-lg:w-full max-lg:p-0';

/*
 * ref ul.level-2 — 330px, #f5f5f5, beside level 1 at `left: 100%` of its padding
 * box. On mobile a drawer over its parent drawer.
 */
export const LEVEL_2 =
  'hidden absolute top-0 left-full z-[1] flex-none w-[330px] h-full m-0 ' +
  'pt-8 pb-8 pl-8 pr-0 list-none bg-atlas-panel ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'max-lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full ' +
  'max-lg:p-0 max-lg:bg-white max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

/*
 * ref ul.level-3 — only ISDI has this level. 650px (header.php inline
 * `.level-3 { width: 650px }`), #f5f5f5, 32px padding, a faint inset shadow on
 * its left edge and `backdrop-filter: blur(54px)`, all kept on mobile.
 */
export const LEVEL_3 =
  'hidden absolute top-0 left-full z-[1] flex-none w-[650px] h-full m-0 p-8 list-none ' +
  'bg-atlas-panel shadow-level-3 backdrop-blur-[54px] ' +
  'lg:transition-[opacity,visibility] lg:duration-200 ' +
  'max-lg:block max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full max-lg:h-full ' +
  'max-lg:p-0 max-lg:bg-white max-lg:border-r max-lg:border-r-[#ccc] ' +
  'max-lg:overflow-y-auto max-lg:overflow-x-hidden ' +
  'max-lg:transition-[transform,opacity] max-lg:duration-[400ms]';

/* ── rows ────────────────────────────────────────────────────────────────── */

/*
 * One row per level. The hover rules in header.php are written against the
 * <li> (`.level-1-item:hover a.level-1-link`), so hovering anywhere inside a
 * row — including the next level's panel, which is nested inside it — keeps
 * that row pink. That is what gives the reference its breadcrumb trail
 * (Undergraduate Degree > B.Des > …) and it falls out of the same nesting here.
 * Hover is desktop-only (the inline <style> is `min-width: 567px` and the
 * drawer never shows below 992 here).
 */
const ITEM = 'flex text-left mb-2 list-none max-lg:mb-0';
// ref: only .level-1-item sets a colour, only .level-2-item resets the weight
export const ITEM_BY_LEVEL = {
  1: `group/l1 ${ITEM} text-atlas-ink`,
  2: `group/l2 ${ITEM} font-normal`,
  3: `group/l3 ${ITEM}`,
};

const LINK =
  'flex flex-row items-center gap-[5px] mb-0 py-[5px] no-underline cursor-pointer ' +
  'text-atlas-ink transition-all duration-200 ' +
  'max-lg:w-full max-lg:px-4 max-lg:py-3.5 max-lg:text-sm max-lg:bg-white ' +
  'max-lg:border-b max-lg:border-b-[#ddd]';

// ref .level-1-link is white; .level-2-link / .level-3-link are transparent
export const LINK_BY_LEVEL = {
  1:
    `${LINK} bg-white lg:group-hover/l1:px-2.5 lg:group-hover/l1:bg-isdi-pink ` +
    'lg:group-hover/l1:text-white lg:group-hover/l1:font-medium',
  2:
    `${LINK} max-w-full bg-transparent lg:group-hover/l2:px-2.5 lg:group-hover/l2:bg-isdi-pink ` +
    'lg:group-hover/l2:text-white lg:group-hover/l2:font-medium',
  3:
    `${LINK} max-w-full bg-transparent lg:group-hover/l3:px-2.5 lg:group-hover/l3:bg-isdi-pink ` +
    'lg:group-hover/l3:text-white lg:group-hover/l3:font-medium',
};

// ref .text-lnk — keeps weight 400 while its row goes to 500 on hover
export const TEXT_LNK = 'flex-none font-normal no-underline max-lg:pointer-events-none';

/*
 * ref .link-arrow — 22px, a pale glyph that turns white on hover. The hover
 * filter is a direct-child rule upstream (`div.level-1-link > img`), so each
 * arrow listens only to its own row's group.
 */
const ARROW = 'block w-[22px] max-w-full transition-[filter,opacity] duration-200';
export const ARROW_BY_LEVEL = {
  1: `${ARROW} lg:group-hover/l1:brightness-0 lg:group-hover/l1:invert`,
  2: `${ARROW} lg:group-hover/l2:brightness-0 lg:group-hover/l2:invert`,
  3: `${ARROW} lg:group-hover/l3:brightness-0 lg:group-hover/l3:invert`,
};

// ref .nav-image-container — 75% of the panel, hidden in the drawer
export const NAV_IMAGE_WRAP =
  'absolute top-0 right-0 flex-1 w-3/4 h-full p-8 ' +
  'bg-atlas-panel shadow-nav-image max-lg:hidden';
export const NAV_IMAGE = 'inline-block w-full h-full object-cover';

/* ── mobile drawer chrome ────────────────────────────────────────────────── */

/*
 * ref .drawer-header — built by footer.php's `addDrawerHeader()`. The back
 * button is a 15px arrow with a 10px right margin and no gap, so the title
 * starts at x=41.
 */
export const DRAWER_HEADER =
  'sticky top-0 z-[2] flex items-center px-4 py-[15px] ' +
  'bg-[#e0e0e0] border-b border-b-[#ccc] text-base font-bold text-black';
export const DRAWER_BACK =
  'mr-2.5 block cursor-pointer font-bold text-start text-[#333] bg-transparent border-0 p-0 leading-6';

// ref .mobile-bottom-buttons + .btm-links.bg-1 / .bg-2
export const BOTTOM_BAR = 'hidden max-lg:flex max-lg:transition-opacity max-lg:duration-200';
export const BOTTOM_BAR_PINNED =
  'max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:z-10';
const BTM_LINK = 'block w-full h-btmbar text-center text-sm leading-[68px] no-underline';
export const BTM_LINK_APPLY = `${BTM_LINK} text-black bg-atlas-mint`;
export const BTM_LINK_VISIT = `${BTM_LINK} text-white bg-atlas-deep`;
