/**
 * /programs/ug/programs-list-cs-ai-ml-and-ds — copy transcribed 1:1 from
 * `reference/programs/ug/programs-list-cs-ai-ml-and-ds.php` and its two
 * includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, the three B.Tech entries, the
 * AI-search panel, the FAQ.
 *
 * `$css = "…690c3a5b10605173246c8369-b041f4c74.css"`; `$body = "body-isme"`.
 */

/*
 * ref .inner-header-wrapper.full-ht. Not its own photograph:
 * /programs/pg/pg-design-innovation authors the same bytes under a different
 * CDN name (`aimlatlasss.png` here, `designnnandinnovation.png` there — all
 * four sizes SHA-1 equal), so the file is stored under a neutral name and both
 * pages point at it. No hero buttons and no authored `<br>` in the heading.
 */
export const hero = {
  title: 'CS, AI/ML & Data Science',
  image: {
    src: '/assets/images/programs/hero/programs-hero-2.png',
    srcSet:
      '/assets/images/programs/hero/programs-hero-2-p-500.png 500w, '
      + '/assets/images/programs/hero/programs-hero-2-p-800.png 800w, '
      + '/assets/images/programs/hero/programs-hero-2-p-1080.png 1080w, '
      + '/assets/images/programs/hero/programs-hero-2.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 3 x .program-list.
 *
 * All three carry the same eligibility strip word for word. Like
 * /programs/ug/programs-list-commerce-finance-and-economics every cell holds
 * two values — here a mathematics *and physics* requirement — but the entry bar
 * is back to 50%. The A-Levels cell breaks its second value with an authored
 * `<br /><br />`, so the values go through `withBreaks`.
 *
 * All three "Download Brochure" buttons are `[data-id="btech"]` and open one
 * shared popup. **This one is a live NoPaperForms widget, not an iframe** — the
 * `.npf_wgts` div is really in the markup rather than commented out, so
 * `emwgts.js` has something to fill and genuinely does. Verified on production:
 * opening it loads a 760x700 form.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'B.Tech brochure request',
    kind: 'npf',
    widget: '1dd30518465e0a04dca61dd8d48ef66a',
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      values: ['Minimum 50% in Class XII', 'Mathematics and Physics are mandatory'],
    },
    {
      /* ref .df-card.top — `justify-content: flex-start` on the last two */
      top: true,
      label: 'A-Levels (UK)',
      values: [
        'Minimum grades A/B/C in 2 subjects',
        /* authored `<br /><br />`, so the blank line is real */
        'Grade B or above in Mathematics\n\nMathematics and Physics are mandatory',
      ],
    },
    {
      top: true,
      label: 'International Baccalaureate (IB)',
      values: [
        'Minimum of 24 points in 3 HL & 3 SL subjects',
        'Mathematics and Physics are mandatory',
      ],
    },
  ],
  entries: [
    {
      title: 'B.Tech (CS, AI & ML)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-ml',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Tech (CS, AI & Robotics)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        /* the last two hrefs carry a literal `&`; the first does not */
        href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-robotics',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Tech (CS, AI & Data Science)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-data-science',
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
 * takes, so this B.Tech page renders FAQ master 1, the **ISDI** set. All 24
 * questions and answers are byte-identical to
 * /programs/ug/ug-design-and-innovation's, so the set is re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
