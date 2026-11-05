/*
 * Content for /schools/isdi/success-stories/masters-progression —
 * reference/schools/isdi/success-stories/masters-progression.php, one module per
 * block under ./masters-progression.
 *
 * `$css = "…68e7910cfd354f81f55224f6-5020c8a92.css"` — the only ISDI page in the
 * port whose own `$css` is the CDN sheet the others load as their THIRD stylesheet,
 * so it loads that file twice (once from the school's own assets path and once from
 * `cdn.prod.website-files.com`) and no third sheet of its own. `$body = "body
 * isdi-page"`, so the 50px ISDI section padding applies.
 *
 * **It opens no database connection**, so nothing here is a snapshot — and the
 * mirrored PHP is current: its live card count, its commented-out card count, its
 * text nodes and its media urls were diffed one by one against production across all
 * four content blocks and are identical. It was still measured against production,
 * because the local mirror renders in quirks mode and its ISDI `$domain` is broken.
 *
 * It is a flat `.php`, so production serves it at the **slashless** url and 500s on
 * the trailing slash — the third page in this column to do so (`placements` and
 * `startups` are the others; only `success-snapshot/` is a directory and 301s the
 * other way).
 *
 * Four blocks: a photographic hero, the three-figure band, the "Guiding you to
 * Masters Success" story pair, and the 23-card wall. No sticky menu, no carousel,
 * no logo marquee, no "More questions?" panel and **no FAQ** — so, like
 * `placements`, it carries no shared-FAQ bucket.
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - **`$title` and `$description` are another page's.** They read "Design &
 *     Innovation Programs in Mumbai – ATLAS ISDI" and "Want a creative career?
 *     Explore product design, communication design, fashion design, interior
 *     design, UX and innovation-focused UG programs." — undergraduate-programme
 *     copy on a Masters Progression page. Unlike `placements` and `startups`, which
 *     carry the ISDI template's unedited placeholders, these are edited copy that
 *     belongs somewhere else. `$keywords` is the template's "atlas, contact".
 *   - **The card list carries an authoring note**, `<!-- ...continues same pattern
 *     for all 21 -->`, sitting between the third and fourth cards. It is real
 *     upstream markup, not a mirroring artefact — production serves it byte for
 *     byte — and it is wrong twice over: the list holds 23 live cards, not 21, and
 *     the note interrupts a list that is written out in full either way. Not
 *     reproduced; an HTML comment paints nothing.
 *   - **Two cards are commented out line by line** — Divya Das (MS in Public
 *     Health, California College of the Arts) and Shreya Shrivastava (MS in Public
 *     Health, UAL Central Saint Martins). Both are commented on production too, so
 *     23 of the 25 authored cards render. Dead markup, not ported, and their two
 *     photographs are not shipped.
 *   - **Card 7 pairs the wrong photograph with its name**: the image is
 *     `student/mishka-kavarana.jpg` and the name reads "Rahul Nayak". Transcribed as
 *     authored — the reference renders Mishka Kavarana's portrait over that name.
 *   - the h1 ends with an authored `<br />`. A trailing `<br>` before the end of a
 *     block generates no extra line box, and the heading measures one line (67.2px
 *     at 1440) on production, so it is stored trimmed.
 *   - six marks are cited by more than one card — `ual-central-saint-martins.jpg`
 *     by three, `royal-college-of-art.jpg` by three, and
 *     `the-glasgow-school-of-art.jpg` and `parsons-the-new-school.jpg` by two each.
 *   - every one of the 46 images is decorative and none carries an `alt` attribute,
 *     so all of them ship `alt=""`.
 *   - the cards are plain `<div>`s, so **the page has no link in its content at
 *     all** — the same as `placements` and `startups`.
 */
export { hero } from './masters-progression/hero';
export { stats } from './masters-progression/stats';
export { story } from './masters-progression/story';
export { wall } from './masters-progression/wall';
