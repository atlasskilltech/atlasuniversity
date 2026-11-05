/**
 * School of Law — Integrated BBA LL.B. (Hons.) — reference/law/program-page-law.php (+ the FAQ its
 * assets/include/faq/lawfaq2.php renders from a PHP array, read off production), transcribed 1:1 by the
 * scratchpad's lu/gen_law_prog.py. Every image is the local copy of the CDN file the reference names.
 *
 * "View Brochure" is the reference's own CRM widget popup: `[data-id="law"]` opens #law-popup-overlay,
 * a 580px panel holding `<script src="crm.atlasskilltech.app/widgets/6a3e7d3ba1fd0680c6c1ba90/embed.js"
 * data-atlas-width="100%" data-atlas-height="621">` — the same widget id /programs/programs-list-integrated
 * and /programs/ug/programs-list-law-and-policy use (there as an iframe). The click handler also injects
 * NoPaperForms' emwgts.js, which has no `.npf_wgts` to fill on this page; that dead load is not reproduced.
 *
 * Fees and dates on this page — "Application Fee: ₹3,500" and "the enrolment fee of ₹50,000 … is
 * Nonrefundable" — are what the map's fee extraction reads (the eligibility band's points). The Fee
 * Structure button deep-links to the Law admissions page's #fee-structure-law.
 */

export const meta = {
 "title": "BBA Law Program in Mumbai – ATLAS Law",
 "description": "Want business + law skills? Discover legal studies, business training, professional skills and career opportunities."
};

export const hero = {
 "title": "Integrated BBA LL.B. (Hons.)",
 "image": {
  "src": "/assets/images/schools/law/home/bba-llb-img.webp",
  "alt": "",
  "srcSet": "/assets/images/schools/law/home/bba-llb-img-p-500.webp 500w, /assets/images/schools/law/home/bba-llb-img-p-800.webp 800w, /assets/images/schools/law/home/bba-llb-img-p-1080.webp 1080w, /assets/images/schools/law/home/bba-llb-img.webp 1367w",
  "sizes": "(max-width: 1367px) 100vw, 1367px"
 },
 "text": "BBA | Full-time | 5 years",
 "buttons": [
  {
   "label": "Apply for July 2027 Intake",
   "href": "https://atlasuniversity.edu.in/applicationform",
   "primary": true,
   "variant": "law"
  },
  {
   "label": "View Brochure",
   "primary": true,
   "variant": "law",
   "brochure": {
    "title": "BBA LL.B. (Hons.) brochure request",
    "kind": "script",
    "src": "https://crm.atlasskilltech.app/widgets/6a3e7d3ba1fd0680c6c1ba90/embed.js",
    "scriptAttrs": {
     "data-atlas-width": "100%",
     "data-atlas-height": "621"
    }
   }
  }
 ],
 "textTone": "law"
};

export const stats = [
 {
  "label": "Next Cohort",
  "value": "July 2027",
  "background": "#271f30",
  "image": "/assets/images/schools/law/program/law-card-bg-1.png",
  "imagePosition": "100%",
  "labelColor": "#cb5827"
 },
 {
  "label": "Format",
  "value": "5 Years, Full time",
  "background": "#150c1e",
  "image": "/assets/images/schools/law/program/law-card-bg-2.png",
  "imagePosition": "100%",
  "labelColor": "#cb5827"
 }
];

export const story = {
 "heading": "What is a BBA LL.B. (Hons.) degree?",
 "text": [
  "ATLAS offers a new-age law degree for future-ready professionals who understand that law, business, and technology are now inseparable.The program combines a ",
  {
   "b": [
    "practice-driven curriculum with moot courts, legal-tech clinics, and real-world projects"
   ]
  },
  ", ensuring students are prepared for the digital-first legal landscape.",
  {
   "br": true
  },
  {
   "br": true
  },
  "Alongside core legal subjects, students explore business electives in Marketing, Finance, Entrepreneurship, Business Analytics, and AI, gaining a multidimensional perspective. Specialisations in Constitutional Law, Business Law, Crimes & Criminology, and Intellectual Property Rights allow each student to tailor their path."
 ],
 "image": {
  "src": "/assets/images/schools/law/program/ba-llb-about.webp",
  "alt": "",
  "srcSet": "/assets/images/schools/law/program/ba-llb-about-p-500.webp 500w, /assets/images/schools/law/program/ba-llb-about-p-800.webp 800w, /assets/images/schools/law/program/ba-llb-about.webp 1000w",
  "sizes": "(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
 },
 "button": {
  "label": "Apply for July 2027 Intake",
  "href": "https://atlasuniversity.edu.in/applicationform",
  "primary": true,
  "variant": "law"
 }
};

