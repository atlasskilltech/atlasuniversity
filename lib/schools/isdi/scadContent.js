/*
 * Content for /schools/isdi/scad — reference/schools/isdi/scad.php, the second of the six
 * ATLAS ISDI Advantage partner-university landing pages (a Tailwind-Play-CDN page on the
 * shared LP sheet `…68e75059…`; `$body = "body isdi-page"`). Served at the SLASHLESS url (a
 * flat `.php`; the trailing slash 500s). It reuses the nyfa LP template (hero, four-panel
 * strip, intro, sticky stack-cards, why-choose grid/carousel, who-is-this-for grid/carousel,
 * about, CTA, disclaimer) and adds five bespoke sections: SCAD Pro, the SCAD ecosystem bullet
 * panels, an influencer grid + logo marquee, pricing and the U.S. visa advantage. Measured
 * against production; the Bootstrap-vs-Tailwind spacing collision is reproduced by the shared
 * `.lp-bs` block (see `globals.css` / the nyfa CLAUDE.md note).
 */
const IMG = '/assets/images/schools/isdi/scad';
const COMP = '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum';

export const hero = {
  title: 'ISDI Global Experiential Pathway with',
  logo: `${IMG}/logo/scad.webp`,
  subtitle: 'Earn Your B.Des Degree from ISDI and Gain a Global Learning Experience at SCAD, USA',
  desktop: `${IMG}/hero-banner/desk.webp`,
  mobile: `${IMG}/hero-banner/mob.webp`,
};

