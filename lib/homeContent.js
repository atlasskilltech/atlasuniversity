/**
 * Homepage content — transcribed 1:1 from reference/index.php.
 * One export per section, added as each section is built.
 */

/* --- Section 1: hero (ref index.php:54-90, .main-cover-section-isme) ------ */
export const hero = {
  heading: 'India’s First New-Age Urban Multidisciplinary University',
  subheading: 'Where future leaders, innovators and changemakers are forged',
  buttons: [
    // ref variant `w-variant-9df390f6…` -> atlas: #02b3c3 on black text
    { label: 'Apply to ATLAS', href: '/applicationform', variant: 'atlas' },
    {
      label: 'Continue Application',
      href: 'https://atlasuniversity.edu.in/admissions',
      variant: 'atlas',
      external: true,
    },
    // ref variant `w-variant-edbe4a85…` -> outline-white: transparent + 2px white border
    { label: 'Schedule a Visit', href: '/campusvisit', variant: 'outline' },
  ],
  poster: '/assets/images/hero-poster.jpg',
  video: {
    mp4: '/assets/videos/homepage-hero.mp4',
    webm: '/assets/videos/homepage-hero.webm',
  },
};

/* --- Section 2: awards marquee (ref index.php:91-226, .awards.atlas) ------
 *
 * Twelve `.aw-card` slides, transcribed verbatim. `title` / `press` are arrays
 * because the reference hard-codes a <br /> after every entry — the copy is
 * laid out on fixed lines, not wrapped, so the breaks are content, not styling.
 * Leading/trailing spaces around each upstream <br /> collapse at the start and
 * end of a line box, so the lines are stored trimmed.
 *
 * Two upstream typos are reproduced deliberately so the render matches:
 *   - slide 2 press: "B-Schoo" / "l Survey 2026" (the <br /> splits the word)
 *   - slide 12 press: "BY TOI" (upper-cased, unlike slide 11's "by TOI")
 */
export const awards = [
  {
    title: ['#5 Private B-School', 'in India'],
    press: ['Times Now B-School', 'Survey 2026'],
  },
  {
    title: ['#5 West Zone', '(Including IIMs and IITs)'],
    press: ['Times Now B-Schoo', 'l Survey 2026'],
  },
  {
    title: ['#14 National', 'Overall Ranking', '(Including IIMs and IITs)'],
    press: ['Times Now B-School', 'Survey 2026'],
  },
  {
    title: [
      '#2 Private',
      'Engineering &',
      'Technology University',
      'in Maharashtra',
    ],
    press: ['Education World 2026'],
  },
  {
    title: ['Excellence in Industry', 'Collaboration'],
    press: ['Times Now 2025'],
  },
  {
    title: ['Prestigious Education', 'Brand Award'],
    press: ['Marksmen Daily,', 'Republic (2024 & 2025)'],
  },
  {
    title: ['Top 5 B-Schools', 'in West Zone'],
    press: ["Business World India's", 'Top B-School Rankings 2025'],
  },
  {
    title: ['Top 15 Private', 'B-Schools in India'],
    press: ["Business World India's", 'Top B-School Rankings 2025'],
  },
  {
    title: ['#22 Overall in India'],
    press: ["Business World India's Top", 'B-School Rankings 2025'],
  },
  {
    title: ['Best Institution Award'],
    press: ['World Education', 'Congress (2024 & 2025)'],
  },
  {
    title: ['#1 Emerging', 'Design University'],
    press: ['Times Education Icons', 'by TOI (2022)'],
  },
  {
    title: ['#1 Emerging', 'Management University'],
    press: ['Times Education Icons', 'BY TOI (2022)'],
  },
];

/* --- Sections 3-6: the four programme carousels ---------------------------
 *
 * index.php declares four consecutive, structurally identical sections:
 *
 *   .section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)
 *
 * each holding `.port-card-m-wrap-atlas.port-card-m-wrap-atlasv2` slides. The
 * programme name is baked into the card artwork upstream — the card markup
 * carries no title, only the two buttons — so `name` exists purely as a React
 * key / aria-label anchor and is never rendered as text.
 *
 * What actually varies between the four:
 *
 *   section    accent (bar + notch)          buttons                cards
 *   career     #009fe0  ...atlasisme         custombtnv3  white     8
 *   design     #e12a7b  ...atlasisdi         custombtnv3  white     7
 *   btech      #ed1a3b  ...atlasugdx         custombtnv3  white     4
 *   industry   #41418e  (no modifier)        custombtnv2  #5cbdca   6 + 1
 *
 * The industry section is the only one that deviates structurally: its accent
 * is `.port-card-m-txt-wrap-atlas`'s own default rather than a school
 * modifier, its buttons keep the base `.custombtnv2` teal because the white
 * `.custombtnv3` is never applied, its triangle is `fill="currentColor"` off
 * `.port-card-m-arrow-atlas {color: #41418e}`, and it carries one extra
 * mobile-only card plus a desktop-only banner (see `industryIntegrated`).
 *
 * `image` is the folder copied out of
 *   reference/assets/images/newindex/programv5/<school>/<slug>/{300,600,1000}.webp
 * `href` mirrors `<?php echo $edudomain ?>schools/...`, i.e. site-root.
 * Ampersands inside the upstream hrefs are reproduced literally.
 */

/* --- Section 3: career-focused UG programs (ref index.php:248-618) -------- */
export const careerPrograms = {
  heading: 'Career-Focused Undergraduate Programs',
  subheading: 'Building Tomorrow’s Business & Science Leaders',
  /* ref .port-card-m-txt-wrap-atlasisme (index.php:36-38) */
  accent: '#009fe0',
  applyHref: '/applicationform',
  programs: [
    {
      name: 'B.Sc. (Hons.) in Finance',
      image: '/assets/images/programs/isme/bsc-finance',
      href: '/schools/isme/programs/undergraduate/bsc-hons/bsc-hons-in-finance',
      alt: 'BSc Hons Finance student analyzing financial data and charts for investment and business insights',
    },
    {
      name: 'BBA (Hons.) in AI & Emerging Technologies',
      image: '/assets/images/programs/isme/ai-emerging-technologies',
      href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-ai-emerging-technologies',
      alt: 'Student working on a laptop for BBA (Hons.) in AI and Emerging Technologies program at ATLAS University',
    },
    {
      name: 'BBA (Hons.) majoring in Business Analytics',
      image: '/assets/images/programs/isme/business-analytics',
      href: '/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-analytics',
      alt: 'BBA and BBA Hons Business Analytics students working on laptop learning data analysis skills',
    },
    {
      name: 'BBA (Hons.) majoring in Finance',
      image: '/assets/images/programs/isme/bba-finance',
      href: '/schools/isme/programs/undergraduate/bba-hons/majoring-in-finance',
      alt: 'BBA Business Analytics program students gaining hands-on experience in data analysis and technology',
    },
    {
      name: 'BBA (Hons.) majoring in Marketing',
      image: '/assets/images/programs/isme/marketing',
      href: '/schools/isme/programs/undergraduate/bba-hons/majoring-in-marketing',
      alt: 'BBA and BBA Hons Marketing students discussing strategies in a business meeting with laptop',
    },
    {
      name: 'BBA (Hons.) majoring in Business Psychology',
      image: '/assets/images/programs/isme/business-psychology',
      href: '/schools/isme/programs/undergraduate/bba-hons/majoring-in-business-psychology',
      alt: 'BBA and BBA Hons Business Psychology program concept with brain illustration and human interaction',
    },
    {
      name: 'BBA (Hons.) in Digital Branding & Advertising',
      image: '/assets/images/programs/isme/digital-branding-advertising',
      href: '/schools/isme/programs/undergraduate/bba-hons/bba-hons-digital-branding-advertising',
      alt: 'BBA Digital Branding and Advertising program student working on laptop with digital marketing analytics and branding tools',
    },
    {
      name: 'B.Sc. in Economics & Data Analytics',
      image: '/assets/images/programs/isme/bsc-economics-data-analytics',
      href: '/schools/isme/programs/undergraduate/bsc-hons/bsc-in-economics-and-data-analytics',
      alt: 'BSc Economics and Data Analytics student working on laptop analyzing data and coding for economic insights',
    },
  ],
};

/* --- Section 4: design-led UG programs (ref index.php:623-949) ------------ */
export const designLedPrograms = {
  heading: 'Design-Led Undergraduate Programs',
  subheading: 'Shaping Creative Thinkers into Industry-Ready Designers',
  /* ref .port-card-m-txt-wrap-atlasisdi (index.php:33-35) */
  accent: '#e12a7b',
  applyHref: '/applicationform',
  programs: [
    {
      name: 'B.Des in Animation & VFX',
      image: '/assets/images/programs/isdi/animation-vfx',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx',
      alt: 'BDes Animation and VFX program showcasing 3D character animation and visual effects on laptop screen',
    },
    {
      name: 'B.Des in Communication Design',
      image: '/assets/images/programs/isdi/communication-design',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-communication-design',
      alt: 'BDes Communication Design program showcasing creative print design and visual storytelling in graphic design work',
    },
    {
      name: 'B.Des in Fashion Communication & Styling',
      image: '/assets/images/programs/isdi/fashion-communication-styling',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling',
      alt: 'BDes Fashion Communication and Styling program showcasing creative fashion styling, design, and visual presentation',
    },
    {
      name: 'B.Des in Fashion Design',
      image: '/assets/images/programs/isdi/fashion-design',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design',
      alt: 'BDes Fashion Design program showcasing modern fashion design, garment styling, and creative apparel concepts',
    },
    {
      name: 'B.Des in Interior Design',
      image: '/assets/images/programs/isdi/interior-design',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design',
      alt: 'BDes Interior Design program showcasing modern interior space design, architecture, and creative home styling concepts',
    },
    {
      name: 'B.Des in Product Design',
      image: '/assets/images/programs/isdi/product-design',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design',
      alt: 'BDes Product Design program showcasing innovative product design, industrial design, and modern prototype concepts',
    },
    {
      name: 'B.Des in Strategic Design Management',
      image: '/assets/images/programs/isdi/strategic-design-management',
      href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-management',
      alt: 'BDes Strategic Design Management program showcasing digital product design, user interface design, and app development concepts',
    },
  ],
};

