/**
 * ISDI header navigation — transcribed 1:1 from
 * reference/schools/isdi/assets/include/header.php.
 *
 * URL mapping (reference/schools/isdi/assets/include/dynamic.php):
 *   <?php echo $domain ?>    -> /schools/isdi/
 *   <?php echo $ogdomain ?>  -> /
 * The two hard-coded `https://atlasuniversity.edu.in/…` targets are kept
 * absolute, exactly as the reference writes them.
 *
 * Commented-out markup is not ported: the Programs panel's nav image, the old
 * "Postgraduate Degree" list and the two commented M.Des / MBA DMST entries
 * under "Postgraduate Diploma".
 *
 * Shape
 *   { label, href }        a link
 *   { label, children }    a row that opens the next level (a <div> upstream)
 *   { label, href, level } a link that the reference marks up with a different
 *                          level's classes than the list it sits in — see
 *                          "Creative Entrepreneurship" below
 *
 * `label` may contain `\n`, which renders as the <br> the reference has at that
 * exact position. Trailing spaces inside labels are kept verbatim; HTML
 * collapses them.
 */

const ISDI = '/schools/isdi';

/* --- 1. Top utility bar --------------------------------------------------- */
export const isdiUtilityLinks = [
  { label: 'Parents Corner', href: `${ISDI}/parents-corner` },
  { label: 'ISDI For Outstation', href: `${ISDI}/isdi-for-outstation` },
  { label: 'HEI Relations', href: '/atlas-hei-relationship' },
  { label: 'Industry Relations', href: '/atlas-industry-partnership' },
  { label: 'Job Openings', href: '/job-openings' },
];

/*
 * ref `a.logo-text` — the sixth anchor in `.top-menu-bar`. It is pinned to the
 * left edge of the bar on desktop and joins the list on mobile.
 */
export const isdiUniversityLink = { label: 'ATLAS SkillTech University', href: '/' };

/* --- 2. Logo bar ---------------------------------------------------------- */
export const isdiLogo = {
  href: ISDI,
  src: '/assets/images/schools/isdi/logo/isdi-logo.svg',
  width: 232,
  height: 34,
  alt: 'Isdi Design School Logo',
  ariaLabel: 'ISDI Home',
};

export const isdiHeaderCtas = {
  apply: '/applicationform',
  continueApplication: 'https://atlasuniversity.edu.in/admissions',
  campusVisit: '/campusvisit',
};

/* --- 3. Mega menu --------------------------------------------------------- */

/*
 * Every panel image is the reference's 1023w candidate. The markup also lists
 * 500w / 800w candidates against `sizes="100vw"`, but the panel only renders
 * from 992px up, where a 100vw slot always resolves to the 1023w file — the
 * smaller files are never requested. (Life@'s 800w candidate is also broken on
 * production: it answers 200 with an HTML page.)
 */
const IMG = '/assets/images/schools/isdi/header';

