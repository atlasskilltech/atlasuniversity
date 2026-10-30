/*
 * "Admissions — The Design Way" (`.isdi-guide-wrapper > .guide-steps-wrapper-isdi > 4 x
 * .gd-steps`). Differs from the B.Tech Design Engineering page's "The Technical Way" band in
 * the heading, the step titles, and the third step's image. Each step's colour comes from its
 * `tbgN + isdi/isdi-blue-5` pair (the site-wide tone map). `sub` carries `.sub-heading.mrgbtm-0`,
 * so `subFlush` is true. The "Know more" link is authored at the B.Des admissions page — an
 * upstream copy-paste leftover on this MBA page — transcribed as authored.
 */
export const isdiMbaTransformationAdmissions = {
  heading: 'Admissions — The Design Way',
  sub: 'Admissions in 4 Creative Steps',
  subFlush: true,
  button: {
    label: 'Know more',
    href: '/schools/isdi/admissions/undergraduate/b-des', // as authored (copy-paste leftover)
  },
  steps: [
    {
      num: '01',
      title: 'Submit the Application Form',
      tone: '#173a87', // tbg1 isdi-blue-5
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-1.png',
        width: 249,
        height: 266,
        alt: '',
      },
      link: { label: 'Apply for July 2027 Intake', href: '/applicationform' },
    },
    {
      num: '02',
      title: 'Creative Aptitude Test',
      tone: '#0a46ca', // tbg2 isdi
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-2.png',
        width: 241,
        height: 268,
        alt: '',
      },
      link: null,
    },
    {
      num: '03',
      title: 'Portfolio Review + Interview',
      tone: '#193e90', // tbg2 isdi-blue-5
      image: {
        src: '/assets/images/schools/isdi/programs/mba/transformation/admissions/online-meeting.png',
        width: 181,
        height: 206,
        alt: '',
      },
      link: null,
    },
    {
      num: '04',
      title: 'Final Selection & Offer Letter',
      tone: '#0f2d6f', // tbg3 isdi
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/jigsaw.png',
        width: 266,
        height: 252,
        alt: '',
      },
      link: null,
    },
  ],
};
