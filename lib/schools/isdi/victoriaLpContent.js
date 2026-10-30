/*
 * Content for /schools/isdi/victoria-university-of-wellington —
 * reference/schools/isdi/victoria-university-of-wellington/index.php, the SIXTH and LAST of the ATLAS
 * ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN page on the shared LP sheet
 * `…68e75059…`; `$body = "body isdi-page"`). A directory served at the TRAILING-SLASH url (the slashless
 * path 301s to it, like parsons/leeds). Eleven sections: hero (NO logo; desktop 600px / mobile 500px),
 * four-panel strip, intro, four sticky stack-cards, "Who Can Apply" (bg-#1E3A8A heading+text + full-width
 * `n1024:h-screen` image), an "Academic Pathways" MAPPING table (5 ISDI-major → VUW-degree anchor rows
 * linking to wgtn.ac.nz — this page's own shape), a four-card why-choose (grid / mobile carousel),
 * a five-card who-is-this-for carousel (breakpoints 640/1024 → 1/2/4, arrows + mobile bullets), About
 * Victoria University of Wellington, the CTA, and a styled disclaimer card.
 *
 * Measured against production; the Bootstrap-vs-Tailwind spacing collision is reproduced by the shared
 * `.lp-bs` block, and the parsons/leeds LP fixes (H2 formula, stack content-height + generic sans-serif)
 * are applied up front.
 *
 * Image reuse (SHA-1 verified): the strip's eligible-bg-1/-3, the about icon and the CTA background are
 * nyfa's files; the strip's eligible-bg-2 is the homepage mission-bg; stack-card 1's photograph is the
 * parsons scroll-con/1 (= nyfa's intro image). 16 files are this page's own.
 */
const IMG = '/assets/images/schools/isdi/victoria-university-of-wellington';
const NYFA = '/assets/images/schools/isdi/nyfa';
const MISSION = '/assets/images/mission/mission-bg.png';

export const hero = {
  title: 'ISDI Undergraduate Global Pathway with Victoria University of Wellington',
  subtitle: 'Complete Your Final Two Years in New Zealand at a World-Class Hub for Design, Creativity and Innovation',
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
  imageAlt: 'Tower Bridge London at night',
};

export const strip = [
  { eyebrow: 'Study in New Zealand', title: 'A Global Hub for Design, Technology & Creative Innovation', bg: '#0c1f4b', image: `${NYFA}/eligible-bg-1.webp` },
  { eyebrow: 'Exclusively for ISDI Students', title: 'Seamless Undergraduate Pathway', bg: '#103380', image: MISSION },
  { eyebrow: 'Receive Advanced Standing', title: 'Transfer 120 Credits Towards Your Degree at VUW', bg: '#0a2466', image: `${NYFA}/eligible-bg-3.webp` },
  { eyebrow: 'Graduate with a Global Degree', title: 'Bachelor of Design Innovation', bg: '#103380', image: MISSION },
];