export const ways = {
 "heading": "ATLAS BBA LLB: 5 ways it gives you the edge",
 "cards": [
  {
   "num": "01",
   "title": "Technology-Enabled Legal Education",
   "text": "ATLAS integrates digital tools, analytics, and virtual simulations into legal training. Students gain familiarity with legal tech, AI in law, cyber laws, and digital contracts—equipping them for the modern, tech-driven legal ecosystem.",
   "image": {
    "src": "/assets/images/schools/law/program/indus.png",
    "alt": "",
    "srcSet": "/assets/images/schools/law/program/indus-p-500.png 500w, /assets/images/schools/law/program/indus.png 683w",
    "sizes": "(max-width: 683px) 100vw, 683px"
   },
   "flip": false
  },
  {
   "num": "02",
   "title": "Experiential & Immersive Learning",
   "text": "Gain first-hand exposure to real-world practice through moot courts, case studies, simulations, on-ground visits, legal-tech clinics and real world projects - helping you think critically, act creatively, and solve complex challenges with confidence.",
   "image": {
    "src": "/assets/images/schools/law/program/2-exp.png",
    "alt": "",
    "srcSet": "/assets/images/schools/law/program/2-exp-p-500.png 500w, /assets/images/schools/law/program/2-exp.png 683w",
    "sizes": "(max-width: 683px) 100vw, 683px"
   },
   "flip": true
  },
  {
   "num": "03",
   "title": "Full-time, Experienced Faculty Members",
   "text": "Gain first-hand exposure to real-world practice through case studies, simulations, on-ground visits, and interactive projects — helping you think critically, act creatively, and solve complex challenges with confidence.",
   "image": {
    "src": "/assets/images/schools/law/program/teach.png",
    "alt": "",
    "srcSet": "/assets/images/schools/law/program/teach-p-500.png 500w, /assets/images/schools/law/program/teach.png 683w",
    "sizes": "(max-width: 683px) 100vw, 683px"
   },
   "flip": false
  },
  {
   "num": "04",
   "title": "Masterclasses by Industry Stalwarts",
   "text": "Gain first-hand insights into how companies operate—through factory floors, boardrooms, innovation labs, and on-ground visits",
   "image": {
    "src": "/assets/images/schools/law/program/4-master.png",
    "alt": "",
    "srcSet": "/assets/images/schools/law/program/4-master-p-500.png 500w, /assets/images/schools/law/program/4-master.png 684w",
    "sizes": "(max-width: 683px) 100vw, 683px"
   },
   "flip": true
  },
  {
   "num": "05",
   "title": "Specialised Legal Tracks",
   "text": "Tailor your degree to your interests by choosing from focused tracks in Constitutional Law, Business Law, Crime & Criminology, and Intellectual Property Law — building deep expertise in the area that defines your career path.",
   "image": {
    "src": "/assets/images/schools/law/program/legal.png",
    "alt": "",
    "srcSet": "/assets/images/schools/law/program/legal-p-500.png 500w, /assets/images/schools/law/program/legal.png 683w",
    "sizes": "(max-width: 683px) 100vw, 683px"
   },
   "flip": false
  }
 ]
};

export const voices = {
 "heading": "What it’s like being at ATLAS",
 "sub": "Hear from our students",
 "button": {
  "label": "Apply for July 2027 Intake",
  "href": "https://atlasuniversity.edu.in/applicationform",
  "variant": "law"
 },
 "cards": [
  {
   "image": {
    "src": "/assets/images/schools/law/program/image-law-program-page-testimonials-01-02-1.png",
    "alt": ""
   },
   "text": "At ATLAS, we’re not just learning from books, we get to work on real challenges that actually make a difference.",
   "quoteIcon": "/assets/images/schools/law/program/quote-law.svg",
   "stname": "Eshan Thakur",
   "name": "3rd Year\nBBA Student"
  },
  {
   "image": {
    "src": "/assets/images/schools/law/program/image-law-program-page-testimonials-01-02.png",
    "alt": ""
   },
   "text": "It feels like running our own little company sometimes.That hands-on experience is what makes being here so exciting.",
   "quoteIcon": "/assets/images/schools/law/program/quote-law.svg",
   "stname": "Mahafrin Deboo",
   "name": "3rd Year\nBBA Student"
  }
 ]
};

export const ladder = {
 "heading": "Academic Laddering",
 "sub": "From Discovery to Leadership",
 "cards": [
  {
   "year": "Year 1",
   "stage": "Discover",
   "points": "Communication Skills\nLegal Writing",
   "title": "Focus Areas",
   "text": "Legal foundations: Contracts, Torts, Constitution, Family Law\n\nBusiness Basics: Management, marketing, Finance, Behavioural Psychology, Communication & Legal Reasoning"
  },
  {
   "year": "Year 2",
   "stage": "Explore",
   "points": "Field Internship I",
   "title": "Focus Areas",
   "text": "Deeper Legal Study: Special Contracts, ADR, Constitution II, BNSS & BNS (CrPC & IPC)\n\nBusiness Strategy & Electives: Choose from Marketing, Finance, Entrepreneurship, Analytics"
  },
  {
   "year": "Year 3",
   "stage": "Engage",
   "points": "Focus Areas",
   "title": "Focus Areas",
   "text": "Business Law in Practice: Company Law, Civil Procedure, Administrative Law, Human Rights, Professional Ethics\n\nAdvanced Business Electives"
  },
  {
   "year": "Year 4",
   "stage": "Apply",
   "points": "Field Internship III",
   "title": "Focus Areas",
   "text": "Evidence, Taxation Law, Labour Law, Drafting & Conveyancing\n\nBegin Specialisation Track in Year 4, Semester 1"
  },
  {
   "year": "Year 5",
   "stage": "Lead",
   "points": "Field Internship\nDissertation\nMoot Court",
   "title": "Focus Areas",
   "text": "Property Law, Environmental Law, Labour Law II, Moot Court, Dissertation\n\nContinue Specialisation Track culminating in capstone legal projects"
  }
 ]
};

