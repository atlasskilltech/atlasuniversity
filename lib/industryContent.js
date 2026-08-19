/**
 * Copy and assets for /advantages/atlas-industry-centric-approach, transcribed
 * 1:1 from `reference/advantages/atlas-industry-centric-approach.php` — the
 * fourth Advantages page and the seventh distinct Webflow stylesheet
 * (`…690c70a02322c69cf63510da-73be19199.css`).
 *
 * Every asset path is local. 189 assets: 115 downloaded into
 * `public/assets/images/industry/<section>/`, 74 already present from
 * /about-us, /campus-atlas, /success-stories-atlas and the homepage and reused
 * rather than duplicated. Two of them (`vector-atlas-1/-3.png`) are painted
 * only by the stylesheet, on `.head-top-card.atlas-bg-N`, so they travel as
 * data on `stats[].bg` and are applied by `StatBand`.
 *
 * `<br>` in the source is transcribed as `\n` and turned back into a `<br>` by
 * `lib/withBreaks`.
 *
 * The `.cd-tyd-posi` slot on every advisor is empty upstream, and there is no
 * `.placement-batch` on any of the five success stories — both are the
 * reference's own markup, not omissions here.
 */

export const meta = {
  "title": "Industry-Centric Learning Approach  – ATLAS SkillTech University",
  "description": "Learn through industry projects, corporate tie-ups and hands-on briefs that bridge academics with practical skills, internships and employer engagement."
};

export const hero = {
  "title": "Empowering Industry-\nReady Careers",
  "text": "Go Global with Your Education. Start ATLAS SkillTech University, placements reflect our commitment to industry readiness, future-forward skills, and experiential learning. Our Career Services team empowers students through guidance, training, and industry access to achieve their aspirations across diverse sectors.",
  "image": {
    "src": "/assets/images/industry/hero/industry-approach-hero-atlas.png",
    "alt": "",
    "srcSet": "/assets/images/industry/hero/industry-approach-hero-atlas-p-500.png 500w, /assets/images/industry/hero/industry-approach-hero-atlas-p-800.png 800w, /assets/images/industry/hero/industry-approach-hero-atlas-p-1080.png 1080w, /assets/images/industry/hero/industry-approach-hero-atlas.png 1366w",
    "sizes": "(max-width: 1366px) 100vw, 1366px"
  }
};

export const stats = [
  {
    "label": "Hiring Partners",
    "value": "500+",
    "background": "#41418e",
    "image": "/assets/images/campus/stats/vector-atlas-1.png",
    "imagePosition": "100%"
  },
  {
    "label": "CXO Masterclass",
    "value": "300+",
    "background": "#2e3074",
    "image": "/assets/images/campus/stats/vector-atlas-2.png",
    "imagePosition": "100%"
  },
  {
    "label": "Leaders on Campus",
    "value": "1000+",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  }
];

