/**
 * Content for /campus-atlas — transcribed 1:1 from `reference/campus-atlas.php`
 * and `reference/assets/include/faq/atlas/campus-atlas.php`.
 *
 * Every image the page paints came from `cdn.prod.website-files.com` — none of
 * them exists under `reference/assets` — so all 90 were downloaded into
 * `public/assets/images/campus/`; the two `green-campus` videos are the
 * reference's own files, copied byte-for-byte into
 * `public/assets/videos/campus/`. The Webflow `-p-500 / -p-800 / -p-1080`
 * responsive variants are kept so every `srcSet` matches the reference's.
 *
 * Thirteen of the images are painted by the stylesheet rather than by markup
 * (`.head-top-card.atlas-bg-*`, `.css-content-wrapper.atlas-bg-*` and the eight
 * housing-mosaic cells); those are carried here as data and applied as inline
 * `background-image`, because the URLs are per-item and Tailwind cannot emit a
 * background-image utility it never sees as a literal.
 *
 * ── Two upstream values that are not reproduced verbatim ──────────────────
 *  - `banner.buttons[1]` is `href="#"` upstream and opens a NoPaperForms
 *    widget (`widgets.in5.nopaperforms.com/emwgts.js`) in a modal. Embedding a
 *    third-party lead-capture script is out of scope for this rebuild, so the
 *    button points at `/campusvisit` — the same route the hero's
 *    "Schedule a Visit" already links to.
 *  - `.cd-cont-b-wrap` carries an inline script that sets
 *    `background-image: url(<data-card-cint-b-bg>)`. That attribute does not
 *    exist on any card, so the reference paints `url(null)` — invalid, so the
 *    flat `card-cnt-bgcolor` (#41418E) is what actually shows. The flat colour
 *    is what is carried here.
 */
