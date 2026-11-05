/**
 * /schools/isme/thought-leaderships — transcribed from the production render of
 * reference/schools/isme/thought-leaderships/index.php.
 *
 * The page curls the UAT blog API (uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/isme)
 * per request and renders one `.card` per published ISME blog. Like the ISDI page and the ATLAS
 * homepage Thought Leadership section, the feed is SNAPSHOTTED here, its images downloaded into
 * public/ (month folders kept, as upstream). `card.href` is the blog URL the API returns, written
 * site-root relative. Re-run the snapshot to refresh.
 */
export const hero = {
  "height": "658",
  "title": "Thought Leadership",
  "image": {
    "src": "/assets/images/schools/isdi/thought-leaderships/hero/publication-image.webp",
    "alt": "",
    "srcSet": "/assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-500.webp 500w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-800.webp 800w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-1080.webp 1080w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image.webp 1366w",
    "sizes": "(max-width: 1439px) 100vw, 1365.9896240234375px"
  }
};

export const tabs = [
  {
    "label": "ATLAS",
    "href": "/thought-leaderships#blog-section"
  },
  {
    "label": "ISDI",
    "href": "/schools/isdi/thought-leaderships#blog-section"
  },
  {
    "label": "ISME",
    "href": "/schools/isme/thought-leaderships/",
    "active": true
  },
  {
    "label": "uGDX",
    "href": "/schools/ugdx/thought-leaderships#blog-section"
  },
  {
    "label": "LAW",
    "href": "/schools/law/thought-leaderships#blog-section"
  }
];

