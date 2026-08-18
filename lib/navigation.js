/**
 * Navigation model — transcribed 1:1 from reference/assets/include/header.php.
 *
 * The reference hand-writes every <li>; the same markup is generated from this
 * model so the two stay in sync. Order, labels, line breaks and targets are
 * preserved exactly, including the entries the reference points at external
 * domains.
 *
 * `label` may contain a `\n`, which the renderer turns into the <br> the
 * reference has at that exact position.
 */

/* --- 1. Top utility bar (12 links) ---------------------------------------- */
export const utilityLinks = [
  { label: 'DEB Application Form', href: 'https://www.atlasuniversity.edu.in/deb-application.pdf', external: true },
  { label: 'ATLAS News', href: 'https://atlasuniversity.edu.in/news/', external: true },
  // reference keeps a commented-out "NAAC" link between these two
  { label: 'Internationalisation', href: 'https://atlasuniversity.edu.in/advantages/atlas-internationalisation', external: true },
  { label: 'Center for Research', href: 'https://atlasuniversity.edu.in/centre_for_research/', external: true },
  // reference keeps commented-out "IQAC" / "Centre for Research" links here
  { label: 'Library', href: '/library' },
  // reference keeps a commented-out "ATLAS Aspire Centre" link here
  { label: 'Examination', href: '/examination' },
  { label: 'Alumni', href: '/atlas-alumni-corner' },
  { label: 'Industry Relations', href: '/atlas-industry-partnership' },
  { label: 'HEI Relations', href: '/atlas-hei-relationship' },
  { label: 'Job Openings', href: '/job-openings' },
  { label: 'Student Housing', href: 'https://www.upgradliving.com/', external: true },
  { label: 'Contact Us', href: '/contact-us' },
];

/* --- 2. Mega menu --------------------------------------------------------- */
const PROGRAMS_IMAGE = {
  src: '/assets/images/menu-programs.webp',
  width: 1023,
  height: 244,
  alt: 'A faculty member speaking to students in a classroom at ATLAS University',
};

const ADMISSIONS_IMAGE = {
  src: '/assets/images/menu-admissions.webp',
  width: 1023,
  height: 244,
  alt: 'Students discussing and interacting in a classroom at ATLAS University',
};

export const megaMenu = [
  {
    id: 'schools',
    label: 'Schools',
    image: PROGRAMS_IMAGE,
    // the reference opens this list with an empty <li>, which contributes an
    // 8px gap above the first real item. `spacer: true` reproduces it.
    items: [
      { spacer: true },
      { label: 'ISDI - School of \nDesign & Innovation', href: '/schools/isdi' },
      { label: 'ISME - School of\nManagement & Entrepreneurship', href: '/schools/isme' },
      { label: 'uGDX - School of \nTechnology', href: '/schools/ugdx' },
      { label: 'School of Law', href: '/schools/law' },
      { label: 'ATLAS CDOE', href: 'https://atlasonline.edu.in/', external: true },
      { label: 'ATLAS EDGE - Centre for Lifelong &\n Professional Learning', href: '/schools/ce' },
    ],
  },
  {
    id: 'programs',
    label: 'Programs',
    image: PROGRAMS_IMAGE,
    items: [
      { label: 'Undergraduate Programs', href: '/programs/ug-programs-atlas' },
      { label: 'Postgraduate Programs', href: '/programs/pg-programs-atlas' },
      { label: 'Integrated Programs', href: '/programs/programs-list-integrated' },
      { label: 'Online Degree Programs', href: 'https://atlasonline.edu.in/', external: true },
      {
        // rendered as a <div> in the reference, not an <a> — it only opens level 2
        label: 'Summer Schools',
        panelId: 'undergraduate',
        children: [
          { label: 'ISDI Summer School (Design)', href: '/schools/isdi/programs/pre-university-summer-school' },
          { label: 'ISME Summer School (Business)', href: '/schools/isme/programs/summer-school-management' },
          { label: 'uGDX Summer School (Technology)', href: '/schools/ugdx/summerschool' },
        ],
      },
      { label: 'Global Pathways', href: '/advantages/partnership/global-pathways', newTab: true },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    image: ADMISSIONS_IMAGE,
    items: [
      { label: 'Undergraduate Programs', href: '/admissions/ug-admissions' },
      { label: 'Postgraduate Programs', href: '/admissions/pg-admissions' },
      { label: 'Integrated Programs', href: '/admissions/integrated-admissions' },
      { label: 'Online Degree Programs', href: 'https://atlasonline.edu.in/', external: true },
    ],
  },
  {
    id: 'advantages',
    label: 'Advantages',
    image: ADMISSIONS_IMAGE,
    items: [
      { label: 'Core advantages', href: '/advantages/atlas-advantages' },
      { label: 'Multidisciplinary Learning', href: '/advantages/atlas-multidisciplinary' },
      { label: 'Internationalisation', href: '/advantages/atlas-internationalisation' },
      { label: 'Industry', href: '/advantages/atlas-industry-centric-approach' },
      { label: 'Entrepreneurship', href: '/advantages/atlas-enterprenurship' },
      { label: 'Career services', href: '/advantages/atlas-career-services' },
    ],
  },
];

/* --- 3. Plain nav links (no submenu) -------------------------------------- */
export const primaryLinks = [
  { label: 'Success Stories', href: '/success-stories-atlas' },
  // the reference has a trailing space inside this label; kept verbatim
  { label: 'Life@ATLAS ', href: '/life-at-atlas' },
  { label: 'Campus', href: '/campus-atlas' },
  { label: 'About Us', href: '/about-us' },
];

/* --- 4. Logo-bar call-to-action buttons ----------------------------------- */
export const headerCtas = {
  /*
   * The reference swaps this target to /summertech when the request path
   * contains `schools/ugdx/summerschool`; `applyHrefFor()` reproduces that.
   */
  apply: '/applicationform',
  applySummer: '/summertech',
  continueApplication: 'https://atlasuniversity.edu.in/admissions',
  campusVisit: '/campusvisit',
};

export function applyHrefFor(pathname) {
  return pathname && pathname.includes('schools/ugdx/summerschool')
    ? headerCtas.applySummer
    : headerCtas.apply;
}
