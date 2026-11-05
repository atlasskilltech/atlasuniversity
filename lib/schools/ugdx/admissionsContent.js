/**
 * uGDX School of Technology — B.Tech Admissions — reference/ugdx/admissions/ugdx-admissions.php,
 * transcribed by the scratchpad's lu/gen_ugdx_adm.py.
 *
 * THE KEY DATES AND THE FEE STRIP ARE A DATED SNAPSHOT OF PRODUCTION (checked 2026-11-02). The key dates
 * are `keydates/btech.php`, which renders `getAdmissionCyclesCon()` from the admissions database — this
 * checkout has none, so they are read from the live page: B.Tech applications start 11 Sep 2026,
 * application deadline 8 Dec 2026, interview 12 Dec 2026, result 18 Dec 2026, acceptance deadline
 * 22 Dec 2026, Semester 1 fee payment deadline 21 Jan 2027. Fees: Total Duration 4 years, Application Fee
 * 3500, Enrollment Fee 50,000, Year 1 INR 4,87,200 (*Indicative & subject to change). Re-run the generator
 * when admissions change them.
 *
 * The FAQ is the page's own inline list and is transcribed exactly as production serves it — including
 * its questions about ATLAS ISME's BBA programmes, which are upstream copy, not uGDX's.
 */

export const meta = {
 "title": "uGDX Admissions for Future Tech Careers – ATLAS uGDX",
 "description": "Ready for tech learning? Explore AI, ML, CS, robotics, eligibility, course structure and admissions process."
};

export const checked = "2026-11-02";

export const hero = {
 "title": "B.Tech Admissions",
 "sub": "Bachelor of Technology\n4-Year",
 "image": {
  "src": "/assets/images/schools/isme/pages/bba-admissions-hero.png",
  "alt": "",
  "srcSet": "/assets/images/schools/isme/pages/bba-admissions-hero-p-500.png 500w, /assets/images/schools/isme/pages/bba-admissions-hero-p-800.png 800w, /assets/images/schools/isme/pages/bba-admissions-hero-p-1080.png 1080w, /assets/images/schools/isme/pages/bba-admissions-hero.png 1366w",
  "sizes": "(max-width: 1366px) 100vw, 1366px"
 },
 "buttons": [
  {
   "label": "Apply for July 2027 Intake",
   "href": "https://atlasuniversity.edu.in/applicationform",
   "primary": true,
   "variant": "ugdx",
   "icon": "/assets/images/schools/isdi/isdi-for-outstation/banner/arrow-rt.svg"
  }
 ]
};

export const howToApply = {
 "heading": "Here’s how to apply",
 "steps": [
  {
   "num": "01",
   "title": "Fill the online Application Form",
   "tone": 1,
   "image": "/assets/images/schools/ugdx/admissions/01-apply.png",
   "button": {
    "label": "Apply for July 2027 Intake",
    "href": "https://atlasuniversity.edu.in/applicationform",
    "variant": "ugdx-hover",
    "labelSize": 14
   }
  },
  {
   "num": "02",
   "title": "uGDX Challenge",
   "tone": 2,
   "image": "/assets/images/schools/ugdx/admissions/02-ugdx-c.png"
  },
  {
   "num": "03",
   "title": "Personal Interview",
   "tone": 3,
   "image": "/assets/images/schools/ugdx/admissions/03-pi.png"
  },
  {
   "num": "04",
   "title": "Result\nAnnouncement",
   "tone": 1,
   "image": "/assets/images/schools/ugdx/admissions/04-ra.png"
  },
  {
   "num": "05",
   "title": "Complete\nEnrolment",
   "tone": 4,
   "image": "/assets/images/schools/ugdx/admissions/05-ce.png"
  }
 ]
};

