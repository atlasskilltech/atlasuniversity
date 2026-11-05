/*
 * Content for /schools/isdi/events/creative-showcases —
 * reference/schools/isdi/events/creative-showcases.php, one module per section
 * under ./events-creative-showcases.
 *
 * `$css = "…68ee2166dcb0ec405538bf17-0ac23f5ef.css"` — its own sheet (local) —
 * over the shared sheet and the same CDN third sheet the other Events pages load.
 * `$body = "body isdi-page"`.
 *
 * **It opens no database connection**, so nothing here is a snapshot, and the
 * mirror is current. It is a flat `.php`, so production serves it at the SLASHLESS
 * url and 500s on the trailing slash — like immersions, skill-&-tech and the three
 * flat Success Stories pages. The route segment has no `&`.
 *
 * ── Same fifth-template as immersions / skill-&-tech, three sections ──────────
 * Hero (`.swiperprogress`, 3 slides) + `.sticky-menus.center` (3 links) + one
 * `.white-wrapper > .container` with three `.common-wrapper-lg` sections and NO
 * trailing empty `.common-wrapper`: Studio Day (grid), Sensorium – Fashion Show
 * (11 motion cards) and Graduate Showcase – Design Odyssey (grid).
 *
 * ── The two grids are a THIRD PhotoGallery case: `plain` ──────────────────────
 * They are authored `.duplicate-grid-wrapper > .grid-gallery-flex.mrgtp`, NOT the
 * `.instagram-wrapper.mobile-vert-scroll.mar-0` immersions/skill-&-tech use.
 * `.duplicate-grid-wrapper` has NO CSS rule in the page sheet (inert), and the
 * sheet has no ≤540 rule for the bare grid, so it keeps its ≤767 form all the way
 * down — two 48% columns that wrap, never a horizontal scroller. That is
 * `PhotoGallery`'s new `variant="plain"`, passed through `PhotoWall`'s
 * `galleryVariant`. (The same `.duplicate-grid-wrapper` on the completed
 * /atlas-isdi-advantage/industry-centric-approach wraps the MERGED element — all
 * three classes on one div — which is a different case and stays `merged`.)
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title`/`$description` are the ISDI template's unedited placeholders;
 *     `$keywords` is "atlas, contact".
 *   - all three hero slides carry the same title ("Creative Showcases") and the
 *     same lead; only the photograph changes. The lead carries two authored
 *     `<br/>` (kept as `\n` for `withBreaks`). The hero `sizes` is
 *     `(max-width: 1439px) 100vw, 1365.9765625px`, not the 1366px of the two
 *     earlier Events heroes.
 *   - **Graduate Showcase reuses immersions' own `local` photographs** — the same
 *     eight `immersions-and-experiences-swiper2*` files in the same column order —
 *     so its data points at the existing
 *     `/assets/images/schools/isdi/events/immersions/local/*.webp` rather than
 *     duplicating them.
 *   - every `.motion-card` authors an EMPTY `.mc-text-wrap` (bare photographs);
 *     every grid `img.insta-image-rect` and the motion cards carry `.isdi` (r16).
 *
 * ── Assets ───────────────────────────────────────────────────────────────
 * 31 new CDN PNGs → 31 WebP under public/assets/images/schools/isdi/events/
 * creative-showcases/ (10.49MB → 2.18MB at q95; grainy source caps around SSIM
 * 0.985-0.997 — the encoder's ceiling, confirmed by the screenshot diff vs
 * production). 8 more reuse immersions' local webps already on disk.
 */
export { hero } from './events-creative-showcases/hero';
export { menu } from './events-creative-showcases/menu';
export { studioDay } from './events-creative-showcases/studio-day';
export { sensorium } from './events-creative-showcases/sensorium';
export { graduateShowcase } from './events-creative-showcases/graduate-showcase';
