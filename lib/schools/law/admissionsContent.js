/**
 * School of Law — BBA LL.B. Admissions — reference/law/law-admissions.php, transcribed by the
 * scratchpad's lu/gen_law_adm.py.
 *
 * KEY DATES AND FEES ARE A DATED SNAPSHOT OF PRODUCTION (checked 2026-11-02). The page includes
 * `keydates/keydates-static/law.php`, and the mirror's copy of that include is stale — it still shows
 * the July 2026 intake with every row "Closed". Production serves the **July 2027** calendar:
 * applications opened 11 Sep 2026, ATLAS Law Aptitude Test 11 Sep – 14 Nov 2026, personal interview
 * 16 – 28 Nov 2026, result 2 Dec 2026, acceptance deadline 15 Dec 2026, semester fee payment deadline
 * 31 May 2027 — every value painted green by the include's script. Re-take this snapshot when
 * admissions update the include. The fee strip (Total Duration 5 Years; Application Fee INR 3,500;
 * Enrollment Fee 50,000; Year 1 5,25,000) is read from the same live page.
 *
 * The reference opens a database connection at the top of the file (`new mysqli(…)`) that this page
 * never uses for its own content; the connection details are not reproduced anywhere in the port.
 */

export const meta = {
 "title": "Law Admissions | Atlas School of Law Mumbai",
 "description": "Ready to study law? Apply for LLB admission at Atlas School of Law, Mumbai — explore BA LLB, BBA LLB, and LLM programs with eligibility and fee details"
};

export const checked = "2026-11-02";

export const hero = {
 "title": "BBA LL.B. Admissions",
 "sub": "5-year Integrated Program",
 "image": {
  "src": "/assets/images/schools/isme/pages/bba-admissions-hero.png",
  "alt": "",
  "srcSet": "/assets/images/schools/isme/pages/bba-admissions-hero-p-500.png 500w, /assets/images/schools/isme/pages/bba-admissions-hero-p-800.png 800w, /assets/images/schools/isme/pages/bba-admissions-hero-p-1080.png 1080w, /assets/images/schools/isme/pages/bba-admissions-hero.png 1366w",
  "sizes": "(max-width: 1366px) 100vw, 1366px"
 },
 "buttons": [
  {
   "label": "Apply for 2027 Intake",
   "href": "https://atlasuniversity.edu.in/applicationform",
   "primary": true,
   "variant": "law"
  }
 ]
};

