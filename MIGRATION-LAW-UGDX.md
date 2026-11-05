# School of Law + uGDX migration — status

Paused on 2026-11-03 for the AWS S3 asset work and **resumed the same day on the user's approval**.
Everything below is uncommitted in the working tree. The S3 work (scripts/assets, .githooks,
.github/workflows/assets-verify.yml, docs/assets-s3.md) was not touched by the resumed work.

## Routes (22 page files) — all built and verified against production

| route | reference | state |
| --- | --- | --- |
| /schools/law | law/index.php | all 12 blocks exact at 12 widths except the Instagram block (deviation: the port's own feed instead of production's EmbedSocial iframe) |
| /schools/law/program-page-law | law/program-page-law.php | 14 blocks exact at 12 widths except voices +24 @700 (known TestimonialCard 568-767 fix), curriculum -1px <=479 |
| /schools/law/law-admissions | law/law-admissions.php | 8 blocks exact at 12 widths; key dates/fees = production snapshot (July 2027 cycle, checked 2026-11-02) |
| /schools/law/thought-leaderships, /schools/law/blog/[slug] (+ bare /blog redirect) | law/thought-leaderships, law/blog | verified at 3 widths; feed snapshot (4 posts) |
| /schools/ugdx | ugdx/index.php | all 17 blocks exact at 12 widths except the Instagram block (same deviation), "global" 0.8px subpixel, voices 568-767 (known) |
| /schools/ugdx/admissions/ugdx-admissions | ugdx/admissions/ugdx-admissions.php | all 7 blocks exact at 12 widths; key dates + fees = production snapshot checked 2026-11-02 |
| /schools/ugdx/undergraduate/* (7) and /schools/ugdx/integrated/integrated-b-tech-in-cs-ai-ml-&-mba | the programme template | **all 8 exact at all 12 widths** except voices +24 @700 (known) — fixed 2026-11-03, see below |
| /schools/ugdx/thought-leaderships, /schools/ugdx/blog/[slug] | ugdx/thought-leaderships, ugdx/blog | verified at 3 widths; feed snapshot (41 posts) |
| /schools/ugdx/nextgen-women-in-stem-scholarship | ugdx/nextgen-women-in-stem-scholarship.php | **all 8 blocks exact at all 12 widths** (fixed 2026-11-03) |
| /schools/ugdx/summerschool | ugdx/summerschool.php | **new 2026-11-03.** 11 blocks exact at 12 widths except the documented bold-leak deviation (eligibility -21 @700/390, search -21 @360) |
| /schools/ugdx/ugdxsummerschool | ugdx/ugdxsummerschool.php | **new 2026-11-03.** All blocks exact at 14 widths (incl. the 576/577 Bootstrap boundary); visually identical at 1440 |

## What the 2026-11-03 resume fixed

Programme template (all additive, defaulted props; cs-ai-ml and ui-ux, which carry none of the new
flags, re-verified exact at 12 widths):

- `experience.subPlain` — six pages author a bare `h2.sub-heading` (weight 300, no bottom padding)
  where cs-ai-ml / ui-ux author `.mrgbtm32` (weight 400, pb 32/20/16). Was +65.6 @1440, -4 @390.
- `guide.headWrap` — six pages wrap the heading in `.head-wrap.top > .tt-wrap`; the `.tt-wrap` is then
  a flex item, so its mb 20 and the head-wrap's mb 16 apply at <=767. Was -52 <=767.
- `eligibility.emptyList` — it-ai, quantum and semiconductor author an EMPTY `ol.list` (pt 12 + mb 10)
  between the title and the copy. Was -22 <=767.
- integrated: "Year 5" is authored as a bare `<div>`, not `.qt-title`, so it is 48px tall (`bareLabel`);
  and the curriculum lead's `<strong>` runs travel as a run list (bold is wider; was -33.6 @768, -24 @479).

NextGen: the page's `<style>` turns at 576, and `max-576:` is emitted before `max-md:` and loses to it
— now `max-lp:` (the width-ordered twin). `leading-normal` is this project's 1.5 token, not CSS
`normal`; now `[line-height:normal]`.

## New pages

**/schools/ugdx/summerschool** — the programme-page components as data plus `Ugdx/SummerSchool`
(two story pairs, closing paragraphs). The page's own `<style>` redeclares `.section` (60/60 at every
width) and `.container` (62px down to 768, no 30px step) without breakpoints; mirrored as page-scoped
descendant rules on the page root (`PAGE_STYLE`), including the carousel's mirrored track inset.
Shared changes, additive: `Curriculum` (null subtitle renders nothing; days with `items` lists),
`CareerPathways` (null lead renders nothing), `EligibilityFees` (`pt.mrgbt32`). FAQ = master 1
(ISDI set), re-exported. Images byte-for-byte; four careers cards reuse the uGDX homepage's files.

