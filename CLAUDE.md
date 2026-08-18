# ATLAS SkillTech University — website rebuild

Rebuild of the ATLAS SkillTech University site (`atlasuniversity.edu.in`) in
Next.js, section by section, from the original PHP/Webflow site kept in
`reference/`.

## The reference is the source of truth

`reference/` is the existing PHP site. It is the **visual and content
reference** — never a runtime dependency.

- `reference/index.php` is the homepage. Sections are ported in the order it
  declares them.
- Page styling lives in
  `reference/assets/css/atlass-fantastic-site-48323a.webflow.6846c77f346415bfcbb813c2-39fec0282.css`
  (the `$css` variable in `index.php`), layered over
  `reference/assets/css/main/…shared…css`. Both are loaded by
  `reference/assets/include/header.php`, which also carries a large inline
  `<style>` block — check it, several responsive rules live only there.
- Sliders are Swiper 11, initialised at the bottom of
  `reference/assets/include/footer.php`.

**Before implementing a section, read its reference markup, its CSS, and its
JS init, and check both the desktop and the mobile rendering.** Don't guess
the design and don't invent headings, copy, programme names, statistics,
button labels, images or categories — if the reference has it, reproduce it.

### Measuring the reference

XAMPP serves the reference directly:

    http://localhost/atlas/2026/08-august/5/atlas-website/reference/index.php

