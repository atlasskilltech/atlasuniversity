/**
 * /advantages/partnership/collaborative-projects content — transcribed from production
 * (reference/advantages/partnership/collaborative-projects.php). Hero + 4-stat band + About story +
 * a 5-card `CareerSupportCard` carousel + four media carousels (Study In India, COIL Projects,
 * International Collaborative Projects, Visiting Student Delegations) + a Research Partnerships text
 * block + a closing text block. Assets mirrored byte-for-byte under
 * public/assets/images/advantages/partnership/. The 11 "Research Partnerships" partner logos are
 * `atlas-global/wp-content` refs that are **broken on production itself** (403, naturalWidth 0), so
 * they are omitted (documented reference defect — no logos invented).
 */
export const hero = { title: "Collaborative Projects",
  // ref `.course-desc-isme.big-txt` under the h1 — the hero lead (omitted by the first port)
  text: "Global Learning Together", src: "/assets/images/advantages/partnership/collaborative-projects/herobanner/1366.png",
  srcSet: "/assets/images/advantages/partnership/collaborative-projects/herobanner/500.png 500w, /assets/images/advantages/partnership/collaborative-projects/herobanner/800.png 800w, /assets/images/advantages/partnership/collaborative-projects/herobanner/1080.png 1080w, /assets/images/advantages/partnership/collaborative-projects/herobanner/1366.png 1366w", alt: '' };

export const stats = [
  {
    "value": "50+",
    "label": "International Universities & Delegations",
    "background": "#41418e",
    "image": "/assets/images/campus/stats/vector-atlas-1.png",
    "imagePosition": "100%"
  },
  {
    "value": "75+",
    "label": "International Collaborative Engagements",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  },
  {
    "value": "300+",
    "label": "Global Students On Campus",
    "background": "#2e3074",
    "image": "/assets/images/campus/stats/vector-atlas-2.png",
    "imagePosition": "100%"
  },
  {
    "value": "1200+",
    "label": "ATLAS Students impacted",
    "background": "#3a3c84",
    "image": "/assets/images/campus/stats/vector-atlas-3.png",
    "imagePosition": "100% 0"
  }
];

// Note: unlike /advantages/partnership/global-pathways, this page's "Explore Center of Research"
// button is `.btn-wraper.hide` (display:none, 0px) on production — so no button is rendered here.
export const story = { heading: "Collaborative Projects", image: "/assets/images/advantages/partnership/collaborative-projects/collaborative-projects/1.png",
  text: "Our Collaborative Projects are designed to bring global learning into the classroom by connecting students with international partner universities on shared academic assignments and real-world challenges. Working in diverse, cross-cultural teams, students engage in joint coursework, design sprints, case studies, and research-led projects, enabling them to apply their knowledge in a truly global context. This approach fosters critical thinking, adaptability, and the ability to collaborate effectively across geographies—key skills for today’s interconnected world.\n\nAligned with the vision of the National Education Policy 2020, these projects emphasize experiential and interdisciplinary learning, encouraging students to co-create solutions alongside global peers and faculty. Through virtual and hybrid formats, students gain international exposure without leaving campus, building global perspectives, professional networks, and a strong foundation for future international academic or career pathways." };

export const s1Cards = [
  {
    "title": "Study \nin India",
    "desc": "Welcome international students to ATLAS for short-term and semester-based study experiences, offering immersive exposure to India’s innovation ecosystem, culture, entrepreneurship landscape, and multidisciplinary learning environment.",
    "image": "/assets/images/advantages/partnership/collaborative-projects/study-in-india/8.jpg",
    "bg": "atlas-bg-1"
  },
  {
    "title": "COIL \nProjects",
    "desc": "Collaborate virtually with students from partner universities worldwide on industry-focused projects, developing intercultural competencies, global perspectives, and collaborative problem-solving skills.",
    "image": "/assets/images/advantages/partnership/collaborative-projects/coils/3.jpg",
    "bg": "atlas-bg-2"
  },
  {
    "title": "International Collaborative Projects",
    "desc": "Work alongside international peers and faculty on multidisciplinary academic and industry projects that address global challenges while fostering innovation, teamwork, and cross-border learning.",
    "image": "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/2.jpg",
    "bg": "atlas-bg-1"
  },
  {
    "title": "Visiting Student Delegations",
    "desc": "Engage with student groups from leading international universities through academic workshops, cultural exchanges, industry visits, and collaborative learning experiences on the ATLAS campus.",
    "image": "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/6.jpg",
    "bg": "atlas-bg-1"
  },
  {
    "title": "Research Collaborations",
    "desc": "Partner with global universities, faculty, and researchers on joint research initiatives, publications, conferences, and knowledge-sharing projects that contribute to innovation and global academic impact.",
    "image": "/assets/images/advantages/partnership/collaborative-projects/slide-section/1.jpg",
    "bg": "atlas-bg-2"
  }
];

