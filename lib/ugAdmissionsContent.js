/**
 * /admissions/ug-admissions — copy transcribed 1:1 from
 * `reference/admissions/ug-admissions.php` and its five includes:
 *
 *   assets/include/keydates/btech.php                          (B.Tech, live DB)
 *   assets/include/keydates/keydates-static/bdes.php           (B.Des table)
 *   assets/include/keydates/keydates-static/bba.php            (BBA table)
 *   assets/include/keydates/keydates-static/bsc.php            (B.Sc table)
 *   assets/include/keydates/keydates-static/law.php            (BBA LL.B. table)
 *   assets/include/faq/atlas/admissions/ug-admissions.php
 *
 * One export per section, in the reference's order. Two of the eight sections —
 * the testimonials and the closing banner — are byte-for-byte the same markup
 * /admissions/integrated-admissions carries (diffed card by card, 26/26
 * identical, same lead, same image, same buttons), so they are re-exported from
 * that page's file rather than duplicated.
 *
 * ── Only the B.Tech tab is database-driven ────────────────────────────────
 * The other four calendars are hand-authored HTML in `keydates-static/`; the
 * page comments out the live include above each one and calls the static file
 * instead. `btech.php` is the exception and still runs
 * `getAdmissionCyclesCon($conn, 4)`, so its six values are snapshotted from the
 * live page — the same query, and the same values, as
 * /admissions/integrated-admissions' uGDX tab.
 */

import { testimonials as integratedTestimonials, banner as integratedBanner } from '@/lib/integratedAdmissionsContent';

/*
 * ref section.main-cover-section-isme — four buttons, one more than the other
 * two Admissions pages, and the extra one is a `.btn-ca` rather than a
 * `.btn-primary`. See `PrimaryButton`'s `atlas-576` variant: identical pill,
 * but the page's own `<style>` block drops it to 40px at 576px rather than the
 * stylesheet's 767. The same block re-declares `.buttons-wrapper` so the row
 * turns into a column at 576 too, which is `buttonWrap="row-576"`.
 */
export const hero = {
  eyebrow: 'Undergraduate Admissions',
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
    /* ref a.btn-ca — the one button on the site that is not a `.btn-primary`
       or a `.secondary-btn`, and the only external one in a hero */
    {
      label: 'Continue Application',
      href: 'https://atlasuniversity.edu.in/admissions',
      variant: 'atlas-576',
      external: true,
    },
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'outline' },
    {
      label: 'Download Admissions Policy',
      href: 'https://online.fliphtml5.com/vrcjg/orkl/#p=1',
      variant: 'outline',
      newTab: true,
    },
  ],
};

/* ref .atlas-cards-wrapper > .atlas-cards-grid — four cards here, the same
   two-per-row block /about-us renders with its own four */
export const findYourPath = {
  heading: 'Find Your Path within ATLAS SkillTech University',
  subheading: 'Design, Tech, Law and Management. Your path starts here.',
  cards: [
    {
      title: 'ISDI School of Design & Innovation',
      image: {
        src: '/assets/images/schools/isdi.png',
        srcSet: '/assets/images/schools/isdi-p-500.png 500w, /assets/images/schools/isdi.png 619w',
        alt: '',
      },
      logo: { src: '/assets/images/about/schools/atlas-logo-1.png', alt: '' },
      button: { label: 'Know More', href: '/schools/isdi', variant: 'atlas' },
    },
    {
      title: 'ISME School of Management & Entrepreneurship',
      image: {
        src: '/assets/images/about/schools/ismeschool-cards.png',
        srcSet:
          '/assets/images/about/schools/ismeschool-cards-p-500.png 500w, '
          + '/assets/images/about/schools/ismeschool-cards.png 619w',
        alt: '',
      },
      logo: { src: '/assets/images/about/schools/isme-logologos-school-cards.png', alt: '' },
      button: { label: 'Know More', href: '/schools/isme', variant: 'atlas' },
    },
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
      button: { label: 'Know More', href: '/schools/ugdx', variant: 'atlas' },
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
      button: { label: 'Know More', href: '/schools/law', variant: 'atlas' },
    },
  ],
};

/*
 * The four static calendars share a shape: an `.header-table` caption row over
 * a two-column body, `colspan="3"` (the law table alone uses 4), and an
 * authored `height: 461px` on the table. Every `<tr>` carries its own
 * `style="height: …"`, which on a table row is a minimum.
 *
 * The include's trailing `<script>` recolours any `td b` reading "Open",
 * "Applications Open" or a full `<day><suffix> <Month> <year>` green. That is
 * deterministic over static copy, so `green: true` carries it in the data.
 */
const OPEN = { text: 'Applications Open', green: true };
const CLOSED = { text: 'Closed' };

