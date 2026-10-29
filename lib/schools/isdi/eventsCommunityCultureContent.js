/*
 * Content for /schools/isdi/events/community-and-culture —
 * reference/schools/isdi/events/community-and-culture.php, one module per section
 * under ./events-community-culture.
 *
 * `$css = "…6904c918c961f1d5bd41d227-166c34d6d.css"` — its own sheet — over the
 * shared sheet and the same CDN third sheet the other Events pages load.
 * `$body = "body isdi-page"`.
 *
 * It opens no database connection, so nothing here is a snapshot and the mirror is
 * current. It is a flat `.php`, so production serves it at the SLASHLESS url and
 * 500s on the trailing slash. The route segment carries no `&`.
 *
 * ── The fifth template again, three sections ─────────────────────────────────
 * Hero (`.swiperprogress`, FOUR slides) + `.sticky-menus.center` (3 links) + one
 * `.white-wrapper > .container` with three `.common-wrapper-lg` sections and NO
 * trailing empty wrapper — the exact shape and nesting of creative-showcases, only
 * the two grids here are the `.instagram-wrapper.mobile-vert-scroll` NESTED variant
 * (creative-showcases' were the bare `.duplicate-grid-wrapper` plain variant):
 *   1 Community & Cultural Engagement Initiatives (`#Community--and-Cultural`) grid 8
 *   2 Parent Meetups & Open Campus Days (`#parent-meetups`) 10 `.zoom-slider` cards
 *   3 Cultural Festivals (`#Cultural-festivals`) grid 8
 *
 * ── Heavy reuse of creative-showcases, proven by identical CDN object ids ─────
 *   - Hero slide 1 (`hero-image`, object 6904c943…) IS creative-showcases' hero
 *     slide 3 — reused from `events/creative-showcases/hero/hero-image*.webp`.
 *   - the whole Cultural Festivals grid (`creativeshowcase-grid-1-*`, objects
 *     6903740…) IS creative-showcases' Studio Day grid — reused from
 *     `events/creative-showcases/studio-day/*.webp`.
 * So only 30 of the 42 image references are new (hero slides 2-4 + the two new
 * galleries); 12 are byte-identical reuses already on disk.
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title`/`$description` are the ISDI template's unedited placeholders;
 *     `$keywords` is "atlas, contact".
 *   - the hero's slide 1 is "Community & Culture"; **slides 2-4 are an upstream
 *     Creative Showcases copy-paste** — same title, lead (with two authored `<br/>`)
 *     and the three `hero-section-1/2/3` photographs — transcribed as authored.
 *   - every `.motion-card` authors an EMPTY `.mc-text-wrap`; every grid img and the
 *     motion cards carry `.isdi` (r16). The hero `sizes` is
 *     `(max-width: 1366px) 100vw, 1366px`.
 *
 * ── Assets ───────────────────────────────────────────────────────────────
 * 42 references: 30 new CDN PNGs → WebP under
 * public/assets/images/schools/isdi/events/community-culture/ (10.69MB → 2.47MB at
 * q95; grainy event photos cap ~SSIM 0.984-0.996, the encoder's ceiling, confirmed
 * by the static-grid screenshot diff vs production) + 12 reuses from
 * creative-showcases.
 */
export { hero } from './events-community-culture/hero';
export { menu } from './events-community-culture/menu';
export { communityCultural } from './events-community-culture/community-cultural';
export { parentMeetups } from './events-community-culture/parent-meetups';
export { culturalFestivals } from './events-community-culture/cultural-festivals';
