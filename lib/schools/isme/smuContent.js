/*
 * /schools/isme/singapore-management-university — reference/schools/isme/singapore-management-university/
 * index.php, transcribed from the production markup. A Tailwind-Play-CDN landing page on the ISDI partner
 * template (components in app/schools/isme/singapore-management-university/page.js). Image paths are the
 * reference's own files, localised by the extractor's fetch step (byte-for-byte; three reuse files already
 * in public/ by SHA-1).
 */
const P = '/assets/images/schools/isme/pages/site';

export const hero = {
  title: 'ATLAS ISME Semester Abroad Program with Singapore Management University',
  subtitle: 'Study a Semester Abroad in Singapore, Asia’s Leading Hub for Business, Innovation & Global Enterprise',
  desktop: `${P}/smu/hero-banner/desk.jpg`,
  mobile: `${P}/smu/hero-banner/mob.png`,
  /* both authored with the Leeds page's alt text, "Tower Bridge London at night" - transcribed */
  alt: 'Tower Bridge London at night',
};

/* the four panels; washes are `eligible-bg-1/2/3` (the second is the homepage's mission background) */
export const strip = [
  { eyebrow: 'Study in Singapore', title: 'Leading Hub for Business, Finance & Innovation', bg: '#0c1f4b', image: '/assets/images/schools/isme/bba/eligible-bg-1.png' },
  { eyebrow: 'Exclusively for ATLAS ISME Students', title: 'Credit-Bearing semester abroad', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
  { eyebrow: 'Create Global impact with an', title: 'Immersive International Learning Experience', bg: '#0a2466', image: '/assets/images/schools/isme/bba/eligible-bg-3.png' },
  { eyebrow: 'Global Creative Community', title: 'Students from 50+ Nationalities', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
];

export const intro = {
  heading: 'The ATLAS ISME × Singapore Management University Semester Abroad Program',
  paragraphs: [
    'The Singapore Management University (SMU) semester abroad Program offers ATLAS ISME students the opportunity to spend a semester or year studying in Singapore, one of Asia\'s most dynamic centres for business, finance, technology and entrepreneurship.',
    'Students undertake a full-time semester of study at Singapore Management University while remaining enrolled at ATLAS SkillTech University. Academic credits earned during the semester abroad may be transferred towards their ATLAS degree, subject to prior academic approval and institutional requirements.',
    'Recognised globally for its innovative teaching approach and strong industry integration, SMU provides students with access to a world-class academic environment, multicultural learning experiences and valuable exposure to Asia\'s rapidly evolving business ecosystem.',
  ],
  image: `${P}/smu/section/1.png`,
  imageAlt: 'ATLAS students walking near Devon House',
};

const stack = (base) => ({ src: `${base}/759.png`, srcSet: `${base}/500.png 500w, ${base}/759.png 759w` });

/* "How This Pathway Works" - the page's own PHP array; the first card's photograph is the ISDI Parsons page's */
export const stackCards = [
  {
    ...stack(`${P}/parsons-lp/scroll-con/1`),
    bg: '#1947b8',
    title: 'Study Your BBA at ATLAS ISME',
    intro: 'Begin your undergraduate journey at ATLAS ISME through a future-focused BBA program that combines academic rigour, industry exposure and experiential learning.',
    items: [
      'Build foundations in business, management, marketing, strategy and entrepreneurship',
      'Learn through case studies, projects, simulations and applied assignments',
      'Develop analytical, communication and problem-solving skills for global business contexts',
      'Gain exposure to industry engagement, masterclasses and experiential learning opportunities',
    ],
  },
  {
    ...stack(`${P}/smu/scroll-con/1`),
    bg: '#1947b8',
    title: 'Semester at Singapore Management University | Singapore',
    intro: 'Spend a semester in Year 2 at Singapore Management University, one of Asia’s leading universities, while gaining international academic exposure and credits that contribute to your undergraduate journey at ATLAS.',
    items: [
      'Study at a globally respected university in Singapore’s dynamic business ecosystem',
      'Access business, management and interdisciplinary courses in an international classroom',
      'Experience interactive, seminar-style learning and a globally connected student environment',
      'Learn alongside students from diverse academic and cultural backgrounds',
    ],
  },
  {
    ...stack(`${P}/smu/scroll-con/2`),
    bg: '#0a1f5c',
    title: 'Transfer Credits Towards Your Degree',
    intro: 'Upon successful completion of the semester abroad program and academic approval, eligible credits may be transferred towards your ATLAS degree.',
    items: [
      'Maintain academic progression while studying abroad',
      'Strengthen your profile through international learning',
      'Gain exposure to global business practices and perspectives',
      'Build intercultural communication and collaboration skills',
      'Develop a globally relevant academic profile',
    ],
  },
  {
    ...stack(`${P}/smu/scroll-con/3`),
    bg: '#1947b8',
    title: 'International Learning Experience',
    intro: 'Make the most of your semester abroad through immersive academic and cultural exposure in one of Asia’s most dynamic education and business hubs.',
    items: [
      'Experience student life in Singapore’s global university ecosystem',
      'Learn in a diverse classroom with local and international peers',
      'Build cross-cultural awareness and global confidence',
      'Explore interdisciplinary perspectives beyond the classroom',
      'Return to ATLAS with broader academic and international exposure',
    ],
  },
];

export const eligibility = {
  heading: 'Eligibility Requirements',
  lead: 'To be eligible for the Visiting Student Programme, applicants must meet the following criteria.',
  items: [
    'Completed at least one academic year of undergraduate studies before commencing studies at SMU',
    'Remain a registered undergraduate student at ATLAS SkillTech University throughout the period of study at SMU',
    'Possess a minimum cumulative GPA of 3.0 on a 4.0 scale (or equivalent)',
    'Meet SMU’s English language proficiency requirements',
    'Be nominated or supported by ATLAS SkillTech University where applicable',
  ],
};

/* "Courses at SMU" - the icon paths are the page's own inline SVG */
export const courses = {
  headingLead: 'Courses at ',
  headingAccent: 'Singapore Management University',
  intro: 'Students may typically choose from a wide range of undergraduate courses, subject to prerequisites and availability across the following areas:',
  areas: [
    { name: 'Business & Management', icon: 'M3 21h18M5 21V7l8-4v18M19 21V11l-6-4', subs: ['Business Management', 'Entrepreneurship', 'Marketing', 'Operations Management', 'Organisational Behaviour', 'Strategy'] },
    { name: 'Finance & Accountancy', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', subs: ['Corporate Finance', 'Investments', 'Banking', 'FinTech', 'Financial Accounting', 'Auditing', 'Taxation'] },
    { name: 'Economics', icon: 'M3 17l6-6 4 4 8-8M21 7v5m0-5h-5', subs: ['Microeconomics', 'Macroeconomics', 'International Economics', 'Financial Economics'] },
    { name: 'Computing & Analytics', icon: 'M3 4h18v12H3zM8 20h8m-4-4v4', subs: ['Business Analytics', 'Information Systems', 'Data Analytics', 'Digital Technologies'] },
    {
      name: 'Social Sciences & Interdisciplinary Studies',
      icon: 'M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20c0-3.3 3.6-5 8-5s8 1.7 8 5',
      subs: ['Psychology', 'Sociology', 'Political Science', 'Sustainability', 'Innovation', 'Technology & Society', 'Asian Studies'],
    },
  ],
  note: 'Course availability may vary by semester and is subject to prerequisites and seat availability.',
};

export const whoCanApply = {
  heading: 'Who Can Apply',
  text: 'Current second-year ATLAS ISME (BBA) students may be eligible to explore the Singapore Management University semester abroad Program, subject to academic approval, GPA requirements and program availability.',
  image: `${P}/smu/section/2.png`,
};

export const why = {
  heading: 'Why Choose This Pathway?',
  cards: [
    { title: 'Study at a Globally Recognised Institution', text: 'Singapore Management University is internationally recognised for excellence in teaching, research and industry engagement across business, economics, finance, social sciences, law and technology-related disciplines.' },
    { title: 'Experience an Interactive Learning Environment', text: 'SMU\'s seminar-style pedagogy encourages active participation, discussions, presentations and project-based learning, creating a highly engaging classroom experience.' },
    { title: 'Study in Asia\'s Leading Business Hub', text: 'Located in the heart of Singapore, students gain exposure to one of the world\'s most connected economies and a thriving ecosystem of multinational corporations, startups and innovation-driven enterprises.' },
    { title: 'Build a Global Network', text: 'Learn alongside students from diverse cultural and academic backgrounds while developing valuable international connections and cross-cultural competencies.' },
  ],
};

export const pathwayFor = {
  heading: 'Who Is This Program For',
  cards: [
    { image: `${P}/smu/slide-section/1.png`, text: 'Students seeking international exposure while continuing their ATLAS degree' },
    { image: `${P}/smu/slide-section/2.png`, text: 'Students interested in gaining insights into Asian business and innovation ecosystems' },
    { image: `${P}/smu/slide-section/3.png`, text: 'Students looking to experience a globally recognised and industry-focused learning environment' },
    { image: `${P}/smu/slide-section/4.png`, text: 'Students who wish to develop intercultural communication and leadership skills' },
    { image: `${P}/smu/slide-section/5.png`, text: 'Students seeking to build international networks and enhance their global employability' },
  ],
};

export const about = {
  heading: 'About Singapore Management University',
  icon: `${P}/global-pathway/about/building-icon.png`,
  paragraphs: [
    'Singapore Management University (SMU) is one of Asia’s leading universities, internationally recognised for excellence in business and management education, research and industry engagement. Known for its interactive seminar-style teaching, small class sizes and emphasis on active learning, SMU offers students a dynamic and globally relevant academic environment.',
    'Located in the heart of Singapore’s central business district, SMU gives students access to one of the world’s most vibrant business and innovation hubs. With a multidisciplinary academic ecosystem, strong industry connections and a diverse student community, the university provides an ideal setting for students to grow academically, professionally and personally.',
  ],
  link: 'https://www.smu.edu.sg',
  image: `${P}/smu/section/3.png`,
  /* authored "Northeastern University campus" (the page it was cloned from) - transcribed */
  imageAlt: 'Northeastern University campus',
};

export const cta = {
  heading: 'Ready to Experience a Semester in Singapore?\nLet\'s Get Started.',
  text: 'Explore how the Singapore Management University semester abroad Program can help you gain international exposure, broaden your business perspective and enrich your academic journey through a transformative global learning experience.',
  apply: 'https://atlasuniversity.edu.in/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
  bg: `${P}/global-pathway/ready-to-begin/1.png`,
};

export const disclaimer =
  'Participation in the Singapore Management University semester abroad Program is subject to institutional agreements, program availability, academic eligibility requirements and admissions approval by Singapore Management University and ATLAS SkillTech University. Academic credits earned during the semester abroad are subject to prior approval and transfer regulations of ATLAS SkillTech University. Students remain responsible for complying with all visa, immigration, travel, health insurance and regulatory requirements applicable to international study in Singapore. Program offerings, course availability and academic regulations may change at the discretion of Singapore Management University. Terms and conditions apply.';