export const advisors = {
  "heading": "Steering Excellence, Guiding ATLAS",
  "subheading": "Our Advisory Board",
  "button": {
    "href": "/advisory-board-industry-academia-leaders",
    "label": "View All"
  },
  "people": [
    {
      "name": "Deepak Parekh",
      "role": "Chairman",
      "logo": "/assets/images/about/advisory/image-1052-2-copy.png",
      "logoAlt": "",
      "image": "/assets/images/about/advisory/board-img-1.webp",
      "alt": "",
      "video": "https://www.youtube.com/watch?v=nko8PuMgnT8",
      "playIcon": "/assets/images/about/advisory/play-button-atlas.png",
      "href": "#"
    },
    {
      "name": "Vivek Pandit",
      "role": "Senior Partner",
      "logo": "/assets/images/about/advisory/logo10.png",
      "logoAlt": "",
      "image": "/assets/images/about/advisory/image-1053-copy-2.png",
      "alt": "",
      "video": "https://youtu.be/p2zCVkQdMtM",
      "playIcon": "/assets/images/about/advisory/play-button-atlas.png",
      "href": "#"
    },
    {
      "name": "Ronnie Screwvala",
      "role": "Chairperson & Co-Founder",
      "logo": "/assets/images/industry/advisory/logo8.png",
      "logoAlt": "",
      "image": "/assets/images/industry/advisory/gradient-2-copy-7.png",
      "alt": "",
      "video": "https://www.youtube.com/embed/DRCPfJBynd4",
      "playIcon": "/assets/images/about/advisory/play-button-atlas.png",
      "href": "#"
    },
    {
      "name": "Keshav Murugesh",
      "role": "Group CEO",
      "logo": "/assets/images/about/advisory/image-1052-2.png",
      "logoAlt": "",
      "image": "/assets/images/about/advisory/image-1053.png",
      "alt": "",
      "video": "https://drive.google.com/file/d/1oWStAkZK2dvLL6nV0ecX8XypSAwekkXt/view?usp=drive_link",
      "playIcon": null,
      "href": "#"
    },
    {
      "name": "Karan Singh",
      "role": "Chairman",
      "logo": "/assets/images/about/advisory/bain.png",
      "logoAlt": "",
      "image": "/assets/images/about/advisory/image-1053-copy.png",
      "alt": "",
      "video": null,
      "playIcon": null,
      "href": null
    },
    {
      "name": "Anant Goenka",
      "role": "Vice Chairman",
      "logo": "/assets/images/about/advisory/image-1052-2-copy-2.png",
      "logoAlt": "",
      "image": "/assets/images/about/advisory/gradient-2.png",
      "alt": "",
      "video": "https://www.youtube.com/shorts/5fCWecfDYWM",
      "playIcon": null,
      "href": "#"
    }
  ]
};

export const recruiters = {
  "heading": "Our Recruitment Partners",
  "tabs": [
    {
      "label": "Technology",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/image-1348.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/image-1349.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/digiimpact.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/tvs.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/boat.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/screenshot-2025-10-28-at-7.17.41-pm-1.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/reliance_jio_logo_-october_2015-.svg-1.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/uc-1.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "BFSI",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/hdfc2.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/hdfclife.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/kotak.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/iifl.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/motialaoswal.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/morningstar.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/abcapital.ns_big-e60c51c6-1.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/idbi.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "Consulting",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/bdccccg.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/marshmcmannoi.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/landor.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "FMCG",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/pandg.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/mondelez.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/reddy.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/gooodrej.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/maaacro.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/ciiiipla.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "Media",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/vogue.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/havas.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/dentsu.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/omg.png",
          "alt": ""
        }
      ]
    },
    {
      "label": "Consumer Brands, Retail & Lifestyle",
      "logos": [
        {
          "src": "/assets/images/success/recruiters/reliance.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/relianceeeee.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/tatacliq.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/techmahindfra.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/trentlimtes.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/nykaaaa.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/zooomato.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/mcdddd.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/guuuuccci.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/lodhabro.png",
          "alt": "",
          "height": 80
        },
        {
          "src": "/assets/images/success/recruiters/makemytripzz.png",
          "alt": ""
        },
        {
          "src": "/assets/images/success/recruiters/pixel.png",
          "alt": ""
        }
      ]
    }
  ]
};

