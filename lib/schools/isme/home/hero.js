/**
 * ISME homepage — hero, awards band and the Outcomes heading, transcribed from
 * reference/schools/isme/index.php (identical on production).
 */
const H = '/assets/images/schools/isme/home';

/* `.main-cover-section-isme` — no `.course-duration` line upstream */
export const ismeHero = {
  heading: 'Shaping Business Leaders and Empowering Entrepreneurship',
  buttons: [
    // ref variant `w-variant-d71882ff…` ("mint")
    { label: 'Start Your Application Now', href: 'https://atlasuniversity.edu.in/applicationform', variant: 'mint' },
  ],
  poster: `${H}/hero/isme-homepage-hero_poster.0000000.jpg`,
  video: {
    mp4: '/assets/videos/schools/isme/home/isme-homepage-hero_mp4.mp4',
    webm: '/assets/videos/schools/isme/home/isme-homepage-hero_webm.webm',
  },
};

/* `.cust-dropdown-1.w-dropdown` beside the button */
export const ismeExplore = {
  label: 'Explore Programs',
  links: [
    { label: 'Undergraduate', href: '/schools/isme/programs/undergraduate/ug-programmes' },
    { label: 'Postgraduate', href: '/schools/isme/programs/postgraduate/postgraduate-programs' },
  ],
};

/* `.awards` — three `aw-card` (variant "base") slides; `\n` is an authored <br> */
const LAUREL = `${H}/awards/award-flow-isme.png`;
export const ismeAwards = {
  items: [
    { title: 'Rank 1 : Top Emerging \nManagement University', press: 'The Times Of India', image: LAUREL, imageWidth: 110 },
    { title: 'Prestigious \nEducation Brand', press: 'Republic Media & \nMarksmen Daily', image: LAUREL, imageWidth: 110 },
    { title: 'Best Institution \nOverall 2024', press: 'World Education \nCongress Awards', image: LAUREL, imageWidth: 110 },
  ],
};

/*
 * `div.common-wrapper > .container > h2.h2-tag.mrg32.mrgtp` + `.outcome-wrap`. The wrap holds
 * three legacy `.outc-card`s that the sheet hides (`display: none`, verified on production — the
 * block is the heading alone), exactly as on the ATLAS and ISDI homepages, so they are not ported.
 */
export const ismeOutcomesHeading = 'ISME Outcomes: Measurable Impact, Proven ROI';

/* "This Week @ ISME" — the iframe is served by the shared InstagramFeed (see ThisWeek.js) */
export const ismeThisWeek = {
  heading: 'This Week @ ISME',
  sub: 'Catch live stories, behind-the-scenes energy, and everyday campus moments — straight from our student Instagram feed.',
  button: {
    label: 'View More on Instagram',
    href: 'https://www.instagram.com/atlas_isme?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
    variant: 'mint',
    newTab: true,
  },
};

/* `.faq-banner` (variant "blue") — the photograph is the ISDI banner's file, byte-identical */
export const ismeFaqBanner = {
  heading: 'Everything you wanted to know about \nATLAS ISME.',
  button: {
    label: 'Check out our FAQs',
    href: '#faq',
    variant: 'mint',
    icon: '/assets/images/schools/isme/home/banner/dn-arrow-wht.svg',
  },
  image: {
    src: '/assets/images/schools/isdi/home/section/faq-img.png',
    srcSet:
      '/assets/images/schools/isdi/home/section/faq-img-p-500.png 500w, /assets/images/schools/isdi/home/section/faq-img.png 601w',
  },
};

/* `.info-banner-blue.bg1` — "Ready to Build What's Next?" (the arrow is the outstation page's file) */
const ARROW_RT = '/assets/images/schools/isdi/isdi-for-outstation/banner/arrow-rt.svg';
export const ismeReadyToBuild = {
  heading: 'Ready to Build What’s Next?\nLet’s Get Started.',
  sub: 'Get a glimpse - where future business leaders are shaped through innovation, industry, and inspiration.',
  buttons: [
    { label: 'Apply Now', href: 'https://atlasuniversity.edu.in/applicationform', variant: 'mint', icon: ARROW_RT, iconInvert: true },
    // ref `id="campus-visit"` (not `data-id`), so the footer's NoPaperForms popup never binds to it
    { label: 'Schedule a visit', href: 'https://atlasuniversity.edu.in/campusvisit', variant: 'outline', icon: ARROW_RT },
  ],
  image: {
    src: '/assets/images/schools/isme/home/banner/build-whats-next-banner-picture-1.png',
    width: 469,
    height: 305,
    alt: '',
  },
};

/* `assets/include/more-questions.php` with `$chatBxVariant = "w-variant-a53085b3…"` (blue) */
export const ismeSearch = {
  label: 'More questions?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};