/* --- Section 5: future-ready B.Tech programs (ref index.php:952-1143) -----
 * Upstream the heading carries a trailing space ("…Programs "); it collapses
 * on render, so it is stored trimmed. */
export const futureReadyBTech = {
  heading: 'Future-Ready B.Tech Programs',
  subheading: 'Designed for the Next Gen Tech Leaders',
  /* ref .port-card-m-txt-wrap-atlasugdx (index.php:30-32) */
  accent: '#ed1a3b',
  applyHref: '/applicationform',
  programs: [
    {
      name: 'B.Tech in CS, AI & ML',
      image: '/assets/images/programs/btech/cs-ai-ml',
      href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-ml',
      alt: 'BTech Computer Science AI and Machine Learning student using virtual reality headset for advanced technology learning',
    },
    {
      name: 'B.Tech in CS, AI & Robotics',
      image: '/assets/images/programs/btech/cs-ai-robotics',
      href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-robotics',
      alt: 'BTech AI and Robotics program showcasing humanoid robot technology',
    },
    {
      name: 'B.Tech in CS, AI & Data Science',
      image: '/assets/images/programs/btech/cs-ai-datascience',
      href: '/schools/ugdx/undergraduate/b-tech-in-cs-ai-&-data-science',
      alt: 'BTech CS AI and Data Science program with data analytics dashboard on laptop',
    },
    {
      name: 'B.Tech in IT, AI & Cybersecurity',
      image: '/assets/images/programs/btech/it-ai-cybersecurity',
      href: '/schools/ugdx/undergraduate/b-tech-in-it-ai-&-cybersecurity',
      alt: 'BTech IT AI and Cybersecurity program with coding and cybersecurity analysis on laptop',
    },
  ],
};

/* --- Section 6: industry-integrated PG programs (ref index.php:1146-1495) --
 *
 * The heading is literally "Industry-Integrated " upstream (trailing space,
 * collapsed on render); "Postgraduate Programs for Real Careers" is the
 * sub-heading, not part of the title.
 *
 * Two Bootstrap visibility switches, both hinging on Bootstrap's `lg` (992px),
 * which is also this project's `lg`:
 *   - the AI-Driven Digital Branding card is `d-block d-lg-none` — mobile and
 *     tablet only (index.php:1437)
 *   - the wide banner is `d-none d-lg-block` — desktop only (index.php:1485)
 * They are the same programme, offered as a card below 992px and as a banner
 * above it, so exactly one of the two is on screen at any width.
 */
export const industryIntegrated = {
  heading: 'Industry-Integrated',
  subheading: 'Postgraduate Programs for Real Careers',
  /* ref .port-card-m-txt-wrap-atlas / .port-card-m-arrow-atlas defaults —
   * this section applies no school modifier, so both keep the base indigo. */
  accent: '#41418e',
  /* ref `.custombtnv2` without `.custombtnv3`: the base teal shows through. */
  buttons: 'teal',
  applyHref: '/applicationform',
  programs: [
    {
      name: 'MBA in Financial Planning & Applied Finance',
      image: '/assets/images/programs/isme/mba-in-financial-planning-applied-finance',
      href: '/schools/isme/programs/postgraduate/mba-financial-planning-applied-finance',
      alt: 'MBA Financial Planning and Applied Finance program with financial analysis and investment planning tools',
    },
    {
      name: 'MBA in Investment Banking',
      image: '/assets/images/programs/isme/mba-in-investment-banking',
      href: '/schools/isme/programs/postgraduate/program-mba-in-investment-banking',
      alt: 'MBA Investment Banking program with financial market analysis and stock trading insights',
    },
    {
      name: 'MBA in FinTech',
      image: '/assets/images/programs/isme/mba-in-fintech',
      href: '/schools/isme/programs/postgraduate/program-mba-in-fintech',
      alt: 'MBA FinTech program with students collaborating on financial technology and digital finance solutions',
    },
    {
      name: 'MBA for the AI World',
      image: '/assets/images/programs/isme/mba-for-ai-world',
      href: '/schools/isme/programs/postgraduate/mba-hyper/mba-with-specialisation',
      alt: 'MBA in AI program showcasing artificial intelligence and business analytics technology',
    },
    {
      name: 'MBA in Design Management & Strategic Thinking',
      image: '/assets/images/programs/isme/design-management-strategic-thinking',
      href: '/schools/isdi/programs/postgraduate/mba-in-design-management-strategic-thinking',
      alt: 'MBA Design Management and Strategic Thinking program with digital design and creative workflow',
    },
    {
      name: 'M.Des in Design Futures',
      image: '/assets/images/programs/isme/design-futures',
      href: '/schools/isdi/programs/postgraduate/m-des-in-design-futures',
      alt: 'MDes Design Futures program with student working on digital product design and innovation',
    },
    {
      /* ref .swiper-slide.d-block.d-lg-none */
      name: 'PG Diploma in AI-Driven Digital Branding & Advertising',
      image: '/assets/images/programs/isme/ai-driven-digital-branding-advertising',
      href: '/schools/isme/programs/postgraduate/pgp-diploma-in-ai-driven-digital-branding-advertising',
      alt: 'Postgraduate Diploma in AI Driven Digital Branding and Advertising with marketing team collaboration',
      belowDesktopOnly: true,
    },
  ],
  /* ref .container.px-0.py-5.pb-0.d-none.d-lg-block (index.php:1485-1494) */
  banner: {
    href: '/applicationform',
    src: '/assets/images/programs/ai-driven-digital-branding-advertising-banner.webp',
    width: 1920,
    height: 320,
    alt: 'AI Driven Digital Branding and Advertising postgraduate diploma with marketing team collaboration',
  },
};


/* --- Section 7: the ATLAS impact -----------------------------------------
 *
 * Two consecutive top-level blocks in index.php make up one visual section:
 *
 *   1499-1551  div.section > section.blueprints > .container
 *                > h2.h2-tag.mrgtbm0   <- the heading below
 *                > .outcome-wrap       <- NOT rendered: the page stylesheet
 *                                         sets `display: none` on it, so the
 *                                         three legacy `.outc-card`s it holds
 *                                         never reach the screen. Superseded
 *                                         by the stack, which carries newer
 *                                         copy and figures.
 *   1552-1968  div.page-wrapper-stack > main.main-wrapper-stack
 *                > .section_stack > .container > .container-large
 *                > .stack_component > 3 x .stack_card.atlas
 *
 * Each stack card is `img.outcome-img` + `.outcome-content.atlas-rt.bg1`
 * (title, then two `.content-block-outcome-atlas` stat blocks). The first stat
 * block of every card also carries a `.marquee-swiper` strip of logos or
 * alumni portraits; the second never does.
 *
 * The cards are `position: sticky` with rising `top` offsets (4rem / 10rem /
 * 13rem) and large bottom margins, so they pile up on each other as the page
 * scrolls. That effect is pure CSS — no JavaScript is involved.
 *
 * `desk` is 759x622, `mob` is 390x319. The srcset descriptors ("500w" for the
 * 390px-wide mobile file) are the reference's own and are reproduced verbatim
 * so the browser picks the same file at the same widths.
 */
