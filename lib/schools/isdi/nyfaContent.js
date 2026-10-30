/*
 * Content for /schools/isdi/nyfa — reference/schools/isdi/nyfa/index.php, the first of
 * the six ATLAS ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN
 * page; `$css = "…68e75059…"`, the shared LP sheet; `$body = "body isdi-page"`). It
 * includes the ISDI header/footer (mounted by the layout). Transcribed from the
 * reference markup; measured against production. The reference's custom Tailwind colors
 * are `isdi-blue #1e3a8a` (added to the project config) and `isdi-pink #ec1376` (already
 * there); its `sm` (640) / `lg` (1024) breakpoints are stock Tailwind, which differ from
 * the project's 480 / 992, so the page translates those to arbitrary media queries.
 */
const IMG = '/assets/images/schools/isdi/nyfa';

export const hero = {
  heading: 'ISDI Year Abroad Program with New York Film Academy (NYFA)',
  subtitle: 'Study Your Final Year in the Heart of Hollywood in Animation & Visual Effects',
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
  alt: 'Tower Bridge London at night',
};

/* ref section.flex.custom-gap — four colored panels, each a right-anchored bg image */
export const strip = [
  { eyebrow: 'Study in Los Angeles', title: 'The Global Hub for Film, Animation & Entertainment', bg: '#0c1f4b', image: `${IMG}/eligible-bg-1.webp` },
  { eyebrow: 'Exclusively for ISDI Students', title: 'International Learning Pathway', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
  { eyebrow: 'Dual Academic Recognition', title: 'Earn an ATLAS Degree and NYFA Certificate', bg: '#0a2466', image: `${IMG}/eligible-bg-3.webp` },
  { eyebrow: "Accelerated Master's Progression", title: "Direct Pathway to NYFA's MFA in 3D Animation & VFX", bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
];

export const intro = {
  heading: 'The ISDI × New York Film Academy Year Abroad Program',
  paragraphs: [
    "The New York Film Academy (NYFA) Year Abroad Program offers ISDI Animation & VFX students the opportunity to spend their final year studying in Los Angeles, one of the world's leading centres for film, animation, gaming and visual effects.",
    'Students complete the first three years of their Bachelor of Design (Animation & VFX) degree at ATLAS SkillTech University before progressing to New York Film Academy for a one-year Specialization Certificate in 3D Animation & VFX. Academic credits earned at NYFA contribute towards the completion of the ATLAS degree under the progression agreement between the two institutions.',
    'Built around NYFA’s renowned "learning by doing" philosophy, the program combines intensive practical training, portfolio development, reel creation and industry-focused learning while providing students with exposure to the creative ecosystem of Hollywood and the global entertainment industry.',
  ],
  image: `${IMG}/section/1.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

/* ref "How This Pathway Works" — 3 sticky `.stack-card`s (image + colored content panel) */
export const stackCards = [
  {
    bg: '#D20158',
    src: `${IMG}/759.webp`,
    srcSet: `${IMG}/500.webp 500w, ${IMG}/759.webp 759w`,
    title: 'Years 1–3 at ATLAS, Mumbai, India',
    intro: 'Study the B.Des in Animation & VFX at ATLAS, building strong foundations in animation, visual storytelling, digital design and industry-relevant creative practice.',
    introBreak: true,
    introEnd: 'Students build expertise in:',
    items: [
      'Animation principles, storytelling and character development',
      'Visual communication, design thinking and creative practice',
      'Digital tools, motion graphics and VFX workflows',
      'Project-based learning with industry exposure',
    ],
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/1/759.webp`,
    srcSet: `${IMG}/scroll-con/1/500.webp 500w, ${IMG}/scroll-con/1/759.webp 759w`,
    title: 'Year 4 at New York Film Academy (NYFA)',
    intro: 'Progress to New York Film Academy for a one-year Specialisation Certificate in 3D Animation & VFX, gaining advanced international exposure in a focused area of animation practice.',
    introBreak: true,
    introEnd: 'Students benefit from:',
    items: [
      'Specialised training in 3D Animation & VFX',
      'Exposure to international teaching and studio-based learning',
      'Portfolio development in an advanced creative environment',
      'A globally relevant specialisation experience in the US',
    ],
  },
  {
    bg: '#D20158',
    src: `${IMG}/scroll-con/3/759.webp`,
    srcSet: `${IMG}/scroll-con/3/500.webp 500w, ${IMG}/scroll-con/3/759.webp 759w`,
    title: 'Industry-Focused Learning Experience',
    intro: 'The NYFA curriculum is designed to prepare students for careers in animation, visual effects and digital content creation.',
    introBreak: false,
    introEnd: '',
    items: [
      'Learn through hands-on project-based training',
      'Develop skills in modelling, texturing, rigging and animation',
      'Gain exposure to visual effects, compositing and production workflows',
      'Build industry-standard portfolios and demo reels',
      'Experience studying in the heart of the global entertainment industry',
    ],
  },
];

export const eligibility = {
  intro: 'For entry into the NYFA Certificate Program, students must meet the following criteria.',
  items: [
    'Be enrolled in the B.Des. Animation & VFX program at ATLAS SkillTech University',
    'Successfully complete the first three years of undergraduate study at ATLAS',
    'Meet NYFA admission and documentation requirements',
    'Demonstrate English language proficiency where required',
    'Obtain approval from both institutions under the progression agreement',
    'Meet visa and financial requirements for study in the United States',
  ],
};

export const skillsIntro =
  'Students undertake the One-Year Certificate in 3D Animation & VFX, with training focused on:';

/* ref $courses — name + inline SVG path */
export const courses = [
  { name: '3D Animation', icon: 'M12 2l9 5v10l-9 5-9-5V7z M12 12l9-5 M12 12v10 M12 12L3 7' },
  { name: 'Character Animation', icon: 'M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20c0-3.3 3.6-5 8-5s8 1.7 8 5' },
  { name: 'Modelling & Sculpting', icon: 'M12 2l9 5v10l-9 5-9-5V7z M3.5 7.5l8.5 5 8.5-5 M12 12.5V22' },
  { name: 'Texturing & Shading', icon: 'M3 3h18v18H3z M3 9h18 M9 9v12 M3 15h6' },
  { name: 'Rigging', icon: 'M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 8v4 M12 12l-4 4 M12 12l4 4 M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  { name: 'Lighting & Rendering', icon: 'M9 18h6 M10 21h4 M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2.5H9c0-1.3-.3-1.9-1-2.5A6 6 0 0 1 12 3z' },
  { name: 'Visual Effects', icon: 'M12 3v3 M12 18v3 M3 12h3 M18 12h3 M5.6 5.6l2.1 2.1 M16.3 16.3l2.1 2.1 M18.4 5.6l-2.1 2.1 M7.7 16.3l-2.1 2.1 M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  { name: 'Compositing', icon: 'M4 4h11v11H4z M9 9h11v11H9z' },
  { name: 'Motion Capture', icon: 'M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 6v6 M12 12l-4 8 M12 12l4 8 M6 9l6 2 6-2' },
  { name: 'Production Pipelines', icon: 'M4 7h6 M14 7h6 M4 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z M16 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0z M12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z M12 13V9 M8 7c0 4 4 6 4 6 M16 7c0 4-4 6-4 6' },
  { name: 'Portfolio & Reel Development', icon: 'M4 4h16v16H4z M4 8h16 M8 4v4 M16 4v4 M4 16h16 M8 20v-4 M16 20v-4 M10 11l4 2-4 2z' },
];

export const whoCanApply = {
  text: 'Current third-year students enrolled in the Bachelor of Design (Animation & VFX) program at ATLAS SkillTech University may be eligible to explore the New York Film Academy Year Abroad Program, subject to academic performance, admission requirements and program availability.',
  image: `${IMG}/section/2.webp`,
  imageAlt: 'Students on campus',
};

export const whyCards = [
  { title: 'Study in the Heart of Hollywood', text: "Experience life and learning in Los Angeles, one of the world's leading centres for film, animation, gaming and visual effects, while gaining exposure to global entertainment industries." },
  { title: 'Learn Through Industry-Focused Training', text: "NYFA's conservatory-style model emphasises practical learning, production experience, portfolio development and career readiness through intensive hands-on instruction." },
  { title: 'Earn Dual Academic Recognition', text: 'Graduate with a Bachelor of Design degree from ATLAS and a One-Year Certificate in 3D Animation & VFX from NYFA, strengthening your academic and professional credentials.' },
  { title: "Accelerate Your Master's Journey", text: "Students who successfully complete the pathway may become eligible for advanced standing into NYFA's MFA in 3D Animation & VFX, allowing progression directly into the second semester of the programme, subject to academic requirements." },
];

export const pathwayCards = [
  { image: `${IMG}/slide-con/1.webp`, text: 'Students aspiring to build international careers in animation, visual effects and digital entertainment' },
  { image: `${IMG}/slide-con/2.webp`, text: 'Students seeking hands-on, industry-focused learning experiences' },
  { image: `${IMG}/slide-con/3.webp`, text: 'Students interested in studying in Los Angeles and gaining exposure to Hollywood' },
  { image: `${IMG}/slide-con/4.webp`, text: 'Students looking to develop professional portfolios and industry-ready showreels' },
  { image: `${IMG}/slide-con/5.webp`, text: 'Students interested in pursuing postgraduate studies in animation and visual effects' },
];

export const about = {
  paragraphs: [
    'New York Film Academy (NYFA) is a globally recognised institution specialising in practical education across filmmaking, animation, visual effects, game design, photography, acting and other creative disciplines. Known for its “learning by doing” approach, NYFA offers immersive, project-based training designed to mirror professional creative environments.',
    'Located in Los Angeles, California, NYFA places students close to the heart of the global entertainment industry. Through intensive instruction, mentorship from industry-experienced faculty and portfolio-driven learning, students gain valuable exposure to contemporary industry practices while building the technical and creative skills required for careers in animation and visual effects.',
  ],
  link: 'https://www.nyfa.edu',
  icon: `${IMG}/building-icon.webp`,
  image: `${IMG}/section/3.webp`,
  imageAlt: 'Northeastern University campus',
};

export const cta = {
  heading: 'Ready to Study in the Heart of Hollywood?\nLet’s Get Started.',
  text: 'Explore how the New York Film Academy Year Abroad Program can help you gain international exposure, strengthen your creative portfolio and build the skills required for success in the global animation and visual effects industry.',
  bg: `${IMG}/1.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  "Participation in the New York Film Academy Year Abroad Program is subject to institutional agreements, program availability, academic eligibility requirements and admissions approval by New York Film Academy and ATLAS SkillTech University. Academic credits earned during the NYFA Certificate Program are subject to transfer regulations and approval by ATLAS SkillTech University. Progression into the MFA in 3D Animation & VFX is not guaranteed and remains subject to NYFA's graduate admissions requirements, academic performance, portfolio review and applicable institutional policies. Students are responsible for complying with all visa, immigration, financial and regulatory requirements applicable to study in the United States. Terms and conditions apply.";
