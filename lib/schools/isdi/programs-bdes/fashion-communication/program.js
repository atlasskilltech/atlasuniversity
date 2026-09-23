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
export const isdiBdesFashionCommProgram = {
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
      text: 'This program empowers students to become creative leaders in fashion media and communication, blending storytelling, styling, digital content, and emerging technologies. Students explore fashion styling, brand communication, content creation, digital campaigns, and trend forecasting while leveraging AI tools, social media, and immersive platforms. Hands-on projects, industry collaborations, and live experiences build skills in digital storytelling, influencer strategy, and brand innovation. Graduates are prepared for careers as fashion stylists, digital creators, PR specialists, trend forecasters, and creative directors, emerging as trend-savvy professionals who shape fashion culture in a rapidly evolving, tech-driven world.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Art & Cultural\nNarratives',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/art-cultural-narratives-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/art-cultural-narratives-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/art-cultural-narratives/1.webp',
          },
        },
        {
          title: 'Sartorial\nMastery',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/sartorial-mastery-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/sartorial-mastery-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/sartorial-mastery/1.webp',
          },
        },
        {
          title: 'Creative\nDirection',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/creative-direction-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/creative-direction-1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Strategic Brand\nEngagement',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/strategic-brand-engagement-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/strategic-brand-engagement-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/strategic-brand-engagement/1.webp',
          },
        },
        {
          title: 'Branding & Visual\nCommunication',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/branding-visual-communication-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/branding-visual-communication-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/branding-visual-communication/1.webp',
          },
        },
        {
          title: 'AI & Interactive\nMedia',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/ai-interactive-media-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/ai-interactive-media-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/ai-interactive-media/1.webp',
          },
        },
        {
          title: 'Global Fashion\nPerspectives',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/global-fashion-perspectives-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/global-fashion-perspectives-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/global-fashion-perspectives/1.webp',
          },
        },
        {
          title: 'Professional Practice &\nIndustry Skills',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/professional-practice-Industr-skills-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/professional-practice-Industr-skills-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/curriculum-highlights/professional-practice-Industr-skills/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Fashion & Celebrity Stylist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Influencer & Digital Creator',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Content Creator',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion3.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Trend & Culture Forecaster',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion4.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion\nPR',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Communication\nSpecialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fcs-cp-6.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Brand & Marketing Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/fashion7.webp',
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
          title: 'Poonam\nMishra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-002.webp',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Belinda\nBawa',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-016.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mourya\nDandu',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-011.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Aarushi\nPurohit',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-012.png',
            width: 259,
            height: 260,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Abhilasha Bhujbal',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-010.webp',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sonika\nTewari',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-006.webp',
            width: 267,
            height: 267,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Heena Sachdeva',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-003.png',
            width: 261,
            height: 261,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Vipul\nMane',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-24.png',
            width: 303,
            height: 304,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Agnijit\nTarafdar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-008.png',
            width: 269,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ishi\nSrivastava',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-005.png',
            width: 269,
            height: 267,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Seerat\nRizvi',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-001.webp',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mandeep\nKaur',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-013.png',
            width: 267,
            height: 268,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Anuradha\nLikhite',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-015.png',
            width: 259,
            height: 260,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Anurag\nDubey',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-007.png',
            width: 260,
            height: 260,
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
          title: 'Prakriti\nTalsera',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/tabs/faculty-fcs-009.png',
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
          name: 'Shubhangi Jindal',
          role: 'Senior Creative/Copy Editor',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/conde-nast.jpg',
            width: 175,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/shubhangi-jindal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shruti Misra',
          role: 'Content: ~Styling~ & Influencer Marketing',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/trent-limited.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/shruti-misra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shania Serao',
          role: 'Commis 3',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/doubletree-by-hilton.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/shania-serao.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Pearlin Debara',
          role: 'Senior Executive - Marketing Communications',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/nykaa.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/pearlin-debara.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Khushi Ganatra',
          role: 'Senior Digital Strategist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/m.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/khushi-ganatra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jenaya Desai',
          role: 'Marketing~ ~Executive~',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/gaurav-gupta.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/jenaya-desai.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jasleen Narang',
          role: 'Marketing Intern',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/vogue.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/jasleen-narang.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Heer Sethia',
          role: 'Creative Strategist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/m.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/heer-sethia.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Drishti Ajmera',
          role: 'Social Media and Branding Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/fae-beauty.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/drishti-ajmera.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Divya Ostwal',
          role: 'Social Media Strategist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/inde-wild.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/divya-ostwal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Devika Singh',
          role: 'Agency Partner',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/eidm.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/devika-singh.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Bhavya Krishnan',
          role: 'Marketing Executive',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/play-button.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/bhavya-krishnan.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Aparna Agarwal',
          role: 'Program Manager, Human Rights',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/amazon.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/aparna-agarwal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Anvaya Namjoshi',
          role: 'Senior Manager – Content Strategy',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/logo/tm.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/success/success-stories/student/anvaya-namjoshi.jpg',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-1/semester-1/1.webp',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-1/semester-2/1.webp',
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
            desc: 'Explore styling, photography, and visual storytelling. Apply concepts using digital media and emerging technologies.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-2/semester-3/1.webp',
            },
            portions: [
              {
                title: 'The Fashion System',
                text: 'Introduces fashion industry structure, market levels, and sustainable practices, enabling students to understand production, trends, and responsible design strategies.',
              },
              {
                title: 'Psychology of Fashion',
                text: 'Examines consumer psychology and preferences, guiding students to design inclusive, personality-driven fashion experiences that resonate with diverse audiences.',
              },
              {
                title: 'Fashion Semiotics: Visual Language',
                text: 'Teaches techniques in visual communication, digital media, and narrative design to express fashion concepts effectively and creatively across platforms.',
              },
              {
                title: 'Fashion and Society',
                text: 'Explores international cultural influences on fashion, helping students understand social meanings, traditions, and cultural storytelling in contemporary fashion design.',
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
            desc: 'Translate ideas into campaigns, visuals, and styled outputs. Refine narrative, execution, and technology-enhanced communication skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-2/semester-4/1.webp',
            },
            portions: [
              {
                title: 'Business Models and New Markets',
                text: 'Explores fashion business models, global market trends, and digital transformations, equipping students to navigate the evolving fashion economy strategically and innovatively.',
              },
              {
                title: 'History of Fashion Theory',
                text: 'Studies fashion’s evolution from couture to ready-to-wear, analyzing cultural influences, historical contexts, and their impact on contemporary design practices.',
              },
              {
                title: 'Fashion Styling lab',
                text: 'Teaches styling through research, experimentation, and collaboration, enabling students to reinterpret fashion aesthetics and create visually compelling, innovative looks.',
              },
              {
                title: 'Visual Communication',
                text: 'Develops skills in narrative design and visual communication to effectively express fashion concepts, ideas, and brand stories across media platforms.',
              },
              {
                title: 'Fashion Photography Studio',
                text: 'Builds photography techniques and personal styling skills through hands-on studio practice, fostering creative expression and professional visual presentation.',
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
                title: 'Industry-Integrated Learning',
                text: 'Links design with business and sustainability through real-world fashion systems.',
              },
              {
                title: 'Human-Centered Insight',
                text: 'Merges psychology and culture to design for diverse audiences.',
              },
              {
                title: 'Narrative Visual Expression',
                text: 'Builds strong storytelling through styling, photography, and digital media.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Industry Focus',
                text: 'Prioritize aesthetics over business or sustainable practice.',
              },
              {
                title: 'Shallow User Understanding',
                text: 'Overlook psychology and cultural perspectives in design.',
              },
              {
                title: 'Skill-Only Approach',
                text: 'Emphasize technique without conceptual storytelling.',
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
            desc: 'Develop larger projects integrating communication, media, styling, and AI/digital tools. Build critical thinking and experimentation skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-3/semester-5/1.webp',
            },
            portions: [
              {
                title: 'Fashion Business Writing',
                text: 'Develops adaptable writing skills for fashion media, enhancing communication, storytelling, and effective collaboration within diverse industry contexts.',
              },
              {
                title: 'Speculative Fashion',
                text: 'Equips students to analyze consumer behavior, anticipate trends, and strategically plan for future shifts in the fashion industry.',
              },
              {
                title: 'Marketing of Fashion: Fundamentals',
                text: 'Introduces marketing approaches across digital and traditional media, helping students define target audiences and create impactful brand campaigns.',
              },
              {
                title: 'Fashion Digital Tools',
                text: 'Teaches design, animation, and digital storytelling tools to create engaging fashion narratives and enhance brand communication.',
              },
              {
                title: 'Research Methodology',
                text: 'Builds research and analytical skills to explore, address, and solve challenges in fashion communication, design, and industry practices.',
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
            desc: 'Push creative boundaries with advanced media, campaigns, and tech-enabled styling projects. Develop future-ready problem-solving skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-3/semester-6/1.png',
            },
            portions: [
              {
                title: 'Visual Narrative Strategy',
                text: 'Teaches visual narrative strategies for art direction, enabling students to craft compelling, cohesive stories across fashion, film, and lifestyle projects.',
              },
              {
                title: 'Sartorial Mastery',
                text: 'Explores thematic styling, creative experimentation, and aesthetic innovation, allowing students to develop distinctive and concept-driven fashion expressions.',
              },
              {
                title: 'Branding for Luxury',
                text: 'Teaches luxury brand management through market analysis, consumer insights, and sustainable strategies, preparing students to position brands ethically and strategically.',
              },
              {
                title: 'Brand Narratives',
                text: 'Builds skills in creative writing and narrative techniques to communicate brand identity, values, and vision effectively across multiple media platforms.',
              },
              {
                title: 'Retail Atmospherics',
                text: 'Guides students to design immersive retail experiences, integrating visual merchandising principles and brand storytelling to engage and inspire consumers.',
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
                title: 'Strategic Industry Readiness',
                text: 'Combines marketing, branding, and management to build business-savvy creative professionals.',
              },
              {
                title: 'Foresight & Research Focus',
                text: 'Integrates consumer analysis and trend forecasting with strong research methodology.',
              },
              {
                title: 'Storytelling Through Media',
                text: 'Blends digital tools, writing, and visual strategy to craft impactful brand narratives.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Business Perspective',
                text: 'Focus mainly on design aesthetics with minimal exposure to fashion markets.',
              },
              {
                title: 'Reactive, Not Research-Driven',
                text: 'Seldom emphasize forecasting or analytical skills for future planning.',
              },
              {
                title: 'Fragmented Communication Approach',
                text: 'Teach visual or written skills in isolation without cohesive storytelling.',
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
            desc: 'Engage in industry collaborations, live projects, and internships. Strengthen professional skills, portfolio, and digital fluency.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Capstone Ideation',
                text: 'Guides students to generate thesis ideas through trend analysis, creative direction, and visual storytelling, preparing for in-depth independent research and projects.',
              },
              {
                title: 'Capstone Research Methods',
                text: 'Builds skills for research papers, critical reviews, and ethical referencing, enabling clear, professional, and scholarly communication within the fashion and design context.',
              },
              {
                title: 'Brands in Digital Age',
                text: 'Teaches strategies for digital brand building, leveraging technology, media, and consumer engagement tools to create impactful online presence and campaigns.',
              },
              {
                title: 'Future Technology Tools',
                text: 'Explores innovative technologies shaping fashion communication, interactive design, and immersive experiences, preparing students to integrate tech-driven solutions creatively.',
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
            desc: 'Showcase mastery in a comprehensive fashion communication project. Demonstrate creativity, storytelling, and readiness for a tech-driven global industry.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-communication-styling/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-communication-styling/curriculum/benchmarked-curriculum/year-4/semester-8/1.webp',
            },
            portions: [
              {
                title: 'Capstone Resolution',
                text: 'Finalizes research through critical analysis, thorough documentation, and 2D/3D presentations, preparing students to communicate design concepts professionally and effectively.',
              },
              {
                title: 'Capstone Writing',
                text: 'Teaches structured academic writing, ethical referencing, and thesis book preparation, enabling students to present research and design work authoritatively.',
              },
              {
                title: 'Professional Practice and Ethics',
                text: 'Develops ethical reasoning, critical thinking, and interpersonal skills essential for responsible and effective professional practice in the fashion industry.',
              },
              {
                title: 'Business of Fashion',
                text: 'Equips students with skills to build, manage, and grow fashion ventures using innovative startup models and strategic business planning.',
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
                title: 'Integrated Professional Skills',
                text: 'Courses teach financial literacy, ethics, management, and entrepreneurship within the curriculum.',
              },
              {
                title: 'Research-Driven Capstone',
                text: 'Courses conduct in-depth research and iterative design to produce user-centered solutions.',
              },
              {
                title: 'Polished Public Presentation',
                text: 'Documentation, Presentation, and Exhibition teach students to professionally showcase work, and communicate their process',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Skills in Isolation',
                text: 'Professional or business skills are usually taught separately, not embedded in design learning.',
              },
              {
                title: 'Output-Centric Projects',
                text: 'Capstones often focus on final deliverables without structured research or iterative mentorship.',
              },
              {
                title: 'Limited Exposure',
                text: 'Projects are rarely documented or presented publicly, reducing real-world presentation experience.',
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
