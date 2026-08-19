/**
 * Copy and assets for /advantages/atlas-internationalisation, transcribed 1:1
 * from `reference/advantages/atlas-internationalisation.php` — the fifth
 * Advantages page and the eighth distinct Webflow stylesheet
 * (`…690c95c2ccf14f412c38ce03-20206b81f.css`).
 *
 * Every asset path is local. 141 assets from two hosts: 125 served by
 * `atlasuniversity.edu.in` itself (the world map, the Think International
 * photographs and all 31 testimonial videos with their posters) and 16 from
 * the Webflow CDN. 135 were downloaded into
 * `public/assets/images/international/<section>/` and
 * `public/assets/videos/international/<section>/`; 6 were already present and
 * are reused, each confirmed byte-identical by SHA-1 rather than by filename.
 *
 * The three `.head-top-card.atlas-bg-N` washes are painted only by the
 * stylesheet, so they travel as data on `stats[]`.
 *
 * ── Five blocks of the reference are commented out ────────────────────────
 * The "Explore More" button, the eight-card `.grid-gallery-flex` wall under
 * the "World-Class Learning" embed, the text half of every "Voices" card, the
 * "Our Student Experiences" lead and a fourth `.card-type-e` are all inside
 * HTML comments upstream. None of them is transcribed and none of their assets
 * was downloaded.
 *
 * `<br>` in the source is transcribed as `\n` and turned back into a `<br>` by
 * `lib/withBreaks`.
 */

export const meta = {
  "title": "Internationalisation & Global Pathways  – ATLAS SkillTech University",
  "description": "Discover global pathways, study-abroad options, exchange programs and international collaborations that expand academic horizons and career mobility."
};

export const hero = {
  "title": "Internationalisation",
  "text": "Bringing the World to Our Campus",
  "image": {
    "src": "/assets/images/international/hero/internationalisation-hero-image.png",
    "alt": "",
    "srcSet": "/assets/images/international/hero/internationalisation-hero-image-p-500.png 500w, /assets/images/international/hero/internationalisation-hero-image-p-800.png 800w, /assets/images/international/hero/internationalisation-hero-image-p-1080.png 1080w, /assets/images/international/hero/internationalisation-hero-image.png 1366w",
    "sizes": "(max-width: 1366px) 100vw, 1366px"
  }
};

export const stats = [
  {
    "label": "65+",
    "value": "International Partnerships",
    "background": "#41418e",
    "image": "/assets/images/campus/stats/vector-atlas-1.png",
    "imagePosition": "100%"
  },
  {
    "label": "150+",
    "value": "International Visiting Faculty",
    "background": "#2e3074",
    "image": "/assets/images/campus/stats/vector-atlas-2.png",
    "imagePosition": "100%"
  },
  {
    "label": "250+",
    "value": "Summer School Opportunities",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  },
  {
    "label": "400+",
    "value": "Students on Global Immersions",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  },
  {
    "label": "500+",
    "value": "Students Progressed for Master’s",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  },
  {
    "label": "6 Crore+",
    "value": "Scholarships\nAwarded",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  }
];

