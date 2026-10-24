/*
 * Content for /schools/isdi/admissions/undergraduate/b-tech —
 * reference/schools/isdi/admissions/undergraduate/b-tech.php, transcribed from the page
 * production renders, one module per block under ./admissions-isdi/b-tech.
 *
 * The second of the five ISDI Admissions pages, on the same ten-block template as B.Des:
 * a `.course-cover-section` hero, the About page's sticky anchor menu, then How to Apply,
 * Key Dates, Eligibility, Fee Structure, ATLAS Scholarships and Education Loans, the
 * "More questions?" panel and the FAQ.
 *
 * **The page opens a `mysqli` connection on line 15**, before a byte of body output, so it
 * fatals in this checkout exactly as the ATLAS Admissions pages do — every value here is
 * read from production, and the Key Dates table is that snapshot.
 *
 * **Four of the ten blocks are the B.Des page's, re-exported rather than transcribed
 * twice.** The anchor menu, the scholarship band, the Education Loans grid and the FAQ are
 * byte-identical between the two pages — the loans and "More questions?" come from the same
 * shared includes, and the FAQ is the same `faq/isdi/admissions/ug.php`, which is why a
 * B.Tech page carries seven questions written about B.Des. Transcribed as authored.
 *
 * **This page adds no asset.** Its hero photograph is the same CDN file the B.Des hero uses
 * (`68e8e3f2f188fec5275325e8_nav-bar.png`), and its apply-step images, fee polygon,
 * scholarship washes, lender logos and FAQ arrow are all already on disk.
 */
export { isdiAdmBtechHero } from './admissions-isdi/b-tech/hero';
export { isdiAdmBtechHowToApply } from './admissions-isdi/b-tech/how-to-apply';
export { isdiAdmBtechKeyDates } from './admissions-isdi/b-tech/key-dates';
export { isdiAdmBtechEligibility } from './admissions-isdi/b-tech/eligibility';
export { isdiAdmBtechFees } from './admissions-isdi/b-tech/fees';

/* identical to the B.Des Admissions page — same markup, same includes */
export { isdiAdmBdesMenu as isdiAdmBtechMenu } from './admissions-isdi/b-des/menu';
export {
  isdiAdmBdesScholarships as isdiAdmBtechScholarships,
} from './admissions-isdi/b-des/scholarships';
export { isdiAdmBdesLoans as isdiAdmBtechLoans } from './admissions-isdi/b-des/loans';
export { isdiAdmBdesFaq as isdiAdmBtechFaq } from './admissions-isdi/b-des/faq';

export { isdiAboutSearch } from './aboutContent';
