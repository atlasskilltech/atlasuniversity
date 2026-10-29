/**
 * /schools/isdi/thought-leaderships content — transcribed from the production render of
 * reference/schools/isdi/thought-leaderships/index.php.
 *
 * The page curls a UAT API (uat-dashboard.atlasskilltech.app/api/atlas-blogs/by-school/isdi)
 * per request and renders one `.card` (card-a, variant type-b-responsive) per published
 * ISDI blog. The feed is UAT, so — like the ATLAS homepage Thought Leadership section — it
 * is SNAPSHOTTED here. The 44 card images are the atlas-domain month/N.png files already
 * mirrored in reference/.../thought-leaderships/assets, converted to WebP. The hero image is
 * the CDN `publication-image` (downloaded byte-for-byte). Re-run the snapshot to refresh.
 *
 * `card.href` is the absolute production blog URL the API returns; the ISDI blog is not
 * ported, so these stay absolute. The cross-school tabs likewise keep their production URLs.
 */

export const hero = {
  "height": "658",
  "title": "Thought Leadership",
  // This page reuses the About sheet (`$css` = …68e7936f…) but its inline <style>
  // redefines .h1-tag with no 44px step, so the heading holds 56px from 992 down to
  // 767 on production. Suppress About/Hero's shared 44px (<=991) ladder step.
  "midHeading": false,
  "image": {
    "src": "/assets/images/schools/isdi/thought-leaderships/hero/publication-image.webp",
    "srcSet": "/assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-500.webp 500w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-800.webp 800w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image-p-1080.webp 1080w, /assets/images/schools/isdi/thought-leaderships/hero/publication-image.webp 1366w",
    "sizes": "(max-width: 1439px) 100vw, 1365.9896240234375px",
    "alt": ""
  }
};

export const tabs = [
  {
    "label": "ATLAS",
    "href": "https://atlasuniversity.edu.in/thought-leaderships#blog-section"
  },
  {
    "label": "ISDI",
    "href": "/schools/isdi/thought-leaderships",
    "active": true
  },
  {
    "label": "ISME",
    "href": "https://atlasuniversity.edu.in/schools/isme/thought-leaderships#blog-section"
  },
  {
    "label": "uGDX",
    "href": "https://atlasuniversity.edu.in/schools/ugdx/thought-leaderships#blog-section"
  },
  {
    "label": "LAW",
    "href": "https://atlasuniversity.edu.in/schools/law/thought-leaderships#blog-section"
  }
];

