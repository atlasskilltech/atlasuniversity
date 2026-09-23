/*
* Hero — b-des/b-des-in-animation-&-vfx-&-gaming.php:41-291. Three `.inner-header-wrapper.under-grad`
 * slides in the page's own `.swiperprogress` carousel; each carries the same three buttons, two of
 * which open the page's brochure popups (`[data-id="download-brochure"]` -> the CRM iframe,
 * `[data-id="download-brochure-1"]` -> the NoPaperForms widget).
 */
export const isdiBdesAnimationHero = {
  slides: [
    {
      title: 'Animation, VFX and Gaming',
      text: 'Training creators for global animation and entertainment industries.',
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
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-1.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-1-p-500.webp 500w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-1-p-800.webp 800w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-1-p-1080.webp 1080w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-1.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Animation, VFX and Gaming',
      text: 'Training creators for global animation and entertainment industries.',
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
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-2.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-2-p-500.webp 500w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-2-p-800.webp 800w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-2-p-1080.webp 1080w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-2.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
    {
      title: 'Animation, VFX and Gaming',
      text: 'Training creators for global animation and entertainment industries.',
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
          brochure: 'download-brochure',
        },
        {
          label: 'Talk to an Admissions Counsellor',
          href: '#',
          variant: 'outline-white',
          brochure: 'download-brochure-1',
        },
      ],
      image: {
        src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-3.webp',
        width: 1366,
        height: 655,
        alt: '',
        srcSet: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-3-p-500.png 500w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-3-p-800.webp 800w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-3-p-1080.webp 1080w, /assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/hero/vfx-hero-3.webp 1366w',
        sizes: '(max-width: 1366px) 100vw, 1366px',
      },
    },
  ],
};

export const isdiBdesAnimationBrochures = {
  'download-brochure': {
    label: 'Download Brochure',
    title: 'B.Des brochure request',
    kind: 'iframe',
    src: 'https://crm.atlasskilltech.app/widgets/6a3e5980b9dfccd3a4455fa2/embed',
    height: 650,
  },
  'download-brochure-1': {
    label: 'Talk to an Admissions Counsellor',
    title: 'Talk to an admissions counsellor',
    kind: 'npf',
    widget: '42f152a6a6092bcd1b8045d9c0cc0a04',
  },
};
