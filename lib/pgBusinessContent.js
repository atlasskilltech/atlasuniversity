/**
 * /programs/pg/pg-business-and-management — copy transcribed 1:1 from
 * `reference/programs/pg/pg-business-and-management.php` and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, the three MBA entries, the
 * AI-search panel, the FAQ.
 *
 * `$css = "…690ca5981a1c3e64264150c0-dc966e54d.css"`; `$body = "body-isme"`.
 * It also loads a **different webflow bundle** (`webflow.8ad64a2e…`) from the
 * six UG children's `webflow.ee913841…`; nothing on the page depends on it,
 * since it uses no IX2 interaction.
 */

/*
 * ref .inner-header-wrapper.full-ht. The photograph is byte-identical to
 * /programs/ug/programs-list-management-and-entrepreneurship's — the CDN serves
 * it as `designnnn.png` here and `heeeroooo.png` there, SHA-1 equal — so the
 * stored file is reused rather than downloaded twice. The name still fits both
 * (UG "Management & Entrepreneurship", PG "Business & Management").
 */
export const hero = {
  title: 'Business & Management',
  image: {
    src: '/assets/images/programs/hero/management-hero.png',
    srcSet:
      '/assets/images/programs/hero/management-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/management-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/management-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/management-hero.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 3 x .program-list.
 *
 * The eligibility strip is a **single row** — no A-Levels or IB cell, and no
 * `.df-card.top` anywhere on the page — carrying one long postgraduate
 * criterion. All three entries repeat it verbatim, so it is hoisted.
 *
 * All three "Download Brochure" buttons are `[data-id="mba-brochure"]` and open
 * one shared popup, a live NoPaperForms widget in the wide 90% / max-800 / 80%
 * panel.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'MBA brochure request',
    kind: 'npf',
    widget: '20bba9a4afa877ff1bdf9a7c43caeaa4',
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      value: 'Candidates must possess a minimum of 50% in their Graduation degree with no live backlogs. While passing marks are required in both Class 10th and 12th, there are no mandatory subject requirements or specific percentage requirements (such as 60% in 12th) beyond the overall 50% in Graduation.',
    },
  ],
  entries: [
    {
      title: 'MBA',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/postgraduate/mba-hyper/mba-with-specialisation',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'MBA in FinTech',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/postgraduate/program-mba-in-fintech',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'MBA in Investment Banking',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/postgraduate/program-mba-in-investment-banking',
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
 * takes, so this MBA page renders FAQ master 1, the **ISDI** set.
 * Byte-identical to /programs/ug/ug-design-and-innovation's, so it is
 * re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
