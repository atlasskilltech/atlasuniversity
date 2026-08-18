/**
 * Content for /life-at-atlas — transcribed 1:1 from `reference/life-at-atlas.php`
 * and `reference/assets/include/faq/atlas/life-at-atlas.php`.
 *
 * 150 assets: 110 downloaded from `cdn.prod.website-files.com` into
 * `public/assets/images/life/<section>/`, 2 copied out of
 * `reference/assets/images/life-at-atlas/`, and 38 that Home / About /
 * Campus had already brought in locally and that are reused in place rather
 * than duplicated — the five "Beyond campus" maps and the whole
 * "Live Where You Learn" block are the same files /campus-atlas uses.
 *
 * ── Two upstream scripts that do nothing, and are therefore not ported ─────
 *  - `.code-button` sets `style.fontSize = getAttribute('data-font-size') + 'px'`
 *    on every `.button-text`. The attribute is empty, so the assignment is the
 *    invalid string "px" and the size never changes.
 *  - The welfare cards carry `data-slider-card-a-bg` and a script that reads it
 *    on `.slider-card-a` — a class none of them has — so that background is
 *    never painted and its image is not downloaded.
 */
export const lifeContent = {
 "meta": {
  "title": "Student Life & Campus Experience  – ATLAS SkillTech University",
  "description": "Explore student clubs, events, campus culture, support services and lifestyle experiences that make campus life engaging, collaborative and growth-oriented."
 },
 "hero": {
  "eyebrow": "Life@ATLAS",
  "title": "Not just extra-curricular, it’s extra-ordinary.",
  "columns": [
   {
    "variant": "vertical-swiper",
    "hideOnMobile": false,
    "slides": [
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-1.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-2.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-3.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-4.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-1.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-2.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-3.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-4.png",
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
       "src": "/assets/images/life/hero/life-isme-5.png",
       "alt": ""
      }
     },
     {
      "auto": true,
      "image": {
       "src": "/assets/images/life/hero/life-isme-6.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-7.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-8.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-5.png",
       "alt": ""
      }
     },
     {
      "auto": true,
      "image": {
       "src": "/assets/images/life/hero/life-isme-6.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-7.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-8.png",
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
       "src": "/assets/images/life/hero/life-isme-9.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-10.png",
       "alt": ""
      }
     },
     {
      "auto": true,
      "image": {
       "src": "/assets/images/life/hero/life-isme-11.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-12.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-9.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-10.png",
       "alt": ""
      }
     },
     {
      "auto": true,
      "image": {
       "src": "/assets/images/life/hero/life-isme-11.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-12.png",
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
       "src": "/assets/images/life/hero/life-isme-13.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-14.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-15.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-16.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-13.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-14.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-15.png",
       "alt": ""
      }
     },
     {
      "auto": false,
      "image": {
       "src": "/assets/images/life/hero/life-isme-16.png",
       "alt": ""
      }
     }
    ]
   }
  ]
 },
 "clubs": {
  "heading": "The 7 wonders of ATLAS",
  "subheading": "Lead. Launch. Belong.",
  "text": "Whether it is entrepreneurship, sports, drama, technology, finance – our student clubs have got you covered! This is where passions are powered and leaders are born.",
  "cards": [
   {
    "image": {
     "src": "/assets/images/life/clubs/futureprenerusatlasss.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/futureprenerusatlasss-p-500.png 500w, /assets/images/life/clubs/futureprenerusatlasss.png 611w"
    },
    "title": "Futurepreneurs",
    "subtitle": "The Startup World",
    "logo": {
     "src": "/assets/images/life/clubs/sm-logo-1.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/finterestttatlass.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/finterestttatlass-p-500.png 500w, /assets/images/life/clubs/finterestttatlass.png 611w"
    },
    "title": "Finterest",
    "subtitle": "Finance & Economics",
    "logo": {
     "src": "/assets/images/life/clubs/group-1272631323.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/incatlass.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/incatlass-p-500.png 500w, /assets/images/life/clubs/incatlass.png 611w"
    },
    "title": "INC",
    "subtitle": "The Corporate Club",
    "logo": {
     "src": "/assets/images/life/clubs/inclogo.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/m-f.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/m-f-p-500.png 500w, /assets/images/life/clubs/m-f.png 611w"
    },
    "title": "Stage",
    "subtitle": "Society for Talent Generation\n& Entertainment",
    "logo": {
     "src": "/assets/images/life/clubs/group-1272631443.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/m-f-2.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/m-f-2-p-500.png 500w, /assets/images/life/clubs/m-f-2.png 611w"
    },
    "title": "Student Council",
    "subtitle": "Student Representatives",
    "logo": {
     "src": "/assets/images/life/clubs/student-council1.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/m-f-4.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/m-f-4-p-500.png 500w, /assets/images/life/clubs/m-f-4.png 611w"
    },
    "title": "Highflyers",
    "subtitle": "The International Students Council",
    "logo": {
     "src": "/assets/images/life/clubs/image-975.png",
     "alt": ""
    }
   },
   {
    "image": {
     "src": "/assets/images/life/clubs/m-f.png",
     "alt": "",
     "srcSet": "/assets/images/life/clubs/m-f-p-500.png 500w, /assets/images/life/clubs/m-f.png 611w"
    },
    "title": "Bookmarked",
    "subtitle": "The Book Club",
    "logo": {
     "src": "/assets/images/life/clubs/finterest.png",
     "alt": ""
    }
   }
  ]
 },
 "fest": {
  "heading": "Vibes that go viral",
  "text": "From Holi colors to TEDx talks, at ATLAS ISME, ideas don’t stay in notebooks. They turn into festivals, fests, mixers, and movements.",
  "cards": [
   {
    "image": {
     "src": "/assets/images/life/fest/openmicsatlas.png",
     "alt": ""
    },
    "title": "Open Mics",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/illeniumatlas.png",
     "alt": ""
    },
    "title": "Illenium 2025",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/onamatlas.png",
     "alt": ""
    },
    "title": "Festivals",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/cxopanelsatlas.png",
     "alt": ""
    },
    "title": "CXO Panels",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/3b3a0845-5.png",
     "alt": ""
    },
    "title": "Mumbai Hackathon",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/3b3a0845-6.png",
     "alt": ""
    },
    "title": "ABCD",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/3b3a0845-8.png",
     "alt": ""
    },
    "title": "Sensorium",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/dancee.png",
     "alt": ""
    },
    "title": "Dance Workshop",
    "subtitle": ""
   },
   {
    "image": {
     "src": "/assets/images/life/fest/3b3a0845-4.png",
     "alt": ""
    },
    "title": "Hands of Heritage",
    "subtitle": "The New age fashion experience"
   },
   {
    "image": {
     "src": "/assets/images/life/fest/3b3a0845-7.png",
     "alt": ""
    },
    "title": "Inferno",
    "subtitle": "The New age fashion experience"
   }
  ]
 },
 "events": {
  "heading": "Intercollegiate events",
  "subheading": "ATLAS students shine beyond the classroom — winning top honours across intercollegiate competitions and proving that talent, grit, and ambition always travel well.",
  "cards": [
   {
    "image": {
     "src": "/assets/images/life/events/iid-1.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/iid-1-p-500.png 500w, /assets/images/life/events/iid-1.png 800w"
    },
    "title": "Eventure",
    "subtitle": "Cultural Fest"
   },
   {
    "image": {
     "src": "/assets/images/life/events/iid-2.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/iid-2-p-500.png 500w, /assets/images/life/events/iid-2.png 800w"
    },
    "title": "Funbaazi",
    "subtitle": "Cultural Fest, Imagica"
   },
   {
    "image": {
     "src": "/assets/images/life/events/iid-3.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/iid-3-p-500.png 500w, /assets/images/life/events/iid-3.png 800w"
    },
    "title": "Zion",
    "subtitle": "Intercollegiate Fest, NMIMS"
   },
   {
    "image": {
     "src": "/assets/images/life/events/pre-placement-ibm.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/pre-placement-ibm-p-500.png 500w, /assets/images/life/events/pre-placement-ibm.png 800w"
    },
    "title": "Kaleidoscope",
    "subtitle": "Intercollegiate Fest, Sophia College"
   },
   {
    "image": {
     "src": "/assets/images/life/events/pre-placement-ibm-1-.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/pre-placement-ibm-1-p-500.png 500w, /assets/images/life/events/pre-placement-ibm-1-.png 800w"
    },
    "title": "Zephyrus",
    "subtitle": "Finance Fest, Xavier’s College"
   },
   {
    "image": {
     "src": "/assets/images/life/events/iid-5.png",
     "alt": "",
     "srcSet": "/assets/images/life/events/iid-5-p-500.png 500w, /assets/images/life/events/iid-5.png 800w"
    },
    "title": "Mystique",
    "subtitle": "Intercollegiate Fest, HR College"
   }
  ]
 },
 "sports": {
  "heading": "Win on and off the field",
  "text": "Whether you're running for gold or just blowing off steam, there’s always space to move at ATLAS.",
  "items": [
   {
    "title": "Football Turf",
    "place": "Building 1",
    "image": {
     "src": "/assets/images/life/sports/footballturfatlass.png",
     "alt": ""
    }
   },
   {
    "title": "Cricket Turf",
    "place": "Building 1",
    "image": {
     "src": "/assets/images/life/sports/cricket.png",
     "alt": ""
    }
   },
   {
    "title": "Billiards Arena",
    "place": "Building 1 & 2",
    "image": {
     "src": "/assets/images/life/sports/billioardsatlas.png",
     "alt": ""
    }
   },
   {
    "title": "Pickleball Court",
    "place": "Building 1 & 2",
    "image": {
     "src": "/assets/images/life/sports/pickle.png",
     "alt": ""
    }
   }
  ]
 },
 "council": {
  "heading": "Student Council",
  "text": "We are committed to fostering a campus culture where every student feels respected, valued, and truly heard. With learners from across the country, ATLAS thrives on diversity — not just acknowledging it, but actively celebrating it. Through thoughtfully designed programs, cultural initiatives, and community experiences, we build awareness, empathy, and a deep sense of belonging across campus.",
  "image": {
   "src": "/assets/images/life/council/atlasscouncil.png",
   "alt": "",
   "srcSet": "/assets/images/life/council/atlasscouncil-p-500.png 500w, /assets/images/life/council/atlasscouncil-p-800.png 800w, /assets/images/life/council/atlasscouncil-p-1080.png 1080w, /assets/images/life/council/atlasscouncil.png 1238w"
  }
 },
 "councilMembers": {
  "heading": "The council members",
  "subheading": "Say hello to the team that brings ideas to life and voices to the table",
  "action": {
   "label": "View All",
   "href": "/schools/isme/student-council-leadership-and-activities"
  },
  "people": [
   {
    "image": {
     "src": "/assets/images/life/council-members/zia-fatema-presi.png",
     "alt": ""
    },
    "name": "Zia Fatema",
    "role": "President"
   },
   {
    "image": {
     "src": "/assets/images/life/council-members/raghavendra-pamola-president.png",
     "alt": ""
    },
    "name": "Raghavendra Ramola",
    "role": "President"
   },
   {
    "image": {
     "src": "/assets/images/life/council-members/screenshot-2025-07-21-at-12.03.43-pm.png",
     "alt": ""
    },
    "name": "Ovi Patil",
    "role": "Vice-President"
   },
   {
    "image": {
     "src": "/assets/images/life/council-members/screenshot-2025-07-21-at-12.04.06-pm.png",
     "alt": ""
    },
    "name": "Jiya Singh",
    "role": "Vice-President"
   },
   {
    "image": {
     "src": "/assets/images/life/council-members/screenshot-2025-07-21-at-12.03.31-pm.png",
     "alt": ""
    },
    "name": "Prisha Tiwari",
    "role": "General Secretary"
   }
  ]
 },
 "support": {
  "heading": "Your Support System, Away from Home",
  "subheading": "Whether you’re new to Mumbai or call it home, we’re here to guide, care, and listen",
  "people": [
   {
    "image": {
     "src": "/assets/images/life/support/bhargaviatlas.png",
     "alt": ""
    },
    "name": "Bhargavi Deshpande",
    "role": "Senior Director - Student Experience"
   },
   {
    "image": {
     "src": "/assets/images/life/support/sheetalatlas.png",
     "alt": ""
    },
    "name": "Sheetal Dogra",
    "role": "Senior Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/life/support/priyatmaatlas.png",
     "alt": ""
    },
    "name": "Priyatama Gharat",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/life/support/ektaatlas.png",
     "alt": ""
    },
    "name": "Ekta Moorpana",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/life/support/ashaatlas.png",
     "alt": ""
    },
    "name": "Asha Ajgaonkar",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/life/support/monikaatlas.png",
     "alt": ""
    },
    "name": "Monika Lunia",
    "role": "Student Advisor"
   }
  ]
 },
 "councilEvents": {
  "heading": "Events organized by the Student Council",
  "subheading": "A snapshot of council-run events that spark connection, creativity, and change",
  "cards": [
   {
    "image": {
     "src": "/assets/images/life/council-events/beachcleanupatlas.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "Cultural ",
     "Nights"
    ],
    "lead": null,
    "text": "Celebrate global traditions and vibrant creativity as students showcase music, dance, cuisine, and customs from across \nthe world."
   },
   {
    "image": {
     "src": "/assets/images/life/council-events/genderatlas.png",
     "alt": ""
    },
    "variant": "atlas-bg-2",
    "title": [
     "Gender & Diversity Conversations"
    ],
    "lead": null,
    "text": "Engage in thought-provoking dialogues on gender equity, identity, and inclusion. These sessions encourage critical thinking."
   },
   {
    "image": {
     "src": "/assets/images/life/council-events/atlasss.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "Language Exchange Programs"
    ],
    "lead": null,
    "text": "Break linguistic barriers and expand cultural horizons through peer-led language exchanges. Students are only enhancing their communication skills."
   }
  ]
 },
 "mumbai": {
  "heading": "Beyond campus, within reach",
  "subheading": "Step outside campus and the city unfolds — cafés, co-working spots, cinemas, museums. ATLAS is stitched into the cultural, creative, and corporate pulse of Mumbai.",
  "tabs": [
   {
    "label": "All Locations",
    "image": {
     "src": "/assets/images/campus/learn/map.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/map-p-500.png 500w, /assets/images/campus/learn/map-p-800.png 800w, /assets/images/campus/learn/map-p-1080.png 1080w, /assets/images/campus/learn/map.png 1242w"
    }
   },
   {
    "label": "Tech Companies",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631379.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631379-p-500.png 500w, /assets/images/campus/learn/group-1272631379-p-800.png 800w, /assets/images/campus/learn/group-1272631379-p-1080.png 1080w, /assets/images/campus/learn/group-1272631379.png 1242w"
    }
   },
   {
    "label": "Design Studios",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631380.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631380-p-500.png 500w, /assets/images/campus/learn/group-1272631380-p-800.png 800w, /assets/images/campus/learn/group-1272631380-p-1080.png 1080w, /assets/images/campus/learn/group-1272631380.png 1242w"
    }
   },
   {
    "label": "Legal Firms",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631381.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631381-p-500.png 500w, /assets/images/campus/learn/group-1272631381-p-800.png 800w, /assets/images/campus/learn/group-1272631381-p-1080.png 1080w, /assets/images/campus/learn/group-1272631381.png 1242w"
    }
   },
   {
    "label": "Business & Management",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631382.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631382-p-500.png 500w, /assets/images/campus/learn/group-1272631382-p-800.png 800w, /assets/images/campus/learn/group-1272631382-p-1080.png 1080w, /assets/images/campus/learn/group-1272631382.png 1242w"
    }
   }
  ]
 },
 "welfare": {
  "heading": "Your Growth is Our Mission",
  "text": "Whether you’re navigating academic pressure, exploring career options, or planning for grad school — we’ve got your back. From strategic mentorship and professional counselling to hands-on industry exposure starting in Year 1, the support at ATLAS is built to grow with you. You’ll find guidance for internships, career planning, and even master’s progression — all designed to keep you moving forward with clarity and confidence.",
  "cards": [
   {
    "title": "Strategic Academic Mentorship",
    "text": "Receive one-on-one support to stay on track with coursework, manage academic pressure, and build effective study habits.",
    "image": {
     "src": "/assets/images/life/welfare/strategicatlas.png",
     "alt": "",
     "srcSet": "/assets/images/life/welfare/strategicatlas-p-500.png 500w, /assets/images/life/welfare/strategicatlas-p-800.png 800w, /assets/images/life/welfare/strategicatlas.png 802w"
    }
   },
   {
    "title": "Learning Support",
    "text": "Personalized academic assistance to help you master challenging subjects, develop effective study strategies, and build confidence in your learning journey — ensuring no student is left behind.",
    "image": {
     "src": "/assets/images/life/welfare/careeratlasss.png",
     "alt": "",
     "srcSet": "/assets/images/life/welfare/careeratlasss-p-500.png 500w, /assets/images/life/welfare/careeratlasss-p-800.png 800w, /assets/images/life/welfare/careeratlasss.png 803w"
    }
   },
   {
    "title": "Master’s Progression",
    "text": "Guidance and resources to help you plan your path to postgraduate studies — from selecting the right programs and preparing strong applications to connecting with global universities and alumni.",
    "image": {
     "src": "/assets/images/life/welfare/mastersprogressionatlasss.png",
     "alt": "",
     "srcSet": "/assets/images/life/welfare/mastersprogressionatlasss-p-500.png 500w, /assets/images/life/welfare/mastersprogressionatlasss-p-800.png 800w, /assets/images/life/welfare/mastersprogressionatlasss.png 803w"
    }
   }
  ]
 },
 "wellness": {
  "heading": "Wellness is success",
  "subheading": "You can’t grow if you’re running on empty. That’s why ISME puts your mental, emotional, and physical well-being front and center",
  "tabs": [
   {
    "label": "Tailored Support",
    "image": {
     "src": "/assets/images/life/wellness/stud-welf-img-1.webp",
     "alt": "",
     "srcSet": "/assets/images/life/wellness/stud-welf-img-1-p-500.webp 500w, /assets/images/life/wellness/stud-welf-img-1-p-800.webp 800w, /assets/images/life/wellness/stud-welf-img-1-p-1080.webp 1080w, /assets/images/life/wellness/stud-welf-img-1.webp 1238w"
    },
    "wide": false,
    "title": "Safe and Confidential Space",
    "text": "Sometimes you just need a moment to breathe. Our Wellness Rooms are calm, confidential, and non-judgmental spaces where students can relax, reflect, or speak to a counsellor in private. These dedicated rooms are designed to provide a sense of comfort and security—because every student deserves a safe space to just be."
   },
   {
    "label": "Wellness Room",
    "image": {
     "src": "/assets/images/life/wellness/wellness-room.jpg",
     "alt": ""
    },
    "wide": false,
    "title": "Guidance When You Need It Most",
    "text": "Get confidential support from trained counsellors to navigate academic pressures, personal challenges, and career decisions. \nHere, you’ll find a listening ear and practical strategies to move forward with confidence."
   },
   {
    "label": "Professional Counselling",
    "image": {
     "src": "/assets/images/life/wellness/group-1272630973.png",
     "alt": "",
     "srcSet": "/assets/images/life/wellness/group-1272630973-p-500.png 500w, /assets/images/life/wellness/group-1272630973-p-800.png 800w, /assets/images/life/wellness/group-1272630973-p-1080.png 1080w, /assets/images/life/wellness/group-1272630973.png 1238w"
    },
    "wide": true,
    "title": "Your Space to Pause & Recharge",
    "text": "Step into a calming environment designed for reflection, meditation, or simply taking a breath. Our wellness rooms give you a \nquiet escape to reset your mind and return refreshed."
   }
  ]
 },
 "yourdost": {
  "heading": "YourDOST - For your wellness",
  "text": "At ATLAS, your emotional and mental wellbeing matter as much as your academic growth. To support this, we’ve partnered with YourDOST—a confidential platform that gives you access to professional counsellors anytime, anywhere. Whether you’re facing stress, anxiety, academic pressure, or simply need someone to talk to, YourDOST offers a safe and private space to help you through it.",
  "image": {
   "src": "/assets/images/life/yourdost/wellness.jpg",
   "alt": ""
  },
  "steps": [
   {
    "no": "01",
    "title": "Download the \nYourDOST app",
    "text": "Just scan the QR code sent to your college email to download"
   },
   {
    "no": "02",
    "title": "Sign up using \nyour college email ID",
    "text": "Use your ATLAS email ID to create your account and Voila!"
   },
   {
    "no": "03",
    "title": "Book a session with a qualified counsellor",
    "text": "Choose an expert and schedule your session instantly, free of cost."
   }
  ]
 },
 "community": {
  "heading": "Service learning and SSR",
  "subheading": "At ATLAS, community service isn’t just a checkbox — it’s a mindset. Our students actively engage with the world around them, tackling real problems with empathy, energy, and purpose. These experiences go beyond volunteer hours; they shape character, leadership, and a lifelong sense of responsibility.",
  "cards": [
   {
    "image": {
     "src": "/assets/images/life/community/flowofcareatlas.png",
     "alt": ""
    },
    "title": "Flow of Care",
    "subtitle": "Menstrual Health Awareness"
   },
   {
    "image": {
     "src": "/assets/images/life/community/ourstationatlas.png",
     "alt": ""
    },
    "title": "Hamara Station \nHamari Shaan",
    "subtitle": "Station Redecoration Drive"
   },
   {
    "image": {
     "src": "/assets/images/life/community/pawseforacauseatlas.png",
     "alt": ""
    },
    "title": "Paws for a Cause",
    "subtitle": "Volunteer Drive for stray dog care."
   },
   {
    "image": {
     "src": "/assets/images/life/community/mahaatlas.png",
     "alt": ""
    },
    "title": "Maha-Collab",
    "subtitle": "Student-led \nsustainability showcase"
   },
   {
    "image": {
     "src": "/assets/images/life/community/sportsatlas.png",
     "alt": ""
    },
    "title": "Beach Clean-Up",
    "subtitle": "Clean-up Drive at Carter"
   },
   {
    "image": {
     "src": "/assets/images/life/community/group-1272631423-copy-2.png",
     "alt": ""
    },
    "title": "Community Fridge",
    "subtitle": "We aim to stop people from throwing away food."
   },
   {
    "image": {
     "src": "/assets/images/life/community/card-1-copy.png",
     "alt": ""
    },
    "title": "Flow of Care",
    "subtitle": "Menstrual Health Awareness"
   },
   {
    "image": {
     "src": "/assets/images/life/community/ourstationatlas.png",
     "alt": ""
    },
    "title": "Hamara Station \nHamari Shaan",
    "subtitle": "Station Redecoration Drive"
   },
   {
    "image": {
     "src": "/assets/images/life/community/pawseforacauseatlas.png",
     "alt": ""
    },
    "title": "Paws for a Cause",
    "subtitle": "Volunteer Drive for stray dog care."
   },
   {
    "image": {
     "src": "/assets/images/life/community/mahaatlas.png",
     "alt": ""
    },
    "title": "Maha-Collab",
    "subtitle": "Student-led \nsustainability showcase"
   },
   {
    "image": {
     "src": "/assets/images/life/community/group-1272631423-copy-2.png",
     "alt": ""
    },
    "title": "Community Fridge",
    "subtitle": "We aim to stop people from throwing away food."
   }
  ]
 },
 "housing": {
  "heading": "Live Where You Learn",
  "subheading": "UpGrad Living offers comfort and convenience in Mumbai. Stay just steps away from your classes — in modern, secure student residences that feel like home.",
  "embed": "https://www.youtube.com/embed/SZ3t1snaf_w?rel=0&controls=0&autoplay=1&mute=1&start=0",
  "cards": [
   {
    "image": {
     "src": "/assets/images/campus/housing/integratedcampusimg.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "Integrated Campus"
    ],
    "lead": "Where living and learning seamlessly connect.",
    "text": "Your hostel is more than accommodation; it’s part of your academic journey. It promotes personal growth and professional readiness."
   },
   {
    "image": {
     "src": "/assets/images/campus/housing/safety-securityimage.png",
     "alt": ""
    },
    "variant": "atlas-bg-2",
    "title": [
     "Safety & Security"
    ],
    "lead": "Feel at home, \nstay protected—always.",
    "text": "Your safety is our priority. With 24x7 security, CCTV, biometric access, and dedicated managers, we ensure a secure environment."
   },
   {
    "image": {
     "src": "/assets/images/campus/housing/toptierameniotiesimage.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "Top-Tier Amenities"
    ],
    "lead": "Designed for comfort, built for student life.",
    "text": "Enjoy furnished, air-conditioned rooms, high-speed Wi-Fi, and study lounges. Well-equipped gyms, gaming zones, etc."
   }
  ],
  "mosaic": [
   {
    "label": "AC Rooms with WiFi",
    "size": "sm",
    "image": "/assets/images/campus/housing/highlight-1.jpg"
   },
   {
    "label": "24/7 security\nwith biometric access",
    "size": "sm",
    "image": "/assets/images/campus/housing/security-with-biometric-access.png"
   },
   {
    "label": "Healthy meals, four times a day",
    "size": "tall",
    "image": "/assets/images/campus/housing/hight-simg-3.jpg",
    "bgSize": "auto"
   },
   {
    "label": "Lounges and gaming zones",
    "size": "wide",
    "image": "/assets/images/campus/housing/hight-simg-4.jpg"
   },
   {
    "label": "Gym and wellness",
    "size": "tall",
    "image": "/assets/images/campus/housing/hight-simg-5.jpg"
   },
   {
    "label": "Study zones",
    "size": "wide",
    "image": "/assets/images/campus/housing/hight-simg-6.jpg"
   },
   {
    "label": "Coffee shop",
    "size": "sm",
    "image": "/assets/images/campus/housing/coffee-shop.png"
   },
   {
    "label": "Housekeeping",
    "size": "sm",
    "image": "/assets/images/campus/housing/housekeeping.png"
   }
  ]
 },
 "favourites": {
  "heading": "Student favourites",
  "subheading": "Go-to spots to unwind, connect, and recharge",
  "items": [
   {
    "title": "Pizza Hut",
    "place": "Building 1",
    "image": {
     "src": "/assets/images/campus/food/pizza-hut.png",
     "alt": ""
    }
   },
   {
    "title": "Dripface Coffee",
    "place": "Building 2",
    "image": {
     "src": "/assets/images/campus/food/dripface-coffee.png",
     "alt": ""
    }
   },
   {
    "title": "Dumpling Delights",
    "place": "Building 1",
    "image": {
     "src": "/assets/images/campus/food/dumpling-delights.png",
     "alt": ""
    }
   },
   {
    "title": "Yummy Waffle",
    "place": "Building 1 & 2",
    "image": {
     "src": "/assets/images/campus/food/yummy-waffle.png",
     "alt": ""
    }
   },
   {
    "title": "Amphitheatre",
    "place": "Building 1",
    "image": {
     "src": "/assets/images/campus/hangout/amphiteatreatlasss.png",
     "alt": ""
    }
   }
  ]
 },
 "moto": {
  "heading": "Embracing every identity",
  "subheading": "At ATLAS, every student is seen, heard, and empowered. With a student community from across the country, ATLAS thrives on diversity — not just accepting it, but actively celebrating it. Through purposefully designed programs, cultural experiences, and community-driven initiatives, we foster awareness, empathy, and a strong sense of belonging that’s felt in every corner of campus.",
  "image": {
   "src": "/assets/images/life/moto/identityatlasssss.png",
   "alt": "",
   "srcSet": "/assets/images/life/moto/identityatlasssss-p-500.png 500w, /assets/images/life/moto/identityatlasssss-p-800.png 800w, /assets/images/life/moto/identityatlasssss-p-1080.png 1080w, /assets/images/life/moto/identityatlasssss.png 1238w"
  }
 },
 "banner": {
  "heading": "Ready to live the ATLAS life?",
  "subheading": "This isn’t just where you study — it’s where \nyou build your world.",
  "buttons": [
   {
    "variant": "atlas",
    "href": "/applicationform",
    "label": "Apply Now"
   },
   {
    "variant": "outline",
    "href": "/campus-atlas",
    "label": "Explore Campus Life"
   },
   {
    "variant": "outline",
    "href": "/campusvisit",
    "label": "Schedule a Visit"
   }
  ],
  "image": {
   "src": "/assets/images/life/banner/02-flower.png",
   "alt": ""
  }
 },
 "faq": {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
   {
    "q": "Is ATLAS University good?",
    "a": [
     "Yes, ATLAS University is known for its experiential learning approach and strong industry integration. It offers a modern campus experience focused on practical skills, global exposure and career readiness."
    ]
   },
   {
    "q": "What is life like at university?",
    "a": [
     "University life is a mix of learning, exploration and independence. Students balance academics with projects, clubs, collaborations and experiences that help shape both personal and professional growth."
    ]
   },
   {
    "q": "What is ATLAS SkillTech University famous for?",
    "a": [
     "ATLAS SkillTech University is known for its multidisciplinary, industry-integrated approach to education. Through experiential learning, innovation, entrepreneurship and global exposure, students gain practical skills and real-world experience that prepare them for future careers."
    ]
   },
   {
    "q": "What is student life at a college?",
    "a": [
     "Student life at college goes beyond classrooms. It includes friendships, activities, events and opportunities to explore interests while building confidence and real-world skills."
    ]
   },
   {
    "q": "What extracurricular activities are available at ATLAS University?",
    "a": [
     "ATLAS University offers a vibrant student life through clubs, student-led communities, cultural events, leadership opportunities, competitions and campus activities. These experiences help students develop teamwork, leadership, creativity and communication skills alongside their academic learning."
    ]
   },
   {
    "q": "Does ATLAS University offer international exposure?",
    "a": [
     "Yes, ATLAS University emphasises global exposure through international collaborations, industry interactions and opportunities that help students develop a broader perspective and cross-cultural understanding."
    ]
   },
   {
    "q": "What are the sports facilities at ATLAS University?",
    "a": [
     "ATLAS University encourages a balanced student experience through recreational, fitness and sporting activities that contribute to student wellbeing, teamwork and personal development. For the latest information on available sports facilities, students should refer to the university directly."
    ]
   },
   {
    "q": "How does ATLAS University support student entrepreneurship?",
    "a": [
     "ATLAS University encourages entrepreneurship through mentorship, industry engagement, innovation-focused learning and opportunities for students to develop and refine business ideas. Students benefit from exposure to entrepreneurial thinking, networking opportunities and practical business experiences."
    ]
   }
  ]
 }
};
