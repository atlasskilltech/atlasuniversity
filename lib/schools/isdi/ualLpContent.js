/*
 * Content for /schools/isdi/ual-lp — reference/schools/isdi/ual-lp.php, the FIFTH of the six ATLAS
 * ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN page on the shared LP sheet
 * `…68e75059…`; `$body = "body isdi-page"`). Served at the SLASHLESS url (a flat `.php`; the trailing
 * slash 500s — like nyfa/scad, unlike parsons/leeds which are directories). Eleven sections: hero (with
 * the UAL logo inline in the h1), four-panel strip, intro, four sticky stack-cards, a "Learn More about
 * BA (Hons)…" band (mint CTA + full-width image — unique to this page), a bordered-text "Who Can Apply",
 * a four-card why-choose GRID (no mobile carousel), a six-card who-is-this-for carousel (breakpoints
 * 0/768/1024 → 1/2/4, autoplay+loop, pagination always, NO arrows), About London College of
 * Communication, the CTA, and a PLAIN disclaimer (not the styled card parsons/leeds use).
 *
 * Measured against production; the Bootstrap-vs-Tailwind spacing collision is reproduced by the shared
 * `.lp-bs` block. Production applies NO Bootstrap reboot to bare <p> (Tailwind Preflight wins element
 * selectors) — the about/disclaimer paragraphs carry margin:0, so they are left bare here.
 *
 * Image reuse (SHA-1 verified by the download pipeline): the strip's eligible-bg-1/-3, the about icon
 * and the CTA background are nyfa's files, and the strip's eligible-bg-2 is the homepage mission-bg. 16
 * files are this page's own (15 WebP photos + the UAL logo PNG).
 */
const IMG = '/assets/images/schools/isdi/ual-lp';
const NYFA = '/assets/images/schools/isdi/nyfa';
const MISSION = '/assets/images/mission/mission-bg.png';

export const hero = {
  titleLead: 'ISDI Global Experiential Pathway with',
  logo: `${IMG}/hero-banner/logo.png`,
  logoAlt: 'SCAD', // authored copy-paste defect on a UAL logo — transcribed as authored
  subtitle: 'Study in London for Two Years at a Global Top-Ranked University for Art & Design',
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
  imageAlt: 'Tower Bridge London at night',
};

export const strip = [
  { eyebrow: 'Exclusively for ISDI Students', title: 'Undergraduate  Pathway', bg: '#0c1f4b', image: `${NYFA}/eligible-bg-1.webp` },
  { eyebrow: 'International Creative Education', title: 'BA (Hons) Illustration & Visual Media ', bg: '#103380', image: MISSION },
  { eyebrow: 'QS World Rankings by Subject', title: '#2 in the World for Art & Design', bg: '#0a2466', image: `${NYFA}/eligible-bg-3.webp` },
  { eyebrow: 'Join a Global Creative Community', title: '19,000+ Students 130+ Nationalities', bg: '#103380', image: MISSION },
];