export const cards = [
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/6.webp",
      "alt": "A UX designer researching patient needs for a healthcare app"
    },
    "title": "Healthcare UX Design: What Does a BDes UX Designer Do?",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/healthcare-ux-design-roles-and-skills"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/5.webp",
      "alt": "Students exploring fashion-tech careers after a technology-focused degree"
    },
    "title": "Career Paths in Fashion-Tech After a Bachelor in Fashion Technology",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/career-paths-after-bachelor-in-fashion-technology-degree"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/4.webp",
      "alt": "Students comparing fashion design and fashion brand management career paths"
    },
    "title": "Fashion and Luxury Brand Management vs Fashion Design: Key Differences",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/fashion-brand-management-vs-fashion-design"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/3.webp",
      "alt": "Eight areas covered by eLearning development services"
    },
    "title": "How Technology & AI Is Changing B Des Communication Design",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/how-ai-is-changing-b-des-communication-design"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/2.webp",
      "alt": "structure for an animation portfolio showreel including strongest work first and project order"
    },
    "title": "How to Build an Animation and VFX Portfolio: B Des in Animation Students Guide",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/how-to-build-an-animation-portfolio"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/oct/1.webp",
      "alt": "Students exploring a BDes interior design programme and its curriculum"
    },
    "title": "BDes Interior Design vs Spatial Design: What’s the Difference?",
    "date": "October, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/bdes-interior-design-vs-spatial-design"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/sept/5.webp",
      "alt": "Best design schools in the world Parsons UAL SCAD comparison overview"
    },
    "title": "Parsons vs UAL vs SCAD: Which of the Best Design Schools in the World Is Right for You?",
    "date": "September, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/parsons-ual-scad-best-design-schools-world-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/sept/4.webp",
      "alt": "fashion design degree and fashion merchandising career in India overview"
    },
    "title": "Fashion Merchandising Career in India: Scope, Roles and Salary for Fashion Design Degree Students",
    "date": "September, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/fashion-design-degree-fashion-merchandising-career-india"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/sept/3.webp",
      "alt": "BA in animation and graphic design 3D jobs in India 2026 overview"
    },
    "title": "3D Animation Jobs in India 2026: BA in Animation Scope, Companies and Salary",
    "date": "September, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/ba-in-animation-graphic-design-3d-jobs-india-2026"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/sept/2.webp",
      "alt": "Graphic design degree and freelance career in India 2026 overview"
    },
    "title": "Graphic Design Degree and Freelance Career in India: How to Start in 2026",
    "date": "September, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/graphic-design-degree-freelance-career-india-2026"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/sept/1.webp",
      "alt": "Bachelor of interior design materials guide for B Des students India"
    },
    "title": "Interior Design Materials: What Every Bachelor of Interior Design Student Must Know",
    "date": "September, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/bachelor-of-interior-design-materials-guide-bdes"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/aug/5.webp",
      "alt": "Design school in Mumbai 2026 overview covering fashion interior animation design"
    },
    "title": "Design School in Mumbai 2026: Fashion, Interior, Animation and More",
    "date": "August, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/design-school-in-mumbai-fashion-interior-animation-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/aug/4.webp",
      "alt": "Motion graphics jobs in India overview for BDes and graphic design students"
    },
    "title": "Motion Graphics Jobs: Is This India's Most In-Demand BDes Degree Career in 2026?",
    "date": "August, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/motion-graphics-jobs-india-bdes-career-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/aug/3.webp",
      "alt": "How to become an interior designer after 12th in India pathway guide"
    },
    "title": "How to Become an Interior Designer After 12th in India",
    "date": "August, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/how-to-become-an-interior-designer-after-12th-india"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/aug/2.webp",
      "alt": "Fashion designer salary in India 2026 from fresher to creative head"
    },
    "title": "Fashion Designer Salary in India: What to Expect in 2026",
    "date": "August, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/fashion-designer-salary-in-india-2026-career-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/aug/1.webp",
      "alt": "Interior design portfolio guide for bachelor of interior design students"
    },
    "title": "How to Make an Interior Design Portfolio That Gets You Hired in 2026",
    "date": "August, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/interior-design-portfolio-guide-students-hired"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/july/5.webp",
      "alt": "Infographic showing product designer salary ranges in India 2026 for B Des product design graduates across entry, mid, senior, and leadership levels"
    },
    "title": "Product Designer Salary in India 2026: B Des Product Design Roles and Career Growth",
    "date": "July, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-product-design-salary-careers-india-2026"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/july/4.webp",
      "alt": "Infographic showing the best design schools in the world including Parsons School of Design, University of Arts London, and SCAD University with key strengths"
    },
    "title": "Best Design Schools in the World: Complete Guide for B Des Students in 2026",
    "date": "July, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/best-design-schools-in-the-world-bdes-student-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/july/3.webp",
      "alt": "Infographic showing how B Des fashion communication prepares students for careers in branding, styling, content creation, and fashion communication jobs across India"
    },
    "title": "B Des Fashion Communication in the Age of Reels: How Content Is Shaping Style Careers",
    "date": "July, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-fashion-communication-careers-reels-age-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/july/2.webp",
      "alt": "Infographic showing how B Des communication design students can balance AI-generated design with human creativity and strategic design thinking"
    },
    "title": "AI-Generated Design vs Human Creativity: What B Des Communication Design Students Need to Know",
    "date": "July, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-communication-design-ai-generated-design-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/july/1.webp",
      "alt": "Comparing B Des interior design and BSc interior design across curriculum focus, learning approach, and career outcomes in India"
    },
    "title": "B Des Interior Design vs BSc: Which Interior Design Degree Gets You Hired Faster?",
    "date": "July, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-interior-design-vs-bsc-career-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/june/5.webp",
      "alt": "Infographic comparing strategic design management and MBA in design management across thinking style, learning approach, and career outcomes"
    },
    "title": "Strategic Design Management vs MBA in Design: Which Suits Creative Leaders?",
    "date": "June, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/strategic-design-management-vs-mba-in-design-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/june/4.webp",
      "alt": "Infographic showing how a fashion design degree in India is evolving to include sustainable fashion, technology, and circular design career paths"
    },
    "title": "Sustainable Fashion Design Degree: Why a Fashion Design Degree Is India's Next Big Career",
    "date": "June, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/sustainable-fashion-design-degree-india-career-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/june/3.webp",
      "alt": "Infographic showing how a B Des in animation and VFX degree connects to game design, XR, and emerging digital careers in India"
    },
    "title": "B Des in Animation & VFX: Is Game Design the Career No One Told You About?",
    "date": "June, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-in-animation-vfx-game-design-career-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/june/2.webp",
      "alt": "Infographic comparing a UI UX designer degree and product designer degree across scope, skills, career paths, and educational outcomes"
    },
    "title": "UI UX Designer Degree vs Product Design Degree: What's the Key Difference?",
    "date": "June, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/ui-ux-designer-degree-vs-product-designer-degree-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/june/1.webp",
      "alt": "Visual showing four categories of AI tools interior design degree students should know including concept generation, space planning, rendering, and personalisation"
    },
    "title": "AI Tools for Interior Design Degree: What BDes Student Needs to Know",
    "date": "June, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/interior-design-degree-ai-tools-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/may/3.webp",
      "alt": "Infographic showing what a fashion styling degree trains students to observe beyond aesthetics including narrative, culture, and visual communication"
    },
    "title": "Fashion Styling Degree Beyond Influencers: What Students Miss",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/fashion-styling-degree-beyond-influencers-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/may/2.webp",
      "alt": "Infographic showing what a product designer does across research, ideation, prototyping, and collaboration in a B Des product design career"
    },
    "title": "What Does a Product Designer Do? A B Des Product Design Day in the Life",
    "date": "May, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-product-design-day-in-the-life-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/may/1.webp",
      "alt": "Infographic explaining how biophilic interior design is reshaping interior design degree programs and student learning in 2026"
    },
    "title": "Biophilic Interior Design Degree: Why Students Must Know",
    "date": "May, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/biophilic-interior-design-degree-guide"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/april/5.webp",
      "alt": "A B Des Interior Design student in India using AI tools to visualise and refine spatial concepts in a studio environment"
    },
    "title": "How AI Is Changing Bdes Interior Design Education in India 2025",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-interior-design-and-ai-in-india-2026"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/april/4.webp",
      "alt": "A Grade 12 student building a B Des portfolio with sketches, notes, and design projects spread across a workspace"
    },
    "title": "How to Build a B.Des Portfolio: Step-by-Step Guide for 12th Students",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/how-to-build-a-bdes-portfolio"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/april/3.webp",
      "alt": "Side-by-side comparison of B Des Communication Design and b des graphic design showing differences in scope and outcomes"
    },
    "title": "Bdes Communication Design vs Graphic Design: Key Difference?",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-communication-design-vs-graphic-design"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/april/2.webp",
      "alt": "A visual showing strategic design management masters connecting design thinking with business strategy"
    },
    "title": "Strategic Design Management: Where Design Meets Business",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/strategic-design-management-where-design-meets-business"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/april/1.webp",
      "alt": "A student pursuing B Des Fashion Communication working on a brand storytelling project across digital platforms"
    },
    "title": "Fashion Communication Degree What It Is and Why Brands Need It Now",
    "date": "April, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/bdes-fashion-communication-careers-and-education"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/march/5.webp",
      "alt": "fashion styling degree course teaching visual storytelling, styling techniques, and fashion industry skills"
    },
    "title": "What Does a Fashion Styling Degree Actually Teach?",
    "date": "March, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/what-does-a-fashion-styling-degree-teach"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/march/4.webp",
      "alt": "A student working on design software as part of a visual communication degree curriculum"
    },
    "title": "What Software Will You Learn in a Visual Communication Degree?",
    "date": "March, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/visual-communication-degree-software"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/march/3.webp",
      "alt": "Comparison chart showing UI UX design degree versus self-learning paths and outcomes"
    },
    "title": "UI UX Design Degree vs Self-Learning – Do You Need College?",
    "date": "March, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/ui-ux-design-degree-vs-self-learning"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/march/2.webp",
      "alt": "Students working in a fashion design school in India during a studio session"
    },
    "title": "Fashion Design Schools in India: How to Choose the Right School",
    "date": "March, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/fashion-design-schools-in-india-how-to-choose"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/march/1.webp",
      "alt": "A split visual comparing an interior design degree path and an architecture degree path in India"
    },
    "title": "Interior Design Degree vs Architecture: Career Scope in India?",
    "date": "March, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/interior-design-degree-vs-architecture-career-india"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/feb/1.webp",
      "alt": "Students learning interior design degree concepts at Atlas University, one of the best institutes for interior designing in India"
    },
    "title": "Top Interior Designing Degree Program in India for 2026",
    "date": "February, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/interior-design-degree-india-2026"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/feb/2.webp",
      "alt": "Students learning at one of the best fashion schools in India offering fashion designing degree courses after 12th."
    },
    "title": "Fashion Designing Degree After 12th: Complete Career Guide",
    "date": "February, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/best-fashion-schools-fashion-designing-degree-after-12th"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/feb/3.webp",
      "alt": "Overview of B Des course details and structure"
    },
    "title": "What is B.Des? Course Details, Colleges, and Career Options",
    "date": "February, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/b-des-course-eligibility-career-options"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/feb/4.webp",
      "alt": "Students learning animation and graphic design degree concepts including VFX, digital illustration, and creative media production at Atlas University."
    },
    "title": "Animation and Graphic Design Degree: Everything You Need to Know",
    "date": "February, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/graphic-design-degree-animation-careers"
  },
  {
    "image": {
      "src": "/assets/images/schools/isdi/thought-leaderships/feb/5.webp",
      "alt": "Students exploring bachelor of design product design programs at one of the best product design colleges in India"
    },
    "title": "Best Product Design Degree Program & Career Path for Designers",
    "date": "February, 2026",
    "href": "https://atlasuniversity.edu.in/schools/isdi/blog/best-product-design-colleges-in-india"
  }
];
