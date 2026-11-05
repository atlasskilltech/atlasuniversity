# ATLAS Main Website — migration tracker

Inventory of the **ATLAS main website** reference (`reference/*.php` and its non-ISDI
subfolders) against the Next.js port. **Separate from the completed 61-page ISDI tracker
(`MIGRATION-ISDI.md`) — do not mix the counts.**

Phase 1 is inventory only; no page was implemented or modified to produce this. Generated
2026-10-30.

Scope: every `.php` under `reference/` **except** `reference/assets/**` (shared includes:
`header.php`, `footer.php`, `dynamic.php`, the `faq/…`, `keydates/…`, `loans/…` partials — not
user-facing pages) and `reference/schools/isdi/**` (the completed ISDI site, tracked separately).
`schools/` contains only `isdi/` — there are no isme / law / ugdx reference pages.

Statuses: COMPLETE (a route exists and the page is built/verified) · PARTIAL (built but sections
missing) · NOT STARTED · BLOCKED (cannot build without an external dependency/decision).

## Totals

| status | pages |
| --- | --- |
| COMPLETE | 46 |
| PARTIAL | 0 |
| NOT STARTED | 0 |
| BLOCKED | 0 |
| **TOTAL unique webpages** | **46** |

`46 + 0 + 0 + 0 = 46` ✓ — **every ATLAS-main page is built** (`/job-openings` was the last; built 2026-11-02 from a dated snapshot of the live vacancies, on the user's decision).

**2026-11-02 reconciliation.** The tracker stood at 41 (40 COMPLETE + 1 BLOCKED). The user added five
new references — `anti-ragging-committee/`, `internal-complaint-committee/`, `nirf/`, `ombudsperson/`
and `women-development-cell/`, each a production **view-source capture** (`index.html`, not PHP) plus
a full-page screenshot — taking the total to **46**. All five are built and verified (rows 41-45).
Everything else under `reference/` was already counted: `brand/` is the standalone Brand Kit
(`/brand`, its own chrome — not an ATLAS-main page), `wordpress-custom-image/` holds /library's
images, `deb-application.pdf` is a document (linked from the header's "DEB Application Form"),
`advantages/atlas-internationalisation-2.php` is the skipped backup copy, and `schools/` is tracked in
`MIGRATION-ISDI.md` / `MIGRATION-ISME.md`.

## PARTIAL (0)

None. (global-pathways and global-immersions were reopened as PARTIAL on 2026-10-31 after a
twelve-width sweep showed mid-width failures — they had only been checked at 1440 and 390 — and were
fixed and re-verified the same day; see their COMPLETE rows.)

**Verification standard from 2026-10-31 on:** every partnership page is compared with production at
1920/1440/1280/1100/992/900/768/700/568/479/390/360 on section heights AND total content height
(which catches non-`<section>` blocks such as the stat band), a word-level text diff of the whole
page, per-element probes of anything fixed-height (hero, stat band, cards), carousel arrow
positions/states, console / failed requests / broken images / overflow / off-origin, ESLint, a clean
`next build`, and the full built-route regression.

**Shared causes found and fixed (apply to every partnership page still to build):**
- The pages load the Tailwind Play CDN, so Webflow's `.container` also gets Tailwind's `.container`
  max-width ladder (640/768/1024/1280/1536) → `components/Partnership/ui.js` `TW_CONTAINER`.
  (international-summerschool does NOT load it — it uses the plain 1366 container.)
- Bootstrap (loaded by header.php) overrides Tailwind's 0-5 spacing utilities with `!important`
  (`p-3`=16, `p-4`=24, `mb-2`=8, `mb-5`=48, `.order-1` too) — write those in px, never as bare 0-5
  utilities inside `.lp-bs`.
- The stat band puts the FIGURE first (36px) and a centred 20px caption second → `StatBand
  variant="figure"`. Hero leads (`.course-desc-isme.big-txt`) must be passed — a missing lead is
  invisible to height checks.
- Webflow `.w-tabs::before/::after` clearfix pseudo-elements become zero-width flex items in a flex
  tab container, spending the gap three times.
- Swiper locks its arrows by slide COUNT vs `slidesPerView`, not by pixel overflow.

## Open items on finished pages (found during later work, not changed — need a decision)

- **`ZoomSliderLg` bullet spacing on the ATLAS pages.** Production's ATLAS sheets leave Swiper's own
  `0 4px` dot margin (measured at 390 on /campus-atlas, /advantages/atlas-career-services,
  /advantages/atlas-enterprenurship, /atlas-alumni-corner); the shared component draws ISDI's
  `0 8px`, so the row of dots is 8px wider per dot on every ATLAS page that uses it (≤568 only).
  /atlas-alumni-corner opts into `dots="swiper"`; the earlier pages are untouched. Switching them is
  one prop per caller.
- **`Carousel`'s default bullet row on finished ATLAS pages (≤568 only).** Production renders
  Swiper's own rows: in-flow under `.common-swiper` (24px line, 20px above, 0 4px dots) and absolute
  30px under `.common-swiper-full`. The default row draws 8px dots in a flex row, so those blocks
  measure −16 (in-flow) or +28 (overlay) at 390 — seen on /advantages/atlas-industry-centric-approach
  (nine carousels), /life-at-atlas (two) and /success-stories-atlas. The new pages opt into
  `bullets="inline"` / `"inline-overlay"`; switching the finished pages is one prop per carousel.
- **/success-stories-atlas "Industry Testimonials" −30px ≥768.** Production marks its lead up as
  `<h2 class="sub-heading">`, so Webflow's `h2 { margin: 20px 0 10px }` applies; the port renders it
  as a plain lead (`SUB_INNER`, which `SUB_H2` exists to correct). Also −16 on two carousels at 390
  (default vs in-flow bullet row). Pre-existing; found by the shared-component spot check after
  /atlas-alumni-corner.
- **The production homepage has drifted** from the port (several sections differ by 50–900px at
  1440/390, with no shared-component cause). Observation only, like /life-at-atlas' new
  "Lead. Launch. Belong." section.

## COMPLETE (45) — built and verified (27 pre-Phase-2 + `/thought-leaderships` + all 6 partnership pages + alumni-corner, hei-relationship, industry-partnership, centre_for_research, examination, library + the five statutory pages added 2026-11-02 + /job-openings)

Home + the four standalone majors, Admissions (3), the six main Advantages pages, and the whole
Programs section (12 pages + the `/programs` redirect). All verified in prior sessions; see
`CLAUDE.md`. No PARTIAL pages — every started ATLAS-main page is finished.

| # | reference | route |
| --- | --- | --- |
| 1 | `index.php` | `/` |
| 2 | `about-us.php` | `/about-us` |
| 3 | `campus-atlas.php` | `/campus-atlas` |
| 4 | `life-at-atlas.php` | `/life-at-atlas` |
| 5 | `success-stories-atlas.php` | `/success-stories-atlas` |
| 6-8 | `admissions/{integrated,pg,ug}-admissions.php` | `/admissions/*` |
| 9 | `advantages/atlas-advantages.php` | `/advantages/atlas-advantages` |
| 10 | `advantages/atlas-career-services.php` | `/advantages/atlas-career-services` |
| 11 | `advantages/atlas-enterprenurship.php` | `/advantages/atlas-enterprenurship` |
| 12 | `advantages/atlas-industry-centric-approach.php` | `/advantages/atlas-industry-centric-approach` |
| 13 | `advantages/atlas-internationalisation.php` | `/advantages/atlas-internationalisation` |
| 14 | `advantages/atlas-multidisciplinary.php` | `/advantages/atlas-multidisciplinary` |
| 15 | `programs/index.php` | `/programs` (308 redirect → `/`, in `next.config.mjs`) |
| 16 | `programs/ug-programs-atlas.php` | `/programs/ug-programs-atlas` |
| 17 | `programs/pg-programs-atlas.php` | `/programs/pg-programs-atlas` |
| 18 | `programs/programs-list-integrated.php` | `/programs/programs-list-integrated` |
| 19-24 | `programs/ug/*.php` (6) | `/programs/ug/*` |
| 25-27 | `programs/pg/*.php` (3) | `/programs/pg/*` |
| 28 | `thought-leaderships/thought-leaderships/index.php` | `/thought-leaderships` (built Phase 2, 2026-10-30) |
| 29 | `advantages/partnership/collaborative-projects.php` | `/advantages/partnership/collaborative-projects` (built 2026-10-31; **re-verified at all twelve widths 2026-10-31**) — InnerPageHero + StatBand + About story + a 5-card `.career-sup-card` swiper + four media carousels + Research Partnerships (11-slide swiper) + the closing YouTube block. **Every section matches production to the pixel at 1920/1440/1280/1100/992/900/768/700/568/479/390/360 except Research.** Research residual is exactly one dead asset: each slide's image is an `atlas-global/wp-content` URL that 403s for every visitor (the whole `/atlas-global/` path answers 403 with the homepage as its body — not a bot challenge), so production paints a broken-image placeholder (alt text in a shadowed box): −24px at 768-992 (one alt line), −48 at ≥1024 (+ its `lg:mb-6`) and at 479-700 (alt wraps), −72 at ≤390 (slide 1's alt wraps to 3 lines). Not reproduced (no broken assets); restoring the 11 images upstream would close it. **Causes fixed this session** (the earlier "+367px" / "font-metric" explanations were wrong): (1) Webflow `.container` also gets the Tailwind Play CDN's `.container` max-width ladder (640/768/1024/1280/1536) — the port used `max-w-7xl`/1366, right only ≥1280; now `components/Partnership/ui.js` `TW_CONTAINER`; (2) `AboutStory` used fixed 578/546px columns stacking at 992 — production is `.abt-cont-ugdx-1` 50% + an auto image column, `space-between`, wrapping only at ≤767, 16px text / 36px h2 / 40px spacer at ≤767, square image corners (32px 0 at ≤767), `vertical-align: super`; (3) Research slides lacked `lg:p-16`, used the 1.5 line-height pin (prod 36px base / 40px ≥1024) and a 24px `lg:mb-6` that Bootstrap's `!important` `.mb-2` overrides to 8px everywhere; the intro had an invented 42px margin and #1a1a1a/#333 where prod is #000; (4) S1 and the closing block rebuilt as the real `.head-wrap`/`.tt-wrap`/`h2.h2-tag.mrg16`/`.sub-heading.mrgbtm` (`SUB_INNER_MRGBTM`), S1 slides 1/2/3-per-view (MediaCarousel default) with the fixed 398x622 card overflowing its slide as on prod, titles keep their authored `<br>`, and the page's own `<style>` `.cr-title{font-size:30px}` (new additive `CareerSupportCard` `titleVariant="manrope30"`); closing embed frame is `32px 0` radius, not 16. 0 console / 0 failed / 0 broken / 0 overflow / 0 off-origin at all 12 widths; all 6 carousels advance at 1440 & 390; YouTube embed 1156x649 / 346x194; every non-200 link is shared header/footer chrome. ESLint 0; clean build `○ Static`. **Later the same day:** the stat band was found wrong (caption-first 24px instead of production's figure-first 36px — equal 208px height, so no height check saw it) and now uses `StatBand variant="figure"`; the hero lead "Global Learning Together" was missing and is restored; the closing block is the shared `VideoBlock`. Band identical to production at 1440/768/390; text identical. **Carousel controls corrected (later still):** `MediaCarousel` drew 40px white circles hidden below 640; production uses Swiper's default black 27×44 chevrons at every width and Swiper's default bullets, and S1 has no pagination at all — now matched (positions identical at 1440/390 except Research, offset by half its dead-image residual). |
| 30 | `advantages/partnership/global-immersions.php` | `/advantages/partnership/global-immersions` (built 2026-10-31; reopened and **re-verified at all twelve widths 2026-10-31**) — hero (+lead) · StatBand `figure` · About · 16-city side-tab elective cards · 12-reel grid/carousel · "Global Immersions at ATLAS" (shared `VideoBlock`) · 6 student video testimonials. **Every section exact at all 12 widths; content height −24px everywhere = production's stray `<` text line from the reference's `<<section` typo (not reproduced).** Fixes this session: `TW_CONTAINER`; the side-tab menu stacks 16 tabs with NO gap (the port's 16px gap was +240px) and the clearfix pseudo-elements leave the card pane 40px narrower (602px at 1100 → one card per row); `.mrg42` keeps 42px below 768; mobile reels are Swiper `1.15` view with a 14px gap; testimonial cards are 9:16 CAPPED at `max-height: 600px`; the scroller is `max-w-[1536px]` (both authored, 1536 wins); Swiper's default arrows (27x44 `#007aff`, 10px inside, looping) added via `components/Partnership/TestimonialTrack`, positions identical to production at 6 widths. Text identical to production. 0 console / 0 broken / 0 overflow / 0 off-origin at 12 widths. |
| 31 | `advantages/partnership/global-pathways.php` | `/advantages/partnership/global-pathways` (built 2026-10-30; reopened and **re-verified at all twelve widths 2026-10-31**) — hero (+lead "Creating International Futures", previously missing) · StatBand `figure` · About · 12-card partner grid · "Global Pathway Opportunities" · Student Testimonials · **"Global Pathways at ATLAS" (YouTube `zzX0vtHhOg8`) — a live production section the first port omitted entirely, now via `VideoBlock`.** **Every section and the total content height exact at all 12 widths.** Fixes: Opportunities rewritten from measurements — a static stack ≥768 (Bootstrap `p-3`/`mb-5` = 16/48, the 48 collapsing through the slide), an 85%-wide snap carousel with dots ≤767, `2.5em`/1.05 titles, and Bootstrap's `!important` `.order-1` puts the image on the LEFT for slides 2 and 4 at desktop on production (the authored alternation never happens); partner-grid h2 stays 44px at every width; testimonials full-width 3:4 at ≤767 (page's `.swiper-slide{width:100%!important}`); arrows hidden from 768 up because Swiper locks 3 slides vs `slidesPerView` 4/5. The 5px overflow at 768 was the stat band (fixed by the `figure` variant). Text identical to production. |
| 32 | `advantages/partnership/international-faculty.php` | `/advantages/partnership/international-faculty` (built and verified 2026-10-31) — hero (+lead) · StatBand `figure` (4) · About · "The World Comes to ATLAS" (24 faculty cards, `components/Partnership/FacultyGrid`) · "International Faculty Week" + "International Faculty Master Classes" (fixed-height YouTube frames 300/400/500/600, `VideoFeature`; both author the same paragraph — upstream copy-paste, transcribed) · the Mint news feature (`NewsFeature`) · "Faculty Testimonials" (the six /global-immersions student videos, same files, uncapped 9:16, `loop: false` → arrows disable at the ends exactly as production). **Every section exact at all 12 widths except two upstream defects, not reproduced:** About −27px at 900/768 and −24 at 360 — production serves "today’s" mojibaked as "todayâ€™s", which wraps one extra line; and the news feature −20px below 768 — its photograph is a dead `atlas-global/wp-content` ref (a 20px broken-image box that also clips the date badge). Rajesh Bhargave's Imperial logo is the same dead path (production shows a 6px white sliver) and is omitted. 30 new assets (hero, about image, 24 faculty photos) + 10 new logos under `/assets/images/internationalisation-logo/`; 12 more logos were byte-identical to `/assets/images/international/partners/*` and are reused from there. Text identical apart from the mojibake and the clipped badge. 0 console / 0 broken / 0 overflow / 0 off-origin. Linked from /advantages/atlas-internationalisation. |
| 33 | `advantages/partnership/international-summerschool.php` | `/advantages/partnership/international-summerschool` (built and verified 2026-10-31) — **a different template from its siblings: it uses the /life-at-atlas sheet and loads no Tailwind CDN**, so it keeps Webflow's 1366px container. In production's order: the /life-at-atlas photo-column hero (`LifeHero` now takes optional `data`: 8 photos per column → 32s marquee, no scrim, no title, natural-height photos below 768) · the "International Summer Schools" intro · a 5-card stat band (new additive `StatBand variant="figureSm"`: `figure` ≥768, 18/22px + 24 24 24 22 padding below, and `min-width: auto` — at 768 "Multidisciplinary" floors its card at 174px) · About (`AboutStory` gained `container`/`spacer`/`align`/`imgAlign` options: webflow container, no spacer, stretch, `vertical-align: middle`) · "Global Summer Student Experiences" (4 region tabs; photo walls with three layouts — natural-size columns ≥768, rows of two 340×230 cards 541–767, one scroller ≤540; `PillTabStrip` gained `lessFlushMd`) · "Summer School Diaries" (the page's own coverflow, `SummerCoverflow`: initialised on `load`, card 4 centred, near .95 / far .85+.6, active `height: auto`; the cards are also **Bootstrap `.card`s**, so each has a 1px border — matched card-for-card in position, size, scale and opacity at 1440/768/390) · "International Summer Learning" (`VideoBlock container="webflow"`) · "Experiences Beyond Borders" (12 video cards, 3/2/1 per view, `#332d7e` arrows ≥768 / dots below — `TestimonialTrack` gained `perView`/`gap`/`color`/`arrowsBelow`) · "Global Voices, Student Stories" (local card: this page's <style> redefines `.testimonial-card`). **Every section exact at all 12 widths except Voices +36px at 700 only** — the documented `.testimonial-card` 568–767 blow-out (production's card is `width: 100%` in an auto slide), held to the container width as everywhere else. The five Voices photographs are dead `atlas-global/wp-content` refs (empty slot kept at size). Text identical to production. 142 new assets (457 MB, mostly reel/testimonial video, byte-for-byte); 13 more were byte-identical to /advantages/atlas-internationalisation files and are reused. `/advantages/partnership/summerschool` (linked from /advantages/atlas-internationalisation; a homepage soft-404 on production) now **307-redirects** here. /life-at-atlas re-checked: hero unchanged. |
| 34 | `advantages/partnership/master-progression.php` | `/advantages/partnership/master-progression` (built and verified 2026-10-31) — hero (lead + the "Click to View Master Acceptance's" pill → `#region-acceptance`, and a portrait image swapped in below 768: new additive `InnerPageHero` `hero.cta` / `hero.mobileImage`) · StatBand `figure` · About · "The Masters Progression Process" (5 step cards, `MPProcess`, 1/1.2/2/3 per view, non-looping arrows) · "ATLAS Students, Global Destinations" (two auto-scrolling rows of 20 student cards, the second reversed, with ‹ › that step both — `MPStudents`) · "Region Wise Master's Acceptances" (6 filter tabs over 209 cells — `MPRegions`) · Student Testimonials (7 videos, `PartnershipTestimonials` uncapped, looping) · Global Education Fair (19 `.card-type-f` — new `CardTypeF variant="mp"`: this page's <style> makes them 380px tall, as wide as their photo, radius 16 — in a `Carousel` with new `bullets="inline"`) · "From ATLAS To The World" (6 photos; the slider is as tall as its TALLEST photo, so all load eagerly) · "Master Progression at ATLAS" (`VideoBlock`) · "Start your Master's Application" and "ATLAS Alumni & Master's Progression" (`AboutStory` gained runs/`cta`/`reverse`/`mobileReverse` — this page's <style> flips `.about-story-wrapper-ugdx` to `column-reverse` below 768). **Every section exact at all 12 widths** (Start/Alumni/About need a slow scroll so production's lazy photos load before measuring). **Dead upstream content, not reproduced and flagged:** all **209** logos of "Region Wise Master's Acceptances" and all **40** student-card university logos are `atlas-global/wp-content` refs that 403 for every visitor (production shows a grid of bare broken-image icons; the port keeps every cell/plate at its size, empty), plus 3 student photos. **Reference defect not reproduced:** production's fair slider shows 5 bullets because Swiper measured the cards at 0px wide before their photos loaded; the port shows the real 19 (at 360 they wrap: +24px). The step icons are PHP-templated (`icon/<?php echo $index+1 ?>.png`) and were fetched by hand. Text identical to production. 46 + 19 CDN + 5 icon assets new; 34 already local; 10 logos reused from /advantages/atlas-internationalisation (byte-identical). Carousel arrows/bullets match production's positions at 1440/390. |
| 35 | `atlas-alumni-corner.php` | `/atlas-alumni-corner` (built and verified 2026-10-31; linked from the nav as "Alumni") — a plain Webflow page (`$css = …691471a5…`, `body-isme`, no Tailwind CDN), eleven blocks in the reference's order: hero (`SuccessHero` gained optional `hero`/`full`: the bare `.inner-header-wrapper` is 658px, everything else identical to /success-stories-atlas') · two figures (`StatBand`, its own 60px bottom padding) · "The ATLAS Alumni Connect" and "SPRECT: Super Connect" (`components/Alumni/StoryPair` — the 30% / calc(70%−40px) pair with the `.atlas` 32/0 image) · "Alumni-Led Initiatives & Activities" (`ZoomSliderLg` + new `ChipSlideCard variant="c"`: no scrim, chip flush bottom-left over 32px) · "Alumni Talks" (`components/Alumni/TalksWall`: four natural-size columns ≥768 → rows of two 300×234 cards ≤767, the second clipped by the section exactly as production; photos anchored 0 0 below 768; Poppins `.h2-tag.isdi`) · "Alumni Achievers" and "Our alumni at universities around the world" (`GridGallery atlas`, the `.h2-tag` margin form) · "Your Mentors. Your Super Connect." (`PlacementCard`, whose logo is now optional — these cards author none; `Carousel bullets="inline"`) · "What Makes the Alumni Circle Matter" (`PortCardJ` gained `variant="atlas"`: square, 32px title, 24px subtitle at every width) · "What Our Alumni Say" (`TestimonialCard` gained an optional filled `.stname` and a company-less cohort line; new `Carousel bullets="inline-overlay"` — absolute, 30px under the slider, 4px dots) · FAQ — **a Webflow-dropdown accordion, not the Bootstrap `Home/FAQ`**: new shared `components/ui/DropdownFaq` (80px closed incl. a 2px #eee rule, single-open, 24→16px/600 titles clamped to two lines, #507fff chevron 24→18px) over `SearchQuestion`'s new `variant="blue"` (#193e90, square, `cool-shape-vector.png`). HEI Relationship and Industry Partnership author the same FAQ and panel. **Every block exact at all 12 widths except "What Our Alumni Say" +24 at 700 only** — the documented `.testimonial-card` 568–767 blow-out. Hero/figure geometry identical at 1440/991/768/767/390; FAQ closed and open heights identical (164 / 179 / 221 / 242); bullets at production's positions; text identical. 0 console / failed / broken / overflow / off-origin at all 12 widths. 53 new assets (8 MB, byte-for-byte, `public/assets/images/alumni/`); 6 reused (stat vectors, quote icon, search wash and glyph). `ZoomSliderLg` gained opt-in `dots="swiper"` (0 4px). |
| 36 | `atlas-hei-relationship.php` | `/atlas-hei-relationship` (built and verified 2026-10-31; linked from the nav as "HEI Relations") — a plain Webflow page (`$css = …6910963725…`, `body atlas-page`), twelve blocks, **almost all existing components driven by a generated `lib/heiContent.js`** (scratchpad `hei_gen.py` over the comment-stripped reference): `InnerPageHero` (mailto button) · `StatBand` (3 figures with authored `<br>`s) · "Why Global Institutions Choose ATLAS" (3 `ContentCardB`, which now honours `<br>` in titles) · the partner tabs (`components/Hei/PartnerTabs` over `PillTabs` + `LogoGrid`: the same marks as /success-stories-atlas, reused, but with this page's `alt` text and 16-cell panes) · "ATLAS & The 6 Pillars of Internationalisation" (`CareerSupportCard` with a new `atlasSmall` title, Manrope 24/1.3 600) · "From Our International Collaborators" (6 `CardTypeF`, `bullets="inline"`) · "Hear from our Global University Partners" — **the homepage's Global tab card for card**, so `Home/Testimonials` now exports its `Card` and the section renders the homepage data (`bullets="inline-overlay"`; the empty `<h2 class="sub-heading">` is kept as a `SUB_H2` box) · "Scope of Partnerships" (new `components/Hei/ScopeCards`: the info-banner type on a 1px #41418e bordered, transparent card) · "Recognition & Accreditation" (`CareerSupportCard` Poppins) · "Meet the Team" (`PeopleCarousel`, which gained a `bullets` pass-through and `<br>`-aware roles) · the closing `InfoBanner` (now passes a button `icon`) · FAQ (`DropdownFaq` with the new orange `ugdx-org` icon, 24px at every width, over the homepage's search panel). **Every section and the total content height exact at all 12 widths except "Hear from…" +24 at 700 only** — the documented `.testimonial-card` 568–767 blow-out. FAQ closed/open heights identical at 1440/767/390; bullets at production's positions; per-block screenshots 0.0–6.4 mean except the two autoplaying carousels (phase). Text identical. 0 console / failed / broken / overflow / off-origin. 33 new assets (6.4 MB, byte-for-byte, `public/assets/images/hei/`); 81 reused. **`lib/withBreaks` now returns non-string values unchanged** — the first build of this page crashed /advantages/partnership/collaborative-projects, whose `CareerSupportCard` title is markup; that page re-verified at its documented state. Side effect, verified correct: /schools/isdi/campus' "Sports, fitness &<br>Wellness infrastructure" card title (authored `<br>` on the reference and production) now breaks as authored instead of flattening; that page's section heights are unchanged from its recorded state. |
| 37 | `atlas-industry-partnership.php` | `/atlas-industry-partnership` (built and verified 2026-10-31; linked from the nav as "Industry Relations") — HEI Relationship's shell over /advantages/atlas-industry-centric-approach's content, driven by a generated `lib/industryPartnershipContent.js` (scratchpad `ind_gen.py`): `InnerPageHero` · `StatBand` · "Why Industry Leaders Choose ATLAS" (3 `ContentCardB` in a `.section.extraspace` — padding 120/60 from 768 up, measured; the first title is authored in `<strong>`, so `ContentCardB` gained `item.titleStrong`) · "Our Recruitment Partners" — `Industry/RecruitmentPartners` reused, with a new optional `data` prop because this page adds `alt` text to the same six tabs and marks · "Strengthening Global Industry Relations" (9 `CardTypeF`, `bullets="inline"`) · "Industry Testimonials" — `Industry/Testimonials` reused unchanged in content (same six cards; production shows the same U+FFFD replacement characters for the cp1252 apostrophes on both pages, and the port matches), with a new optional `bullets` prop (`inline-overlay` here) · "Scope of Partnerships" (`Hei/ScopeCards`, which gained `card.nested`: five of these six cards wrap their button row in a second `.info-banner-btns`, doubling its top padding) · "Driving India's Vision of Viksit Bharat Together" (`ZoomSliderLg dots="swiper"` over **new shared `components/ui/SliderCardA`**, extracted unchanged from `Life/StudentWelfare` — the same atlas variant on both references; the lead is `.sub-heading.isdi`, Poppins 300) · `InfoBanner` with its bolded "Get in touch:" contact line · `DropdownFaq` (orange icon, homepage search panel). **Every section and the total content height exact at all 12 widths except "Industry Testimonials" +48 at 700 only** — the documented `.testimonial-card` 568–767 blow-out. FAQ closed/open heights and carousel bullet positions identical; text identical; 0 console / failed / broken / overflow / off-origin. 65 new assets (26 MB, byte-for-byte — six MoU photographs are 1.4–2.1 MB originals); 56 reused (41 recruiter marks from /success-stories-atlas, the testimonial portraits). /life-at-atlas (welfare cards now via `SliderCardA`) and /advantages/atlas-industry-centric-approach (two components gained optional props) re-measured: unchanged. |
| 38 | `centre_for_research/index.php` | `/centre_for_research` (built 2026-10-31, verified 2026-10-31; linked from the nav as "Center for Research"; the route keeps production's own slug) — `$css = coe.css`, `body body-ugdx`, no Tailwind CDN. In the reference's order: `InnerPageHero` (title, the "RESEARCH. INNOVATE. EXCEL." line, three buttons → `/aarohan2025`, `/journal`, `/phdapplications`) · five figures (`StatBand variant="stack992"`, new and used only here: this page's own <style> stacks the band at `max-width: 992px` **inclusive**) · "About Center for research" (`AboutStory`, webflow container) · "Research and Innovation" (14 `CareerSupportCard`s, Poppins titles, over three washes) · "Our Objectives" (5 `PortCardM variant="ugdx"` in a `Carousel bullets="inline"`) · FAQ (the shared Bootstrap `Home/FAQ`, 24 questions transcribed from production's rendered include, whose PHP carries raw cp1252 apostrophes). **Every section and the total content height exact at all 12 widths**; hero (675px), title, tagline, buttons (56 → 40px tall), stat band and both content sections probed box for box at all 12. One real difference found and fixed in this pass: at **1100** production's stat cards split 217.6 ×4 + 229.6 because `min-width: auto` floors "International Collaborations" at its longest word, and the port had `min-w-0` on `stack992` (even 220 ×5) — removed (no other consumer). Per-section screenshots at 1440 / 768 / 390: 0.00–0.35 mean for hero, About, Research, Objectives; FAQ 0.28 / 3.82 / 6.01 — the shared FAQ's documented `.accordion-title { margin-right: 50px }` divergence (production wraps the question narrower and insets the chevron; heights identical). Text identical to production word for word (the only extra on production is the third-party UNIAI chat widget). FAQ 24 items, closed on load, single-open, re-click closes, at 1440 and 390. Carousel: 5 cards 295×480 at production's x positions, 5 bullets at production's x below 568, none above. 0 console / page errors / broken images / overflow / off-origin at all 12 widths. **Deviation:** the title is a real `<h1>` where the reference authors `<div class="h1-tag">` (the page has no `h1` on production) — identical paint, better semantics. **Missing connections:** `/aarohan2025`, `/journal`, `/phdapplications` exist on production (301) but have no reference `.php`, so they 404 in the port — written root-relative like `/applicationform` and `/campusvisit` elsewhere. Production's header grows below 992, so every block sits lower on production there by a constant; that is the header, not this page. |
| 39 | `examination.php` | `/examination` (built 2026-10-31, verified 2026-10-31; linked from the nav) — `InnerPageHero` (title only, `mandatory-disclosure-1` image + its three `-p-` twins, byte-for-byte) over `.container > .section.extraspace > ul.list-4` of three `li.big-text-links` (28px/1.5, padding 16 0, disc marker, Bootstrap's #0d6efd links, #5cbdca on hover). **Hero and total content height exact at all 12 widths**; the link list (outside any `<section>`, so probed separately) matches production box for box at all 12 — x, y, 74px rows, each link's width and colour — and screenshots **pixel-identical (0.00 mean) at 1440 / 768 / 390**; the hero is 0.02–0.16. Text identical to production word for word. 0 console / page errors / broken images / overflow / off-origin at all 12 widths. Hrefs: production writes them relative (`exam-time-table`), the port root-relative (`/exam-time-table`) — the same URL. `1.pdf` (the Guidelines) is shipped byte-for-byte and serves 200. **Missing connections:** `/exam-time-table` (200 on production) and `/result` (301 on production) have no reference `.php` and 404 in the port. |
| 40 | `library.php` | `/library` (built and verified 2026-10-31; linked from the nav; production serves it at `/library/`) — **not Webflow markup**: a hand-written Bootstrap 5.3.3 grid styled by the page's own `<style>`, inside a `#body` wrapper (max 1920, Poppins over Bootstrap's 16px/1.5 #212529). Breakpoints are Bootstrap's `lg` (992), `xxl` (1400) and the page's own `max-width: 600px`, written as arbitrary media variants (no config change). Nine sections in `components/Library/` over `lib/libraryContent.js`: hero · the five-tab search widget (`LibrarySearch`, the only client component: Koha catalogue / EBSCO / Mason OER / Google Scholar / Shodhganga, each a live form posting to its own service in a new tab; radio rows on the first two only, as authored) · Library · Service & Facilities (23 cards; on hover the title drops to `bottom: -300px` and the description rises from `-600px` over 0.5s CSS `ease-in-out`) · Resources · E-Resources (11 logo tiles, one spanning two columns) · Rules and Regulations · ATLAS E-Content · the Best Reader / Best User awards. **Verified element by element: all 355 visible elements pair 1:1 with production on box position, size and ~27 computed properties, with 0 differences at 1920 / 1440 / 1280 / 1100 / 992 / 991 / 600 / 568 / 479 / 390 / 360**; section heights and total content height exact at all 12 standard widths outside 601–901. Text identical word for word (1,341 words at 1440 and 390). All 18 search-tab states (5 tabs + back, at 1440 / 768 / 390) match production on visible panel, form action / method / target, input name, radios, Advanced Search href and the section height each produces; hover identical on computed `bottom` and the transition; all 14 content links identical. Per-section screenshots 0.00 mean at 768 and 390 for every section but the fixed Rules grid; at 1440 0.00 outside one 44–48px band where the port's header strip was painted into the harness's stitched capture. 0 console / page errors / failed requests / broken images / off-origin at all 12 widths, and **0 horizontal overflow at every width from 320 to 1000** (swept in 7px steps). **Two reference defects fixed, not reproduced** (each recorded in `Sections.js`): the Rules grid is `repeat(4, 1fr)` down to 601 and its tracks floor at 842px, so production scrolls sideways under 902 (2px at 900, 134 at 768, 202 at 700) — and this project's `body { overflow-x: hidden }` would have clipped the cards instead — so it is 2-up from 601 to 901; the E-Content grid is `repeat(3, 1fr)` with tracks flooring at 663px, so production scrolls under 723 — 2-up from 601 to 722. Those are the only differences from production: Rules −179 / −357 / −506 at 700 / 768 / 900, E-Content +318 at 700. **Other deviations:** the search tabs are `<button>`s (the reference authors `<a href="javascript:void(0)">`) and switch instantly where jQuery tweens `show("slow")`; one award portrait (Prof. Ramakrishnan) is a dead betterstudio.com stock URL that 404s on production — an empty 70px slot with the same radius and shadow is kept; the hand cursor (an inline SVG data URL in the reference) is the same SVG as a file. **Assets:** 60 images (18 MB) copied from `reference/wordpress-custom-image/library/library/`, all SHA-1-identical to production, into `public/assets/images/library/` (`peolple/` spelt `people/`); production loads Poppins 200 / 400 / 500 / 600 / 600 italic / 700, so `'Poppins Library'` gained the 200 and 600-italic faces (Google's v24 files) beside the four the previous session had added. |
| 41 | `nirf/index.html` | `/nirf` (built and verified 2026-11-02; footer "NIRF") — the /examination template exactly: `InnerPageHero` (the same `mandatory-disclosure-1` cover, already local) over the bulleted document list, now the shared **`components/Statutory/DocumentLinks`** (extracted unchanged from /examination, which renders through it). Four links, each `target="_blank"`: NIRF Management 2025 / 2026, NIRF Skill University 2026 (PDFs) and PATENT DETAILS (`.xlsx`) — production serves them relative to `/nirf/`; downloaded byte-for-byte (sizes equal Content-Length, `%PDF`/`PK` magic) to `public/assets/documents/nirf/`. `<title>` is the bare " ATLAS SkillTech University" and the description the template's "Get in touch with Atlas Skilltech." — transcribed. **Hero and total content height exact at all 12 widths**; text and links identical. |
| 42 | `ombudsperson/index.html` | `/ombudsperson` (built and verified 2026-11-02; footer "Ombudsperson") — `components/Statutory/StatutoryPage`: cover + `.sub-heading.mrgbtm` (`SUB_INNER_MRGBTM`) + `.sub-heading` (`SUB_INNER`) with the mobile number and e-mail. The address is **plain text** on production: Cloudflare wrapped a plain-text address in its obfuscation anchor and its decoder turns it back into text (the other pages author real `mailto:` links, which stay links) — decoded from `data-cfemail` and transcribed as text. **Exact at all 12 widths**; text identical; no links in the content on either side. |
| 43 | `anti-ragging-committee/index.html` | `/anti-ragging-committee` (built and verified 2026-11-02; footer "Anti Ragging Committee") — cover + two committee tables (20 and 11 members, new shared **`components/Statutory/CommitteeTable`**) + the National Ragging Prevention Programme block (`h3-tag.black.mrgbm-16`, `SUB_INNER_MRGBTM32` x4, `SUB_INNER_MRGBTM`, `SUB_INNER`; runs via new `components/Statutory/RichText`). Table measured on production at 5 widths: `.education-loan-wrap` pt 54 → 0 and `overflow-x: auto` at ≤767, bleeding 21px and padding 20 back at ≤479; grid `1fr 4fr 4fr`, padding 20, no gaps, centred; every cell 1px solid #000 (2px where cells meet), head #625dbf white; `.loan-type` margin 25 / padding 0 20; `.loan-type-desc` 14/700, mt 16. **Hero, content height, every grid's column widths and every cell height exact at all 12 widths** (below ~480 the grid overflows and the wrap scrolls, as on production). Content screenshots 0.01 / 1.9 mean at 1440 / 390. Authored oddities transcribed: the e-mail link's href decodes to helpline@antiragging.in while its text decodes to antiragging@c4yindia.org; "www.c4yindia.org" links to http://www.antiragging.in/; "Ms. Vaibhav Mohite" in one table and "Mr.Vaibhav Mohite" in the other. |
| 44 | `internal-complaint-committee/index.html` | `/internal-complaint-committee` (built and verified 2026-11-02; footer "Internal Complaints Committee") — cover + a 9-member `CommitteeTable` (no heading) + DEFINITION / the two notifications / Nodal Officer and `mailto:icc@atlasuniversity.edu.in`. The UGC and University notification PDFs (177 KB, 552 KB) live under production's `/wordpress-custom-image/internal-complaint-committee/`; downloaded byte-for-byte to `public/assets/documents/internal-complaint-committee/`. **Exact at all 12 widths** (cells included); screenshots 0.03 / 0.73. Production's first notification label carries a trailing zero-width joiner after its `<br>` — invisible, omitted. |
| 45 | `women-development-cell/index.html` | `/women-development-cell` (built and verified 2026-11-02; footer "Women Development Cell") — cover + "Composition of Women Development Cell" (`.h2-tag.mrg16`: mb 16 → 8 at ≤767) over a 9-member `CommitteeTable` + the `mailto:wdc@atlasuniversity.edu.in` line. Authored spellings kept ("Presiding Offi cer/ Chairperson", "Member (non+teaching)"). **Exact at all 12 widths**; screenshots 0.03 / 1.06. |
| 46 | `job-openings.php` | `/job-openings` (built and verified 2026-11-02; header "Job Openings", which now points at the local route) — seven blocks: an 85vh cover (`.inner-cover-section` is `height: 85%` of a 100%-tall body — 765 at a 900px viewport, 850 at 1000; `.course-hero-wrapper` covers the lower half with `transparent -> #0006`), the three-figure `ui/StatBand`, "3 Things That Set Us Apart" (per-card radii `32px 0` / top-left only / none), "Faculty Life@ISME" (the reference's own heading; a contained `ui/ZoomSliderLg` of three caption-less `.slider-card-c-atlas`), "Perks & Benefits" (the eight-cell quick-stack mosaic inside a `32px 0` clipped wrapper, white numbers), the YouTube video (the reference's two iframes, 640 / 150 swapped at `max-width: 992px`, are one player whose height changes there) and the **Openings** list. New: `components/Careers/{CareersHero,CareersSections,Openings}.js` — ATLAS-local; /schools/isme/job-openings renders the same Webflow template through ISME code, which an ATLAS page does not import, and nothing ISME was touched. **The vacancies are a SNAPSHOT** (`lib/jobOpeningsContent.js`): the reference reads them from an HR MySQL table this checkout cannot reach, so the 8 positions production listed on 2026-11-02 were copied from the live page, the Thought Leadership / Key Dates pattern; re-take it when HR changes vacancies. Each role's description is the CMS's own HTML (checked: only p / strong / ul / li), rendered as HTML with Preflight's list and margin resets restated. Two production details reproduced: an EMPTY description is still a box whose 9px margin collapses into the info row's 16 (those cards are 184px), and the CMS's `<p>&nbsp;</p>` spacer paragraphs are real lines (Python's `\s` matches U+00A0 and silently emptied them — 62px short until fixed). The search form is `display: none` on production and is not rendered. Assets: 22 references, **20 already local by SHA-1** (the ISME page's hero, things and life images, /campus-atlas's stat vectors and five mosaic washes from earlier pages); 2 new under `public/assets/images/job-openings/perks/`. **All 7 blocks exact at all 12 widths** (1920-360); text and all 11 content links identical at 1440 / 390; block screenshots 0.00-0.91 mean (the slider autoplays and the video is an embed, verified by height instead); 0 overflow / console / page errors / failed requests / broken images at 12 widths; "View Job Openings" scrolls to `#opening`; slider bullets appear at <=568 as on production. |

**Common verification for rows 41-45 (2026-11-02):** compared with production at
1920/1440/1280/1100/992/900/768/700/568/479/390/360 — hero height, the full height between hero and
footer, every committee grid's column widths and every cell height, the `h1` box; word-level text of
the whole content and every content link (label, href basename, target) at 1440; computed colour /
decoration / weight of every content link and `<strong>`; 0 console / page errors / broken images /
horizontal overflow at all 12 widths. ATLAS header and footer via the root layout (no route
exception). The five footer links now point at the local routes (`lib/footerContent.js`).
**/examination now renders through `DocumentLinks`** and was re-checked: identical rows (74px) and
section heights to its recorded verification. ESLint 0; clean `next build` (288 pages, all five
`○ Static`); regression sweep of all 150 built route entries at 1440 and 390 — only the three
already-documented third-party messages (two NoPaperForms 403s, one YouTube picture-in-picture
policy notice).

## ⚠ Production security finding (2026-11-02) — not reproduced, needs action upstream

The live site serves a hidden block of **injected SEO-spam backlinks**: a
`<div class="sponsor-area" style="position:absolute; left:-9999px;">` after the footer holding nine
`<a rel="dofollow">primatoto</a>` links (a gambling keyword) to unrelated third-party domains. Found
in all five new view-source captures and confirmed on production at `/`, `/library/`, `/nirf/`,
`/ombudsperson/` and `/schools/isdi/` (absent at `/about-us/`, `/examination/`, `/campus-atlas/`).
That pattern is characteristic of a compromised server or template, not authored content. **The port
contains none of it** (grepped `app/`, `components/`, `lib/` and the rendered HTML). It should be
investigated and removed on the production server — outside this rebuild's scope.

**Correction (2026-11-02, same day):** an earlier note here said production `/examination/` and
`/job-openings/` answer 500. They do — but only at the **trailing-slash** URL, which every flat
`.php` page 500s on. The slashless URLs both answer **200** and are fine.

## NOT STARTED (0)

Note: the partnership pages are Tailwind-CDN hybrids (Webflow hero/stats/story + Tailwind-authored
content sections), so each needs the `.lp-bs` Bootstrap-collision handling + the `n640`/`n1024`
breakpoint remaps, and faithful transcription of its bespoke card sections — each is a substantial
build. (The `/advantages/partnership/summerschool` slug is resolved: it 307-redirects to
`…/international-summerschool`.) See the PARTIAL section for the shared causes to apply.

| # | reference | intended route | notes |
| --- | --- | --- | --- |
| — | — | — | None — every ATLAS-main page is built. |

## BLOCKED (0)

None. `/job-openings`, the one page parked here, was built on 2026-11-02 from a dated production snapshot (row 46).

## Dynamic / detail routes (not a `.php` file — counted separately)

- **`/atlas-blog/[slug]`** ✅ **DONE (Phase 2, 2026-10-30)** — the ATLAS blog DETAIL page. The reference blog template
  (`schools/isdi/blog/index.php`, already analysed) is school-agnostic: it renders ATLAS posts via
  `$isAtlasPage = ($parts[0] === 'atlas-blog')`, so the ATLAS Thought-Leadership listing links to
  `/atlas-blog/{slug}`. API-driven (`api/atlas-blogs/by-slug/{slug}`). **No dedicated reference
  `.php`** (shared template), so it is NOT in the 41 count — but it is a real user-facing route to
  build, and it **reuses the just-built ISDI blog** (`components/Schools/ISDI/Blog/BlogArticle` +
  `lib/schools/isdi/blog/api.js`) generalised for `school: 'atlas'`.

## API / database dependencies

| page | dependency | resolution |
| --- | --- | --- |
| `/thought-leaderships` (ATLAS listing) | `GET api/atlas-blogs/by-school/atlas` (UAT) | API works (proven by the ISDI blog build). Snapshot like ISDI TL, or fetch live. |
| `/atlas-blog/[slug]` (detail) | `GET api/atlas-blogs/by-slug/{slug}` (UAT) | Live, reuse the ISDI blog integration (validate `school === 'atlas'`). |
| `/job-openings` | HR MySQL table (direct) | **Resolved 2026-11-02: snapshot of the live vacancies** in `lib/jobOpeningsContent.js` — re-take it when HR changes them. |

No other ATLAS-main page opens a DB connection or calls an API (no NOT STARTED pages remain; the pages
are static markup over the Webflow sheet).

## Reuse — existing components & pages

- **Partnership pages** overlap heavily with the completed `/advantages/atlas-internationalisation`
  and the ISDI internationalisation/advantage work: `ui/InnerPageHero`, `Home/SectionHead`,
  `ui/StatBand`, `ui/LogoGrid`, `ui/GridGallery`, `Carousel`, `ui/PillTabs`/`TertiaryTabs`,
  `ui/PrimaryButton`/`SecondaryButton`/`ButtonRegular`, `Home/FAQ`. They are linked from the
  internationalisation page body (the Partnership sub-section) and cross-link each other.
- **`/thought-leaderships`** → `components/Schools/ISDI/ThoughtLeadership/BlogSection` (generalise
  the school tabs/data) + the TL snapshot pattern.
- **`/atlas-blog/[slug]`** → `components/Schools/ISDI/Blog/*` + `lib/schools/isdi/blog/api.js`.
- **Static pages** (library, alumni-corner, hei-relationship, industry-partnership, examination,
  centre-for-research) → the shared inner-page shell (`InnerPageHero`, `SectionHead`, `FAQ`,
  buttons, `StatBand`, `LogoGrid`, `GridGallery`, `Carousel`, `InfoBanner`).
- **`/job-openings`** ✅ built — `components/Careers/*` over `ui/StatBand` + `ui/ZoomSliderLg`.

## Asset inventory (approximate — exact size measurable only on download)

Across the 14 unbuilt pages, **1090 distinct external asset URLs**:

| type | count |
| --- | --- |
| PNG | 822 |
| JPG/JPEG | 146 |
| WebP | 26 |
| SVG | 11 |
| **images total** | **1005** |
| MP4 | 53 |
| WebM | 31 |
| **video total** | **84** |
| PDF | 1 |

Hosts: ~1065 on `atlasuniversity.edu.in` / `cdn.prod.website-files.com`, 4 on `atlasskilltech.app`
(CRM/brochure **embeds** — iframes/scripts, not downloadable images), 1 on `betterstudio.com` (a
stray reference, likely unused). **Many images overlap** with already-downloaded completed-page
assets and with each other across the partnership pages, so the NEW download count after SHA-1
dedup/reuse will be well below 1005. **Size is video-dominated** (84 clips) and is in the order of
several hundred MB to ~1 GB+; it can only be stated exactly after downloading. **Per the project
rule and the user's Phase-1 instruction, ATLAS-main assets are downloaded in their ORIGINAL format
(PNG/JPEG/WebP/MP4 as served), byte-for-byte — NOT re-encoded to WebP** (the WebP conversion was an
ISDI-only optimisation; the completed ATLAS pages already preserve originals). PDFs (e.g.
examination's Guidelines, fee-structure flipbooks, policies) are supporting documents, downloaded
locally, not counted as pages.

## Navigation / connection notes (for the build phase)

- In the reference header/footer nav: examination (2), library (2), job-openings (1),
  atlas-alumni-corner (1), atlas-hei-relationship (1), atlas-industry-partnership (1),
  centre-for-research (1), global-pathways (1). These must be wired into the ATLAS
  `components/Header` / `components/Footer` / `lib/navigation.js` when built.
- The other 5 partnership pages are linked **contextually** from
  `advantages/atlas-internationalisation.php` (the Partnership sub-section) and from each other —
  connect them there, not necessarily in the global nav.
- `/thought-leaderships` is reachable via the homepage Thought-Leadership section's cross-links and
  the per-school TL tab strip; wire the ATLAS tab to it.
- examination links `/exam-time-table` and `/result`, which have no reference `.php` — confirm
  whether those are separate pages to build or external before wiring.

## Recommended implementation order

1. **`/thought-leaderships` + `/atlas-blog/[slug]`** — highest reuse (the just-built ISDI blog/TL),
   closes the Thought-Leadership loop, and validates the ATLAS-side `school: 'atlas'` API path.
2. **The 6 Advantages → Partnership pages** — one cohesive sub-section, heavy reuse of the
   internationalisation/advantage components, already cross-linked in the reference. Build together
   and wire the Partnership sub-nav from the internationalisation page.
3. **The 4 standalone static pages with the most nav weight** — library, atlas-hei-relationship,
   atlas-industry-partnership, atlas-alumni-corner (big static pages over the shared inner-page shell).
4. **centre-for-research + examination** — smaller static pages; examination also needs the
   `/exam-time-table` + `/result` link decision.
5. **`/job-openings`** ✅ built 2026-11-02 (production snapshot, mirroring Thought Leadership / Key Dates).
