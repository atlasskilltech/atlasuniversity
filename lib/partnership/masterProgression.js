/*
 * /advantages/partnership/master-progression — content, transcribed from
 * reference/advantages/partnership/master-progression.php (production identical, 2026-10-31).
 * Assets mirror production's own paths under public/; the 19 Webflow-CDN images are stored under
 * master-progression/cdn/, and 10 university logos byte-identical to /advantages/atlas-internationalisation's
 * are referenced from there.
 *
 * Dead upstream refs (`atlas-global/wp-content`, 403 for every visitor), not reproduced — production
 * paints broken-image boxes for all of them:
 *   - all 209 logos of "Region Wise Master's Acceptances" (the cells keep their size, empty)
 *   - all 40 university logos on the "Global Destinations" student cards, and 3 student photographs
 */

export const hero = {
  title: "Master's Progression",
  text: "From ATLAS to the World's Leading Universities",
  cta: { label: "Click to View Master Acceptance's", href: '#region-acceptance' },
  src: '/assets/images/advantages/partnership/global-immersions/hero-banner.png',
  srcSet: '/assets/images/advantages/partnership/global-immersions/hero-banner-500.png 500w, /assets/images/advantages/partnership/global-immersions/hero-banner-800.png 800w, /assets/images/advantages/partnership/global-immersions/hero-banner-1080.png 1080w, /assets/images/advantages/partnership/global-immersions/hero-banner.png 1366w',
  mobileImage: '/assets/images/advantages/partnership/global-immersions/mob-banner.jpeg',
  alt: '',
};

