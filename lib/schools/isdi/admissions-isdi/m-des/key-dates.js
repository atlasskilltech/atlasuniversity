/*
* "Key Dates & Deadlines" — `keydates/mdes.php`, which renders a date STRIP
 * (`.dates-fees-container.isdi > .df-container-atlas > 6 x .df-card`), not the Bootstrap
 * table the B.Des and B.Tech includes render. There is no button under it.
 *
 * The six values come from `getAdmissionCyclesCon($conn, 6)` through `showDateCon()`, so
 * they are a snapshot of what production serves — the page opens its own `mysqli`
 * connection and cannot run in this checkout. "Closed" is what `showDateCon()` prints for a
 * null or past date.
 *
 * `showDateCon()` wraps each ordinal in a `<sup>` and prints "Closed" inside a `<b>`, so
 * every value is a run list rather than a plain string. Flattening them made each date
 * ~4px wider at 18px/700 — enough to wrap the "Group Discussion and Personal Interview"
 * cell one line early at 1280.
 */
export const isdiAdmMdesKeyDates = {
  heading: 'Key Dates & Deadlines',
  strip: {
    lead: {
      title: 'M.Des\n\nApplication Start',
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
        label: 'Acceptance Deadline',
        value: [{ bold: 'Closed' }],
      },
      {
        label: 'Annual Fee Payment Deadline',
        value: ['6', { sup: 'th' }, ' Jan 2027'],
      },
    ],
  },
};
