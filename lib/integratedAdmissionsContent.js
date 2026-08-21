/**
 * /admissions/integrated-admissions — copy transcribed 1:1 from
 * `reference/admissions/integrated-admissions.php` and its four includes:
 *
 *   assets/include/keydates/btech.php                        (B.Tech key dates)
 *   assets/include/keydates/keydates-static/law.php          (BBA LL.B. table)
 *   assets/include/faq/atlas/admissions/integrated-admissions.php
 *
 * One export per section, in the reference's order.
 *
 * ── The B.Tech key dates are a database snapshot ──────────────────────────
 * `integrated-admissions.php:16` opens a mysqli connection to `diceapp_dice`
 * and `keydates/btech.php` renders `getAdmissionCyclesCon($conn, 4)` through
 * `showDateCon()`. That database is not reachable from this checkout — the
 * local reference fatals on the connect before emitting a single byte of the
 * body — so `keyDates.tech.cards[].value` is snapshotted from the live page
 * (https://atlasuniversity.edu.in/admissions/integrated-admissions), which is
 * the same query against the live database. Re-run the snapshot to refresh it.
 *
 * `showDateCon()` returns the literal `<b>Closed</b>` for a null or past date,
 * with one exception: the hard-coded `$special_date = "2025-09-11"` is shown
 * even though it is in the past, which is why "Applications Start" still reads
 * 11th Sep 2025. The ordinal suffix and the `<sup>` are the function's own
 * formatting and are carried in the data as `{ day, suffix, rest }`.
 */

import { testimonials as homeTestimonials } from '@/lib/homeContent';