export const think = {
  "heading": "Think International. Learn International.",
  "subheading": "Your ATLAS Experience is built for a world without borders with 65+ international partnerships, students gain exposure to top universities, international faculty and summer schools.",
  "cards": [
    {
      "title": "Global Immersions",
      "href": "/advantages/partnership/global-immersions",
      "image": {
        "src": "/assets/images/international/think/1-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/1-500-1.png 500w, /assets/images/international/think/1-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    },
    {
      "title": "Summer Schools",
      "href": "/advantages/partnership/summerschool",
      "image": {
        "src": "/assets/images/international/think/2-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/2-500.png 500w, /assets/images/international/think/2-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    },
    {
      "title": "Masters Progression",
      "href": "/advantages/partnership/master-progression",
      "image": {
        "src": "/assets/images/international/think/3-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/3-500.png 500w, /assets/images/international/think/3-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    },
    {
      "title": "Global Pathways",
      "href": "/advantages/partnership/global-pathways",
      "image": {
        "src": "/assets/images/international/think/4-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/4-500.png 500w, /assets/images/international/think/4-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    },
    {
      "title": "International Faculty",
      "href": "/advantages/partnership/international-faculty",
      "image": {
        "src": "/assets/images/international/think/5-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/5-500.png 500w, /assets/images/international/think/5-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    },
    {
      "title": "Collaborative Projects",
      "href": "/advantages/partnership/collaborative-projects",
      "image": {
        "src": "/assets/images/international/think/6-611.png",
        "alt": "",
        "srcSet": "/assets/images/international/think/6-500.png 500w, /assets/images/international/think/6-611.png 611w",
        "sizes": "(max-width: 611px) 100vw, 611px"
      },
      "arrow": {
        "src": "/assets/images/international/think/arrow-top-rt-blk.svg",
        "alt": ""
      }
    }
  ]
};

export const map = {
  "heading": "With ATLAS, the world is within your reach",
  "image": {
    "src": "/assets/images/international/map/65-plus.webp",
    "alt": "",
    "srcSet": "/assets/images/international/map/65-plus-500.webp 500w, /assets/images/international/map/65-plus-800.webp 800w, /assets/images/international/map/65-plus.webp 1080w, /assets/images/international/map/65-plus.webp 1237w",
    "sizes": "(max-width: 1237px) 100vw, 1237px"
  }
};

export const partners = {
  "heading": "Our Global Partnerships",
  "tabs": [
    {
      "label": "All",
      "logos": [
        {
          "src": "/assets/images/international/partners/parsons-new-school.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/kings-clg-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ubc.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/bristol-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nyu.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/london-school-economics.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/arts-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/babson.png",
          "alt": "",
          "width": 60,
          "height": 60
        },
        {
          "src": "/assets/images/international/partners/university-of-southampton.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/boston-university.png",
          "alt": "",
          "width": 60,
          "height": 60
        },
        {
          "src": "/assets/images/international/partners/university-sheffield.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/rmit-university.png",
          "alt": "",
          "height": 71
        },
        {
          "src": "/assets/images/international/partners/university-of-bath.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/macquarie-university.png",
          "alt": "",
          "sizes": "100vw",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/exeter.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/york.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/curtin-university.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/reading.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/queensland-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/massey-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/victoria-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/griffith.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/university-of-sussex.png",
          "alt": "",
          "height": 80
        },
        {
          "src": "/assets/images/international/partners/city-st-georges-university-of-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/northeastern-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/northeastern-university.png",
          "alt": "",
          "width": 70,
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/birkbeck-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ie-business-school.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/colorado-state-university.png",
          "alt": "",
          "sizes": "100vw"
        },
        {
          "src": "/assets/images/international/partners/smu.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nottingham-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ulster-university.png",
          "alt": "",
          "sizes": "(max-width: 479px) 100vw, 127.9140625px",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/saint-peters-university.png",
          "alt": "",
          "height": 51
        },
        {
          "src": "/assets/images/international/partners/canterbury.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/seattle-university.png",
          "alt": "",
          "sizes": "100vw"
        },
        {
          "src": "/assets/images/international/partners/goldsmiths-university.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/brandeis-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/aberystwyth-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/westminister.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/keele.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/london-south-bank.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/teesideatlas.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/sunderland.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/pace.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/regents-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/audencia.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/ecoleatlasss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nyfa.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ifa.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/santa-clara.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/leeds-arts-university-1.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/setonatlasatlass.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/arts-university.png",
          "alt": "",
          "height": 90
        },
        {
          "src": "/assets/images/international/partners/suss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/spj-global-black-font-logo.webp",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/universidad-tecnia.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/domus-academy.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/goldenuniatlasss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/lasalle-college.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/windesheim.png",
          "alt": "",
          "height": 80
        },
        {
          "src": "/assets/images/international/partners/richmond.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/sp-jain.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/creative-studies.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/enae.png",
          "alt": "",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/shizenkan.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/semester-sea.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/acu.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "United Kingdom",
      "logos": [
        {
          "src": "/assets/images/international/partners/kings-clg-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/bristol-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/london-school-economics.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/arts-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/university-of-southampton.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/university-sheffield.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/university-of-bath.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/exeter.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/york.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/reading.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/university-of-sussex.png",
          "alt": "",
          "height": 80
        },
        {
          "src": "/assets/images/international/partners/city-st-georges-university-of-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/northeastern-london.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/birkbeck-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nottingham-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ulster-university.png",
          "alt": "",
          "sizes": "(max-width: 479px) 100vw, 127.9140625px",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/canterbury.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/goldsmiths-university.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/aberystwyth-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/westminister.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/keele.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/london-south-bank.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/teesideatlas.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/sunderland.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/regents-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/leeds-arts-university-1.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/arts-university.png",
          "alt": "",
          "height": 90
        },
        {
          "src": "/assets/images/international/partners/richmond.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/sp-jain.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/acu.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "America",
      "logos": [
        {
          "src": "/assets/images/international/partners/parsons-new-school.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ubc.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nyu.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/babson.png",
          "alt": "",
          "width": 60,
          "height": 60
        },
        {
          "src": "/assets/images/international/partners/boston-university.png",
          "alt": "",
          "width": 60,
          "height": 60
        },
        {
          "src": "/assets/images/international/partners/northeastern-university.png",
          "alt": "",
          "width": 70,
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/colorado-state-university.png",
          "alt": "",
          "sizes": "100vw"
        },
        {
          "src": "/assets/images/international/partners/saint-peters-university.png",
          "alt": "",
          "height": 51
        },
        {
          "src": "/assets/images/international/partners/seattle-university.png",
          "alt": "",
          "sizes": "100vw"
        },
        {
          "src": "/assets/images/international/partners/brandeis-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/pace.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/nyfa.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/santa-clara.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/setonatlasatlass.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/universidad-tecnia.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/goldenuniatlasss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/lasalle-college.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/creative-studies.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/semester-sea.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "Europe",
      "logos": [
        {
          "src": "/assets/images/international/partners/ie-business-school.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/audencia.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/partners/ecoleatlasss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/ifa.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/enae.png",
          "alt": "",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/domus-academy.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/windesheim.png",
          "alt": "",
          "height": 80
        }
      ]
    },
    {
      "label": "Oceania",
      "logos": [
        {
          "src": "/assets/images/international/partners/rmit-university.png",
          "alt": "",
          "height": 71
        },
        {
          "src": "/assets/images/international/partners/griffith.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/curtin-university.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/queensland-university.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/victoria-university.png",
          "alt": "",
          "height": 50
        },
        {
          "src": "/assets/images/international/partners/macquarie-university.png",
          "alt": "",
          "sizes": "100vw",
          "height": 70
        },
        {
          "src": "/assets/images/international/partners/massey-university.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "Asia",
      "logos": [
        {
          "src": "/assets/images/international/partners/smu.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/suss.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/shizenkan.png",
          "alt": ""
        },
        {
          "src": "/assets/images/international/partners/spj-global-black-font-logo.webp",
          "alt": ""
        }
      ]
    }
  ]
};

export const learning = {
  "heading": "World-Class Learning. Right Here. Right Now.",
  "subheading": "At ATLAS SkillTech University, internationalisation is more than an idea — it’s a lived experience that expands learning beyond borders. Students connect with global peers, industry experts, and diverse cultural perspectives that enrich their education. Through these immersive global exchanges, they graduate ready to lead in a truly interconnected world.",
  "embed": "https://www.youtube.com/embed/zzX0vtHhOg8?rel=0&controls=1&autoplay=0&mute=1&start=0"
};

export const voices = {
  "heading": "Voices Around the World",
  "subheading": "",
  "cards": [
    {
      "poster": "/assets/images/international/voices/angie-kamath-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/angie-kamath-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/angie-kamath-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/marlon-meikle-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/marlon-meikle-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/marlon-meikle-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/ubc-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/ubc-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/ubc-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/elena-dieckman-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/elena-dieckman-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/elena-dieckman-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/amir-reza-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/amir-reza-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/amir-reza-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/dan-maggs-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/dan-maggs-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/dan-maggs-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/northeastern-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/northeastern-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/northeastern-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/voices/santa-clara-1.jpg",
      "sources": [
        {
          "src": "/assets/videos/international/voices/santa-clara-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/voices/santa-clara-1.webm",
          "type": "video/webm"
        }
      ]
    }
  ]
};

export const experiences = {
  "heading": "Our Student Experiences",
  "cards": [
    {
      "poster": "/assets/images/international/experiences/testimonial-3.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/testimonial-3.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/testimonial-3.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/smiti-shah-1.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/smiti-shah-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/smiti-shah-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/poster-img-9.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/reels-11.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/reels-11.mp4",
          "type": "video/mp4"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/testimonial-8.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/testimonial-8.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/testimonial-8.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/shraddah-jadhav-1.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/shraddah-jadhav-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/shraddah-jadhav-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/poster-img-6.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/reels-9.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/reels-9.mp4",
          "type": "video/mp4"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/testimonial-9.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/testimonial-9.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/testimonial-9.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/agrata-agarwal-1.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/agrata-agarwal-1.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/agrata-agarwal-1.webm",
          "type": "video/webm"
        }
      ]
    },
    {
      "poster": "/assets/images/international/experiences/poster-img-7.png",
      "sources": [
        {
          "src": "/assets/videos/international/experiences/reels-3.mp4",
          "type": "video/mp4"
        },
        {
          "src": "/assets/videos/international/experiences/reels-3.mp4",
          "type": "video/mp4"
        }
      ]
    }
  ]
};

export const affairs = {
  "heading": "Office of International Affairs",
  "subheading": "Meet the team behind Internationalisation in ATLAS",
  "people": [
    {
      "name": "Utsav Shroff",
      "role": "Director",
      "image": {
        "src": "/assets/images/international/affairs/isme-3-2.png",
        "alt": ""
      }
    },
    {
      "name": "Sonam Moondhra",
      "role": "Director – Masters Progression",
      "image": {
        "src": "/assets/images/international/affairs/sonam-moondhra.png",
        "alt": ""
      }
    },
    {
      "name": "Pallavi Palande",
      "role": "Senior Counsellor – Masters Progression",
      "image": {
        "src": "/assets/images/international/affairs/pallavi-palande.png",
        "alt": ""
      }
    }
  ]
};

export const faq = {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
    {
      "q": "What international opportunities are available at ATLAS SkillTech University?",
      "a": [
        "ATLAS offers students global exposure through international collaborations, study abroad opportunities, exchange programs and short-term global immersion experiences. Students can also work on global case studies and projects that connect them with international contexts."
      ]
    },
    {
      "q": "Does ATLAS SkillTech University offer student exchange programs?",
      "a": [
        "ATLAS collaborates with international academic institutions to provide students with global learning opportunities, international exposure and cross-cultural experiences. Opportunities may vary depending on the program and partnership structure."
      ]
    },
    {
      "q": "How many international partnerships does ATLAS University have?",
      "a": [
        "ATLAS has multiple international academic partnerships with universities and institutions across different countries. These collaborations support exchange programs, joint learning opportunities and global exposure for students."
      ]
    },
    {
      "q": "What are the benefits of studying at an internationally connected university?",
      "a": [
        "An internationally connected university gives students exposure to global teaching styles, diverse cultures and broader career opportunities. It also helps students build adaptability, global thinking and a stronger academic profile for international careers or higher education."
      ]
    },
    {
      "q": "Can ATLAS students pursue a master's degree abroad?",
      "a": [
        "Yes. ATLAS students are well-prepared to apply for master’s programs abroad. The curriculum, portfolio-based learning and global exposure help students meet international admission requirements in fields like design, business and technology."
      ]
    },
    {
      "q": "How does ATLAS prepare students for global careers?",
      "a": [
        "ATLAS prepares students through international collaborations, industry-led curriculum and experiential learning. Students work on global projects, gain cross-cultural exposure and build skills that are relevant to international job markets."
      ]
    },
    {
      "q": "Do international faculty members teach at ATLAS SkillTech University?",
      "a": [
        "Yes. ATLAS regularly engages with global experts, academic collaborators and industry professionals to bring international perspectives into the student learning experience."
      ]
    },
    {
      "q": "Why is internationalisation important for students today?",
      "a": [
        "Internationalisation helps students develop a global mindset, which is essential in today’s interconnected world. It improves adaptability, communication across cultures and access to better education and career opportunities worldwide."
      ]
    }
  ]
};

export const internationalisationContent = {
  meta,
  hero,
  stats,
  think,
  map,
  partners,
  learning,
  voices,
  experiences,
  affairs,
  faq,
};
