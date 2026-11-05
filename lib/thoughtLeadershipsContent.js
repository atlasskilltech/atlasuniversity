/**
 * /thought-leaderships content — the ATLAS main Thought-Leadership LISTING, transcribed from the
 * production render of reference/thought-leaderships/thought-leaderships/index.php.
 *
 * The page curls the UAT API (uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/atlas)
 * per request and renders one `.card.type-b-responsive` per published ATLAS blog. The feed is UAT,
 * so — exactly like the ISDI Thought-Leadership page — it is SNAPSHOTTED here. The card images are
 * the `thought-leaderships/assets/images/<month>/N.png` files mirrored in the reference, copied
 * byte-for-byte (original PNG, no conversion) into public/assets/images/thought-leaderships/. Each
 * card links to the ATLAS blog DETAIL route `/atlas-blog/{slug}`. Re-run the snapshot to refresh.
 */

export const hero = {
  title: 'Thought Leadership',
  image: {
    src: '/assets/images/thought-leaderships/hero/publication-image.webp',
    srcSet:
      '/assets/images/thought-leaderships/hero/publication-image-p-500.webp 500w, /assets/images/thought-leaderships/hero/publication-image-p-800.webp 800w, /assets/images/thought-leaderships/hero/publication-image-p-1080.webp 1080w, /assets/images/thought-leaderships/hero/publication-image.webp 1366w',
    sizes: '(max-width: 1439px) 100vw, 1365.9896240234375px',
    alt: '',
  },
};

// The five-school tab strip; ATLAS is active (this page). Every school's listing is now a built local
// route, so all five point here rather than at production as the reference authors them.
export const tabs = [
  { label: 'ATLAS', href: '/thought-leaderships', active: true },
  { label: 'ISDI', href: '/schools/isdi/thought-leaderships' },
  { label: 'ISME', href: '/schools/isme/thought-leaderships#blog-section' },
  { label: 'uGDX', href: '/schools/ugdx/thought-leaderships#blog-section' },
  { label: 'LAW', href: '/schools/law/thought-leaderships#blog-section' },
];