export const howToApply = {
 "heading": "Here’s how to apply",
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
    "title": "Take the ATLAS Law\nEntrance Test",
    "text": "Our entrance exam includes questions on English language, current affairs, general knowledge, legal reasoning, logical reasoning and quantitative techniques",
    "image": "/assets/images/schools/law/program/step-law-bg-2.png",
    "alt": true
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

export const keyDates = {
 "heading": "Key Dates & Deadlines",
 "blocks": [
  {
   "kind": "table",
   "borderless": true,
   "table": {
    "caption": "BBA LL.B. Admissions Calendar for July 2027 Intake",
    "headerColor": "#CC5500",
    "rowHeights": {
     "caption": 33,
     "columns": 33
    },
    "columns": [
     "Cycle",
     "Current Cycle"
    ],
    "rows": [
     {
      "label": [
       "Applications ",
       " Opened"
      ],
      "br": true,
      "note": {
       "parts": [
        "(11",
        {
         "sup": "th"
        },
        " Sep 2026)"
       ]
      },
      "value": {
       "text": "Applications Open",
       "green": true
      },
      "height": 33
     },
     {
      "label": [
       "ATLAS Law Aptitude Test "
      ],
      "br": false,
      "value": {
       "parts": [
        "11",
        {
         "sup": "th"
        },
        " Sep to 14",
        {
         "sup": "th"
        },
        " Nov 2026"
       ],
       "green": true
      },
      "height": 64
     },
     {
      "label": [
       "Personal ",
       "Interview "
      ],
      "br": true,
      "value": {
       "parts": [
        "16",
        {
         "sup": "th"
        },
        " Nov to 28",
        {
         "sup": "th"
        },
        " Nov 2026"
       ],
       "green": true
      },
      "height": 33
     },
     {
      "label": [
       "Result ",
       "Announcement"
      ],
      "br": true,
      "value": {
       "parts": [
        "2",
        {
         "sup": "nd"
        },
        " Dec 2026"
       ],
       "green": true
      },
      "height": 33
     },
     {
      "label": [
       "Acceptance ",
       "Deadline"
      ],
      "br": true,
      "value": {
       "parts": [
        "15",
        {
         "sup": "th"
        },
        " Dec 2026"
       ],
       "green": true
      },
      "height": 33
     },
     {
      "label": [
       "Semester Fee",
       " Payment Deadline"
      ],
      "br": true,
      "value": {
       "parts": [
        "31",
        {
         "sup": "st"
        },
        " May 2027"
       ],
       "green": true
      },
      "height": 64
     }
    ],
    "margin": 0
   }
  }
 ]
};

export const eligibility = {
 "heading": "Eligibility",
 "button": {
  "label": "View Admission Policy",
  "href": "https://atlasuniversity.edu.in/admissions-policy/",
  "variant": "law",
  "newTab": true,
  "external": true
 },
 "note": [
  {
   "b": [
    "Class XII:"
   ]
  },
  " Current Students & Graduates (2024 Onwards)"
 ],
 "items": [
  {
   "title": "Indian Boards (ISC / CBSE / State Boards)",
   "blocks": [
    {
     "runs": [
      "An total of 50% marks or above in Grade XII in any discipline."
     ]
    }
   ]
  },
  {
   "title": "A-Levels (UK)",
   "blocks": [
    {
     "runs": [
      "GCSE/IGCSE Examinations of the approved British Examination Bodies, with minimum 5 (Five) subjects in A, B, C, D and E grades, including English at Ordinary 'O' Level and 2 subjects at Advanced (\"A\") Level has been equated with +2 qualification"
     ]
    }
   ]
  },
  {
   "title": "International Baccalaureate (IB)",
   "blocks": [
    {
     "runs": [
      {
       "b": [
        "International Baccalaureate (IB)"
       ]
      },
      {
       "br": true
      },
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
       "3 HL, 3 SL subjects with a minimum of 24 credit points."
      ]
     ]
    },
    {
     "runs": [
      {
       "b": [
        "IB Diploma Course (i.e. Certificate) Programme‍"
       ]
      },
      "‍"
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "3 HL, 3 SL subjects with a minimum of 24 credit points."
      ]
     ]
    },
    {
     "runs": [
      {
       "b": [
        "IB career Related Study Programme"
       ]
      }
     ]
    },
    {
     "list": "ul",
     "items": [
      [
       "Students graduating with 02 DP subjects with atleast 01 subject at HL Level and minimum 03 points in each DP subject."
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
  "value": "5 Years",
  "note": "*Indicative & subject to change",
  "arrow": "/assets/images/admissions/key-dates/polygon-atlas.png"
 },
 "cards": [
  {
   "label": "Application Fee",
   "value": "INR 3,500",
   "strong": true
  },
  {
   "label": "Enrollment Fee",
   "value": "50,000",
   "strong": true
  },
  {
   "label": "Year 1",
   "value": "5,25,000",
   "strong": true
  }
 ],
 "anchor": "fee-structure-law"
};

export const banner = {
 "heading": "5-year Integrated BBA LL.B. (Hons.)",
 "text": "An integrated program that blends law, business, and technology to prepare future-ready leaders for courtrooms, boardrooms, and beyond.",
 "duration": [
  "5 Year",
  "Full time"
 ],
 "buttons": [
  {
   "label": "Explore Program",
   "href": "/schools/law/program-page-law",
   "primary": true,
   "variant": "law"
  }
 ],
 "image": {
  "src": "/assets/images/schools/law/home/law-prog-banner.png",
  "alt": "",
  "srcSet": "/assets/images/schools/law/home/law-prog-banner-p-500.png 500w, /assets/images/schools/law/home/law-prog-banner.png 529w",
  "sizes": "(max-width: 529px) 100vw, 529px"
 }
};

export const faq = {
 "heading": "Questions? We can read your mind",
 "items": [
  {
   "q": "What is the eligibility criteria for BBA LL.B. admissions at ATLAS SkillTech University?",
   "a": [
    "Applicants must have completed Class 12 or an equivalent qualification from a recognised board. Eligibility may also include minimum academic performance and program-specific criteria as defined by ATLAS SkillTech University."
   ]
  },
  {
   "q": "How can I apply for the BBA LL.B. program?",
   "a": [
    "Prospective students can apply online through the official ATLAS SkillTech University admissions portal. The application process includes submitting academic records, completing the form and participating in any program-specific assessments or interviews."
   ]
  },
  {
   "q": "What documents are required for BBA LL.B. admissions?",
   "a": [
    "Typically required documents include Class 12 mark sheets, identity proof, passport-sized photographs and any program-specific certificates. Ensuring all documents are complete helps speed up the admission process."
   ]
  },
  {
   "q": "Is there an entrance exam for BBA LL.B. admissions?",
   "a": [
    "Some programs may include an entrance assessment or evaluation, depending on intake and university guidelines. Applicants should check the official admissions page for current requirements."
   ]
  },
  {
   "q": "When is the application deadline for BBA LL.B. admissions?",
   "a": [
    "Application deadlines may vary by intake cycle. ATLAS SkillTech University follows rolling or phase-based admissions, so students are advised to refer to the official admissions portal for updated dates."
   ]
  },
  {
   "q": "Are there any scholarships available for BBA LL.B. students?",
   "a": [
    "Yes. ATLAS SkillTech University offers merit-based scholarships, need-based support and program-specific awards to eligible students. Details and eligibility criteria can be found on the official admissions page."
   ]
  }
 ],
 "arrow": "/assets/icons/law-down-arrow.svg"
};

