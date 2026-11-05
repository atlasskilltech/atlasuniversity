/**
 * uGDX "Young Tech Innovators Program" — reference/ugdx/ugdxsummerschool.php, checked against production
 * (https://atlasuniversity.edu.in/schools/ugdx/ugdxsummerschool, 2026-11-03). Every image, the hero clip
 * and the two arrow glyphs are the reference's own files (atlasuniversity.edu.in/wordpress-custom-image/…
 * and the side tab's atlasskilltech.app image), copied byte-for-byte into
 * public/assets/images/schools/ugdx/ugdxsummerschool/ and public/assets/videos/schools/ugdx/.
 *
 * Transcribed as authored, upstream slips included: "Articial Intelligence", "Nerual Networks", the
 * Portfolio Curation copy that opens "his module…", and a carousel whose seven modules are the ISDI
 * design summer school's (photography, interiors, fashion…) on a technology page. `$title` and
 * `$description` are the ATLAS template's placeholders.
 */
const IMG = '/assets/images/schools/ugdx/ugdxsummerschool';

export const meta = {
  title: 'ATLAS SkillTech University',
  description: 'Get in touch with Atlas Skilltech.',
};

export const url = 'https://atlasuniversity.edu.in/schools/ugdx/ugdxsummerschool';

export const hero = {
  video: '/assets/videos/schools/ugdx/makersspaceugdxv2.mp4',
  kicker: 'Young Tech Innovators Program',
  heading: 'An experiential Summer to discover your incredible future',
  stripe: `${IMG}/stripe-ugdx.png`,
  /* the NoPaperForms enquiry widget the page embeds inline (`data-height="441px"`) */
  widget: { id: 'ba02ebdd6e69f93efe35f4c8cfc4aa89', height: '441px' },
};

export const intro = {
  heading: 'EMPOWERING LEARNERS WITH 21ST CENTURY SKILLS',
  text: 'ATLAS SkillTech University is India’s leading new-age urban multidisciplinary university. Founded to forge a path to the future, ATLAS is where the confluence of design, technology, strategy and leadership takes place. We believe in breaking paths and conventions. We are constantly defining, shaping and redefining the future of education in India right here in the heart of an ever-booming, cosmopolitan and enterprising Mumbai.',
};

/* run lists: a string is text, `{ sup }` is the ordinal suffix */
export const batches = {
  heading: 'Your Batch for Summer Tech School 2027',
  cards: [
    { title: ['19', { sup: 'th' }, ' May'], text: ['to 29', { sup: 'th' }, ' May'] },
    { title: ['02', { sup: 'nd' }, ' June'], text: ['to 12', { sup: 'th' }, ' June'] },
  ],
};

export const skills = {
  heading: 'LEARN NEW-AGE SKILLS THAT EMPOWER YOU TO BUILD YOUR FUTURE',
  cards: [
    { image: `${IMG}/understanding.png`, title: 'Understanding New Age Technologies', text: 'Get a crash course on topics like Articial Intelligence, Machine Learning, Python Programming, Coding, Nerual Networks, Computer Vision and Deep Learning' },
    { image: `${IMG}/beready.png`, title: 'Be Ready For University!', text: 'Kickstart your journey in understanding new age technologies and get a peek into your future at a Tech School!' },
    { image: `${IMG}/enhanceyour.png`, title: 'Enhance your Confidence, Soft Skills and Competencies', text: 'Upskill and be confident in public speaking, presentation skills, leadership and storytelling' },
    { image: `${IMG}/buildyourown.png`, title: 'Build your own Creative Community', text: 'Meet like-minded individuals to network, collaborate and co-create' },
  ],
};

/* each slide: the heading and its paragraphs, in the order authored (only some modules open with a
   one-line "Master …" strapline) */
