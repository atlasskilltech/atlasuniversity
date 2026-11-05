/**
 * uGDX Thought Leadership listing — reference/ugdx/thought-leaderships/index.php, which curls
 * `uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/ugdx` per request and renders one
 * `.card.type-b-responsive` per published ugdx blog. The feed is UAT, so — exactly like the ATLAS and
 * ISDI listings — it is SNAPSHOTTED here by the scratchpad's lu/gen_tl.py (taken 2026-11-02:
 * 41 published). Card images are the reference's own `thought-leaderships/assets/…` files,
 * copied byte-for-byte; each card links to the local /schools/ugdx/blog/{slug} detail route, which reads
 * the same API live. Re-run the generator to refresh.
 */

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
  "href": "/schools/isme/thought-leaderships#blog-section"
 },
 {
  "label": "uGDX",
  "href": "/schools/ugdx/thought-leaderships",
  "active": true
 },
 {
  "label": "LAW",
  "href": "/schools/law/thought-leaderships#blog-section"
 }
];

export const cards = [
 {
  "title": "Top Hackathons in Mumbai for BTech CSE Students in 2026",
  "date": "October, 2026",
  "href": "/schools/ugdx/blog/top-hackathons-in-mumbai-for-btech-cse-students",
  "image": "/assets/images/schools/ugdx/thought-leaderships/oct/2.png",
  "alt": "BTech CSE students collaborating on a prototype during a hackathon in Mumbai"
 },
 {
  "title": "Best Data Science Colleges in Mumbai: 2026 List",
  "date": "October, 2026",
  "href": "/schools/ugdx/blog/data-science-colleges-in-mumbai-courses-fees-placements",
  "image": "/assets/images/schools/ugdx/thought-leaderships/oct/1.png",
  "alt": "Students comparing data science colleges in Mumbai by courses, fees and placements"
 },
 {
  "title": "B Tech in Robotics and Industry 4.0 in India: What Students Must Know",
  "date": "September, 2026",
  "href": "/schools/ugdx/blog/b-tech-in-robotics-industry-4-0",
  "image": "/assets/images/schools/ugdx/thought-leaderships/sept/5.png",
  "alt": "Role of robotics in India's Industry 4.0 transformation"
 },
 {
  "title": "Integrated B Tech and MBA: 5 Reasons It Beats Doing Them Separately",
  "date": "September, 2026",
  "href": "/schools/ugdx/blog/integrated-b-tech-and-mba-benefits",
  "image": "/assets/images/schools/ugdx/thought-leaderships/sept/4.png",
  "alt": "Five-year academic pathway of an integrated BTech MBA programme"
 },
 {
  "title": "BTech Cybersecurity Analyst Roadmap: Skills and What It Pays",
  "date": "September, 2026",
  "href": "/schools/ugdx/blog/btech-cybersecurity-analyst-career-roadmap",
  "image": "/assets/images/schools/ugdx/thought-leaderships/sept/3.png",
  "alt": "Cybersecurity analyst roadmap from fundamentals to first job"
 },
 {
  "title": "B Tech Artificial Intelligence Salary in India 2026: Full Breakdown",
  "date": "September, 2026",
  "href": "/schools/ugdx/blog/b-tech-artificial-intelligence-salary-2026",
  "image": "/assets/images/schools/ugdx/thought-leaderships/sept/2.png",
  "alt": "AI Engineer Monthly Salary Breakdown"
 },
 {
  "title": "Machine Learning Engineer Jobs: Skills, Roles and Salary in 2026",
  "date": "September, 2026",
  "href": "/schools/ugdx/blog/machine-learning-engineer-jobs-guide-2026",
  "image": "/assets/images/schools/ugdx/thought-leaderships/sept/1.png",
  "alt": "Machine learning engineer job description and core responsibilities"
 },
 {
  "title": "Which BTech Branch Is Best for Future? 2026 Data-Backed Answer",
  "date": "August, 2026",
  "href": "/schools/ugdx/blog/which-btech-branch-is-best-for-future-2026-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/aug/5.png",
  "alt": "Which BTech branch is best for future 2026 comparison guide overview"
 },
 {
  "title": "Data Engineer vs Data Scientist: Which Career Path Should You Choose?",
  "date": "August, 2026",
  "href": "/schools/ugdx/blog/data-engineer-vs-data-scientist-career-path-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/aug/3.png",
  "alt": "Data engineer vs data scientist career path comparison overview guide"
 },
 {
  "title": "B Tech in Robotics vs Mechanical Engineer: Career and Salary 2026",
  "date": "August, 2026",
  "href": "/schools/ugdx/blog/b-tech-in-robotics-vs-mechanical-engineer-career-salary-2026",
  "image": "/assets/images/schools/ugdx/thought-leaderships/aug/1.png",
  "alt": "B Tech in robotics versus mechanical engineering career overview 2026"
 },
 {
  "title": "Cloud Computing Career in India: Is It Worth Pursuing through Btech IT in 2026?",
  "date": "August, 2026",
  "href": "/schools/ugdx/blog/cloud-computing-career-india-worth-pursuing-2026",
  "image": "/assets/images/schools/ugdx/thought-leaderships/aug/2.png",
  "alt": "Cloud computing career in India 2026 overview of roles salary and demand"
 },
 {
  "title": "How to Become an AI Engineer in India: Step-by-Step Guide for 2026",
  "date": "August, 2026",
  "href": "/schools/ugdx/blog/how-to-become-an-ai-engineer-in-india-2026-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/aug/1.png",
  "alt": "How to become an AI engineer in India 2026 step-by-step career guide"
 },
 {
  "title": "Career Options After B Tech IT in India: Jobs and Salary in 2026",
  "date": "July, 2026",
  "href": "/schools/ugdx/blog/career-options-after-b-tech-it",
  "image": "/assets/images/schools/ugdx/thought-leaderships/july/4.png",
  "alt": "Students learning information technology concepts in a B Tech IT programme"
 },
 {
  "title": "How to Become a Robotics Engineer in India",
  "date": "July, 2026",
  "href": "/schools/ugdx/blog/how-to-become-a-robotics-engineer",
  "image": "/assets/images/schools/ugdx/thought-leaderships/july/3.png",
  "alt": "Engineering student building and programming a robot in a BTech in Robotics laboratory"
 },
 {
  "title": "BTech in Cybersecurity: Is It the Right Engineering Branch for 2026?",
  "date": "July, 2026",
  "href": "/schools/ugdx/blog/btech-in-cybersecurity",
  "image": "/assets/images/schools/ugdx/thought-leaderships/july/2.png",
  "alt": "Student learning cyber security concepts in a BTech cybersecurity engineering programme"
 },
 {
  "title": "What Is Generative AI and How to Build a Career Around It in 2026",
  "date": "July, 2026",
  "href": "/schools/ugdx/blog/generative-ai-career-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/july/1.png",
  "alt": "Student learning generative AI concepts and applications using AI-powered technology"
 },
 {
  "title": "Prompt Engineering Jobs: Complete Guide for BTech in Computer Science Students",
  "date": "June, 2026",
  "href": "/schools/ugdx/blog/btech-in-computer-science-prompt-engineering-jobs-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/june/5.png",
  "alt": "Infographic showing how prompt engineering jobs connect BTech in computer science and engineering skills to AI-driven careers across product, content, and automation roles"
 },
 {
  "title": "Robotics Companies in India: Career Guide for BTech in Robotics Students",
  "date": "June, 2026",
  "href": "/schools/ugdx/blog/btech-in-robotics-career-guide-companies-india",
  "image": "/assets/images/schools/ugdx/thought-leaderships/june/4.png",
  "alt": "Infographic showing how BTech in robotics prepares students for careers across robotics companies in India in manufacturing, logistics, healthcare, and AI systems"
 },
 {
  "title": "MBA in Information Technology: Career, Salary and Who Should Do It",
  "date": "June, 2026",
  "href": "/schools/ugdx/blog/mba-in-information-technology-career-salary-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/june/3.png",
  "alt": "Infographic showing career paths after MBA in information technology including consulting, product management, analytics, and enterprise technology roles"
 },
 {
  "title": "Btech Data Science vs b tech machine learning : Which Career Path Is Right ?",
  "date": "June, 2026",
  "href": "/schools/ugdx/blog/btech-data-science-vs-machine-learning-career-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/june/2.png",
  "alt": "Comparing btech data science vs machine learning BTech degrees across thinking style, curriculum focus, and career outcomes"
 },
 {
  "title": "B Tech Machine Learning Projects for Final Year: 10 Ideas That Get You Hired",
  "date": "June, 2026",
  "href": "/schools/ugdx/blog/b-tech-machine-learning-final-year-projects-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/june/1.png",
  "alt": "B Tech machine learning final year project ideas across finance, healthcare, consumer intelligence, infrastructure, and generative AI"
 },
 {
  "title": "BTech IT vs CSE: The Decision Most Engineering Students Get Wrong",
  "date": "May, 2026",
  "href": "/schools/ugdx/blog/btech-it-vs-cse-which-is-better",
  "image": "/assets/images/schools/ugdx/thought-leaderships/may/5.png",
  "alt": "Infographic comparing BTech IT and BTech CSE programmes across curriculum, careers, and salary"
 },
 {
  "title": "BTech in Cybersecurity Scope in India: Is This the Decade's Hottest Tech Career?",
  "date": "May, 2026",
  "href": "/schools/ugdx/blog/btech-in-cybersecurity-scope-career-india",
  "image": "/assets/images/schools/ugdx/thought-leaderships/may/4.png",
  "alt": "Infographic showing the growing scope of BTech in Cybersecurity across industries in India"
 },
 {
  "title": "BTech Machine Learning: What You Study and Why It Matters in 2026",
  "date": "May, 2026",
  "href": "/schools/ugdx/blog/b-tech-machine-learning-what-you-study-2026",
  "image": "/assets/images/schools/ugdx/thought-leaderships/may/3.png",
  "alt": "Infographic showing the structure and learning areas of a BTech Machine Learning programme in 2026"
 },
 {
  "title": "BTech Robotics and Automation: Future of Engineering or Niche Career?",
  "date": "May, 2026",
  "href": "/schools/ugdx/blog/btech-robotics-and-automation-career-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/may/2.png",
  "alt": "Infographic showing the interdisciplinary structure of a BTech Robotics and Automation programme"
 },
 {
  "title": "Integrated BTech and MTech: Is It the Smarter Path for Tech Leaders?",
  "date": "May, 2026",
  "href": "/schools/ugdx/blog/integrated-btech-and-mtech-program-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/may/1.png",
  "alt": "Infographic showing the structure of an integrated BTech and MTech programme over five years"
 },
 {
  "title": "Generative AI in BTech CS: What Students Learn and Why It Matters",
  "date": "April, 2026",
  "href": "/schools/ugdx/blog/btech-in-computer-science-generative-ai-curriculum-guide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/april/5.png",
  "alt": "Generative AI integration in the BTech in Computer Science curriculum overview"
 },
 {
  "title": "BTech in Robotics in India 2026: Industries, Companies and Why They're Growing",
  "date": "April, 2026",
  "href": "/schools/ugdx/blog/btech-in-robotics-india-2026-industries-companies",
  "image": "/assets/images/schools/ugdx/thought-leaderships/april/4.png",
  "alt": "Career scope and growth opportunities after BTech in Robotics in India 2026"
 },
 {
  "title": "BTech CSE AI and ML Syllabus: Complete Year 1 to Year 4 Breakdown",
  "date": "April, 2026",
  "href": "/schools/ugdx/blog/btech-cse-ai-and-ml-syllabus-year-1-to-year-4",
  "image": "/assets/images/schools/ugdx/thought-leaderships/april/3.png",
  "alt": "Year-wise syllabus breakdown of BTech CSE AI and ML from Year 1 to Year 4"
 },
 {
  "title": "BTech CS AI and Robotics vs BTech CS: Key Differences Explained",
  "date": "April, 2026",
  "href": "/schools/ugdx/blog/btech-cs-ai-and-robotics-vs-btech-cs",
  "image": "/assets/images/schools/ugdx/thought-leaderships/april/2.png",
  "alt": "Comparison chart between BTech CS AI and Robotics and BTech in Computer Science"
 },
 {
  "title": "How ATLAS Btech Students Reached NASA's HERC: The Full Story",
  "date": "April, 2026",
  "href": "/schools/ugdx/blog/btech-students-nasa-herc-india-first",
  "image": "/assets/images/schools/ugdx/thought-leaderships/april/1.png",
  "alt": "B Tech students from India qualifying as the first team for NASA HERC RC division"
 },
 {
  "title": "Top companies hiring BTech Robotics graduates in India",
  "date": "March, 2026",
  "href": "/schools/ugdx/blog/companies-hiring-btech-robotics-graduates-india",
  "image": "/assets/images/schools/ugdx/thought-leaderships/march/5.png",
  "alt": "A BTech Robotics graduate working alongside an industrial robotic arm in a smart manufacturing facility in India"
 },
 {
  "title": "BSc Computer Science Abroad vs India – Career Comparison",
  "date": "March, 2026",
  "href": "/schools/ugdx/blog/bsc-computer-science-abroad-vs-india",
  "image": "/assets/images/schools/ugdx/thought-leaderships/march/4.png",
  "alt": "Infographic comparing BSc Computer Science abroad vs India across career outcomes"
 },
 {
  "title": "Programming Languages in B Tech CSE Cyber Security",
  "date": "March, 2026",
  "href": "/schools/ugdx/blog/btech-cse-cyber-security-programming-languages",
  "image": "/assets/images/schools/ugdx/thought-leaderships/march/3.png",
  "alt": "Diagram showing programming languages taught in BTech CSE Cyber Security programs"
 },
 {
  "title": "Is btech data science too risky compared to traditional engineering?",
  "date": "March, 2026",
  "href": "/schools/ugdx/blog/btech-data-science-vs-traditional-engineering",
  "image": "/assets/images/schools/ugdx/thought-leaderships/march/2.png",
  "alt": "Comparison of BTech Data Science and traditional engineering career opportunities"
 },
 {
  "title": "BTech in Artificial Intelligence After 12th Without Coding",
  "date": "March, 2026",
  "href": "/schools/ugdx/blog/btech-artificial-intelligence-without-coding",
  "image": "/assets/images/schools/ugdx/thought-leaderships/march/1.png",
  "alt": "Learn BTech in Artificial Intelligence After 12th Without Coding"
 },
 {
  "title": "B.Tech vs B.Sc Computer Science: Which Degree To Choose?",
  "date": "February, 2026",
  "href": "/schools/ugdx/blog/btech-vs-bsc-computer-science",
  "image": "/assets/images/schools/ugdx/thought-leaderships/feb/1.png",
  "alt": "comparison of btech vs bsc computer science degrees"
 },
 {
  "title": "B.Tech Computer Science: Course Details, Syllabus, and Career",
  "date": "February, 2026",
  "href": "/schools/ugdx/blog/btech-computer-science-course-details",
  "image": "/assets/images/schools/ugdx/thought-leaderships/feb/2.png",
  "alt": "B.Tech Computer Science course subjects and structure"
 },
 {
  "title": "BSc Computer Science vs Computer Studies : Key Difference",
  "date": "February, 2026",
  "href": "/schools/ugdx/blog/bsc-computer-science-vs-computer-studies",
  "image": "/assets/images/schools/ugdx/thought-leaderships/feb/3.png",
  "alt": "difference between computer studies and bsc computer science"
 },
 {
  "title": "Where to do Masters in Computer Science: India vs Abroad?",
  "date": "February, 2026",
  "href": "/schools/ugdx/blog/masters-computer-science-india-vs-abroad",
  "image": "/assets/images/schools/ugdx/thought-leaderships/feb/4.png",
  "alt": "Masters of computer science in India vs abroad comparison"
 },
 {
  "title": "Top Computer Science Graduate Programs Worldwide",
  "date": "February, 2026",
  "href": "/schools/ugdx/blog/computer-science-graduate-programs-worldwide",
  "image": "/assets/images/schools/ugdx/thought-leaderships/feb/5.png",
  "alt": "Top computer science graduate programs worldwide"
 }
];

