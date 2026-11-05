/*
 * Content for /schools/isdi/admissions/pre-university-summer-school —
 * reference/schools/isdi/admissions/pre-university-summer-school.php, one module per block
 * under ./admissions-isdi/summer-school.
 *
 * The fifth and last ISDI Admissions page, and **the only one that is not the ten-block
 * Admissions template**. It has no `.course-cover-section` hero, no sticky anchor menu, no
 * Key Dates, Eligibility, Fee Structure, Scholarships or Education Loans, and no
 * "More questions?" panel. It is the Summer School PROGRAMME page
 * (`/schools/isdi/programs/pre-university-summer-school`) with four blocks added:
 *
 *   A Day in the Life at ISDI Summer School   the week grid, which the programme page
 *                                             ships commented out line by line
 *   Dates & Registration                      a four-step `.gd-steps` band
 *   #smr-form                                 a live NoPaperForms enquiry widget
 *   FAQ                                       `faq/isdi/admissions/summer-school.php`
 *
 * **Five of its twelve blocks are byte-identical to the programme page's** — "What is ISDI
 * Summer School?", "Your Creative Journey at ISDI", "Hear from Our Young Creators", "Why
 * Join ISDI-Parson Summer School?" and "Highlights of Your Summer School Journey". Each was
 * compared on production line by line and image by image, and each measures the same height
 * to the pixel, so all five are re-exported rather than transcribed twice.
 *
 * **It opens no database connection**, unlike the four other Admissions pages — there is no
 * `mysqli`, no `getAdmissionCycles` and no `showDate` anywhere in the file, and it holds no
 * dates or fees beyond the copy below. Nothing on this page is a database snapshot. It was
 * still measured against production, because the local mirror renders in quirks mode and
 * its ISDI `$domain` is broken.
 *
 * **13 new assets**, all week-grid backgrounds painted only by the stylesheet, under
 * `public/assets/images/schools/isdi/programs/admissions/summer-school/week/`. The six
 * `<img class="grid-hover-img">` files the markup names are NOT shipped: they are
 * permanently `display: none` (see ./week.js).
 */
export { isdiAdmSummerSchoolHero } from './admissions-isdi/summer-school/hero';
export { isdiAdmSummerSchoolStats } from './admissions-isdi/summer-school/stats';
export { isdiAdmSummerSchoolWeek } from './admissions-isdi/summer-school/week';
export { isdiAdmSummerSchoolDates } from './admissions-isdi/summer-school/dates';
export { isdiAdmSummerSchoolForm } from './admissions-isdi/summer-school/form';
export { isdiAdmSummerSchoolBrochure } from './admissions-isdi/summer-school/brochure';
export { isdiAdmSummerSchoolFaq } from './admissions-isdi/summer-school/faq';

/*
 * Identical to /schools/isdi/programs/pre-university-summer-school — same markup, same
 * copy, same images, same measured height. Compared block by block on production.
 */
export {
  isdiSummerSchoolWhatIs as isdiAdmSummerSchoolWhatIs,
  isdiSummerSchoolJourney as isdiAdmSummerSchoolJourney,
  isdiSummerSchoolVoices as isdiAdmSummerSchoolVoices,
  isdiSummerSchoolWhyJoin as isdiAdmSummerSchoolWhyJoin,
  isdiSummerSchoolHighlights as isdiAdmSummerSchoolHighlights,
} from './programsSummerSchoolContent';
