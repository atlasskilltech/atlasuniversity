/**
 * ATLAS News — light / dark / system theming.
 *
 * The palette lives in CSS variables (RGB triplets) on the News root element, consumed through the
 * `news-*` colours in tailwind.config.js. Three states:
 *   no data-theme      → follows the operating system (prefers-color-scheme), the default;
 *   data-theme="light" → light regardless of the system;
 *   data-theme="dark"  → dark regardless of the system.
 * The `dark:` variant here is Tailwind's default media strategy; nothing else in the project uses it,
 * and inside News components colours ONLY come from the variables, never from `dark:`.
 *
 * The class string is written out literally because Tailwind's compiler only sees literal classes.
 */
export const THEME_STORAGE_KEY = 'atlas-news-theme';

export const THEME_CLASSES = [
  /* light (also the system default) */
  '[--n-paper:249_247_242] [--n-surface:255_255_255] [--n-ink:20_21_26] [--n-muted:88_91_102] [--n-line:226_221_211]',
  '[--n-accent:13_112_124] [--n-brand:52_43_124] [--n-night:17_18_24] [color-scheme:light]',
  /* explicit dark */
  'data-[theme=dark]:[--n-paper:13_14_18] data-[theme=dark]:[--n-surface:23_25_31] data-[theme=dark]:[--n-ink:236_234_228]',
  'data-[theme=dark]:[--n-muted:163_166_176] data-[theme=dark]:[--n-line:49_52_61] data-[theme=dark]:[--n-accent:99_205_217]',
  'data-[theme=dark]:[--n-brand:172_164_240] data-[theme=dark]:[--n-night:7_8_11] data-[theme=dark]:[color-scheme:dark]',
  /* system dark, unless the reader chose light */
  'dark:[&:not([data-theme=light])]:[--n-paper:13_14_18] dark:[&:not([data-theme=light])]:[--n-surface:23_25_31]',
  'dark:[&:not([data-theme=light])]:[--n-ink:236_234_228] dark:[&:not([data-theme=light])]:[--n-muted:163_166_176]',
  'dark:[&:not([data-theme=light])]:[--n-line:49_52_61] dark:[&:not([data-theme=light])]:[--n-accent:99_205_217]',
  'dark:[&:not([data-theme=light])]:[--n-brand:172_164_240] dark:[&:not([data-theme=light])]:[--n-night:7_8_11]',
  'dark:[&:not([data-theme=light])]:[color-scheme:dark]',
].join(' ');

/**
 * Runs before first paint as the root's first child: applies a stored explicit choice, so a reader who
 * picked dark never sees a light flash. Wrapped in try/catch because storage can be unavailable.
 */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.currentScript.parentElement.setAttribute('data-theme',t);}}catch(e){}})();`;
