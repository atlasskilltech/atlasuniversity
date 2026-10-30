/*
 * "Why Systems Design & Intelligent Manufacturing at ISDI" — systems-design-&-intelligent-manufacturing.php: five `.stack_card.isdi-programs`
 * panels that pile up on scroll (same sticky-stack CSS as the ATLAS homepage's "ATLAS Impact"). Its
 * structure (positions, panels, the program-cd photographs) is the shared B.Des stack reused from the
 * accessory page; only the copy is systems-specific.
 */
export const isdiBtechSystemsWhy = {
  heading: 'Why Systems Design & Intelligent Manufacturing at ISDI',
  nested: false,
  cards: [
    {
      title: 'Breaks Industrial\nSilos',
      titleStrong: false,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-1.webp',
        width: 649,
        height: 332,
        alt: '',
      },
      body: [
        'While traditional mechanical or production engineering degrees address physical systems in silos, and conventional computer science programs lack factory-floor depth, SDIM unifies mechanical engineering, digital platforms, robotics, and industrial AI into a single four-year curriculum.',
      ],
      position: 'first',
      panel: {
        variant: 'pro',
        background: '#1a53ef',
        image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
      },
    },
    {
      title: 'Only Program of Its\nKind in India',
      titleStrong: true,
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/why/program-cd-2.webp',
        width: 773,
        height: 397,
        alt: '',
      },
      body: [
        'It is positioned as the only Indian undergraduate degree combining systems engineering, intelligent manufacturing, industrial robotics, and AI with design-led problem framing and three distinct specialization tracks.',
      ],
      position: 'second',
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
        'Learn from practicing designers, strategists, and studio founders,\nthe people who design the world\nyou interact with.',
      ],
      position: 'third',
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
      panel: {
        variant: 'pro',
        background: '#ec1376',
        image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
      },
    },
  ],
};
