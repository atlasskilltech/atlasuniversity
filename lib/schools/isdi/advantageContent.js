/*
 * Content for /schools/isdi/atlas-isdi-advantage/the-isdi-advantage —
 * reference/schools/isdi/atlas-isdi-advantage/the-isdi-advantage/index.php, one module
 * per block under ./advantage.
 *
 * `$css = "…68e627c41ec6f0a16902d5e6-59120e946.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies throughout.
 *
 * **It opens no database connection at all** — no `mysqli`, no `getAdmissionCycles`, no
 * `showDate` — so nothing here is a snapshot. It was still measured against production,
 * because the local mirror renders in quirks mode and its ISDI `$domain` is broken.
 *
 * The mirror is CURRENT for this page: its rendered text was diffed node by node against
 * production and is identical (the only two hunks are the `$chatBxText` the splice did not
 * substitute, and the site chatbot embed). That is worth stating because this page pulls
 * two of its three includes from the ATLAS reference root rather than ISDI's own —
 * `../../../../assets/include/more-questions.php` and
 * `../../../../assets/include/faq/isdi/advantage/isdi-advantage.php` — and those files
 * predate the October ISDI refresh.
 *
 * Fifteen blocks: the hero, the ten-link sticky menu, an overview pair, nine numbered
 * `.icon-heading` sections, "Publications & Research Papers", "More questions?" and the
 * FAQ. The nine numbered sections are `#parsons-collabrations`, `#location`,
 * `#industry-connect-isdi`, `#global-exposure-isdi`, `#infra-isdi`, `#student-welfare`,
 * `#tailored-pathway`, `#future-skills` and `#research-driven-isdi`.
 *
 * **Two ids are authored twice** — `student-welfare` and `global-exposure-isdi`, each on a
 * section AND on its own `.icon-main-title`. Each is kept on the section only, the call
 * every duplicate id in this rebuild has had. The three title ids that are NOT duplicates
 * (`Infrastructure-isdi`, `graduate-attributes`, `tailored-pathways`) are rendered, and two
 * of them are what the ISDI header menu's "Graduate Attributes" and "Tailored Pathways"
 * entries point at.
 *
 * **The vision cards are upstream placeholder copy.** All six read "Transformative
 * Learning" over the same sentence. Transcribed as authored.
 */
export { hero } from './advantage/hero';
export { menu } from './advantage/menu';
export { overview, vision } from './advantage/overview';
export { parsons } from './advantage/parsons';
export { location } from './advantage/location';
export { industry } from './advantage/industry';
export { globalExposure } from './advantage/global-exposure';
export { infra } from './advantage/infra';
export { welfare } from './advantage/welfare';
export { pathway } from './advantage/pathway';
export { future } from './advantage/future';
export { research } from './advantage/research';
export { publications } from './advantage/publications';
/* The "More questions?" panel is the shared ISDI one, field for field — label,
   sub-text, action, placeholder, flower and wash all identical — so it is
   re-exported rather than transcribed a seventh time. */
export { isdiAboutSearch as search } from './aboutContent';
export { faq } from './advantage/faq';