export const isdiMegaMenu = [
  {
    id: 'programs',
    label: 'Programs',
    // ref: this panel's .nav-image-container is commented out
    image: null,
    items: [
      {
        label: 'Undergraduate Degree',
        children: [
          { label: 'Overview', href: `${ISDI}/programs/undergraduate/` },
          {
            label: 'B.Des',
            children: [
              { label: 'B.Des in Accessory Design & Craft', href: `${ISDI}/programs/undergraduate/b-des/accessory-design-&-craft` },
              { label: 'B.Des in Animation, VFX & Gaming', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming` },
              { label: 'B.Des in Communication Design & New Media', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-communication-design-&-new-media` },
              { label: 'B.Des in Fashion Brand Management', href: `${ISDI}/programs/undergraduate/b-des/fashion-brand-management` },
              { label: 'B.Des in Fashion Communication & Styling', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling` },
              { label: 'B.Des in Fashion Design & Technology', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-fashion-design-&-technology` },
              { label: 'B.Des in Health & Care Design', href: `${ISDI}/programs/undergraduate/b-des/health-care-design` },
              { label: 'B.Des in Interior Design & Built Environment', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-interior-design-&-built-environment` },
              { label: 'B.Des in Luxury Brand Strategy', href: `${ISDI}/programs/undergraduate/b-des/luxury-brand-strategy-&-experience-design` },
              { label: 'B.Des in Product Design', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-product-design` },
              { label: 'B.Des in Service & Experience Design', href: `${ISDI}/programs/undergraduate/b-des/service-&-experience-design` },
              { label: 'B.Des in Strategic Design & Innovation Management', href: `${ISDI}/programs/undergraduate/b-des/b-des-in-strategic-design-&-innovation-management` },
            ],
          },
          {
            label: 'B.Tech',
            children: [
              { label: 'B.Tech in Design Engineering ', href: `${ISDI}/programs/undergraduate/btech/btech-design-engineering` },
              { label: 'B.Tech in AI Integrated Design', href: `${ISDI}/programs/undergraduate/btech/btech-ai-integrated-design` },
            ],
          },
        ],
      },
      {
        label: 'Postgraduate Degree',
        children: [
          { label: 'Overview', href: `${ISDI}/programs/postgraduate` },
          {
            label: 'M.Des',
            children: [
              { label: 'Design Futures (2 Years)', href: `${ISDI}/programs/postgraduate/mdes/design-futures-2-years` },
            ],
          },
          {
            label: 'MBA',
            children: [
              { label: 'Design Management and Strategy (2 Years) ', href: `${ISDI}/programs/postgraduate/mba/mba-design-led-strategy-&-transformation` },
              { label: 'Event & Experience Design (2 Years)', href: `${ISDI}/programs/postgraduate/mba/mba-in-event-&-experience-design` },
            ],
          },
        ],
      },
      {
        label: 'Postgraduate Diploma',
        children: [
          // ref: this Overview points at the Postgraduate *Degree* overview
          { label: 'Overview', href: `${ISDI}/programs/postgraduate` },
          /*
           * ref marks this one up as `li.level-3-item > a.level-3-link` even
           * though it sits directly in a level-2 list. The two class pairs
           * measure identically on desktop and mobile, so only its hover group
           * differs — `level: 3` keeps the markup faithful.
           */
          { label: 'Creative Entrepreneurship (1 Year) ', href: `${ISDI}/programs/postgraduate-diploma/mba-creative-entrepreneurship`, level: 3 },
          { label: 'Interior Styling & \nSpatial Curation (1 Year)', href: `${ISDI}/programs/postgraduate-diploma/pg-interior-styling-&-space-curation` },
        ],
      },
      { label: 'Pre-University Summer School', href: `${ISDI}/programs/pre-university-summer-school` },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    image: {
      src: `${IMG}/nav-admissions.webp`,
      width: 1023,
      height: 244,
      alt: 'ISDI design school students and faculty posing across different studio spaces on campus',
    },
    items: [
      {
        label: 'Undergraduate Degree',
        children: [
          { label: 'B.Des', href: `${ISDI}/admissions/undergraduate/b-des` },
          { label: 'B.Tech', href: `${ISDI}/admissions/undergraduate/b-tech` },
        ],
      },
      {
        label: 'Postgraduate Degree / Diploma',
        children: [
          { label: 'M.Des', href: `${ISDI}/admissions/postgraduate/m-des` },
          { label: 'MBA', href: `${ISDI}/admissions/postgraduate/mba` },
          // ref: href="#", and a non-breaking space before "(1 Year)"
          { label: 'Interior Styling &\n Spatial Curation (1 Year)', href: '#' },
        ],
      },
      { label: 'Pre-University Summer School', href: `${ISDI}/admissions/pre-university-summer-school` },
    ],
  },
  {
    id: 'advantage',
    label: 'ATLAS ISDI Advantage',
    image: {
      src: `${IMG}/nav-isdi-advantage.webp`,
      width: 1023,
      height: 244,
      alt: 'Students and faculty giving thumbs up together at a campus event',
    },
    items: [
      {
        label: 'The ISDI Advantage',
        children: [
          { label: 'Overview', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage` },
          { label: 'Location', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#location` },
          { label: 'Industry Connect', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#industry-connect-isdi` },
          { label: 'Entrepreneurship', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage` },
          { label: 'Global Exposure', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#global-exposure-isdi` },
          { label: 'Infrastructure', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#infra-isdi` },
          { label: 'Student Welfare', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#student-welfare` },
          { label: 'Graduate Attributes', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage/` },
          { label: 'Tailored Pathways', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#tailored-pathway` },
          { label: 'Research Driven', href: `${ISDI}/atlas-isdi-advantage/the-isdi-advantage#research-driven-isdi` },
        ],
      },
      {
        label: 'Internationalisation',
        children: [
          { label: 'Overview', href: `${ISDI}/atlas-isdi-advantage/internationalisation#overview` },
          { label: 'Global University Partnerships', href: `${ISDI}/atlas-isdi-advantage/internationalisation#global-uni-partnership` },
          { label: 'International Events', href: `${ISDI}/atlas-isdi-advantage/internationalisation#international-events` },
          { label: 'Summer School', href: `${ISDI}/atlas-isdi-advantage/internationalisation#summer-school` },
          { label: 'Global Immersions', href: `${ISDI}/atlas-isdi-advantage/internationalisation#global-immersion` },
          { label: 'Masters Progressions', href: `${ISDI}/atlas-isdi-advantage/internationalisation#isdi-master-prog` },
          { label: 'Global Education Fair', href: `${ISDI}/atlas-isdi-advantage/internationalisation#ged-isdi` },
        ],
      },
      { label: 'Industry Centric Approach', href: `${ISDI}/atlas-isdi-advantage/industry-centric-approach` },
    ],
  },
  {
    id: 'success-stories',
    label: 'Success Stories',
    image: {
      src: `${IMG}/nav-success-stories.webp`,
      width: 1023,
      height: 244,
      // ref alt text, typos included
      alt: 'Graduates tossing thier caps in the air and enjoying thier convocation ceremony',
    },
    items: [
      {
        label: 'Success Snapshot',
        children: [
          { label: 'Overview', href: `${ISDI}/success-stories/success-snapshot` },
          { label: 'Our beliefs', href: `${ISDI}/success-stories/success-snapshot#our-beliefs` },
          { label: 'Startups', href: `${ISDI}/success-stories/success-snapshot#start-up-section` },
          { label: 'Placements & Internship', href: `${ISDI}/success-stories/success-snapshot#placement` },
          { label: 'Masters Progression', href: `${ISDI}/success-stories/success-snapshot#master-progressions` },
          { label: 'Patents & Publications', href: `${ISDI}/success-stories/success-snapshot#research-driven` },
          { label: 'Awards & Recognition', href: `${ISDI}/success-stories/success-snapshot#awards` },
          { label: 'Student Spotlight', href: `${ISDI}/success-stories/success-snapshot` },
        ],
      },
      { label: 'Placements', href: `${ISDI}/success-stories/placements` },
      { label: 'Startups', href: `${ISDI}/success-stories/startups` },
      /*
       * ref hard-codes `aria-current="page" class="… w--current"` on this link
       * on every page. It paints nothing (measured: identical to its siblings),
       * and a static aria-current would be wrong on every other page, so it is
       * not carried over.
       */
      { label: 'Masters Progression', href: `${ISDI}/success-stories/masters-progression` },
    ],
  },
  {
    id: 'life',
    label: 'Life@ATLAS ISDI',
    image: {
      src: `${IMG}/nav-life-isdi.webp`,
      width: 1021,
      height: 364,
      alt: 'Isdi design school students enjoying college time doing various activities',
    },
    items: [
      { label: 'The ATLAS ISDI Experience', href: `${ISDI}/life@atlas-isdi#life-at-isme` },
      { label: 'Student Clubs', href: `${ISDI}/life@atlas-isdi#student-clubs` },
      { label: 'Fests & Cultural Events', href: `${ISDI}/life@atlas-isdi#fest-culture` },
      { label: 'Intercollegiate Events', href: `${ISDI}/life@atlas-isdi#intercollegiate-events` },
      { label: 'Sports', href: `${ISDI}/life@atlas-isdi#sports` },
      { label: 'Student Council', href: `${ISDI}/life@atlas-isdi#student-council` },
      { label: 'Student Welfare', href: `${ISDI}/life@atlas-isdi#student-welfare` },
      { label: 'ATLAS Student Housing', href: `${ISDI}/life@atlas-isdi` },
      { label: 'Life in Mumbai', href: `${ISDI}/life@atlas-isdi` },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    image: {
      src: `${IMG}/nav-events.webp`,
      width: 1023,
      height: 244,
      alt: 'Hands of Heritage event featuring Parsons collaboration, panel discussion and fashion showcase',
    },
    items: [
      { label: 'Immersions & Experiences', href: `${ISDI}/events/immersions-&-experiences` },
      { label: 'Skill & Tech Innovations', href: `${ISDI}/events/skill-&-tech-innovations` },
      { label: 'Creative Showcases', href: `${ISDI}/events/creative-showcases` },
      { label: 'Industry and Mentorship', href: `${ISDI}/events/industry-and-mentorship` },
      { label: 'Community and Culture', href: `${ISDI}/events/community-and-culture` },
      { label: 'The Edit !', href: `${ISDI}/events/the-edit` },
    ],
  },
  {
    id: 'campus',
    label: 'Campus',
    image: {
      src: `${IMG}/nav-campus.webp`,
      width: 1023,
      height: 272,
      alt: 'Vibrant ATLAS SkillTech University campus common area',
    },
    items: [
      { label: 'Overview', href: `${ISDI}/campus#campus-learn` },
      { label: 'Location', href: `${ISDI}/campus#campus-location` },
      { label: 'Spaces', href: `${ISDI}/campus#campus-spaces` },
      { label: 'Student Housing', href: `${ISDI}/campus#campus-housing` },
      { label: 'Green Campus', href: `${ISDI}/campus#campus-green` },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    image: {
      src: `${IMG}/nav-about-us.webp`,
      width: 1023,
      height: 299,
      alt: 'Woman smiling and speaking into a microphone at a campus event',
    },
    items: [
      { label: 'Overview', href: `${ISDI}/about-us` },
      { label: 'Our Story', href: `${ISDI}/about-us#our-story` },
      { label: 'Leadership Team', href: `${ISDI}/about-us#our-leadership` },
      { label: 'Location', href: `${ISDI}/about-us#our-location` },
      { label: 'Thought Leadership', href: `${ISDI}/thought-leaderships` },
      { label: 'ATLAS Times', href: `${ISDI}/about-us#atlas-times` },
      { label: 'Press Coverage', href: `${ISDI}/about-us#press-coverage` },
    ],
  },
];

/* --- 4. Plain nav link (no panel) ----------------------------------------- */
export const isdiContactLink = {
  label: 'Contact Us',
  href: '/contact-us',
  // ref .icon-link-mob inside the anchor — shown on phones only
  icon: '/assets/images/international/think/arrow-top-rt-blk.svg',
};
