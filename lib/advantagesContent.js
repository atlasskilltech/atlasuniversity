/**
 * Content for /advantages/atlas-advantages — transcribed 1:1 from
 * `reference/advantages/atlas-advantages.php` and
 * `reference/assets/include/faq/atlas/atlas-advantages.php`.
 *
 * 156 assets: 84 downloaded from `cdn.prod.website-files.com` into
 * `public/assets/images/advantages/<section>/`, and 72 that Home / About /
 * Campus / Life / Success had already brought in locally and that are reused
 * in place rather than duplicated — the whole eight-cell campus mosaic, the
 * three stat vectors and both `.css-content-wrapper` washes among them.
 *
 * Sixteen of the images are painted only by the stylesheet (the stat-card
 * vectors, the campus mosaic's eight cells, the three multidisciplinary cells
 * and the two global-card washes), so they travel as plain paths and are
 * applied inline by the component that needs them. That set was read off the
 * live page's computed `background-image` rather than parsed out of the
 * sheet: the sheet is shared by every Webflow page, and a static read cannot
 * tell which of `.cards-inner-camp.img-2` and its `.atlas` override wins.
 *
 * A newline inside a string is a `<br>` in the reference; components split
 * on it via `lib/withBreaks`.
 */
export const advantagesContent = {
 "meta": {
  "title": "ATLAS Advantage: Industry-Led Learning  – ATLAS SkillTech University",
  "description": "Discover the ATLAS Advantage industry mentorship, experiential projects, global pathways and skills-focused curriculum that prepare you for future careers."
 },
 "hero": {
  "title": "ATLAS Advantages",
  "text": "From global collaborations to hands-on learning, discover the edge that empowers every ATLAS student to turn potential into impact.",
  "image": {
   "src": "/assets/images/advantages/hero/advantage-hero-image.png",
   "alt": "",
   "srcSet": "/assets/images/advantages/hero/advantage-hero-image-p-500.png 500w, /assets/images/advantages/hero/advantage-hero-image-p-800.png 800w, /assets/images/advantages/hero/advantage-hero-image-p-1080.png 1080w, /assets/images/advantages/hero/advantage-hero-image.png 1366w",
   "sizes": "(max-width: 1366px) 100vw, 1366px"
  },
  "buttons": [
   {
    "label": "Apply Now",
    "href": "/applicationform",
    "variant": "atlas"
   },
   {
    "label": "Schedule a Visit",
    "href": "/campusvisit",
    "variant": "outline"
   },
   {
    "label": "Download Admissions Policy",
    "href": "https://online.fliphtml5.com/vrcjg/orkl/#p=1",
    "variant": "outline",
    "newTab": true
   }
  ]
 },
 "stats": [
  {
   "label": "Located around ATLAS",
   "value": "500+ Companies",
   "background": "#41418e",
   "image": "/assets/images/campus/stats/vector-atlas-1.png",
   "imagePosition": "100% 50%",
   "labelColor": "#5cbdca"
  },
  {
   "label": "Global Faculty",
   "value": "From 10+ Countries",
   "background": "#2e3074",
   "image": "/assets/images/campus/stats/vector-atlas-2.png",
   "imagePosition": "100% 50%",
   "labelColor": "#5cbdca"
  },
  {
   "label": "Multidisciplinary Learning",
   "value": "45+ Electives",
   "background": "#3a3c84",
   "image": "/assets/images/campus/stats/vector-atlas-3.png",
   "imagePosition": "100% 0",
   "labelColor": "#5cbdca"
  }
 ],
 "core": {
  "heading": "ATLAS’s Core Advantages",
  "cardBackground": "/assets/images/advantages/css/cool-shape-vector.png",
  "cards": [
   {
    "title": "Located in the heart of Mumbai’s business district",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img.png",
     "alt": ""
    },
    "text": "With 500+ companies and Mumbai’s business pulse all around Global names like Netflix, Google, Amazon, and Deloitte—opportunity doesn’t knock, it’s already\nnext door."
   },
   {
    "title": "Industry-Led Curriculum",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img-2.png",
     "alt": ""
    },
    "text": "Classes taught by real business leaders. Bridging the gap between academics and the real world through hands-on projects, expert-led sessions, and immersive industry exposure."
   },
   {
    "title": "Entrepreneurial Ecosystem",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img-3.png",
     "alt": ""
    },
    "text": "Launch your venture from day one. \nWe believe college life should be a blend of purpose, play, and personal growth. From taking the stage to leading a cause, from late-night brainstorming to spontaneous celebrations — every experience shapes who you become."
   },
   {
    "title": "Hands-on Learning",
    "image": {
     "src": "/assets/images/advantages/core/hands-on-learning.png",
     "alt": ""
    },
    "rows": [
     {
      "label": "From pitch decks to prototypes."
     },
     {
      "value": "1200+",
      "label": "On Campus Interviews"
     },
     {
      "value": "100+",
      "label": "Where Student Work"
     },
     {
      "value": "50+",
      "label": "Recruiters On Campus"
     }
    ]
   },
   {
    "title": "New Age Tech-led Infrastructure",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img-8.png",
     "alt": ""
    },
    "text": "Boardroom-style classrooms, coworking vibes. Our campus is designed for the future, equipped with advanced multimedia systems to make learning dynamic and engaging."
   },
   {
    "title": "Deeply Student-Centric",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img-6.png",
     "alt": ""
    },
    "text": "Every aspect of the ATLAS ISME experience is designed with the student at its core."
   },
   {
    "title": "Interdisciplinery Electives",
    "image": {
     "src": "/assets/images/advantages/core/7-inter-elec.png",
     "alt": ""
    },
    "text": "Choose from 40+ courses across fields. \nATLAS ISME empowers you to shape your own journey with flexible specializations, dual majors, and personalized career tracks."
   },
   {
    "title": "Career Support\nfrom Day One",
    "image": {
     "src": "/assets/images/advantages/core/7-career-serv.png",
     "alt": ""
    },
    "text": "Placement, Mentorship & Real Outcomes. Research and Development Cell, is a dynamic and vibrant platform within our university that empowers students."
   },
   {
    "title": "Global Exposure",
    "image": {
     "src": "/assets/images/advantages/core/core-bg-img-4.png",
     "alt": ""
    },
    "text": "60+ University MoUs. Study Worldwide.\nWe believe that learning goes beyond borders, which is why we actively immerse students in international experiences that shape their worldviews."
   }
  ]
 },
 "journey": {
  "heading": "The 4 Year Journey to Success",
  "subheading": "At ATLAS, entrepreneurship goes beyond the classroom. Students from design, management, and technology work together through every stage - from ideation and validation to strategy, mentorship, and funding.",
  "cardBackground": "/assets/images/advantages/css/cool-shape-vector.png",
  "cards": [
   {
    "title": "1st Year",
    "image": {
     "src": "/assets/images/advantages/journey/advantages_entrepre-01.png",
     "alt": ""
    },
    "text": "Building an Entrepreneurial Mindset"
   },
   {
    "title": "2nd Year",
    "image": {
     "src": "/assets/images/advantages/journey/advantages_entrepre-02.png",
     "alt": ""
    },
    "text": "Prototyping & Basics of Family Business"
   },
   {
    "title": "3rd Year",
    "image": {
     "src": "/assets/images/advantages/journey/adv-atlas-02.png",
     "alt": ""
    },
    "text": "IP, Advanced FMB & Fundraising"
   },
   {
    "title": "4th Year",
    "image": {
     "src": "/assets/images/advantages/journey/dingdong.png",
     "alt": ""
    },
    "text": "Scaling, Succession Planning in FMB & Leadership"
   }
  ]
 },
 "mumbai": {
  "heading": "Be in the Middle of Mumbai - and Ahead of the Curve",
  "subheading": "Located near BKC, our campus sits right where education meets enterprise. Surrounded by 500+ leading companies, Mumbai’s business pulse is all around you. From casual conversations with professionals to guest lectures and industry visits with names like Netflix, Google, Amazon, and Deloitte opportunity isn’t waiting, it’s right next door.",
  "tabs": [
   {
    "label": "Tech Companies",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631379.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631379-p-500.png 500w, /assets/images/campus/learn/group-1272631379-p-800.png 800w, /assets/images/campus/learn/group-1272631379-p-1080.png 1080w, /assets/images/campus/learn/group-1272631379.png 1242w",
     "sizes": "(max-width: 1242px) 100vw, 1242px"
    }
   },
   {
    "label": "Design Studios",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631380.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631380-p-500.png 500w, /assets/images/campus/learn/group-1272631380-p-800.png 800w, /assets/images/campus/learn/group-1272631380-p-1080.png 1080w, /assets/images/campus/learn/group-1272631380.png 1242w",
     "sizes": "100vw"
    }
   },
   {
    "label": "Legal Firms",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631381.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631381-p-500.png 500w, /assets/images/campus/learn/group-1272631381-p-800.png 800w, /assets/images/campus/learn/group-1272631381-p-1080.png 1080w, /assets/images/campus/learn/group-1272631381.png 1242w",
     "sizes": "100vw"
    }
   },
   {
    "label": "Business & Management",
    "image": {
     "src": "/assets/images/campus/learn/group-1272631382.png",
     "alt": "",
     "srcSet": "/assets/images/campus/learn/group-1272631382-p-500.png 500w, /assets/images/campus/learn/group-1272631382-p-800.png 800w, /assets/images/campus/learn/group-1272631382-p-1080.png 1080w, /assets/images/campus/learn/group-1272631382.png 1242w",
     "sizes": "100vw"
    }
   }
  ]
 },
 "campus": {
  "heading": "A Place to Learn, Grow, Create, and Belong",
  "subheading": "The ATLAS campus combines world-class infrastructure with a spirit of innovation. Situated in Mumbai’s dynamic urban hub, it offers advanced labs, collaborative workspaces, and dedicated facilities for every school. Designed to promote multidisciplinary learning and vibrant campus life, ATLAS provides an environment where creativity, research, and community thrive together.",
  "mosaic": [
   {
    "label": "Learning Spaces",
    "image": "/assets/images/advantages/css/learning-spacescampus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Smart Library",
    "image": "/assets/images/advantages/css/smart-librarycampus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Collaborative Corridors",
    "image": "/assets/images/advantages/css/collaborative-corridorscampus-advantage-section-.png",
    "bgSize": "auto"
   },
   {
    "label": "Open Spaces",
    "image": "/assets/images/advantages/css/frame-1272631461campus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Sport Arenas",
    "image": "/assets/images/advantages/css/sport-arenascampus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Immersive classrooms",
    "image": "/assets/images/advantages/css/immersive-classroomscampus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Hangout Spots",
    "image": "/assets/images/advantages/css/hangout-spotscampus-advantage-section-.png",
    "bgSize": "cover"
   },
   {
    "label": "Technology Labs",
    "image": "/assets/images/advantages/css/technology-labscampus-advantage-section-.png",
    "bgSize": "cover"
   }
  ]
 },
 "multidisciplinary": {
  "heading": "Learn Across Disciplines. \nLead Across Industries.",
  "subheading": "At ATLAS SkillTech University, learning transcends boundaries. Rooted in the vision of NEP 2020, our multidisciplinary and modular framework lets students craft their own academic pathways seamlessly connecting Design, Management, and Technology to develop future-ready skills.",
  "button": {
   "label": "Explore Multidisciplinary in ATLAS",
   "href": "/advantages/atlas-multidisciplinary"
  },
  "cells": [
   {
    "title": "Interdisciplinary",
    "text": "Choose courses that blend design, management \nand technology. Prepare for a future where \ndomains merge with each other more than ever.",
    "background": "#41418e",
    "image": "/assets/images/campus/cards/vector-2-.png",
    "imagePosition": "100% 100%",
    "imageSize": "auto"
   },
   {
    "title": "Multidisciplinary",
    "text": "Explore diverse programs and specialisations across four schools. Participate in events and programs that expand your horizons.",
    "background": "#222269",
    "image": "/assets/images/advantages/css/vector-atlas-4.png",
    "imagePosition": "50% 100%",
    "imageSize": "contain"
   },
   {
    "title": "Modular",
    "text": "Enjoy multiple options with flexibility to \ntailor your pathway - be it electives or \nmajors and minors.",
    "background": "#32326e",
    "image": "/assets/images/advantages/css/vector-1-.png",
    "imagePosition": "100% 0",
    "imageSize": "auto"
   }
  ]
 },
 "electives": {
  "heading": "ATLAS Electives: Design Your Own Learning Journey",
  "subheading": "With 45+ electives inspired by UGC’s Curriculum & Life Skills 2.0 guidelines, ATLAS empowers students to explore beyond boundaries - integrating creative, digital, and professional learning to thrive in the future workplace.",
  "tabs": [
   {
    "label": "Business & Finance",
    "cards": [
     {
      "title": "Trading on Stock Markets - Bear, Bull, and Stag - Level 1",
      "image": {
       "src": "/assets/images/advantages/electives/business7.png",
       "alt": ""
      }
     },
     {
      "title": "\"You\" the Brand: Design Your Identity",
      "image": {
       "src": "/assets/images/advantages/electives/bsuiness5.png",
       "alt": ""
      }
     },
     {
      "title": "Wisdom for Strategic Leadership: Lessonsfrom Indian Verses",
      "image": {
       "src": "/assets/images/advantages/electives/business3.png",
       "alt": ""
      }
     },
     {
      "title": "Ace Your Communication - Key to Success",
      "image": {
       "src": "/assets/images/advantages/electives/business6.png",
       "alt": ""
      }
     },
     {
      "title": "Money in Motion - The Art & Science of Banking",
      "image": {
       "src": "/assets/images/advantages/electives/busienss2.png",
       "alt": ""
      }
     },
     {
      "title": "The Business of Esports: Monetising your passion",
      "image": {
       "src": "/assets/images/advantages/electives/business4.png",
       "alt": ""
      }
     },
     {
      "title": "Strategies for Effective People Management",
      "image": {
       "src": "/assets/images/advantages/electives/business1.png",
       "alt": ""
      }
     },
     {
      "title": "Corporate Hustle - Practice What You Preach",
      "image": {
       "src": "/assets/images/advantages/electives/business8.png",
       "alt": ""
      }
     }
    ]
   },
   {
    "label": "Art & Design",
    "cards": [
     {
      "title": "Craft: The Future of Fashion?",
      "image": {
       "src": "/assets/images/advantages/electives/art08.png",
       "alt": ""
      }
     },
     {
      "title": "Fashion & Films: Relationship between Style & Cinema",
      "image": {
       "src": "/assets/images/advantages/electives/art06.png",
       "alt": ""
      }
     },
     {
      "title": "Material & Fabric - Textile Routes",
      "image": {
       "src": "/assets/images/advantages/electives/art04.png",
       "alt": ""
      }
     },
     {
      "title": "Nautanki Shaala - The Story, The Stage, & the Act",
      "image": {
       "src": "/assets/images/advantages/electives/art07.png",
       "alt": ""
      }
     },
     {
      "title": "Blending Influences in Western Popular Music",
      "image": {
       "src": "/assets/images/advantages/electives/art02.png",
       "alt": ""
      }
     },
     {
      "title": "Interactive Fiction with Role-play & World building",
      "image": {
       "src": "/assets/images/advantages/electives/art05.png",
       "alt": ""
      }
     },
     {
      "title": "Canvas Painting - Flourish Your Imagination",
      "image": {
       "src": "/assets/images/advantages/electives/art01.png",
       "alt": ""
      }
     },
     {
      "title": "Skip the line with Design",
      "image": {
       "src": "/assets/images/advantages/electives/art03.png",
       "alt": ""
      }
     }
    ]
   },
   {
    "label": "Self & Growth",
    "cards": [
     {
      "title": "Managing Change Using Dance and Movements",
      "image": {
       "src": "/assets/images/advantages/electives/sg08.png",
       "alt": ""
      }
     },
     {
      "title": "Cross-Cultural Psychology",
      "image": {
       "src": "/assets/images/advantages/electives/sg06.png",
       "alt": ""
      }
     },
     {
      "title": "Swadharm - Leading Your Life with Authenticity",
      "image": {
       "src": "/assets/images/advantages/electives/sg04.png",
       "alt": ""
      }
     },
     {
      "title": "Blogging Unleashed: Ignite Your Online Presence & Amplify Your Voice",
      "image": {
       "src": "/assets/images/advantages/electives/sg07.png",
       "alt": ""
      }
     },
     {
      "title": "Joy of Emotions: The Art & Science of Emotional Intelligence",
      "image": {
       "src": "/assets/images/advantages/electives/sg02.png",
       "alt": ""
      }
     },
     {
      "title": "Anthropometry: Futuristic Space Designs & Solutions",
      "image": {
       "src": "/assets/images/advantages/electives/sg05.png",
       "alt": ""
      }
     },
     {
      "title": "Swadharm - Leading Your Life with Authenticity",
      "image": {
       "src": "/assets/images/advantages/electives/sg01.png",
       "alt": ""
      }
     },
     {
      "title": "Joy of Emotions: The Art & Science of Emotional Intelligence",
      "image": {
       "src": "/assets/images/advantages/electives/sg03.png",
       "alt": ""
      }
     }
    ]
   },
   {
    "label": "Technology",
    "cards": [
     {
      "title": "Future Forward with AI",
      "image": {
       "src": "/assets/images/advantages/electives/tech02.png",
       "alt": ""
      }
     },
     {
      "title": "Future Forward with AI",
      "image": {
       "src": "/assets/images/advantages/electives/tech01.png",
       "alt": ""
      }
     },
     {
      "title": "CodeQuest: Embark on an Exciting Journey into the World of Coding",
      "image": {
       "src": "/assets/images/advantages/electives/tech04.png",
       "alt": ""
      }
     },
     {
      "title": "Robotics - Robot Rock!",
      "image": {
       "src": "/assets/images/advantages/electives/tech03.png",
       "alt": ""
      }
     }
    ]
   },
   {
    "label": "Languages",
    "cards": [
     {
      "title": "Spanish - Hola España - Level 1",
      "image": {
       "src": "/assets/images/advantages/electives/es.png",
       "alt": ""
      }
     },
     {
      "title": "German - Hallo Deutschland - Level 1",
      "image": {
       "src": "/assets/images/advantages/electives/ge.png",
       "alt": ""
      }
     },
     {
      "title": "French it Up: Bonjour La Ville Lumière - Level 1",
      "image": {
       "src": "/assets/images/advantages/electives/fr.png",
       "alt": ""
      }
     },
     {
      "title": "Mandarin - Level 1",
      "image": {
       "src": "/assets/images/advantages/electives/ch.png",
       "alt": ""
      }
     }
    ]
   }
  ]
 },
 "support": {
  "heading": "Supporting You Every Step of the Way",
  "subheading": "At ATLAS, your growth isn’t just academic - it’s deeply personal. We believe true success is built on a strong foundation of emotional, academic, and social well-being. That’s why we’ve created a comprehensive support system designed around you - to help you navigate new experiences, overcome challenges, and thrive both on campus and beyond.",
  "tabs": [
   {
    "label": "Tailored Support",
    "image": {
     "src": "/assets/images/life/wellness/stud-welf-img-1.webp",
     "alt": "",
     "srcSet": "/assets/images/life/wellness/stud-welf-img-1-p-500.webp 500w, /assets/images/life/wellness/stud-welf-img-1-p-800.webp 800w, /assets/images/life/wellness/stud-welf-img-1-p-1080.webp 1080w, /assets/images/life/wellness/stud-welf-img-1.webp 1238w",
     "sizes": "(max-width: 1238px) 100vw, 1238px"
    },
    "title": "Safe and Confidential Space",
    "text": "Sometimes you just need a moment to breathe. Our Wellness Rooms are calm, confidential, and non-judgmental spaces where students can relax, reflect, or speak to a counsellor in private. These dedicated rooms are designed to provide a sense of comfort and security—because every student deserves a safe space to just be."
   },
   {
    "label": "Wellness Room",
    "image": {
     "src": "/assets/images/advantages/support/group-1272631440.png",
     "alt": "",
     "srcSet": "/assets/images/advantages/support/group-1272631440-p-500.png 500w, /assets/images/advantages/support/group-1272631440-p-800.png 800w, /assets/images/advantages/support/group-1272631440-p-1080.png 1080w, /assets/images/advantages/support/group-1272631440.png 1238w",
     "sizes": "100vw"
    },
    "title": "Guidance When You Need It Most",
    "text": "Get confidential support from trained counsellors to navigate academic pressures, personal challenges, and career decisions. \nHere, you’ll find a listening ear and practical strategies to move forward with confidence."
   },
   {
    "label": "Professional Counselling",
    "image": {
     "src": "/assets/images/life/wellness/group-1272630973.png",
     "alt": "",
     "srcSet": "/assets/images/life/wellness/group-1272630973-p-500.png 500w, /assets/images/life/wellness/group-1272630973-p-800.png 800w, /assets/images/life/wellness/group-1272630973-p-1080.png 1080w, /assets/images/life/wellness/group-1272630973.png 1238w",
     "sizes": "100vw"
    },
    "title": "Your Space to Pause & Recharge",
    "text": "Step into a calming environment designed for reflection, meditation, or simply taking a breath. Our wellness rooms give you a \nquiet escape to reset your mind and return refreshed."
   }
  ]
 },
 "yourdost": {
  "heading": "YourDOST - For your wellness",
  "text": "At ATLAS, your emotional and mental wellbeing matter as much as your academic growth. To support this, we’ve partnered with YourDOST—a confidential platform that gives you access to professional counsellors anytime, anywhere. Whether you’re facing stress, anxiety, academic pressure, or simply need someone to talk to, YourDOST offers a safe and private space to help you through it.",
  "image": {
   "src": "/assets/images/advantages/yourdost/group-1272630606-2.png",
   "alt": "",
   "srcSet": "/assets/images/advantages/yourdost/group-1272630606-2-p-500.png 500w, /assets/images/advantages/yourdost/group-1272630606-2-p-800.png 800w, /assets/images/advantages/yourdost/group-1272630606-2.png 833w",
   "sizes": "(max-width: 833px) 100vw, 833px"
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
 "people": {
  "heading": "Your Support System, Away from Home",
  "subheading": "Whether you’re new to Mumbai or call it home, we’re here to guide, care, and listen",
  "people": [
   {
    "image": {
     "src": "/assets/images/advantages/people/bhargavi-deshpande1.png",
     "alt": ""
    },
    "name": "Bhargavi Deshpande",
    "role": "Senior Director - Student Experience"
   },
   {
    "image": {
     "src": "/assets/images/advantages/people/campus-23.png",
     "alt": ""
    },
    "name": "Sheetal Dogra",
    "role": "Senior Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/advantages/people/isdi-5-1.png",
     "alt": ""
    },
    "name": "Priyatama Gharat",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/advantages/people/campus11.png",
     "alt": ""
    },
    "name": "Vaishali Sharma",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/advantages/people/campus10.png",
     "alt": ""
    },
    "name": "Asha Ajgaonkar",
    "role": "Student Advisor"
   },
   {
    "image": {
     "src": "/assets/images/advantages/people/campus12.png",
     "alt": ""
    },
    "name": "Monika Lunia",
    "role": "Student Advisor"
   }
  ]
 },
 "global": {
  "heading": "Learning Without Borders",
  "subheading": "At ATLAS, learning knows no borders. Through global university partnerships, cross-cultural immersions, and masterclasses with international faculty, students gain real-world exposure to global business and diverse perspectives that shape their worldview.",
  "button": {
   "label": "Explore Internationalisation in ATLAS",
   "href": "/advantages/atlas-internationalisation"
  },
  "embed": "https://www.youtube.com/embed/B5ENrLeMzQw?rel=0&controls=1&autoplay=1&mute=1&start=0",
  "cards": [
   {
    "image": {
     "src": "/assets/images/advantages/global/globalimmersion.png",
     "alt": ""
    },
    "title": "Global Immersions",
    "text": "Short-term international experiences that expose students to global industries, cultures, and business practices.",
    "badge": {
     "src": "/assets/icons/arrow-downward.svg",
     "alt": ""
    },
    "background": "#41418e",
    "backgroundImage": "/assets/images/campus/cards/incub-bg-1.png",
    "backgroundPosition": "50% 100%"
   },
   {
    "image": {
     "src": "/assets/images/advantages/global/image-1362.png",
     "alt": ""
    },
    "title": "Summer Programs",
    "text": "Intensive global programs offering hands-on learning, cultural exchange, and academic credits during summer breaks.",
    "badge": {
     "src": "/assets/icons/arrow-downward.svg",
     "alt": ""
    },
    "background": "#41418e",
    "backgroundImage": "/assets/images/campus/cards/vector-2-.png",
    "backgroundPosition": "50% 100%"
   },
   {
    "image": {
     "src": "/assets/images/advantages/global/mastersprogression.png",
     "alt": ""
    },
    "title": "Master’s Progression",
    "text": "Seamless academic pathways that allow students to pursue postgraduate studies at top international universities.",
    "badge": {
     "src": "/assets/icons/arrow-downward.svg",
     "alt": ""
    },
    "background": "#41418e",
    "backgroundImage": "/assets/images/campus/cards/incub-bg-1.png",
    "backgroundPosition": "50% 100%"
   }
  ]
 },
 "industry": {
  "heading": "Strongly Industry Oriented",
  "subheading": "ATLAS bridges academia and industry through real-world projects, mentorships, and collaborations ensuring every student graduates with practical experience, professional confidence, and future-ready skills.",
  "button": {
   "label": "Explore Industry in ATLAS",
   "href": "/advantages/atlas-industry-centric-approach"
  },
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
  ],
  "gallery": [
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-pro-6.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Masterclasses",
    "caption": ""
   },
   {
    "image": {
     "src": "/assets/images/success/students/patt.png",
     "alt": ""
    },
    "rounded": false
   },
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-pro-5.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Bootcamps",
    "caption": ""
   },
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-pro-4.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Industry Projects",
    "caption": ""
   },
   {
    "image": {
     "src": "/assets/images/success/students/patt.png",
     "alt": ""
    },
    "rounded": false
   },
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-peo-3.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Mentorship Projects",
    "caption": ""
   },
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-pro-2.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Industry-led Events",
    "caption": ""
   },
   {
    "image": {
     "src": "/assets/images/advantages/industry/capstone-project.png",
     "alt": ""
    },
    "rounded": false,
    "name": "Capstone Projects",
    "caption": ""
   }
  ]
 },
 "entrepreneurship": {
  "heading": "Entrepreneurship at ATLAS",
  "subheading": "At ATLAS, entrepreneurship isn’t an elective — it’s a mindset. Through incubators, mentorship, and hands-on venture labs, students learn to identify opportunities, build scalable ideas, and turn innovation into impact.",
  "button": {
   "label": "Explore Entrepreneurship in ATLAS",
   "href": "/advantages/atlas-enterprenurship"
  },
  "embed": "https://www.youtube.com/embed/B5ENrLeMzQw?rel=0&controls=1&autoplay=1&mute=1&start=0"
 },
 "research": {
  "heading": "A Culture of Inquiry and Innovation",
  "subheading": "At ATLAS, research goes beyond theory - it’s about solving real problems. From faculty-led studies to student-driven projects, our center of research foster innovation across design, technology, management, and law to shape meaningful change.",
  "text": "The Center for Research brings together scholars, experts, and students from various disciplines to push the boundaries of knowledge and inspire transformative change. Our focus is on conducting cutting-edge research, developing groundbreaking technologies, and implementing forward-thinking initiatives to address society's challenges.\n\nWe foster interdisciplinary collaboration, where diverse perspectives drive innovation. Our environment encourages exploration and empowers researchers and students to push the boundaries of knowledge. Through hands-on projects, industry partnerships, and community initiatives, our interdisciplinary programs prepare students to become future-ready leaders creating meaningful impact.",
  "image": {
   "src": "/assets/images/advantages/research/image-1253.png",
   "alt": "",
   "srcSet": "/assets/images/advantages/research/image-1253-p-500.png 500w, /assets/images/advantages/research/image-1253.png 688w",
   "sizes": "(max-width: 688px) 100vw, 688px"
  }
 },
 "faq": {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
   {
    "q": "What is ATLAS University known for?",
    "a": [
     "ATLAS University is renowned for its experiential learning model that seamlessly blends academic knowledge with real-world exposure. It stands out for its strong industry integration, global collaborations and future-focused education in areas like design, business and skill development. The university is committed to preparing students for success in an ever-changing world."
    ]
   },
   {
    "q": "What are the benefits of a university education?",
    "a": [
     "A university education helps develop critical thinking, real-world skills and professional confidence. It offers structured learning, industry exposure, peer collaboration and long-term career opportunities, ensuring that students gain much more than just academic knowledge."
    ]
   },
   {
    "q": "Is ATLAS University recognised in India?",
    "a": [
     "Yes, ATLAS SkillTech University is a recognised private university in India, established under the Maharashtra State Private University Act. The university offers multidisciplinary programs across design, management, technology and law, with a strong focus on experiential learning, innovation and industry integration."
    ]
   },
   {
    "q": "Why is university education so important?",
    "a": [
     "University education plays a key role in shaping how students think, solve problems and adapt to change. It prepares learners not only for jobs but for long-term careers by equipping them with skills, industry exposure and networks that will help them thrive in a rapidly evolving job market."
    ]
   },
   {
    "q": "What are the advantages of online education?",
    "a": [
     "Online education offers flexibility, accessibility and opportunities for continuous learning. It enables learners to access quality education from anywhere while developing digital collaboration and self-management skills. The effectiveness of online learning is enhanced when combined with practical experiences and industry engagement."
    ]
   },
   {
    "q": "What is the best thing about university?",
    "a": [
     "The best thing about university is the balance between academic learning and real-world experience. Students not only gain knowledge but also practical exposure, independence and the opportunity to discover their strengths in a real-world context, which prepares them for future challenges."
    ]
   },
   {
    "q": "What is ATLAS SkillTech University known for?",
    "a": [
     "ATLAS SkillTech University is known for its multidisciplinary, industry-integrated approach to education. Through its schools of Design, Management, Technology and Law, the university combines experiential learning, global exposure, entrepreneurship and innovation to prepare students for future careers and leadership roles."
    ]
   },
   {
    "q": "Why do you want to join ATLAS SkillTech University?",
    "a": [
     "Students choose ATLAS SkillTech University for its strong emphasis on applied skills, industry mentorship and career relevance. The university’s experiential learning model equips students to be job-ready, adaptable and future-focused, ensuring they can thrive in their chosen careers."
    ]
   },
   {
    "q": "What are the advantages of university education?",
    "a": [
     "University education offers students the opportunity to develop academic depth, professional skills and personal growth. It also provides access to mentors, industry exposure and opportunities that shape long-term success. Universities like ATLAS University prepare students for the dynamic workforce and the challenges of tomorrow."
    ]
   }
  ]
 }
};

export default advantagesContent;
