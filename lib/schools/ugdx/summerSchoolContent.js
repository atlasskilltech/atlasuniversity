import { faq as isdiFaq } from '@/lib/designInnovationContent';

/**
 * uGDX Summer School (Technology) — reference/ugdx/summerschool.php, checked against production
 * (https://atlasuniversity.edu.in/schools/ugdx/summerschool, 2026-11-03): the mirror's markup, text and
 * images are current. Images are the reference's own files copied byte-for-byte into
 * public/assets/images/schools/ugdx/summerschool/; the four Career Pathways cards are byte-identical
 * to the uGDX homepage's and reuse those files.
 *
 * Transcribed as authored: the "…Build Your Futur" heading, "Artifical", the empty space in
 * "Explore the Unknown  Imagine to Solve!", "DAY 3:Smart" / "DAY 8:Assembly" and the double space in
 * "Robotic  Rover" (HTML collapses both doubles).
 */

const IMG = '/assets/images/schools/ugdx/summerschool';
const HOME = '/assets/images/schools/ugdx/home';

export const meta = {
  title: 'ISDI Design Summer School in Mumbai | Atlas UGDx',
  description:
    'Join the ISDI design summer school at Atlas UGDx, Mumbai — the go-to design summer school in India for students exploring creativity and innovation.',
};

export const url = 'https://atlasuniversity.edu.in/schools/ugdx/summerschool';

/* the brochure button beside "Apply Now" is commented out upstream; `$edudomain` is empty, so the
   authored `summertech` resolves to production's /summertech, which this port does not build */
export const hero = {
  title: 'A Summer of \nTechnology & \nInnovation',
  image: {
    src: `${IMG}/hero-banner-img.png`,
    alt: 'Students assembling robotic arm components in classroom',
    sizes: '(max-width: 1366px) 100vw, 1366px',
  },
  buttons: [{ label: 'Apply Now', href: 'https://atlasuniversity.edu.in/summertech', primary: true, variant: 'ugdx' }],
};

export const stats = [
  { label: 'Eligibility', value: 'Grade 9–12 students /  UG aspirants', background: '#011627', image: '/assets/images/schools/ugdx/programs/ugdx-card-bg-1.png', imagePosition: '100%', labelColor: '#eb1f3c' },
  { label: 'Next Batch', value: ' 19th May to 29th May 2027', background: '#02101c', image: '/assets/images/schools/ugdx/programs/ugdx-card-bg-2.png', imagePosition: '100%', labelColor: '#eb1f3c' },
  { label: 'Duration', value: '2 Weeks', background: '#011627', image: '/assets/images/schools/ugdx/programs/ugdx-card-bg-1.png', imagePosition: '100%', labelColor: '#eb1f3c' },
];

export const about = {
  heading: 'About uGDX \nSummer School',
  text:
    'The ATLAS uGDX School of Technology is the youngest member of the ATLAS family, collaborating with the School of Design and the School of Management and  Entrepreneurship. Based on a new-age tech-enabled environment, the program nurtures and prepares professionals in digital technology along with laying the foundation of a global leadership.\n\nThe B.Tech program curriculum is designed keeping in mind the ever-evolving scientific and technological breakthroughs. The program focuses on Computer Science, Artifical Intelligence, Machine Learning and Robotics making students ready for the work and workforce of the future.',
  image: {
    src: `${IMG}/section-img-1.png`,
    alt: 'Student experiencing VR headset technology on campus',
    sizes: '100vw',
  },
};

const way = (n) => ({ src: `${IMG}/div-${n}.png`, alt: '', sizes: '(max-width: 683px) 100vw, 683px' });

export const ways = {
  heading: 'Learn New-Age Skills that Empower You To Build Your Futur',
  cards: [
    { num: '01', title: 'Understanding New Age Technologies', text: 'Get a crash course on topics like Artificial Intelligence, Machine Learning, Python Programming, Robotics, IoT , Drones, 3D printing and Neuromorphics.', image: way(1), flip: false },
    /* the authored trailing `<br />‍` (a zero-width joiner on its own line) is a real second line */
    { num: '02', title: 'Be Ready For University!', text: 'Kickstart your journey in understanding new age technologies and get a peek into your future at a Tech School!\n‍', image: way(2), flip: true },
    { num: '03', title: 'Enhance your confidence', text: 'With hands on approach to AI, Robotics and STEAM Competencies build your own working prototypes', image: way(3), flip: false },
    { num: '04', title: 'Build your own Creative Community', text: 'Meet like-minded individuals to network, collaborate and co-create', image: way(4), flip: true },
  ],
};

/* "Week 1" / "Week 2" in the programme pages' `.quaternary-tabs`; each day is a `.portions` whose
   `.desc-text-1` holds a bulleted list, and the `.h4-subtext` is commented out on both weeks */
