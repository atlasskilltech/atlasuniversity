/*
* Eligibility — assets/include/ug-bdes-eligibility.php (`section.section.blue-bg`), the same
 * include every B.Des page carries.
 */
export const isdiMbaEventDesignEligibility = {
  title: 'Eligibility',
  groups: [
    {
      title: 'Indian Boards (ISC / CBSE / State Boards)',
      titleRuns: null,
      subdesc: null,
      subdescs: [],
      lessSpace: false,
      items: [
        'Minimum 60% overall in Class XII',
        'Mathematics is a mandatory subject',
      ],
    },
    {
      title: 'A-Levels (UK)',
      titleRuns: null,
      subdesc: null,
      subdescs: [],
      lessSpace: false,
      items: [
        'Minimum grades A, B, or C in any 2 subjects',
        'Plus a Grade B or above in Mathematics',
        'Total of 3 subjects required',
      ],
    },
    {
      title: 'International Baccalaureate (IB)',
      titleRuns: null,
      subdesc: 'A minimum of 24 points, including:',
      subdescs: [
        'A minimum of 24 points, including:',
      ],
      lessSpace: true,
      items: [
        '3 Higher Level (HL) subjects',
        '3 Standard Level (SL) subjects',
        'Mathematics is mandatory',
      ],
    },
  ],
  application: [
    {
      title: 'Application Fee: ₹1500',
      text: 'After selection, the enrolment fee of ₹50,000 to secure your seat is Nonrefundable!',
      spaced: true,
      buttons: [],
    },
    {
      title: 'Fee Structure',
      text: 'We believe in clarity. Here’s a simple year-on-year breakdown of our fees!',
      spaced: true,
      buttons: [
        {
          label: 'Fee Structure',
          href: 'https://atlasuniversity.edu.in/fee-structure/dmst/',
        },
        {
          label: 'Admissions Policy',
          href: '/admissions-policy/',
        },
      ],
    },
    {
      title: 'Loans & Scholarships',
      text: 'That’s right – Funding just got easier! We partner with India’s top banks to support your journey to success. And, Our ATLAS Scholarship is there to enable access to world-class education for you and build a lifelong growth.',
      spaced: false,
      buttons: [
        {
          label: 'Education Loans',
          href: '/education-loan',
        },
        {
          label: 'ATLAS Scholarships',
          href: '/scholarships-and-financial-aid',
        },
      ],
    },
  ],
};
