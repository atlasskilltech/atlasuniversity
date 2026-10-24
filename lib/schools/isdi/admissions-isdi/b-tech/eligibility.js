/*
* "Eligibility" — three `.accordion-item-blue-fill` Webflow dropdowns
 * under a `.head-wrap.mrgbtm32` whose `.button-regular` is the #d20158 pill.
 *
 * All three bodies are B.Tech's own; none is the B.Des page's. The IB group is the first
 * on an ISDI Admissions page to carry LISTS as well as paragraphs — `<p>` then `<ul>`,
 * three times over — so the body travels as an ordered block list: a plain string is a
 * paragraph, `{ list, items }` is a list, the same shape `components/Home/FAQ` already
 * uses for its answers.
 *
 * Measured on the reference with every dropdown forced open: `.content-blue-fill` is
 * `padding: 24px`, each `<p>` is 16px/24 with `margin-bottom: 10px`, each `<ul>` is
 * `margin-bottom: 10px; padding-left: 40px`, disc / outside, and the `<li>`s carry no
 * margins and no inner `<p>`.
 */
export const isdiAdmBtechEligibility = {
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
        'Minimum 50% in class 12. Mathematics and Physics are mandatory along with any one of Chemistry/ Computer Science/Electronics/Information Technology/ Biology/ Informatics Practices/ Biotechnology/ Technical Vocational subject/ Agriculture/ Engineering Graphics/ Business Studies/ Entrepreneurship',
      ],
    },
    {
      title: 'A-Levels (UK)',
      body: [
        'GCSE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary \'O\' Level and 3 subjects at Advanced ("A") Level has been equated with +2 qualification with Mathematics and Physics as a mandatory subject. Along with any one subject of Chemistry/ Computer Science /Electronics /Information Technology / Biology /Informatics Practices / Biotechnology / Technical Vocational subject / Agriculture/ Engineering Graphics/ Business Studies/ Entrepreneurship',
      ],
    },
    {
      title: 'International Baccalaureate (IB)',
      body: [
        'IB Diploma Program',
        {
          list: 'ul',
          items: [
            'IB Diploma Program-3 HL and 3 SL subjects with a minimum of 24 credit points. (Physics and Math are mandatory subjects, and one subject is mandatory from the below i.e Chemistry/ Computer Science/Electronics/Information Technology/ Biology/ Informatics Practices/ Biotechnology/ Technical Vocational subject/ Agriculture/ Engineering Graphics/ Business Studies/ Entrepreneurship)',
          ],
        },
        'IB Diploma Course (i.e. Certificate) Programme‍',
        {
          list: 'ul',
          items: [
            'IB Diploma Course (i.e. Certificate) Program-3 HL and 3 SL subjects with a minimum of 24 credit points. (Physics and Math are mandatory subjects, and one subject is mandatory from the below i.e Chemistry/ Computer Science/Electronics/Information Technology/ Biology/ Informatics Practices/ Biotechnology/ Technical Vocational subject/ Agriculture/ Engineering Graphics/ Business Studies/ Entrepreneurship)',
          ],
        },
        'IBCRSP(IBCP)',
        {
          list: 'ul',
          items: [
            'Students graduating with 03 DP Subjects (Maths’s, Physics, Chemistry, Biology or other similar subject) with at least 01 subjects at HL Level and minimum 3 points in each DP subject.',
            'Career Related Study (CRS) with at least 03 Subjects.',
            'International Baccalaureate Career Related Study(IBCP) qualification with core components requirement awarded by International Baccalaureate(IB).',
          ],
        },
      ],
    },
  ],
};