export const masterclasses = {
  "heading": "Industry Expert-Led Masterclasses",
  "subheading": "Our masterclasses bring the boardroom to the classroom — offering unfiltered insights into business growth, leadership, disruption, and innovation. Get ready to be taught by top leaders, entrepreneurs, and decision-makers across industries.",
  "slides": [
    {
      "title": "Sneha Basu Roy",
      "text": "Google",
      "image": {
        "src": "/assets/images/industry/masterclasses/sneha-basu-google-1.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/sneha-basu-google-1-p-500.png 500w, /assets/images/industry/masterclasses/sneha-basu-google-1.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/google.png",
        "alt": ""
      }
    },
    {
      "title": "Rochelle Aranha",
      "text": "BCG",
      "image": {
        "src": "/assets/images/industry/masterclasses/rochelle-aranha-bcg.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/rochelle-aranha-bcg-p-500.png 500w, /assets/images/industry/masterclasses/rochelle-aranha-bcg.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/bcg-for-rochelle.png",
        "alt": ""
      }
    },
    {
      "title": "Akash Jauhari",
      "text": "Meta",
      "image": {
        "src": "/assets/images/industry/masterclasses/akash-jauhari-meta.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/akash-jauhari-meta-p-500.png 500w, /assets/images/industry/masterclasses/akash-jauhari-meta.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/meta-img.png",
        "alt": ""
      }
    },
    {
      "title": "Sandeep Balani",
      "text": "JioAds",
      "image": {
        "src": "/assets/images/industry/masterclasses/sandeep-balani-jioads.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/sandeep-balani-jioads-p-500.png 500w, /assets/images/industry/masterclasses/sandeep-balani-jioads.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/jio-ads.png",
        "alt": ""
      }
    },
    {
      "title": "Tahir Desai",
      "text": "McKinsey & Company",
      "image": {
        "src": "/assets/images/industry/masterclasses/tahir-desai-mckinsey.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/tahir-desai-mckinsey-p-500.png 500w, /assets/images/industry/masterclasses/tahir-desai-mckinsey.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/mckinsey.svg",
        "alt": ""
      }
    },
    {
      "title": "Joseph Fernandes",
      "text": "Mastercard",
      "image": {
        "src": "/assets/images/industry/masterclasses/joseph-fernandes-mastercard.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/joseph-fernandes-mastercard-p-500.png 500w, /assets/images/industry/masterclasses/joseph-fernandes-mastercard.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/mastercard.png",
        "alt": ""
      }
    },
    {
      "title": "Pracheta Mazumdar",
      "text": "Bumble",
      "image": {
        "src": "/assets/images/industry/masterclasses/pracheta-mazumdar-bumble.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/pracheta-mazumdar-bumble-p-500.png 500w, /assets/images/industry/masterclasses/pracheta-mazumdar-bumble.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/bumble.png",
        "alt": ""
      }
    },
    {
      "title": "Ajay Sharma",
      "text": "Mahindra India Design Studio",
      "image": {
        "src": "/assets/images/industry/masterclasses/ajay-sharma-senior-vice-president-of-design-head-at-mahindra-india-design-studio-rise-.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/ajay-sharma-senior-vice-president-of-design-head-at-mahindra-india-design-studio-rise-p-500.png 500w, /assets/images/industry/masterclasses/ajay-sharma-senior-vice-president-of-design-head-at-mahindra-india-design-studio-rise-.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/success/recruiters/techmahindfra.png",
        "alt": ""
      }
    },
    {
      "title": "Biju Damodaran",
      "text": "Amazon",
      "image": {
        "src": "/assets/images/industry/masterclasses/biju-damodharan-amazon.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/biju-damodharan-amazon-p-500.png 500w, /assets/images/industry/masterclasses/biju-damodharan-amazon.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/amazon-small-logo.png",
        "alt": ""
      }
    },
    {
      "title": "Ivan Duggan",
      "text": "CISCO",
      "image": {
        "src": "/assets/images/industry/masterclasses/ivan-duggan-md-global-networking-cisco.png",
        "alt": "",
        "srcSet": "/assets/images/industry/masterclasses/ivan-duggan-md-global-networking-cisco-p-500.png 500w, /assets/images/industry/masterclasses/ivan-duggan-md-global-networking-cisco.png 670w",
        "sizes": "(max-width: 670px) 100vw, 670px"
      },
      "logo": {
        "src": "/assets/images/industry/masterclasses/cisco_logo_blue_2016.svg-1.png",
        "alt": ""
      }
    }
  ]
};

export const projects = {
  "heading": "Industry Projects & Capstones",
  "subheading": "Our masterclasses bring the boardroom to the classroom — offering unfiltered insights into business growth, leadership, disruption, and innovation. Get ready to be taught by top leaders, entrepreneurs, and decision-makers across industries.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/industry/projects/mondelez.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/ipc-mondelez.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/projects/godrej.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/ipc-godrej.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/projects/image-1157.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/ipci-colgate.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/reliance_jio_logo_-october_2015-.svg-1.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/ipc-jio.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/hdfclife.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/ipc-hdfc-life.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/projects/logo-loreal.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/projects/loreal-picture.png",
        "alt": ""
      }
    }
  ]
};

