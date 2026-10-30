/*
 * Content for /schools/isdi/leeds-arts-university — reference/schools/isdi/leeds-arts-university/index.php,
 * the FOURTH of the six ATLAS ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN page on
 * the shared LP sheet `…68e75059…`; `$body = "body isdi-page"`). Served at the TRAILING-SLASH url (a
 * directory; the slashless path 301s to it). It reuses the nyfa/scad/parsons LP template (hero, four-panel
 * strip, intro, sticky stack-cards, why-choose grid/carousel, who-is-this-for carousel, about, CTA,
 * disclaimer card) and adds two sections of its own — "Academic Experience" (a blue-bg 2-col grid of
 * anchor cards, each an area + Leeds degree with a numbered badge, plus a disclaimer line) and "Eligibility
 * Requirements" (a two-panel navy/white checklist). Measured against production; the Bootstrap-vs-Tailwind
 * spacing collision is reproduced by the shared `.lp-bs` block.
 *
 * Image reuse (SHA-1 verified by the download pipeline): the strip's eligible-bg-1/-3 and the about icon
 * and CTA background are nyfa's files, the strip's eligible-bg-2 is the homepage mission-bg, and stack-card
 * 1's photograph is the parsons scroll-con/1 (byte-identical to nyfa's intro image). 15 files are this
 * page's own.
 */
const IMG = '/assets/images/schools/isdi/leeds-arts-university';
const NYFA = '/assets/images/schools/isdi/nyfa';

export const hero = {
  title: 'ISDI Semester Exchange Program with Leeds Arts University',
  subtitle: 'Study a Semester with the Only Specialist Arts University in Northern England',
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
};

