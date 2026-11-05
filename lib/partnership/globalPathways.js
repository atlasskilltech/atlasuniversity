/**
 * /advantages/partnership/global-pathways content — transcribed from the production render of
 * reference/advantages/partnership/global-pathways.php (a Tailwind-CDN hybrid page over the
 * atlas-advantages sheet). Hero + 4-stat band + "About Global Pathways" story + three Tailwind
 * sections (12 university-partnership cards, 5 opportunity blocks, 3 student-testimonial videos).
 * Assets are mirrored byte-for-byte under public/assets/images/advantages/partnership/ (original
 * formats). The reference's hidden "Explore Center of Research" button (`.btn-wraper.hide`,
 * display:none) is dropped, as production paints nothing for it.
 */
export const hero = { title: "Global Pathways",
  // ref `.course-desc-isme.big-txt` under the h1 — the hero lead (omitted by the first port)
  text: "Creating International Futures",
  src: "/assets/images/advantages/partnership/global-pathways/herobanner/1366.jpg",
  srcSet: "/assets/images/advantages/partnership/global-pathways/herobanner/500.jpg 500w, /assets/images/advantages/partnership/global-pathways/herobanner/800.jpg 800w, /assets/images/advantages/partnership/global-pathways/herobanner/1080.jpg 1080w, /assets/images/advantages/partnership/global-pathways/herobanner/1366.jpg 1366w",
  alt: '' };

