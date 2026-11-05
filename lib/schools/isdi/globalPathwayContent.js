/*
 * Content for /schools/isdi/atlas-isdi-advantage/global-pathway —
 * reference/schools/isdi/atlas-isdi-advantage/global-pathway/index.php.
 *
 * `$css = "…68e35e01…"` — the SAME sheet as /atlas-isdi-advantage/internationalisation,
 * and the page is that page's remix: the same fourteen-block structure and the same
 * component set, with overlapping copy. So the blocks that are byte-identical to
 * internationalisation are re-exported from its content barrel, and only the blocks
 * that differ are defined here:
 *   - hero            page's own ("ISDI Global Design Pathway …")
 *   - stats           internationalisation's backgrounds/images, this page's three
 *                     figures (Global Master Progressors 140+, Across Countries 10+,
 *                     Total Master Progressors 400+)
 *   - pathway         internationalisation's heading/sub, this page's own image
 *   - events          internationalisation's desc/video/columns/icon, this page's own
 *                     heading ("International Expertise. ISDI Experience.") and three
 *                     testimonials (the first two are internationalisation's faculty
 *                     videos; the third, Amy Williams, is a photo card)
 *   - summer          internationalisation's heading/sub/stats, this page's gallery
 *   - masters         internationalisation's heading/sub/strip/icon, this page's own
 *                     four progressor cards (three carry no partner logo)
 * Re-exported verbatim: menu, parsons, partnerships, immersion, ged, gedFair, logos,
 * search. The page has NO FAQ (block 13 is the search panel only; its `.view-more-faq`
 * is `display: none`, as on internationalisation).
 *
 * Served at the trailing-slash url on production (a directory with an index.php; the
 * slashless path 301s). Measured against production, because the local mirror renders
 * in quirks mode. Generated — edit the source, not this file.
 */
import {
  menu,
  parsons,
  partnerships,
  immersion,
  ged,
  gedFair,
  logos,
  search,
  pathway as intlPathway,
  events as intlEvents,
  summer as intlSummer,
  masters as intlMasters,
} from '@/lib/schools/isdi/internationalisationContent';
import { faq as masterFaq } from '@/lib/designInnovationContent';

export { menu, parsons, partnerships, immersion, ged, gedFair, logos, search };

/*
 * ref `$arrow = "isdi-down-arrow.svg"; include "…/assets/include/faq.php"` (line 851) —
 * the generic database-driven FAQ include, which keys on $domain/$fullUrl and, for a
 * /schools/isdi/ URL, falls through to FAQ master 1, the 24-question ISDI set. Verified
 * against production (24 items, "Questions? We can read your mind", same first questions),
 * identical to the set `lib/designInnovationContent` holds and /about-us re-exports — so
 * it is re-used here with the ISDI arrow, exactly as `about/faq.js` does. The local mirror
 * fatals on the missing database handle, which is why this block does not render there;
 * it was found by the 12-width production measurement, not the local struct.
 */
export const faq = {
  ...masterFaq,
  heading: 'Questions? We can read your mind',
  arrow: '/assets/images/schools/isdi/home/faq/isdi-down-arrow.svg',
};


export const hero = {
  fullHeight: false,
  title: "ISDI Global Design Pathway\nFrom Mumbai to the World’s\nTop Design Hubs.",
  image: {
    src: "/assets/images/schools/isdi/global-pathway/hero-img.webp",
    srcSet: "/assets/images/schools/isdi/global-pathway/hero-image-isme-internationalization-p-500.webp 500w, /assets/images/schools/isdi/global-pathway/hero-image-isme-internationalization-p-800.webp 800w, /assets/images/schools/isdi/global-pathway/hero-image-isme-internationalization-p-1080.webp 1080w, /assets/images/schools/isdi/global-pathway/hero-image-isme-internationalization.webp 1366w",
    sizes: "(max-width: 1439px) 100vw, 1365.9722900390625px",
    alt: "",
  },
  imageId: "overview",
};

export const stats = [
  {
    background: "rgb(0, 56, 177)",
    image: "/assets/images/schools/isdi/about/stats/pro-bg-1.png",
    label: "Global Master Progressors",
    value: "140+",
    padRight: false,
  },
  {
    background: "rgb(10, 70, 202)",
    image: "/assets/images/schools/isdi/about/stats/vector-0.png",
    label: "Across Countries",
    value: "10+",
    padRight: true,
  },
  {
    background: "rgb(0, 56, 177)",
    image: "/assets/images/schools/isdi/about/stats/pro-bg-1.png",
    label: "Total Master Progressors",
    value: "400+",
    padRight: false,
  },
];

