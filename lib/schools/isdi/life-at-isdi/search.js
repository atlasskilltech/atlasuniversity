/*
 * "More questions?" — this page's block 20.
 *
 * The include is `../../../assets/include/more-questions.php`, which resolves to
 * the ATLAS reference ROOT rather than ISDI's own tree, and it is byte-identical
 * to the one the ISDI About page carries: the same label, sub-text, action,
 * field name, placeholder, flower and `faq-vector.png` wash, and the same two
 * icons (`flower-new.svg` and `search-white.svg` both map to files already in
 * `public/assets/icons/`). So the About page's module is re-exported rather than
 * transcribed a second time, the call `lib/managementContent.js` already makes
 * for its FAQ.
 *
 * The page authors NO heading above the panel — `.search-ques-wrap` is the only
 * child of its `.container` — so `data.heading` is deliberately absent.
 */
export { isdiAboutSearch as search } from '../about/search';
