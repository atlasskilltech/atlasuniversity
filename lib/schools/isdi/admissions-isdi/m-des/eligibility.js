/*
* "Eligibility" — `.head-wrap.mrgbtm32.isdi` over two `.ln-bd-txt` blocks.
 *
 * **No dropdowns.** Where B.Des and B.Tech author three `.accordion-item-blue-fill`
 * widgets, this page authors plain rich text, so `Eligibility` renders its `text` form.
 * Each block is a list of runs — a string is text, `{ strong }` is bold — with `\n` for the
 * authored `<br>`s. The `•` bullets are the reference's own characters, and the stray U+FEFF
 * marks it sprinkles between words are dropped.
 *
 * The runs keep the spaces AT THEIR EDGES: trimming each one welds the words together
 * across a `<strong>` boundary ("…with aminimum of 4 years…"). The generator asserts that
 * the runs concatenate back to the text the browser shows.
 */
export const isdiAdmMdesEligibility = {
  heading: 'Eligibility',
  button: {
    label: 'View Admission Policy',
    href: '/admissions-policy/',
    variant: 'pink-cta',
    /* ref target="_blank" */
    newTab: true,
  },
  text: [
    [
      'Students with a ',
      { strong: 'minimum of 4 years in an undergraduate degree program, regardless of the field,' },
      ' with at least 5',
      { strong: '0% aggregate marks' },
      ' from ',
      { strong: 'any university recognised by the AIU can apply.' },
      ' Those in their final year of study can also apply if they maintain a minimum 50% aggregate at graduation and have no live backlogs (ATKTs). \n\nScores from CEED, NIFT Entrance Exam, NID-DAT, GATE Exam are considered on case to case basis.\n‍',
    ],
    [
      { strong: 'Bachelor\'s or Bachelor\'s (Honours) Degree\n \n' },
      '• Minimum of 160 credits',
      { strong: ' \n' },
      '• At least 4 years of post-K-12 study\n• Any major or discipline accepted',
    ],
  ],
};
