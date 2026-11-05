/*
* "Key Dates & Deadlines" — `keydates/mba-dmst.php`, a date STRIP
 * (`.dates-fees-container.isdi > .df-container-atlas > 6 x .df-card`), the same shape the
 * M.Des page renders and not the Bootstrap table the B.Des and B.Tech includes render.
 * There is no button under it.
 *
 * The six values come from `getAdmissionCyclesCon($conn, 7)` through `showDateCon()`, so
 * they are a snapshot of what production serves — the page opens its own `mysqli`
 * connection on line 15 and cannot run in this checkout. "Closed" is what `showDateCon()`
 * prints for a null or past date.
 *
 * `showDateCon()` wraps each ordinal in a `<sup>`, so every date is a run list rather than
 * a plain string. The M.Des port had been flattening these; see `KeyDates`.
 *
 * Note this page has a SECOND strip, `keydates/mba.php`, below the scholarship band —
 * `./second-strip.js`.
 */
export const isdiAdmMbaKeyDates = {
  heading: 'Key Dates & Deadlines',
  strip: {
    lead: {
      title: 'MBA DMST\n\nApplication Start',
      value: ['1', { sup: 'st' }, ' Sep 2026'],
      image: {
        /* byte-identical (SHA-1) to the ATLAS Admissions pages' polygon, so it is reused */
        src: '/assets/images/admissions/key-dates/polygon-atlas.png',
        width: 18,
        height: 25,
        alt: '',
      },
    },
    cards: [
      {
        label: 'Application Deadline',
        value: ['22', { sup: 'nd' }, ' Nov 2026'],
      },
      {
        label: 'Group Discussion and Personal Interview',
        value: ['25', { sup: 'th' }, ' Nov 2026'],
      },
      {
        label: 'Result\nAnnouncement',
        value: ['1', { sup: 'st' }, ' Dec 2026'],
      },
      {
        /* ref: authored with a `<br>` here, where the second strip's cell is one line */
        label: 'Acceptance \nDeadline',
        /* `showDateCon()`'s literal `<b>Closed</b>` for a null or past date */
        value: [{ bold: 'Closed' }],
      },
      {
        label: 'Annual Fee Payment Deadline',
        value: ['6', { sup: 'th' }, ' Jan 2027'],
      },
    ],
  },
};
