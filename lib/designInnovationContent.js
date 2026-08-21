/**
 * /programs/ug/ug-design-and-innovation - copy transcribed 1:1 from
 * `reference/programs/ug/ug-design-and-innovation.php` and its two includes:
 *
 *   assets/include/more-questions.php   (search panel)
 *   assets/include/faq.php              (the database-driven FAQ)
 *
 * Four blocks, in the reference's order: hero, the seven B.Des entries, the
 * AI-search panel, the FAQ.
 *
 * `$css = "...690be2baaa3f88fcc6816657-bac7acda2.css"`, a sheet of its own;
 * `$body = "body atlas-page"`. Unlike the three top-level Programs pages this
 * one carries no `<style>` block of its own beyond the popup's, so
 * `.buttons-wrapper` and `.btn-ca` are never re-declared - and it has no hero
 * buttons for them to affect.
 */

/* ref .inner-header-wrapper.full-ht - its own photograph, and the only Programs
   heading that carries an authored `<br>` */
export const hero = {
  title: 'Design & Innovation\nUndergraduate Programs',
  image: {
    src: '/assets/images/programs/hero/design-innovation-hero.jpg',
    srcSet:
      '/assets/images/programs/hero/design-innovation-hero-p-500.jpg 500w, '
      + '/assets/images/programs/hero/design-innovation-hero-p-800.jpg 800w, '
      + '/assets/images/programs/hero/design-innovation-hero-p-1080.jpg 1080w, '
      + '/assets/images/programs/hero/design-innovation-hero.jpg 1366w',
    sizes: '(max-width: 1439px) 100vw, 1365.9722900390625px',
    alt: '',
  },
};

/*
 * ref .program-list-wrapper > 7 x .program-list.
 *
 * All seven carry the same eligibility strip word for word, so the rows are
 * hoisted out of the entries - the same shape /programs/programs-list-integrated
 * uses, though the IB wording differs between the two pages.
 *
 * All seven "Download Brochure" buttons are `[data-id="download-brochure"]` and
 * open one shared popup, so the brochure sits on the section rather than on each
 * entry.
 */
export const programList = {
  brochure: {
    label: 'Download Brochure',
    title: 'B.Des brochure request',
    kind: 'iframe',
    src: 'https://crm.atlasskilltech.app/widgets/6a3e5980b9dfccd3a4455fa2/embed',
    height: 650,
    /* this is the one popup in the port whose `#npf-close-brochure` does not
       declare `line-height: 1`, so its close button is 37px tall, not 28 */
    closeLeading: 'normal',
  },
  eligibilityRows: [
    {
      label: 'Indian Boards (ISC / CBSE / State Boards)',
      value: 'Minimum 50% in Class XII',
    },
    {
      /* ref .df-card.top - `justify-content: flex-start` on the last two */
      top: true,
      label: 'A-Levels (UK)',
      value: 'Minimum grades A/B/C in 2 subjects',
    },
    {
      top: true,
      label: 'International Baccalaureate (IB)',
      value: 'Minimum of 24 points in 3 HL & 3 SL subjects',
    },
  ],
  entries: [
    {
      title: 'B.Des (Animation & VFX)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Communication Design)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-communication-design' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Fashion Communication & Styling)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Fashion Design)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-design' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Interior Design)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-interior-design' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Product Design)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-product-design' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
    {
      title: 'B.Des (Strategic Design & Management)',
      eligibility: {
        label: 'Eligibility Criteria',
        arrow: { src: '/assets/images/admissions/key-dates/polygon-atlas.png', alt: '' },
      },
      explore: { label: 'Explore Program', href: '/schools/isdi/programs/undergraduate/b-des/b-des-in-strategic-design-management' },
      apply: { label: 'Apply Now ', href: '/applicationform' },
    },
  ],
};

/* ref assets/include/more-questions.php */
export const search = {
  label: 'What program are you looking for?',
  subText: 'Let our AI Assistant answer your queries',
  action: '/search',
  name: 'query',
  placeholder: 'Ask me anything...courses, people, or campus secrets',
};

/*
 * ref assets/include/faq.php. That include is database-driven: it picks a set by
 * `$domain` / `$fullUrl`, and this page falls through to the `else`, so it
 * renders FAQ master 1 - the ISDI set, 24 questions. The copy is therefore
 * transcribed from the rendered production page rather than from an include.
 *
 * Two things in it are the database's own and are transcribed as authored:
 * questions 19 and 20 are the same sentence with different answers, and every
 * text node is wrapped in `<strong>`.
 */
