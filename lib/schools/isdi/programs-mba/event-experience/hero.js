/*
* Hero — mba/event-experience-design.php:41-291. Three `.inner-header-wrapper.under-grad`
 * slides in the page's own `.swiperprogress` carousel; each carries the same three buttons, two of
 * which open a brochure popup: "Download Brochure" a CRM iframe and "Talk to an Admissions
 * Counsellor" a NoPaperForms widget, both in the same 580px panel. Each slide also authors a
 * `.deadline-text` under the buttons — filled on all three here, where most pages leave it
 * empty.
 */
export const isdiMbaEventDesignHero = {
  slides: [
    {
      title: 'Event & Experience Design',
      text: 'Design, develop, and commercialise events by combining experience design, live entertainment, brand strategy, technology, and business to create global experience creators.',
      buttons: [
        {
          label: 'Apply for Jul ‘27 Cohort',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      deadline: 'Application Deadline: October 25',
      image: {
        src: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/1/1366.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/1/500.png 500w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/1/800.webp 800w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/1/1080.webp 1080w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/1/1366.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Event & Experience Design',
      text: 'Design, develop, and commercialise events by combining experience design, live entertainment, brand strategy, technology, and business to create global experience creators.',
      buttons: [
        {
          label: 'Apply for Jul ‘27 Cohort',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      deadline: 'Application Deadline: October 25',
      image: {
        src: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/2/1366.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/2/500.png 500w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/2/800.webp 800w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/2/1080.webp 1080w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/2/1366.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Event & Experience Design',
      text: 'Design, develop, and commercialise events by combining experience design, live entertainment, brand strategy, technology, and business to create global experience creators.',
      buttons: [
        {
          label: 'Apply for Jul ‘27 Cohort',
          href: '/applicationform',
          variant: 'pink',
        },
        {
          label: 'Download Brochure',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      deadline: 'Application Deadline: October 25',
      image: {
        src: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/3/1366.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/3/500.png 500w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/3/800.webp 800w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/3/1080.webp 1080w, /assets/images/schools/isdi/programs/mba/event-experience-design/hero/herobanner/3/1366.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
  ],
};

export const isdiMbaEventDesignBrochures = {
  'download-brochure': {
    label: 'Download Brochure',
    title: 'MBA brochure request',
    kind: 'iframe',
    height: 650,
    src: 'https://crm.atlasskilltech.app/widgets/6a3e5980b9dfccd3a4455fa2/embed',
  },
  'download-brochure-1': {
    label: 'Talk to an Admissions Counsellor',
    title: 'Talk to an admissions counsellor',
    kind: 'npf',
    widget: '42f152a6a6092bcd1b8045d9c0cc0a04',
  },
};
