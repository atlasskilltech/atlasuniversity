/**
 * /programs/pg/pg-digital-and-emerging-technologies-in-business — copy
 * transcribed 1:1 from
 * `reference/programs/pg/pg-digital-and-emerging-technologies-in-business.php`
 * and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, three entries, the AI-search
 * panel, the FAQ.
 *
 * `$css = "…690ca661e0ef9a16af2bdaf2-b041f4c74.css"`; `$body = "body-isme"`,
 * and the same `webflow.8ad64a2e…` bundle /programs/pg/pg-business-and-management
 * loads. The longest file in the Programs set at 451 lines, almost all of it
 * the three popups.
 */

/* ref .inner-header-wrapper.full-ht. Note the `sizes` string differs from every
   other Programs hero's — 1439/1365.9896 rather than 1366/1366 */
export const hero = {
  title: 'Digital & Emerging Technologies in Business',
  image: {
    src: '/assets/images/programs/hero/mdes-hero.png',
    srcSet:
      '/assets/images/programs/hero/mdes-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/mdes-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/mdes-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/mdes-hero.png 1366w',
    sizes: '(max-width: 1439px) 100vw, 1365.9896240234375px',
    alt: '',
  },
};

const ARROW = { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' };

/* the two rows the first and third entries share verbatim */
const UNDERGRAD = {
  /* ref .df-card.top */
  top: true,
  label: 'Undergraduate Qualification',
  value: 'Students pursuing or having completed a minimum of a three-year graduate program in any discipline with at least 50% aggregate marks from a University recognized by the Association of Indian Universities (AIU).',
};

const ENTRANCE = {
  top: true,
  label: 'Entrance Exams (MBA)',
  /*
   * A rich value: text, `<br>`, `<strong>`, `<br>`, `<strong>`, text. The
   * `<strong>`s sit inside an already-700 `.df-text-1.f18` and the reference
   * paints them 700, so `ProgramList` renders them with an explicit
   * `font-bold` rather than letting Preflight's relative `bolder` reach 900.
   */
  values: [[
    'Candidates who have appeared for any of the following tests are preferred:\n',
    { strong: 'GMAT, CAT, NMAT, XAT, MAT, CMAT, ATMA, or State CET.' },
    '\n',
    { strong: 'Cut-offs:' },
    ' CAT/XAT – 70%ile, NMAT – 200 marks, CET – 80%ile',
  ]],
};

/*
 * ref .program-list-wrapper > 3 x .program-list.
 *
 * **Every entry has its own popup and its own eligibility strip** — three
 * separate NoPaperForms widgets, and strips of three, one and three rows. Two
 * of the three widgets are shared with other pages
 * (`20bba9a4…` with /programs/pg/pg-business-and-management, `1dd30518…` with
 * /programs/ug/programs-list-cs-ai-ml-and-ds and
 * /programs/ug/programs-list-design-ai-and-technology); `425806c8…` is this
 * page's own.
 */
export const programList = {
  entries: [
    {
      title: 'MBA in FinTech',
      eligibility: { label: 'Eligibility Criteria', arrow: ARROW },
      brochure: {
        label: 'Download Brochure',
        title: 'MBA in FinTech brochure request',
        kind: 'npf',
        widget: '20bba9a4afa877ff1bdf9a7c43caeaa4',
      },
      eligibilityRows: [
        {
          label: 'Indian Boards (ISC / CBSE / State Boards)',
          value: 'Minimum 60% in Class XII',
        },
        UNDERGRAD,
        ENTRANCE,
      ],
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/postgraduate/program-mba-in-fintech',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'MBA DMST (Design Management & Strategic Thinking)',
      eligibility: { label: 'Eligibility Criteria', arrow: ARROW },
      brochure: {
        label: 'Download Brochure',
        title: 'MBA DMST brochure request',
        kind: 'npf',
        widget: '425806c8544d587247f68ba92a47708c',
      },
      eligibilityRows: [
        {
          ...UNDERGRAD,
          /* this copy of the row ends with an authored `<br /><br />` */
          value: `${UNDERGRAD.value}\n\n`,
        },
      ],
      explore: {
        label: 'Explore Program',
        href: '/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Tech + MBA (AI/ML + Technology Management)',
      eligibility: { label: 'Eligibility Criteria', arrow: ARROW },
      brochure: {
        label: 'Download Brochure',
        title: 'B.Tech + MBA brochure request',
        kind: 'npf',
        widget: '1dd30518465e0a04dca61dd8d48ef66a',
      },
      eligibilityRows: [
        {
          label: 'Indian Boards (ISC / CBSE / State Boards)',
          values: ['Minimum 60% in Class XII', 'Mathematics is mandatory'],
        },
        UNDERGRAD,
        ENTRANCE,
      ],
      explore: {
        label: 'Explore Program',
        /* the authored href contains a literal `&` */
        href: '/schools/ugdx/integrated/integrated-b-tech-in-cs-ai-ml-&-mba',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
  ],
};

/* ref assets/include/more-questions.php */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/*
 * ref assets/include/faq.php — the same `else` fallback every /programs/ page
 * takes, so this page renders FAQ master 1, the **ISDI** set. Byte-identical to
 * /programs/ug/ug-design-and-innovation's, so it is re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