export const curriculum = {
 "heading": "ATLAS BBA LL.B. (Hons.) Curriculum",
 "sub": "Where rigorous legal training meets real-world practice and innovation.\nPlease note: The curriculum will constantly evolve in response to the feedback from all stakeholders",
 "years": [
  {
   "label": "Year 1",
   "semesters": [
    {
     "title": "Semester 1",
     "subtitle": "Build Strong Foundations in Law & Business",
     "text": "The first semester builds a multidisciplinary base across management, finance, psychology and law. Students develop analytical, communication and reasoning skills through exposure to both business and legal principles, preparing them for informed decision-making in dynamic environments.",
     "subjects": [
      {
       "title": "Management Theory & Practice",
       "text": "Explores key management functions and leadership principles essential for organisational success."
      },
      {
       "title": "Introduction to Accounting & Finance",
       "text": "Introduces basic accounting and financial concepts for effective business decision-making."
      },
      {
       "title": "ATLAS Elective",
       "text": "Allows students to broaden their learning through interdisciplinary subjects aligned with their interests and career goals."
      },
      {
       "title": "English and Legal Language",
       "text": "Builds proficiency in professional communication and understanding of legal terminology."
      },
      {
       "title": "Legal Methods and Legal Reasoning",
       "text": "Covers techniques for legal analysis, interpretation and structured reasoning."
      },
      {
       "title": "Law of Tort including MV Accident and Consumer Protection Laws",
       "text": "Introduces tort principles, negligence and consumer protection under Indian law."
      }
     ],
     "hr": true
    },
    {
     "title": "Semester 2",
     "subtitle": "Grasp Legal Ethics & Constitutional Principles",
     "text": "This semester deepens understanding of entrepreneurship, marketing and ethical business conduct while introducing key areas of contract and constitutional law. Students learn to balance commercial strategy with social responsibility and legal integrity.",
     "subjects": [
      {
       "title": "Foundations of Entrepreneurial Thinking",
       "text": "Develops an entrepreneurial mindset through ideation, opportunity recognition, problem-solving and venture creation."
      },
      {
       "title": "Marketing Management & Consumer Insights",
       "text": "Explores marketing strategies and the psychological factors influencing consumer decisions."
      },
      {
       "title": "ATLAS Elective",
       "text": "Allows students to broaden their learning through interdisciplinary subjects aligned with their interests and career goals."
      },
      {
       "title": "Strategic Business Communication",
       "text": "Develops clear, persuasive communication and presentation skills for professional settings."
      },
      {
       "title": "Law of Contracts – I",
       "text": "Introduces the fundamental principles governing agreements and enforceable obligations."
      },
      {
       "title": "Constitution Law – I",
       "text": "Introduces constitutional governance, fundamental rights and the framework of Indian legal systems."
      }
     ],
     "hr": false
    }
   ]
  },
  {
   "label": "Year 2",
   "semesters": [
    {
     "title": "Semester 3",
     "subtitle": "Blend Business Intelligence with\nLegal Thinking",
     "text": "This semester integrates business acumen with legal reasoning, equipping students to make informed and ethical decisions in complex corporate environments. They explore advanced organisational behaviour, specialised contracts and constitutional law, while applying analytical and entrepreneurial skills through elective tracks and a hands-on internship.",
     "subjects": [
      {
       "title": "Design Thinking for Legal Solutions",
       "text": "Applies human-centred design and innovation methods to identify and solve complex legal and client problems."
      },
      {
       "title": "Financial Statement Analysis for Lawyers",
       "text": "Interprets income statements, balance sheets and ratios for assessing firm performance."
      },
      {
       "title": "Data Visualisation for Legal Business",
       "text": "Uses visualisation tools to interpret legal and business data for clarity."
      },
      {
       "title": "Law of Contracts – II",
       "text": "Covers indemnity, guarantee, bailment and agency under Indian contract law."
      },
      {
       "title": "Constitution Law – II",
       "text": "Analyses directive principles, federalism and the evolving role of constitutional governance."
      },
      {
       "title": "Law of Crimes – I",
       "text": "Introduces fundamental principles of criminal law, offences, liability and the contemporary Indian penal framework."
      }
     ],
     "hr": true
    },
    {
     "title": "Semester 4",
     "subtitle": "Strategize, Advocate & Lead in\nLegal Systems",
     "text": "In the final semester, students refine their strategic, analytical and advocacy skills to lead effectively in business and legal domains. They gain practical insights into dispute resolution, family law and criminal procedure while deepening their expertise through specialised business electives.",
     "subjects": [
      {
       "title": "Entrepreneurial Marketing and Growth Hacking",
       "text": "Combines creative experimentation and analytics to effectively accelerate customer acquisition and market expansion."
      },
      {
       "title": "Digital Marketing",
       "text": "Examines digital platforms, consumer behaviour and metrics to design data-driven marketing campaigns with measurable outcomes."
      },
      {
       "title": "Data Analytics",
       "text": "Examines digital platforms, consumer behaviour and metrics to design data-driven marketing campaigns with measurable outcomes."
      },
      {
       "title": "Family Law – I",
       "text": "Studies personal laws governing marriage, divorce and inheritance within diverse Indian legal traditions."
      },
      {
       "title": "Law of Crimes – II",
       "text": "Builds a deeper understanding of criminal offences, principles of liability and the application of criminal law in practice."
      },
      {
       "title": "Clinical Paper I – Professional Ethics and Professional Accounting System",
       "text": "Develops professional conduct, ethical responsibilities and foundational accounting practices relevant to legal professionals."
      },
      {
       "title": "Internship",
       "text": "Provides hands-on exposure to professional legal and business environments, connecting classroom learning with real-world practice."
      }
     ],
     "hr": false
    }
   ]
  },
  {
   "label": "Year 3",
   "semesters": [
    {
     "title": "Semester 5",
     "subtitle": "Apply Law to Real-World Regulation\n& Innovation",
     "text": "This semester focuses on applying legal knowledge to complex real-world contexts, including corporate governance, civil justice and emerging regulatory areas. Students explore specialised electives to tailor their expertise in high-demand legal domains while gaining practical exposure through internships.",
     "subjects": [
      {
       "title": "Human Resource Management",
       "text": "Explores employee management, motivation, organisational behaviour and people practices essential to effective organisations."
      },
      {
       "title": "Analytics with AI and Excel",
       "text": "Builds practical skills in AI-enabled analysis and Excel-based tools for data-driven business and legal decision-making."
      },
      {
       "title": "Family Law II",
       "text": "Explores advanced aspects of family relations, including succession, guardianship and maintenance laws."
      }
     ],
     "hr": true
    },
    {
     "title": "Semester 6",
     "subtitle": "Master Compliance, Taxation & Legal Nuances",
     "text": "In this semester, students advance their understanding of governance, compliance and international legal systems. The focus is on ethics, accountability and global frameworks influencing business and law. Electives allow students to specialise in niche domains shaping modern legal practice.",
     "subjects": [
      {
       "title": "Financial Management",
       "text": "Develops understanding of investment, financing and financial decision-making for effective organisational management."
      },
      {
       "title": "Data Analytics",
       "text": "Introduces analytical and computational approaches to interpret data and support evidence-based business and legal decisions."
      },
      {
       "title": "Clinical Paper II - Alternate Dispute Resolution",
       "text": "Develops practical understanding of mediation, arbitration and conciliation for efficient and non-adversarial dispute resolution."
      }
     ],
     "hr": false
    }
   ]
  },
  {
   "label": "Year 4",
   "semesters": [
    {
     "title": "Semester 7",
     "subtitle": "Advance Domain Expertise through\nPractical Learning",
     "text": "This semester allows students to specialise in a focused area of law while strengthening their understanding of evidence and labour relations. Through applied learning and internships, students develop advanced analytical and professional competencies aligned with their chosen domain.",
     "subjects": [
      {
       "title": "Research Methodology",
       "text": "Equips students with systematic methods for conducting, analysing and presenting rigorous legal research."
      },
      {
       "title": "Company Law",
       "text": "Covers the legal framework governing company formation, management, corporate governance and compliance in India."
      }
     ],
     "hr": true
    },
    {
     "title": "Semester 8",
     "subtitle": "Deepen Specialisation & Tackle Contemporary Legal Issues",
     "text": "In this semester, students build expertise in their chosen area of specialisation while exploring advanced legal practices. The focus is on applied skills such as drafting and conveyancing,taxation frameworks and the interpretation of complex statutes that prepare students for professional advocacy and consulting roles.",
     "subjects": [
      {
       "title": "Strategic Management",
       "text": "Develops the ability to formulate, implement and evaluate strategies that drive long-term organisational success."
      },
      {
       "title": "Clinical Paper III - Drafting, Pleading & Conveyancing",
       "text": "Develops practical skills in preparing legal documents, court pleadings, contracts and conveyancing instruments."
      },
      {
       "title": "Continue the earlier chosen Specialisation Group",
       "text": "Enables students to deepen expertise in their selected legal specialisation through advanced domain-specific subjects."
      }
     ],
     "hr": false
    }
   ]
  },
  {
   "label": "Year 5",
   "semesters": [
    {
     "title": "Semester 9",
     "subtitle": "Conduct Research & Advocate for Rights",
     "text": "This semester emphasises independent legal research, analytical reasoning and advocacy for human and environmental rights. Students engage in experiential learning to integrate academic insight with social responsibility and applied legal practice.",
     "subjects": [
      {
       "title": "Civil Procedure Code and Limitation Act",
       "text": "Examines the procedural framework governing civil litigation, including jurisdiction, pleadings, execution and limitation."
      },
      {
       "title": "Administrative Law",
       "text": "Examines administrative powers, delegated legislation, principles of governance and judicial control over administrative action."
      },
      {
       "title": "Public International Law & Human Rights",
       "text": "Explores international legal principles alongside frameworks protecting human rights at national and global levels."
      },
      {
       "title": "Labour & Industrial Law - I",
       "text": "Introduces employee rights, industrial relations, labour regulations and mechanisms for resolving workplace disputes."
      },
      {
       "title": "Environmental Law",
       "text": "Studies environmental protection policies, climate regulations and sustainability frameworks under international and national law."
      }
     ],
     "hr": true
    },
    {
     "title": "Semester 10",
     "subtitle": "Exude Courtroom Confidence",
     "text": "This final semester integrates courtroom practice, research defence and procedural understanding through advocacy-focused learning. Students demonstrate applied legal proficiency, persuasive argumentation and professional ethics in simulated and real legal settings.",
     "subjects": [
      {
       "title": "Bharatiya Sakshya Adhiniyam, 2023 (Law of Evidence)",
       "text": "Covers the principles of relevance, admissibility, proof and evidentiary procedure under India’s contemporary evidence law."
      },
      {
       "title": "Taxation Law",
       "text": "Introduces the structure of direct and indirect taxes, emphasising compliance and regulatory interpretation."
      },
      {
       "title": "Property Law",
       "text": "Examines ownership, possession and transfer of property with emphasis on legal documentation and dispute resolution."
      },
      {
       "title": "Labour & Industrial Law - II",
       "text": "Advances understanding of labour relations, industrial disputes, employee welfare and evolving labour legislation."
      },
      {
       "title": "Clinical Paper IV - Moot Court",
       "text": "Provides experiential learning in courtroom advocacy, legal drafting and argument presentation through simulated case proceedings."
      },
      {
       "title": "Internship",
       "text": "Provides further professional exposure, enabling students to apply advanced legal knowledge in courts, firms, organisations or other legal settings."
      }
     ],
     "hr": false
    }
   ]
  }
 ]
};