export const pathway = { ...intlPathway, image: {
  src: "/assets/images/schools/isdi/global-pathway/background.webp",
  srcSet: "/assets/images/schools/isdi/global-pathway/background-p-500.webp 500w, /assets/images/schools/isdi/global-pathway/background-p-800.webp 800w, /assets/images/schools/isdi/global-pathway/background-p-1080.webp 1080w, /assets/images/schools/isdi/global-pathway/background.webp 1236w",
  sizes: "(max-width: 1279px) 100vw, 1235.9722900390625px",
  alt: "",
} };

export const events = {
  ...intlEvents,
  heading: "International Expertise. ISDI Experience.",
  cards: [
    {
      text: "Learning from international faculty and pitching ideas in a global setting made me feel more confident, connected",
      name: "Simone Varotto",
      role: "Henley Business School, UK",
      video: {
        sources: [
          {
            src: "/assets/videos/schools/isdi/internationalisation/dr-elena-dieckmann.mp4",
            type: "video/mp4",
          },
          {
            src: "/assets/videos/schools/isdi/internationalisation/dr-elena-dieckmann.webm",
            type: "video/webm",
          },
        ],
        poster: "/assets/images/schools/isdi/internationalisation/events/6846c77f346415bfcbb813b6-68a5d70d12bb383920e07e80_dr-elena-dieckmann-poster-00001.jpg",
        loop: true,
      },
    },
    {
      text: "I got to work on real shoots and brand projects in my second year. It’s not just classes—it feels like the industry already.",
      name: "Dr. Sabah Boustila",
      role: "Manchester Metropolitan University",
      video: {
        sources: [
          {
            src: "/assets/videos/schools/isdi/internationalisation/dr-sabah-boustila.mp4",
            type: "video/mp4",
          },
          {
            src: "/assets/videos/schools/isdi/internationalisation/dr-sabah-boustila.webm",
            type: "video/webm",
          },
        ],
        poster: "/assets/images/schools/isdi/internationalisation/events/6846c77f346415bfcbb813b6-68a5d715e78cd5e1fe0226da_dr-sabah-boustila-poster-00001.jpg",
        loop: true,
      },
    },
    {
      text: "Learning abroad changed the way I think. It wasn’t just a trip—it was clarity on where I want to go",
      name: "Amy Williams",
      role: "University of Exeter, UK",
      video: null,
      image: {
        src: "/assets/images/schools/isdi/global-pathway/ammy-williams.webp",
        alt: "",
      },
    },
  ],
};

export const summer = { ...intlSummer, gallery: [
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-1.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-2.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-3.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-4.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-5.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-6.webp",
        alt: "",
      },
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/immersion-adv-isdi-7.webp",
        alt: "",
      },
    },
  ] };

export const masters = {
  ...intlMasters,
  people: [
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/65192fcc2bea1b99f36d91b52b71e674-st-1.webp",
        alt: "",
      },
      name: "Hukhta Patel",
      degree: "Masters Creative Business Leadership",
      logo: {
        src: "/assets/images/schools/isdi/internationalisation/masters/scad.png",
        alt: "",
      },
      logoKind: "sized",
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/a68f72fac0102cb51d43bc237a34aa48-st-2.webp",
        alt: "",
      },
      name: "Diva Rathore",
      degree: "Masters in Jewelry Design",
      logo: null,
      logoKind: "bare",
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/8587a084da3bf717148bcee7053d1229-st-3.webp",
        alt: "",
      },
      name: "Sannidhi Nayak",
      degree: "Master Research, Healthcare & Design",
      logo: null,
      logoKind: "bare",
    },
    {
      image: {
        src: "/assets/images/schools/isdi/global-pathway/7d8df8d90ce0a4a822b6930dd2c947c8-st-4.webp",
        alt: "",
      },
      name: "Anantika Sethi",
      degree: "Msc Human\nComputer Interaction",
      logo: null,
      logoKind: "bare",
    },
  ],
  strip: [
    {
      value: "50+",
      label: "Prestigious Master’s\nOffers Worldwide",
    },
    {
      value: "₹5 Crore+",
      label: "in Scholarships\nAwarded",
    },
    {
      value: "6,000+",
      label: "Students Transformed\nThrough Global Exposure",
    },
    {
      value: "3+",
      label: "Master’s Offers for\nEvery Applicant (1:3 Ratio)",
    },
  ],
};
