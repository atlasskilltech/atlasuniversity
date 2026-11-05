/*
 * /advantages/partnership/international-faculty — content, transcribed from
 * reference/advantages/partnership/international-faculty.php (production identical, 2026-10-31).
 * Assets mirror production's own paths under public/.
 *
 * Two `atlas-global/wp-content` refs on this page answer 403 for every visitor (the whole
 * `/atlas-global/` path does, with the homepage as its body) and are not reproduced:
 *   - Rajesh Bhargave's Imperial College logo — production paints a 6px white sliver (the padding of
 *     an empty broken image). An Imperial mark exists locally for /master-progression, but it is a
 *     different file, so it is not substituted.
 *   - the news banner's photograph — production paints a 20px broken-image box.
 */

const H = '/assets/images/advantages/partnership/international-faculty/';
const W = `${H}the-world-comes-to-atlas/`;
const L = '/assets/images/internationalisation-logo/';
/* 12 of production's `internationalisation-logo/*` marks are byte-identical (SHA-1) to files already
   in public/ for /advantages/atlas-internationalisation, so those are reused from there */
const P = '/assets/images/international/partners/';

export const hero = {
  title: 'International Faculty',
  text: 'Bringing World Class Expertise to Your Classroom',
  src: `${H}herobanner/1366.png`,
  srcSet: `${H}herobanner/500.png 500w, ${H}herobanner/800.png 800w, ${H}herobanner/1080.png 1080w, ${H}herobanner/1366.png 1366w`,
  alt: '',
};

/* `.top-cards-wrapper` — figure first (StatBand `figure`: first slot is `label`); the same
   `.atlas-bg-1/2/3` washes as the other partnership pages */