export const keyDates = {
 "heading": "Key Dates & Deadlines",
 "blocks": [
  {
   "kind": "strip",
   "justify": "between",
   "arrowStatic": true,
   "lead": {
    "title": [
     "B.Tech",
     "‍",
     "Applications Start"
    ],
    "value": {
     "day": "11",
     "suffix": "th",
     "rest": "Sep 2026"
    },
    "arrow": {
     "src": "/assets/images/admissions/key-dates/polygon-atlas.png",
     "alt": ""
    }
   },
   "cards": [
    {
     "label": [
      "Application",
      "Deadline"
     ],
     "value": {
      "day": "8",
      "suffix": "th",
      "rest": "Dec 2026"
     }
    },
    {
     "label": [
      "Interview Date"
     ],
     "value": {
      "day": "12",
      "suffix": "th",
      "rest": "Dec 2026"
     }
    },
    {
     "label": [
      "Result",
      "Announcement"
     ],
     "value": {
      "day": "18",
      "suffix": "th",
      "rest": "Dec 2026"
     }
    },
    {
     "label": [
      "Acceptance Deadline"
     ],
     "value": {
      "day": "22",
      "suffix": "nd",
      "rest": "Dec 2026"
     }
    },
    {
     "label": [
      "Semester 1 Fee Payment Deadline"
     ],
     "value": {
      "day": "21",
      "suffix": "st",
      "rest": "Jan 2027"
     }
    }
   ]
  }
 ]
};

export const eligibility = {
 "heading": "Eligibility",
 "button": {
  "label": "View Admission Policy",
  "href": "https://atlasuniversity.edu.in/admissions-policy/",
  "variant": "ugdx"
 },
 "note": [
  {
   "b": [
    "Class XII:"
   ]
  },
  " Current Students & Graduates (2023 Onwards)"
 ],
 "emptyWraps": 1,
 "items": [
  {
   "title": "Indian Boards (ISC / CBSE / State Boards)",
   "blocks": [
    {
     "runs": [
      "50% marks in 10+2 or equivalent with a major in Physics, Mathematics and Chemistry/Electronics/Computers etc."
     ]
    }
   ]
  },
  {
   "title": "A-Levels (UK)",
   "blocks": [
    {
     "runs": [
      "GSCE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary 'O' Level and 2 subjects at Advanced 'A' Level, has been equated with +2 stage qualification."
     ]
    }
   ]
  },
  {
   "title": "InternationalBaccalaureate(IB)",
   "blocks": [
    {
     "runs": [
      {
       "b": [
        "IB Diploma Program"
       ]
      }
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "3 HL, 3 SL with a minimum of 24 credit points."
      ]
     ]
    },
    {
     "runs": [
      {
       "b": [
        "IB Diploma Course (i.e. Certificate) Programme"
       ]
      },
      "‍"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "3 HL, 3 SL with a minimum of 24 credit points."
      ]
     ]
    },
    {
     "runs": [
      {
       "b": [
        "IB career Related Study Programmes"
       ]
      }
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "02 DP subjects with at ;east 01 subject at HL Level and minimum 3 points in each DP subject."
      ],
      [
       "Career Related Study (CRS) with at least 03 subjects."
      ],
      [
       "IBCP Equivalence for General Strand (Design, Science, B. Sc Finance): International Baccalaureate Career Related Study (IBCP) qualification with core components requirement awarded by International Baccalaureate (IB)."
      ]
     ]
    }
   ]
  }
 ]
};

export const fees = {
 "heading": "Fee Structure",
 "sub": "We believe in clarity & Here’s a simple breakdown of our fees!",
 "lead": {
  "title": "Total Duration",
  "value": "4 years",
  "note": "*Indicative & subject to change"
 },
 "cards": [
  {
   "label": "Application Fee",
   "value": "3500",
   "strong": true
  },
  {
   "label": "Enrollment Fee",
   "value": "50,000",
   "strong": true
  },
  {
   "label": "Year 1",
   "value": "INR 4,87,200",
   "strong": true
  }
 ]
};

export const banner = {
 "heading": "Empowering the Next Generation of Tech Innovators",
 "text": "An ATLAS B.Tech program that blends AI, data science, and design thinking — empowering you to create technology that transforms the world.",
 "buttons": [
  {
   "label": "Apply Now",
   "href": "https://atlasuniversity.edu.in/applicationform",
   "primary": true,
   "variant": "ugdx",
   "icon": "/assets/images/schools/isdi/isdi-for-outstation/banner/arrow-rt.svg"
  },
  {
   "label": "Schedule a Visit",
   "href": "https://atlasuniversity.edu.in/campusvisit",
   "primary": true,
   "variant": "ugdx",
   "icon": "/assets/images/schools/isdi/isdi-for-outstation/banner/arrow-rt.svg"
  }
 ],
 "image": {
  "src": "/assets/images/schools/ugdx/home/ugdx-1st-banner.png",
  "alt": "",
  "srcSet": "/assets/images/schools/ugdx/home/ugdx-1st-banner-p-500.png 500w, /assets/images/schools/ugdx/home/ugdx-1st-banner.png 591w",
  "sizes": "100vw"
 }
};

