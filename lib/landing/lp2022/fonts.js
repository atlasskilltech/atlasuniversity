/*
 * Fonts the five lp2022 campaign pages load from Google Fonts upstream, self-hosted here (official
 * gstatic woff2, latin + latin-ext). Roboto is shared with the lp2x pages (lib/landing/lp2x/fonts.js,
 * the same gstatic files). 'Roboto Condensed' 700 normal + italic is requested by DMAprogram1 and
 * ugprograms (`css2?family=Roboto+Condensed:ital,wght@0,700;1,700`).
 */
import localFont from 'next/font/local';

export const lpRobotoCondensed = localFont({
  src: [
    { path: './fonts/RobotoCondensed-700-normal-latin.woff2', weight: '700', style: 'normal' },
    { path: './fonts/RobotoCondensed-700-italic-latin.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-lp2022-rc',
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

export const lpRobotoCondensedExt = localFont({
  src: [
    { path: './fonts/RobotoCondensed-700-normal-latin-ext.woff2', weight: '700', style: 'normal' },
    { path: './fonts/RobotoCondensed-700-italic-latin-ext.woff2', weight: '700', style: 'italic' },
  ],
  variable: '--font-lp2022-rc-ext',
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

export const LP2022_RC_VARS = `${lpRobotoCondensed.variable} ${lpRobotoCondensedExt.variable}`;

/*
 * 'Maven Pro' 400-900 — requested by pg/mdes (`css2?family=Maven+Pro:wght@400;500;600;700;800;900`).
 * Google serves one variable file per subset for every weight; declared as the same discrete faces.
 */
export const lpMavenPro = localFont({
  src: [
    { path: './fonts/MavenPro-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/MavenPro-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/MavenPro-latin.woff2', weight: '600', style: 'normal' },
    { path: './fonts/MavenPro-latin.woff2', weight: '700', style: 'normal' },
    { path: './fonts/MavenPro-latin.woff2', weight: '800', style: 'normal' },
    { path: './fonts/MavenPro-latin.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-lp2022-maven',
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
export const lpMavenProExt = localFont({
  src: [
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '600', style: 'normal' },
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '700', style: 'normal' },
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '800', style: 'normal' },
    { path: './fonts/MavenPro-latin-ext.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-lp2022-maven-ext',
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
export const LP2022_MAVEN_VARS = `${lpMavenPro.variable} ${lpMavenProExt.variable}`;

/*
 * 'Poppins' 100-700 — requested by film-animation_26 (`css2?family=Poppins:ital,wght@0,100;…;0,700;1,…`
 * from global.css). Static faces, the official gstatic files (byte-identical to the copies under
 * lib/landing/lp2027/fonts). The italics are requested but never painted, so they are not shipped;
 * an 800 request resolves to 700 exactly as upstream.
 */
export const lpPoppins = localFont({
  src: [
    { path: './fonts/Poppins-100-latin.woff2', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-200-latin.woff2', weight: '200', style: 'normal' },
    { path: './fonts/Poppins-300-latin.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-400-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-500-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-600-latin.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-700-latin.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lp2022-poppins',
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

export const lpPoppinsExt = localFont({
  src: [
    { path: './fonts/Poppins-100-latin-ext.woff2', weight: '100', style: 'normal' },
    { path: './fonts/Poppins-200-latin-ext.woff2', weight: '200', style: 'normal' },
    { path: './fonts/Poppins-300-latin-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/Poppins-400-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/Poppins-500-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/Poppins-600-latin-ext.woff2', weight: '600', style: 'normal' },
    { path: './fonts/Poppins-700-latin-ext.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-lp2022-poppins-ext',
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

export const LP2022_POPPINS_VARS = `${lpPoppins.variable} ${lpPoppinsExt.variable}`;

/*
 * 'Roboto' 100/300/400/500/700/900 — requested by ug/bba (style.css `css2?family=Roboto:ital,wght@0,100;
 * 0,300;0,400;0,500;0,700;0,900;…`). Google serves one variable file per subset for every weight —
 * the same gstatic bytes lib/landing/lp2x/fonts already holds (md5-verified), so those files are
 * referenced rather than copied. The 900 face matters: `.section-highlights h2` asks for weight
 * 1000 and resolves to it. Italics are requested but never painted.
 */
export const lpRobotoFull = localFont({
  src: [
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '100', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '300', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '400', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '500', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '700', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-lp2022-roboto',
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

export const lpRobotoFullExt = localFont({
  src: [
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '100', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '300', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '700', style: 'normal' },
    { path: '../lp2x/fonts/Roboto-latin-ext.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-lp2022-roboto-ext',
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

export const LP2022_ROBOTO_VARS = `${lpRobotoFull.variable} ${lpRobotoFullExt.variable}`;