export const atlasImpact = {
  heading: 'From Campus to Career & Beyond: The ATLAS Impact',
  cards: [
    {
      id: 'startup',
      /* ref .stack_card.first.atlas */
      title: 'Build Your Startup',
      image: '/assets/images/impact/startup',
      alt: 'young entrepreneurs posing together representing startup success and teamwork',
      stats: [
        {
          count: '1200+',
          desc: ['Alumni', 'Start-ups'],
          /* ref .swiper-in-stack — 6 portraits, authored twice (12 slides) */
          marquee: {
            variant: 'circle',
            duration: 'animate-impact-marquee-48',
            items: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n) => ({
              src: `/assets/images/impact/startup/alumni/student-${n}.png`,
              alt: 'alumni student',
            })),
          },
        },
        {
          count: '25+',
          desc: ['Start-up Showcases & Masterclasses Every Semester'],
        },
      ],
    },
    {
      id: 'masters',
      /* ref .stack_card.second.atlas */
      title: 'Pursue Your Masters',
      image: '/assets/images/impact/masters',
      alt: 'group of students at Harvard Business School representing global academic excellence',
      stats: [
        {
          count: '60+',
          desc: ['University Partnerships'],
          /* ref .swiper-in-stack — 14 university marks, authored once */
          marquee: {
            variant: 'logo',
            duration: 'animate-impact-marquee-56',
            items: [
              ['1-kings', 'Kings College London logo representing global university education'],
              ['2-nyu', 'New York University logo'],
              ['3-bristol', 'University of Bristol logo'],
              ['4-southhampton', 'University of Southampton logo'],
              ['5-parsons', 'Parsons School of Design logo'],
              ['6-lse', 'London School of Economics logo'],
              ['7-babson', 'Babson College logo'],
              ['8-santa-clara', 'Santa Clara University logo'],
              ['9-ie', 'IE University logo'],
              ['10-ifa', 'IFA Paris Fashion School logo'],
              ['11-rmit', 'RMIT University logo'],
              ['12-smu', 'Singapore Management University logo'],
              ['13-shizenkan', 'Shih Chien University logo'],
              ['14-sea', 'Semester at Sea logo'],
            ].map(([slug, alt]) => ({
              src: `/assets/images/impact/masters/logos/${slug}-scroll.png`,
              alt,
            })),
          },
        },
        {
          count: '1 out of 3',
          desc: ['Students Get a Minimum', 'of 3 Masters Offers'],
        },
      ],
    },
    {
      id: 'career',
      /* ref .stack_card.third.atlas */
      title: 'Kickstart Your Career',
      image: '/assets/images/impact/career',
      alt: 'student standing at Ogilvy office representing advertising and marketing career success',
      stats: [
        {
          count: '1200+',
          desc: ['On Campus Interviews Every Semester'],
          /* ref .swiper-in-stack — 5 employer marks, authored twice (10 slides) */
          marquee: {
            variant: 'logo',
            duration: 'animate-impact-marquee-40',
            items: [
              ['logo-3', 'McKinsey and Company logo'],
              ['logo-2', 'Morgan Stanley logo'],
              ['logo-5', 'Deloitte logo'],
              ['logo-4', 'EY logo'],
              ['logo-1', 'Edelweiss logo'],
              ['logo-3', 'McKinsey and Company logo'],
              ['logo-2', 'Morgan Stanley logo'],
              ['logo-5', 'Deloitte logo'],
              ['logo-4', 'EY logo'],
              ['logo-1', 'Edelweiss logo'],
            ].map(([slug, alt]) => ({
              src: `/assets/images/impact/career/logos/${slug}.png`,
              alt,
            })),
          },
        },
        {
          count: '500+',
          desc: ['Hiring Partners'],
        },
      ],
    },
  ],
};

/* --- Section 8: About ATLAS (ref index.php:1969-1979) ---------------------
 *
 * `section.section > .w-layout-blockcontainer.container.w-container >
 *  .about-story-wrapper > (.abt-cont, .about-image-wrap-atlas)`.
 * A 30% text column beside a `calc(70% - 40px)` image, both `flex: none`, with
 * `justify-content: space-between` soaking up the leftover 8px. No links, no
 * buttons, nothing interactive. `paragraphs` splits on the two upstream
 * `<br /><br />` breaks.
 *
 * `sizes="100vw"` and the 500w/800w/848w descriptors are the reference's own
 * and are kept verbatim: with `w` descriptors the browser density-corrects the
 * image's intrinsic size against `sizes`, which is what drives its laid-out
 * height, so changing them would change the layout.
 */
export const aboutAtlas = {
  heading: 'About ATLAS',
  paragraphs: [
    'ATLAS SkillTech University stands at the forefront of multidisciplinary education, blending design, business, technology, and law into a world-class ecosystem. Situated in the heart of Mumbai -India’s global business capital - we cultivate trailblazers who are equipped to thrive in a rapidly transforming world.',
    'Here, academic rigor meets innovation, global partnerships enrich every classroom, and students are empowered to shape industries, communities, and futures.',
  ],
  image: {
    src: '/assets/images/about/about-img-1.webp',
    srcSet:
      '/assets/images/about/about-img-1-p-500.webp 500w, /assets/images/about/about-img-1-p-800.webp 800w, /assets/images/about/about-img-1.webp 848w',
    sizes: '100vw',
    alt: 'modern university campus with academic buildings and green outdoor spaces',
  },
};

/* --- Section 9: our mission / our vision (ref index.php:1980-1993) --------
 *
 * `section#our-mission.section > .container > .our-content-atlas >
 *  (.our-lt-atlas, .our-rt-atlas)`. Two 50% panels butted together with no
 *  gap inside a `32px 0` rounded, clipped wrapper; each has its own indigo and
 *  its own decorative background pinned right at `background-size: contain`.
 *  They stack full-width below 768px. No links, no icons, no interaction.
 *
 * The vision copy carries two hard `<br />`s upstream, so it is stored as
 * lines rather than one string.
 */
export const missionVision = {
  panels: [
    {
      id: 'mission',
      title: 'Our Mission',
      lines: [
        'To empower students with skills and cross-disciplinary knowledge to succeed in the world of Industry 4.0',
      ],
      /* ref .our-lt-atlas */
      background: '#41418e',
      image: '/assets/images/mission/mission-bg.png',
    },
    {
      id: 'vision',
      title: 'Our Vision',
      lines: [
        'To create leaders of the',
        'future, equipped with the',
        'skills of tomorrow.',
      ],
      /* ref .our-rt-atlas */
      background: '#38387d',
      image: '/assets/images/mission/vision-bg.png',
    },
  ],
};

/* --- Section 10: four schools (ref index.php:1994-2053) -------------------
 *
 * `div.section > .container > (h2, .sub-heading, .atlas-cards-wrapper)`, where
 * the wrapper holds `.atlas-cards-grid` (four `.atlas-square-card-a`, each 50%
 * wide and 499px tall, one-up below 768px) followed by the shared
 * `assets/include/more-questions.php` chat panel.
 *
 * Every card is a 499px image with an absolutely-positioned bottom 80% overlay
 * carrying a top-transparent -> #261f5c gradient, the school logo, its name and
 * a "Know More" button. Logos have no CSS size, so each renders at its own
 * intrinsic dimensions.
 */
export const fourSchools = {
  heading: 'Four Schools. One University. Infinite Possibilities.',
  subheading: 'Design, Tech, Management and Law. Your path starts here.',
  schools: [
    {
      id: 'isdi',
      title: 'ISDI School of Design & Innovation',
      href: '/schools/isdi',
      image: '/assets/images/schools/isdi.png',
      srcSet:
        '/assets/images/schools/isdi-p-500.png 500w, /assets/images/schools/isdi.png 619w',
      alt: 'fashion design student showcasing outfit at runway show event',
      logo: { src: '/assets/images/schools/logos/isdi.png', width: 110, height: 51, alt: 'ISDI logo' },
    },
    {
      id: 'isme',
      title: 'ISME School of Management & Entrepreneurship',
      href: '/schools/isme',
      image: '/assets/images/schools/isme.png',
      srcSet:
        '/assets/images/schools/isme-p-500.png 500w, /assets/images/schools/isme.png 619w',
      alt: 'guest speaker addressing students in university classroom seminar',
      logo: { src: '/assets/images/schools/logos/isme.png', width: 122, height: 51, alt: 'ISME logo' },
    },
    {
      id: 'ugdx',
      title: 'uGDX School of Technology',
      href: '/schools/ugdx',
      image: '/assets/images/schools/ugdx.png',
      srcSet:
        '/assets/images/schools/ugdx-p-500.png 500w, /assets/images/schools/ugdx.png 620w',
      alt: 'student working on robotics project and electronics engineering lab',
      logo: { src: '/assets/images/schools/logos/ugdx.png', width: 136, height: 45, alt: 'uGDX logo' },
    },
    {
      id: 'law',
      title: 'ATLAS School of Law',
      href: '/schools/law',
      image: '/assets/images/schools/law.png',
      srcSet:
        '/assets/images/schools/law-p-500.png 500w, /assets/images/schools/law.png 619w',
      alt: 'legal consultation with documents and justice scale in law office',
      logo: { src: '/assets/images/schools/logos/law.png', width: 115, height: 45, alt: 'LAW logo' },
    },
  ],
  /* ref assets/include/more-questions.php, called with the atlas variant */
  search: {
    label: 'What program are you looking for?',
    subText: 'Let our AI Assistant answer your queries',
    action: '/search',
    name: 'query',
    placeholder: 'Ask me anything...courses, people, or campus secrets',
  },
};

/* --- Section 11: leadership team (ref index.php:2054-2098) ---------------
 *
 * `div.section > .container > (h2.h2-tag.mrg42, .swiper.common-swiper-full)`,
 * three `.atlas-card-type-a`: a 396x500 portrait with a bottom 80% overlay
 * (transparent -> black at 14%), the name, a pull-quote with its own quote
 * glyph, and — on the first card only — a "Read more" button. `quote` is an
 * array because the first card hard-codes two <br /> breaks.
 */
export const leadershipTeam = {
  heading: 'Leadership Team',
  quoteIcon: '/assets/images/leadership-team/quote-icon.svg',
  people: [{"name": "Dr. Indu Shahani", "quote": ["ATLAS is building a future-ready education model to equip young", "people in India with the skills and", "tech they need."], "image": "/assets/images/leadership-team/1/leader-atlas.png", "alt": "Dr Indu Shahani", "button": {"href": "/schools/isme/dr-indu-shahani", "label": "Read more about Dr. Indu Shahani"}}, {"name": "Mr. Siddharth Shahani", "quote": ["In a tech-driven future, today’s youth need skills that combine creativity with cutting-edge technology."], "image": "/assets/images/leadership-team/2/sid-sah.png", "alt": "Mr Siddhart Shahani", "button": null}, {"name": "Dr Rajan Welukar", "quote": ["Education must go beyond degrees it should shape individuals into responsible, innovative leaders."], "image": "/assets/images/leadership-team/3/raj-wel.png", "alt": "Dr Rajan Welukar", "button": null}],
};

