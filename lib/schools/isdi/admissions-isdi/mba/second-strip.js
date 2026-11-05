/*
* The page's SECOND date strip — `keydates/mba.php`, included between the
 * scholarship band and the "More questions?" panel.
 *
 * **It is authored bare.** Where every other date strip on the site sits inside a
 * `section.section > .container > .dates-fees-container.isdi`, this one is a
 * `.df-container-atlas` placed directly in `.main-wrapper`: no section, no container, no
 * heading, and no id. So it is full-bleed — 1440px wide at a 1440px viewport — and it keeps
 * its own 32px radius rather than being clipped to 16 by the `.dates-fees-container`.
 * Verified on production at 1440 / 768 / 479 / 390.
 *
 * Its six values are `getAdmissionCyclesCon($conn, 8)` — a different admission cycle
 * (master id 8, the ISME MBA) from the DMST strip above (id 7), and every date differs.
 * Snapshotted from production for the same reason: the page cannot run in this checkout.
 */
export const isdiAdmMbaSecondStrip = {
  bare: true,
  strip: {
    lead: {
      /* ref: "Applications Start", plural, where the DMST strip reads "Application Start" */
      title: 'MBA\n\nApplications Start',
      value: ['1', { sup: 'st' }, ' Sep 2026'],
      image: {
        src: '/assets/images/admissions/key-dates/polygon-atlas.png',
        width: 18,
        height: 25,
        alt: '',
      },
    },
    cards: [
      {
        label: 'Application Deadline',
        value: ['4', { sup: 'th' }, ' Dec 2026'],
      },
      {
        label: 'Group Discussion and Personal Interview',
        value: ['5', { sup: 'th' }, ' Dec 2026'],
      },
      {
        label: 'Result\nAnnouncement',
        value: ['14', { sup: 'th' }, ' Dec 2026'],
      },
      {
        /* ref: one line here; the DMST strip authors a `<br>` in the same label */
        label: 'Acceptance Deadline',
        value: ['19', { sup: 'th' }, ' Dec 2026'],
      },
      {
        label: 'Annual Fee Payment Deadline',
        value: ['19', { sup: 'th' }, ' Jan 2027'],
      },
    ],
  },
};
