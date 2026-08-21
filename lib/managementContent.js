/**
 * /programs/ug/programs-list-management-and-entrepreneurship — copy transcribed
 * 1:1 from `reference/programs/ug/programs-list-management-and-entrepreneurship.php`
 * and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, the four BBA Hons. entries, the
 * AI-search panel, the FAQ.
 *
 * `$css = "…690c3a1211f795498409636b-f36eae935.css"`, a sheet of its own, and
 * `$body = "body body-ugdx"` where /programs/ug/ug-design-and-innovation uses
 * `body atlas-page` — yet every measured value of the hero, the entries and the
 * search panel is identical on the two references at 1440 / 768 / 390. Neither
 * declaration changes anything this page renders.
 */

/* ref .inner-header-wrapper.full-ht — its own photograph; no hero buttons, and
   no authored `<br>` in the heading */
export const hero = {
  title: 'Management & Entrepreneurship',
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
 * ref .program-list-wrapper > 4 x .program-list.
 *
 * All four carry the same eligibility strip word for word, so the rows are
 * hoisted out of the entries. The wording matches
 * /programs/ug/ug-design-and-innovation's exactly, including the IB row, which
 * /programs/programs-list-integrated spells differently.
 *
 * All four "Download Brochure" buttons are `[data-id="bba-brochure"]` and open
 * one shared popup, so the brochure sits on the section rather than on each
 * entry — the same shape the design page uses, with a different widget.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'BBA Hons. brochure request',
    kind: 'iframe',
    src: 'https://crm.atlasskilltech.app/widgets/6a3e788ea1fd0680c6c15cad/embed',
    height: 650,
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      value: 'Minimum 50% in Class XII',
    },
    {
      /* ref .df-card.top — `justify-content: flex-start` on the last two */
      top: true,
      label: 'A-Levels (UK)',
      value: 'Minimum grades A/B/C in 2 subjects',
    },
    {
      top: true,
      label: 'International Baccalaureate (IB)',
      value: 'Minimum of 24 points in 3 HL & 3 SL subjects',
    },
  ],
  entries: [
    {
      /* the reference breaks this title after "Marketing/Finance"; the other
         three are unbroken */
      title: 'BBA Hons. Majoring in Marketing/Finance\n/Business Analytics',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-marketing-finance-business-analytics',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'BBA Hons. in Digital Branding & Advertising',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-digital-branding-advertising',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'BBA Hons. in AI & Emerging Technologies',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-ai-emerging-technologies',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'BBA Hons. Business Psychology',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        /* the reference capitalises "Hons" here and nowhere else in the path */
        href: '/schools/isme/programs/undergraduate/bba-hons/bba-Hons-business-psychology',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
  ],
};

/* ref assets/include/more-questions.php — byte-identical parameters to
   /programs/ug/ug-design-and-innovation's */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/*
 * ref assets/include/faq.php. The include keys its query on `$domain` /
 * `$fullUrl`, and neither matches for a page under /programs/, so this page
 * falls through to the same `else` branch /programs/ug/ug-design-and-innovation
 * does and renders FAQ master 1 — the **ISDI** set, on a management page. That
 * is the reference's own behaviour, verified on production.
 *
 * The 24 questions and all 24 answers are byte-identical to that page's
 * (compared on the rendered production markup, SHA-1 equal), so the set is
 * re-exported rather than duplicated.
 */
export { faq } from '@/lib/designInnovationContent';
