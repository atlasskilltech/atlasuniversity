/* =====================================================================
   Tim Cook at ATLAS — typography.

   The reference loads Inter Tight (300-800), Instrument Serif (regular +
   italic) and JetBrains Mono (400/500) from Google Fonts. These are the
   official Google WOFF2 files, latin + latin-ext, self-hosted under
   ./fonts and declared through next/font/local (precedent:
   lib/pdf-studio/fonts.js). Inter Tight and JetBrains Mono are Google's
   variable files, so one file per subset carries every weight.

   Only the ITALIC Instrument Serif face is shipped: every serif run on the
   page is italic (`.hero__line--serif`, the `em`s, `.chapter__kicker`,
   `.voice__title`, `.message__n`, `.loader__name`); the upright face is
   loaded by the reference but never painted.

   Families are named explicitly (TcSans / TcSerif / TcMono) and the
   components select them with `font-[TcSans,…]`.
   ===================================================================== */
import localFont from 'next/font/local';

const sansLatin = localFont({
  src: [{ path: './fonts/InterTight-latin.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcSans' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

const sansLatinExt = localFont({
  src: [{ path: './fonts/InterTight-latin-ext.woff2', weight: '300 800', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcSans' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

const serifLatin = localFont({
  src: [{ path: './fonts/InstrumentSerif-400italic-latin.woff2', weight: '400', style: 'italic' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcSerif' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

const serifLatinExt = localFont({
  src: [{ path: './fonts/InstrumentSerif-400italic-latin-ext.woff2', weight: '400', style: 'italic' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcSerif' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

const monoLatin = localFont({
  src: [{ path: './fonts/JetBrainsMono-latin.woff2', weight: '400 500', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcMono' },
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

const monoLatinExt = localFont({
  src: [{ path: './fonts/JetBrainsMono-latin-ext.woff2', weight: '400 500', style: 'normal' }],
  display: 'swap',
  declarations: [
    { prop: 'font-family', value: 'TcMono' },
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

/** Loads every face; apply on the page wrapper. */
export const timcookFontClassName = [
  sansLatin.className,
  sansLatinExt.className,
  serifLatin.className,
  serifLatinExt.className,
  monoLatin.className,
  monoLatinExt.className,
].join(' ');
