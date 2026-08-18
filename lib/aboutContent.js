/**
 * Content for /about-us — transcribed 1:1 from `reference/about-us.php`.
 *
 * Every asset the page references lives on `cdn.prod.website-files.com`; none of
 * them existed under `reference/assets`, so all 106 were downloaded into
 * `public/assets/images/about/` (and `public/assets/videos/about/`) and the
 * paths below are the local copies. The Webflow `-p-500 / -p-800 / -p-1080`
 * responsive variants were kept so each `srcSet` matches the reference's.
 *
 * Three things are deliberately NOT in here because the page shares them with
 * the homepage and the components already own that data:
 *   - Mission / Vision  — identical copy and identical markup, so
 *     `components/About/MissionVision` is reused untouched.
 *   - Advisory Board    — the same fourteen people in the same order, so the
 *     homepage's `advisoryBoard` export is reused; only the "View all" button
 *     this page adds is carried here as `advisoryAction`.
 *   - Leadership Team   — the same three people; the page renders them without
 *     the homepage's "Read more" button, which the component takes as data.
 */
export const aboutContent = {
 "meta": {
  "title": "About ATLAS SkillTech University  – Vision & Leadership",
  "description": "Learn about ATLAS SkillTech University's mission, leadership, academic philosophy and commitment to experiential, industry-aligned education across disciplines."
 },
 "hero": {
  "title": "ATLAS",
  "subtitle": [
   "The Only Indian University",
   "Founded by Educators"
  ],
  "text": "What began as a vision to disrupt conventional business education has evolved into a thriving ecosystem of entrepreneurs, change-makers, and future-ready leaders at ATLAS.",
  "image": {
   "src": "/assets/images/about/hero/about-us-home.png",
   "srcSet": "/assets/images/about/hero/about-us-home-p-500.png 500w, /assets/images/about/hero/about-us-home-p-800.png 800w, /assets/images/about/hero/about-us-home-p-1080.png 1080w, /assets/images/about/hero/about-us-home.png 1366w",
   "alt": ""
  }
 },
 "schools": {
  "heading": "Our Schools",
  "subheading": "Design, Tech, and Management. Your path starts here.",
  "cards": [
   {
    "image": {
     "src": "/assets/images/about/schools/atlas-sc-img-1.webp",
     "srcSet": "/assets/images/about/schools/atlas-sc-img-1-p-500.webp 500w, /assets/images/about/schools/atlas-sc-img-1-p-800.webp 800w, /assets/images/about/schools/atlas-sc-img-1-p-1080.webp 1080w, /assets/images/about/schools/atlas-sc-img-1.webp 1760w",
     "alt": ""
    },
    "logo": {
     "src": "/assets/images/about/schools/atlas-logo-1.png",
     "alt": ""
    },
    "title": "ISDI School of Design & Innovation",
    "button": {
     "label": "Apply Now",
     "href": "/applicationform"
    }
   },
   {
    "image": {
     "src": "/assets/images/about/schools/ismeschool-cards.png",
     "srcSet": "/assets/images/about/schools/ismeschool-cards-p-500.png 500w, /assets/images/about/schools/ismeschool-cards.png 619w",
     "alt": ""
    },
    "logo": {
     "src": "/assets/images/about/schools/isme-logologos-school-cards.png",
     "alt": ""
    },
    "title": "ISME School of Management & Entrepreneurship",
    "button": {
     "label": "Apply Now",
     "href": "/applicationform"
    }
   },
   {
    "image": {
     "src": "/assets/images/about/schools/ugdxschool-cards-2.png",
     "srcSet": "/assets/images/about/schools/ugdxschool-cards-2-p-500.png 500w, /assets/images/about/schools/ugdxschool-cards-2.png 620w",
     "alt": ""
    },
    "logo": {
     "src": "/assets/images/about/schools/ugdxlogos-school-cards.png",
     "alt": ""
    },
    "title": "uGDX School of Technology",
    "button": {
     "label": "Apply Now",
     "href": "/applicationform"
    }
   },
   {
    "image": {
     "src": "/assets/images/about/schools/lawschool-cards-2.png",
     "srcSet": "/assets/images/about/schools/lawschool-cards-2-p-500.png 500w, /assets/images/about/schools/lawschool-cards-2.png 619w",
     "alt": ""
    },
    "logo": {
     "src": "/assets/images/about/schools/lawlogos-school-cards.png",
     "alt": ""
    },
    "title": "ATLAS School of Law",
    "button": {
     "label": "Apply Now",
     "href": "/applicationform"
    }
   }
  ]
 },
 "story": {
  "heading": "The Story Behind ATLAS",
  "paragraphs": [
   "ATLAS SkillTech University was born from a bold vision — to reimagine higher education for the 21st century. ",
   "A vision that believes India deserves a new kind of university: one that breaks traditional silos, bridges academia and industry, and prepares students for a future defined by innovation, technology, & global opportunity."
  ],
  "embed": "https://www.youtube.com/embed/R4qM_Jwct7w?autoplay=1&mute=1&loop=1&playlist=R4qM_Jwct7w&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1"
 },
 "chancellor": {
  "heading": "Chancellor’s note",
  "quoteIcon": "/assets/images/leadership-team/quote-icon.svg",
  "quote": "ATLAS is building a future-ready education model to equip young people in India with the skills and tech they need.",
  "poster": "/assets/images/about/chancellor/dr-shahani-video-poster.jpg",
  "videos": [
   "/assets/videos/about/dr-shahani-video.mp4",
   "/assets/videos/about/dr-shahani-video.webm"
  ],
  "name": "Dr. Indu Shahani",
  "paragraphs": [
   "Dr. Indu Shahani, Founding President and Chancellor of ATLAS SkillTech University, brings over four decades of leadership in education and public service. Formerly the Principal of H.R. College and Sheriff of Mumbai, she also served on the University Grants Commission (UGC). Internationally, she was the first Indian Vice-Chair of the IB Board of Governors, marking her global influence in education reform.",
   "At ATLAS, Dr. Shahani is building a future-focused, interdisciplinary institution that bridges academics and industry. She serves on boards of major corporations like Diageo, HSBC AMC, and Bajaj Electricals, and continues to drive innovation in education through her visionary leadership."
  ],
  "button": {
   "label": "Read More",
   "href": "/schools/isme/dr-indu-shahani"
  }
 },
 "leadership": {
  "heading": "Leadership Team",
  "items": [
   {
    "name": "Dr. Indu Shahani",
    "quote": [
     "ATLAS is building a future-ready education model to equip young",
     "people in India with the skills and",
     "tech they need."
    ],
    "image": {
     "src": "/assets/images/about/leadership/leader-atlas-1.png",
     "alt": ""
    }
   },
   {
    "name": "Mr. Siddharth Shahani",
    "quote": [
     "In a tech-driven future, today’s youth need skills that combine creativity with cutting-edge technology."
    ],
    "image": {
     "src": "/assets/images/about/leadership/sid-sah.png",
     "alt": ""
    }
   },
   {
    "name": "Dr Rajan Welukar",
    "quote": [
     "Education must go beyond degrees it should shape individuals into responsible, innovative leaders."
    ],
    "image": {
     "src": "/assets/images/about/leadership/raj-wel.png",
     "alt": ""
    }
   }
  ]
 },
 "advisoryAction": {
  "label": "View all",
  "href": "/advisory-board-industry-academia-leaders"
 },
 "recognition": {
  "heading": "Recognition that Reflects Our Commitment",
  "panels": [
   {
    "label": "NAAC Accreditation",
    "kind": "naac",
    "imageFirst": false,
    "badge": {
     "src": "/assets/images/about/recognition/atlas-naac.png",
     "alt": ""
    },
    "text": [
     "India’s Youngest ",
     "University to Recieve ",
     "NAAC Accreditation"
    ],
    "logos": [],
    "image": {
     "src": "/assets/images/about/recognition/naac-accredited.png",
     "srcSet": "/assets/images/about/recognition/naac-accredited-p-500.png 500w, /assets/images/about/recognition/naac-accredited-p-800.png 800w, /assets/images/about/recognition/naac-accredited-p-1080.png 1080w, /assets/images/about/recognition/naac-accredited.png 1238w",
     "alt": ""
    }
   },
   {
    "label": "MoUs",
    "kind": "mou",
    "imageFirst": false,
    "badge": null,
    "text": [
     "ATLAS SkillTech University signs Memorandums of Understanding (MoUs) to foster academic collaboration, student exchange, research opportunities, and global exposure."
    ],
    "logos": [
     {
      "src": "/assets/images/about/recognition/mou-logo-1.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/mou-logo-2.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/mou-logo-3.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/mou-logo-4.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/mou-logo-5.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/mou-logo-6.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/uni_logo_bath_1280_510-e1535972281573-1-1.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/rmit_university_logo-1-1.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/griffith_university_logo_variant_2022.svg-1-1.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/group-1272631427.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/d280023b-a34c-4ace-8ee2-0a50cb0c48d5-1-1.png",
      "alt": ""
     },
     {
      "src": "/assets/images/about/recognition/sheffield-1.png",
      "alt": ""
     }
    ],
    "image": {
     "src": "/assets/images/about/recognition/mou-image.webp",
     "srcSet": "/assets/images/about/recognition/mou-image-p-500.webp 500w, /assets/images/about/recognition/mou-image-p-800.webp 800w, /assets/images/about/recognition/mou-image.webp 1024w",
     "alt": ""
    }
   },
   {
    "label": "UGC Recognition",
    "kind": "mou",
    "imageFirst": true,
    "badge": {
     "src": "/assets/images/about/recognition/uni-grant-commision.png",
     "alt": ""
    },
    "text": [
     "ATLAS SkillTech University, established in 2021 under the Maharashtra Act No. XV, has been officially recognized by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956 . This recognition affirms the university's compliance with national higher education standards."
    ],
    "logos": [],
    "image": {
     "src": "/assets/images/about/recognition/ugc-recog-img.png",
     "srcSet": "/assets/images/about/recognition/ugc-recog-img-p-500.png 500w, /assets/images/about/recognition/ugc-recog-img-p-800.png 800w, /assets/images/about/recognition/ugc-recog-img-p-1080.png 1080w, /assets/images/about/recognition/ugc-recog-img.png 1238w",
     "alt": ""
    }
   },
   {
    "label": "Member of AIU",
    "kind": "mou",
    "imageFirst": false,
    "badge": {
     "src": "/assets/images/about/recognition/logo-for-third-tab.png",
     "alt": ""
    },
    "text": [
     "ATLAS SkillTech University is a proud member of the Association of Indian Universities (AIU), a key national body that ensures academic credibility and degree equivalence across India and abroad."
    ],
    "logos": [],
    "image": {
     "src": "/assets/images/about/recognition/member-aiu-img.png",
     "srcSet": "/assets/images/about/recognition/member-aiu-img-p-500.png 500w, /assets/images/about/recognition/member-aiu-img-p-800.png 800w, /assets/images/about/recognition/member-aiu-img-p-1080.png 1080w, /assets/images/about/recognition/member-aiu-img.png 1238w",
     "alt": ""
    }
   }
  ]
 },
 "spotlight": {
  "heading": "ATLAS Spotlight",
  "subheading": "Excellence isn’t a milestone—it’s a mindset. Our students and faculty consistently earn recognition on national and international platforms for innovation, leadership, and impact",
  "items": [
   {
    "name": "NASA Rover Challenge",
    "title": [
     "Global Top 5 Ranking"
    ],
    "image": "/assets/images/about/spotlight/nasa-rover-challenge.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Achievers Award",
    "title": [
     "2022 Winners"
    ],
    "image": "/assets/images/about/spotlight/achievers-awards-2022-winner.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Mahek Nayak",
    "title": [
     "Maharashtra State Games"
    ],
    "image": "/assets/images/about/spotlight/mahek-nayak-maharashtra-state-games-24.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Cyberstrike Fest",
    "title": [
     "2024 Winner"
    ],
    "image": "/assets/images/about/spotlight/cyberstrike-winners.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Team Rodeo",
    "title": [
     "Gold Medal in ATLAS Footsal"
    ],
    "image": "/assets/images/about/spotlight/team-rodeo.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Diya Basu",
    "title": [
     "Miss Maharashtra"
    ],
    "image": "/assets/images/about/spotlight/diya-basu.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Siddhi Nitin Deo",
    "title": [
     "Hats Off Award"
    ],
    "image": "/assets/images/about/spotlight/siddhi-nitin-deo-hats-off-award.png",
    "alt": "",
    "opTop": false
   },
   {
    "name": "Prachi",
    "title": [
     "Legacy Award"
    ],
    "image": "/assets/images/about/spotlight/prachi-legacy-award.png",
    "alt": "",
    "opTop": false
   }
  ]
 },
 "shaping": {
  "heading": "Shaping a Viksit Bharat, Together",
  "subheading": "Social Impact That Aligns With India’s Vision 2047",
  "items": [
   {
    "variant": "default",
    "background": "#41418E",
    "title": "Empowering Youth through Skill Development",
    "text": "ATLAS ISME’s student-led initiative, Rover Angels, is empowering school girls to explore science, technology, engineering, and mathematics through engaging workshops and hands-on learning. By making STEM education more accessible and inspiring, this program fosters curiosity, confidence, and future opportunities for young minds from diverse backgrounds.",
    "image": {
     "src": "/assets/images/about/shaping/shaping-img-1.webp",
     "srcSet": "/assets/images/about/shaping/shaping-img-1-p-500.webp 500w, /assets/images/about/shaping/shaping-img-1.webp 683w",
     "alt": ""
    }
   },
   {
    "variant": "switch",
    "background": "#41418E",
    "title": "Promoting Inclusive and Quality Education",
    "text": "Aligned with the National Education Policy (NEP) 2020, ATLAS ISME emphasizes an inclusive education model that caters to students from diverse socio-economic backgrounds. The institution promotes multidisciplinary learningand experiential education, enabling students to become agile learners and responsible citizens.",
    "image": {
     "src": "/assets/images/about/shaping/shaping-img-2.png",
     "srcSet": "/assets/images/about/shaping/shaping-img-2-p-500.png 500w, /assets/images/about/shaping/shaping-img-2.png 683w",
     "alt": ""
    }
   },
   {
    "variant": "default",
    "background": "#41418E",
    "title": "Supporting Sustainable Development Goals",
    "text": "ATLAS ISME integrates sustainability and social responsibility into its curriculum and community outreach, supporting goals such as Quality Education, Decent Work and Economic Growth, and Reduced Inequalities, which align with India’s commitments under the UN SDGs.",
    "image": {
     "src": "/assets/images/about/shaping/shaping-img-3.png",
     "srcSet": "/assets/images/about/shaping/shaping-img-3-p-500.png 500w, /assets/images/about/shaping/shaping-img-3.png 684w",
     "alt": ""
    }
   },
   {
    "variant": "switch",
    "background": "#41418E",
    "title": "Advancing Holistic Education",
    "text": "Team MUSHAK’s NASA journey reflects ATLAS’s vision of education that blends innovation, design, and impact. As India’s first team in the HERC RC Division, their 5th place finish and Social Media Award highlight how interdisciplinary learning and community outreach can drive real-world change and inspire future-ready minds.",
    "image": {
     "src": "/assets/images/about/shaping/shaping-img-4.png",
     "srcSet": "/assets/images/about/shaping/shaping-img-4-p-500.png 500w, /assets/images/about/shaping/shaping-img-4.png 683w",
     "alt": ""
    }
   }
  ]
 },
 "news": {
  "heading": "ATLAS in the News",
  "items": [
   {
    "logo": {
     "src": "/assets/images/about/news/economic-times-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-economic-times.png",
     "alt": ""
    },
    "title": "ATLAS SkillTech University Fellows all set to lead the changing economy with their breakthrough success",
    "date": "Aug 20, 2024",
    "href": "https://economictimes.indiatimes.com/industry/services/education/atlas-skilltech-university-fellows-all-set-to-lead-the-changing-economy-with-their-breakthrough-success/articleshow/92352586.cms?from=mdr"
   },
   {
    "logo": {
     "src": "/assets/images/about/news/media-brief-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-mediabrief.png",
     "alt": ""
    },
    "title": "ATLAS ISME launches ‘NextGen Leaders Pre-MBA Case Competition’ with PwC India as knowledge partner",
    "date": "Aug 20, 2024",
    "href": "https://mediabrief.com/atlas-isme-launches-the-nextgen-leaders-pre-mba-case-competition/"
   },
   {
    "logo": {
     "src": "/assets/images/about/news/mint-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-mint.png",
     "alt": ""
    },
    "title": "ATLAS SkillTech University Brings Leading International Faculty To Mumbai Campus",
    "date": "Aug 20, 2024",
    "href": "https://www.livemint.com/brand-stories/atlas-skilltech-university-brings-leading-international-faculty-to-mumbai-campus-11674132642261.html"
   },
   {
    "logo": {
     "src": "/assets/images/about/news/hindustan-times-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-hindustan-times.png",
     "alt": ""
    },
    "title": "ATLAS students to represent India in NASA Rover Challenge",
    "date": "Aug 20, 2024",
    "href": "https://www.hindustantimes.com/cities/mumbai-news/atlas-students-to-represent-india-in-nasa-rover-challenge-101732552089134.html"
   },
   {
    "logo": {
     "src": "/assets/images/about/news/times-education-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-times-education.png",
     "alt": ""
    },
    "title": "ATLAS features in Times Education Icons 2022",
    "date": "Aug 20, 2024",
    "href": "https://timesofindia.indiatimes.com/education/news/times-education-icons-1/articleshow/96595826.cms"
   },
   {
    "logo": {
     "src": "/assets/images/about/news/toi-logo.png",
     "alt": ""
    },
    "image": {
     "src": "/assets/images/about/news/picture-for-toi.png",
     "alt": ""
    },
    "title": "Rahul Dev kicks off Fresh Face 2025 on a high note",
    "date": "Aug 20, 2024",
    "href": "https://timesofindia.indiatimes.com/life-style/spotlight/celebrity-judge-rahul-dev-launches-joy-times-fresh-face-season-16/articleshow/118475327.cms"
   }
  ]
 },
 "faq": {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
   {
    "q": "Is ATLAS SkillTech University UGC recognised?",
    "a": [
     "Yes. ATLAS SkillTech University was established in 2021 under Maharashtra Act No. XV and is recognised by the UGC under Section 2(f) of the UGC Act, 1956. It is also a member of the Association of Indian Universities (AIU)."
    ]
   },
   {
    "q": "What NAAC grade has ATLAS SkillTech University received?",
    "a": [
     "Yes. ATLAS SkillTech University has received NAAC accreditation and describes itself as India’s youngest university to receive NAAC accreditation."
    ]
   },
   {
    "q": "Who is the Chancellor of ATLAS SkillTech University?",
    "a": [
     "Dr. Indu Shahani is the Founding President and Chancellor of ATLAS SkillTech University. She has over four decades of experience in education and public service, including roles as Principal of H.R. College and Sheriff of Mumbai."
    ]
   },
   {
    "q": "Who sits on ATLAS SkillTech University's Advisory Board?",
    "a": [
     "ATLAS's Advisory Board includes prominent industry and academic leaders such as Deepak Parekh, Vivek Pandit, Keshav Murugesh, Karan Singh, Anant Goenka, Ram Raghavan, Jamil Khatri, Avani Davda, Aryaman Birla, Anita Dongre, and others, alongside Dr. Indu Shahani."
    ]
   },
   {
    "q": "Is ATLAS SkillTech University a private university in Mumbai?",
    "a": [
     "Yes. ATLAS is a private university located in Equinox Business Park, BKC, Mumbai. It was established through an Act of the Maharashtra State Legislature and offers programs across ISDI, ISME, uGDX, and the School of Law."
    ]
   },
   {
    "q": "What is the vision and mission of ATLAS SkillTech University?",
    "a": [
     "ATLAS's mission is “To empower students with skills and cross-disciplinary knowledge to succeed in the world of Industry 4.0.” Its vision is “To create leaders of the future, equipped with the skills of tomorrow.”"
    ]
   },
   {
    "q": "Does ATLAS SkillTech University sign MoUs with other institutions?",
    "a": [
     "Yes. ATLAS signs MoUs with academic institutions, professional bodies, and organisations in India and abroad. These collaborations support academic exchange, research, industry engagement, and global exposure."
    ]
   }
  ]
 }
};
