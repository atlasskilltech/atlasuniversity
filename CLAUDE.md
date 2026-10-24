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
  `.instagram-wrapper` all measure a full viewport tall in the local mirror
  while their contents are 400-520px. **That is a quirks-mode artefact, not a
  reference behaviour** — see the /advantages/atlas-industry-centric-approach
  section below. Not reproducing it was right; the reason recorded here was
  wrong.
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
`.zoom-slider-lg` and `.tr-cont-wrapper` boxes measure a full viewport tall
around 360-480px content **in the local mirror only** — the same quirks-mode
artefact described below — and `.square-card-atlas` is `width: 100%` inside a
`width: auto` slide between 569 and 767px, which blows the card out to a whole
viewport and overflows the page — the same upstream bug the homepage
testimonials already carry a fix for.

## /success-stories-atlas — `components/Success/`, `lib/successContent.js`

`reference/success-stories-atlas.php` (`$css =
"…690f183b48c1348d36a35eda-0d692a94e.css"`, a fourth distinct sheet) in sixteen
sections, in the reference's order: hero, the three head-top figures, "Beliefs
that power our success", "Startups", "Startups founded by ATLAS ISME Alumni",
"Placements", "Students at work", "Our Recruitment Partners", "Industry
Testimonials", "Our Career Support Services", "Master's Progressions", "Our
Global Partnerships", "Patents & Copyrights", "Research Papers", "Awards &
Recognitions", FAQ.

235 assets, 223 downloaded from `cdn.prod.website-files.com` into
`public/assets/images/success/<section>/` and 12 already local from Home /
Campus / Life. Six are painted only by the stylesheet (the three stat vectors,
`startup-bg.png`, and the two `.css-content-wrapper.atlas-bg-*` washes) so they
travel as data.

**Three components were extracted, one was generalised.**
`components/ui/GridGallery` is `.grid-gallery` (three sections here),
`components/ui/LogoGrid` is `.logos-grid` (both tab sets), and
`components/ui/PillTabs` gained a `spacing` prop — this page uses the plain
`.tabs-menu-mint` (gap 48 / bleed -73 / padding 70), not the `.less-space`
every earlier page uses, so `spacing="wide"` selects it and `less` stays the
default. `components/Campus/CampusStats` became `components/ui/StatBand`, taking
its cards as data: the band appears twice on this page and once on
/campus-atlas, identical in every measured property except the label colour.

**`place-items: start` is not inert on a block box.** `.grid-gallery` is
`display: block; column-count: 4` and also declares `place-items: start`.
Chrome applies `justify-items` in block layout, so every card becomes
**fit-content** rather than filling its column — the first card is 292px wide
inside a 299px column because that is its photograph's natural width, and the
awards cards come out 251-299px each. Without it every card fills the column,
7px wider, with the caption plate shifted to match.

