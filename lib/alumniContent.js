/*
 * /atlas-alumni-corner — copy transcribed 1:1 from reference/atlas-alumni-corner.php, in the
 * order it declares its blocks. Upstream typos ("ATLAS- alumni", "pending orfar-fetched",
 * "Masterclass:Insiya") are kept as authored. Every image is a local copy of the CDN original,
 * byte-for-byte (public/assets/images/alumni/); shared files are reused from where they already
 * live (the stat vectors from /campus-atlas, the quote icon, the search panel's wash and glyph).
 */
const A = '/assets/images/alumni';

export const hero = {
  title: 'Alumni Corner',
  text: 'The Alumni Corner—where stories, journeys, and successes of the A-Tribe live on. Stay connected, get inspired, and celebrate the achievements of our vibrant ATLAS- alumni community.',
  image: {
    src: `${A}/alumini-image.webp`,
    srcSet: `${A}/alumini-image-p-500.webp 500w, ${A}/alumini-image-p-800.webp 800w, ${A}/alumini-image-p-1080.webp 1080w, ${A}/alumini-image.webp 1366w`,
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

export const stats = [
  { label: 'ATLAS Alumni Network', value: '6,700+', background: '#41418e', image: '/assets/images/campus/stats/vector-atlas-1.png', imagePosition: '100%' },
  { label: 'Students From Everywhere', value: '50+ Cities', background: '#2e3074', image: '/assets/images/campus/stats/vector-atlas-2.png', imagePosition: '100%' },
];

export const connect = {
  heading: 'The ATLAS \nAlumni Connect',
  text: 'The ATLAS ISME Alumni Association is more than just a network—it\'s a thriving community that stays connected long after graduation. Built on shared experiences and collective ambition, it brings together graduates from across the globe to support, mentor, and grow with one another. Whether through professional collaborations, mentorship programs, or reunions, the association ensures that the A-Tribe remains a lifelong connection.',
  image: {
    src: `${A}/alumini-image-1.webp`,
    srcSet: `${A}/alumini-image-1-p-500.webp 500w, ${A}/alumini-image-1.webp 813w`,
    sizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 813px',
    alt: '',
  },
};

export const initiatives = {
  heading: 'Alumni-Led Initiatives & Activities',
  sub: 'Alumni-led programs that inspire, connect, and give back to the ATLAS community.',
  slides: [
    { title: 'Football Match', image: { src: `${A}/alumini-image-2.webp`, srcSet: `${A}/alumini-image-2-p-500.webp 500w, ${A}/alumini-image-2.webp 800w`, sizes: '(max-width: 800px) 100vw, 800px', alt: '' } },
    { title: 'Alumni Dinner', image: { src: `${A}/alumni-dinner.png`, srcSet: `${A}/alumni-dinner-p-500.png 500w, ${A}/alumni-dinner.png 600w`, sizes: '(max-width: 600px) 100vw, 600px', alt: '' } },
    { title: 'Alumni Masterclass:Insiya Nashiwala', image: { src: `${A}/insiyaatlas.png`, srcSet: `${A}/insiyaatlas-p-500.png 500w, ${A}/insiyaatlas.png 800w`, sizes: '(max-width: 600px) 100vw, 600px', alt: '' } },
    { title: 'Alumni Masterclass:Anik Jain', image: { src: `${A}/anikjainatlasss.png`, srcSet: `${A}/anikjainatlasss-p-500.png 500w, ${A}/anikjainatlasss.png 800w`, sizes: '(max-width: 600px) 100vw, 600px', alt: '' } },
  ],
};

export const talks = {
  heading: 'Alumni Talks',
  sub: 'Alumni share their professional journeys, successes, and lessons learned. Students gain mentorship and practical insights to navigate their own career paths.',
  columns: [
    [`${A}/i-m-grid-1.png`, `${A}/i-m-grid-2.png`],
    [`${A}/i-m-grid-3.png`, `${A}/i-m-grid-4.png`],
    [`${A}/i-m-grid-5.png`, `${A}/i-m-grid-6.png`],
    [`${A}/i-m-grid-7.png`, `${A}/i-m-grid-8.png`],
  ],
};

/* `.title-txt-grid` holds a bare string on three cards and a `<strong>` on five — the run form
   renders the bold explicitly (the caption is 500, so Preflight's `bolder` would give 700 too,
   but the run keeps the authored markup visible in the data). */
const achiever = (name, img, caption) => ({ name, caption, image: { src: `${A}/${img}`, alt: '' } });
export const achievers = {
  heading: 'Alumni Achievers',
  sub: 'Celebrating our alumni shaping tomorrow',
  cards: [
    achiever('Khushi Doshi', 'khushidoshiatlas.png', 'Sorric Media'),
    achiever('Parth Gaggar', 'parthgaggaratlas.png', 'Works @ Netflix'),
    achiever('Jai Shah', 'jaishahatlas.png', [{ strong: 'Founder Orangutan' }]),
    achiever('Aryan Gandhi', 'aryanatlas.png', [{ strong: 'Founder drnk' }]),
    achiever('Anik Jain', 'anikatlas.png', [{ strong: 'Founder DZNIR' }]),
    achiever('Dhwani Bhanushali', 'dhvaniatlas.png', 'Go-to-co'),
    achiever('Saumya Khanna', 'saumyaatlass.png', [{ strong: 'Works at Jigsaw Productions' }]),
    achiever('Chehal Khanna', 'chehalatlas.png', [{ strong: 'Works at Schbang' }]),
  ],
};

const uni = (img, caption) => ({ caption, icon: { src: `${A}/location.svg`, alt: '' }, image: { src: `${A}/${img}`, alt: '' } });
export const universities = {
  heading: 'Our alumni at universities around the world',
  cards: [
    uni('group-1272631408.png', 'NTU'),
    uni('group-1272631409.png', 'NTU'),
    uni('group-1272631410.png', 'University of Oxford'),
    uni('group-1272631416.png', 'King’s College'),
    uni('group-1272631412.png', 'LSE'),
    uni('group-1272631417.png', 'Golden Gate University'),
    uni('group-1272631414.png', 'Loughborough University'),
    uni('group-1272631415.png', 'University of Bath'),
  ],
};

export const sprect = {
  heading: 'SPRECT: Super Connect',
  text: 'Sprect means ‘super connect’—and at its core, it’s about making the impossible feel effortless. We bring you closer to the people who once seemed out of reach—industry leaders, experts, mentors, or collaborators you’ve always wanted to speak with but never knew how. Through secure and private 1:1 conversations, Sprect enables powerful knowledge-sharing and meaningful exchanges that were once pending orfar-fetched.',
  image: {
    src: `${A}/alumini-image-3.webp`,
    srcSet: `${A}/alumini-image-3-p-500.webp 500w, ${A}/alumini-image-3-p-800.webp 800w, ${A}/alumini-image-3.webp 828w`,
    sizes: '(max-width: 767px) 100vw, (max-width: 991px) 727.984375px, 828px',
    alt: '',
  },
};

const mentor = (name, img) => ({ name, course: 'BBA in Finance', batch: 'Batch of 2024', image: { src: `${A}/${img}`, alt: '' } });
export const mentors = {
  heading: 'Your Mentors. Your Super Connect.',
  cards: [
    mentor('Jai Shah', 'career-1.png'),
    mentor('Disha Vasa', 'career-2.webp'),
    mentor('Harsh Rohira', 'harsh-rohira.png'),
    mentor('Ayushi Shah', 'ayushi-shah.png'),
  ],
};

export const circle = {
  heading: 'What Makes the Alumni Circle Matter',
  sub: 'Join a vibrant global community of ISME graduates',
  cards: [
    { title: 'Stay Connected', subtitle: 'Where Your Network Grows Beyond Graduation', desc: 'Connect with alumni worldwide and grow your personal and professional network through exclusive events, reunions, and meaningful engagements.', image: { src: `${A}/alumni-c1.webp`, alt: '' } },
    { title: 'Exclusive Benefits', subtitle: 'Support and Perks That Stay With You', desc: 'Enjoy continued access to career services, alumni mentorship, and job placement support—along with exclusive perks like discounts on campus facilities, official merchandise, and partner offerings.', image: { src: `${A}/alumni-c2.webp`, alt: '' } },
    { title: 'Make an Impact', subtitle: 'Inspire Futures by Giving Back to Your Roots', desc: 'Give back by supporting scholarships, research, and university-led initiatives that impact future generations. Share your expertise through mentoring, guest lectures, or panel discussions.', image: { src: `${A}/alumni-c3.png`, alt: '' } },
  ],
};

/* `.stname.isdi` holds the name and `.st-course` only the batch — no `<strong>` company line */
const voice = (stname, name, img, text) => ({
  stname, name, text,
  image: { src: `${A}/${img}`, alt: '' },
  quoteIcon: '/assets/images/leadership-team/quote-icon.svg',
  bgImage: '/assets/images/campus/stats/vector-atlas-2.png',
});
export const voices = {
  heading: 'What Our Alumni Say',
  sub: 'Experiences That Speak for Themselves',
  cards: [
    voice('Lavanya Gulati', 'Batch of 2020', 'alumni-testimonial.png', 'I got to work on real shoots and brand projects in my second year. It’s not just classes—it feels like the industry already.'),
    voice('Harikesh Ramji', 'Batch of 2021', 'alumni-testimonial-2.png', 'The industry exposure, hands-on projects, and mentorship at ISME truly prepared me to launch my own venture'),
    voice('Harsh Bhatt', 'Batch of 2022', 'harshbhatt.png', 'Life after university has been an adventure and really fun. I’ve become prepared to face all the challenges.'),
    voice('Param Suru', 'Batch of 2022', 'paramsuru.png', 'Life after university has been an adventure and really fun. I’ve become prepared to face all the challenges.'),
  ],
};

export const faq = {
  heading: 'Questions? We can read your mind',
  items: [
    { q: 'How many alumni are part of the ATLAS Alumni Network?', a: 'ATLAS SkillTech University has a growing alumni network of 6,700+ graduates across 50+ cities in India and abroad. Alumni stay connected through reunions, mentorship programs, masterclasses, and professional collaborations.' },
    { q: 'What is SPRECT and how does it help ATLAS students and alumni connect with mentors?', a: 'SPRECT, or Super Connect, is ATLAS\'s exclusive alumni mentorship platform. It enables private 1:1 conversations between students and industry leaders, alumni, and experts, making mentorship more accessible.' },
    { q: 'What benefits do ATLAS alumni get after they graduate?', a: 'ATLAS alumni continue to receive career services, mentorship, and job placement support after graduation. They also get access to exclusive perks, networking events, reunions, and alumni gatherings.' },
    { q: 'Do ATLAS alumni go on to study at international universities?', a: 'Yes. ATLAS alumni have progressed to postgraduate programs at universities including NTU Singapore, Oxford, King\'s College London, LSE, Loughborough University, and the University of Bath, supported by ATLAS\'s international partnerships and progression pathways.' },
    { q: 'How can current ATLAS students learn from alumni through mentorship, talks, or masterclasses?', a: 'Students can participate in Alumni Talks and Alumni Masterclasses, where graduates share their career journeys, experiences, and practical insights. These sessions help students understand different career paths and learn directly from alumni.' },
    { q: 'How can ATLAS alumni give back to the university community?', a: 'Alumni can contribute through mentorship, guest lectures, panel discussions, scholarships, research, and university initiatives. Alumni events and activities also help keep the wider ATLAS community connected.' },
    { q: 'Is there an official ATLAS Alumni Association, and how is it different for each school?', a: 'Yes. The ATLAS Alumni Corner highlights the ATLAS ISME Alumni Association, a community that keeps ISME graduates connected after graduation through professional collaborations, mentorship programs, reunions, and other engagements.' },
  ],
};

/* more-questions.php with `$chatBxText = "More questions?"` and the blue variant */
export const search = {
  label: 'More questions?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};
