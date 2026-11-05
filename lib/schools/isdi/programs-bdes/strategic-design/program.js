/*
* The programme tab set and the curriculum below it — index.php:310-2290.
 *
 * Five `.rounded-tabs-mint` panes (Overview text, Curriculum Highlights video cards, Career
 * Pathways and Faculty image cards, Success Stories `.card-type-d` people), then "Our Globally
 * Benchmarked Curriculum": four year tabs, each with its semesters (heading, clip, course list and
 * the elective dropdowns) and the two-panel comparison card.
 *
 * Five Curriculum Highlights posters and every semester poster are soft-404s on production (HTML
 * with status 200), so those clips ship without one, exactly as the reference paints them.
 */
export const isdiBdesStrategicProgram = {
  tabs: [
    'Overview',
    'Curriculum Highlights',
    'Career Pathways',
    'Faculty',
    'Success Stories',
  ],
  panes: [
    {
      kind: 'text',
      text: 'This program equips students to become leaders who integrate design thinking with strategic business insights, technology, and emerging tools. Students explore design strategy, innovation management, service design, research, and AI-supported analytics while working on live projects and industry collaborations. The curriculum fosters problem-solving, sustainable thinking, and business acumen, preparing graduates for careers as service and experience designers, design strategists, innovation consultants, AI-enabled analysts, and brand experience leaders. Graduates emerge as future-ready innovators capable of shaping impactful solutions across industries.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Service\nIntelligence',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/service-intelligence-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/service-intelligence-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/service-intelligence/1.webp',
          },
        },
        {
          title: 'Brand & Growth\nStrategy',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/brand-growth-strategy-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/brand-growth-strategy-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/brand-growth-strategy/1.webp',
          },
        },
        {
          title: 'Business Model & Venture\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/business-model-venture-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/business-model-venture-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/business-model-venture-design/1.webp',
          },
        },
        {
          title: 'Experience\nStrategy',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/experience-strategy-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/experience-strategy-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/experience-strategy/1.webp',
          },
        },
        {
          title: 'Systems & Innovation\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/systems-innovation-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/systems-innovation-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/systems-innovation-design/1.webp',
          },
        },
        {
          title: 'ESG & Impact\nStrategy',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/ecg-impact-strategy-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/ecg-impact-strategy-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/curriculum-highlights/ecg-impact-strategy/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Service & Experience Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/service.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Strategy & Innovation Analyst',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/sdm-cp-2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Business & Brand Marketing Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/marketing.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Innovation & Business Consultant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/innovation.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Research & Insights Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/sdm-cp-5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Brand & Experience Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/sdm-cp-7.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'AI & Data-Driven Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/sdm-cp-8.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sustainable Design &Innovation Consultant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/sdm-cp-9.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Ritika\nKarnani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110.webp',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Nishly\nVB',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/career-pathway-card.webp',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ananya\nPatil',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111.png',
            width: 258,
            height: 284,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Akhil\nSain',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-119.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashutosh Deshmukh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-1.png',
            width: 263,
            height: 263,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gourav\nKeswani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-119-1.png',
            width: 259,
            height: 263,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Divya\nBindra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prushottam S',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-119-2.png',
            width: 267,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mohit\nBhardwaj',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/image-110-2.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mohit\nBhardwaj',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/career-pathway-card-1.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Dr Shoaib',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-3.webp',
            width: 269,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kanchi\nMalhotra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-4.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sumon\nGanatait',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-2.png',
            width: 262,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sania\nShaikh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-5.webp',
            width: 269,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prem\nColaco',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-3.png',
            width: 269,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Riddhesh Adarkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-4.png',
            width: 273,
            height: 273,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gavin\nRemidos',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-6.webp',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Surya\nTeja',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-7.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ishi\nSrivastava',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-110-8.png',
            width: 262,
            height: 262,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Virat\nBapat',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-5.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jai\nRanjit',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-6.png',
            width: 262,
            height: 262,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Naresh\nKaushik',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/image-111-7.png',
            width: 274,
            height: 255,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sneha Srinivastava',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/tabs/career-pathway-card-2.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
      ],
    },
    {
      kind: 'people',
      people: [
        {
          name: 'Amit menon',
          role: 'Analyst - Digital Transformation',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/kpmg.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/amit-menon.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Ankita bhatia',
          role: 'Internal Communications Specialist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/mondelez-international.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/ankita-bhatia.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Bhavya satya',
          role: 'UX Researcher',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/google.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/bhavya-satya.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Devika daga',
          role: 'Agency Partner',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/aditya-birla-group.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/devika-daga.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Fena maheshwari',
          role: 'Analyst Relations- Google Cloud AI Analyst Relations',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/tata-consultancy-services.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/fena-maheshwari.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Hriday kanakia',
          role: 'Consultant',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/bp.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/hriday-kanakia.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Krati bishnoi',
          role: 'Infosys',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/wipro.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/krati-bishnoi.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Nandita nair',
          role: 'Associate Trainee',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/ltimindtree.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/nandita-nair.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Prajna gognieni',
          role: 'Deloitte',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/deloitte.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/prajna-gogineni.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Preet ruparelia',
          role: 'UX Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/walmart.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/preet-ruparelia.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Soumodeep bhowmick',
          role: 'Accenture',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/accenture.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/soumodeep-bhowmick.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Tanvi prashanth',
          role: 'Strategy Consultant',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/logo/ibm.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/strategic-design-innovation/success/success-stories/student/tanvi-prashanth.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
      ],
    },
  ],
  curriculum: {
    heading: 'Our Globally Benchmarked Curriculum',
    years: [
      {
        label: 'Year 1',
        semesters: [
          {
            title: 'Semester 1',
            desc: 'Laying the foundation for creative thinking and design. Students explore core principles, visual language, and problem-solving skills that prepare them for future learning.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Design Research 1',
                text: 'Use design thinking and visual methods to explore, research, observe patterns, reflect on insights, and craft compelling stories that communicate ideas, inspire action, and create meaningful impact.',
              },
              {
                title: 'Design Studio 1',
                text: 'Design Studio 1 introduces creative exploration through design thinking, observation, research, and storytelling. Students develop problem-solving, visual communication, and reflective practice skills to address real-world challenges.',
              },
              {
                title: 'Drawing Fundamentals 1',
                text: 'Drawing Fundamentals 1 builds core visual skills through observation, sketching, composition, form and technical drawing. Students explore line, shape, proportion, and perspective to strengthen creative expression and design communication.',
              },
              {
                title: 'Imaging 1',
                text: 'Imaging 1 introduces digital and analog imaging techniques, exploring composition, light, and narrative. Students learn visual storytelling, image editing, and creative expression for design and communication.',
              },
              {
                title: 'Space and Materiality',
                text: 'Space and Materiality explores relationships between form, material, and environment. Students experiment with textures, structures, and spatial design to understand sensory impact, function, and creative possibilities.',
              },
              {
                title: 'History in Context to Objects',
                text: 'History in Context to Objects examines cultural, social, and historical influences on objects. Students analyze artifacts to understand design evolution, material significance, and contextual storytelling.',
              },
              {
                title: 'Skill-Up Elective',
                text: 'Skill-Up Elective offers specialized learning opportunities beyond the core curriculum, enabling students to explore emerging tools, creative practices, and interdisciplinary skills that enhance professional growth.',
              },
            ],
            dropdowns: [
              {
                title: 'ATLAS Elective',
                items: [
                  {
                    title: 'Sociology',
                    text: 'Explore how societies, cultures, and communities function and influence human behavior. Understand the social forces that shape markets, organizations, and decision-making in the real world.',
                  },
                  {
                    title: 'Negotiation and Persuation',
                    text: 'Learn strategies to influence, negotiate, and resolve conflicts effectively. Apply practical techniques to achieve results in business and leadership scenarios.',
                  },
                  {
                    title: 'International Relations',
                    text: 'Understand global politics, diplomacy, and international institutions that impact businesses and markets worldwide. Analyze global trends to make informed strategic decisions.',
                  },
                  {
                    title: 'Geopolitical Economy',
                    text: 'Study the intersection of economics, politics, and global events. Learn how policy, trade, and geopolitical shifts influence business and market strategy.',
                  },
                  {
                    title: 'Ancient Philosophy',
                    text: 'Examine timeless ideas on ethics, leadership, and human behavior. Apply philosophical insights to modern management, decision-making, and organizational challenges.',
                  },
                  {
                    title: 'Product and Service Design',
                    text: 'Learn to create innovative, user-focused products and services. Move from ideation to prototyping and launch with practical frameworks and design thinking.',
                  },
                  {
                    title: 'Data Visualisation',
                    text: 'Transform raw data into clear, actionable visual insights. Learn to communicate complex information effectively for business decisions.',
                  },
                  {
                    title: 'UI/UX Design',
                    text: 'Understand user behavior and design intuitive digital experiences. Build interfaces and workflows that engage users and meet real business goals.',
                  },
                  {
                    title: 'ML for Managers',
                    text: 'Gain a practical understanding of machine learning concepts and tools. Learn to apply predictive insights to solve business problems and drive strategy.',
                  },
                  {
                    title: 'Sports Analytics',
                    text: 'Analyze performance, strategy, and business metrics in sports using data-driven approaches. Translate insights into actionable decisions for teams, organizations, and fans.',
                  },
                  {
                    title: 'Sustainability & ESG',
                    text: 'Explore environmental, social, and governance practices that drive long-term value. Learn how businesses integrate sustainability into strategy, operations, and impact measurement.',
                  },
                ],
              },
            ],
          },
          {
            title: 'Semester 2',
            desc: 'Building confidence in experimentation and observation, students engage in hands-on projects that develop analytical thinking and creativity. The semester deepens design practice, emphasizing research, advanced techniques, sustainability, and user experience, fostering innovation, collaboration, and readiness for real-world challenges.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Design Research 2',
                text: 'Design Research 2 advances research skills, emphasizing observation, data analysis, and user insights. Students apply research backed by design thinking to identify problems, generate solutions, and inform creative strategies.',
              },
              {
                title: 'Design Studio 2',
                text: 'Design Studio 2 builds on creative practice, guiding students to apply research, experimentation, and design thinking in real-world projects, developing problem-solving, collaboration, and visual storytelling skills.',
              },
              {
                title: 'Drawing Fundamentals 2',
                text: 'Drawing Fundamentals 2 deepens observational and visual storytelling skills. Students refine visual communication and expressive techniques for creative design solutions.',
              },
              {
                title: 'Imaging 2',
                text: 'Imaging 2 advances digital and analog imaging techniques, focusing on composition, storytelling, and post-processing. Students create visually compelling narratives and enhance design communication through images.',
              },
              {
                title: 'Sustainable System',
                text: 'Sustainable System explores eco-friendly design principles, material choices, and systemic thinking. Students analyze environmental impact, interdependence of various systems using, and integrate responsible practices into design processes.',
              },
              {
                title: 'Time',
                text: 'Time examines its role as a design element, influencing memory, narrative, information flow, and user experience. Students explore temporal dynamics to create meaningful, engaging designs.',
              },
              {
                title: 'Skill-Up Elective',
                text: 'Skill-Up Elective offers specialized learning opportunities beyond the core curriculum, enabling students to explore emerging tools, creative practices, and interdisciplinary skills that enhance professional growth.',
              },
            ],
            dropdowns: [
              {
                title: 'ATLAS Elective',
                items: [
                  {
                    title: 'Sociology',
                    text: 'Explore how societies, cultures, and communities function and influence human behavior. Understand the social forces that shape markets, organizations, and decision-making in the real world.',
                  },
                  {
                    title: 'Negotiation and Persuation',
                    text: 'Learn strategies to influence, negotiate, and resolve conflicts effectively. Apply practical techniques to achieve results in business and leadership scenarios.',
                  },
                  {
                    title: 'International Relations',
                    text: 'Understand global politics, diplomacy, and international institutions that impact businesses and markets worldwide. Analyze global trends to make informed strategic decisions.',
                  },
                  {
                    title: 'Geopolitical Economy',
                    text: 'Study the intersection of economics, politics, and global events. Learn how policy, trade, and geopolitical shifts influence business and market strategy.',
                  },
                  {
                    title: 'Ancient Philosophy',
                    text: 'Examine timeless ideas on ethics, leadership, and human behavior. Apply philosophical insights to modern management, decision-making, and organizational challenges.',
                  },
                  {
                    title: 'Product and Service Design',
                    text: 'Learn to create innovative, user-focused products and services. Move from ideation to prototyping and launch with practical frameworks and design thinking.',
                  },
                  {
                    title: 'Data Visualisation',
                    text: 'Transform raw data into clear, actionable visual insights. Learn to communicate complex information effectively for business decisions.',
                  },
                  {
                    title: 'UI/UX Design',
                    text: 'Understand user behavior and design intuitive digital experiences. Build interfaces and workflows that engage users and meet real business goals.',
                  },
                  {
                    title: 'ML for Managers',
                    text: 'Gain a practical understanding of machine learning concepts and tools. Learn to apply predictive insights to solve business problems and drive strategy.',
                  },
                  {
                    title: 'Sports Analytics',
                    text: 'Analyze performance, strategy, and business metrics in sports using data-driven approaches. Translate insights into actionable decisions for teams, organizations, and fans.',
                  },
                  {
                    title: 'Sustainability & ESG',
                    text: 'Explore environmental, social, and governance practices that drive long-term value. Learn how businesses integrate sustainability into strategy, operations, and impact measurement.',
                  },
                ],
              },
            ],
          },
        ],
        comparison: {
          heading: 'Why our Year 1 outpaces every\nother design school?',
          headingTag: 'comp-header',
          isdi: {
            title: 'ISDI School of Design',
            points: [
              {
                title: 'Multidisciplinary Exposure',
                text: 'Offers a Major–Minor Pathway where students combine core specialization with a secondary focus called a minor.',
              },
              {
                title: 'Integrated Design Thinking',
                text: 'Combines design thinking, observation, and research fostering strategic and creative problem-solving.',
              },
              {
                title: 'Holistic, Future-Ready Learning',
                text: 'Includes forward-looking courses like Sustainable System and Time, focusing on environmental impact.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Holistic, Future-Ready Learning',
                text: 'Other design schools follow single-track, restricting students to one specialisation throughout the program.',
              },
              {
                title: 'Theory–Practice Gap',
                text: 'Often separates theory and practice, introducing research much later as an\nafter-thought.',
              },
              {
                title: 'Aesthetic-Centric Focus',
                text: 'Primarily emphasizes form and aesthetics, with limited focus on sustainability or systems thinking.',
              },
            ],
          },
          leftImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector.png',
          rightImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector-2.png',
        },
      },
      {
        label: 'Year 2',
        semesters: [
          {
            title: 'Semester 3',
            desc: 'Semester 3 develops strategic design skills through visual storytelling, marketing, trend forecasting, and innovation mapping, enabling students to create market-driven, user-centered, and forward-thinking design solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Creative Visualisation',
                text: 'Translates business strategies into compelling visual narratives by applying design principles, typography, composition, and storytelling techniques to effectively communicate brand messages and creative concepts.',
              },
              {
                title: 'Marketing Strategies',
                text: 'Develops comprehensive marketing strategies using branding insights, consumer behavior analysis, and practical case studies, enabling students to create effective, market-driven communication and design solutions.',
              },
              {
                title: 'Trends and Forecasting',
                text: 'Applies user-centered design and prototyping methods to identify emerging trends, anticipate consumer needs, and drive innovation in products, services, and design experiences.',
              },
              {
                title: 'Innovation Roadmap',
                text: 'Builds strategic design capabilities by mapping trends, market dynamics, and creative opportunities, equipping students to drive innovation and make informed, forward-thinking design decisions.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'Semester 4 strengthens strategic design through UX, emerging technologies, data-driven insights, folklore-inspired strategies, and ethical management, fostering innovative, culturally aware, and user-centered business and design solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Fundamentals of Strategic Management',
                text: 'Teaches strategic thinking, business model analysis, and ethical decision-making, equipping students to lead responsibly, create competitive advantage, and drive sustainable organizational success.',
              },
              {
                title: 'UX Design',
                text: 'Builds user experience and human-computer interaction skills, emphasizing research-driven design, usability testing, and intuitive interfaces to create engaging, user-centered digital experiences.',
              },
              {
                title: 'Emerging Technology Tools',
                text: 'Applies emerging technologies such as AR/VR, IoT, and interactive platforms to foster innovation, enhance products, and develop cutting-edge design solutions for business and user experiences.',
              },
              {
                title: 'Folklores driven Strategies',
                text: 'Leverages cultural folklore and narratives to inform design and strategy, creating culturally resonant solutions that connect deeply with users and communities.',
              },
              {
                title: 'Data - Led Design',
                text: 'Uses data insights, analytics, and technological trends to inform design decisions, enabling evidence-based innovation and enhancing product, service, and experience outcomes.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
        ],
        comparison: {
          heading: 'Why our Year 2 outpaces every\nother design\nschool?',
          headingTag: 'comp-header',
          isdi: {
            title: 'ISDI School of Design',
            points: [
              {
                title: 'Integrated Strategy',
                text: 'Combines design thinking with business strategy.',
              },
              {
                title: 'Tech & Data-Driven',
                text: 'Labs blend making, testing, and real-world application.',
              },
              {
                title: 'Global + Cultural',
                text: 'Merges local insights with global trends.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Separated Focus',
                text: 'Design and business taught independently.',
              },
              {
                title: 'Traditional Methods',
                text: 'Limited exposure to new technologies.',
              },
              {
                title: 'Narrow Context',
                text: 'Minimal cultural or global perspective.',
              },
            ],
          },
          leftImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector.png',
          rightImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector-2.png',
        },
      },
      {
        label: 'Year 3',
        semesters: [
          {
            title: 'Semester 5',
            desc: 'Semester 5 develops user-centered design skills through service and UI design, financial management, and consumer psychology, fostering impactful, intuitive, and strategically informed design solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Service Design',
                text: 'Equips students to design impactful, user-centered service experiences through research, systems thinking, and practical tools that address real-world needs.',
              },
              {
                title: 'UI Strategy for Digital Products',
                text: 'Builds skills in user interface design, focusing on intuitive layouts, interaction principles, and visual hierarchy to create seamless, user-focused digital experiences across platforms.',
              },
              {
                title: 'Basics of Financial Management for Design',
                text: 'Equips students with essential financial management skills, including budgeting, cost analysis, and resource planning, enabling effective management of design projects and strategic decision-making.',
              },
              {
                title: 'Consumer Psychology',
                text: 'Analyzes consumer behavior, motivations, and decision-making processes to inform marketing strategies, design solutions, and user-centered experiences that resonate with target audiences.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Semester 6 develops design leadership through business blueprinting, digital transformation, innovation management, future-focused strategies, and dynamic portfolio creation, preparing students for impactful, industry-ready careers.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Business Design Blueprinting',
                text: 'Enables students to solve real-world business challenges through design thinking, client-based case studies, and strategic problem-solving, fostering practical, innovative, and user-centered solutions.',
              },
              {
                title: 'Change Management in Creative organizations',
                text: 'Explores how creative teams adapt to evolving market, technology, and cultural shifts through structured change strategies. Focuses on managing resistance, fostering innovation culture, and aligning creative vision with organizational transformation.',
              },
              {
                title: 'Managing Innovation teams',
                text: 'Builds leadership skills to manage and inspire creative teams, facilitating collaboration with industry partners to co-develop innovative, impactful, and market-relevant design solutions.',
              },
              {
                title: 'Design Futures',
                text: 'Explores future trends, emerging technologies, and societal shifts, equipping students to anticipate change and create forward-thinking, innovative design solutions that address evolving user needs.',
              },
              {
                title: 'Portfolio Design - SDM',
                text: 'Guides students in creating professional portfolios using dynamic media, typography, and data-driven storytelling to showcase creative skills, design thinking, and industry readiness.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
        ],
        comparison: {
          heading: 'Why our Year 3 outpaces every\nother design\nschool?',
          headingTag: 'comp-header',
          isdi: {
            title: 'ISDI School of Design',
            points: [
              {
                title: 'User-Centered Design',
                text: 'Focus on services, UX, and UI strategy.',
              },
              {
                title: 'Business & Leadership',
                text: 'Financial management, innovation, and team leadership.',
              },
              {
                title: 'Future & Professional Ready',
                text: 'Trends, emerging tech, portfolios, and minor specialization.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Basic Design Skills',
                text: 'Limited UX or service integration.',
              },
              {
                title: 'Minimal Business Focus',
                text: 'Few leadership or strategic skills.',
              },
              {
                title: 'Traditional Approach',
                text: 'Limited future trends or portfolio guidance.',
              },
            ],
          },
          leftImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector.png',
          rightImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector-2.png',
        },
      },
      {
        label: 'Year 4',
        semesters: [
          {
            title: 'Semester 7',
            desc: 'This semester develops strategic and entrepreneurial skills through systems thinking, ESG frameworks, change management, and practical toolkits, preparing students to lead impactful, sustainable, and innovative organizational solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Systems Thinking',
                text: 'Applies systems thinking principles to analyze complex challenges, understand interdependencies, and develop holistic, innovative solutions that address organizational, social, and design-related problems effectively.',
              },
              {
                title: 'The Startup Canvas: Designing Entrepreneurial Success',
                text: 'Develops entrepreneurial strategies and business models, enabling students to ideate, validate, and implement new ventures while balancing market opportunities, innovation, and sustainable growth.',
              },
              {
                title: 'ESG Impact and Redesign',
                text: 'Combines sustainability, digital transformation, and brand leadership to apply ESG frameworks that drive responsible innovation and create lasting social and environmental impact.',
              },
              {
                title: 'Workshops and Toolkits',
                text: 'Provides practical workshops and toolkits for applying strategic design methods in real-world contexts, equipping students with actionable skills, frameworks, and collaborative problem-solving techniques.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 8',
            desc: 'The capstone semester guides students through project exploration, execution, research, thesis writing, and public display, culminating in innovative, polished, and professionally presented design solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/strategic-design-innovation/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Capstone Project Exploration',
                text: 'Guides students to identify, research, and define a meaningful design challenge, exploring opportunities, user needs, and conceptual directions while receiving mentorship for innovative project development.',
              },
              {
                title: 'Capstone Project Execution',
                text: 'Supports the development and realization of the capstone project through structured design processes, iterative prototyping, technical refinement, and mentor guidance to produce polished, functional outcomes.',
              },
              {
                title: 'Research Writing and Thesis book',
                text: 'Develops skills in critical research, reflective writing, and documentation, enabling students to articulate insights, methodology, and design decisions in a comprehensive, professional thesis.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [],
          },
        ],
        comparison: {
          heading: 'Why our Year 4 outpaces every\nother design\nschool?',
          headingTag: 'h2-tag',
          isdi: {
            title: 'ISDI School of Design',
            points: [
              {
                title: 'Strategic & Systems Thinking',
                text: 'Analyze complex challenges and create holistic, innovative solutions.',
              },
              {
                title: 'Entrepreneurship & ESG',
                text: 'Develop startups, sustainable strategies, and responsible innovation frameworks.',
              },
              {
                title: 'Capstone & Research Excellence',
                text: 'Mentored capstone projects, practical workshops, and professional research writing.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Narrow Problem Solving',
                text: 'Focuses on isolated design issues without systemic perspective.',
              },
              {
                title: 'Limited Real-World Impact',
                text: 'Few opportunities for entrepreneurial or ESG-focused projects.',
              },
              {
                title: 'Minimal Project Guidance',
                text: 'Less structured mentorship, workshops, or thesis support.',
              },
            ],
          },
          leftImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector.png',
          rightImage: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/curriculum/comp-vector-2.png',
        },
      },
    ],
    button: {
      label: 'Download Curriculum',
      href: '#',
      brochure: 'download-brochure',
    },
  },
};