const BG = {
  1: { background: '#41418e', image: '/assets/images/campus/stats/vector-atlas-1.png', imagePosition: '100%' },
  2: { background: '#2e3074', image: '/assets/images/campus/stats/vector-atlas-2.png', imagePosition: '100%' },
  3: { background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-3.png', imagePosition: '100% 0' },
};
export const stats = [
  { label: '200+', value: 'International Faculty Hosted', ...BG[1] },
  { label: '120+', value: 'Global Universities Represented', ...BG[3] },
  { label: '600+', value: 'Global Learning Sessions', ...BG[2] },
  { label: '5,000+', value: 'Students Engaged', ...BG[3] },
];

/* The second paragraph is followed by an authored stray "." line, which production renders after a
   space — transcribed as authored. */
export const story = {
  heading: 'About International Faculty',
  image: `${H}section-1/688.png`,
  text:
    'At ATLAS, excellence knows no boundaries. International Faculty at ATLAS comprises distinguished scholars and practitioners hailing from diverse corners of the world, each bringing a wealth of expertise and cultural perspectives to our academic community. With a rich tapestry of backgrounds and specializations, our international faculty members are not only educators but also mentors, guiding students towards becoming forward-thinking innovators and global trailblazers.\n\n'
    + 'Through our immersive educational environment, students have the unique opportunity to engage with global thought leaders, gaining invaluable insights and experiences that transcend traditional classroom boundaries. As ambassadors of global knowledge and collaboration, our international faculty inspire a culture of curiosity, inclusivity, and collaboration, empowering students to thrive in today’s interconnected world. .',
};

/* "The World Comes to ATLAS" — `$facultyData`, 24 entries in authored order. `university` is only
   printed in a commented-out line upstream; it is kept here as the image alt. */
export const facultyHeading = 'The World Comes to ATLAS';
export const faculty = [
  { name: 'Ramesh Raskar', university: 'MIT - Massachusetts Institute of Technology', image: `${W}1.jpg`, logo: `${L}massachusetts.png` },
  { name: 'Rajesh Bhargave', university: 'Imperial College', image: `${W}2.jpg`, logo: null },
  { name: 'Jeoffrey Garrett', university: 'The Wharton School', image: `${W}3.jpg`, logo: `${L}wharton.png` },
  { name: 'Vikram Bhaku', university: 'University of Melbourne', image: `${W}4.jpg`, logo: `${L}melbourne.png` },
  { name: 'Rahat Munir', university: 'Macquarie University', image: `${W}6.jpg`, logo: `${P}macquarie-university.png` },
  { name: 'Anindya Ghose', university: 'New York University, Stern', image: `${W}7.jpg`, logo: `${L}nyu-stern.png` },
  { name: 'Martin Ihrieg', university: 'New York University, SPS', image: `${W}8.jpg`, logo: `${P}nyu.png` },
  { name: 'Ian Nabney', university: 'University of Bristol', image: `${W}23.jpg`, logo: `${P}bristol-university.png` },
  { name: 'Maya Cara', university: 'University College London', image: `${W}25.jpg`, logo: `${L}ucl.png` },
  { name: 'Stephen Brammer', university: 'University of Bath', image: `${W}9.jpg`, logo: `${P}university-of-bath.png` },
  { name: 'Emily Huggard', university: 'Parsons, The New School', image: `${W}10.jpg`, logo: `${P}parsons-new-school.png` },
  { name: 'Dr. Carolina Ramirez-Figueroa', university: 'Royal College of Art', image: `${W}11.jpg`, logo: `${L}royal.png` },
  { name: 'Kate Scully', university: 'University of the Arts London', image: `${W}12.jpg`, logo: `${P}arts-london.png` },
  { name: 'Mark Lee', university: 'University of Birmingham', image: `${W}13.jpg`, logo: `${L}birmignham.png` },
  { name: 'Chico Camargo', university: 'University of Exeter', image: `${W}14.jpg`, logo: `${P}exeter.png` },
  { name: 'Viren Lall', university: 'London Business School', image: `${W}15.jpg`, logo: `${L}lbs.png` },
  { name: 'Maken Payne', university: 'Savannah College of Art and Design (SCAD)', image: `${W}16.jpg`, logo: '/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/scad.png' },
  { name: 'Steven Mcguire', university: 'University of Sussex', image: `${W}17.jpg`, logo: `${P}university-of-sussex.png` },
  { name: 'Alexandra Bardez', university: 'University of Glasgow', image: `${W}18.jpg`, logo: `${L}glasgow.png` },
  { name: 'Eloise Salter', university: 'Nottingham Trent University', image: `${W}19.jpg`, logo: `${P}nottingham-university.png` },
  { name: 'Simone Varotto', university: 'University of Reading', image: `${W}20.jpg`, logo: `${P}reading.png` },
  { name: 'Bob Townsley', university: 'University of York', image: `${W}21.jpg`, logo: `${P}york.png` },
  { name: 'Heidi Neck', university: 'Babson College', image: `${W}22.jpg`, logo: `${P}babson.png` },
  { name: 'Lorenzo Morganti', university: 'Politecnico di Milano, Italy', image: `${W}24.jpg`, logo: `${L}politechnico.png` },
];

/* Both video sections author the same paragraph word for word (an upstream copy-paste). */
const VIDEO_TEXT =
  'ATLAS SkillTech University hosts the International Faculty Week, bringing academic leaders from top International Universities to our Mumbai campus. This event showcased our commitment to global learning and cross-cultural exchange, with faculty delivering over 350 hours of teaching. Nearly 300 ATLAS students benefited from masterclasses, lectures, and workshops providing insights into cutting-edge subjects.';
export const facultyWeek = { heading: 'International Faculty Week', text: VIDEO_TEXT, youtubeId: 'RhF0AWFc1e0' };
export const masterClasses = { heading: 'International Faculty Master Classes', text: VIDEO_TEXT, youtubeId: 'VDjQPSBlTgY' };

/* `section.section > section.bg-[#f5f5f5]` — the Mint feature. Its photograph is a dead ref (above). */
export const news = {
  badge: '19 Jan 2023',
  date: '19.01.2023',
  title: 'ATLAS SkillTech University Brings Leading International Faculty To Mumbai Campus',
  href: 'https://atlasuniversity.edu.in/news/atlas-international-faculty-week-gets-featured-in-mint/',
  cta: 'Read More',
};

/* "Faculty Testimonials" — the six student videos /global-immersions also uses (same files), in this
   page's order. */
const T = '/assets/images/advantages/partnership/global-immersions/testimonials/';
export const testimonialsLead =
  "Through strategic global associations spanning continents, our students gain invaluable exposure via international immersions, student exchanges, and masterclasses. This global learning experience at ATLAS equips students with the insights and confidence to make informed decisions, inspiring them to pursue master's programs at top-ranked universities and institutions worldwide.";
export const testimonials = ['keyan-dantra', 'mihika-firani', 'sumeiya-khan', 'aishwarya-alamelu', 'rushil-jhaveri', 'vanshika-modi'].map(
  (s) => ({ sources: [`${T}${s}/1.mp4`], poster: `${T}${s}/1.png` }),
);
