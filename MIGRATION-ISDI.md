# ISDI migration tracker

Audit of `reference/schools/isdi` against the Next.js port. Generated during the Phase 2 audit; **no application code was changed to produce it**.

Statuses: COMPLETE (verified against the updated reference) · NEEDS UPDATE (implemented but outdated) · PARTIAL (sections missing) · NOT STARTED · BLOCKED (cannot verify or upstream incomplete).

## COMPLETE (51)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `about-us/index.php` | `/schools/isdi/about-us` | none; re-measured 12/12 blocks vs production at 1440/390 | none |
| `campus/index.php` | `/schools/isdi/campus` | 7 of 12 blocks exact at all 12 widths (hero, stats, menu, `#campus-location`, `#campus-learn`, `#campus-housing`, banner); `food` 0 except −4 at 700/568 (sub font-wrap) + a `measure()` bullet-timing artifact at 360; `hangout` +4 at mobile (PhotoGallery `.instagram-wrapper` overflow, documented); `#campus-spaces`/`#campus-green` the self-hosted-Poppins font-wrap on their ContentCardB stacks (spaces up to −189 at 768 — this machine has real Poppins installed, wider than the port's `Poppins ISDI`; identical copyW/fontSize/line-height, only font-family); `faq` the ±20 section-padding bucket (24 questions identical to prod, master 1). 3 real bugs found & fixed: food distance line (`card.note` vs `card.distance`), green lead `mb-14`/ATLAS 56 common-wrapper (ref `.white-desc-wrap` mb 0 + isdi `.common-wrapper` pt 50 → local `ISDI_COMMON`), campus food carousel padding (56→768/60≤479, not life's 56→40 → `Favourites` gained `carouselClassName`). Interactions 0 fails at 1440/390; eslint 0; clean build `○ Static`; sweep of the page + all shared-component consumers clean (only YouTube telemetry beacons as `requestfailed` on the 2 embed pages). | none |
| `events/creative-showcases.php` | `/schools/isdi/events/creative-showcases` | **none** — all 6 measured boxes (hero, anchor menu, the 3 sections, the wrapper) exact at all 12 widths vs production, on dev server and a clean production build; text identical run by run; validate clean at 12 widths (0 console / pageerr / failed / broken / overflow / **0 off-origin**). No FAQ, so no shared-FAQ bucket. Same template as immersions/skill-tech but THREE sections: Studio Day (grid), Sensorium – Fashion Show (11 motion cards), Graduate Showcase (grid), no trailing empty wrapper. The two grids are the bare `.duplicate-grid-wrapper > .grid-gallery-flex` (no `.instagram-wrapper`/`.mobile-vert-scroll`), a THIRD PhotoGallery case — `PhotoGallery` gained `variant="plain"` (drops the ≤540 scroller classes; the ≤479 `.img-wrap { width:320px }` is a GLOBAL rule and kept), passed via `PhotoWall`'s `galleryVariant`. Additive and re-verified: immersions, skill-tech (nested) and industry-centric-approach (merged) unchanged — 0 diffs at 1440/390. Graduate Showcase reuses immersions' own `local` webps (same 8 files, same order). 31 new CDN PNGs → 31 WebP (10.49MB → 2.18MB at q95; grainy source caps ~SSIM 0.985-0.997, confirmed by the static-grid screenshot diff of 1.5-2.3 mean vs production). Hero lead carries authored `<br/>`; hero `sizes` is 1365.9765625px. Served at the SLASHLESS url. | none |
| `events/immersions-&-experiences.php` | `/schools/isdi/events/immersions-&-experiences` | **none** — all 9 boxes (3 top-level blocks + the 6 sections inside the white wrapper) exact at 12 widths, against the dev server and a clean production build; 218/218 interactions, text identical run by run, validate clean at 12 widths with 0 off-origin requests. No FAQ on the page, so no shared-FAQ bucket | none |
| `events/the-edit.php` | `/schools/isdi/events/the-edit` | the hero is **pixel-exact at all 12 widths** and the four section SVG banners match exactly; the two intro SVGs (section-1) are within ~12px (`w-auto` intrinsic-render variance); the schedule section's measured height differs by the **site-wide Poppins font deviation** (+20..+197 at >=700, -131..-216 below 640) — the speaker grid's column width is flex/min-content-driven by the text, and the port renders the self-hosted Poppins while production serves Poppins unloaded (narrower fallback); confirmed by forcing the fallback font, which moves the port toward production. Text identical to production except the one documented en-dash. validate clean at 12 widths (0 console / pageerr / failed / broken / overflow / **0 off-origin** — the registration links are external but load only on click). The ONLY non-fifth-template Events page: a bespoke Tailwind-Play-CDN page (autoplay desktop/mobile hero videos under a neon overlay band, two intro SVGs, an SVG section header, an 8-session schedule of 29 speakers rendered from data, two closing SVG banners linking to registration). Reproduced with the project's Tailwind: the reference's `sm` (Play-CDN 640) is written `[@media(max-width:639px)]:` DESKTOP-FIRST because this config's `sm`=480 AND its `min-[Npx]:`/`max-[Npx]:` SHORTHAND arbitrary variants do not compile (only the full `[@media(...)]:` form does); font sizes are arbitrary `text-[Npx] leading-[Npx]` from production's computed values; renders in Poppins (body.isdi-page overrides the Play-CDN Preflight). 73 production assets downloaded byte-for-byte (2 mp4 + 2 webm + 10 png + 59 svg, ~37MB) under events/the-edit/; no shared component touched. **DEVIATION (content):** sessions[1]'s en-dash is served by production as the U+FFFD replacement char (upstream cp1252/UTF-8 bug — "Human<FFFD>AI"); the port ships the intended en-dash. Served at the SLASHLESS url. | none |
| `events/community-and-culture.php` | `/schools/isdi/events/community-and-culture` | **none** — all 6 measured boxes (hero, anchor menu, the 3 sections, the wrapper) exact at all 12 widths vs production, on dev server and a clean production build; text identical run by run; validate clean at 12 widths (0 console / pageerr / failed / broken / overflow / **0 off-origin**). No FAQ, so no shared-FAQ bucket. The exact template and nesting of creative-showcases (hero + `.sticky-menus.center` + one `.white-wrapper > .container` with 3 `.common-wrapper-lg` sections, no trailing wrapper) — but the two grids are the `.instagram-wrapper.mobile-vert-scroll` NESTED variant (default), where creative-showcases' were the bare plain variant: Community & Cultural Engagement (grid 8), Parent Meetups (10 `.zoom-slider` motion cards), Cultural Festivals (grid 8). **No new component and no component change** — pure reuse of Hero / AnchorMenu / PhotoWall / MotionWall. Hero has 4 slides; slide 1 is "Community & Culture", slides 2-4 are an upstream Creative Showcases copy-paste (same title/lead with `<br/>`, three `hero-section-*` photos). Heavy asset reuse, proven by identical CDN object ids: hero slide 1 (`hero-image`, object 6904c943…) and the whole Cultural Festivals grid (`creativeshowcase-grid-1-*`, objects 6903740…) ARE creative-showcases' hero slide 3 and Studio Day grid — reused from disk; only 30 of 42 refs are new. Screenshots: menu 0.0, the two static grids 0.8-1.8 mean (WebP residue), Parent Meetups autoplays (verified by exact height/text). 30 new CDN PNGs → WebP (10.69MB → 2.47MB at q95; grainy source caps ~SSIM 0.984-0.996, confirmed by the static-grid screenshot diff) + 12 reuses. Served at the SLASHLESS url. | none |
| `events/industry-and-mentorship.php` | `/schools/isdi/events/industry-and-mentorship` | **none** — the LARGEST Events page (fourteen content sections). All 16 measured boxes (hero, anchor menu, Creative Catalyst, the 12 wrapper-id sections, the mentor marquee, and the white-wrapper aggregate) exact at all 12 widths vs production, on dev server and a clean production build; text identical run by run; validate clean at 12 widths (0 console / pageerr / failed / broken / overflow / **0 off-origin** — the page embeds no player or widget). No FAQ, so no shared-FAQ bucket. Same fifth template as the other Events pages but with the BARE `.sticky-menus` (left-aligned, `centered={false}`) and TWO new section kinds: an AIDC heading-only block (`Heading`) and the AIDC mentors marquee (`MentorMarquee`) — a `.marquee-swiper` of 14 `.card-type-d` cards, a DIRECT child of `.white-wrapper` (full-bleed), rendered through the shared `MarqueeTrack` + `PersonCard`. The eleven mentors/roles and ten of eleven logos are the ISDI homepage advisory board's exactly: the 10 shared logo files are byte-identical (SHA-1-proven) and reused from `home/advisory-board/`; only Neeta Lulla's logo (image-5, 55×29 PNG) is new. EVERY `a.play-icon` is authored empty, so no card carries a video and no play button renders. `#Creative-catalyst`'s anchor id is on its H2 (`PhotoWall`'s new `headingId`); WDCD is the bare `.duplicate-grid-wrapper` (`galleryVariant="plain"`). This page's white-wrapper nests `white-wrapper > common-wrapper-lg(id, full-width) > container` (the OPPOSITE of creative-showcases' `white-wrapper > container > sections`), so the container is split around the bleed marquee — visually identical, heights exact. Screenshots: menu 0.0, AIDC 0.0, grids ~0.4-1.5 (WebP residue); the three deepest grids at 1440 are confirmed content-identical by direct visual inspection (a full-page-screenshot vertical-tiling drift, not a port diff). Interactions: 12 menu links resolve+scroll, 14 mentor cards ×2 copies, 0 play anchors, 26 shared logos + 2 image-5, WDCD plain. 159 refs: 148 new CDN PNGs → WebP under `events/industry-mentorship/` (36.79MB → 8.21MB at q95; grainy event photos cap ~SSIM 0.977-0.998), Neeta's logo kept PNG, 10 shared logos + 1 immersions photo reused. Sections.js change is additive and re-verified no-op: immersions, skill-tech, creative-showcases 0-diff vs production at 1440/390. Served at the SLASHLESS url. | none |
| `events/skill-&-tech-innovations.php` | `/schools/isdi/events/skill-&-tech-innovations` | **none** — all 9 measured boxes (hero, anchor menu, the 6 sections inside the white wrapper, and the wrapper itself) exact at all 12 widths, against the dev server and a clean production build; text identical to production run by run in every block; validate clean at 12 widths (0 console / pageerr / failed / broken / overflow / **0 off-origin**). No FAQ, so no shared-FAQ bucket. Same template as immersions MINUS the Global-Immersions tab set: hero (`.swiperprogress`, 3 slides) + `.sticky-menus.center` + one `.white-wrapper` holding 6 `.common-wrapper-lg` sections (3 PhotoWall, 2 MotionWall, 1 WideSlider) and a trailing empty `.common-wrapper`. No new component — `Events/Hero` gained an additive `label` prop (defaults to the hero's own title, so immersions is unchanged and was re-verified: 0 diffs at 1440/390). 67 CDN PNGs → 67 WebP (20.15MB → 4.81MB at q95; these source photos are grainier than immersions' and cap around SSIM 0.986-0.997, the encoder's achievable ceiling for this source, confirmed faithful by the static-grid screenshot diff of 0.0-1.6 mean vs production). Served at the SLASHLESS url (production 500s on the trailing slash). | none |
| `life@atlas-isdi/index.php` | `/schools/isdi/life@atlas-isdi` | none outside the shared-FAQ bucket; 20/21 blocks exact at 12 widths (dev server and clean production build), 430/430 interactions, text identical run by run in 17 of 21 blocks and the same SET in all 21 (the four autoplaying carousels differ only in slide order), validate clean at 12 widths with 0 off-origin requests from the top frame | none |
| `admissions/postgraduate/m-des.php` | `/schools/isdi/admissions/postgraduate/m-des` | none outside the shared-FAQ bucket; 9/10 blocks exact at 12 widths (key-dates +15.4 at 1280 only, a font-metrics wrap), 113/113 interactions, text identical to production run by run | none |
| `admissions/postgraduate/mba.php` | `/schools/isdi/admissions/postgraduate/mba` | none outside the shared-FAQ bucket; 9/10 blocks exact at all 12 widths, 175/175 interactions, text identical to production run by run. Reference defect reproduced as authored: the menu's "Financial Assistance" link points at `#education-loan`, which this page does not have (it ships a second date strip where M.Des ships Education Loans) | none |
| `admissions/pre-university-summer-school.php` | `/schools/isdi/admissions/pre-university-summer-school` | none outside the shared-FAQ bucket and the known 568-767 QuoteCard fix; 10/11 blocks exact at all 12 widths, text identical to production across all 11 blocks, 142/142 interactions. NOT the Admissions template: no anchor menu, key dates, eligibility, fees, scholarships or loans. Its `#smr-form` NoPaperForms widget is a live remote embed (the reference's own) and 403s on a localhost referrer | none |
| `admissions/undergraduate/b-des.php` | `/schools/isdi/admissions/undergraduate/b-des` | none; 9/10 blocks pixel-exact at 12 widths, 75/75 interactions | none |
| `admissions/undergraduate/b-tech.php` | `/schools/isdi/admissions/undergraduate/b-tech` | none; 9/10 blocks pixel-exact at 12 widths, 79/79 interactions, text content identical to production run by run | none |
| `atlas-isdi-advantage/industry-centric-approach.php` | `/schools/isdi/atlas-isdi-advantage/industry-centric-approach` | 15/16 blocks exact at all 12 widths; the 16th is the shared FAQ section-padding bucket (+20 above 768 / -20 below). 130/130 interactions, validate clean at 12 widths, 0 requests off this origin. No database. Served at the SLASHLESS url (production 500s on the trailing slash, unlike its two siblings). Two shapes extracted and shared (CareerCard, TransferCard) and five components given defaulted props. Three defects found by screenshot/text rather than by height, all fixed: the advisory board was on the About page's `isdi-black` card variant, `.sub-inner-hd` was flattened to one string, and `.journey-year` was 500 instead of 700. | none |
| `atlas-isdi-advantage/internationalisation/index.php` | `/schools/isdi/atlas-isdi-advantage/internationalisation` | 14/15 blocks exact at all 12 widths; the 15th is the shared FAQ section-padding bucket (+20 above 768 / -20 below), and the one other delta is `events` +24 at 700, the QuoteCard container-width fix. Text identical to production in all 15 blocks. No database. No new card shape — ten local section components over existing ones. One latent bug fixed in shared code (StatsBand's `max-md:pr-6` was beating `max-md:pr-10` on the `.bg7` card). **2026-10-26: the three missing Master's partner logos were restored** — see RESOLVED below; all five cards now match production, and that block's screenshot went from 2.65/3.26/5.41 to 0.38/0.46/1.34 mean at 1440/768/390. | none |
| `atlas-isdi-advantage/the-isdi-advantage/index.php` | `/schools/isdi/atlas-isdi-advantage/the-isdi-advantage` | 14/15 blocks exact at 12 widths; the 15th is the shared FAQ section-padding bucket (+20 above 768 / -20 below). No database anywhere. Six components extracted and shared, and three latent bugs fixed in shared code (StatsBand min-w-0, ZoomSliderLg pagination row, PatentCard content height). | none |
| `programs/postgraduate-diploma/mba-creative-entrepreneurship.php` | `/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship` | fee amounts and wording already match the refreshed reference | none |
| `programs/postgraduate-diploma/pg-interior-styling-&-space-curation.php` | `/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation` | fee amounts and wording already match the refreshed reference | none |
| `programs/postgraduate/index.php` | `/schools/isdi/programs/postgraduate` | reference unchanged by the refresh | none |
| `programs/postgraduate/mba-in-design-management-strategic-thinking.php` | `/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking` | reference unchanged; its copy still reads "refundable" upstream, and ours matches | none |
| `programs/postgraduate/mba/mba-in-event-&-experience-design.php` | `/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design` | Fee Structure href corrected -> /fee-structure/dmst/; rendered output verified | none |
| `programs/postgraduate/mdes/design-futures-2-years.php` | `/schools/isdi/programs/postgraduate/mdes/design-futures-2-years` | Fee Structure href corrected -> /fee-structure/mdes/; rendered output verified | none |
| `programs/pre-university-summer-school.php` | `/schools/isdi/programs/pre-university-summer-school` | reference unchanged by the refresh | none |
| `programs/undergraduate/b-des/accessory-design-&-craft.php` | `/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/b-des-in-communication-design-&-new-media.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/b-des-in-fashion-design-&-technology.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment` | Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified | none |
| `programs/undergraduate/b-des/b-des-in-product-design.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design` | Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified | none |
| `programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management.php` | `/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management` | Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified | none |
| `programs/undergraduate/b-des/fashion-brand-management.php` | `/schools/isdi/programs/undergraduate/b-des/fashion-brand-management` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/health-care-design.php` | `/schools/isdi/programs/undergraduate/b-des/health-care-design` | wording corrected refundable -> Nonrefundable; Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified against the reference | none |
| `programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design.php` | `/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design` | Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified | none |
| `programs/undergraduate/b-des/service-&-experience-design.php` | `/schools/isdi/programs/undergraduate/b-des/service-&-experience-design` | Fee Structure href corrected -> /fee-structure/bdes/; rendered output verified | none |
| `programs/undergraduate/btech/ai-engineering-&-intelligent-products.php` | `/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products` | Route folder renamed from btech-ai-integrated-design, nav href AND label updated ("AI Engineering & Intelligent products"), a 308 redirect added from the old path, and Fee Structure href corrected -> /fee-structure/isdi-btech/. Rendered output verified. | none |
| `programs/undergraduate/btech/btech-design-engineering.php` | `/schools/isdi/programs/undergraduate/btech/btech-design-engineering` | Fee Structure href corrected -> /fee-structure/isdi-btech/; rendered output verified | none |
| `programs/undergraduate/index.php` | `/schools/isdi/programs/undergraduate` | reference unchanged by the refresh | none |
| `success-stories/placements.php` | `/schools/isdi/success-stories/placements` | none. **All 3 blocks exact at all 12 widths** — the first ISDI page in the port with no shared-FAQ bucket, because it has no FAQ. 516/516 interactions at 12 widths, text identical to production in all 3 blocks, per-block screenshots 0.00-0.68 mean, validate clean at 12 widths with 0 requests off this origin. No database, and the mirrored PHP is current (51/51 text nodes and 51/51 media urls diffed against production). Served at the SLASHLESS url (the trailing slash 500s), like industry-centric-approach. No new shared component: `About/Hero`, `StatsBand` and the shared `TransferCard` took it, over one local section. Two latent wrong computed values fixed in shared code (`TransferCard` held `text-white` on the content box the reference leaves at #333; `About/Hero`’s image branch was missing the class’s `display: block`), both inert and both re-verified on every page that renders them. | none |
| `success-stories/success-snapshot/index.php` | `/schools/isdi/success-stories/success-snapshot` | 18/19 blocks exact at all 12 widths; the 19th is the shared FAQ section-padding bucket (+20 above 768 / -20 below). 181/181 interactions, text identical to production in 18/19 blocks (the 19th is a carousel on a different slide), validate clean at 12 widths, 0 off-origin requests from the top frame. No database, and the mirrored PHP is current (text and media diffed node by node). Two shapes extracted and shared (ZoneCard, SliderCardD), LogoStrip moved out of `Industry/ui`, and four components given defaulted props. Four defects found by screenshot rather than by height, all fixed: `.big-logo`'s max-width lost to `max-w-full` in one class list, the Masters logos were pinned to 140x36 by a rule this page does not declare, `.tab-content-mint`'s 56px was missing, and the beliefs slide hugged its card instead of filling the slider below 569. **A fifth was found on 2026-10-26 by the `startups` shared-component run and fixed on 2026-10-27**: all 24 `img.grid-image-card` carry `.isdi` (r16) and only `Success/Universities` passed `GridGallery`’s `round16`, so the 8 alumni and 8 award cards rendered square corners — invisible to the height diff (the cards are a declared height), to the text diff and to a block screenshot mean, and the suite’s own radius assertion sampled one card of one wall. Corner-only screenshot means against production went from 0.10-0.55 to **0.00-0.03** at 1440 / 768 / 390. | none |
| `success-stories/startups.php` | `/schools/isdi/success-stories/startups` | **5 of 6 blocks exact at all 12 widths**; the 6th is the shared FAQ bucket (+22 above 768 / -18 below — the usual ±20 section padding, plus 2px because this include ships no `.accordion-item` style, so its reference draws Bootstrap's stock 1px divider against the component's 2px #eee). 2196/2196 interactions at 12 widths, text identical to production in all 6 blocks, element-by-element 0 diffs at 1440 / 1280 / 991 / 479 / 390 (37 at 768, every one proved to be the self-hosted Manrope), validate clean at 12 widths with 0 requests off this origin, and the logo marquee proved by geometry (18 marks, 0 diffs at 3 widths) because no screenshot can freeze a Webflow IX2 transform. No database, and the mirrored PHP is current (text and media diffed node by node across all 6 blocks, the FAQ include among them). Served at the SLASHLESS url (the trailing slash 500s), like `placements`. No new shared component: `About/Hero`, `StatsBand`, `ui/GridGallery`, `ISDI/LogoStrip` and the site-wide `FAQ` took it, over three small local sections. `GridGallery` gained `card.captionImage` and had two wrong computed values corrected — the column caption wrap now carries `.grid-txt-wrapper`’s Manrope (a no-op on the five ATLAS pages, a FIX on the two ISDI galleries) and the card image the reference's `overflow: hidden`. | none |
| `parents-corner.php` | `/schools/isdi/parents-corner` | **none outside two documented deviations** — the largest ISDI page (16 rendered blocks; the 17th, "Wellness & Support", is `.hide`). All 17 blocks match production's height to the pixel at all 12 widths EXCEPT testimonials +24 at 700 (the QuoteCard 568-767 container-width fix `PeopleVoices` carries site-wide). 9/9 interactions (7 map tabs single-pane, 16-item single-open Webflow-dropdown FAQ), validate clean at 12 widths (0 overflow / console / page errors / failed / broken; the only off-origin is the Upgrad section's own YouTube embed, the reference's own). Text identical; the 2 list-bearing FAQ answers render as `<ul>` (open heights within 2px). **The reference is a moving target**: production serves a NEWER Webflow sheet hash (`68e7910c…`) than the mirror's PHP declares (`68e75e7b…`), but the mirror sheet matches production's computed values exactly (verified), so it was used as the CSS reference. New components `ParentsCorner/{PortCardJ,SliderCardA2,Faq,Sections}`; reuses `About/Hero`, `StatsBand`, `Advantage/Vision` (Academic Approach is that section verbatim), `CardTypeE`, `Carousel`, `MintTabStrip`, `ZoomSliderLg`, `Life/ZoomSlider`+`MotionCard`, `Success/PlacementCard`, `LogoStrip`, `Home/PeopleVoices`, `Home/PinkBanner`, `About/MoreQuestions`. **4 shared components gained additive/defaulted props, all re-verified no-op on their consumers**: `PeopleVoices` (`sources` + index-qualified key — parents-corner repeats one quote 3×), `PinkBanner` (optional `data.sub`), `MoreQuestions` (`inline`, to nest the panel in the FAQ container), `PlacementCard` (optional `card.linkedin`). Several layout fixes found by measurement (not font): figures `padBottom`, family/cost in a 940px `.w-container`, `.sub-heading.mrgbtm` pb ladder (56→20@991→0+mb20@767), `.head-wrap.top` column at ≤767 with `.tt-wrap` mb20/mr20. 192 assets (6.3MB images after WebP, 22MB video after re-encode from 98MB); figures/vision vectors, map tabs, placement/recruiter logos and 2 testimonial videos reused. eslint 0, clean build `○ Static`, regress across all 72 routes clean (only the pre-existing findings). | none |
| `thought-leaderships/index.php` | `/schools/isdi/thought-leaderships` | **none outside the documented self-hosted-Poppins heading deviation** (no FAQ, so no FAQ bucket). Both blocks (hero + `#blog-section`) exact to the pixel at all 12 widths vs production, on dev server and a clean production build; 414/414 interactions at 1440; validate clean at all 12 widths (0 overflow / console / page errors / failed / broken / **0 off-origin**). The page curls the UAT `atlas-blogs/by-school/isdi` feed per request; it is SNAPSHOTTED (44 cards), and the snapshot was re-verified field-for-field against the LIVE feed (count 44, and 0 mismatches on title / date / link / alt / image-map) — the same data production renders. 44 card PNGs (mirrored in `reference/.../assets/images/<month>/N.png`) → WebP; hero + 3 `-p-` twins are the CDN `publication-image` webps byte-for-byte; calendar + arrow icons reused and proven byte-identical to the CDN originals. Hero is `About/Hero` (image form, 658px); blog grid is local `ThoughtLeadership/BlogSection` (`.card` type-b-responsive, 285×517 r0 #f2f2f2, pink #EC1376 "Read now" with black text + inverted arrow). **One real bug found & fixed:** this page reuses the About sheet (`$css`=…68e7936f…) but its inline `<style>` redefines `.h1-tag` with no 44px step, so production holds the hero heading at 56px from 992→768 (then 28 at ≤767); the port was dropping to 44px via `About/Hero`'s shared `max-lg:text-[44px]`. Invisible in the height diff (hero is a fixed 658), found by the hero screenshot. Fixed with an additive, defaulted `data.midHeading` prop — a no-op for all 10 other `About/Hero` consumers (each re-measured locally, h1 ladder still 56/44/28). Screenshots: hero 0.00 @1440; the 768/390 residual is the heading's self-hosted `Poppins ISDI` vs production's unloaded-Poppins fallback (confirmed by forcing a common font: 6.44→2.83 @768), the site-wide ISDI deviation; blog grid ~1 mean (WebP residue). Served at the trailing-slash url (a directory with an index.php). eslint 0, clean build `○ Static`. | none |
| `success-stories/masters-progression.php` | `/schools/isdi/success-stories/masters-progression` | none. **All 4 blocks exact at all 12 widths**, and element-by-element **0 diffs at 1440 / 1280 / 991 / 768 / 479 / 390** across ~55 computed properties per node — the second ISDI page with no bucket of any kind, because like `placements` it has no FAQ. 2544/2544 interactions at 12 widths, text identical to production in all 4 blocks, per-block screenshots 0.00-1.34 mean, validate clean at 12 widths with 0 requests off this origin. No database, and the mirrored PHP is current (23 live cards, 2 commented-out, text and media diffed node by node). Served at the SLASHLESS url (the trailing slash 500s), the third page in this column to do so. **No new shape**: `About/Hero`, `StatsBand`, `StoryPair` and `StudentWall` took it, the last two moved out of their page folders for it. One defect found by the element diff and fixed: `img.transfer-card-img.isdi` takes ISDI's generic `.isdi { border-radius: 16px }`, so `TransferCard` gained a per-card `imageRounded`. | none |
| `isdi-for-outstation.php` | `/schools/isdi/isdi-for-outstation` | **none outside three documented deviations** (the second link in the ISDI header's top utility bar). Fourteen blocks — a 100vh image hero, Right in the heart of the action (7 map tabs + Corporate slider), Eats & Hangouts, Culture & Heritage, Leisure & Lifestyle, Connected & Convenient, Survive and Thrive (a core-isdi-card marquee), Where students become a community (a 4-column photo grid), Upgrad Spaces, Cost of living, A glimpse into your ISDI life (the 7-column week grid), the blue banner, Through the eyes of outstation students, and the FAQ. Block heights match production to the pixel at all 12 widths EXCEPT **(1)** faq −24 at every width — the reference has a stray `<<?php` typo that renders a literal `<` text node (~24px line) before the search panel on production, NOT reproduced; **(2)** people +24 at 700 — the QuoteCard 568-767 container-width fix `PeopleVoices` carries site-wide; **(3)** community +2-4 at 768-1440 — WebP residue. Interactions pass (14 blocks in order, FAQ 16-item single-open, 4 testimonial videos, 7 heart map tabs); validate clean at all 12 widths (0 overflow / console / page errors / failed / broken; the only off-origin is the Upgrad section's own YouTube embed). **Mostly reuse of the Parents Corner components** (the two pages share the Mumbai / student-living blocks verbatim): `HeartOfAction`, `MotionSection`, `SliderSection`, `Upgrad`, `CardTypeECarousel`, `Faq` from `ParentsCorner/Sections`, plus `About/Hero`, `Home/PeopleVoices`, `SummerSchool/WeekGrid`'s `WeekStrip`. New components `Outstation/{SurviveThrive,Community,Glimpse,Banner}` (the four shapes not on Parents Corner). One shared component gained an additive/defaulted prop, re-verified no-op on its consumers (ISDI homepage, parents-corner, summer-school): `PeopleVoices` (`subVariant='sub3'` — the testimonials lead here is `.sub-heading-3`, which lacks the ≤767 `padding-top:20` of the default `SUB`; found by measurement, confirmed not font by an Arial test). The `people +20@390` was that, not font. Community's `.insta-image-rect` is a fixed `width:300px` at ≤767 (not `w-full`, not natural) — measured, after an overcorrection. Week-grid `days[]` read off production's live DOM (CSS-painted cell backgrounds); "Thrusday" typo preserved as authored. 84 WebP assets collapsed onto existing paths (28 new image files, 0.7MB; 3.4MB video). eslint 0, clean build `○ Static`, regress across all 73 routes clean (only the pre-existing findings). | none |
| `atlas-isdi-advantage/global-pathway/index.php` | `/schools/isdi/atlas-isdi-advantage/global-pathway` | **none outside the two documented shared deviations.** The "Global Pathway" hub of the ATLAS ISDI Advantage cluster (NOT linked from the header menu — built as part of the partner-university LP cluster on the user's scope decision). It shares internationalisation's stylesheet (`68e35e01…`) and its EXACT fifteen-block structure and component set, so it is that page's remix: matching blocks re-use internationalisation's components and its content module re-exports internationalisation's data. **14 of 15 blocks match production's height to the pixel at all 12 widths**; the 15th is the shared FAQ's ±20 section-padding bucket, plus events +24 at 700 (the QuoteCard 568-767 container-width fix). **Text identical to production in all 15 blocks** (incl. the re-exported 24-item FAQ, overridden events/masters/summer). Only SIX blocks differ from internationalisation and are page-specific: hero ("ISDI Global Design Pathway…"), the three figures (Global Master Progressors 140+, Across Countries 10+, Total Master Progressors 400+, on internationalisation's backgrounds/images), the Pathway image, the Events heading + three testimonials (first two are internationalisation's faculty videos, the third Amy Williams is a photo card), the Summer gallery (7 images), and the four Masters progressor cards (three carry no partner logo). Re-exported verbatim: menu, parsons, partnerships (5 tabs/62 logos), immersion (5 tabs/13 cards), ged, gedFair, logos (10), search, masters strip. **The FAQ was found by the 12-width production measurement, not the local struct** — `faq.php` (line 851) is a DB-backed include that fatals on the missing DB locally; it renders FAQ master 1 (24 items), the set `lib/designInnovationContent` holds and /about-us re-exports, so it is re-used with the ISDI arrow. **No new component.** Served at the trailing-slash url (301 from slashless). 50 new WebP (13.3MB→3.6MB), 107 of 157 assets SHA-1-deduped onto existing files. eslint 0, clean build `○ Static`, 0 console/overflow/broken/off-origin at 12 widths (the 6-7 failed requests are the 3 YouTube embeds' own telemetry beacons), regress across all 74 routes clean (only the pre-existing findings). | none |
| `nyfa/index.php` | `/schools/isdi/nyfa` | **none outside small carousel/font-metric residuals (≤8px).** First of the SIX partner-university LPs (NOT header-linked; built on the user's scope decision). Unlike global-pathway (a standard ISDI Webflow page) the six university LPs are **Tailwind-Play-CDN bespoke pages** (`cdn.tailwindcss.com` + hand-written utility markup, Swiper carousels, the shared ISDI header/footer). 12 sections: hero, four-panel strip, intro, sticky stack-cards, eligibility checklist, 11-course skills grid, who-can-apply, why-choose (grid/mobile-carousel), who-is-this-for (responsive carousel), about, CTA, disclaimer. **Block heights match production within ≤8px at all 12 widths** except who-can-apply +6 and pathway-works ±36 at 992/900 (stack-card font metrics near the md breakpoint). **Text identical to production in all 12 sections.** validate clean at all 12 widths (0 overflow / console / page errors / failed / broken / **0 off-origin** — no video/embed on this page). **THE BIG FIND: production's LP renders with a Bootstrap-vs-Tailwind CSS collision.** The ISDI header pulls Bootstrap in (for the FAQ); Bootstrap's spacing utilities (`.p-*/.m-*/.gap-*` for 0-5) carry a different scale (bs 3=1rem, 4=1.5rem, 5=3rem) and, loading after, override the page author's Tailwind spacing AT ALL WIDTHS (a base `.py-4` beats even `.md:py-8`). On the **user's "match production exactly" decision**, this is reproduced with a scoped `.lp-bs` CSS block in `globals.css` (0,2,0 specificity, reusable for all 6 LP pages) so the JSX keeps clean authored Tailwind. Two more root causes fixed: **(a)** the Tailwind config generates `@media` rules in config order, so the newly-added LP screens (`n640`=640 / `n1024`=1024, the LP template's stock-Tailwind sm/lg that differ from the project's 480/992) had to be listed in ascending min-width order, else `md:` lost to `n640:`; **(b)** the section headings render line-height 36px on production (from `sm:text-3xl`'s Play-CDN line-height overriding `leading-tight`), reproduced with `n640:leading-[36px]`. New: `components/Schools/ISDI/PartnerLP/LpCarousel` (reproduces the Swiper carousels), `lib/schools/isdi/nyfaContent`. `isdi.blue` (#1e3a8a) added to the config. 22 assets, 20 new WebP (2.3MB), 2 reused (chevron watermark, eligible-bg-2 — the latter byte-identical to the mission bg). eslint 0, clean build `○ Static`, regress across all 75 routes clean (only the pre-existing findings; the config + globals.css changes break no other page). | none |
| `scad.php` | `/schools/isdi/scad` | **none outside small ≤30px spacing/font-metric residuals.** Second of the six Tailwind-CDN university LPs (NOT header-linked). Reuses the nyfa LP template (hero w/ inline SCAD logo, four-panel strip, intro, sticky stack-cards, why-choose grid/carousel, who-is-this-for grid/carousel, about, CTA, disclaimer) **plus five bespoke sections**: SCAD Pro (2-col grid + brand logos), the SCAD ecosystem bullet panels, an influencer 4-card grid + a 17-logo marquee (`#logoTrack`, reproduced with the existing `awards-marquee` keyframe), pricing (bg-isdi-blue) and the U.S. visa advantage. 14 sections; **block heights match production within ≤30px at all 12 widths** (all headings, grids, the marquee and lists match exactly — residuals are minor scattered spacing/font metrics in the bespoke sections: intro −20 is the reference's nested-`<p>` quirk whose empty outer `<p>` collapses and so can't be cheaply reproduced; pricing/visa/ecosystem +6-30; pathway −8 mobile). **Text identical to production in all 14 sections** — the one fabricated line (Kayli Carter's role/desc, which I'd invented from an unread card) was corrected to the real production text after the text diff caught it. **NO new component and NO shared-file change**: reuses `LpCarousel`, the `.lp-bs` collision block, the `n640`/`n1024` screens and the `awards-marquee` keyframe, all already verified by the nyfa regression. validate clean at all 12 widths (0 overflow / console / page errors / failed / broken / **0 off-origin**); both mobile carousels + the marquee work. 51 assets, mostly new WebP (0.38MB after most watermarks deduped); the SCAD Pro Unsplash placeholder and the intro/CTA isme images were localised (the intro/CTA pair had collided on one filename — fixed). eslint 0, clean build `○ Static`. **Site-wide regression COMPLETE** — all 76 routes tested at 1440/390 (run in three ~25-route batches with per-route output after the memory reaper killed the first attempt mid-sweep): scad CLEAN, 0 new findings, only the 9 pre-existing/documented entries (the ATLAS testimonial-video `requestfailed`s, two `networkidle` timeouts on heavy-media pages that load clean under a gentler wait, the Summer School NoPaperForms 403, and the OPEN `industry-and-mentorship` image-5 defect). All LP shared-config/style consumers clean (nyfa, global-pathway, internationalisation, the-isdi-advantage, outstation, parents-corner). | none |
| `parsons-lp/index.php` | `/schools/isdi/parsons-lp` | **none outside three small documented residuals.** Third of the six Tailwind-CDN university LPs (NOT header-linked); the first served at the **TRAILING-SLASH** url (a directory; slashless 301s to it, unlike nyfa/scad which 500 on the slash). 11 sections — hero (no logo), four-panel strip, intro, 4 sticky stack-cards, **"Academic Pathways"** (numbered discipline grid) + **"Who Can Apply"** (bg-isdi-blue banner + `n1024:h-screen` image) of its own, "Why Choose This Pathway?" (grid/mobile carousel), "Who Is This Pathway For?" (a **single** `LpCarousel` perView 1/2/4 + arrows), "About Parsons", CTA, a styled disclaimer card. **No logo marquee / SCAD-Pro / pricing / visa. NO new component and NO shared-file change** — reuses `LpCarousel`, `.lp-bs`, `n640`/`n1024`, `isdi.blue`/`.pink`. **11/11 block heights match production to the pixel at all 12 widths** except why/pathway −8 at mobile (the documented LpCarousel-vs-Swiper pagination delta) and disclaimer +22 at 700 only (a single-width wrap edge, body 3px narrower). **Text identical in all 11 sections.** Four causes investigated & matched to production: heading line-height is Play CDN's bundled 36px at ≥640 (not `leading-tight`) → the nyfa/scad H2 formula; `text-base` body paragraphs are 24px at md (not leading-relaxed) → `md:leading-[24px]`; the stack cards render **content-height** (prod's `md:h-[500px]` never takes effect) → height removed; and the stack's `font-['Manrope']` falls back to generic **`sans-serif`** (Manrope NOT loaded on prod — verified `document.fonts`), not system-ui and not the project's loaded Manrope → forced. validate clean at all 12 widths (0 overflow / console / page errors / failed / broken / **0 off-origin** — no video/widget). Interactions pass. Screenshots ≤3 mean (1440) / ≤2.5 (390) for every static section once production's UNIAI chat widget + fixed header are hidden on both sides. 27 assets, 17 new WebP, 10 reused by SHA-1 (eligible-bg-1/2/3, building-icon, CTA bg and stack-card 1 dedupe onto nyfa/mission). eslint 0, clean build `○ Static` (79 static routes). **Site-wide regression: all 77 routes at 1440/390, parsons-lp CLEAN, 0 new findings** (only the pre-existing testimonial-video / networkidle-timeout / summer-school-403 / industry-and-mentorship-image-5 entries); all LP shared-infra consumers clean. | none |
| `leeds-arts-university/index.php` | `/schools/isdi/leeds-arts-university` | **none outside the two documented LP residuals.** Fourth of the six Tailwind-CDN university LPs (NOT header-linked); directory served at the TRAILING-SLASH url (slashless 301s to it). 12 sections — hero (no logo), four-panel strip, intro, 4 sticky stack-cards, **"Academic Experience"** (bg-isdi-blue 2-col grid of anchor cards, each an area + Leeds BA (Hons) degree linking to leeds-art.ac.uk, with a numbered badge + a disclaimer line) and **"Eligibility Requirements"** (a navy/white two-panel 7-item checklist) of its own, "Who Can Apply", "Why Choose This Pathway?", "Who Is This Program For" (single LpCarousel, 4 cards), "About Leeds", CTA, disclaimer card. **NO new component and NO shared-file change** — reuses `LpCarousel`, `.lp-bs`, `n640`/`n1024`, `isdi.blue`/`.pink` and **every parsons font/layout fix** (H2 formula, `md:leading-[24px]` body, stack content-height + generic `sans-serif`), so **all 12 sections matched production to the pixel on the first pass** at every width except the documented LpCarousel-vs-Swiper pagination −8 on why/pathway at mobile. **Text identical in all 12 sections.** validate clean at all 12 widths (0 overflow / console / page errors / failed / broken / **0 off-origin** — no video/widget). Interactions pass (why carousel advances; who-for arrows advance at 768/3-page and correctly not at 1440/1-page; 4 academic anchor cards 01–04 → leeds-art.ac.uk; 7 eligibility ticks; CTA/About hrefs). Screenshots ≤3.3 mean (1440) / ≤3.5 (390) for every static section once the UNIAI chat widget + fixed header are hidden. 20 assets, 15 new WebP, 5 reused by SHA-1 (eligible-bg-1/2/3, building-icon, CTA bg; stack-card 1 = parsons scroll-con/1). eslint 0, clean build `○ Static` (80 static routes). **Site-wide regression: all 78 routes at 1440/390, leeds CLEAN, 0 new findings** (only the pre-existing entries); all LP shared-infra consumers clean. | none |

## NEEDS UPDATE (0)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |

## PARTIAL (1)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `index.php` | `/schools/isdi` | The whole "Our Programs" tab section (Undergraduate PathFinder pane + two Postgraduate cards) is now commented out line by line upstream and REPLACED by a new include, assets/include/19-programmesv2.php (1,576 lines, Tailwind-authored, its own <style>/<script>). That section is not ported. (The five PathFinder / programme-card short slugs that used to 404 here were resolved on 2026-10-24 on the user's approval — see the RESOLVED section below the tables. The page stays PARTIAL for the un-ported 19-programmes section alone.) | port the 19-programmes section; keep Home/Programs exports, which the UG and PG Overview pages still use |

## BLOCKED (3)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `blog/index.php` | `/schools/isdi/blog` | Dynamic: ?slug= redirect logic and a DB-backed post list; no data source in this checkout. Its images were added to the mirror in the refresh. | decide the data source (snapshot vs API) before scheduling |
| `programs/postgraduate/m-des-in-design-futures.php` | `/schools/isdi/programs/postgraduate/m-des-in-design-futures` | Duplicate of the built mdes/design-futures-2-years.php. The two have now DIVERGED: the menu-linked copy we built carries the refreshed wording and /fee-structure/mdes/, this one still has the old "refundable" + fliphtml5. The Postgraduate Overview card links here, so that card points at a route we do not have. | decide: alias this route to the built one, or repoint the Overview card |
| `programs/postgraduate/mba/mba-design-led-strategy-&-transformation.php` | `/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation` | The header menu links this as "Design Management and Strategy (2 Years)", but upstream it still carries FOUR years of curriculum (an MBA is two). Half-finished upstream. The populated twin, mba-in-design-management-strategic-thinking.php, is built and the menu was repointed to it on your decision. | leave unbuilt until upstream populates it; revisit if the menu label matters |

## NOT STARTED (6)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `celebrating-13-years-isdi-and-parsons/index.php` | `/schools/isdi/celebrating-13-years-isdi-and-parsons` | not linked from the header menu | confirm with the user whether it is in scope |
| `programs/undergraduate/b-des/behavioural-design-&-ai.php` | `/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai` | not linked from the header menu | confirm with the user whether it is in scope |
| `programs/undergraduate/btech/systems-design-&-intelligent-manufacturing.php` | `/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing` | not linked from the header menu | confirm with the user whether it is in scope |
| `the-edits.php` | `/schools/isdi/the-edits` | not linked from the header menu | confirm with the user whether it is in scope |
| `ual-lp.php` | `/schools/isdi/ual-lp` | not linked from the header menu | confirm with the user whether it is in scope |
| `victoria-university-of-wellington/index.php` | `/schools/isdi/victoria-university-of-wellington` | not linked from the header menu | confirm with the user whether it is in scope |

## Totals

| status | pages |
| --- | --- |
| COMPLETE | 51 |
| NEEDS UPDATE | 0 |
| PARTIAL | 1 |
| BLOCKED | 3 |
| NOT STARTED | 6 |
| **TOTAL** | **61** |

## RESOLVED (2026-10-24) — five Pathfinder / programme-card links

**Status: applied on the user's explicit approval.** The five short slugs below now point
at the built pages. Twenty hrefs were repointed across four files — `lib/homeContent.js`,
`lib/designInnovationContent.js`, `lib/schools/isdi/home/pathfinder.js` and
`lib/schools/isdi/home/programs.js` — because the same five slugs appear on the ATLAS
homepage and /programs/ug/ug-design-and-innovation as well as the two ISDI pages. Every
B.Des href in the source now resolves to a real route folder (checked exhaustively), and
the mapping below is the one that was applied.

`assets/include/pathfinder.php` authors seven B.Des links. Two use the full slug and
resolve; **five use a short slug that resolves nowhere**. Checked against production: all
five answer **200 with the ATLAS homepage** — the same catch-all soft-404 the Key Dates
button hits — so the reference itself does not state the destination. The adjacent career
pathways do identify the programme unambiguously, but that is an inference from copy
rather than something the reference asserts, so **nothing was changed**.

| authored slug (as in the reference) | proposed destination | why the mapping is INFERRED |
| --- | --- | --- |
| `b-des-communication-design` | `b-des-in-communication-design-&-new-media` | reference resolves to the ATLAS homepage (soft-404), so no destination is stated; inferred from the career pathways printed beside it — Immersive Media & Spatial Interface (XR), Content Systems & Visual Intelligence, UI/UX for AI-Driven Products |
| `b-des-in-animation-&-vfx` | `b-des-in-animation-&-vfx-&-gaming` | soft-404 upstream; inferred from Procedural & Generative Animation, Game & Interactive Media Animator, VFX & Simulation Systems |
| `b-des-in-fashion-design` | `b-des-in-fashion-design-&-technology` | soft-404 upstream; inferred from Digital Fashion & Virtual Product Designer, Innovation-Led Fashion Entrepreneur, Data-Driven Fashion Forecasting |
| `b-des-in-interior-design` | `b-des-in-interior-design-&-built-environment` | soft-404 upstream; inferred from Retail & Brand Experience Space Designer, Digital Twin & Virtual Space Designer, Human-Centered Spatial Systems |
| `b-des-in-strategic-design-management` | `b-des-in-strategic-design-&-innovation-management` | soft-404 upstream; inferred from Design Research/Foresight & Insights, Sustainable Innovation & ESG Strategy, Product/Platform/Growth Strategist |

Each maps to exactly one built page and no two collide. **Note this is the one place in
the rebuild where the port deliberately diverges from the reference**: upstream these five
links are soft-404s, and the destinations above are inferred from the career pathways
printed beside each card rather than stated by the reference. The user approved the
inference on 2026-10-24.

## RESOLVED — the B.Des Admissions eligibility lists

Building the B.Tech page surfaced a gap in the **already-completed B.Des Admissions** page.
Its "International Baccalaureate (IB)" dropdown is authored in the reference as three
paragraphs each followed by a `<ul>`; the port transcribed only the three paragraphs, so the
three list items are missing.

It escaped every earlier check because the dropdowns start **closed** — the block's height
matched production at all twelve widths regardless, and the text is not in the DOM until a
visitor opens it.

**Fixed (2026-10-23), data only.** `lib/schools/isdi/admissions-isdi/b-des/eligibility.js`
is the only file changed (+26 lines, no deletions); the list items were read out of the local
reference by script rather than retyped, and the authored `;east` typo and `(IB)` spacing are
preserved. The IB group now carries all **five** items across its three lists
(1 / 1 / 3) — an earlier note here said "three", which counted the lists, not the items.

Verified with the dropdowns **open**, not closed: every paragraph, list and item matches the
reference on /schools/isdi/admissions/undergraduate/b-des at 1440 and 390 (and the B.Tech page
likewise). 75/75 interactions, `validate.py` clean at all twelve widths, 12-width block heights
unchanged apart from the shared FAQ's existing bucket, ESLint and the production build both
exit 0.

## RESOLVED (2026-10-26) — three missing partner logos on /atlas-isdi-advantage/internationalisation

Found on 2026-10-26 by the shared-component regression run for
`success-stories/placements` (`scratchpad/pl1/comp.py`), which measures every
`.transfer-card` on every page that renders one, and **fixed the same day on the
user's instruction**.

"Master's Progression Support" has five cards. The reference gives all five a
partner logo; the port rendered two. Cards 3, 4 and 5 author the mark as a bare
`<img>` with no class, and `scratchpad/intl/extract.py` selected
`img.transf-un-logo` only — so `lib/schools/isdi/internationalisation/masters.js`
carried `logo: null` on those three.

The card is a declared 282x388, so a missing logo costs no block height — which is
why that page's 12-width height diff, its text diff and its interaction suite all
passed, the suite having asserted "two of them carry a university logo" and so
baking the gap in as a requirement.

**No asset was missing.** All three files were already in `public/` and already in
the page's manifest — the downloader scans every `<img src>` off the live DOM, so
only the extractor dropped them. Re-fetched and compared byte for byte before use:

| card | file | painted | bytes |
| --- | --- | --- | --- |
| Diva Rathore | `masters/coll-2.png` | 118x42 | 7,383, SHA-1 matches the CDN |
| Sannidhi Nayak | `masters/imperial-college-london5190-1.png` | 119x37 | 6,205, SHA-1 matches the CDN |
| Anantika Sethi | `masters/uom.png` | 119x37 | 5,898, SHA-1 matches the CDN |

Changed: `scratchpad/intl/extract.py` (a `card_logo()` that reads the LAST `<img>`
in `.transfer-card-content` whatever class it carries, and names the kind from that
class), the regenerated `lib/schools/isdi/internationalisation/masters.js` (three
`logo` objects plus a `logoKind` on all five), and
`components/Schools/ISDI/International/Masters.js`, which now passes
`person.logoKind` through to the shared `TransferCard`.

Verified against production: the `masters` block still matches its height at all
twelve widths, text identical in all 15 blocks, its screenshot improved from
2.65 / 3.26 / 5.41 to **0.38 / 0.46 / 1.34** mean at 1440 / 768 / 390, the
interaction suite is 128/128 with the assertion rewritten to name each card's own
file and painted size, and `comp.py` reports **0 diffs on all five transfer-card
pages**. `npx eslint .` 0, clean `npx next build` (61 routes), `regress.py` over
all 61 at two widths with 0 overflow / page errors / failed requests / broken
images.

## RESOLVED (2026-10-27) — sixteen square card images on /success-stories/success-snapshot

Found on 2026-10-26 by the shared-component regression run for
`success-stories/startups` (`scratchpad/st1/galleries.py`), once that check started
reporting each gallery image's `border-radius` beside its box, and **fixed the next
day on the user's instruction**.

All 24 of that page's `img.grid-image-card` carry `.isdi`, which is
`border-radius: 16px` — verified in the reference markup (24 of 24 author
`class="grid-image-card isdi"`) and on production. `ui/GridGallery` takes that as its
`round16` prop and only `Success/Universities` was passing it, so the eight cards of
"Startups founded by ATLAS ISDI Alumni" and the eight of "Awards & Recognitions"
rendered square corners.

The card is a declared height in both galleries, so the gap cost no block height —
which is why that page's 12-width height diff, its text diff and its 181/181
interaction suite all passed. A 16px radius is also invisible in a block-level
screenshot mean at that scale.

**The interaction suite had asserted it, against one wall.** The line read
`walls['uni']['r16'] == '16px'` — the FIRST card of the universities wall standing in
for all 24 images — so it passed for as long as the defect existed. That is the same
shape as the internationalisation "two of them carry a university logo" assertion, and
it is now written against every instance the reference has: all 24 radii are collected
and compared.

Changed: `round16` on `components/Schools/ISDI/Success/Alumni.js` and
`components/Schools/ISDI/Success/Awards.js` (one prop each, with the reason recorded
at the call site), and the widened assertion in `scratchpad/ss1/interact.py`.
`ui/GridGallery` itself needed no change, and no other page was touched.

## OPEN (2026-10-27) — seven square card images on two finished pages

Found by the element-by-element diff for `success-stories/masters-progression`
(`scratchpad/mp1/pair.py`), which reported all 23 of that page's card photographs at
`border-radius: 0` against the reference's 16px. **Fixed on that page; recorded
rather than changed on the other two, which are outside this task's scope** — the
same call the Success Snapshot gallery radius got.

`img.transfer-card-img` has no `.isdi` rule of its own. Where a card authors the
token on the image, the radius comes from ISDI's **generic** `.isdi
{ border-radius: 16px }`, and the references author it PER CARD:

| page | card images carrying `.isdi` |
| --- | --- |
| `success-stories/masters-progression` | 23 of 23 — **fixed** |
| `success-stories/success-snapshot` | **5 of 12** — open |
| `atlas-isdi-advantage/internationalisation` | **2 of 5** — open |
| `success-stories/placements` | 0 of 21 — correct as shipped |
| `atlas-isdi-advantage/industry-centric-approach` | 0 of 8 — correct as shipped |

So seven cards across two finished pages render a square photograph where the
reference rounds it. The card itself is `.transfer-card.isdi`, `border-radius: 17px`
with `overflow: hidden`, so it clips the image's corners to within a pixel of the
same curve — the visible difference is very small, and that is why no height diff,
text diff, screenshot mean or interaction suite on either page caught it. The
computed value is still wrong.

`components/Schools/ISDI/TransferCard` already takes the flag (`person.imageRounded`,
opt-in and absent from both pages' data, which is why they are unchanged today). The
fix is to set it on those seven cards in
`lib/schools/isdi/success-snapshot/` and `lib/schools/isdi/internationalisation/masters.js`
— ideally by having each page's extractor read the image's class, the way
`scratchpad/mp1/gen_data.py` now does — plus an interaction assertion naming the
radius per card so it cannot regress silently.

## OPEN (2026-10-29) — events/industry-and-mentorship references a missing `image-5.png`

Found by the all-routes regression sweep run while building
`/schools/isdi/thought-leaderships`. It is a **pre-existing defect in uncommitted
prior-session work** (the whole `public/assets/images/schools/isdi/events/industry-mentorship/`
tree is untracked) — **not caused by this task**, which touched only the thought-leaderships
page and the additive `About/Hero` `midHeading` prop (that page does not render `About/Hero`).

`lib/schools/isdi/events-industry-mentorship/mentors.js:138` points Neeta Lulla's mentor
logo at `mentors/image-5.png`, but only `mentors/image-5.webp` (544 bytes) exists on disk,
so the image 404s and `[...document.images].naturalWidth===0` reports it broken at 1440.
The tracker still lists this page COMPLETE (CLAUDE.md records its validate as "0 broken"),
so this is a regression that crept in after that verification — likely a late WebP
conversion that renamed the file without repointing the data.

**Flagged, not fixed** — it is a different page, outside this task's scope, and the
instruction was to preserve existing work and not overwrite it. The fix is one line
(repoint the data to `image-5.webp`, or restore the `.png`) plus a re-measure of that page.

## OPEN (2026-10-27) — /life-at-atlas's third Wellness pane loads the wrong candidate

Found while regressing `ui/TertiaryTabs` for `/schools/isdi/life@atlas-isdi`
(`scratchpad/lf1/tabscheck.py`, which clicks every pane on both sides and compares
the candidate the browser actually loads).

The component used to hard-code `sizes="(max-width: 1279px) 100vw, 1238px"` — the
value /advantages/atlas-advantages was measured with. It now reads the pane's own
`image.sizes` when the data carries one, which took **/advantages/atlas-advantages
from two wrong candidates to three right ones**: its panes 2 and 3 author `100vw`,
so production loads the 1440x669 file where the hard-coded 1238px took a smaller
one. Verified pane by pane at 1440 and 390 — every pane now matches production.

**/life-at-atlas is unchanged by that, and still off on one pane.**
`lib/lifeContent.js` carries no `sizes` on any Wellness pane image, so all three
keep the fallback; production's third pane asks `100vw` and loads 1440x669 where we
load 1238x576. Two candidates of the same photograph are not the same ratio, so the
pane is a fraction of a pixel short there.

It is that page's DATA, not the shared component, and it is a different page from
the one this task built — recorded rather than changed, the same call the card
radii above got. The fix is to transcribe `sizes` onto the three
`lifeContent.wellness.tabs[].image` entries from the reference's own markup and
re-measure that page.