export const intro = {
  heading: 'The ISDI × Victoria University of Wellington Undergraduate Global Pathway',
  paragraphs: [
    "The Victoria University of Wellington Undergraduate Global Pathway offers ISDI students the opportunity to complete the final two years of their undergraduate studies in New Zealand at one of the world's leading universities for design, creativity and innovation.",
    'Students complete the first two years of their design education at ISDI before transferring to Victoria University of Wellington (VUW), where eligible students receive 120 credits towards the Bachelor of Design Innovation. This allows for a seamless transition into their chosen specialisation and completion of their degree in New Zealand.',
    "Built upon a strong academic foundation, the pathway combines ISDI's interdisciplinary design education with VUW's future-focused approach to design innovation, providing students with international exposure, industry-connected learning and a globally recognised qualification.",
  ],
  image: `${IMG}/section/1.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

export const stackCards = [
  {
    bg: '#D20158',
    src: `${NYFA}/759.webp`,
    srcSet: `${NYFA}/500.webp 500w, ${NYFA}/759.webp 759w`,
    title: 'Years 1 & 2 at ISDI | Mumbai, India',
    intro: 'Complete the first two years of your undergraduate design education at ISDI while building the creative, technical and conceptual foundation required for progression to Victoria University of Wellington.',
    items: [
      'Develop design thinking and problem-solving capabilities',
      'Build technical and creative competencies within your chosen discipline',
      'Engage in interdisciplinary and studio-based learning',
      'Work on industry projects and collaborative assignments',
      'Prepare for international progression opportunities',
      'Build a portfolio aligned with global design standards',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/2/759.webp`,
    srcSet: `${IMG}/scroll-con/2/500.webp 500w, ${IMG}/scroll-con/2/759.webp 759w`,
    title: 'Years 3 & 4 at Victoria University of Wellington | New Zealand',
    intro: "Progress to Victoria University of Wellington and complete your Bachelor of Design Innovation in one of the world's most creative and innovative learning environments.",
    items: [
      'Receive 120 credits towards the Bachelor of Design Innovation',
      'Complete the final two years of your degree in New Zealand',
      "Study within New Zealand's leading School of Design Innovation",
      'Access future-focused and industry-connected learning experiences',
      'Engage with emerging technologies and creative innovation',
      'Graduate with a Victoria University of Wellington degree',
    ],
    outro: '',
  },
  {
    bg: '#D20158',
    src: `${IMG}/scroll-con/3/759.webp`,
    srcSet: `${IMG}/scroll-con/3/500.webp 500w, ${IMG}/scroll-con/3/759.webp 759w`,
    title: 'International Learning Experience',
    intro: 'Studying in New Zealand enables students to gain international exposure while developing globally relevant creative and professional skills.',
    items: [
      "Experience life and study in Wellington's vibrant creative ecosystem",
      'Develop a global perspective on design and innovation',
      'Collaborate with students from diverse cultural backgrounds',
      'Build independence, adaptability and intercultural competencies',
      'Access international career and networking opportunities',
    ],
    outro: '',
  },
  {
    bg: '#0038B1',
    src: `${IMG}/scroll-con/4/759.webp`,
    srcSet: `${IMG}/scroll-con/4/500.webp 500w, ${IMG}/scroll-con/4/759.webp 759w`,
    title: 'Design Studio Learning & Portfolio Development',
    intro: 'Through the ISDI–Victoria University of Wellington pathway, students continue to strengthen their creative practice through studio-based learning, project work and portfolio development across the full duration of the program.',
    items: [
      'Build a portfolio that reflects both academic rigour and creative experimentation',
      'Work on studio projects, critiques and collaborative design assignments',
      'Develop research, conceptualisation and visual communication skills',
      'Strengthen your ability to apply design thinking to real-world challenges',
      'Graduate with a body of work that supports future study and creative career opportunities',
    ],
    outro: '',
  },
];

export const whoCanApply = {
  heading: 'Who Can Apply',
  text: 'Current second-year ISDI students may be eligible to explore the Victoria University of Wellington Undergraduate Global Pathway, subject to academic performance, admission requirements and program availability.',
  image: `${IMG}/section/2.webp`,
};

export const academic = {
  headingLead: 'Academic ',
  headingAccent: 'Pathways',
  intro: 'The Victoria University of Wellington Undergraduate Global Pathway offers eligible ISDI students the opportunity to progress into the following Bachelor of Design Innovation specialisations:',
  isdiLabel: 'ISDI Major',
  vuwLabel: 'Victoria University of Wellington Degree & Major',
  rows: [
    { major: 'Fashion Design', degree: 'Bachelor of Design Innovation – Fashion Design Technology', url: 'https://www.wgtn.ac.nz/explore/degrees/design-innovation/requirements?major=fashion-design-technology' },
    { major: 'Product Design', degree: 'Bachelor of Design Innovation – Industrial Design', url: 'https://www.wgtn.ac.nz/explore/degrees/design-innovation/requirements?major=industrial-design' },
    { major: 'Animation & VFX', degree: 'Bachelor of Design Innovation – Animation & Visual Effects', url: 'https://www.wgtn.ac.nz/explore/degrees/design-innovation/requirements?major=animation-and-visual-effects' },
    { major: 'Animation & VFX', degree: 'Bachelor of Design Innovation – Animation & Game Design', url: 'https://www.wgtn.ac.nz/explore/degrees/design-innovation/requirements?major=game-design' },
    { major: 'Communication Design', degree: 'Bachelor of Design Innovation – Communication Design', url: 'https://www.wgtn.ac.nz/explore/degrees/design-innovation/requirements?major=communication-design' },
  ],
};