/* ref section.main-cover-section-isme */
export const hero = {
  /* ref .course-duration-isme.atlas */
  eyebrow: 'Integrated Admissions',
  title: 'Your Future Starts Here',
  text: 'Admissions Open for 2026. Explore programs in Design, Management, Entrepreneurship, Technology, and Law - and join us to be the pioneers of tomorrow.',
  image: {
    src: '/assets/images/admissions/hero/atlas-ug.png',
    srcSet:
      '/assets/images/admissions/hero/atlas-ug-p-500.png 500w, '
      + '/assets/images/admissions/hero/atlas-ug-p-800.png 800w, '
      + '/assets/images/admissions/hero/atlas-ug-p-1080.png 1080w, '
      + '/assets/images/admissions/hero/atlas-ug.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
  buttons: [
    { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    /* ref variant `w-variant-edbe4a85…` — transparent with a 2px white border */
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'outline' },
    {
      label: 'Download Admissions Policy',
      href: 'https://online.fliphtml5.com/vrcjg/orkl/#p=1',
      variant: 'outline',
      newTab: true,
    },
  ],
};

/* ref .atlas-cards-wrapper > .atlas-cards-grid — the same two-per-row block
   /about-us renders with four cards, so it is the same component */
export const findYourPath = {
  heading: 'Find Your Path within ATLAS SkillTech University',
  subheading: 'Technology and Law. Your path starts here.',
  cards: [
    {
      title: 'uGDX School of Technology',
      image: {
        src: '/assets/images/about/schools/ugdxschool-cards-2.png',
        srcSet:
          '/assets/images/about/schools/ugdxschool-cards-2-p-500.png 500w, '
          + '/assets/images/about/schools/ugdxschool-cards-2.png 620w',
        alt: '',
      },
      logo: { src: '/assets/images/about/schools/ugdxlogos-school-cards.png', alt: '' },
      button: { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    },
    {
      title: 'ATLAS School of Law',
      image: {
        src: '/assets/images/about/schools/lawschool-cards-2.png',
        srcSet:
          '/assets/images/about/schools/lawschool-cards-2-p-500.png 500w, '
          + '/assets/images/about/schools/lawschool-cards-2.png 619w',
        alt: '',
      },
      logo: { src: '/assets/images/about/schools/lawlogos-school-cards.png', alt: '' },
      button: { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    },
  ],
};

/*
 * ref .rounded-tabs-mint — `data-current="Tab 5"` and the second link carries
 * `w--current`, so ATLAS School of Law is the tab that opens, not uGDX.
 */
export const keyDates = {
  heading: 'Key Dates & Deadlines',
  /* index 1 = ATLAS School of Law */
  initialTab: 1,
  tabs: [
    {
      label: 'uGDX School of Technology',
      /* ref .df-container-atlas > 6x .df-card, from keydates/btech.php. A tab
         holds a list of strips; /admissions/pg-admissions' ISDI tab has two. */
      blocks: [
        {
          kind: 'strip',
          /* keydates/btech.php ships a `<style>` setting
             `.df-card { justify-content: space-between }` */
          justify: 'between',
          lead: {
            /* ref .df-text-2.atlas — an authored empty line between the two,
               written in the reference as `B.Tech<br />&zwnj;<br />Applications Start` */
            title: ['B.Tech', '‍', 'Applications Start'],
            /* ref .df-txt-wrap > .df-text-2.f14 */
            value: { day: '11', suffix: 'th', rest: 'Sep 2025' },
            arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
          },
          cards: [
            { label: ['Application', 'Deadline '], value: { day: '20', suffix: 'th', rest: 'Aug 2026' } },
            { label: ['Interview Date'], value: { day: '20', suffix: 'th', rest: 'Aug 2026' } },
            { label: ['Result', 'Announcement'], value: { day: '21', suffix: 'st', rest: 'Aug 2026' } },
            { label: ['Acceptance Deadline'], value: { day: '22', suffix: 'nd', rest: 'Aug 2026' } },
            {
              label: ['Semester 1 Fee Payment Deadline'],
              value: { day: '24', suffix: 'th', rest: 'Aug 2026' },
            },
          ],
          button: {
            label: 'Learn More About B.Tech + MBA Admissions',
            href: '/schools/ugdx/admissions/ugdx-admissions',
          },
        },
      ],
    },
    {
      label: 'ATLAS School of Law',
      blocks: [
        {
          kind: 'table',
      /* ref keydates/keydates-static/law.php — a hand-authored static table.
         `headerColor` is the inline `background-color: #CC5500`, which overrides
         the include's own `.header-table { background-color: #d20158 }`. */
      table: {
        caption: 'BBA LL.B. Admissions Calendar for July 2026 Intake ',
        headerColor: '#CC5500',
        /* authored inline as `margin: 0`, which cancels Bootstrap's own
           `.table { margin-bottom: 1rem }` — /admissions/ug-admissions'
           four tables author no margin and therefore keep it */
        margin: 0,
        /* every <tr> carries an authored `style="height: …"`; on a table row
           that is a minimum, so the two 64px rows really are 12px taller than
           the rest and the rest still grow when their cells wrap */
        rowHeights: { caption: 33, columns: 33 },
        columns: ['Cycle', 'Current Cycle'],
        rows: [
          {
            /* `br: true` marks the authored `<br class="br">`, which is
               `display: none` above 1100px and `display: block` at or below */
            label: ['Applications ', 'Opened'],
            br: true,
            /* a second <b> in the same cell; the include's trailing <script>
               colours any `td b` matching `<day><suffix> <Month> <year>` green */
            note: { day: '(11', suffix: 'th', rest: 'Sep 2026)' },
            value: { text: 'Closed' },
            height: 33,
          },
          { label: ['ATLAS Law Aptitude Test '], value: { text: 'Closed' }, height: 64 },
          { label: ['Personal ', 'Interview '], br: true, value: { text: 'Closed' }, height: 33 },
          { label: ['Result ', 'Announcement'], br: true, value: { text: 'Closed' }, height: 33 },
          { label: ['Acceptance ', 'Deadline'], br: true, value: { text: 'Closed' }, height: 33 },
          { label: ['Semester Fee', ' Payment Deadline'], br: true, value: { text: 'Closed' }, height: 64 },
        ],
      },
          button: {
            label: 'Learn More About BBA LL.B Admissions.',
            href: '/schools/law/law-admissions',
          },
        },
      ],
    },
  ],
};

/* ref .swiper.common-swiper > 8x .core-atlas-card */
export const standOut = {
  heading: 'What Makes You Stand Out',
  subheading:
    'At ATLAS, we seek curiosity, initiative, and the drive to make an impact - qualities that define every successful learner and leader.',
  cards: [
    {
      title: 'Statement of Purpose (SOP)',
      text: 'A clear expression of your goals, values, and why you want to be part of ATLAS.',
    },
    {
      title: 'Academic Excellence',
      text: 'Strong academic foundation that reflects consistency, curiosity, and a drive to learn.',
    },
    {
      title: 'Entrance Test & Interview Performance',
      text: 'Confidence, clarity, and original thinking during assessments and discussions.',
    },
    {
      title: 'Co-curricular & Extra-curricular Activities',
      text: 'Highlight your participation, leadership, & creative pursuits beyond academics.',
    },
    {
      title: 'Problem-solving & Critical Thinking',
      text: 'Show how you approach challenges with logic, insight, and innovation.',
    },
    {
      title: 'Community & Volunteer Work',
      text: 'Reflect your empathy, humility, and contribution to society through meaningful action.',
    },
    {
      title: 'Motivations & Achievements',
      text: 'Illustrate your personal milestones and what fuels your ambition.',
    },
    {
      title: 'Transformative Experiences',
      text: 'Share defining moments that shaped your perspective and personal growth.',
    },
  ],
};

/* ref .head-wrap.top + .about-story-wrapper-ugdx */
export const scholarships = {
  heading: 'Empowering Ambition\nThrough Scholarships',
  button: { label: 'Know More', href: '/scholarships-and-financial-aid' },
  /* ref .abt-text — the reference's own double <br /> between the paragraphs,
     and the missing space after "today." in the second, both as authored */
  text:
    'The ATLAS Scholarship is an initiative to empower students from across India and beyond, helping them realize their vision and aspirations.\n\n'
    + 'It lays the foundation to fuel the evolution of today’s youth into global leaders of the future who can overcome the complex challenges faced by the world today.The program allows the ATLAS Scholars to thrive in the multidisciplinary, diverse and inclusive community of the ATLAS SkillTech University in the heart of India’s financial capital – Mumbai.',
  image: {
    src: '/assets/images/admissions/scholarships/scholarship.png',
    srcSet:
      '/assets/images/admissions/scholarships/scholarship-p-500.png 500w, '
      + '/assets/images/admissions/scholarships/scholarship.png 594w',
    sizes: '100vw',
    alt: '',
  },
};

/*
 * ref .info-banner-atlas.no-radius — the same band /campus-atlas and
 * /life-at-atlas close with, but `no-radius` drops the 32px corners and the
 * band is a direct child of `.section` rather than sitting inside a
 * `.container`, so it spans the full viewport.
 */
export const banner = {
  heading: 'Experience the ATLAS Campus in Person',
  subheading:
    'Explore our future-ready campus — from innovation labs and design studios to collaborative spaces and student hangouts. Visit us to see where creativity, technology, and community come together.',
  buttons: [
    { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'atlas' },
  ],
  image: {
    src: '/assets/images/admissions/banner/campus.png',
    srcSet:
      '/assets/images/admissions/banner/campus-p-500.png 500w, '
      + '/assets/images/admissions/banner/campus.png 531w',
    sizes: '100vw',
    alt: '',
  },
};

/*
 * ref assets/include/faq/atlas/admissions/integrated-admissions.php — the same
 * Bootstrap accordion every page ships, so it renders through
 * `components/Home/FAQ`, which owns the design and takes only `data`.
 */
export const faq = {
  heading: 'Questions? We can read your mind',
  /* ref .accordion-button::after — the include hard-codes this icon, and the
     `$arrow = "law-down-arrow.svg"` assigned right before the include is never
     read */
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'What is integrated admission?',
      a: [
        'Integrated admission refers to enrolling in a combined academic program that students can join directly after Class 12. It allows learners to pursue undergraduate and advanced studies in a single, continuous academic journey.',
      ],
    },
    {
      q: 'How to apply for integrated admission?',
      a: [
        'Applicants can apply online through the official ATLAS admissions portal. The admissions process may include application review, eligibility verification and program-specific evaluation criteria such as assessments or interviews where applicable.',
      ],
    },
    {
      q: 'What are the admission deadlines for integrated programs at ATLAS?',
      a: [
        'Application timelines may vary by program and admission cycle. Applicants should refer to the official Integrated Admissions page for the latest deadlines and important admission updates.',
      ],
    },
    {
      q: 'Who is eligible for integrated program in management?',
      a: [
        'Students who have completed Class 12 or an equivalent qualification from a recognised board are eligible. Additional eligibility criteria may apply depending on the specific management program.',
      ],
    },
  ],
};

/*
 * ref .rounded-tabs-mint — the same four tabs and the same 26 cards the
 * homepage carries, verified card for card against `index.php`. Exactly two
 * things differ, so the set is derived rather than duplicated:
 *
 *   - the lead (the homepage's is about parents only, and is two authored
 *     lines; this one is a single line about all four audiences)
 *   - the first Parents card's `.st-course`, which reads "Bijal Vasaria /
 *     Parent" on the homepage and "Parent / Goa" here
 *
 * The heading is `.h2-tag.mrg16.isdi` here against the homepage's plain
 * `.h2-tag.mrg16` — Poppins 400 turning at 991px rather than Manrope 500
 * turning at 767 — which the component takes as `headingVariant="isdi"`.
 */
export const testimonials = {
  ...homeTestimonials,
  subheading: [
    'Don’t take our word for it - hear what our Parents, Students,Industry & Global Partners have to say about their ATLAS journey, experience, and transformation.',
  ],
  tabs: homeTestimonials.tabs.map((tab, i) =>
    i !== 0
      ? tab
      : {
          ...tab,
          items: tab.items.map((item, j) =>
            j !== 0 ? item : { ...item, course: [{ text: 'Parent' }, { text: 'Goa' }] },
          ),
        },
  ),
};
