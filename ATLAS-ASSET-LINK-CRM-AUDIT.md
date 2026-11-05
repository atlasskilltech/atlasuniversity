# ATLAS website — asset, link, CRM widget and map audit

Audit and integration pass over the whole Next.js port (ATLAS, ISDI, ISME). Checked 2026-11-02 against
`reference/` and against production (`https://atlasuniversity.edu.in`), production requests made one at a
time, 1.5s apart. Every value below was measured; nothing is inferred.

**Result:** every confirmed defect is fixed and every remaining production-domain link is classified.
ESLint is clean, a clean production build succeeds (282 static pages), a 72-assertion feature suite
passes, and the regression sweep of all 277 prerendered routes at 1440 and 390 is clean apart from two
documented third-party 403s.

---

## 1. DEB Application Form PDF

| | |
| --- | --- |
| Source | `reference/deb-application.pdf` — 582,802 bytes, `%PDF-1.3`; SHA-1 `0c1839a0…addb`, **byte-identical** to `https://www.atlasuniversity.edu.in/deb-application.pdf` |
| Local path | `public/assets/documents/deb-application.pdf` (no PDF directory existed; `public/assets/documents/` is new, the ISME documents below live in it too) |
| Link | `lib/navigation.js` utility bar: `/assets/documents/deb-application.pdf`, `external: true` so `SmartLink` renders a plain `<a>` (a PDF must not go through client routing). Same tab, as `reference/assets/include/header.php:764` authors it. |
| Verified | served `200 application/pdf` with PDF magic; the header link resolves to it at 1440 and 390 (desktop bar and mobile drawer) |

## 2. Production URL classification

VS Code's ~20,000 matches are almost all **not source**: 16,362 are 18 HTML files saved under media names
in `public/` (§7) at 909 matches each, and ~420 are the generated `/map` snapshots. The source itself
(`app/`, `components/`, `lib/`, `scripts/`, `next.config.mjs`) held **329** production URLs:

| Class | Count | Treatment |
| --- | --- | --- |
| Page metadata — `canonical`, Open Graph `url`, `metadataBase`, `const URL` | 170 | **kept**: a canonical must name the production URL |
| Code comments ("measured on https://…") | in the 170 | kept |
| A — production URL of a page built here | 88 | **converted to the local route** (§3) |
| B — production page not built here | 70 | **kept** (uGDX/Law, `/news/*`, `/fee-structure/*`, `/registration/*`, `/campusvisit`, `/instagram-post/social`, …) |
| C — static asset on the production domain | 0 in source | the assets were found via site-root paths instead (§4) |
| D — genuine external services (CRM, fliphtml5, social, partner universities) | — | kept |

A second, larger defect was found by sweeping every **site-root** `href` (`"/…"`): links transcribed
from the reference's `<?php echo $edudomain ?>…` resolve on production but **404 on this site** when the
page is not built here. 84 such targets (≈620 links) were each checked on production (§4).

## 3. Internal links converted to local routes

88 links in 9 modules, each target checked against the built route list, query/fragment kept, a renamed
route sent straight to its redirect destination:

- **ISDI "19 programmes / Can't decide which program is best for you?"** — all 19 programme cards and
  quiz results (`lib/schools/isdi/home/programmesV2Data.js`), see §8.
- Thought Leadership cards → local blog routes: 46 in `lib/schools/isdi/thoughtLeadershipsContent.js`, 15
  on the homepage (`lib/homeContent.js`) — `/schools/isdi/blog/…`, `/schools/isme/blog/…`, `/atlas-blog/…`
  (live API-driven detail routes); the ATLAS/ISME school tabs → `/thought-leaderships#blog-section`,
  `/schools/isme/thought-leaderships#blog-section`.
- `lib/footerContent.js` Library → `/library` (and no longer flagged external).
- `lib/partnership/globalPathways.js` → `/schools/isme/northeastern-university-london-global-business-pathway`, `/schools/isdi/scad`, `/schools/isme/atlas-isme-advantage/internationalisation/london-school-of-economics`.
- `lib/schools/isdi/industry-approach/{career,certifications}.js` → `/advantages/atlas-career-services`, `/atlas-industry-partnership`.
- `lib/schools/isme/navigation.js` Thought Leadership → `/schools/isme/thought-leaderships`.

## 4. Site-root links that 404 here — production status and fixes

All 84 dead site-root targets plus 5 Webflow-CDN documents were requested on production
(`scratchpad/audit2/prodcheck.py`; the first attempt was refused with 403 by Cloudflare for urllib's
default user agent and was re-run with a browser one). **Only confirmed cases were changed**
(`fixlinks.py`: 549 replacements in 303 files; every edited JSON re-parsed):

| Production status | Targets | Action |
| --- | --- | --- |
| **Valid production-only page** (200, real content) | 37 — `/applicationform` (311 links), `/campusvisit` (55), `/scholarships-and-financial-aid` (34), `/admissions-policy/` (33), `/education-loan` (31), `/fee-structure/{bba,mba,bsc-finance}/`, `/application-form`, `/advisory-board-industry-academia-leaders`, `/job-openings`, `/flipbook/pg-policy/`, `/aarohan2025`, `/journal`, `/phdapplications`, `/exam-time-table`, the nine footer statutory pages, `/schools/ce`, uGDX (9) and Law (4) | rewritten to the production URL — the link now leaves the site exactly as it did on production instead of 404ing |
| `/result` (403 to automated requests; the exam-results portal linked from /examination) | 1 | treated as a production page, rewritten |
| **Static asset**, real PDF on production | 2 ISME sample papers (`/schools/isme/assets/images/admissions/…/*.pdf`, 98 pages) | downloaded, served locally (§5) |
| Webflow-CDN documents | 5 ISME PDFs (aptitude test ×2, collaborative accelerator, GD topics, interview questions) | downloaded, served locally (§5) |
| Cloudflare `/cdn-cgi/l/email-protection#…` | 2 | decoded (XOR, first byte) to the reference's own `mailto:` — verified identical to `reference/schools/isme/…` |
| `image-5.png` (ISDI events, OPEN defect) | 1 | → `image-5.webp`, the only file on disk |
| **Broken on production too** (homepage soft-404 / redirect to home) | 40 — `/atlas-times/*` (12), `/isme/*` (13), `/thought-leaderships/<old slug>` (6), `/summerdesign`, `/summermgmt`, three ISME minor URLs, `bba-hons-major/majoring-in-business-psychologyv2`, `mba-with-specialisation`, `admissions/postgraduate/mba-hyper/…` | **not changed** — no confirmed target exists; listed for the content owner |
| False positive | 1 (`econundrum…st-xavier's-college.png` — the scan stopped at the apostrophe; the file exists) | none |

