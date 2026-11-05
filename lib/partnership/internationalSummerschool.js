/*
 * /advantages/partnership/international-summerschool — content, transcribed from
 * reference/advantages/partnership/international-summerschool.php (production identical,
 * 2026-10-31). Assets mirror production's own paths under public/.
 *
 * Unlike the other partnership pages this one is built on the /life-at-atlas Webflow sheet
 * (`$css = …690b5e72…`) and loads no Tailwind CDN. Dead upstream refs, not reproduced: the five
 * "Global Voices" student photographs are `atlas-global/wp-content` URLs that answer 403 for every
 * visitor (production paints an empty broken-image half-card).
 *
 * 13 files are byte-identical (SHA-1) to ones already in public/ for /advantages/atlas-internationalisation
 * (3 Beyond Borders videos with posters, 4 university logos) and are referenced from there.
 */

/* `#life-at-isme` — the /life-at-atlas photo-column hero with 8 photographs per column (each column
   lists its set twice for the -50% marquee), no scrim and no title (both lines are commented out). */
export const hero = {
  duration: 32,
  scrim: false,
  mobileNatural: true,
  columns: [
  {
    "variant": "vertical-swiper",
    "hideOnMobile": false,
    "slides": [
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/1.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/2.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/3.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/4.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/5.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/6.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/7.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/8.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/1.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/2.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/3.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/4.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/5.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/6.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/7.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/8.png",
          "alt": ""
        }
      }
    ]
  },
  {
    "variant": "vertical-swiper1",
    "hideOnMobile": true,
    "slides": [
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/9.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/10.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/11.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/12.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/13.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/14.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/15.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/16.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/9.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/10.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/11.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/12.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/13.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/14.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/15.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/16.png",
          "alt": ""
        }
      }
    ]
  },
  {
    "variant": "vertical-swiper",
    "hideOnMobile": true,
    "slides": [
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/17.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/18.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/19.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/20.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/21.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/22.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/23.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/24.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/17.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/18.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/19.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/20.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/21.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/22.png",
          "alt": ""
        }
      },
      {
        "auto": true,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/23.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/24.png",
          "alt": ""
        }
      }
    ]
  },
  {
    "variant": "vertical-swiper1",
    "hideOnMobile": false,
    "slides": [
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/25.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/26.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/27.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/28.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/29.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/30.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/31.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/32.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/25.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/26.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/27.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/28.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/29.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/30.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/31.png",
          "alt": ""
        }
      },
      {
        "auto": false,
        "image": {
          "src": "/assets/images/advantages/master-progression/hero-banner/32.png",
          "alt": ""
        }
      }
    ]
  }
],
};

/* `.summer-intro-section` — directly under the hero, outside `.main-wrapper` */
export const intro = { title: 'International Summer Schools', subtitle: 'Elevate your Global Learning Journey' };

