/*
* "Dates & Registration" — `.head-wrap > (.tt-wrap, a.button-regular)` over
 * `.isdi-guide-wrapper > .guide-steps-wrapper-isdi`, which is exactly the `.gd-steps` band
 * `components/Schools/ISDI/ProgramDetail/Admissions` already renders. It is the form of
 * that component WITH a lead and a button, so it takes the 60px `.isdi-guide-wrapper` top
 * padding — the four other Admissions pages author the heading bare and do not.
 *
 * **Four steps, not five**, and the button scrolls to `#smr-form` rather than leaving the
 * page. The four tones were measured on this reference rather than carried over by
 * position: `tbg1 isdi-blue-5` #173a87 (min-height 260), `tbg2 isdi` #0a46ca,
 * `tbg2 isdi-blue-5` #193e90, `tbg3 isdi` #1a53ef.
 *
 * Three of the four step images are the B.Des programme page's and the fourth is the MBA
 * Design Management page's `online-meeting.png`; all four were already on disk.
 *
 * Reference note: step 01 reads "Upcoming Session in Summer 2025" on a page whose hero
 * sells a 2027 intake. Transcribed as authored.
 */
const IMG = '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions';

export const isdiAdmSummerSchoolDates = {
  heading: 'Dates & Registration',
  sub: 'Present outcomes, growth & direct pathway clearly',
  button: {
    label: 'Know more',
    href: '#smr-form',
  },
  steps: [
    {
      num: '01',
      title: 'Upcoming Session in Summer 2025',
      tone: '#173a87',
      image: { src: `${IMG}/tab-3-img-1.png`, width: 249, height: 266, alt: '' },
    },
    {
      num: '02',
      title: 'Everyone in Grades 8–12 (Ages 13–17) are eligible',
      tone: '#0a46ca',
      image: { src: `${IMG}/tab-3-img-2.png`, width: 241, height: 268, alt: '' },
    },
    {
      num: '03',
      title: 'Duration is \n2 Weeks',
      tone: '#193e90',
      image: {
        src: '/assets/images/schools/isdi/programs/mba/design-management/admissions/online-meeting.png',
        width: 241,
        height: 268,
        alt: '',
      },
    },
    {
      num: '04',
      title: 'Graduate with a Certificate from ISDI & Parsons School of Design, New York',
      tone: '#1a53ef',
      image: { src: `${IMG}/jigsaw.png`, width: 266, height: 252, alt: '' },
    },
  ],
};