After the fixes the local audit reports **0 site-wide broken navigation links**, and its 39 local 4xx
are exactly the "broken on production too" list.

## 5. Assets downloaded

| File | Size | Source | Check |
| --- | --- | --- | --- |
| `public/assets/documents/deb-application.pdf` | 582,802 | `reference/` (= production) | SHA-1 equal |
| `public/assets/images/contact/contact-us-banner.webp` | 46,620 | CDN PNG 527,075 B, 573×772, opaque | WebP q92, SSIM 0.9992 |
| `public/assets/documents/isme/atlas-business-aptitude-test-sample-paper-bba.pdf` | 495,237 | production | `%PDF-` |
| `…/isme/atlas-online-aptitude-test-sample-paper-b-sc.pdf` | 486,307 | production | `%PDF-` |
| `…/isme/atlas-isme-personal-interview.pdf` | 1,092,543 | Webflow CDN | `%PDF-` |
| `…/isme/atlas-isme-atlas-aptitude-test.pdf` | 507,379 | Webflow CDN | `%PDF-` |
| `…/isme/atlas-isme-collaborative-accelerator.pdf` | 679,314 | Webflow CDN | `%PDF-` |
| `…/isme/group-discussion-sample-topics.pdf` | 29,767 | Webflow CDN | `%PDF-` |
| `…/isme/aat.pdf` | 75,363 | Webflow CDN | `%PDF-` |

No two downloads share bytes. **Reused, not downloaded:** the contact page logo is byte-identical to
`public/assets/logos/atlas-logo-footer.png`; the 7 master-progression testimonial videos and posters
were already in the repository (§7).

## 6. Assets intentionally skipped

- **9 Choose Your Minor posters** (`tech-ai--emerging-experiences/*`, `human-centered-and-social-design/*`)
  — still `200 text/html` homepage soft-404s on production (re-checked today); the cards render without
  a poster, as production does.