export const keyDates = {
  heading: 'Key Dates & Deadlines',
  initialTab: 0,
  /* the page's own `<style>` re-declares `.buttons-wrapper`, and it reaches
     these wrappers too — see `KeyDates`' BUTTONS */
  buttonWrap: '576',
  tabs: [
    {
      label: 'ISDI School of Design & Innovation',
      /* ref `class="tab-pane-tab-1 w-tab-pane"` — the numbered panes take
         `font-size: 16px` at <=767 */
      paneNumbered: true,
      blocks: [
        {
          kind: 'table',
          /* ref `<div class="df-container-atlas" style="border: none;">` */
          borderless: true,
          table: {
            caption: 'Applications Open for B.Des Admissions July 2026 Intake ',
            /* no inline colour — the include's own `.header-table` #d20158 stands */
            headerColor: '#d20158',
            colSpan: 3,
            height: 461,
            rowHeights: { caption: 33, columns: 64 },
            columns: ['Cycle', 'Current Cycle'],
            rows: [
              {
                label: ['Applications ', 'Opened'],
                br: true,
                note: { day: '(11', suffix: 'th', rest: 'Sep 2025)' },
                value: OPEN,
                height: 33,
              },
              {
                label: ['Design Aptitude Test & Portfolio'],
                value: { day: '14', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: [' ', 'Result Announcement'],
                br: true,
                value: { day: '15', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: [' ', 'Acceptance Deadline'],
                br: true,
                value: { day: '16', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: [' ', 'Semester Fee'],
                br: true,
                value: { day: '16', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
            ],
          },
          button: {
            label: 'Learn More About B.Des Admissions',
            href: '/schools/isdi/admissions/undergraduate/b-des',
          },
        },
      ],
    },
    {
      label: 'ISME School of Management & Entrepreneurship',
      /* ref `class="tab-pane-tab-2 w-tab-pane"` — the numbered panes take
         `font-size: 16px` at <=767 */
      paneNumbered: true,
      blocks: [
        {
          kind: 'table',
          borderless: true,
          table: {
            caption: 'BBA / BBA (Hons.) Admissions Calendar for July 2026 Intake ',
            headerColor: '#009fe0',
            colSpan: 3,
            height: 461,
            rowHeights: { caption: 33, columns: 33 },
            columns: ['Cycle', 'Current Cycle'],
            rows: [
              {
                label: ['Applications ', 'Opened'],
                br: true,
                note: { day: '(11', suffix: 'th', rest: 'Sep 2025)' },
                value: CLOSED,
                height: 33,
              },
              { label: ['Business Aptitude Test & Interview '], value: CLOSED, height: 64 },
              { label: ['Collaborative ', 'Accelerator '], br: true, value: CLOSED, height: 33 },
              { label: ['Result ', 'Announcement'], br: true, value: CLOSED, height: 33 },
              { label: ['Acceptance ', 'Deadline'], br: true, value: CLOSED, height: 33 },
              { label: ['Annual Fee ', 'Payment Deadline'], br: true, value: CLOSED, height: 64 },
            ],
          },
          button: {
            label: 'Learn More About BBA Admissions',
            href: '/schools/isme/admissions/undergraduate/admissions-bba-bachelor-of-business-administration',
          },
        },
        {
          kind: 'table',
          borderless: true,
          /* ref .dates-fees-container-atlas.mrgtp */
          spaced: true,
          table: {
            caption: 'B.Sc (Hons.) Admissions Calendar for July 2026 Intake ',
            headerColor: '#009fe0',
            colSpan: 3,
            height: 461,
            rowHeights: { caption: 33, columns: 64 },
            /* the authored trailing space is inside the <b>, as on the label */
            columns: ['Cycle', 'Current Cycle '],
            rows: [
              {
                /* "Sep 2026" here against the other three tables' "Sep 2025" */
                label: ['Applications ', 'Opened'],
                br: true,
                note: { day: '(11', suffix: 'th', rest: 'Sep 2026)' },
                value: OPEN,
                height: 64,
              },
              {
                label: ['Business Aptitude Test & Interview '],
                value: { day: '14', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: ['Result ', 'Announcement'],
                br: true,
                value: { day: '15', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: ['Acceptance ', 'Deadline'],
                br: true,
                value: { day: '16', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
              {
                label: ['Annual Fee ', 'Payment Deadline'],
                br: true,
                value: { day: '16', suffix: 'th', rest: 'July 2026', green: true },
                height: 64,
              },
            ],
          },
          button: {
            label: 'Learn More About B.Sc Admissions',
            href: '/schools/isme/admissions/undergraduate/bsc-admissions',
          },
        },
      ],
    },
    {
      label: 'uGDX School of Technology',
      blocks: [
        {
          /* the only live-database calendar on this page — `keydates/btech.php`,
             the same include and the same six values as
             /admissions/integrated-admissions' uGDX tab, including that file's
             own `<style>` setting `.df-card { justify-content: space-between }` */
          kind: 'strip',
          justify: 'between',
          lead: {
            title: ['B.Tech', '‍', 'Applications Start'],
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
            label: 'Learn More About B.Tech Admissions',
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
          borderless: true,
          table: {
            /* the same `keydates-static/law.php`
               /admissions/integrated-admissions includes, here without the
               container's indigo frame */
            caption: 'BBA LL.B. Admissions Calendar for July 2026 Intake ',
            headerColor: '#CC5500',
            colSpan: 4,
            rowHeights: { caption: 33, columns: 33 },
            columns: ['Cycle', 'Current Cycle'],
            rows: [
              {
                label: ['Applications ', 'Opened'],
                br: true,
                note: { day: '(11', suffix: 'th', rest: 'Sep 2026)' },
                value: CLOSED,
                height: 33,
              },
              { label: ['ATLAS Law Aptitude Test '], value: CLOSED, height: 64 },
              { label: ['Personal ', 'Interview '], br: true, value: CLOSED, height: 33 },
              { label: ['Result ', 'Announcement'], br: true, value: CLOSED, height: 33 },
              { label: ['Acceptance ', 'Deadline'], br: true, value: CLOSED, height: 33 },
              { label: ['Semester Fee', ' Payment Deadline'], br: true, value: CLOSED, height: 64 },
            ],
          },
          button: {
            label: 'Learn More About BBA LL.B. Admissions',
            href: '/schools/law/law-admissions',
          },
        },
      ],
    },
  ],
};

/* ref .swiper.common-swiper.mrg-mob-tp-0 — the same eight cards and the same
   lead /admissions/integrated-admissions carries */
export const standOut = {
  heading: 'What Makes You Stand Out',
  subheading:
    'At ATLAS, we seek curiosity, initiative, and the drive to make an impact - qualities that define every successful learner and leader.',
  noMobileTopPadding: true,
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

/* ref .head-wrap.top + .about-story-wrapper-ugdx — the `.btn-normal-wrap`
   /admissions/pg-admissions has, over the photograph
   /admissions/integrated-admissions uses */
export const scholarships = {
  heading: 'Empowering Ambition\nThrough Scholarships',
  buttonWrap: true,
  button: { label: 'Know More', href: '/scholarships-and-financial-aid' },
  text:
    'The ATLAS Scholarship is an initiative to empower students from across India and beyond, helping them realize their vision and aspirations.\n\n'
    + 'It lays the foundation to fuel the evolution of today’s youth into global leaders of the future who can overcome the complex challenges faced by the world today.The program allows the ATLAS Scholars to thrive in the multidisciplinary, diverse and inclusive community of the ATLAS SkillTech University in the heart of India’s financial capital – Mumbai.',
  image: {
    src: '/assets/images/admissions/scholarships/scholarship.png',
    srcSet:
      '/assets/images/admissions/scholarships/scholarship-p-500.png 500w, '
      + '/assets/images/admissions/scholarships/scholarship.png 594w',
    sizes: '(max-width: 594px) 100vw, 594px',
    alt: '',
  },
};

/* both diffed against /admissions/integrated-admissions and identical */
export const testimonials = integratedTestimonials;
export const banner = integratedBanner;

/* ref assets/include/faq/atlas/admissions/ug-admissions.php */
export const faq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'What is the meaning of undergraduate admission?',
      a: ['Undergraduate admission refers to the process of enrolling in a bachelor’s degree program after completing Class 12. It includes application, evaluation and selection based on eligibility criteria set by the university.'],
    },
    {
      q: 'What does it mean to apply as an undergraduate?',
      a: ['Applying as an undergraduate means applying for your first university-level degree after school. Students typically submit academic details, required documents and complete the admission process defined by the university.'],
    },
    {
      q: 'What is the deadline for UG admission?',
      a: ['UG admission deadlines vary by program and admission cycle. ATLAS University follows rolling or phase-based admissions and applicants are advised to check the official admissions page for current dates.'],
    },
    {
      q: 'How to get admission in ATLAS?',
      a: ['To get admission at ATLAS University, students must apply online through the official website. The process may include eligibility checks, assessments, interviews and submission of required documents.'],
    },
    {
      q: 'Who is eligible for undergraduate?',
      a: ['Students who have completed Class 12 or an equivalent qualification from a recognised board are eligible. Specific programs may have additional subject or score requirements.'],
    },
    {
      q: "What are the minimum requirements for admission to a bachelor's degree?",
      a: ['The minimum requirement is successful completion of Class 12 or an equivalent examination. Program-specific criteria, such as subject background or assessments, may also apply.'],
    },
    {
      q: 'What requirements are needed to get into a university?',
      a: ['Admission requirements typically include academic records, application documents and proof of eligibility. Depending on the program, applicants may also be required to complete assessments, interviews, portfolio reviews or other evaluation processes as part of the admissions journey.'],
    },
    {
      q: 'How to check your UG admission status?',
      a: ['Applicants can track their admission progress through the admissions process and official communications from the university. For the latest updates regarding an application, students should refer to their registered contact details or reach out to the admissions team.'],
    },
    {
      q: 'What is the age limit for undergraduate admission?',
      a: ['Undergraduate admission eligibility is primarily based on academic qualifications and program-specific requirements. Applicants should refer to the official admissions guidelines for the latest eligibility criteria.'],
    },
  ],
};
