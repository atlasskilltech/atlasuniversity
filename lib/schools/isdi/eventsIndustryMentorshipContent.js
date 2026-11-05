/*
 * Content for /schools/isdi/events/industry-and-mentorship —
 * reference/schools/isdi/events/industry-and-mentorship.php, one module per
 * section under ./events-industry-mentorship.
 *
 * `$css = "…68ee34c185f7babff368afda-c1d564dad.css"` — its own sheet — over the
 * shared sheet and the same CDN third sheet the other Events pages load.
 * `$body = "body isdi-page"`.
 *
 * It opens no database connection, so nothing here is a snapshot and the mirror is
 * current. It is a flat `.php`, so production serves it at the SLASHLESS url and
 * 500s on the trailing slash — like immersions, skill-&-tech, creative-showcases
 * and the three flat Success Stories pages. The route segment carries no `&`.
 *
 * ── The fifth template again, the LARGEST Events page ────────────────────────
 * Hero (`.swiperprogress`, 3 slides, same title/lead) + the BARE `.sticky-menus`
 * (NOT `.center`, so left-aligned — `AnchorMenu centered={false}`, 12 links) +
 * one `.white-wrapper` holding fourteen content sections and a trailing empty
 * `.common-wrapper`.
 *
 * Eight nested PhotoWall grids (Creative Catalyst 16, ATLAS RTC 8, Alumni Talks 8,
 * Masterclasses 8, Global Masterclasses 8, ConSERV 8, Friends of Figma 8) plus the
 * bare `.duplicate-grid-wrapper` WDCD (8, `galleryVariant="plain"`); two MotionWall
 * `.zoom-slider` walls (Co Elev8 14, Parsons Week 16 — 7 and 8 cards authored
 * twice); two WideSlider `.zoom-slider-lg` `.slider-card-b` walls (Guest Lectures
 * 6, SNAP-AR 6); an AIDC heading-only block (`Heading`); and the AIDC mentors
 * marquee (`MentorMarquee`).
 *
 * ── The AIDC mentors marquee is the homepage advisory board again ────────────
 * `.swiper.marquee-swiper > 14 x .card-type-d`, a DIRECT child of `.white-wrapper`
 * (full-bleed, outside any `.container`), rendered through the shared `MarqueeTrack`
 * + `PersonCard`. The eleven mentors, their roles and ten of their eleven logos are
 * the ISDI homepage advisory board's exactly — the 10 shared logo files are
 * byte-identical (SHA-1-proven) so they are reused from
 * `/assets/images/schools/isdi/home/advisory-board/`; only Neeta Lulla's logo
 * (image-5, 55x29 PNG) is new. EVERY `a.play-icon` is authored empty, so no card
 * carries a video and no play button renders — the rule the industry-centric page's
 * ten empty advisors record. The 14 portraits are this page's own.
 *
 * ── The `#Creative-catalyst` anchor id is on the H2, not the wrapper ─────────
 * Every other section authors its id on the `.common-wrapper-lg`; Creative Catalyst
 * authors it on the `<h2>`, so it is passed as `PhotoWall`'s `headingId`.
 * `#Masterclasses` is a section the menu does NOT link (the menu's "Global
 * Masterclasses" points at `#Global-masterclasses`).
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title`/`$description` are the ISDI template's unedited placeholders;
 *     `$keywords` is "atlas, contact".
 *   - all three hero slides carry the same title ("Industry & Mentorship") and the
 *     same lead; only the photograph changes. The hero `sizes` is
 *     `(max-width: 1366px) 100vw, 1366px`.
 *   - Creative Catalyst's heading carries an authored `<br/>`
 *     ("Industry Engagement & Leadership/ <br /> Creative catalyst"); Masterclasses'
 *     carries a trailing `<br/>` (no extra line box, stored one line).
 *   - ConSERV authors grid-6-004 twice (grid-6-005 is absent); Friends of Figma
 *     borrows one immersions `local` photo; every `.motion-card` authors an EMPTY
 *     `.mc-text-wrap`; every grid img and the motion cards carry `.isdi` (r16);
 *     each `.slider-card-b` carries the dead `data-slider-card-a-bg` script the
 *     other Events pages record (not reproduced).
 *
 * ── Assets ───────────────────────────────────────────────────────────────
 * 159 references: 148 new CDN PNGs → WebP under
 * public/assets/images/schools/isdi/events/industry-mentorship/ (36.79MB → 8.21MB
 * at q95; grainy event photos cap ~SSIM 0.977-0.998, the encoder's ceiling,
 * confirmed by the static-grid screenshot diff vs production) with Neeta's logo
 * kept PNG; 10 shared logos reuse the homepage board's files and 1 photo reuses
 * immersions' `local` webp.
 */
export { hero } from './events-industry-mentorship/hero';
export { menu } from './events-industry-mentorship/menu';
export { creativeCatalyst } from './events-industry-mentorship/creative-catalyst';
export { atlasRtc } from './events-industry-mentorship/atlas-rtc';
export { aidc } from './events-industry-mentorship/aidc';
export { mentors } from './events-industry-mentorship/mentors';
export { alumniTalks } from './events-industry-mentorship/alumni-talks';
export { guestLectures } from './events-industry-mentorship/guest-lectures';
export { masterclasses } from './events-industry-mentorship/masterclasses';
export { globalMasterclasses } from './events-industry-mentorship/global-masterclasses';
export { coElev8 } from './events-industry-mentorship/co-elev8';
export { conserv } from './events-industry-mentorship/conserv';
export { snapAr } from './events-industry-mentorship/snap-ar';
export { friendsOfFigma } from './events-industry-mentorship/friends-of-figma';
export { wdcd } from './events-industry-mentorship/wdcd';
export { parsonsWeek } from './events-industry-mentorship/parsons-week';
