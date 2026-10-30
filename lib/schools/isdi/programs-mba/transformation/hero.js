/*
 * Hero — mba/mba-design-led-strategy-&-transformation.php. Three `.inner-header-wrapper`
 * slides in the page's `.swiperprogress` carousel; each carries the same three buttons, two of
 * which open a brochure popup (`download-brochure` → the CRM iframe, `download-brochure-1` →
 * the NoPaperForms widget — the Accessory page's brochure set, reused). Each slide authors a
 * LIVE `.deadline-text` ("Application Deadline: October 25") under the buttons.
 *
 * This is the one block that is genuinely this page's own: the page is otherwise a near-exact
 * copy of the B.Tech Design Engineering page (see the content barrel for the copy-paste map).
 */
export const isdiMbaTransformationHero = {
  slides: [1, 2, 3].map((n) => ({
    title: 'Design Management and Strategy',
    text: 'Graduate Identity: The Transformation Strategist - transform what already exists.Design what organisations become next.',
    buttons: [
      { label: 'Apply for Jul ‘27 Cohort', href: '/applicationform', variant: 'pink' },
      { label: 'Download Brochure', href: '#', variant: 'outline-white', brochure: 'download-brochure' },
      {
        label: 'Talk to an Admissions Counsellor',
        href: '#',
        variant: 'outline-white',
        brochure: 'download-brochure-1',
      },
    ],
    deadline: 'Application Deadline: October 25',
    image: {
      src: `/assets/images/schools/isdi/programs/mba/transformation/hero/hero-${n}.webp`,
      width: 1366,
      height: 655,
      alt: '',
      srcSet: `/assets/images/schools/isdi/programs/mba/transformation/hero/hero-${n}-p-500.webp 500w, /assets/images/schools/isdi/programs/mba/transformation/hero/hero-${n}-p-800.webp 800w, /assets/images/schools/isdi/programs/mba/transformation/hero/hero-${n}-p-1080.webp 1080w, /assets/images/schools/isdi/programs/mba/transformation/hero/hero-${n}.webp 1366w`,
      sizes: '(max-width: 1366px) 100vw, 1366px',
    },
  })),
};
