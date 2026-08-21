/**
 * /programs/pg-programs-atlas — copy transcribed 1:1 from
 * `reference/programs/pg-programs-atlas.php` and its two includes:
 *
 *   assets/include/more-questions.php                       (the AI-search panel)
 *   assets/include/faq/atlas/programs/pg-programs-atlas.php
 *
 * The same four blocks, in the same order, as /programs/ug-programs-atlas —
 * hero, the discipline cards, the search panel, the FAQ — so it renders through
 * exactly the same components with three cards instead of six.
 *
 * `$css = "…690c40856b095376f162c1b1-10a901f9d.css"`, its own sheet, and
 * `$body = "body-isme"` rather than `"body atlas-page"`. Neither changes
 * anything measurable: the page's `<style>` block is byte-identical to
 * /programs/ug-programs-atlas', and `<body>` computes the same 16px/24 Manrope
 * on both — the same finding /life-at-atlas already recorded for `body-isme`.
 */

/* ref .inner-header-wrapper.full-ht — the hero photograph is byte-identical to
   /programs/ug-programs-atlas', which is why it lives under a neutral name */
export const hero = {
  title: 'Postgraduate Programs',
  image: {
    src: '/assets/images/programs/hero/programs-hero.png',
    srcSet:
      '/assets/images/programs/hero/programs-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/programs-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/programs-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/programs-hero.png 1366w',
    sizes: '(max-width: 1439px) 100vw, 1365.9549560546875px',
    alt: '',
  },
  buttons: [
    {
      label: 'Continue Application',
      href: 'https://atlasuniversity.edu.in/admissions',
      variant: 'atlas-576',
      /* this page's sheet, like the UG one's, declares no base `.button-tx`
         size, so the label inherits the button's 18px */
      textSize: 'inherit',
      external: true,
    },
  ],
};

/* ref .common-flex-16-wrap > 3 x .pg-card-ugdx */
export const programs = {
  heading: 'Find the Program That Fits Your Ambition',
  subheading: 'Design and Management. Continue your academic journey with ATLAS PG Programs.',
  areasLabel: 'Key areas:',
  emptyAreas: 3,
  cards: [
    {
      /* the only card in the Programs section whose title is wrapped in a
         `<strong>`; see the note on `ProgramCards` for why that needs an
         explicit weight */
      title: 'Business & Management',
      titleStrong: true,
      text: 'Build strategic, analytical, and leadership capabilities to manage and grow modern enterprises across industries',
      areas: ['Business Strategy', 'Leadership Development', 'Global Management'],
      button: {
        label: 'Explore Business & Management Programs',
        href: '/programs/pg/pg-business-and-management',
      },
      image: {
        src: '/assets/images/programs/cards/pg-business-and-management.png',
        srcSet:
          '/assets/images/programs/cards/pg-business-and-management-p-500.png 500w, '
          + '/assets/images/programs/cards/pg-business-and-management.png 611w',
        alt: '',
      },
    },
    {
      /* both the title and the lead carry an authored <br /> */
      title: 'Digital & Emerging Technologies \nin Business',
      text: 'Bridge business insight with digital innovation to lead in the \ntech-driven economy.',
      areas: ['FinTech & Banking', 'Digital Marketing', 'Data Analytics'],
      button: {
        label: 'Explore Digital & Emerging Technologies in Business Programs',
        href: '/programs/pg/pg-digital-and-emerging-technologies-in-business',
      },
      image: {
        src: '/assets/images/programs/cards/pg-digital-and-emerging-technologies.png',
        srcSet:
          '/assets/images/programs/cards/pg-digital-and-emerging-technologies-p-500.png 500w, '
          + '/assets/images/programs/cards/pg-digital-and-emerging-technologies.png 611w',
        alt: '',
      },
    },
    {
      title: 'Design, Innovation & Strategy',
      text: 'Merge creative thinking with strategic design to shape future-ready business solutions.',
      areas: ['Brand Strategy & Management', 'Creative Leadership', 'Innovation Strategy'],
      button: {
        label: 'Explore Design, Innovation & Strategy Programs',
        href: '/programs/pg/pg-design-innovation',
      },
      image: {
        src: '/assets/images/programs/cards/pg-design-innovation-and-strategy.png',
        srcSet:
          '/assets/images/programs/cards/pg-design-innovation-and-strategy-p-500.png 500w, '
          + '/assets/images/programs/cards/pg-design-innovation-and-strategy.png 611w',
        alt: '',
      },
    },
  ],
};

/* ref assets/include/more-questions.php — the same variant and text every other
   page passes, so it renders through `components/About/SearchQuestion` */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/* ref assets/include/faq/atlas/programs/pg-programs-atlas.php */
export const faq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'Which are postgraduate courses?',
      a: ['Postgraduate courses are advanced academic programs pursued after completing an undergraduate degree. These include master’s degrees, postgraduate diplomas and specialised professional programs.'],
    },
    {
      q: 'What is a postgraduate course?',
      a: ['A postgraduate course is a higher-level program designed to deepen subject knowledge and build advanced skills. It focuses on specialisation, applied learning and career advancement.'],
    },
    {
      q: 'Which PG course is best?',
      a: ['The best PG course depends on your background, interests and career goals. Courses that offer industry exposure, practical learning and strong mentorship tend to provide better career outcomes.'],
    },
    {
      q: 'Is postgraduate after 12th?',
      a: ['No, postgraduate programs are not taken after Class 12. Students must complete an undergraduate degree before enrolling in a postgraduate course.'],
    },
    {
      q: "Is a postgraduate course a master's?",
      a: ["Many postgraduate programs are master's degrees, such as an MBA, M.Des or other specialised qualifications. However, postgraduate education can also include postgraduate diplomas, doctoral programs and advanced professional qualifications."],
    },
    {
      q: 'What level is postgraduate?',
      a: ['Postgraduate education is the level of study that comes after undergraduate education. It represents advanced academic and professional training in a specific field.'],
    },
    {
      q: "Is postgraduate the same as Bachelor's?",
      a: ['No, postgraduate does not mean a Bachelor’s degree. Bachelor’s degrees are undergraduate programs, while postgraduate courses are pursued after graduation.'],
    },
    {
      q: 'What are the types of postgraduate courses?',
      a: ['Postgraduate courses include master’s degrees, postgraduate diplomas and professional programs. These may be academic, research-based or industry-oriented.'],
    },
    {
      q: 'What is the easiest postgraduate degree?',
      a: ['There is no single easiest postgraduate degree, as difficulty depends on individual strengths and interests. Choosing a course aligned with your background makes learning more manageable and rewarding.'],
    },
    {
      q: 'What is the highest postgraduate degree?',
      a: ['Doctoral programs, such as a PhD, represent the highest level of academic study and research. These programs build upon postgraduate education and focus on generating original knowledge and research contributions.'],
    },
    {
      q: 'Is a 4-year degree include PG?',
      a: ['No, a 4-year degree is usually an undergraduate program. Postgraduate studies are pursued separately after completing a bachelor’s degree.'],
    },
  ],
};