// Backgrounds from `.head-top-card.atlas-bg-1/3/2/3` (the order this page authors), reusing the
// shared atlas stat vectors (same values the completed Advantages/Industry bands use).
export const stats = [
  { value: '5+', label: 'Study Destinations', background: '#41418e', image: '/assets/images/campus/stats/vector-atlas-1.png', imagePosition: '100%' },
  { value: '10+', label: 'University Partnerships', background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-3.png', imagePosition: '100% 0' },
  { value: '35+', label: 'Transnational Opportunities', background: '#2e3074', image: '/assets/images/campus/stats/vector-atlas-2.png', imagePosition: '100%' },
  { value: '100%', label: 'Students on Scholarship', background: '#3a3c84', image: '/assets/images/campus/stats/vector-atlas-3.png', imagePosition: '100% 0' },
];

export const story = { heading: "About Global Pathways",
  text: "In line with the vision of the National Education Policy 2020, our Pathways offerings are designed to create meaningful global opportunities for students, enabling them to access international education in a flexible and progressive manner. These pathways open doors for students to begin their academic journey in India and seamlessly transition to partner institutions overseas, gaining valuable international exposure, cross-cultural perspectives, and a deeper understanding of global industry practices. By integrating academic mobility with experiential learning, we empower students to become globally competent, future-ready graduates.\n\nThrough structured Joint Degrees, Twinning Programs, and Dual Degrees, students benefit from internationally benchmarked curricula, shared academic delivery, and recognized qualifications across borders. These models not only enhance academic rigor but also provide opportunities to study in diverse learning environments, interact with global faculty, and build international networks. Our approach ensures that students experience the best of both worlds—strong foundational learning in India combined with immersive global exposure—aligned with evolving global education and career pathways.",
  image: "/assets/images/advantages/partnership/global-pathways/about-global-pathways/2.jpg",
  // ref: a visible 56px `.btn-primary` "Explore Center of Research" below the copy (its href is
  // `#` in the reference — a dead link — transcribed as authored, no destination invented)
  button: { label: 'Explore Center of Research', href: '#' } };

export const partners = [
  { schools: ["/assets/images/advantages/partnership/misc/ISME_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/northeastern-usa.jpg", alt: "Business Pathway", pathway: "Business Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/northeastern-usa.jpg", href: "/schools/isme/northeastern-university-london-global-business-pathway", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/scad-building.jpg", alt: "Design Pathway", pathway: "Design Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/scad.png", href: "/schools/isdi/scad", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/parsons-the-new-school.jpg", alt: "Design Pathway", pathway: "Design Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/parsons.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISME_Circle.png", "/assets/images/advantages/partnership/misc/INSOFE.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/university-of-british-columbia.jpg", alt: "Business Pathway<br>Technology Pathway", pathway: "Business Pathway<br/>Technology Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/ubc.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISME_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/lse.jpg", alt: "Business Pathway", pathway: "Business Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/lse.jpg", href: "/schools/isme/atlas-isme-advantage/internationalisation/london-school-of-economics", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/ual-lcc.jpg", alt: "Design Pathway", pathway: "Design Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/ual-lcc.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISME_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/smu.jpg", alt: "Business Pathway", pathway: "Business Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/smu.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png", "/assets/images/advantages/partnership/misc/ISME_Circle.png", "/assets/images/advantages/partnership/misc/INSOFE.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/ntu-uk.jpg", alt: "Design Pathway<br>Business Pathway<br>Technology Pathway", pathway: "Design Pathway<br/>Business Pathway<br/>Technology Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/ntu.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png", "/assets/images/advantages/partnership/misc/ISME_Circle.png", "/assets/images/advantages/partnership/misc/INSOFE.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/university-of-westminster.jpg", alt: "Design Pathway<br>Business Pathway<br>Technology Pathway", pathway: "Design Pathway<br/>Business Pathway<br/>Technology Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/westminster.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/nyfa.jpg", alt: "Design Pathway", pathway: "Design Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/nyfa.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/lau.jpg", alt: "Design Pathway", pathway: "Design Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/leeds-arts-university.jpg", href: "", btn: "Know More" },
  { schools: ["/assets/images/advantages/partnership/misc/ISDI_Circle.png", "/assets/images/advantages/partnership/misc/ISME_Circle.png", "/assets/images/advantages/partnership/misc/INSOFE.png"], photo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/victoria-university-of-wellington,-new-zealand.jpg", alt: "Design Pathway<br>Business Pathway<br>Technology Pathway", pathway: "Design Pathway<br/>Business Pathway<br/>Technology Pathway", logo: "/assets/images/advantages/partnership/global-pathways/our-partners-universities-for-global-pathways/logo/victoria.jpg", href: "", btn: "Know More" },
];

export const opportunities = [
  { title: "Joint Programs", text: "Joint Programs are collaborative academic offerings designed and delivered together by ATLAS SkillTech University and leading global partner universities. Students benefit from shared curriculum design, international faculty exposure, and a globally enriched learning experience. These programs reflect NEP’s vision of interdisciplinary and internationalised education.", image: "/assets/images/advantages/partnership/global-pathways/global-pathway-opportunities/joint-programs.jpg" },
  { title: "Dual Degrees", text: "Dual Degree programs enable students to earn two degrees from ATLAS and an international partner university through an integrated academic pathway. These programs enhance global employability, provide international exposure, and align with UGC guidelines on academic collaborations with foreign institutions.", image: "/assets/images/advantages/partnership/global-pathways/global-pathway-opportunities/dual-degree.jpg" },
  { title: "Twinning Programs", text: "Twinning Programs allow students to complete part of their degree at ATLAS and part at a partner university abroad. This structured mobility model ensures academic continuity, global exposure, and cost optimisation while following UGC’s international credit transfer frameworks.", image: "/assets/images/advantages/partnership/global-pathways/global-pathway-opportunities/twinning-program.jpg" },
  { title: "Pathway Programs", text: "Pathway Programs are structured progression routes that prepare students at ATLAS for seamless entry into undergraduate or postgraduate programs at partner universities worldwide. These pathways provide academic preparation, advising support, and credit alignment to enable smooth transitions.", image: "/assets/images/advantages/partnership/global-pathways/global-pathway-opportunities/pathways-programs.jpg" },
  { title: "Semester Abroad", text: "The Semester Abroad program gives students the opportunity to spend one semester or a year at an international partner university while continuing their ATLAS degree. Students gain global academic exposure, intercultural competencies, and transferable credits as per UGC mobility regulations.", image: "/assets/images/advantages/partnership/global-pathways/global-pathway-opportunities/semester-abroad.jpg" },
];

export const testimonialsLead = "Through ATLAS's extensive network of international university partnerships, students can access a range of global opportunities including dual degrees, joint programmes, semester exchanges, and international progression pathways. These transformative academic experiences enable students to study across multiple countries and institutions, gain diverse global perspectives, and graduate with internationally recognised qualifications, preparing them for successful careers and further studies in an increasingly interconnected world.";
export const testimonials = [
  { sources: ["/assets/images/advantages/partnership/global-pathways/testimonials/derezar-master/1.mp4"], poster: "/assets/images/advantages/partnership/global-pathways/testimonials/derezar-master/1.png" },
  { sources: ["/assets/images/advantages/partnership/global-pathways/testimonials/aditi-patil/1.mp4"], poster: "/assets/images/advantages/partnership/global-pathways/testimonials/aditi-patil/1.png" },
  { sources: ["/assets/images/advantages/partnership/global-pathways/testimonials/trisha-karamchandani/1.mp4"], poster: "/assets/images/advantages/partnership/global-pathways/testimonials/trisha-karamchandani/1.png" },
];

// ref global-pathways.php:1190-1257 "Global Pathways at ATLAS" — `.head-wrap.top` + `.sub-heading.mrgbtm`
// + a YouTube embed. Live on production; the first port omitted it. ("global pathways  is" — the
// authored double space collapses in HTML.)
export const atlasSection = {
  heading: 'Global Pathways at ATLAS',
  text: 'At ATLAS, global pathways is not an experience it is a perspective. Through curated international academic visits, industry interactions, and cultural explorations, students gain real-world global exposure that broadens their understanding of international practices, innovation ecosystems, and diverse ways of thinking.',
  youtubeId: 'zzX0vtHhOg8',
};
