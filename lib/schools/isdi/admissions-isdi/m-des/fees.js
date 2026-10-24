/*
* "Fee Structure" — `.df-container.isdi` holding the coloured lead card and
 * three plain ones. The `.button-regular` here is the #ec1376 pill, not the #d20158 one the
 * other two head rows use.
 *
 * A two-year postgraduate programme, so the figures differ from the undergraduate
 * pages': 2 Years, 1500, 50,000, 6,06,400. The brochure URL is a different SHAPE here
 * too — `/mdes/feestructure`, not the `/fee-structure/<programme>/` the B.Des, B.Tech
 * and M.Des *programme* pages use. Transcribed as authored.
 */
export const isdiAdmMdesFees = {
  heading: 'Fee Structure',
  /* ref `.df-container.isdi` — the bare class. The B.Des and B.Tech Admissions pages
     author `.mrg-mo-top` on the same element, which is 20px of top margin at <=767; this
     page does not. */
  mrgMoTop: false,
  sub: 'We believe in clarity & Here’s a simple breakdown of our fees!',
  button: {
    label: 'View Fee Structure',
    href: 'https://atlasuniversity.edu.in/mdes/feestructure',
    variant: 'pink',
    /* ref target="_blank" */
    newTab: true,
  },
  cards: [
    {
      lead: 'Total Duration',
      leadStrong: true,
      lines: [
        '2 Years',
      ],
      background: '#ec1376',
      lead4Colour: true,
      note: '*Indicative & subject to change',
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
      lines: [
        '1500',
      ],
    },
    {
      lead: 'Enrollment Fee',
      leadStrong: false,
      lines: [
        '50,000',
      ],
    },
    {
      lead: 'Year 1',
      leadStrong: false,
      lines: [
        '6,06,400',
      ],
    },
  ],
};
