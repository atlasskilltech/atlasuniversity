/*
* Hero — mdes/design-futures.php:41-291. Three `.inner-header-wrapper.under-grad`
 * slides in the page's own `.swiperprogress` carousel; each carries the same three buttons, two of
 * which open the page's brochure popups (`[data-id="download-brochure"]` -> the CRM iframe,
 * `[data-id="download-brochure-1"]` -> the NoPaperForms widget).
 */
export const isdiMdesFuturesHero = {
  slides: [
    {
      title: 'Design Futures',
      text: 'Designing Futures, Inspiring Change',
      buttons: [
        {
          label: 'Apply for 2027 Intake',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure-1',
        },
      ],
      deadline: '',
      image: {
        src: '/assets/images/programs/hero/mdes-hero.png',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/programs/hero/mdes-hero-p-500.png 500w, /assets/images/programs/hero/mdes-hero-p-800.png 800w, /assets/images/programs/hero/mdes-hero-p-1080.png 1080w, /assets/images/programs/hero/mdes-hero.png 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Design Futures',
      text: 'Designing the Future with Innovation and Purpose',
      buttons: [
        {
          label: 'Apply for 2027 Intake',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure-1',
        },
      ],
      deadline: '',
      image: {
        src: '/assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-3.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-3-p-500.webp 500w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-3-p-800.webp 800w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-3-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-3.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Design Futures',
      text: 'Designing the Future with Innovation and Purpose',
      buttons: [
        {
          label: 'Apply for 2027 Intake',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'mdes-brochure-1',
        },
      ],
      deadline: '',
      image: {
        src: '/assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-2.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-2-p-500.png 500w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-2-p-800.webp 800w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-2-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mdes/design-futures/hero/mdes-hero-new-2.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
  ],
};

export const isdiMdesFuturesBrochures = {
  'mdes-brochure': {
    label: 'Download Brochure',
    title: 'M.Des brochure request',
    kind: 'script',
    // this page declares `line-height: 1` on the close button; the B.Des set does not
    closeLeading: 'tight',
    height: 650,
    src: 'https://crm.atlasskilltech.app/widgets/6a3e723ea1fd0680c6c0e846/embed.js',
  },
  'mdes-brochure-1': {
    label: 'Talk to an Admissions Counsellor',
    title: 'Talk to an admissions counsellor',
    kind: 'script',
    // this page declares `line-height: 1` on the close button; the B.Des set does not
    closeLeading: 'tight',
    height: 650,
    src: 'https://crm.atlasskilltech.app/widgets/6a3e723ea1fd0680c6c0e846/embed.js',
  },
};