/* `.top-cards-wrapper` on the /life-at-atlas sheet: `.atlas-bg-1/3` paint #3a3c84, `.atlas-bg-2` #2e3074 */
const BG = {
  1: { background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-1.png', imagePosition: '100% 50%' },
  2: { background: '#2e3074', image: '/assets/images/campus/stats/vector-atlas-2.png', imagePosition: '100% 50%' },
  3: { background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-3.png', imagePosition: '100% 0' },
};
export const stats = [
  { label: "120+", value: "Summer School Experiences", ...BG[1] },
  { label: "20+", value: "Global Cities Visited", ...BG[2] },
  { label: "35+", value: "Global Universities", ...BG[3] },
  { label: "45+", value: "Multidisciplinary Subject Areas", ...BG[2] },
  { label: "87%", value: "Students Receive Scholarships", ...BG[1] },
];

export const story = {
  heading: 'About Summer Schools',
  image: "/assets/images/advantages/summer-school/section-img/1.png",
  text: "ATLAS proudly facilitates enriching Summer School experiences for its students at prestigious International Universities. A Summer School serves as a dynamic short-term mobility opportunity, allowing students to delve into academic pursuits while immersing themselves in diverse cultural landscapes.\n\nBeyond classroom engagement, students partake in enriching cultural and business visits, fostering meaningful social interactions with peers from across the globe. Furthermore, these summer school experiences often serve as a gateway for students to explore extended study opportunities, broaden ing their academic horizons and nurturing a global perspective.",
};

/* "Global Summer Student Experiences" — four regions, each a wall of 4 columns x 2 photo cards with a
   university-logo badge. `logoHeight` is an authored inline `style="height:…"` on the badge image. */
export const experiencesHeading = 'Global Summer Student Experiences';
export const experienceTabs = [
  {
    "label": "UK",
    "columns": [
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/1.png",
          "rounded16": false,
          "logo": "/assets/images/international/partners/london-school-economics.png",
          "logoHeight": 50
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/2.png",
          "rounded16": false,
          "logo": "/assets/images/internationalisation-logo/brimingham.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/3.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nottingham-university.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/4.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ual-fashion.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/5.png",
          "rounded16": true,
          "logo": "/assets/images/advantages/summer-school/logo/ucl.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/6.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ual-sm.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/7.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ual-lcc.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/uk/8.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/kings-london.png",
          "logoHeight": 50
        }
      ]
    ]
  },
  {
    "label": "Europe",
    "columns": [
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/1.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/naba.png",
          "logoHeight": 35
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/2.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/rwth.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/3.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ied.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/4.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/instituto.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/5.png",
          "rounded16": true,
          "logo": "/assets/images/advantages/summer-school/logo/alto.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/6.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ied.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/7.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/ium.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/europe/8.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/rwth.png",
          "logoHeight": null
        }
      ]
    ]
  },
  {
    "label": "US",
    "columns": [
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/1.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nyu.png",
          "logoHeight": 40
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/2.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nyfa.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/3.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/harvard-university.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/4.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/berkeley.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/5.png",
          "rounded16": true,
          "logo": "/assets/images/advantages/summer-school/logo/parsons-school.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/6.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nyu-sps.jpg",
          "logoHeight": 55
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/7.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/harvard-school.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/us/8.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/babson.png",
          "logoHeight": null
        }
      ]
    ]
  },
  {
    "label": "Asia",
    "columns": [
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/1.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/yonsei.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/2.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nus.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/3.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/yonsei.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/4.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/smu.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/5.png",
          "rounded16": true,
          "logo": "/assets/images/advantages/summer-school/logo/shangai.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/6.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/nanyang.png",
          "logoHeight": null
        }
      ],
      [
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/7.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/yonsei.png",
          "logoHeight": null
        },
        {
          "image": "/assets/images/advantages/summer-school/toggle-tab/asia/8.png",
          "rounded16": false,
          "logo": "/assets/images/advantages/summer-school/logo/seoul.png",
          "logoHeight": null
        }
      ]
    ]
  }
];

/* "Summer School Diaries" — 7 reels (poster + mp4) in the page's own coverflow carousel */
export const diariesHeading = 'Summer School Diaries';
export const diaries = [
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/1.png",
    "video": "/assets/images/advantages/summer-school/reel/video/1.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/2.png",
    "video": "/assets/images/advantages/summer-school/reel/video/2.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/3.png",
    "video": "/assets/images/advantages/summer-school/reel/video/3.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/4.png",
    "video": "/assets/images/advantages/summer-school/reel/video/4.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/5.png",
    "video": "/assets/images/advantages/summer-school/reel/video/5.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/6.png",
    "video": "/assets/images/advantages/summer-school/reel/video/6.mp4"
  },
  {
    "poster": "/assets/images/advantages/summer-school/reel/poster-img/7.png",
    "video": "/assets/images/advantages/summer-school/reel/video/7.mp4"
  }
];