const BG = {
  1: { background: '#41418e', image: '/assets/images/campus/stats/vector-atlas-1.png', imagePosition: '100%' },
  2: { background: '#2e3074', image: '/assets/images/campus/stats/vector-atlas-2.png', imagePosition: '100%' },
  3: { background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-3.png', imagePosition: '100% 0' },
};
export const stats = [
  { label: '500+', value: 'Global Admits', ...BG[1] },
  { label: '200+', value: 'Global Universities', ...BG[3] },
  { label: '25+', value: 'Study Destinations', ...BG[2] },
  { label: '₹6 Cr', value: 'Scholarships Awarded', ...BG[3] },
];

/* The copy ends with a further authored <br><br> (one empty line). */
export const story = {
  heading: 'About Masters Progression',
  image: '/assets/images/advantages/partnership/master-progression/section/2.png',
  text: "To support students aspiring to pursue postgraduate education abroad, ATLAS SkillTech University has established the Office of Masters Progression—a dedicated support system designed to guide students through every stage of their global academic journey. The office is led by experienced counsellors and advisors who work closely with students to understand their ambitions, academic strengths, and long-term career goals, helping them identify the most suitable universities and programs across the world.\n\nThrough strong relationships with leading global institutions, the Office of Masters Progression assists students in preparing competitive applications, navigating scholarship opportunities, and securing admissions to universities aligned with their aspirations. The support continues well beyond the application process, ensuring that students and their families feel confident and well prepared as they take the next step in their international education journey.\n\n",
};

export const process = {
  heading: 'The Masters Progression Process',
  lead: 'From Ambition to Global Admits — Guided Every Step of the Way.',
  steps: [
  {
    "number": "01",
    "title": "Personalised Counselling & Goal Alignment",
    "description": "Students begin with one-on-one counselling sessions where advisors understand their academic profile, ambitions, and preferred destinations to identify suitable universities and programs.",
    "icon": "/assets/images/advantages/partnership/master-progression/icon/1.png"
  },
  {
    "number": "02",
    "title": "Application Strategy & Documentation",
    "description": "The team guides students through building strong applications including SOPs, LORs, and completing university application requirements.",
    "icon": "/assets/images/advantages/partnership/master-progression/icon/2.png"
  },
  {
    "number": "03",
    "title": "Scholarships & Financial Planning",
    "description": "Students receive support in identifying scholarship opportunities, preparing scholarship essays, and interview preparation for financial support.",
    "icon": "/assets/images/advantages/partnership/master-progression/icon/3.png"
  },
  {
    "number": "04",
    "title": "Offer Evaluation & Accommodation Support",
    "description": "Advisors help students review offers, accept the best-fit university, and secure accommodation at their destination.",
    "icon": "/assets/images/advantages/partnership/master-progression/icon/4.png"
  },
  {
    "number": "05",
    "title": "Visa Guidance & Pre-Departure Readiness",
    "description": "Students receive visa support, first-semester preparation and pre-departure orientation sessions to prepare them for life abroad.",
    "icon": "/assets/images/advantages/partnership/master-progression/icon/5.png"
  }
],
};

export const destinations = {
  heading: 'ATLAS Students, Global Destinations',
  lead: 'A growing community of learners progressing to top-ranked universities across the globe.',
  students: [
  {
    "name": "Kanak Suri",
    "program": "MBA",
    "image": null
  },
  {
    "name": "Rayan Dalal",
    "program": "MSc Finance",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/rayan-dalal.png"
  },
  {
    "name": "Gopika Maheshwari",
    "program": "MBA",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/gopika-maheshwari.jpg"
  },
  {
    "name": "Nainika Patwari",
    "program": "Masters in Integrated Marketing",
    "image": null
  },
  {
    "name": "Yash Dandavate",
    "program": "Masters in Management",
    "image": null
  },
  {
    "name": "Taniasha Parabia",
    "program": "MSc in Strategic Marketing",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/tanaisha-parabhia.jpg"
  },
  {
    "name": "Yashvi Shah",
    "program": "MSc in Sustainability Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/yashvi-shah.jpg"
  },
  {
    "name": "Nidhish Kakad",
    "program": "MSc in Entrepreneurship",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/nidhish-kakad.jpg"
  },
  {
    "name": "Tanay Gandhi",
    "program": "MSc in Financial Analytics",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/tanay-gandhi.jpg"
  },
  {
    "name": "Samreen Saini",
    "program": "MSc in Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/samreen-saini.jpg"
  },
  {
    "name": "Vedika Rathi",
    "program": "MSc in Marketing Strategy",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/vedika-rathi.jpg"
  },
  {
    "name": "Shivani Nirula",
    "program": "MBA",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/shivani-nirula.jpg"
  },
  {
    "name": "Shreya Narain",
    "program": "Masters in International Development",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/shreya-narain.jpg"
  },
  {
    "name": "Shabbir Bootwala",
    "program": "MSc Marketing Strategy & Innovation",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/shabbir-bootwala.jpg"
  },
  {
    "name": "Harvansh Chaddha",
    "program": "MSc in Finance",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/harvansh-chadha.png"
  },
  {
    "name": "Aman Desai",
    "program": "Master of Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/aman-desai.jpg"
  },
  {
    "name": "Utkarsh Kejriwal",
    "program": "MSc. Business Analysis and Strategic Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/utkarsh-kejriwal.jpg"
  },
  {
    "name": "Kushal Jesrani",
    "program": "Masters in Marketing",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/kushal-Jesrani.jpg"
  },
  {
    "name": "Deepika Parekh",
    "program": "MSc in International Marketing Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/deepika-parekh.png"
  },
  {
    "name": "Yash Dalal",
    "program": "MSc in Management and International Business",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/yash-dalal.jpg"
  },
  {
    "name": "Ria Jain",
    "program": "Masters in Strategic Design",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/ria-jain.jpg"
  },
  {
    "name": "Urvi Thakker",
    "program": "MA in Service Design",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/urvi-thakker.jpg"
  },
  {
    "name": "Sayali Deshpande",
    "program": "no image",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/sayali-deshpande.jpg"
  },
  {
    "name": "Dhwani Bapna",
    "program": "MDes Interior Studies",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/dhwani-bapna.jpg"
  },
  {
    "name": "Yashovardhan Sharma",
    "program": "Masters in Interior & Living Design",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/yashovardhan-sharma.jpg"
  },
  {
    "name": "Jhanvi Lathia",
    "program": "MA in Innovation Management",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/jhanvi-lathia.jpg"
  },
  {
    "name": "Niharika Mathur",
    "program": "MSc in Integrate Markting",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/niharika-mathur.jpg"
  },
  {
    "name": "Lekhini Bhansali",
    "program": "Master in Art Direction",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/lekhini-bhansali.jpg"
  },
  {
    "name": "Neomi Parikh",
    "program": "MSc Marketing and Technology",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/neomi-parikh.jpg"
  },
  {
    "name": "Somil Turakhia",
    "program": "MA in Business & Analytics",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/somil-turakhia.jpg"
  },
  {
    "name": "Rahul Juneja",
    "program": "Masters in Marketing",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/rahul-juneja.jpg"
  },
  {
    "name": "Lamiya Sakarwala",
    "program": "Masters in Bioengineering, Global Medical Innovation",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/lamiya-sakarwala.jpg"
  },
  {
    "name": "Anantika Sethi",
    "program": "MS Information Science (Specialization HCI/UX)",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/anantika-sethi.jpg"
  },
  {
    "name": "Aparna Agarwal",
    "program": "Masters in Sustainability",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/aparna-agarwal.jpg"
  },
  {
    "name": "Muskaan Shah",
    "program": "Strategic Marketing Program",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/muskan-shah.jpg"
  },
  {
    "name": "Param Suru",
    "program": "Masters in Digital & Content Marketing",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/param-suru.jpg"
  },
  {
    "name": "Nishita Chheda",
    "program": "MEA in Design for Social Innovation",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/nishita-chheda.jpg"
  },
  {
    "name": "Rushabh Kulkarni",
    "program": "M.Des Interaction Design",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/rushabh-kulkarni.jpg"
  },
  {
    "name": "Ravleen Matharu",
    "program": "MS in Human Computer Interaction",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/ravleen-kaur-matharu.jpg"
  },
  {
    "name": "Raunaq Sandhu",
    "program": "MA in Product Design",
    "image": "/assets/images/advantages/partnership/master-progression/students/student-image/raunaq-sandhu.jpg"
  }
],
};

/* Each cell's region class, in authored order; the tab shows only the cells carrying its key
   ('all' is its own set of 109, not the union). Every logo is dead upstream (see above). */
export const regions = {
  heading: "Region Wise Master's Acceptances",
  tabs: [
  {
    "key": "usa",
    "label": "USA"
  },
  {
    "key": "uk",
    "label": "United Kingdom"
  },
  {
    "key": "europe",
    "label": "Europe"
  },
  {
    "key": "oceania",
    "label": "Australia"
  },
  {
    "key": "asia",
    "label": "Rest of the World"
  },
  {
    "key": "all",
    "label": "All"
  }
],
  cells: ["uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "uk", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "usa", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "europe", "oceania", "oceania", "oceania", "oceania", "asia", "asia", "asia", "asia", "asia", "asia", "asia", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all", "all"],
};

export const testimonialsLead = "Through strategic global associations spanning continents, our students gain invaluable exposure via international immersions, student exchanges, and masterclasses. This global learning experience at ATLAS equips students with the insights and confidence to make informed decisions, inspiring them to pursue master's programs at top-ranked universities and institutions worldwide.";
/* The reference's live `$testimonials` (master-progression.php:114-206): seven `testimonial/new/…` films.
   The five earlier ones (aditya-khandelwal … sakshi-karnawat) are commented out there and absent from
   production, so they are not rendered; their files stay on disk unreferenced, and four of their
   `1.webm` files are production's HTML soft-404 saved under a video name (see
   ATLAS-ASSET-LINK-CRM-AUDIT.md). Sources stay in production's order: WebM, then MP4. */
export const testimonials = [
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/smiti-shah/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/smiti-shah/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/smiti-shah/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/sara-karkera/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/sara-karkera/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/sara-karkera/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/agrata-agarwal/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/agrata-agarwal/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/agrata-agarwal/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/vansh-sutaria/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/vansh-sutaria/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/vansh-sutaria/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/shivani-patil/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/shivani-patil/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/shivani-patil/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/yasir-salim-kaskar/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/yasir-salim-kaskar/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/yasir-salim-kaskar/1.mp4"
    ]
  },
  {
    "poster": "/assets/images/advantages/partnership/master-progression/testimonial/new/shraddah-jadhav/1.png",
    "sources": [
      "/assets/images/advantages/partnership/master-progression/testimonial/new/shraddah-jadhav/1.webm",
      "/assets/images/advantages/partnership/master-progression/testimonial/new/shraddah-jadhav/1.mp4"
    ]
  }
];