export const strip = [
  { eyebrow: 'Exclusively for ISDI Students ', title: 'Credit-Bearing Semester Exchange', bg: '#0c1f4b', image: `${NYFA}/eligible-bg-1.webp` },
  { eyebrow: 'Study in the United Kingdom get an ', title: 'Immersive International Learning Experience', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
  { eyebrow: 'Global Creative Community ', title: 'Students from 60+ Nationalities ', bg: '#0a2466', image: `${NYFA}/eligible-bg-3.webp` },
  { eyebrow: 'Specialist Creative Education', title: 'Studio-Led Learning at a Leading Arts University', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
];

export const intro = {
  heading: 'The ISDI × Leeds Arts University Semester Exchange Program',
  paragraphs: [
    "The Leeds Arts University Semester Exchange Program offers ISDI students the opportunity to spend a semester studying in the United Kingdom at one of the UK's leading specialist arts universities.",
    'Students undertake a full-time semester of study at Leeds Arts University while remaining enrolled at ATLAS SkillTech University. Academic credits earned during the exchange may be transferred towards their ATLAS degree, subject to prior academic approval and institutional requirements.',
    "Built on a commitment to international education and creative collaboration, the program provides students with access to specialist arts education, global perspectives, industry-focused learning and an immersive cultural experience in one of the United Kingdom's most vibrant student cities.",
  ],
  image: `${IMG}/section/1.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

export const stackCards = [
  {
    bg: '#D20158',
    src: `${NYFA}/759.webp`,
    srcSet: `${NYFA}/500.webp 500w, ${NYFA}/759.webp 759w`,
    title: 'Begin Your Undergraduate Journey at ISDI',
    intro: 'Start your undergraduate journey at ISDI through a design-led learning environment that combines creativity, industry exposure and interdisciplinary practice',
    items: [
      'Build creative, technical and conceptual skills in your chosen discipline',
      'Learn through studio-based projects, critiques and collaborative assignments',
      'Develop design thinking, problem-solving and visual communication skills',
      'Gain exposure to industry-linked learning and applied creative practice',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/2/759.webp`,
    srcSet: `${IMG}/scroll-con/2/500.webp 500w, ${IMG}/scroll-con/2/759.webp 759w`,
    title: 'Semester at Leeds Arts University, United Kingdom',
    intro: 'Spend a semester studying at Leeds Arts University while earning academic credits that contribute towards your undergraduate degree at ATLAS.',
    items: [
      'Full-time academic study at Leeds Arts University',
      'Credit-bearing international learning experience',
      'Access to specialist arts and creative education',
      'Industry-focused projects and practical learning',
      'Cross-cultural collaboration with international students',
      'Immersive academic and cultural experience in the United Kingdom',
    ],
    outro: '',
  },
  {
    bg: '#D20158',
    src: `${IMG}/scroll-con/3/759.webp`,
    srcSet: `${IMG}/scroll-con/3/500.webp 500w, ${IMG}/scroll-con/3/759.webp 759w`,
    title: 'Transfer Credits Towards Your Degree',
    intro: 'Upon successful completion of the exchange program and subject to academic approval, students may transfer eligible credits back towards their ATLAS degree.',
    items: [
      'Maintain academic progression while studying abroad',
      'Enhance your academic profile through international learning',
      'Gain exposure to different teaching methodologies and creative practices',
      'Develop intercultural communication and collaboration skills',
      'Build a globally relevant creative portfolio',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/4/759.webp`,
    srcSet: `${IMG}/scroll-con/4/500.webp 500w, ${IMG}/scroll-con/4/759.webp 759w`,
    title: 'Global Learning Experience',
    intro: '',
    items: [
      'Studying abroad allows students to broaden their perspectives and engage with a diverse international community.',
      'Collaborate with students from around the world',
      'Develop a global understanding of creative industries',
      'Build confidence, independence and adaptability',
      'Strengthen personal and professional growth',
      'Experience life and study in a new cultural environment',
    ],
    outro: '',
  },
];

export const academic = {
  headingLead: 'Academic ',
  headingAccent: 'Experience',
  intro: 'Students may have the opportunity to study within disciplines such as:',
  disciplines: [
    { area: 'Animation', degree: 'BA (Hons) Animation', url: 'https://www.leeds-art.ac.uk/courses/ba-hons-animation' },
    { area: 'Communication Design', degree: 'BA (Hons) Visual Communication', url: 'https://www.leeds-art.ac.uk/courses/ba-hons-visual-communication' },
    { area: 'Strategic Design & Communication', degree: 'BA (Hons) Marketing Communication', url: 'https://www.leeds-art.ac.uk/courses/ba-hons-marketing-communications' },
    { area: 'Fashion Design', degree: 'BA (Hons) Fashion Design', url: 'https://www.leeds-art.ac.uk/courses/ba-hons-fashion-design' },
  ],
  disclaimer: 'Module availability may vary by semester and is subject to academic suitability and programme capacity.',
};

export const eligibility = {
  heading: 'Eligibility Requirements',
  items: [
    'Be enrolled in an undergraduate degree program at ATLAS SkillTech University.',
    'Be formally nominated by ATLAS SkillTech University.',
    "Meet Leeds Arts University's admission requirements.",
    'Demonstrate the required English language proficiency.',
    'Submit academic transcripts and supporting documentation.',
    'Obtain academic approval for selected courses before departure.',
    'Register as a full-time student during the exchange semester.',
  ],
};

export const whoCanApply = {
  heading: 'Who Can Apply',
  text: 'Current third-year ISDI students from disciplines mentioned above may be eligible to explore the Leeds Arts University Semester Exchange Program, subject to academic approval and program availability',
  image: `${IMG}/section/2.webp`,
};

export const why = {
  heading: 'Why Choose This Pathway?',
  cards: [
    { title: 'Credit-Bearing International Experience', text: 'Undertake a semester of study at Leeds Arts University while earning academic credits that may be transferred towards your ATLAS degree, subject to academic approval.' },
    { title: 'Study at a Specialist Arts University', text: "Gain access to one of the United Kingdom's leading specialist arts institutions, known for its focused creative education, industry engagement and student-centred learning environment." },
    { title: 'Join a Global Creative Community', text: 'Learn alongside students from over 60 nationalities and become part of an internationally connected creative ecosystem that encourages collaboration and diverse perspectives.' },
    { title: 'Experience the United Kingdom', text: 'Immerse yourself in British culture, creative industries and academic life while developing valuable global competencies and intercultural understanding.' },
  ],
};

export const pathwayFor = {
  heading: 'Who Is This Program For',
  cards: [
    { image: `${IMG}/slide-con/1.webp`, text: 'Students seeking an international academic experience while continuing their ATLAS degree' },
    { image: `${IMG}/slide-con/2.webp`, text: 'Students who wish to gain exposure to different approaches to design, communication and creative practice' },
    { image: `${IMG}/slide-con/3.webp`, text: 'Students seeking to strengthen their portfolio through global learning experiences' },
    { image: `${IMG}/slide-con/4.webp`, text: 'Students who want to experience life and study in the United Kingdom while building international networks' },
  ],
};

export const about = {
  heading: 'About Leeds Arts University',
  icon: `${NYFA}/building-icon.webp`,
  paragraphs: [
    "Leeds Arts University is one of the United Kingdom’s leading specialist arts universities and the only specialist arts university in Northern England. With over 175 years of creative education, the university is dedicated to nurturing artists, designers, makers and creative professionals through a focused and practice-led learning environment.",
    "Located in Leeds, one of the UK’s most vibrant student cities, the university offers industry-informed teaching, specialist facilities and hands-on creative learning across a wide range of disciplines. Its international outlook, diverse student community and strong emphasis on professional practice and portfolio development create a dynamic environment where creativity, collaboration and innovation thrive.",
  ],
  link: 'https://www.leeds-art.ac.uk',
  image: `${IMG}/section/3.webp`,
  imageAlt: 'Northeastern University campus',
};

export const cta = {
  heading: 'Ready to Experience a Semester in the United Kingdom?\nLet’s Get Started.',
  text: 'Explore how the Leeds Arts University Semester Exchange Program can help you gain international exposure, expand your creative horizons and enrich your academic journey through a transformative global learning experience.',
  bg: `${NYFA}/1.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  'Participation in the Leeds Arts University Semester Exchange is subject to institutional agreements, program availability, academic eligibility requirements and admissions approval by Leeds Arts University and ATLAS SkillTech University. Academic credits earned during the exchange are subject to prior approval and transfer regulations of ATLAS SkillTech University. Students remain responsible for complying with all visa, immigration, travel, health insurance and regulatory requirements applicable to international study in the United Kingdom. Program offerings, module availability and academic regulations may change at the discretion of Leeds Arts University. Terms and conditions apply.';