/* --- Section 12: advisory board (ref index.php:2099-2255) ----------------
 *
 * `div.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper)`,
 * fourteen `.card-type-d` cards (324px wide, height from the portrait). Each
 * shows the portrait under a `#002637` gradient with the name, role, a 1px
 * rule and the company logo.
 *
 * Only the first three carry a live play button — the rest are commented out
 * upstream. `video` drives the project's existing VideoModal, which delegates
 * on `[data-video]`, so no extra wiring is needed.
 */
export const advisoryBoard = {
  heading: 'Steering Excellence, Guiding ATLAS',
  subheading: "Our Advisory Board",
  playIcon: '/assets/images/advisory-board/play-button-atlas.png',
  people: [{"name": "Deepak Parekh", "role": "Chairman", "logo": "/assets/images/advisory-board/logo/hdfc-bank.png", "logoAlt": "hdfc bank logo", "image": "/assets/images/advisory-board/advisor/deepak-parekh.webp", "alt": "Deepak Parekh chairman HDFC Bank", "video": "https://www.youtube.com/watch?v=nko8PuMgnT8", "href": "#"}, {"name": "Vivek Pandit", "role": "Senior Partner", "logo": "/assets/images/advisory-board/logo/mckinsey-company.png", "logoAlt": "mckinsey company logo", "image": "/assets/images/advisory-board/advisor/vivek-pandit.png", "alt": "Vivek Pandit senior partner McKinsey and Company", "video": "https://youtu.be/p2zCVkQdMtM", "href": "#"}, {"name": "Ronnie Screwvala", "role": "Chairperson & Co-Founder", "logo": "/assets/images/advisory-board/logo/upgrad.png", "logoAlt": "Upgrad", "image": "/assets/images/advisory-board/advisor/ronnie-screwvala.png", "alt": "Ronnie Screwvala chairperson and co founder upGrad", "video": "https://www.youtube.com/embed/DRCPfJBynd4", "href": "https://www.youtube.com/shorts/DRCPfJBynd4"}, {"name": "Keshav Murugesh", "role": "Group CEO", "logo": "/assets/images/advisory-board/logo/wns.png", "logoAlt": "WNS", "image": "/assets/images/advisory-board/advisor/keshav-murugesh.png", "alt": "Keshav Murugesh group CEO WNS", "video": null, "href": null}, {"name": "Karan Singh", "role": "Chairman", "logo": "/assets/images/advisory-board/logo/bain.png", "logoAlt": "Bain and Company", "image": "/assets/images/advisory-board/advisor/karan-singh.png", "alt": "Karan Singh chairman Bain and Company", "video": null, "href": null}, {"name": "Anant Goenka", "role": "Vice Chairman", "logo": "/assets/images/advisory-board/logo/ceat.png", "logoAlt": "CEAT", "image": "/assets/images/advisory-board/advisor/anant-goenka.png", "alt": "Anant Goenka vice chairman CEAT", "video": null, "href": null}, {"name": "Ram Raghavan", "role": "President", "logo": "/assets/images/advisory-board/logo/colgate-palmolive.png", "logoAlt": "Colgate Palmolive", "image": "/assets/images/advisory-board/advisor/ram-raghavan.png", "alt": "Ram Raghavan president Colgate Palmolive", "video": null, "href": null}, {"name": "Jamil Khatri", "role": "Co-Founder & CEO", "logo": "/assets/images/advisory-board/logo/uniqus.png", "logoAlt": "Uniqus", "image": "/assets/images/advisory-board/advisor/jamil-khatri.png", "alt": "Jamil Khatri co founder and CEO Uniqus", "video": null, "href": null}, {"name": "Avani Davda", "role": "Stretegic Advisor", "logo": "/assets/images/advisory-board/logo/bain.png", "logoAlt": "Bain and Company", "image": "/assets/images/advisory-board/advisor/avani-davda.png", "alt": "Avani Davda strategic advisor Bain and Company", "video": null, "href": null}, {"name": "Aryaman Birla", "role": "Director", "logo": "/assets/images/advisory-board/logo/aditya-birla-group.png", "logoAlt": "Aditya Birla Group", "image": "/assets/images/advisory-board/advisor/aryaman-birla.png", "alt": "Aryaman Birla director Aditya Birla Group", "video": null, "href": null}, {"name": "Sanjay Gurbuxani", "role": "VP, IBS AMEA & Global Digital Innovation", "logo": "/assets/images/advisory-board/logo/mondelez-international.png", "logoAlt": "Mondelez International", "image": "/assets/images/advisory-board/advisor/sanjay-gurbuxani.png", "alt": "Sanjay Gurbuxani VP IBS AMEA and Global Digital Innovation Mondelez International", "video": null, "href": null}, {"name": "Anita Dongre", "role": "Chief Creative Officer", "logo": "/assets/images/advisory-board/logo/anita-dongre.png", "logoAlt": "Anita Dongre", "image": "/assets/images/advisory-board/advisor/anita-dongre.png", "alt": "Anita Dongre chief creative officer Anita Dongre", "video": null, "href": null}, {"name": "Dr. Indu Shahani", "role": "Founding President and Chancellor", "logo": "/assets/images/advisory-board/logo/atlas-skillTech-university.png", "logoAlt": "ATLAS SkillTech University Logo", "image": "/assets/images/advisory-board/advisor/dr-indu-shahani.png", "alt": "Dr Indu Shahani founding president and chancellor Atlas SkillTech University", "video": null, "href": null}, {"name": "Mayank Kumar", "role": "Co-Founder & MD", "logo": "/assets/images/advisory-board/logo/upgrad.png", "logoAlt": "upgrad logo", "image": "/assets/images/advisory-board/advisor/mayank-kumar.png", "alt": "Mayank Kumar co founder and MD upGrad", "video": null, "href": null}],
};

/* --- Section 13: ATLAS news (ref index.php:2256-2469) --------------------
 *
 * `section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper)`,
 * eight `.card` (295px, `32px 0` radius) each with a 298px image, a clamped
 * 50px-tall title, a dated line with the calendar glyph and a teal "Read now"
 * button. All eight links are external.
 *
 * `title` is an array — several cards hard-code a <br /> mid-title, and the
 * title box is a fixed 50px with `overflow: hidden`, so where the break falls
 * decides what is visible.
 */
export const atlasNews = {
  heading: 'ATLAS News',
  subheading: "From classrooms to communities, here’s what’s buzzing in ATLAS",
  calendarIcon: '/assets/images/atlas-news/calendar-icon.svg',
  arrowIcon: '/assets/images/atlas-news/arrow-downward.svg',
  items: [{"image": "/assets/images/atlas-news/1.png", "alt": "discover education section banner for academic programs and learning opportunities", "title": ["Integrating Gamification in Design Research: A Pedagogical Approach for Design Education in India"], "date": "July 11th, 2025", "href": "https://link.springer.com/article/10.1007/s44217-025-00685-2"}, {"image": "/assets/images/atlas-news/2.png", "alt": "faculty research publications table with authors, departments, and journal details", "title": ["Impact of Apparel", "on Job Performance"], "date": "July 06th, 2025", "href": "https://dalmialionscollege.ac.in/peer-review-journals-ugc-care/?utm"}, {"image": "/assets/images/atlas-news/3.png", "alt": "concert economy concept illustration with live performance, audience, and digital production setup", "title": ["Concert Economy: A New Dawn of Opportunities for Designers?"], "date": "July 11th, 2025", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}, {"image": "/assets/images/atlas-news/4.png", "alt": "IKEA job interview queue with candidates waiting outside store", "title": ["Can IKEA Kill", "‘Interior Design’ In India?"], "date": "December 30, 2024", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}, {"image": "/assets/images/atlas-news/5.png", "alt": "research paper on architecture education competencies in India conference publication", "title": ["Navigating Pedagogical Disparity: Faculty Approaches and Tools for Enhancing Teaching Skills"], "date": "December 30, 2024", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}, {"image": "/assets/images/atlas-news/5.png", "alt": "research paper on architecture education competencies in India conference publication", "title": ["An Exploratory Study to Discover the Academia", "-Practice Gap in the Field of Architectural Design in India"], "date": "December 30, 2024", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}, {"image": "/assets/images/atlas-news/5.png", "alt": "research paper on architecture education competencies in India conference publication", "title": ["Design Studio as", "a Lab for Innovation"], "date": "December 30, 2024", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}, {"image": "/assets/images/atlas-news/5.png", "alt": "research paper on architecture education competencies in India conference publication", "title": ["Developing Analytical and Representational Skills : Engaging AI visualization tools in Interior Design Education"], "date": "December 30, 2024", "href": "https://medium.com/@shaunak.desai17/concert-economy-a-new-dawn-of-opportunities-for-designers-03254b921b85"}],
};

/* --- Section 14: core advantages (ref index.php:2470-2534) ---------------
 *
 * `div.section > .container > (h2.h2-tag.mrg42, .swiper.common-swiper-full)`,
 * eight `.atlas-card-type-b`: same 396x500 `32px 0` card as the leadership
 * slider but with a full-height, gradient-free overlay holding one line of
 * copy. "MultidisciplinaryLearning Approach" is missing its space upstream
 * and is reproduced verbatim.
 */
