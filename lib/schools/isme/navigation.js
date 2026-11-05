/**
 * ISME navigation model — generated from reference/schools/isme/assets/include/header.php
 * (HTML comments stripped first, so the entries upstream comments out are not here).
 *
 * Rendered by the shared school header (components/Schools/ISDI/Header/ISDIHeader) with the ISME
 * skin (components/Schools/ISME/Header/styles). Order, labels, line breaks and targets are the
 * reference's; `href: '#'` is kept where the reference links nowhere (Alumni Corner, Campus >
 * Location). `panel` names the `.level-1.ht-1` / `.ht-2` panel heights (470 / 390px; the rest are 386).
 * `wide: true` marks the BBA third-level list, the one `.level-3.bba-lvl-3` (600px).
 *
 * The menu panel photographs are the reference's own files: four are byte-identical to ones the
 * project already has (the ATLAS programmes / admissions images and two ISDI ones) and are reused.
 */
const ISME = '/schools/isme';

export const ismeUtilityLinks = [
  {
    label: 'Parents Corner',
    href: `${ISME}/parents-corner-information-and-support`,
  },
  {
    label: 'Non-Mumbai Applicants',
    href: `${ISME}/non-mumbai-outstation-students`,
  },
  {
    label: 'Alumni Corner',
    href: '#',
  },
  {
    label: 'HEI Relations',
    href: '/atlas-hei-relationship',
  },
  {
    label: 'Industry Relations',
    href: '/atlas-industry-partnership',
  },
  {
    label: 'Job Openings',
    href: `${ISME}/job-openings`,
  },
];

export const ismeUniversityLink = {
  label: 'ATLAS SkillTech University',
  href: '/',
};

export const ismeLogo = {
  href: ISME,
  src: '/assets/images/schools/isme/header/isme-logo-new-white.svg',
  width: 232,
  height: 53,
  alt: 'Isme Logo Design',
  ariaLabel: 'ISME Home',
};

/* ref: Apply Now goes to /summermgmt on the summer-school programme page, /applicationform elsewhere */
export const ismeHeaderCtas = {
  apply: 'https://atlasuniversity.edu.in/applicationform',
  applySummer: '/summermgmt',
  continueApplication: 'https://atlasuniversity.edu.in/admissions',
  campusVisit: 'https://atlasuniversity.edu.in/campusvisit',
  campusVisitLabel: 'Schedule a Visit',
};

export function ismeApplyHref(pathname) {
  return pathname && pathname.includes('schools/isme/programs/summer-school-management')
    ? ismeHeaderCtas.applySummer
    : ismeHeaderCtas.apply;
}

