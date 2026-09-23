import { IMG } from './paths';

const P = `${IMG}/programs`;
const UG = '/schools/isdi/programs/undergraduate/b-des';

/*
 * ISDI's PathFinder — the quiz under "Our Programs"
 * (assets/include/pathfinder.php markup + the jQuery block at the foot of
 * assets/include/footer.php). Transcribed verbatim: the options, both scoring
 * tables, the seven courses with their colours, and the copy of every step.
 */
export const isdiPathfinder = {
  steps: {
    interests: 'What are 3 things that light you up?',
    dreams: 'Share 3 big dreams you are chasing',
    results: 'Here’s where we think you will shine!',
  },
  finalButton: 'Hit me with the results!',
  startOver: 'Start Over',
  loading: 'Drumroll in progress... your future is loading',
  loadingImage: { src: `${P}/drum-animation.webp`, width: 450, height: 450 },
  nextIcon: `${P}/circle-arrow.svg`,
  resultArrow: `${P}/top-rt-arrow.svg`,
  pick: 3,
  loadingMs: 2500,

  interests: [
    'Making art & craft',
    'Scrolling through Instagram & Pinterest',
    'Mixing bold outfits',
    'Selling my work',
    'Building things from scratch',
    'Playing video games',
    'Rearranging my room',
    'Experimenting with makeup & fashion',
    'Tinkering with apps & gadgets',
    'Telling stories',
    'Daydreaming design ideas',
    'Editing fun reels',
    'Capturing candid moments',
    'Flipping through fashion mags',
    'Doodling in the margins',
    'Curating mood boards',
  ],

  dreams: [
    'Push boundaries of fashion',
    'Be part of creative magic in media',
    'Make fashion more sustainable & cool',
    'Invent cool products people need',
    'Start my own brand or company',
    'Work on projects that feel different',
    'Design with a purpose',
    'Bring characters & worlds to life',
    'Create campaigns that stop scrolling',
    'Design magazine-worthy spaces',
  ],

  /*
   * One row per option, in option order. Columns follow `courses` below:
   * fashionDesign, fashionComm, commDesign, productDesign, interiorDesign,
   * strategicDesign, animationVFX.
   */
  interestScores: [
    [2, 1, 2, 2, 1, 1, 1],
    [1, 3, 2, 0, 1, 1, 2],
    [3, 3, 1, 0, 0, 0, 2],
    [1, 2, 2, 2, 1, 3, 1],
    [1, 0, 1, 3, 3, 2, 1],
    [0, 1, 3, 2, 0, 1, 3],
    [0, 0, 1, 1, 3, 1, 0],
    [3, 3, 1, 0, 0, 0, 1],
    [0, 0, 3, 2, 0, 2, 2],
    [1, 3, 3, 0, 0, 2, 3],
    [1, 2, 2, 2, 2, 1, 1],
    [0, 3, 3, 0, 0, 1, 1],
    [1, 3, 2, 0, 0, 1, 2],
    [3, 3, 2, 0, 0, 0, 0],
    [2, 2, 3, 1, 0, 1, 3],
    [1, 3, 2, 1, 1, 1, 1],
  ],
  dreamScores: [
    [3, 3, 1, 0, 0, 0, 0],
    [1, 3, 3, 0, 0, 1, 3],
    [3, 3, 1, 0, 0, 2, 0],
    [0, 0, 1, 3, 1, 2, 0],
    [2, 2, 2, 2, 1, 3, 0],
    [1, 2, 2, 2, 1, 3, 3],
    [2, 2, 2, 2, 2, 3, 1],
    [0, 2, 3, 1, 0, 1, 3],
    [1, 3, 3, 0, 0, 1, 0],
    [0, 0, 0, 1, 3, 1, 0],
  ],

  /*
   * The reference's `courses` array, in its order — which is both the score
   * column order and the tie-break (the results are a stable sort by score).
   */
  courses: [
    { course: 'Fashion Design', bg: '#387BFF', image: { src: `${P}/program-simg-6.png`, width: 215, height: 346 }, href: `${UG}/b-des-in-fashion-design` },
    { course: 'Fashion Communication & Styling', bg: '#387BFF', image: { src: `${P}/program-simg-2.png`, width: 336, height: 385 }, href: `${UG}/b-des-in-fashion-communication-&-styling` },
    { course: 'Communication Design', bg: '#DF287B', image: { src: `${P}/program-simg-5.png`, width: 231, height: 270 }, href: `${UG}/b-des-communication-design` },
    { course: 'Product Design', bg: '#387BFF', image: { src: `${P}/program-simg-1.png`, width: 282, height: 336 }, href: `${UG}/b-des-in-product-design` },
    { course: 'Interior Design', bg: '#387BFF', image: { src: `${P}/program-simg-7.png`, width: 279, height: 298 }, href: `${UG}/b-des-in-interior-design` },
    { course: 'Strategic Design & Management', bg: '#DF287B', image: { src: `${P}/program-simg-3.png`, width: 244, height: 256 }, href: `${UG}/b-des-in-strategic-design-management` },
    { course: 'Animation and VFX', bg: '#387BFF', image: { src: `${P}/program-simg-4.png`, width: 216, height: 227 }, href: `${UG}/b-des-in-animation-&-vfx` },
  ],
};