export const coreAdvantages = {
  heading: "ATLAS’s Core Advantages",
  items: [{"text": ["Located in the heart", "of Mumbai’s", "business district"], "image": "/assets/images/core-advantages/1.png", "alt": "city skyline with modern business district and corporate office buildings"}, {"text": ["New-Age Tech-led Infrastructure"], "image": "/assets/images/core-advantages/2.png", "alt": "students working on computers in modern classroom learning environment"}, {"text": ["MultidisciplinaryLearning Approach"], "image": "/assets/images/core-advantages/3.png", "alt": "student using virtual reality headset in classroom for immersive learning"}, {"text": ["Deeply", "Student Centric"], "image": "/assets/images/core-advantages/4.png", "alt": "students collaborating in classroom group discussion with laptops and study materials"}, {"text": ["Global", "Exposure"], "image": "/assets/images/core-advantages/5.png", "alt": "students group visit at Tower Bridge London with Atlas SkillTech University banner"}, {"text": ["Industry", "Exposure"], "image": "/assets/images/core-advantages/6.png", "alt": "two professionals smiling and talking in office environment"}, {"text": ["Entrepreneurial", "DNA"], "image": "/assets/images/core-advantages/7.png", "alt": "two young men holding beverage cans outdoors in urban setting"}, {"text": ["Impact Driven", "Research & Innovation"], "image": "/assets/images/core-advantages/8.png", "alt": "students engaged in group discussion and teamwork in classroom setting"}],
};

/* --- Section 16: location (ref index.php:2535-2546) ---------------------
 *
 * Reuses the About-ATLAS shell exactly — `section.section >
 * .w-layout-blockcontainer.container.w-container > .about-story-wrapper >
 * (.abt-cont, .about-image-wrap-atlas)` — with two differences: the h2 carries
 * no `mrg*` modifier so it keeps `.h2-tag`'s base 56px bottom margin, and a
 * `.about-title-sub-atlas` (24px, black, 32px below) sits between the heading
 * and the body copy. Static; no links.
 */
export const location = {"heading": "Location", "subtitle": "ATLAS SkillTech University,BKC, Mumbai", "paragraphs": ["Nestled near BKC, our campus sits at the intersection of education and enterprise. With 500+ companies and Mumbai’s business pulse all around, opportunity doesn’t knock — it’s already next door.", "From casual conversations with professionals to guest lectures and industry visits, learning flows beyond the classroom.", "With global names like Netflix, Google, and Amazon in the neighbourhood, opportunity doesn’t knock — it’s already here."], "image": "/assets/images/location/location-img.webp", "alt": "aerial view of modern business district with NSE building and corporate offices"};

/* --- Section 17: a campus built to learn, live & thrive -------------------
 * (ref index.php:2548-2640)
 *
 * `div.section > .container > (.head-wrap.mrgbtm32, .testimonial-video)`. The
 * head-wrap puts the heading beside a "Schedule a Visit" button whose href is
 * `#` upstream — reproduced as-is rather than invented.
 *
 * The body is a Webflow background video (`autoplay muted loop playsinline`,
 * poster behind it) wrapped in an `<a target="_blank">` to YouTube, so the
 * whole frame is one big link. Every `<iframe>` variant in this block is
 * commented out upstream, so there is no embed.
 *
 * The reference ships a `.webm` that is a byte-identical copy of the `.mp4`, so
 * only the mp4 is shipped here — a `<source>` claiming webm while serving MP4
 * bytes is worse than not offering it.
 *
 * `.testimonial-video` is sized by index.php's own inline <style>, which loads
 * after the page stylesheet and wins: 100% x 700px with a `56px 0` radius,
 * dropping to 156px tall at <=991px.
 */
export const campusTour = {"heading": "A campus built to learn, live & thrive", "button": {"label": "Schedule a Visit", "href": "#"}, "poster": "/assets/images/campus-tour-poster.png", "video": "/assets/videos/campus-tour.mp4", "link": "https://youtu.be/vSHVERTv97M?si=nZFb36gVf9wzEAfJ", "linkLabel": "Open Live & Thrive Video Page"};

/* --- Section 18: industry on campus (ref index.php:2641-2835) ------------
 *
 * `section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`,
 * ten cards. These reuse `.port-card-m-wrap-atlas` — the same class as the
 * programme carousels — but WITHOUT the `…v2` modifier, so they keep the base
 * 295x520 card rather than 295x367, and the bar keeps its own default `#41418e`
 * with no school accent.
 *
 * Each card is a photo with the company logo pinned top-right
 * (`.pcm-tp-wrap-atlas`) and a bottom bar holding the speaker's name and
 * position above the usual notch.
 */
export const industryOnCampus = {"heading": "Industry on Campus", "subheading": "We bring industry leaders, innovators, and change-makers to engage, inspire, and mentor our students", "items": [{"name": "Tim Cook", "position": "CEO, Apple", "logo": "/assets/images/industry-on-campus/1/apple.png", "logoAlt": "Apple logo brand icon", "image": "/assets/images/industry-on-campus/1/atlas-camp-img.png", "alt": "business leaders walking together at corporate event with audience in background"}, {"name": "Deepak Parekh", "position": "Former Chairman, HDFC", "logo": "/assets/images/industry-on-campus/2/hdfc.png", "logoAlt": "HDFC Bank logo", "image": "/assets/images/industry-on-campus/2/section-img.png", "alt": "business leaders discussion in modern office workspace environment"}, {"name": "Sabyasachi Mukherjee", "position": "Founder, Sabyasachi", "logo": "/assets/images/industry-on-campus/3/logo.png", "logoAlt": "Sabyasachi brand logo", "image": "/assets/images/industry-on-campus/3/section-img.png", "alt": "sabyasachi"}, {"name": "Falguni Nayar", "position": "Founder, Nykaa", "logo": "/assets/images/industry-on-campus/4/logo.png", "logoAlt": "Nykaa brand logo", "image": "/assets/images/industry-on-campus/4/section-img.png", "alt": "two women exchanging award or gift in formal setting"}, {"name": "Peyush Bansal", "position": "Co-founder & CEO, Lenskart", "logo": "/assets/images/industry-on-campus/5/logo.png", "logoAlt": "Lenskart brand logo", "image": "/assets/images/industry-on-campus/5/section-img.png", "alt": "speaker holding microphone during talk or presentation session"}, {"name": "Ronnie Screwvala", "position": "Founder & Chairperson, upGrad", "logo": "/assets/images/industry-on-campus/6/logo.png", "logoAlt": "upGrad brand logo", "image": "/assets/images/industry-on-campus/6/section-img.png", "alt": "business leader speaking at conference with microphone on stage"}, {"name": "Karan Johar", "position": "Filmmaker, Dharma Productions", "logo": "/assets/images/industry-on-campus/7/logo.png", "logoAlt": "Dharma Productions brand logo", "image": "/assets/images/industry-on-campus/7/section-img.png", "alt": "Karan Johar filmmaker with students at campus event Dharma Productions"}, {"name": "Niranjan Hiranandani", "position": "Founder, Hiranandani Group", "logo": "/assets/images/industry-on-campus/8/logo.png", "logoAlt": "Hiranandani brand logo", "image": "/assets/images/industry-on-campus/8/section-img.png", "alt": "Niranjan Hiranandani founder Hiranandani Group walking at corporate campus event"}, {"name": "Anant Goenka", "position": "Vice Chairman, CEAT", "logo": "/assets/images/industry-on-campus/9/logo.png", "logoAlt": "CEAT brand logo", "image": "/assets/images/industry-on-campus/9/section-img.png", "alt": "Anant Goenka vice chairman CEAT speaking at corporate event"}, {"name": "Mayank Kumar", "position": "Co-Founder, upGrad", "logo": "/assets/images/industry-on-campus/10/logo.png", "logoAlt": "upGrad brand logo", "image": "/assets/images/industry-on-campus/10/section-img.png", "alt": "Mayank Kumar co founder upGrad speaking at student event"}]};

/* --- Section 19: think international (ref index.php:2836-2903) -----------
 *
 * `section.section > .container > (.head-wrap, .swiper.common-swiper-full)`.
 * Note the head-wrap has **no** `mrgbtm32`, so it carries no bottom margin, and
 * it holds an "Explore Internationalisation" `.button-regular` beside the copy.
 *
 * Five `.square-card.atlas`: 612px wide (100% at <=767), `32px 0` radius and
 * clipped, with a `.sq-content` overlay across the bottom half carrying a
 * `transparent -> #00000080` gradient and one title. `.sq-image` has no CSS at
 * all, so the picture sizes itself from the srcset the reference declares.
 *
 * The reference wraps a `<script>` beside the button that copies a
 * `data-font-size` attribute onto `.button-text`; the attribute is empty here,
 * so it sets `font-size: "px"` and is discarded — not reproduced.
 */
export const thinkInternational = {"heading": ["Think International.", "Opportunities Across Continents"], "subheading": "60+ international partnerships connect you with top universities, mentors, and summer programs expanding your learning journey beyond domestic borders.", "button": {"label": "Explore Internationalisation", "href": "/advantages/atlas-internationalisation"}, "items": [{"title": ["Global", "Immersions"], "image": "/assets/images/international-opportunities/1/desk.png", "srcSet": "/assets/images/international-opportunities/1/mob.png 500w, /assets/images/international-opportunities/1/desk.png 611w", "alt": "students group at London School of Economics campus Old Building entrance"}, {"title": ["International", "Summer Schools"], "image": "/assets/images/international-opportunities/2/desk.png", "srcSet": "/assets/images/international-opportunities/2/mob.png 500w, /assets/images/international-opportunities/2/desk.png 611w", "alt": "students group at New School campus New York city street visit"}, {"title": ["International", "Faculty Week"], "image": "/assets/images/international-opportunities/3/desk.png", "srcSet": "/assets/images/international-opportunities/3/mob.png 500w, /assets/images/international-opportunities/3/desk.png 611w", "alt": "female instructor teaching students in classroom during interactive session"}, {"title": ["Master’s", "Progression"], "image": "/assets/images/international-opportunities/4/desk.png", "srcSet": "/assets/images/international-opportunities/4/mob.png 500w, /assets/images/international-opportunities/4/desk.png 611w", "alt": "student posing at Kings College London campus wall"}, {"title": ["Building", "Global Alliances"], "image": "/assets/images/international-opportunities/5/desk.png", "srcSet": "/assets/images/international-opportunities/5/mob.png 500w, /assets/images/international-opportunities/5/desk.png 611w", "alt": "business professionals handshake during corporate meeting in office environment"}]};

