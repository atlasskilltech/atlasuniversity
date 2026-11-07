/* =====================================================================
   Convocation — typography.

   The reference loads Bodoni Moda (opsz 6-96, wght 400-700; the
   "diploma-engraving" display face) and Schibsted Grotesk (wght 400-700;
   text & UI) from Google Fonts. These are Google's own variable WOFF2
   files, latin + latin-ext, self-hosted under ./fonts and declared through
   next/font/local (precedent: lib/pdf-studio/fonts.js). Bodoni Moda's
   optical-size axis is applied automatically (font-optical-sizing: auto),
   as on production.

   Families are named explicitly (CvDisplay / CvSans); the components
   select them with `font-[CvDisplay,…]` / `font-[CvSans,…]`.
   ===================================================================== */
import localFont from 'next/font/local';

const displayLatin = localFont({
  src: [{ path: './fonts/BodoniModa-latin.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'CvDisplay' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

const displayLatinExt = localFont({
  src: [{ path: './fonts/BodoniModa-latin-ext.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'CvDisplay' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

const sansLatin = localFont({
  src: [{ path: './fonts/SchibstedGrotesk-latin.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'CvSans' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

const sansLatinExt = localFont({
  src: [{ path: './fonts/SchibstedGrotesk-latin-ext.woff2', weight: '400 700', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'CvSans' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

/** Loads every face; apply on the page wrapper. */
export const convocationFontClassName = [
  displayLatin.className,
  displayLatinExt.className,
  sansLatin.className,
  sansLatinExt.className,
].join(' ');