export const faq = {
  heading: 'Questions? We can read your mind ',
  arrow: '/assets/icons/atlas-down-arrow.svg',
  items: [
    {
      q: 'What kinds of courses and specialisations does ISDI offer?',
      a: [
        { strong: 'ISDI provides B. Des to its students in various subjects. The undergraduate B. Des programme is a four-year course that enables students to enhance their focus on strategic thinking, design, and innovation.\u00a0' },
        { strong: 'The undergraduate B. Des program offers 7 programs in various design subjects, such as:' },
        {
          list: 'ul',
          items: [
            { strong: 'Communication Design' },
            { strong: 'Fashion Design' },
            { strong: 'Fashion Communication & Styling' },
            { strong: 'Interior Design' },
            { strong: 'Product Design' },
            { strong: 'Strategic Design Management' },
            { strong: 'Animation & VFX' },
          ],
        },
        { strong: 'The postgraduate programme focuses on entrepreneurial and design thinking skills.' },
      ],
    },
    {
      q: 'Why choose ISDI, and what sets it apart?',
      a: [
        { strong: 'ISDI is a well-known institution for many reasons. Its exclusive collaboration with Parsons School of Design stems from its position as a renowned institution. The key factors setting ISDI apart are:' },
        {
          list: 'ul',
          items: [
            { strong: 'Location: It is in the heart of Mumbai and surrounded by the best design organisations.' },
            { strong: 'Industry-focused approach: With industry stalwarts and meteors guiding students, individuals not only learn from practical knowledge but also learn from experience.' },
            { strong: 'Networking: Students can work and interact with professionals in other fields, strengthening their networking skills.\u00a0' },
            { strong: 'Global curriculum: The curriculum has been meticulously designed to prepare students for national and international work opportunities.' },
          ],
        },
        { strong: 'Experiential learning: ISDI believes in going beyond traditional learning, and utilises advanced technology to nurture creativity among students.' },
      ],
    },
    {
      q: 'Does ISDI offer guest lectures or masterclasses featuring Parsons faculty or visiting experts from Parsons?',
      a: [
        { strong: 'Yes, ISDI offers guest lectures and masterclasses as a part of the curriculum. International voices and mentors lead classes with its exclusive partnership with Parsons School of Design (Parsons faculty often visits ISDI and students learn from them here in India). Integrating a masterclass allows students to expand their cultural understanding, too. We introduce students to a variety of workshops and masterclasses that help expand their interests and solidify their vision.' },
        { strong: 'ISDI hosted\u00a0 Parsons Week 2025, in partnership with ISDI,\u00a0 from March 23-28, 2025, featuring a week of design-focused events and sessions led by faculty from the renowned Parsons School of Design. During their visit to ISDI, they offered masterclasses and portfolio review sessions as well.' },
      ],
    },
    {
      q: 'Does ISDI offer global opportunities?',
      a: [
        { strong: 'Yes. ISDI offers global opportunities, too. Students get opportunity to study overseas, during immersive excursion one such example is Paris where students visited colleges such as' },
        {
          list: 'ul',
          items: [
            { strong: 'Students can study in Paris and participate in industry visits and workshops.\u00a0' },
            { strong: 'Partnership with Parsons School of Design ensures that thinking strategies, global tools, and methodologies are a part of the curriculum.' },
          ],
        },
      ],
    },
    {
      q: 'How does ISDI stand out from other design institutes?',
      a: [
        { strong: 'ISDI stands out from other design schools through its partnership with Parsons School of Design. Its urban-rich culture setting ensures students learn thoroughly. ISDI stands out from other design schools due to its unique features:' },
        {
          list: 'ul',
          items: [
            { strong: 'A rich curriculum benefits from its collaboration with Parsons School of Design.' },
            { strong: 'Real-world internships and masterclasses' },
            { strong: 'Diverse networking' },
            { strong: 'Strategic thinking nurtured by industry experts' },
          ],
        },
      ],
    },
    {
      q: 'Is the curriculum at ISDI developed in collaboration with Parsons School of Design?',
      a: [
        { strong: 'Yes, the curriculum is developed in collaboration with Parsons School of Design. The B Des curriculum is meticulously designed to allow students to benefit from it. The global curriculum expands their horizon of understanding and ensures they are able to face challenges and secure lucrative opportunities.' },
        { strong: 'The ISDI - School of Design & Innovation has received curriculum development support from Parsons School of Design since its establishment in 2013.' },
        { strong: 'This unique partnership for curricular excellence ensures ISDI students have access to a global contemporaneity curriculum and proven teaching and learning methods enabling our students to be the design leaders of the future.' },
      ],
    },
    {
      q: 'How does Atlas ISDI ensure academic and industry alignment?',
      a: [
        { strong: 'ISDI has designed its curriculum in collaboration with Parsons School of Design. The curriculum ensures academic excellence and alignment with industry by:' },
        {
          list: 'ul',
          items: [
            { strong: 'Design professionals design curriculum.' },
            { strong: 'Professionals hold masterclasses for students to learn from experience.' },
            { strong: 'Students are encouraged to take up projects which challenge them to face real-life design challenges.' },
            { strong: 'Working on projects with industry-leading companies' },
            { strong: 'Regular workshops held by industry professionals' },
          ],
        },
      ],
    },
    {
      q: 'How does ISDI integrate industry learning into its curriculum?',
      a: [
        { strong: 'ISDI integrates industry into its curriculum in several ways. We aim to blend classroom learning with real-world experience. The industry learnings are integrated through:' },
        {
          list: 'ul',
          items: [
            { strong: 'Masterclasses with experts' },
            { strong: 'Industry-led collaborations and projects' },
            { strong: 'Hackathon for understanding real-life disciplines' },
            { strong: 'Visits to different design studios for better learning' },
          ],
        },
      ],
    },
    {
      q: 'Does ISDI organise live projects with brands?',
      a: [
        { strong: 'Yes, ATLAS ISDI organises live projects with brands as part of its curriculum. The thoughtfully curated curriculum is in collaboration with Parsons School of Design. The curriculum includes internships with top brands. This internship nurtures' },
        {
          list: 'ul',
          items: [
            { strong: 'Applying theoretical knowledge to real-life problems' },
            { strong: 'Strengthen problem-solving skills' },
            { strong: 'Build a strong portfolio' },
            { strong: 'Learn from the experience of senior citizens.' },
            { strong: 'Guided by industry experts' },
          ],
        },
      ],
    },
    {
      q: 'What is the student experience like at ISDI?',
      a: [
        { strong: 'ISDI has always aimed to create a safe and immersive campus as well as a learning experience for its students. With a thoughtful curriculum in collaboration with the renowned Parsons School of Design, every design module for specialisation is distinct and focuses on strengthening the design principles. The student experience at ATLAS ISDI includes:' },
        {
          list: 'ul',
          items: [
            { strong: 'Students get to participate in various competitions, which channel their design creativity.' },
            { strong: 'Students are made to participate in various workshops.' },
            { strong: 'Students have to work on several projects and increase their networking and communication skills.' },
            { strong: 'Students participate in various college festivals and experience personal growth through faculty-led discussions and talks' },
          ],
        },
      ],
    },
    {
      q: 'What facilities and campus infrastructure does ISDI offer?',
      a: [
        { strong: 'ISDI has an exclusive campus. Renowned for its infrastructure and thoroughly curated curriculum, the institution allows students to widen their area of learning. With our recent NAAC A Grade certification, our campus provides its students with:' },
        {
          list: 'ul',
          items: [
            { strong: 'The campus features large laboratories, designer studios, fashion technology zones, and various other spaces where students can explore and showcase their creativity.' },
            { strong: 'Immersive workshops for strengthening design principles, along with frequent visits to design studios, inspire the students.' },
            { strong: 'Students can learn from experts through frequent immersive workshops held in design studios.' },
            { strong: 'Design Studios' },
            { strong: 'Fashion Lab' },
            { strong: 'Product Lab (Workshop)' },
            { strong: 'Fashion Studio' },
            { strong: 'Digital + UX Labs' },
            { strong: 'Maker Spaces ' },
          ],
        },
      ],
    },
    {
      q: 'What kind of extracurricular opportunities does ISDI offer?',
      a: [
        { strong: 'ISDI offers its students a variety of events for them to participate in and cherish their campus life. From flagship events to cultural events, ATLAS ISDI is always thriving throughout the year. Extracurricular activities offered by ATLAS ISDI are:' },
        {
          list: 'ul',
          items: [
            { strong: 'Design Events' },
            { strong: 'Startup-Streets' },
            { strong: 'Industry Masterclasses, Workshops, RTCs' },
            { strong: 'Master’s Admissions Events' },
            { strong: 'Placement & Career Events' },
            { strong: 'Fests & Cultural Showcase' },
            { strong: 'Hackathons & Challenges' },
            { strong: 'Podcasts & Fireside Chats etc.' },
          ],
        },
        { strong: 'These interactions boost engagement by allowing students to display projects, share ideas, and connect with visitors.' },
      ],
    },
    {
      q: 'Does ISDI require an entrance exam for admission to design programs?',
      a: [
        { strong: 'Yes, ISDI requires an entrance exam for design programmes. The admission process has been designed to gauge the design skills and communication skills of the students. The ISDI admission entrance exam consists of:' },
        {
          list: 'ul',
          items: [
            { strong: 'Portfolio upload or design project holding a 40% weightage' },
            { strong: 'The online aptitude test holds a substantial weightage of 40%.' },
            { strong: 'Along with tests, there is a round of private interviews as well, which test the students\' reasoning and analytical skills. ' },
          ],
        },
      ],
    },
    {
      q: 'How can I apply for admission to ISDI  B.Des program?',
      a: [
        { strong: 'The process to apply for ISDI’s B.Des program is extremely simple. ISDI focuses on inclusivity, and our admissions process has been designed for individuals to seek their desired design specialisation. The admission process follows these steps:' },
        {
          list: 'ul',
          items: [
            { strong: 'Submitting the portfolio' },
            { strong: 'Those students who do not have a portfolio can also complete a design project listed by ATLAS ISDI.' },
            { strong: 'Along with submitting a portfolio and/or design project, there is an aptitude test which gauges the student’s communication skills.' },
            { strong: 'The last test is the private interview test. This test allows our panel to understand the ambitions and goals of the students.' },
          ],
        },
      ],
    },
    {
      q: 'What are the eligibility criteria for applying to the B.Des program at ISDI?',
      a: [
        { strong: 'ISDI is among the renowned institutions for the B. Des Program. The eligibility criteria for ISDI are:' },
        { strong: 'Students currently studying in Grade 12 and appearing for their 10+2 board exams are eligible to apply. This includes boards like:' },
        {
          list: 'ol',
          items: [
            { strong: 'CBSE' },
            { strong: 'ICSE' },
            { strong: 'HSC (Maharashtra)' },
            { strong: 'IGCSE A-Levels' },
            { strong: 'The IB Diploma Program (IBDP)\u00a0' },
            { strong: 'Any recognised national or international equivalent.' },
          ],
        },
        { strong: 'At ISDI, there is no stream restriction; students from Arts, Commerce, or Science backgrounds are welcome. What matters most is your interest in design, creativity, and innovation. So if you are a science student with a profound interest in design and art, you can give wings to your dreams here at ISDI.' },
      ],
    },
    {
      q: 'Do I need to submit a design portfolio to study at ISDI? What if I don\'t have a design portfolio?',
      a: [
        { strong: 'Yes, students are required to submit their design portfolio. Students can:' },
        {
          list: 'ul',
          items: [
            { strong: 'Upload their portfolio while working on their IDSI Challenge' },
            { strong: 'The portfolio should contain eight to ten pieces of your best work that proficiently display your design skills.\u00a0' },
            { strong: 'These pieces can be animated, painted, or sketched according to the student\'s preference.' },
          ],
        },
        { strong: 'Those students who do not have a portfolio can simply:' },
        {
          list: 'ul',
          items: [
            { strong: 'Complete the ISDI Design Project' },
            { strong: 'Create a visual work inspired by any ONE of the given themes: One World | Tracing Nature | Translating Tomorrow' },
            { strong: 'All forms of design are acceptable, including drawing, video, photography, sculpture, 3D work, collage, and digital images.\u00a0' },
            { strong: 'Support your project by writing a 500-word essay describing how you developed your ideas.' },
          ],
        },
      ],
    },
    {
      q: 'Can I apply to ISDI if I have not studied art or design in school?',
      a: [
        { strong: 'A. Yes, students who are not in a design program can also apply to study ISDI. We have always believed in inclusivity, and our dynamic selection process ensures that students from diverse backgrounds, including those without a design background, can apply.' },
      ],
    },
    {
      q: 'What career opportunities are available after graduating from ISDI?',
      a: [
        { strong: 'Career opportunities after graduating from ISDI are innumerable. Graduates can work as:' },
        {
          list: 'ul',
          items: [
            { strong: 'Art Director' },
            { strong: 'Brand Manager' },
            { strong: 'Digital Transformation Analyst' },
            { strong: 'E?commerce Brand Strategist' },
            { strong: 'Design Consultant' },
            { strong: 'UX Research Analyst' },
            { strong: 'Strategy Consultant' },
            { strong: 'Fashion Designer' },
          ],
        },
      ],
    },
    {
      q: 'How does ISDI help students build their design portfolios for job placements?',
      a: [
        { strong: 'ISDI has always believed in supporting students beyond their campus as well. Our committee works diligently to help students secure their desired jobs. ISDI assists students in building a strong portfolio by providing:' },
        {
          list: 'ul',
          items: [
            { strong: 'Hands-on experience working in a state-of-the-art lab with cutting-edge design tools.' },
            { strong: 'A curriculum that emphasises experiential learning and interdisciplinary approaches will introduce projects that enable students to learn and overcome the challenges they regularly face in their field of study.' },
            { strong: 'Our guidance and placement committee provides comprehensive support to help students secure the right internship and lucrative opportunities.' },
          ],
        },
      ],
    },
    {
      q: 'How does ISDI help students build their design portfolios for job placements?',
      a: [
        { strong: 'A. ISDI helps the students in building a portfolio and guiding them through job placements as well. We help students by:' },
        {
          list: 'ul',
          items: [
            { strong: 'Having projects which enhance their portfolio' },
            { strong: 'Guest lectures and masterclasses' },
            { strong: 'SOPs' },
            { strong: 'Projects which are a compulsory part of modules' },
            { strong: 'Documentation of the project as a part of the portfolio' },
          ],
        },
      ],
    },
    {
      q: 'What kind of internships do students get during the course?',
      a: [
        { strong: 'ISDI always ensures a promising future for its students. Our committee oversees every student\'s secure internships with top organisations that match their specialisations and career goals.\u00a0' },
        {
          list: 'ul',
          items: [
            { strong: 'Interns can work with renowned companies.' },
            { strong: 'Work for esteemed designers' },
            { strong: 'Gain hands-on experience with live projects and internships' },
            { strong: 'Committees are made to make job hunting easy.' },
          ],
        },
      ],
    },
    {
      q: 'How strong is ISDI placement record?',
      a: [
        { strong: 'ISDI has an astounding record for placements. ATLAS ISDI has a placement committee which works dedicatedly for every student to ensure their placements. The committee guides the students to reach out to a job where their expertise can shine. The curriculum allows students to gain skills, which are:' },
        {
          list: 'ul',
          items: [
            { strong: 'Work for alumni organisations.' },
            { strong: 'Work on certifications, which strengthen their credibility.' },
            { strong: 'They should maintain an attractive portfolio that aids in securing better placements.' },
          ],
        },
      ],
    },
    {
      q: 'Does ISDI provide support for aspiring entrepreneurs?',
      a: [
        { strong: 'Yes, ATLAS ISDI supports entrepreneurship. The thoughtfully curated module, in collaboration with Parsons School of Design, is designed for students to learn about the principles as well as the dynamics of business. The curriculum is mostly aimed at:' },
        {
          list: 'ul',
          items: [
            { strong: 'The curriculum aims to integrate management with technology and emerging design principles in order to enhance students\' skills.' },
            { strong: 'Students are encouraged to join the evolving design ecosystem and become innovative designers or entrepreneurs.' },
            { strong: 'The global immersion curriculum helps students understand the complexities of the business field, which arise in the design landscape.' },
          ],
        },
      ],
    },
    {
      q: 'Can ISDI students start their ventures after graduation?',
      a: [
        { strong: 'Yes, ISDI graduates who have completed their design programme can effortlessly open their own ventures. This can be easily achieved because:' },
        {
          list: 'ul',
          items: [
            { strong: 'ISDI curates a curriculum that includes modules on entrepreneurial leadership. The modules encourage a business mindset with innovation and design in the lead.\u00a0' },
            { strong: 'The learning environment at ISDI is nurtured by a mentorship ecosystem where industry stalwarts lead masterclasses for students.' },
            { strong: 'Students gain comprehensive knowledge about innovation, entrepreneurship, and practical challenges.' },
            { strong: 'Graduates graduate with a mindset that combines design and entrepreneurship skills, which are crucial for their venture.\u00a0' },
          ],
        },
      ],
    },
  ],
};