export const campusContent = {
 "hero": {
  "title": [
   "A Campus Designed for",
   "the Future"
  ],
  "button": {
   "label": "Schedule a Visit",
   "href": "/campusvisit"
  },
  "image": {
   "src": "/assets/images/campus/hero/atlas-campus-hero-image.png",
   "alt": "",
   "srcSet": "/assets/images/campus/hero/atlas-campus-hero-image-p-500.png 500w, /assets/images/campus/hero/atlas-campus-hero-image-p-800.png 800w, /assets/images/campus/hero/atlas-campus-hero-image-p-1080.png 1080w, /assets/images/campus/hero/atlas-campus-hero-image.png 1366w"
  }
 },
 "stats": [
  {
   "label": "Campus-area",
   "value": "12,000 sq. mts",
   "background": "#41418e",
   "image": "/assets/images/campus/stats/vector-atlas-1.png",
   "imagePosition": "100%"
  },
  {
   "label": "Research and Innovation Labs",
   "value": "30+ studios",
   "background": "#2e3074",
   "image": "/assets/images/campus/stats/vector-atlas-2.png",
   "imagePosition": "100%"
  },
  {
   "label": "Surrounded by",
   "value": "500+ top companies",
   "background": "#3a3c84",
   "image": "/assets/images/campus/stats/vector-atlas-3.png",
   "imagePosition": "100% 0"
  }
 ],
 "learn": {
  "heading": "Study in the Middle of Mumbai’s Momentum",
  "subheading": "Strategically located off BKC, ATLAS places you in the middle of Mumbai’s corporate, creative, and cultural energy.",
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
 "overview": {
  "heading": "A campus built to learn, live & thrive",
  "columns": [
   [
    {
     "image": {
      "src": "/assets/images/campus/overview/fashionlabatlas.png",
      "alt": ""
     },
     "label": "Fashion Lab"
    },
    {
     "image": {
      "src": "/assets/images/campus/overview/3113.png",
      "alt": ""
     },
     "label": "Maker Spaces"
    }
   ],
   [
    {
     "image": {
      "src": "/assets/images/campus/overview/roboticslab.png",
      "alt": ""
     },
     "label": "Robotics Lab"
    },
    {
     "image": {
      "src": "/assets/images/campus/overview/digitallabs.png",
      "alt": ""
     },
     "label": "Digital Labs"
    }
   ],
   [
    {
     "image": {
      "src": "/assets/images/campus/overview/3dprintinglabs.png",
      "alt": ""
     },
     "label": "3D Printing Labs"
    },
    {
     "image": {
      "src": "/assets/images/campus/overview/3112.png",
      "alt": ""
     },
     "label": "Design Studio"
    }
   ]
  ]
 },
 "spaces": {
  "heading": "Purpose-Built for Holistic Learning",
  "subheading": "Our campus brings together specialized facilities for each field of study, empowering students with hands-on experience and real-world application.",
  "cards": [
   {
    "variant": "default",
    "title": "Design Labs & Studios",
    "text": "Equipped with advanced fashion, product, and digital design studios, ISDI provides an environment where creativity meets real-world practice. Students work with industry-grade tools and materials to prototype ideas, develop collections, and build portfolios that reflect both design thinking and technical skill. These collaborative spaces encourage innovation and hands-on learning from day one",
    "background": "#41418E",
    "embed": "https://www.youtube.com/embed/fwMuPaNVHfw?autoplay=1&mute=1&loop=1&playlist=fwMuPaNVHfw&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
   },
   {
    "variant": "switch",
    "title": "Entrepreneurship and Innovation Labs",
    "text": "ATLAS’s dedicated startup incubators and research labs are designed to help students turn classroom learning into practical business ventures. With spaces for ideation, mentoring, and MVP showcases, students receive hands-on exposure to entrepreneurship and industry collaboration. Every lab is built to foster creativity, teamwork, and leadership preparing future managers to become innovators and founders.",
    "background": "#41418E",
    "embed": "https://www.youtube.com/embed/pQuRHrj7ESw?autoplay=1&mute=1&loop=1&playlist=pQuRHrj7ESw&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
   },
   {
    "variant": "default",
    "title": "AI, Data, and Coding Labs",
    "text": "At uGDX, cutting-edge technology facilities give students the space to experiment, code, and build. AI and Data Labs, coding pods, and digital simulation environments are designed for real-time problem solving and project-based learning. These labs mirror professional tech setups — helping students gain experience in software development, analytics, and emerging digital systems before entering the industry.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/spaces/aiatlas.png",
     "alt": "",
     "srcSet": "/assets/images/campus/spaces/aiatlas-p-500.png 500w, /assets/images/campus/spaces/aiatlas-p-800.png 800w, /assets/images/campus/spaces/aiatlas.png 929w"
    }
   },
   {
    "variant": "switch",
    "title": "Moot Court and Legal Simulation Rooms",
    "text": "Purpose-built for practical learning, the School of Law’s Moot Courts and Legal Simulation Rooms immerse students in real courtroom settings. Here, they research cases, present arguments, and experience the dynamics of legal proceedings under faculty and professional guidance. These facilities bridge theory with practice — preparing students to think, reason, and advocate effectively in the world of law.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/spaces/mootcourtatlas.png",
     "alt": "",
     "srcSet": "/assets/images/campus/spaces/mootcourtatlas-p-500.png 500w, /assets/images/campus/spaces/mootcourtatlas.png 619w"
    }
   }
  ]
 },
 "library": {
  "heading": "Fueling learning with the right resources",
  "subheading": "Comprehensive access to physical and digital resources",
  "cards": [
   {
    "variant": "default",
    "title": "Reference Resources and Indian Knowledge Systems",
    "text": "The Reference Section offers quick access to essential knowledge through a wide range of dictionaries, encyclopedias, and handbooks across disciplines. In addition, our dedicated collection on Indian Knowledge Systems (IKS) showcases India’s rich intellectual traditions—spanning classical sciences, arts, culture, and philosophy—celebrating the depth and diversity of our heritage.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/library/fuelingggg.png",
     "alt": "",
     "srcSet": "/assets/images/campus/library/fuelingggg-p-500.png 500w, /assets/images/campus/library/fuelingggg.png 619w"
    }
   },
   {
    "variant": "switch",
    "title": "Design education crafted with parsons expertise",
    "text": "The library houses a curated collection of student theses and dissertations—serving as a valuable resource for both students and faculty. These works offer insights into past research, methodologies, and emerging ideas, acting as strong reference points for developing new academic projects and scholarly papers.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/library/fueling222.png",
     "alt": "",
     "srcSet": "/assets/images/campus/library/fueling222-p-500.png 500w, /assets/images/campus/library/fueling222.png 619w"
    }
   },
   {
    "variant": "default",
    "title": "Visual, Audio & Interactive Resources",
    "text": "The library’s multimedia collection includes CDs and DVDs that complement academic texts, along with a wide range of films and music. Designed to support diverse learning styles and offer recreational value, these resources enrich both classroom learning and campus life.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/library/fuelingggg3.png",
     "alt": "",
     "srcSet": "/assets/images/campus/library/fuelingggg3-p-500.png 500w, /assets/images/campus/library/fuelingggg3.png 619w"
    }
   }
  ]
 },
 "green": {
  "heading": "Live where you learn. Grow where you stay.",
  "subheading": "ATLAS isn’t just future-facing in tech and business — it’s future-conscious in infrastructure too. Our green campus uses smart systems to reduce waste and emissions daily.",
  "cards": [
   {
    "variant": "default",
    "title": "Solar Power Plant",
    "text": "ATLAS is deeply committed to sustainability, championing the use of renewable energy to power our campus responsibly. Our on-campus solar power plant harnesses the sun’s energy to generate clean, green electricity, significantly reducing our dependence on conventional power sources and lowering our carbon footprint.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/green/solar.png",
     "alt": "",
     "srcSet": "/assets/images/campus/green/solar-p-500.png 500w, /assets/images/campus/green/solar.png 619w"
    }
   },
   {
    "variant": "switch",
    "title": "Energy Saving LED bulbs",
    "text": "To promote energy efficiency, we have adopted LED bulbs and power-efficient equipment across campus. These energy-saving technologies help reduce electricity consumption, lower carbon emissions, and contribute to a more sustainable campus environment.",
    "background": "#41418E",
    "embed": "https://www.youtube.com/embed/Eo1KTb60EGA?autoplay=1&mute=1&loop=1&playlist=Eo1KTb60EGA&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
   },
   {
    "variant": "default",
    "title": "Sensor Based Energy Conservation",
    "text": "We are leveraging sensor-based technologies to optimize energy usage across campus, promoting sustainability and reducing energy waste. These smart solutions contribute to our commitment to sustainability by conserving resources while maintaining comfort and functionality on campus.",
    "background": "#41418E",
    "image": {
     "src": "/assets/images/campus/green/green-camp-3.webp",
     "alt": "",
     "srcSet": "/assets/images/campus/green/green-camp-3-p-500.webp 500w, /assets/images/campus/green/green-camp-3.webp 619w"
    }
   },
   {
    "variant": "switch",
    "title": "Green Campus",
    "text": "To promote energy efficiency, we have adopted LED bulbs and power-efficient equipment across campus. These energy-saving technologies help reduce electricity consumption, lower carbon emissions, and contribute to a more sustainable campus environment.",
    "background": "#41418E",
    "video": [
     "/assets/videos/campus/green-campus.mp4",
     "/assets/videos/campus/green-campus.webm"
    ]
   }
  ]
 },
 "incubators": {
  "heading": "Startup Incubators",
  "cards": [
   {
    "image": {
     "src": "/assets/images/campus/incubators/multiidsciplinaryatlassss.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "Modern Learning Spaces"
    ],
    "lead": null,
    "text": "Startup studios where ideas meet execution – Build ventures through hands-on, credit-bearing projects with real industry backing."
   },
   {
    "image": {
     "src": "/assets/images/campus/incubators/interdisciplinaruuatlasss.png",
     "alt": ""
    },
    "variant": "atlas-bg-2",
    "title": [
     "Collaborative Research Spaces"
    ],
    "lead": null,
    "text": "Work side-by-side with faculty and startup mentors to refine your ideas, validate concepts, and shape your entrepreneurial journey."
   },
   {
    "image": {
     "src": "/assets/images/campus/incubators/modularatlassss.png",
     "alt": ""
    },
    "variant": "atlas-bg-1",
    "title": [
     "MVP Showcase",
     "Arena"
    ],
    "lead": null,
    "text": "Present your Minimum Viable Product to real-world mentors in masterclasses that simulate the startup pitch and product-testing experience."
   }
  ]
 },
 "housing": {
  "heading": "Live Where You Learn",
  "subheading": "UpGrad Living offers comfort and convenience in Mumbai. Stay just steps away from your classes — in modern, secure student residences that feel like home.",
  "embed": "https://www.youtube.com/embed/vSHVERTv97M?si=nZFb36gVf9wzEAfJ?rel=0&controls=0&autoplay=1&mute=0&start=0",
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
    "image": "/assets/images/campus/housing/highlight-1.jpg",
    "size": "sm"
   },
   {
    "label": "24/7 security\nwith biometric access",
    "image": "/assets/images/campus/housing/security-with-biometric-access.png",
    "size": "sm"
   },
   {
    "label": "Healthy meals, four times a day",
    "image": "/assets/images/campus/housing/hight-simg-3.jpg",
    "size": "tall",
    "bgSize": "auto"
   },
   {
    "label": "Lounges and gaming zones",
    "image": "/assets/images/campus/housing/hight-simg-4.jpg",
    "size": "wide"
   },
   {
    "label": "Gym and wellness",
    "image": "/assets/images/campus/housing/hight-simg-5.jpg",
    "size": "tall"
   },
   {
    "label": "Study zones",
    "image": "/assets/images/campus/housing/hight-simg-6.jpg",
    "size": "wide"
   },
   {
    "label": "Coffee shop",
    "image": "/assets/images/campus/housing/coffee-shop.png",
    "size": "sm"
   },
   {
    "label": "Housekeeping",
    "image": "/assets/images/campus/housing/housekeeping.png",
    "size": "sm"
   }
  ]
 },
 "studios": {
  "heading": "Studios, Labs, and Classrooms",
  "subheading": "Designed for collaboration and creativity",
  "slides": [
   {
    "title": "Immersive modern Classes",
    "image": {
     "src": "/assets/images/campus/studios/immersiveatlassimg.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/immersiveatlassimg-p-500.png 500w, /assets/images/campus/studios/immersiveatlassimg.png 790w"
    }
   },
   {
    "title": "3D Printing Labs",
    "image": {
     "src": "/assets/images/campus/studios/3dprintinglabsatlass.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/3dprintinglabsatlass-p-500.png 500w, /assets/images/campus/studios/3dprintinglabsatlass.png 790w"
    }
   },
   {
    "title": "Animation Studio",
    "image": {
     "src": "/assets/images/campus/studios/animationstudioatlass.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/animationstudioatlass-p-500.png 500w, /assets/images/campus/studios/animationstudioatlass.png 790w"
    }
   },
   {
    "title": "Collaboration Spaces",
    "image": {
     "src": "/assets/images/campus/studios/collaborationspacesatlasss.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/collaborationspacesatlasss-p-500.png 500w, /assets/images/campus/studios/collaborationspacesatlasss.png 790w"
    }
   },
   {
    "title": "Atmanirbhar Bharat Center of Design",
    "image": {
     "src": "/assets/images/campus/studios/atmanirbharatlassss.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/atmanirbharatlassss-p-500.png 500w, /assets/images/campus/studios/atmanirbharatlassss.png 790w"
    }
   },
   {
    "title": "Design Workshops",
    "image": {
     "src": "/assets/images/campus/studios/designatlasss.png",
     "alt": "",
     "srcSet": "/assets/images/campus/studios/designatlasss-p-500.png 500w, /assets/images/campus/studios/designatlasss.png 790w"
    }
   }
  ]
 },
 "hangout": {
  "heading": "Hangout zones",
  "subheading": "Empowering students to explore, create, and innovate.",
  "columns": [
   [
    {
     "image": {
      "src": "/assets/images/campus/hangout/amphiteatreatlasss.png",
      "alt": ""
     },
     "label": "Amphitheatre",
     "tight": false
    },
    {
     "image": {
      "src": "/assets/images/campus/hangout/careercafeeatlass.png",
      "alt": ""
     },
     "label": "Career Cafe",
     "tight": true
    }
   ],
   [
    {
     "image": {
      "src": "/assets/images/campus/hangout/courtyardattlasss.png",
      "alt": ""
     },
     "label": "Courtyard",
     "tight": false
    },
    {
     "image": {
      "src": "/assets/images/campus/hangout/spicecorridoratlasssss.png",
      "alt": ""
     },
     "label": "Spice Corridor",
     "tight": false
    }
   ],
   [
    {
     "image": {
      "src": "/assets/images/campus/hangout/sport-turfs.png",
      "alt": ""
     },
     "label": "Football Turf",
     "tight": true
    },
    {
     "image": {
      "src": "/assets/images/campus/hangout/32009.png",
      "alt": ""
     },
     "label": "Outside Courtyard",
     "tight": false
    }
   ],
   [
    {
     "image": {
      "src": "/assets/images/campus/hangout/thirdwavecoffeeatlasss.png",
      "alt": ""
     },
     "label": "Third Wave Coffee",
     "tight": false
    },
    {
     "image": {
      "src": "/assets/images/campus/hangout/collaborativespacesssatlass.png",
      "alt": ""
     },
     "label": "Collaborative Corners",
     "tight": false
    }
   ]
  ]
 },
 "food": {
  "heading": "Food on Campus",
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
 "banner": {
  "heading": "Experience the ATLAS Campus in Person",
  "subheading": "Explore our future-ready campus — from innovation labs and design studios to collaborative spaces and student hangouts. Visit us to see where creativity, technology, and community come together.",
  "buttons": [
   {
    "label": "Apply Now",
    "href": "/applicationform"
   },
   {
    "label": "Schedule a visit",
    "href": "/campusvisit"
   }
  ],
  "image": {
   "src": "/assets/images/campus/banner/pr-banner-admission.png",
   "alt": "",
   "srcSet": "/assets/images/campus/banner/pr-banner-admission-p-500.png 500w, /assets/images/campus/banner/pr-banner-admission.png 590w"
  }
 },
 "faq": {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
   {
    "q": "What does campus life mean?",
    "a": [
     "Campus life refers to the day-to-day experience of students beyond classrooms. It includes academic spaces, social interactions, activities, facilities and the overall environment that supports learning and personal growth."
    ]
   },
   {
    "q": "How is life at campus?",
    "a": [
     "Life on campus combines academics with collaboration and creative engagement. Students benefit from modern classrooms, studios, labs and shared spaces that support both learning and personal development."
    ]
   },
   {
    "q": "What is ATLAS University famous for?",
    "a": [
     "ATLAS University is recognised for its modern infrastructure, experiential learning opportunities and industry-focused approach. Its campus provides well-designed academic and collaborative spaces that support hands-on education."
    ]
   },
   {
    "q": "Which university is best in Mumbai?",
    "a": [
     "Mumbai hosts many reputed universities, each with its own strengths. ATLAS SkillTech University focuses on industry-integrated, experiential learning within a modern campus environment."
    ]
   },
   {
    "q": "What are campus universities?",
    "a": [
     "Campus universities are institutions where teaching, learning and student life occur within a defined campus. They provide academic buildings, facilities and shared spaces in an integrated environment."
    ]
   },
   {
    "q": "What are the parts of a university campus?",
    "a": [
     "A university campus typically includes academic buildings, libraries, studios or labs, common areas, dining spaces and recreational facilities. These spaces support learning, collaboration and student life."
    ]
   },
   {
    "q": "What facilities are you expecting at the university?",
    "a": [
     "Universities offer classrooms, libraries, labs, student lounges, dining areas and activity spaces. Modern campuses also provide collaborative zones, technology-enabled learning spaces and student support services."
    ]
   },
   {
    "q": "What activities are common on campuses?",
    "a": [
     "Common campus activities include academic workshops, creative collaborations, studio work and student-led initiatives. These activities help students develop skills, build networks and gain confidence."
    ]
   },
   {
    "q": "Which university has the best dining food?",
    "a": [
     "Dining experiences vary across universities. ATLAS University provides on-campus dining facilities designed for student convenience and daily campus life."
    ]
   },
   {
    "q": "Is campus part of university?",
    "a": [
     "Yes, the campus is an integral part of a university. It contains academic, administrative and student-life facilities that together create the full university experience."
    ]
   }
  ]
 },
 "meta": {
  "title": "Campus Facilities & Spaces  – ATLAS SkillTech University",
  "description": "Explore campus facilities, labs, student spaces, libraries and collaborative areas designed to support learning, creativity and practical project work."
 }
};