/* --- Section 20: ATLAS spotlight (ref index.php:2904-2963) ---------------
 *
 * `section.section > .container > (.head-wrap, .grid-gallery)`. Not a slider:
 * `.grid-gallery` is `display: block` with `column-count: 4` — a CSS
 * multi-column masonry, so its grid-template-* declarations are inert. Eight
 * `.grid-card-atlas` flow through the columns, each an auto-height image with a
 * caption block absolutely positioned at its bottom.
 *
 * At <=767 the gallery drops to `column-count: 2` and bleeds out of the
 * container with `margin: 0 -22px` + `padding: 0 20px`.
 */
export const atlasSpotlight = {"heading": "ATLAS Spotlight", "subheading": "Excellence isn’t a milestone—it’s a mindset. Our students and faculty consistently earn recognition on national and international platforms for innovation, leadership, and impact", "items": [{"name": "NASA Rover Challenge", "title": ["Global Top 5 Ranking"], "image": "/assets/images/atlas-spotlight/1.png", "alt": "students at NASA Rover Challenge with Atlas SkillTech University team and rover model", "opTop": false}, {"name": "Econundrum", "title": ["2022 Winner"], "image": "/assets/images/atlas-spotlight/2.png", "alt": "student team holding trophy Econundrum 2022 winner competition", "opTop": false}, {"name": "Angel Manthanam", "title": ["Promising Young", "Leader Award"], "image": "/assets/images/atlas-spotlight/3.png", "alt": "Angel Manthanam receiving promising young leader award with dignitaries", "opTop": false}, {"name": "Mahek Nayak", "title": ["Maharashtra State Games ‘24"], "image": "/assets/images/atlas-spotlight/4.png", "alt": "Mahek Nayak holding medals Maharashtra State Games 2024 athlete achievement", "opTop": false}, {"name": "Kshama Angodumath", "title": ["Design India Award 2025"], "image": "/assets/images/atlas-spotlight/5.png", "alt": "Kshama Angodumath holding trophy Design India Award 2025 winner", "opTop": true}, {"name": "Diya Basu", "title": ["Miss Maharashtra 2024"], "image": "/assets/images/atlas-spotlight/6.png", "alt": "Diya Basu Miss Maharashtra 2024 winner portrait", "opTop": false}, {"name": "Ansh Rathod & Anisha Atlani", "title": ["Achievers Awards 2024"], "image": "/assets/images/atlas-spotlight/7.png", "alt": "Ansh Rathod and Anisha Atlani holding trophies Achievers Awards 2024 winners", "opTop": false}, {"name": "CyberStrike Fest", "title": ["2024 Winner"], "image": "/assets/images/atlas-spotlight/8.png", "alt": "student team holding trophy CyberStrike Fest 2024 winner competition", "opTop": false}]};

/* --- Section 21: thought leadership (ref index.php:2966-3048) ------------
 *
 * The only data-driven section on the page: index.php curls
 * `https://uat-dashboard.atlasskilltech.app/api/atlas-blogs` at request time,
 * keeps `status === 'published'` and slices to 20, then renders each through
 * the SAME `.card` component as ATLAS News — with `BG-Color="#F2F2F2"`, which
 * is what that card's inline background script exists for, and
 * `target="_blank"` on the link.
 *
 * Snapshotted here rather than fetched at runtime, for two reasons: the API is
 * a **UAT** host, and every post's image lives on atlasuniversity.edu.in, which
 * the project's asset rule forbids referencing remotely. The 20 images are
 * downloaded into public/assets/images/thought-leadership/. Re-run the snapshot
 * when the feed should be refreshed.
 *
 * The heading is `.h2-tag.mrg16.isdi` — the one element on the homepage the
 * reference renders in Poppins (see globals.css).
 */