export const standApart = {
 "heading": "What Makes ATLAS School of Law Stand Apart",
 "cards": [
  {
   "title": "ATLAS School of Law",
   "lead": "Intersection of Law and Business",
   "text": "Combines starter legal principles along with strong foundation of business",
   "accent": true,
   "wash": "/assets/images/schools/law/program/sa-bg-1.png"
  },
  {
   "title": "Other Law Schools",
   "lead": "Minimal Cross-Disciplinary Learning",
   "text": "Focus on traditional legal subjects and narrows down to fewer pathways",
   "accent": false,
   "wash": "/assets/images/schools/law/program/sa-bg-2.png"
  }
 ]
};

export const outcomes = {
 "heading": "Program Outcomes: Key Skills Developed",
 "cards": [
  {
   "image": {
    "src": "/assets/images/schools/law/program/kit.png",
    "alt": ""
   },
   "title": "Critical Thinking & Legal Reasoning",
   "text": "Develop the clarity to analyse complex legal issues with logic and precision."
  },
  {
   "image": {
    "src": "/assets/images/schools/law/program/dec.png",
    "alt": ""
   },
   "title": "Problem Solving & Decision Making",
   "text": "Strengthen your judgment to craft practical, well-reasoned solutions."
  },
  {
   "image": {
    "src": "/assets/images/schools/law/program/pers.png",
    "alt": ""
   },
   "title": "Communication, Negotiation & Persuasion",
   "text": "Build the confidence to advocate, influence, and lead effectively."
  },
  {
   "image": {
    "src": "/assets/images/schools/law/program/skilllls.png",
    "alt": ""
   },
   "title": "Legal Research Skills",
   "text": "Gain the insight to investigate, interpret, and apply the law with depth and accuracy."
  },
  {
   "image": {
    "src": "/assets/images/schools/law/program/tech-enabled-law.png",
    "alt": ""
   },
   "title": "Tech Knowledge",
   "text": "Equip yourself with digital systems, interpret emerging risks, and apply the law with clarity. Build the insight to navigate a rapidly evolving technological landscape."
  }
 ]
};

