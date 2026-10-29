/*
 * Content for /schools/isdi/events/immersions-&-experiences —
 * reference/schools/isdi/events/immersions-&-experiences.php, one module per
 * section under ./events-immersions.
 *
 * `$css = "…68ed0022e440b8cbb807e9b6-ac55dac18.css"` — a sheet no earlier ISDI
 * page loads — over the shared sheet and the same CDN third sheet
 * life@atlas-isdi uses. `$body = "body isdi-page"`.
 *
 * **It opens no database connection**, so nothing here is a snapshot, and the
 * mirror is current: all three top-level blocks were diffed against production
 * node by node (28 text nodes, 70 media urls) and are identical.
 *
 * It is a flat `.php`, so production serves it at the SLASHLESS url and answers
 * **500** on the trailing slash — as `success-stories/placements`, `…/startups`
 * and `…/masters-progression` do, and the opposite of the two directory pages.
 * The route segment carries a literal `&`, which Next serves and whose
 * percent-encoded spelling 404s — the documented global behaviour of the
 * fourteen other `&` routes, not anything this page introduces.
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title` and `$description` are the ISDI template's unedited placeholders
 *     ("ATLAS SkillTech University" / "Get in touch with Atlas Skilltech."), the
 *     same pair life@atlas-isdi, placements, startups and the two Advantage
 *     pages carry. `$keywords` is "atlas, contact".
 *   - **all four hero slides carry the SAME heading and the same lead**; only
 *     the photograph changes.
 *   - the Global Immersions tab ids run **Tab 1, 2, 4, 5, 6** — Webflow's own
 *     numbering skips "Tab 3", as the homepage testimonials' does.
 *   - the Shenzhen tab authors a THIRD card with no image at all, which the
 *     reference paints as a 298 x 0 slide — the same empty card
 *     /atlas-isdi-advantage/internationalisation's Global Immersion carries.
 *   - **Field Visits and Animate & Appreciate share one lead**, word for word
 *     ("Engaging workshops movie screening and sessions focused on animation…"),
 *     and it describes the latter. An upstream copy-paste.
 *   - the id the sticky menu's last link points at, `#animate`, is on the
 *     **h2**, not on its section — the authoring the-isdi-advantage's three
 *     title ids already record.
 *   - every `.motion-card` authors an EMPTY `.mc-text-wrap`: thirteen bare
 *     photographs with the wrap still in the DOM.
 *   - each `.slider-card-b` carries `data-slider-card-a-bg="Paste image url"`,
 *     read by a script targeting `.slider-card-a` — a class nothing here has.
 *     The dead script /life-at-atlas records; not reproduced.
 *   - the page ends with an EMPTY `.common-wrapper` inside the container, which
 *     is still 50px of top padding. There is no "More questions?" panel and no
 *     FAQ — the first ISDI content page with neither since `placements`.
 */
export { hero } from './events-immersions/hero';
export { menu } from './events-immersions/menu';
export { globalImmersions } from './events-immersions/global';
export { cultureImmersions } from './events-immersions/culture';
export { localImmersions } from './events-immersions/local';
export { fieldVisits } from './events-immersions/field';
export { animate } from './events-immersions/animate';