export const cards = [
  {
    title: "Difference Between Deemed University and Private University In India: What Students Must Know",
    date: "September, 2026",
    href: "/atlas-blog/deemed-university-vs-private-university-india-guide",
    image: "/assets/images/thought-leaderships/sept/1.png",
    alt: "difference between deemed university and private university in India overview",
  },
  {
    title: "ATLAS SkillTech University Ranking in India: What the Numbers Say in 2026",
    date: "August, 2026",
    href: "/atlas-blog/atlas-skilltech-university-ranking-india-2026-guide",
    image: "/assets/images/thought-leaderships/aug/5.png",
    alt: "Infographic showing how to interpret ATLAS SkillTech University ranking in India 2026 including NIRF and QS ranking methodologies",
  },
  {
    title: "Best Career Options After 12th Arts: High-Paying Paths for 2026",
    date: "August, 2026",
    href: "/atlas-blog/career-options-after-12th-arts-high-paying-guide-2026",
    image: "/assets/images/thought-leaderships/aug/4.png",
    alt: "best career options after 12th arts in 2026 including law, design, business, psychology, media, and UX research",
  },
  {
    title: "BBA Hons Meaning: How It Differs From Regular BBA in 2026",
    date: "August, 2026",
    href: "/atlas-blog/bba-hons-meaning-difference-from-regular-bba-guide",
    image: "/assets/images/thought-leaderships/aug/3.png",
    alt: "BBA Hons meaning, BBA Hons full form, and how bba hons differs from a regular BBA",
  },
  {
    title: "Corporate Lawyer Salary in India 2025: From Fresher to Partner",
    date: "August, 2026",
    href: "/atlas-blog/corporate-lawyer-salary-in-india-fresher-to-partner-guide",
    image: "/assets/images/thought-leaderships/aug/2.png",
    alt: "Infographic showing corporate lawyer salary in India across career stages from fresher at ₹4–10 LPA to partner at ₹1 crore plus",
  },
  {
    title: "Types of Law Degrees in India: Which Specialisation Pays the Most in 2026?",
    date: "August, 2026",
    href: "/atlas-blog/types-of-law-degrees-india-ba-llb-salary-guide",
    image: "/assets/images/thought-leaderships/aug/1.png",
    alt: "Infographic showing types of law degrees in India including BA LLB, BBA LLB, BCom LLB, three-year LLB law degree, and LLM with key differences",
  },
  {
    title: "How to Study Abroad From India: Options, Cost and Planning Guide 2026",
    date: "April, 2026",
    href: "/atlas-blog/how-to-study-abroad-from-india-options-cost-guide",
    image: "/assets/images/thought-leaderships/july/5.png",
    alt: "Infographic showing how to study abroad from India covering pathways, costs, exchange programs, scholarships, and planning steps",
  },
  {
    title: "How Industry Academia Collaboration in College Gives You a Real Career Edge",
    date: "July, 2026",
    href: "/atlas-blog/industry-academia-collaboration-college-career-edge-guide",
    image: "/assets/images/thought-leaderships/july/4.png",
    alt: "how industry academia collaboration benefits students through live projects, mentorship, internships, and real-world learning in college",
  },
  {
    title: "Moot Court in Law School: How It Shapes Real BA LLB Students in India",
    date: "July, 2026",
    href: "/atlas-blog/moot-court-meaning-competition-ba-llb-guide",
    image: "/assets/images/thought-leaderships/july/3.png",
    alt: "Infographic showing what moot court is, its meaning, and how it shapes BA LLB and LLB law degree students into practice-ready lawyers in India",
  },
  {
    title: "Career Guidance for Students: How to Choose the Right Career Path in 2026",
    date: "July, 2026",
    href: "/atlas-blog/career-guidance-for-students-options-after-12th-guide",
    image: "/assets/images/thought-leaderships/july/2.png",
    alt: "how career guidance for students helps navigate career options after 12th across  business, design, technology, media, and social sciences",
  },
  {
    title: "BBA LLB Degree: Complete Details on Duration, Subjects and Career Options",
    date: "July, 2026",
    href: "/atlas-blog/bba-llb-degree-details-subjects-duration-careers",
    image: "/assets/images/thought-leaderships/july/1.png",
    alt: "complete BBA LLB degree details including duration, subjects, eligibility, and career options after the programme",
  },
  {
    title: "BBA vs BCA: Which Should You Choose After 12th? Salary & Career Guide",
    date: "June, 2026",
    href: "/atlas-blog/bba-vs-bca-career-salary-guide",
    image: "/assets/images/thought-leaderships/june/4.png",
    alt: "Infographic comparing BBA vs BCA across career paths, salary potential, skills developed, and industries in India 2025",
  },
  {
    title: "Top BBA Colleges in India 2025: Rankings, Fees and Placements",
    date: "June, 2026",
    href: "/atlas-blog/top-bba-colleges-in-india-rankings-fees-placements",
    image: "/assets/images/thought-leaderships/june/3.png",
    alt: "Infographic comparing the top BBA colleges in India by fees, placement packages, and key distinguishing features for 2025",
  },
  {
    title: "MBA in Law After LLB: Why Lawyers Are Pivoting to Business Management",
    date: "June, 2026",
    href: "/atlas-blog/mba-in-law-after-llb-career-guide",
    image: "/assets/images/thought-leaderships/june/2.png",
    alt: "Infographic showing why legal professionals are choosing an MBA in law after LLB to move into business management and leadership roles",
  },
  {
    title: "LLB After Graduation: Is a Law Career Switch Worth It ?",
    date: "June, 2026",
    href: "/atlas-blog/llb-after-graduation-career-switch-guide",
    image: "/assets/images/thought-leaderships/june/1.png",
    alt: "Infographic showing why professionals from engineering, commerce, science, and management are choosing LLB after graduation in India",
  },
  {
    title: "BBA LLB Subjects & Syllabus: Semester-Wise Complete Breakdown",
    date: "May, 2026",
    href: "/atlas-blog/bba-llb-subjects-syllabus-semester-wise",
    image: "/assets/images/thought-leaderships/may/1.png",
    alt: "Infographic showing BBA LLB subjects organised semester-wise across all 10 semesters",
  },
  {
    title: "AI and LLB Law in India: How Legal Tech Is Reshaping the Profession",
    date: "May, 2026",
    href: "/atlas-blog/llb-law-legal-tech-india-ai-reshaping-profession",
    image: "/assets/images/thought-leaderships/may/2.png",
    alt: "Infographic showing how legal tech India is transforming LLB law careers through AI and automation",
  },
  {
    title: "Top Emerging Careers in Commerce after 12th",
    date: "May, 2026",
    href: "/atlas-blog/top-careers-in-commerce-after-12th",
    image: "/assets/images/thought-leaderships/may/3.png",
    alt: "Infographic showing top emerging careers in commerce after 12th including fintech, BBA, LLB, and business analytics",
  },
  {
    title: "Can a Science Student Do a BBA Degree After 12th?",
    date: "May, 2026",
    href: "/atlas-blog/bba-after-12th-science-eligibility-careers",
    image: "/assets/images/thought-leaderships/may/4.png",
    alt: "Infographic explaining BBA after 12th science eligibility and why science students are choosing BBA degrees",
  },
  {
    title: "Global Business Management Trends Students Must Know",
    date: "May, 2026",
    href: "/atlas-blog/global-business-management-trends-students-must-know",
    image: "/assets/images/thought-leaderships/may/5.png",
    alt: "Infographic showing top global business management trends in 2026 including AI, analytics, and entrepreneurial thinking",
  },
  {
    title: "Is BBA Worth It in 2026? Honest Pros, Cons & Career Reality",
    date: "April, 2026",
    href: "/atlas-blog/is-bba-degree-worth-it-2026",
    image: "/assets/images/thought-leaderships/april/5.png",
    alt: "Infographic asking whether a BBA degree is worth it in 2026 showing credential versus capability distinction",
  },
  {
    title: "BA LLB vs BBA LLB: Which Law Program to Choose in 2026",
    date: "April, 2026",
    href: "/atlas-blog/ba-llb-vs-bba-llb-which-law-program-to-choose",
    image: "/assets/images/thought-leaderships/april/4.png",
    alt: "Overview comparison graphic of BA LLB vs BBA LLB programs showing structure curriculum and orientation differences",
  },
  {
    title: "How to Become a Lawyer in India After 12th: Full Roadmap",
    date: "April, 2026",
    href: "/atlas-blog/how-to-become-a-lawyer-in-india",
    image: "/assets/images/thought-leaderships/april/3.png",
    alt: "Step-by-step roadmap showing how to become a lawyer in India after 12th",
  },
  {
    title: "Best Law School in Mumbai: Programs, Fees & Admission 2026",
    date: "April, 2026",
    href: "/atlas-blog/best-law-school-in-mumbai",
    image: "/assets/images/thought-leaderships/april/2.png",
    alt: "Overview of the best law school in Mumbai showing campus and legal education environment",
  },
  {
    title: "Multidisciplinary University Education: Is It Right for You?",
    date: "April, 2026",
    href: "/atlas-blog/multidisciplinary-university-education-guide",
    image: "/assets/images/thought-leaderships/april/1.png",
    alt: "Diagram illustrating the concept of multidisciplinary university education integrating multiple disciplines",
  },
  {
    title: "Experiential Learning vs Traditional Learning: 2026 Guide",
    date: "March, 2026",
    href: "/atlas-blog/experiential-learning-vs-traditional-learning",
    image: "/assets/images/thought-leaderships/march/5.png",
    alt: "Side-by-side comparison infographic of experiential learning vs traditional learning",
  },
  {
    title: "Design School in Mumbai Without NID – Best Alternatives in 2026",
    date: "March, 2026",
    href: "/atlas-blog/design-school-in-mumbai-without-nid",
    image: "/assets/images/thought-leaderships/march/4.png",
    alt: "Students working on portfolio projects in a design school studio in Mumbai",
  },
  {
    title: "MBA with AI vs Traditional MBA : Which Has Better Career Growth?",
    date: "March, 2026",
    href: "/atlas-blog/mba-with-ai-vs-traditional-mba",
    image: "/assets/images/thought-leaderships/march/3.png",
    alt: "Comparison chart showing career growth paths for MBA with AI versus traditional MBA programs",
  },
  {
    title: "How Skilltech Universities Offer Industry Integrated Program",
    date: "March, 2026",
    href: "/atlas-blog/industry-integrated-program-guide",
    image: "/assets/images/thought-leaderships/march/1.png",
    alt: "Students working on a live industry project as part of a work integrated learning program",
  },
  {
    title: "How Experiential Learning Program Improves Placements",
    date: "March, 2026",
    href: "/atlas-blog/experiential-learning-program-placement",
    image: "/assets/images/thought-leaderships/march/1.png",
    alt: "Infographic showing how an experiential learning program improves student placement outcomes",
  },
  {
    title: "Practical Ways to Inspire Entrepreneurial Thinking at ATLAS",
    date: "February, 2026",
    href: "/atlas-blog/entrepreneurial-thinking-in-education",
    image: "/assets/images/thought-leaderships/feb/1.png",
    alt: "Students practicing entrepreneurial thinking in education environment",
  },
  {
    title: "10 Must-Have Entrepreneurship Skills in India",
    date: "February, 2026",
    href: "/atlas-blog/student-entrepreneur-skills-india",
    image: "/assets/images/thought-leaderships/feb/2.png",
    alt: "Student entrepreneur learning entrepreneurship training skills including leadership, innovation, startup planning, and business strategy at Atlas University India.",
  },
  {
    title: "8 Career Benefits of Design Education",
    date: "February, 2026",
    href: "/atlas-blog/design-education-career-benefits",
    image: "/assets/images/thought-leaderships/feb/3.png",
    alt: "Students learning creative skills through design education at a leading design school in India",
  },
  {
    title: "Top 10 Tech and Leadership Skills to Master in 2026",
    date: "February, 2026",
    href: "/atlas-blog/top-tech-leadership-skills-2026",
    image: "/assets/images/thought-leaderships/feb/4.png",
    alt: "top tech and leadership skills to learn in 2026",
  },
  {
    title: "7 Ways Experiential Learning Benefits New Graduates",
    date: "February, 2026",
    href: "/atlas-blog/experiential-learning-benefits-graduates",
    image: "/assets/images/thought-leaderships/feb/5.png",
    alt: "students gaining experiential learning benefits through projects",
  },
];
