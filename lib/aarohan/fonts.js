/* =====================================================================
   Aarohan conference sites (/aarohan23, /aarohan2024, /aarohan2025) -
   the purchased "Meeta" event template's Google fonts, self-hosted.

   Every page links two Google Fonts stylesheets:
     css2?family=Big+Shoulders+Display:wght@300..800&family=Open+Sans:wght@300..800
     css?family=Archivo:wght@300;400;500;600;700          (the v1 API)
   The first serves one VARIABLE woff2 per subset, declared for every weight;
   the second is the legacy endpoint, which does not understand `wght@` and
   serves a single 400 face. Measured on production (document.fonts):
   Archivo loads at 400 ONLY, so every bold Archivo heading on the live site
   is the browser's synthetic bold of the 400 face. That is reproduced here by
   declaring Archivo at 400 alone - do not add bolder faces.

   Official Google Fonts latin + latin-ext subsets, byte for byte. The
   family names are short and space-free so Tailwind classes can name them
   directly: font-[AaBSD,cursive] / font-[AaOpen,sans-serif] / font-[AaArchivo,sans-serif].
   ===================================================================== */
import localFont from 'next/font/local';

const bsdLatin = localFont({
  src: [{ path: './fonts/BigShouldersDisplay-latin.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaBSD' },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
});
const bsdLatinExt = localFont({
  src: [{ path: './fonts/BigShouldersDisplay-latin-ext.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaBSD' },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
});
const openLatin = localFont({
  src: [{ path: './fonts/OpenSans-latin.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaOpen' },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
});
const openLatinExt = localFont({
  src: [{ path: './fonts/OpenSans-latin-ext.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaOpen' },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
});
const archivoLatin = localFont({
  src: [{ path: './fonts/Archivo-400-latin.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaArchivo' },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
});
const archivoLatinExt = localFont({
  src: [{ path: './fonts/Archivo-400-latin-ext.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'AaArchivo' },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
});

/* Applied on the outer wrapper only (each class sets a font-family); the inner wrapper sets the
   template's body font explicitly. */
export const aarohanFonts = [
  bsdLatin.className,
  bsdLatinExt.className,
  openLatin.className,
  openLatinExt.className,
  archivoLatin.className,
  archivoLatinExt.className,
].join(' ');
