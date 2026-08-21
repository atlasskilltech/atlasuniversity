/**
 * /programs/ug/programs-list-design-ai-and-technology — copy transcribed 1:1
 * from `reference/programs/ug/programs-list-design-ai-and-technology.php` and
 * its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, two entries, the AI-search
 * panel, the FAQ.
 *
 * `$css = "…690c3aa511a0eea4dff18991-b041f4c74.css"`; `$body = "body-isme"`.
 *
 * The heading is "AI & Technology" where the card that links here on
 * /programs/ug-programs-atlas reads "Design, AI & Technology" and the file is
 * named `programs-list-design-ai-and-technology`. Transcribed as the page
 * itself renders it.
 */

/* ref .inner-header-wrapper.full-ht — its own photograph, no hero buttons, no
   authored `<br>` in the heading */
export const hero = {
  title: 'AI & Technology',
  image: {
    src: '/assets/images/programs/hero/ai-technology-hero.png',
    srcSet:
      '/assets/images/programs/hero/ai-technology-hero-p-500.png 500w, '
      + '/assets/images/programs/hero/ai-technology-hero-p-800.png 800w, '
      + '/assets/images/programs/hero/ai-technology-hero-p-1080.png 1080w, '
      + '/assets/images/programs/hero/ai-technology-hero.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

const ARROW = { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' };

/*
 * ref .program-list-wrapper > 2 x .program-list.
 *
 * **The two entries differ in both halves**, which no earlier Programs page
 * does:
 *
 *   - each has its **own brochure popup** — the B.Tech one is a live
 *     NoPaperForms widget (the same `1dd30518…` widget
 *     /programs/ug/programs-list-cs-ai-ml-and-ds uses), the BBA one a 580px CRM
 *     iframe (the same `6a3e788e…` widget the management page uses);
 *   - each has its **own eligibility strip** — the B.Tech entry adds a second
 *     value to every cell, the BBA entry does not.
 *
 * So both travel on the entry rather than on the section.
 */
export const programList = {
  entries: [
    {
      title: 'B.Tech (IT, AI & Cybersecurity)',
      eligibility: { label: 'Eligibility Criteria', arrow: ARROW },
      brochure: {
        label: 'Download Brochure',
        title: 'B.Tech brochure request',
        kind: 'npf',
        widget: '1dd30518465e0a04dca61dd8d48ef66a',
      },
      eligibilityRows: [
        {
          label: 'Indian Boards (ISC / CBSE / State Boards)',
          /* the reference abbreviates "Maths" here and spells "Mathematics"
             out in the two rows below it */
          values: ['Minimum 50% in Class XII', 'Maths & Physics are mandatory'],
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
      explore: {
        label: 'Explore Program',
        /* the authored href contains a literal `&` */
        href: '/schools/ugdx/undergraduate/b-tech-in-it-ai-&-cybersecurity',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'BBA (Hons) in AI & Emerging Technologies',
      eligibility: { label: 'Eligibility Criteria', arrow: ARROW },
      brochure: {
        label: 'Download Brochure',
        title: 'BBA (Hons) brochure request',
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
      explore: {
        label: 'Explore Program',
        href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-ai-emerging-technologies',
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
 * /programs/ug/ug-design-and-innovation's, so the set is re-exported.
 */
export { faq } from '@/lib/designInnovationContent';
