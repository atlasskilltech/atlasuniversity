/* /centre-for-research/indian-knowledge-system — content supplied by ATLAS on 2026-11-23 as a 24-page
   screenshot of the old WordPress IKS page (Wayback capture). Transcribed as authored, typos included;
   section titles are written in title case (the capture sets them in capitals). Left out, because the
   capture does not hold them or holds them twice: broken images, the "Learner" display word, a
   description and an impact paragraph that repeat another activity's copy word for word, a learning-
   outcome column that repeats its own objective, and the old footer / popup. Photographs were cropped
   out of the capture. Styling lives in components/ui/DropdownFaq (`item.html` / `item.images`). */

const IMG = '/assets/images/centre-for-research/iks';

const esc = (t) => t.replace(/&/g, '&amp;');
const p = (t) => `<p>${esc(t)}</p>`;
const ul = (items) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

/* an activity: description, objective, learning outcome, impact — each optional */
function activity({ desc = [], objective, outcomeLead, outcomes = [], impact }) {
  return [
    ...desc.map(p),
    objective && `<p><b>Objective:</b></p>${p(objective)}`,
    outcomes.length > 0 && `<p><b>Learning Outcome:</b></p>${outcomeLead ? p(outcomeLead) : ''}${ul(outcomes)}`,
    impact && `<p><b>Impact:</b></p>${p(impact)}`,
  ]
    .filter(Boolean)
    .join('');
}

const photo = (name, alt) => ({ src: `${IMG}/${name}.webp`, alt });

export const intro = {
  heading: 'Indian Knowledge System',
  lead: '“Education must build character, enable learners to be ethical, rational, compassionate, and caring, while at the same time prepare them for gainful, fulfilling emplyment.”',
  paragraphs: [
    'The Indian Knowledge System (IKS) is a crucial part of India’s intellectual and cultural heritage, aligning with the National Education Policy (NEP) 2020, which emphasizes holistic, multidisciplinary, and experiential learning. ATLAS SkillTech University actively integrates IKS into its curriculum through initiatives like the Certification Course on Indian Knowledge System, conducted under the Ministry of Education via Katha Pratha.',
    'In alignment with NEP’s vision of blending traditional wisdom with modern education to foster innovation, sustainability, and ethical leadership. IKS plays a vital role in sustainability through eco-friendly architecture (Vastu Shastra), and water conservation techniques, all of which are highly relevant in today’s environmental challenges. Additionally, Indian contributions to science, technology, and governance, such as number zero, astronomy, metallurgy, and Arthashastra, provide valuable insights for contemporary research and policymaking',
    'ATLAS SkillTech University’s approach aligns with India’s global influence in wellness, sustainable development, and leadership, reinforcing cultural pride and self-reliance (Aatmnirbhar Bharat). By integrating IKS with modern disciplines like management, design, and digital technology, the University ensures students receive a well-rounded education that respects India’s rich heritage while preparing them for the future.',
  ],
};

