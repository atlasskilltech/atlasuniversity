/*
 * Content for /schools/isdi/atlas-isdi-advantage/industry-centric-approach —
 * reference/schools/isdi/atlas-isdi-advantage/industry-centric-approach.php, one
 * module per block under ./industry-approach.
 *
 * `$css = "…68e38d03f5c8b3970ccb2a48-2c34df14f.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies throughout.
 *
 * **It opens no database connection** and has no trailing `<script>`, so nothing
 * here is a snapshot. It was measured against production, because the local mirror
 * renders in quirks mode and its ISDI `$domain` is broken.
 *
 * **It is served at the SLASHLESS url only.** Unlike its two sibling pages in this
 * column — which are directories with an `index.php` and 301 to the trailing slash —
 * this one is a flat `.php` file: production answers 200 on
 * `…/industry-centric-approach` and **500** on `…/industry-centric-approach/`.
 *
 * Sixteen blocks: the hero, a three-figure band, "Built Around You", "Alliances
 * that Power our Future" (six logo tabs), a figures strip with a logo marquee, the
 * Advisory Board, "Big Names. Bigger Learnings.", the ATLAS HR Conclave, and six
 * `.icon-heading` sections (Curriculum, Masterclasses, Projects, Visits, Career,
 * Certifications), then "More questions?" and the FAQ.
 *
 * "More questions?" is included with byte-identical `$chatBxVariant` /
 * `$chatBxText` to the other ISDI pages', so that export is re-used.
 */
export { hero } from './industry-approach/hero';
export { stats } from './industry-approach/stats';
export { builtAround } from './industry-approach/builtAround';
export { alliances } from './industry-approach/alliances';
export { figures } from './industry-approach/figures';
export { advisory } from './industry-approach/advisory';
export { bigNames } from './industry-approach/bigNames';
export { conclave } from './industry-approach/conclave';
export { curriculum } from './industry-approach/curriculum';
export { masterclasses } from './industry-approach/masterclasses';
export { projects } from './industry-approach/projects';
export { visits } from './industry-approach/visits';
export { career } from './industry-approach/career';
export { certifications } from './industry-approach/certifications';
export { faq } from './industry-approach/faq';

/* the same include with the same two parameters as every other ISDI page's */
export { isdiAboutSearch as search } from './aboutContent';