export const ismeMegaMenu = [
  {
    id: 'programs',
    label: 'Programs',
    image: {
      src: '/assets/images/menu-programs.webp',
      width: 1023,
      height: 244,
      alt: 'Industry expert delivering guest lecture to business students',
    },
    items: [
      {
        label: 'Undergraduate',
        children: [
          {
            label: 'Overview',
            href: `${ISME}/programs/undergraduate/ug-programmes`,
          },
          {
            label: 'BBA / BBA (Hons.)',
            children: [
              {
                label: 'BBA / BBA (Hons.) Major & Minor',
                href: `${ISME}/programs/undergraduate/bba-hons-major`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in Marketing',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-marketing`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in Finance',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-finance`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in Business Analytics',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-business-analytics`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in Digital Branding & Advertising',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-digital-branding-advertising`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in AI & Emerging Technologies',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-ai-emerging-technologies`,
              },
              {
                label: 'BBA / BBA (Hons.) Majoring in Business Psychology',
                href: `${ISME}/programs/undergraduate/bba-hons/majoring-in-business-psychology`,
              },
              {
                label: 'BBA / BBA (Hons.) International Accounting and Finance with ACCA',
                href: `${ISME}/programs/undergraduate/bba-hons/bba-hons-in-international-accounting-finance-with-acca`,
              },
            ],
            wide: true,
          },
          {
            label: 'B.Sc (Hons.)',
            children: [
              {
                label: 'B.Sc. (Hons.) in Finance',
                href: `${ISME}/programs/undergraduate/bsc-hons/bsc-hons-in-finance`,
              },
              {
                label: 'B.Sc. (Hons.) in Economics\nand Data Analytics',
                href: `${ISME}/programs/undergraduate/bsc-hons/bsc-in-economics-and-data-analytics`,
              },
            ],
          },
        ],
      },
      {
        label: 'Postgraduate',
        children: [
          {
            label: 'Overview',
            href: `${ISME}/programs/postgraduate/postgraduate-programs`,
          },
          {
            label: 'MBA',
            href: `${ISME}/programs/postgraduate/mba-hyper/mba-with-specialisation`,
          },
          {
            label: 'MBA in FinTech',
            href: `${ISME}/programs/postgraduate/program-mba-in-fintech`,
          },
          {
            label: 'MBA in Investment Banking',
            href: `${ISME}/programs/postgraduate/program-mba-in-investment-banking`,
          },
          {
            label: 'MBA in Financial Planning\n& Applied Finance',
            href: `${ISME}/programs/postgraduate/mba-financial-planning-applied-finance`,
          },
        ],
      },
      {
        label: 'Pre-University Summer School',
        href: `${ISME}/programs/summer-school-management`,
      },
    ],
  },
  {
    id: 'admissions',
    label: 'Admissions',
    image: {
      src: '/assets/images/menu-admissions.webp',
      width: 1023,
      height: 244,
      alt: 'Diverse group of students engaged in discussion',
    },
    items: [
      {
        label: 'Undergraduate',
        children: [
          {
            label: 'BBA / BBA (Hons.)',
            href: `${ISME}/admissions/undergraduate/admissions-bba-bachelor-of-business-administration`,
          },
          {
            label: 'B.Sc. (Hons.)',
            href: `${ISME}/admissions/undergraduate/bsc-admissions`,
          },
        ],
      },
      {
        label: 'Postgraduate',
        children: [
          {
            label: 'MBA',
            href: `${ISME}/admissions/postgraduate/admissions-mba-master-of-business-administration`,
          },
        ],
      },
      {
        label: 'Pre-University Summer School',
        href: `${ISME}/admissions/summer-school-management`,
      },
    ],
  },
  {
    id: 'atlas-isme-advantage',
    panel: 'ht1',
    label: 'ATLAS ISME Advantage',
    image: {
      src: '/assets/images/schools/isme/header/advantage-menu-img.webp',
      width: 1023,
      height: 244,
      alt: 'Professor lecturing to engaged business management students in modern classroom',
    },
    items: [
      {
        label: '9 Core Advantages',
        children: [
          {
            label: 'Overview',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage`,
          },
          {
            label: 'Location',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#our-location-isme`,
          },
          {
            label: 'Industry Connect',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#industry-connect`,
          },
          {
            label: 'Entrepreneurship',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#Entreprenership`,
          },
          {
            label: 'Global Exposure',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#global-exposure`,
          },
          {
            label: 'Infrastructure',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#infrastructure`,
          },
          {
            label: 'Student Welfare',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#student-welfare`,
          },
          {
            label: 'Graduate Attributes',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#graduate-attributes`,
          },
          {
            label: 'Tailored Pathways',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#graduate-attributes`,
          },
          {
            label: 'Research Driven',
            href: `${ISME}/atlas-isme-advantage/9-core-advantages/why-choose-isme-advantage#research-driven`,
          },
        ],
      },
      {
        label: 'Internationalisation',
        children: [
          {
            label: 'Overview',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities`,
          },
          {
            label: 'Global University Partnerships',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#global-uni-partner`,
          },
          {
            label: 'International Events',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#international-events`,
          },
          {
            label: 'Summer School',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#international-summer-school`,
          },
          {
            label: 'Global Immersions',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#global-immersion`,
          },
          {
            label: 'Masters Progressions',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#masters-progressions`,
          },
          {
            label: 'Global Education Fair',
            href: `${ISME}/atlas-isme-advantage/internationalisation/internationalisation-global-opportunities#global-education-fair`,
          },
        ],
      },
      {
        label: 'Industry',
        children: [
          {
            label: 'Our Industry Centric Approach',
            href: `${ISME}/atlas-isme-advantage/industry/our-industry-centric-approach-to-education`,
          },
          {
            label: 'Career Services',
            href: `${ISME}/atlas-isme-advantage/industry/career-services-placement-and-guidance`,
          },
          {
            label: 'Industry Certifications',
            href: `${ISME}/atlas-isme-advantage/industry/industry-recognised-certifications`,
          },
        ],
      },
      {
        label: 'Entrepreneurship',
        href: `${ISME}/atlas-isme-advantage/entrepreneurship`,
      },
    ],
  },
  {
    id: 'success-stories',
    panel: 'ht2',
    label: 'Success Stories',
    image: {
      src: '/assets/images/schools/isdi/header/nav-success-stories.webp',
      width: 1023,
      height: 244,
      alt: 'Atlas University graduates celebrating convocation by tossing caps',
    },
    items: [
      {
        label: 'Success Snapshot',
        children: [
          {
            label: 'Overview',
            href: `${ISME}/success-stories/success-snapshot/success-stories`,
          },
          {
            label: 'Our beliefs',
            href: `${ISME}/success-stories/success-snapshot/success-stories#our-beliefs`,
          },
          {
            label: 'Startups',
            href: `${ISME}/success-stories/success-snapshot/success-stories#start-up-section`,
          },
          {
            label: 'Placements & Internship',
            href: `${ISME}/success-stories/success-snapshot/success-stories#placement`,
          },
          {
            label: 'Masters Progression',
            href: `${ISME}/success-stories/success-snapshot/success-stories#master-progressions`,
          },
          {
            label: 'Patents & Publications',
            href: `${ISME}/success-stories/success-snapshot/success-stories#patent`,
          },
          {
            label: 'Awards & Recognition',
            href: `${ISME}/success-stories/success-snapshot/success-stories#awards`,
          },
          {
            label: 'Student Spotlight',
            href: `${ISME}/success-stories/success-snapshot/success-stories#spotlight`,
          },
        ],
      },
      {
        label: 'Placements',
        href: `${ISME}/success-stories/placements-and-internships-opportunities`,
      },
      {
        label: 'Startups',
        href: `${ISME}/success-stories/startups`,
      },
      {
        label: 'Masters Progression',
        href: `${ISME}/success-stories/masters-progression`,
      },
    ],
  },
  {
    id: 'life-atlas-isme',
    label: 'Life@ATLAS ISME',
    image: {
      src: '/assets/images/schools/isme/header/life-menu-img.webp',
      width: 1023,
      height: 364,
      alt: 'Students in traditional attire celebrating cultural fest on campus',
    },
    items: [
      {
        label: 'The ATLAS ISME Experience',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#life-at-isme`,
      },
      {
        label: 'Student Clubs',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#student-clubs`,
      },
      {
        label: 'Fests & Cultural Events',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#fest-culture`,
      },
      {
        label: 'Intercollegiate Events',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#intercollegiate-events`,
      },
      {
        label: 'Sports',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#sports`,
      },
      {
        label: 'Student Council',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#student-council`,
      },
      {
        label: 'Student Welfare',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#student-welfare`,
      },
      {
        label: 'ATLAS Student Housing',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#student-housing`,
      },
      {
        label: 'Life in Mumbai',
        href: `${ISME}/life@atlas-isme/life-at-atlas-is-me-campus-experience#life-in-mumbai`,
      },
    ],
  },
  {
    id: 'events',
    panel: 'ht2',
    label: 'Events',
    image: {
      src: '/assets/images/schools/isme/header/events-menu-img.webp',
      width: 1023,
      height: 364,
      alt: 'Students showcasing handmade products at college flea market',
    },
    items: [
      {
        label: 'Flagship',
        href: `${ISME}/events/flagship-events-at-atlas-isme`,
      },
      {
        label: 'Entrepreneurship',
        href: `${ISME}/events/entrepreneurship-and-startup-events`,
      },
      {
        label: 'Industry Connect',
        href: `${ISME}/events/industry-networking-and-conferences`,
      },
      {
        label: 'International Events',
        href: `${ISME}/events/industry-events-international-events`,
      },
      {
        label: 'Masters Progressions',
        href: `${ISME}/events/industry-events-masters-progression-events`,
      },
      {
        label: 'Fests & Cultural Events',
        href: `${ISME}/events/annual-fests-and-cultural-celebrations`,
      },
      {
        label: 'Hackathons & Challenges',
        href: `${ISME}/events/hackathons-and-innovation-challenges`,
      },
      {
        label: 'Podcasts & Fireside Chats',
        href: `${ISME}/events/podcasts-and-fireside-chats-with-industry-leaders`,
      },
    ],
  },
  {
    id: 'campus',
    panel: 'ht2',
    label: 'Campus',
    image: {
      src: '/assets/images/schools/isme/header/campus-menu-img.webp',
      width: 1023,
      height: 272,
      alt: 'Modern open-air campus courtyard with seating',
    },
    items: [
      {
        label: 'Overview',
        href: `${ISME}/campus/campus-facilities-and-infrastructure`,
      },
      {
        label: 'Location',
        href: '#',
      },
      {
        label: 'Spaces',
        href: `${ISME}/campus/campus-facilities-and-infrastructure#campus-spaces`,
      },
      {
        label: 'Student Housing',
        href: `${ISME}/campus/campus-facilities-and-infrastructure#campus-housing`,
      },
      {
        label: 'Green Campus',
        href: `${ISME}/campus/campus-facilities-and-infrastructure#campus-green`,
      },
    ],
  },
  {
    id: 'about-us',
    label: 'About Us',
    image: {
      src: '/assets/images/schools/isdi/header/nav-about-us.webp',
      width: 1023,
      height: 299,
      alt: 'A teacher talking on a mic',
    },
    items: [
      {
        label: 'Overview',
        href: `${ISME}/about/about-atlas-university-is-me`,
      },
      {
        label: 'Our Story',
        href: `${ISME}/about/about-atlas-university-is-me#our-story`,
      },
      {
        label: 'Leadership Team',
        href: `${ISME}/about/about-atlas-university-is-me#our-leadership`,
      },
      {
        label: 'Faculty @ ISME',
        href: `${ISME}/about/about-atlas-university-is-me#our-faculty`,
      },
      {
        label: 'Location',
        href: `${ISME}/about/about-atlas-university-is-me#our-location`,
      },
      {
        label: 'Thought Leadership',
        href: '/schools/isme/thought-leaderships',
      },
      {
        label: 'ATLAS Times',
        href: `${ISME}/about/about-atlas-university-is-me#atlas-times`,
      },
      {
        label: 'Press Coverage',
        href: `${ISME}/about/about-atlas-university-is-me#press-coverage`,
      },
    ],
  },
];

/* the plain last item; its phone-only arrow is the same file ISDI uses */
export const ismeContactLink = {
  label: 'Contact Us',
  href: '/contact-us',
  icon: '/assets/images/international/think/arrow-top-rt-blk.svg',
};

/* the shared header's `site` prop */
export const ismeSite = {
  school: 'isme',
  navLabel: 'ISME navigation',
  megaMenu: ismeMegaMenu,
  contactLink: ismeContactLink,
  ctas: ismeHeaderCtas,
  logo: ismeLogo,
  utilityLinks: ismeUtilityLinks,
  universityLink: ismeUniversityLink,
  applyHref: ismeApplyHref,
};
