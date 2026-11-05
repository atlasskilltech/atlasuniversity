/**
 * School of Law Thought Leadership listing — reference/law/thought-leaderships/index.php, which curls
 * `uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/law` per request and renders one
 * `.card.type-b-responsive` per published law blog. The feed is UAT, so — exactly like the ATLAS and
 * ISDI listings — it is SNAPSHOTTED here by the scratchpad's lu/gen_tl.py (taken 2026-11-02:
 * 4 published). Card images are the reference's own `thought-leaderships/assets/…` files,
 * copied byte-for-byte; each card links to the local /schools/law/blog/{slug} detail route, which reads
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
  "href": "/schools/ugdx/thought-leaderships#blog-section"
 },
 {
  "label": "LAW",
  "href": "/schools/law/thought-leaderships",
  "active": true
 }
];

export const cards = [
 {
  "title": "Top Law Colleges in India 2026: Rankings, Fees and What to Choose for BA LLB",
  "date": "September, 2026",
  "href": "/schools/law/blog/top-law-colleges-in-india-2026-rankings-fees-guide",
  "image": "/assets/images/schools/law/thought-leaderships/sept/4.png",
  "alt": "Top law colleges in India 2026 rankings and fees overview guide"
 },
 {
  "title": "Intellectual Property Law in India: Career Guide for BA LLB and BBA LLB Students",
  "date": "September, 2026",
  "href": "/schools/law/blog/intellectual-property-law-india-career-guide-law-students",
  "image": "/assets/images/schools/law/thought-leaderships/sept/3.png",
  "alt": "Intellectual property law in India career guide overview for law students"
 },
 {
  "title": "Cyber Law Degree in India 2026: Why Every Student Needs to Understand It",
  "date": "September, 2026",
  "href": "/schools/law/blog/cyber-law-degree-india-why-students-need-it-2026",
  "image": "/assets/images/schools/law/thought-leaderships/sept/2.png",
  "alt": "Cyber law degree in India why every student needs it in 2026 overview"
 },
 {
  "title": "Advocate vs Lawyer in India: What Is the Real Difference?",
  "date": "September, 2026",
  "href": "/schools/law/blog/advocate-vs-lawyer-india-real-difference-guide",
  "image": "/assets/images/schools/law/thought-leaderships/sept/1.png",
  "alt": "Advocate vs lawyer India difference overview for law students and public"
 }
];