export const visits = {
  "heading": "Industry Visits",
  "subheading": "Theory ends where the real world begins. Through curated industry visits, students experience how companies actually operate — from strategy floors to shop floors.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/industry/visits/apple-logo-1.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/apple-ivv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/lo-oglivy-iv.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/oglivy-iv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/deutsche-bank.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/deutsche-iv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/lobelimo-iv.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/belimo-iv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/lo-group-m-iv.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/groupm-iv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/lodior-iv.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/dior-ivv.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/industry/visits/lo-fpw-iv.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/visits/pfw-ivv.png",
        "alt": ""
      }
    }
  ]
};

export const bootcamp = {
  "heading": "Bootcamp",
  "subheading": "Intensive, industry-designed learning programs conducted by industry experts to equip students with job-ready functional and technical skills through hands-on problem solving.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-1.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-2.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-3.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-4.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-5.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/bootcamp/bootcamp-6.png",
        "alt": ""
      }
    }
  ]
};

export const mentorship = {
  "heading": "Industry Mentorship Program",
  "subheading": "Personalised guidance from industry professionals to help students navigate career choices, skill development, and real-world expectations.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-1.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-2.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-3.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-4.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-5.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/mentorship/imp-6.png",
        "alt": ""
      }
    }
  ]
};

export const events = {
  "heading": "Industry Led Events on Campus",
  "subheading2": "ATLAS HR Conclave",
  "subheading": "Over 40 leaders from Wipro, Jio Financial Services, Citi Bank, and Deutsche Bank joined 150 emerging professionals at the ATLAS HR Conclave. Across three immersive zones, the event explored the future of HR through keynotes, discussions, and collaborative dialogues.",
  "image": {
    "src": "/assets/images/industry/events/c3144583-f47f-4174-9260-2d1c0a14780d.jpg",
    "alt": ""
  },
  "tabs": [
    {
      "label": "2025",
      "cards": [
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-1.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-2.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-3.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-4.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-5.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-6.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "2024",
      "cards": [
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-1-24.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-2-24.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-3-24.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-4-24.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-5-24.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-6-24.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "2023",
      "cards": [
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-6-23.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-5-23.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-4-23.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-3-23.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-2-23.png",
            "alt": ""
          }
        },
        {
          "logo": {
            "src": "/assets/images/success/recruiters/pixel.png",
            "alt": ""
          },
          "image": {
            "src": "/assets/images/industry/events/hr-1-23.png",
            "alt": ""
          }
        }
      ]
    }
  ]
};

export const leadership = {
  "heading": "Leadership Series",
  "subheading": "The ATLAS Leadership Series brings industry leaders face-to-face with students through focused dialogues on leadership, innovation, and the future of work. Our latest series, “Leading with Purpose,” featured experts from HDFC Securities, L&T Finance, BlackRock, Deutsche Bank, TCS, JSW, NSE, and more. As part of the series, a detailed curriculum review was conducted to ensure alignment with current industry trends and leadership practices. Additionally, participants provided handwritten feedback, offering valuable insights and personal reflections that will help refine future sessions.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-6.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-5.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-2.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-1.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-4.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/leadership/ls-3.png",
        "alt": ""
      }
    }
  ]
};

export const futureSkills = {
  "heading": "Future Skills",
  "subheading": "The experts delivered a powerful message: continuous learning and adaptability are essential for success, as panel discussions explored how technology is reshaping the workplace and driving the need for ongoing upskilling and reskilling.",
  "cards": [
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-1.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-2.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-3.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-4.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-5.png",
        "alt": ""
      }
    },
    {
      "logo": {
        "src": "/assets/images/success/recruiters/pixel.png",
        "alt": ""
      },
      "image": {
        "src": "/assets/images/industry/futureskills/fs-6.png",
        "alt": ""
      }
    }
  ]
};