export const thoughtLeadership = {"heading": "Thought Leadership", "subheading": "Explore expert perspectives and fresh thinking across design, business, tech and law", "button": {"label": "View all", "href": "/thought-leaderships"}, "cardBackground": "#F2F2F2", "posts": [{"title": "BBA in AI Subjects and Curriculum: What You Actually Learn", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isme/blog/bba-in-ai-subjects-and-curriculum", "image": "/assets/images/thought-leadership/isme-july-5.png", "alt": "BBA in AI subjects and curriculum: What you actually learn"}, {"title": "BBA Colleges in Mumbai 2026: Fees, Placements and How to Choose the Right One", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isme/blog/bba-colleges-in-mumbai-fees-placements-guide-2026", "image": "/assets/images/thought-leadership/isme-july-4.png", "alt": "types of BBA colleges in Mumbai including private universities, deemed universities, Mumbai University affiliated colleges, and autonomous colleges"}, {"title": "2+1 UK Degree for Indian Students: What It Means and How It Works", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isme/blog/2-1-uk-degree-for-indian-students-what-it-means-and-how-it-works", "image": "/assets/images/thought-leadership/isme-july-3.png", "alt": "2+1 UK degree for Indian students: What it means and how it works"}, {"title": "BBA in Business Psychology: Salary, Jobs & Why Brands Want Business Psychology Graduates", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isme/blog/bba-in-psychology-business-psychology-careers-guide", "image": "/assets/images/thought-leadership/isme-july-2.png", "alt": "how a business psychology degree and BBA in psychology prepares students for careers in marketing, HR, consulting, and customer experience"}, {"title": "BBA Business Analytics Career: Jobs That Didn't Exist 5 Years Ago", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isme/blog/bba-business-analytics-careers-jobs-future-guide", "image": "/assets/images/thought-leadership/isme-july-1.png", "alt": "Infographic showing emerging career roles for BBA business analytics graduates across AI, customer analytics, product, sustainability, and operations in 2026"}, {"title": "Career Options After B Tech IT in India: Jobs and Salary in 2026", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/ugdx/blog/career-options-after-b-tech-it", "image": "/assets/images/thought-leadership/ugdx-july-4.png", "alt": "Students learning information technology concepts in a B Tech IT programme"}, {"title": "How to Become a Robotics Engineer in India", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/ugdx/blog/how-to-become-a-robotics-engineer", "image": "/assets/images/thought-leadership/ugdx-july-3.png", "alt": "Engineering student building and programming a robot in a BTech in Robotics laboratory"}, {"title": "BTech in Cybersecurity: Is It the Right Engineering Branch for 2026?", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/ugdx/blog/btech-in-cybersecurity", "image": "/assets/images/thought-leadership/ugdx-july-2.png", "alt": "Student learning cyber security concepts in a BTech cybersecurity engineering programme"}, {"title": "What Is Generative AI and How to Build a Career Around It in 2026", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/ugdx/blog/generative-ai-career-guide", "image": "/assets/images/thought-leadership/ugdx-july-1.png", "alt": "Student learning generative AI concepts and applications using AI-powered technology"}, {"title": "Product Designer Salary in India 2026: B Des Product Design Roles and Career Growth", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-product-design-salary-careers-india-2026", "image": "/assets/images/thought-leadership/isdi-july-5.png", "alt": "Infographic showing product designer salary ranges in India 2026 for B Des product design graduates across entry, mid, senior, and leadership levels"}, {"title": "Best Design Schools in the World: Complete Guide for B Des Students in 2026", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isdi/blog/best-design-schools-in-the-world-bdes-student-guide", "image": "/assets/images/thought-leadership/isdi-july-4.png", "alt": "Infographic showing the best design schools in the world including Parsons School of Design, University of Arts London, and SCAD University with key strengths"}, {"title": "B Des Fashion Communication in the Age of Reels: How Content Is Shaping Style Careers", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-fashion-communication-careers-reels-age-guide", "image": "/assets/images/thought-leadership/isdi-july-3.png", "alt": "Infographic showing how B Des fashion communication prepares students for careers in branding, styling, content creation, and fashion communication jobs across India"}, {"title": "AI-Generated Design vs Human Creativity: What B Des Communication Design Students Need to Know", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-communication-design-ai-generated-design-guide", "image": "/assets/images/thought-leadership/isdi-july-2.png", "alt": "Infographic showing how B Des communication design students can balance AI-generated design with human creativity and strategic design thinking"}, {"title": "B Des Interior Design vs BSc: Which Interior Design Degree Gets You Hired Faster?", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-interior-design-vs-bsc-career-guide", "image": "/assets/images/thought-leadership/isdi-july-1.png", "alt": "Comparing B Des interior design and BSc interior design across curriculum focus, learning approach, and career outcomes in India"}, {"title": "How to Study Abroad From India: Options, Cost and Planning Guide 2026", "date": "April, 2026", "href": "https://atlasuniversity.edu.in/atlas-blog/how-to-study-abroad-from-india-options-cost-guide", "image": "/assets/images/thought-leadership/atlas-july-5.png", "alt": "Infographic showing how to study abroad from India covering pathways, costs, exchange programs, scholarships, and planning steps"}, {"title": "How Industry Academia Collaboration in College Gives You a Real Career Edge", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/atlas-blog/industry-academia-collaboration-college-career-edge-guide", "image": "/assets/images/thought-leadership/atlas-july-4.png", "alt": "how industry academia collaboration benefits students through live projects, mentorship, internships, and real-world learning in college"}, {"title": "Moot Court in Law School: How It Shapes Real BA LLB Students in India", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/atlas-blog/moot-court-meaning-competition-ba-llb-guide", "image": "/assets/images/thought-leadership/atlas-july-3.png", "alt": "Infographic showing what moot court is, its meaning, and how it shapes BA LLB and LLB law degree students into practice-ready lawyers in India"}, {"title": "Career Guidance for Students: How to Choose the Right Career Path in 2026", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/atlas-blog/career-guidance-for-students-options-after-12th-guide", "image": "/assets/images/thought-leadership/atlas-july-2.png", "alt": "how career guidance for students helps navigate career options after 12th across  business, design, technology, media, and social sciences"}, {"title": "BBA LLB Degree: Complete Details on Duration, Subjects and Career Options", "date": "July, 2026", "href": "https://atlasuniversity.edu.in/atlas-blog/bba-llb-degree-details-subjects-duration-careers", "image": "/assets/images/thought-leadership/atlas-july-1.png", "alt": "complete BBA LLB degree details including duration, subjects, eligibility, and career options after the programme"}, {"title": "Prompt Engineering Jobs: Complete Guide for BTech in Computer Science Students", "date": "June, 2026", "href": "https://atlasuniversity.edu.in/schools/ugdx/blog/btech-in-computer-science-prompt-engineering-jobs-guide", "image": "/assets/images/thought-leadership/ugdx-june-5.png", "alt": "Infographic showing how prompt engineering jobs connect BTech in computer science and engineering skills to AI-driven careers across product, content, and automation roles"}]};


/**
 * "In their own words: Why ATLAS feels right" — index.php:3115-3532.
 *
 * A Webflow `.rounded-tabs-mint` tab set: four tabs (Parents / Students /
 * Industry / Global — note the reference's own data-w-tab ids skip "Tab 3"),
 * each holding its own `.swiper.common-swiper-full` of `.testimonial-card`s.
 * 26 cards in total: 3 / 10 / 4 / 9.
 *
 * The Parents cards carry a looping muted background video instead of a photo;
 * every other card carries a `.student-image`. Two different quote glyphs are
 * used across the cards, so each card records which one the reference gives it.
 * `.stname`, `.st-course` and `.st-at-pos` are three separate lines in the
 * markup and are authored inconsistently (some cards leave `.stname` empty and
 * put the name in `.st-course`), so the shape below mirrors the markup rather
 * than tidying it: `courseVariant` is the `.isdi` / `.atlas` modifier, and each
 * `course` entry is one `<br>`-separated line with its own `strong` / `atPos`
 * flags.
 */
export const testimonials = {"heading": "In their own words: Why ATLAS feels right", "subheading": ["Hear how parents from across India found the confidence for their", "child across different schools of ATLAS"], "quoteIcons": {"plain": "/assets/images/leadership-team/quote-icon.svg", "atlas": "/assets/images/testimonials/quote-atlas.png"}, "watermark": "/assets/images/testimonials/vector-atlas.png", "watermarkAlt": "Vector Atlas", "tabs": [{"label": "Parents", "items": [{"video": "/assets/videos/testimonials/parents-1.mp4", "poster": "/assets/images/testimonials/parents-1-poster.jpg", "quote": "I loved seeing the work of students, it was very professional and well curated. Heavily impressed with the work they have done", "quoteIcon": "plain", "name": "", "courseVariant": "isdi", "course": [{"text": "Bijal Vasaria"}, {"text": "Parent"}], "atPos": []}, {"video": "/assets/videos/testimonials/parents-2.mp4", "poster": "/assets/images/testimonials/parents-2-poster.jpg", "quote": "I am very impressed to see the creativity and work that has been put up. The complete experience here has been amazing", "quoteIcon": "plain", "name": "Amit and Ankita Jeriwala", "courseVariant": "isdi", "course": [{"text": "Parent"}], "atPos": []}, {"video": "/assets/videos/testimonials/parents-3.mp4", "poster": "/assets/images/testimonials/parents-3-poster.jpg", "quote": "It was very insightful to watch and I am very happy with the out of the box approach", "quoteIcon": "plain", "name": "Nevil Karvalo", "courseVariant": "isdi", "course": [{"text": "Parent"}], "atPos": []}]}, {"label": "Students", "items": [{"image": "/assets/images/testimonials/student/anshmaheshwari.png", "alt": "Ansh Maheshwari student testimonial about Atlas Career Connect event experience", "quote": "ATLAS Career Team did a great job with their Career Connect event. Well managed, had great talks.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Ansh Maheshwari"}, {"text": "Batch of 2025", "strong": true}], "atPos": []}, {"image": "/assets/images/testimonials/student/kritijamugdha.png", "alt": "Kritija Mugdha student testimonial about career growth at Atlas SkillTech University", "quote": "ATLAS helped me grow exponentially, and pushed me to my limits to understand what I wanted to do professionally.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Kritija Mugdha"}, {"text": "Batch of 2026", "strong": true, "atPos": true}], "atPos": []}, {"image": "/assets/images/testimonials/student/sidharthfernandez.png", "alt": "Siddharth Fernandez student testimonial about PPO and career support at Atlas SkillTech University", "quote": "ATLAS Career's team helped me get a PPO. They also believed in me and got me introduced to various industry professionals.", "quoteIcon": "plain", "name": "", "courseVariant": "atlas", "course": [{"text": "Siddharth Fernandez"}, {"text": "Batch of 2025", "strong": true, "atPos": true}], "atPos": []}, {"image": "/assets/images/testimonials/student/thotangare-aavishi.png", "alt": "Thotangare Aavishi student testimonial about global immersion experience at Seoul National University", "quote": "This course was a memorable experience that combined education, imagination, and cross-cultural discovery.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Thotangare Aavishi", "strong": true}], "atPos": ["2nd Year, BBA", "Seoul National University"]}, {"image": "/assets/images/testimonials/student/ananya-bhattacharya.png", "alt": "Ananya Bhattacharya student testimonial about NTU summer school global learning experience", "quote": "Overall, it was a transformative, once-in-a-lifetime experience that built my confidence, creativity, and independence.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Ananya Bhattacharya", "strong": true}], "atPos": ["2nd Year, B.Des", "NTU Summer School"]}, {"image": "/assets/images/testimonials/student/milan-sharma.png", "alt": "Milan Sharma student testimonial about Yonsei summer school global immersion experience", "quote": "It was a transformative blend of learning and cultural discovery. It deepened my creative and strategic skills, while living in Seoul broadened my mind.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Milan Sharma", "strong": true}], "atPos": ["2nd Year, BBA", "Yonsei Summer School"]}, {"image": "/assets/images/testimonials/student/tomsin-biju.png", "alt": "Tomsin Biju student testimonial about IED summer school car design learning experience", "quote": "From clay modeling to Photoshop rendering, each session deepened my understanding of car design.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Tomsin Biju", "strong": true}], "atPos": ["2nd Year, B.Des", "IED Summer School"]}, {"image": "/assets/images/testimonials/student/arushi-dekate.png", "alt": "Arushi Dekate student testimonial about UAL summer school PR and advertising course experience", "quote": "My UAL PR & Advertising summer course transformed my communication skills, research, client relations, & global collaboration.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Arushi Dekate", "strong": true}], "atPos": ["2nd Year, SDM", "UAL Summer School"]}, {"image": "/assets/images/testimonials/student/ayaan-shetty.png", "alt": "Ayaan Shetty student testimonial about LSE summer school global learning experience", "quote": "It was a transformative journey that built my confidence, and creativity, offering unforgettable experiences, lessons, and lasting growth.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Ayaan Shetty", "strong": true}], "atPos": ["2nd Year, BBA", "LSE Summer School"]}, {"image": "/assets/images/testimonials/student/aashita-a.png", "alt": "Aashita A student testimonial about LSE summer school consumer behavior learning experience", "quote": "It gave me a broader understanding of a how Consumer’s take decisions and how companies can connect with them meaningfully.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Aashita A", "strong": true}], "atPos": ["2nd Year, BBA", "LSE Summer School"]}]}, {"label": "Industry", "items": [{"image": "/assets/images/testimonials/industry/biju.png", "alt": "Biju Damodharan Amazon testimonial about student design and user experience skills", "quote": "I was genuinely impressed by the students’ finesse, strategic thinking, and thorough understanding of user experience and design processes.", "quoteIcon": "plain", "name": "", "courseVariant": "isdi", "course": [{"text": "Biju Damodharan"}, {"text": "Amazon", "strong": true}], "atPos": []}, {"image": "/assets/images/testimonials/industry/navneet-munot.jpg", "alt": "Navneet Munot HDFC Mutual Fund testimonial about Atlas SkillTech University student creativity", "quote": "Visiting ATLAS SkillTech University was truly inspiring. The energy and creativity of the students were incredible.", "quoteIcon": "plain", "name": "", "courseVariant": "isdi", "course": [{"text": "Navneet Munot"}, {"text": "HDFC Mutual Fund", "strong": true}], "atPos": []}, {"image": "/assets/images/testimonials/industry/esha-datta.jpg", "alt": "Esha Datta WPP testimonial about Atlas SkillTech University future focused education", "quote": "ATLAS is truly an institution with a futuristic approach. Led by Indu mam, I can very confidently say the students are definitely the future leaders of the nation.", "quoteIcon": "plain", "name": "", "courseVariant": "isdi", "course": [{"text": "Esha Datta"}, {"text": "WPP", "strong": true}], "atPos": []}, {"image": "/assets/images/testimonials/industry/shefali-khalsa.jpg", "alt": "Shefali Khalsa IndusInd Bank testimonial about leadership development at Atlas SkillTech University", "quote": "ATLAS SkillTech University is an exemplary institution that excels in fostering leadership qualities in its students.", "quoteIcon": "plain", "name": "", "courseVariant": "isdi", "course": [{"text": "Shefali Khalsa"}, {"text": "IndusInd Bank", "strong": true}], "atPos": []}]}, {"label": "Global", "items": [{"image": "/assets/images/testimonials/global/florent.png", "alt": "Florent dean Sorbonne Business School testimonial about ISME students skills and perspective", "quote": "A rewarding experience—ISME students bring skill, drive, and fresh perspective.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Florent", "strong": true}], "atPos": ["Dean", "Sorbonne Business School"]}, {"image": "/assets/images/testimonials/global/katherine-tanu.png", "alt": "Katherine Tanu HEC College testimonial about ISME students skills and collaboration experience", "quote": "ISME students bring sharp thinking and hands-on skill collaborating with them has added real momentum to our work.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Katherine Tanu", "strong": true}], "atPos": ["HEC College"]}, {"image": "/assets/images/testimonials/global/dr-elena-dieckmann.png", "alt": "Dr Elena Dieckmann Imperial College London testimonial about global learning and pitching experience", "quote": "Learning from international faculty and pitching ideas in a global setting made me feel more confident, connected", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Dr. Elena Dieckmann", "strong": true}], "atPos": ["Imperial College London"]}, {"image": "/assets/images/testimonials/global/jennie-backstrom.png", "alt": "Jennie Backstrom Babson College USA testimonial about working experience with Atlas SkillTech University", "quote": "It’s been amazing working with ATLAS, few months I have been here. It’s been overwhelming and positive hospitality.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Jennie Backstrom", "strong": true}], "atPos": ["Babson College, USA"]}, {"image": "/assets/images/testimonials/global/sharon-bailey.png", "alt": "Sharon Bailey Leeds Arts University testimonial about partnership with Atlas SkillTech University", "quote": "Thanks to Dr. Sahani for the warm welcome that we’ve recieved as we start our partnership with ATLAS SkillTech University.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Sharon Bailey"}], "atPos": ["Leeds Arts University"]}, {"image": "/assets/images/testimonials/global/marlon-meikle.png", "alt": "Marlon Meikle Parsons School of Design testimonial about ISDI campus experience", "quote": "I have had the time of my life at ISDI, seeing the campus has really been inspiring. I love all of the views of the city.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Marlon Meikle"}], "atPos": ["Parsons School of Design"]}, {"image": "/assets/images/testimonials/global/maria-pineda.png", "alt": "Maria Pineda University of Maryland testimonial about student engagement and opportunities", "quote": "We met many fantastic student, very engaged, and more than anything, they are open to opportunities.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Maria Pineda"}], "atPos": ["University of Maryland"]}, {"image": "/assets/images/testimonials/global/simone-varotto.png", "alt": "Professor Simone Varotto Henley Business School testimonial about study abroad experience", "quote": "Learning abroad changed the way I think. It wasn’t just a trip—it was clarity on where I want to go", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Professor Simone Varotto", "strong": true}], "atPos": ["Henley Business School"]}, {"image": "/assets/images/testimonials/global/sabah-boustila.png", "alt": "Dr Sabah Boustila Manchester Metropolitan University testimonial about student curiosity at Atlas ISME", "quote": "The energy at ATLAS ISME was refreshing the students asked sharp questions and approached real problems with genuine curiosity.", "quoteIcon": "atlas", "name": "", "courseVariant": "atlas", "course": [{"text": "Dr. Sabah Boustila", "strong": true}], "atPos": ["Manchester Metropolitan University"]}]}]};

