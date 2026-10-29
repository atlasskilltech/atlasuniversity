/*
 * Content for /schools/isdi/success-stories/startups —
 * reference/schools/isdi/success-stories/startups.php, one module per block
 * under ./startups.
 *
 * `$css = "…68f1f6c379bf20774656f8aa-9495693a8.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies.
 *
 * **It opens no database connection**, so nothing here is a snapshot — and the
 * mirrored PHP is current: its text nodes and its media urls were diffed one by one
 * against production across all six content blocks and are identical (the FAQ
 * include among them). It was still measured against production, because the local
 * mirror renders in quirks mode and its ISDI `$domain` is broken.
 *
 * It is a flat `.php`, so production serves it at the **slashless** url — the
 * trailing slash answers 500, exactly as its sibling `success-stories/placements`
 * does and the opposite of `success-stories/success-snapshot/`, which is a
 * directory with an `index.php`.
 *
 * Six blocks: a photographic hero (`.inner-header-wrapper.full-ht`), the
 * three-figure band, the "Startups that shape the future" story pair, the
 * 18-card "Spotlighting student startups" wall, an 18-mark logo marquee in a
 * `.section.nopad`, and the FAQ.
 *
 * **The FAQ include comes from the ATLAS reference root, not ISDI's own tree.**
 * `$arrow = "isdi-down-arrow.svg"` and the include is
 * `../../../assets/include/faq/isdi/startup.php`, which resolves to
 * `reference/assets/include/…` — the same place The ISDI Advantage takes both of
 * its includes from. Resolve an include's `../` before assuming which tree it is
 * in.
 *
 * Reference notes, transcribed as authored:
 *   - `$title` and `$description` are the ISDI template's unedited placeholders
 *     ("ATLAS SkillTech University" / "Get in touch with Atlas Skilltech."), the
 *     same pair placements, The ISDI Advantage and industry-centric-approach carry.
 *     `$keywords` is "atlas, contact".
 *   - the first two FAQ questions are near-twins of two in FAQ **master 1** (the
 *     set /programs/ug/ug-design-and-innovation and the ISDI About page render) —
 *     "Does ISDI provide support for aspiring entrepreneurs?" is word for word, and
 *     "Can ATLAS ISDI students start their ventures after graduation?" differs only
 *     by the "ATLAS". Their ANSWERS are different copy with different list items,
 *     and master 1 authors every text node inside a `<strong>` where this include
 *     authors none, so nothing is re-exported: this is its own three-question set.
 *   - the third question, "Does ISDI support entrepreneurship?", is a third
 *     rewording of the first.
 *   - every one of the 36 images in the gallery and the 18 in the marquee is
 *     decorative; the 18 card photographs carry no `alt` attribute at all and the
 *     company marks carry `alt=""`, so all of them ship `alt=""`.
 *   - the gallery cards are plain `<div>`s and the marquee marks bare `<img>`s, so
 *     the page's only links are the header's and the footer's.
 */
export { hero } from './startups/hero';
export { stats } from './startups/stats';
export { story } from './startups/story';
export { gallery } from './startups/gallery';
export { marquee } from './startups/marquee';
export { faq } from './startups/faq';
