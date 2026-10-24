/*
* "Here's how to apply" — the programme pages' `.gd-steps` band
 * (`ProgramDetail/Admissions`) with no lead and no button, so its heading takes the
 * section's own 56px margin.
 *
 * Five steps, like B.Des — but **the last two swap their tones**: here step 04 is
 * `tbg3 isdi` (#1a53ef) and step 05 is `tbg3` (#0f2d6f), where on B.Des step 04 is `tbg3`
 * and step 05 is `tbg3 isdi`. The colour belongs to the classes, not to the index, which is
 * why each one is measured on its own reference rather than copied across by position.
 *
 * The images differ too: `jigsaw.png` is on steps **04 and 05** here, where B.Des uses it
 * only on 05. Both photographs are the B.Des set's, already on disk.
 */
export const isdiAdmMdesHowToApply = {
  id: 'how-to-apply',
  heading: 'Here’s how to apply',
  steps: [
    {
      num: '01',
      title: 'Apply Online',
      tone: '#173a87',
      link: {
        label: 'Apply for July 2027 Intake',
        href: '/applicationform',
      },
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-1.png',
        width: 249,
        height: 266,
        alt: '',
      },
    },
    {
      num: '02',
      title: 'ISDI Aptitude Test (DAT)',
      tone: '#0a46ca',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-2.png',
        width: 241,
        height: 268,
        alt: '',
      },
    },
    {
      num: '03',
      title: 'Design Portfolio',
      tone: '#193e90',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-2.png',
        width: 241,
        height: 268,
        alt: '',
      },
    },
    {
      num: '04',
      /* ref .gd-steps.tbg3.isdi */
      title: 'Personal Interview',
      tone: '#1a53ef',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/jigsaw.png',
        width: 266,
        height: 252,
        alt: '',
      },
    },
    {
      num: '05',
      /* ref .gd-steps.tbg3 */
      title: 'Result Declaration',
      tone: '#0f2d6f',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/jigsaw.png',
        width: 266,
        height: 252,
        alt: '',
      },
    },
  ],
};
