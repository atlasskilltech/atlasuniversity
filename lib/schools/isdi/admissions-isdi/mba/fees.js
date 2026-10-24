/*
* "Fee Structure" — `.df-container.isdi` holding the coloured lead card and three
 * plain ones, under a `.head-wrap.top` whose `.button-regular` is the #ec1376 pill.
 *
 * The figures are the M.Des page's (2 years / 1500 / 50,000 / 6,06,400) but **every one of
 * the four cards is marked up differently**, and all four differences are measured:
 *
 *   lead value   `<div class="df-text-1">2 years<br /></div>` — no `<strong>` at all, and
 *                a lower-case "years". `.df-text-1` is itself 700, so it paints 700.
 *   lead note    `<br /><strong>Total Duration</strong>` — the card's own title again,
 *                where the M.Des page reads "*Indicative & subject to change". An upstream
 *                copy-paste, transcribed as authored.
 *   1500         `<strong class="fee-dates">` — `.fee-dates { font-weight: 600 }`
 *   50,000 /     bare `<strong>` — Webflow's flat bold, measured **700**, where the M.Des
 *   6,06,400     page gives both of them `.fee-dates` and 600.
 *
 * So a line travels as runs: a string is plain text, `{ strong }` is a bare `<strong>`
 * (700) and `{ strong, feeDates: true }` is the `.fee-dates` variant (600). The plain
 * string shorthand the other Admissions pages use is unchanged.
 *
 * The brochure link is the shared fliphtml5 booklet, NOT the per-programme
 * `/fee-structure/…` URL the B.Des, B.Tech and M.Des pages were moved to — this reference
 * still authors `https://online.fliphtml5.com/vrcjg/xrys/#p=1`. Transcribed as authored.
 */
export const isdiAdmMbaFees = {
  heading: 'Fee Structure',
  /* ref `.df-container.isdi` — the bare class, as on the M.Des page. B.Des and B.Tech add
     `.mrg-mo-top`, which is 20px of top margin at <=767. */
  mrgMoTop: false,
  sub: 'We believe in clarity & Here’s a simple breakdown of our fees!',
  button: {
    label: 'View Fee Structure',
    href: 'https://online.fliphtml5.com/vrcjg/xrys/#p=1',
    variant: 'pink',
    /* ref target="_blank" */
    newTab: true,
  },
  cards: [
    {
      lead: 'Total Duration',
      leadStrong: true,
      /* ref: no `<strong>`, so the line is a single plain run */
      lines: [['2 years']],
      background: '#ec1376',
      lead4Colour: true,
      /* ref: the card's own title printed a second time, inside a `<strong>` */
      note: [{ strong: 'Total Duration' }],
      noteBreak: true,
      image: {
        src: '/assets/images/schools/isdi/programs/admissions/b-des/fees/polygon-pink.png',
        width: 18,
        height: 25,
        alt: '',
      },
    },
    {
      lead: 'Application Fee',
      leadStrong: false,
      /* ref `<strong class="fee-dates">` — 600 */
      lines: [[{ strong: '1500', feeDates: true }]],
    },
    {
      lead: 'Enrollment Fee',
      leadStrong: false,
      /* ref a bare `<strong>` — Webflow's flat bold, measured 700 */
      lines: [[{ strong: '50,000' }]],
    },
    {
      lead: 'Year 1',
      leadStrong: false,
      lines: [[{ strong: '6,06,400' }]],
    },
  ],
};
