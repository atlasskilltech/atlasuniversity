/*
 * 22. Questions? We can read your mind — reference/assets/include/faq/isdi/homefaq.php,
 * included at the foot of index.php with `$arrow = "isdi-down-arrow.svg"`.
 *
 * Answers use `components/Home/FAQ`'s block format: a string is a paragraph,
 * `{ list: 'ul', items }` a list; a list item may be a run array whose
 * `{ strong }` entries are the authored `<b>` labels. The first answer's `<p>`
 * is left unclosed before its `<ul>` in the include; the parser closes it there,
 * which is what is transcribed.
 */
export const isdiFaq = {
  heading: 'Questions? We can read your mind',
  arrow: '/assets/images/schools/isdi/home/faq/isdi-down-arrow.svg',
  items: [
    {
      q: 'What is ISDI known for?',
      a: [
        'ISDI is one of the most prestigious institutions, renowned for its globally standard design education in India, offering programs in collaboration with the Parsons School of Design, New York. The institute provides a multidisciplinary curriculum focused on hands-on learning and innovation.',
        {
          list: 'ul',
          items: [
            'Pivoting around the principles of innovation, it prepares students to transform the world of design through an entrepreneurial and tech-savvy approach.',
            'With an exceptional curriculum, meticulously designed in collaboration with Parsons School of Design, it ensures students have a wholly transforming experience while studying.',
            'Strategically located in Mumbai’s BKC, it exposes students to the vibrant and cultural spirit of the city.',
          ],
        },
      ],
    },
    {
      q: 'What levels of programs does ISDI offer?',
      a: [
        'ATLAS ISDI School of Design & Innovation offers:',
        {
          list: 'ul',
          items: ['Undergraduate programs', 'Postgraduate programs', 'Additional courses and learning opportunities for students'],
        },
      ],
    },
    {
      q: 'What kinds of courses and specialisations does ISDI offer?',
      a: [
        'ATLAS ISDI provides B. Des to its students in various subjects. The undergraduate B. Des program is a four-year course that enables students to enhance their focus on strategic thinking, design and innovation.',
        'The undergraduate B. Des program offers 7 programs in various design subjects, such as:',
        {
          list: 'ul',
          items: [
            'Communication Design',
            'Fashion Design',
            'Fashion Communication & Styling',
            'Interior Design',
            'Product Design',
            'Strategic Design Management',
            'Animation & VFX',
          ],
        },
        'The postgraduate programs focus on advancing skills in design, innovation and entrepreneurial thinking.',
      ],
    },
    {
      q: 'Why choose ISDI and what sets it apart?',
      a: [
        'ATLAS ISDI School of Design & Innovation is recognised for its industry-oriented approach to design education and global exposure. Key differentiators include:',
        {
          list: 'ul',
          items: [
            [{ strong: 'Location:' }, ' Situated in Bandra Kurla Complex, providing access to leading creative and business organisations'],
            [{ strong: 'Industry-focused learning:' }, ' Exposure to industry professionals, practical insights and real-world applications'],
            [{ strong: 'Networking opportunities:' }, ' Interaction with professionals across industries'],
            [{ strong: 'Global curriculum:' }, ' Developed with support from Parsons School of Design to prepare students for national and international opportunities'],
            [{ strong: 'Experiential learning:' }, ' Emphasis on hands-on projects and use of technology to nurture creativity'],
          ],
        },
      ],
    },
    {
      q: 'Does ISDI offer guest lectures or masterclasses featuring Parsons faculty or visiting experts from Parsons?',
      a: [
        'Yes, ATLAS ISDI School of Design & Innovation offers guest lectures, workshops and masterclasses as part of its curriculum.',
        'Through its collaboration with Parsons School of Design, students are exposed to international teaching perspectives and industry practices. Visiting faculty and experts contribute to classroom learning through sessions, workshops and portfolio reviews.',
        'Events and specific engagements may vary across academic years.',
      ],
    },
    {
      q: 'Does ISDI offer global opportunities?',
      a: [
        'Yes. ISDI offers global opportunities, too. Students get the opportunity to study overseas, during an immersive excursion, such as Paris, where students visit colleges such as',
        {
          list: 'ul',
          items: [
            'Students can study in Paris and participate in industry visits and workshops.',
            'Partnership with Parsons School of Design ensures that thinking strategies, global tools and methodologies are a part of the curriculum.',
          ],
        },
      ],
    },
    {
      q: 'How does ISDI stand out from other design institutes?',
      a: [
        'ISDI stands out from other design schools through its partnership with Parsons School of Design. Its urban-rich culture setting ensures students learn thoroughly. ISDI stands out from other design schools due to its unique features:',
        {
          list: 'ul',
          items: [
            'Curriculum developed with support from Parsons School of Design',
            'Real-world exposure through internships, workshops and masterclasses',
            'Opportunities for networking and interdisciplinary collaboration',
            'Strong focus on strategic thinking guided by industry experts',
          ],
        },
      ],
    },
    {
      q: 'Is the curriculum at ISDI developed in collaboration with Parsons School of Design?',
      a: [
        'Yes, ATLAS ISDI School of Design & Innovation has received curriculum development support from Parsons School of Design since its establishment in 2013.',
        'This collaboration ensures:',
        {
          list: 'ul',
          items: [
            'Exposure to a global, contemporary design curriculum',
            'Access to established teaching and learning methodologies',
            'Preparation for evolving challenges in the design industry',
          ],
        },
      ],
    },
  ],
};
