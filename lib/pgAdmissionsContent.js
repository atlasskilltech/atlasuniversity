/**
 * /admissions/pg-admissions — copy transcribed 1:1 from
 * `reference/admissions/pg-admissions.php` and its four includes:
 *
 *   assets/include/keydates/mdes.php       (M.Des key dates)
 *   assets/include/keydates/mba-dmst.php   (MBA DMST key dates)
 *   assets/include/keydates/mba.php        (MBA key dates)
 *   assets/include/faq/atlas/admissions/pg-admissions.php
 *
 * One export per section, in the reference's order.
 *
 * ── The key dates are a database snapshot ─────────────────────────────────
 * `pg-admissions.php:14` opens the same unreachable `diceapp_dice` connection
 * /admissions/integrated-admissions does, and the three includes render
 * `getAdmissionCyclesCon($conn, 6|7|8)` through `showDateCon()`. The values
 * below are snapshotted from the live page. All three cycles are in the past,
 * so every cell except "Application(s) Start" renders `showDateCon()`'s literal
 * `<b>Closed</b>`; the one date that survives is the hard-coded
 * `$special_date = "2025-09-11"`, which the function exempts from the past-date
 * rule. Re-run the snapshot to refresh.
 *
 * Each of the three includes also carries a commented-out `.df-card` (the DAT /
 * AAT exam cell), so every strip is six cards, not seven.
 */

import { testimonials as homeTestimonials } from '@/lib/homeContent';