Reference defects, not reproduced (recorded in the page header):
- `<strong>Students of Grade 9th - 12th</div>` — the `<strong>` is never closed, so production renders
  the fee description and the search panel's sub-text in bold. Only the authored bold label is kept.
  **Flag for the user** if production's bold should be reproduced instead (costs the -21 above).
- `<d  iv class="quaternary-tabs-content-ugdx">` — malformed tag, renders as intended.
- the NoPaperForms brochure popup binds to `[data-id='btech']`, whose only trigger is commented out — orphan.

**/schools/ugdx/ugdxsummerschool** — a Bootstrap 5.3 + Swiper + Figtree page, rebuilt in Tailwind:
`n576` screen added (Bootstrap's `sm`), Figtree self-hosted (variable woff2, two subsets, in
globals.css), `Ugdx/SummerTech/ModuleSlider` (Swiper behaviour without the library) and
`InlineEnquiry` (the hero's inline NoPaperForms form, loaded on mount as upstream). Webflow's
`.card { width: 295px }` at <=767 beats Bootstrap's card and is reproduced. Not linked from the menu
(as upstream). 13 images + the 1.8MB hero clip byte-for-byte (three card PNGs are 1.2-1.4MB each,
shown at ~241px — a hosting consideration, not changed).

## CRM / widget audit (2026-11-03)

Production HTML equals the mirror on every widget. Opened each popup on both sides at 1440 and 390:

| page | widget | panel / iframe (1440) | result |
| --- | --- | --- | --- |
| program-page-law | CRM 6a3e7d3ba1fd0680c6c1ba90 | 580x661 / 540x621 | identical, both widths |
| integrated B.Tech + MBA | CRM 6a3e7bbda1fd0680c6c1a4a3 | 580x690 / 540x650 | identical, both widths |
| nextgen (hero) | CRM popup 6a950f599ac2658d595d0d47 | 300x700 | identical, both widths |
| nextgen (banner) | same widget | 400x600 (350x600 @390) | identical, both widths |
| summerschool, ugdxsummerschool | NoPaperForms ba02ebdd… | inline (ugdxsummerschool) / orphan (summerschool) | as upstream |

No Law/uGDX page requests a widget before a click, except ugdxsummerschool's inline form (upstream
behaviour). Every other Law/uGDX page embeds no widget.

## Navigation (2026-11-03)

Links to built Law/uGDX routes repointed from production to the local route across lib/ (mega menu
"uGDX"/"School of Law", "uGDX Summer School", programme lists, admissions pages, the four schools'
Thought Leadership tabs, homepage cards and feed links); `%26` became a literal `&` (the encoded form
404s in the port). Canonical `url` exports and source comments stay absolute. /map rediscovered:
65 Law/uGDX nodes, all `built`.

The map audit then caught one link the move broke: the ATLAS header swaps "Apply Now" to
`applySummer` on /schools/ugdx/summerschool, and that was a relative `/summertech`, which is not built
here — dead once the page became local. It now points at production, like `apply`.

## Checks (2026-11-03)

- `npx eslint .` 0 errors / 0 warnings; `npx next build` from a cleared `.next` succeeds; every
  Law/uGDX route is `○ Static` (the two blog detail routes are `ƒ`, as before).
- Site-wide regression, all 142 built routes at 1440 and 390 against `next start`: **all 22 Law/uGDX
  routes clean** (0 console errors, page errors, failed requests, broken images, overflow). The only
  findings site-wide are pre-existing and unrelated: `/_global-error` (Next's internal boundary),
  YouTube's `compute-pressure` / `picture-in-picture` policy messages on four YouTube pages, and a
  transient 500 on /campus-atlas that did not reproduce.
- `map:audit` (local build, 548 URLs): 5xx 0, soft-404 0; 0 Law/uGDX pages with broken links.

## Left as is

- Unused downloads (header mega-menu images under public/assets/images/schools/law/home) were NOT
  deleted — the resume instructions forbid deleting or moving assets. Listed for a later cleanup.
- Not ported by design: reference/law/removed/program-page-llm.php (retired, broken on production).
- **Flag:** /admissions/integrated-admissions' uGDX key-dates snapshot is a cycle behind production
  (shows Sep 2025 / Aug 2026; live shows Sep 2026 / Dec 2026).
