/* Shared Tailwind class strings for the Sensorium (Eona theme) port.
   Values are the theme's own (eona/assets/css/main.css + eona-core.css), measured on production.

   Breakpoints follow the theme and Elementor, not this project's screens:
     Eona grid       >=1441 1300px | 1201-1440 1100px | 1025-1200 960px | 801-1024 768px | 481-800 86% | <=480 82%
     Elementor       desktop >=1025 | tablet 768-1024 | mobile <=767
   Ranges are written non-overlapping so their order in the generated CSS cannot matter. */

export const GRID =
  'mx-auto w-[1100px] [@media(min-width:1441px)]:w-[1300px] [@media(min-width:1025px)_and_(max-width:1200px)]:w-[960px] [@media(min-width:801px)_and_(max-width:1024px)]:w-[768px] [@media(min-width:481px)_and_(max-width:800px)]:w-[86%] [@media(max-width:480px)]:w-[82%]';

export const MONT = 'font-[SensMont,sans-serif]';
export const PLAY = 'font-[SensPlayfair,serif]';
export const LORA = 'font-[SensLora,serif]';
export const DIDOT = 'font-[SensDidot,serif]';

/* h1: 48px/1.104 800 uppercase; the theme's inline style drops it to 35/40 at <=768 */
export const H1 = `${MONT} m-0 text-[48px] leading-[1.104] font-extrabold uppercase text-black break-words [@media(max-width:768px)]:text-[35px] [@media(max-width:768px)]:leading-[40px]`;
/* h3: 27px/1.111 800 uppercase */
export const H3 = `${MONT} m-0 text-[27px] leading-[1.111] font-extrabold uppercase text-black break-words`;
/* h4: 19px/1.286 800 .015em uppercase */
export const H4 = `${MONT} m-0 text-[19px] leading-[1.286] font-extrabold tracking-[0.015em] uppercase text-black break-words`;
/* h5: 18px/1.278 800 .015em #1b1b1b */
export const H5 = `${MONT} m-0 text-[18px] leading-[1.278] font-extrabold tracking-[0.015em] text-[#1b1b1b]`;
/* h6 / captions / categories: Playfair 16px/1.412 italic .01em */
export const H6 = `${PLAY} m-0 text-[16px] leading-[1.412] italic font-normal tracking-[0.01em] text-[#9c9c9c]`;

/* Elementor column-gap-default */
export const COL_PAD = 'p-[10px]';
