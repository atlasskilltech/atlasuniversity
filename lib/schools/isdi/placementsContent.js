/*
 * Content for /schools/isdi/success-stories/placements —
 * reference/schools/isdi/success-stories/placements.php, one module per block
 * under ./placements.
 *
 * `$css = "…68f1f89e15d0a283b7396386-534dbd59c.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies.
 *
 * **It opens no database connection**, so nothing here is a snapshot — and the
 * mirrored PHP is current: its text nodes and its media urls were diffed one by
 * one against production across all three content blocks and are identical (51 /
 * 51 text nodes, 51 / 51 media urls). It was still measured against production,
 * because the local mirror renders in quirks mode and its ISDI `$domain` is broken.
 *
 * It is a flat `.php`, so production serves it at the **slashless** url — the
 * trailing slash answers 500, the opposite of its sibling
 * `success-stories/success-snapshot/`, which is a directory with an `index.php`.
 *
 * Three blocks only: a photographic hero (`.inner-header-wrapper.full-ht`), the
 * three-figure band, and one `.section` holding "From ATLAS ISDI to the World's
 * Best Companies" over a 21-card `.transfer-card-wrapper`. No sticky menu, no
 * carousel, no "More questions?" panel and no FAQ.
 *
 * Reference notes, transcribed as authored:
 *   - `$title` and `$description` are the ISDI template's unedited placeholders
 *     ("ATLAS SkillTech University" / "Get in touch with Atlas Skilltech."), the
 *     same pair The ISDI Advantage and industry-centric-approach carry.
 *   - "kaustub pingali" is the only one of the 21 names in lower case, and
 *     "Diva Ghanshani " is authored with a trailing space (which HTML collapses,
 *     so it is stored trimmed).
 *   - two students are placed at the same company, so `tira.jpg` is cited twice.
 *   - only the first 7 of the 21 cards give their two `<img>`s an `alt=""`; the
 *     other 14 carry no `alt` attribute at all. Every one of the 42 is decorative,
 *     so all of them ship `alt=""` — the same rendering, and what the attribute
 *     means where it is authored.
 */
export { hero } from './placements/hero';
export { stats } from './placements/stats';
export { wall } from './placements/wall';
