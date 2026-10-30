/*
 * "Admissions — The Design Way" — systems-design-&-intelligent-manufacturing.php (`.gd-steps` x 4). Each step's colour comes
 * from its `tbgN + isdi/isdi-blue-5` pair; only the first carries a button.
 */
export const isdiBtechSystemsAdmissions = {
  heading: 'Admissions — The Design Way',
  sub: 'Admissions in 4 Creative Steps',
  subFlush: false,
  button: {
    label: 'Know more',
    href: '/schools/isdi/admissions/undergraduate/b-des',
  },
  steps: [
    {
      num: '01',
      title: 'Submit the Application Form',
      tone: '#173a87',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-1.png',
        width: 249,
        height: 266,
        alt: '',
      },
      link: {
        label: 'Apply for July 2027 Intake',
        href: '/applicationform',
      },
    },
    {
      num: '02',
      title: 'Creative Aptitude Test',
      tone: '#0a46ca',
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
      tone: '#193e90',
      image: {
        src: '/assets/images/schools/isdi/programs/mba/design-management/admissions/online-meeting.png',
        width: 181,
        height: 206,
        alt: '',
      },
      link: null,
    },
    {
      num: '04',
      title: 'Final Selection & Offer Letter',
      tone: '#0f2d6f',
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
