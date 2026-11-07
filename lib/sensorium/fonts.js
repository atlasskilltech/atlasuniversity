/* =====================================================================
   Sensorium typography - the faces production loads.

   The Eona theme sets Lora for body copy, Montserrat for headings and
   navigation, Playfair Display (mostly italic) for captions, categories
   and the hero strapline, and its own HenriDidot for the big gold
   counters. The Google families are the official latin + latin-ext
   WOFF2 subsets, self-hosted; HenriDidot is the theme's own webfont
   (eona/assets/fonts/henri-didot), byte for byte.

   Each family is declared once per subset under one shared name with
   Google's unicode-range, so the small latin file serves ordinary copy.
   Components name the families directly (font-[SensMont,...]); the
   generated classes below only make next/font emit the @font-face rules.
   ===================================================================== */
import localFont from 'next/font/local';

const montLatin = localFont({
  src: [{ path: './fonts/Montserrat-400-800-normal-latin.woff2', weight: '400 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensMont' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});
const montLatinExt = localFont({
  src: [{ path: './fonts/Montserrat-400-800-normal-latin-ext.woff2', weight: '400 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensMont' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});
const playLatin = localFont({
  src: [
    { path: './fonts/PlayfairDisplay-400-normal-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/PlayfairDisplay-400-italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensPlayfair' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});
const playLatinExt = localFont({
  src: [
    { path: './fonts/PlayfairDisplay-400-normal-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/PlayfairDisplay-400-italic-latin-ext.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensPlayfair' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});
const loraLatin = localFont({
  src: [{ path: './fonts/Lora-400-normal-latin.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensLora' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});
const loraLatinExt = localFont({
  src: [{ path: './fonts/Lora-400-normal-latin-ext.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'SensLora' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});
const didot = localFont({
  src: [{ path: './fonts/HenriDidot.woff2', weight: '400', style: 'normal' }],
  display: 'swap',
  declarations: [{ prop: 'font-family', value: 'SensDidot' }],
});

/** Put on an OUTER wrapper only: each class also sets font-family. */
export const sensoriumFontClasses = [
  montLatin.className,
  montLatinExt.className,
  playLatin.className,
  playLatinExt.className,
  didot.className,
  loraLatinExt.className,
  loraLatin.className,
].join(' ');
