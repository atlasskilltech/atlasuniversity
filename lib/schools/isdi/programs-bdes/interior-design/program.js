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
export const isdiBdesInteriorProgram = {
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
      text: 'This program empowers students to create impactful, functional, and aesthetically compelling spaces using a blend of design thinking, technology, and sustainability. Students explore spatial design, materiality, user experience, service design, and emerging tools, including AI and data-driven design strategies. Hands-on projects, industry collaborations, and live experiences cultivate skills in innovation, brand alignment, and real-world problem-solving. Graduates are prepared for careers as service and experience designers, design strategists, business consultants, AI-enabled design analysts, and sustainable design specialists, emerging as future-ready leaders shaping built environments globally.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Residential\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/residential-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/residential-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/residential-design/1.webp',
          },
        },
        {
          title: 'Workplace\nFutures',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/workplace-futures-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/workplace-futures-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/workplace-futures/1.webp',
          },
        },
        {
          title: 'Hospitality\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/hospitality-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/hospitality-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/hospitality-design/1.webp',
          },
        },
        {
          title: 'Retail\nExperiences',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/retail-experiences-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/retail-experiences-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/retail-experiences/1.webp',
          },
        },
        {
          title: 'Sustainable\nGreenscapes',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/sustainable-greenscapes-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/sustainable-greenscapes-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/sustainable-greenscapes/1.webp',
          },
        },
        {
          title: 'Community Design',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/community-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/community-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/community-design/1.webp',
          },
        },
        {
          title: 'Craft\nInterior Styling',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/craft-interior-styling-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/craft-interior-styling-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/curriculum-highlights/craft-interior-styling/1.webp',
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
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sustainable Design & Innovation Consultant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Strategy & Innovation Analyst',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-3.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Innovation & Business Consultant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/execution/id-cp-4.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Business & Brand Marketing Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Research & Insights Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-6.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Brand & Experience Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-7.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'AI & Data-Driven Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/id-cp-8.webp',
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
          title: 'Divya Vijaychandran',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-007.png',
            width: 266,
            height: 266,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Manasee Kakkad',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-013.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sanjay\nVenigalla',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-015.png',
            width: 303,
            height: 304,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Amrita Ravimohan',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-012.webp',
            width: 256,
            height: 259,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Malvika Mahidhar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-016.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kushal\nJadhav',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-004.webp',
            width: 257,
            height: 257,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Elizabeth Jerome',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-014.png',
            width: 259,
            height: 260,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rupal\nShah',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-006.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Aishwarya\nRaje',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-011.png',
            width: 261,
            height: 264,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kunica\nKhosla',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-009.png',
            width: 255,
            height: 255,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Nikhil\nSahani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-001.png',
            width: 269,
            height: 279,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Divya Chandrashekhar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-005.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mohit\nBhardwaj',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-21.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mon Pal',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-id-002.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Amruta\nSawant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-010.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Harsh\nMohanty',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/faculty-id-003.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashish\nKumar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/image-110-1.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sania\nSheikh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/image-119-1.png',
            width: 268,
            height: 271,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Vaibhav\nMohite',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/image-110-2.webp',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sujeet\nKohok',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/image-119.png',
            width: 268,
            height: 271,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Manjit Singh Rajput',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/tabs/image-110.png',
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
          name: 'Alefiyah ladkawala',
          role: 'Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/elsie-nanji.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/alefiyah-lakdawala.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Khadija limdiwala',
          role: 'Lodha',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/lodha.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/khadija-limdiwala.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Maliga arush',
          role: 'House of Flair',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/house-lab.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/malliga-arush.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Samriddhi Gupta',
          role: 'Interior Design Consultant',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/abstract-intertwined-emblem.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/samriddhi-gupta.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Saniya kulkarni',
          role: 'Livspace',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/abstract-intertwined-emblem.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/saniya-kulkarni.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Sara shroff',
          role: 'Senior Executive Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/jsw-realty.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/sara-shroff.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Simran chaudhry',
          role: 'Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/geometric-white-lines-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/simran-chaudhry.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Titiksha mahajan',
          role: 'Junior Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/good-karma-designs.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/titiksha-mahajan.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Varshitha arujula',
          role: 'Landmark homes',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/logo/built-by-ck.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/success/success-stories/student/varshitha-arupula.jpg',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-1/semester-1/1.webp',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-1/semester-2/1.webp',
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
            desc: 'Explore spatial design, materials, and user experiences. Begin creating meaningful and functional spaces using design thinking and emerging technologies.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-2/semester-3/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 3',
                text: 'Develops students’ spatial design skills through hands-on projects that explore form, structure, and materials, fostering creativity and practical understanding of three-dimensional design principles.',
              },
              {
                title: 'History of Interior Design and Architecture',
                text: 'Studies global architectural history and explores cultural influences that have shaped the evolution of interior design, highlighting diverse styles, traditions, and historical contexts worldwide.',
              },
              {
                title: 'Representation and Analysis',
                text: 'Builds students’ drawing skills to analyze and accurately represent interior spaces, utilizing both traditional analog techniques and modern digital tools for comprehensive visual communication.',
              },
              {
                title: 'Design Visualization',
                text: 'Enhances students’ digital visualization skills to create detailed, precise interior design documentation and compelling presentations that effectively communicate design concepts and spatial ideas.',
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
            desc: 'Translate ideas into tangible interiors. Projects strengthen technical skills, creativity, and incorporate digital tools for design visualization.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-2/semester-4/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 4 - Creative Process',
                text: 'Applies core spatial design principles to create living spaces that are both functional and aesthetically pleasing, balancing practical needs with creative, harmonious interior environments.',
              },
              {
                title: 'Introduction to Interior and Architecture Theory',
                text: 'Develops students’ critical thinking by studying architectural and interior design theory and history, encouraging analysis of styles, contexts, and their impact on contemporary design practices.',
              },
              {
                title: 'Materiality and Assembly for Interiors',
                text: 'Explores materials and construction techniques through hands-on experimentation and creative reinterpretation, enabling students to understand practical applications and innovate within design processes.',
              },
              {
                title: 'Greenscapes in Built environments',
                text: 'Integrates green design principles and biophilic elements to create built environments that enhance occupant well-being, sustainability, and connection to nature through thoughtful, eco-friendly design strategies.',
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
                title: 'Integrated Learning',
                text: 'Encourages cross-disciplinary work by blending design, materials, and visualization for real-world outcomes.',
              },
              {
                title: 'Sustainable Focus',
                text: 'Promotes eco-conscious, human-centered design practices aligned with global innovation needs.',
              },
              {
                title: 'Theory + Practice',
                text: 'Balances conceptual understanding with hands-on projects and industry exposure.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Isolated Learning',
                text: 'Teaches subjects separately, limiting exposure to collaborative and applied learning.',
              },
              {
                title: 'Limited Focus',
                text: 'Sustainability and social impact are often secondary or optional.',
              },
              {
                title: 'Theory Heavy',
                text: 'Prioritizes classroom learning with fewer practical applications.',
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
            desc: 'Integrate materials, spatial strategy, aesthetics, and smart technologies in larger projects. Develop critical thinking and iterative problem-solving.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-3/semester-5/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 5',
                text: 'Designs innovative future-ready co-living and co-working spaces that prioritize sustainability, address urban challenges, foster community interaction, and promote efficient, adaptable environments for modern lifestyles.',
              },
              {
                title: 'Energy and Ecology',
                text: 'Teaches ecological design by incorporating passive and active systems alongside climate-responsive strategies, enabling students to create sustainable buildings that adapt efficiently to environmental conditions.',
              },
              {
                title: 'Basics of 3D Modelling and Rendering',
                text: 'Builds students’ 3D modeling skills using Rhino and Keyshot software, enhancing their ability to visualize, refine, and integrate complex design concepts with realistic renderings.',
              },
              {
                title: 'Design Vocabulary',
                text: 'Builds students’ 3DRefines students’ design writing and research skills to produce clear, concise, and industry-specific communication that effectively conveys ideas, supports design decisions, and enhances professional credibility. modeling skills using Rhino and Keyshot software, enhancing their ability to visualize, refine, and integrate complex design concepts with realistic renderings.',
              },
              {
                title: 'Minor Track',
                text: 'The minor track you choose will continue across all the remaining years of your program.',
              },
            ],
            dropdowns: [
              {
                title: 'Program Elective',
                items: [
                  {
                    title: 'Advanced Immersive Media',
                    text: 'Introduces Unity 3D to design interactive, immersive digital experiences, combining technical proficiency and creative experimentation in AR/VR environments for storytelling, simulation, and innovative communication design.',
                  },
                  {
                    title: 'Concept to Code',
                    text: 'Bridges design and technology by translating creative ideas into code, fostering technical fluency, computational thinking, and innovative problem-solving for interactive, user-centered design solutions.',
                  },
                  {
                    title: 'Experiential Design',
                    text: 'Focuses on designing immersive physical environments that heighten user interaction and sensory engagement, merging spatial design, storytelling, and brand experience into memorable, dynamic communication encounters.',
                  },
                  {
                    title: 'Podcast & Content Creation',
                    text: 'Develops narrative and production skills for podcasts and multimedia content, emphasizing research, scripting, sound design, and storytelling strategies tailored for digital communication and engagement.',
                  },
                  {
                    title: 'Creative Writing Across Media',
                    text: 'Enhances writing skills across diverse media formats, from digital to print, emphasizing narrative craft, audience engagement, and adaptability in shaping impactful, creative communication.',
                  },
                ],
              },
            ],
          },
          {
            title: 'Semester 6',
            desc: 'Push creative boundaries with advanced design challenges. Focus on innovation, user-centered solutions, and future-ready digital skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 6',
                text: 'Designs commercial interiors that balance brand identity, user needs, and experiential elements, creating cohesive, functional, and engaging environments that enhance customer interaction and business goals.',
              },
              {
                title: 'Semiotics in Interior Design',
                text: 'Applies semiotic theory to design spaces that convey meaning by integrating symbols, signs, and user behavior, enhancing communication and emotional connection within the built environment.',
              },
              {
                title: 'Digital Rendering - 3Dmax',
                text: 'Builds advanced 3D modeling and rendering skills using 3ds Max software, enabling students to create highly detailed and realistic interior visualizations for professional presentations and design development.',
              },
              {
                title: 'Building Systems & Services',
                text: 'Integrates building systems and materials thoughtfully to develop functional, site-specific interior design solutions that respond to environmental conditions, structural requirements, and user needs for optimal performance.',
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
                title: 'Sustainable, Future-Ready Design',
                text: 'Focuses on ecological and adaptable interiors that address urban and environmental challenges.',
              },
              {
                title: 'Advanced Digital Tools',
                text: 'Trains students in Rhino, Keyshot, and 3ds Max to create realistic, professional visualizations.',
              },
              {
                title: 'Integrated Systems Thinking',
                text: 'Combines design, materials, and building systems for functional, user-centered solutions.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Traditional Focus',
                text: 'Emphasizes conventional spaces with limited attention to sustainability or innovation.',
              },
              {
                title: 'Limited Tech Exposure',
                text: 'Offers only basic or outdated software training for visualization.',
              },
              {
                title: 'Fragmented Learning',
                text: 'Teaches design and technical systems separately, reducing practical application.',
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
            desc: 'Engage with live projects and collaborations. Develop professional skills, client communication, tech-enabled presentations, and design leadership.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 7',
                text: 'Designs adaptive, research-driven spatial solutions aligned with SDGs and national goals, connecting real-world impact with classroom learning.',
              },
              {
                title: 'Advanced Research Seminar',
                text: 'Builds strong research and analytical skills to develop publishable studies and conference papers, leading to a comprehensive Capstone project that demonstrates critical thinking and effective problem-solving.',
              },
              {
                title: 'Professional Practice and Ethics',
                text: 'Blends industry-led learning and real-world simulations with essential business, communication, and ethical practices for professional success in design.',
              },
              {
                title: 'Interior Styling',
                text: 'Develops styling skills through industry and brand briefs, enabling students to craft cohesive, functional, and visually appealing spaces with thoughtful use of color, texture, furniture, and accessories.',
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
            desc: 'Showcase mastery through a comprehensive interior design project. Demonstrate creativity, innovation, and readiness for a technology-driven professional world.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/interior-design-built-environment/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/interior-design-built-environment/curriculum/benchmarked-curriculum/year-4/semester-8/1.webp',
            },
            portions: [
              {
                title: 'Interior Design Studio 8 - Capstone',
                text: 'Initiates the capstone journey by conducting in-depth research, leveraging mentorship, and applying critical inquiry through live or self-directed design projects to inform innovative and meaningful solutions.',
              },
              {
                title: 'Research and Writing (Capstone)',
                text: 'Builds strong research and writing skills to effectively document, analyze, and support Capstone design outcomes, ensuring clear communication of design intent and informed decision-making.',
              },
              {
                title: 'Advanced Professional Practice',
                text: 'Equips students with essential business acumen, technological proficiency, and strategic planning skills to excel in future-focused interior design practice, adapting to evolving industry demands and innovations.',
              },
              {
                title: 'Cross Disciplinary Design',
                text: 'Fosters innovation by encouraging cross-disciplinary collaboration, integrating diverse perspectives and expertise to creatively address complex design challenges with holistic, effective, and forward-thinking solutions.',
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
                title: 'Research-Driven Innovation',
                text: 'Emphasizes research, SDGs, and real-world application through Capstone projects with measurable impact.',
              },
              {
                title: 'Industry and Professional Readiness',
                text: 'Integrates business, ethics, and advanced practice to prepare students for professional design leadership.',
              },
              {
                title: 'Cross-Disciplinary Collaboration',
                text: 'Encourages teamwork across disciplines to solve complex design challenges innovatively.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Project-Focused Only',
                text: 'Prioritizes design output without deep research or global relevance.',
              },
              {
                title: 'Academic-Centric',
                text: 'Limited exposure to real-world business or ethical frameworks.',
              },
              {
                title: 'Siloed Learning',
                text: 'Focuses narrowly within interior design, limiting broader creative collaboration.',
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
