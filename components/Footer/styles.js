/**
 * Tailwind class strings for the footer, annotated with the reference rule each
 * one reproduces (reference/assets/include/footer.php + the Webflow page CSS).
 */

// ref .footer-atlas { background:#41418e; display:flex; margin-top:56px }
export const FOOTER =
  'flex flex-row mt-14 bg-atlas-footer ' +
  'max-md:flex-col max-md:mt-10 ' +
  '2xl:max-w-full ' +
  '3xl:flex-row';

// ref .content-left-atlas { width:30%; padding:32px; color:#fff }
export const COL_LEFT =
  'flex-none w-[30%] p-8 text-white bg-transparent ' +
  'max-md:w-full ' +
  '2xl:flex 2xl:flex-col';

// ref .content-mid-atlas / .content-right-atlas { width:35%; padding:40px 20px }
const COL_SIDE_BASE =
  'flex flex-col flex-none justify-between items-start gap-0 w-[35%] px-5 py-10 bg-transparent ' +
  'max-md:w-full max-md:pt-5 max-md:pr-5 max-md:pb-8 max-md:pl-8 ' +
  '2xl:justify-start 2xl:items-center 2xl:px-4';

export const COL_MID = `${COL_SIDE_BASE} 2xl:pt-8`;
export const COL_RIGHT = COL_SIDE_BASE;

export const COPYRIGHT_BLOCK = 'mt-0';
export const CP_TEXT = 'pt-5';

// ref .footer-meetus { margin:54px 0 42px }
export const MEETUS = 'mt-[54px] mb-[42px]';

// ref .ft-head { font-size:24px; font-weight:400; line-height:1.5; margin-bottom:12px }
export const FT_HEAD = 'mb-3 pb-0 text-2xl font-normal leading-[1.5]';
export const FT_HEAD_MRGTP = `${FT_HEAD} pt-0`;

// ref .ft-link-at { font-size:18px; font-weight:300 } + @media(min-width:1440px){ 16px / 400 }
export const FT_LINK = 'text-white text-lg font-light no-underline 2xl:text-base 2xl:font-normal';
export const FT_LINK_A = `${FT_LINK} hover:underline`;

// ref .map-atlas — asymmetric radius, clips the fixed-size iframe
export const MAP_WRAP =
  'mt-10 max-w-full min-h-[298px] max-h-[380px] overflow-hidden ' +
  'rounded-tl-[32px] rounded-br-[32px] ' +
  '2xl:min-h-[300px]';

// ref .social-icons-atlas { display:flex; gap:16px } + @media(min-width:1440px){ padding-top:42px }
export const SOCIAL_ROW = 'flex items-center gap-4 max-md:mb-8 2xl:pt-[42px]';
export const SOCIAL_LINK =
  'inline-block max-w-full transition-opacity duration-200 hover:opacity-75';

// ref .atlas-foot-links { display:flex; gap:60px } + @media(min-width:1440px){ gap:48px }
export const FOOT_LINKS = 'flex flex-wrap justify-center items-start gap-[60px] 2xl:gap-12';
// ref .links-at { display:flex; flex-flow:column; gap:10px }
export const LINKS_COL = 'flex flex-col gap-2.5';

/* ── global video modal ──────────────────────────────────────────────────── */

export const MODAL =
  'fixed top-0 left-0 z-[5000] w-full h-full bg-black/85 justify-center items-center';
export const MODAL_INNER =
  'relative top-1/2 left-1/2 flex justify-center items-center -translate-x-1/2 -translate-y-1/2';
export const MODAL_CLOSE =
  'absolute -top-[25px] right-1/4 z-10 text-4xl font-bold text-white cursor-pointer ' +
  'transition-colors duration-200 hover:text-red-600 ' +
  'max-vsm:-top-[50px] max-vsm:right-[5%]';
export const MODAL_BODY =
  'relative w-[90%] max-w-[900px] bg-black rounded-lg overflow-hidden ' +
  "shadow-[0_0_20px_rgba(0,0,0,0.6)] before:content-[''] before:block before:pt-[56.25%]";
export const MODAL_IFRAME = 'absolute top-0 left-0 w-full h-full border-0';
