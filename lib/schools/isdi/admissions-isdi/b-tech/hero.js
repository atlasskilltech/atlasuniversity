/*
* Hero — `.course-cover-section`: a photograph under a half-height
 * `linear-gradient(#0000, #0006)` scrim, with the heading, the `.course-duration-isme`
 * eyebrow and one pink `.btn-primary`.
 *
 * The photograph is the SAME CDN file the B.Des Admissions hero uses
 * (`68e8e3f2f188fec5275325e8_nav-bar.png`), so it is reused rather than downloaded
 * again — this page adds no asset at all.
 */
export const isdiAdmBtechHero = {
  title: 'B.Tech\nAdmissions',
  eyebrow: 'Bachelors of Technology | Full Time',
  buttons: [
    {
      label: 'Apply for 2027 Intake',
      href: '/applicationform',
      variant: 'pink',
    },
  ],
  image: {
    src: '/assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar.webp',
    width: 1366,
    height: 657,
    alt: '',
    srcSet: '/assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-500.webp 500w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-800.webp 800w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-1080.webp 1080w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar.webp 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
  },
};