export const careers = {
 "heading": "Career Pathways",
 "sub": "Graduate with the versatility to lead in courtrooms, corporations, and policy spaces worldwide.",
 "tabs": [
  {
   "label": "Legal & Judicial (Public Sector)",
   "cards": [
    {
     "title": "Civil Judge / Magistrate",
     "image": {
      "src": "/assets/images/schools/isme/pages/elective-card--3.png",
      "alt": ""
     }
    },
    {
     "title": "Legal Officer in PSUs",
     "image": {
      "src": "/assets/images/schools/isme/pages/elective-card--4.png",
      "alt": ""
     }
    },
    {
     "title": "Civil Services",
     "image": {
      "src": "/assets/images/schools/isme/pages/mask-group.png",
      "alt": ""
     }
    },
    {
     "title": "Indian Legal Services",
     "image": {
      "src": "/assets/images/schools/law/home/elective-card-6.png",
      "alt": ""
     }
    },
    {
     "title": "Legal Roles in Regulatory Bodies",
     "image": {
      "src": "/assets/images/schools/law/home/gradient-5.png",
      "alt": ""
     }
    },
    {
     "title": "Compliance & Regulatory Affairs",
     "image": {
      "src": "/assets/images/schools/law/home/rbi-compliance.webp",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/rbi-compliance-p-500.webp 500w, /assets/images/schools/law/home/rbi-compliance.webp 750w",
      "sizes": "(max-width: 750px) 100vw, 750px"
     }
    }
   ]
  },
  {
   "label": "Corporate Law",
   "cards": [
    {
     "title": "Commercial Law Firms",
     "image": {
      "src": "/assets/images/schools/isme/pages/3255.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/isme/pages/3255-p-500.jpg 500w, /assets/images/schools/isme/pages/3255-p-800.jpg 800w, /assets/images/schools/isme/pages/3255-p-1080.jpg 1080w, /assets/images/schools/isme/pages/3255.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Capital Market Regulation",
     "image": {
      "src": "/assets/images/schools/isme/pages/2150794354.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/isme/pages/2150794354-p-500.jpg 500w, /assets/images/schools/isme/pages/2150794354-p-800.jpg 800w, /assets/images/schools/isme/pages/2150794354.jpg 1000w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Advisory For Private Equity",
     "image": {
      "src": "/assets/images/schools/isme/pages/2148569079.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/isme/pages/2148569079-p-500.jpg 500w, /assets/images/schools/isme/pages/2148569079-p-800.jpg 800w, /assets/images/schools/isme/pages/2148569079-p-1080.jpg 1080w, /assets/images/schools/isme/pages/2148569079.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "In-house Legal Aid",
     "image": {
      "src": "/assets/images/schools/isme/pages/2152022023.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/isme/pages/2152022023-p-500.jpg 500w, /assets/images/schools/isme/pages/2152022023-p-800.jpg 800w, /assets/images/schools/isme/pages/2152022023.jpg 1050w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Governance & Risk Management",
     "image": {
      "src": "/assets/images/schools/law/home/76.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/76-p-500.jpg 500w, /assets/images/schools/law/home/76-p-800.jpg 800w, /assets/images/schools/law/home/76-p-1080.jpg 1080w, /assets/images/schools/law/home/76.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Intellectual Property & Tech Management",
     "image": {
      "src": "/assets/images/schools/law/home/124060.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/124060-p-500.jpg 500w, /assets/images/schools/law/home/124060-p-800.jpg 800w, /assets/images/schools/law/home/124060-p-1080.jpg 1080w, /assets/images/schools/law/home/124060.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Trade & International Business",
     "image": {
      "src": "/assets/images/schools/law/home/22788124-2.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/22788124-2-p-500.jpg 500w, /assets/images/schools/law/home/22788124-2-p-800.jpg 800w, /assets/images/schools/law/home/22788124-2.jpg 1000w",
      "sizes": "100vw"
     }
    }
   ]
  },
  {
   "label": "In-house Counsel",
   "cards": [
    {
     "title": "Labor & Industrial Relations",
     "image": {
      "src": "/assets/images/schools/law/home/645.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/645-p-500.jpg 500w, /assets/images/schools/law/home/645-p-800.jpg 800w, /assets/images/schools/law/home/645-p-1080.jpg 1080w, /assets/images/schools/law/home/645.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Cyber Law & IT Governance",
     "image": {
      "src": "/assets/images/schools/law/home/2152022037.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/2152022037-p-500.jpg 500w, /assets/images/schools/law/home/2152022037-p-800.jpg 800w, /assets/images/schools/law/home/2152022037.jpg 1050w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Vendor & Procurement Legal Operations",
     "image": {
      "src": "/assets/images/schools/law/home/121403.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/121403-p-500.jpg 500w, /assets/images/schools/law/home/121403-p-800.jpg 800w, /assets/images/schools/law/home/121403-p-1080.jpg 1080w, /assets/images/schools/law/home/121403.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Insurance & Liability Management",
     "image": {
      "src": "/assets/images/schools/law/home/11092-1.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/11092-1-p-500.jpg 500w, /assets/images/schools/law/home/11092-1-p-800.jpg 800w, /assets/images/schools/law/home/11092-1-p-1080.jpg 1080w, /assets/images/schools/law/home/11092-1.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Risk Governance & Internal Compliance",
     "image": {
      "src": "/assets/images/schools/law/home/2148780639.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/2148780639-p-500.jpg 500w, /assets/images/schools/law/home/2148780639-p-800.jpg 800w, /assets/images/schools/law/home/2148780639-p-1080.jpg 1080w, /assets/images/schools/law/home/2148780639.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Dispute Management & Arbitration Support",
     "image": {
      "src": "/assets/images/schools/law/home/16536.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/16536-p-500.jpg 500w, /assets/images/schools/law/home/16536-p-800.jpg 800w, /assets/images/schools/law/home/16536-p-1080.jpg 1080w, /assets/images/schools/law/home/16536.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "ESG & Sustainability Aid",
     "image": {
      "src": "/assets/images/schools/law/home/10284.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/10284-p-500.jpg 500w, /assets/images/schools/law/home/10284-p-800.jpg 800w, /assets/images/schools/law/home/10284-p-1080.jpg 1080w, /assets/images/schools/law/home/10284.jpg 1500w",
      "sizes": "100vw"
     }
    }
   ]
  },
  {
   "label": "Business, Strategy & Entrepreneurship",
   "cards": [
    {
     "title": "Business/Management Consulting",
     "image": {
      "src": "/assets/images/schools/law/home/265.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/265-p-500.jpg 500w, /assets/images/schools/law/home/265-p-800.jpg 800w, /assets/images/schools/law/home/265-p-1080.jpg 1080w, /assets/images/schools/law/home/265.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "CSR & Sustainability Strategy",
     "image": {
      "src": "/assets/images/schools/law/home/270457.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/270457-p-500.jpg 500w, /assets/images/schools/law/home/270457-p-800.jpg 800w, /assets/images/schools/law/home/270457-p-1080.jpg 1080w, /assets/images/schools/law/home/270457.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Policy & Regulatory Consulting",
     "image": {
      "src": "/assets/images/schools/law/home/12133.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/12133-p-500.jpg 500w, /assets/images/schools/law/home/12133-p-800.jpg 800w, /assets/images/schools/law/home/12133-p-1080.jpg 1080w, /assets/images/schools/law/home/12133.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Corporate Training & Knowledge Solutions",
     "image": {
      "src": "/assets/images/schools/law/home/2150917074.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/2150917074-p-500.jpg 500w, /assets/images/schools/law/home/2150917074-p-800.jpg 800w, /assets/images/schools/law/home/2150917074-p-1080.jpg 1080w, /assets/images/schools/law/home/2150917074.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Business Development & Partnerships",
     "image": {
      "src": "/assets/images/schools/law/home/16548.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/16548-p-500.jpg 500w, /assets/images/schools/law/home/16548-p-800.jpg 800w, /assets/images/schools/law/home/16548-p-1080.jpg 1080w, /assets/images/schools/law/home/16548.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Compliance Strategies",
     "image": {
      "src": "/assets/images/schools/law/home/12232.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/12232-p-500.jpg 500w, /assets/images/schools/law/home/12232-p-800.jpg 800w, /assets/images/schools/law/home/12232-p-1080.jpg 1080w, /assets/images/schools/law/home/12232.jpg 1500w",
      "sizes": "100vw"
     }
    },
    {
     "title": "Incubation & Advisory ConsultingConsulting",
     "image": {
      "src": "/assets/images/schools/law/home/19981.jpg",
      "alt": "",
      "srcSet": "/assets/images/schools/law/home/19981-p-500.jpg 500w, /assets/images/schools/law/home/19981-p-800.jpg 800w, /assets/images/schools/law/home/19981-p-1080.jpg 1080w, /assets/images/schools/law/home/19981.jpg 1500w",
      "sizes": "100vw"
     }
    }
   ]
  }
 ]
};

export const guide = {
 "heading": "Your guide to joining ATLAS BBA LLB",
 "rows": [
  [
   {
    "num": "01",
    "title": "Fill the Online\nApplication Form",
    "text": "Fill out the online application form with your personal details",
    "image": "/assets/images/schools/law/program/step-law-bg-1.png",
    "alt": false
   },
   {
    "num": "02",
    "title": "Make the Application\nFee Payment",
    "text": "Follow the steps on the application form and complete the payment on the portal",
    "image": "/assets/images/schools/law/program/step-law-bg-1.png",
    "alt": false
   },
   {
    "num": "03",
    "title": "Take the ATLAS Law\nAptitude Test",
    "text": "Our entrance exam includes questions on English language, current affairs, general knowledge, legal reasoning, logical reasoning and quantitative techniques",
    "image": "/assets/images/schools/law/program/step-law-bg-2.png",
    "alt": true,
    "button": {
     "label": "View a Sample Paper",
     "href": "/assets/documents/law/bba-llb-sample-test-atlas-skilltech.pdf",
     "variant": "law",
     "newTab": true
    }
   }
  ],
  [
   {
    "num": "04",
    "title": "Personal Interview",
    "text": "Shortlisted candidates will be invited for an expert-led personal interview to assess their legal aptitude, business understanding and communication skills",
    "image": "/assets/images/schools/law/program/step-law-bg-1.png",
    "alt": false
   },
   {
    "num": "05",
    "title": "Get your Offer",
    "text": "Once we have reviewed your application, we may choose to make you either a conditional (dependant on the test results) or unconditional offer",
    "image": "/assets/images/schools/law/program/step-law-bg-1.png",
    "alt": false
   },
   {
    "num": "06",
    "title": "Enrolment",
    "text": "Complete the enrolment process by making the fee payment",
    "image": "/assets/images/schools/law/program/step-law-bg-2.png",
    "alt": true
   }
  ]
 ]
};

export const eligibility = {
 "title": "Eligibility",
 "groups": [
  {
   "title": "Indian Boards (ISC / CBSE / State Boards)",
   "list": {
    "ordered": true,
    "items": [
     "Minimum 50% overall in Class XII"
    ]
   },
   "wrapped": true
  },
  {
   "title": "A-Levels (UK)",
   "list": {
    "ordered": false,
    "items": [
     "GCSE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary 'O' Level and 2 subjects at Advanced (\"A\") Level has been equated with +2 qualification"
    ]
   },
   "wrapped": true
  }
 ],
 "outerGroups": [
  {
   "title": "International Baccalaureate (IB)"
  },
  {
   "title": "IB Diploma Program",
   "list": {
    "ordered": false,
    "items": [
     "3 HL, 3 SL subjects with a minimum of 24 credit points."
    ]
   }
  },
  {
   "title": "IB Diploma Course (i.e. Certificate) Programme‍",
   "list": {
    "ordered": false,
    "items": [
     "3 HL, 3 SL subjects with a minimum of 24 credit points."
    ]
   }
  },
  {
   "title": "IB career Related Study Programmes",
   "list": {
    "ordered": false,
    "items": [
     "Students graduating with 02 DP subjects with atleast 01 subject at HL Level and minimum 03 points in each DP subject.",
     "Career Related Study (CRS) with at least 03 subjects.",
     "IBCP Equivalence for General Strand (Design, Science, B. Sc Finance): International Baccalaureate Career Related Study (IBCP) qualification with core components requirement awarded by International Baccalaureate (IB)."
    ]
   }
  }
 ],
 "points": [
  {
   "title": "Application Fee: ₹3,500",
   "text": "After selection, the enrolment fee of ₹50,000 to secure your seat is Nonrefundable!"
  },
  {
   "title": "Fee Structure",
   "text": "We believe in clarity. Here’s a simple year-on-year breakdown of our fees!",
   "buttons": [
    {
     "label": "Fee Structure",
     "href": "/schools/law/law-admissions#fee-structure-law",
     "variant": "rect-white-outline",
     "newTab": true,
     "external": true
    },
    {
     "label": "Admissions Policy",
     "href": "https://atlasuniversity.edu.in/admissions-policy/",
     "variant": "rect-white-outline",
     "newTab": true,
     "external": true
    }
   ]
  },
  {
   "title": "Loans & Scholarships",
   "text": "That’s right – Funding just got easier! We partner with India’s top banks to support your journey to success. And, Our ATLAS Scholarship is there to enable access to world-class education for you and build a lifelong growth.",
   "buttons": [
    {
     "label": "Education Loans",
     "href": "https://atlasuniversity.edu.in/education-loan",
     "variant": "rect-white-outline",
     "newTab": true,
     "external": true
    },
    {
     "label": "ATLAS Scholarships",
     "href": "https://atlasuniversity.edu.in/scholarships-and-financial-aid",
     "variant": "rect-white-outline",
     "newTab": true,
     "external": true
    }
   ]
  }
 ]
};

export const faq = {
 "heading": "Questions? We can read your mind",
 "items": [
  {
   "q": "Can I do 5 year LLB without CLAT?",
   "a": [
    "Yes. Admission to a 5-year integrated law programme does not always require CLAT. Universities like ATLAS SkillTech University follow their own admissions process, which may include academic evaluation, aptitude assessment, and personal interaction."
   ]
  },
  {
   "q": "Which is better, 3-year LLB or 5-year LLB?",
   "a": [
    "A 5-year LLB is ideal for students joining straight after Class 12, offering an integrated foundation in law and management, while a 3-year LLB is suitable for graduates. ATLAS School of Law offers a 5-year integrated law programme designed to provide early exposure, interdisciplinary learning, and strong experiential training. The 5-year format allows students more time for skill development, internships, and industry engagement."
   ]
  },
  {
   "q": "What is integrated BBA LLB?",
   "a": [
    "Integrated BBA LL.B. is a five-year undergraduate law programme that combines business administration with legal education. Students study management subjects alongside core law courses, preparing them for careers at the intersection of business and law."
   ]
  },
  {
   "q": "Can we do BBA and LLB together?",
   "a": [
    "Yes. The Integrated BBA LL.B. programme allows students to pursue business and law simultaneously within a structured five-year degree, eliminating the need to complete two separate courses."
   ]
  },
  {
   "q": "What is a 5 year integrated LLB?",
   "a": [
    "A 5-year integrated LLB is a programme designed for students after Class 12 that blends undergraduate studies with legal education. It provides a strong academic foundation, practical exposure, and early professional readiness."
   ]
  },
  {
   "q": "Can BBA LLB be a lawyer?",
   "a": [
    "Yes. After completing the Integrated BBA LL.B. and fulfilling regulatory requirements, graduates are eligible to enrol with the Bar Council and practise as lawyers. The programme also opens pathways beyond litigation."
   ]
  },
  {
   "q": "Is BBA LLB a double major?",
   "a": [
    "BBA LL.B. is an integrated dual-degree programme, not a traditional double major. It awards a combined qualification in business administration and law, designed to build interdisciplinary expertise."
   ]
  },
  {
   "q": "Can you study business and law at the same time?",
   "a": [
    "Yes. The Integrated BBA LL.B. programme is specifically structured to let students study management, finance, and economics alongside legal subjects, preparing them for corporate, regulatory, and entrepreneurial roles."
   ]
  },
  {
   "q": "What are the eligibility criteria for enrolling in the 5-year Integrated BBA LL.B. program?",
   "a": [
    "Applicants must have completed Class 12 or an equivalent qualification from a recognised board. Additional programme-specific requirements, aptitude assessments, or interviews may apply as part of the admissions process."
   ]
  },
  {
   "q": "What subjects are covered in the Integrated BBA LL.B. curriculum?",
   "a": [
    "The curriculum includes business management, economics, accounting, corporate law, constitutional law, contract law, criminal law, and legal research. It is designed to balance managerial knowledge with strong legal foundations."
   ]
  },
  {
   "q": "How does the Integrated BBA LL.B. program prepare students for the legal profession?",
   "a": [
    "The programme emphasises experiential learning through case studies, moot courts, internships, live projects, and industry interaction. This approach builds legal reasoning, business acumen, and practical skills essential for modern legal careers."
   ]
  }
 ],
 "arrow": "/assets/icons/law-down-arrow.svg"
};