Driving that URL with Playwright and reading `getComputedStyle` /
`getBoundingClientRect` across viewport widths is the fastest way to resolve
the Webflow cascade (duplicated selectors, async-loaded stylesheets and
Swiper's own CSS make static reading unreliable). Do this rather than
inferring values from the CSS files alone.

If the reference contains an outright layout bug, don't reproduce it — fix it
and document the deviation in the component's header comment.

## Assets

Copy every asset a section needs out of `reference/` into `public/assets/…`
and reference the copied path. Never point at `reference/` or at
`https://atlasuniversity.edu.in/…` at runtime. Copy only what the section
actually uses, and preserve the original files byte-for-byte (don't
re-encode).

## Stack rules

- Next.js (App Router) + React, **JavaScript only** — `.js` / `.jsx`.
  No TypeScript.
- Tailwind CSS for everything: spacing, typography, colour, responsive
  layout, hover, transitions, positioning, animation.
- `app/globals.css` is the project's only stylesheet and stays that way. It
  holds exactly three things Tailwind utilities cannot express: `@font-face`,
  the `<body>` base, and an `<img>` display reset. Adding anything else needs
  a genuine technical reason, stated up front.
- `tailwind.config.js` mirrors the reference: Webflow's breakpoints
  (`max-lg` 991 / `max-md` 767 / `max-mcm` 568 / `max-sm` 479, `lg` 992 up)
  and a font scale pinned to `line-height: 1.5`. Extend it rather than
  reworking it.
- Classes toggled by React state must be added to the `safelist` — the JIT
  compiler only sees literal strings in source.

## Structure

    app/                page + layout
    components/<Area>/  one folder per section or feature area
    lib/                content data, hooks, helpers
    public/assets/      images, icons, logos, fonts, videos

- `lib/homeContent.js` holds the homepage copy, one export per section,
  transcribed 1:1 from `index.php`. Sections render from that data, not from
  duplicated JSX.
- Reuse what exists before adding anything: `SmartLink` (internal vs external
  links), `cx` (class joining), `useMediaQuery` / `useIsDesktop`, and
  `components/Programs/` — `ProgramsSection` (section shell: heading + slider
  + optional trailing content) over `ProgramSlider` over `ProgramCard`. All
  four homepage programme carousels are the same markup; only the copy,
  `accent`, `buttons` variant and card data differ, so each section file is a
  few lines that hands its `lib/homeContent.js` export to `ProgramsSection`.
- Server components by default; `'use client'` only where there is real
  interactivity.
- The reference writes site-root URLs through `<?php echo $edudomain ?>`, so
  `<?php echo $edudomain ?>applicationform` becomes `/applicationform`.

## Ground rules

- Completed sections are done. Don't rebuild, restyle or "improve" the
  Header, Hero, Awards or any other finished section unless asked.
- Add a new section in its reference position in `app/page.js`; change
  existing code only where integration genuinely requires it.
- No unrelated changes, no redesigns, no global design-system edits.
- Match the reference on mobile, tablet and desktop — implement the mobile
  behaviour from the reference, don't shrink the desktop layout.
- Finish the job: build it, run it, check the console, compare it against the
  reference at several widths, and confirm the existing sections still render.

## Sections completed

1. Header + Footer — `components/Header/`, `components/Footer/`
2. Hero — `components/Hero/Hero.js` (`index.php:54-90`)
3. Awards / rankings marquee — `components/Awards/Awards.js` (`index.php:91-226`)
4. Career-Focused Undergraduate Programs (`index.php:248-618`)
5. Design-Led Undergraduate Programs (`index.php:623-949`)
6. Future-Ready B.Tech Programs (`index.php:952-1143`)
7. Industry-Integrated / Postgraduate Programs (`index.php:1146-1495`)
8. From Campus to Career & Beyond: The ATLAS Impact —
   `components/Impact/` (`index.php:1499-1968`)

4-7 all live in `components/Programs/`.

**Note on section 8 — a section can span more than one top-level block.** The
heading lives in `div.section > section.blueprints` (`index.php:1499-1551`)
next to an `.outcome-wrap` the stylesheet sets `display: none` on, so its three
legacy `.outc-card`s never render. The content the section actually shows is
the *next* top-level block, `div.page-wrapper-stack > main.main-wrapper-stack >
.section_stack` (`index.php:1552-1968`) — three sticky `.stack_card`s that pile
up on scroll, each with its own `.marquee-swiper` logo strip and newer copy and
figures than the hidden cards. Reading only as far as the heading's own
`</section>` gets this section wrong: **always check whether the block after a
heading's wrapper belongs to the same visual section**, and cross-check what a
block actually renders (`getComputedStyle().display`) before porting it.

9. About ATLAS (`index.php:1969-1979`)
10. Our Mission / Our Vision (`index.php:1980-1993`)
11. Four Schools. One University. Infinite Possibilities.
    (`index.php:1994-2053`, including `assets/include/more-questions.php`)

9-11 live in `components/About/`.

**Watch for CDN-only assets.** Several sections reference images that exist
*only* on `cdn.prod.website-files.com`, never in `reference/assets` — the
mission/vision panel backgrounds, the chat panel background, its flower icon
and the search-button glyph all came from there. Grep the CSS for
`website-files.com` as well as the markup, download what the section needs into
`public/`, and never leave a CDN URL in the shipped code.

12. Leadership Team (`index.php:2054-2098`)
13. Steering Excellence, Guiding ATLAS (`index.php:2099-2255`)
14. ATLAS News (`index.php:2256-2469`)
15. ATLAS's Core Advantages (`index.php:2470-2534`)

12-15 live in `components/Home/`, over `components/Carousel/Carousel.js`.

**Grep compound selectors too.** Two bugs in this batch came from a CSS grep
that only matched `.foo` followed by space/comma/brace/colon: the real rules
were `.card-type-d.swiper-slide { min-height: 350px; max-height: 350px }` and a
`:where(...)` variant split across lines that resets the card to 272px. When
hunting a class, grep the bare name and read every hit.

**The reference has a third mobile breakpoint.** Besides Webflow's 991/767/479,
`assets/include/header.php` carries an inline `@media (max-width: 568px)` —
that is where `.common-swiper-full .swiper-slide` becomes `width: 100%` and
where slider bullets appear. The project's `max-mcm` variant is that
breakpoint; don't assume a card that goes fluid does so at 767.

16. Location (`index.php:2535-2546`)
17. A campus built to learn, live & thrive (`index.php:2548-2640`)
18. Industry on Campus (`index.php:2641-2835`)

**A declared border with no style paints nothing.** `border-top: 0.5px #e8e8e8`
(`.port-card-m-posi-atlas`) and `border: 0.25px #ffffff40`
(`.mid-flex-stack-atlas`) both omit `border-style`, so they compute to `none` /
0px. Don't add a border class for them. Note Tailwind's Preflight sets
`border-style: solid` with `border-width: 0` project-wide, so computed
`border-*-style` will read `solid` where the reference reads `none` — identical
paint, so ignore that in comparisons.

**Some reference URLs are broken locally.** `$edudomain` is empty in this copy,
so `<?php echo $edudomain ?>assets/...` becomes `http://localhostassets/...`
(no slash) and 404s — that is why the campus-tour video renders as a 300x150
default box in the local reference. Check the production URL before treating a
broken asset as intended.

19. Think International (`index.php:2836-2903`)
20. ATLAS Spotlight (`index.php:2904-2963`)
21. Thought Leadership (`index.php:2966-3048`)

**There are five mobile breakpoints, not three.** Webflow's 991/767/479 plus two
in `assets/include/header.php`'s inline `<style>`: `max-width: 568px`
(`max-mcm` — slider slides go full width, bullets appear) and
`max-width: 540px` (`max-vsm` — `.grid-gallery` becomes a horizontal flex
scroller). And some classes turn earlier than you'd guess: `.h2-tag.isdi` is
36px from **991** down, while a plain `.h2-tag` waits until 767.

**Thought Leadership is a data snapshot.** index.php curls
`uat-dashboard.atlasskilltech.app/api/atlas-blogs` per request. It is
snapshotted into `lib/homeContent.js` with its 20 images downloaded into
`public/assets/images/thought-leadership/`, because the endpoint is UAT and the
images are remote. Re-run the snapshot to refresh the feed.

**Poppins exists for exactly one heading.** `.h2-tag.isdi` (Thought Leadership)
is the only non-Manrope text on the homepage. Only the 500 face is self-hosted,
because the reference asks for weight 400 and has no 400 face, so it resolves
to 500 — `font-poppins font-normal` reproduces that.

22. The Action never stops! — `components/Home/ActionNeverStops.js` →
    `InstagramFeed.js` → `InstagramPostTile.js` + `InstagramPostModal.js`, over
    `lib/instagram/` (`index.php:3061-3114`)

**Section 22 needs a token to show anything.** It resolves the latest Instagram
post through the Meta Graph API server-side. Copy `.env.example` to `.env.local`
and set `META_ACCESS_TOKEN`; without it the section renders its heading and a
real profile link rather than a fabricated post. `lib/instagram/posts.js` and
`lib/instagram/mediaUrl.js` are both `import 'server-only'` — the token is read
in those two places and nowhere else, is never returned to the caller, and never
appears in an error message (Graph errors can echo the request URL, so only the
status is surfaced). There is deliberately no `NEXT_PUBLIC_` variant.

`app/page.js` carries `export const revalidate = 900` for this: everything else
on the page is static, but the feed must not be frozen into the build.
`lib/instagram/posts.js` keeps the walked feed in a **module-scope** cache with
the same TTL, and every `src` it emits is `/api/instagram/media/<media-id>` on
this origin — never a signed fbcdn URL, which expires within hours. A stale cache
entry is preferred over an empty section if a refresh fails.

**Nothing about this section may touch the filesystem.** The first build of it
downloaded every image into `public/assets/images/instagram/` and cached the feed
as `feed.json` beside them, which works on a long-lived box and cannot work on
Vercel: the deployment filesystem is read-only and a lambda's `/tmp` is
per-instance and ephemeral, so the writes silently failed, the emitted
`/instagram-media/<file>` paths 404'd, and Load More — which needed the stored
cursor — failed outright. The fix is `app/api/instagram/media/[id]/route.js`:
given a media id it resolves the *current* CDN URL server-side and streams the
bytes back under
`Cache-Control: public, s-maxage=900, stale-while-revalidate=3600`. A media id is
already public (it is `post.id` in the HTML); the token and the signed URL never
leave the server.

Two details that make the one route sufficient. A **CAROUSEL_ALBUM child id
resolves on its own** (`/{child-id}?fields=media_type,media_url` → 200), verified
against the live API, so every slide of an album is addressable without naming a
parent or an index; and the **profile picture** — which is not a media object —
takes the reserved alias `profile`. A **VIDEO** returns no `media_url` on a direct
lookup, only `thumbnail_url`, which is exactly the poster frame the UI shows.

The viewer sizes its media pane to the post's own aspect ratio and the Graph API
does not return dimensions, so those used to come from the downloaded bytes.
They still are measured, with a `Range: bytes=0-65535` request whose body is read
and dropped (fbcdn answers 206 with exactly that slice) — and only for each
post's **cover**, since `InstagramPostModal` takes `aspectOf(slides[0])` and every
later slide is `object-contain` inside that frame. Nine measurements per page,
not one per carousel child.

**The section is a 9-up grid with Load More, not one post.** `getInstagramFeed()`
returns the first `PAGE_SIZE` (9) posts newest-first; `getMoreInstagramPosts()`
walks Meta's own `after` cursor and appends. Three rules that matter:

- **One Graph call per page.** The comments edge is requested as an inline field
  on the media edge (`comments.limit(30){...}`), so nine posts with their comments
  cost one request, not ten. The token may lack `instagram_manage_comments`,
  which fails the *whole* request on that one field — so a failure is retried once
  without it and those posts get `commentsStatus: 'unavailable'`.
- **Never store `paging.next`.** That value is a full URL with the access token in
  the query string. Only the opaque `paging.cursors.after` is persisted, and the
  request URL is rebuilt server-side.
- **The cursor never reaches the browser.** Load More is a server action
  (`lib/instagram/actions.js`) that takes only the number of posts already shown;
  the cursor lives in the cache. Pages already walked are served from memory, and
  appended posts are deduplicated by media id on both sides. Because that cache
  is per-instance, a Load More can land somewhere that has never built the feed —
  so it rebuilds page 1 and walks the cursor forward to the requested offset
  instead of failing.

**Two Next.js traps this section hit, both worth remembering.**

- **`next start` snapshots `public/` at boot.** A file written into `public/`
  after the server starts 404s until a restart — verified directly: on disk,
  404 before a restart, 200 after. That is what first drove this section's media
  through a route handler rather than a public asset; it has since stopped
  writing files at all, but the rule stands for anything else that would.
- **`fetch(url, { cache: 'no-store' })` in a server component makes the whole
  route dynamic.** The homepage flipped from `○ Static / Revalidate 15m` to
  `ƒ Dynamic`, so every visitor re-rendered all 18 sections. The obvious fix —
  letting Next cache the fetch — is *wrong here*, because the Data Cache would
  write the request URL and response into `.next/cache` and both carry the access
  token (Graph takes it in the query string and `paging.next` echoes it back).
  `lib/instagram/httpGet.js` uses `node:https` instead: invisible to Next's
  caching, so the page stays static AND `.next` stays free of credentials
  (verified: 0 token values across 261 build files, no `fetch-cache` at all).

**The reference for this section lives outside `reference/`.** index.php only
holds an `<iframe>` to `https://atlasuniversity.edu.in/instagram-post/social`;
that page is not in the mirrored copy, so its markup had to be fetched and read
to learn the architecture (local thumb cache, platform badge, hover overlay with
real counts, tiles linking to real permalinks). The cross-origin iframe is
deliberately **not** reproduced: the grid is ours, fed by the Graph API in
process, and every card opens an Instagram-desktop-style viewer built from our own
components.

**Cache filenames must be keyed on the media id, not the media URL.** Meta
re-signs its CDN URLs on every read, so hashing the URL writes a fresh copy of
the same unchanged frame on every refresh and grows `public/` without bound (six
copies of one reel frame, found and cleaned up). A media id's bytes never change;
the account's profile picture can, so that one is fetched with `revalidate`.

**Three traps this section walked into — all worth remembering.**

- **`next build` can serve a stale prerender.** After changing what a server
  component reads, a build "succeeded" and still shipped the previous session's
  data (a deleted test fixture). `rm -rf .next` before trusting a prerendered
  page whose data source changed — and check for stale `next start` processes by
  **port**, never with a blanket `taskkill /IM node.exe` (that kills the dev
  server on 3000 too).
- **An overlay rendered in place can never beat the header.** `CONTAINER`
  carries `relative z-[1]`, which is a stacking context, so a dialog nested in a
  section is clamped below the fixed header bars at `z-1090/1100` no matter what
  z-index it declares. Overlays must be `createPortal`'d to `document.body`;
  `z-2000` was added to the config for them.
- **An inline `aspect-ratio` outlives the breakpoint you meant it for.** Inline
  style beats every class, so an aspect-locked media frame kept its ratio when
  the layout stacked and left ~300px of black under the image. Pass the value as
  a custom property and apply it per-breakpoint: `style={{'--ig-aspect': n}}` +
  `md:aspect-[var(--ig-aspect)]`.

**Comments have three states, not two.** The Graph comments edge needs
`instagram_manage_comments`. `commentsStatus` distinguishes `ok`, `empty` (Meta
really returned none) and `unavailable` (the edge errored / the scope is
missing), so the viewer never claims "no comments" when it simply could not read
them. Nothing in the viewer fakes an interaction either: Like, Comment, Share,
Save, the avatar, the handle and "View on Instagram" are all `<a>` elements
pointing at the real `permalink` or profile, and the only `<button>`s are close
and carousel paging.

23. In their own words: Why ATLAS feels right — `components/Home/Testimonials.js`
    (`index.php:3115-3532`)
24. Your Future Begins Here. — `components/Home/FutureBeginsHere.js`
    (`index.php:3533-3546`)
25. Questions? We can read your mind — `components/Home/FAQ.js`
    (`assets/include/faq/atlas/home.php`, included at `index.php:3553`)

**Section 23 is a tab set, not a carousel section.** Four Webflow tabs (the
markup's own ids skip "Tab 3") each wrapping their own `.common-swiper-full`:
Parents 3 video cards, Students 10, Industry 4, Global 9. `.tabs-menu-mint` is a
horizontal scroller that bleeds `-61px` with `60px` of inner padding, so the
active tab sits 1px left of the container — reproduce that, it is not a rounding
error.

**`Carousel` must be a sibling of `.container`, never a child.** It pads its own
track by the container inset to reproduce the reference's `overflow: visible`
bleed. Nesting it inside `CONTAINER` applies the inset twice and pushes the first
card 62px right — caught visually, after the computed-style pass had come back
clean, because every individual property was correct and only the *position* was
wrong. Compare screenshots, not just measurements.

**`w-full` on an auto-width flex child blows up.** The testimonial card used
`max-md:w-full` inside `Carousel`'s auto-width `<li>`; percentage-against-auto
resolved to a 1005px intrinsic max at a 390px viewport. The reference has the
identical bug (its own slide measures 1005px at 700px, and its page scrollWidth
is 569px at 390px — real horizontal overflow). Fixed here with an explicit
`max-md:w-[calc(100vw-44px)]`, which is the container width below 768.

**The FAQ is a real Bootstrap 5.3.8 accordion** — the CDN bundle is loaded in
`header.php`. All items closed on load, `data-bs-parent` means single-open, and
the button colour has three states worth reproducing: `rgba(43,43,43,.8)` closed,
`#052c65` open, and `rgba(43,43,43,.8)` again on hover (the include sets that
with `!important`). Measuring right after a Playwright click reads the *hover*
colour, so move the mouse away before sampling — the reference behaves the same.

**The Parents video is broken by a mis-scoped inline rule.** `index.php:1774`
styles `.testimonial-video` for the campus-tour video (`width:100%;
height:700px`); it also matches this section, so the 620x440 `overflow:hidden`
card pushes `.student-text` entirely outside itself and the quote and parent
name are invisible on desktop, while the same markup renders fine on mobile. The
section's own declared rule (`width:325px; height:440px`) is used instead.

The homepage is now complete through the FAQ (21 headings, 12 carousels). Next in
`index.php`: nothing — `assets/include/footer.php` follows the FAQ include.

## Pages beyond the homepage

    app/about-us/page.js   <- reference/about-us.php

### /about-us

Twelve sections; four are the homepage's components driven by this page's data
(`MissionVision` unchanged, `LeadershipTeam` / `AdvisoryBoard` / `AtlasSpotlight`
/ `FAQ` via optional props that default to the homepage's export, so the
homepage is untouched). The page-specific ones live in `components/About/`.

**Each page has its own Webflow stylesheet.** about-us.php sets
`$css = "…690ad2923c5be20148ff0fec-e309b2cd1.css"`, not the homepage's. Class
names overlap but values do not always: `.title-txt-grid` is 16px/500 there and
18px/500 on the homepage, and the About FAQ is a completely different skin. Read
the CSS named by the page's own `$css`.

**All 106 of its assets were CDN-only.** Nothing this page references exists in
`reference/assets` — every image, the chancellor video and its poster live on
`cdn.prod.website-files.com`. They are downloaded into
`public/assets/images/about/<section>/` and `public/assets/videos/about/`,
Webflow's `-p-500/-800/-1080` variants included so each `srcSet` still matches.
Two of them (`eligible-bg-2.png`, `vision-bg-1.png`) turned out byte-identical to
the homepage's mission/vision backgrounds and are reused rather than duplicated.
**CSS-declared backgrounds are invisible to a markup scan** — those two are only
referenced from `.our-lt-atlas` / `.our-rt-atlas` in the stylesheet, so grep the
page CSS for `url(` as well as the HTML.

**about-us.php fatally errors before its footer.** Line 896 is
`<!--<?php include "assets/include/faq.php" ?>-->` — an HTML comment does not
stop PHP, so the include still runs, and faq.php needs a database handle this
copy has none for. Everything after it is missing locally: the footer, the
Bootstrap bundle and the Swiper initialiser. That is why the reference's own
accordion will not open and its three sliders never gain `spaceBetween: 24`.
Measure the markup, but implement the working component the markup intends —
Bootstrap's `--bs-accordion-*` custom properties are still readable off the page
and give the exact open-state colours (`#052c65` on `#cfe2ff`).

**Two more reference defects on this page, both left unreproduced.** Each
"Shaping a Viksit Bharat" card runs a script that sets
`background-image: url(' + getAttribute('data-card-cint-b-bg') + ')` from an
attribute none of them carry, so the reference paints `url(null)` over the
stylesheet's `purple-square.png` and lands on flat `#41418e` — which is what the
port does, and why that PNG is not downloaded. And `.slide-wrap` in the MoU tab
is a fixed 5000px row with no animation; it simply runs out of its clipped
frame.

**Shared components own their own look — pages pass content, never styling.**
When a design appears on more than one page it lives in one component and takes
only `data` / content props. There is no `variant` for skinning and no
page-specific CSS override; `app/globals.css` holds no component or state rules,
and nothing in the project uses `!important`.

That rule overrides reference fidelity where the two references disagree
cosmetically. The clearest case is the FAQ: about-us.php ships the same Bootstrap
markup but without the homepage include's `<style>` block, so the raw reference
falls back to Bootstrap's stock look — heavier question, chevron icon, and a
blue-on-lilac (`#052c65` on `#cfe2ff`) open state. That is deliberately NOT
reproduced. `components/Home/FAQ` is the single source of truth for every page
and only its `data` differs. `AtlasSpotlight` is the same story on a smaller
scale: the About reference's caption is `.title-txt-grid2` (weight 400) against
the homepage's `.title-txt-grid` (weight 500), and the shared component keeps the
homepage's.

**`.secondary-btn` is `components/ui/SecondaryButton`.** It was inlined
identically in four homepage sections (`CampusTour`, `ThoughtLeadership`,
`LeadershipTeam`, `FourSchools`) before /about-us added a fifth copy. One
component now serves all of them, using the homepage's already-verified class
string, with two variants that differ only in type size/weight: `atlas`
(12px/700, 38px tall) and `ugdx-med` (16px/600, 44px tall). **It has no hover,
focus or active styling** — neither stylesheet defines a state rule for
`.secondary-btn`, so a hover fade would be an invention.

**The shared tab strip is `components/ui/PillTabs`.** `.tabs-menu-mint.less-space`
is identical on the homepage testimonials and this page's Recognition section, so
`PillTabStrip` (strip only, caller owns state and panel) serves the homepage —
whose panel is a bleeding carousel outside `.container` — and `PillTabs` (strip +
panel) serves Recognition, whose panels sit inside it.

## /campus-atlas — `components/Campus/`, `lib/campusContent.js`

`reference/campus-atlas.php` (`$css = "…690b5d9e3af43c56afb64fef-e5ac6be5b.css"`,
a third distinct sheet) in fourteen sections, in the reference's order: hero,
the three head-top figures, "Study in the Middle of Mumbai's Momentum" (tabs),
"A campus built to learn, live & thrive", "Purpose-Built for Holistic Learning",
"Startup Incubators", "Live Where You Learn" (video + cards + 8-cell mosaic),
"Fueling learning with the right resources", "Studios, Labs, and Classrooms"
(zoom carousel), "Hangout zones", "Food on Campus", "Live where you learn. Grow
where you stay.", "Experience the ATLAS Campus in Person", FAQ.

92 assets, all from `cdn.prod.website-files.com` except the two `green-campus`
videos, which are the reference's own files copied byte-for-byte. Thirteen of the
images are painted only by the stylesheet (`.head-top-card.atlas-bg-*`,
`.css-content-wrapper.atlas-bg-*`, the eight `.cards-inner-camp/.bl-cards-camp
.img-N` cells) so they travel as data and are applied inline.

**Check downloaded bytes, not just the HTTP status.** Three of the CSS-only
backgrounds were requested under filenames read off a stale measurement rather
than off the stylesheet, and S3 answered `200` with a 243-byte
`<Error><Code>AccessDenied</Code>` XML body that a naive scan takes for an image.
Verify magic bytes (`\x89PNG`, `\xff\xd8`) after every download.

**`.sub-heading` differs between the three references.** index.php's sheet zeroes
its vertical padding below 480px; about-us.php's and campus-atlas.php's keep the
20px. Hence `SUB` (homepage) and `SUB_INNER` / `SUB_INNER_MRGBTM` (inner pages)
in `components/Home/SectionHead`. The green section's lead is a different class
again — `.black-desc-text`, 24px/1.5 black, 18px below 768 — not `.sub-heading`.

**Four sections carry the same `id="campus-spaces"`.** Kept on the first only.

**Reference defects on this page, none reproduced (each recorded in its
component):**
- `.swiper.zoom-slider-lg`, `.swiper.common-swiper` and
  `.instagram-wrapper` are all a full viewport tall while their contents are
  400-520px, so the reference leaves 250-450px of dead space under three
  sections and turns the 541-767px hangout gallery into a scrolling window.
- The studios slide is `width: auto` with a `width: 100%` card between 569 and
  767px, so the whole strip measures zero there.
- The banner's "Schedule a visit" opens a NoPaperForms widget; it links to
  `/campusvisit`, the route its twin in the hero already uses.

**An inline style beats a stylesheet rule — check which of a pair survives.**
`header.php` gives `.zoom-slider-lg .swiper-slide-prev { margin-right: -100px }`
and `.swiper-slide-next { margin-left: -100px }`, but Swiper writes
`margin-right: 24px` inline for `spaceBetween`, so only the *next* card's pull
ever applies. Reproducing both would have doubled the gap on one side.

**Two shared components were extracted, and one shared component was broken.**
`components/ui/PrimaryButton` is `.btn-primary` (homepage hero + "Your Future
Begins Here." + this page's hero and banner); `components/ui/ContentCardB` is
`.card-content-b` (About's "Shaping a Viksit Bharat" + three sections here). And
`components/Carousel/Carousel` declared `trackRef` but never attached it, so
`measure()` returned early on every instance: no bullets below 568px, no
autoplay, no scroll-snap grid — on the homepage too. Attaching the ref restored
all three everywhere.

**`.card-content-b` keeps `min-height: 480px` at every width** — it was being
cancelled at 767 in the first port of it.

## /life-at-atlas — `components/Life/`, `lib/lifeContent.js`

`reference/life-at-atlas.php` (`$css = "…690b5e72fe2165e6fc022c61-78245c0e5.css"`,
a fourth distinct sheet; `$body = "body-isme"`, which measures the same as the
other pages) in nineteen sections: hero, The 7 wonders of ATLAS, Vibes that go
viral, Intercollegiate events, Win on and off the field, Student Council, The
council members, Events organized by the Student Council, Beyond campus within
reach, Your Growth is Our Mission, Wellness is success, YourDOST, Your Support
System, Service learning and SSR, Live Where You Learn, Student favourites,
Embracing every identity, Ready to live the ATLAS life?, FAQ.

**This page fatals the same way about-us.php does.** Line 1078 is
`<!--<?php include "assets/include/faq.php" ?>-->`; PHP runs it anyway and it
dies on a missing database handle, taking the FAQ, the footer, Bootstrap and the
Swiper initialiser with it — so **none of the reference's own sliders start**.
Everything above line 1078 still renders, so the fix for measuring is to load the
page in Playwright, inject `swiper-bundle`, and re-run footer.php's initialisers
and the page's own trailing `<script>` verbatim
(`scratchpad/life_probe.py` does exactly this). Do not try to read slider
geometry off the raw page.

**Reuse, and what it cost.** Four things were extracted so this page could share
them rather than copy them, and /campus-atlas was re-verified after each:
`components/ui/ZoomSliderLg` (the 0.6/0.65/1 scale carousel, 3 instances),
`components/ui/PortCardH` (`.port-card-h-wrap.atlas`, 3 instances),
`components/ui/SupportCard` (moved out of `components/Campus/`, 4 instances) and
`components/ui/ButtonRegular` (`.button-regular`, the third button shape after
`.btn-primary` and `.secondary-btn`). `components/Campus/LiveWhereYouLearn` now
takes `data` + `id`: /life-at-atlas repeats that section verbatim, same images
included, and only the YouTube id differs.

**A `:where()` variant loses to the plain rule that follows it.** The community
cards are `border-radius: 16px`, not the `32px 0` their Webflow variant asks
for: `.motion-card.swiper-slide.width-motion:where(.w-variant-…)` and
`.motion-card.swiper-slide.width-motion` have the same specificity — `:where()`
contributes nothing — so source order decides and the later plain rule wins.
Measure the element; do not read the variant and assume.

**A card inside a slide is not the slide.** `.port-card-b.swiper-slide.width-motion`
shrinks to 305x430 below 768px, but the fest cards are `.port-card-b` *inside* a
`.swiper-slide`, so that rule never matches them and they stay 340x480 at every
width. The community cards, which really are the slide, do shrink.

**The `.zoom-slider` ladder turns at 568, not 767.** `header.php` scales
`.zoom-slider` slides 0.8 / 0.88 / 1 from `@media (min-width: 568px)` — hence the
`mcm` screen added to `tailwind.config.js`, the min-width twin of `max-mcm`.
Above 767px its `spaceBetween` is 0, so Swiper writes no inline margin and both
±20px neighbour pulls apply; at and below 767 it writes `margin-right: 16px`,
which beats the stylesheet's 20px on `-prev` and leaves only the `-next` pull.

**Four hero columns, no Swiper needed.** The vertical photo columns are
`direction: 'vertical', autoplay {delay: 0}, speed: 4000, allowTouchMove: false`
over a `linear` wrapper — the same constant-velocity marquee as the awards and
impact bands, so they are the same CSS animation (`marquee-y`, one authored set
of four photographs in 16s). The middle two columns are `display: none` below
768px.

**Two more inline scripts that do nothing.** `.code-button` sets
`fontSize = getAttribute('data-font-size') + 'px'` from an empty attribute (so
the invalid string `"px"`), and the welfare cards' `data-slider-card-a-bg` is
read by a script that targets `.slider-card-a`, a class none of them carries.
Neither is ported, and the welfare background image is not downloaded.

**Reference defects not reproduced:** the `.common-swiper-full`,
`.zoom-slider-lg` and `.tr-cont-wrapper` boxes are a full viewport tall around
360-480px content, and `.square-card-atlas` is `width: 100%` inside a
`width: auto` slide between 569 and 767px, which blows the card out to a whole
viewport and overflows the page — the same upstream bug the homepage
testimonials already carry a fix for.
