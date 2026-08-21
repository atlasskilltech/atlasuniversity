/**
 * /programs/ug/programs-list-commerce-finance-and-economics — copy transcribed
 * 1:1 from
 * `reference/programs/ug/programs-list-commerce-finance-and-economics.php`
 * and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, the two B.Sc. (Hons.) entries,
 * the AI-search panel, the FAQ.
 *
 * `$css = "…690c3a30f41551ec9be9a6ec-b041f4c74.css"`; `$body = "body-isme"` —
 * a third `<body>` class across the six UG children, and like the other two it
 * changes nothing measurable.
 */

/* ref .inner-header-wrapper.full-ht — its own photograph; no hero buttons and
   no authored `<br>` in the heading. The CDN filename URL-encodes its
   ampersand (`CommerceFinance%26Economics.png`) */
export const hero = {
  title: 'Commerce, Finance & Economics',
  image: {
    src: '/assets/images/programs/hero/commerce-finance-economics-hero.png',
    srcSet:
      '/assets/images/programs/hero/commerce-finance-economics-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/commerce-finance-economics-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/commerce-finance-economics-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/commerce-finance-economics-hero.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 2 x .program-list.
 *
 * Both entries carry the same eligibility strip word for word, so the rows are
 * hoisted out of the entries.
 *
 * **This page's cells hold two values, not one.** Every criterion adds a
 * mathematics requirement on its own `.df-text-1.f18` line, and the entry bar
 * is 60% rather than the 50% every other Programs page asks for. Hence
 * `values[]` rather than `value`.
 *
 * Both "Download Brochure" buttons are `[data-id="bba-brochure"]` — the same
 * `data-id` /programs/ug/programs-list-management-and-entrepreneurship uses,
 * pointing at a different widget — and open one shared popup.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'B.Sc. (Hons.) brochure request',
    kind: 'iframe',
    src: 'https://crm.atlasskilltech.app/widgets/6a3e7a6aa1fd0680c6c18db8/embed',
    height: 650,
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      values: ['Minimum 60% in Class XII', 'Mathematics is mandatory'],
    },
    {
      /* ref .df-card.top — `justify-content: flex-start` on the last two */
      top: true,
      label: 'A-Levels (UK)',
      values: ['Minimum grades A/B/C in 2 subjects', 'Grade B or above in Mathematics'],
    },
    {
      top: true,
      label: 'International Baccalaureate (IB)',
      values: ['Minimum of 24 points in 3 HL & 3 SL subjects', 'Mathematics is mandatory'],
    },
  ],
  entries: [
    {
      title: 'B.Sc. (Hons.) in Finance',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/undergraduate/bsc-hons/bsc-hons-in-finance',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Sc. (Hons.) in Economics and Data Analytics',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        /* the reference drops "hons" from this path and keeps it in the first */
        href: '/schools/isme/programs/undergraduate/bsc-hons/bsc-in-economics-and-data-analytics',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
  ],
};

/* ref assets/include/more-questions.php — byte-identical parameters to the
   other UG children's */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/*
 * ref assets/include/faq.php — the same `else` fallback every /programs/ page
 * takes, so this commerce page renders FAQ master 1, the **ISDI** set. All 24
 * questions and answers are byte-identical to
 * /programs/ug/ug-design-and-innovation's on the rendered production markup, so
 * the set is re-exported rather than duplicated.
 */
export { faq } from '@/lib/designInnovationContent';