- The 7 master-progression **MP4s were not re-encoded**: the committed files are production's own
  (3.9–15.9 MB, 69 MB total, sizes equal to production's `Content-Length`). `preload` keeps them off the
  wire until a WebM-incapable browser actually plays one.
- `contact-us` Open Graph image (`/wp-content/uploads/…jpeg`) — metadata only, left as production's URL.

## 7. Media issues — master-progression

- **18 files in `public/assets/images/advantages/partnership/master-progression/` are production's HTML
  homepage** saved under media names (14 `students/student-image/*.png`, 4 `testimonial/*/1.webm`,
  ~524 KB each, 9.0 MB). They were fetched from URLs that are soft-404s upstream. **None is referenced**
  (the student cards use the real `.jpg` files). They were **not deleted** (this task removes no
  assets); recommended for deletion.
- **The page showed 12 testimonials where the reference and production show 7.** The reference comments
  out five (`aditya-khandelwal` … `sakshi-karnawat`); the port rendered them anyway, and four of them
  had `src` = one of those HTML "webm" files, so those videos could not play. The five are removed from
  `lib/partnership/masterProgression.js`; the seven live `testimonial/new/*` films remain, in reference order.
- **No MP4 fallback existed**: `PartnershipTestimonials` set `src={sources[0]}`. It now renders every
  source as a typed `<source>` (WebM, then MP4 — production's order), so a browser without WebM falls
  through to the MP4. Verified: all 14 sources answer 200; WebM is chosen and plays in Chromium.
- **Mistake made and corrected during this pass:** an MP4 re-encode wrote over the seven committed
  `testimonial/new/*/1.mp4` (Git LFS) files in the working tree; all seven were restored with
  `git restore` to the committed bytes (sizes re-checked against production) before anything else ran.

## 8. Pathfinder links corrected

`/schools/isdi` "19 programmes. Five worlds." + "Can't decide which program is best for you?"
(`components/Schools/ISDI/Home/ProgrammesV2.js` over `programmesV2Data.js`): **19/19** cards and quiz
results now link to local routes. `btech-ai-integrated-design` goes straight to its rename,
`/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products` (the old path is a 308).
Verified: all 19 answer 200 on the production build; clicking a card navigates to its page. (The older
`pathfinder.php` quiz on the UG Overview already linked locally.)

## 9. Choose Your Minor videos

Already integrated — **no change needed**. All 19 clips are local real MP4s (`public/assets/videos/
schools/isdi/home/choose-your-minor/…`, 171 KB–1.39 MB, 14.2 MB total), the same 19 production authors
(the local folder drops production's doubled hyphen in `tech-ai--emerging-experiences`). `InViewVideo`
plays them muted, looping, `playsInline`, `preload="none"`, only while in view. Verified on the build:
5 per tab, local, muted, `preload=none`, the in-view clip playing.

## 10. Contact page — `/contact-us`

There is **no contact page under `reference/`**; production's `/contact-us/` (a standalone Tailwind
document, no site header or footer) is the reference. `app/contact-us/page.js`:

- photo panel (2/5) with logo, "Contact Us", the heading and the address; CRM panel (3/5) with the
  enquiry form; stacked below 1024 — Play-CDN `sm`/`lg` mapped to `n640`/`n1024`;
- **no site chrome**, as production: `components/Schools/MainSiteOnly` steps the ATLAS header and footer
  aside on `/contact-us` (the nav "Contact Us" link was a 404 before this page existed);
- form = shared `CrmWidget`, widget `69ba29dca82f5d7ddc539cc9`, src set after mount with **every
  `utm_*` parameter** forwarded (production's `data-src` → `src` script); spinner until the frame's
  `load`. Production has **no error state** (the spinner stays if the widget cannot load) — matched.
- **Compared box by box with production at 1440 / 1024 / 768 / 390: identical** (both columns, logo,
  label, heading size and line-height, address, form box). Only difference: the font fallback list
  after Manrope (both load Manrope). Tests: utm forwarding (only `utm_*` kept, `ref=x` dropped), plain
  src without utm, loader removed after load, local banner + logo, no overflow, no header/footer.

## 11. CRM widget component

**`components/ui/CrmWidget.js`** — the one place the CRM embed is rendered, in both forms the
reference uses:

- `mode="iframe"` — `<iframe src=".../widgets/<id>/embed">`; `forwardUtm` (`true` = every `utm_*`, or a
  key list); `deferSrc` writes the src onto the element after mount (no hydration mismatch, no
  setState-in-effect); optional `loader`, removed on the frame's real `load` (not about:blank's).
- `mode="script"` — `<script src=".../embed.js" data-atlas-*>` appended to a host once; a host that
  already holds a node is left alone, so re-renders, Strict Mode and navigation cannot double the form.
  Each dialog mounts its host only while open, so close/reopen yields exactly one widget.

Consumers (all keep their own dialog chrome and DOM): `components/Programs/BrochureModal` (ATLAS
programme lists), `components/Schools/ISDI/ProgramDetail/BrochureButton` (ISDI + ISME programme
pages, both forms), `components/Schools/ISDI/Success/OutcomesBook` (ISDI + ISME outcomes book),
`app/contact-us`. `components/Schools/ISME/Bba/BbaPage` `brochureFor()` returns the script form when
the page authors a loader, else the iframe form from `brochure.frames` — no unreachable branch.

**Two ISME pages had no working brochure:** the ACCA programme and the old
`bba-hons/majoring-in-business-psychology/marketing` page author the CRM **iframe** embed, which the
BBA extractor did not record, so their "Download Brochure" opened nothing. Both now carry
`brochure.frames` (matching production) and the extractor records iframes for future regenerations.
NoPaperForms widgets (`emwgts.js`) are a different third-party integration and are out of scope; the
ISME PGP Diploma page's NoPaperForms brochure is likewise not wired in the port (pre-existing, noted).
No key or token is involved — widget ids are public.

## 12. CRM widget page inventory

**158 pages** embed the CRM widget in the reference / on production; **158 are integrated locally**.
157 come from `reference/**.php` (a widget inside an HTML comment, a block comment or a `//` line is not
counted) and one, `/contact-us`, is production-only. Two reference URLs are served by one page
(`postgraduate/m-des-in-design-futures` redirects to `mdes/design-futures-2-years`). The same inventory
drives `/map` → Key information → CRM widget pages. Full table at the end of this document.

## 13–15. Key dates, fee information, fee documents

From the map snapshot (`data/map/facts.json`), each value exactly as its page publishes it, with its
source page and section, and checked against that page's HTML by `npm run map:audit`:

- **Key dates: 93 dates on 11 pages**, 68 verified on page; the 25 unverified sit in admissions tabs that
  are closed on load (the pane is not in the HTML until opened) and are shown as "Needs verification".
- **Fee information: 154 pages**; amounts on 29 pages (64 values, **all verified**), the rest link a fee
  document only.
- **Fee documents: 12 distinct**, none of them a PDF file — production publishes fee structures as pages
  (`/fee-structure/*`, on the live site) and fliphtml5 flipbooks. Listed with every page that links them.
- **Conflicts flagged, not resolved** (both values shown on the map): ISDI MBA pages' duration band reads
  "4-Year Degree - B.Tech." (upstream copy-paste) against "2 years" on ISDI MBA admissions; ISME B.Sc.
  programme pages read "3-Year Degree / 4-Year (Hons.)" against "4 Years" on B.Sc. admissions.

## 16. `/map` updates

Extended in place — no parallel system:

- `scripts/map/lib/routes.mjs` — `discoverDataRoutes()` expands the three ISME registries (one-off pages,
  BBA/B.Sc., MBA; registry read as text, JSON parsed, shared `refs` blocks resolved) into **168 more
  routes**: the map now covers **294 routes / every prerendered page** (was 125, ISME largely missing).
  A page with its own folder that renders registry data gets that data attached.
- `scripts/map/lib/crm.mjs` — the CRM inventory (§12), written to `facts.json` → `crm`.
- `scripts/map/lib/extract.mjs` — ISME calendar cells (`groups` of runs), ISME fee cards
  (`label`/`value`, `lead: true` flag) and ISME lead-card strips; every fact now carries its source
  `section`. Facts went from 345 to 1,525 with **none lost** and 0 duplicate ids.
- `scripts/map/discover.mjs` — an admissions page answers for a programme only when it names a degree
  (the Summer School page had been matched to two MBA programmes — a false conflict, removed).
- `scripts/map/audit.mjs` — on a local build, absolute production links and "live site" nodes are not
  requested against localhost (they were reported as broken); production audits are unchanged.
- `lib/map/publicView.js` — `keyInfo` (crm, dates, fees, feeDocs) and per-node `flags`.
- `components/Map/KeyInfo.js` + `MapExplorer` — a third view, **Key information**, with four categories
  (CRM widget pages · Key dates · Fee information · Fee structure documents), search, school filter,
  per-category "Show" filter, page title + route + source section + verification, links to the page (or
  the live site) and to each document, and "show on map". Explore's "Show" filter gained *Pages with the
  CRM widget / key dates / fee information*. Explore University and Website information are unchanged.
- Snapshot regenerated with `npm run map:discover` and `npm run map:audit -- --base=http://localhost:3200`.

## 17. Test results

| Check | Result |
| --- | --- |
| `npx eslint .` | 0 problems |
| `npm run build` from a cleared `.next` | succeeds, 282 static pages; `/contact-us` and `/map` `○ Static` |
| Feature suite (`scratchpad/audit2/suite.py`, `next start`) | **72/72** — DEB link + PDF (1440/390); 19 Pathfinder links local, 200, click-through; Choose Your Minor videos; contact page at 1440/768/390 (utm, loader, banner/logo, layout, no chrome, no overflow); 8 CRM consumers — ISDI B.Des iframe ×2, ISDI B.Tech script, ISME BBA script, **ISME ACCA iframe**, **ISME Marketing major iframe**, ATLAS programme iframe (+ 4-key utm forwarding), ISDI outcomes book — each opens one widget, closes, **reopens with exactly one** (no double init), script forms render their form, no page errors; master-progression 7 videos WebM→MP4, all 200, playing; `/map` Key information (4 categories, row counts, search, filters, links), Explore flag filter, Website information, no page errors; every prerendered route is a map node |
| Contact page vs production | identical boxes at 1440/1024/768/390 |
| Regression — all 277 prerendered routes × 1440/390 | 0 overflow, 0 page errors, 0 failed requests, 0 broken images; console: only the documented NoPaperForms 403 on the two Summer School pages. The ISDI `image-5` broken image is fixed. |
| Local map audit | 0 site-wide broken nav links; 39 local 4xx = the "broken on production too" list |

**Remaining issues (documented, not fixed):** the 40 links that are broken on production as well (§4);
the 18 unused HTML "media" files (§7); the five earlier master-progression testimonial folders, now
unreferenced; the ISME PGP Diploma's NoPaperForms brochure (§11); the two published-value conflicts
(§13–15); the 25 closed-tab dates that a static check cannot verify.

---

## Appendix — production status of the 84 dead site-root targets

Generated from `scratchpad/audit2/prodcheck.json`.

| Target | Production | Classification |
| --- | --- | --- |
| `/aarohan2025` | 200 | production-only page → production URL |
| `/admissions-policy/` | 200 | production-only page → production URL |
| `/advisory-board-industry-academia-leaders` | 200 | production-only page → production URL |
| `/anti-ragging-committee` | 200 | production-only page → production URL |
| `/application-form` | 200 | production-only page → production URL |
| `/applicationform` | 200 | production-only page → production URL |
| `/assets/images/schools/isdi/events/industry-mentorship/mentors/image-5.png` | 200 soft-404 | → local image-5.webp |
| `/assets/images/schools/isme/pages/econundrum--festival-st-xavier` | 200 soft-404 | false positive (file exists) |
| `/atlas-times/atlas-hosts-session-on-building-chatgpt-killer-from-india-with-vishnu-ramesh-ceo-of-subtl-ai-2` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/atlas-hr-conclave-2025-shaping-the-future-of-work-and-talent` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/atlas-isme-hosts-masterclass-on-integrated-marketing-communications-with-marketing-expert-ketan-b` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/atlas-isme-hosts-masterclass-with-mastercard-expert-on-mastering-job-interview` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/atlas-isme-mba-students-attend-iaa-tech-pulse-2023-conference` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/himanshu-mehtas-insightful-session-on-the-impact-of-geopolitics-on-international-business` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/mastering-the-art-of-restaurant-sales-siddharth-joganis-guest-session-at-atlas-isme-kitb8` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/mba-springboard-atlas-isme-initiative-to-build-hyper-personalised-curriculum-for-future-leaders` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/pioneers-of-progress-atlas-isme-alumni-inspire-the-next-generation-of-entrepreneurs` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/pradeep-shashidharan-from-penske-shares-practical-insights-on-product-management-with-atlas-isme-` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/sneha-basu-roy-from-google-india-unlocks-the-power-of-analytics-for-atlas-ismes-mba-students` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/atlas-times/transformative-industry-immersion-atlas-ismes-mba-students-explore-innovation-and-sustainability-` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/campusvisit` | 200 | production-only page → production URL |
| `/cdn-cgi/l/email-protection#1a3a73746e7f68747b6e7375747b765a7b6e767b696f74736c7f6869736e63347f7e6f3473743a2569` | 404 | Cloudflare email obfuscation → decoded mailto |
| `/cdn-cgi/l/email-protection#3a53545c557a5b4e565b494f54534c5f4849534e43145f5e4f14535405494f58505f594e076a5b484e` | 404 | Cloudflare email obfuscation → decoded mailto |
| `/education-loan` | 200 | production-only page → production URL |
| `/exam-time-table` | 200 | production-only page → production URL |
| `/fee-structure/bba/` | 200 | production-only page → production URL |
| `/fee-structure/bsc-finance/` | 200 | production-only page → production URL |
| `/fee-structure/mba/` | 200 | production-only page → production URL |
| `/flipbook/pg-policy/` | 200 | production-only page → production URL |
| `/grievance-redressal` | 200 | production-only page → production URL |
| `/internal-complaint-committee` | 200 | production-only page → production URL |
| `/isme/annual-fests-and-cultural-celebrations` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/campus-facilities-and-infrastructure` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/dr-indu-shahani` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/internationalisation-global-opportunities` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/management-team` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/patents` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/placements-and-internships-opportunities` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/press-coverage` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/program-bba-hons-in-marketing#marketing-section` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/publications-research-and-thought-leadership` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/student-council-leadership-and-activities` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/success-stories#start-up-section` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/isme/thought-leadership` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/job-openings` | 200 | production-only page → production URL |
| `/journal` | 200 | production-only page → production URL |
| `/mandatory-disclosure/policies/policies11` | 200 | production-only page → production URL |
| `/mandatory_disclosures` | 200 | production-only page → production URL |
| `/nirf` | 200 | production-only page → production URL |
| `/ombudsperson` | 200 | production-only page → production URL |
| `/phdapplications` | 200 | production-only page → production URL |
| `/result` | 403 | production-only page (403 to bots) → production URL |
| `/scholarships-and-financial-aid` | 200 | production-only page → production URL |
| `/schools/ce` | 200 | production-only page → production URL |
| `/schools/isme/admissions/postgraduate/mba-hyper/admissions-mba-master-of-business-administration` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/isme/assets/images/admissions/undergraduate/admissions-bba-bachelor-of-business-administration/atlas-` | 200 | static asset → downloaded, local |
| `/schools/isme/assets/images/admissions/undergraduate/bsc-admissions/atlas-online-aptitude-test-sample-paper-b-` | 200 | static asset → downloaded, local |
| `/schools/isme/programs/postgraduate/mba-with-specialisation` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychologyv2` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/economics-and-public-policy#minors` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/human-resource-management#minors` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/supply-chain-management#minors` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/schools/law` | 200 | production-only page → production URL |
| `/schools/law/law-admissions` | 200 | production-only page → production URL |
| `/schools/law/program-page-law` | 200 | production-only page → production URL |
| `/schools/law/thought-leaderships#blog-section` | 200 | production-only page → production URL |
| `/schools/ugdx` | 200 | production-only page → production URL |
| `/schools/ugdx/admissions/ugdx-admissions` | 200 | production-only page → production URL |
| `/schools/ugdx/integrated/integrated-b-tech-in-cs-ai-ml-&-mba` | 200 | production-only page → production URL |
| `/schools/ugdx/summerschool` | 200 | production-only page → production URL |
| `/schools/ugdx/thought-leaderships#blog-section` | 200 | production-only page → production URL |
| `/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-data-science` | 200 | production-only page → production URL |
| `/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-robotics` | 200 | production-only page → production URL |
| `/schools/ugdx/undergraduate/b-tech-in-cs-ai-ml` | 200 | production-only page → production URL |
| `/schools/ugdx/undergraduate/b-tech-in-it-ai-&-cybersecurity` | 200 | production-only page → production URL |
| `/summerdesign` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/summermgmt` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/10-reasons-why-business-analytics-is-one-of-the-fastest-growing-careers-in-india` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/decoding-the-digital-future-key-insights-from-the-co-elev8-session-with-industry-expert-r` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/how-can-business-analytics-be-used-in-marketing` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/the-role-of-big-data-in-financial-decision-making-b6adp` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/top-career-paths-after-bsc-finance-in-india` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/thought-leaderships/what-to-expect-in-all-4-years-of-a-bsc-finance-degree` | 200 soft-404 | broken on production too (soft-404) — unchanged |
| `/women-development-cell` | 200 | production-only page → production URL |
| `https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691b278a8e834de9615cf74e_ATLAS-ISME-Personal-Inter` | 200 | static asset → downloaded, local |
| `https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691b27ccf57d704324b0ae66_ATLASISME-ATLASAptitudeTe` | 200 | static asset → downloaded, local |
| `https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691b2803e028b8f3e91e86fe_ATLAS-ISME-Collaborative-` | 200 | static asset → downloaded, local |
| `https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691e0de7369502de8d1f6007_Group%20Discussion%20Samp` | 200 | static asset → downloaded, local |
| `https://cdn.prod.website-files.com/6846c77f346415bfcbb813b6/691e0de73f976715d10dd8a7_AAT.pdf` | 200 | static asset → downloaded, local |

### CRM widget page inventory

| # | Page | Next.js route | Reference PHP | Widget in reference | Integrated locally | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Contact & Enquiry – ATLAS SkillTech University | `/contact-us` | — production-only page | no reference file | yes | source scan + built-page check |
| 2 | Integrated Programs | `/programs/programs-list-integrated` | `reference/programs/programs-list-integrated.php` | yes (iframe) | yes | source scan + built-page check |
| 3 | Commerce, Finance & Economics | `/programs/ug/programs-list-commerce-finance-and-economics` | `reference/programs/ug/programs-list-commerce-finance-and-economics.php` | yes (iframe) | yes | source scan + built-page check |
| 4 | AI & Technology | `/programs/ug/programs-list-design-ai-and-technology` | `reference/programs/ug/programs-list-design-ai-and-technology.php` | yes (iframe) | yes | source scan + built-page check |
| 5 | Law & Policy | `/programs/ug/programs-list-law-and-policy` | `reference/programs/ug/programs-list-law-and-policy.php` | yes (iframe) | yes | source scan + built-page check |
| 6 | Management & Entrepreneurship | `/programs/ug/programs-list-management-and-entrepreneurship` | `reference/programs/ug/programs-list-management-and-entrepreneurship.php` | yes (iframe) | yes | source scan + built-page check |
| 7 | Design & Innovation Undergraduate Programs | `/programs/ug/ug-design-and-innovation` | `reference/programs/ug/ug-design-and-innovation.php` | yes (iframe) | yes | source scan + built-page check |
| 8 | Design Your Summer. Discover Your Future. | `/schools/isdi/admissions/pre-university-summer-school` | `reference/schools/isdi/admissions/pre-university-summer-school.php` | yes (script) | yes | source scan + built-page check |
| 9 | Creative Entrepreneurship | `/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship` | `reference/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship.php` | yes (iframe) | yes | source scan + built-page check |
| 10 | Interior Styling & Spatial Curation | `/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation` | `reference/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation.php` | yes (iframe) | yes | source scan + built-page check |
| 11 | Design Futures | `/schools/isdi/programs/postgraduate/mdes/design-futures-2-years` (answers for `/schools/isdi/programs/postgraduate/m-des-in-design-futures`) | `reference/schools/isdi/programs/postgraduate/m-des-in-design-futures.php` | yes (script) | yes | source scan + built-page check |
| 12 | MBA in Design Management & Strategic Thinking | `/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking` | `reference/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking.php` | yes (script) | yes | source scan + built-page check |
| 13 | Design Management and Strategy | `/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation` | `reference/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation.php` | yes (iframe) | yes | source scan + built-page check |
| 14 | Event & Experience Design | `/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design` | `reference/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design.php` | yes (iframe) | yes | source scan + built-page check |
| 15 | Design Futures | `/schools/isdi/programs/postgraduate/mdes/design-futures-2-years` | `reference/schools/isdi/programs/postgraduate/mdes/design-futures-2-years.php` | yes (script) | yes | source scan + built-page check |
| 16 | Accessory Design & Craft | `/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft` | `reference/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft.php` | yes (iframe) | yes | source scan + built-page check |
| 17 | Animation, VFX and Gaming | `/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming.php` | yes (script) | yes | source scan + built-page check |
| 18 | Communication Design & New Media | `/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media.php` | yes (script) | yes | source scan + built-page check |
| 19 | Fashion Communication and Styling | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling.php` | yes (script) | yes | source scan + built-page check |
| 20 | Fashion Design & Technology | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology.php` | yes (script) | yes | source scan + built-page check |
| 21 | Interior Design & Built Environment | `/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment.php` | yes (script) | yes | source scan + built-page check |
| 22 | Product Design | `/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design.php` | yes (script) | yes | source scan + built-page check |
| 23 | Strategic Design & Innovation Management | `/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management` | `reference/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management.php` | yes (script) | yes | source scan + built-page check |
| 24 | Behavioural Design & AI: Designing How People Think, Feel & Act | `/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai` | `reference/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai.php` | yes (iframe) | yes | source scan + built-page check |
| 25 | Fashion Brand Management | `/schools/isdi/programs/undergraduate/b-des/fashion-brand-management` | `reference/schools/isdi/programs/undergraduate/b-des/fashion-brand-management.php` | yes (iframe) | yes | source scan + built-page check |
| 26 | Health & Care Design Designing Innovations That Reach Patients | `/schools/isdi/programs/undergraduate/b-des/health-care-design` | `reference/schools/isdi/programs/undergraduate/b-des/health-care-design.php` | yes (iframe) | yes | source scan + built-page check |
| 27 | Luxury Brand Strategy | `/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design` | `reference/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design.php` | yes (iframe) | yes | source scan + built-page check |
| 28 | Service & Experience Design Designing Systems People Actually Live In | `/schools/isdi/programs/undergraduate/b-des/service-&-experience-design` | `reference/schools/isdi/programs/undergraduate/b-des/service-&-experience-design.php` | yes (iframe) | yes | source scan + built-page check |
| 29 | AI Engineering & Intelligent products | `/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products` | `reference/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products.php` | yes (script) | yes | source scan + built-page check |
| 30 | Design Engineering | `/schools/isdi/programs/undergraduate/btech/btech-design-engineering` | `reference/schools/isdi/programs/undergraduate/btech/btech-design-engineering.php` | yes (script) | yes | source scan + built-page check |
| 31 | Systems Design & Intelligent Manufacturing | `/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing` | `reference/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing.php` | yes (iframe) | yes | source scan + built-page check |
| 32 | Success Stories | `/schools/isdi/success-stories/success-snapshot` | `reference/schools/isdi/success-stories/success-snapshot/index.php` | yes (script) | yes | source scan + built-page check |
| 33 | Summer school | `/schools/isme/admissions/summer-school-management` | `reference/schools/isme/admissions/summer-school-management.php` | yes (script) | yes | source scan + built-page check |
| 34 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/business-analytics-digital-marketing-advertising` | `reference/schools/isme/programs/postgraduate/dual-specialisation/business-analytics-digital-marketing-advertising.php` | yes (script) | yes | source scan + built-page check |
| 35 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/entrepreneurships-business-analytics` | `reference/schools/isme/programs/postgraduate/dual-specialisation/entrepreneurships-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 36 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/entrepreneurships-digital-marketing` | `reference/schools/isme/programs/postgraduate/dual-specialisation/entrepreneurships-digital-marketing.php` | yes (script) | yes | source scan + built-page check |
| 37 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/finance-business-analytics` | `reference/schools/isme/programs/postgraduate/dual-specialisation/finance-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 38 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/finance-digital-marketing-advertising` | `reference/schools/isme/programs/postgraduate/dual-specialisation/finance-digital-marketing-advertising.php` | yes (script) | yes | source scan + built-page check |
| 39 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/finance-entrepreneurships` | `reference/schools/isme/programs/postgraduate/dual-specialisation/finance-entrepreneurships.php` | yes (script) | yes | source scan + built-page check |
| 40 | MBA for an AI (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/marketing-business-analytics` | `reference/schools/isme/programs/postgraduate/dual-specialisation/marketing-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 41 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/marketing-digital-marketing` | `reference/schools/isme/programs/postgraduate/dual-specialisation/marketing-digital-marketing.php` | yes (script) | yes | source scan + built-page check |
| 42 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/marketing-entrepreneurship` | `reference/schools/isme/programs/postgraduate/dual-specialisation/marketing-entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 43 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/dual-specialisation/marketing-finance` | `reference/schools/isme/programs/postgraduate/dual-specialisation/marketing-finance.php` | yes (script) | yes | source scan + built-page check |
| 44 | MBA – Financial Planning & Applied Finance | `/schools/isme/programs/postgraduate/mba-financial-planning-applied-finance` | `reference/schools/isme/programs/postgraduate/mba-financial-planning-applied-finance.php` | yes (script) | yes | source scan + built-page check |
| 45 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-in-fintech` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-in-fintech.php` | yes (script) | yes | source scan + built-page check |
| 46 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-digital-marketing-and-advertising` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-digital-marketing-and-advertising.php` | yes (script) | yes | source scan + built-page check |
| 47 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-business-analytics` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 48 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-entrepreneurship` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 49 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-marketing` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-hyper-specialisation-marketing.php` | yes (script) | yes | source scan + built-page check |
| 50 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-specialisation` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-specialisation.php` | yes (script) | yes | source scan + built-page check |
| 51 | MBA for an AI World (With Dual Specialisation) | `/schools/isme/programs/postgraduate/mba-hyper/mba-with-strategic-human-capital-management` | `reference/schools/isme/programs/postgraduate/mba-hyper/mba-with-strategic-human-capital-management.php` | yes (script) | yes | source scan + built-page check |
| 52 | MBA in FinTech | `/schools/isme/programs/postgraduate/program-mba-in-fintech` | `reference/schools/isme/programs/postgraduate/program-mba-in-fintech.php` | yes (script) | yes | source scan + built-page check |
| 53 | MBA in Investment Banking | `/schools/isme/programs/postgraduate/program-mba-in-investment-banking` | `reference/schools/isme/programs/postgraduate/program-mba-in-investment-banking.php` | yes (script) | yes | source scan + built-page check |
| 54 | BBA / BBA(Hons.) Major & Minor | `/schools/isme/programs/undergraduate/bba-hons-major` | `reference/schools/isme/programs/undergraduate/bba-hons-major/index.php` | yes (script) | yes | source scan + built-page check |
| 55 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/index.php` | yes (script) | yes | source scan + built-page check |
| 56 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 57 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 58 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 59 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/economics.php` | yes (script) | yes | source scan + built-page check |
| 60 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 61 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 62 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/finance` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-ai-emerging-technologies/finance.php` | yes (script) | yes | source scan + built-page check |
| 63 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/index.php` | yes (script) | yes | source scan + built-page check |
| 64 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 65 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 66 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 67 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/economics.php` | yes (script) | yes | source scan + built-page check |
| 68 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 69 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 70 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/finance` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-analytics/finance.php` | yes (script) | yes | source scan + built-page check |
| 71 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/index.php` | yes (script) | yes | source scan + built-page check |
| 72 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 73 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 74 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 75 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/economics.php` | yes (script) | yes | source scan + built-page check |
| 76 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 77 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 78 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/finance` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/finance.php` | yes (script) | yes | source scan + built-page check |
| 79 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/marketing` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-business-psychology/marketing.php` | yes (script) | yes | source scan + built-page check |
| 80 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/index.php` | yes (script) | yes | source scan + built-page check |
| 81 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 82 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 83 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 84 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/economics.php` | yes (script) | yes | source scan + built-page check |
| 85 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 86 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 87 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/finance` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-digital-branding-advertising/finance.php` | yes (script) | yes | source scan + built-page check |
| 88 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/index.php` | yes (script) | yes | source scan + built-page check |
| 89 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 90 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 91 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 92 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 93 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/economics.php` | yes (script) | yes | source scan + built-page check |
| 94 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 95 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-finance/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 96 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/index.php` | yes (script) | yes | source scan + built-page check |
| 97 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 98 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 99 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 100 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 101 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/economics` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/economics.php` | yes (script) | yes | source scan + built-page check |
| 102 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 103 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons-major/majoring-in-marketing/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 104 | BBA / BBA (Hons.) in Artificial Intelligence & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/bba-hons-ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-hons-ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 105 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/bba-Hons-business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-Hons-business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 106 | BBA / BBA (Hons.) Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/bba-hons-digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-hons-digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 107 | BBA (Hons.) in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 108 | BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-finance` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-finance.php` | yes (script) | yes | source scan + built-page check |
| 109 | BBA / BBA (Hons.) in International Accounting & Finance with ACCA | `/schools/isme/programs/undergraduate/bba-hons/bba-hons-in-international-accounting-finance-with-acca` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-hons-in-international-accounting-finance-with-acca.php` | yes (iframe) | yes | source scan + built-page check |
| 110 | BBA (Hons.) in Marketing | `/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-marketing` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-Hons-in-marketing.php` | yes (script) | yes | source scan + built-page check |
| 111 | BBA (Hons.) Majoring in Marketing/Finance /Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/bba-hons-marketing-finance-business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/bba-hons-marketing-finance-business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 112 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/index.php` | yes (script) | yes | source scan + built-page check |
| 113 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 114 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 115 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 116 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/economics.php` | yes (script) | yes | source scan + built-page check |
| 117 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 118 | BBA / BBA (Hons.) Majoring in AI & Emerging Technologies | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/finance` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies/finance.php` | yes (script) | yes | source scan + built-page check |
| 119 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/index.php` | yes (script) | yes | source scan + built-page check |
| 120 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 121 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 122 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 123 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/economics.php` | yes (script) | yes | source scan + built-page check |
| 124 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 125 | BBA / BBA (Hons.) Majoring in Business Analytics | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/finance` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics/finance.php` | yes (script) | yes | source scan + built-page check |
| 126 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/index.php` | yes (script) | yes | source scan + built-page check |
| 127 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 128 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 129 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 130 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/economics.php` | yes (script) | yes | source scan + built-page check |
| 131 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 132 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/finance` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/finance.php` | yes (script) | yes | source scan + built-page check |
| 133 | BBA / BBA (Hons.) Majoring in Business Psychology | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/marketing` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology/marketing.php` | yes (iframe) | yes | source scan + built-page check |
| 134 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/index.php` | yes (script) | yes | source scan + built-page check |
| 135 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 136 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 137 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 138 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/economics.php` | yes (script) | yes | source scan + built-page check |
| 139 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 140 | BBA / BBA (Hons.) Majoring in Digital Branding & Advertising | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/finance` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising/finance.php` | yes (script) | yes | source scan + built-page check |
| 141 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/index.php` | yes (script) | yes | source scan + built-page check |
| 142 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 143 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 144 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 145 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 146 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/economics.php` | yes (script) | yes | source scan + built-page check |
| 147 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 148 | BBA / BBA (Hons.) Majoring in Finance | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/family-managed-business` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance/family-managed-business.php` | yes (script) | yes | source scan + built-page check |
| 149 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/index.php` | yes (script) | yes | source scan + built-page check |
| 150 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/ai-emerging-technologies` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/ai-emerging-technologies.php` | yes (script) | yes | source scan + built-page check |
| 151 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/business-analytics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/business-analytics.php` | yes (script) | yes | source scan + built-page check |
| 152 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/business-psychology` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/business-psychology.php` | yes (script) | yes | source scan + built-page check |
| 153 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/digital-branding-advertising` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/digital-branding-advertising.php` | yes (script) | yes | source scan + built-page check |
| 154 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/economics` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/economics.php` | yes (script) | yes | source scan + built-page check |
| 155 | BBA / BBA (Hons.) Majoring in Marketing | `/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/entrepreneurship` | `reference/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing/entrepreneurship.php` | yes (script) | yes | source scan + built-page check |
| 156 | B.Sc (Hons.) Finance | `/schools/isme/programs/undergraduate/bsc-hons/bsc-hons-in-finance` | `reference/schools/isme/programs/undergraduate/bsc-hons/bsc-hons-in-finance.php` | yes (script) | yes | source scan + built-page check |
| 157 | B.Sc. in Economics and Data Analytics | `/schools/isme/programs/undergraduate/bsc-hons/bsc-in-economics-and-data-analytics` | `reference/schools/isme/programs/undergraduate/bsc-hons/bsc-in-economics-and-data-analytics.php` | yes (script) | yes | source scan + built-page check |
| 158 | Success Stories | `/schools/isme/success-stories/success-snapshot/success-stories` | `reference/schools/isme/success-stories/success-snapshot/success-stories.php` | yes (script) | yes | source scan + built-page check |

### Pages publishing key dates

| Page | Route | Dates | Source section | Verified on page |
| --- | --- | --- | --- | --- |
| Your Future Starts Here | `/admissions/integrated-admissions` | 13 | Key Dates & Deadlines | 7/13 |
| Your Future Starts Here | `/admissions/pg-admissions` | 3 | Key Dates & Deadlines | 3/3 |
| Your Future Starts Here | `/admissions/ug-admissions` | 32 | Key Dates & Deadlines | 13/32 |
| M.Des Admissions | `/schools/isdi/admissions/postgraduate/m-des` | 6 | Key Dates & Deadlines | 6/6 |
| MBA Admissions | `/schools/isdi/admissions/postgraduate/mba` | 6 | Key Dates & Deadlines | 6/6 |
| B.Des Admissions | `/schools/isdi/admissions/undergraduate/b-des` | 6 | Key Dates & Deadlines | 6/6 |
| B.Tech Admissions | `/schools/isdi/admissions/undergraduate/b-tech` | 6 | Key Dates & Deadlines | 6/6 |
| MBA Admissions | `/schools/isme/admissions/postgraduate/admissions-mba-master-of-business-administration` | 6 | Key Dates & Deadlines | 6/6 |
| BBA Admissions | `/schools/isme/admissions/undergraduate/admissions-bba-bachelor-of-business-administration` | 7 | Key Dates & Deadlines | 7/7 |
| B.Sc Admissions | `/schools/isme/admissions/undergraduate/bsc-admissions` | 5 | Key Dates & Deadlines | 5/5 |
| Scholarships | `/schools/isme/scholarshipsv2` | 3 | Key Dates & Results | 3/3 |

### Pages publishing fee amounts

154 pages publish fee information; 29 of them publish amounts (below), the rest only link a fee document (next table).

| Page | Route | Published amounts | Fee document | Verified on page |
| --- | --- | --- | --- | --- |
| M.Des Admissions | `/schools/isdi/admissions/postgraduate/m-des` | Application Fee: 1500; Enrollment Fee: 50,000; Year 1: 6,06,400 | https://atlasuniversity.edu.in/mdes/feestructure | 3/3 |
| MBA Admissions | `/schools/isdi/admissions/postgraduate/mba` | Application Fee: 1500; Enrollment Fee: 50,000; Year 1: 6,06,400 | https://online.fliphtml5.com/vrcjg/xrys/#p=1 | 3/3 |
| B.Des Admissions | `/schools/isdi/admissions/undergraduate/b-des` | Application Fee: 3500; Enrollment Fee: 50,000; Year 1: 7,35,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 3/3 |
| B.Tech Admissions | `/schools/isdi/admissions/undergraduate/b-tech` | Application Fee: 3500; Enrollment Fee: 50,000; Year 1: 7,35,000 | https://atlasuniversity.edu.in/fee-structure/isdi-btech/ | 3/3 |
| Creative Entrepreneurship | `/schools/isdi/programs/postgraduate-diploma/mba-creative-entrepreneurship` | Application Fee: ₹1500; Enrolment Fee: ₹50,000 | https://online.fliphtml5.com/vrcjg/luhy/#p=1 | 2/2 |
| Interior Styling & Spatial Curation | `/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation` | Application Fee: ₹1500; Enrolment Fee: ₹50,000 | https://online.fliphtml5.com/vrcjg/luhy/#p=1 | 2/2 |
| MBA in Design Management & Strategic Thinking | `/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking` | Application Fee: ₹1,500; Enrolment Fee: ₹50,000 | https://online.fliphtml5.com/vrcjg/xrys/ | 2/2 |
| Design Management and Strategy | `/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation` | Application Fee: ₹1500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/dmst/ | 2/2 |
| Event & Experience Design | `/schools/isdi/programs/postgraduate/mba/mba-in-event-&-experience-design` | Application Fee: ₹1500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/dmst/ | 2/2 |
| Design Futures | `/schools/isdi/programs/postgraduate/mdes/design-futures-2-years` | Application Fee: ₹1500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/mdes/ | 2/2 |
| Accessory Design & Craft | `/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Animation, VFX and Gaming | `/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Communication Design & New Media | `/schools/isdi/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Fashion Communication and Styling | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Fashion Design & Technology | `/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Interior Design & Built Environment | `/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Product Design | `/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Strategic Design & Innovation Management | `/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Behavioural Design & AI: Designing How People Think, Feel & Act | `/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Fashion Brand Management | `/schools/isdi/programs/undergraduate/b-des/fashion-brand-management` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Health & Care Design Designing Innovations That Reach Patients | `/schools/isdi/programs/undergraduate/b-des/health-care-design` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Luxury Brand Strategy | `/schools/isdi/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| Service & Experience Design Designing Systems People Actually Live In | `/schools/isdi/programs/undergraduate/b-des/service-&-experience-design` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/bdes/ | 2/2 |
| AI Engineering & Intelligent products | `/schools/isdi/programs/undergraduate/btech/ai-engineering-&-intelligent-products` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/isdi-btech/ | 2/2 |
| Design Engineering | `/schools/isdi/programs/undergraduate/btech/btech-design-engineering` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/isdi-btech/ | 2/2 |
| Systems Design & Intelligent Manufacturing | `/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing` | Application Fee: ₹3,500; Enrolment Fee: ₹50,000 | https://atlasuniversity.edu.in/fee-structure/isdi-btech/ | 2/2 |
| MBA Admissions | `/schools/isme/admissions/postgraduate/admissions-mba-master-of-business-administration` | Application Fee: INR 1,500; Enrollment Fee: INR 50,000; Year 1: INR 6,06,400 | — | 3/3 |
| BBA Admissions | `/schools/isme/admissions/undergraduate/admissions-bba-bachelor-of-business-administration` | Application Fee: INR 3,500; Enrollment Fee: INR 50,000; Year 1: INR 5,25,000 | — | 3/3 |
| B.Sc Admissions | `/schools/isme/admissions/undergraduate/bsc-admissions` | Enrollment Fee: INR 50,000; Year 1: INR 5,25,000 | — | 2/2 |

### Fee structure documents

| Document | Type | Pages linking it |
| --- | --- | --- |
| https://atlasuniversity.edu.in/fee-structure/bba/ | page on the live site | 102 |
| https://atlasuniversity.edu.in/fee-structure/bdes/ | page on the live site | 14 |
| https://online.fliphtml5.com/vrcjg/eotv/#p=1 | fliphtml5 flipbook | 11 |
| https://atlasuniversity.edu.in/fee-structure/mba/ | page on the live site | 10 |
| https://atlasuniversity.edu.in/fee-structure/isdi-btech/ | page on the live site | 4 |
| https://online.fliphtml5.com/vrcjg/luhy/#p=1 | fliphtml5 flipbook | 2 |
| https://atlasuniversity.edu.in/fee-structure/dmst/ | page on the live site | 2 |
| https://atlasuniversity.edu.in/fee-structure/bsc-finance/ | page on the live site | 2 |
| https://atlasuniversity.edu.in/mdes/feestructure | page on the live site | 1 |
| https://online.fliphtml5.com/vrcjg/xrys/#p=1 | fliphtml5 flipbook | 1 |
| https://online.fliphtml5.com/vrcjg/xrys/ | fliphtml5 flipbook | 1 |
| https://atlasuniversity.edu.in/fee-structure/mdes/ | page on the live site | 1 |
