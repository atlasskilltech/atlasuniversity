import { IMG } from './paths';

const P = `${IMG}/programs`;
const UG = '/schools/isdi/programs/undergraduate/b-des';
const PG = '/schools/isdi/programs/postgraduate';

/*
 * The icon button's colour. `data-btn-bg` is written inline by a script, but the
 * "white-fade-big" variant declares `#729ff5 !important`, so it never shows the
 * authored value (`#4A77DC`, or the unprefixed `729FF5`); "light-pink" is
 * #ff4197 either way.
 */
const BTN = { pink: '#ff4197', blue: '#729ff5' };

const DURATION_UG = ['4 Year', '|', 'Full time', '|', 'B.Des'];

/*
 * 6. Our Programs — index.php:1664-1784, Tab 1 = assets/include/pathfinder.php.
 *
 * `bg` is the card's `data-bg-color` (a script paints it inline, which beats
 * every stylesheet colour except `.bg-1.isdi`'s `!important`). `variant` keeps the
 * classes that change a card's measured geometry: `space` (`.h3-tag.space` +
 * plain `.prog-details`), `detailsPad` (`.prog-details.vertical-space1-7`) and
 * `wrapCont` (`.program-cont.vertical-space1-8` + `.program-image…-11`).
 * Career pathways keep their authored `&nbsp;` as U+00A0.
 */