export const learning = {
  heading: 'International Summer Learning',
  text: "Students at ATLAS participate in summer programs hosted by top universities across multiple countries, gaining first-hand exposure to global academic and cultural environments. These experiences foster cross-cultural understanding and broaden academic perspectives. They play a meaningful role in shaping students’ future academic and professional journeys.",
  youtubeId: "q07GExAhHEw",
};

export const beyond = {
  heading: 'Experiences Beyond Borders',
  lead: "Real stories of ATLAS students exploring, learning, and growing across the world.",
  cards: [
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/1.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/1.mp4",
      "/assets/images/advantages/summer-school/testimonial/1.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/2.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/2.mp4",
      "/assets/images/advantages/summer-school/testimonial/2.webm"
    ]
  },
  {
    "poster": "/assets/images/international/experiences/testimonial-3.png",
    "sources": [
      "/assets/videos/international/experiences/testimonial-3.mp4",
      "/assets/videos/international/experiences/testimonial-3.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/4.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/4.mp4",
      "/assets/images/advantages/summer-school/testimonial/4.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/5.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/5.mp4",
      "/assets/images/advantages/summer-school/testimonial/5.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/6.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/6.mp4",
      "/assets/images/advantages/summer-school/testimonial/6.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/7.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/7.mp4",
      "/assets/images/advantages/summer-school/testimonial/7.webm"
    ]
  },
  {
    "poster": "/assets/images/international/experiences/testimonial-8.png",
    "sources": [
      "/assets/videos/international/experiences/testimonial-8.mp4",
      "/assets/videos/international/experiences/testimonial-8.webm"
    ]
  },
  {
    "poster": "/assets/images/international/experiences/testimonial-9.png",
    "sources": [
      "/assets/videos/international/experiences/testimonial-9.mp4",
      "/assets/videos/international/experiences/testimonial-9.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/10.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/10.mp4",
      "/assets/images/advantages/summer-school/testimonial/10.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/11.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/11.mp4",
      "/assets/images/advantages/summer-school/testimonial/11.webm"
    ]
  },
  {
    "poster": "/assets/images/advantages/summer-school/testimonial/12.png",
    "sources": [
      "/assets/images/advantages/summer-school/testimonial/12.mp4",
      "/assets/images/advantages/summer-school/testimonial/12.webm"
    ]
  }
],
};

/* "Global Voices, Student Stories" — `.testimonial-card.bgc1.atlas`; photographs dead upstream (above) */
export const voicesHeading = 'Global Voices, Student Stories';
export const voices = [
  {
    "quote": "The LSE Summer School was an amazing experience. The faculty that taught us were experts in their fields and taught each course with enthusiasm and contemporary relevance.",
    "name": "Kanak Suri",
    "nameStrong": true,
    "logo": "/assets/images/international/partners/london-school-economics.png"
  },
  {
    "quote": "My experience at the New York University Summer School was unparalleled. The academic rigour and the delivery of session was practical and helped me understand my career interests and prospects.",
    "name": "Nainika Patwari",
    "nameStrong": true,
    "logo": "/assets/images/international/partners/nyu.png"
  },
  {
    "quote": "Attending the Youth Ecosperity Dialogue at Singapore Management University was an extraordinary journey that profoundly impacted my commitment to sustainability. Leaving an indelible mark on my academic and personal growth.",
    "name": "Brooklyn Robinson",
    "nameStrong": false,
    "logo": "/assets/images/international/partners/smu.png"
  },
  {
    "quote": "The HEC Paris Summer School enhanced my interpersonal skills and strengthened my management and entrepreneurship expertise. The experience was academically rewarding and personally transformative.",
    "name": "Yash Dandavate",
    "nameStrong": true,
    "logo": "/assets/images/internationalisation-logo/hec_paris.png"
  },
  {
    "quote": "The Babson Build experience was an excellent entrepreneurship program blending academic and experiential learning. I had the opportunity to learn from peers worldwide and build my entrepreneurial ambitions.",
    "name": "Aaliya Khandwani",
    "nameStrong": false,
    "logo": "/assets/images/international/partners/babson.png"
  }
];
