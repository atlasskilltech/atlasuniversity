/**
 * /programs/ug/programs-list-law-and-policy — copy transcribed 1:1 from
 * `reference/programs/ug/programs-list-law-and-policy.php` and its two
 * includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, one BBA LL.B. (Hons.) entry, the
 * AI-search panel, the FAQ.
 *
 * `$css = "…690c3a7d32aa2b65c20f8a60-b041f4c74.css"`; `$body = "body-isme"`.
 */

/*
 * ref .inner-header-wrapper.full-ht. The photograph is the **same CDN file**
 * /programs/programs-list-integrated uses for its own hero (`lawatlasssss.png`,
 * SHA-1 equal), which is why it is stored under a neutral name rather than an
 * "integrated" one. No hero buttons, no authored `<br>` in the heading.
 */
export const hero = {
  title: 'Law & Policy',
  image: {
    src: '/assets/images/programs/hero/law-atlas-hero.png',
    srcSet:
      '/assets/images/programs/hero/law-atlas-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/law-atlas-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/law-atlas-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/law-atlas-hero.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 1 x .program-list — the only single-entry page in
 * the set.
 *
 * Its cells hold one value each, but the first breaks with an authored `<br />`
 * and the second runs to a full sentence, so the strip is much taller than the
 * other children's. The IB wording matches
 * /programs/programs-list-integrated's ("A minimum of 24 points, including 3
 * Higher Level (HL) and 3 Standard Level (SL) subjects.") rather than the other
 * UG children's shorter phrasing.
 *
 * The brochure is `[data-id="law"]` over a 580px iframe popup — the **same CRM
 * widget** (`6a3e7d3ba1fd0680c6c1ba90`) and the same `height="621"` that
 * /programs/programs-list-integrated's law entry uses, and like that one it
 * carries the `utm_*` forwarding script.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'BBA LL.B. (Hons.) brochure request',
    kind: 'iframe',
    src: 'https://crm.atlasskilltech.app/widgets/6a3e7d3ba1fd0680c6c1ba90/embed',
    height: 621,
    forwardUtm: true,
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      /* authored `Minimum 50% in<br />Class XII` */
      value: 'Minimum 50% in\nClass XII',
    },
    {
      /* ref .df-card.top — `justify-content: flex-start` on the last two */
      top: true,
      label: 'A-Levels (UK)',
      value: "GSCE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary 'O' Level and 2 subjects at Advanced 'A' Level",
    },
    {
      top: true,
      label: 'International Baccalaureate (IB)',
      value: 'A minimum of 24 points, including 3 Higher Level (HL) and 3 Standard Level (SL) subjects.',
    },
  ],
  entries: [
    {
      title: 'BBA LL.B. (Hons.)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/law/program-page-law',
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
 * ref assets/include/faq.php. `faq.php` does have a branch for
 * `https://atlasuniversity.edu.in/schools/law/` (master 4), but it tests
 * `$fullUrl`, which for this page is a `/programs/` URL — so it falls through
 * to the same `else` every other child takes and renders master 1, the **ISDI**
 * set, on a law page. Verified on production; byte-identical to
 * /programs/ug/ug-design-and-innovation's, so the set is re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
