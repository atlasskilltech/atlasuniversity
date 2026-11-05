/**
 * /programs/ug-programs-atlas — copy transcribed 1:1 from
 * `reference/programs/ug-programs-atlas.php` and its two includes:
 *
 *   assets/include/more-questions.php                       (the AI-search panel)
 *   assets/include/faq/atlas/programs/ug-programs-atlas.php
 *
 * One export per section, in the reference's order. Three sections and an FAQ:
 * the hero, "Find the Program That Fits Your Ambition" (six programme cards),
 * the search panel, and the accordion.
 *
 * **This reference renders end to end.** Unlike the Admissions pages it opens no
 * database connection, so `curl` returns the full document. It was still
 * measured against production, because the local mirror is in quirks mode — the
 * PHP warning `assets/include/dynamic.php` emits before `<!doctype>` puts every
 * page of the mirror in `BackCompat`, and this page's hero is built out of
 * percentage offsets that quirks mode resolves differently.
 */

/*
 * ref .inner-header-wrapper.full-ht — a different hero from the Advantages and
 * Admissions pages' `.main-cover-section-isme`. See `components/Programs/ProgramHero`.
 */
export const hero = {
  title: 'Undergraduate Programs',
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
  /* ref a.btn-ca — the same fourth button shape /admissions/ug-admissions
     declares in its own `<style>`, and this page declares it identically */
  buttons: [
    {
      label: 'Continue Application',
      href: 'https://atlasuniversity.edu.in/admissions',
      variant: 'atlas-576',
      /* this page's sheet declares no base `.button-tx` size, so the label
         inherits the button's 18px rather than the usual 16 */
      textSize: 'inherit',
      external: true,
    },
  ],
};

/*
 * ref .common-flex-16-wrap > 6 x .pg-card-ugdx.
 *
 * Every card carries three real `.pg-list` entries and **three empty ones**,
 * with a 6x6 `.rect-white` square between each pair of real entries. The empty
 * divs are zero-height but they are still flex children of a `gap: 8px` row, so
 * they are rendered rather than filtered out.
 */
export const programs = {
  heading: 'Find the Program That Fits Your Ambition',
  subheading: 'Design, Tech, and Management. Your path starts here.',
  areasLabel: 'Key areas:',
  /* ref the three empty `<div class="pg-list"></div>` after each list */
  emptyAreas: 3,
  cards: [
    {
      title: 'Design & Innovation',
      text: 'From fashion runways to immersive experiences - master the art of shaping culture, stories, and lifestyles through design that moves the world.',
      areas: ['Industry-Integrated Learning', 'Global Collaborations', 'Mentorship from Design Leaders'],
      button: {
        label: 'Explore Design & Innovation Programs',
        href: '/programs/ug/ug-design-and-innovation',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1.png 611w',
        alt: '',
      },
    },
    {
      title: 'Management & Entrepreneurship',
      text: 'Step into the world of strategy, innovation, and entrepreneurship where bold ideas meet real-world impact.',
      areas: ['Startup Incubation & Mentorship', 'Global Business Immersion', 'Industry Projects with Leading Firms'],
      button: {
        label: 'Explore Management & Entrepreneurship Programs',
        href: '/programs/ug/programs-list-management-and-entrepreneurship',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1-2.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-2-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1-2.png 611w',
        alt: '',
      },
    },
    {
      title: 'Commerce, Finance & Economics',
      text: 'Decode markets, data, and decisions that drive global business. Build the mindset to manage wealth and opportunity with purpose.',
      areas: ['Real-World Finance Simulations', 'Sessions with Industry Leaders', 'Best-in-class Labs & Data Analytics Tools'],
      button: {
        label: 'Explore Commerce, Finance & Economics Programs',
        href: '/programs/ug/programs-list-commerce-finance-and-economics',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1-3.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-3-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1-3.png 611w',
        alt: '',
      },
    },
    {
      title: 'CS, AI/ML & Data Science',
      text: 'Explore the power of algorithms, data, and intelligent systems — build solutions that learn, adapt, and shape the future of technology.',
      areas: ['AI & Machine Learning Projects', 'Future Ready Programs', 'Research & Startup Opportunities in Deep Tech'],
      button: {
        label: 'Explore CS, AI/ML & Data Science Programs',
        href: '/programs/ug/programs-list-cs-ai-ml-and-ds',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1-4.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-4-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1-4.png 611w',
        alt: '',
      },
    },
    {
      title: 'Law & Policy',
      text: 'Learn to navigate law, governance, and ethics in a changing world. Be the voice that shapes tomorrow’s justice and policy.',
      areas: ['Real Case Simulations & Moot Courts', 'Policy Labs & Research', 'Expert-Led Legal Workshops'],
      button: {
        label: 'Explore Law & Policy Programs',
        href: '/programs/ug/programs-list-law-and-policy',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1-5.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-5-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1-5.png 611w',
        alt: '',
      },
    },
    {
      /*
       * Upstream copy-paste, transcribed as authored: this card repeats the Law
       * & Policy card's whole description and its third key area verbatim, and
       * its button says "AI & Technology" while the heading says "Design, AI &
       * Technology".
       */
      title: 'Design, AI & Technology',
      text: 'Learn to navigate law, governance, and ethics in a changing world. Be the voice that shapes tomorrow’s justice and policy.',
      areas: ['Robotics & Automation', 'Human Machine', 'Expert-Led Legal Workshops'],
      button: {
        label: 'Explore AI & Technology Programs',
        href: '/programs/ug/programs-list-design-ai-and-technology',
      },
      image: {
        src: '/assets/images/programs/cards/atlas-program-1-6.png',
        srcSet:
          '/assets/images/programs/cards/atlas-program-1-6-p-500.png 500w, '
          + '/assets/images/programs/cards/atlas-program-1-6.png 611w',
        alt: '',
      },
    },
  ],
};