export const intro = {
  heading: 'The ISDI X UAL Undergraduate  Pathway',
  // paragraphs are run arrays: a string, or { b } for an inline <b>
  paragraphs: [
    [
      'The University of the Arts London (UAL) Undergraduate Transfer Pathway offers eligible ISDI students the opportunity to begin their design education in Mumbai and complete their final two years at ',
      { b: 'London College of Communication (LCC), UAL' },
      '.',
    ],
    [
      'Students complete Years 1 and 2 at ISDI before transferring to UAL for Years 3 and 4, graduating with a ',
      { b: 'BA (Hons) Illustration & Visual Media' },
      ' degree awarded by University of the Arts London.',
    ],
    [
      "This international academic experience combines the strong creative foundation developed at ISDI with the global perspective, industry engagement and contemporary creative education offered by UAL. Students gain access to one of the world's most influential creative ecosystems while building the skills, portfolio and professional networks needed for future careers in illustration, visual communication, publishing, branding, media and related creative industries.",
    ],
  ],
  image: `${IMG}/pathway.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

export const stackCards = [
  {
    bg: '#D20158',
    src: `${IMG}/how/1.webp`,
    title: 'Years 1 to 2 | ISDI, Mumbai',
    intro: 'Build a strong foundation in creative practice and visual communication at ISDI through:',
    items: [
      'Design thinking and creative problem solving',
      'Visual storytelling and conceptual development',
      'studio-based and interdisciplinary learning',
      'Exploration of illustration, communication and image-making practices',
      'Industry projects and professional exposure',
      'Global perspectives on design, culture and contemporary media',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/how/2.webp`,
    title: 'Years 3 to 4 | London College of Communication, UAL',
    intro: 'Transfer to London College of Communication, University of the Arts London and complete your undergraduate degree in one of the world’s most influential creative capitals.',
    items: [
      'Study within UAL’s internationally recognised academic environment',
      'Immersive London learning experience',
      'Contemporary approaches to illustration and visual media',
      'Studio, research and collaborative project opportunities',
      'Exposure to creative industries, publishing, branding and media sectors',
      'Access to a diverse international student community',
    ],
    outro: '',
  },
  {
    bg: '#D20158',
    src: `${IMG}/how/3.webp`,
    title: 'Graduate with a UAL Degree',
    intro: 'Complete your academic journey at University of the Arts London and gain a globally recognised creative education.',
    items: [
      'Earn a BA (Hons) Illustration & Visual Media degree from UAL',
      'Build an internationally relevant creative portfolio',
      'Develop a global professional network',
      'Learn alongside students and faculty from around the world',
      'Join an influential international community of UAL graduate',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/how/4.webp`,
    title: 'Global Career Opportunities',
    intro: 'Leverage your international education experience to pursue opportunities across the global creative industries.',
    items: [
      'Build a portfolio informed by international perspectives',
      'Develop connections within creative communities worldwide',
      'Gain exposure to publishing, branding, media, communication and design sectors',
      'Learn from industry-connected projects and professional engagement',
      'Prepare for postgraduate study and international career pathways',
    ],
    outro: 'Visa regulations, employment eligibility and post-study work opportunities are subject to prevailing government policies and immigration requirements at the time of graduation.',
  },
];

export const learnMore = {
  heading: 'Learn More about BA (Hons) Illustration & Visual Media at LCC',
  buttonLabel: 'Learn More',
  buttonHref: 'https://www.arts.ac.uk/subjects/illustration/undergraduate/ba-hons-illustration-and-visual-media-lcc',
  image: `${IMG}/learn-more.webp`,
  imageAlt: 'Northeastern University London',
};

export const whoCanApply = {
  heading: 'Who Can Apply',
  // run array — the reference bolds the program name mid-sentence
  text: [
    'Current ISDI students enrolled in the second year of their undergraduate program are eligible to explore the ',
    { b: 'UAL Undergraduate Global Pathway' },
    ', subject to meeting the academic progression and English language requirements prescribed by the University of the Arts London at the time of transfer.',
  ],
};

export const why = {
  heading: 'Why Choose This Pathway?',
  cards: [
    { title: 'Live and Learn in a Global Creative Capital', text: 'Complete your final two years in London and immerse yourself in a city known for creativity, innovation, publishing, media, branding, culture and design.' },
    { title: 'Progress to a Globally Recognised UAL Degree', text: "Transfer into the BA (Hons) Illustration & Visual Media program at London College of Communication and benefit from UAL's internationally respected approach to creative education." },
    { title: 'Strong Academic Foundation at ISDI', text: 'Develop creative thinking, technical capabilities, conceptual understanding and interdisciplinary perspectives during your first two years before progressing to UAL.' },
    { title: 'Graduate with a Global Creative Network', text: 'Earn a UAL degree while building relationships with peers, faculty, industry professionals and alumni from across the world.' },
  ],
};

export const pathwayFor = {
  heading: 'Who Is This Pathway For?',
  cards: [
    { image: `${IMG}/who-for/1.webp`, text: "Students who want to study at one of the world's leading universities for art and design" },
    { image: `${IMG}/who-for/2.webp`, text: 'Students who aspire to build international careers in creative industries' },
    { image: `${IMG}/who-for/3.webp`, text: "Students seeking to experience London's dynamic, creative and cultural landscape" },
    { image: `${IMG}/who-for/4.webp`, text: 'Students interested in illustration, visual storytelling, publishing, media, branding and communication' },
    { image: `${IMG}/who-for/5.webp`, text: 'Students who want to build an international creative portfolio and professional network' },
    { image: `${IMG}/who-for/6.webp`, text: 'Students who want to graduate with a globally recognised UK degree' },
  ],
};

export const about = {
  heading: 'About London College of Communication',
  icon: `${NYFA}/building-icon.webp`,
  paragraphs: [
    'University of the Arts London (UAL) is one of the world’s leading universities for art, design, fashion, communication and creative education. Consistently ranked among the top institutions globally for Art & Design, UAL brings together six internationally renowned colleges that have shaped generations of artists, designers, communicators, performers and creative professionals.',
    'Within UAL, London College of Communication (LCC) is a leading centre for design, media, screen, and communications education. Through industry-led learning, innovative research, and hands-on practice, LCC empowers students to develop creative solutions, challenge conventions, and build impactful careers across the global creative industries.',
  ],
  link: 'https://www.arts.ac.uk/colleges/london-college-of-communication',
  image: `${IMG}/about.webp`,
  imageAlt: 'Northeastern University campus',
};

export const cta = {
  heading: 'Ready to Continue Your Creative Journey in London?\nLet’s Get Started.',
  text: 'Explore how the UAL Undergraduate global Pathway can help you gain global exposure, expand your creative horizons and graduate with a University of the Arts London degree.',
  bg: `${NYFA}/1.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  'ISDI does not award foreign degrees and facilitates only the academic pathway and preparatory components of the ISDI × University of the Arts London Undergraduate Transfer Pathway. The degree, accreditation, academic policies, admissions decisions, scholarships and progression outcomes are governed solely by University of the Arts London in accordance with its applicable institutional and regulatory requirements. ISDI does not guarantee admission or progression to UAL. This is not a dual, joint or twinning degree program. Tuition fees, where applicable, are determined by the University of the Arts London and may be revised at its discretion. Terms and conditions apply.';