export const successStories = {
  "heading": "Student Success Stories",
  "subheading": "Success beyond Campus",
  "cards": [
    {
      "name": "Daksh Mali",
      "course": "BBA in Finance",
      "batch": null,
      "image": {
        "src": "/assets/images/success/placements/daksh-mali-success-stories.png",
        "alt": "",
        "srcSet": "/assets/images/success/placements/daksh-mali-success-stories-p-500.png 500w, /assets/images/success/placements/daksh-mali-success-stories-p-800.png 800w, /assets/images/success/placements/daksh-mali-success-stories.png 944w",
        "sizes": "100vw"
      },
      "logo": {
        "src": "/assets/images/success/placements/aws.png",
        "alt": "",
        "srcSet": "/assets/images/success/placements/aws-p-500.png 500w, /assets/images/success/placements/aws-p-800.png 800w, /assets/images/success/placements/aws-p-1080.png 1080w, /assets/images/success/placements/aws.png 1200w",
        "sizes": "100vw"
      },
      "logoWidth": "20%"
    },
    {
      "name": "Rushabh Kulkarni",
      "course": "B.Des in Communication Design",
      "batch": null,
      "image": {
        "src": "/assets/images/industry/success/rushabh.png",
        "alt": ""
      },
      "logo": {
        "src": "/assets/images/success/placements/panasoinic.png",
        "alt": ""
      },
      "logoWidth": "30%"
    },
    {
      "name": "Dhavya Mehta",
      "course": "BBA in Finance",
      "batch": null,
      "image": {
        "src": "/assets/images/success/placements/dhavya-mehta.jpg",
        "alt": ""
      },
      "logo": {
        "src": "/assets/images/success/placements/angel_one_logo.png",
        "alt": ""
      },
      "logoWidth": "30%"
    },
    {
      "name": "Nishi Sanjanwala",
      "course": "MBA in Marketing",
      "batch": null,
      "image": {
        "src": "/assets/images/success/placements/nishi-s.jpg",
        "alt": ""
      },
      "logo": {
        "src": "/assets/images/success/placements/third-bridge-logo.png",
        "alt": "",
        "srcSet": "/assets/images/success/placements/third-bridge-logo-p-500.png 500w, /assets/images/success/placements/third-bridge-logo-p-800.png 800w, /assets/images/success/placements/third-bridge-logo.png 1250w",
        "sizes": "100vw"
      },
      "logoWidth": "30%"
    },
    {
      "name": "Ishika Pareek",
      "course": "B.Des in Product Design",
      "batch": null,
      "image": {
        "src": "/assets/images/industry/success/ishika-pareek.png",
        "alt": ""
      },
      "logo": {
        "src": "/assets/images/industry/success/apple-logo.png",
        "alt": ""
      },
      "logoWidth": "30%"
    }
  ]
};

export const students = {
  "heading": "Students at Work",
  "cards": [
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631628.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631629.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631626.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631627.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631625.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631624.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631623.png",
        "alt": ""
      }
    },
    {
      "image": {
        "src": "/assets/images/industry/students/group-1272631622.png",
        "alt": ""
      }
    }
  ]
};