/*
 * ref assets/include/more-questions.php, included with
 * `$chatBxVariant = "w-variant-35db4856-…"` and
 * `$chatBxText = "What program are you looking for?"` — byte for byte the same
 * two values the homepage's four-schools section passes, so this renders through
 * the existing `components/About/SearchQuestion`.
 */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/* ref assets/include/faq/atlas/programs/ug-programs-atlas.php */
export const faq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'What is an undergraduate program?',
      a: ['An undergraduate program is the first level of higher education pursued after completing Class 12. It focuses on building foundational knowledge, practical skills and career readiness in a chosen field.'],
    },
    {
      q: 'Is 12th an undergraduate?',
      a: ['No, Class 12 is not an undergraduate qualification. Undergraduate programs begin after completing 12th grade and are offered by universities and colleges.'],
    },
    {
      q: 'What is a 4-year undergraduate program?',
      a: ['A 4-year undergraduate program offers in-depth learning, practical exposure and flexibility to explore multiple disciplines. It often includes projects, internships and experiential learning alongside academics.'],
    },
    {
      q: 'Which comes under undergraduate?',
      a: ["Undergraduate programs include bachelor's degrees such as BBA, B.Des, B.Tech and other discipline-specific qualifications pursued after Class 12. At ATLAS SkillTech University, students can choose from programs across design, business, technology and emerging interdisciplinary fields."],
    },
    {
      q: 'Which undergraduate course is best?',
      a: ['The best undergraduate course depends on a student’s interests, strengths and career goals. Courses that combine academics with experiential learning and industry exposure tend to offer stronger career outcomes.'],
    },
    {
      q: 'What is an undergraduate course of study?',
      a: ['An undergraduate course of study refers to the structured curriculum followed during a bachelor’s degree. It includes core subjects, electives, projects and skill-based learning.'],
    },
    {
      q: 'What are the different types of undergraduate degrees?',
      a: ['Undergraduate degrees are offered across various disciplines including business, design, technology and other professional fields. At ATLAS SkillTech University, students can pursue programs that combine academic depth, experiential learning and multidisciplinary opportunities.'],
    },
    {
      q: 'What is a 5-year undergraduate degree?',
      a: ['A 5-year undergraduate degree usually integrates multiple disciplines or combines undergraduate and professional training. It offers extended learning and specialised skill development.'],
    },
    {
      q: 'What is an example of an undergraduate course?',
      a: ['An example of an undergraduate course is a Bachelor’s degree in Design, Business Administration or Technology. These programs typically combine classroom learning with projects and practical exposure.'],
    },
    {
      q: 'How many years is the undergraduate program?',
      a: ['Most undergraduate programs are 3 or 4 years long, depending on the degree and university structure. Some integrated programs may extend to 5 years.'],
    },
    {
      q: 'What is the duration of an undergraduate program in India?',
      a: ['In India, undergraduate programs usually last 3 to 4 years. The duration depends on the discipline, curriculum framework and university regulations.'],
    },
  ],
};
