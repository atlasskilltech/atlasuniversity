/*
 * Fonts for the lp23 / lp24 / lp25 landing pages — exactly the faces production actually paints.
 *
 * Measured on production with CDP `CSS.getPlatformFontsForNode` (Chrome, Windows):
 *   - `font-family: 'Montserrat', sans-serif` (the body, most headings) has NO @font-face upstream —
 *     main.css only declares 'Montserrat-Bold' / '-ExtraBold' / '-Regular' — so it falls back to the
 *     system sans-serif (Arial; Arial Black at weight 800/900). That is reproduced by naming the same
 *     unresolvable family in the class (`font-['Montserrat',sans-serif]`), not by loading a font.
 *   - 'Montserrat-ExtraBold' IS loaded, from the reference's own Montserrat-ExtraBold.ttf, declared
 *     with no weight (= 400) — so a 700/800 heading in it gets Chrome's synthetic bold on top. The TTF
 *     is shipped byte-for-byte and declared at weight 400 here so the synthesis is identical.
 *   - 'Roboto' comes from Google Fonts (300/400/500/700). Google serves one variable file per subset
 *     for every weight; it is declared as the same discrete faces (a 600 request resolves to 700,
 *     as upstream). The latin / latin-ext files are the gstatic bytes (md5-verified). Two families
 *     stacked latin -> latin-ext -> sans-serif (the latin one carries no fallback so a latin-ext
 *     glyph reaches its own face) — next/font cannot give two files of one weight their own range.
 */
import localFont from 'next/font/local';

export const lpExtraBold = localFont({
  src: [{ path: './fonts/Montserrat-ExtraBold.ttf', weight: '400', style: 'normal' }],
  variable: '--font-lp2x-mxb',
  display: 'swap',
  fallback: ['sans-serif'],
  adjustFontFallback: false,
});

export const lpRobotoLatin = localFont({
  src: [
    { path: './fonts/Roboto-latin.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Roboto-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Roboto-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Roboto-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lp2x-roboto',
  display: 'swap',
  fallback: [],
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
});

export const lpRobotoLatinExt = localFont({
  src: [
    { path: './fonts/Roboto-latin-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Roboto-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Roboto-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Roboto-latin-ext.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lp2x-roboto-ext',
  display: 'swap',
  fallback: ['sans-serif'],
  adjustFontFallback: false,
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    },
  ],
});

/** applied on each page wrapper */
export const LP2X_FONT_VARS = `${lpExtraBold.variable} ${lpRobotoLatin.variable} ${lpRobotoLatinExt.variable}`;
