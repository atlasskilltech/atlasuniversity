/*
 * Bootstrap 4.6 primitives the lp2022 pages are laid out with, restated as Tailwind strings
 * (html font-size 16px, so rem = 16px; `.container` 540 / 720 / 960 / 1140 from 576 / 768 / 992 / 1200
 * — non-overlapping arbitrary ranges, because arbitrary media variants are not emitted in min-width
 * order), plus a few shared bits. Two padding utilities in one class list are resolved by stylesheet
 * order, not by the order written, so a column that restates its gutters uses COL_BOX.
 */
/* the box without its gutters, for containers that restate their own padding */
export const CONTAINER_BOX =
  'mx-auto w-full [@media(min-width:576px)_and_(max-width:767px)]:max-w-[540px] [@media(min-width:768px)_and_(max-width:991px)]:max-w-[720px] [@media(min-width:992px)_and_(max-width:1199px)]:max-w-[960px] [@media(min-width:1200px)]:max-w-[1140px]';
export const CONTAINER = `${CONTAINER_BOX} px-[15px]`;
export const ROW = '-mx-[15px] flex flex-wrap';
export const COL_BOX = 'relative w-full';
export const COL = `${COL_BOX} px-[15px]`;

export const FONT_ROBOTO = 'font-[family-name:var(--font-lp2x-roboto),var(--font-lp2x-roboto-ext),sans-serif]';
export const FONT_RC = 'font-[family-name:var(--font-lp2022-rc),var(--font-lp2022-rc-ext),sans-serif]';

/** Font Awesome 4.7 `fa-phone` (U+F095), drawn as an inline SVG in its own 1408x1792 em box */
export function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 1408 1792" aria-hidden="true" className={className} fill="currentColor">
      <path d="M1408 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z" />
    </svg>
  );
}

/*
 * The lp2022 lead forms posted to per-page PHP mailers (submit.php / mailer.php / store_data.php),
 * which are not ported, and production has no CRM widget on these pages. The form UI is kept as
 * authored but is inert: no action, and the submit button is disabled (which also blocks implicit
 * submission), so nothing is sent anywhere. No copy is added. Recorded in the migration report.
 */
