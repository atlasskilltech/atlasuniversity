/*
 * Content for /schools/isdi/parsons-lp — reference/schools/isdi/parsons-lp/index.php, the third of
 * the six ATLAS ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN page on the
 * shared LP sheet `…68e75059…`; `$body = "body isdi-page"`). Served at the TRAILING-SLASH url (a
 * directory with index.php; the slashless path 301s to it). It reuses the nyfa/scad LP template
 * (hero, four-panel strip, intro, sticky stack-cards, why-choose grid/carousel, who-is-this-for
 * carousel, about, CTA) and has two sections of its own — "Academic Pathways" (a numbered
 * discipline grid) and "Who Can Apply" (a blue banner + full-width image) — plus a styled
 * disclaimer card. No logo marquee / SCAD-Pro / pricing / visa sections. Measured against
 * production; the Bootstrap-vs-Tailwind spacing collision is reproduced by the shared `.lp-bs`
 * block (see globals.css / the nyfa CLAUDE.md note).
 *
 * Image reuse (SHA-1 verified by the download pipeline): the strip's eligible-bg-1/-3 and the
 * about icon and CTA background are nyfa's files, the strip's eligible-bg-2 is the homepage
 * mission-bg, and stack-card 1's photograph is byte-identical to nyfa's intro image. 17 files are
 * this page's own.
 */
const IMG = '/assets/images/schools/isdi/parsons-lp';
const NYFA = '/assets/images/schools/isdi/nyfa';

export const hero = {
  title: 'ISDI Undergraduate  Pathway with PARSONS',
  subtitle:
    "Study in New York City and Graduate from One of the World's Leading Art & Design Institutions",
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
};