export const strip = [
  { eyebrow: 'For ISDI Students Only', title: '15 International Academic Credits', bg: '#0c1f4b', image: `${IMG}/eligible-bg-1.webp` },
  { eyebrow: 'Learn at SCAD, USA', title: 'Two Major-Specific SCAD Courses', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
  { eyebrow: 'Real-World Industry Exposure', title: 'Hands-On Studio & Lab Experience', bg: '#0a2466', image: `${IMG}/eligible-bg-3.webp` },
  { eyebrow: 'Build Global Momentum', title: '5-Year U.S. F-1 Visa Support', bg: '#103380', image: '/assets/images/mission/mission-bg.png' },
];

export const intro = {
  heading: 'ATLAS ISDI X SCAD Pro Experiential Learning Pathway',
  blocks: [
    { p: 'The SCAD Pro Experiential Learning Pathway is a flagship international learning opportunity developed for ISDI students in collaboration with Savannah College of Art and Design (SCAD), one of the world’s leading universities for art and design.' },
    { p: 'As part of their undergraduate journey at ATLAS ISDI, selected students will participate in an immersive academic quarter at SCAD Atlanta in the United States. During this experience, students will:' },
    { list: [
      'Study within SCAD’s globally recognised creative ecosystem',
      'Learn alongside international student cohorts',
      'Complete discipline-specific SCAD coursework',
      'Participate in SCAD Pro, SCAD’s flagship industry innovation studio',
      'Work on real-world design and innovation challenges connected to global brands',
    ] },
    /* ref authors a nested `<p><p>…</p></p>` after the list; the browser auto-closes the outer
       at the inner, so production renders an EMPTY `<p>` (0 height, but one more space-y gap)
       followed by the paragraph. Reproduced faithfully. */
    { empty: true },
    { p: 'As part of their undergraduate journey at ATLAS ISDI, selected students will participate in an immersive academic quarter at SCAD Atlanta in the United States. During this experience, students will:' },
  ],
  image: `${IMG}/intro-image.webp`,
  imageAlt: 'ATLAS students walking near Devon House',
};

export const stackCards = [
  {
    bg: '#D20158', base: `${IMG}/scroll-con/1`,
    title: 'YEARS 1–2 | ISDI SCHOOL OF DESIGN AND INNOVATION, MUMBAI',
    intro: 'Build your foundation in design, innovation and creative thinking through:',
    items: ['Industry-led design education', 'Studio-based learning', 'Interdisciplinary collaboration', 'Portfolio development', 'Real-world project exposure'],
    outro: 'Students also prepare for the international SCAD experiential pathway through academic performance, portfolio readiness and creative practice.',
  },
  {
    bg: '#0038B1', base: `${IMG}/scroll-con/2`,
    title: 'YEAR 3 | INTERNATIONAL LEARNING QUARTER AT SCAD ATLANTA, USA',
    intro: 'Selected students experience an immersive quarter at Savannah College of Art and Design as part of their ISDI undergraduate journey.',
    introBreak: 'Academic Experience Includes:',
    items: ['Two major-specific SCAD courses aligned with the student’s discipline', 'SCAD Pro industry studio participation', '15 international academic credits', 'Collaborative learning with global student teams', 'Faculty and industry mentorship'],
    outro: '',
  },
  {
    bg: '#D20158', base: `${IMG}/scroll-con/3`,
    title: 'GRADUATE WITH A DEGREE FROM ATLAS SKILLTECH UNIVERSITY',
    intro: 'Following the SCAD experience, students return to ISDI to complete their undergraduate degree while leveraging:',
    items: ['International academic exposure', 'Global collaborative experience', 'Industry-led portfolio work', 'Enhanced postgraduate readiness', 'Stronger positioning for global creative careers'],
    outro: '',
  },
  {
    bg: '#0038B1', base: `${IMG}/scroll-con/4`,
    title: 'GLOBAL CAREER & POSTGRADUATE ADVANTAGE',
    intro: 'Position yourself for global creative careers with strong international exposure',
    items: ['Benefit from a 5-year U.S. F-1 student visa supported through the program', 'Gain hands-on experience with global brands and real client briefs', 'Build industry-ready skills through collaborative, cross-cultural projects', 'Experience life on campus with housing, facilities and major events such as SCAD AnimationFest'],
    outro: 'Costs are offered under a special study abroad model, with a significant reduction compared to standard tuition. Travel, visa and personal expenses are not included. Visa and work opportunities are subject to prevailing regulations.',
  },
];

export const scadPro = {
  image: `${IMG}/scad-pro-studio.webp`,
  heading: 'SCAD Pro | Industry Innovation Studio',
  lead: 'SCAD Pro is SCAD’s signature collaborative innovation studio where students work on live industry challenges with globally recognised brands.',
  pastLabel: 'Past collaborators have included:',
  pastLogos: [
    { src: `${IMG}/logo/google.webp`, alt: 'Google', cls: 'h-7 md:h-8' },
    { src: `${IMG}/logo/bmw.webp`, alt: 'BMW', cls: 'h-7 md:h-8' },
    { src: `${IMG}/logo/chanel.webp`, alt: 'Chanel', cls: 'h-6 md:h-7' },
  ],
  body: [
    'Students work within multidisciplinary teams to research, conceptualise and develop solutions for real client briefs under professional studio conditions.',
    'A customised SCAD Pro experience will be developed specifically for the ISDI cohort to ensure meaningful participation and immersive learning.',
  ],
};

export const ecosystem = {
  heading: 'Experience the SCAD Creative Ecosystem',
  panels: [
    { titleColor: '#ec1376', title: 'Students gain access to:', dot: '#ec1376', bg: `${COMP}/comp-vector.png`, bgClass: 'bg-[#f6f6f6] bg-contain', corners: 'rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl',
      items: ['SCAD student housing', 'Creative labs and campus facilities', 'International student communities', 'Exhibitions, showcases and networking opportunities', 'Signature SCAD events and experiences'] },
    { titleColor: '#173a87', title: 'Students may also experience:', dot: '#173a87', bg: `${COMP}/comp-vector-2.png`, bgClass: 'bg-[#ededed] bg-cover', corners: 'rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl',
      items: ['SCAD AnimationFest', 'SCAD FASH Museum of Fashion + Film'] },
  ],
};

export const influencers = {
  heading: 'Learn Within a Globally Influential Creative Network',
  cards: [
    { image: `${IMG}/influencer/nathan-engelhardt.webp`, name: 'Nathan Engelhardt', role: 'Supervising Animator, Walt Disney Animation Studios', desc: 'Oscar-nominated animator recognised for Forevergreen & Animation Supervisor on Zootopia 2.', bg: 'bg-isdi-blue', watermark: '/assets/images/schools/isdi/about/search/faq-vector.png' },
    { image: `${IMG}/influencer/christopher-john-rogers.webp`, name: 'Christopher John Rogers', role: 'Luxury Fashion Designer | Founder, Christopher John Rogers', desc: 'Luxury fashion designer whose work has been worn by global icons including Kamala Harris and Lady Gaga', bg: 'bg-isdi-pink', watermark: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/vector.png' },
    { image: `${IMG}/influencer/kate-barton.webp`, name: 'Kate Barton', role: 'Founder & Creative Director, Kate Barton', desc: 'Emerging international fashion designer recognised by Vogue', bg: 'bg-isdi-blue', watermark: '/assets/images/schools/isdi/about/search/faq-vector.png' },
    { image: `${IMG}/influencer/kayli-carter.webp`, name: 'Kayli Carter', role: 'Actor | Film & Television Performer', desc: 'Actor known for Yellowstone and acclaimed film productions', bg: 'bg-isdi-pink', watermark: '/assets/images/schools/isdi/programs/pss/summer-school/highlights/vector.png' },
  ],
  marqueeLead: 'SCAD alumni have also contributed to leading global companies and studios, including:',
  logos: ['disney', 'pixar', 'netflix', 'apple', 'deloitte', 'amazon', 'snapchat', 'nbc', 'warner-bros', 'nike', 'bmw', 'mattel', 'gucci', 'loreal', 'ralph-lauren', 'hermes', 'kendra-scott'].map((n) => ({ src: `${IMG}/logo/${n}.webp`, alt: n })),
};

export const why = {
  heading: 'Why Choose the SCAD Global Pathway?',
  sub: 'As one of the most comprehensive art and design universities in the world, SCAD provides a unique ecosystem where talent meets industry.',
  cards: [
    { title: 'Global Design Exposure', text: 'Experience an international academic environment during your ISDI journey' },
    { title: 'Industry-Integrated Learning', text: 'Work on real client challenges through SCAD Pro' },
    { title: 'International Portfolio Development', text: 'Build globally relevant creative work before graduation' },
    { title: 'Cross-Cultural Collaboration', text: 'Learn and collaborate with peers from across the world' },
    { title: 'Future Academic & Career Advantage', text: 'Gain early exposure to global academics, professional environments & creative practices' },
  ],
};

export const pathway = {
  heading: 'Who Is This Pathway For?',
  cards: [
    { image: `${IMG}/swiper-section/1.webp`, text: 'Students seeking a globally competitive design education' },
    { image: `${IMG}/swiper-section/2.webp`, text: 'Students aspiring to international careers in design and creative industries' },
    { image: `${IMG}/swiper-section/3.webp`, text: 'Those seeking immersive U.S. design education with industry exposure' },
    { image: `${IMG}/swiper-section/4.webp`, text: 'Students planning a seamless transition to global postgraduate study or creative careers' },
  ],
};

export const pricing = {
  heading: 'Preferred International Pathway Pricing for ISDI Students',
  sub: 'SCAD has extended a preferred international pathway fee structure exclusively for ISDI students participating in this experience.',
  costs: [
    { label: 'Standard SCAD Cost', value: 'Approx. $22,395' },
    { label: 'ISDI Experiential Pathway Cost', value: 'Approx. $12,995' },
  ],
  included: ['Two SCAD academic courses', 'SCAD Pro participation', 'Student housing', 'Meal plan', 'Health insurance'],
  notIncluded: ['International travel', 'Visa fees', 'Personal expenses'],
};

export const visa = {
  heading: 'Additional U.S.\nVisa Advantage',
  points: [
    [{ t: 'Students participating in the pathway will receive support through the ' }, { strong: 'F-1 student visa' }, { t: ' process.' }],
    [{ t: 'May support future ' }, { strong: 'postgraduate study opportunities' }, { t: ' in the United States by helping students establish prior international academic exposure and visa history.' }],
  ],
  disclaimer: 'Visa approvals remain subject to prevailing U.S. immigration regulations.',
};

export const about = {
  heading: 'About Savannah College of Art and Design',
  paragraph: 'Savannah College of Art and Design (SCAD) is a world-leading university renowned for its excellence in creative education, industry-led learning and global outlook. Recognised as one of the foremost institutions for art and design internationally, SCAD combines rigorous academic study with immersive, studio-based practice, ensuring that students gain hands-on creative experience alongside strong conceptual and theoretical foundations. Operating within a dynamic global creative ecosystem, SCAD fosters collaboration, innovation and cross-disciplinary learning across art, design, media and technology. Guided by its mission and values of creativity, positivity, collaboration and transformation, SCAD prepares students who are widely respected for their creative expertise, professional readiness and capacity to lead in complex global creative industries.',
  link: 'https://www.scad.edu/',
  icon: `${IMG}/building-icon.webp`,
  image: `${IMG}/about.webp`,
  imageAlt: 'Savannah College of Art and Design campus',
};

export const cta = {
  heading: 'Ready to Redefine Your Design Future?\nLet’s Get Started.',
  text: 'Get a glimpse where the next generation of global designers are shaped through innovation, industry and inspiration.',
  bg: `${IMG}/cta-bg.webp`,
  apply: '/applicationform',
  visit: 'https://www.atlasuniversity.edu.in/campusvisit/',
};

export const disclaimer =
  'ATLAS SkillTech University does not award foreign degrees and facilitates only the academic pathway and preparatory components. All foreign degree programs, accreditations, rankings, scholarships, visa outcomes and progression opportunities are governed solely by the policies of Savannah College of Art and Design (SCAD) and applicable regulatory authorities and ATLAS SkillTech University does not guarantee any such outcomes. This is not a dual, joint or twinning degree program. Tuition fees are determined by Savannah College of Art and Design (SCAD) and may be revised at its discretion. Terms and conditions apply.';
