/*
 * Content for /schools/isdi/events/skill-&-tech-innovations —
 * reference/schools/isdi/events/skill-&-tech-innovations.php, one module per
 * section under ./events-skill-tech.
 *
 * `$css = "…68edfd4bbb15da9c1d5debe1-b3dcdbb22.css"` — its own sheet — over the
 * shared sheet and the same CDN third sheet the other Events pages load.
 * `$body = "body isdi-page"`.
 *
 * **It opens no database connection**, so nothing here is a snapshot, and the
 * mirror is current. It is a flat `.php`, so production serves it at the
 * SLASHLESS url and answers 500 on the trailing slash — like
 * events/immersions-&-experiences and the three flat Success Stories pages. The
 * route segment carries a literal `&`, which Next serves and whose
 * percent-encoded spelling 404s — the documented global behaviour of the
 * fourteen other `&` routes.
 *
 * ── Same template as events/immersions-&-experiences, minus the tabs ─────────
 * The hero (`.swiperprogress`, 3 slides), the `.sticky-menus.center` anchor bar
 * and the single `.white-wrapper > .container` are identical in shape. The six
 * content sections are `.common-wrapper-lg` children, alternating MotionWall
 * (`.zoom-slider` motion cards), PhotoWall (`.instagram-wrapper` grid) and one
 * WideSlider (`.zoom-slider-lg` `.slider-card-b`). There is no Global-Immersions
 * tab set here, and `#tech-exploratorium` sits on the SECTION, not the heading.
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title` / `$description` are the ISDI template's unedited placeholders
 *     ("ATLAS SkillTech University" / "Get in touch with Atlas Skilltech.");
 *     `$keywords` is "atlas, contact".
 *   - all three hero slides carry the SAME title ("Skill & Tech Innovation") and
 *     the same lead; only the photograph changes. The lead is an upstream
 *     copy-paste: it begins with the title run straight into the sentence
 *     ("Skill & Tech InnovationHands-on workshops…"). Kept verbatim.
 *   - the `abcd` wall authors NINE motion cards and then repeats all nine (18
 *     slides); every authored slide is transcribed, in order.
 *   - every `.motion-card` authors an EMPTY `.mc-text-wrap`: bare photographs
 *     with the wrap still in the DOM (MotionCard renders the wrap, no plate).
 *   - every grid `img.insta-image-rect` and `.slider-card-b` carry `.isdi`
 *     (16px radius); the grid wrapper is `.mobile-vert-scroll.mar-0` and the row
 *     `.grid-gallery-flex.mrgtp`, exactly as immersions.
 *   - each `.slider-card-b` carries `data-slider-card-a-bg="Paste image url"`,
 *     read by a script targeting `.slider-card-a` — a class nothing here has.
 *     The dead script /life-at-atlas records; not reproduced.
 *   - the page ends with an EMPTY `.common-wrapper` inside the container (50px of
 *     top padding). There is no "More questions?" panel and no FAQ.
 *
 * ── Assets ───────────────────────────────────────────────────────────────
 * 67 CDN PNGs → 67 WebP under public/assets/images/schools/isdi/events/skill-tech/
 * (20.15MB → 4.81MB at q95). These source photographs are grainier than the
 * immersions set, so even a visually-identical near-lossless q95 WebP caps around
 * SSIM 0.986-0.997 — the encoder's achievable ceiling for THIS source, the same
 * calibration CLAUDE.md records for the grainy luxury-brand clip — so the
 * conversion is decided on the ~76% saving and confirmed by the screenshot diff
 * against production (which serves the PNGs), not by a flat 0.999 constant.
 */
export { hero } from './events-skill-tech/hero';
export { menu } from './events-skill-tech/menu';
export { handsOnWorkshop } from './events-skill-tech/workshop';
export { designHackathon } from './events-skill-tech/hackathon';
export { techExploratorium } from './events-skill-tech/exploratorium';
export { handsOfHeritage } from './events-skill-tech/heritage';
export { abcd } from './events-skill-tech/abcd';
export { inkImagination } from './events-skill-tech/ink';