export const strip = [
  { eyebrow: '13+ Years of Academic Collaboration', title: 'With Parsons School of Design', bg: '#0c1f4b', image: `${NYFA}/eligible-bg-1.webp` },
  { eyebrow: 'Exclusively for', eyebrowBreak: 'ISDI Students', title: 'Seamless 2+2  Pathway', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
  { eyebrow: 'Study in', eyebrowBreak: 'New York City', title: 'Global Hub for Design & Innovation', bg: '#0a2466', image: `${NYFA}/eligible-bg-3.webp` },
  { eyebrow: 'International Learning Experience', title: 'Two Creative Capitals, One Degree', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
];

export const intro = {
  heading: 'The ISDI × Parsons Undergraduate  Pathway',
  paragraphs: [
    'The Parsons Undergraduate Transfer Pathway offers ISDI students the opportunity to begin their design education in Mumbai and complete their final two years at Parsons School of Design in New York City, one of the world’s leading institutions for art and design.',
    'Students complete Years 1 and 2 at ISDI while following the Parsons curriculum, before seamlessly transferring to Parsons for Years 3 and 4. On successful completion, students graduate with a Parsons degree and gain international exposure, industry connections and access to a globally recognised creative ecosystem.',
    'Built on a longstanding collaboration between ISDI and Parsons, the pathway ensures smooth academic progression aligned with international standards while fostering creativity, interdisciplinary learning and professional readiness for careers across design, fashion, communication, technology and related fields.',
  ],
  image: `${IMG}/about/about-parsons.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

export const stackCards = [
  {
    bg: '#D20158',
    src: `${NYFA}/759.webp`,
    srcSet: `${NYFA}/500.webp 500w, ${NYFA}/759.webp 759w`,
    title: 'Years 1 to 2 | ISDI, Mumbai',
    intro:
      'Complete the first two years of your undergraduate design program at ISDI while following the Parsons curriculum and building a strong creative foundation through:',
    items: [
      'Design thinking and creative problem solving',
      'Studio-based learning and interdisciplinary practice',
      'Exploration of your chosen design discipline',
      'Industry projects and professional exposure',
      'Global perspectives on design, innovation and culture',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/2/759.webp`,
    srcSet: `${IMG}/scroll-con/2/500.webp 500w, ${IMG}/scroll-con/2/759.webp 759w`,
    title: 'Years 3 to 4 | New York City, USA',
    intro:
      'Transfer to Parsons School of Design in New York City and complete your undergraduate degree at one of the world’s leading institutions for art and design.',
    items: [
      'Parsons curriculum continuity',
      'Immersive New York City learning experience',
      'Access to world-leading creative industries',
      'Studio, research and collaborative learning opportunities',
      'Exposure to global creative networks and professional practice',
    ],
    outro: '',
  },
  {
    bg: '#D20158',
    src: `${IMG}/scroll-con/3/759.webp`,
    srcSet: `${IMG}/scroll-con/3/500.webp 500w, ${IMG}/scroll-con/3/759.webp 759w`,
    title: 'Graduate with a Parsons Degree',
    intro:
      'Complete your academic journey at Parsons and benefit from a globally recognised design education.',
    items: [
      'Earn a Parsons undergraduate degree',
      'Build an international creative portfolio',
      'Develop a global professional network',
      'Gain exposure to leading designers, brands and organisations',
      'Join a worldwide community of Parsons alumni',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/4/759.webp`,
    srcSet: `${IMG}/scroll-con/4/500.webp 500w, ${IMG}/scroll-con/4/759.webp 759w`,
    title: 'Global Career Opportunities',
    intro:
      'Leverage your international education experience to pursue opportunities across the creative industries worldwide.',
    items: [
      'Access career opportunities in design, fashion, communication, technology and innovation',
      'Build connections within global creative ecosystems',
      'Benefit from industry engagement, internships and professional collaborations',
      'Develop the skills and perspectives sought by employers in a global marketplace',
    ],
    outro:
      'Visa regulations, employment eligibility and post-study work opportunities are subject to prevailing government policies and immigration requirements at the time of graduation.',
  },
];

export const academic = {
  headingLead: 'Academic ',
  headingAccent: 'Pathways',
  intro:
    'The Parsons Undergraduate Transfer Pathway offers students the opportunity to continue their studies across a range of creative disciplines, including:',
  disciplines: [
    'Fashion Design',
    'Communication Design',
    'Strategic Design & Management',
    'Product / Industrial Design',
    'Interior Design',
  ],
};

export const whoCanApply = {
  heading: 'Who Can Apply',
  text:
    'Current ISDI students enrolled in the second year of their undergraduate program are eligible to explore the Parsons Undergraduate Transfer Pathway, subject to meeting the academic and portfolio requirements for transfer to Parsons.',
  image: `${IMG}/section/who-can-apply.webp`,
};

export const why = {
  heading: 'Why Choose This Pathway?',
  cards: [
    { title: 'Study in the Global Creative Capital', text: 'Complete your final two years in New York City, immersing yourself in a vibrant environment shaped by fashion, design, technology, media, art and entrepreneurship.' },
    { title: 'Seamless Academic Progression', text: 'ISDI students study the Parsons curriculum from the outset, ensuring continuity of learning and a smooth transition into Years 3 and 4 at Parsons.' },
    { title: 'Learn at a Globally Recognised Design Institution', text: 'Benefit from Parsons’ internationally acclaimed approach to design education, known for innovation, sustainability, interdisciplinary thinking and social impact.' },
    { title: 'Graduate with a Parsons Degree', text: 'Earn a globally respected degree while becoming part of an influential network of creative professionals, entrepreneurs and industry leaders across the world.' },
  ],
};

export const pathwayFor = {
  heading: 'Who Is This Pathway For?',
  cards: [
    { image: `${IMG}/section/who-is-this-pathway-for/1.webp`, text: 'Students who want to study at a globally recognised leader in art and design education' },
    { image: `${IMG}/section/who-is-this-pathway-for/2.webp`, text: 'Students who aspire to build international careers in creative industries' },
    { image: `${IMG}/section/who-is-this-pathway-for/3.webp`, text: 'Students seeking to learn in New York City, a global hub for design, fashion, media and innovation' },
    { image: `${IMG}/section/who-is-this-pathway-for/4.webp`, text: 'Students who want access to diverse creative disciplines across design fields' },
    { image: `${IMG}/section/who-is-this-pathway-for/5.webp`, text: 'Students who value industry-connected learning through live projects and collaborations' },
    { image: `${IMG}/section/who-is-this-pathway-for/6.webp`, text: 'Students who want to join a powerful global network of Parsons alumni and creative leaders' },
  ],
};

export const about = {
  heading: 'About Parsons School of Design',
  icon: `${NYFA}/building-icon.webp`,
  paragraphs: [
    'Located in the heart of New York City, Parsons School of Design is one of the world’s leading institutions for art and design education and part of The New School. It offers a dynamic, urban learning environment where creativity, innovation and critical thinking shape contemporary design practice.',
    'Studying at Parsons places students in Manhattan, surrounded by global leaders in fashion, design, media, technology, culture and entrepreneurship, providing direct access to industry exposure and creative opportunities.',
    'Parsons offers a collaborative, studio-based learning experience that encourages experimentation and interdisciplinary exploration, supported by close interaction with faculty and peers. With a diverse global student community, Parsons brings together emerging designers and creative thinkers from around the world, preparing graduates to join a strong international network of alumni shaping the future of design.',
  ],
  link: 'https://www.newschool.edu/parsons/',
  image: `${IMG}/about/1.webp`,
  imageAlt: 'Parsons School of Design campus',
};

export const cta = {
  heading: 'Ready to expand Your Creative Journey in New York City?\nLet’s Get Started.',
  text:
    'Explore how the Parsons Undergraduate Transfer Pathway can help you gain global exposure, expand your creative horizons and earn a Parsons degree.',
  bg: `${NYFA}/1.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  'ISDI does not award foreign degrees and facilitates only the academic pathway and preparatory components of the ISDI × Parsons Undergraduate Transfer Pathway. The Parsons degree, accreditation, academic policies, admissions decisions, scholarships and progression outcomes are governed solely by Parsons School of Design and The New School, in accordance with their applicable institutional and regulatory requirements. ISDI does not guarantee admission or progression to Parsons. This is not a dual, joint or twinning degree program. Tuition fees, where applicable, are determined by Parsons School of Design and The New School and may be revised at their discretion. Terms and conditions apply.';
