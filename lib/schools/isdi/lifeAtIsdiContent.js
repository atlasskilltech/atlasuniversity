/*
 * Content for /schools/isdi/life@atlas-isdi —
 * reference/schools/isdi/life@atlas-isdi/index.php, one module per block under
 * ./life-at-isdi.
 *
 * `$css = "…68e778e2154fcb3a9f455274-f6f67c525.css"`, `$body = "body isdi-page"`.
 *
 * **It opens no database connection**, so nothing here is a snapshot — and the
 * mirrored PHP is current: all 21 blocks were diffed node by node against
 * production and 20 are identical, the 21st differing only by the `$chatBxText`
 * the splice does not substitute (the behaviour /atlas-isdi-advantage/
 * internationalisation already records).
 *
 * **The mirror looked a block SHORT of production and is not.** A naive
 * `<?php … ?>` strip swallows both body includes, and both resolve to the ATLAS
 * reference ROOT rather than ISDI's own tree:
 * `../../../assets/include/more-questions.php` (block 20) and
 * `../../../assets/include/faq/isdi/life-at-isdi.php` (block 21, eight items).
 * Resolve an include's `../` before concluding upstream has drifted.
 *
 * It is a DIRECTORY with an `index.php`, so production serves it at the trailing
 * slash and 301s the slashless path — the opposite of the three flat `.php` pages
 * in Success Stories, and the same as `success-stories/success-snapshot/`. The
 * header menu links the slashless form and Next normalises the other way.
 *
 * **The route segment contains a literal `@`.** Next serves it (a parallel-route
 * slot is `@folder`, where the `@` LEADS the segment; here it is mid-name), and
 * the percent-encoded spelling 404s — the same global behaviour the fourteen `&`
 * routes already carry, not anything this page introduces.
 *
 * ── Reference notes, transcribed as authored ─────────────────────────────
 *   - `$title` and `$description` are the ISDI template's unedited placeholders
 *     ("ATLAS SkillTech University" / "Get in touch with Atlas Skilltech."), the
 *     same pair placements, startups and the two Advantage pages carry.
 *   - **Neither motion carousel repeats cleanly.** "Vibes that go viral" authors
 *     its six cards twice (12 slides); "Service learning and SSR" authors its
 *     first SIX twice and then seven more unique ones (19 slides). Every authored
 *     slide travels, in order — collapsing either would change the track.
 *   - two of the twelve "Vibes" subtitles hold only a zero-width non-joiner: an
 *     EMPTY line that still takes its own 14px of padding and a line box.
 *   - the week grid's Monday column opens with a `.w-embed` holding only a
 *     `<style>`. It is 0x0 and paints nothing, but it is a child of a
 *     `space-between` column with a 16px gap, so it consumes a gap AND a
 *     distribution slot — rendered as an empty div.
 *   - that `<style>` declares `.mon-cell-1:hover .hover-img { display: block }`,
 *     and **no element on the page carries `.hover-img`** — the five
 *     `.grid-hover-img` images are `display: none` and never paint. Not rendered,
 *     and their files are not shipped.
 *   - the week grid misspells Thursday as "Thrusday".
 *   - `.icon-image.isdi` and `.icon-image.isdi-blue-5` are both `#173a87`, so the
 *     two tones the markup distinguishes render identically.
 *   - the housing block opens with an EMPTY `.common-wrapper`, which is still a
 *     50px-top-padding box and still moves what follows.
 *   - the "Life in Mumbai" tab set authors EIGHT tabs and its last two panes hold
 *     the SAME map (`other-services.png`); the seventh is labelled "Hospitals".
 *   - every `.slider-card-wrapper` carries `data-slider-card-a-bg` read by a
 *     script targeting `.slider-card-a`, a class nothing here has — the dead
 *     script /life-at-atlas records. What paints is the authored
 *     `img.slide-image-a`.
 */
export { hero } from './life-at-isdi/hero';
export { menu } from './life-at-isdi/menu';
export { clubs } from './life-at-isdi/clubs';
export { fest } from './life-at-isdi/fest';
export { intercollegiate } from './life-at-isdi/intercollegiate';
export { sports } from './life-at-isdi/sports';
export { council } from './life-at-isdi/council';
export { members } from './life-at-isdi/members';
export { byStudents } from './life-at-isdi/byStudents';
export { welfare } from './life-at-isdi/welfare';
export { wellness } from './life-at-isdi/wellness';
export { support } from './life-at-isdi/support';
export { community } from './life-at-isdi/community';
export { housing } from './life-at-isdi/housing';
export { mumbai } from './life-at-isdi/mumbai';
export { favourites } from './life-at-isdi/favourites';
export { week } from './life-at-isdi/week';
export { moto } from './life-at-isdi/moto';
export { banner } from './life-at-isdi/banner';
export { search } from './life-at-isdi/search';
export { faq } from './life-at-isdi/faq';
