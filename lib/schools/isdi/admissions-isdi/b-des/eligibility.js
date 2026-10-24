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
      /*
       * Each paragraph is followed by a `<ul>` in the reference. The port shipped
       * only the three paragraphs: the five list items were missing, and the gap
       * was invisible to every height and screenshot check because the dropdowns
       * start CLOSED. `;east` and the `(IB)` spacing are authored.
       */
      body: [
        'IB Diploma Program',
        {
          list: 'ul',
          items: [
            '3 HL, 3 SL with a minimum of 24 credit points.',
          ],
        },
        'IB Diploma Course (i.e. Certificate) Programme‍',
        {
          list: 'ul',
          items: [
            '3 HL, 3 SL with a minimum of 24 credit points.',
          ],
        },
        'IB career Related Study Programmes',
        {
          list: 'ul',
          items: [
            '02 DP subjects with at ;east 01 subject at HL Level and minimum 3 points in each DP subject.',
            'Career Related Study (CRS) with at least 03 subjects.',
            'IBCP Equivalence for General Strand (Design, Science, B. Sc Finance): International Baccalaureate Career Related Study (IBCP) qualification with core components requirement awarded by International Baccalaureate (IB).',
          ],
        },
      ],
    },
  ],
};
