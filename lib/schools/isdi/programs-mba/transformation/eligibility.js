/*
 * Eligibility (`section.section.blue-bg`). Same shape as the B.Des/B.Tech eligibility, but this
 * page's groups carry the SHORT item wording (the Design Engineering page carries the long
 * GCSE/IGCSE text), its application fee is ₹1500 (DE: ₹3,500), and its Fee Structure link is
 * `/fee-structure/dmst/` (DE: `/fee-structure/isdi-btech/`). The eligibility is Class-XII /
 * Maths-based — undergraduate-style criteria on a page titled as an MBA — part of the upstream
 * discrepancy flagged in MIGRATION-ISDI.md; transcribed as authored.
 */
export const isdiMbaTransformationEligibility = {
  title: 'Eligibility',
  groups: [
    {
      title: 'Indian Boards (ISC / CBSE / State Boards)',
      subdesc: null,
      subdescs: [],
      lessSpace: false,
      items: ['Minimum 60% overall in Class XII', 'Mathematics is a mandatory subject'],
    },
    {
      title: 'A-Levels (UK)',
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
      subdesc: 'A minimum of 24 points, including:',
      subdescs: [],
      lessSpace: false,
      items: ['3 Higher Level (HL) subjects', '3 Standard Level (SL) subjects', 'Mathematics is mandatory'],
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
        { label: 'Fee Structure', href: 'https://atlasuniversity.edu.in/fee-structure/dmst/' },
        { label: 'Admissions Policy', href: '/admissions-policy/' },
      ],
    },
    {
      title: 'Loans & Scholarships',
      text: 'That’s right – Funding just got easier! We partner with India’s top banks to support your journey to success. And, Our ATLAS Scholarship is there to enable access to world-class education for you and build a lifelong growth.',
      spaced: false,
      buttons: [
        { label: 'Education Loans', href: '/education-loan' },
        { label: 'ATLAS Scholarships', href: '/scholarships-and-financial-aid' },
      ],
    },
  ],
};
