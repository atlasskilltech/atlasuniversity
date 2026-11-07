/*
 * Web fonts of the /lp/* 2027 landing pages, self-hosted. Each family the production pages load (Google
 * Fonts or the pages' own woff2 files) is declared under its reference name prefixed `LP27 `, once per
 * unicode subset exactly as Google splits it, so the generated components' `font-family` values resolve
 * the same faces production does. Only families a page's CSS actually references are included.
 */
import localFont from 'next/font/local';

const arimoLatin = localFont({
  src: [
    { path: './fonts/Arimo-400-latin.woff2', weight: '400 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Arimo'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const arimoLatinExt = localFont({
  src: [
    { path: './fonts/Arimo-400-latin-ext.woff2', weight: '400 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Arimo'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const bebasneueLatin = localFont({
  src: [
    { path: './fonts/BebasNeue-400-latin.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Bebas Neue'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const bebasneueLatinExt = localFont({
  src: [
    { path: './fonts/BebasNeue-400-latin-ext.woff2', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Bebas Neue'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const chivomonoLatin = localFont({
  src: [
    { path: './fonts/ChivoMono-300-latin.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Chivo Mono'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const chivomonoLatinExt = localFont({
  src: [
    { path: './fonts/ChivoMono-300-latin-ext.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Chivo Mono'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const geistmonoLatin = localFont({
  src: [
    { path: './fonts/GeistMono-300-latin.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Geist Mono'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const geistmonoLatinExt = localFont({
  src: [
    { path: './fonts/GeistMono-300-latin-ext.woff2', weight: '300 700', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Geist Mono'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const montserratLatin = localFont({
  src: [
    { path: './fonts/Montserrat-100-900-italic-latin.woff2', weight: '100 900', style: 'italic' },
    { path: './fonts/Montserrat-100-900-latin.woff2', weight: '100 900', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Montserrat'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const montserratLatinExt = localFont({
  src: [
    { path: './fonts/Montserrat-100-900-italic-latin-ext.woff2', weight: '100 900', style: 'italic' },
    { path: './fonts/Montserrat-100-900-latin-ext.woff2', weight: '100 900', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Montserrat'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const poppinsLatin = localFont({
  src: [
    { path: './fonts/Poppins-100-italic-latin.woff2', weight: '100', style: 'italic' },
    { path: './fonts/Poppins-100-latin.woff2', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-200-italic-latin.woff2', weight: '200', style: 'italic' },
    { path: './fonts/Poppins-200-latin.woff2', weight: '200', style: 'normal' },
    { path: './fonts/Poppins-300-italic-latin.woff2', weight: '300', style: 'italic' },
    { path: './fonts/Poppins-300-latin.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-400-italic-latin.woff2', weight: '400', style: 'italic' },
    { path: './fonts/Poppins-400-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-500-italic-latin.woff2', weight: '500', style: 'italic' },
    { path: './fonts/Poppins-500-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-600-italic-latin.woff2', weight: '600', style: 'italic' },
    { path: './fonts/Poppins-600-latin.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-700-italic-latin.woff2', weight: '700', style: 'italic' },
    { path: './fonts/Poppins-700-latin.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-800-italic-latin.woff2', weight: '800', style: 'italic' },
    { path: './fonts/Poppins-800-latin.woff2', weight: '800', style: 'normal' },
    { path: './fonts/Poppins-900-italic-latin.woff2', weight: '900', style: 'italic' },
    { path: './fonts/Poppins-900-latin.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Poppins'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const poppinsLatinExt = localFont({
  src: [
    { path: './fonts/Poppins-100-italic-latin-ext.woff2', weight: '100', style: 'italic' },
    { path: './fonts/Poppins-100-latin-ext.woff2', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-200-italic-latin-ext.woff2', weight: '200', style: 'italic' },
    { path: './fonts/Poppins-200-latin-ext.woff2', weight: '200', style: 'normal' },
    { path: './fonts/Poppins-300-italic-latin-ext.woff2', weight: '300', style: 'italic' },
    { path: './fonts/Poppins-300-latin-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-400-italic-latin-ext.woff2', weight: '400', style: 'italic' },
    { path: './fonts/Poppins-400-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-500-italic-latin-ext.woff2', weight: '500', style: 'italic' },
    { path: './fonts/Poppins-500-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-600-italic-latin-ext.woff2', weight: '600', style: 'italic' },
    { path: './fonts/Poppins-600-latin-ext.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-700-italic-latin-ext.woff2', weight: '700', style: 'italic' },
    { path: './fonts/Poppins-700-latin-ext.woff2', weight: '700', style: 'normal' },
    { path: './fonts/Poppins-800-italic-latin-ext.woff2', weight: '800', style: 'italic' },
    { path: './fonts/Poppins-800-latin-ext.woff2', weight: '800', style: 'normal' },
    { path: './fonts/Poppins-900-italic-latin-ext.woff2', weight: '900', style: 'italic' },
    { path: './fonts/Poppins-900-latin-ext.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Poppins'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const robotoLatin = localFont({
  src: [
    { path: './fonts/Roboto-300-latin.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/Roboto-400-italic-latin.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Roboto'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const robotoLatinExt = localFont({
  src: [
    { path: './fonts/Roboto-300-latin-ext.woff2', weight: '300 700', style: 'normal' },
    { path: './fonts/Roboto-400-italic-latin-ext.woff2', weight: '400', style: 'italic' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Roboto'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const spacegroteskLatin = localFont({
  src: [
    { path: './fonts/SpaceGrotesk-400-latin.woff2', weight: '400 600', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Space Grotesk'" }, { prop: 'unicode-range', value: 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+304, U+308, U+329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' }],
});
const spacegroteskLatinExt = localFont({
  src: [
    { path: './fonts/SpaceGrotesk-400-latin-ext.woff2', weight: '400 600', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 Space Grotesk'" }, { prop: 'unicode-range', value: 'U+100-2BA, U+2BD-2C5, U+2C7-2CC, U+2CE-2D7, U+2DD-2FF, U+304, U+308, U+329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF' }],
});
const swipericonsAll = localFont({
  src: [
    { path: './fonts/swipericons-400-all.woff', weight: '400', style: 'normal' },
  ],
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [{ prop: 'font-family', value: "'LP27 swiper-icons'" }],
});

/** applied on the /lp layout wrapper so every face is registered on these routes */
export const lpFontClassName = [arimoLatin.className, arimoLatinExt.className, bebasneueLatin.className, bebasneueLatinExt.className, chivomonoLatin.className, chivomonoLatinExt.className, geistmonoLatin.className, geistmonoLatinExt.className, montserratLatin.className, montserratLatinExt.className, poppinsLatin.className, poppinsLatinExt.className, robotoLatin.className, robotoLatinExt.className, spacegroteskLatin.className, spacegroteskLatinExt.className, swipericonsAll.className].join(' ');
