/*
* "Eligibility" — three `.accordion-item-blue-fill` Webflow dropdowns
 * under a `.head-wrap.mrgbtm32` whose `.button-regular` is the #d20158 pill.
 */
export const isdiAdmBdesEligibility = {
  heading: 'Eligibility',
  button: {
    label: 'View Admission Policy',
    href: '/admissions-policy/',
    variant: 'pink-cta',
    /* ref target="_blank" */
    newTab: true,
  },
  items: [
    {
      title: 'Indian Boards (ISC / CBSE / State Boards)',
      body: [
        'An aggregate of 50% marks in Grade XII in any discipline.',
      ],
    },
    {
      title: 'A-Levels (UK)',
      body: [
        'GCSE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary \'O\' Level and 2 subjects at Advanced \'A\' Level, has been equated with +2 stage qualification.',
      ],
    },
    {
      title: 'International Baccalaureate (IB)',
      body: [
        'IB Diploma Program',
        'IB Diploma Course (i.e. Certificate) Programme‍',
        'IB career Related Study Programmes',
      ],
    },
  ],
};
