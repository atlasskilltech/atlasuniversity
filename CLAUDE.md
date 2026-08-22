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

**And one that is a genuine open question, not a rule.** `.accordion-item`'s
divider is `2px #eee` on **14 of 17** references and `1px #dee2e6` (Bootstrap's
default) on the homepage, /admissions/integrated-admissions and
/admissions/ug-admissions. The shared component was built against the homepage,
so it renders 1px everywhere — the sole cause of the recurring 1px item-height
delta. Changing it is one line in `components/Home/FAQ`, and it would make 14
pages more accurate and 1 less, so it is **flagged for the user rather than
taken unilaterally**; finished pages are not restyled without being asked.

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
residue, the two deliberate `.accordion-title` divergences, and the 2px-vs-1px
divider still flagged for the user.

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
divergences, and the 2px-vs-1px divider that is still flagged for the user.
