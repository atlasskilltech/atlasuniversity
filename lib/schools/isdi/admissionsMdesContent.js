/*
 * Content for /schools/isdi/admissions/postgraduate/m-des —
 * reference/schools/isdi/admissions/postgraduate/m-des.php, transcribed from the page
 * production renders, one module per block under ./admissions-isdi/m-des.
 *
 * The third of the five ISDI Admissions pages. Same ten blocks in the same order as B.Des
 * and B.Tech, but it is the first of the three with its OWN `$css`
 * (`690ca47b295c3cd130e0a8a2-4738d5664.css`) and it differs in more than copy: Key Dates is
 * a date STRIP rather than a Bootstrap table, Eligibility is plain rich text rather than
 * three dropdowns, and the FAQ is a nine-question M.Des set rather than the shared
 * undergraduate one.
 *
 * **It opens a `mysqli` connection on line 15**, before a byte of body output, so it fatals
 * in this checkout. Every value is read from production; the six Key Dates figures are that
 * snapshot, from `getAdmissionCyclesCon($conn, 6)` through `showDateCon()`.
 *
 * **Three blocks are the B.Des page's, re-exported rather than transcribed twice** — the
 * anchor menu, the scholarship band and Education Loans are byte-identical on both
 * references (compared run by run). The FAQ is NOT: it has its own include.
 *
 * **This page adds no asset.** The hero is the same CDN file the other two Admissions heroes
 * use, the apply-step images and the fee polygon are already on disk, and the strip's
 * `Polygon-atlas.png` is byte-identical (SHA-1) to the ATLAS Admissions pages' copy.
 */
export { isdiAdmMdesHero } from './admissions-isdi/m-des/hero';
export { isdiAdmMdesHowToApply } from './admissions-isdi/m-des/how-to-apply';
export { isdiAdmMdesKeyDates } from './admissions-isdi/m-des/key-dates';
export { isdiAdmMdesEligibility } from './admissions-isdi/m-des/eligibility';
export { isdiAdmMdesFees } from './admissions-isdi/m-des/fees';
export { isdiAdmMdesFaq } from './admissions-isdi/m-des/faq';

/* identical to the B.Des Admissions page — same markup, same shared includes */
export { isdiAdmBdesMenu as isdiAdmMdesMenu } from './admissions-isdi/b-des/menu';
export {
  isdiAdmBdesScholarships as isdiAdmMdesScholarships,
} from './admissions-isdi/b-des/scholarships';
export { isdiAdmBdesLoans as isdiAdmMdesLoans } from './admissions-isdi/b-des/loans';

export { isdiAboutSearch } from './aboutContent';