export const fair = {
  heading: 'Global Education Fair',
  sub: "The Global Education Fair at ATLAS brings together top-ranked universities from over 15 countries across Business, Technology, and Design, all under one roof. Students have the unique opportunity to engage directly with university delegates, gaining clarity on eligibility, scholarships, application timelines, and program pathways. This direct access enables informed decision-making, offering valuable insights into global academic opportunities and future career trajectories.",
  cards: [
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/IMG_7849-1.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/university-of-sussex.png",
      "alt": "",
      "style": {
        "height": "60px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/IMG_7849-1-2.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/ie-business-school.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/IMG_7849-1-3.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/westminister.png",
      "alt": "",
      "style": {
        "height": "45px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/IMG_7849-1-copy.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/newcastle.jpg",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/IMG_7849-1-2-copy.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/university-of-southampton.png",
      "alt": "",
      "style": {
        "height": "45px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/goldsmiths-uol-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/goldsmiths-university.png",
      "alt": "",
      "style": {
        "height": "45px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/macquarie-university-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/macquarie-university.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/henley-business-school-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/reading.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/massey-university-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/massey-university.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/Colarodo-state-uni.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/colorado-state-university.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/John-hopkins-university.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/audencia.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/uni-oregan.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/oregon.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/usf-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/san-francisco.png",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/University-of-sussex.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/international/partners/university-of-sussex.png",
      "alt": "",
      "style": {
        "height": "60px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/Bocconi.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/bocconi.png",
      "alt": "",
      "style": {
        "height": "30px",
        "backgroundColor": "#fff",
        "padding": "5px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/arizona-state-uni.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/arizona.png",
      "alt": "",
      "style": {
        "height": "30px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/california-college-of-art-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/california.png",
      "alt": "",
      "style": {
        "height": "30px"
      }
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/glion-uni-ged.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/glion.jpg",
      "alt": "",
      "style": null
    }
  },
  {
    "image": {
      "src": "/assets/images/advantages/partnership/master-progression/cdn/depaul-uni.png",
      "alt": ""
    },
    "logo": {
      "src": "/assets/images/internationalisation-logo/depaul.png",
      "alt": "",
      "style": {
        "height": "35px"
      }
    }
  }
],
};

export const world = { heading: 'From ATLAS To The World', images: [
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/1.jpg",
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/2.jpg",
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/3.jpg",
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/4.jpg",
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/5.jpg",
  "/assets/images/advantages/partnership/master-progression/from-atlas-to-the-world/6.jpg"
] };

export const video = { heading: 'Master Progression at ATLAS', text: "At ATLAS, global Progression is not an experience it is a perspective. Through curated international academic visits, industry interactions, and cultural explorations, students gain real-world global exposure that broadens their understanding of international practices, innovation ecosystems, and diverse ways of thinking.", youtubeId: "AUFUzbNOza4" };

export const start = {
  heading: 'Start your Master’s Application',
  image: '/assets/images/advantages/partnership/master-progression/progressionat-atlas/688.png',
  text: [
    "At ATLAS, we believe in empowering our students to reach beyond borders and pursue their academic dreams with the world's most prestigious institutions. Our strong partnerships with leading Universities across the globe open doors to endless opportunities for advanced studies. ",
    { b: 'This section is for ATLAS students looking at pursuing their Master’s journey at Universities around the world.' },
  ],
  cta: { label: "Click Here to Begin your Master's Journey", href: 'https://www.atlasuniversity.edu.in/masterprogression/' },
};

/* The brochure button's href is `#` upstream — transcribed as authored. */
export const alumni = {
  heading: 'ATLAS Alumni & Master’s Progression',
  image: '/assets/images/advantages/partnership/master-progression/section/1.png',
  text: 'Discover how ATLAS SkillTech University students have successfully progressed to leading global universities for their Master’s degrees, supported by dedicated mentorship and international pathways. Explore our partner institutions, scholarship opportunities, and student success stories. Download the brochure to see how ATLAS is enabling the next generation of global achievers.',
  cta: { label: 'Download the Brochure', href: '#' },
};