export const testimonials = {
  "heading": "Industry Testimonials",
  "subheading": "Hear from the industry",
  "cards": [
    {
      "text": "I was genuinely impressed by the students’ finesse, strategic thinking, and thorough understanding of user experience and design processes.",
      "name": "Biju Damodharan",
      "company": "Amazon",
      "image": {
        "src": "/assets/images/success/testimonials/atlas-industry-centric-test.png",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    },
    {
      "text": "Visiting ATLAS SkillTech University was truly inspiring. The energy and creativity of the students were incredible.",
      "name": "Navneet Munot",
      "company": "HDFC Mutual Fund",
      "image": {
        "src": "/assets/images/testimonials/industry/navneet-munot.jpg",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    },
    {
      "text": "ATLAS is truly an institution with a futuristic approach. Led by Indu mam, I can very confidently say the students are definitely the future leaders of the nation.",
      "name": "Esha Datta",
      "company": "WPP",
      "image": {
        "src": "/assets/images/testimonials/industry/esha-datta.jpg",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    },
    {
      "text": "ATLAS SkillTech University is an exemplary institution that excels in fostering leadership qualities in its students.",
      "name": "Shefali Khalsa",
      "company": "IndusInd Bank",
      "image": {
        "src": "/assets/images/testimonials/industry/shefali-khalsa.jpg",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    },
    {
      "text": "I’m really impressed by ATLAS SkillTech University’s campus and curriculum. It’s truly futuristic and prepares students exceptionally well for the corporate world.",
      "name": "Ayesha Barse",
      "company": "ITC Hotels",
      "image": {
        "src": "/assets/images/industry/testimonials/ayesha-barse.jpg",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    },
    {
      "text": "The leadership team headed by Dr. Indu Shahani is just outstanding. Innovation blended with industry-experienced teachers is what makes Atlas shine.",
      "name": "Neville Bastawala",
      "company": "Sony Pictures Networks",
      "image": {
        "src": "/assets/images/industry/testimonials/neville-bastawala.jpg",
        "alt": ""
      },
      "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
      "bgImage": "/assets/images/campus/stats/vector-atlas-2.png"
    }
  ]
};

export const faq = {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
    {
      "q": "What are the benefits of industry-oriented education?",
      "a": [
        "Industry-oriented education helps students develop practical skills that employers value. It bridges the gap between classroom learning and workplace expectations, making graduates more confident, capable and job-ready."
      ]
    },
    {
      "q": "How does industry exposure help students get better jobs?",
      "a": [
        "Industry exposure allows students to understand real business challenges, build professional networks and gain hands-on experience. This practical understanding makes them more attractive to recruiters and better prepared for their careers."
      ]
    },
    {
      "q": "What is an industry-integrated curriculum?",
      "a": [
        "An industry-integrated curriculum combines academic learning with real-world applications. It includes case studies, live projects, internships, workshops and industry interactions that help students apply concepts in practical settings."
      ]
    },
    {
      "q": "How can students gain real-world industry experience while studying?",
      "a": [
        "Students can gain real-world experience through internships, live projects, industry collaborations, field visits, workshops and mentorship opportunities. These experiences provide valuable insights into professional environments before graduation."
      ]
    },
    {
      "q": "Why is experiential learning important for career success?",
      "a": [
        "Experiential learning helps students learn by doing. By working on real projects and solving practical problems, they develop critical thinking, adaptability, teamwork and problem-solving skills that are essential for career growth."
      ]
    },
    {
      "q": "How does an industry-centric university prepare students for future careers?",
      "a": [
        "An industry-centric university keeps its curriculum aligned with current market needs. Students learn relevant skills, interact with industry professionals and gain practical experience that prepares them for evolving career opportunities."
      ]
    },
    {
      "q": "Do ATLAS students work on live industry projects?",
      "a": [
        "Yes. ATLAS students regularly work on live industry projects, giving them opportunities to solve real-world challenges, collaborate with professionals and gain practical experience while studying."
      ]
    },
    {
      "q": "What skills do students gain through industry-led learning?",
      "a": [
        "Industry-led learning helps students build technical expertise, communication skills, leadership abilities, problem-solving capabilities, teamwork, critical thinking and professional confidence."
      ]
    },
    {
      "q": "Why should students choose an industry-connected university like ATLAS?",
      "a": [
        "An industry-connected university offers direct exposure to professional environments, practical learning opportunities and valuable industry networks. This helps students graduate with stronger portfolios, relevant experience and improved career prospects."
      ]
    },
    {
      "q": "How does ATLAS SkillTech University help students get industry exposure?",
      "a": [
        "ATLAS provides industry exposure through live projects, internships, industry mentorship, workshops, guest lectures, corporate collaborations and experiential learning opportunities. These experiences help students connect classroom knowledge with real-world applications and career goals."
      ]
    }
  ]
};

export const industryContent = {
  meta,
  hero,
  stats,
  advisors,
  recruiters,
  masterclasses,
  projects,
  visits,
  bootcamp,
  mentorship,
  events,
  leadership,
  futureSkills,
  successStories,
  students,
  testimonials,
  faq,
};