/**
 * "Your Future Begins Here." — index.php:3533-3546.
 *
 * `.info-banner-atlas.no-radius`: a full-bleed #41418e band with the copy in a
 * normal `.container` and a right-aligned cutout photograph that the stylesheet
 * hides below 992px. Two `.btn-primary` buttons in the atlas variant (cyan
 * #02b3c3, black label).
 */
export const futureBeginsHere = {"heading": "Your Future Begins Here.", "subheading": "Be part of a university that redefines higher education for the 21st century.", "buttons": [{"label": "Apply Now", "href": "/applicationform"}, {"label": "Schedule a Visit", "href": "/campusvisit"}], "icon": "/assets/images/future-begins/arrow-rt-black.svg", "image": "/assets/images/future-begins/desk.webp", "imageMobile": "/assets/images/future-begins/mob.webp", "alt": "Graduates celebrating at a new age urban university convocation"};

/**
 * "Questions? We can read your mind" — assets/include/faq/atlas/home.php.
 *
 * A Bootstrap 5.3.8 `.accordion.accordion-flush` of 12 items, every one closed
 * on load, with `data-bs-parent` set so opening one closes the other. Answers
 * are one `<p>` each except the first, which has two.
 */
export const faq = {"heading": "Questions? We can read your mind", "arrow": "/assets/icons/atlas-down-arrow.svg", "items": [{"q": "What is the ranking of ATLAS University?", "a": ["ATLAS SkillTech University has received several prestigious national recognitions for its excellence in education, industry integration and innovation. In the Times Now B-School Survey 2026, ATLAS ISME was ranked #5 among Private B-Schools in India, #5 in the West Zone (including IIMs and IITs) and #14 Overall Nationally (including IIMs and IITs). The university was also ranked #2 Private Engineering & Technology University in Maharashtra by EducationWorld 2026.", "In addition, ATLAS has been recognised with the Excellence in Industry Collaboration Award by Times Now (2025), the Prestigious Education Brand Award by Marksmen Daily and Republic (2024 & 2025) and the Best Institution Award by the World Education Congress (2024 & 2025). It has also been honoured as the #1 Emerging Design University and #1 Emerging Management University by Times Education Icons by The Times of India (2022)."]}, {"q": "What is ATLAS University known for?", "a": ["ATLAS SkillTech University is known for its multidisciplinary approach to education that combines design, business, technology and law. The university focuses on industry-led learning, entrepreneurship, experiential education and global exposure to prepare students for the careers of the future."]}, {"q": "Is ATLAS University a good choice for students?", "a": ["Yes, ATLAS University is considered one of the best private universities in Mumbai for students seeking industry-aligned education. Its emphasis on hands-on learning, mentorship and real-world exposure makes it one of the best universities for entrepreneurship and design in India."]}, {"q": "What are the fees at ATLAS University?", "a": ["The fees at ATLAS University depend on the program, specialisation and level of study. Detailed fee structures are provided during the admissions process and reflect the university’s industry-led curriculum, which emphasises experiential learning and real-world relevance."]}, {"q": "What is experiential learning at university?", "a": ["Experiential learning is an educational approach where students learn through direct experience rather than only theory. This includes internships, live industry briefs, projects, simulations and hands-on problem-solving, all of which are integral parts of the curriculum at an experiential learning university like ATLAS University."]}, {"q": "What is the meaning of experiential education?", "a": ["Experiential education focuses on learning by doing and reflecting on real-world experiences. At ATLAS University, students apply theoretical knowledge to practical settings, making their learning more relevant, engaging and impactful in a multidisciplinary university environment."]}, {"q": "What are experiential schools?", "a": ["Experiential schools prioritise practical learning alongside traditional academic education. These institutions integrate real-world projects, industry interaction and applied learning, helping students develop essential skills for success. ATLAS University is an example of such an institution, offering a blend of experiential education and academic rigour."]}, {"q": "What is an example of experiential education at ATLAS University?", "a": ["An example of experiential education at ATLAS University includes working on live industry projects, participating in internships or engaging in design studios and startup simulations. These opportunities are central to the skill-based university model ATLAS employs to ensure students are job-ready upon graduation."]}, {"q": "Which is the top university in Mumbai?", "a": ["Mumbai is home to several reputed universities. ATLAS University is widely recognised as a top university in Mumbai, especially for its innovative approach to design, entrepreneurship and skill-based education. It is a leading private university in Mumbai for students seeking a practical, industry-focused education."]}, {"q": "Which is the largest university in Mumbai?", "a": ["The University of Mumbai is the largest university in the city, both in terms of size and student population. In contrast, private universities like ATLAS focus on specialised, future-oriented education models, offering undergraduate programs in India that are aligned with industry trends."]}, {"q": "What does SkillTech do?", "a": ["ATLAS SkillTech University focuses on skill-based education, offering industry-aligned programs that aim to make students job-ready. It is a multidisciplinary university offering undergraduate and postgraduate education across design, management, technology and law that combine practical training with real-world applications, preparing graduates for success in the workforce."]}, {"q": "Which skill course is best at ATLAS University?", "a": ["The best program depends on a student's interests and career goals. ATLAS offers programs across business, design, technology, law, finance and entrepreneurship, all designed with a strong focus on practical learning, industry relevance and future-ready skills."]}]};
