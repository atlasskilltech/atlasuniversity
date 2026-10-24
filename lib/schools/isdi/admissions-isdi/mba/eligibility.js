/*
* "Eligibility" — `.head-wrap.mrgbtm32.isdi` over a `.list-text-wrap` holding two
 * `.ln-bd-txt` blocks.
 *
 * **No dropdowns**, exactly as on the M.Des page — but this page adds the
 * `.list-text-wrap` wrapper the M.Des page does not have: `display: flex; gap: 16px;
 * justify-content: flex-start; align-items: center; margin-bottom: 32px`, around a single
 * `<div>` that holds both blocks. That is 32px of block height the M.Des shape has not got,
 * so it travels as `listWrap`.
 *
 * Each block is a list of runs — a string is text, `{ strong }` is bold — with `\n` for the
 * authored `<br>`s. The `•` bullets are the reference's own characters and the stray U+FEFF
 * marks it sprinkles between words are dropped. The runs keep the spaces AT THEIR EDGES:
 * trimming each one welds the words together across a `<strong>` boundary.
 *
 * **The bold runs are NOT the M.Des page's.** The same sentence is marked up differently:
 * this page bolds "minimum of 4 years in an undergraduate degree program" without the
 * trailing ", regardless of the field," and adds four more bold runs in the second block
 * ("160 credits", "4 years", "Any major or discipline"). Eight `<strong>`s against five.
 */
export const isdiAdmMbaEligibility = {
  heading: 'Eligibility',
  button: {
    label: 'View Admission Policy',
    href: '/admissions-policy/',
    variant: 'pink-cta',
    /* ref target="_blank" */
    newTab: true,
  },
  /* ref .list-text-wrap — absent on the M.Des page */
  listWrap: true,
  text: [
    [
      'Students with a ',
      { strong: 'minimum of 4 years in an undergraduate degree program' },
      ', regardless of the field, with at least 5',
      { strong: '0% aggregate marks' },
      ' from ',
      { strong: 'any university recognised by the AIU can apply.' },
      ' Those in their final year of study can also apply if they maintain a minimum 50% aggregate at graduation and have no live backlogs (ATKTs).\n\nScores from CEED, NIFT Entrance Exam, NID-DAT, GATE Exam are considered on case to case basis.\n‍',
    ],
    [
      { strong: 'Bachelor\'s or Bachelor\'s (Honours) Degree\n \n' },
      '• Minimum of ',
      { strong: '160 credits' },
      { strong: ' \n' },
      '• At least ',
      { strong: '4 years' },
      ' of post-K-12 study\n• ',
      { strong: 'Any major or discipline' },
      ' accepted',
    ],
  ],
};