export const atAtlas = {
  heading: 'Indian Knowledge System at ATLAS SkillTech University',
  lead: 'ATLAS SkillTech University is actively promoting the Indian Knowledge System (IKS) through structured programs, courses, and initiatives that integrate traditional Indian wisdom with modern education. Here’s how the University contributes to preserving and disseminating IKS:',
  unclamp: true,
  items: [
    {
      q: '1. Certification Course on Indian Knowledge System',
      html:
        p('ATLAS SkillTech University has introduced a certification course focused on the Indian Knowledge System. This course is conducted under the aegis of the Ministry of Education, New Delhi, and is facilitated through Katha Pratha, an initiative aimed at preserving and spreading India’s rich knowledge heritage.') +
        ul([
          'This program educates students about ancient Indian philosophies, sciences, art forms, and traditional wisdom.',
          'It integrates insights from disciplines such as Ayurveda, Vedic Mathematics, Indian philosophical traditions, and classical art forms',
          'By offering such a course, the University ensures that students appreciate and apply Indian knowledge in contemporary fields.',
        ]),
    },
    {
      q: '2. Alignment with National Education Policy (NEP) 2020',
      html:
        p('ATLAS SkillTech University’s curriculum is designed in line with the principles of the NEP 2020, which emphasizes holistic and multidisciplinary education.') +
        ul([
          'The NEP 2020 highlights the significance of incorporating the Indian Knowledge System into mainstream education.',
          'The University’s multidisciplinary approach allows students to explore ancient Indian traditions while specializing in modern fields such as management, design, and digital technology.',
          'This integration encourages innovation rooted in India’s rich cultural and intellectual heritage.',
        ]),
    },
    {
      q: '3. Multidisciplinary Approach Incorporating IKS',
      html:
        p('ATLAS SkillTech University promotes a multidisciplinary learning environment where students are encouraged to explore subjects beyond their primary domain of study.') +
        ul([
          'Programs in design, management, and entrepreneurship integrate elements of IKS, helping students develop a deep understanding of traditional knowledge systems and their relevance in today’s world.',
          'For example, in design courses, students may study traditional Indian architecture, textiles, and craftsmanship alongside modern design principles.',
          'Similarly, management courses might incorporate ancient Indian economic and strategic philosophies like Arthashastra and Chanakya Niti to provide a historical perspective on leadership and governance.',
        ]),
    },
    {
      q: '4. Workshops, Lectures, and Expert Sessions',
      html:
        p('To foster a deeper engagement with Indian traditions and knowledge, the University organizes:') +
        ul([
          'Workshops on Indian sciences and technologies, such as Ayurveda, Yoga, and ancient metallurgy.',
          'Guest lectures from scholars and practitioners specializing in traditional Indian knowledge.',
          'Panel discussions on topics like sustainability, ethics, and innovation in the context of Indian traditions.',
          'Collaborations with cultural organizations to promote indigenous art, literature, and philosophy.',
        ]),
    },
    {
      q: '5. Research and Publications on Indian Knowledge System',
      html:
        p('ATLAS SkillTech University encourages students and faculty to conduct research on various aspects of IKS') +
        ul([
          'Research papers and case studies on ancient Indian contributions to fields like mathematics, astronomy, and medicine are promoted.',
          'The University supports students in publishing research that connects Indian knowledge with contemporary global challenges.',
        ]),
    },
    {
      q: '6. Cultural and Heritage Events',
      html:
        p('Apart from academic initiatives, ATLAS SkillTech University regularly organizes cultural festivals, exhibitions, and competitions that celebrate India’s heritage.') +
        ul([
          'Events featuring traditional Indian music, dance, theatre, and storytelling help students engage with India’s cultural roots.',
          'Workshops on traditional crafts and sustainable practices help students understand the practical applications of Indian knowledge in modern industries.',
        ]),
    },
  ],
};

export const benefits = {
  heading: 'Benefits of the Indian Knowledge System (IKS) for Students at ATLAS SkillTech University',
  lead: 'ATLAS SkillTech University integrates the Indian Knowledge System (IKS) into its curriculum, offering students a unique educational experience that blends traditional wisdom with modern innovation. This alignment with the National Education Policy (NEP) 2020 ensures students develop holistic, multidisciplinary, and globally relevant skills. The key benefits for students include:',
  unclamp: true,
  items: [
    {
      q: '1. Holistic Learning & Multidisciplinary Education',
      html: ul([
        'Students gain exposure to ancient Indian sciences, mathematics, philosophy, and arts alongside modern subjects like management, digital technology, and design.',
        'Gurukul-inspired experiential learning fosters deeper understanding and application of knowledge.',
        'Critical thinking and problem-solving skills improve as students analyse ancient texts and their relevance to contemporary challenges.',
      ]),
    },
    {
      q: '2. Enhanced Innovation & Entrepreneurship',
      html: ul([
        'Studying IKS helps students draw inspiration from India’s historical innovations, such as Vedic mathematics, metallurgy, and Ayurveda, leading to creative problem-solving in technology, healthcare, and business.',
        'Entrepreneurial students can explore sustainable startups based on organic farming, herbal products, indigenous technology, and eco-friendly architecture.',
        'Traditional Indian economic and trade principles (Arthashastra) provide strategic insights for business and governance.',
      ]),
    },
    {
      q: '3. Sustainability & Eco-Conscious Thinking',
      html: ul([
        'Courses on Vastu Shastra and Indian architecture teach sustainable design principles applicable to modern urban planning and construction.',
        'Water conservation techniques, such as stepwells and rainwater harvesting, offer solutions for today’s environmental issues.',
        'Ayurvedic principles promote natural and holistic wellness, influencing the modern health and wellness industry.',
      ]),
    },
    {
      q: '4. Mental Well-being & Leadership Development',
      html: ul([
        'Yoga and meditation, integrated into student activities, enhance mental clarity, focus, and emotional resilience.',
        'Ancient Indian leadership philosophies (e.g., Bhagavad Gita’s teachings on self-discipline and ethics) help students become strong decision-makers.',
        'Mindfulness practices improve stress management, benefiting both academic performance and professional growth.',
      ]),
    },
    {
      q: '5. Cultural Identity & Global Competence',
      html: ul([
        'Understanding IKS fosters pride in India’s heritage while making students more competitive in the global job market.',
        'With global demand for Indian wellness practices like Yoga, Ayurveda, and sustainable living, students can explore international career opportunities.',
        'ATLAS SkillTech University’s integration of IKS with digital and modern disciplines ensures students gain a unique and culturally enriched perspective in their respective fields',
      ]),
    },
    {
      q: '6. Research & Academic Growth',
      html: ul([
        'The University encourages research on IKS applications in modern science, engineering, business, and design.',
        'Students can explore ancient Indian contributions to astronomy, chemistry, and medicine and their relevance to contemporary research.',
        'Collaborative projects with scholars and industry leaders help bridge traditional knowledge with cutting-edge technology.',
      ]),
    },
  ],
};