export const curriculum = {
  heading: 'A Curriculum Designed for the Future',
  sub: 'Built on the ‘Goal for Each Term’ (GET) philosophy, our curriculum ensures every semester has a clear, outcome-driven focus; continuously evolving with emerging technology trends and the learning needs of our students.',
  years: [
    {
      label: 'Week 1',
      semesters: [
        {
          title: 'Explore the Unknown  Imagine to Solve!',
          subtitle: null,
          text: 'Students will learn basic electronics, microcontrollers, programming, and STEM skills by building circuits, creating 3D structures, assembling systems, and applying AI. They will also design experiments, prototypes, and working models to practically apply classroom theory.',
          subjects: [
            { title: 'DAY 1: Orientation & Hands-On Exploration', items: ['Introduction to the program', 'Explore the mini laboratory', 'Understand IoT, Robotics & Python Programming'] },
            { title: 'DAY 2: Engineering & Embedded Systems', items: ['Dive into Physics, Bio-Engineering & Space Technologies', 'Learn about Embedded Systems'] },
            { title: 'DAY 3:Smart Systems & 3D Printing', items: ['Explore sensors and actuators', 'Learn how programming makes devices functional', 'Introduction to 3D Printing and its applications'] },
            { title: 'DAY 4: The Science of Flight', items: ['Learn aerodynamics behind UAVs & drones', 'Hands-on experience with flight technology'] },
            { title: 'DAY 5: The World Of Steam', items: ['Conduct chemistry experiments', 'Explore battery systems', 'Learn about biophysics'] },
          ],
        },
      ],
    },
    {
      label: 'Week 2',
      semesters: [
        {
          title: 'Know the unknown! \nLearning through fun!',
          subtitle: null,
          text: 'Convert ideas into practically working, hands-on projects; apply multidisciplinary domain knowledge to design, create and build projects from scratch; and develop your own hardware projects such as Mars rovers, Moon rovers, drones, satellites, animations, robots, and software programs for control, communication, computing and security.',
          subjects: [
            { title: 'DAY 6: Design & Build Your Robotic  Rover', items: ['Learn Design Thinking to develop creative solutions', 'Start building your own robot'] },
            { title: 'DAY 7: 3D Printing & Prototyping', items: ['Design and print models in 3D printing lab'] },
            { title: 'DAY 8:Assembly & Embedding Systems', items: ['Assemble your robot using 3D-printed parts', 'Embed electronic mechanism in your robot'] },
            { title: 'DAY 9: Future Technologies & Innovation', items: ['Explore photonics, spintronics, neuron chips & brain-machine interfaces'] },
            { title: 'DAY 10: Showcase & Network', items: ['Present projects to peers & mentors', 'Group discussions & networking'] },
          ],
        },
      ],
    },
  ],
};

/* the lead under "Career Pathways" is commented out upstream */
export const careers = {
  heading: 'Career Pathways',
  sub: null,
  cards: [
    { title: 'Critical Thinking', image: { src: `${IMG}/swiper-img-1.jpg`, alt: 'Researcher analyzing digital brain interface highlighting critical thinking' } },
    { title: 'Divergent Thinking', image: { src: `${HOME}/elective-card-8.png`, alt: 'Analyst viewing data dashboards reflecting divergent thinking approach' } },
    { title: 'Exploratory based Learning', image: { src: `${HOME}/yuky.png`, alt: 'Robotic hand touching digital network symbolizing exploratory based learning' } },
    { title: 'Discovery based Learning', image: { src: `${HOME}/zxc.png`, alt: 'Hand analyzing statistics on tablet reflecting data discovery' } },
    { title: 'Inquiry-based Learning', image: { src: `${HOME}/frame-1272631985.png`, alt: 'Robotic hand with AI icon representing inquiry based learning' } },
  ],
};

export const typicalDay = {
  heading: 'Typical Day at the \nSummer Tech School',
  text:
    'The ATLAS uGDX Summer Tech School focuses on ensuring students find joy in learning and develop holistically in their academic and personal learning. The aim of the Summer Tech School is to provide students a glimpse of the University life and become familiar with career paths that they can choose for themselves in their professional life as they progress.\n\nIn a tech-enabled modern campus with a diverse student and faculty community, each day at the Summer School will introduce the students to a discipline of Technology and give them an experience of the work the discipline entails. We expect the students to be energised and excited with opportunities within the Technology discipline.',
  image: {
    src: `${IMG}/section-img-2.png`,
    alt: 'Close-up of hands working on drone propeller and circuit assembly',
    sizes: '100vw',
  },
};

/* `<strong>Students of Grade 9th - 12th</div>` — the <strong> is never closed upstream (see the page) */
export const eligibility = {
  title: 'Eligibility',
  desc: [{ b: ['Students of Grade 9th - 12th'] }],
  points: [
    { mrgbt32: true, title: 'Application Fee: INR 34,999 + GST', text: 'This fees is strictly non- refundable and is to be paid in full before the commencement of the course.' },
  ],
};

export const intro = [
  'Exposing young students between the 9th and 12th grade to hands-on-learning with a transdisciplinary approach to enhance hard skills and soft skills. The ATLAS uGDX Summer School Program prepares students to step into the world of creativity, design and technology and gives them a peek into their life at the ATLAS uGDX, in the heart of India’s innovation capital – Mumbai.',
  'The Summer Tech School is a powerhouse of idea generation that will enable students to be independent thinkers, and give access to diverse communities, fellow students and cultures that will open their minds to new ways of thinking to tackle global challenges. Students will explore Mumbai as a classroom, enhance life skills and immerse themselves into an introduction to various disciplines of Artificial Intelligence, Machine Learning, Python Programming, Coding, Neural Networks, Computer Vision and Deep Learning from distinguished faculty at ATLAS uGDX.',
];

/* assets/include/faq.php with `$arrow = "ugdx-down-arrow.svg"`: database-driven, and for this URL it
   falls through to FAQ master 1 — the 24-question ISDI set, compared against the rendered production
   page and identical to the set lib/designInnovationContent already transcribes */
export const faq = {
  ...isdiFaq,
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/ugdx-down-arrow.svg',
};