/* ref section.main-cover-section-isme */
export const hero = {
  eyebrow: 'Postgraduate Admissions',
  title: 'Your Future Starts Here',
  text: 'Admissions Open for 2026. Explore programs in Design and Management - and join us to be the pioneers of tomorrow.',
  image: {
    src: '/assets/images/admissions/hero/atlas-pg.png',
    srcSet:
      '/assets/images/admissions/hero/atlas-pg-p-500.png 500w, '
      + '/assets/images/admissions/hero/atlas-pg-p-800.png 800w, '
      + '/assets/images/admissions/hero/atlas-pg-p-1080.png 1080w, '
      + '/assets/images/admissions/hero/atlas-pg.png 1366w',
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
  buttons: [
    { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'outline' },
    /* the fliphtml5 URL /admissions/integrated-admissions uses is commented out
       one line above this anchor; the live href is an internal flipbook route */
    {
      label: 'Download Admissions Policy',
      href: '/flipbook/pg-policy/',
      variant: 'outline',
      newTab: true,
    },
  ],
};

/* ref .atlas-cards-wrapper > .atlas-cards-grid */
export const findYourPath = {
  heading: 'Find Your Path within ATLAS SkillTech University',
  subheading: 'Design and Management. Your path starts here.',
  cards: [
    {
      title: 'ISDI School of Design & Innovation',
      image: {
        src: '/assets/images/schools/isdi.png',
        srcSet:
          '/assets/images/schools/isdi-p-500.png 500w, '
          + '/assets/images/schools/isdi.png 619w',
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
  ],
};

/* the polygon notch every `.df-card.atlas-bg` carries */
const ARROW = { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' };
/* every cell but the lead resolves to `showDateCon()`'s `<b>Closed</b>` */
const CLOSED = { closed: true };

/*
 * ref .rounded-tabs-mint — `data-current="Tab 1"` and the first link carries
 * `w--current`, so ISDI is the tab that opens. Its pane holds **two** date
 * strips, each with its own button, the second wrapped in
 * `.dates-fees-container-atlas.mrgtp` (`padding-top: 56px; display: block`).
 */
export const keyDates = {
  heading: 'Key Dates & Deadlines',
  initialTab: 0,
  tabs: [
    {
      label: 'ISDI School of Design & Innovation',
      /* ref `class="tab-pane-tab-1 w-tab-pane"` — the numbered panes take
         `font-size: 16px` at <=767 */
      paneNumbered: true,
      blocks: [
        {
          kind: 'strip',
          lead: {
            title: ['M.Des', '', 'Application Start'],
            value: { day: '11', suffix: 'th', rest: 'Sep 2025' },
            arrow: ARROW,
          },
          cards: [
            { label: ['Application Deadline'], value: CLOSED },
            { label: ['Group Discussion and Personal Interview'], value: CLOSED },
            { label: ['Result', 'Announcement'], value: CLOSED },
            { label: ['Acceptance Deadline'], value: CLOSED },
            { label: ['Annual Fee Payment Deadline'], value: CLOSED },
          ],
          button: {
            label: 'Learn More About M.Des Admissions',
            href: '/schools/isdi/admissions/postgraduate/m-des',
          },
        },
        {
          kind: 'strip',
          /* ref .dates-fees-container-atlas.mrgtp */
          spaced: true,
          lead: {
            title: ['MBA DMST', '', 'Application Start'],
            value: { day: '11', suffix: 'th', rest: 'Sep 2025' },
            arrow: ARROW,
          },
          cards: [
            { label: ['Application Deadline'], value: CLOSED },
            { label: ['Group Discussion and Personal Interview'], value: CLOSED },
            { label: ['Result', 'Announcement'], value: CLOSED },
            { label: ['Acceptance ', 'Deadline'], value: CLOSED },
            { label: ['Annual Fee Payment Deadline'], value: CLOSED },
          ],
          button: {
            label: 'Learn More About MBA DMST Admissions',
            href: '/schools/isdi/admissions/postgraduate/mba',
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
          kind: 'strip',
          lead: {
            /* "Applications Start" — plural here, singular on the other two */
            title: ['MBA', '', 'Applications Start'],
            value: { day: '11', suffix: 'th', rest: 'Sep 2025' },
            arrow: ARROW,
          },
          cards: [
            { label: ['Application Deadline'], value: CLOSED },
            { label: ['Group Discussion and Personal Interview'], value: CLOSED },
            { label: ['Result', 'Announcement'], value: CLOSED },
            { label: ['Acceptance Deadline'], value: CLOSED },
            { label: ['Annual Fee Payment Deadline'], value: CLOSED },
          ],
          button: {
            label: 'Learn More About MBA Admissions',
            href: '/schools/isme/admissions/postgraduate/admissions-mba-master-of-business-administration',
          },
        },
      ],
    },
  ],
};

/* ref .swiper.common-swiper.mrg-mob-tp-0 — the same eight cards
   /admissions/integrated-admissions carries, under a longer lead */
export const standOut = {
  heading: 'What Makes You Stand Out',
  subheading:
    'At ATLAS, we look beyond marks and test scores. We seek curiosity, initiative, and the drive to make an impact - qualities that define every successful learner and leader.',
  /* ref `.mrg-mob-tp-0` — the carousel's 40px top padding is zeroed at <=767 */
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

/* ref .head-wrap.top + .about-story-wrapper-ugdx */
export const scholarships = {
  heading: 'Empowering Ambition\nThrough Scholarships',
  /* ref .btn-normal-wrap — a wrapper /admissions/integrated-admissions does not
     have, which keeps the button at its natural width below 768px instead of
     letting `.head-wrap.top`'s `align-items: stretch` pull it full width */
  buttonWrap: true,
  button: { label: 'Know More', href: '/scholarships-and-financial-aid' },
  text:
    'The ATLAS Scholarship is an initiative to empower students from across India and beyond, helping them realize their vision and aspirations.\n\n'
    + 'It lays the foundation to fuel the evolution of today’s youth into global leaders of the future who can overcome the complex challenges faced by the world today.The program allows the ATLAS Scholars to thrive in the multidisciplinary, diverse and inclusive community of the ATLAS SkillTech University in the heart of India’s financial capital – Mumbai.',
  image: {
    src: '/assets/images/admissions/scholarships/ug-add-abt-picture.png',
    srcSet:
      '/assets/images/admissions/scholarships/ug-add-abt-picture-p-500.png 500w, '
      + '/assets/images/admissions/scholarships/ug-add-abt-picture.png 710w',
    sizes: '(max-width: 710px) 100vw, 710px',
    alt: '',
  },
};

/*
 * ref .rounded-tabs-mint — four tabs, and **all four hold the identical four
 * video cards**. Verified card for card against the markup and against the live
 * page: 16 `.swiper-slide`s, 4 per pane, the same four videos, quotes and names
 * in every one. The Students / Industry / Global tabs were never given their
 * own content upstream; they are copies of Parents.
 *
 * Two cosmetic details do differ between Parents and the other three, and both
 * are reproduced because they are what the reference paints:
 *   - the `.bg-image` watermark is `vector-atlas` on Parents and
 *     `testimonial-vector` on the other three
 *   - the `.quote` icon is `quote-icon.svg` on all four Parents cards, and
 *     `quote-icon.svg` then `quote.svg` x3 on the other three tabs
 *   - Parents renders no `.play-icon`; the other three put one on cards 3 and 4
 *
 * The heading is `.h2-tag.mrg16.isdi` (Poppins 400, turning at 991) as on
 * /admissions/integrated-admissions.
 */
const PARENTS_VIDEOS = [
  {
    video: '/assets/videos/testimonials/parents-1.mp4',
    poster: '/assets/images/testimonials/parents-1-poster.jpg',
    quote:
      'I loved seeing the work of students, it was very professional and well curated. Heavily impressed with the work they have done',
    name: '',
    courseVariant: 'isdi',
    course: [{ text: 'Parent' }, { text: 'Goa' }],
    atPos: [],
  },
  {
    /*
     * The reference authors an `.mp4` and a `.webm` source for this one. The
     * mp4 is **dead upstream** — `cdn.prod.website-files.com/…IMG_5462 (1)
     * -transcode.mp4` answers `403 AccessDenied` — and the live page itself
     * falls through to the webm (verified: `currentSrc` is the webm,
     * readyState 4, playing). So the webm is what travels.
     */
    video: '/assets/videos/testimonials/varsha-sharma.webm',
    poster: '/assets/images/testimonials/varsha-sharma-poster.jpg',
    quote:
      'The fact that he’s already working on real industry projects while still in college makes me feel like he’s headed in the right direction.',
    name: 'Varsha Sharma',
    courseVariant: 'isdi',
    course: [{ text: 'Student' }],
    atPos: [],
  },
  {
    video: '/assets/videos/testimonials/parents-2.mp4',
    poster: '/assets/images/testimonials/parents-2-poster.jpg',
    quote:
      'I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing',
    name: 'Amit and Ankita Jeriwala',
    courseVariant: 'isdi',
    course: [{ text: 'Parent' }],
    atPos: [],
  },
  {
    video: '/assets/videos/testimonials/parents-3.mp4',
    poster: '/assets/images/testimonials/parents-3-poster.jpg',
    quote:
      'It was very insightful to watch and I am very happy with the out of the box approach',
    name: 'Nevil Karvalo',
    courseVariant: 'isdi',
    course: [{ text: 'Parent' }],
    atPos: [],
  },
];

/* ref a.play-icon > img — only on cards 3 and 4 of the three copied tabs */
const PLAY_ICON = {
  src: '/assets/icons/play-button.svg',
  alt: '',
  video: 'https://www.youtube.com/watch?v=9RQBN7kYPaY&list=PLlLPSlAVUtBpTSKKrBkFsR0QQ2YnmdgqL&index=1',
};

const copiedTab = (label) => ({
  label,
  watermark: '/assets/images/testimonials/testimonial-vector.png',
  items: PARENTS_VIDEOS.map((item, i) => ({
    ...item,
    quoteIcon: i === 0 ? 'plain' : 'quote',
    ...(i >= 2 ? { playIcon: PLAY_ICON } : {}),
  })),
});

export const testimonials = {
  heading: homeTestimonials.heading,
  subheading: [
    'Don’t take our word for it - hear what our Parents, Students, Industry & Global Partners have to say about their ATLAS journey, experience, and transformation.',
  ],
  quoteIcons: {
    ...homeTestimonials.quoteIcons,
    /* ref the third `.quote` icon, only on this page */
    quote: '/assets/images/testimonials/quote.svg',
  },
  watermark: homeTestimonials.watermark,
  watermarkAlt: homeTestimonials.watermarkAlt,
  tabs: [
    {
      label: 'Parents',
      items: PARENTS_VIDEOS.map((item) => ({ ...item, quoteIcon: 'plain' })),
    },
    copiedTab('Students'),
    copiedTab('Industry'),
    copiedTab('Global'),
  ],
};

/* ref .info-banner-atlas.no-radius */
export const banner = {
  heading: 'Experience the ATLAS\nCampus in Person',
  subheading:
    'Explore our future-ready campus — from innovation labs and design studios to collaborative spaces and student hangouts. Visit us to see where creativity, technology, and community come together.',
  buttons: [
    { label: 'Apply Now', href: '/applicationform', variant: 'atlas' },
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'atlas' },
  ],
  image: {
    src: '/assets/images/campus/banner/pr-banner-admission.png',
    srcSet:
      '/assets/images/campus/banner/pr-banner-admission-p-500.png 500w, '
      + '/assets/images/campus/banner/pr-banner-admission.png 590w',
    sizes: '100vw',
    alt: '',
  },
};

/* ref assets/include/faq/atlas/admissions/pg-admissions.php */
export const faq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'Can I get direct admission in PG?',
      a: ['PG admissions at ATLAS University are based on eligibility and the admission process defined for each program. This may include an application review, academic evaluation and interaction or assessment, depending on the course.'],
    },
    {
      q: 'Who qualifies for postgraduate?',
      a: ['Candidates who have completed an undergraduate degree from a recognised university are eligible for postgraduate programs. Additional criteria may apply based on the chosen specialisation.'],
    },
    {
      q: 'Which PG degree is best?',
      a: ['The best PG degree depends on your academic background and career goals. Programs that combine advanced learning with industry exposure tend to offer stronger career relevance.'],
    },
    {
      q: 'What is the meaning of PG admission?',
      a: ['PG admission refers to the process of enrolling in a postgraduate program after completing a bachelor’s degree. It includes application, eligibility verification and selection as per university guidelines.'],
    },
    {
      q: 'Who is eligible for postgraduate programs at ATLAS SkillTech University?',
      a: ["Applicants must typically hold a recognised bachelor's degree and meet the eligibility criteria specified for their chosen program. Additional admission requirements may vary depending on the course."],
    },
    {
      q: 'How much are post-graduate fees?',
      a: ['Postgraduate fees at ATLAS University vary by program and specialisation. Applicants are advised to check individual program pages or contact admissions for the most accurate and updated fee details.'],
    },
    {
      q: 'What are the requirements for a postgraduate degree?',
      a: ['A completed undergraduate degree is the primary requirement for postgraduate study. Universities may also require academic transcripts, application forms and program-specific assessments.'],
    },
    {
      q: 'What qualifications do you need for postgraduate?',
      a: ['To pursue a postgraduate course, students must hold a bachelor’s degree from a recognised institution. Some programs may prefer relevant academic or professional backgrounds.'],
    },
    {
      q: 'What are the admission requirements for postgraduate programs at ATLAS?',
      a: ['Applicants must meet the academic eligibility requirements for their chosen program and complete the admissions process. Depending on the program, additional evaluations such as interviews, assessments or portfolio reviews may be required.'],
    },
    {
      q: 'What is the deadline for applying for Masters?',
      a: ['Application deadlines vary by program and admission cycle. Applicants should refer to the official postgraduate admissions page for the latest dates and application timelines.'],
    },
    {
      q: 'When to apply for a postgraduate course?',
      a: ['Students are encouraged to apply as early as possible once applications open. Early application allows sufficient time for document submission, eligibility verification and completion of the admissions process.'],
    },
  ],
};
