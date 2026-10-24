/*
* "Here's how to apply" — the programme pages' `.gd-steps` band
 * (`ProgramDetail/Admissions`) with no lead and no button, so its heading takes the
 * section's own 56px margin.
 *
 * **Four steps, not the B.Des page's five.** The reference authors a fifth
 * (`gd-steps tbg3 isdi`, "Final Selection & Offer Letter" over `jigsaw.png`) and comments it
 * out line by line, then re-labels the remaining four — so this page's "Final Selection &
 * Offer Letter" is step 04 on the `tbg3` tone, where on B.Des it is step 05 on `tbg3 isdi`.
 *
 * The tones were MEASURED on the reference rather than taken from the B.Des mapping by
 * position: `tbg1 isdi-blue-5` #173a87, `tbg2 isdi` #0a46ca, `tbg2 isdi-blue-5` #193e90,
 * `tbg3` #0f2d6f. The colour belongs to the classes, not to the index.
 *
 * Both photographs are the B.Des set's, already on disk.
 */
export const isdiAdmBtechHowToApply = {
  id: 'how-to-apply',
  heading: 'Here’s how to apply',
  steps: [
    {
      num: '01',
      /* the reference lower-cases "application form" here; B.Des capitalises it */
      title: 'Submit the application form',
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
      title: 'Technical Aptitude Test',
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
      title: 'Personal Interview',
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
      title: 'Final Selection & Offer Letter',
      tone: '#0f2d6f',
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/admissions/tab-3-img-2.png',
        width: 241,
        height: 268,
        alt: '',
      },
    },
  ],
};