export const mediaSections = [
  {
    "heading": "Study In India",
    "lead": "ATLAS offers international students an opportunity to experience India's dynamic innovation, business, design, and technology ecosystem through customised short-term Study in India program. Students engage in interdisciplinary learning, industry visits, cultural immersion, and experiential projects that provide valuable exposure to emerging markets. ATLAS has hosted students from universities across the USA, UK, Europe, Australia, and Asia, creating a diverse global learning environment that promotes cross-cultural understanding and international collaboration.",
    "images": [
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/1.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/2.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/3.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/4.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/5.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/6.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/7.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/study-in-india/8.jpg"
    ]
  },
  {
    "heading": "COIL Projects",
    "lead": "ATLAS integrates Collaborative Online International Learning (COIL) projects into the curriculum to facilitate meaningful global engagement beyond geographical boundaries. Through initiatives such as the Global Conversations COIL project with DePaul University (USA), students engaged in cross-cultural dialogue, collaborative learning, and the exchange of diverse global perspectives. ATLAS has also partnered with the University of Sussex (UK) on COIL projects focused on Artificial Intelligence, enabling students to explore emerging technologies through international teamwork, virtual collaboration, and interdisciplinary problem-solving.",
    "images": [
      "/assets/images/advantages/partnership/collaborative-projects/coils/1.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/coils/2.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/coils/3.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/coils/4.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/coils/5.jpg"
    ]
  },
  {
    "heading": "International Collaborative Projects",
    "lead": "International Collaborative Projects at ATLAS bring together students, faculty, industry experts, and partner institutions from across the world to address contemporary business, design, sustainability, and technology challenges. Through initiatives such as the collaboration between Communication Design students at ATLAS and the University of the Arts London (UAL) along with industry mentorship from Dentsu Global, students worked on live industry briefs to develop innovative, real-world solutions. These projects provide students with valuable international exposure while strengthening their creativity, global outlook, problem-solving abilities, and cross-cultural teamwork skills.",
    "images": [
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/4.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/5.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/6.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/7.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/8.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/1.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/2.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/international-collaborative-projects/3.jpg"
    ]
  },
  {
    "heading": "Visiting Student Delegations",
    "lead": "ATLAS regularly hosts student delegations from leading universities worldwide, creating opportunities for meaningful academic and cultural exchange. Over the years, the University has welcomed students from institutions including London Business School, University of Westminster, Durham University, Singapore University of Social Sciences, New York University (NYU), and several other global partner universities. Visiting students participate in specialised workshops, masterclasses, collaborative classroom activities, industry interactions, and cultural experiences that showcase India's dynamic educational and entrepreneurial landscape. These engagements enable ATLAS students to build global networks while fostering cross-cultural understanding and international collaboration on campus.",
    "images": [
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/1.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/2.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/3.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/4.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/5.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/6.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/7.jpg",
      "/assets/images/advantages/partnership/collaborative-projects/visiting-student-delegations/8.jpg"
    ]
  }
];

export const research = { heading: "Research Partnerships & Collaborations", paragraphs: [
  "ATLAS actively collaborates with leading universities, research institutions, and industry partners worldwide to advance impactful research and knowledge creation. Notable initiatives include collaborative research on Safe Autonomy Systems, a joint Sleep Apnea research project with the University of Bristol, the Going Global Grant project with the London School of Economics (LSE), and international conferences hosted with the University for the Creative Arts (UCA) focusing on gender equality and societal challenges. ATLAS has also convened global experts through conferences and research forums addressing ESG, sustainability, entrepreneurship, and innovation, creating opportunities for faculty and students to contribute to globally relevant research and interdisciplinary scholarship.",
  "Groundbreaking Mental Health Research Collaboration with the London School of Economics",
  "ATLAS SkillTech University and the London School of Economics win the Going Global Grant by the British Council, focusing on mental health challenges faced by entrepreneurs.",
  "Pioneering Sleep Apnea Research with University of Bristol",
  "The University of Bristol collaborates with ATLAS SkillTech University on groundbreaking research into Sleep Apnea.",
  "ATLAS SkillTech University at the United Nations: Advancing SDGs and Sustainability",
  "ATLAS collaborates with UCA, UK, to host FEM POWER 2023 focusing on Gender Equality and Patriarchy.",
  "Research Conference on Gender Equality and Patriarchy",
  "ATLAS and UCA host a research conference addressing gender equality and societal challenges.",
  "Global Higher Education Insights at Mumbai's Leadership Forum",
  "ATLAS participates in discussions on global higher education collaboration with international partners.",
  "Welcoming the Innovative Research Universities Delegation",
  "ATLAS hosts IRU delegation focusing on inclusive education and research innovation.",
  "Babson Collaborative Global Summit 2024",
  "Global summit hosted by ATLAS focusing on entrepreneurship and global collaboration.",
  "Aarohan 2.0: Global ESG & Sustainability",
  "Conference bringing together experts to discuss ESG and sustainability practices.",
  "Sustainable Finance Leadership at Nottingham Trent University",
  "ATLAS faculty deliver modules on sustainable finance strengthening global academic ties.",
  "Innovative Safe Autonomy Research with University of York",
  "Collaboration on safe autonomy systems and technological advancements.",
  "ATLAS Faculty appointed at University of Bristol",
  "Faculty members appointed as co-guides enhancing academic collaboration."
] };

export const closing = { heading: "Collaborative Projects at ATLAS", text: "At ATLAS, collaborative projects are not just assignments—they are global learning experiences. Through partnerships with international universities, students work on shared coursework, real-world challenges, and cross-cultural projects, gaining exposure to diverse perspectives and global academic practices. This approach nurtures critical thinking, adaptability, and the ability to collaborate effectively across borders, preparing students for an interconnected and dynamic world." };
