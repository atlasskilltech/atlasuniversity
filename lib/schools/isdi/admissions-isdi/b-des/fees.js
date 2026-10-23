/*
* "Fee Structure" — `.df-container.isdi` holding the coloured lead card and
 * three plain ones. The `.button-regular` here is the #ec1376 pill, not the #d20158 one the
 * other two head rows use.
 */
export const isdiAdmBdesFees = {
  heading: 'Fee Structure',
  sub: 'We believe in clarity & Here’s a simple breakdown of our fees!',
  button: {
    label: 'View Fee Structure',
    href: 'https://atlasuniversity.edu.in/fee-structure/bdes/',
    variant: 'pink',
    /* ref target="_blank" */
    newTab: true,
  },
  cards: [
    {
      lead: 'Total Duration',
      leadStrong: true,
      lines: [
        '4 Years',
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
        '3500',
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
        '7,35,000',
      ],
    },
  ],
};