export const activitiesIntro = {
  heading: 'Activities to Promote IKS at ATLAS SkillTech University',
  paragraphs: [
    'ATLAS SkillTech University actively integrates the Indian Knowledge System (IKS) into its academic and extracurricular activities, fostering a deep appreciation for India’s rich intellectual, scientific, and cultural heritage. In alignment with the National Education Policy (NEP) 2020, the University organizes a variety of initiatives that blend traditional wisdom with modern education, ensuring students gain holistic knowledge and practical skills. From certification courses and expert lectures to workshops on Vedic sciences, Ayurveda, and sustainable architecture, these activities encourage students to explore the relevance of IKS in contemporary fields like management, design, and digital technology. Through research projects, cultural events, and interactive sessions, ATLAS SkillTech University creates an immersive learning experience that not only preserves India’s ancient wisdom but also equips students with innovative, sustainable, and globally competitive skills.',
  ],
  photos: [
    photo('activities-1', 'Students in an IKS classroom session at ATLAS'),
    photo('activities-2', 'Students reviewing design models with faculty'),
    photo('activities-3', 'Faculty session on the Indian Knowledge System'),
  ],
};

export const activities = {
  unclamp: true,
  items: [
    {
      q: 'Book Launch by ATLAS SkillTech University Library on Indian Knowledge System',
      html: activity({
        desc: ['ATLAS SkillTech University Library hosted a book launch event focused on the Indian Knowledge System (IKS), celebrating the profound intellectual and cultural heritage of India. The event highlighted scholarly works that delve into India’s ancient sciences, philosophy, governance, literature, and artistic traditions, emphasizing their relevance in modern contexts. Through this initiative, the University aimed to foster a deeper understanding of IKS and its integration into contemporary education, research, and innovation.'],
        outcomeLead: 'By attending this event, students and faculty:',
        outcomes: [
          'Gained valuable insights into India’s intellectual heritage and its global influence.',
          'Developed an understanding of how ancient Indian knowledge can be applied to contemporary fields.',
          'Explored various textual sources, case studies, and applications of IKS in science, technology, and humanities.',
          'Strengthened their research and analytical skills by engaging with expert discussions and academic literature.',
        ],
        impact: 'The book launch served as a catalyst for intellectual discussions and research on IKS, encouraging students to integrate traditional Indian knowledge into modern innovation and entrepreneurship. By making essential texts accessible, the initiative contributed to bridging historical wisdom with contemporary education, reinforcing ATLAS SkillTech University’s commitment to holistic, culturally rooted, and forward-thinking learning experiences.',
      }).replace(
        '<p><b>Learning Outcome:</b></p>',
        `<p><b>Objective:</b></p>${ul([
          'To promote awareness and academic engagement with the Indian Knowledge System',
          'To encourage students and faculty to explore India’s contributions to diverse disciplines such as mathematics, medicine, architecture, governance, and ethics.',
          'To highlight the interdisciplinary relevance of ancient Indian wisdom in modern problem-solving.',
          'To provide access to scholarly resources on IKS, supporting research and innovation.',
        ])}<p><b>Learning Outcome:</b></p>`,
      ),
      images: [photo('book-launch-1', 'IKS book launch at the ATLAS library'), photo('book-launch-2', 'Guests unveiling the IKS book collection')],
    },
    {
      q: 'ATLAS SkillTech University & Aatmnirbhar Bharat Centre for Design – MoU for Design Incubation Space at Red Fort, Delhi',
      html: activity({
        objective: 'The collaboration between ATLAS SkillTech University and the Aatmnirbhar Bharat Centre for Design (ABCD) under the Ministry of Culture aims to establish a cutting-edge Design Incubation Space at Red Fort, Delhi. This initiative is designed to preserve, promote, and modernize India’s rich design heritage by providing a platform for young designers, artisans, and entrepreneurs to innovate, experiment, and scale their creative ventures. The project integrates Indian Knowledge Systems (IKS) with contemporary design thinking, fostering sustainable and culturally inspired design solutions.',
        outcomeLead: 'Through this initiative, students will:',
        outcomes: [
          'Gain hands-on experience in heritageinspired design, sustainable craftsmanship, and digital fabrication.',
          'Learn entrepreneurial strategies for promoting India’s artisanal and design legacy in global markets.',
          'Collaborate with artisans, design experts, and policymakers to create innovative, socially impactful products.',
          'Develop expertise in branding, marketing, and business incubation for traditional and contemporary design ventures.',
        ],
      }),
      images: [photo('mou-1', 'MoU signing with the Aatmnirbhar Bharat Centre for Design'), photo('mou-2', 'MoU signing with the Aatmnirbhar Bharat Centre for Design'), photo('mou-3', 'MoU signing with the Aatmnirbhar Bharat Centre for Design')],
    },
    {
      q: 'Certification Course on Indian Knowledge System (Nitishastra through Panchatantra) by Mr. Bharat Dash',
      html: activity({
        objective: 'The course aimed to introduce students to Niti Shastra (the science of ethics and governance) through the Panchatantra, one of India’s most renowned collections of fables that impart strategic wisdom, ethical leadership, and decision-making skills. Conducted by Mr. Bharat Dash, the program focused on applying ancient moral and governance principles to modern challenges in leadership, business, and personal development.',
        outcomeLead: 'By the end of the certification course, students:',
        outcomes: [
          'Gained a deep understanding of Niti Shastra and its practical applications in leadership, management, and everyday decision-making.',
          'Learned ethical problem-solving techniques through engaging narratives from the Panchatantra.',
          'Developed critical thinking, diplomacy, and negotiation skills—essential for success in business and governance.',
          'Understood the psychology of human behavior and conflict resolution, drawing insights from timeless fables.',
        ],
        impact: 'The course had a transformative impact, equipping students with ethical reasoning and leadership skills for complex situations. By blending ancient Indian storytelling with modern management principles, it made learning engaging and culturally enriching. Participants appreciated the practical wisdom of the Panchatantra, finding it applicable to business strategies, teamwork, and governance. The course reinforced ATLAS SkillTech University’s commitment to integrating traditional knowledge with modern education, fostering ethical and visionary leaders.',
      }),
      images: [photo('nitishastra-1', 'Mr. Bharat Dash addressing students'), photo('nitishastra-2', 'Mr. Bharat Dash in a classroom session')],
    },
    {
      q: 'Incubation Project NAQSHE – KAAM in Collaboration with Indira Gandhi Centre of Arts',
      html: activity({
        objective: 'The NAQSHE – KAAM incubation project aims to preserve, promote, and innovate upon India’s rich artisanal and craft heritage by integrating traditional knowledge with contemporary design and entrepreneurship. Through this collaboration with the Indira Gandhi Centre for the Arts (IGNCA), the project provides a platform for students to engage with Indian craftsmanship, sustainable business practices, and cultural entrepreneurship, fostering innovation in the creative industries.',
        outcomeLead: 'By participating in this project, students will:',
        outcomes: [
          'Gain hands-on experience working with artisans and understanding traditional Indian crafts.',
          'Learn about sustainable design, cultural heritage preservation, and ethical entrepreneurship.',
          'Develop skills in business incubation, branding, and market strategies for artisanal products.',
          'Explore cross-disciplinary applications of Indian art, architecture, and technology in modern industries.',
          'Build networks with industry experts, cultural scholars, and artisans, gaining valuable mentorship and collaborative opportunities.',
        ],
        impact: 'The project will have a significant impact by fostering socio-economic empowerment for artisans, bridging the gap between heritage and contemporary markets. It will encourage students to create sustainable business models, promoting ethical consumerism and cultural entrepreneurship. Through innovation and collaboration, NAQSHE – KAAM aligns with ATLAS SkillTech University’s mission of blending tradition with technology, ensuring that India’s artisanal heritage is not only preserved but also revitalized for global recognition and economic sustainability.',
      }),
      images: [photo('naqshe-kaam', 'NAQSHE-KAAM Incubation Project 2024 with IGNCA')],
    },
    {
      q: 'Creative Installation for Aatmnirbhar Bharat Centre of Design',
      html: activity({
        desc: ['In April 2024, ATLAS SkillTech University students created an installation, “Roots of Light,” for the Aatmnirbhar Bharat Centre of Design at the Red Fort, Delhi. Using Sholapith and Tumba, traditional crafts from West Bengal and Bastar, Chhattisgarh, the project showcased India’s rich cultural heritage. The students merged these crafts to create an immersive storytelling experience, connecting the past with the present and highlighting the importance of preserving cultural traditions in a modern context.'],
        objective: 'The project “Roots of Light” was conceptualized to showcase India’s rich cultural heritage through an immersive art installation at the Aatmanirbhar Bharat Centre of Design, Red Fort, Delhi. The objective was to create a visual and emotional narrative that merges traditional craftsmanship with contemporary design. By incorporating Sholapith (West Bengal) and Tumba (Bastar, Chhattisgarh), the project aimed to honor India’s indigenous crafts, preserving their legacy while reinterpreting them in a modern context.',
        outcomeLead: 'Through this project, students:',
        outcomes: [
          'Gained hands-on experience working with traditional Indian materials and craft techniques.',
          'Developed skills in installation design, storytelling through art, and cultural representation.',
          'Understood the significance of heritage conservation and sustainable craft practices in modern design.',
          'Explored collaborative design thinking, integrating multiple craft traditions into a unified artistic vision.',
          'Learned to communicate cultural narratives visually, creating an emotional connection with audiences.',
        ],
        impact: 'The installation successfully created an immersive storytelling experience, evoking nostalgia, appreciation, and awareness of India’s rich artisanal heritage. By fusing Sholapith and Tumba crafts into a contemporary format, the project demonstrated how traditional knowledge can inspire modern creative expressions. The initiative reinforced the importance of preserving and innovating upon India’s intangible cultural assets, aligning with the Aatmnirbhar Bharat vision. The students’ work at the Aatmnirbhar Bharat Centre of Design not only celebrated India’s artistic traditions but also positioned them as a bridge between history and the future of design.',
      }),
      images: [photo('roots-of-light', 'Students with the “Roots of Light” installation')],
    },
    {
      q: 'Indian Aesthetics – Mahabharata, Ramayana and More',
      html: activity({
        desc: ['ATLAS introduced learning on “Indian Aesthetics”, a unique subject designed to delve into the rich tapestry of India’s art and culture. Through this course, students explore various dimensions of Indian artistic traditions, culminating in the creation of 205 board game projects, and other deliverables. These projects draw inspiration from revered Indian epics like the Mahabharata and the Ramayana, as well as from the profound philosophies contained within the Vedas. The games designed by students serve as a modern reinterpretation and application of these stories, making ancient wisdom accessible and engaging for contemporary audiences. This course aims to develop the competency of cultural awareness and expression among the students.'],
        objective: 'The Indian Aesthetics course was designed to immerse students in India’s rich artistic and cultural traditions, drawing inspiration from epics like the Mahabharata and Ramayana, as well as the Vedas and other ancient Indian philosophies. The objective was to encourage students to explore traditional narratives, aesthetics, and philosophical themes while applying them to modern creative mediums. The course culminated in the creation of 205 board game projects and other innovative deliverables, offering a fresh, engaging way to interpret and interact with India’s timeless wisdom.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Gained a deep understanding of Indian artistic traditions, literature, and philosophy.',
          'Developed cultural awareness and creative expression, enabling them to reinterpret ancient wisdom in contemporary formats.',
          'Learned the principles of game design, storytelling, and interactive media, merging history with modern engagement techniques.',
        ],
      }),
    },
    {
      q: 'Logofolio – A Modern Interpretation and Application of Ancient Indian Stories and Wisdom',
      html: activity({
        desc: ['This project offered a modern interpretation and application of ancient Indian stories and wisdom, making it accessible and engaging for contemporary audiences while honouring traditional art forms. Logofolio made by a student for the Indian Aesthetics course.'],
        objective: 'The Logofolio project was designed to encourage students to reinterpret and visually represent ancient Indian stories and wisdom through modern graphic design and branding techniques. The objective was to bridge traditional Indian aesthetics with contemporary design, making ancient narratives more accessible, engaging, and visually appealing for today’s audiences while preserving the essence of India’s artistic and philosophical heritage.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Gained a deep understanding of Indian mythology, philosophy, and traditional art forms.',
          'Developed skills in visual storytelling, symbolic representation, and cultural branding.',
          'Learned how to adapt ancient wisdom into contemporary digital and graphic design formats.',
          'Explored typography, colour theory, and iconography inspired by Indian aesthetics.',
          'Understood the importance of heritage preservation through modern creative mediums.',
        ],
        impact: 'The Logofolio project reimagined traditional Indian narratives for modern audiences, blending epics, scriptures, and folk traditions into visual identities. Students merged heritage with innovation, creating designs that honored India’s artistic legacy while appealing to contemporary aesthetics. This initiative reinforced ATLAS SkillTech University’s commitment to integrating Indian Knowledge Systems with modern education, nurturing culturally aware and creative designers.',
      }),
    },
    {
      q: 'Open Elective Course on Cosmic Insights: The Art of Astrology, Numerology and Vastu by Ar. Rupal Shah',
      html: activity({
        objective: 'The Open Elective Course on Cosmic Insights aimed to introduce students to the ancient Indian sciences of Astrology, Numerology, and Vastu, exploring their philosophical foundations and practical applications. The course was designed to provide a cultural, historical, and analytical perspective on these disciplines, allowing students to understand their role in personal well-being, architecture, and decisionmaking. By integrating traditional wisdom with modern interpretations, the course encouraged students to critically evaluate and apply these concepts in contemporary contexts.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Gained an understanding of the principles and significance of Astrology, Numerology, and Vastu in Indian tradition.',
          'Explored the historical evolution and scientific perspectives of these disciplines.',
          'Developed analytical skills to interpret planetary positions, numerological patterns, and spatial arrangements.',
          'Understood how Vastu principles influence architectural design and well-being.',
          'Engaged in critical discussions on the cultural and psychological aspects of cosmic sciences in today’s world.',
        ],
        impact: 'This course fostered cultural appreciation and intellectual curiosity, helping students bridge ancient knowledge with modern perspectives. By exploring Astrology, Numerology, and Vastu as both cultural heritage and analytical tools, students were encouraged to reflect on their relevance in personal growth, architectural planning, and decisionmaking processes. The initiative reinforced ATLAS SkillTech University’s commitment to integrating Indian Knowledge Systems (IKS) with contemporary education, empowering students with a holistic, interdisciplinary approach to learning.',
      }),
    },
    {
      q: 'Masterclass on Arthashastra in Action (Chanakya’s Guide to Strategic Leadership) by Dr. Kajal Chheda',
      html: activity({
        objective: 'The masterclass aimed to introduce students to Kautilya’s Arthashastra, an ancient Indian treatise on economics, governance, and military strategy, and its application in modern leadership and strategic decision-making. Through this session, students explored Chanakya’s principles of statecraft, diplomacy, ethics, and administration, gaining insights into how these timeless strategies can be applied to business management, governance, and entrepreneurship in the contemporary world.',
        outcomeLead: 'By the end of the masterclass, students:',
        outcomes: [
          'Understood the core principles of Arthashastra and their relevance in today’s dynamic leadership and business environment.',
          'Learned strategic leadership techniques, including decision-making, risk management, and crisis handling, inspired by Chanakya’s teachings.',
          'Developed skills in diplomacy, negotiation, and governance, crucial for management, policymaking, and entrepreneurship.',
          'Explored case studies of historical and modern leaders who effectively implemented Chanakyan strategies.',
          'Gained a multidisciplinary perspective, linking political science, economics, and management through the lens of ancient Indian wisdom.',
        ],
        impact: 'The masterclass had a profound impact on students, enhancing their critical thinking and strategic planning abilities. It provided them with a deeper understanding of leadership ethics and governance, equipping them with tools to make informed and impactful decisions in their careers. The session also fostered a sense of cultural pride and awareness, demonstrating the relevance of Indian Knowledge Systems (IKS) in modern-day business and leadership. Many students expressed interest in further exploring Chanakya’s principles for entrepreneurship, corporate strategy, and public administration, making the masterclass a valuable addition to ATLAS SkillTech University’s commitment to holistic education.',
      }),
    },
    {
      q: 'Open Elective Course on Innovative Thinking: Learning from Ancient Indian Mythological Tales',
      html: activity({
        objective: 'The course aimed to cultivate creative problem-solving and innovative thinking by exploring the wisdom embedded in ancient Indian mythological tales. Through in-depth analysis of stories from the Ramayana, Mahabharata, Puranas, and other Indian epics, students learned how mythological narratives offer strategic insights into leadership, ethics, adaptability, and decision-making, relevant for modern challenges in business, entrepreneurship, and personal growth.',
        outcomeLead: 'By the end of the course, students:',
        outcomes: [
          'Understood how mythological stories embody critical thinking, strategy, and innovation, applicable to business, leadership, and technology.',
          'Developed creative problem-solving abilities by drawing parallels between ancient dilemmas and contemporary challenges.',
          'Learned adaptability and crisis management, inspired by characters like Krishna, Rama, and Arjuna, who navigated complex situations with intelligence and foresight.',
          'Enhanced their ethical and moral reasoning, using mythological narratives to understand the principles of dharma (duty), karma (action), and niti (ethics).',
          'Explored storytelling as a tool for communication, persuasion, and leadership, essential for careers in management, marketing, and innovation.',
        ],
        impact: 'The course had a profound impact on students by fostering a fresh perspective on problem-solving, innovation, and leadership. By integrating mythology with modern thought processes, students gained practical frameworks for ethical decision-making, strategic thinking, and team management. The elective encouraged them to think beyond conventional approaches, equipping them with skills to tackle real-world business and social challenges with wisdom and creativity. The initiative reaffirmed ATLAS SkillTech University’s commitment to blending Indian Knowledge Systems (IKS) with contemporary education, helping students become innovative, ethical, and future-ready leaders.',
      }),
    },
    {
      q: 'Open Elective Course on Swadharm: Leading Your with Authenticity',
      html: activity({
        objective: 'The course aimed to help students discover and embrace their true purpose (Swadharm) by cultivating authentic leadership, self-awareness, and ethical decision-making. Drawing insights from Indian Knowledge Systems (IKS), the Bhagavad Gita, and philosophical traditions, the program encouraged students to lead their personal and professional lives with integrity, self-confidence, and a strong moral compass.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Understood the concept of Swadharm (one’s true duty and purpose) and its relevance in personal and professional growth.',
          'Developed self-awareness and introspection techniques, enabling them to make authentic career and life choices.',
          'Learned value-based leadership principles, integrating ethics, responsibility, and emotional intelligence into decision-making.',
          'Explored real-life applications of Swadharma through case studies of leaders who embodied authenticity and purpose.',
        ],
        impact: 'The course had a transformative impact on students by guiding them toward authenticity, selfmastery, and ethical leadership. It encouraged confidence in personal choices, resilience in challenges, and alignment between one’s values and actions. By integrating ancient wisdom with modern leadership principles, the elective empowered students to become purpose-driven professionals and mindful individuals, reinforcing ATLAS SkillTech University’s vision of holistic education that blends Indian traditions with contemporary leadership insights.',
      }),
    },
    {
      q: 'Open Elective Course on Wisdom for Strategic Leadership: Lessons from Indian Verses',
      html: activity({
        objective: 'The Open Elective Course on Wisdom for Strategic Leadership aimed to equip students with leadership principles derived from ancient Indian scriptures such as the Bhagavad Gita, Arthashastra, and Upanishads. The course focused on exploring ethical decision-making, strategic thinking, and value-based leadership through the lens of timeless Indian wisdom. By integrating these teachings into modern management practices, students were encouraged to develop a holistic and principled approach to leadership.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Gained insights into strategic leadership principles from Indian scriptures.',
          'Understood the importance of ethics, mindfulness, and adaptability in decision-making.',
          'Explored the Arthashastra’s teachings on governance, diplomacy, and strategy.',
          'Learned conflict resolution and self-management techniques from the Bhagavad Gita.',
          'Developed the ability to apply ancient wisdom to modern business, entrepreneurship, and leadership challenges.',
        ],
        impact: 'This course provided students with a unique leadership framework rooted in Indian Knowledge Systems (IKS), helping them cultivate wisdom, resilience, and strategic foresight. By blending philosophy with contemporary leadership challenges, the initiative empowered future leaders to navigate complex environments with integrity and vision. ATLAS SkillTech University reinforced its commitment to holistic education by integrating Indian philosophical thought with modern leadership development, fostering principled, strategic, and innovative leaders for the future.',
      }),
    },
    {
      q: 'Open Elective Course on Basic Indian Sign Language (ISL)',
      html: activity({
        objective: 'The Open Elective Course on Basic Indian Sign Language (ISL) was designed to foster inclusivity and accessibility by equipping students with fundamental communication skills in Indian Sign Language (ISL). The course aimed to create awareness about the Deaf community, their culture, and the importance of non-verbal communication, enabling students to engage more effectively with the hearing-impaired community and promote inclusive environments in education, workplaces, and society.',
        outcomeLead: 'Through this course, students:',
        outcomes: [
          'Learned basic vocabulary, grammar, and sentence structures of Indian Sign Language (ISL).',
          'Understood the history, culture, and challenges of the Deaf community in India.',
          'Developed non-verbal communication skills to interact more effectively with individuals who use ISL.',
          'Gained awareness of inclusivity and accessibility in various professional and social settings.',
          'Strengthened their empathy, adaptability, and cross-cultural communication skills.',
        ],
        impact: 'This course empowered students with a new mode of communication, enhancing their ability to connect with the Deaf community and advocate for inclusivity. By integrating ISL into their skillset, students contributed to breaking communication barriers and fostering a more inclusive society. The initiative reinforced ATLAS SkillTech University’s commitment to social responsibility, diversity, and accessibility, preparing students to be compassionate, culturally aware, and socially responsible leaders.',
      }),
    },
    {
      q: 'CD Students Engage in Experiential Learning in Udaipur',
      html: activity({
        desc: [
          'The study tour to Udaipur was loaded with experiential learning opportunities for our Communication Design students. They experienced the rural lifestyle of the local communities in Rajasthan along with various performing arts and architectural styles.',
          'The students soaked into the knowledge, history and evolution of various visual art forms through workshops conducted by local artists such as Pichwai Art workshop by Mahesh Bisnoi, Kaavad art workshop by National Awardee Kaavad artist Satyanarayan ji, Terracotta workshop at Kalpataru Terracotta Art, Research & Training Centre by Jamnalal Kumhar and Phad painting workshop.',
          'Visiting Fateh Sagar Lake, Saheliyon ki Baadi, Kumbhalgarh Fort, Naathdwara, City Palace Museum and Shiplgram (Handicraft Artisan village) helped the students to explore their artistic skills and enrich their design sensibilities through exploration of Indian heritage and culture.',
        ],
      }),
    },
    {
      q: 'ISDI Students Embark on a Cultural and Design Immersion in Madhya Pradesh',
      html: activity({
        desc: [
          'ISDI’s Fashion Design students embarked on a transformative seven-day Local Immersion in Madhya Pradesh, exploring traditional craftsmanship and textile artistry. They visited sites like Indore’s Moti Tabela for Zardosi embroidery, Bagh for block printing, Mandavgarh’s architectural wonders, and Maheshwar’s weaving center for Maheshwari sarees.',
          'Students also explored leatherwork in Dewas, Batik printing in Ujjain, and experienced spiritual insights at Mahakaleshwar Jyotirlinga. The immersion bridged traditional design with modern production, deepening students’ creative and cultural understanding.',
        ],
      }),
    },
    {
      q: 'Bagh Prints & Architectural Marvels of Mandavgarh',
      html: activity({
        desc: [
          'A journey to Bagh took students deep into the world of Bagh printing, a centuries-old hand block printing technique using natural dyes. They engaged with artisans to understand the meticulous process of carving wooden blocks, dyeing fabrics and creating striking geometric and floral motifs.',
          'The expedition continued to Mandavgarh, a city steeped in history and architectural grandeur. From the floating Jahaz Mahal to the ornate Hindola Mahal and the romantic Baz Bahadur Palace, students marveled at the fusion of Persian, Mughal and Rajput architectural influences. Each structure narrated tales of a bygone era, offering insight into how design serves as a bridge between history and modernity.',
        ],
      }),
    },
    {
      q: 'Weaving Heritage at Maheshwar',
      html: activity({
        desc: [
          'The journey to Maheshwar, a town synonymous with textile artistry, offered students a close look at the intricate craftsmanship behind Maheshwari sarees. At the Maheshwar Sarees Weaving Centre, they observed master weavers creating delicate motifs in silk and cotton, preserving a tradition that dates back to the reign of Rani Ahilyabai Holkar.',
          'A visit to the Ahilyabai Holkar Fort and Maheshwar Ghat provided a glimpse into the region’s regal past, with its riverfront views and intricately carved stone temples offering a picturesque setting for artistic inspiration.',
        ],
      }),
    },
    {
      q: 'Exploring the Heart of Indore: Textile Traditions & Markets',
      html: activity({
        desc: [
          'Indore, a city where history and contemporary culture coexist seamlessly. Students explored Moti Tabela, a hub of exquisite Zardosi embroidery, witnessing artisans skillfully weaving metallic threads into intricate patterns—an art form that has adorned Indian textiles for centuries.',
          'A guided walk through Bohra Bazaar and Kapda Bazaar introduced them to the vibrant marketplace culture, where textile merchants showcased a dazzling array of fabrics, from rich brocades to everyday wear. The evening unfolded at Chappan Bazaar, Indore’s famous street food hub, where students soaked in the energy of local flavors, colors and traditions.',
        ],
      }),
    },
    {
      q: 'Interior Design Students Explore the Museum of Living History',
      html: activity({
        desc: [
          'Immersive industry integrated learning is the core of ATLAS | ISDI School of Design & Innovation. As a part of our experiential pedagogy, Third and Fourth Year Interior Design students visited Mahindra’s – The Museum of Living History.',
          'The museum conceptualised by design and creative consultant Elsie Nanji, and ‘experience’ designer, Harsh Manrao, houses specially commissioned art pieces that tell the story of Mahindra’s core values and principles, its various businesses, rich history, and its outlook to the future. Our ID alumni Prachiti and Nidhi had worked with Elsie on this beautiful experiential space.',
          'The pluralistic narrative of Mahindra Museum has been conceptualised to celebrate stories of success. The physical and digital installations have been curated to add depth to the stories. Our students spent their morning at the museum understanding the various aspects of designing an immersive space like this',
        ],
      }),
    },
  ],
};