export const isdiPrograms = {
  heading: 'Our Programs',
  tabs: ['Undergraduate', 'Postgraduate'],
  ug: {
    heading: 'Designed by Parsons, \nDelivered by ISDI',
    sub: 'Fashion, Product, Experience, AI, UI/UX, Digital, Strategy, and beyond',
    button: { label: 'Check out ISDI’s Pathfinder', href: '#path-finder' },
    left: [
      {
        title: 'Fashion Communication & Styling:\nFashion Media & Creative Direction',
        bg: '#DF287B',
        padRight: true, // .program-card.bg-2: padding-right 40 at <=767
        duration: DURATION_UG,
        pathways: [
          'AI-Driven Fashion Media Strategist',
          'Digital Fashion Content & Platform Designer',
          'Trend Intelligence & Cultural Data  Analyst',
          'Virtual Fashion, Avatar & Styling  Designer',
          'Fashion Brand Experience & Community Strategist',
          'Social Commerce & Influencer Systems Designer',
        ],
        image: { src: `${P}/program-simg-2.png`, width: 336, height: 385, alt: 'Red blazer on a clothing rack representing fashion design at Atlas ISDI.' },
        button: BTN.pink,
        href: `${UG}/b-des-in-fashion-communication-&-styling`,
      },
      {
        title: 'Product Design: \nCreative Engineering',
        bg: '#2C57B7',
        duration: DURATION_UG,
        pathways: [
          'AI-Integrated Product & UX Designer',
          'Smart Product & Connected Systems Designer (IoT)',
          'Physical-Digital Product Experience Designer',
          'Human-Centered Tech Product Strategist',
          'Rapid Prototyping & Design Systems Specialist',
          'Sustainable Product Innovation Designer',
        ],
        image: { src: `${P}/program-simg-1.png`, width: 282, height: 336, alt: '' },
        button: BTN.blue,
        href: `${UG}/b-des-in-product-design`,
      },
      {
        title: 'Strategic Design & Management: \nDesign Strategy & \nInnovation Leadership',
        bg: '#387BFF',
        duration: DURATION_UG,
        pathways: [
          'AI-Driven Design Strategy Consultant',
          'Innovation & Business Transformation Strategist',
          'Service & Experience Systems Designer',
          'Design Research, Foresight & Insights Lead',
          'Sustainable Innovation & ESG Strategy Advisor',
          'Product, Platform & Growth Strategist',
        ],
        image: { src: `${P}/program-simg-3.png`, width: 244, height: 256, alt: 'Abstract geometric shapes representing graphic design at Atlas ISDI' },
        button: BTN.blue,
        href: `${UG}/b-des-in-strategic-design-management`,
      },
      {
        title: 'Animation & VFX:\nDigital Animation & Visual Effects',
        bg: '#DF287B',
        duration: DURATION_UG,
        pathways: [
          'AI-Assisted Animation & Motion Designer',
          'Real-Time 3D & Virtual Production Artist',
          'XR, AR/VR & Immersive Experience Animator',
          'Procedural & Generative Animation Specialist',
          'Game & Interactive Media Animator',
          'Visual Effects & Simulation Systems Artist',
        ],
        image: { src: `${P}/program-simg-4.png`, width: 216, height: 227, alt: 'Futuristic transparent mannequin representing design and technology at Atlas ISDI.' },
        button: BTN.pink,
        href: `${UG}/b-des-in-animation-&-vfx`,
      },
    ],
    right: [
      {
        title: 'Fashion Design: \nFashion Innovation & Design Futures',
        bg: '#387BFF',
        detailsPad: true,
        duration: DURATION_UG,
        pathways: [
          'Fashion-Tech & Smart Wearables Designer',
          'AI-Assisted Fashion Product Designer',
          'Sustainable & Circular Fashion Systems Designer',
          'Digital Fashion & Virtual Product Designer',
          'Innovation-Led Fashion Entrepreneur',
          'Data-Driven Fashion Forecasting Specialist',
        ],
        image: { src: `${P}/program-simg-6.png`, width: 215, height: 346, alt: 'Model wearing a red floral avant-garde fashion design' },
        button: BTN.blue,
        href: `${UG}/b-des-in-fashion-design`,
      },
      {
        title: 'Communication Design: \nDigital Media & Creative Technology',
        bg: '#DF287B',
        detailsPad: true,
        wrapCont: true,
        padLeft479: true, // .program-card.vertical-space1.bg-5: padding-left 25 at <=479
        noTitlePad: true, // .h3-tag.vertical-space1-2 has no <=479 right padding
        duration: DURATION_UG,
        pathways: [
          'AI Experience & Interaction Designer',
          'Creative Technologist (Generative Media & Automation)',
          'Digital Product & Platform Designer',
          'Immersive Media & Spatial Interface Designer (XR)',
          'Content Systems & Visual Intelligence Strategist',
          'UI/UX Designer for AI-Driven Products',
        ],
        image: { src: `${P}/program-simg-5.png`, width: 231, height: 270, alt: '' },
        button: BTN.pink,
        href: `${UG}/b-des-communication-design`,
      },
      {
        title: 'Interior Design: \nSpatial Design & Built Environments',
        bg: '#2C57B7',
        detailsPad: true,
        duration: DURATION_UG,
        pathways: [
          'Smart Space & AI-Enabled Environment Designer',
          'Workplace & Experience Design Strategist',
          'Sustainable & Regenerative Spatial Designer',
          'Retail & Brand Experience Space Designer',
          'Digital Twin & Virtual Space Designer',
          'Human-Centered Spatial Systems Designer',
        ],
        image: { src: `${P}/program-simg-7.png`, width: 279, height: 298, alt: 'Design mood board with pastel objects and stationery' },
        button: BTN.blue,
        href: `${UG}/b-des-in-interior-design`,
      },
    ],
    pathfinder: {
      heading: 'Can’t decide which program is best for you?',
      scribble: { src: `${P}/scribble.png`, width: 290, height: 304, alt: 'Pink swirl arrow design' },
      title: 'Check out ISDI’s PathFinder',
      sub: 'No complicated quizzes, just two steps!',
    },
  },
  /*
   * Tab 2. Both cards are `.vertical-space1-*` cards; the second is
   * `.bg-1.isdi`, which is why it is #2c57b7 (the `!important` beats its inline
   * #DF287B) and why its corners are 16px (the generic `.isdi { border-radius:
   * 16px }` comes after `.program-card`). Pathways are one `<br>`-separated text
   * block, not a list — including the missing break in "System
   * DesignerDesign Researcher", transcribed as authored.
   */
  pg: [
    {
      title: 'M.Des\nDesign Futures',
      bg: '#DF287B',
      detailsPad: true,
      wrapCont: true,
      padLeft479: true,
      noTitlePad: true,
      ariaLabel: 'ISDI Home', // as authored
      duration: ['2 Year', '|', 'Full time', '|', 'Postgraduate Program'],
      pathways:
        'UX Researcher\nUX Writer\nDesign Manager\nDesign Director\nPrompt Engineer\nProduct Designer\nService Designer\nVisual Designer\nProduct Manager\nSystem DesignerDesign Researcher\nRetail Designer\nUX Strategist',
      image: { src: `${P}/program-simg-5.png`, width: 231, height: 270, alt: 'Person with digital design tools' },
      button: BTN.pink,
      href: `${PG}/m-des-in-design-futures`,
    },
    {
      title: 'MBA\nDesign Management \n& Strategic Thinking',
      bg: '#2C57B7',
      isdi: true,
      detailsPad: true,
      wrapCont: true,
      noTitlePad: true,
      duration: ['2 Year', '|', 'Full time'],
      pathways:
        'Social Impact Entrepreneurship\nBrand Manager\nMarketing Manager\nBrand Designer\nProduct Manager\nService Design Manager\nStrategic Planner\nResearch Analyst\nDesign Management\nUX Marketer\nBusiness Analyst\nExperience Design Manager\nDesign Strategist',
      image: { src: `${P}/program-simg-1.png`, width: 282, height: 336, alt: 'Hand holding a 3D printed geometric structure for product design' },
      button: BTN.blue,
      href: `${PG}/mba-in-design-management-strategic-thinking`,
    },
  ],
};