**`<img height="80">` is real, and Preflight cancels it.** Seven logos in the
two tab sets carry a numeric HTML `height` attribute while their width is left
to `max-width: 100%`, which stretches them out of aspect and changes the grid's
row heights (Nottingham's 146x52 mark renders 102x90). Tailwind's Preflight
declares `img { height: auto }`, which beats a presentational hint, so the
authored height has to be restated as an inline style. **Transcribe `width` /
`height` attributes on every image** — `width="Auto"` / `height="Auto"` also
appear on this page, are invalid, and are correctly ignored.

**The logo strip is a Webflow interaction, not a Swiper.** `.slide-wrap` is
driven by IX2 action list `a-22` ("marquee-swiper"), fired on this page's
`PAGE_START`: `TRANSFORM_MOVE x -2184px over 30000ms` with empty easing, then
`x 0 over 0ms` — a 30s linear travel that snaps back and repeats. It is the
`slide-wrap` keyframe in `tailwind.config.js`. Read interactions out of
`Webflow.require('ix2').store.getState().ixData` when an element moves and
nothing in footer.php explains it. **The same `a-22` targets `.slide-wrap` on
/about-us**, where the port left it static because that reference fatals before
webflow.js loads — worth revisiting.

**The local reference renders in quirks mode.**
`assets/include/dynamic.php` emits a PHP warning about a missing
`connection.php` *before* `<!DOCTYPE html>`, so `document.compatMode` is
`BackCompat`. Chrome then drops the line-box strut on lines with no directly
contained text: `.patent-holder` (24px/32, containing only a `<strong>` at
18px/27 and a `<br>`) lays out at a 27px pitch there and 32px in standards mode,
from identical computed styles and identical font metrics. Standards mode is
what the live site renders, so this port keeps 32. Check `document.compatMode`
before treating an unexplainable line-height as a design property.

**Reference defects on this page, none reproduced (each recorded in its
component):**
- Every `.swiper-slide` measures a full viewport tall while the cards are
  388-622px. **Quirks-mode artefact, not a reference behaviour** — see the
  /advantages/atlas-industry-centric-approach section below.
- `.testimonial-card` is `width: 100%` inside a `slidesPerView: 'auto'` slide,
  so between 568 and 767px it measures 1127px at a 700px viewport — the same
  blow-up the homepage testimonials carry a fix for. Below 568px the reference
  is correct again, and the container width is used throughout here.
- `id="our-beliefs"` is authored on two consecutive sections; kept on the first.
- The page has three `<h1>`s (hero, "Beliefs…", "Startups"); only the hero
  keeps it. No stylesheet rule keys off the tag.

## /advantages/atlas-advantages — `components/Advantages/`, `lib/advantagesContent.js`

`reference/advantages/atlas-advantages.php` (`$css =
"…690c43333ef0c9612dced003-396789c14.css"`, a fifth distinct sheet) in fifteen
blocks plus the FAQ, in the reference's order: hero, the three head-top figures,
"ATLAS's Core Advantages", "Be in the Middle of Mumbai", "A Place to Learn,
Grow, Create, and Belong", "Learn Across Disciplines", "ATLAS Electives",
"Supporting You Every Step of the Way", "YourDOST", "Your Support System",
"Learning Without Borders", "Strongly Industry Oriented", "Entrepreneurship at
ATLAS", "The 4 Year Journey to Success", "A Culture of Inquiry and Innovation",
FAQ. This is the first of the seven Advantages pages.

156 assets: 84 downloaded into `public/assets/images/advantages/<section>/` and
72 already local from Home / About / Campus / Life / Success — the whole
eight-cell campus mosaic and both `.css-content-wrapper` washes among them.

**This page fatals the same way about-us.php and life-at-atlas.php do.** Line
1063 is `<!--<?php include "assets/include/faq.php" ?>-->`; PHP runs it anyway
and it dies on a missing database handle, so footer.php never loads — no Swiper
JS, no Bootstrap, no webflow.js — and the reference's own carousels, tabs and
accordion do not work. Swiper's *CSS* is in header.php, so slide widths are
still right; only the interactions are missing. Measure it by adding Webflow's
own `w--tab-active` to every `.w-tab-pane`, which is exactly what its widget
does on click.

**Read CSS-painted backgrounds off the live page, not out of the sheet.** The
sheet is shared by every Webflow page, so "all these classes appear somewhere in
this page's markup" pulls in files this page never paints, and a static read
cannot tell whether `.cards-inner-camp.img-2` or its `.atlas` override wins.
Enumerating every element's computed `background-image` gave exactly 16. Two of
them were nearly missed because the naive `url\(([^)]+)\)` regex truncates at
the literal `)` inside `Vector (2).png` — match the quoted form first.

**Three components were extracted, each now used on two pages.** All were
measured on both references before being shared, and each origin page was
re-verified afterwards:
`components/ui/PhotoMosaic` (the eight-cell mosaic, ← `Campus/LiveWhereYouLearn`),
`components/ui/TertiaryTabs` (the underlined tab widget, ← `Life/WellnessTabs`)
and `components/ui/CareerSupportCard` (`.career-sup-card.ugdx`, ←
`Success/CareerSupport`). `Life/YourDost` became `data`-driven the way
`LiveWhereYouLearn` already was — this page repeats it with byte-identical copy
and a different photograph. Extracting the mosaic also surfaced a pre-existing
gap: `.bl-cards-camp.img-5` is the one cell the reference leaves at
`align-items: stretch`, which /campus-atlas and /life-at-atlas had been
rendering as `flex-start`.

**A compound selector beats a media query.** Media queries add no specificity,
so `.card-title-big.size-big { font-size: 54px }` (0,2,0) survives every
`@media … .card-title-big { font-size: 34px }` (0,1,0) — the "4 Year Journey"
cards stay 54px at 360px wide, while the *weight* still shifts to 600 because
that property is not in the compound rule. Same for
`.card-title.atlas-bold { font-weight: 500 }`. And the reverse trap: the
electives card goes full width below 768 via
`.slider-card-e-ugdx, .card-type-el-ugdx { width: 100% }`, invisible to a grep
anchored on the class.

**`<h2 class="sub-heading">` is not the same as `<div class="sub-heading">`.**
Webflow's base sheet gives every `h2` `margin: 20px 0 10px`, so the five leads
this page marks up as `<h2>` sit 20px lower than the six marked up as `<div>`.
Hence `SUB_H2`, `SUB_H2_MRGBTM` and `SUB_H2_MRGBTM32` in `components/Home/
SectionHead` — still rendered as `<div>`s, with the margins restated.

**A bare `1fr` is `minmax(auto, 1fr)`.** `.belief-cards-common` declares
`2fr minmax(200px, 1fr)`; with a plain `1fr` the second column's min-content
floor pins it at ~294px and the 2:1 split breaks below 1100px. Transcribe the
`minmax`.

**An inline style beats a class even at a breakpoint — including for custom
properties.** A cell whose `background-position` moves at 768 cannot set the
position inline at all: the property has to come from a class reading a custom
property (`bg-[position:var(--cell-pos)]`), with only the value inline, so the
breakpoint's own class can override it. Overriding the *variable* inline does
not work, because the inline declaration of the variable wins too.

**Poppins now has two self-hosted weights.** `.cr-title.isdi` asks for Poppins
600; the reference loads 300/500/700/900 and no 600, and a target above 500
searches heavier first, so it renders the **700** face — verified by probe (700
is the only Poppins face this page downloads, and a 600 measurement is identical
to a 700 one). The computed weight stays 600, so the class is `font-semibold`.

**Reference defects and dead code, none reproduced (each recorded in its
component):**
- `.btn-wraper.hide` wraps an "Explore Center of Research" button that
  `display: none` hides and whose href is `#`.
- Both `<style>` blocks driving the core-card hover are embedded twice,
  identically.
- The NoPaperForms popup binds to `[data-id="campus-visit"]`, which matches
  nothing here — the anchor carries `id=`, not `data-id=` — so "Schedule a
  Visit" is the plain link it behaves as.
- `.inside-cards-common` is `grid-template-columns: 51% 50%` below 768px, so its
  single spanning child overflows its parent by 3px.
- `.cards-inner-camp.img-1` gains a 10px flex gap below 768px and has one child.

## /advantages/atlas-career-services — `components/CareerServices/`, `lib/careerServicesContent.js`

`reference/advantages/atlas-career-services.php` (`$css =
"…690d884fb9da8e8bc8bd3740-94cfd2cda.css"`, a sixth distinct sheet;
`$body = "body body-ugdx"`) in eleven blocks plus the FAQ, in the reference's
order: hero, the three head-top figures, "Brands That Back Our Students",
"Industry Testimonials", "Career Connect", "Pre-Placement Talks", "Student
Testimonials", "Our Career Support Services", "Our Students at Work", "Office of
Career Services & Corporate Relations Team", "Collaborate with us", FAQ. Second
of the seven Advantages pages.

116 assets: 56 downloaded into `public/assets/images/career-services/<section>/`
and 60 already local — including all 41 recruiter logos, which are the same set
/success-stories' "Our Recruitment Partners" uses. Only 6 backgrounds are
CSS-painted, all of them already local.

**This reference actually works.** It has no commented-out `faq.php` include, so
footer.php loads and Swiper, Bootstrap and the Webflow tab widget all run. Every
slider, tab set and the accordion could be measured live — the first Advantages
page where that was possible. Its FAQ include also lives one level deeper than
the others: `assets/include/faq/atlas/advantages/…`, not `faq/atlas/…`.

**This page is almost entirely reuse.** Nine existing components carried it, and
three more were extracted for it — each measured on both pages first and each
origin page re-verified after:
`components/ui/InnerPageHero` (← `Advantages/AdvantagesHero`; the button row is
now optional, because this hero has none),
`components/ui/TestimonialCard` (← `Success/IndustryTestimonials`; used twice
here) and
`components/ui/InfoBanner` (← `Life/LifeBanner` + `Campus/CampusVisitBanner`,
which are now three-line wrappers; it gained the optional
`.info-banner-sub-contact` line only this page has).
Only two card shapes are this page's own: `.card-type-f` and its variant of
`.slider-card-e-ugdx`.

**An empty element is still a box — twice on this page.** `.stname.isdi` is
empty on all fourteen testimonial cards across the two pages that use them, but
it carries `padding-bottom: 5px`, and the card is content-sized between 480 and
767px, so omitting it made the card 5px short. Every `.slide-cd-e-desc` in
Pre-Placement Talks is likewise empty with a 10px top padding. Render the empty
element; the same lesson as `GridGallery`'s empty caption.

**`flex: 1` beats a declared height until something turns it off.**
`.student-text` is `height: 280px` at ≤767 *and* `flex: 1`, so between 480 and
767 it shrinks below 280 to its content; `@media (max-width: 479px)` then sets
`flex: none` and the 280 finally stands. Reproduced with `max-sm:flex-none`.

**Another compound-beats-media pair.** `.h2-tag.mrg24 { margin-bottom: 24px }`
(0,2,0) survives `@media … .h2-tag { margin-bottom: 32px }` (0,1,0), so Career
Connect's heading keeps 24px at every width. Third instance of this trap;
always check whether a modifier is a compound selector before adding a
`max-md:` override.

**A transformed element cannot be diffed by its bounding box.** Cards inside
`ZoomSlider` / `ZoomSliderLg` are scaled 0.6–1 depending on which slide is
current, and both carousels loop, so `getBoundingClientRect()` is unstable
between runs. Measure `offsetWidth` / `offsetHeight`, which ignore the
transform. That is also why `.card-type-f` measures 218x264 at rest despite
being declared 272x330.

**Reference notes, none reproduced:**
- `.card-type-f.swiper-slide { width: 282px }` never applies — the card sits
  *inside* a `.swiper-slide` rather than being one, so it keeps its 272px.
- At exactly 700px both `.testimonial-card` and `.slider-card-e-ugdx` are
  `width: 100%` inside an auto-width slide and overflow their container (1127px
  and 662px against 656px), clipped by `.section { overflow: hidden }`. The
  container width is used instead, which is what the reference renders at every
  other width.
- The "Collaborate with us" button's href is `#`; transcribed as authored.

## /advantages/atlas-enterprenurship — `components/Entrepreneurship/`, `lib/entrepreneurshipContent.js`

`reference/advantages/atlas-enterprenurship.php` (`$css =
"…690db8b324edd9df63e701e2-e3c34cc43.css"`, a seventh distinct sheet) in ten
blocks plus the FAQ: hero, two head-top figures, "More Than a Degree", "Our
Teaching Pedagogy: The 3H Approach", "The 4 Year Journey to Success", "Learning
Through Entrepreneurial Action", "8 Steps of IPR Enablement Flow", "All the
backing you need", "From Campus to Company", "Your Future Begins Here.", FAQ.
Third of the seven Advantages pages. **The reference misspells
"entrepreneurship" in the filename**, so the route does too — the site's own
navigation links there.

63 assets: 50 downloaded, 13 already local. Only four are CSS-painted, all of
them already local. Like /advantages/atlas-career-services this reference has no
fatal error, so its carousels and accordion were measured live. It loads a newer
webflow bundle (`webflow.ee913841…`) than the other pages; nothing depends on
the difference, since it uses no IX2 interaction.

**Not one card shape on this page is new.** Four more components were extracted
to make that true, each measured on both pages first and each origin
re-verified: `components/ui/PortCardM` (← `Home/IndustryOnCampus`; the two
carousels here are the same card without its logo strip, so the strip is now
conditional), `components/ui/ChipSlideCard` (← `Campus/StudiosLabs`),
`components/ui/PhotoColumns` (← `Campus/CampusOverview`) and a `buttonWrap`
variant on `components/ui/InnerPageHero`. `Advantages/FourYearJourney` became
`data`-driven — this page repeats that section verbatim.

**`.button-wrap` is not `.buttons-wrapper`.** The hero button sits in
`.button-wrap` here — column at every width, gap 16, `margin-top: 32` — where
/advantages/atlas-advantages uses `.buttons-wrapper` — row, gap 16 (8 at ≤991),
`padding-top: 30`, turning column at ≤767. Two genuinely different boxes that
look alike with a single button; hence the variant rather than a shared class.

**Preflight's `strong { font-weight: bolder }` is *relative*.** Webflow's
normalize declares a flat `bold` (700); Tailwind's declares `bolder`, which the
spec resolves against the parent: 400→700, 500→700, but **600→900 and
700→900**. So any `<strong>` inside a parent heavier than 500 renders a weight
the reference never had. Seven chips on this page sit in a 600 parent, and — the
reason this matters beyond one page — a site-wide audit of every `<strong>` on
all eight routes found the same bug pre-existing in `Home/AtlasSpotlight`, whose
award names sit in a 700 parent and were rendering at 900 on the homepage and
/about-us. Both now carry an explicit `font-bold`. **When porting a `<strong>`,
check the parent's weight.**

**A transformed element cannot be diffed by its bounding box** — the same trap
/advantages/atlas-career-services hit. Chips inside `ZoomSliderLg` are scaled
0.6–1 by which slide is current, and the carousel loops, so
`getBoundingClientRect()` is unstable between runs. `offsetWidth` /
`offsetHeight` ignore the transform and are what should match.

**A `<strong>`-wrapped label is data, not styling.** Seven of this page's eleven
chips wrap their text in `<strong>` and four do not, and all six on
/campus-atlas do not — so the flag travels with the slide rather than being
baked into the card.

**Reference notes:**
- "From Campus to Company - Student Startup Founders" is printed twice, as both
  the heading and its own lead. Transcribed as authored.
- Two of the six "All the backing you need" captions are empty, painting only
  the scrim over those photographs.
- A `.top-cards-wrapper` appears mid-section inside "The 3H Approach" — the only
  place on the site where that band is not directly under a hero. It is the same
  `StatBand` and breaks out of `.container` the same way.

## /advantages/atlas-industry-centric-approach — `components/Industry/`, `lib/industryContent.js`

`reference/advantages/atlas-industry-centric-approach.php` (`$css =
"…690c70a02322c69cf63510da-73be19199.css"`, a seventh distinct sheet; `$body =
"body body-ugdx"`) in sixteen sections: hero, three figures, Steering
Excellence / Guiding ATLAS, Our Recruitment Partners, Industry Expert-Led
Masterclasses, Industry Projects & Capstones, Industry Visits, Bootcamp,
Industry Mentorship Program, Industry Led Events on Campus, Leadership Series,
Future Skills, Student Success Stories, Students at Work, Industry Testimonials,
FAQ.

**This reference renders end to end** — nothing fatals before its footer, so
webflow.js, Swiper and Bootstrap are all live and every interaction was measured
directly rather than re-injected.

189 assets, 114 downloaded into `public/assets/images/industry/<section>/` and
75 already local from the homepage, /about-us, /campus-atlas and
/success-stories-atlas. Two are painted only by the stylesheet
(`.head-top-card.atlas-bg-1/-3`) and are byte-identical to /campus-atlas's, so
they travel as data on `stats[]`.

**THE LOCAL REFERENCE RENDERS IN QUIRKS MODE, AND THAT CHANGES LAYOUT — NOT JUST
LINE HEIGHT.** `assets/include/dynamic.php` emits a PHP warning about a missing
`connection.php` *before* `<!DOCTYPE html>`, so `document.compatMode` is
`BackCompat` on **every** page of the mirror. Quirks mode resolves a percentage
height against an auto-height ancestor instead of falling back to `auto`, so
every `height: 100%` in the reference inflates to the viewport. Measured both
ways and checked against the live site:

| element | local (quirks) | standards **and production** |
| --- | --- | --- |
| `.swiper.common-swiper` | 1000px | 350px |
| `.swiper.common-swiper-full` | 1000px | 440px |
| `.swiper.zoom-slider-lg` | 1000px | 478px |
| `.about-image-atlas` | 1242x1000 | 1242x828 (its own 3:2) |
| `.cd-tyd-image` (advisor photo) | 272x350 | 272x**335** in a 272x350 card |

So the **"the `.swiper` box is a full viewport tall" defect recorded against
/campus-atlas, /life-at-atlas and /success-stories-atlas is not a defect at
all** — it is this quirks-mode artifact. Those ports never reproduced it, so
they are right; the *explanation* in their component headers is wrong.

Measure the reference in standards mode: fetch the PHP output, drop everything
before `<!doctype`, inject `<base href>`, and `page.set_content()` it. That
reconstruction matches `https://atlasuniversity.edu.in/...` box for box
(`scratchpad/in_std.py`, `in_live.py` verify exactly this). `in_measure.py`,
`in_diff.py`, `in_shots.py` and `in_shared_check.py` all load the reference that
way now.

**The advisor photo really is 15px short of its card.** `.cd-tyd-image` is
`width: 100%; height: 100%`, and the card's height comes from
`min-height`/`max-height`, not `height` — so in standards mode the percentage
resolves to `auto` and the portrait keeps its natural ratio under the gradient.
Verified 272x335 / 272x336 on the live homepage, /about-us and this page.
`components/ui/AdvisorCard` was rendering `h-full`; it now renders `h-auto`,
which is a **fix to two already-finished pages**, made because the original
measurement was taken through the quirks-mode artifact above.

**Four card shapes were extracted, and each was re-verified on its origin page**
(`components/ui/`):
- `CardTypeF` — `.card-type-f`, from /advantages/atlas-career-services "Career
  Connect". 55 instances here across six carousels and three tab panes.
- `SpeakerSlideCard` — `.slider-card-e-ugdx > .slider-card-e-cont`, from that
  page's "Pre-Placement Talks"; this page adds `img.comp-image`, the employer
  logo pinned top-right.
- `PlacementCard` — `.placement-card-atlas`, from /success-stories-atlas
  "Placements". Two declarations differ: the card is painted `#41418e` here and
  the logo is 20% wide rather than 30%.
- `TertiaryTabStrip` — split out of `TertiaryTabs` so this page's year tabs can
  carry bleeding carousels instead of a photo panel, the same split
  `PillTabStrip` / `PillTabs` already makes.

`components/Industry/PartnerCardSection` is deliberately **local**: it is six
repeats of one section *on this page* and nothing else on the site has that
shape.

**A width that differs between two pages must travel as a custom property, not
an inline `width`.** `PlacementCard`'s logo is 20% here and 30% on
/success-stories; an inline `style={{width}}` would beat the `<=767` rule that
clamps it to 70px. It is `style={{'--p-logo-w': …}}` + `w-[var(--p-logo-w)]
max-md:w-full max-md:max-w-[70px]` — the property stays in a class, only the
value is inline. Nothing in the project uses `!important`.

**`place-items: start` has a second half.** `.grid-gallery` is a block
multi-column above 540px, where only `justify-items` does anything — but at
`<=540px` it becomes a flex row, and there `align-items: start` keeps each card
at its natural height against the default stretch. `GridGallery` now uses
`place-items-start`, which is exactly what the stylesheet declares.

**An `<a>` with no `<img>` in it is a 0x0 box.** Three of the six advisors
author `a.play-icon` with nothing inside; `.play-icon` is absolutely positioned
with no size, so it paints nothing and cannot be clicked — even on the one that
still carries a `data-video`. The icon therefore travels per person
(`person.playIcon`) rather than once per section, and the button renders only
where the reference authors its image. **Read an icon out of the anchor that
owns it**, not out of "the next `<img>` in the card" — that regex silently
picked up the company logo.

**Dedupe by bytes, and prove it.** The asset downloader recorded
`68e3b788…_mondelez.png` (3468 bytes, the Industry Projects card's logo) as a
reuse of `success/recruiters/mondelez.png` (7728 bytes, a different mark with
the same basename), so the section shipped the wrong image. Every deduped entry
on this page and on all six earlier manifests was then re-fetched and compared
byte for byte (`scratchpad/in_dedupe_audit.py`): 1 mismatch here, 0 anywhere
else. Run that audit after every download.

**A property the reference declares on a box whose `display` makes it inert is
not a diff.** `.student-text` carries `flex-flow: column; justify-content:
center; align-items: flex-start` next to `display: block`; `.grid-gallery`
carries `grid-template-columns` on a block box; `.w-inline-block` carries
`vertical-align: top` on flex items. The diff harness suppresses each by testing
the reference's own computed `display` rather than by naming the element.

**Reference defects on this page, none reproduced (each recorded in its
component):**
- `.testimonial-card` is `width: 100%` inside a `slidesPerView: 'auto'` slide,
  so between 568 and 767px it measures 1127px at a 700px viewport and the page
  really does scroll horizontally (`scrollWidth` 569 at 360-568px). The shared
  `TestimonialCard` already carries the container-width fix; this port has zero
  horizontal overflow at all twelve widths.
- `.slider-card-e-ugdx` goes `width: 100%` at 767px while its slide only does at
  568px, so the reference's masterclass card measures 6px wider than its slider
  between the two — `ZoomSliderLg`'s existing fix.
- Swiper's translate in `.zoom-slider-lg` is measured before the `-100px`
  neighbour margin, so the reference's current card sits ~120px left of where it
  is authored. The port places it at its authored inset.

## /advantages/atlas-internationalisation — `components/International/`, `lib/internationalisationContent.js`

`reference/advantages/atlas-internationalisation.php` (`$css =
"…690c95c2ccf14f412c38ce03-20206b81f.css"`, an eighth distinct sheet; `$body =
"body body-ugdx"`) in ten sections: hero, six figures, "Think International.
Learn International.", "With ATLAS, the world is within your reach", "Our Global
Partnerships", "World-Class Learning. Right Here. Right Now.", "Voices Around
the World", "Our Student Experiences", "Office of International Affairs", FAQ.

**This reference renders end to end** — its FAQ include is a live `include`, not
a commented-out one — so webflow.js, Swiper and Bootstrap all run and every
interaction was measured directly.

**Most of this page's design is in its own inline `<style>`, not in `$css`.**
300 lines of it, ahead of the markup, and it redefines `.square-card`,
`.sq-content`, `.sq-title`, `.sm-text-isme`, `.large-text`, `.head-top-card`,
`.grid-img-wrap`, `.testimonial-card`, `.circular-button-prev`, the video
play/pause button and the two circular slider arrows. Reading only the sheet
named by `$css` gets six of the nine sections wrong. **Read the page's own
`<style>` block before measuring anything.**

**Five blocks are commented out, line by line.** A span-based comment scan finds
nothing here, because the reference wraps *each line* in its own `<!-- -->`:
the "Explore More" button (15 lines), the eight-card `.grid-gallery-flex` wall
under the video embed (22), the text half of every "Voices" card (11), the
"Our Student Experiences" lead (1) and a fourth `.card-type-e` (8). Blank every
line whose trimmed form starts with `<!--` and work from that copy, or you will
port dead markup and download assets nothing renders.

**The PHP warning is emitted TWICE, and the second copy fakes an overflow.**
`assets/include/dynamic.php` is included twice: once before `<!DOCTYPE html>`
(which is what puts the whole mirror in quirks mode) and once again in the
footer, *after* the doctype, where it lays out as a ~380px block of text. That
second copy — not the page — is why the local reference reports `scrollWidth`
569 at every width below 568. Strip
`<br><b>Warning</b>…<br>` as well as the pre-doctype prologue before measuring.

**Two hosts, and one of them is the site itself.** 141 assets: 125 from
`atlasuniversity.edu.in` (the world map, the Think International photographs and
all 31 testimonial videos with their posters) and 16 from the Webflow CDN. 135
downloaded, 6 reused. **`src="HTTPS://…"` appears twice** — a lowercase
`startswith("http")` in the manifest builder dropped both silently. Match the
scheme case-insensitively, and scan `poster`, `data-poster-url` and
`data-video-urls` as well as `src`/`srcset`.

**The video testimonials are 320MB.** 31 files, `.mp4` and `.webm` for each of
the 17 posts, downloaded byte-for-byte as the asset rule requires — but they
take `public/` from 236MB to 556MB. Worth moving to a blob store or re-encoding
before this deploys; that is a hosting decision, not a port decision.

**One carousel in the whole rebuild is not a sibling of `.container`.** "Office
of International Affairs" nests its `.swiper.common-swiper` inside the
`.tt-wrap`, under the heading and the lead, so it does not bleed — and the
`.tt-wrap` is *sized by it*: 798px above 768, held there by `min-width: auto`
even when the container is narrower. `Carousel` gained `bleed={false}` for it,
which drops the container inset and replaces it with the 24px Swiper writes as
`margin-right` on **every** slide including the last. That trailing 24px is
invisible where the track bleeds and is 24px of measured width here (798 = 3 x
242 + 3 x 24).

**`.swiper-button-prev/-next` are measured against `.swiper`, not the viewport.**
`left: 6px` puts them 6px inside the *container's content box*, so the arrow
inset is `calc((100% - min(100%,1366px))/2 + 68px)` and its 36/28 twins below
992/768 — the container inset plus 6. Positioning them at the viewport edge is
~100px out at 1440. Their glyph is Swiper's `::after { content: 'prev' }` in the
bundled `swiper-icons` font, which this project does not load, so `CarouselArrow`
draws the same chevron as an inline SVG at the declared 18px/700.

**Autoplay is off on this page.** A trailing `<script>` stops every
`.common-swiper` and `.common-swiper-full` one second after load and re-wires
the two arrow pairs by hand — hence `Carousel`'s new `autoplay` prop, passed
through `PeopleCarousel` as well.

**The stat band inverts its two slots.** `.sm-text-isme` holds the *figure* at
36px and `.large-text` holds the caption at 20px, centred — the reverse of every
other page, where the caption is 24px and the figure 32px. `StatBand` keeps its
slots as `label` then `value` and takes a `variant`; only the type scale and the
alignment move.

**Reference defect, not reproduced:** at exactly 768px the six-card band
overflows the viewport by 63px — the cards are `flex: 1 1 0` but `min-width:
auto` floors each at its longest word, and 6 x 141 does not fit 768. `min-w-0`
lets the declared flex shrink; every other width is unchanged, and the four
pages that share `StatBand` measure identical.

**`.square-card` is not the homepage's `.square-card`.** The homepage renders
`.square-card.atlas` — 612px, radius `32px 0`, a 40px title, no link. Here the
inline `<style>` redefines the bare class: `width: 100%` (so the slide takes the
photograph's own 611px intrinsic width), no radius, a 22px title, and a mint
`.circular-button-prev` linking to a partnership page. Same class name, different
card; the section keeps its own.

**An `<a>` inside an `<a>` is two siblings.** Each square card nests the arrow
anchor inside another anchor with the same href; the parser closes the outer one
at the inner tag, so the reference renders an empty anchor followed by the real
button. Only the button is ported — and its `id="prevBtn"` is repeated on all
six cards.

## /advantages/atlas-internationalisation-2 — SKIPPED

`reference/advantages/atlas-internationalisation-2.php` is a backup copy of
`atlas-internationalisation.php`, confirmed by the user as not wanted. No route,
no assets, no content file. Do not port it.

## /advantages/atlas-multidisciplinary — `components/Multidisciplinary/`, `lib/multidisciplinaryContent.js`

`reference/advantages/atlas-multidisciplinary.php` (`$css =
"…690da3f19d4bbf0f28096449-f8f617445.css"`, a ninth distinct sheet; `$body =
"body body-ugdx"`) in eight sections: hero, three figures, "The ATLAS Advantage:
Redefining Education for a New Era", "ATLAS Electives: Design Your Own Learning
Journey", "Collaborate. Co-Create. Cross Boundaries", "Collaborative Spaces",
"One University. Infinite Possibilities.", FAQ.

**This page fatals the same way about-us.php, life-at-atlas.php and
atlas-advantages.php do.** Line 439 is
`<!--<?php include "assets/include/faq.php" ?>-->`; PHP runs it anyway and it
dies on a missing database handle, so **its own FAQ include (line 444) never
runs either** and footer.php never loads. Measuring it means restoring the
doctype, stripping *both* copies of the PHP warning, injecting swiper-bundle and
re-running footer.php's initialisers verbatim (`scratchpad/mu_measure.py`). The
FAQ is transcribed from `assets/include/faq/atlas/atlas-multidisciplinary.php` —
note the path is one level shallower than the other Advantages pages, which use
`faq/atlas/advantages/…`.

**Not one card shape on this page is new.** 61 assets, all from the Webflow CDN,
and only **10** are new: every elective photograph was already downloaded for
/advantages/atlas-advantages and the closing banner's image for
/advantages/atlas-career-services. Every one of the 51 reuses was proven
byte-identical by SHA-1.

Only two sections are local, and both are shapes nothing else on the site has:
`AtlasAdvantage` (a plain `.head-wrap` over three `CareerSupportCard`s) and
`Collaborate` (two titled `.common-wrapper` embeds stacked, where
`Advantages/VideoSection` is one embed with a button).

**`.cr-title.atlas` is the `manrope` variant that already exists.** It is the
base `.cr-title` — Manrope 32/500, 24px below 768 — recoloured white, which is
exactly what `.cr-title.white` renders on /success-stories-atlas. No new variant.

**`Advantages/Electives` became `data`-driven, and that surfaced two bugs.**
This page repeats the section with the same five tab labels and a different card
set — 8 per tab against /advantages/atlas-advantages' 8/8/8/4/4:

- **Three cards in one tab share a title.** "Graphic Design" appears three times
  in "Business & Finance", so `key={card.title}` threw React's duplicate-key
  error. The key now carries the index, the same fix `GridGallery` and
  `LogoGrid` already carry.
- **Eleven of the forty titles carry an authored `<br>`** and the component was
  rendering the transcribed `\n` as whitespace. It now runs them through
  `withBreaks`, which is a no-op on /advantages/atlas-advantages — none of its
  thirty-two titles has one. **A section that looks identical can still differ
  in whether its copy is line-broken; check before reusing a component that
  prints raw text.**

**A `<?php echo $domain?>` inside an href breaks every `[^>]*` regex.** The tag
contains a literal `>`, so `<a [^>]*class="btn-primary"` never matches an anchor
whose href is written through PHP. Match on "no `<` between attributes"
(`[^<]*?`) instead — this cost one silent extraction failure on the
"Collaborative Spaces" button and both banner buttons.

**Reference notes, none reproduced:**
- The trailing `.code-embed-6` block wires a NoPaperForms popup to
  `[data-id="campus-visit"]`; the banner's second button carries `id=`, not
  `data-id=`, so it matches nothing. (It sits after the fatal anyway, so the
  reference never parses it.)
- Every `.slider-card-e-ugdx` carries `data-slider-card-a-bg="Paste image url"`,
  read by a script targeting `.slider-card-a`, a class none of them has — the
  same dead script /life-at-atlas documents.
- At 700px the reference's chip card measures 821px inside a 656px slider and
  overflows, clipped by `.section { overflow: hidden }` — `ZoomSliderLg`'s
  existing fix.

## /admissions/integrated-admissions — `components/Admissions/`, `lib/integratedAdmissionsContent.js`

`reference/admissions/integrated-admissions.php` (`$css =
"…6915ca0b61d85144edd1d44e-e809c9c17.css"`, a tenth distinct sheet; `$body =
"body atlas-page"`) in eight sections: hero, "Find Your Path within ATLAS
SkillTech University", "Key Dates & Deadlines", "What Makes You Stand Out",
"Empowering Ambition Through Scholarships", "In their own words: Why ATLAS
feels right", "Experience the ATLAS Campus in Person", FAQ. First of the three
Admissions pages; the other two are **not** built yet.

**This reference cannot be rendered locally at all — measure production.** Every
earlier page that fatals does so at a commented-out `faq.php` include near the
*end*, so everything above it still renders. This one fatals at **line 16**: the
page's first statement is `new mysqli("localhost","diceapp_dice",…)` and that
database is unreachable from this checkout, so PHP throws `mysqli_sql_exception:
Access denied` before emitting a single byte of the body. `curl` returns
header.php's output and the exception, nothing else. All twelve widths were
measured against `https://atlasuniversity.edu.in/admissions/integrated-admissions`
instead, which serves the same `$css`, starts with a doctype (`CSS1Compat`, so
none of the mirror's quirks-mode artefacts apply) and runs the real Swiper,
Bootstrap and Webflow tab widget.

**The B.Tech key dates are a database snapshot.** `keydates/btech.php` renders
`getAdmissionCyclesCon($conn, 4)` through `showDateCon()`. The six values are
snapshotted from the live page into `lib/integratedAdmissionsContent.js` — the
same treatment Thought Leadership's UAT feed gets. `showDateCon()` prints
`<b>Closed</b>` for a null or past date, with one hard-coded exception
(`$special_date = "2025-09-11"`), which is why "Applications Start" still reads
11th Sep 2025.

**51 assets, and only 9 were new.** 36 were already local and byte-identical by
SHA-1 (the four school-card images from /about-us, all 26 testimonial
photographs and the three video posters from the homepage, the quote icons, the
watermark and the FAQ arrow); 6 more are the Parents videos, which are already
in the repo as **Git LFS pointers** — `*.mp4` is LFS-tracked, so a 132-byte
`version https://git-lfs.github.com/spec/v1` file is correct, not broken. Check
`.gitattributes` before "fixing" a small media file. The 9 new ones live in
`public/assets/images/admissions/{hero,key-dates,scholarships,banner}/`.

**Five of the eight sections are existing components**, each measured on this
reference first and each change additive and defaulted, so the origin pages are
untouched (verified: 0 diffs on /about-us, /, /campus-atlas, /life-at-atlas and
/advantages/atlas-career-services after the changes):
`InnerPageHero` gained an optional `hero.eyebrow` (`.course-duration-isme.atlas`,
24px/500 white); `About/OurSchools` became `data`-driven; `Home/Testimonials`
gained `data` and `headingVariant`; `ui/InfoBanner` gained `fullBleed`; `FAQ`
was already `data`-driven. Three are new and all take `data`, because
pg-/ug-admissions.php carry the same shapes: `KeyDates`, `StandOut`,
`Scholarships`.

**Two shared components disagreed on a variant, so it had to travel as data.**
`.secondary-btn` on the school cards is `cd63ac8f…` (16px/600) on /about-us and
`25d04a90…` (12px/700) here, so `card.button.variant` now travels with the card
and falls back to `SecondaryButton`'s own default. Likewise the testimonial
heading is `.h2-tag.mrg16` on the homepage and `.h2-tag.mrg16.isdi` here.

**`PrimaryButton`'s outline variant is named `outline`, not `outline-white`.**
The reference calls it `outline-white` in its `data-wf--button-primary--variant`
attribute and the comment in `homeContent.js` repeats that name, but the key in
`VARIANTS` is `outline`. An unknown key silently yields no classes, so the
button renders as unstyled text — caught only by comparing screenshots, because
every computed property that *was* set still matched.

**Only `!important` survives an inline style — check which declarations carry
it.** The law table is authored `style="border-collapse: collapse; width:
100.229%"`, and `@media (max-width: 1100px)` sets `border-collapse: separate
!important; border-spacing: 0 !important; width: auto; min-width: 900px`. Only
the first two carry `!important`, so the collapse flips but **the inline width
keeps winning** and the table stays 100.229% at every width (verified
1101/1100/1099 → 975/974/973, never the 900px floor). The first port moved the
width into a custom property so the breakpoint could override it, which was
wrong.

**Two Tailwind traps this page hit.**
- **Two padding utilities in one class list are resolved by stylesheet order,
  not by the order you wrote them.** `cx(cell, 'p-0 …')` where `cell` already
  held `p-3` gave the caption cell `p-3`, adding 24px of height and eating 24px
  of width. Padding is kept out of the shared `cell` string and applied per
  cell.
- **Preflight does not zero the UA's `td { padding: 1px }`.** The reference
  authors `padding: 0` inline on the caption cell; without an explicit `p-0`
  the row is 2px too tall.

**The reference nests `.df-container-atlas` inside itself** on the uGDX tab —
the page opens one and `keydates/btech.php` opens another — so it paints two
concentric 1px `#18429f` borders and loses 2px of inner width. The Law tab has
one. Not reproduced; one wrapper per tab.

**`max-tbl` (`max-width: 1100px`) is a sixth breakpoint**, and it belongs to
`keydates-static/law.php`'s own `<style>`, not to Webflow — that is where
`<br class="br">` appears and the table becomes a 900px-wide horizontal
scroller.

**Reference notes, none reproduced:**
- `$arrow = "law-down-arrow.svg"` is assigned immediately before the FAQ
  include, which hard-codes `atlas-down-arrow.svg` in its own `<style>` and
  never reads `$arrow`.
- The law table's `<style>` block is embedded twice, byte-identical — once by
  the page and once by the include.
- The header cell's `.header-table { background-color: #d20158 }` is overridden
  by an inline `#CC5500`.
- `colspan="4"` on the caption cell of a two-column table.
- The include's trailing `<script>` recolours any `td b` matching
  `<day><suffix> <Month> <year>` green. Deterministic over static copy, so the
  one cell it hits carries the colour in the markup instead.
- "Schedule a Visit" carries `id="campus-visit"` while the NoPaperForms popup
  binds to `[data-id="campus-visit"]`, so it is the plain link it is ported as.

## /admissions/pg-admissions — `lib/pgAdmissionsContent.js`

`reference/admissions/pg-admissions.php` (`$css =
"…690de083898469d22c882cab-0c046c29c.css"`, an eleventh distinct sheet; `$body =
"body atlas-page"`) — the **same eight sections in the same order** as
/admissions/integrated-admissions, so it introduced no new component: hero,
Find Your Path, Key Dates & Deadlines, What Makes You Stand Out, Empowering
Ambition Through Scholarships, In their own words, Experience the ATLAS Campus
in Person, FAQ. Second of the three Admissions pages.

It fatals locally the same way — `new mysqli(…)` on line 14, before any body
output — so it was measured against production. Lines 649-1057 are a
commented-out earlier FAQ block, line by line; dead markup, not ported.

33 assets: 15 already local, 11 new, 6 the parent-testimonial mp4/webm pairs,
and 1 that cannot be downloaded at all (below). New files live in
`public/assets/images/admissions/{hero,scholarships}/`, plus three that belong
to the shared testimonial set (`testimonials/testimonial-vector.png`,
`testimonials/quote.svg`, `icons/play-button.svg`).

**A dead asset in the reference.** The Varsha Sharma testimonial authors an
`.mp4` and a `.webm`. The mp4 — `…IMG_5462%20%281%29-transcode.mp4` — answers
`403 AccessDenied` from S3 under every URL spelling, and **production itself
falls through to the webm** (verified in the browser: `currentSrc` is the webm,
`readyState` 4, playing). The webm is what ships. Note `*.webm` is not
LFS-tracked; `*.mp4` and `*.zip` are.

**All four testimonial tabs hold the identical four cards.** 16 `.swiper-slide`s,
4 per pane, the same four videos, quotes and names in Parents, Students,
Industry and Global. The three copies were never given their own content
upstream. Reproduced as authored — inventing content for three tabs would be
worse than showing what the page shows. Three cosmetic details do differ and are
reproduced: the `.bg-image` watermark (`vector-atlas` on Parents,
`testimonial-vector` on the rest), the `.quote` icon (`quote-icon.svg`
throughout Parents; `quote-icon.svg` then `quote.svg` x3 elsewhere), and a
`.play-icon` on cards 3 and 4 of the three copies only.

**The play button is a real interaction the project already had.** `a.play-icon
> img` carries `data-video`, and `components/Footer/VideoModal` already listens
for `[data-video]` on `document`, so rendering the anchor is all it takes. On
the homepage and /admissions/integrated-admissions the same anchors are authored
**empty**, which is a 0x0 box — hence `item.playIcon` is optional and those pages
render nothing, exactly as before.

**The same class can mean different things on two pages — check the include, not
just the sheet.** Four such splits here, each now a prop or a data flag:
- `.df-card`'s `justify-content` is `space-around`, replaced by `flex-start`
  from `@media (min-width: 1440px)` — *except* on
  /admissions/integrated-admissions, where `keydates/btech.php` ships its own
  `<style>` setting `space-between`, which sits after the sheet and wins at every
  width. `btech.php` is the only include that does this.
- `.testimonial-video` is square here; the homepage's `56px 0` comes from
  index.php's mis-scoped inline `<style>`. Hence `videoCorners`.
- `.swiper.common-swiper.mrg-mob-tp-0` zeroes the carousel's 40px top padding
  below 768px.
- `.btn-normal-wrap` around the Scholarships button keeps it at its natural width
  below 768px; integrated-admissions has no wrapper, so `.head-wrap.top`'s
  `align-items: stretch` pulls its button to the full container width.

**A tab can hold more than one date strip.** The ISDI pane stacks M.Des and MBA
DMST, each with its own button, the second in
`.dates-fees-container-atlas.mrgtp` (`padding-top: 56px; display: block`). So
`KeyDates` takes `tab.blocks[]`, and integrated-admissions now passes a
single-entry array.

**`showDateCon()` returns a literal `<b>Closed</b>`,** and every cell on this
page except "Application(s) Start" is one — all three cycles (master ids 6/7/8)
are past. The one surviving date is the hard-coded `$special_date`. The `<b>`
needs an explicit `font-bold`: `.df-text-1` is already 700 and Preflight's
`b { font-weight: bolder }` resolves 700 to **900**.

**The lead cell is a `.df-text-2.f14` like any other** and carries its
`padding-bottom: 12px`. Missing it made every strip 12px short — on
/admissions/integrated-admissions too, which is why that page's diff improved
from 306/324 to 318/324 when this was fixed.

**`git status` can report `M` on an LFS file whose content is unchanged.** The
three parent-testimonial mp4s were sitting in the working tree as unsmudged
132-byte pointers, so the videos could not play on the homepage,
/admissions/integrated-admissions *or* this page. The real bytes were restored
from the CDN after proving they are the exact tracked objects (SHA-256 and size
match the pointer's `oid`/`size`). `git diff` is empty and
`git hash-object --path=… file` equals `git rev-parse HEAD:file` for all three —
the clean filter re-encodes them to the identical pointer, so the tracked content
did not change. Use the blob-id comparison, not `git status`, to decide whether
an LFS file really differs.

**Reference notes:**
- `$arrow = "law-down-arrow.svg"` is again assigned and never read.
- The hero's policy button links to the internal `/flipbook/pg-policy/`; the
  fliphtml5 URL integrated-admissions uses is commented out directly above it.
- "Schedule a Visit" carries no `data-id`, so the NoPaperForms popup matches
  nothing and the anchor is the plain link it is ported as.

## /admissions/ug-admissions — `lib/ugAdmissionsContent.js`

`reference/admissions/ug-admissions.php` (`$css =
"…690dcdd80d8269c1849947a1-532aa6888.css"`, a twelfth distinct sheet; `$body =
"body atlas-page"`) — the same eight sections in the same order as the other two
Admissions pages. Third and last of the set. It fatals locally the same way
(`new mysqli(…)`, line 57, before any body output), so it was measured against
production.

**No new component and no new asset.** All 54 assets it references were already
local and byte-identical by SHA-1 — the first page in the rebuild with a
completely empty download list. Its testimonials and its closing banner are
byte-for-byte /admissions/integrated-admissions' (26/26 cards diffed, same lead,
same image, same buttons), so `lib/ugAdmissionsContent.js` re-exports them
rather than duplicating them.

**This page has its own `<style>` block, ahead of the markup** (`:11-54`), and it
is the only reason its hero differs from the other two. It re-declares
`.buttons-wrapper` — the gap stays 16 at every width instead of dropping to 8 at
991, and the alignment and padding turn at **576** rather than 767/479 — and
declares `.btn-ca`, a fourth button shape. `.btn-ca` is the `.btn-primary` atlas
pill in every respect except that it drops to 40px at 576 rather than 767, so
between 577 and 767 it stands 16px taller than the three `.btn-primary`s beside
it. Hence `max-576` in `tailwind.config.js`, `PrimaryButton`'s `atlas-576` and
`InnerPageHero`'s `row-576`. **The block reaches every `.buttons-wrapper` on the
page**, the Key Dates ones included, which is why `KeyDates` takes a
`buttonWrap` too.

**Four Key Dates tabs, and only one of them is live.** The page comments out the
database include above each calendar and calls a hand-authored
`keydates-static/` file instead; only uGDX still runs `btech.php`. The ISME tab
stacks two tables. All four tables sit in a `.df-container-atlas` carrying an
inline `border: none`, so they have no indigo frame — unlike
integrated-admissions' law table, which keeps it. `KeyDates` therefore models a
tab as `blocks[]`, each block declaring its own `kind` (`strip` | `table`),
`borderless`, `spaced` and `justify`; all three Admissions pages now use that
one shape.

**Two table details the other page did not surface.** These four tables author
`height: 461px` inline and **no** `margin`, so they keep Bootstrap's own
`.table { margin-bottom: 1rem }`; integrated-admissions' law table authors
`margin: 0` and cancels it. Missing that made the pane 16px short. And each
carries commented-out rows and a commented-out "Next Cycle" column, which is why
`colspan="3"` (4 on the law table) sits over a two-column body.

**Webflow numbers only the first two tab panes, and it changes the type size.**
`.tab-pane-tab-1` / `.tab-pane-tab-2` take `font-size: 16px` at <=767 from the
sheet; `Tab 4` and `Tab 5` are bare `w-tab-pane` and stay at
`.tab-content-mint`'s 18px. Every page's markup does this, the homepage
included, and the references are not consistent about which Key Dates panes are
numbered: integrated-admissions' two are bare, pg-admissions' two are numbered,
ug-admissions numbers its first two and not its last two. Hence
`tab.paneNumbered` on `KeyDates`, and an index test in `Testimonials`. Invisible
in the testimonial cards (every line sets its own size) and very visible in the
tables, whose cells inherit.

**Three bugs in already-finished work that this page's diff surfaced**, all in
the shared `Home/Testimonials` and all now fixed on the homepage too:
- **`.testimonial-video` is 440px tall on every Admissions page**, not 156. The
  156 (and the `56px 0` radius) come from index.php:1774's mis-scoped inline
  `<style>` and are homepage-only. That is the `videoVariant` prop —
  `home` vs `plain`.
- **`.student-text`'s `flex: none` lands at 479, not 767.** `flex: 1` beats the
  declared `height: 280px` until `@media (max-width: 479px)` turns it off, so
  between 480 and 767 the box is content-height. The same trap
  /advantages/atlas-career-services already documents for `.card-type-f`.
- **The empty `.stname` is still a box.** It carries `padding-bottom: 5px`, and
  where the card is content-height that is exactly 5px of card height. It is now
  always rendered — the third time this lesson has come up, after `GridGallery`
  and `SpeakerSlideCard`.

**Reference defect, fixed rather than reproduced: real horizontal overflow at
768px.** This hero has four buttons; at exactly 768 the row is still a row while
`.hero-text` is only 704px wide, so the fourth runs 112px past the viewport and
nothing above it clips. Measured `document.scrollWidth` 880 against a 768 client
width — on production as well as in the port before the fix. `InnerPageHero`'s
`row-576` adds `flex-wrap`, which engages only when the buttons do not fit, so
every other width is unchanged.

**Reference notes:**
- `$arrow = "law-down-arrow.svg"` is assigned a third time and never read.
- The B.Sc table's "Applications Opened" reads **Sep 2026** where the other three
  read Sep 2025.
- The B.Des and B.Sc calendars leave a cell reading "Applications Open", which
  the include's `<script>` recolours green alongside the dates — carried as
  `green: true` in the data rather than shipped as a DOM walk.

**The three Admissions pages are complete.** `reference/admissions/` holds
nothing else.

## Programs — `reference/programs/`

Thirteen PHP files across `programs/`, `pg/` and `ug/`, plus an **empty**
`programs/programs/` directory.

**`programs/index.php` is not a page.** All 67 bytes of it are
`header("Location: https://atlasuniversity.edu.in/"); exit;` — a guard on the
directory, with no markup, stylesheet, assets or interactions. Verified on both
the mirror and production: `/programs/` answers `302` to the site root. Its port
is the `/programs -> /` redirect in `next.config.mjs`, whose comment records why
Next's 307 stands in for PHP's 302. Nothing in `lib/navigation.js` links to
`/programs` itself; the menu goes straight to the three landing pages.

### /programs/ug-programs-atlas — `components/Programs/`, `lib/ugProgramsContent.js`

`reference/programs/ug-programs-atlas.php` (`$css =
"…690c385d74f21f5b886067df-b6470bca6.css"` — a sheet no other page uses, though
not a new *file*; `$body = "body atlas-page"`) in three blocks plus the FAQ:
hero, "Find the Program That Fits Your Ambition" (six discipline cards), the
AI-search panel, FAQ.

**This reference renders end to end** — it opens no database connection, so
unlike the three Admissions pages `curl` returns the whole document. It was
still measured against production, because the mirror is in quirks mode and this
hero is built out of percentage offsets.

20 assets: 16 downloaded into `public/assets/images/programs/{hero,cards}/`, 4
already local (the flower icon, the FAQ arrow, and the search panel's background
and glyph — all shared with the homepage's four-schools section).

**A hero that is *not* `InnerPageHero`.** `.inner-header-wrapper.full-ht` looks
like the Advantages/Admissions hero and measures differently in every part: the
scrim covers the bottom **half** rather than three quarters (and the whole frame
below 767), its gradient ends at `#000e` at 100% rather than `#000c` at 84%, its
padding is `0 0 56 0` rather than `0 0 64 64`, and it holds a bare `.container`
rather than an 840px `.hero-text`. Hence `components/Programs/ProgramHero`.

**A `.container` that is a flex child needs its width restating.** The hero's
`.container.grow` sits inside `display: flex` cover, so `mx-auto max-w-[1366px]`
alone let it shrink to fit the heading — 785px instead of 1366 — and the whole
column drifted to the centre. Webflow's own `.container { width: 100% }` is what
holds it open; `w-full` restates it.

**The card grid has no breakpoint.** `.common-flex-16-wrap` is `flex-wrap: wrap;
gap: 16px` over a **fixed-size** `.pg-card-ugdx` (544x745, 400x580 at <=767,
350x690 at <=479), so the column count falls out of the arithmetic: two cards
plus the gap need 1104px, which the container only has from 1280 up. The one
media query is the alignment, which centres the row at <=767. The fixed *height*
is also what lines every card's button up — `.btn-wraper` is `margin-top: auto`.

**`align-items: flex-start` is why two children shrink and two do not.**
`.pg-details-atlas` is a `flex-start` column, so `.pg-title-atlas` (231px) and
`.btn-wraper` (252px) size to their content while `.course-txt` and `.pg-cont`
fill the 480px inner width — their text is simply long enough to. Missing the
`items-start` made all four fill, and cost 147px of card height because
`margin-top: auto` then had nothing to distribute.

**`.button-tx` is not styled on every sheet.** Most pages declare
`font-size: 16px`; this page's sheet declares **no base rule**, so the label
inherits the button's own 18px and the pill measures 20px wider. That is
`PrimaryButton`'s new `textSize` prop (`default` | `inherit`); both sheets still
agree on 12px at <=767.

**The project pins every type size to `line-height: 1.5`, so a 1.2 must be
restated at each breakpoint.** Three separate boxes were caught by this in one
page: `.pg-title-atlas` (20px/1.2 at <=767), `.pg-title-sm` (14px/1.2) and — in
the shared `Home/FAQ` — `.accordion-button` (16px/1.2), which had been wrong on
**every** FAQ on the site since it was built. Adding `max-md:leading-[1.2]` to
`FAQ` fixed the homepage, /about-us, /campus-atlas and the Admissions pages at
the same time.

**Reference notes, transcribed as authored:**
- The sixth card, "Design, AI & Technology", repeats the Law & Policy card's
  entire description *and* its third key area verbatim, and its button reads
  "AI & Technology" while its heading reads "Design, AI & Technology".
- Every card's key-area list ends with three **empty** `<div class="pg-list">`
  elements. They are rendered: zero-height, but still flex children of a
  `gap: 8px` row.
- The card links are authored relative (`ug/ug-design-and-innovation`), so they
  resolve against `/programs/`; written absolute here.
- `$arrow = "law-down-arrow.svg"` is assigned before the FAQ include for the
  fourth time in this rebuild and is never read.
- `assets/include/more-questions.php` is included with byte-identical
  `$chatBxVariant` and `$chatBxText` to the homepage's, so it renders through the
  existing `components/About/SearchQuestion`, which now takes an optional `data`.

**A lazy-loaded icon can fake a 12px diff.** The search panel measured 225px tall
on the reference against 237 here — until the flower SVG loaded, at which point
both read 237 with identical children. Scroll the reference into view and wait
before trusting a small height difference.

### /programs/pg-programs-atlas — `lib/pgProgramsContent.js`

`reference/programs/pg-programs-atlas.php` (`$css =
"…690c40856b095376f162c1b1-10a901f9d.css"`, its own sheet; `$body = "body-isme"`)
— the same four blocks in the same order as /programs/ug-programs-atlas, with
three discipline cards instead of six.

**Nothing new was written for it.** Every component took it as data, including
the two added for the UG page. Its `<style>` block is byte-identical to that
page's, and so is its hero photograph — which is why the file now lives at
`public/assets/images/programs/hero/programs-hero.png` rather than under a
UG-specific name. Neither `$css` nor `$body` changes anything measurable:
`<body>` computes the same 16px/24 Manrope on both, the finding /life-at-atlas
already recorded for `body-isme`.

14 assets: 6 downloaded (the three card photographs and their `-p-500` twins),
8 already local.

**Two card details the UG page never exercised**, both now handled in
`ProgramCards`:

- **A `<strong>` inside a 700-weight heading.** "Business & Management" wraps its
  title in `<strong>`. `.pg-title-atlas` is already `font-weight: 700` and
  Webflow's normalize gives `strong` a flat `bold`, so the reference paints 700
  — measured. Preflight's `strong { font-weight: bolder }` resolves against the
  700 parent and would render **900**, so `card.titleStrong` renders it with an
  explicit `font-bold`. Fourth instance of this trap in the rebuild, after
  /advantages/atlas-enterprenurship and `Home/AtlasSpotlight`.
- **Authored `<br />` in both a title and a lead.** "Digital & Emerging
  Technologies in Business" breaks in both, so `ProgramCards` runs `title` and
  `text` through `withBreaks`. A no-op on the UG page, none of whose copy is
  broken — the same trap `Advantages/Electives` records. The reference authors a
  space *before* each `<br />`; it is kept in the transcription even though HTML
  collapses it, so the data reads as the source does.

**Reference notes:**
- The card links are authored relative (`pg/pg-business-and-management`), so they
  resolve against `/programs/`; written absolute here.
- `$arrow = "law-down-arrow.svg"` is assigned and never read, for the fifth time.

### /programs/programs-list-integrated — `lib/integratedProgramsContent.js`

`reference/programs/programs-list-integrated.php` (`$css =
"…6915c922306a4c1a22aed039-b041f4c74.css"`, its own sheet; `$body = "body-isme"`)
— the third and last top-level Programs page. Hero, two integrated-programme
entries, the search panel, FAQ. Its `<style>` block is byte-identical to the
other two Programs pages'.

9 assets: 4 downloaded (its own hero photograph and three `-p-` twins), 5 already
local. `ProgramHero` is reused; everything below it is a shape neither sibling
has — a stacked list rather than a card grid.

**Two live brochure modals, and they are the reference's own third-party
integration.** Each "Download Brochure" is authored `href="#"` with a `data-id`,
and the foot of the page carries a hidden overlay plus a listener bound to it.
Both fire — verified on production, clicking the Law button sets its overlay to
`display: flex` and reveals a 580x667 panel. They are reproduced rather than
flattened, which means the port carries an `<iframe>` to
`crm.atlasskilltech.app` (BBA LL.B.) and a NoPaperForms widget whose
`emwgts.js` is injected on first open (B.Tech + MBA), together with the
reference's own `utm_*` forwarding onto the iframe src. **Those two URLs are the
only remote ones in the Programs port**; no image, font or media travels over
them, and nothing loads until a visitor opens a modal (verified: zero
third-party requests on page load). If the integration is unwanted, deleting
`BrochureModal` and rendering a plain button is the whole change.

A third overlay, `#btechint-popup-overlay`, is bound to
`[data-id="btech-integrated"]`, which matches **no element** — confirmed on
production. Not ported, the same call every other orphaned popup got.

**A control that opens a dialog is a `<button>`, not an `<a href="#">`.**
`PrimaryButton` now renders a real button when given an `onClick`, so the
brochure trigger never navigates and never puts a bare `#` in the status bar.

**The eligibility strip is `KeyDates`' chassis but deliberately not `KeyDates`.**
Same `.dates-fees-container-atlas > .df-container-atlas > .df-card` classes and
the same measured values, but the lead cell here is a bare label with no value,
the cells hold prose rather than `showDateCon()` output, and two carry
`.df-card.top`. `KeyDates` additionally models stacked blocks, static tables,
borderless containers and a "Closed" state. Sharing would have contorted both;
what they have in common is a few short class strings.

**Two more variants, and one more instance of the same Tailwind trap.**
`PrimaryButton` gained `outline-medium` (`w-variant-6b63810f…` — a 44px
transparent pill with a 1px black border and `text-align: center`, and the only
button shape on this page) and `ButtonRegular` gained `altas-med`
(`w-variant-9ad79873…` — h44 at every width, #000 on #5cbdca, 14px/500). And
`.df-card.top`'s `justify-content` had to move out of the shared class string:
`justify-around 2xl:justify-start` and `justify-start` in one list are resolved
by **stylesheet order, not the order they are written** — the third time that
has bitten in this rebuild, after the law table's padding and the FAQ's
line-height.

**`.button-tx` is declared on this sheet but not on /programs/ug-programs-atlas'.**
Both drop to 12px at <=767; this one also declares the 16px base, so it takes
`PrimaryButton`'s default `textSize` while the UG page takes `inherit`. Check
the page's own sheet rather than assuming the sibling's.

**Reference notes:**
- Both `.btn-primary`s carry the same variant class even though one's
  `data-wf--button-primary--variant` reads "law" and the others "outline-medium".
  The attribute is inert; the class is what the sheet keys off.
- "Apply Now" is authored with a trailing space, and its `.button-text` carries
  `data-font-size="14"` — which the `.code-button` script really does apply here,
  unlike /life-at-atlas where the attribute is empty and the assignment is the
  invalid string "px".
- The second entry's "Explore Program" href contains a literal `&`.
- Both eligibility strips are word-for-word identical, so the rows are hoisted
  into `programList.eligibilityRows`.

**Result: 300/300 computed properties matched at all twelve widths.** Note the
harness for this page checks `#faq h2` but not `.accordion-button`, so the eight
benign Bootstrap-accordion properties every other page reports are simply not
sampled here — the FAQ itself is the same shared component and behaves the same.
The clean sweep covers the hero, the two entries and the search panel.

### /programs/ug/ug-design-and-innovation — `lib/designInnovationContent.js`

`reference/programs/ug/ug-design-and-innovation.php` (`$css =
"…690be2baaa3f88fcc6816657-bac7acda2.css"`, its own sheet; `$body = "body
atlas-page"`) — the first of the six children of /programs/ug-programs-atlas.
Hero, seven B.Des entries, the search panel, FAQ. It carries no `<style>` block
of its own beyond the popup's, unlike the three pages above it.

9 assets: 4 downloaded (its own hero photograph and three `-p-` twins, all
verified `ffd8ff`), 5 already local — the notch polygon re-proven byte-identical
to /admissions/key-dates' by SHA-1.

**Not one shape on this page is new.** `ProgramList` is reused verbatim: every
measured value of `.program-list` is identical on the two references, and the
screenshots of the first entry are **pixel-identical at 1440 and 390** (4
antialiased pixels differ at 768). Only its data and two small capabilities
changed — a section-level `brochure` (all seven buttons share one popup here,
where the integrated page gives each entry its own) and `withBreaks` on the hero
title, which is a no-op on the other three Programs pages.

**A DB-driven FAQ, and the first with real structure.** This page's include is
`assets/include/faq.php`, not a page-specific file: it queries
`z_atlas_faq_master` keyed on `$domain`/`$fullUrl` and this page falls through to
the `else`, so it renders master 1 — the ISDI set, **24 questions**. The local
mirror has no database handle, so that include fatals and the copy is transcribed
from production. Its answers carry `<p>`, `<ul>`, `<ol>`, `<li>` and `<strong>`,
so `FAQ` grew an `Answer` block renderer: a plain string is still a paragraph, so
no earlier page changed. Two of the 24 questions are the same sentence with
different answers — the database's own duplication, transcribed as authored,
which is why the item key is index-qualified.

Measured for the lists (open item, 1440/768/390): `ul`/`ol` are `padding-left:
40px; margin-bottom: 10px`, disc / decimal, outside; `li > p` is
`margin-bottom: 10px`. Preflight zeroes all of it, so all of it is restated. The
last item's bottom margin collapses out through the list's open bottom edge and
merges with the list's own 10 — which is why a 7-item list measures 228 and not
238, and it falls out of the same markup rather than needing a `last:` rule.

**Undoing Preflight on an `<iframe>` takes two classes, not one.** Preflight
declares `iframe { display: block; vertical-align: middle }`. `inline` alone
restores the line box but `middle` still kills the baseline descender, so the
brochure panel came out 690 against the reference's 696. `inline align-baseline`
matches exactly — and the same fix takes
/programs/programs-list-integrated's panel from 661 to its reference's 667.

**Two references disagreeing about a shared component is now three cases, not
one.** The FAQ rule ("one design site-wide, only `data` differs") already covered
the About page's unstyled-Bootstrap fallback. This page adds two more, both
measured across seven references and both left at the homepage's behaviour:

- `.accordion-title { color: rgba(43,43,43,.8) }` is declared by every Programs
  page's sheet and not by the homepage's, so **there the open state is invisible**
  — the button turns `#052c65` but its text is entirely inside that span. Ours
  turns blue, as the homepage does.
- `.accordion-title { margin-right: 50px }`, same story on 13 of 17 pages. It
  shrinks the title box by 50px, which at 768 is enough to wrap the question onto
  a second line on the reference and not on ours.

**And one that was a genuine open question, not a rule — now RESOLVED.**
`.accordion-item`'s divider is `2px #eee` on **14 of 17** references and
`1px #dee2e6` (Bootstrap's default) on the homepage,
/admissions/integrated-admissions and /admissions/ug-admissions. The shared
component was built against the homepage, so it rendered 1px everywhere — the
sole cause of the recurring 1px item-height delta. It was flagged rather than
taken unilaterally, and **the user approved the change on 2026-10-24**:
`components/Home/FAQ` now draws **2px #eee**.

Re-measured on production across 22 pages before the change: 2px #eee on every
one except four — the ATLAS homepage, /admissions/integrated-admissions,
/admissions/ug-admissions and
/schools/isdi/admissions/pre-university-summer-school — which draw Bootstrap's
stock 1px because their include ships no `<style>` for `.accordion-item`. The
majority and the authored intent agree, and the 1px is the same unstyled
fallback /about-us's heavier question and chevron already come from.

**That measurement also turned up a defect nobody had catalogued: the LAST item
draws no divider.** On all 22 references the last `.accordion-item`'s
`border-bottom` computes to **0px** — `.accordion-flush` drops it — and the
component was drawing one under every item, so every FAQ on the site was one
divider too tall. Both halves are fixed, and the item heights now match
production exactly (verified: a 24-item FAQ sums to 1966 on both sides, a
7-item one to 572, an 8-item one to 654). What remains of the FAQ bucket on an
ISDI page is only `SectionHead.SECTION`'s 60/40 padding against an ISDI
section's 50 — a clean +20 above 768 / −20 below.

**`borderBottom*` was missing from the diff harness.** That is how a 2px-vs-1px
divider hid on nine shipped pages behind nothing but a 1px box delta. It is in
`PROPS` now, with a suppression for the colour of a zero-width border.

**Reference notes, none reproduced:**
- All seven brochure anchors carry `id="download-brochure"` as well as the
  `data-id` the listener binds to — the same DOM id seven times. Only the
  `data-id` does any work; no id is emitted.
- The popup's `.npf_wgts` div is commented out, so the `emwgts.js` the reference
  still fetches on click has nothing to fill. Verified on production: the request
  really fires and paints nothing. Not reproduced — this page's popup is the
  iframe alone.
- There is no `utm_*` forwarding script here, unlike the integrated page's; hence
  `BrochureModal`'s `forwardUtm` flag rather than an assumption.
- Each entry repeats the `.code-button` script inline; it is one behaviour,
  already folded into `ButtonRegular`'s measured 14px.

**Result: every element on the page matches the reference at all twelve widths.**
The only diffs are in the shared FAQ, and all of them are one of the three
buckets above — the benign Bootstrap residue (`position: relative` with no
offsets, `overflow: hidden` on a box nothing overflows, two fully-transparent
backgrounds, an over-constrained 50px margin, `#212529` vs `#333` on a box whose
every descendant sets its own colour), the two deliberate title divergences, and
the divider width.

### /programs/ug/programs-list-management-and-entrepreneurship — `lib/managementContent.js`

`reference/programs/ug/programs-list-management-and-entrepreneurship.php`
(`$css = "…690c3a1211f795498409636b-f36eae935.css"`, its own sheet; `$body =
"body body-ugdx"`) — the second of the six children of
/programs/ug-programs-atlas. Hero, four BBA Hons. entries, the search panel,
FAQ.

**A different `$css` and a different `$body`, and neither changes anything.**
This page declares `body body-ugdx` where
/programs/ug/ug-design-and-innovation declares `body atlas-page`, over a sheet
no other page uses — and every measured value of the hero, the entries, the
eligibility strip and the search panel is identical on the two references at
1440 / 768 / 390. **Measure before assuming a new sheet means new values**, and
equally before assuming it doesn't.

4 assets, all new (its own hero photograph and three `-p-` twins, verified
`89504e47` and SHA-1-checked against every local PNG for accidental reuse). The
notch polygon is the same file again.

**Nothing was written for this page.** `ProgramHero`, `ProgramList`,
`SearchQuestion` and `FAQ` all took it as data. The single capability added is
`withBreaks` on `ProgramList`'s entry title — the first entry breaks after
"Marketing/Finance" and the other three do not, the same trap
`Advantages/Electives` and `ProgramCards` already record. It is a no-op on the
two pages that came before it. The programme band is **pixel-identical to the
reference at 1440, 768 and 390** — 0 differing pixels at every one.

**The FAQ include renders the ISDI set on a management page.** `faq.php` keys
its query on `$domain` / `$fullUrl`, neither of which matches a `/programs/`
URL, so this page falls through to the same `else` branch and serves FAQ master
1. Its 24 questions **and all 24 answers are byte-identical** to
/programs/ug/ug-design-and-innovation's — compared on the rendered production
markup, SHA-1 equal — so `lib/managementContent.js` re-exports that set rather
than duplicating it, the same call `lib/ugAdmissionsContent.js` makes for its
testimonials.

**The lazy flower can fake a 40px diff, not just 12.** `dn_measure.py` read the
search panel at 708x368 on one page and 708x408 on the other at 768px, from
byte-identical include parameters. The difference is entirely the
`flower-new.svg` icon: the measure script does not scroll, the diff harness
does. Both references are 708x408 once it has loaded, and so is the port.
**Scroll the panel into view and wait before believing any height reading of
it** — the diff harness is the authoritative one.

**Reference notes, none reproduced:**
- All four brochure anchors carry `id="bba-brochure"` as well as the `data-id`
  the listener binds to — the same DOM id four times. Only the `data-id` does
  any work; no id is emitted.
- One shared popup for all four buttons, a CRM iframe at `height="650"` with no
  `utm_*` forwarding, and its `.npf_wgts` div commented out — so the
  `emwgts.js` the reference still fetches on click is again not reproduced.
- The fourth entry's href capitalises `bba-Hons-business-psychology` where the
  other three are lower-case. Transcribed as authored.

**Result: every hero and programme-list element matches at all twelve widths.**
The only diffs are the shared FAQ's three known buckets — the benign Bootstrap
residue and the two deliberate `.accordion-title` divergences. (The 2px-vs-1px
divider that used to sit here was resolved on 2026-10-24 — see the note above.)

### /programs/ug/programs-list-commerce-finance-and-economics — `lib/commerceFinanceContent.js`

`reference/programs/ug/programs-list-commerce-finance-and-economics.php`
(`$css = "…690c3a30f41551ec9be9a6ec-b041f4c74.css"`; `$body = "body-isme"` — a
third `<body>` class across the six UG children, and like the other two it
changes nothing measurable) — the third child. Hero, two B.Sc. (Hons.) entries,
the search panel, FAQ.

4 assets, all new (its own hero and three `-p-` twins, `89504e47`, SHA-1-checked
against every local PNG). Its CDN filename URL-encodes an ampersand
(`CommerceFinance%26Economics.png`).

**An eligibility cell can hold more than one value.** Every criterion here
carries a second `.df-text-1.f18` line with a mathematics requirement, and the
entry bar is **60%** where every other Programs page asks 50%. `ProgramList`
now takes `values[]`, with `value` kept as the single-line shorthand the three
earlier pages use — measured identical (18px/700, `margin-bottom: 4px`) on both
lines at 1440 / 768 / 390. That is the only component change the page needed;
everything else took it as data.

**The popup has no NoPaperForms half at all.** Where
/programs/ug/ug-design-and-innovation and the management page comment their
`.npf_wgts` div out, this one never authors it and has no `#npf-container`
wrapper either — the overlay is the iframe alone. The script still injects
`emwgts.js` on click, so it is still dead and still not reproduced. (`npf_wgts`
does appear once in the production HTML, inside a commented-out CSS rule for
`#npf-popup-campus` in the shared header — not this page's popup.)

**Result: every hero and programme-list element matches at all twelve widths**,
and the programme band is **pixel-identical to the reference at 1440 and 390**
(4 antialiased pixels at 768). The only diffs are the shared FAQ's three known
buckets.

**Reference notes, none reproduced:**
- Both brochure anchors carry `id="bba-brochure"` as well as the `data-id` —
  and it is the *same* `data-id` the management page uses, for a different
  widget. Only the `data-id` does any work; no id is emitted.
- The FAQ include renders the **ISDI** set again; the 24 questions and answers
  are byte-identical to /programs/ug/ug-design-and-innovation's, so the set is
  re-exported rather than duplicated.
- The second entry's href drops "hons"
  (`bsc-in-economics-and-data-analytics`) where the first keeps it.

### /programs/ug/programs-list-cs-ai-ml-and-ds — `lib/csAiMlContent.js`

`reference/programs/ug/programs-list-cs-ai-ml-and-ds.php`
(`$css = "…690c3a5b10605173246c8369-b041f4c74.css"`; `$body = "body-isme"`) —
the fourth child. Hero, three B.Tech entries, the search panel, FAQ.

4 assets, all new (its own hero and three `-p-` twins). No new component.

**An eligibility value can carry an authored `<br />`.** The A-Levels cell
breaks its second value with `<br /><br />` — a real blank line — so
`ProgramList` runs values through `withBreaks` as well as titles. A no-op on the
pages before it. Every cell holds two values as on the commerce page, but the
entry bar is back to 50% and the requirement is mathematics *and physics*.

**THE POPUP SHAPE FOLLOWS WHAT THE POPUP HOLDS, AND EVERY PAGE SHIPS BOTH RULES
WITH ONE COMMENTED OUT.** This page's brochure is a **live NoPaperForms widget**
— its `.npf_wgts` div is really in the markup, not commented out — and its panel
is `width: 90%; max-width: 800px; height: 80%` with scrollbars left alone, where
every iframe popup is `width: 100%; max-width: 580px; height: auto; max-height:
90vh` with scrollbars hidden. Read across all five popups with **CSS comments
stripped first**, the correlation is exact and causal: the widget renders a
700px form and needs the taller box. `BrochureModal` derives the shape from
`kind`.

That is also how **two misses in the already-shipped
/programs/programs-list-integrated** came to light, both now fixed:

- its `#npf-popup-btech` is the wide shape and was being rendered at 580 — the
  law popup had been measured and the B.Tech one had not;
- `#npf-close-brochure` on /programs/ug/ug-design-and-innovation is the **one**
  close button of the five that does not declare `line-height: 1`, so it is
  37px tall against the others' 28. That travels as `closeLeading`.

All six popups in the port now match their reference on panel box, close-button
box, contents, max-width, max-height, radius and padding.

**Measure the popup you shipped, not the one next to it.** A page with two
brochure buttons has two different popups; checking the first and assuming the
second is the same is what hid both of the above.

**Result: every hero and programme-list element matches at all twelve widths**,
and the programme band — two-value cells and the `<br /><br />` included — is
**pixel-identical to the reference at 1440 and 390** (4 antialiased pixels at
768). The only diffs are the shared FAQ's three known buckets.

**Reference notes, none reproduced:**
- All three brochure anchors carry `id="btech"` as well as the `data-id`.
- The FAQ include renders the **ISDI** set on a B.Tech page; byte-identical to
  /programs/ug/ug-design-and-innovation's, so it is re-exported.
- The last two "Explore Program" hrefs contain a literal `&`; the first does not.

### /programs/ug/programs-list-law-and-policy — `lib/lawPolicyContent.js`

`reference/programs/ug/programs-list-law-and-policy.php`
(`$css = "…690c3a7d32aa2b65c20f8a60-b041f4c74.css"`; `$body = "body-isme"`) —
the fifth child, and the smallest page in the set: one entry.

**Zero new assets — the first page in the rebuild with an empty download list
since /admissions/ug-admissions.** Its hero is the same CDN file
(`lawatlasssss.png`) /programs/programs-list-integrated uses for its own hero,
SHA-1 equal, so the file was renamed from `integrated-programs-hero.png` to the
neutral `law-atlas-hero.png` and both pages point at it — the same call
`programs-hero.png` already got when the UG and PG landing pages turned out to
share one. No new component and no new capability: `withBreaks` on the
eligibility value, added for the CS/AI page, covers this one's
`Minimum 50% in<br />Class XII`.

**This page and /programs/programs-list-integrated overlap almost completely.**
Same programme (BBA LL.B. (Hons.)), same "Explore Program" href, same hero, and
the same brochure — `[data-id="law"]`, a 580px iframe popup on CRM widget
`6a3e7d3ba1fd0680c6c1ba90` at `height="621"`, with the same `utm_*` forwarding
script. Only the eligibility strip differs: single-value cells with much longer
copy, and the IB wording follows the integrated page's long form rather than the
other UG children's short one.

**Result: every hero and programme-list element matches at all twelve widths**,
the programme band is **pixel-identical to the reference at 1440 and 390** (4
antialiased pixels at 768), and all **seven** popups in the port match their
reference on panel box, close-button box, contents and every declared property.

**Reference notes, none reproduced:**
- The brochure anchor carries `id="law"` as well as the `data-id`.
- `faq.php` *has* a branch for `https://atlasuniversity.edu.in/schools/law/`
  (master 4), but it tests `$fullUrl`, which here is a `/programs/` URL — so
  even the law page falls through to `else` and renders master 1, the ISDI set.
  Verified on production and re-exported like the other children's.

### /programs/ug/programs-list-design-ai-and-technology — `lib/aiTechnologyContent.js`

`reference/programs/ug/programs-list-design-ai-and-technology.php`
(`$css = "…690c3aa511a0eea4dff18991-b041f4c74.css"`; `$body = "body-isme"`) —
the last of the six children. Hero, two entries, the search panel, FAQ.

4 assets, all new (its own hero and three `-p-` twins).

**Its two entries differ in both halves — the only page in the set that does.**
Each carries its own brochure popup *and* its own eligibility strip:

| entry | brochure | strip |
| --- | --- | --- |
| B.Tech (IT, AI & Cybersecurity) | `[data-id="btech"]`, live NoPaperForms widget `1dd30518…` (the CS/AI page's) | two values per cell |
| BBA (Hons) in AI & Emerging Technologies | `[data-id="bba-brochure"]`, 580px CRM iframe `6a3e788e…` (the management page's) | one value per cell |

`ProgramList` already took a per-entry `brochure`; it now also takes a
per-entry `eligibilityRows`, falling back to the section's. Every earlier page
repeats one strip verbatim under every entry, so nothing changed there.
**Check both strips on a multi-entry page** — reading the first and assuming the
second is the same trap the two popups already set on
/programs/programs-list-integrated.

**Every `npf` popup declares two more rules than the iframe ones:**
`.npf_wgts { height: 700px }` and `#npf-popup-btech iframe { height: 100% }`,
on this page, the CS/AI page and /programs/programs-list-integrated alike.
`BrochureModal` now pins both, so the container holds its height before the
widget script arrives instead of collapsing to zero.

**All nine brochure popups across the Programs port now match their reference**
on panel box, close-button box, contents, widget-container box, max-width,
max-height, radius and padding.

**Result: every hero and programme-list element matches at all twelve widths**,
and the programme band is **pixel-identical to the reference at 1440, 768 and
390** — 0 differing pixels at every one.

**Reference notes, none reproduced:**
- Both brochure anchors carry an `id` duplicating their `data-id`.
- The page's own heading is "AI & Technology", while the card linking here from
  /programs/ug-programs-atlas reads "Design, AI & Technology" and the file is
  named for the longer form. Transcribed as the page renders it.
- The FAQ include renders the **ISDI** set; re-exported like the other
  children's.
- The first "Explore Program" href contains a literal `&`.

**The six children of /programs/ug-programs-atlas are complete.**
`reference/programs/ug/` holds nothing else. Three pages remain in
`reference/programs/pg/`.

### /programs/pg/pg-business-and-management — `lib/pgBusinessContent.js`

`reference/programs/pg/pg-business-and-management.php`
(`$css = "…690ca5981a1c3e64264150c0-dc966e54d.css"`; `$body = "body-isme"`) —
the first of the three children of /programs/pg-programs-atlas. Hero, three MBA
entries, the search panel, FAQ.

**No new asset and no new component.** Its hero is byte-identical to
/programs/ug/programs-list-management-and-entrepreneurship's — the CDN serves
the same bytes as `designnnn.png` here and `heeeroooo.png` there, SHA-1 equal —
so the stored file is reused. That is the second time in this set a "new" hero
turned out to be an existing file under a different CDN name (the first was
/programs/ug/programs-list-law-and-policy's). **Hash every hero before adding
it.**

**The eligibility strip is a single row.** No A-Levels or IB cell and no
`.df-card.top` anywhere on the page — one long postgraduate criterion that
stretches the value cell to 972px at 1440. All three entries repeat it verbatim,
so it is hoisted to the section.

It loads a **different webflow bundle** (`webflow.8ad64a2e…`) from the six UG
children's `webflow.ee913841…`. Nothing depends on it; the page uses no IX2
interaction.

**Result: every hero and programme-list element matches at all twelve widths**,
the programme band is **pixel-identical to the reference at 1440 and 390** (8
antialiased pixels at 768), and all **ten** popups in the Programs port match
their reference.

**Reference notes, none reproduced:**
- All three brochure anchors carry `id="mba-brochure"` as well as the `data-id`.
- The FAQ include renders the **ISDI** set on an MBA page; re-exported.

### /programs/pg/pg-digital-and-emerging-technologies-in-business — `lib/pgDigitalTechContent.js`

`reference/programs/pg/pg-digital-and-emerging-technologies-in-business.php`
(`$css = "…690ca661e0ef9a16af2bdaf2-b041f4c74.css"`; `$body = "body-isme"`, same
`webflow.8ad64a2e…` bundle as its sibling) — the second PG child and the longest
file in the Programs set at 451 lines, almost all of it the three popups.

4 assets, all new (its own hero and three `-p-` twins). Note its `sizes` string
is `(max-width: 1439px) 100vw, 1365.9896240234375px`, unlike every other
Programs hero's 1366/1366.

**Every entry has its own popup and its own strip.** Three separate
NoPaperForms widgets and strips of three, one and three rows. Two of the widgets
are shared with other pages (`20bba9a4…` with /programs/pg/pg-business-and-management,
`1dd30518…` with the CS/AI and AI & Technology pages); `425806c8…` is this
page's own. `ProgramList` already took both per-entry, so neither needed work.

**A `.df-text-1.f18` value can be rich, and it is the fifth `<strong>` trap.**
"Entrance Exams (MBA)" authors text, `<br>`, `<strong>`, `<br>`, `<strong>`,
text inside one cell. `ProgramList` gained a value form that is an **array of
runs** — a string is text, `{strong}` is bold — on top of the existing plain
string and `values[]` forms. The `<strong>` renders with an explicit
`font-bold`: the cell is already `font-weight: 700`, Webflow's normalize gives
`strong` a flat `bold` so the reference paints 700 (measured on production), and
Preflight's relative `bolder` would resolve that to **900**.

**Result: every hero and programme-list element matches at all twelve widths**,
the programme band is **pixel-identical to the reference at 1440 and 390** (4
antialiased pixels at 768), and all **thirteen** popups in the Programs port
match their reference.

**Reference notes, none reproduced:**
- Each brochure anchor carries an `id` duplicating its `data-id`.
- The second entry's Undergraduate Qualification cell ends with an authored
  `<br /><br />` the other two copies of that row do not have. Transcribed —
  it is two real empty lines of card height.
- The FAQ include renders the **ISDI** set; re-exported.
- The third "Explore Program" href contains a literal `&`.

### /programs/pg/pg-design-innovation — `lib/pgDesignInnovationContent.js`

`reference/programs/pg/pg-design-innovation.php`
(`$css = "…690ca68dfe1f53093ba2c9b1-b041f4c74.css"`; `$body = "body-isme"`) —
the third PG child and the **last page of the Programs section**. Hero, one
M.Des entry, the search panel, FAQ.

**No new asset and no new component.** Its hero is byte-identical to
/programs/ug/programs-list-cs-ai-ml-and-ds's — all four sizes SHA-1 equal,
served as `designnnandinnovation.png` here and `aimlatlasss.png` there — so the
file was renamed to the neutral `programs-hero-2.png` and both pages point at
it. **That is the third shared hero in this set**, after
/programs/ug/programs-list-law-and-policy's and
/programs/pg/pg-business-and-management's: three of the eleven "new" heroes were
existing files under a different CDN basename. **Hash every hero against
`public/` before adding it** — the CDN name is no guide at all.

Its brochure widget (`425806c8…`) is the one
/programs/pg/pg-digital-and-emerging-technologies-in-business's MBA DMST entry
uses, and its "Undergraduate Qualification" row is that page's copy word for
word.

**Result: every hero and programme-list element matches at all twelve widths**,
and the programme band is **pixel-identical to the reference at 1440 and 390**
(4 antialiased pixels at 768).

**Reference notes, none reproduced:**
- The brochure anchor carries `id="mdes-brochure"` as well as the `data-id`.
- The heading authors a space before its `<br />`; kept in the transcription so
  the data reads as the source does, though HTML collapses it.
- The entry title uses an en dash ("M.Des – Design Futures"), not a hyphen.
- `faq.php` would have chosen master 1 for an ISDI page through its `$domain`
  branch anyway, but `$domain` is the site root here, so it arrives at the same
  set through the `else` fallback every /programs/ page takes.

## The Programs section is complete

Twelve routes: the `/programs -> /` redirect, three landing pages, six UG
children and three PG children. `reference/programs/` holds nothing else
(`programs/programs/` is an empty directory).

**All fourteen brochure popups match their reference** on panel box,
close-button box, contents, widget-container box, max-width, max-height, radius
and padding — verified together after every change, which is what caught the two
misses on /programs/programs-list-integrated.

**`ProgramList` ended up carrying five capabilities**, each added by the page
that first needed it and each a no-op on the pages before it: `withBreaks` on
the entry title, a section-level `brochure`, `values[]` for a multi-line
eligibility cell, per-entry `eligibilityRows`, and a rich value that is an array
of text/`{strong}` runs. Nothing else on any of the eleven content pages needed
a new component.

**Every Programs page's only remaining diffs are the shared FAQ's three
buckets** — the benign Bootstrap residue, the two deliberate `.accordion-title`
divergences. (The 2px-vs-1px divider that used to sit here was resolved on
2026-10-24 — see /programs/ug/ug-design-and-innovation.)

## Route-transition loader — `components/ui/PageLoader.js`

The ATLAS logo animation, shown while an in-app route change is in flight. One
shared implementation, mounted once as the last child of `<body>` in
`app/layout.js`. `reference/assets/images/loader/atlas-logo-animation.gif` is
copied byte-for-byte (SHA-1 verified) to
`public/assets/images/loader/atlas-logo-animation.gif` and that local path is the
only reference to it anywhere in the source.

**The GIF is 130x130, 122 frames, one loop = 4.38s, and its background is
transparent.** That last part decides the design: the mark is teal + indigo with
no ground of its own, so it needs a light surface to read against.

**How a navigation is detected.** A single capture-phase `click` listener on
`document`. It never touches the link, so `SmartLink` and every `<a>` on the site
behave exactly as before — the listener only observes. It arms only for a plain
left-click, not `defaultPrevented`, on an `a[href]` with no `target`, no
`download` and no `rel="external"`, whose href resolves to this origin over
http(s) and to a different path than the current one. Instagram / YouTube /
LinkedIn / Facebook, `mailto:`, `tel:`, `href="#"`, in-page anchors,
ctrl/meta-clicks and same-page clicks are all verified not to arm it. It hides
when `usePathname()` reports the new route.

**`usePathname` only, never `useSearchParams`** — the latter opts every route
into dynamic rendering unless wrapped in Suspense, and this project has already
been bitten by a client hook flipping the homepage from static to dynamic. All 26
routes still build `○ Static`.

**Two thresholds keep it from flickering.** `SHOW_DELAY` (140ms) means nothing is
rendered until a navigation has been pending that long; `MIN_VISIBLE` (500ms)
means once it is on screen it stays. On localhost with no throttling, four
consecutive Home -> About Us navigations produced **0 loader mutations** — the
overlay never mounts when it is not needed. `SAFETY_MS` (8s) takes it down if a
navigation is abandoned.

**The warmed image is held at module scope, and that is not optional.** The
overlay only mounts once a navigation is underway, so an un-cached GIF starts
downloading exactly when the connection is busiest — measured under a 1500ms
latency profile, the veil painted with **no mark in it at all**
(`naturalWidth === 0`). `public/` is served `cache-control: public, max-age=0`,
so even a warmed-then-released image would wait on a revalidation round-trip.
Warming on `requestIdleCallback` *and* retaining the decoder gives
`naturalWidth === 130` at every width under the same profile.

**Design.** No new colour, radius, font or spacing token. `bg-white/95` over
`backdrop-blur-[3px]` veils the outgoing page instead of replacing it, so the
page stays faintly readable underneath; the mark sits in a 420px radial halo of
`atlas.teal` at 10% — the brand colour the mega menu already uses for its hover
underline. `z-2000` is the existing overlay tier, above the fixed header bars at
1090/1100, and being a direct child of `<body>` avoids the `CONTAINER`
(`relative z-[1]`) stacking-context trap that portals exist to dodge elsewhere.
The GIF is never scaled **up** — 130px, dropping to 104px below 480 — so the
frames stay crisp and square at every width.

**Scroll lock without clobbering the drawer.** `Header` holds `overflow-hidden`
on `<body>` while its mobile drawer is open, and that drawer does **not** close
on navigation. So the loader removes the class only if it was the one that added
it; verified that a navigation started with the lock already held leaves it held.

**A plain `<img>`, not `next/image`** — this is an animated GIF, which the
optimiser either passes through or flattens.

Verified at 1920 / 1440 / 1280 / 1024 / 768 / 390 / 360: overlay covers the
viewport, mark square and centred to within a pixel, zero horizontal overflow,
exactly one overlay at a time, never stuck, and no React or hydration warnings on
any of nine pages.

## Schools — `reference/schools/`

Each school is a separate site upstream, with its own `assets/include/header.php`
/ `footer.php` / `dynamic.php`. Built one school at a time, header first, then
footer, then pages. `$domain` is `/schools/<school>/`, `$ogdomain` is `/`.

**The ATLAS chrome steps aside on `/schools/*`.** `app/layout.js` wraps the
ATLAS `Header` and `Footer` in `components/Schools/MainSiteOnly` (a
`usePathname` guard — every route still prerenders static), and each school's
`app/schools/<school>/layout.js` mounts its own. A route group was the
alternative and was rejected: it meant moving every finished route.

### ISDI header — `components/Schools/ISDI/Header/`, `lib/schools/isdi/navigation.js`

Port of `reference/schools/isdi/assets/include/header.php` plus the header half
of its footer.php. Mounted once in `app/schools/isdi/layout.js`, so later ISDI
pages get it for free. `/schools/isdi/page.js` is an empty placeholder until the
homepage step.

**Measure production, not the mirror.** The mirror's `dynamic.php` points
`$domain` at `http://localhost/atlasskilltech/…`, so every ISDI asset 404s
locally. `https://atlasuniversity.edu.in/schools/isdi/` serves identical CSS and
markup. It rate-limits (429) parallel Playwright runs — probe it sequentially.

**Poppins is never loaded by the ISDI reference.** Its only Google Fonts request
is `family=Inter`; the text renders in Poppins only on machines that have it
installed (this one has Medium/SemiBold/Bold, so weight 400 renders as Medium —
verified with CDP `getPlatformFontsForNode`) and in Arial everywhere else. The
port self-hosts a separate family, `'Poppins ISDI'` (`font-poppins-isdi`), with
exactly 500/600/700 faces so 400 resolves to Medium. It is a separate family
because adding a 600 face to `'Poppins'` would move `.cr-title.isdi` on
/advantages/atlas-advantages off the 700 face it renders today.

**Same chassis as the ATLAS header, deliberately not shared.** The scroll script
is whitespace-identical, so `useStickyHeader` is reused. Everything else differs
somewhere (pink `#ec1376` bar with a left-pinned "ATLAS SkillTech University"
link, `#d20158` buttons with no hover state, a third 650px menu level, a 600px
panel, borders/shadow kept on mobile, the close icon inverted 768-991, drawer
title 10px closer to its arrow), so it has its own styles and components.

**Things only a measurement found:**
- `.mega-menus` has one empty `.w-embed` flex child after "Contact Us" (its
  sibling `<script>` embed makes no box). `justify-content: space-around` gives
  it a share of the free space, which sets every gap in the nav row — hence the
  empty `<div aria-hidden>` there.
- `.header` is `position: static`; its `z-index: 1000` creates no stacking
  context.
- Rows are nested exactly as upstream (a row's child `<ul>` lives *inside* the
  row), because the hover rules target the `<li>`: pointing into level 3 keeps
  the level-1 and level-2 rows pink. Clicking empty space in an open level-3
  panel closes level 3 only — verified on production, and it falls out of the
  same nesting.
- On scroll, header.php slides both bars away (0.5s). 24 of the 60 ISDI pages
  (index.php and the programme pages) carry a body embed with
  `.hide { display: none !important }`, which makes the bars vanish instantly
  instead. Same end state; handle it in the page step if it matters.

**Deviations (all documented in `ISDIHeader.js`):** one 992px viewport
threshold (upstream sniffs the User-Agent and renders the whole menu inline under
the logo bar at 769-991); drawers placed at y=81 but sized to the viewport
(upstream they run 81px past the bottom); hover desktop-only (upstream's
`min-width: 567px` hover collapses a tapped drawer row to 33px); menus close on
route change; Escape and body scroll lock as in the ATLAS header.

**Assets.** Logo SVG byte-for-byte. The five PNG panel photographs (490-627KB,
1023px wide but shown ~2.2x upscaled) are WebP q95 (84-122KB, SSIM >= 0.99 at
display size); the two that were already WebP are copied as-is. Only the 1023w
candidate ships — at >= 992px a `sizes="100vw"` srcset never selects the 500/800w
files. Icons reuse `public/assets/icons/*` (byte-identical) and the contact arrow
reuses `images/international/think/arrow-top-rt-blk.svg`.

### ISDI footer — `components/Schools/ISDI/Footer/ISDIFooter.js`, `lib/schools/isdi/footerContent.js`

Port of `reference/schools/isdi/assets/include/footer.php` (identical on
production). Mounted after `{children}` in `app/schools/isdi/layout.js`. Not the
ATLAS footer's shape at all: a pink (#df287b) 40% contact column beside a blue
(#1f4aa0) 60% panel painted with `footer-vector.png`, logo top-right and four
social icons bottom-right. Stacks at <=767 (the panel becomes a centred
`space-around` row, gap 40) and wraps at <=479 (+40px left padding). Nothing else
changes with width — every other difference is content reflow.

**Transcribed as authored, not "fixed":** the email is `<a href="#">` (no
`mailto:`), and the four social icons are bare `<img>`s with no anchors, so they
link nowhere. Production's Cloudflare email obfuscation is a CDN artefact of the
same address.

**`VideoModal` moved with it.** footer.php carries the same `data-video` modal as
the ATLAS footer, and the ATLAS footer is not rendered on /schools/*, so
`ISDIFooter` mounts the existing `components/Footer/VideoModal` unchanged — one
modal per page on every route, verified across client navigation both ways.
ISDI's own script embeds youtube.com; the shared helper uses youtube-nocookie.com.

**Assets.** Six images, all CDN-only upstream. Four (the social icons) are
byte-identical to `public/assets/icons/social-{x,instagram,youtube,linkedin}.svg`
and are reused; the logo (3.5KB) and `footer-vector.png` (17KB) are small and
alpha-transparent, so they are copied byte-for-byte to
`public/assets/images/schools/isdi/footer/`.

**Pixel-comparing an element under a fixed header:** hide the header with
`display: none`, not `visibility: hidden` — the header's `transition-all`
animates visibility, so a 300ms wait still captures it.

**On the empty placeholder page** the footer's 56px top margin collapses through
the zero-height header root and `<main>`, so the page starts 56px down and the
fixed header covers the footer. Both disappear once the homepage has content.

### ISDI homepage — `app/schools/isdi/page.js`, `components/Schools/ISDI/Home/`, `lib/schools/isdi/home/`

`reference/schools/isdi/index.php` (+ `assets/include/pathfinder.php` and
`assets/include/faq/isdi/homefaq.php`) in 23 top-level blocks, in order: hero,
awards, outcomes heading, outcomes stack, The Action never stops!, Beliefs, Our
Programs (+ PathFinder quiz), Choose Your Minor, Choose your Electives, Class of
2025 banner, Our Halls attract the Remarkable, FAQ banner, ISDI in Motion, Why the
industry can't get enough, figures band + logo strip, Advisory Board, Your Future
In Action, Think International, Ready to Build, The People Who Know Us Best,
Research & Reflections, guide panels, FAQ. Each block root carries `data-block`.

**Measure production, not the mirror.** The mirror's `$domain` is broken; every
section was dumped from `https://atlasuniversity.edu.in/schools/isdi/` at
1440/1280/991/767/479/390 and diffed element by element. Section heights match
within 1.5px at every dumped width except the documented deviations below.

**ISDI's sheet is not the ATLAS sheet.** `.isdi-page .section` is 50px top and
bottom at every width (header.php), the pill tabs' current colour is #d20158,
slider dots are `inline-block` with `margin: 0 8px`, cards take a 16px radius
from a generic `.isdi { border-radius: 16px }`. Hence ISDI-local pieces
(`MintTabStrip`, `QuoteCard`, `PinkBanner`, …) rather than skinning shared ones.

**Shared components, additive only:** `Carousel` gained `bullets="isdi"` (in-flow
row, `.common-swiper`) and `"isdi-overlay"` (absolute, 30px under the slider,
`.common-swiper-full`); `PrimaryButton` gained `pink`/`blue`; `ButtonRegular`
gained `pink`/`pink-cta`; `FAQ` list items may be run arrays (`<b>Label:</b>
text`). `Life/ZoomSlider` is reused unchanged for "ISDI in Motion" — ISDI's
zoom-slider CSS block is byte-identical. Every existing route re-checked after.

**Webflow tabs follow the current *link*, not the active pane.** "Choose Your
Minor" marks link "Tab 5" current and pane "Tab 1" active; production opens on
Tab 5. **ISDI's `initCommonSwiper` has no autoplay** — `autoplay={false}` on every
ISDI carousel. **The logo strip is IX2 `a-22`** (the existing `animate-slide-wrap`).

**PathFinder** is a full client port of the jQuery quiz in footer.php; its score
tables were diffed programmatically against the source. The results for a fixed
set of picks match production's.

**Deviations (each in its component header):** Instagram grid instead of the
cross-origin iframe (as the ATLAS homepage); 568-767px testimonial cards held to
the container width (reference blows out to ~1014px); videos play when in view
rather than all at once on load; `href="#home-faq"` (no such id) points at `#faq`;
one advisory href authored `#https://…` is the video URL; the FAQ keeps the shared
2px #eee divider the ISDI sheet draws, which this component now renders site-wide
(resolved 2026-10-24), and ATLAS section
padding offset by a wrapper; Manrope text (tabs, badges) uses the self-hosted
Manrope — production loads no Manrope and falls back to the system sans-serif.

**Assets.** 9 of the minor posters are soft-404s on production (HTML with 200) and
are not shipped. The 19 minor clips were remuxed to faststart (stream copy, no
re-encode). Re-encoding the hero videos saved <25% at SSIM 0.99 and was not
applied. Research photos (up to 2560px, shown at 293x298) are 640px WebP q90;
the 2.1MB drum GIF is a 900px animated WebP (1.15MB). The People Who Know Us Best
reuses the ATLAS parent-testimonial videos (byte-identical).

**Two shell traps hit here:** a bash heredoc collapses `\` and `\n` inside the
script body, which silently corrupted generated JS and JSON twice — write scripts
with the editor. And a Playwright `scroll_into_view_if_needed` never settles on an
element inside a running CSS marquee; scroll its section with `scrollIntoView()`.

### ISDI About — `app/schools/isdi/about-us/page.js`, `components/Schools/ISDI/About/`, `lib/schools/isdi/about/`

`reference/schools/isdi/about-us/index.php` (`$css = "…68e7936f141c3283f461d766-366cfd569.css"`,
`$body = "body isdi-page"`) — the target of the ISDI header's "About Us" menu. Seventeen blocks:
hero (background video), three figures, the sticky anchor menu, Mission/Vision, Our Story (YouTube),
Shaping a Viksit Bharat, Recognition (4 tabs), Leadership Team, The ATLAS Advisory Board, The ISDI
Advisory Board, Our Management Team, In The Heart of Mumbai, Thought Leadership, ATLAS Times, Press
Coverage, More questions?, FAQ. Measured on production (standards mode) at six widths; every block but
the FAQ matches its production height to the pixel at all six.

**Two wrappers are kept for their ids.** `#our-mission` wraps Story/Shaping/Recognition and
`#our-leadership` wraps Leadership + both boards + Management. The menu's scroll-spy measures
`#our-leadership` as that whole group, exactly as Webflow's `links` module does (a link is current while
its section overlaps the middle of the viewport, so two can be current at once).

**The sticky menu's position lives in ISDI header.php, not the sheet:** sticky top 156 / z 900 from 992
up (top 0 under `body.hide-header`, via `lg:[body.hide-header_&]:top-0`), static 569-991, sticky top 80
/ z 9 at <=568.

**Reuse, all additive:** `Home/AdvisoryBoard` gained `variant="isdi-black"` (overlay-blk scrim, pink name
label, grayscale portrait in an isolated card), `block`, and `data.playAlt` / `data.playLabel`;
`Home/InViewVideo` gained `sources` (mp4 + webm); `Carousel` gained `bullets="isdi-light"` (header.php
paints bullets white inside `.blue-wrapper`); the card-a markup moved out of `Home/Research` into
`components/Schools/ISDI/CardA` (`isdi` + `type-a`), used by Research, Thought Leadership and ATLAS
Times. The FAQ is FAQ master 1 — diffed against production and identical to
`lib/designInnovationContent.js`'s set, so it is re-exported with the ISDI arrow.

**Assets.** 188 references: 110 byte-identical files already in `public/` reused (SHA-1), 78 new under
`public/assets/{images,videos}/schools/isdi/about/`. `NAAC-Accredited (1).png` has a `)` in its name —
the live-scan regex truncated it; match the quoted form. `dr-shahani-video.mp4` was an unsmudged LFS
pointer and was restored from the CDN (blob id equals HEAD). ATLAS Times ships only the <=1080w
candidates with `sizes="450px"` (the reference asks `100vw` for a 295px card). Re-encoding the hero video
made it larger (8.4MB vs 7.8MB), so every video ships byte-for-byte; all mp4s were already faststart.

**Deviations:** the shared FAQ's known buckets (1px divider, no `.accordion-title` 50px margin — 22px
shorter over 24 items); the YouTube iframe is `loading="lazy"`; the menu's smooth scroll is the browser's
native one rather than Webflow's eased animation.

### ISDI Undergraduate Programs — `app/schools/isdi/programs/undergraduate/page.js`, `components/Schools/ISDI/ProgramsUg/`, `lib/schools/isdi/programs-ug/`

`reference/schools/isdi/programs/undergraduate/index.php` (`$css =
"…68d31171d52107256a18f4d5-1c2f7c659.css"`, `$body = "body isdi-page"`) — the ISDI header's
"Programs > Undergraduate Degree > Overview". Ten blocks: the four-slide hero, the pathfinder
include, "Why Design At ISDI?" + #1 Industry Leaders, #2 Where India Does Business, #3 Launch
Before They Graduate, the startup logo strip, #4 The World at their Fingertips, #5
Multidisciplinary, "More questions?", FAQ. Measured on production at six widths; every block but
the FAQ matches its production height to the pixel at all six.

**Block 1 is `assets/include/pathfinder.php` — the file the homepage already ports.** The homepage
renders it inside its Undergraduate tab, this page includes it bare in a `section.section >
.container`, so `Home/Programs` exports `UndergraduatePane` and the page reuses it with
`isdiPrograms.ug` + `isdiPathfinder` unchanged (heading, seven programme cards, PathFinder card and
quiz — including the card links to the not-yet-built B.Des pages).

**Reuse, all additive:** the `.instagram-wrapper > .grid-gallery-flex` wall moved out of
`Home/FutureInAction` into `components/Schools/ISDI/PhotoGallery` (badge / caption / logo all
optional) and serves #3 and #4; `Home/Electives` exports `ElectiveCard` for the two `.isdi-elective`
cards #5 closes with; `Home/MintTabStrip`, `Carousel`, `ButtonRegular`, `About/MoreQuestions` and the
site-wide `FAQ` are used as they are. The hero is its own component — the same progress-ring Swiper
as the homepage's, but photographs with an eyebrow and no buttons, on a 10s delay with 68px rings.
`.port-card-m-wrap.isdi` is **not** `components/ui/PortCardM` (that is `-atlas`: 295x520, `32px 0`,
indigo); this one is 295x480, r16, with a pink/blue bar and a notch.

**`.black-desc-text.mrgbtm.isdi` keeps 24px below 768** — a compound selector (0,3,0) beating the
`@media … .black-desc-text { font-size: 18px }`, while the plain `.black-desc-text.isdi` under #1 does
drop. Fourth instance of that trap in the rebuild; it was worth 96-224px of section height.

**Two authored `height` attributes in the logo strip** (50 and 150) are cancelled by Preflight's
`img { height: auto }` and are restated inline — without them the strip is 119px tall instead of 210.
The strip authors its seven logos twice, so its React key carries the index.

**One minor card is authored with no image.** The fifth card of "Human-Centered and Social Design"
has only a caption, so the reference paints a 298 x 0 slide; rendering the card imageless reproduces
that (and `card.image` is optional, which is what stopped it throwing).

**Assets.** 88 references: 20 already local (the homepage's eight "Your Future, In Action"
photographs among them, by CDN URL), 68 new under
`public/assets/images/schools/isdi/programs-ug/<section>/`. 47 of them are WebP conversions at
SSIM >= 0.999 (13MB -> 2.9MB; the four hero photographs alone were 7.7MB), the other 4 kept their
original encoding because WebP saved too little.

**Deviations:** the shared FAQ's known divider bucket (7 items, ~5px); and the two `.isdi-elective`
cards ride the standard ISDI carousel, which aligns its track to the container inset, where the
reference's Swiper centres that one row (3px at 1440, 18px at 390).

### ISDI B.Des in Accessory Design & Craft — `app/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft/page.js`, `components/Schools/ISDI/ProgramDetail/`, `lib/schools/isdi/programs-bdes/accessory/`

`reference/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft.php` — the first of
the twelve B.Des programme pages, the target of the ISDI header's "Programs > Undergraduate Degree >
B.Des". Twelve blocks: hero (a 3-slide ring carousel), the three figures, the programme tab set +
"Our Globally Benchmarked Curriculum" (one `section.section.extraspace`), "Admissions — The Design
Way", Eligibility, "Why Accessory Design & Craft at ISDI x Parsons" (a 5-card sticky stack), "Where
concepts meet execution", "Student Projects in Motion", "Student Voices", the closing band, "More
questions?", FAQ. Measured on production at 1440/1280/991/767/479/390; every block matches to the
pixel at 1440 except the FAQ, and the only other deltas at any width are the four deviations below.

**`$body` is plain `body`, so the ISDI 50px section padding does NOT apply here** — this page's
sections take their padding from the sheet, and the two sections that differ (`.section.extraspace`,
the blue `.section.blue-bg` with its 60px bottom margin) carry it themselves.

**The elective dropdowns are Webflow dropdowns, not Bootstrap accordions.** `DROPDOWN_OPEN` runs
IX2 `a-20` (height -> auto, icon 180deg, 100ms) and `DROPDOWN_CLOSE` runs `a-21` (height -> 32px).
a-20's first group is the initial state and declares **32px** — but production writes an inline
`height: 80px` at load, so a closed dropdown there shows the first elective's title and half a line
of its description clipped mid-glyph, and settles at 32px after one open/close. The authored intent
is unambiguous, so the port renders 32px closed. That is worth **-96px** on the programme block at
every width below 1440 (two dropdowns x 48px), and nothing at 1440, where the semester row's height
comes from the video column instead.

**`flex: 3 auto` plus `width: 100%` is not the same as `flex: 3 auto`.** `.comp-table-wrap` declares
both, and the `width` is what sets its flex base to 100% of the row; without it the comparison card
took half the width, the panels shrank and the text gained two lines. Its sibling
`.comp-control-wrap` is sized by the heading's **authored `<br>`s** — drop them and the max-content
base goes from 615 to 965 and the whole card re-proportions. **A `<br>` can be layout, not just a
line break.**

**`.comp-table-wrap` is authored twice, one inside the other, and that is not inert:** each carries
`margin-top: 10px` at <=479, so the pair really is 10px taller than a single wrapper. Reproduced.

**Four extraction bugs this page surfaced, all of them in how text was read:**
- **A source newline is a space; only `<br>` is a line break.** The transcriber was emitting `\n`
  for both, so every multi-line source paragraph gained real breaks — worth 24px per false break in
  the eligibility list alone.
- **`get_text()` flattens `<br>`**, which is how the comparison headings lost the breaks that size
  their column.
- **A `.sub-portion` is not an `li`.** The elective dropdowns' contents were selected as
  `li, .drop-list-item, .desc-text-1` and came back empty — 47 electives silently missing.
- **A section can have a whole column nobody selected.** The eligibility block's right-hand
  Application Fee / Fee Structure / Loans column was never extracted, because the query stopped at
  `.elig-point-wrap`. **Diff the rendered block against the reference early** — the height diff is
  what found it.

**The stylesheet paints six backgrounds this page needs and the markup names none of them**
(`pro-bg-1/2` on the stack panels, `Vector--0/--d` on the execution cards, `comp-vector(-2)` on the
comparison card). They are enumerated off the live DOM by `scratchpad/bdes/cssbg.py` and folded into
the URL manifest by `extract.py` itself, so a re-run cannot drop them again.

**Do not re-run the asset downloader after the optimisers.** `assets.py` writes the original bytes,
`optimise.py`/`optimise_video.py` replace them in place — so any later `assets.py` run silently
restores the unoptimised originals (it happened twice here, once putting 62MB of video back).
Download first, optimise last, and check `du` before calling it done.

**Assets.** 168 paths: 5.0MB of images and 38MB of video under
`public/assets/{images,videos}/schools/isdi/programs/b-des/accessory-design-craft/`. The four Student
Voices clips are re-encoded (100MB -> 38MB, SSIM 0.982-0.989); everything smaller ships as
downloaded. 15 poster URLs are soft-404s on production (HTML with status 200) and are not shipped —
those clips render without one, exactly as the reference paints them. Four of the six CSS-painted
files turned out byte-identical to the About page's and are reused.

**Shared components, all additive and all re-verified on their origin pages:**
`components/Schools/ISDI/PersonCard` (the ISDI `.card-type-d`, extracted from `Home/AdvisoryBoard`
so the Success Stories tab can render it in a carousel); `MintTabStrip` gained `spacing="wide"` (the
bare `.tabs-menu-mint`: gap 48, -73 bleed, 70 padding, and the asymmetric -41/-73 the sheet really
declares at 767); `PhotoGallery` gained the `isdi-2` caption (no plate, a 6px #ec1376 rule, 20px in);
`InViewVideo` gained Webflow's own play/pause control; `SectionHead` gained `SUB_INNER_MRGBTM32`;
`SecondaryButton` gained `isdi-pink` and `ButtonRegular` `isdi-outline-white`.

**`PrimaryButton` now accepts `outline-white`, the reference's own name for `outline`.** An unknown
variant key yields no classes at all, so the button renders as unstyled text — the same silent
failure /admissions/integrated-admissions hit. It is an alias now, not a trap.

**Two shared components had their base class string split per variant** (`ButtonRegular`'s radius,
`SecondaryButton`'s colour) because a variant needed a different value: two utilities of the same
kind in one class list are resolved by **stylesheet order, not by the order they are written**.

**Deviations (each recorded in its component):** the elective dropdown's 32px closed height
(above); the shared FAQ's known divider/`.accordion-title` buckets; `.career-sup-card` and
`.testimonial-card` held to the container width between 568 and 767 where the reference blows out to
1989px and 802px (+89.5 and +24 there); and the stack descriptions use the self-hosted Manrope where
production declares Manrope without loading it, which costs one wrapped line on the first card at
479px.

### ISDI B.Des in Animation, VFX & Gaming — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming/page.js`, `lib/schools/isdi/programs-bdes/animation/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming.php` —
the second of the twelve B.Des programme pages, the next item in the header's own B.Des list. The
**same twelve blocks in the same order** as the Accessory Design & Craft page, so every component
in `components/Schools/ISDI/ProgramDetail/` took it as data and nothing new was written for it.
Measured on production at 1440/1280/991/767/479/390; every block matches to the pixel at 1440 and
1280 except the four deviations the Accessory page already documents.

**Confirm the template before assuming it.** The block list, the tab sets, the year tabs and the
popups are identical, but four things differ and all four are content:
four years of **two** semesters each with electives only in Year 1 (the Accessory page's Year 4 has
four); 7 / 6 / 12 cards and 6 people in the tab panes; 4 and 6 execution cards; **one** Student
Voices card; nine FAQ items.

**Three shared-component gaps this page found, two of them latent bugs on the page before it:**
- **"Download Curriculum" is a brochure trigger, not a link.** It is authored `href="#"` with
  `data-id="download-brochure"` on **both** B.Des pages — the Accessory port shipped it as a dead
  link because only its `href` was read. `Curriculum` now takes `brochures`, `BrochureButton` takes
  a `shape` (the `.button-regular` pill as well as the `.btn-primary` one), and `ButtonRegular`
  renders a real `<button>` when given an `onClick`, exactly as `PrimaryButton` already did. Fixed
  on the Accessory page too. **Read `data-id` on every `href="#"`.**
- **The stack card titles carry authored `<br>`s.** All five here, none on the Accessory page, so
  `WhyStack` now runs them through `withBreaks` — the fourth section to hit that trap.
- **This page's "More questions?" block has an `h2` above the panel.** The include is
  byte-identical; the *section* adds `h2.h2-tag.mrg16.isdi` ("Questions? We can read your mind",
  the FAQ's heading again), which is 68.8px the Accessory page does not have. `MoreQuestions` takes
  an optional `data.heading`.

**An element the reference omits is not an element the reference leaves empty.** This page's single
Student Voices card has no `.st-course` at all, where every other card on the site authors one (the
ISDI homepage's first card authors an **empty** `.stname`, which must still render for its 5px). So
`QuoteCard` renders the cohort line only when the data carries one — the mirror image of the
"an empty element is still a box" rule, and both are live in the same component.

**Assets.** 137 paths: 119 new under
`public/assets/{images,videos}/schools/isdi/programs/b-des/animation-vfx-gaming/` (3.4MB of images,
31MB of video) and 18 reused — the Accessory page's admissions icons, both comparison washes and one
stack photograph among them. Four clips were re-encoded (76MB -> 31MB, SSIM 0.979-0.990); no poster
is a soft-404 on this page, unlike the Accessory page's fifteen. Every deduped file was re-fetched
and compared: 17 byte-identical, and the eighteenth is the same photograph at the same dimensions
through its WebP conversion (RMSE 2.07).

**Deviations:** the same four as the Accessory page — the elective dropdown's authored 32px closed
height (-96px on the programme block below 1440, -88 at 991), the shared FAQ's buckets, the
568-767px card blow-out held to the container width (+89.5 and +24 at 767), and the self-hosted
Manrope in the stack descriptions (+25.8 at 479).

### ISDI B.Des in Communication Design & New Media — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media/page.js`, `lib/schools/isdi/programs-bdes/communication/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media.php`
— the third of the twelve B.Des programme pages. The same twelve blocks in the same order as the
other two, the same two brochure widgets, no new component. Measured on production at six widths;
every block matches to the pixel except the four deviations the set already documents.

**Three more places where one page's copy is line-broken and the others' is not.** The template is
identical, the *content* is not, and each of these was worth 20-54px:
- the Overview pane's text carries an authored `<br><br>` (a real blank line), so `ProgramTabs`
  runs it through `withBreaks` — 54px, and the fifth component in the rebuild to need it;
- the admissions lead carries `.sub-heading.mrgbtm-0`, which zeroes its bottom padding **only at
  <=479** — hence `data.subFlush` on `Admissions`, +20px at 479 and 390;
- all five stack titles break (as on the Animation page).

**Check the modifier classes on a shared include, not just its text.** The eligibility band,
"More questions?" panel and banner are byte-identical to the Accessory page's, but the admissions
lead differs by one modifier — a difference no text diff would have shown.

**Assets.** 178 paths, and only **51** are new (1.1MB of images, 20MB of video under
`…/b-des/communication-design-new-media/`). **118 are already on disk under
`…/b-des/accessory-design-craft/`** — the Accessory page cites this programme's own URLs for its
Faculty, Success Stories, projects and Student Voices, so those files were downloaded under its
folder first and are shared rather than duplicated. The folder name is therefore not a reliable
guide to which page an ISDI B.Des asset belongs to; the manifest is. Eight semester posters are
soft-404s and are not shipped, and `optimise_video.py` correctly declined to re-encode the shared
clips a second time (they are already under its 40% gate).

### ISDI B.Des in Fashion Brand Management — `app/schools/isdi/programs/undergraduate/b-des/fashion-brand-management/page.js`, `lib/schools/isdi/programs-bdes/fashion-brand/`

`reference/schools/isdi/programs/undergraduate/b-des/fashion-brand-management.php` — the fourth of
the twelve B.Des programme pages. The same twelve blocks, the same two brochure widgets, **no new
component and no component change**: the first of the set to need nothing but data. Measured on
production at six widths; every block matches except the four deviations the set documents (and the
programme block matches exactly at 1440, where the semester row's height comes from its video).

**A soft-404 can be a video source, not just a poster.** Eight of this page's semester clips author
a `.webm` production does not have — it answers HTML with status 200 — so the browser falls through
to the `.mp4`, which is what plays there. `gen_data.py`'s `V()` now drops an unfetchable **source**
the same way it drops an unfetchable poster, and treats a clip that loses *every* source as an
error rather than a silent empty `<video>`. Twenty-three of this page's media URLs are soft-404s in
total. (The same fall-through the /admissions/pg-admissions testimonial already documents, from the
other side: there the mp4 was the dead one.)

**Two upstream copy-pastes, transcribed as authored:** the sticky stack's heading reads "Why Design
Engineering at ISDI x Parsons" on a Fashion Brand Management page, and the meta description is the
Communication Design page's word for word.

**Assets.** 163 paths and only **36** new (1.2MB of images, 15MB of video); 118 were already on
disk under `…/b-des/accessory-design-craft/` and 9 elsewhere. That folder now holds the shared
imagery for four B.Des pages — **read the manifest, not the folder name**, to tell which page an
ISDI B.Des asset belongs to.

### ISDI B.Des in Fashion Communication & Styling — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling/page.js`, `lib/schools/isdi/programs-bdes/fashion-communication/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling.php`
— the fifth of the twelve B.Des programme pages. The same twelve blocks and the same two brochure
widgets, but the first one whose **sticky stack is built differently**, so `WhyStack` grew two
capabilities. Measured on production at six widths; every block matches except the four deviations
the set documents.

**The stack is nested inside the heading's `.container` here, and a sibling of it on the other
four.** That is not cosmetic: nested, the cards take the container inset twice and measure 297px
at 390 rather than 341. `WhyStack` takes `data.nested`, and the extractor decides it by asking
whether `.page-wrapper-stack` is a descendant of a `.container`.

**Two palettes paint that stack, and they differ in more than colour.** The other pages use
`.outcome-content.pro-bg-1..4` (a colour under a stylesheet-painted vector); this one uses the ISDI
homepage's `.isdi-1..3` — flat #d20158 / #0038b1 / #ec1376 with **no wash at all** — and each
variant carries its own gap (21 / 40 / 30, 40 from 1440) and its own mobile padding (26/25 against
26/20). The panel therefore travels as a named variant plus its colour, and the generator falls
back to `pro-bg-1` only when a card names neither palette.

**A quality gate has to be calibrated against the source, not a constant.** `semester-5` is a
1080p 82-second moving aerial shot: it scores SSIM 0.93 against a **near-lossless** re-encode
(CRF 24, native resolution), so the flat 0.95 gate could never pass it however carefully it was
encoded, and it would have shipped 83MB of video for a card that renders 418px wide. Frames pulled
from both at display size are indistinguishable — the score is the clip's own grain and motion.
`optimise_video.py` now measures that ceiling when a clip fails, and where the ceiling is itself
below the gate it accepts anything within 0.02 of it. That one clip went 83MB -> 11.5MB, and the
page's video from 122MB to 54MB.

**A URL split across two source lines survives a careless retarget.** `interact.py`'s URL is
written as `'…/b-des/'` + `'<slug>'`, so cloning the harness for a new page replaced nothing and
the suite silently re-tested the *previous* page — it reported 41/41 against the wrong URL. Every
page's harness now names its own slug, and the Fashion Brand Management run was repeated against
its own page (41/41). **Check what a cloned harness is actually pointing at.**

**Assets.** 164 paths, 150 new (4.0MB of images, 54MB of video) and 14 reused. One poster is a
soft-404. Its "More questions?" block carries the `h2` heading, as the Animation page's does.

### ISDI B.Des in Fashion Design & Technology — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology/page.js`, `lib/schools/isdi/programs-bdes/fashion-design/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology.php` —
the sixth of the twelve B.Des programme pages. The same twelve blocks, the same two brochure
widgets, the `pro-bg-*` stack palette and the bare "More questions?" include, so every structural
capability the set already has covered it. Measured on production at six widths; every block
matches except the four documented deviations.

**One more `withBreaks` gap, and it is the sixth.** This page breaks several `.career-sup-card`
titles ("Sensorium-Graduate<br>Fashion Show"), which `Execution` was printing as one line — worth
23px per wrapped card and −23.4px on the section at 479. Its descriptions now run through
`withBreaks` too. **Assume every piece of copy on an ISDI page may be line-broken**; the components
that print raw text are the ones to check first when a section is exactly one line short.

**`.career-sup-card.isdi` adds `border-radius: 16px; overflow: hidden`** where the plain card has
neither — but the image and the caption panel carry their own 16px corners, so the two render
identically and the port needs no variant.

**Assets.** 191 paths, 171 new (4.5MB of images, 31MB of video) and 19 reused; one poster is a
soft-404. Four Student Voices clips re-encoded (28MB -> 5.5MB, SSIM 0.984-0.989).

### ISDI B.Des in Health & Care Design — `app/schools/isdi/programs/undergraduate/b-des/health-care-design/page.js`, `lib/schools/isdi/programs-bdes/health-care/`

`reference/schools/isdi/programs/undergraduate/b-des/health-care-design.php` — the seventh of the
**twelve** B.Des programme pages. (`reference/.../b-des/` holds thirteen files; the header menu
lists twelve of them — `behavioural-design-&-ai.php` is not linked from anywhere in the menu.)

Nothing new: the same twelve blocks, the same two brochure widgets, the `pro-bg-*` stack palette,
the bare "More questions?" include, no component change. Measured on production at six widths;
every block matches except the four documented deviations, and the programme block matches exactly
at 1440.

**Two more upstream copy-pastes, transcribed as authored:** its sticky-stack heading is the
Accessory page's ("Why Design Engineering at ISDI x Parsons") and its meta description is the
Communication Design page's. Its `<title>` is also the odd one of the set — the programme name run
straight into its tagline ("Health & Care Design Designing Innovations That Reach Patients") with
no " – ATLAS ISDI" suffix.

**Assets.** 170 paths, 43 new (1.1MB of images, 24MB of video) and 127 reused — the Student Voices
clips, Faculty and Success Stories are the Accessory page's files again. Fifteen posters are
soft-404s.

**A cloned interaction harness carries the previous page's counts.** This page has four Student
Voices cards where the one before it had three, so the suite failed two assertions until they were
updated — the counts are per page and are the point of the check, so they are worth re-reading
rather than copying blind.

### ISDI B.Des in Interior Design & Built Environment — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment/page.js`, `lib/schools/isdi/programs-bdes/interior-design/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment.php`
— the eighth of the twelve B.Des programme pages. The same twelve blocks, the same two brochure
widgets, the bare "More questions?" include, six FAQ items and two Student Voices cards. Measured on
production at 1440 / 1280 / 991 / 767 / 479 / 390; every block matches except the four documented
deviations, and 41/41 interactions pass.

**Assets.** 158 paths, 75 new and 83 reused; no soft-404 posters on this page. Four Student Voices
clips re-encoded (16.6MB saved, SSIM 0.989-0.991).

**`.swiper-wrapper { align-items: center }`, and a slide that is shorter than its neighbour.** The
Webflow sheet declares it on every page of the site (over Swiper's own `display: flex`), so a slide
shorter than the tallest in the track is **centred** against it, not stretched. Every carousel in the
rebuild until now has had slides of one height, which is why `Carousel`'s `items-stretch` never
showed — this page's "Where concepts meet execution" cards are content-height with copy of different
lengths (521-566px at 390), so the first card sat 33px too high and the block scored a 29.3 mean
pixel diff against a *matching* height. It is `Carousel`'s new `align="center"`, opt-in so no
finished page moves, and passed to `Execution` — which took every B.Des page's execution block from
2.5-5.4 to the same range (a no-op where the slides are equal) and this one to 2.2.

**A screenshot diff can be the only thing that catches this.** Every computed property, the block
height and the card's own box all matched; only the pixels differed. Compare images, not just
measurements — the third time in this rebuild that rule has paid (after `Carousel`'s bleed and
`PrimaryButton`'s unknown variant key).

**Two different source files can clean to the same local filename — and the reuse path hid it.**
`id-stu-work-2-7.png` / `id-stu-work-2--7.png` and two programmes' `benchmarked-curriculum/year-4/
semester-8/1.mp4` are genuinely different bytes under one cleaned name, so whichever was written
second replaced the first and a page showed another page's asset. Three bugs had to be fixed
together in `scratchpad/*/assets.py`, and all three are worth knowing:

- **Disambiguate against an owner, not against the bytes on disk.** The first guard compared the
  file already at that path — which matched each image's own optimised `.webp` twin — and fired on
  ~166 innocent files. The fix is a `claimed = {rel: url}` map seeded from every earlier manifest:
  rename only when a **different** URL already owns the name.
- **A reuse owns its path too.** The guard only ran in the new-file branch, so a URL that reused an
  existing file never recorded a claim and the next URL wrote straight over it. Every reuse branch
  now calls `claimed.setdefault(...)`.
- **An overwrite makes the SHA-1 index stale.** `pub` is built by hashing `public/` once at start;
  after copying new bytes over a path, the old hash still pointed there, so a later URL "reused" a
  path whose content it had never matched. That is exactly how the two semester-8 clips became one
  file. Drop a path from `pub` when you overwrite it.

**`optimise.py` only rewrites the entries under its own page's folder.** A page that reuses an
earlier page's image therefore keeps the pre-optimisation `.png` path in its map, and regenerating
its data silently ships a path that no longer exists. `scratchpad/reconcile.py` repoints any entry
whose file is gone but whose `.webp` twin is present, and must run between the optimisers and
`gen_data.py`. So the pipeline is: **`assets.py` → `optimise.py` → `optimise_video.py` →
`reconcile.py` → `gen_data.py`**, and `assets.py` is never re-run after the optimisers.

**Audit the maps, not just one page.** `scratchpad/dupaudit.py` re-fetches every URL that shares a
local path across all eleven ISDI manifests and compares SHA-1 (3 shared paths, all genuinely
identical), and `scratchpad/orphans.py` lists any file under the B.Des folders that no manifest
claims and no source references (0).

**`net::ERR_ABORTED` on a semester clip is expected.** `InViewVideo` is `preload="none"` and pauses
off screen, so Chromium cancels an in-flight media fetch whenever the clip scrolls past. The file
itself serves 200; the validator ignores aborted media and YouTube's own telemetry beacons.

**A missing key on a fragment, found by the site-wide sweep.** `ProgramsUg/Hero` mapped its slides
into a bare `<>`, so /schools/isdi/programs/undergraduate logged React's duplicate-key warning on
every server render. It is a keyed `<Fragment>` now, as the B.Des hero already was.
`scratchpad/regress.py` runs all 37 routes at two widths for console errors, page errors, failed
requests, broken images, remote hosts and horizontal overflow — 0 findings after the fix.

### ISDI B.Des in Luxury Brand Strategy — `app/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design/page.js`, `lib/schools/isdi/programs-bdes/luxury-brand/`

`reference/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design.php`
— the ninth of the twelve B.Des programme pages. The same twelve blocks, the same two brochure
widgets, the `pro-bg-*` stack palette and the bare "More questions?" include; **no new component and
no component change**. Measured on production at six widths; every block matches except the four
documented deviations, and the programme block matches exactly at 1440 / 1280 / 991.

Content that differs: Year 4 has **four** semesters (electives in Year 1 only, so the closed
dropdown costs -48px rather than -96), 6 / 6 / 31 cards and 14 people in the tab panes, 9 and 9
execution cards, four Student Voices cards and seven FAQ items. Two more upstream copy-pastes,
transcribed as authored: the stack heading is the Accessory page's ("Why Design Engineering at ISDI
x Parsons") and the meta description is the Communication Design page's.

**Assets.** 188 references, 187 mapped (one semester poster is a soft-404) and only **54 new**
(1.7MB of images, 21MB of video). 118 were already on disk under `…/b-des/accessory-design-craft/`
and 6 under `…/fashion-brand-management/`: this page's Faculty and Success Stories are the
Communication Design page's files and its **Curriculum Highlights clips belong to the B.Tech Design
Engineering programme**. 23 images converted to WebP (8.8MB saved); no clip was large enough to
re-encode.

**A page can cite another *degree's* assets, and that broke the folder rule.** `folder()` anchored
its path regex on `…/undergraduate/b-des/<programme>/`, so the six B.Tech clips — every one of them
named `1.png` / `1.mp4` — lost their folder and collided on a single name. The collision guard
caught all ten and renamed them with hashes, which is correct but unreadable; the real fix is to
match **any** programme folder under `undergraduate/`, which restores
`curriculum/<year>-<semester>/1.png`. **A guard firing ten times is a signal that the naming rule is
wrong, not that the guard is working.**

**Two traps in the cloned harness, both silent.** `cssbg.py` still pointed at the *Communication
Design* page (its URL is split across two source lines, the same shape that misdirected page 5's
interaction suite), and `gen_data.py` still emitted `isdiBdesInterior*` export names. Neither fails
loudly. `bdes9/retarget.py` now rewrites the slug in every script and then greps for the old one,
and it reports any `'…/b-des/'` line that ends mid-URL so a split literal cannot hide again.

**Unloading a `<video>` collapses the row it sizes.** `shots.py`'s freeze used to strip every clip's
sources for determinism, which drops the element to the UA's 300x150 default — on this page that
shortened the curriculum block by 777px in the screenshot while the live measurement said the two
sides matched to the pixel. `--keep-video` pauses and rewinds instead, and the block then diffs at
1.04. **A screenshot harness can introduce the very difference it is meant to find.**

### ISDI B.Des in Product Design — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design/page.js`, `lib/schools/isdi/programs-bdes/product-design/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design.php` — the tenth of
the twelve B.Des programme pages, and the one whose short slug really is its own page (the other
short slugs the ISDI pathfinder links to land on a generic fallback upstream). The same twelve
blocks, the same two brochure widgets, the `pro-bg-*` stack palette and the bare "More questions?"
include. Measured on production at six widths; every block matches except the four documented
deviations, and the `why` block matches exactly at 1440 / 1280 / 991.

Content that differs: electives in **both** Year 1 semesters (so the closed dropdown costs the full
-96px), 8 / 7 / 18 cards and 21 people in the tab panes, 9 and 6 execution cards, three Student
Voices cards and seven FAQ items. Its stack heading is its own rather than one of the set's
copy-pastes, and its `<title>` carries a **single** space before the dash where most of the set
carries two.

**Assets.** 187 references, 179 mapped (eight semester posters are soft-404s) and **156 new**
(4.6MB of images, 28MB of video) — the first page since the Accessory page to download more than it
reuses. 55 images converted to WebP (13.5MB saved), 5 clips re-encoded (17.7MB saved, SSIM
0.987-0.992).

**The sticky stack's SECTION heading can be line-broken too.** `WhyStack` ran the five card titles
through `withBreaks` (added on the Animation page) but printed `data.heading` raw, and this page
authors a `<br>` after "Creative" — four lines on the reference at 479, three without it, and 43px
of block height. Fixing it also took the **Communication Design** page's `why` block from -69.9 to
-26.7 at 390, which had been sitting inside the Manrope bucket as if it were a font-metrics
difference. **When a component prints one field through `withBreaks`, check every other field it
prints**; this is the seventh section in the rebuild to need it, and the second time a missing break
hid behind a deviation that was already documented.

**`compute-pressure is not allowed in this document` is YouTube's, not ours.** The embedded player
requests that permission and its iframe's allow-list does not grant it, so Chromium logs a policy
violation from inside the cross-origin frame — on whichever embed happens to load first, which is
why it moved between /about-us and /campus-atlas on consecutive sweeps. `scratchpad/regress.py`
filters it alongside YouTube's telemetry beacons; all 39 routes are otherwise clean at both widths.

### ISDI B.Des in Service & Experience Design — `app/schools/isdi/programs/undergraduate/b-des/service-&-experience-design/page.js`, `lib/schools/isdi/programs-bdes/service-experience/`

`reference/schools/isdi/programs/undergraduate/b-des/service-&-experience-design.php` — the
eleventh of the twelve B.Des programme pages. The same twelve blocks, the same two brochure
widgets, the `pro-bg-*` stack palette and the bare "More questions?" include; **no new component
and no component change**. Measured on production at six widths; every block matches except the
four documented deviations, and at 1440 every block but the hero carousel and the FAQ diffs at
1.2-4.0 mean pixels — the programme block included.

Content: four years whose last has four semesters, electives in both Year 1 semesters (the full
-96px from the two closed dropdowns), 6 / 6 / 31 cards and 14 people in the tab panes, 9 and 9
execution cards, four Student Voices cards and seven FAQ items. Its stack heading is the Accessory
page's and its meta description the Communication Design page's — two more upstream copy-pastes.

**Assets.** 188 references, 187 mapped (one semester poster is a soft-404) and only **12 new**
(892KB of images, no video of its own). Its Curriculum Highlights, Faculty, Success Stories,
projects and Student Voices are all files earlier pages of the set already downloaded — the
smallest download list of any B.Des page.

**A retarget can collapse two different names into one.** `retarget.py` rewrites PAGE, then DIR,
then OUT; on this page DIR (`service-experience-design`) and OUT (`service-experience`) differ, but
the page before it had them *identical* (`product-design`), so the DIR rewrite also caught
`gen_data.py`'s OUT path and the content landed in `programs-bdes/service-experience-design/` while
the index imported `programs-bdes/service-experience/`. Turbopack then answered **500 on every
route**, not just the new one, because an unresolved import fails the whole compilation — so a
sudden 500 on a finished page after adding a new one is a module-resolution error, not a regression
in that page.

### ISDI B.Des in Strategic Design & Innovation Management — `app/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management/page.js`, `lib/schools/isdi/programs-bdes/strategic-design/`

`reference/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management.php`
— the twelfth and **last** of the B.Des programme pages. The same twelve blocks, the same two
brochure widgets, the `pro-bg-*` stack palette and the bare "More questions?" include. Measured on
production at six widths; every block matches except the four documented deviations.

Content: four years of two semesters with electives in both Year 1 semesters, 6 / 8 / 23 cards and
12 people in the tab panes, 8 and 6 execution cards, **eight** project photographs where the rest of
the set has sixteen (so its projects block is 948px at 1440 rather than ~1678), three Student Voices
cards and seven FAQ items. Its stack heading is its own, and its `<title>` names the programme
"Strategic Design Management" where the menu says "Strategic Design & Innovation Management".

**Assets.** 157 references, 147 mapped and 127 new (3.3MB of images, 28MB of video). 49 images
converted to WebP (9.0MB saved) and 4 clips re-encoded (22.1MB saved). Six semester posters are
soft-404s, and **two Student Voices mp4s answer 403 from the CDN** — the same dead-asset shape
/admissions/pg-admissions documents — so those two clips ship `.webm` only, which is what production
falls through to and plays.

**The one page of the set whose cards have neither control.** Every other B.Des page authors
`a.youtubeicon` and Webflow's play/pause button on each Student Voices card; this one authors
neither. `Voices` was rendering both regardless: `controls={{pauseIcon: null, playIcon: null}}` is a
**truthy object**, so `InViewVideo` painted three buttons with an empty `src`, and the YouTube
anchor wrapped a source-less `<img>`. Both are conditional now. **An optional sub-component guarded
by an object literal is never guarded** — test the field, not the wrapper. Verified a no-op
elsewhere: the other eleven pages have a non-null icon and link on all 35 of their cards.

**The B.Des set is complete — twelve pages.** `reference/.../b-des/` holds thirteen files;
`behavioural-design-&-ai.php` is the one the header menu never links to. Across the twelve, only the
four documented deviations remain (the elective dropdown's authored 32px closed height, the shared
FAQ's divider/`.accordion-title` buckets, the 568-767px card blow-out held to container width, and
the self-hosted Manrope in the stack descriptions), every page passes 41/41 interactions and a clean
12-width validation, and `scratchpad/regress.py` sweeps all 41 routes with 0 findings.

## ISDI B.Tech — `reference/schools/isdi/programs/undergraduate/btech/`

Three PHP files; the header menu links **two** of them
(`btech-design-engineering`, `btech-ai-integrated-design`).
`systems-design-&-intelligent-manufacturing.php` is the unlinked third, exactly as
`behavioural-design-&-ai.php` is in the B.Des set.

### ISDI B.Tech in Design Engineering — `app/schools/isdi/programs/undergraduate/btech/btech-design-engineering/page.js`, `lib/schools/isdi/programs-btech/design-engineering/`

The B.Des twelve-block template again, in the same order, so every component was reused. Measured
on production at six widths; every block matches except the four documented deviations, and at 1440
the figures band, admissions, eligibility and the closing panels are **pixel-identical** (0.00).

Content: four years of two semesters (electives in Year 1 sem 1 only, so the closed dropdown costs
-48px), 6 / 6 / 31 cards and 14 people in the tab panes, 9 and 9 execution cards, four Student
Voices cards, seven FAQ items, and an admissions band headed "Admissions — The **Technical** Way"
with **four** steps. Its `$title` and `$description` are both the bare string "Design Engineering" —
no " – ATLAS ISDI" suffix and no sentence, transcribed rather than invented.

**Assets.** 188 references, 187 mapped (one soft-404) and only **12 new** (1012KB of images, no
video of its own): its Curriculum Highlights clips are the ones the Luxury Brand Strategy page
already pulled from this very programme, and the rest of its media is the B.Des set's.

**Four shared-component gaps this page found — three of them latent bugs on the twelve B.Des
pages.** All four are additive and all twelve B.Des pages were re-measured afterwards (admissions
and eligibility exact at 1440 and 390, `why` unchanged, 41/41 interactions on two of them):

- **A popup's label is not its trigger's label.** `BrochureButton` printed `brochure.label`, which
  is right only while a popup has one trigger — true on every B.Des page. Here "Download Brochure"
  and "Talk to an Admissions Counsellor" carry the **same** `data-id`, so the second button rendered
  the first one's text. It takes a `label` prop now; `Curriculum` had already worked around this by
  spreading a replacement label into the brochure object, and now passes the prop instead.
- **A third popup kind.** This page's one live popup is neither of the B.Des shapes: it embeds a CRM
  widget as `<script src=".../6a9e61ba36bae5bdae0bd52d/embed.js" data-atlas-height="650" async>`
  *inside* the 580px panel. React will not execute a `<script>` it renders, so the node is appended
  on first open and only once — the widget appends its own iframe to that host. Its second popup
  (`#npf-popup-overlay-brochure-1`) is commented out line by line **while its listener is left
  live**, so it is an orphan and is not ported.
- **A stack card's height can be pinned by a duplicate rule.** The sheet declares
  `.stack_card.first.isdi-programs { height: 400px }` a second time, *after* its own
  `@media (max-width: 991px)` rule — equal specificity, later wins, and a media query adds none — so
  cards 1 and 2 are 400px at **every** width while 3-5 keep the 330 / 600 / auto ladder. That is
  the page's value, so it travels as data: `scratchpad/btech1/stackheights.py` measures each card at
  1440 / 991 / 390 and only a card whose height is identical at all three is pinned. `WhyStack` then
  sets it inline and drops the ladder classes rather than shipping two heights in one class list.
- **A step's colour belongs to its classes, not its index.** `Admissions` coloured the band by
  position, which matched only because every B.Des page ships the same five
  `.tbgN(.isdi|.isdi-blue-5)` cards in the same order. This page has four and omits
  `tbg2.isdi-blue-5`, so its last step came out navy instead of `#1a53ef`.
  `scratchpad/btech1/steptones.py` measured the class→colour map on three pages (unambiguous), the
  generator emits the measured `tone`, and the index remains only as the fallback.

**An eligibility group can have several `.el-subdesc` lines.** The IB group here authors **four**
with `<br>`s between them where the B.Des pages author one, and `select_one` took only the first —
worth most of the block's height. The extractor now records the group's body as an ordered run list
(a string is a paragraph, `None` is the break) and `Eligibility` renders it, with `subdesc` kept as
the single-line shorthand. Eligibility then matched the reference exactly at all six widths.

**Lazy images make a reference dump read short.** `dump.py` waited a fixed 900ms after scrolling a
block into view, and the projects wall measured 402 against its real 1677 at 1440 while matching at
1280 — a race, not a difference. It now waits for that block's own images to report `complete`
before measuring, and the wall, the search panel and every other block match at every width.

### ISDI B.Tech in AI Integrated Design — `app/schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design/page.js`, `lib/schools/isdi/programs-btech/ai-integrated-design/`

`reference/schools/isdi/programs/undergraduate/btech/btech-ai-integrated-design.php` — the second
and last menu-linked B.Tech page, on the same twelve-block template. **No new component and no
component change.** Measured on production at six widths; the programme, admissions and eligibility
blocks match **exactly at all six**, and at 1440 every block but the hero carousel and the FAQ diffs
at 0.0-4.0 mean pixels.

Content: Year 4 has three semesters, the tab panes hold 6 / 5 / 31 cards and 14 people, and it
shares the Design Engineering page's "Admissions — The Technical Way" band and three-group
eligibility. `$title` and `$description` are again the bare programme name — here "AI Engineering &
Intelligent products", which is not what the menu calls it. Transcribed as authored.

**The only page in the ISDI port with no electives at all.** Not one semester authors a dropdown,
so the set's -48/-96px closed-dropdown deviation simply does not arise and the programme block
matches the reference to the pixel at every width. Its interaction suite checks that we render
**no** dropdown rather than an empty one, and tabs through all four years — 38/38.

**Assets.** 187 references, 186 mapped (one soft-404) and 47 new (2.0MB of images, no video of its
own). Its second popup (`#npf-popup-overlay-brochure-1`, a real `.npf_wgts` widget) **is** in the
DOM here rather than commented out as on the Design Engineering page — but no element carries
`data-id="download-brochure-1"`, so it is still an orphan and still not ported. Every trigger opens
the same CRM script widget.

**A URL can carry a character `urllib` will not encode for you.** This page's
`career-pathways/human–ai-interaction-designer.png` has an **en dash** in its filename, and the
downloader — which escaped only spaces — raised `UnicodeEncodeError` rather than 404ing, so the
asset was silently skipped. It now percent-encodes every non-ASCII byte
(`urllib.parse.quote(u, safe="…")`), and the file fetches 200 with PNG magic bytes.

**`google is not defined` is the Maps embed's, not ours.** The Google Maps iframe's own
`init_embed.js` sometimes references its bundle before it has loaded; every frame in the stack is
`maps.gstatic.com`, and it lands on whichever page's map loads first — /admissions/integrated-admissions
on one sweep, a Programs page on the next. `scratchpad/regress.py` filters it alongside the
compute-pressure violation and YouTube's telemetry beacons; all 43 routes are otherwise clean.

**The ISDI Undergraduate programme pages are complete** — twelve B.Des and two B.Tech, plus the
Overview. The two unlinked references (`b-des/behavioural-design-&-ai.php`,
`btech/systems-design-&-intelligent-manufacturing.php`) stay unbuilt: nothing in the header menu,
the pathfinder or any page body links to either.

### ISDI Postgraduate Programs — `app/schools/isdi/programs/postgraduate/page.js`, `components/Schools/ISDI/ProgramsUg/`, `lib/schools/isdi/programs-pg/`

`reference/schools/isdi/programs/postgraduate/index.php` (`$css =
"…68fa353f2946e555b68cf479-b8e83f38a.css"`, `$body = "body isdi-page"`) — the ISDI header's
"Programs > Postgraduate Degree > Overview". Ten blocks: hero, "Our Programs", "Why Design At
ISDI?" + #1, #2, #3, the logo strip, #4, #5, "More questions?", FAQ.

**Every block matches its production height to the pixel at 1440 / 1280 / 991 / 767 / 479 / 390** —
the only delta on the page is the shared FAQ's known divider bucket. At 1440 every block but the
hero carousel and the FAQ diffs at 0.0-1.5 mean pixels.

**The reference lives at the trailing slash.** `/programs/postgraduate` answers **301** to
`/programs/postgraduate/`; the menu links the slashless form. Fetch the canonical one or `curl`
returns a 314-byte redirect stub that looks like a page.

**It is the Undergraduate Overview with one block swapped**, so it reuses every component that page
built. Where the UG page includes the PathFinder quiz, this one carries "Our Programs" — the ISDI
homepage's Postgraduate tab, the same `PostgraduatePane` over the same two `.program-card`s. Those
cards are the homepage's field for field (titles, durations, career pathways including its own
"System DesignerDesign Researcher" run-on, images, colours, hrefs), so `isdiPrograms.pg` is
re-exported rather than transcribed twice. Only the `aria-label` differs and it is dropped here.

**A script sets the card colour inline and a class beats it with `!important`.** Both cards declare
`data-bg-color="#DF287B"` and the page's own script writes that to `style.backgroundColor` on every
`.program-card` — yet the second card renders `#2C57B7`, because
`.program-card.bg-1.isdi { background-color: rgb(44,87,183) !important }` outranks the inline
style. The port stores the painted colour, which is what the data already held.

**Four per-page differences behind identical class names**, each now a flag rather than a fork —
and all four are why "same section, different sheet" is worth measuring every time:
- `.blue-desc-wrap` is 56px top AND bottom on the UG page and **56/0** here, on both the
  Location and World blocks — `data.descFlush`, worth +56 on each.
- `.skills-electives-wrapper` exists only here (56px of top padding, 24 at <=767) and wraps the
  minors tabs.
- `.tab-content-mint` is outside `.container` on the UG page so its carousel can bleed, and
  **inside** it here with `.padtp32` (32px top padding rather than 56).
- each minors pane is a `.swiper.common-swiper` on the UG page and a plain
  `.electives-card-wrapper` here — `display: flex; flex-wrap: wrap; gap: 16px`, becoming a
  **two-column grid at <=767** — with 7 cards rather than 5 and no slider at all. `data.grid`
  selects it, and the closing `.isdi-elective` row is now optional because this page authors none.

**A flex item cannot shrink below its image.** With the grid in place the block still refused to
rewrap at 1280 until the panel was moved inside `.container`: our wrapper was viewport-wide (1280)
where the reference's is 1156, so four 298px cards still fitted a row. The reference's cards keep
`min-width: auto` over a 298px image, which floors their min-content and forces the wrap.

**`ProgramCard`'s fallback `aria-label` said "Undergraduate" on every card**, including the
homepage's postgraduate tab. It now names the card from its own title; the one authored label
("ISDI Home", on the homepage's M.Des card) still wins where the reference sets it.

**Assets.** 115 references, all mapped: 74 new under
`public/assets/images/schools/isdi/programs-pg/` (2.4MB) and 41 reused — 8 from the homepage, 1
from the About page and 32 byte-identical matches elsewhere, several of them the UG Overview's own
hero and map files. 69 images converted to WebP (11.2MB saved).

## ISDI Postgraduate programme pages — `reference/schools/isdi/programs/postgraduate/`

`index.php` (the Overview, above), `mdes/design-futures-2-years.php`,
`mba/mba-design-led-strategy-&-transformation.php`,
`mba/mba-in-event-&-experience-design.php`, and two files at the postgraduate root —
`m-des-in-design-futures.php` and `mba-in-design-management-strategic-thinking.php`.

**The same programme exists at two URLs, and the menu and the Overview disagree about which.**
The header menu links `postgraduate/mdes/design-futures-2-years`; the Overview card links
`postgraduate/m-des-in-design-futures`. Both answer 200 and render the **same sixteen-node page**
— diffed block by block, the only difference is the hero eyebrow, "Master of Design (M.Des)",
which the card's copy carries and the menu's does not. The menu is the navigation of record, so
that is the one built; the Overview card is transcribed as authored and therefore points at a
route this port does not have. **Flagged, not decided.**

### ISDI M.Des in Design Futures — `app/schools/isdi/programs/postgraduate/mdes/design-futures-2-years/page.js`, `lib/schools/isdi/programs-mdes/design-futures/`

The same twelve-block programme-detail template the undergraduate pages use, so every component
was reused. Measured on production at six widths; every block matches except the four documented
deviations, and at 1440 the admissions, eligibility, projects, banner and search blocks are
pixel-identical.

Content: **two years, not four** — Year 1 of two semesters (electives in both) and Year 2 of one.
13 / 15 / 12 cards and 6 people in the tab panes, 8 and 5 execution cards, eight project
photographs, four Student Voices cards, and a **24-item** FAQ — the database-driven include, so it
is FAQ master 1, re-exported from `lib/designInnovationContent` exactly as the About page does.

**Assets.** 118 references, all mapped; 88 new (2.7MB of images, 48MB of video) and 30 reused.
8 clips re-encoded (36.1MB saved).

**A semester row can hold a photograph instead of a clip.** Every undergraduate page puts
`.video-auto > video` beside each semester; this page puts `img.semister-image` there, and the
extractor only looked for a `<video>`, so `Curriculum` crashed on `semester.video.sources`. Both
now travel and the component renders whichever the row carries. Its rule is `width: 100%; height:
auto` — so each row is as tall as its own photograph — dropping to a 200px `object-fit: cover`
band at <=767. Pinning it to the first row's measured 530px instead was wrong: the images differ
in ratio, and row 2 is 396.

**The brochure ids are per page, and inheriting them silently breaks every trigger.** This page's
triggers are `mdes-brochure` / `mdes-brochure-1`, not the undergraduate pages' `download-brochure`;
both overlays hold the same CRM script widget (`6a3e723ea1fd0680c6c0e846`). The cloned generator
also **hard-coded** the banner's key rather than reading the button's own `data-id`. Read the ids
off the page — `scratchpad/mdes1/popups.py` lists every trigger, overlay and what it holds.

**One duplicate React key broke three interactions.** Two Student Voices cards carry the *same
quote* here and `Voices` keyed on it, so React gave two cards one identity: clicking one brochure
trigger opened **two** dialogs and Escape closed neither. Index-qualifying the key fixed all six
failing assertions at once. **A duplicate key is not a cosmetic warning** — it is shared component
state, and this is the fourth place in the rebuild to need an index-qualified key.

**Two more traps of kinds already documented, in new places:**
- `.el-sub-title` is plain text on every undergraduate page and wraps parts of its first group in
  `<strong>` here, which is what makes it wrap to a second line (-21px at 390). It travels as runs
  now (a string is text, `{strong}` is bold), rendered with an explicit `font-bold` because the
  parent is 500 and the reference paints 700.
- the stats band's note carries an authored `<br>` ("Any bachlelor Degree of Miniumum<br>4 years",
  the reference's own spelling) and `StatsBand` printed it raw. With `.head-top-card.bg7`'s
  `padding-right: 40px` — a compound selector that survives the <=767 padding rule — the note
  wraps to two lines and the band is 418.3 rather than 401.5. A no-op on every page whose note has
  no break.

### ISDI MBA in Design Management & Strategic Thinking — `app/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking/page.js`, `lib/schools/isdi/programs-mba/design-management/`

`reference/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking.php` —
the second postgraduate programme page, and the same twelve-block template the B.Des, B.Tech and
M.Des pages use, so every component took it as data. Measured on production at
1440 / 1280 / 991 / 767 / 479 / 390; **every block matches to the pixel at 1440, 1280 and 991**,
and the only deltas at any width are the three deviations the set documents.

**The reference ships this programme twice, and the menu points at the wrong copy.** The ISDI
header links `postgraduate/mba/mba-design-led-strategy-&-transformation`, which upstream is still
carrying B.Tech content — a 4-Year Degree duration, Class XII eligibility, four years of curriculum
and the "Why Design Engineering" stack heading. The **Postgraduate Overview card** links this page,
which is the populated MBA. On the user's decision the card's page is the one built and
`lib/schools/isdi/navigation.js`'s MBA entry now points here; the half-finished twin is not ported.

Content: two years of two semesters with **no electives in either** (the first programme page of the
set whose curriculum has none, so its year panes carry no dropdown at all), four admissions steps,
three eligibility groups, 13 / 19 / 13 cards and 6 people in the tab panes, 8 and 5 execution cards,
eight project photographs, **six** Student Voices cards and 24 FAQ items. Both hero brochure
triggers and the curriculum's "Download Curriculum" open the **same** CRM widget
(`6a3e7418a1fd0680c6c101fb`) under their own labels — the page authors two `data-id`s
(`mdes-brochure`, `mdes-brochure-1`) for one form.

**Its FAQ is the M.Des page's.** `assets/include/faq.php` serves the postgraduate ISDI master set
on both, and the 24 questions and answers are byte-identical, so
`lib/schools/isdi/programsMbaDesignMgmtContent.js` re-exports
`programs-mdes/design-futures/faq` rather than duplicating it. `gen_data.py`'s FAQ writer is
commented out in place so a re-run cannot silently recreate the duplicate.

**Assets.** 134 references, 73 new (2.4MB of images, 11MB of video) and 61 reused. 47 images
converted to WebP (10.7MB saved) and 11 clips re-encoded (39.2MB saved). No soft-404 poster and no
orphan.

#### Three bugs in already-finished work that this page surfaced

**`get_text()` flattens `<br>`, and that had been dropping authored line breaks in every stack
description.** `gen_data.py`'s `body_runs` read `.why-content-desc` with `get_text()`, so a
`<br>` never reached the data and `WhyStack` had nothing to print. Two of this page's five
descriptions break twice each — 26px of card height per break, 52px on the block — which is exactly
the delta that had been sitting inside the documented Manrope deviation.
`scratchpad/whybr.py` found the same gap on **ten** of the fifteen earlier programme pages and
`scratchpad/whybrfix.py` restored them from production (only a card whose text matches once the
breaks are removed is rewritten). The `why` block now matches at 479 on all sixteen pages, and what
remains at 390 is the genuine +25.3 Manrope line. **This is the seventh field in the rebuild to
need `withBreaks`, and the second time a missing break hid behind a deviation that was already
documented.**

**`.wrap-btns` is not `.buttons-wrapper` — and the box between them is content.** The hero's
`.wrap-btns` holds the buttons **and** a `.deadline-text`: authored on twelve of the sixteen
programme pages, EMPTY on nine of them, and still a 10px box (its own `padding-top: 10px`). The
hero column is anchored to the bottom of the scrim, so that 10px lifts the whole column — and on
**Accessory Design & Craft, Fashion Brand Management and Health & Care Design** it is not empty at
all: it reads "Application Deadline: October 25" on two of their three slides, which the port was
not showing. It travels per slide (`null` = not authored, `''` = authored empty, or the string).

**A slide can author more than one `.h3-tag`.** `extract.py` used `select_one`, so Health & Care
Design and Service & Experience Design — which print the programme name and a tagline as two
sibling titles — lost their second 38px line and their whole hero column sat 39px low. `Hero` now
takes `slide.title` as a string *or* an array, the same "a value can be a string or an array of
runs" shape `ProgramList` already uses, and only those two pages carry the array.

**And a missing breakpoint on all sixteen.** `.course-desc-isme` drops to **16px/24 at ≤479**, not
the 20px/30 it takes at ≤767; `Hero` stopped at the 767 rule, so the lead wrapped to more lines than
the reference everywhere below 480. That had been read as the ISDI Poppins fallback. It is not:
with `max-sm:text-[16px]` added, `scratchpad/herocheck.py` reports the hero text column
**identical to production on all sixteen pages at 1440 / 767 / 479 / 390 — 0 differences.**

**None of these four show in a height diff or a screenshot diff.** The hero is a fixed 900px tall
at every width, so nothing it contains changes a block height; and the hero's screenshot always
scores 50-55 mean pixels because the carousel shows whichever slide is current. A vertical shift
inside a fixed-height, auto-rotating box needs its own measurement — hence `herocheck.py`, which
pins the first original slide (`:not(.swiper-slide-duplicate)`) on both sides and measures the
column's top against the carousel's own box.

**Deviations (three, all shared with the rest of the set):** the shared FAQ's divider /
`.accordion-title` buckets (-2 above 768, -42 below); `.career-sup-card` and `.testimonial-card`
held to the container width between 568 and 767 where the reference blows out (+90.5 and +24 at
767); and the elective dropdown's authored 32px closed height, which does not apply here because
this curriculum has none. 35/35 interactions pass at 1440 and 390, `validate.py` is clean at all
twelve widths (0 overflow, 0 console, 0 broken images, no external host), and `regress.py` sweeps
all 46 routes with 0 findings.

### ISDI MBA in Event & Experience Design — `app/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design/page.js`, `lib/schools/isdi/programs-mba/event-experience/`

`reference/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design.php` — the
third postgraduate programme page and the ISDI header's second MBA entry, on the same twelve-block
template. Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390; **every block matches to
the pixel at 1440 and 1280**, and the only deltas at any width are the deviations the set already
documents.

**Its curriculum is the shortest in the set — a single year.** "Year 1" alone, two semesters, with
electives in the first, so the closed-dropdown deviation costs -48px rather than -96 and nothing
at all at 1440, where the semester row is sized by its video. 7 / 5 / 31 cards and 14 people in
the tab panes, 9 and 9 execution cards, sixteen project photographs, four Student Voices cards and
seven FAQ items.

**Two upstream copy-pastes, transcribed as authored:** the sticky stack is headed "Why Design
Engineering at ISDI x Parsons" on an Event & Experience Design page, and **all seven FAQ questions
are written for Communication Design** — byte-identical to
`lib/schools/isdi/programs-bdes/communication/faq.js` (compared after normalising the export
name), so that transcription is re-exported rather than duplicated. Its `<title>` also carries two
spaces before the dash, which the port emits byte-for-byte.

**Every slide fills the `.deadline-text`.** Most programme pages leave that box empty; here all
three read "Application Deadline: October 25". It travels per slide, as the MBA Design Management
page's work established.

**Assets.** 170 references, 161 mapped (nine soft-404 posters) and only **35 new** (1.2MB of
images, 20MB of video); 126 were already on disk. 14 images converted to WebP (1.8MB saved); no
clip was large enough to re-encode.

**A page can cite a different programme's assets, and the folder rule had only half the shapes.**
This page's Curriculum Highlights clips live under `postgraduate/mba/<slug>/curriculum-highlights/
<topic>/1.png`, and `folder()` matched only `…/undergraduate/…`, so all seven collapsed onto one
name. The rule now matches **both** levels and both depths — a programme under a degree category
(`undergraduate/b-des/<slug>/…`, `postgraduate/mba/<slug>/…`) and one directly under the level
(`postgraduate/<slug>/…`). Second time this regex has been too narrow; the first was the Luxury
Brand page's B.Tech clips.

#### Two bugs in the shared popup, both latent on every ISDI programme page

`isdipopups.py` opens every brochure popup on every ISDI programme page on production and measures
it. Two of its findings were wrong in the shipped `BrochureButton`:

- **The panel is never keyed on what the popup holds.** `PANEL` had an `npf` shape (90% wide /
  max 800 / 80% tall) taken from the ATLAS Programs pages. **No ISDI page authors it** — every one
  of them puts both popups in the same 580px box, the `.npf_wgts` widget included, so the Accessory
  page's second popup and its twin on every B.Des page had been rendering 800px wide. The panel is
  one string now. (`.npf_wgts` is still 700px tall, and its own iframe a fixed **650**, not the
  `100%` the ATLAS pages declare.) **The rule the CS/AI page recorded — "the popup shape follows
  what the popup holds" — is an ATLAS rule, not a site-wide one.**
- **The close button's line-height splits by page.** The port hard-coded `leading-none`, which is
  35x28. Only M.Des Design Futures and MBA Design Management declare `line-height: 1`; the twelve
  B.Des pages, both B.Tech pages and this one declare none, so their button sits on a 27px line box
  and is 35x**37**. It is `brochure.closeLeading` now, defaulting to the un-declared form.

`scratchpad/popupcheck.py` re-measures the port's popups against those reference values across all
nine pages that have them: **18 popups, 0 off spec.**

**A `[role=dialog]` probe has to name the dialog it wants.** The first run of that check reported
every popup broken because it matched the footer's `VideoModal`, which is a `[role=dialog]` too and
is mounted on every page. The interaction suites already exclude it by `aria-label`; the probe now
does the same.

**The retarget guard paid for itself immediately.** `retarget.py` rewrites longest token first and
then greps for leftovers, and it flagged four scripts whose URL is split across two source lines.
It was right to: the split halves were `'…/programs/postgraduate/'` + `'<slug>'`, so the rewrite
produced a URL with the `mba/` segment **missing** — a page that exists, so the harness would have
measured the wrong document without ever erroring.

**`%26` in a route's path 404s in the port and 200s on production.** Fourteen ISDI routes have an
`&` in the slug. A browser following our own menu sends the literal `&` and the route resolves
(verified end to end by clicking the menu entry), but the percent-encoded spelling of the same URL
does not. It is a global routing behaviour rather than anything this page does, so it is **flagged
for the user** alongside the FAQ divider rather than fixed here.

**Deviations (three, all shared with the set):** the elective dropdown's authored 32px closed
height (-48 below 1440, -5.6 at 991 where the video still sizes the row); the shared FAQ's divider
bucket; and `.career-sup-card` / `.testimonial-card` held to the container width between 568 and
767 (+89.5 and +24 at 767). 43/43 interactions pass at 1440 and 390, `validate.py` is clean at all
twelve widths (0 overflow, 0 console, 0 broken images, no external host), and `regress.py` sweeps
all 47 routes.

## ISDI Postgraduate Diploma — `reference/schools/isdi/programs/postgraduate-diploma/`

Two PHP files, both linked from the header menu: `mba-creative-entrepreneurship.php` and
`pg-interior-styling-&-space-curation.php`. The menu's "Overview" entry above them points at the
Postgraduate **Degree** overview, which is already built.

### ISDI Creative Entrepreneurship (1 Year) — `app/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship/page.js`, `lib/schools/isdi/programs-pgd/creative-entrepreneurship/`

The same twelve-block programme-detail template, so **no new component and no component change**.
Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390: **every block except the FAQ matches
to the pixel at all six widths**, the programme block included — the first page of the set with no
elective deviation at all, because its curriculum authors none. At 390 the programme block screenshots
at **0.11 mean pixels**.

Content: one year of two semesters with no electives, four admissions steps, three eligibility
groups, 6 / 6 / 31 cards and 14 people in the tab panes, 9 and 9 execution cards, sixteen project
photographs, four Student Voices cards and seven FAQ items. Its two popups are the Event &
Experience Design page's exactly — the same CRM iframe (`6a3e5980…`) and the same NoPaperForms
widget (`42f152a6…`) under the same `download-brochure` / `-1` ids — and all three hero slides fill
the `.deadline-text`.

**Three upstream copy-pastes, transcribed as authored:** the sticky stack is headed "Why Design
Engineering at ISDI x Parsons", the meta description is the Communication Design page's, and so are
**all seven FAQ questions and answers** — compared question and answer against that page's rendered
production markup (`scratchpad/pgd1/faqcmp.py`), identical, so
`lib/schools/isdi/programsPgdCreativeEntContent.js` re-exports
`programs-bdes/communication/faq` rather than transcribing a third copy. Its `<title>` carries two
spaces before the dash, which the port emits byte-for-byte.

**Assets.** 168 references, all mapped, and only **12 new** (988KB, its three hero photographs and
their `-p-` twins) with **no video of its own** — the smallest download list of any ISDI programme
page. Its Curriculum Highlights, Career Pathways and benchmarked-curriculum clips are the **B.Tech
Design Engineering** programme's files and its Faculty, Success Stories and Student Voices the
**B.Des Communication Design** page's. No soft-404, no orphan.

**The level segment is not always `undergraduate` or `postgraduate`.** `folder()` had just been
widened to name both; this page lives under `postgraduate-diploma/`, which neither matches. It now
matches **any** level and both depths (`<level>/<category>/<slug>/…` and `<level>/<slug>/…`) —
third time that regex has been too narrow, after the Luxury Brand page's `b-des` anchor and the MBA
Event page's two named levels. Without it the page's own hero files would have collided on
`1.png` / `2.png` / `3.png` under the upstream's misspelt `herobannner/` folder.

**Deviations (three, all shared with the set):** the shared FAQ's divider bucket; `.career-sup-card`
and `.testimonial-card` held to the container width between 568 and 767 (+89.5 and +24 at 767); and
the self-hosted Manrope in the stack descriptions (+25.3 at 390). The elective-dropdown deviation
does not arise. 38/38 interactions pass at 1440 and 390, `validate.py` is clean at all twelve widths
(0 overflow, 0 console, 0 broken images, no external host), and `regress.py` sweeps all 48 routes.

### ISDI Interior Styling & Spatial Curation (1 Year) — `app/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation/page.js`, `lib/schools/isdi/programs-pgd/interior-styling/`

`reference/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation.php` —
the second and last Postgraduate Diploma page, on the same twelve-block template. **No new
component and no component change.** Measured on production at six widths; every block matches
except the deviations the set documents, and it is exact at 1440 and 1280.

**The route says "space-curation" where the menu label and the `<title>` say "Spatial
Curation".** The reference's own filename is what the route follows, as everywhere else in this
rebuild.

Content: one year of two semesters with electives in the first (so the closed-dropdown deviation
is -48 rather than the two-dropdown -96), four admissions steps, three eligibility groups,
6 / 6 / 31 cards and 14 people in the tab panes, 9 and 9 execution cards, sixteen project
photographs, four Student Voices cards and seven FAQ items. Its popups, its `.deadline-text` on
all three slides, its stack heading and its meta description are its sibling's exactly.

**Its FAQ is the Communication Design set for the third time** — compared question and answer
against that page's rendered production markup, identical, so it is re-exported rather than
transcribed again.

**Assets.** 168 references, all mapped, and only **12 new** (1.1MB — its three hero photographs
and their `-p-` twins), no video of its own, no soft-404, no orphan. Like the Creative
Entrepreneurship page it borrows the B.Tech Design Engineering programme's curriculum media and
the B.Des Communication Design page's Faculty, Success Stories and Student Voices.

**Production rate-limits, and it looks like a page-structure bug when it does.** Two consecutive
probe runs failed here: the first timed out on `goto`, the second got through but evaluated
against a half-loaded document and threw `Cannot read properties of null (reading 'children')` on
`.main-wrapper` — which reads as "this page has a different wrapper", not "the host throttled
me". The fetched HTML had the wrapper all along. Pause and retry before believing a structural
difference that only one run reports.

**Deviations (four, all shared with the set):** the elective dropdown's authored 32px closed
height (-48 below 1440, -5.6 at 991 where the video still sizes the row); the shared FAQ's
divider bucket; `.career-sup-card` / `.testimonial-card` held to the container width between 568
and 767; and the self-hosted Manrope in the stack descriptions. 43/43 interactions pass at 1440
and 390, `validate.py` is clean at all twelve widths, and `regress.py` sweeps all 49 routes.

**The Postgraduate Diploma set is complete — two pages.** `reference/schools/isdi/programs/
postgraduate-diploma/` holds nothing else. Next in the ISDI menu: Pre-University Summer School
(`reference/schools/isdi/programs/pre-university-summer-school.php`), then the Admissions pages.

## ISDI Pre-University Summer School — `app/schools/isdi/programs/pre-university-summer-school/page.js`, `components/Schools/ISDI/SummerSchool/`, `lib/schools/isdi/programs-pss/summer-school/`

`reference/schools/isdi/programs/pre-university-summer-school.php` — the last entry in the ISDI
menu's Programs column, and **the only ISDI programme page that is not the twelve-block
programme-detail template**. Seven blocks: hero, four figures, "What is ISDI Summer School?",
"Your Creative Journey at ISDI", "Hear from Our Young Creators", "Why Join ISDI-Parson Summer
School?", "Highlights of Your Summer School Journey". No FAQ, no "More questions?", no tabs, no
curriculum, no brochure trigger — 618 lines of PHP against the programme pages' ~2600.

**Every block matches its production height to the pixel at 1440 / 1280 / 991 / 767 / 479 / 390**,
and the screenshots diff at 0.2-1.5 mean pixels everywhere except the two blocks that hold a
playing video (the hero at 9.4 and the quote carousel at 8.1 — a different frame, verified
visually identical in layout). 17/17 interactions pass at **all twelve widths**.

**Three of the seven sections are existing components** driven by this page's data, each
re-verified on its origin page afterwards:
- `About/Hero` — the ISDI background-video hero. `.inner-header-wrapper` is **658px**;
  `.full-ht` is the modifier that makes it 100vh, so the height travels as `data.fullHeight`
  rather than being baked in, and an optional `data.buttons` row renders the `.hd-wrap` this
  page adds. The About page is byte-for-byte unchanged at 1440 / 767 / 390.
- `Home/PeopleVoices` — "Hear from Our Young Creators" is that section exactly:
  `.testimonial-card.bgc1.isdi` in a `.common-swiper-full`, 620x440 over #193e90 with a 325px
  background video. Reused with no change at all.
- `ISDI/ApplicationPanel` — **extracted** from `Home/GuideBanners` so both pages share the
  `.isdi-application` box. The homepage stacks a heading and two pills in it; this page a
  heading and a bulleted list, so the panel takes its contents as `children`. The homepage
  measures identical afterwards (the only delta is `background-size` on a box whose
  `background-image` is `none` below 768 — inert, and unchanged by the extraction).

The other four are this page's own: `SummerSchool/{Stats, WhatIs, CreativeJourney, Highlights}`.

**The figures band is NOT `StatsBand`.** Same `.top-cards-wrapper` and `.head-top-card` classes,
but there is no figure: each card is one `.sm-text-isme-2.isdi` line, and the first adds a
coloured `.sm-text-isme.orange` eyebrow over a `.sm-text-isme-3` variant. Generalising
`StatsBand` would have meant rewriting seventeen finished pages' data for one page, so this band
is local — the call `components/Industry/PartnerCardSection` already records. **And
`.sm-text-isme-2` stays 24px at every width** where `.sm-text-isme` drops to 18, which is why the
other bands' mobile override does not apply (worth 50.4px at 390).

**Read the page's own `<style>` as well as the sheet — and fetch the sheet, don't enumerate it.**
`cssrules.py` reads `document.styleSheets`, which throws here: the Webflow sheet is served
cross-origin, so `cssRules` is inaccessible and it reports only "CORS". `scratchpad/pss1/cssgrep.py`
fetches every linked sheet by URL and searches it alongside the page's inline `<style>` blocks.
That matters because **this page loads two Webflow sheets** (`…68e8e…` and its own `$css`
`…68e79…`) and several of its classes — `.new-core-card`, `.core-text-wrapper`, `.n-core-num`,
`.n-core-title` — are declared **only in the first**, while `.sm-text-isme-3` is declared only in
an inline block. `.hd-wrap` is in neither: it is an unstyled div.

**`<h2 class="sub-heading">` again, and it was worth 14px.** This page's "What is ISDI Summer
School?" lead is an `<h2>`, so Webflow's own `h2 { margin: 20px 0 10px }` applies: the 20
collapses against the heading's 16 (4px of extra gap) and the 10 is added below. `SUB_H2_MRGBTM`
in `components/Home/SectionHead` already models exactly that, including the `max-md:mt-0` that
makes it a no-op at <=767. Fourth instance of the trap /advantages/atlas-advantages records.

**A named type size carries its line-height and cancels an arbitrary one.** `.port-card-el-desc`
is 18px/1.6 dropping to 16px at <=767, and `max-md:text-base` sets `line-height: 1.5` as well as
the size — so the 1.6 was silently replaced and every highlight description gained a line (up to
24px on the block). The ratio has to be restated at the breakpoint: `max-md:leading-[1.6]`. An
*arbitrary* size like `text-[24px]` sets no line-height and inherits the body's 1.5 ratio, which
is why `.n-core-title` needed nothing.

**The dead Varsha Sharma mp4 turns up a third time.** Card 2 of "Hear from Our Young Creators"
authors the same `…IMG_5462%20%281%29-transcode.mp4` that answers 403 from S3 under every URL
spelling, and production falls through to the `.webm` — which is already on disk from
/admissions/pg-admissions. The generator picks the first source the CDN actually serves, so the
data ships the webm and the interaction suite asserts it.

**Reference note, not reproduced:** the page ships a `#npf-popup-overlay-brochure` NoPaperForms
widget whose listener binds `[data-id="download-brochure"]`, and **no element on the page carries
that attribute** — the only `data-id`s are the ISDI header's own "Apply Now". An orphan, the same
call every other unbound popup in this rebuild got. The hero's "Apply Now" is a real link to
`/summerdesign`.

**Two harness fixes this page forced:**
- `dump.py` and `shots.py` filter the `.main-wrapper`'s children by tag, and this page opens with
  a `<noscript>` that the programme pages do not have. `shots.py` still counted it, so every
  reference block was compared against the *next* implementation block and the whole page
  "differed" by 50-120 mean pixels. **When a screenshot harness reports that every block differs,
  suspect the block indexing before the page.**
- `retarget.py`'s split-URL guard named the path segments it expected
  (`postgraduate|b-des|btech|mba|mdes`), so `…/programs/postgraduate-diploma/'` slipped past it and
  five scripts kept the previous page's path. It now flags **any** literal that ends in a slash;
  the false positives are one line to check and the miss was not.

**`folder()` in the asset downloader was too narrow a third time.** It had just been widened from
`b-des` to `undergraduate|postgraduate`; this page's own artwork lives under
`postgraduate-diploma/`, which matches neither. It now matches any level and both depths.

**Assets.** 33 references, 32 mapped (the dead mp4), **13 new** (1.9MB of images, 16MB of video —
the hero clip in both encodings) and 19 reused: the four quote videos and their posters from the
homepage and /admissions, the two `.isdi-application` illustrations from the homepage, and the
five stylesheet-painted vectors. `scratchpad/pss1/pss_cssbg.py` folds those five into the manifest,
because no markup names them.

**Deviations (one):** `QuoteCard` is held to the container width between 568 and 767 where the
reference blows out — the fix `Home/PeopleVoices` already carries for the homepage (+24 at 767).
`validate.py` is clean at all twelve widths (0 overflow, 0 console, 0 broken images, 0 failed
requests, no external host), and `regress.py` sweeps all 50 routes.

**The ISDI Programs section is complete** — the two overview pages, twelve B.Des, two B.Tech,
three postgraduate degrees, two postgraduate diplomas and this one. Next in the ISDI menu:
Admissions (`/schools/isdi/admissions/undergraduate/b-des`, `…/b-tech`,
`…/postgraduate/m-des`, `…/postgraduate/mba`, `…/pre-university-summer-school`).

## ISDI Admissions — `reference/schools/isdi/admissions/`

Five pages: `undergraduate/b-des.php`, `undergraduate/b-tech.php`, `postgraduate/m-des.php`,
`postgraduate/mba.php` and `pre-university-summer-school.php`. The header menu links four of
them; its fifth Postgraduate entry, "Interior Styling & Spatial Curation (1 Year)", is
`href="#"` upstream and points nowhere.

### ISDI B.Des Admissions — `app/schools/isdi/admissions/undergraduate/b-des/page.js`, `components/Schools/ISDI/Admission/`, `lib/schools/isdi/admissions-isdi/b-des/`

A **third ISDI template**, and the first Admissions page. Ten blocks: a `.course-cover-section`
hero, the About page's sticky anchor menu, then six sections each carrying the `id` that menu
scrolls to (How to Apply, Key Dates & Deadlines, Eligibility, Fee Structure, ATLAS Scholarships,
Education Loans — the menu labels that last one **"Financial Assistance"**), the "More
questions?" panel and the FAQ. No carousel, no video, no brochure popup.

**Nine of the ten blocks match their production height to the pixel at all twelve widths**
(1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360). The tenth is the
shared FAQ, whose two known divergences are listed at the end.

**Four of the ten are existing components** driven by this page's data, each re-verified on its
origin page afterwards:
- `About/AnchorMenu` — gained `centered`. The About page's bar is `.sticky-menus.center`; this
  one is the bare class and is **left-aligned**.
- `ProgramDetail/Admissions` — the `.gd-steps` band. This page authors the heading **bare**, with
  no lead, no button and no `.isdi-guide-wrapper` padding, so `data.sub` and `data.button` are
  optional now and their absence selects that form; it also takes an `id` for the anchor menu.
- `About/MoreQuestions` and the site-wide `FAQ`.

Seven components are this page's own, under `components/Schools/ISDI/Admission/`: `Hero`,
`HeadWrap` (the `.head-wrap > .tt-wrap + .button-regular` row three sections share), `KeyDates`,
`Eligibility`, `FeeStructure`, `Scholarships` and `EducationLoans`.

**A third hero shape.** `.course-cover-section` is not `ui/InnerPageHero` (scrim over three
quarters, ending `#000c`) nor `Programs/ProgramHero` (a half, ending `#000e`): it is a half
ending at **`#0006`**, a much lighter wash, over a photograph.

#### The reference is a moving target — measure production, not only the mirror

**The mirrored copy of this page is already out of date, and the drift is content.** The mirror
was refreshed from upstream part-way through this work, and four values on this page had
changed since it was first ported: the Year 1 fee (`7,03,500` -> **`7,35,000`**), the Fee
Structure button's href (fliphtml5 -> `https://atlasuniversity.edu.in/fee-structure/bdes/`), and
— invisible in the mirror entirely — **a fifth education-loan lender** and a second bold group in
the Key Dates table. Two of those four exist only on production. **Diff the rendered production
markup against the data, not just the PHP against the data.**

**`assets/include/loans/education-loans.php` ships four lenders; production serves five.**
Avanse sits between Tata Capital and HDFC and is the one cell on the page with **two** contacts.
Its logo is not in the mirror either. Nothing in the local reference hints at it.

**Cloudflare's e-mail obfuscation is reversible, and that is how Avanse's addresses were read.**
Production renders every lender address as "[email protected]" with the real value in a
`data-cfemail` hex attribute (first byte is the XOR key). Decoding all seven on the page returned
the four the include carries in clear, byte for byte — which validates the decode — plus Avanse's
two and the ISDI footer's. **Validate a decoder against the values you already know before
trusting the ones you don't.**

#### What this page's measurements turned up

**A `<tr>`'s inline `height` is a minimum, and it is the whole explanation.** Two rows of the
key-dates table are 65px where every other is 50, and nothing in their content accounts for it —
both cells' text is one 23px line. The rows carry `style="height: 64px"` (the others carry 33,
which is below their content height and therefore inert). **Read the row's own attributes before
modelling its content.**

**Most of the Key Dates table's design is in the page's own inline `<style>`, not in `$css`.**
Reading only the Webflow sheet and Bootstrap gets the border model, the padding and the wrapping
wrong. That block declares, unconditionally, `.table-responsive > .table-bordered { border: 2px
solid rgba(0,0,0,.15) }`, `.table-bordered td { border: 1px solid #dee2e6 }` and `.table td
{ padding: .75rem; vertical-align: middle; white-space: nowrap; overflow: hidden; text-overflow:
ellipsis }` — and inside `@media (max-width: 1100px)` it moves the scroller, the 900px floor,
the `<br class="br">` and `border-collapse: separate !important; border-spacing: 0 !important`.
**That last pair is worth 1px on every row**: under `collapse` two touching cells share one
border, under `separate` each draws its own. Reproducing it took the table from 8 rows that were
each 1px short to a row-for-row match at 1440 and at 390.

**`max-tbl` (1100) is the breakpoint for this whole table, not 767.** The scroller, the 900px
minimum, the two-line left cells and the collapse flip all turn there. Using `max-md` for the
scroller and the 900px width was wrong in both directions.

**A `<sup>` must be left alone.** Webflow's normalize gives it `font-size: 75%; line-height: 0;
vertical-align: baseline; position: relative` — which is Preflight's rule exactly, measured
identical on both sides. An earlier note here said `leading-normal` is 1.5 in this config so a
browser-default line box needs `[line-height:normal]`; that is true of the Tailwind token and
irrelevant here, because the reference does not want the browser default. Restoring it raised
the line box and made every date row 1.41px tall. **Measure the element before "restoring" what
Preflight took away.**

**Two padding utilities in one class list are resolved by stylesheet order.** The header cell is
authored `padding: 0` inline; appending `p-0` to a shared cell string that already held `p-3`
gave it `p-3` and 22.5px of extra row height. Padding is kept out of the shared string and
applied per cell — the third time this trap has been recorded, after the ATLAS law table and
the FAQ's line-height.

**`.buttons-wrapper` declares no `justify-content`, so the row is left-aligned**, and its top
padding steps 30 -> 24 (767) -> 14 (479) while its gap steps 16 -> 8 (991). Centring it and
holding 30px at every width was worth 16px at 390 and put the button in the wrong place at all
of them — a difference no height diff above 768 could see.

**`.head-wrap.mrgbtm32` keeps its 32px bottom margin at every width.** The `@media (max-width:
767px)` rule for the same compound sets only `justify-content` and `align-items`; it is
`.head-wrap.mrgbtm` — a different class, not used here — that drops to 20. Reading the wrong
one cost 12px on Eligibility below 768. **A compound selector beats a media query**, for the
fifth time in this rebuild.

**Two breakpoints in the Scholarships block disagree.** The row stacks and the card loses its
`max-width` at **767**, but the wrapper's 56px top padding and the card's 56/40 padding both
turn at **479**. Dropping them at 767 cost 36px between 480 and 767 and inset the copy 20px too
early at every width in that band.

**`.df-container` carries a 1px `#18429f` frame** (the base rule, not an `.isdi` one), and
`.dates-fees-container.isdi` adds `padding-top: 32px` at <=479. The first was a flat 2px on the
Fee Structure block at every width; the second 32 more at <=479.

**A `1fr` track is `minmax(auto, 1fr)`, and that is what sizes the loans grid.** The declared
`repeat(6, 1fr)` resolves to uneven tracks (202 / 179.3 x 4 / 322.7 at 1440) because each
column's min-content floor wins.

**Every loans cell draws its own borders, and the pattern is regular** — columns: 1 indigo both
sides, 2 indigo-faint right, 3 none, 4 faint both sides, 5 faint right, 6 indigo right; rows:
first top only, second top and bottom, every later row bottom only (upstream reuses one class
for every row after the second). All 30 cells match the reference's four borders and four radii,
including the upstream slip that paints one cell's bottom border black rather than indigo.

**Where an overflowing grid's overflow GOES is a declaration, and it is not the one the
page sheet names.** The loans tracks sum to 926px against a 708px box at 768, and
`.w-layout-layout` — Webflow's own quick-stack base, in the shared sheet — declares
`justify-content: center`, so above 767 the whole row hangs off both sides equally (the first
cell starts at x -79). `.quick-stack` replaces it with `left` only at <=767, where the wrap
scrolls instead. Grepping the page sheet finds only the `left`, and rendering that at every
width put the row ~105px right of the reference from 768 up to about 1100. Every block height
still matched. **Grep the shared sheet for the base class as well as the page sheet for the
modifier.**

**A Webflow quick-stack cell is a COLUMN at every width.** `.w-layout-cell` is
`flex-direction: column; align-items: center`, and only the logo column adds
`justify-content: center` — the other five start. The port had it as a row above 767 that
became a column below, which is invisible in a height diff (the grid row sets the height) and
very visible in a screenshot: at 390 every logo sat at the top of its 233px cell where the
reference centres it. **Found only by comparing images** — the fourth time in this rebuild that
rule has paid, after `Carousel`'s bleed, `PrimaryButton`'s unknown variant key and
`Carousel`'s `align="center"`.

**The contact-details line has no CSS rule at all.** `.contact-deets` is undeclared and the
other four are bare `<div>`s, so the line inherits the page's Poppins 16px/24 — not the Manrope
14/700 every other value in the grid uses. At 16px it wraps to two lines, which is 6px of row
height per lender.

**`.loan-image-logo` is `max-width: 200px; padding: 0 20px` over `box-sizing: border-box`, and
the reference authors NO `width`/`height` attributes on those images.** Every logo therefore
paints at exactly 200 x (160 x its own ratio). Carrying invented `width`/`height` attributes in
the data made two of the five render 184 and 193 wide. **Transcribe the attributes the reference
has — and only those.** (This is the mirror image of the /success-stories finding, where seven
images really do author a `height` that Preflight cancels.)

**The date colours are resolved at build time.** The include's trailing `<script>` recolours
every `td b`: grey for "Closed", green for "Applications Open" and for any
`<day><suffix> <Month> <year>`. It tests **each `<b>` on its own text**, which is why the
"Applications Opened" cell has one plain group and one green one.

**A duplicate `id` makes an anchor ambiguous.** `Home/FAQ` renders its own `id="faq"`, and the
page wrapper had been given it too, so the document held two `#faq` elements and the menu's
"FAQs" link was ambiguous. The wrapper now carries only `data-block`.

**Assets.** 16 references, all mapped and all local: **10 downloaded for this page** (the hero
photograph and its three `-p-` twins, the five lender logos and the fee card's polygon, under
`public/assets/images/schools/isdi/programs/admissions/b-des/`) and **6 reused** — the three
apply-step images from the B.Des Accessory programme page, both scholarship washes (one from
the About page's beliefs band, one from the Summer School highlights) and the FAQ arrow. Avanse's logo is 1683x658 and paints at 160px wide, so it ships as a 360px WebP (68KB ->
8.2KB, RMSE 1.39 at display size, alpha preserved); the size was chosen so that
`160 x h / w` rounds to the 63px the reference paints rather than 62. 230KB for the page.
**Registering only `src` misses the `-p-` twins**: `img()` registers every srcset candidate too.

**Reference notes:**
- The "Learn More About B.Des Admissions" href repeats the site path
  (`…/schools/isdi/schools/isdi/admissions/undergraduate/b-des`). Production answers **200** on
  it — **with the ATLAS homepage**, not this page: a catch-all soft-404, verified (the body is
  the homepage's apart from its echoed canonical, and contains no "Key Dates"). So upstream the
  button promises B.Des admissions and delivers the homepage. The doubled prefix is an authoring
  slip — an absolute URL typed into a field the template already prefixes with `$domain` — so the
  authored intent is this page, and that is what the port links to. **Not** reproduced, and not
  silently: the destination is recorded beside the href.
- Both the "More questions?" panel and the FAQ are given `id="faq"`. Only the FAQ keeps it.
- At <=1100 the include also gives `tr:nth-child(2)/(3) td:first-child`
  `background-color: white; font-weight: bold`. Both cells are already white and their text is
  inside a `<b>`, so neither declaration paints anything; not reproduced.
- Four rows carry a commented-out third column reading "To be announced", and the first row a
  commented-out duplicate of its own caption. Dead markup, not ported.

#### Verified

Measured against `https://atlasuniversity.edu.in/schools/isdi/admissions/undergraduate/b-des`
at **1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360**:

- **Block heights — nine of the ten match the reference to the pixel at all twelve widths.**
  The tenth is the shared FAQ (below).
- **Per-block screenshots — `menu`, `how-to-apply` and `search` are pixel-identical at every
  width** (0.00-0.02 mean), `key-dates` is 0.00 from 992 down, and no block outside the FAQ
  exceeds **6.71** mean. The residue is `education-loan` between 768 and 992, where each
  middle column's min-content floor resolves ~2px wider here than on production — the
  self-hosted Poppins against the reference's unloaded one, which is the font deviation this
  port already documents site-wide.
- **Interactions — 75/75 at 1440 and 390**: the ten blocks in order, the seven anchor links
  resolving to real single ids and scrolling, the three eligibility dropdowns (closed on load,
  each opening with a body, single-open), the key-dates table and its button's href and
  variant, the three head-row buttons' hrefs and targets, four fee cards, three scholarship
  cards, the 30-cell loans grid with five loaded logos, the search panel, and the FAQ
  (closed on load, opens, single-open).
- **`validate.py` is clean at all twelve widths**: 0 horizontal overflow, 0 console errors,
  0 page errors, 0 failed requests, 0 broken images and **0 requests off this origin**.
- `npx eslint .` and `npm run build` both exit **0**; the route builds `○ Static`.
- Nothing shared changed in the final pass — every edited file is this page's own — and the
  site-wide sweep of all built routes at 1440 and 390 is clean.

**Two harness lessons, both of which produced false failures first.**
- **An element screenshot captures whatever is painted over it.** Production runs a fixed
  "UNIAI" chat widget across a third of the viewport (more the narrower it gets) that the port
  does not have, and after a settling scroll the two headers sit in different states. The
  first screenshot pass reported 35-158 mean on every block, including blocks whose heights
  matched exactly. Stripping every `position: fixed` box and pinning `sticky` to `static` on
  **both** sides took the same page to 0.00-6.71. **When a screenshot harness says everything
  differs, suspect the capture before the page** — the second time this rebuild has learned
  that, after the `<noscript>` block-indexing slip.
- **A lazy image that is scrolled past never settles.** Walking the page starts lazy loads but
  returning to the top leaves off-screen ones unresolved, and `img.complete` then reports true
  for an image that never began. The search panel read 12px short on the reference because of
  it — the same flower icon /programs/ug-programs-atlas records. Forcing every
  `loading="lazy"` image to `eager` before waiting fixed it.

**Known divergences (one, and it is the shared FAQ):** the FAQ block measures **+15px above
768 and -25px below**, and the arithmetic is exact — `components/Home/FAQ` uses the ATLAS
`SectionHead.SECTION` (60px of vertical padding, 40 below 768) where an ISDI section is 50 at
every width (+20 / -20), and the shared component draws a divider under all seven items where
Bootstrap's `.accordion-flush` drops the first item's top and the last item's bottom (-5). The
page wrapper's `-my-2.5 max-md:my-2.5` already cancels the padding half of that in the flow, so
the **gap to its neighbours is right and only the block's own box differs**. The FAQ is one
design site-wide and only its `data` differs, so it is left alone and flagged — the same call
every earlier page made.

**Not reproduced, and recorded rather than silently inherited:** the Key Dates button's
doubled-path href (above). **Still open for the user:** the four sibling Admissions routes the
ISDI menu links — `undergraduate/b-tech`, `postgraduate/m-des`, `postgraduate/mba` and
`pre-university-summer-school` — 404 until they are built, and the menu has linked them since
the header was ported.

#### Regression check on the two pages that share components with this one

Nothing shared changed in this session — every edited file is this page's own — but both origin
pages were re-measured against production anyway, block by block, at 1440 and 390.

- **/schools/isdi/about-us: 12/12 blocks, and the only difference is its FAQ** (-2 at 1440,
  -42 at 390), which is that page's already-recorded bucket. `About/AnchorMenu`'s `centered`
  prop is a no-op there, as intended.
- **/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft: clean at 1440** apart
  from the shared FAQ (+15) and +8 on the programme block. **At 390 its programme block read
  +369.1**, explained at the time as one semester clip rendering 615.1px tall here against
  production's 150px.

  **CORRECTION (2026-10-24). That was a measurement race, not a defect.** The reference's
  `.video-auto` is `width: 100%; height: auto`, so a `<video>` whose metadata has not
  arrived yet lays out at the UA's default 300x150 — which is the "150px" that was
  measured. Given long enough to load, production renders the clip at its own ratio and so
  do we: re-measured with the clip at `readyState 4` on both sides, the semester boxes are
  **418 x 743.1 at 1440 and 346 x 615.1 at 390, identical**. Wait for `readyState` before
  comparing a `height: auto` video.

  One real defect was underneath it, though, and it is now fixed. `Curriculum` passed
  `object-contain` and `InViewVideo`'s base string carried `object-cover`: **two utilities
  of the same kind in one class list are resolved by stylesheet order**, so `cover` won on
  all sixteen programme pages. `InViewVideo` takes a `fit` prop now. It is inert today —
  `height: auto` means the box already matches the clip's ratio, so the two values paint
  the same — but it was the wrong computed value and it crops the moment a box is
  constrained.

Site-wide, all 52 built routes were swept at 1440 and 390: **0 with horizontal overflow, page
errors, failed requests or broken images.** Two non-content routes log one console message each
— `/_not-found` (its own 404) and `/api/instagram/media/[id]` (a route *pattern*, which answers
400). Requests off-origin occur only on routes carrying a YouTube player or a Google Map and
are those embeds' own (fonts.gstatic, i.ytimg, maps.googleapis); this page makes none.

## The ISDI reference is a moving target — re-check a built page before trusting it

`reference/schools/isdi` was refreshed from upstream on 2026-10-23 and the refresh changed
**content on pages that were already finished**. A full audit of all 61 ISDI reference pages
lives in `MIGRATION-ISDI.md` (status per page, verified differences, next action). Two habits
follow from it:

- **Diff the rendered production markup against the shipped data, not just the PHP against the
  data.** Two of the four changed values exist only on production: the mirrored
  `loans/education-loans.php` still lists four lenders where production serves five, and the
  Key Dates table's second `<b>` group is not in the mirror at all.
- **Check each page against ITS OWN reference.** Upstream updated most pages and left three on
  the old copy, so a blanket find-and-replace would have been wrong three times. The clearest
  case: `mba-in-design-management-strategic-thinking.php` still reads "refundable", so the port
  that reads "refundable" there is **correct** and must not be "fixed".

### The data-only correction pass (2026-10-23)

Nineteen built programme pages were each re-derived from their own current reference and
**19/19 now match** (`scratchpad/audit/verify.py` asserts the rendered href and wording against
the reference per route):

- **16 Fee Structure hrefs** moved off the single fliphtml5 brochure to the per-programme URLs
  upstream now uses — `/fee-structure/bdes/` (12 B.Des), `/fee-structure/isdi-btech/` (2 B.Tech),
  `/fee-structure/mdes/`, `/fee-structure/dmst/`. **The URL differs by programme**; do not
  assume `bdes`.
- **7 enrolment-wording fixes**, "refundable" -> "Nonrefundable". Only seven: the other five
  B.Des ports were transcribed from production after upstream had already changed it, and
  `programs-mba/design-management` is deliberately left alone.
- Fee *amounts* were checked too (application ₹3,500/₹1500, enrolment ₹50,000) and all 19 pages
  already matched — no change needed.

**A renamed programme needs a redirect, not just a rename.** Upstream renamed
`btech/btech-ai-integrated-design.php` to `btech/ai-engineering-&-intelligent-products.php` —
a true rename, the two files differ in exactly four lines. The route folder, the nav `href` and
**the nav label** ("B.Tech in AI Integrated Design" -> "AI Engineering & Intelligent products")
all moved, and `next.config.mjs` gained a **308** from the old path, because that path was the
live URL before the rename. `lib/schools/isdi/programs-btech/ai-integrated-design/` keeps its
folder name: it is internal and not a URL.

**Three traps in the verification harness itself, all of which produced false failures:**
- **Next repeats every href inside its embedded JSON payload**, where the closing quote is
  escaped — so a URL regex ending in `[^"]*` also matches the same URL with a trailing
  backslash and every page "fails". Strip it, or stop the class at a backslash.
- **`&amp;` in a crawled href is not a 404.** A link checker that tests the raw attribute
  instead of the decoded URL reported every `&`-bearing B.Des route broken.
- **A substring class-name filter eats real blocks.** Dropping any element whose class
  *contains* "header" also drops `.inner-header-wrapper`, which is a HERO — it shifted every
  later block by one and made /schools/isdi/about-us look entirely broken. Match whole class
  tokens.

### ISDI B.Tech Admissions — `app/schools/isdi/admissions/undergraduate/b-tech/page.js`, `lib/schools/isdi/admissions-isdi/b-tech/`

`reference/schools/isdi/admissions/undergraduate/b-tech.php` — the second of the five ISDI
Admissions pages, on the same ten-block template as B.Des (`$css` and `$body` identical).
**No new component and no new asset**; the page is data plus two additive capabilities.

**It fatals locally like the ATLAS Admissions pages** — `new mysqli(…)` on line 15, before a
byte of body output — so every value is read from production.

**Four of the ten blocks are the B.Des page's, re-exported rather than transcribed twice.**
The anchor menu, the scholarship band, Education Loans and the FAQ are byte-identical on both
references (verified run by run, not assumed): the loans and "More questions?" come from the
same shared includes, and the FAQ is the same `faq/isdi/admissions/ug.php` — which is why a
B.Tech page carries seven questions written about **B.Des**. Transcribed as authored.

**Zero assets.** The hero photograph is the *same CDN file* as the B.Des Admissions hero
(`68e8e3f2f188fec5275325e8_nav-bar.png`), and the apply-step images, fee polygon, scholarship
washes, lender logos and FAQ arrow were all already on disk. The only other image the file
names, `Polygon 2.png`, appears solely inside commented-out markup. **Hash the hero before
adding it** — the fourth page in this rebuild whose "new" hero was an existing file.

#### What this page turned up

**The include it needs is not in the mirror.** `b-tech.php` includes
`/assets/include/keydates/bdes-btech.php`, which does not exist in `reference/` at all —
only `bdes.php`, `btech.php` and their siblings do. The Key Dates table is therefore read
entirely from production, and so is the one structural difference it carries:

**`keydates/bdes-btech.php` authors no trailing `<br><br>`** where `keydates/bdes.php` does
(verified: 2 `<br>` after the button row on B.Des, 0 on B.Tech). That is a flat **48px** of
block height at every width — the single largest delta on the page before it was fixed.
`KeyDates` takes `data.trailingBreaks`, defaulting to rendering them so the B.Des data needs
no change.

**Four apply steps, not five, and the tone belongs to the classes.** The reference comments
out its fifth `.gd-steps` card line by line and re-labels the rest, so "Final Selection &
Offer Letter" is step **04** on the `tbg3` tone here where it is step 05 on `tbg3 isdi` on
B.Des. The colours were measured on this reference rather than taken from B.Des by position —
`tbg1 isdi-blue-5` #173a87, `tbg2 isdi` #0a46ca, `tbg2 isdi-blue-5` #193e90, `tbg3` #0f2d6f.
The same trap `/advantages`' `Admissions` band already records.

**The eligibility bodies carry LISTS, a first for this template.** All three groups are
B.Tech's own, and the IB group is `<p>` + `<ul>` three times over. `Eligibility`'s body is now
an ordered block list — a plain string is a paragraph, `{ list, items }` is a list — the same
shape `components/Home/FAQ` uses. Measured with every dropdown forced open:
`.content-blue-fill` is `padding: 24px`, each `<p>` is 16px/24 with `margin-bottom: 10px`, each
`<ul>` is `margin-bottom: 10px; padding-left: 40px` disc/outside, and the `<li>`s carry no
margin and **no inner `<p>`** (unlike the FAQ's). Preflight zeroes all of it, so all of it is
restated.

**That discovery is also a gap on the finished B.Des Admissions page.** Its IB dropdown has
`<li>` items in the reference that the port never transcribed — invisible in every earlier
measurement because the dropdowns start **closed**, so the block's height matched at all
twelve widths regardless. **A closed disclosure hides a content gap from a height diff**;
open it before trusting the match. Flagged for the user rather than fixed here.

**Content differences from B.Des, transcribed as authored:** the hero names B.Tech; step 01
lower-cases "Submit the application form"; the Key Dates caption is authored with a **leading
space** inside its `<strong>`; its fourth row reads "Technical Aptitude Test" with **no**
`<br class="br">`, so that row stays one line at every width; the Fee Structure brochure is
`/fee-structure/isdi-btech/`; and the Key Dates button's label spells the programme
"**B.tech**". Every fee figure (4 Years, 3500, 50,000, 7,35,000) is the B.Des page's.

**Reference notes, not reproduced:**
- The Key Dates button's href repeats the site path
  (`…/schools/isdi/schools/isdi/admissions/undergraduate/b-tech`). Production answers 200 on
  it with the ATLAS **homepage** — the same catch-all soft-404 the B.Des button hits — so the
  port links to the page's own route, recorded beside the href.
- `$description` still promises "portfolio tips" and a "design career" on a page whose
  admissions band now reads "Technical Aptitude Test" and has no portfolio step at all.
  Transcribed as authored.

#### Verified

Measured against production at **1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 /
479 / 390 / 360**:

- **Nine of the ten blocks match the reference height to the pixel at all twelve widths.**
  The tenth is the shared FAQ's known bucket (+15 above 768, −25 below).
- **Per-block screenshots**: `menu`, `how-to-apply` and `search` are pixel-identical at every
  width (0.00–0.02), `key-dates` is 0.00 from 992 down, and no block outside the FAQ exceeds
  **6.71** mean — the `education-loan` font-metric track variance the B.Des page already
  documents.
- **Text content** compared run by run against production: every block identical. The two
  apparent differences are a closed disclosure (our dropdown bodies mount on open) and
  Cloudflare splitting each lender e-mail into its own node.
- **79/79 interactions** at 1440 and 390, including the four numbered steps and the IB
  dropdown's 1/1/3 lists.
- `validate.py` clean at all twelve widths: 0 overflow, console, page errors, failed requests,
  broken images, **0 requests off this origin**.
- `npx eslint .` and `npm run build` both exit 0; the route builds `○ Static`.

### ISDI M.Des Admissions — `app/schools/isdi/admissions/postgraduate/m-des/page.js`, `lib/schools/isdi/admissions-isdi/m-des/`

`reference/schools/isdi/admissions/postgraduate/m-des.php` (`$css =
"…690ca47b295c3cd130e0a8a2-4738d5664.css"` — the first of the three Admissions pages with a
sheet of its own; `$body = "body isdi-page"`) — the third ISDI Admissions page and the
header's "Admissions > Postgraduate Degree > M.Des". The same ten blocks in the same order
as B.Des and B.Tech, so `components/Schools/ISDI/Admission/` carried it.

**It fatals locally the same way** — `new mysqli(…)` before any body output — so every
value was read from production, including the six Key Dates figures
(`getAdmissionCyclesCon($conn, 6)` through `showDateCon()`, which is why "Acceptance
Deadline" reads a literal `Closed`).

**Three of the ten blocks are a different SHAPE, not different copy**, which is what the
page's own `$css` buys:

- **Key Dates is a date STRIP**, not the Bootstrap table `keydates/bdes*.php` renders —
  `.dates-fees-container.isdi > .df-container-atlas > 6 x .df-card`, and with no button
  under it. `KeyDates` grew a second form for it.
- **Eligibility is two `.ln-bd-txt` rich-text blocks with no dropdowns at all**, so the
  component's `text` form (runs: a string, or `{strong}`) renders it.
- **The FAQ is its own nine-question M.Des set** (`faq/isdi/admissions/pg-mdes.php`), not
  the undergraduate pages' shared include.

The anchor menu, the scholarship band and Education Loans are byte-identical to the B.Des
page's and are re-exported rather than transcribed twice.

**This page adds no asset.** Its hero, apply-step images and fee polygon are all already on
disk, and the strip's `Polygon-atlas.png` is SHA-1-identical to the ATLAS Admissions pages'.

#### Three findings, two of them latent bugs on the two finished undergraduate pages

**The date strip has a breakpoint of its own, and it is 768 INCLUSIVE.** `.df-container-atlas`
is declared in exactly one place — `keydates/mdes.php`'s own `<style>` — and it turns the row
into a column at `@media (max-width: 768px)`, one pixel wider than the `@media (max-width:
767px)` rules the Webflow sheet gives the cards inside it. So at exactly 768 the container is
already a column while every card still has its desktop padding and width. Reading the sheet
and assuming Webflow's 767 left the block **499px short at 768**. Hence `max-768` in
`tailwind.config.js`, beside `max-md`.

**`.mrg-mo-top` is not on every page, and assuming it cost 20px below 768.** The fee strip's
`.df-container.isdi` carries `.mrg-mo-top` (20px of top margin at <=767) on
`…/undergraduate/b-des` and `…/b-tech` and **not** here — verified by grepping the rendered
class attribute on all three productions. It travels as `data.mrgMoTop`, defaulting to
carrying it so the two undergraduate pages are untouched.

**`.df-card` has a left border and a justify ladder the first port of it missed.** The base
rule is `border-left: 1px solid rgba(0,0,0,.1)` (its `border-right: 1px #0000001a` omits
`border-style`, so it paints nothing — the trap `.port-card-m-posi-atlas` already records),
`align-items: flex-start`, `flex: 1` (basis **0%**, so `flex-1` alone, not `flex-1 basis-0`)
and `justify-content: space-around` replaced by `flex-start` from `@media (min-width:
1440px)`. That last pair is one class string, `justify-around 2xl:justify-start`, because two
`justify-*` utilities in one list are resolved by stylesheet order rather than by the order
they are written — the same call `Admissions/FeeStructure` already makes.

**An invisible character is not a difference, and a stray `<strong>` is.** The eligibility
copy differs from production's only by U+FEFF zero-width no-break spaces in the CMS text
(including one line made of nothing else), which paint no height — the block measures
identical at all twelve widths. The five bold runs, the **empty** fifth one included, match
production's text, weight and width exactly.

#### Verified

- **9 of 10 blocks match production's height to the pixel at all twelve widths**
  (1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360). The one
  exception is the FAQ's usual bucket (+13 above 768 / −27 below, over nine items).
- **CORRECTION, found while porting the MBA Admissions page.** This section first recorded
  a `key-dates` delta of **+15.4 at 1280** and explained it as font metrics — the
  self-hosted `Poppins ISDI` being ~4% wider than the Poppins production resolves to on
  this machine, wrapping "25th Nov 2026" one line early in a 126.2px cell. That reasoning
  was wrong. The real cause was that **`showDateCon()` wraps every ordinal in a `<sup>` and
  the port was flattening it**: "25<sup>th</sup>" renders ~4px narrower than "25th" at
  18px/700, which is exactly the margin that decided the wrap. With the `<sup>` runs
  restored the block matches at 1280 too. The lesson is the general one — **a width
  difference between two renderings of "the same" string is a markup difference until
  proved otherwise**; comparing `textContent` hides a `<sup>`, a `<b>` and every other
  inline tag.
- **Text content identical to production, run by run**, block by block, with the FAQ opened:
  all ten blocks, apart from the U+FEFF characters above. All 12 links match in label, target
  and `target="_blank"`.
- **113/113 interactions** at 1440 and 390 — the menu's seven links and their scroll
  behaviour, the strip's six cards and its twelve date strings, the absence of a table, a
  button and any dropdown, the three head-row buttons, the four fee figures, the five lender
  logos and the nine-item single-open FAQ.
- Screenshots at 1440 / 1280 / 768 / 479 / 390: every block but the FAQ at **0.00-6.71 mean
  pixels** (the hero holds a playing background video; `education-loan` 6.71 at 768 is the
  figure the B.Des page already carries).
- `validate.py` clean at all twelve widths: 0 overflow, console, page errors, failed
  requests, broken images, **0 requests off this origin**.
- **The two finished Admissions pages were re-measured after every shared-component change**
  and are unchanged: B.Des and B.Tech both show the FAQ bucket alone at all twelve widths.
- `npx eslint .` exits 0 and `npx next build` succeeds from a cleared `.next`; the route
  builds `○ Static`. `regress.py` sweeps all 54 built routes at two widths with no console
  errors, page errors, failed requests, broken images or horizontal overflow — the only
  entries are `/_not-found` answering 404 and the `[id]` placeholder of the Instagram media
  route answering 400, and the only off-origin requests are the Google Maps and YouTube
  embeds' own sub-resources.

### ISDI MBA Admissions — `app/schools/isdi/admissions/postgraduate/mba/page.js`, `lib/schools/isdi/admissions-isdi/mba/`

`reference/schools/isdi/admissions/postgraduate/mba.php` (`$css =
"…690ca4c8ab3a51085791bf1a-ffac23949.css"`, its own sheet; `$body = "body isdi-page"`) —
the fourth of the five ISDI Admissions pages and the header's "Admissions > Postgraduate
Degree > MBA". **No new component**; three existing ones took it with additive props.

**It fatals locally the same way** — `new mysqli(…)` on line 15, before a byte of body
output — so every value is read from production, including the **twelve** date figures
across its two strips (`getAdmissionCyclesCon($conn, 7)` and `(…, 8)` through
`showDateCon()`).

**It is m-des.php with four blocks changed — but the BLOCK LIST is not the same.** The two
files differ by 128 diff lines and it is tempting to treat this as a copy with new copy. It
is not:

- Key Dates includes `keydates/mba-dmst.php` (cycle 7) rather than `keydates/mdes.php`
  (cycle 6);
- **where the M.Des page includes `loans/education-loans.php`, this page includes a SECOND
  date strip**, `keydates/mba.php` (cycle 8);
- so **there is no Education Loans grid on this page at all**, while the sticky menu still
  links "Financial Assistance" to `#education-loan`. Verified on production: that id occurs
  **zero** times in the document. The orphaned anchor is transcribed as authored;
- the FAQ is `faq/isdi/admissions/pg-mba.php`, **eight** MBA-specific questions (M.Des has
  nine, and the two sets share no question).

**A block can be authored with no section, no container and no id.** That second strip is a
`.df-container-atlas` placed directly in `.main-wrapper`, so it is **full-bleed** — 1440px
wide at a 1440px viewport, against the first strip's 1242 — and it keeps its own 32px radius
rather than being clipped to 16 by the `.dates-fees-container.isdi` every other strip sits
in. `KeyDates` gained a `bare` form for it (and a `block` prop, since it cannot be a second
`#key-dates`).

**Four more per-page differences behind identical class names**, each measured rather than
inherited from the M.Des port:

- `.list-text-wrap` wraps the eligibility copy here and not on the M.Des page — `display:
  flex; gap: 16px; align-items: center; margin-bottom: 32px`, so 32px of block height. It
  is `data.listWrap`.
- **The same eligibility sentence is marked up differently.** Eight `<strong>` runs here
  against the M.Des page's five: the first bolds "minimum of 4 years in an undergraduate
  degree program" *without* the trailing ", regardless of the field,", and the second block
  bolds "160 credits", "4 years" and "Any major or discipline" that the M.Des page leaves
  plain. A text diff would not have shown it.
- **Every one of the four fee cards is marked up differently** while the figures are
  identical. The lead value is `2 years` with **no `<strong>` at all** (lower-case "years");
  its `.df-text-3` note prints the card's own title a second time ("Total Duration") where
  M.Des reads "*Indicative & subject to change"; and `.fee-dates` is on "1500" **only**, so
  50,000 and 6,06,400 are bare `<strong>`s at a flat 700 where M.Des gives all three the
  class and 600. Hence `FeeStructure`'s run form — a string is plain text, `{ strong }` is a
  bare `<strong>` (700) and `{ strong, feeDates: true }` is 600.
- the fee brochure is still the shared fliphtml5 booklet, **not** the per-programme
  `/fee-structure/…` URL the other three were moved to.

**The reference numbers its five apply steps 01 / 02 / 02 / 04 / 05** — "02" twice and no
"03". Transcribed as authored, and it surfaced a latent bug: `ProgramDetail/Admissions`
keyed each step on `step.num`, which is a **duplicate React key** here. Index-qualified now
— the fifth place in this rebuild to need it.

#### Two latent bugs in already-finished pages that this page surfaced

**`showDateCon()` wraps every ordinal in a `<sup>`, and the M.Des strip was flattening it.**
`22<sup>nd</sup> Nov 2026` was shipping as the plain string "22nd Nov 2026", which renders
~4px wider at 18px/700 — enough to wrap one cell a line early. A strip value is a run list
now (`['25', { sup: 'th' }, ' Nov 2026']`), reusing the `Runs` renderer the table form
already had, with `{ bold }` added for `showDateCon()`'s literal `<b>Closed</b>` (its parent
is 700, so Preflight's relative `bolder` would make it 900). **That is what the M.Des
page's documented "+15.4 at 1280 font-metrics delta" really was**; the correction is
recorded in that section, and M.Des now matches at 1280 as well.

**`.image-8` is `display: none` below 768, and all three polygons were being painted.** The
rule is on the bare class, so it reaches the fee card's polygon as well as the key-dates
one — on B.Des, B.Tech and M.Des too. Both components now carry `max-md:hidden`. The
element is absolutely positioned at `right: -16px` inside an `overflow: hidden` container,
so nothing moved on any page; the computed style was simply wrong. Verified all three
polygons `block` at 1440 and `none` at 390 on both sides.

**This page adds no asset.** All fourteen URLs it paints were already on disk (SHA-1 against
`public/`): the hero is the same CDN file every ISDI Admissions hero uses, the apply-step
images are the B.Des programme page's, and both polygons, the two scholarship washes, the
flower, the search glyph and the FAQ arrow were already local. The four that the hash scan
called "new" are the hero PNGs, which ship as their WebP conversions.

#### Verified

Measured against `https://atlasuniversity.edu.in/schools/isdi/admissions/postgraduate/mba`
at **1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360**:

- **9 of 10 blocks match the reference height to the pixel at all twelve widths** — both
  date strips, the full-bleed one included, on the first run. The tenth is the shared FAQ's
  known bucket (+14 above 768 / −26 below, over eight items).
- **Per-block screenshots at 1440 / 1280 / 768 / 479 / 390**: `menu`, `how-to-apply`,
  `key-dates`, `eligibility` and `search` are **pixel-identical (0.00)** at every width, the
  bare strip is 0.00-0.99, and no block outside the FAQ exceeds **5.53** mean (the hero,
  which holds a photograph under a scrim).
- **Text identical to production, run by run**, all ten blocks with the FAQ opened, apart
  from the U+FEFF zero-width characters in the eligibility CMS copy. All 12 links match in
  label, target and `target="_blank"`.
- **175/175 interactions** at 1440 and 390 — the ten blocks in order, the six menu links
  that resolve *and* the one that deliberately does not, the apply band's 01/02/02/04/05,
  the first strip's six cards with their five `<sup>` ordinals and its `<b>Closed</b>` at a
  flat 700, the second strip's six cards and its measured full-bleed box, the absence of any
  dropdown, table, button or Education Loans content, the eight eligibility bold runs, the
  four fee figures with 1500 at 600 against 50,000 / 6,06,400 at 700, and the eight-item
  single-open FAQ.
- `validate.py` clean at all twelve widths: 0 overflow, console, page errors, failed
  requests, broken images, **0 requests off this origin**.
- **The three finished Admissions pages were re-measured after every shared-component
  change**: B.Des, B.Tech and M.Des all show the FAQ bucket alone at all twelve widths, and
  M.Des's 1280 `key-dates` delta is now gone.
- `npx eslint .` exits 0 and `npx next build` succeeds from a cleared `.next`; the route
  builds `○ Static`. `regress.py` sweeps all 55 built routes at two widths with 0 overflow,
  0 page errors, 0 failed requests and 0 broken images — the only console entries remain
  `/_not-found` answering 404 and the `[id]` placeholder of the Instagram media route
  answering 400.

**Still open, unchanged by this page:** the shared FAQ's `.accordion-title` bucket.
(The divider, the `ProgramDetail/Curriculum` video question and the five PathFinder
short-slug links were all resolved on 2026-10-24 on the user's approval — see the
ATLAS ISDI Advantage section.)

### ISDI Pre-University Summer School Admissions — `app/schools/isdi/admissions/pre-university-summer-school/page.js`, `components/Schools/ISDI/SummerSchool/`, `lib/schools/isdi/admissions-isdi/summer-school/`

`reference/schools/isdi/admissions/pre-university-summer-school.php` (`$css =
"…68e8ec9420dff9b7215ce475-506de4974.css"`, its own sheet; `$body = "body-isme"`, **not**
`body isdi-page`) — the fifth and last ISDI Admissions page.

**It is not the Admissions template at all**, and assuming it was would have been the one
expensive mistake here. No `.course-cover-section` hero, no sticky anchor menu, no Key
Dates, Eligibility, Fee Structure, Scholarships, Education Loans or "More questions?"
panel. It is the Summer School **programme** page
(`/schools/isdi/programs/pre-university-summer-school`) with four blocks added — and
**it opens no database connection at all**: no `mysqli`, no `getAdmissionCycles`, no
`showDate`. Nothing on this page is a snapshot. It was still measured against production,
because the local mirror renders in quirks mode and its ISDI `$domain` is broken.

Twelve top-level blocks; eleven render:

|  | block | |
| --- | --- | --- |
| 1 | hero | `.inner-header-wrapper`, 658px, background video, **two** buttons |
| 2 | four figures | `.top-cards-wrapper.padbtm0` |
| 3-4 | What is… / Your Creative Journey | **identical to the programme page** |
| 5 | **A Day in the Life** | the week grid — NEW |
| 6-8 | Hear from Our Young Creators / Why Join / Highlights | **identical** |
| 9 | **Dates & Registration** | a four-step `.gd-steps` band — NEW |
| 10 | **`#smr-form`** | a live NoPaperForms enquiry widget — NEW |
| 11 | the brochure popup | a 0-height `w-embed`; `BrochureButton` owns it |
| 12 | **FAQ** | nine Summer School questions — NEW |

**Five of the eleven are byte-identical to the programme page** — compared on production
block by block, line by line and image by image, and each measures the same height to the
pixel — so all five are re-exported from `programsSummerSchoolContent` rather than
transcribed twice. The hero differs in exactly two ways: the lead reads **Grades 8-12**
where the programme page reads 9-12, and the "Download Brochure" button is **live** here
and commented out line by line there.

#### The week grid

Seven 164px flex columns (`gap: 15`), each a `space-between` column with a 16px gap, 725px
tall at 1440 — and at <=767 the wrapper bleeds 21px either side, pads 20 back in and
becomes a horizontal scroller. There is no repeating card shape: the stylesheet names
**sixteen** cells individually, so the cells travel as a `kind` plus their copy and
`SummerSchool/WeekGrid` holds one measured class string per kind. Several cells carry a
`background-blend-mode` (`overlay`, `soft-light`, `screen`) that is the whole reason they
read as they do, and two `.isdi` modifiers cancel the base rule's artwork — reading the
sheet without checking the computed value gets both wrong.

**An empty element is still a FLEX CHILD.** The Monday column opens with a `.w-embed`
holding only the page's inline `<style>`. It is 0x0 and paints nothing, but it is a child
of a `justify-content: space-between` column with a 16px gap, so it consumes a gap *and* a
distribution slot: leaving it out moved every Monday cell up to **13.5px**. Rendering an
empty `<div>` closes it exactly. This is the "an empty element is still a box" rule one
step further out — the box can be zero in both dimensions and still move its siblings.

**Six `<img class="grid-hover-img">` are authored and not one ever paints.**
`.grid-hover-img` is `display: none`, and the only rule that would reveal one is the page's
own inline `.mon-cell-1:hover .hover-img { display: block }` — `.hover-img` is a class no
element on the page carries. Verified on production: all six compute `display: none` at
every width. They are not rendered and **their six files are not shipped**.

#### Two latent bugs in already-finished pages that this page surfaced

**`min-w-0` on a four-card stat band is wrong, and it was wrong on the programme page too.**
`SummerSchool/Stats` had copied `ui/StatBand`'s `min-w-0`, which that component genuinely
needs because its **six**-card band overflows 768. `.head-top-card` is `flex: 1 1 0` with
the default `min-width: auto`, so each card floors at its own longest word and the row
distributes unevenly — 169.5 / 207.2 / 156.5 / 234.8 at 768 here. `min-w-0` let these four
shrink past that floor and gave 172 / 212 / 172 / 212. Four cards fit, so the floor stands.
Removing it took both Summer School bands to an exact match at 768 and the band's
screenshot from 8.57 to **0.00**.

**`About/Hero` hard-coded the desktop button row.** `.buttons-wrapper` is gap 16 /
padding-top 30, gap 8 from 991, and at <=767 a left-aligned **column** with padding-top 24,
then 14 at <=479. The component rendered `flex items-center gap-4 pt-[30px]` at every
width. Only this page has two buttons, so the column itself never showed on the About or
programme-page heroes — but **their padding-top was wrong at every width below 768 and no
height diff could see it**, because the hero is a fixed-height box and nothing inside it
changes that height. Found by diffing the hero's own geometry against production, not the
block. After the fix the programme page's hero, stats band and every block height match
production exactly at 1440 / 768 / 390.

A third, smaller one: `CreativeJourney` printed `card.title` raw while the data carried the
authored `<br>` in "Experiment & <br>Collaborate". Same height, different break — caught by
the text diff, not the height diff. The **eighth** field in this rebuild to need
`withBreaks`.

#### Reuse

Eight existing components carried eleven of the twelve blocks. Two are new and both are
this page's own shape: `SummerSchool/WeekGrid` and `SummerSchool/EnquiryForm`. Three
components changed, all additively:

- `About/Hero` takes an optional `brochure`, so a button authored `href="#"` with a
  `data-id` renders through `BrochureButton` instead of `PrimaryButton` — a control that
  opens a dialog is a `<button>`, which is why the port has 2 links where the reference has
  3;
- `ProgramDetail/Admissions` needed nothing: its lead-and-button form, with the
  `.isdi-guide-wrapper`'s 60px of top padding, is exactly what "Dates & Registration" is;
- `SUB_1_MRGBTM` (`.sub-heading-1.mrgbtm`, 18px/1.8) moved from `CreativeJourney` into
  `Home/ui`, because the week grid's lead uses it too.

**The enquiry form is a live third-party embed, and that is the reference's own.** The page
injects `widgets.in5.nopaperforms.com/emwgts.js` **inline**, not behind a click as the
brochure popups do, so the port loads it when the block mounts. That makes this the **only
page in the ISDI port that contacts a remote host on load** — a deliberate reproduction,
flagged rather than silently dropped. On localhost the widget answers **403** to its own
`/register` call (a referrer check), so the right half of the panel is empty here and
painted on production; `.npf_wgts` is pinned to its measured 700px so the box holds either
way.

**Assets: 13 new, 856KB before optimisation.** All thirteen are week-grid backgrounds
painted only by the stylesheet, under
`public/assets/images/schools/isdi/programs/admissions/summer-school/week/`. Twelve are
authored at the cell's own 164px width and ship byte-for-byte; `tue-ideation.png` is
899x783 for a 164x192 `cover` cell and is a 441px WebP (530KB -> 23KB, SSIM 0.9957 at
display size). Everything else the page paints — the hero video and poster, the six
"What is" photographs, both `.isdi-application` washes, the four step images, the two stat
vectors, the quote icons and the FAQ arrow — was already on disk.

#### Verified

Measured against `https://atlasuniversity.edu.in/schools/isdi/admissions/pre-university-summer-school`
at **1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360**:

- **10 of 11 blocks match the reference height to the pixel at all twelve widths**,
  including the week grid, Dates & Registration and the form block. The eleventh is the
  shared FAQ's known bucket (+21 above 768 / −19 below, over nine items). The one other
  delta anywhere is `voices` **+24 at 700**, the container-width fix `Home/PeopleVoices`
  already carries.
- **Text identical to production — 0 diffs across all eleven blocks**, with the FAQ opened.
- **The week grid diffs cell by cell to 9 of 34 cells at 1440 and 390**, and every one of
  the nine is a non-diff: seven are the day labels, ~1px wider in the self-hosted Manrope
  (production loads none and falls back to the system sans-serif), and two are paint
  properties the reference declares on boxes whose `.isdi` modifier sets
  `background-image: none`, so they paint nothing. **Every cell's box geometry matches.**
- **Per-block screenshots at 1440 / 1280 / 768 / 479 / 390**: `stats`, `highlights` and
  `admissions` are **0.00**, and every block outside `hero`, `form` and the FAQ is at or
  below **5.5** mean.
- **The `hero` and `form` screenshot deltas are the video and the widget, proven not
  assumed.** With the `<video>` and the `.npf_wgts` hidden on both sides, both blocks are
  **pixel-identical (0.00-0.11) at 1440 / 768 / 390 with 0 differing nodes**.
- **142/142 interactions** at 1440 and 390: the eleven blocks in order, the absence of all
  seven pieces of Admissions furniture, the hero's 658px and its one link, the brochure
  dialog opening into the measured 580px panel with the CRM script inside and closing on
  Escape, the week grid's seven columns and their upstream day spellings, its nine CLASS
  cells, its Manrope, its mobile scroller, both carousels, the "Know more" scroll to
  `#smr-form`, the widget host's `data-w` / 700px and its single injected loader, and the
  nine-item single-open FAQ.
- `validate.py` at all twelve widths: **0 horizontal overflow, 0 page errors, 0 failed
  requests, 0 broken images**. One console entry per width and two off-origin requests per
  width, both the NoPaperForms widget described above.
- **The four other Admissions pages and both pages sharing the changed components were
  re-measured**: B.Des, B.Tech, M.Des and MBA show the FAQ bucket alone at all twelve
  widths; `/schools/isdi/programs/pre-university-summer-school` is **0 diffs** on block
  heights, hero geometry and stat-card geometry at 1440 / 768 / 390; `/schools/isdi/about-us`
  shows only its own documented FAQ bucket.
- `npx eslint .` exits 0 and `npx next build` succeeds from a cleared `.next`; the route
  builds `○ Static`. `regress.py` sweeps all 56 built routes at two widths with **0
  overflow, 0 page errors, 0 failed requests and 0 broken images**.

**Deviations (three, all shared with the set):** the FAQ's divider / `.accordion-title`
buckets; `QuoteCard` held to the container width between 568 and 767 (+24 at 700); and the
self-hosted Manrope, which here costs ~1px on each of the seven week-grid day labels.

**The ISDI Admissions section is complete — five pages.**
`reference/schools/isdi/admissions/` holds nothing else.

## ISDI ATLAS Advantage — `reference/schools/isdi/atlas-isdi-advantage/`

Four pages: `the-isdi-advantage/index.php`, `internationalisation/index.php`,
`industry-centric-approach.php` and `global-pathway/index.php`. The header menu links
the first three; `global-pathway` is the unlinked fourth.

### ISDI The ISDI Advantage — `app/schools/isdi/atlas-isdi-advantage/the-isdi-advantage/page.js`, `components/Schools/ISDI/Advantage/`, `lib/schools/isdi/advantage/`

`reference/schools/isdi/atlas-isdi-advantage/the-isdi-advantage/index.php` (`$css =
"…68e627c41ec6f0a16902d5e6-59120e946.css"`, its own sheet; `$body = "body isdi-page"`)
— the first of the ISDI menu's "ATLAS ISDI Advantage" column, and a **fourth ISDI
template**: a photographic hero, the About page's sticky anchor menu, an overview pair,
nine numbered `.icon-heading` sections, a publications carousel, "More questions?" and
the FAQ. Fifteen blocks.

**It opens no database connection at all** — no `mysqli`, no `getAdmissionCycles`, no
`showDate` — so nothing on it is a snapshot. It was still measured against production,
because the local mirror renders in quirks mode and its ISDI `$domain` is broken.

**The mirror is current for this page.** Its rendered text was diffed node by node
against production and is identical. That is worth stating, because the page pulls two
of its three includes from the **ATLAS reference root** rather than ISDI's own —
`../../../../assets/include/more-questions.php` and
`../../../../assets/include/faq/isdi/advantage/isdi-advantage.php` — and those files
predate the October ISDI refresh. **Resolve an include's `../` path before assuming
which tree it comes from.**

**Production answers 301 on the slashless path** and serves the page at the trailing
slash; Next normalises the other way, and both of the header menu's spellings resolve.
Fetching the slashless URL returns a 332-byte redirect stub.

#### Read all three stylesheets, and the page's own `<style>` as well

The page loads a shared sheet, its own `$css`, and a **third from the Webflow CDN**, and
they are served cross-origin so `document.styleSheets` cannot be enumerated from the
page. `scratchpad/adv1/css.py` fetches all three by URL and prints every rule for a
class with its `@media` condition; it resolved four of the five layout deltas in one
pass, where probing the DOM had only shown the symptom.

And the page's own inline `<style>` carries
`.isdi-page .common-wrapper { padding-top: 50px }` and
`.isdi-page .common-wrapper-lg { padding-top: 100px }`, which beat the sheet's 56/120
AND its `@media (max-width: 767px)` 40/80 — **a compound selector beating a media
query**, for the nth time in this rebuild.

#### What the sheet settled that measurement alone did not

- **`.abt-cont` is `width: 30%` and `.about-image-rect` is `width: calc(70% - 40px)`,
  both `flex: none`.** The row is `align-items: stretch`, so the photograph takes the
  text column's height and `object-fit: cover` crops it. Letting the image size itself
  was **+584px at 1440**: the text column collapsed to its min-content and the
  photograph painted at its natural 1238x734. At <=767 the row wraps, the column goes
  full width and the image takes `width: auto` with `margin-top: 40px`.
- **`.w-background-video` is a fixed `height: 500px`.** The infrastructure clip is the
  only self-hosted video on the page; sizing it from its own 1280x720 ratio was
  **+198.6px at 1440**.
- **`.sub-heading.isdi-blue-text` is 18px/1.7, not a recoloured 24px/1.4** — and being a
  compound selector it survives the `<=767` rule that takes a plain `.sub-heading` to
  16px. Worth +37.6px above 768 and -138.9 below.
- **`.patent-card-content` keeps `height: 377px` at every width**; the `<=767` rule
  overrides its *width* only. `max-md:h-auto` was -86.4px from 700 down.
- **The tertiary tab link is the box, not the label.** `a.tertiary-green-tabs-link-tab-1`
  carries Webflow's own `.w-tab-link { padding: 9px 30px }` and the current one's 8px
  white rule; `.tr-tab-text` inside it is 24px/1 600 with `padding-bottom: 10px` and
  `margin-bottom: -4px`. Rendering the label as the link was 18px short.
- **`.zoom-slider-wrap` is `padding-top: 56px` at every width**, where the plain
  `.swiper.common-swiper` beside it drops to 40 at <=767.
- **`.blue-desc-wrap` becomes a column at <=479, not <=767.**
- Only `.center-image-full-wrap.mrgtp.isdi` is rounded; the three instances without
  `.isdi` are square.

#### Reuse

Fifteen blocks and **not one new card shape of its own** beyond two small ones. Eight
existing components took it as data and six more were extracted for it — each measured
on both references first and each origin page re-verified afterwards:

| extracted | from | now shared with |
| --- | --- | --- |
| `Schools/ISDI/IconHeading` | `ProgramsUg/IconHeading` (moved) | UG + PG Overview |
| `Schools/ISDI/CoreCards` | `SummerSchool/WhatIs` | both Summer School pages |
| `Schools/ISDI/FacultyCard` | `ProgramsUg/WhyDesign` | UG Overview |
| `Schools/ISDI/CardTypeE` | `About/ManagementTeam` | ISDI About |
| `Schools/ISDI/MinorCard` | `ProgramsUg/Multidisciplinary` | UG + PG Overview |
| `ui/PatentCard` | `Success/Patents` | /success-stories-atlas |

`IconHeading` gained `size` (`.icon-num` is 96px/600 here against `.icon-num-sm`'s
64px/500 on the Undergraduate Overview) and `titleId`; `About/Hero` gained an **image**
form and `data.id`; `StatsBand` made its `.large-text` figure optional and lost its
`min-w-0`; `Home/StatsStrip` gained `bare`; `ui/CardTypeF` gained the `base` variant
(16px corners, no logo); `Carousel` gained `bullets="isdi-overlay-light"`.

**`.port-card-i-wrap` and the vision cards are the only genuinely new shapes**, in
`Advantage/ui.js` and `Advantage/Vision.js`.

#### Three carousels were nested inside `.container`, and only a screenshot showed it

`Carousel` and `ZoomSliderLg` pad their own track by the container inset, because the
reference's `.swiper` is `overflow: visible` and bleeds past `.container`'s right edge.
Rendering one INSIDE `.container` therefore applies the inset twice: Global Exposure's
two sliders, Student Welfare's three and the Multidisciplinary Learning row all started
their first card at **x=161 against the reference's 99** — exactly 62px, the container
padding, too far right.

**Every height still matched to the pixel**, because the error is purely horizontal, and
the text diff was clean. It took a per-block screenshot (and then a probe of the first
slide's `getBoundingClientRect().x`) to find it. Fifth time that rule has paid in this
rebuild, after `Carousel`'s original bleed, `PrimaryButton`'s unknown variant key,
`Carousel`'s `align="center"` and the quick-stack cell's column direction. The heading
pair stays in `.container`; the slider is a sibling of it.

#### A latent bug in the shared stat band

`StatsBand` carried `min-w-0`, copied from `ui/StatBand` — which genuinely needs it
because ITS six-card band overflows 768. `.head-top-card` is `flex: 1 1 0` with the
default `min-width: auto`, so a card whose longest word needs more than its equal share
takes it and the rest shrink; that is exactly what this page's three Parsons cards do
(466.66 / 506.67 / 466.67 at 1440). It was a **no-op** on all four pages that already
render the band — verified against production before it was removed — and wrong on the
fifth. The third time this exact trap has appeared, after `SummerSchool/Stats`.

#### Reference notes, transcribed as authored

- **`$title` and `$description` are the ISDI template's unedited placeholders** —
  "ATLAS SkillTech University" and "Get in touch with Atlas Skilltech." Neither mentions
  the page. The same pair the Summer School Admissions page carries.
- **All six "Our Vision & Approach" cards are placeholder copy**: every one reads
  "Transformative Learning" over the same sentence.
- **Core cards #8 and #9 share one photograph.**
- **Two ids are authored twice** — `student-welfare` and `global-exposure-isdi`, each on
  a section AND on its own `.icon-main-title`. Kept on the section only. The three title
  ids that are not duplicates (`Infrastructure-isdi`, `graduate-attributes`,
  `tailored-pathways`) are rendered, and two of them are what the header menu's
  "Graduate Attributes" and "Tailored Pathways" entries point at.
- The page's own sticky menu and the header menu disagree about the column: the sticky
  bar lists Parsons Collaboration and Future Skills, which the header does not, and the
  header lists Entrepreneurship and Graduate Attributes, which the bar does not.
- **Six of the eight "Publications & Research Papers" cards link to the same Medium
  article**; only three distinct hrefs exist on the page. Transcribed as authored.
- **Two dead scripts, neither reproduced.** Every `.slider-card-wrapper` carries
  `data-slider-card-a-bg` and the page ships the listener for it, but the listener
  targets `.slider-card-a` — the same dead script /life-at-atlas documents — and all
  five cards carry the same value anyway; what paints is the authored
  `img.slide-image-a`. And every publications `.card` carries a `.card-embed-code`
  script that writes its own `bg-color` attribute to `style.backgroundColor`; all eight
  author `bg-color=""`.
- **The two videos are embedded two different ways**: #1 is an **embedly** wrapper
  around a YouTube id, #4 a direct YouTube embed. Both take their frame height from an
  inline `padding-top` percentage, and #1's is 56.17%, not 16:9.

#### Assets

202 references, all mapped: **150 new** and **52 reused from elsewhere in `public/`**.
The new ones are 148 images (3.9MB — 101 WebP, 46 PNG, 1 JPEG) under
`public/assets/images/schools/isdi/advantage/<section>/` and the two encodings of one
clip under `public/assets/videos/schools/isdi/advantage/`. 96 of the images were
converted to WebP at SSIM >= 0.9996, taking the folder from 20MB to 3.9MB.

The hero photograph is one of the 52 reuses and is **byte-identical to
/advantages/atlas-advantages'** — re-fetched from the CDN and compared by SHA-1 rather
than assumed, the audit /advantages/atlas-industry-centric-approach's mondelez slip
made mandatory.

The infrastructure clip is 1280x720 and 2m35s: the mp4 ships re-encoded (39.1 ->
22.7MB, SSIM 0.988) and the webm byte-for-byte, because re-encoding it saved only 15%
against a 40% gate. **69MB for one background video is a hosting consideration**, like
the 320MB of /advantages/atlas-internationalisation testimonials — flagged, not solved.

**Two downloader bugs this page surfaced**, both now fixed in `scratchpad/adv1/download.py`:
`data[:3] == b'\xff\xd8'` compares three bytes against a two-byte literal, so four real
JPEGs were reported as soft-404s and silently skipped; and the scanner read `img`,
`srcset` and computed backgrounds but **not `<source>`**, so the infrastructure clip was
missing from the manifest entirely. A `url()` regex that is not anchored on the quoted
form truncates at the literal `)` inside `Vector (1).png` — the trap
/advantages/atlas-advantages already records, hit again here on three vectors.

#### Verified

Measured against
`https://atlasuniversity.edu.in/schools/isdi/atlas-isdi-advantage/the-isdi-advantage/`
at **1920 / 1440 / 1280 / 1100 / 992 / 900 / 768 / 700 / 568 / 479 / 390 / 360**:

- **14 of the 15 blocks match the reference height to the pixel at all twelve widths.**
  The fifteenth is the shared FAQ, and its bucket is now a clean **+20 above 768 /
  −20 below** — exactly `components/Home/FAQ`'s ATLAS `SECTION` padding (60 / 40)
  against an ISDI section's 50. The divider half of that bucket is gone, because the
  divider itself was fixed in this task.
- **Text identical to production in 14 of the 15 blocks.** The fifteenth is
  `welfare`, where the same two strings appear in a different order because the
  `.zoom-slider-lg` is on a different slide — it autoplays on both sides. The only
  nodes production has and the port does not are the inactive tab panes: the reference
  ships all three Industry Connect panes and all four Choose Your Minor panes in the
  DOM under `display: none`, and both tab widgets mount only the current one, as every
  tab set in this rebuild does. The link lists differ by the seven Webflow tab anchors
  (`<a href="#w-tabs-…">`), which the port renders as `<button>`s — a control that does
  not navigate is a button, the rule `PrimaryButton` already follows.
- **Off-origin requests: 53, and every one of them is inside an iframe.** The top frame
  makes none. They are the embedly document, the YouTube player it wraps and that
  player's own subresources (googlevideo, ytimg, doubleclick, gstatic fonts) — the
  reference's own two video embeds, the same status quo as every ATLAS page carrying a
  YouTube player. Two console entries per width, both
  "picture-in-picture is not allowed in this document", logged from inside those frames;
  `scratchpad/adm1/regress.py` filters them alongside the compute-pressure violation.
- **99/99 interactions** at 1440 and 390: the fifteen blocks in order, every id the
  menu and the header point at resolving exactly once (including the two the reference
  authors twice and the three title ids that are not duplicates), the menu's ten links
  and its scroll, the nine core cards and six vision cards, the embedly wrapper, the
  three figure cards with no figure, the three Industry Connect tabs at 8 / 8 / 6 cards,
  the infrastructure clip's mp4-then-webm pair, its five space cards and two library
  cards, the six welfare people and the three slide titles that carry the 12px bar, the
  four minor tabs at five cards each, the two closing electives, the five patent cards
  in their `isdi` colour, the eight publication links and the six-item single-open FAQ
  with its 2px divider and its borderless last item.
- `validate.py` at all twelve widths: **0 horizontal overflow, 0 page errors, 0 failed
  requests, 0 broken images.**
- **Per-block screenshots at 1440 / 1280 / 768 / 479 / 390.** `hero`, `menu`,
  `location`, `publications` and `search` are **0.00-0.23**; `overview`, `pathway`,
  `research`, `future` and `infra` are at or below **4.5**. Four blocks sit higher and
  each is accounted for: `parsons` (11.6-13.5) holds the **embedly iframe**, `global`
  (7.2-19.0) the **YouTube embed**, `welfare` (8.1-13.2) the `.zoom-slider-lg`, which
  **autoplays on a 2s timer on both sides** so the two land on different slides, and
  `faq` (9.1-20.4) is the 20px size difference above. Those four are verified by their
  heights (exact at all twelve widths), their text and their geometry instead — the
  same call the B.Des hero carousel already carries.
- **All 52 deduped assets proved by bytes**: every URL this page reuses from elsewhere
  in `public/` was re-fetched and compared by SHA-1 — 52 identical, 0 mismatches.
- `npx eslint .` exits 0 and `npx next build` succeeds from a cleared `.next`; the route
  builds `○ Static`. `regress.py` sweeps all **57** built routes at two widths with
  **0 overflow, 0 page errors, 0 failed requests and 0 broken images**; the only console
  entries anywhere are `/_not-found`'s own 404, the Instagram media route's 400 and the
  Summer School Admissions page's NoPaperForms 403, all three already documented.

#### Regression across every page whose components changed

This task touched an unusually wide surface — the shared FAQ, `About/Hero`,
`IconHeading`, `StatsBand`, `StatsStrip`, `InViewVideo`, `Curriculum`, `CardTypeF`,
`ZoomSliderLg`, `Carousel` and four extractions — so each origin page was re-measured
against production at 1440 / 768 / 390.

- **`/schools/isdi/about-us`, both programme overviews, `/admissions/undergraduate/b-des`
  and `/admissions/postgraduate/mba` show the FAQ bucket and nothing else.**
- **`/schools/isdi/programs/pre-university-summer-school` is clean at all three widths.**
- `/schools/isdi/admissions/pre-university-summer-school` moved from +21/−19 to
  **+28/−12** — its reference is one of the four that draw Bootstrap's 1px, so the 2px
  divider costs it ~7px. That is the cost side of the trade, and it was accepted.
- The two programme pages show only their already-documented deviations: the elective
  dropdown's authored 32px closed height (−96 / −48) and the Manrope stack line (+26).
  The Accessory page's `+369.1 at 390` is the **video-metadata race**, not a difference —
  the generic harness waits for images but not for `readyState`, and with the clips
  loaded both sides measure 418 x 743.1 and 346 x 615.1.

**Production rate-limited the ATLAS half of that run**, so its three real risks were
measured one at a time instead, which is better evidence than a whole-page diff anyway:

- `.zoom-slider-lg`'s pagination row is **24px, `display: block`, `margin-top: 20px`** on
  /campus-atlas, /life-at-atlas and /advantages/atlas-career-services, and the port now
  matches all three.
- `.patent-card` on /success-stories-atlas is **exact at 1440 and 390** — card 801x478 /
  340x657, plate 352x377 / 280x377. Pinning the plate's height did not merely avoid a
  regression there; **that page had been rendering a content-height plate below 768** and
  is now right.
- `.card-type-f` on /advantages/atlas-industry-centric-approach: **49 cards, identical
  distinct geometries on both sides.**

**Worth a look, not changed here:** `Carousel`'s DEFAULT bullet row (the non-ISDI one) is
a flex row whose height is its 8px dot, where both `ZoomSliderLg`'s and `Carousel`'s own
ISDI rows are blocks whose height is their 24px line box. That inconsistency is internal
to the component and belongs with whichever ATLAS page is next measured below 568.

**Deviations (one):** the shared FAQ's section-padding bucket, above. It is
`components/Home/FAQ` using the ATLAS section rhythm on an ISDI page — one line to
change, affecting every page that renders the component, and so **flagged rather than
taken unilaterally**, the same call the five ISDI Admissions pages made.