export const cards = [
  {
    "title": "Top Recruiters After BBA Business Analytics in India 2026",
    "date": "October, 2026",
    "href": "/schools/isme/blog/top-recruiters-after-bba-business-analytics-india",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/oct/5.png",
      "alt": "Business analytics graduates reviewing data dashboards with recruiters in India"
    }
  },
  {
    "title": "Top BBA in Finance Colleges in Mumbai: 2026 List",
    "date": "October, 2026",
    "href": "/schools/isme/blog/bba-in-finance-colleges-in-mumbai",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/oct/4.png",
      "alt": "Students comparing BBA in finance colleges in Mumbai, courses and career paths"
    }
  },
  {
    "title": "BSc in Economics and Data Science: Course Overview, Colleges & Career Scope",
    "date": "October, 2026",
    "href": "/schools/isme/blog/bsc-in-economics-and-data-science-colleges-course-career-scope",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/oct/3.png",
      "alt": "Students analysing economic data on dashboards in a BSc economics and data science class"
    }
  },
  {
    "title": "BBA Marketing Syllabus & Career Roadmap in India 2026",
    "date": "October, 2026",
    "href": "/schools/isme/blog/bba-marketing-syllabus-career-roadmap-india-2026-27",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/oct/2.png",
      "alt": "Students reviewing the BBA marketing syllabus and career roadmap in India"
    }
  },
  {
    "title": "BBA in Investment Banking: Course, Eligibility, Careers & Scope",
    "date": "October, 2026",
    "href": "/schools/isme/blog/bba-in-investment-banking-course-eligibility-careers-scope",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/oct/1.png",
      "alt": "Students analysing financial models as part of a BBA in investment banking programme"
    }
  },
  {
    "title": "BBA in Family Business and Entrepreneurship: Subjects and Career Scope",
    "date": "September, 2026",
    "href": "/schools/isme/blog/bba-family-business-and-entrepreneurship-career-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/sept/5.png",
      "alt": "Statistics on family business succession challenges in India"
    }
  },
  {
    "title": "Global Business University: Which ISME Partnership Is Right for You?",
    "date": "September, 2026",
    "href": "/schools/isme/blog/global-business-university-pathways",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/sept/4.png",
      "alt": "Comparison of global business university pathway options"
    }
  },
  {
    "title": "BBA vs BSc: Which Degree Opens More Career Doors in India 2026?",
    "date": "September, 2026",
    "href": "/schools/isme/blog/bba-vs-bsc-which-is-better",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/sept/3.png",
      "alt": "Career path comparison between BBA and BSc graduates"
    }
  },
  {
    "title": "Financial Analyst Salary in India: Career Path After BBA in Finance",
    "date": "September, 2026",
    "href": "/schools/isme/blog/financial-analyst-salary-in-india-after-bba",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/sept/2.png",
      "alt": "Career path from BBA finance to financial analyst roles"
    }
  },
  {
    "title": "BBA Salary in India: What Freshers Can Realistically Expect in 2026",
    "date": "September, 2026",
    "href": "/schools/isme/blog/bba-salary-in-india-fresher-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/sept/1.png",
      "alt": "BBA salary in India per month chart for freshers in 2026"
    }
  },
  {
    "title": "BBA Branding and Advertising: Subjects, Scope and Careers 2026",
    "date": "August, 2026",
    "href": "/schools/isme/blog/bba-branding-and-advertising-subjects-scope-careers-2026",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/aug/5.png",
      "alt": "BBA branding and advertising subjects and curriculum overview for students"
    }
  },
  {
    "title": "Which BBA Course Is Best for You? A Practical BBA Degree Specialization Guide for 2026",
    "date": "August, 2026",
    "href": "/schools/isme/blog/bba-course-which-is-best-practical-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/aug/4.png",
      "alt": "Which BBA course is best in 2026 guide comparing top specialisations"
    }
  },
  {
    "title": "BBA FinTech: What It Is, Why It Is Growing and Career Options in 2026",
    "date": "August, 2026",
    "href": "/schools/isme/blog/bba-fintech-meaning-growth-career-options-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/aug/3.png",
      "alt": "BBA FinTech meaning and career overview for students exploring the degree"
    }
  },
  {
    "title": "BBA Finance Job Opportunities: Top Roles After BBA Degree in 2026",
    "date": "August, 2026",
    "href": "/schools/isme/blog/bba-finance-job-opportunities-roles-2026-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/aug/2.png",
      "alt": "BBA finance job opportunities overview showing top roles and salary in 2026"
    }
  },
  {
    "title": "BBA Entrepreneurship: Is This India's Most Underrated BBA Course ?",
    "date": "August, 2026",
    "href": "/schools/isme/blog/bba-entrepreneurship-underrated-bba-india-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/aug/1.png",
      "alt": "BBA entrepreneurship guide for students exploring India's most underrated BBA"
    }
  },
  {
    "title": "BBA in AI Subjects and Curriculum: What You Actually Learn",
    "date": "July, 2026",
    "href": "/schools/isme/blog/bba-in-ai-subjects-and-curriculum",
    "image": {
      "src": "/assets/images/thought-leadership/isme-july-5.png",
      "alt": "BBA in AI subjects and curriculum: What you actually learn"
    }
  },
  {
    "title": "BBA Colleges in Mumbai 2026: Fees, Placements and How to Choose the Right One",
    "date": "July, 2026",
    "href": "/schools/isme/blog/bba-colleges-in-mumbai-fees-placements-guide-2026",
    "image": {
      "src": "/assets/images/thought-leadership/isme-july-4.png",
      "alt": "types of BBA colleges in Mumbai including private universities, deemed universities, Mumbai University affiliated colleges, and autonomous colleges"
    }
  },
  {
    "title": "2+1 UK Degree for Indian Students: What It Means and How It Works",
    "date": "July, 2026",
    "href": "/schools/isme/blog/2-1-uk-degree-for-indian-students-what-it-means-and-how-it-works",
    "image": {
      "src": "/assets/images/thought-leadership/isme-july-3.png",
      "alt": "2+1 UK degree for Indian students: What it means and how it works"
    }
  },
  {
    "title": "BBA in Business Psychology: Salary, Jobs & Why Brands Want Business Psychology Graduates",
    "date": "July, 2026",
    "href": "/schools/isme/blog/bba-in-psychology-business-psychology-careers-guide",
    "image": {
      "src": "/assets/images/thought-leadership/isme-july-2.png",
      "alt": "how a business psychology degree and BBA in psychology prepares students for careers in marketing, HR, consulting, and customer experience"
    }
  },
  {
    "title": "BBA Business Analytics Career: Jobs That Didn't Exist 5 Years Ago",
    "date": "July, 2026",
    "href": "/schools/isme/blog/bba-business-analytics-careers-jobs-future-guide",
    "image": {
      "src": "/assets/images/thought-leadership/isme-july-1.png",
      "alt": "Infographic showing emerging career roles for BBA business analytics graduates across AI, customer analytics, product, sustainability, and operations in 2026"
    }
  },
  {
    "title": "MBA in FinTech: What India's Fastest-Growing Sector Needs Now",
    "date": "June, 2026",
    "href": "/schools/isme/blog/mba-in-fintech-india-scope-careers-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/june/5.png",
      "alt": "Infographic showing why MBA in FinTech is emerging as relevant postgraduate programs."
    }
  },
  {
    "title": "BBA in Digital Marketing Trends 2026: What Every Student Must Know",
    "date": "June, 2026",
    "href": "/schools/isme/blog/bba-in-digital-marketing-trends-2026-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/june/4.png",
      "alt": "Infographic showing digital marketing trends that BBA in digital marketing students must understand."
    }
  },
  {
    "title": "BBA International Business: Career Scope in a Post-COVID Global Economy",
    "date": "June, 2026",
    "href": "/schools/isme/blog/bba-international-business-scope-salary-careers-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/june/3.png",
      "alt": "Infographic showing BBA international business scope across six career sectors including consulting, finance, logistics, and e-commerce."
    }
  },
  {
    "title": "BBA in AI vs B tech in Artificial Intelligence: Which Degree Leads to Better AI Careers",
    "date": "June, 2026",
    "href": "/schools/isme/blog/bba-in-ai-vs-btech-artificial-intelligence-career-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/june/2.png",
      "alt": "comparing BBA in AI and B tech in artificial intelligence across thinking style, curriculum, and career."
    }
  },
  {
    "title": "BBA Business Analytics Subjects and Tools: What the Curriculum Really Covers",
    "date": "June, 2026",
    "href": "/schools/isme/blog/bba-business-analytics-subjects-syllabus-tools-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/june/1.png",
      "alt": "Visual showing the core BBA business analytics subjects including management, statistics, predictive analytics, and financial analysis"
    }
  },
  {
    "title": "BBA in Business Psychology: The Degree Built on Understanding People",
    "date": "May, 2026",
    "href": "/schools/isme/blog/bba-in-business-psychology-career-guide-india",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/may/5.png",
      "alt": "Infographic showing how a BBA in business psychology combines management thinking with psychological principles across organisations, markets, and decisions"
    }
  },
  {
    "title": "BBA Business Analytics vs Data Science After 12th: Which Should You Choose?",
    "date": "May, 2026",
    "href": "/schools/isme/blog/bba-business-analytics-vs-data-science-after-12th",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/may/4.png",
      "alt": "Infographic comparing BBA business analytics and data science after 12th across thinking style, subjects, tools, and career outcomes"
    }
  },
  {
    "title": "BBA in AI: Is Artificial Intelligence Changing How Business Works?",
    "date": "May, 2026",
    "href": "/schools/isme/blog/bba-in-ai-artificial-intelligence-business-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/may/3.png",
      "alt": "Infographic showing how a BBA in AI prepares students for AI-driven business roles across marketing, finance, HR, operations, and entrepreneurship"
    }
  },
  {
    "title": "BBA Marketing vs BBA Digital Marketing: Real Difference in 2026?",
    "date": "May, 2026",
    "href": "/schools/isme/blog/bba-marketing-vs-bba-digital-marketing-difference",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/may/2.png",
      "alt": "Infographic comparing BBA marketing and BBA digital marketing across subjects, skills, and career outcomes"
    }
  },
  {
    "title": "BBA Digital Marketing Subjects, Tools and What the Course Teaches",
    "date": "May, 2026",
    "href": "/schools/isme/blog/bba-in-digital-marketing-subjects-syllabus-guide",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/may/1.png",
      "alt": "Infographic showing core BBA in digital marketing subjects including SEO, social media, analytics, content strategy, and e-commerce"
    }
  },
  {
    "title": "BBA in Business Psychology: What It Is and Why It Is Trending in India",
    "date": "April, 2026",
    "href": "/schools/isme/blog/bba-in-business-psychology-degree-careers-india",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/april/4.png",
      "alt": "Infographic explaining what a BBA in Business Psychology degree covers in India"
    }
  },
  {
    "title": "Integrated BBA-MBA After 12th: Is the 5-Year Program Worth It?",
    "date": "April, 2026",
    "href": "/schools/isme/blog/bba-mba-integrated-course-after-12th-worth-it",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/april/3.png",
      "alt": "Diagram showing the five-year structure of a BBA MBA integrated course in India"
    }
  },
  {
    "title": "BBA in Finance and the Wealth Management Career Nobody Talks About",
    "date": "April, 2026",
    "href": "/schools/isme/blog/bba-in-finance-wealth-management-career-india",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/april/2.png",
      "alt": "Infographic showing career paths available after completing a BBA in finance in India"
    }
  },
  {
    "title": "BBA Branding & Advertising: What Brands Are Hiring For?",
    "date": "April, 2026",
    "href": "/schools/isme/blog/bba-branding-and-advertising-careers-2026",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/april/1.png",
      "alt": "Infographic showing top career roles for BBA branding and advertising graduates in 2026"
    }
  },
  {
    "title": "Can BBA in Digital Marketing Help You Monetise Instagram or YouTube?",
    "date": "March, 2026",
    "href": "/schools/isme/blog/can-bba-digital-marketing-help-monetise-social-media",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/march/5.png",
      "alt": "Overview infographic showing how a BBA in digital marketing connects to the creator economy on Instagram and YouTube"
    }
  },
  {
    "title": "Can BBA in Banking and Finance Help You Crack Investment Banking Roles?",
    "date": "March, 2026",
    "href": "/schools/isme/blog/bba-in-banking-and-finance-investment-banking-career",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/march/4.png",
      "alt": "Overview graphic showing how a BBA in banking and finance connects to investment banking career pathways in India"
    }
  },
  {
    "title": "How BBA Business Analytics Helps Build Data-Driven Startups",
    "date": "March, 2026",
    "href": "/schools/isme/blog/bba-business-analytics-data-driven-startup",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/march/3.png",
      "alt": "bba business analytics students using data to build and scale data-driven startups"
    }
  },
  {
    "title": "What AI-Based Projects Do Students Work On in BBA Artificial Intelligence?",
    "date": "March, 2026",
    "href": "/schools/isme/blog/bba-artificial-intelligence-projects",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/march/2.png",
      "alt": "students working on AI-based projects in bba artificial intelligence including data analysis and business strategy"
    }
  },
  {
    "title": "Which BBA Degree Specialisation Has the Highest ROI in 2026?",
    "date": "March, 2026",
    "href": "/schools/isme/blog/bba-degree-highest-roi-specialisation",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/march/1.png",
      "alt": "bba degree specialisations like business analytics and digital marketing with high ROI and career growth in 2026"
    }
  },
  {
    "title": "Bachelor of Management Studies vs BBA: Which Course is Better for You?",
    "date": "February, 2026",
    "href": "/schools/isme/blog/bachelor-of-management-studies-vs-bba",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/feb/1.png",
      "alt": "Comparison between BBA in Management and Bachelor of Management Studies courses covering subjects, career opportunities, and management education pathways"
    }
  },
  {
    "title": "BBA in International Business: Eligibility, Colleges, and Career Options",
    "date": "February, 2026",
    "href": "/schools/isme/blog/bba-in-international-business-eligibility-colleges-career-options",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/feb/2.png",
      "alt": "Students learning global trade strategies and international business management concepts in a BBA in International Business program at Atlas University."
    }
  },
  {
    "title": "BBA Finance Without CA or CFA – Is It Still a Smart Career Move?",
    "date": "February, 2026",
    "href": "/schools/isme/blog/bba-finance-without-ca-or-cfa",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/feb/3.png",
      "alt": "career options after bba finance without ca or cfa"
    }
  },
  {
    "title": "Business Management and Administration Degree: Career & Salary",
    "date": "February, 2026",
    "href": "/schools/isme/blog/business-management-and-administration-degree",
    "image": {
      "src": "/assets/images/schools/isme/thought-leaderships/feb/4.png",
      "alt": "career paths after business management and administration degree"
    }
  }
];
