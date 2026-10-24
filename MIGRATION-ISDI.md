# ISDI migration tracker

Audit of `reference/schools/isdi` against the Next.js port. Generated during the Phase 2 audit; **no application code was changed to produce it**.

Statuses: COMPLETE (verified against the updated reference) · NEEDS UPDATE (implemented but outdated) · PARTIAL (sections missing) · NOT STARTED · BLOCKED (cannot verify or upstream incomplete).

## COMPLETE (29)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `about-us/index.php` | `/schools/isdi/about-us` | none; re-measured 12/12 blocks vs production at 1440/390 | none |
| `admissions/postgraduate/m-des.php` | `/schools/isdi/admissions/postgraduate/m-des` | none outside the shared-FAQ bucket; 9/10 blocks exact at 12 widths (key-dates +15.4 at 1280 only, a font-metrics wrap), 113/113 interactions, text identical to production run by run | none |
| `admissions/postgraduate/mba.php` | `/schools/isdi/admissions/postgraduate/mba` | none outside the shared-FAQ bucket; 9/10 blocks exact at all 12 widths, 175/175 interactions, text identical to production run by run. Reference defect reproduced as authored: the menu's "Financial Assistance" link points at `#education-loan`, which this page does not have (it ships a second date strip where M.Des ships Education Loans) | none |
| `admissions/pre-university-summer-school.php` | `/schools/isdi/admissions/pre-university-summer-school` | none outside the shared-FAQ bucket and the known 568-767 QuoteCard fix; 10/11 blocks exact at all 12 widths, text identical to production across all 11 blocks, 142/142 interactions. NOT the Admissions template: no anchor menu, key dates, eligibility, fees, scholarships or loans. Its `#smr-form` NoPaperForms widget is a live remote embed (the reference's own) and 403s on a localhost referrer | none |
| `admissions/undergraduate/b-des.php` | `/schools/isdi/admissions/undergraduate/b-des` | none; 9/10 blocks pixel-exact at 12 widths, 75/75 interactions | none |
| `admissions/undergraduate/b-tech.php` | `/schools/isdi/admissions/undergraduate/b-tech` | none; 9/10 blocks pixel-exact at 12 widths, 79/79 interactions, text content identical to production run by run | none |
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

## NEEDS UPDATE (0)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |

## PARTIAL (1)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `index.php` | `/schools/isdi` | The whole "Our Programs" tab section (Undergraduate PathFinder pane + two Postgraduate cards) is now commented out line by line upstream and REPLACED by a new include, assets/include/19-programmesv2.php (1,576 lines, Tailwind-authored, its own <style>/<script>). That section is not ported. Also: five PathFinder / programme-card hrefs use short slugs that 404 here — AWAITING YOUR DECISION, see the note below the tables. | port the 19-programmes section; keep Home/Programs exports, which the UG and PG Overview pages still use |

## BLOCKED (3)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `blog/index.php` | `/schools/isdi/blog` | Dynamic: ?slug= redirect logic and a DB-backed post list; no data source in this checkout. Its images were added to the mirror in the refresh. | decide the data source (snapshot vs API) before scheduling |
| `programs/postgraduate/m-des-in-design-futures.php` | `/schools/isdi/programs/postgraduate/m-des-in-design-futures` | Duplicate of the built mdes/design-futures-2-years.php. The two have now DIVERGED: the menu-linked copy we built carries the refreshed wording and /fee-structure/mdes/, this one still has the old "refundable" + fliphtml5. The Postgraduate Overview card links here, so that card points at a route we do not have. | decide: alias this route to the built one, or repoint the Overview card |
| `programs/postgraduate/mba/mba-design-led-strategy-&-transformation.php` | `/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation` | The header menu links this as "Design Management and Strategy (2 Years)", but upstream it still carries FOUR years of curriculum (an MBA is two). Half-finished upstream. The populated twin, mba-in-design-management-strategic-thinking.php, is built and the menu was repointed to it on your decision. | leave unbuilt until upstream populates it; revisit if the menu label matters |

## NOT STARTED (28)

| reference | target route | verified differences | next action |
| --- | --- | --- | --- |
| `atlas-isdi-advantage/global-pathway/index.php` | `/schools/isdi/atlas-isdi-advantage/global-pathway` | not linked from the header menu | confirm with the user whether it is in scope |
| `atlas-isdi-advantage/industry-centric-approach.php` | `/schools/isdi/atlas-isdi-advantage/industry-centric-approach` | **linked from the header menu — 404 today** | build when scheduled |
| `atlas-isdi-advantage/internationalisation/index.php` | `/schools/isdi/atlas-isdi-advantage/internationalisation` | **linked from the header menu — 404 today** | build when scheduled |
| `campus/index.php` | `/schools/isdi/campus` | **linked from the header menu — 404 today** | build when scheduled |
| `celebrating-13-years-isdi-and-parsons/index.php` | `/schools/isdi/celebrating-13-years-isdi-and-parsons` | not linked from the header menu | confirm with the user whether it is in scope |
| `events/community-and-culture.php` | `/schools/isdi/events/community-and-culture` | **linked from the header menu — 404 today** | build when scheduled |
| `events/creative-showcases.php` | `/schools/isdi/events/creative-showcases` | **linked from the header menu — 404 today** | build when scheduled |
| `events/immersions-&-experiences.php` | `/schools/isdi/events/immersions-&-experiences` | **linked from the header menu — 404 today** | build when scheduled |
| `events/industry-and-mentorship.php` | `/schools/isdi/events/industry-and-mentorship` | **linked from the header menu — 404 today** | build when scheduled |
| `events/skill-&-tech-innovations.php` | `/schools/isdi/events/skill-&-tech-innovations` | **linked from the header menu — 404 today** | build when scheduled |
| `events/the-edit.php` | `/schools/isdi/events/the-edit` | **linked from the header menu — 404 today** | build when scheduled |
| `isdi-for-outstation.php` | `/schools/isdi/isdi-for-outstation` | **linked from the header menu — 404 today** | build when scheduled |
| `leeds-arts-university/index.php` | `/schools/isdi/leeds-arts-university` | not linked from the header menu | confirm with the user whether it is in scope |
| `life@atlas-isdi/index.php` | `/schools/isdi/life@atlas-isdi` | **linked from the header menu — 404 today** | build when scheduled |
| `nyfa/index.php` | `/schools/isdi/nyfa` | not linked from the header menu | confirm with the user whether it is in scope |
| `parents-corner.php` | `/schools/isdi/parents-corner` | **linked from the header menu — 404 today** | build when scheduled |
| `parsons-lp/index.php` | `/schools/isdi/parsons-lp` | not linked from the header menu | confirm with the user whether it is in scope |
| `programs/undergraduate/b-des/behavioural-design-&-ai.php` | `/schools/isdi/programs/undergraduate/b-des/behavioural-design-&-ai` | not linked from the header menu | confirm with the user whether it is in scope |
| `programs/undergraduate/btech/systems-design-&-intelligent-manufacturing.php` | `/schools/isdi/programs/undergraduate/btech/systems-design-&-intelligent-manufacturing` | not linked from the header menu | confirm with the user whether it is in scope |
| `scad.php` | `/schools/isdi/scad` | not linked from the header menu | confirm with the user whether it is in scope |
| `success-stories/masters-progression.php` | `/schools/isdi/success-stories/masters-progression` | **linked from the header menu — 404 today** | build when scheduled |
| `success-stories/placements.php` | `/schools/isdi/success-stories/placements` | **linked from the header menu — 404 today** | build when scheduled |
| `success-stories/startups.php` | `/schools/isdi/success-stories/startups` | **linked from the header menu — 404 today** | build when scheduled |
| `success-stories/success-snapshot/index.php` | `/schools/isdi/success-stories/success-snapshot` | **linked from the header menu — 404 today** | build when scheduled |
| `the-edits.php` | `/schools/isdi/the-edits` | not linked from the header menu | confirm with the user whether it is in scope |
| `thought-leaderships/index.php` | `/schools/isdi/thought-leaderships` | **linked from the header menu — 404 today** | build when scheduled |
| `ual-lp.php` | `/schools/isdi/ual-lp` | not linked from the header menu | confirm with the user whether it is in scope |
| `victoria-university-of-wellington/index.php` | `/schools/isdi/victoria-university-of-wellington` | not linked from the header menu | confirm with the user whether it is in scope |

## Totals

| status | pages |
| --- | --- |
| COMPLETE | 29 |
| NEEDS UPDATE | 0 |
| PARTIAL | 1 |
| BLOCKED | 3 |
| NOT STARTED | 28 |
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
