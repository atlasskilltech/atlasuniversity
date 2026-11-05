/*
* "A Day in the Life at ISDI Summer School" — `.main-week-wrapper > 7 x
 * .week-grid-main`, the one block on this page that no other page in the rebuild has.
 *
 * **The programme page ships this same markup commented out line by line**; here it is
 * live, which is why `/schools/isdi/programs/pre-university-summer-school` has seven
 * blocks and this page has twelve.
 *
 * Each column is a 164px flex column (gap 16, `space-between`) and each cell is a
 * fixed-height box the stylesheet names individually — there is no repeating card shape,
 * so the cells travel as a `kind` plus their copy and `WeekGrid` holds one measured class
 * string per kind. Every height, colour, padding and blend mode below was read off
 * production; the thirteen background images are painted only by the stylesheet, so they
 * travel here as data.
 *
 * **Six `<img class="grid-hover-img">` are authored and none of them ever paints.**
 * `.grid-hover-img` is `display: none`, and the only rule that would reveal one is the
 * page's own inline `.mon-cell-1:hover .hover-img { display: block }` — `.hover-img` is a
 * class no element on the page carries. Verified on production: all six compute
 * `display: none` at every width. They are not rendered and their files are not shipped.
 *
 * Reference note: the Thursday column authors `.thu-cell-last-2` twice with the same copy
 * ("DESIGN PATENTS have entered the chat"), the second adding `.bg`. Transcribed as
 * authored. Its heading is also misspelt "Thrusday" upstream.
 */
const W = '/assets/images/schools/isdi/programs/admissions/summer-school/week';

export const isdiAdmSummerSchoolWeek = {
  heading: 'A Day in the Life at ISDI Summer School',
  sub: 'Your Two-Week Design Adventure',
  days: [
    {
      day: 'Monday',
      /* ref the `.w-embed` holding the page's inline `<style>` — 0x0, but a real flex
         child of this `space-between` column, so it shifts every cell below it */
      embed: true,
      cells: [
        /* ref .mon-cell-1.isdi-1 — artwork only, no copy */
        { kind: 'art', h: 176, image: `${W}/mon-coffee.png` },
        { kind: 'class', size: 'big', title: 'Design\nFoundations' },
        /* ref .mon-cell-3.isdi — `background-blend-mode: overlay` over #193e90 */
        {
          kind: 'bottom-label',
          h: 189,
          bg: '#193e90',
          image: `${W}/mon-wilo.png`,
          position: '50% 100%',
          repeat: false,
          blend: 'overlay',
          bold: true,
          text: 'Digital\nLabs',
        },
        { kind: 'class', size: 'small', title: 'Group Projects' },
        /* ref .mon-cell-last.isdi — `background-blend-mode: soft-light` */
        {
          kind: 'bottom-label',
          h: 110,
          bg: '#193e90',
          image: `${W}/mon-quiet-corner.png`,
          blend: 'soft-light',
          text: 'A quiet\ncorner',
        },
      ],
    },
    {
      day: 'Tuesday',
      cells: [
        /* ref .tue-decor-div — a 15px two-tone strip over a 127px panel */
        { kind: 'tue-head', text: 'Portfolio counselling' },
        /* ref .tue-cell-2.isdi — `background-size: cover`, soft-light */
        {
          kind: 'top-label',
          h: 192,
          bg: '#193e90',
          image: `${W}/tue-ideation.webp`,
          size: 'cover',
          position: '50% 100%',
          blend: 'soft-light',
          text: 'Ideation & Visual Thinking',
        },
        /* ref .tue-cell-3.isdi — `background-blend-mode: screen` over #b1346d */
        {
          kind: 'centre-block',
          h: 209,
          bg: '#b1346d',
          image: `${W}/tue-wilo-2.png`,
          position: '50% 100%',
          repeat: false,
          blend: 'screen',
          text: 'Creative Tambola Nights.',
        },
        /* ref: this one is wrapped in a plain `<div>`, unlike every other class cell */
        { kind: 'class', size: 'big', title: 'Sustainable Design', wrapped: true },
      ],
    },
    {
      day: 'Wednesday',
      cells: [
        { kind: 'class', size: 'big', title: 'Excel for Decision Making' },
        {
          kind: 'wed-ai',
          h: 281,
          bg: '#193e90',
          image: `${W}/wed-ai-bg.png`,
          position: '50% 100%',
          repeat: false,
          text: 'Working\nwith AI',
        },
        { kind: 'class', size: 'small', title: 'Elements of design' },
        { kind: 'class', size: 'big', title: 'Presentation Upskilling' },
        /* ref .greencard-2.isdi — #b1346d, no artwork */
        { kind: 'greencard', h: 119, bg: '#b1346d', text: 'Club Events' },
      ],
    },
    {
      day: 'Thrusday',
      cells: [
        {
          kind: 'thu-1',
          h: 174,
          bg: '#193e90',
          head: 'International Opportunities',
          text: 'have entered the chat',
        },
        { kind: 'class', size: 'big', title: 'Marketing Management' },
        /* ref .thu-cell-last-2.isdi — the `.isdi` modifier sets `background-image: none` */
        {
          kind: 'thu-last',
          h: 174,
          bg: '#193e90',
          text: 'DESIGN PATENTS have entered the chat',
        },
        /* ref .thu-cell-last-2.isdi.bg — the same copy again, with artwork */
        {
          kind: 'thu-last',
          h: 174,
          bg: '#193e90',
          image: `${W}/thu-patents.png`,
          position: '50% 100%',
          repeat: false,
          blend: 'soft-light',
          text: 'DESIGN PATENTS have entered the chat',
        },
      ],
    },
    {
      day: 'Friday',
      cells: [
        {
          kind: 'top-label',
          h: 209,
          bg: '#193e90',
          image: `${W}/fri-masterclass.png`,
          blend: 'soft-light',
          text: 'Masterclass in session...',
        },
        { kind: 'class', size: 'small', title: 'Basics of Finance' },
        { kind: 'class', size: 'big', title: 'Consumer Behaviour' },
        {
          kind: 'fri-last',
          h: 303,
          bg: '#193e90',
          image: `${W}/fri-trivia.png`,
          blend: 'soft-light',
          text: 'Design Trivia',
        },
      ],
    },
    {
      day: 'Saturday',
      cells: [
        {
          kind: 'sat-first',
          h: 206,
          bg: '#b1346d',
          image: `${W}/sat-city-life.png`,
          position: '50% 100%',
          repeat: false,
          blend: 'overlay',
          text: 'City life starter\npack',
        },
        /* ref .sat-cell-2.isdi — the modifier sets `background-image: none` */
        { kind: 'sat-2', h: 144, bg: '#b1346d', text: 'What’s\ntrending?' },
        {
          kind: 'sat-last',
          h: 282,
          bg: '#b1346d',
          image: `${W}/sat-fests.png`,
          text: 'College experience \n🤝🏼\n Fests',
        },
      ],
    },
    {
      day: 'Sunday',
      cells: [
        {
          kind: 'sun-1',
          h: 241,
          bg: '#b1346d',
          image: `${W}/sun-mumbai.png`,
          text: 'Mumbai Meri \nJaan',
        },
        /* ref .sun-cell-2.isdi — no background COLOUR, artwork only */
        {
          kind: 'sun-2',
          h: 407,
          image: `${W}/sun-dnd.png`,
          repeat: false,
          text: 'DND!\nlive close, sleep more.',
        },
      ],
    },
  ],
};