export const faq = {
 "heading": "Questions? We can read your mind",
 "items": [
  {
   "q": "What is the eligibility criteria for the BBA programs at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "Candidates currently in their 12th grade & will be appearing for a 10 + 2 examination (e.g.: CBSE, HSC, IGCSE- A levels, IBDP, ISC etc.), or its educational equivalent in any discipline (e.g.: Commerce, Science, Arts) are eligible to apply"
     ]
    },
    {
     "runs": [
      "Or"
     ]
    },
    {
     "runs": [
      "have passed their 10+2 (or equivalent) examination in any discipline from a recognised board are eligible for the BBA program at ATLAS."
     ]
    },
    {
     "runs": [
      "Accepted Education Boards & Qualifications:"
     ]
    },
    {
     "runs": [
      "Central Board of Secondary Education (CBSE) / State Board / Council for the Indian School Certificate Examinations (CISCE) / National Institute of Open Schooling (NIOS) – 10+2 IB Diploma/ IB Certificate/ IB CP with minimum 3 Higher Level and 3 Standard Level subjects mandatory with a minimum of 24 points – 10+2 Cambridge Board – Minimum 2 subjects"
     ]
    },
    {
     "runs": [
      "Note – Students from IGCSE board for class X must have cleared minimum 5 subjects"
     ]
    },
    {
     "runs": [
      "Minimum Academic Requirements:"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "Minimum 50% in Class 12 (ISC/CBSE/ State Boards) OR"
      ],
      [
       "IB Diploma/Certificate with 24 points (3 HL + 3 SL subjects)"
      ],
      [
       "A Levels: Minimum grades A/B/C in 2 subjects"
      ]
     ]
    }
   ]
  },
  {
   "q": "What is the eligibility criteria for the Bsc. Finance programs at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "In order to be eligible for the ATLAS ISME’s Bsc Finance program candidates need to have completed their 10+2 (or equivalent) from a recognised board with a minimum of 60% in their previous exams. Math is a mandatory subject for this program."
     ]
    },
    {
     "runs": [
      "Accepted Education Boards & Qualifications"
     ]
    },
    {
     "list": "ol",
     "items": [
      [
       "Indian School Certificate (ISC) / Central Board of Secondary Education (CBSE) / State Boards: 60% and above with Maths as mandatory subject"
      ]
     ]
    },
    {
     "list": "ol",
     "items": [
      [
       "International Baccalaureate (IB) IB Diploma and IB Certificate programs – A minimum of 24 points, including 3 Higher Level (HL) and 3 Standard Level (SL) subjects with Maths as mandatory subject."
      ]
     ]
    },
    {
     "list": "ol",
     "items": [
      [
       "IB Career related program (with Maths as mandatory subject)-",
       {
        "a": "https://www.ibo.org/globalassets/new-structure/research/pdfs/country-recognition-statement-india-en.pdf",
        "runs": [
         "https://www.ibo.org/globalassets/new-structure/research/pdfs/country-recognition-statement-india-en.pdf"
        ]
       }
      ],
      [
       "A Levels: A/B/C in 2 subjects, plus Grade B or above in Maths. Therefore, a total of 3 subjects"
      ]
     ]
    },
    {
     "runs": [
      "Minimum Academic Requirements:"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "Minimum Percentage: A minimum of 60% marks is required in the 10+2 exams."
      ],
      [
       "Compulsory Subject: Mathematics is a mandatory subject for the B.Sc. Finance program."
      ],
      [
       "Streams Accepted: Candidates from various disciplines (Science, Commerce, Arts) are eligible to apply, as long as they have completed their 10+2 with the required percentage."
      ],
      [
       "Recognised Boards: Candidates can apply from various boards including CBSE, ISC, HSC, IBDP, IGCSE (A levels), and others."
      ]
     ]
    },
    {
     "runs": [
      "Please note the selection process for admission is based on a combination of an aptitude test and a personal interview."
     ]
    }
   ]
  },
  {
   "q": "What is the eligibility criteria for the MBA programs at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "For the Postgraduate Program (MBA), students who have completed a minimum of a three-year graduate program or are currently in the final year of their graduate program in any discipline from any University recognised by the Association of Indian Universities (AIU) can apply."
     ]
    },
    {
     "runs": [
      "Educational Qualification:"
     ]
    },
    {
     "runs": [
      "Students pursuing or having completed a minimum of three-year graduate programs in any discipline with minimum 50% aggregate marks from any University recognized by Association of Indian Universities (AIU). Students appearing for their final exams can also apply provided they maintain a minimum of 50% aggregate marks at the time of graduation as mentioned above. Students applying for their final exams should not have any live backlogs (ATKTs)."
     ]
    },
    {
     "runs": [
      "Examinations (MBA) – Candidates who have appeared for one of the following entrance tests – GMAT, CAT, NMAT, XAT, MAT, CMAT, ATMA or any state CET tests are preferred. Cut offs : CAT/XAT : 70%le, NMAT : 200 marks & CET : 80%"
     ]
    },
    {
     "runs": [
      "‍"
     ]
    }
   ]
  },
  {
   "q": "What is the application fee for BBA at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "For the BBA program, candidates have to pay a one-time non-refundable fee of ₹3500 to apply for any BBA program at ATLAS SkillTech University."
     ]
    }
   ]
  },
  {
   "q": "What is the application fee for B.Sc Finance at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "For BSc Finance at ATLASISME candidates are required to pay a one-time, non-refundable application fee of ₹3500."
     ]
    }
   ]
  },
  {
   "q": "Do CXOs and industry leaders give guest lectures at ATLAS ISME, and how does their direct industry teaching differ from traditional classroom learning?",
   "blocks": [
    {
     "runs": [
      "Yes, at ATLAS ISME, students receive direct industry teaching from CXOs and industry leaders, gaining real-world business insights through guest lectures, masterclasses, etc, unlike traditional classroom learning which is mostly theory-based."
     ]
    },
    {
     "runs": [
      "At ISME, students learn directly from top industry leaders, such as CXOs, CEOs, CMOs, startup founders, serial investors, business innovators to name a few. And these industry leaders bring wealth of knowledge on current industry trends (firsthand market knowledge), hands-on experience, practical case studies into the classroom teaching, making learning more impactful and relevant for students."
     ]
    },
    {
     "runs": [
      "Key features of direct industry teaching at ATLAS ISME:"
     ]
    },
    {
     "list": "ol",
     "items": [
      [
       "Guest lectures from industry experts, CXOs, and founders help the students shape their perspective about the business and its dynamics"
      ],
      [
       "Real-World Case Studies (Live business case discussions based on real company challenges)"
      ],
      [
       "Mentorship from top executives on leadership, innovation, and strategy"
      ],
      [
       "Practical insights & skill development based on real business environments"
      ],
      [
       "Exposure to current industry tools, data, and frameworks etc."
      ]
     ]
    },
    {
     "runs": [
      "Traditional classroom learning focuses solely on theoretical knowledge, whereas ATLAS ISME goes beyond traditional teaching. And this direct industry teaching from CXOs and founders at ATLAS ISME equips students with all the skills necessary for career readiness. BBA and ",
      {
       "a": "http://b.sc",
       "runs": [
        "B.SC"
       ]
      },
      " finance students both benefit from direct industry teaching."
     ]
    }
   ]
  },
  {
   "q": "What is the application fee for an MBA at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "For MBA at ATLAS ISME, candidates have to pay a one-time non-refundable fee of ₹1500 to apply for a program at ATLAS SkillTech University."
     ]
    }
   ]
  },
  {
   "q": "What is the admission process for the ATLAS ISME BBA program and how do I participate in each stage?",
   "blocks": [
    {
     "runs": [
      "The admission process at ATLAS ISME consists of 3 key stages:"
     ]
    },
    {
     "list": "ol",
     "items": [
      [
       "Business Aptitude Test (BAT): An online MCQs test that assess your verbal, logical reasoning, quantitative and business communication skills",
       {
        "br": true
       }
      ],
      [
       "Personal Interview (PI): An interactive online interview that evaluates your candidature. One can expect questions from your performance in the BAT and Statement of Purpose (SOP), past achievements, perspectives on global affairs etc."
      ],
      [
       "Collaborative Accelerator: This is an on-campus group exercise where students collaborate with other candidates to solve an on spot real-world business case study."
      ]
     ]
    }
   ]
  },
  {
   "q": "What do I need to submit if I have already taken my final board (Class 12 Examination Or Equivalent Exam) examinations?",
   "blocks": [
    {
     "runs": [
      "Applicants who have appeared for their final board examinations are required to submit the scores of all the subjects they have undertaken as a part of their class XII final board examinations."
     ]
    },
    {
     "runs": [
      "If you are a resident of Maharashtra, a domicile certificate is required to be submitted prior to the commencement of classes."
     ]
    }
   ]
  },
  {
   "q": "What are the career benefits of studying in Mumbai’s BKC business district at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "ATLAS ISME offers unparalleled benefits. Strategic placement in BKC offers numerous opportunities for students. The advantages are:"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "Enhanced placement opportunities: Being a financial hub, the area is home to many MNCs and leading financial institutions, allowing students to engage with corporate environments and have a higher likelihood of securing coveted roles."
      ],
      [
       "Real-world exposure: With businesses and different activities roaring in the vicinity, students are able to witness real-time market trends and business operations and enrich their academic learning."
      ]
     ]
    },
    {
     "runs": [
      "Networking opportunities: The ecosystem of BKC allows students to network and connect with business leaders and take part in events, which enhances their chances to seek better opportunities."
     ]
    }
   ]
  },
  {
   "q": "Is a domicile certificate required for Maharashtra based students during the admission process at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "Yes, Maharashtra State students are required to submit a domicile certificate as part of the admission process at ATLAS ISME. This certificate must be submitted before the commencement of classes to complete admission formalities at ATLAS ISME"
     ]
    }
   ]
  },
  {
   "q": "What if I am awaiting my Class 12 or equivalent final exam results during the ATLAS ISME admission process?",
   "blocks": [
    {
     "runs": [
      "If you are still awaiting your Class 12 examination or equivalent results, you can still apply for admission at ATLAS ISME."
     ]
    },
    {
     "runs": [
      "However, at ATLAS ISME all admissions in such cases are considered provisional and subject to the submission of your final marksheet and pass certificate before the commencement of classes. Failure to submit the required documents in time may affect your enrollment status."
     ]
    }
   ]
  },
  {
   "q": "What is the international admission policy at ATLAS SkillTech University for NRI, OCI, and foreign candidates?",
   "blocks": [
    {
     "runs": [
      "International, NRI (Non-Resident Indian), and OCI (Overseas Citizen of India) candidates are eligible to apply under a supernumerary quota at ATLAS SkillTech University. These applicants must meet eligibility criteria equivalent to Indian academic standards for the respective program they are applying to."
     ]
    },
    {
     "runs": [
      "This quota is in addition to the regular intake and is governed by university and regulatory guidelines for international admissions."
     ]
    }
   ]
  },
  {
   "q": "What is the reservation policy for admissions at ATLAS ISME?",
   "blocks": [
    {
     "runs": [
      "As per the ATLAS SkillTech University Act 2021 and the Government of Maharashtra guidelines, up to 50% of the total intake is reserved for candidates from various reserved categories, including:"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "Scheduled Castes (SC)"
      ],
      [
       "Scheduled Tribes (ST)"
      ],
      [
       "Nomadic Tribes (NT)"
      ],
      [
       "Other Backward Classes (OBC)"
      ],
      [
       "Special Backward Category"
      ],
      [
       "Students with disabilities"
      ],
      [
       "Economically Weaker Section (EWS)"
      ],
      [
       "De-notified Tribes (Vimukta Jatis)"
      ]
     ]
    },
    {
     "runs": [
      "Please note admissions shall follow the State Government’s reservation policy as stated in the University Act. This reservation policy ensures equitable access to education while strictly adhering to state government regulations."
     ]
    }
   ]
  },
  {
   "q": "Which Indian boards are recognised by ATLAS ISME/ATLAS SkillTech University?",
   "blocks": [
    {
     "runs": [
      "ATLAS SkillTech University recognises all boards approved by the Council of Boards of School Education India (COBSE). Please ",
      {
       "a": "https://www.cobse.org.in/recognized-educational-boards-list/",
       "runs": [
        "click here"
       ]
      },
      " to view the complete list of boards recognised by the COBSE."
     ]
    }
   ]
  }
 ]
};

