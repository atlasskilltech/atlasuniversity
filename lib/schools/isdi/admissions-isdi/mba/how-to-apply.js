/*
* "Here's how to apply" — the programme pages' `.gd-steps` band
 * (`ProgramDetail/Admissions`) with no lead and no button, so its heading takes the
 * section's own 56px margin.
 *
 * Five steps with the same titles, images and tones as the M.Des page's — every colour was
 * re-measured on this reference rather than copied across by position (#173a87, #0a46ca,
 * #193e90, #1a53ef, #0f2d6f, from `tbg1 isdi-blue-5` / `tbg2 isdi` / `tbg2 isdi-blue-5` /
 * `tbg3 isdi` / `tbg3`).
 *
 * **The reference numbers them 01, 02, 02, 04, 05.** The third card repeats "02" and no
 * card is "03" — an upstream slip, transcribed as authored. (The M.Des page numbers the
 * same five cards 01-05.)
 */
export const isdiAdmMbaHowToApply = {
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
      /* ref: authored "02" a second time, not "03" */
      num: '02',
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
