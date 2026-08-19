/**
 * Copy and assets for /advantages/atlas-multidisciplinary, transcribed 1:1 from
 * `reference/advantages/atlas-multidisciplinary.php` — the sixth Advantages
 * page and the ninth distinct Webflow stylesheet
 * (`…690da3f19d4bbf0f28096449-f8f617445.css`).
 *
 * Every asset path is local. 61 assets, all from the Webflow CDN: 10 new under
 * `public/assets/images/multidisciplinary/<section>/` and 51 already present —
 * every elective photograph is one /advantages/atlas-advantages already
 * downloaded, and the closing banner reuses /advantages/atlas-career-services'.
 * Each reuse was confirmed byte-identical by SHA-1, not by filename.
 *
 * Five backgrounds are painted only by the stylesheet — the three
 * `.head-top-card.atlas-bg-N` washes and the two `.css-content-wrapper`
 * washes — so they travel as data on `stats[]` and `advantage.cards[]`.
 *
 * `<br>` in the source is transcribed as `\n` and turned back into a `<br>` by
 * `lib/withBreaks`.
 */

export const meta = {
  "title": "Interdisciplinary Studies & Multidisciplinary Learning in Mumbai  – ATLAS SkillTech University",
  "description": "Discover multidisciplinary courses that combine design, tech and business to build flexible career skills, cross-domain thinking and collaborative problem solving."
};

export const hero = {
  "title": "Where Design, Technology, Business, & Law Converge",
  "text": "Empowering every student to imagine, collaborate, and create with impact.",
  "image": {
    "src": "/assets/images/multidisciplinary/hero/heroimage-1.png",
    "alt": "",
    "srcSet": "/assets/images/multidisciplinary/hero/heroimage-1-p-500.png 500w, /assets/images/multidisciplinary/hero/heroimage-1-p-800.png 800w, /assets/images/multidisciplinary/hero/heroimage-1-p-1080.png 1080w, /assets/images/multidisciplinary/hero/heroimage-1.png 1365w",
    "sizes": "(max-width: 1365px) 100vw, 1365px"
  }
};

export const stats = [
  {
    "label": "Specialisations",
    "value": "20+",
    "background": "#41418e",
    "image": "/assets/images/campus/stats/vector-atlas-1.png",
    "imagePosition": "100%"
  },
  {
    "label": "Electives",
    "value": "45+",
    "background": "#2e3074",
    "image": "/assets/images/campus/stats/vector-atlas-2.png",
    "imagePosition": "100%"
  },
  {
    "label": "Collaboration spaces",
    "value": "50+",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  }
];

export const advantage = {
  "heading": "The ATLAS Advantage: Redefining Education for a New Era",
  "subheading": "At ATLAS SkillTech University, learning goes beyond conventional disciplines. Guided by NEP 2020, our multidisciplinary, interdisciplinary, and modular approach empowers students to design their own academic journeys - blending Design, Management, and Technology to build future-ready skills.",
  "cards": [
    {
      "title": "Multidisciplinary",
      "text": "Explore diverse programs and specialisations across four schools. Participate in events and programs that expand your horizons.",
      "image": {
        "src": "/assets/images/multidisciplinary/advantage/image-1325-multidisciplinary-advantage-atlas-3-points.png",
        "alt": ""
      },
      "background": "#41418e",
      "backgroundImage": "/assets/images/campus/cards/incub-bg-1.png",
      "backgroundPosition": "50% 100%"
    },
    {
      "title": "Interdisciplinary",
      "text": "Choose courses that blend design, management and technology. Prepare for a future where domains merge with each other more than ever.",
      "image": {
        "src": "/assets/images/multidisciplinary/advantage/image-1326-multidisciplinary-advantage-atlas-3-points.png",
        "alt": ""
      },
      "background": "#41418e",
      "backgroundImage": "/assets/images/campus/cards/vector-2-.png",
      "backgroundPosition": "50% 100%"
    },
    {
      "title": "Modular",
      "text": "Enjoy multiple options with flexibility to tailor your pathway - be it electives or majors and minors.",
      "image": {
        "src": "/assets/images/multidisciplinary/advantage/image-1327-multidisciplinary-advantage-atlas-3-points.png",
        "alt": ""
      },
      "background": "#41418e",
      "backgroundImage": "/assets/images/campus/cards/incub-bg-1.png",
      "backgroundPosition": "50% 100%"
    }
  ]
};

