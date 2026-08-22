/**
 * /programs/pg/pg-design-innovation — copy transcribed 1:1 from
 * `reference/programs/pg/pg-design-innovation.php` and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, one M.Des entry, the AI-search
 * panel, the FAQ. The last page of the Programs section.
 *
 * `$css = "…690ca68dfe1f53093ba2c9b1-b041f4c74.css"`; `$body = "body-isme"`,
 * and the same `webflow.8ad64a2e…` bundle as its two PG siblings.
 */

/*
 * ref .inner-header-wrapper.full-ht. The photograph is byte-identical to
 * /programs/ug/programs-list-cs-ai-ml-and-ds's — the CDN serves the same bytes
 * as `designnnandinnovation.png` here and `aimlatlasss.png` there, all four
 * sizes SHA-1 equal — so the file is stored under a neutral name and both pages
 * point at it.
 *
 * The heading carries an authored `<br>`, with a space before it, and the
 * `sizes` string is this page's own (1439 / 1365.9549…).
 */
export const hero = {
  title: 'Postgraduate \nDesign & Innovation Programs',
  image: {
    src: '/assets/images/programs/hero/programs-hero-2.png',
    srcSet:
      '/assets/images/programs/hero/programs-hero-2-p-500.png 500w, '
      + '/assets/images/programs/hero/programs-hero-2-p-800.png 800w, '
      + '/assets/images/programs/hero/programs-hero-2-p-1080.png 1080w, '
      + '/assets/images/programs/hero/programs-hero-2.png 1366w',
    sizes: '(max-width: 1439px) 100vw, 1365.9549560546875px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 1 x .program-list — a single entry with a
 * two-row strip. The "Undergraduate Qualification" row is word-for-word
 * /programs/pg/pg-digital-and-emerging-technologies-in-business's.
 *
 * The brochure is `[data-id="mdes-brochure"]` over the same NoPaperForms widget
 * (`425806c8…`) that page's MBA DMST entry uses.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'M.Des brochure request',
    kind: 'npf',
    widget: '425806c8544d587247f68ba92a47708c',
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      value: "50% in any bachelor's degree of Minimum 4 years",
    },
    {
      /* ref .df-card.top — `justify-content: flex-start` */
      top: true,
      label: 'Undergraduate Qualification',
      value: 'Students pursuing or having completed a minimum of a three-year graduate program in any discipline with at least 50% aggregate marks from a University recognized by the Association of Indian Universities (AIU).',
    },
  ],
  entries: [
    {
      /* the reference uses an en dash here, not a hyphen */
      title: 'M.Des – Design Futures',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isdi/programs/postgraduate/m-des-in-design-futures',
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
 * takes, so even this ISDI page renders FAQ master 1 through the fallback
 * rather than through the `$domain` branch that would also have chosen it.
 * Byte-identical to /programs/ug/ug-design-and-innovation's, so it is
 * re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
