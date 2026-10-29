/*
 * Content for /schools/isdi/atlas-isdi-advantage/internationalisation —
 * reference/schools/isdi/atlas-isdi-advantage/internationalisation/index.php, one
 * module per block under ./internationalisation.
 *
 * `$css = "…68e35e01ba04d34559eadbe7-a3a278ffa.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies throughout.
 *
 * **It opens no database connection** — no `mysqli`, no `getAdmissionCycles`, no
 * `showDate`, and no trailing `<script>` — so nothing here is a snapshot. It was
 * still measured against production, because the local mirror renders in quirks mode
 * and its ISDI `$domain` is broken.
 *
 * The mirror is CURRENT for this page: its rendered text was diffed node by node
 * against production and is identical apart from the `$chatBxText` the splice does
 * not substitute and the site chatbot embed. Like its sibling it pulls two includes
 * from the ATLAS reference root rather than ISDI's own —
 * `../../../../assets/include/more-questions.php` and
 * `../../../../assets/include/faq/isdi/advantage/internationalisation.php`.
 *
 * Fifteen blocks: the hero, a three-figure band, the seven-link sticky menu, the
 * Parsons panel, "With ATLAS Pathway…", "Our Global Partnerships" (five logo tabs),
 * five `.icon-heading` sections (`#international-events`, `#summer-school`,
 * `#global-immersion`, `#global-education-fair`, plus `#ged-isdi`, which has no icon
 * heading of its own), a logo marquee, "More questions?" and the FAQ.
 *
 * **Three ids the menu points at are not section ids.** `#overview` is on the hero's
 * `img.header-image-inner`, and the menu's "Masters Progressions" and "Global
 * Education Fair" land on `#isdi-master-prog` and `#ged-isdi`. All seven resolve.
 *
 * **`id="animate"` is authored on three `h2`s** and nothing reads it — no trailing
 * script, and webflow.js drives IX2 off `data-w-id`. Not rendered.
 *
 * **Two sections share a heading and a lead.** `#international-events` and
 * `#global-immersion` are both headed "World Class Design Education" over the
 * identical "Our internationalization isn't limited to travel…" paragraph, and take
 * the same `location.svg` plate. Transcribed as authored.
 *
 * **`.view-more-faq` is `display: none`.** The reference authors a "View More" row
 * with a plus glyph above the search panel and the stylesheet hides it, so it paints
 * nothing and is not ported.
 *
 * "More questions?" is included with byte-identical `$chatBxVariant` / `$chatBxText`
 * to /atlas-isdi-advantage/the-isdi-advantage's, so that page's `search` export is
 * re-exported rather than transcribed twice.
 */
export { hero } from './internationalisation/hero';
export { menu } from './internationalisation/menu';
export { stats } from './internationalisation/stats';
export { parsons } from './internationalisation/parsons';
export { pathway } from './internationalisation/pathway';
export { partnerships } from './internationalisation/partnerships';
export { events } from './internationalisation/events';
export { summer } from './internationalisation/summer';
export { immersion } from './internationalisation/immersion';
export { masters } from './internationalisation/masters';
export { gedFair } from './internationalisation/gedFair';
export { ged } from './internationalisation/ged';
export { logos } from './internationalisation/logos';
export { faq } from './internationalisation/faq';

/* the same include with the same two parameters as /atlas-isdi-advantage's */
export { isdiAboutSearch as search } from './aboutContent';
