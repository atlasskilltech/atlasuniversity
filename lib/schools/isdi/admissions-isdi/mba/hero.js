/*
* Hero — `.course-cover-section`, the same shape the other four ISDI Admissions
 * heroes use: a photograph under a half-height `linear-gradient(#0000, #0006)` scrim, the
 * heading, the `.course-duration-isme` eyebrow and one pink `.btn-primary`.
 *
 * The heading is a single line here — `<h1 class="h1-tag">MBA Admissions</h1>` — where the
 * M.Des page breaks after the programme name.
 *
 * The photograph is the same CDN file every ISDI Admissions hero uses
 * (`68e8e3f2f188fec5275325e8_nav-bar.png`), already on disk as its WebP conversion, so this
 * page adds no asset.
 */
export const isdiAdmMbaHero = {
  title: 'MBA Admissions',
  eyebrow: 'Master of Business Administration | Full Time',
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
    srcSet:
      '/assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-500.webp 500w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-800.webp 800w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar-p-1080.webp 1080w, /assets/images/schools/isdi/programs/admissions/b-des/hero/nav-bar.webp 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
  },
};
