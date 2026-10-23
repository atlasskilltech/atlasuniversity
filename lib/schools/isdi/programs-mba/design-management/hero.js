/*
* Hero — mba/design-management.php:41-291. Three `.inner-header-wrapper.under-grad`
 * slides in the page's own `.swiperprogress` carousel; each carries the same three buttons, two of
 * which open a brochure popup. The `data-id`s are this page's own — `mdes-brochure` and
 * `mdes-brochure-1` — and both hold the SAME CRM widget (`6a3e7418…`), so the two buttons open
 * the same form under their own labels. Each slide also authors an EMPTY `.deadline-text`,
 * which is still a 10px box under the buttons.
 */
export const isdiMbaDesignMgmtHero = {
  slides: [
    {
      title: 'MBA in Design Management & Strategic Thinking',
      text: 'Where Design Meets Strategy to Drive Innovation',
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
        src: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-p-500.webp 500w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-p-800.webp 800w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'MBA in Design Management & Strategic Thinking',
      text: 'Where Design Meets Strategy to Drive Innovation',
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
        src: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-2.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-2-p-500.webp 500w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-2-p-800.webp 800w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-2-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-2.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'MBA in Design Management & Strategic Thinking',
      text: 'Where Design Meets Strategy to Drive Innovation',
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
        src: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-3.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-3-p-500.webp 500w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-3-p-800.webp 800w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-3-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mba/design-management/hero/mba-hero-3.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
  ],
};

export const isdiMbaDesignMgmtBrochures = {
  'mdes-brochure': {
    label: 'Download Brochure',
    title: 'MBA brochure request',
    kind: 'script',
    // this page declares `line-height: 1` on the close button; the B.Des set does not
    closeLeading: 'tight',
    height: 650,
    src: 'https://crm.atlasskilltech.app/widgets/6a3e7418a1fd0680c6c101fb/embed.js',
  },
  'mdes-brochure-1': {
    label: 'Talk to an Admissions Counsellor',
    title: 'Talk to an admissions counsellor',
    kind: 'script',
    // this page declares `line-height: 1` on the close button; the B.Des set does not
    closeLeading: 'tight',
    height: 650,
    src: 'https://crm.atlasskilltech.app/widgets/6a3e7418a1fd0680c6c101fb/embed.js',
  },
};