export const modules = [
  { title: 'DIGITAL PHOTOGRAPHY', image: `${IMG}/slider1.jpg`, paragraphs: ['Master composition, emotion and expression captures', 'Photography has become a key form of expression in the Digital Age. This course introduces you to the most important functions and techniques used to create digital photographs with your digital camera. You will experience how to operate the basic and advanced features of your digital camera to take the right shot for specific purposes.', 'Learning Outcomes: Introduction to fashion & product photography for editorial and marketing, Understanding lighting and texture through practical photography and image review.'] },
  { title: 'PERSONAL AND PROFESSIONAL DEVELOPMENT', image: `${IMG}/slider2.jpg`, paragraphs: ['This module will aid students to curate their work into a portfolio. They will also build a strong Statement of Purpose for themselves that will help them in applying to the schools and universities of their choice. It will guide them on ways of seeing, thinking and writing, providing the skills needed to construct and present the right narrative of themselves to the world at large.', 'Learning Outcome: Portfolio building, Portfolio documentation, SOP writing'] },
  { title: 'INTERIORS & BUILT ENVIRONMENTS', image: `${IMG}/slider3.jpg`, paragraphs: ['Master Model Making, Material Exploration, Light, Colour, and Shadow', 'The course aims to introduce students to interior-built environments through the lens of conceptual spaces. Students will explore forms and spaces through illustrations, miniature models and photography that will provide visual evidence of the human-space relationship.', 'Learning Outcomes: Context setting for space, Model making, Material exploration, Lighting application, Miniature model spaces'] },
  { title: 'ANIMATION & CHARACTER DESIGN', image: `${IMG}/slider4.jpg`, paragraphs: ['Master Concept art, Composition and Character Design', 'This course introduces students to the physical and digital aspect of the art of animation. Students will explore visual concepts in storyboarding and character design. The course is build on an experimental approach to teaching and learning animation.', 'Learning Outcomes: Developing narrative, Concept art, Composition study, Basics of movement, Film-Making'] },
  { title: 'FASHION COMMUNICATION AND STYLING', image: `${IMG}/slider5.jpg`, paragraphs: ['Master Fashion Branding, Fashion Futures and Editorial', 'The course helps students to understand and develop fashion and fashion brand. Thought-provoking activities will enlighten young minds to think creatively and critically which will lead to the conscious creation of future fashion.', 'Learning Outcomes: Conscious Design, Fashion styling, Brand creation, Photography'] },
  { title: 'PRODUCT & TECHMECH', image: `${IMG}/slider6.jpg`, paragraphs: ['Master Design Thinking, Prototyping and Form Study', 'The course introduces students to the future of product design and technology. Students will explore research methods, learn the art of creative problem solving and generate solutions within a tech driven environment, to create processes, mock-ups and prototypes.', 'Learning Outcomes: Design Process, Critical thinking, Speculative design, Prototyping'] },
  { title: 'PORTFOLIO CURATION', image: `${IMG}/slider7.jpg`, paragraphs: ['Master Self Awareness, Self Reflection and Self Marketing', 'his module will aid students to curate their work into a portfolio. They will also build a strong Statement of Purpose for themselves that will help them in applying to the schools and universities of their choice. It will guide them on ways of seeing, thinking and writing, providing the skills needed to construct and present the right narrative of themselves to the world at large.', 'Learning Outcome: Portfolio building, Portfolio documentation, SOP writing'] },
];

export const arrows = { next: `${IMG}/next.svg`, prev: `${IMG}/prev.svg` };

export const videos = ['D_wKTzPUAdg', '9NyQSfBPHx0', 'SjOWJF1WtEY'];

export const typicalDay = {
  heading: 'TYPICAL DAY AT THE SUMMER TECH  SCHOOL',
  cards: [
    { title: 'ENGAGE | 9:00 AM - 12:00 PM', text: 'BREAK | 11:15 AM - 11:30 AM' },
    { title: 'IMMERSE | 11:30 AM - 1:30 PM', text: 'Lunch | 1:30 PM - 2:15 PM' },
    { title: 'EXPERIENCE | 2:15 PM - 3:30 PM', text: 'Finish | 3:30 PM' },
  ],
  paragraphs: [
    'The ATLAS | uGDX Summer Tech School focuses on ensuring students find joy in learning and develop holistically in their academic and personal learning. The aim of the Summer Tech School is to provide students a glimpse of the University life and become familiar with career paths that they can choose for themselves in their professional life as they progress.',
    'In a tech-enabled modern campus setting with a diverse student and faculty community, each day at the Summer School will introduce the students to a discipline of Technology and give them an experience of the work the discipline entails. We expect the students to be energised and excited with opportunities within the Technology discipline which is one of the fastest growing industries in the world today.',
  ],
};

/* `.apply-fix` — a fixed tab on the left edge; its "APPLY NOW" is the image itself */
export const applyTab = { href: 'https://www.atlasuniversity.edu.in/summertech/', image: `${IMG}/atlas-app-05.jpg` };
