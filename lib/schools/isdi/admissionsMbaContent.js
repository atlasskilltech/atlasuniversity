/*
 * Content for /schools/isdi/admissions/postgraduate/mba —
 * reference/schools/isdi/admissions/postgraduate/mba.php, transcribed from the page
 * production renders, one module per block under ./admissions-isdi/mba.
 *
 * The fourth of the five ISDI Admissions pages, and the second postgraduate one. It is
 * m-des.php with four blocks changed — the two files differ by 128 diff lines, almost all
 * of them content — but the BLOCK LIST is not the same:
 *
 *   - Key Dates includes `keydates/mba-dmst.php` (admission cycle 7) rather than
 *     `keydates/mdes.php` (cycle 6);
 *   - where the M.Des page includes `loans/education-loans.php`, this page includes a
 *     SECOND date strip, `keydates/mba.php` (cycle 8), authored bare — no section, no
 *     container, no heading and no id;
 *   - so there is **no Education Loans grid on this page at all**, and the sticky menu's
 *     "Financial Assistance" link still points at `#education-loan`, which matches nothing
 *     (verified on production: zero occurrences of that id). Transcribed as authored.
 *   - the FAQ is `faq/isdi/admissions/pg-mba.php`, eight MBA-specific questions.
 *
 * **It opens a `mysqli` connection on line 15**, before a byte of body output, so it fatals
 * in this checkout. Every value is read from production; the twelve date figures across the
 * two strips are that snapshot, from `getAdmissionCyclesCon($conn, 7)` and `(…, 8)` through
 * `showDateCon()`.
 *
 * **Two blocks are the B.Des page's, re-exported rather than transcribed twice** — the
 * anchor menu and the scholarship band are byte-identical on both references (compared run
 * by run). The FAQ is NOT, and neither is Education Loans, which this page does not have.
 *
 * **This page adds no asset.** All fourteen it paints are already on disk: the hero is the
 * same CDN file as the other Admissions heroes, the apply-step images are the B.Des
 * programme page's, and both polygons, the two scholarship washes, the flower, the search
 * glyph and the FAQ arrow were already local (verified by SHA-1 against `public/`).
 */
export { isdiAdmMbaHero } from './admissions-isdi/mba/hero';
export { isdiAdmMbaHowToApply } from './admissions-isdi/mba/how-to-apply';
export { isdiAdmMbaKeyDates } from './admissions-isdi/mba/key-dates';
export { isdiAdmMbaEligibility } from './admissions-isdi/mba/eligibility';
export { isdiAdmMbaFees } from './admissions-isdi/mba/fees';
export { isdiAdmMbaSecondStrip } from './admissions-isdi/mba/second-strip';
export { isdiAdmMbaFaq } from './admissions-isdi/mba/faq';

/* identical to the B.Des Admissions page — same markup, same shared includes */
export { isdiAdmBdesMenu as isdiAdmMbaMenu } from './admissions-isdi/b-des/menu';
export {
  isdiAdmBdesScholarships as isdiAdmMbaScholarships,
} from './admissions-isdi/b-des/scholarships';

export { isdiAboutSearch } from './aboutContent';
