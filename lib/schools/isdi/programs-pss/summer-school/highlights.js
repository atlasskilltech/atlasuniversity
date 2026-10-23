/*
* "Highlights of Your Summer School Journey" — three
 * `.port-card-el-wrap.isdi` cards in a fixed row. The caption panel's colour and wash come
 * from its own modifier classes (`.sdi-bg-1`, `.isdi-2.isdi-bg-2`), so they travel as data.
 */
export const isdiSummerSchoolHighlights = {
  heading: 'Highlights of Your Summer School Journey',
  sub: 'Present outcomes, growth & direct pathway clearly',
  cards: [
    {
      title: 'Showcase & Industry Interaction',
      text: 'Present your creative work to industry professionals, mentors, and ISDI faculty at the grand Summer Showcase to gain exposure, recognition, and expert insights.',
      image: {
        src: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/ss-isdi-1-1.png',
        width: 398,
        height: 334,
        alt: 'Design students interacting with industry professionals and mentors at ISDI Summer Showcase',
      },
      panel: {
        background: '#193e90',
        image: '/assets/images/schools/isdi/about/search/faq-vector.png',
        position: '100% 50%',
      },
    },
    {
      title: 'Portfolio Development',
      text: 'Build a strong creative portfolio showcasing your thinking, process, and execution, ready to apply to top design schools like ISDI and leading international colleges.',
      image: {
        src: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/ss-isdi-1-2.png',
        width: 398,
        height: 334,
        alt: 'Faculty mentoring students on creative portfolio development',
      },
      panel: {
        background: '#ec1376',
        image: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/vector.png',
        position: '50% 100%',
      },
    },
    {
      title: 'Language Exchange Programs',
      text: 'Summer School participants\nare eligible for direct entry consideration to the Bachelor\nof Design program at ISDI.',
      image: {
        src: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/ss-isdi-1-3.png',
        width: 397,
        height: 334,
        alt: 'Students presenting at ISDI Summer School language exchange program',
      },
      panel: {
        background: '#193e90',
        image: '/assets/images/schools/isdi/about/search/faq-vector.png',
        position: '100% 50%',
      },
    },
  ],
};
