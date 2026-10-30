/*
 * The sticky "Why" stack — five `.stack_card.isdi-programs` panels. Differs from the B.Tech
 * Design Engineering page in two ways: (1) the card copy and the section heading are this page's
 * own, and (2) this page does NOT ship the `.stack_card.first/second.isdi-programs { height: 400px }`
 * inline rule the Design Engineering page carries, so every card follows the default height ladder
 * (`height: null`) rather than pinning cards 1-2 to 400px. The images and panel palette are the
 * shared `program-cd-*` set.
 *
 * The heading "Why our Year 4 outpaces every other design school?" references "Year 4" on a
 * (nominally 2-year) MBA — part of the upstream curriculum/duration discrepancy flagged in
 * MIGRATION-ISDI.md. Transcribed as authored, not corrected.
 */
export const isdiMbaTransformationWhy = {
  heading: 'Why our Year 4 outpaces every other design school?',
  nested: false,
  cards: [
    {
      title: 'Design at the Edge\nof Human Behaviour',
      titleStrong: false,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-1.webp',
        width: 649,
        height: 332,
        alt: '',
      },
      body: [
        'Our classrooms are live labs. You’ll ideate, iterate, fail, restart, and refine in spaces designed for doing, not just thinking.',
      ],
      position: 'first',
      height: null,
      panel: {
        variant: 'pro',
        background: '#1a53ef',
        image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
      },
    },
    {
      title: 'The Only Program\nof Its Kind',
      titleStrong: true,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-2.webp',
        width: 773,
        height: 397,
        alt: '',
      },
      body: ['Curriculum shaped by Parsons, New York reimagined for today’s Indian context.'],
      position: 'second',
      height: null,
      panel: {
        variant: 'pro',
        background: '#0038b1',
        image: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/pro-bg-2.png',
      },
    },
    {
      title: 'Your Mentors Are\nAlso Makers',
      titleStrong: false,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-3.webp',
        width: 649,
        height: 332,
        alt: '',
      },
      body: [
        'Learn from practicing designers, strategists, and studio founders, the people who design the world you interact with.',
      ],
      position: 'third',
      height: null,
      panel: {
        variant: 'pro',
        background: '#ec1376',
        image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
      },
    },
    {
      title: 'Everything is a\nStudio Experience',
      titleStrong: false,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-4.webp',
        width: 649,
        height: 332,
        alt: '',
      },
      body: [
        'Our classrooms are live labs. You’ll ideate, iterate, fail, restart, and refine in spaces designed for doing, not just thinking.',
      ],
      position: 'forth',
      height: null,
      panel: {
        variant: 'pro-4',
        background: '#1a53ef',
        image: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/pro-bg-2.png',
      },
    },
    {
      title: 'The Future is Cross-\nDisciplinary',
      titleStrong: false,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-5.webp',
        width: 649,
        height: 332,
        alt: '',
      },
      body: [
        'Work alongside fashion designers, product innovators, entrepreneurs, coders, and media artists, because good ideas don’t exist in silos.',
      ],
      position: 'fifth',
      height: null,
      panel: {
        variant: 'pro',
        background: '#ec1376',
        image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
      },
    },
  ],
};
