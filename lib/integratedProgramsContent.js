/**
 * /programs/programs-list-integrated — copy transcribed 1:1 from
 * `reference/programs/programs-list-integrated.php` and its two includes:
 *
 *   assets/include/more-questions.php                            (search panel)
 *   assets/include/faq/atlas/programs/programs-list-integrated.php
 *
 * Four blocks, in the reference's order: hero, the two integrated-programme
 * entries, the AI-search panel, the FAQ.
 *
 * `$css = "…6915c922306a4c1a22aed039-b041f4c74.css"`, its own sheet;
 * `$body = "body-isme"`. The page's `<style>` block is byte-identical to
 * /programs/ug-programs-atlas' and /programs/pg-programs-atlas'.
 */

/*
 * ref .inner-header-wrapper.full-ht. Not its own photograph after all:
 * /programs/ug/programs-list-law-and-policy authors the same CDN file
 * (`lawatlasssss.png`, SHA-1 equal), so it is stored under a neutral name
 * rather than an "integrated" one and both pages point at it.
 */
export const hero = {
  title: 'Integrated Programs',
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
  buttons: [
    {
      label: 'Continue Application',
      href: 'https://atlasuniversity.edu.in/admissions',
      variant: 'atlas-576',
      external: true,
    },
  ],
};

/*
 * ref .program-list-wrapper > 2 x .program-list.
 *
 * Both entries carry the **same** eligibility strip, word for word, so the rows
 * are hoisted out of the entries rather than repeated.
 */
export const programList = {
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
      /*
       * ref `[data-id="law"]` -> `#law-popup-overlay`, whose body is an
       * `<iframe>` to the ATLAS CRM widget. The reference forwards any `utm_*`
       * parameters from the current URL onto that src; `BrochureModal` does the
       * same.
       */
      brochure: {
        label: 'Download Brochure',
        title: 'BBA LL.B. (Hons.) brochure request',
        kind: 'iframe',
        src: 'https://crm.atlasskilltech.app/widgets/6a3e7d3ba1fd0680c6c1ba90/embed',
        height: 621,
        /* this page authors the utm-forwarding script; ug-design-and-innovation
           does not, so the flag is explicit rather than assumed */
        forwardUtm: true,
      },
      explore: {
        label: 'Explore Program',
        href: '/schools/law/program-page-law',
      },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Tech + MBA (AI, ML + TM)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      /* ref `[data-id="btech"]` -> `#npf-popup-overlay-btech`, a NoPaperForms
         widget filled in by `emwgts.js` on first open */
      brochure: {
        label: 'Download Brochure',
        title: 'B.Tech + MBA brochure request',
        kind: 'npf',
        widget: 'b93085def383e0e366e78cd327f18a9d',
      },
      explore: {
        label: 'Explore Program',
        /* the authored href contains a literal `&`, transcribed as-is */
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

/* ref assets/include/faq/atlas/programs/programs-list-integrated.php */
export const faq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'What is a 5-year integrated course after 12th?',
      a: ['A 5-year integrated course is a combined program that students can join directly after Class 12. It seamlessly blends undergraduate and postgraduate studies into one continuous learning path.'],
    },
    {
      q: 'What is an integrated course?',
      a: ['An integrated course combines two levels of education into a single program. It allows students to progress smoothly without separate admissions between degrees.'],
    },
    {
      q: 'Which integrated course is best?',
      a: ['The best integrated course depends on your career goals and interests. Programs that offer strong industry exposure, experiential learning and multidisciplinary options tend to deliver better long-term outcomes.'],
    },
    {
      q: 'What is a 4-year integrated course?',
      a: ['The duration and structure of integrated programs vary by institution and discipline. Integrated programs combine multiple stages of learning within a single academic pathway, providing a more seamless educational experience.'],
    },
    {
      q: 'What is the duration of an integrated course?',
      a: ['Integrated courses usually last 4 or 5 years, depending on the program structure. The duration covers both undergraduate and advanced-level learning.'],
    },
    {
      q: 'Do we get 2 degrees in an integrated course?',
      a: ['Whether students receive one degree or multiple qualifications depends on the specific integrated program and university regulations. Students should refer to the program structure for details on the qualification awarded.'],
    },
    {
      q: 'Is an integrated course better?',
      a: ['An integrated course can be better for students who are clear about their career path early. It saves time, offers academic continuity and provides deeper subject expertise.'],
    },
    {
      q: 'What is the integrated 12 plus graduation?',
      a: ['Integrated 12 plus graduation refers to programs that students can join right after Class 12. These courses combine undergraduate and postgraduate studies into one structured academic journey.'],
    },
    {
      q: 'What is the difference between an integrated degree and a normal degree?',
      a: ['A normal degree follows a single academic level, while an integrated degree combines multiple levels in one program. Integrated degrees offer continuity, flexibility and long-term planning advantages.'],
    },
    {
      q: 'Who is eligible for an integrated program in management?',
      a: ['Eligibility for integrated programs at ATLAS generally requires successful completion of Class 12 from a recognised board. Additional admission requirements may vary by program and may include entrance assessments, portfolio reviews or interviews.'],
    },
  ],
};