export const why = {
  heading: 'Why Choose This Pathway?',
  cards: [
    { title: 'Study at a Globally Ranked University', text: "Victoria University of Wellington is ranked among the world's top universities and is recognised globally for excellence in teaching, research and student experience." },
    { title: "Learn at New Zealand's Leading School of Design Innovation", text: 'The School of Design Innovation is internationally recognised for its future-focused approach to design education, combining creativity, technology and innovation to prepare students for emerging industries.' },
    { title: "Study in Wellington's Creative Capital", text: 'Wellington is known globally for its thriving design, film, gaming, digital technology and creative industries, providing students with valuable exposure to innovation-led environments.' },
    { title: 'Scholarship Support and International Recognition', text: 'Eligible ATLAS students benefit from a 15% tuition fee scholarship while earning a globally recognised Bachelor of Design Innovation degree from Victoria University of Wellington.' },
  ],
};

export const pathwayFor = {
  heading: 'Who Is This Program For',
  cards: [
    { image: `${IMG}/slide-con/1.webp`, text: 'Students seeking an internationally recognised undergraduate degree in design' },
    { image: `${IMG}/slide-con/2.webp`, text: 'Students interested in studying in New Zealand and experiencing a global creative environment' },
    { image: `${IMG}/slide-con/3.webp`, text: 'Students looking to specialise in design, animation, communication or product innovation' },
    { image: `${IMG}/slide-con/4.webp`, text: 'Students seeking exposure to technology-driven and future-focused design education' },
    { image: `${IMG}/slide-con/5.webp`, text: 'Students aspiring to build international careers in creative industries' },
  ],
};

export const about = {
  heading: 'About Victoria University of Wellington',
  icon: `${NYFA}/building-icon.webp`,
  paragraphs: [
    "Victoria University of Wellington is one of New Zealand's leading universities and is consistently ranked among the world's top higher education institutions. Known for its excellence in teaching, research and innovation, the university attracts students from across the globe seeking a high-quality international education experience.",
    "The university's School of Design Innovation is recognised for its interdisciplinary approach to design education, combining creativity, emerging technologies and innovation-led thinking. Students engage in studio-based learning, collaborative projects and industry-connected experiences that prepare them for rapidly evolving creative industries.",
    "Located in Wellington, New Zealand's capital city, the university sits at the centre of a thriving ecosystem spanning design, film, digital media, gaming, technology and entrepreneurship. The city's reputation as a global creative hub provides students with valuable opportunities for collaboration, industry engagement and professional development.",
  ],
  link: 'https://www.wgtn.ac.nz',
  image: `${IMG}/section/3.webp`,
  imageAlt: 'Northeastern University campus',
};

export const cta = {
  heading: 'Ready to Complete Your Degree in New Zealand?\nLet’s Get Started.',
  text: 'Explore how the Victoria University of Wellington Undergraduate Global Pathway can help you gain international exposure, specialise in your chosen design discipline and graduate with a globally recognised Bachelor of Design Innovation degree.',
  bg: `${NYFA}/1.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  'Participation in the Victoria University of Wellington Undergraduate Global Pathway is subject to institutional agreements, program availability, academic eligibility requirements and admissions approval by Victoria University of Wellington and ATLAS SkillTech University. Credit transfer, advanced standing and scholarship eligibility are subject to meeting applicable academic requirements and institutional policies. The Bachelor of Design Innovation degree is awarded solely by Victoria University of Wellington. Students are responsible for complying with all visa, immigration, financial and regulatory requirements applicable to study in New Zealand. Terms and conditions apply.';