export const electives = {
  "heading": "ATLAS Electives: Design Your Own Learning Journey",
  "subheading": "ATLAS offers over 45+ electives, aligned with UGC’s Curriculum & Life Skills 2.0 guidelines. Students can go beyond their primary disciplines - building creative, digital, and professional capabilities that prepare them for a rapidly evolving workplace.",
  "tabs": [
    {
      "label": "Business & Finance",
      "cards": [
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/advantages/electives/bsuiness5.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/advantages/electives/busienss2.png",
            "alt": ""
          }
        },
        {
          "title": "Power and Politics – The Great Game",
          "image": {
            "src": "/assets/images/advantages/electives/business1.png",
            "alt": ""
          }
        },
        {
          "title": "Power and Politics – The Great Game",
          "image": {
            "src": "/assets/images/advantages/electives/business3.png",
            "alt": ""
          }
        },
        {
          "title": "Integrated Storytelling for Digital Marketing",
          "image": {
            "src": "/assets/images/advantages/electives/business6.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/advantages/electives/business8.png",
            "alt": ""
          }
        },
        {
          "title": "Trading on Stock Markets - Bear, Bull, and Stag - Level 1",
          "image": {
            "src": "/assets/images/advantages/electives/business7.png",
            "alt": ""
          }
        },
        {
          "title": "The Business of Esports: Monetising your passion",
          "image": {
            "src": "/assets/images/advantages/electives/business4.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "Art & Design",
      "cards": [
        {
          "title": "Canvas Painting:Flourish Your Imagination",
          "image": {
            "src": "/assets/images/advantages/electives/art01.png",
            "alt": ""
          }
        },
        {
          "title": "Pop Music and You: Sophisticated Listener",
          "image": {
            "src": "/assets/images/advantages/electives/art02.png",
            "alt": ""
          }
        },
        {
          "title": "Art with Words: Calligraphy Calling",
          "image": {
            "src": "/assets/images/advantages/electives/art03.png",
            "alt": ""
          }
        },
        {
          "title": "Kaat Chap:Create Your Own Design",
          "image": {
            "src": "/assets/images/advantages/electives/art04.png",
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
          "title": "Nautanki Shaala: The Story, The Stage, & the Act",
          "image": {
            "src": "/assets/images/advantages/electives/art07.png",
            "alt": ""
          }
        },
        {
          "title": "Unleash Your Creativity: Designing is Fun",
          "image": {
            "src": "/assets/images/advantages/electives/art05.png",
            "alt": ""
          }
        },
        {
          "title": "Cinema of the World:A Kaleidoscope",
          "image": {
            "src": "/assets/images/advantages/electives/art08.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "Self & Growth",
      "cards": [
        {
          "title": "Behaviour Sciencein Action",
          "image": {
            "src": "/assets/images/advantages/electives/sg01.png",
            "alt": ""
          }
        },
        {
          "title": "Innovative Thinking:Learning from Ancient Indian Mythological Tales",
          "image": {
            "src": "/assets/images/advantages/electives/sg02.png",
            "alt": ""
          }
        },
        {
          "title": "Ace Your Communication:Key to Success",
          "image": {
            "src": "/assets/images/advantages/electives/sg03.png",
            "alt": ""
          }
        },
        {
          "title": "Cosmic Insights:The Art of Astrology, Numerology and Vastu",
          "image": {
            "src": "/assets/images/advantages/electives/sg04.png",
            "alt": ""
          }
        },
        {
          "title": "Reimagining Dharavi:Urban Planning for Sustainable Futures",
          "image": {
            "src": "/assets/images/advantages/electives/sg05.png",
            "alt": ""
          }
        },
        {
          "title": "Managing Change Using Dance and Movements",
          "image": {
            "src": "/assets/images/advantages/electives/sg08.png",
            "alt": ""
          }
        },
        {
          "title": "Empathetic Leadership: Strategies for Effective People Management",
          "image": {
            "src": "/assets/images/advantages/electives/sg06.png",
            "alt": ""
          }
        },
        {
          "title": "Blogging Unleashed:Ignite Your Online Presence & Amplify Your Voice",
          "image": {
            "src": "/assets/images/advantages/electives/sg07.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "Technology",
      "cards": [
        {
          "title": "Blockchain Foundations: The Dawn of Decentralization",
          "image": {
            "src": "/assets/images/advantages/electives/tech04.png",
            "alt": ""
          }
        },
        {
          "title": "The AI Genesis: Fundamentals of Smart Systems",
          "image": {
            "src": "/assets/images/advantages/electives/tech01.png",
            "alt": ""
          }
        },
        {
          "title": "Interactive Fiction with Roleplay & Worldbuilding",
          "image": {
            "src": "/assets/images/advantages/electives/tech03.png",
            "alt": ""
          }
        },
        {
          "title": "Prototyping – Hands On Minds On!",
          "image": {
            "src": "/assets/images/advantages/electives/tech02.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        }
      ]
    },
    {
      "label": "Languages",
      "cards": [
        {
          "title": "Mandarin:How to Nǐ Hǎo",
          "image": {
            "src": "/assets/images/advantages/electives/ch.png",
            "alt": ""
          }
        },
        {
          "title": "Spanish:Hola España",
          "image": {
            "src": "/assets/images/advantages/electives/es.png",
            "alt": ""
          }
        },
        {
          "title": "French It Up:Bonjour La Ville Lumière",
          "image": {
            "src": "/assets/images/advantages/electives/fr.png",
            "alt": ""
          }
        },
        {
          "title": "German:Hallo Deutschland",
          "image": {
            "src": "/assets/images/advantages/electives/ge.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        },
        {
          "title": "Graphic\nDesign",
          "image": {
            "src": "/assets/images/multidisciplinary/electives/cp-brand-and-communication-strategist.png",
            "alt": ""
          }
        }
      ]
    }
  ]
};

export const collaborate = {
  "heading": "Collaborate. Co-Create. Cross Boundaries",
  "subheading": "At ATLAS, students engage in cross-disciplinary projects spanning business analytics, product design, AI, and entrepreneurship, fostering versatility and adaptability to approach challenges from multiple perspectives and deliver integrated solutions.",
  "videos": [
    {
      "title": "Gandhi: The Musical",
      "embed": "https://www.youtube.com/embed/m_JSvANmmUc?rel=0&controls=1&autoplay=1&mute=1&start=0"
    },
    {
      "title": "Illenium College Fest",
      "embed": "https://www.youtube.com/embed/0b9cYwe1ajM?rel=0&controls=1&autoplay=1&mute=1&start=0"
    }
  ]
};

export const spaces = {
  "heading": "Collaborative Spaces",
  "subheading": "Designed for collaboration and creativity",
  "button": {
    "href": "/campus-atlas",
    "label": "Explore Campus"
  },
  "slides": [
    {
      "title": "Immersive modern Classes",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/immersiveatlassimg.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/immersiveatlassimg-p-500.png 500w, /assets/images/campus/studios/immersiveatlassimg.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "3D Printing Labs",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/3dprintinglabsatlass.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/3dprintinglabsatlass-p-500.png 500w, /assets/images/campus/studios/3dprintinglabsatlass.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "Animation Studio",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/animationstudioatlass.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/animationstudioatlass-p-500.png 500w, /assets/images/campus/studios/animationstudioatlass.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "Collaboration Spaces",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/collaborationspacesatlasss.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/collaborationspacesatlasss-p-500.png 500w, /assets/images/campus/studios/collaborationspacesatlasss.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "Atmanirbhar Bharat Center of Design",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/atmanirbharatlassss.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/atmanirbharatlassss-p-500.png 500w, /assets/images/campus/studios/atmanirbharatlassss.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "Rapid Prototyping Lab",
      "bold": false,
      "image": {
        "src": "/assets/images/campus/studios/designatlasss.png",
        "alt": "",
        "srcSet": "/assets/images/campus/studios/designatlasss-p-500.png 500w, /assets/images/campus/studios/designatlasss.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    },
    {
      "title": "Tech-Led Classrooms",
      "bold": false,
      "image": {
        "src": "/assets/images/multidisciplinary/spaces/techledatlass.png",
        "alt": "",
        "srcSet": "/assets/images/multidisciplinary/spaces/techledatlass-p-500.png 500w, /assets/images/multidisciplinary/spaces/techledatlass.png 790w",
        "sizes": "(max-width: 790px) 100vw, 790px"
      }
    }
  ]
};

export const banner = {
  "heading": "One University. Infinite Possibilities.",
  "subheading": "Break Barriers. Blend disciplines. Build the skills to thrive in an ever-evolving global landscape.",
  "buttons": [
    {
      "label": "Apply Now",
      "href": "/applicationform"
    },
    {
      "label": "Schedule a Visit",
      "href": "/campusvisit"
    }
  ],
  "image": {
    "src": "/assets/images/career-services/collaborate/atlas-bright-img-1.webp",
    "alt": "",
    "srcSet": "/assets/images/career-services/collaborate/atlas-bright-img-1-p-500.webp 500w, /assets/images/career-services/collaborate/atlas-bright-img-1.webp 654w",
    "sizes": "100vw"
  }
};

export const faq = {
  "heading": "Questions? We can read your mind",
  "arrow": "/assets/icons/atlas-down-arrow.svg",
  "items": [
    {
      "q": "What are the advantages of a multidisciplinary approach?",
      "a": [
        "A multidisciplinary approach at ATLAS University allows students to learn across diverse fields, breaking away from siloed learning. This approach fosters broader thinking, adaptability and the ability to solve complex, real-world problems by integrating multiple perspectives."
      ]
    },
    {
      "q": "What is the advantage of multidisciplinary research?",
      "a": [
        "Multidisciplinary research brings together perspectives from different fields to address complex challenges more effectively. By combining diverse expertise, it encourages innovation, collaboration and practical solutions that create greater impact across industries and society."
      ]
    },
    {
      "q": "What are the benefits of multidisciplinary learning?",
      "a": [
        "Multidisciplinary learning helps students connect ideas from different subjects and apply them in real-world settings. This learning model prepares students for dynamic careers, where cross-domain skills are essential for success in today’s evolving job market."
      ]
    },
    {
      "q": "What are the advantages of an interdisciplinary approach?",
      "a": [
        "An interdisciplinary approach promotes collaboration, creative thinking and problem-solving. It encourages students to integrate knowledge from different fields to tackle real-world challenges more effectively, preparing them for complex, future-focused roles."
      ]
    },
    {
      "q": "What's the biggest advantage of an interdisciplinary studies degree?",
      "a": [
        "One of the biggest advantages of an interdisciplinary education is the ability to combine knowledge from multiple domains. At ATLAS, students can integrate perspectives from design, management and technology, developing versatile skills that prepare them for emerging careers and complex real-world challenges."
      ]
    },
    {
      "q": "What are interdisciplinary programs?",
      "a": [
        "Interdisciplinary programs at ATLAS University combine subjects from multiple fields into one cohesive curriculum. These programs allow students to explore, integrate and apply knowledge across disciplines, rather than studying them separately, ensuring a comprehensive learning experience."
      ]
    },
    {
      "q": "What is an example of interdisciplinary learning?",
      "a": [
        "An example of interdisciplinary learning is combining design, technology and business strategy within a single project. This mirrors the collaborative nature of real-world industries, where professionals from various fields work together to solve complex challenges."
      ]
    },
    {
      "q": "What is an example of an interdisciplinary project?",
      "a": [
        "An interdisciplinary project at ATLAS University could involve designing a product by integrating user research, engineering principles, branding and market strategy. Such projects encourage collaboration across multiple skill sets, providing students with a holistic learning experience."
      ]
    },
    {
      "q": "What is the purpose of interdisciplinary studies?",
      "a": [
        "The purpose of interdisciplinary studies is to prepare students for real-world challenges that require a broad, integrated approach. It helps students think beyond traditional academic boundaries, developing future-ready capabilities to tackle complex problems in various industries."
      ]
    },
    {
      "q": "What is meant by modular programming?",
      "a": [
        "Modular learning at ATLAS SkillTech University refers to a flexible academic framework that allows students to personalise their educational journey through electives, majors and minors. This approach enables learners to explore interests across disciplines while building a unique combination of skills aligned with their academic and career goals."
      ]
    },
    {
      "q": "What is a modular example?",
      "a": [
        "A modular example at ATLAS University could involve selecting electives from design, technology and management within a single program. Each module focuses on developing a specific skill, while together, they contribute to a broader, customised learning experience aligned with industry needs."
      ]
    }
  ]
};

export const multidisciplinaryContent = {
  meta,
  hero,
  stats,
  advantage,
  electives,
  collaborate,
  spaces,
  banner,
  faq,
};
