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
export const isdiBdesLuxuryProgram = {
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
      text: 'Luxury Brand Strategy is a four-year, curriculum that combines cross-cultural brand intelligence with experience design. Culture, consumer psychology, identity, legacy, economics, sustainability, and thoughtfully crafted physical, digital, and service experiences all help students understand how desire is produced. The curriculum advances from fundamental design concepts to luxury brand foundations, experience design, applied strategy, and industry practice. In their final year, students specialise in Brand Strategy, Experience & Retail Design, or Brand Ventures, culminating in professional practice, dissertation, portfolio, and exhibitions.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Digital 3D Modelling',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/digital-3d-modelling-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/digital-3d-modelling-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/1.webp',
          },
        },
        {
          title: 'Edge Computing',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/edge-computing-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/edge-computing-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/curriculum-highlights/edge-computing/1.webp',
          },
        },
        {
          title: 'Ergonomics Engineering',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/ergonomics-engineering-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/ergonomics-engineering-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/curriculum-highlights/ergonomics-engineering/1.webp',
          },
        },
        {
          title: 'Human Factors & Ergonomics Engineering',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/human-factors---ergonomics-engineering-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/human-factors---ergonomics-engineering-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/curriculum-highlights/human-factors---ergonomics-engineering/1.webp',
          },
        },
        {
          title: 'Product Innovation',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/product-innovation-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/product-innovation-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/curriculum-highlights/product-innovation/1.webp',
          },
        },
        {
          title: 'Smart Product Prototypes',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/smart-product-prototypes-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/smart-product-prototypes-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/tabs/curriculum-highlights/smart-product-prototypes/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'AI Design Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/ai-design-engineer.webp',
            width: 354,
            height: 228,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Embedded Systems & IoT Product Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/embedded-systems-iot-product-engineer.webp',
            width: 354,
            height: 228,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ergonomics Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/ergonomics-engineer.webp',
            width: 354,
            height: 228,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/design-engineer.webp',
            width: 354,
            height: 228,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Human Factors & Product Experience Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/human-factors-product-experience-engineer.webp',
            width: 354,
            height: 228,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Edge AI / Applied ML Design Engineer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-brand-management/tabs/edge-ai-applied-ml-design-engineer.webp',
            width: 354,
            height: 228,
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
          title: 'Rita Ashra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/career-pathway-card.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kanika Sharma',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/career-pathway-card-1.png',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Divya Bindra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/career-pathway-card-2.png',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashutosh Deshmukh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/career-pathway-card-3.png',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Malvika Mahidhar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/career-pathway-card-4.png',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sanjana\nMehta',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-28.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gavin\nRemedios',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-27.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Malvika Mahidhar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty.png',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rohan\nMarathe',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-29.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Janaki\nSonalkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-25.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jui\nKarhadkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-26.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prathamesh Ambokar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-5.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashish\nKapoor',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-13.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Manjit Singh Rajput',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-14.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sania\nSheikh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-17.png',
            width: 303,
            height: 303,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashish\nKapoor',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-12.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Peeyush\nGupta',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-7.png',
            width: 255,
            height: 254,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashish\nKumar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-23.png',
            width: 286,
            height: 286,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jinal\nSangoi',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-15.png',
            width: 266,
            height: 266,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kanchi\nMalhotra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-4.png',
            width: 304,
            height: 304,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Purushottam\nSawaran',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-20.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kushagra Gautam',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-11.png',
            width: 278,
            height: 278,
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
          title: 'Sanjana Nanodkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-16.png',
            width: 306,
            height: 306,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Shirali\nTyabji',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-22.png',
            width: 276,
            height: 276,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Dr.\nJyotiSaini',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-10.webp',
            width: 258,
            height: 258,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Mena Malgaonkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-19.png',
            width: 285,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Antara\nPaul',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-6.png',
            width: 285,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kanupriya Sharma',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-9.png',
            width: 276,
            height: 276,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rucha Suryavanshi',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/tabs/bdes-faculty-8.png',
            width: 278,
            height: 278,
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
      ],
    },
    {
      kind: 'people',
      people: [
        {
          name: 'Aashi lath',
          role: 'Assistant Manager - UI/UX Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/tata-aia-life-insurance.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aashi-lath.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Aastha malhotra',
          role: 'Senior User Experience Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/westlife-foodworld.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aastha-malhotra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Abha mehra',
          role: 'Executive Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/red-sailboat.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/abha-mehra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Akanksha srivastav',
          role: 'UI Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/blue-play-button.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/akanksha-srivastav.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Ananya gupta',
          role: 'Executive designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/godrej.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ananya-gupta.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Aveera juss',
          role: 'Lead Designer - HMI Design',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/mahindra-india-design-studio.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aveera-juss.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Ayushi jhaveri',
          role: 'Graphic Designer & Social Media Executive',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/radisson-blu.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ayushi-jhaveri.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Chiraj rajdeo',
          role: 'Digital Studio Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/purple-bubbles-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/chiraj-rajdeo.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Dhruvi shah',
          role: 'Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/landor.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/dhruvi-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Ishani kulkarni',
          role: 'Think Design Collaborative',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/think.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ishani-kulkarni.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jena shah',
          role: 'Art Director',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/leo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/jena-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shreya shivakumar',
          role: 'Senior Graphic Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/pixel-monogram-fr.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/shreya-shivakumar.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Vadanya Shrotriya',
          role: 'Associate Account Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/curved-x-symbol.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/vadanya-shrotriya.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Vani chandra',
          role: 'Digital Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/logo/designit.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/vani-chandra.jpg',
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
            desc: 'Semester 1 teaches essential design skills through research, fabrication, visualization, drawing, digital imaging, and spatial/material exploration. It is about fostering observation, experimenting, and the ability to turn ideas into real results.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/1.webp',
            },
            portions: [
              {
                title: 'Design Research 1',
                text: 'Introduces research as part of the design process, helping students recognise assumptions and biases, observe carefully, ask focused questions and synthesise information.',
              },
              {
                title: 'Design Studio 1',
                text: 'A hands-on studio focused on visualisation, analytical thinking, experimentation, prototyping and critical reflection. Students learn through making and iteration.',
              },
              {
                title: 'Drawing Fundamentals 1',
                text: 'Builds observation and drawing as tools for thinking and communicating ideas. Students explore shapes, forms and expressive visual representation.',
              },
              {
                title: 'Imaging 1',
                text: 'Develops foundational digital image-making skills using industry-standard tools, connecting visual design principles with digital and 2D/3D processes.',
              },
              {
                title: 'Space & Materiality',
                text: 'Introduces spatial thinking through materials and making. Students explore material properties, spatial relationships, tools and ways of visually communicating spatial concepts.',
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
            desc: 'Semester 2 broadens students\' contextual understanding by covering history, research, sustainability, digital imaging, drawing, and the concept of time. It fosters the ability to relate design decisions to culture, systems, context, and broader societal contexts.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-1/semester-2/1.webp',
            },
            portions: [
              {
                title: 'History in Context to Objects',
                text: 'Studies designed and crafted objects as expressions of particular places and periods, connecting culture, materials, technology and human history.',
              },
              {
                title: 'Design Research 2',
                text: 'Builds on Research 1 by developing stronger research questions, data collection, organisation and communication. Students also learn to translate research into articles and infographics.',
              },
              {
                title: 'Drawing Fundamentals 2',
                text: 'Extends drawing as an exploratory and expressive tool, connecting drawing practice to students\' emerging areas of disciplinary interest.',
              },
              {
                title: 'Imaging 2',
                text: 'Advances digital imaging and visual communication, with greater emphasis on understanding briefs, selecting appropriate solutions and working across digital platforms.',
              },
              {
                title: 'Sustainable Systems',
                text: 'Introduces systems thinking, circular economy and material life cycles, encouraging students to consider environmental, economic and social dimensions of design.',
              },
              {
                title: 'Time',
                text: 'Explores time as a contextual and narrative construct. Students challenge their assumptions about time and use abstraction, contextual inquiry and narrative building in design practice.',
              },
            ],
            dropdowns: [],
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
            desc: 'Semester 3 marks the start of the discipline-specific program. Students discover what makes luxury appealing by merging luxury theory, brand identity, consumer psychology, and cultural intelligence, which culminates in their first integrated brand audit and identity project.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-2/semester-3/1.webp',
            },
            portions: [
              {
                title: 'Foundations of Luxury',
                text: 'Introduces luxury as a philosophical, cultural and commercial category, examining craftsmanship, provenance, scarcity, narrative and cultural resonance as mechanisms of desire.',
              },
              {
                title: 'Brand Identity & Visual Systems',
                text: 'Develops brand identity as an integrated visual and sensory system. Students work with marks, typography, colour, pattern and other identity elements as strategic—not merely aesthetic—decisions.',
              },
              {
                title: 'Consumer Psychology & Luxury Behaviour',
                text: 'Examines aspiration, identity, status, belonging, pleasure, scarcity and anticipation to understand why consumers buy and remain loyal to luxury brands.',
              },
              {
                title: 'Cultural Codes & Brand Meaning',
                text: 'Introduces semiotics, cultural analysis and aesthetic theory to understand how luxury brands create meaning. Particular emphasis is placed on Indian cultural and aesthetic codes.',
              },
              {
                title: 'Brand Studio I — Audit & Identity',
                text: 'Students audit a fictional luxury brand across positioning, identity, consumer and cultural dimensions, then develop a revised identity and positioning direction.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'Semester 4 moves from knowing the brand to planning customer interactions with it. Students apply brand strategy to retail, digital, service, packaging, and product experiences across many touchpoints.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-2/semester-4/1.webp',
            },
            portions: [
              {
                title: 'Retail & Spatial Experience Design',
                text: 'Explores luxury retail as an experiential environment, using spatial storytelling, material, lighting, flow, display and sensory design to communicate brand values.',
              },
              {
                title: 'Digital Brand Experience',
                text: 'Examines how luxury brands use digital platforms, social media and e-commerce while maintaining exclusivity and restraint. Students develop digital touchpoint strategies.',
              },
              {
                title: 'Service Design & Hospitality',
                text: 'Treats service as a designed experience, covering service rituals, language, protocols, training and touchpoint sequencing across hospitality and other luxury contexts.',
              },
              {
                title: 'Packaging & Object Design',
                text: 'Positions packaging and objects as experiential brand communication. Students explore material, weight, finish, sensory qualities and the ritual of possession.',
              },
              {
                title: 'Brand Studio II — Experience Design',
                text: 'Students transform the Semester 3 brand into a complete multi-touchpoint experience spanning physical retail, digital, service and packaging.',
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
                title: 'Narrative-Driven Learning',
                text: 'This year’s curriculum nurtures creative storytelling and visual communication that connects culture, emotion, and message.',
              },
              {
                title: 'Thinking through Making',
                text: 'Subjects strengthen ideation, visualization, and identity design from concept to execution.',
              },
              {
                title: 'Design with Insight',
                text: 'Subjects help students link user understanding with hands-on interface creation and testing.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Creative Integration',
                text: 'Often focuses on static design principles, with minimal emphasis on storytelling or cultural narrative development.',
              },
              {
                title: 'Technique over Thought',
                text: 'Prioritizes software proficiency over conceptual thinking and creative strategy.',
              },
              {
                title: 'Sequential, Not Synergistic',
                text: 'Research and digital skills are usually taught in isolation, delaying practical application',
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
            desc: 'Semester 5 emphasizes strategic and commercial depth. Students learn how to create luxury brands that will last beyond their first launch by studying markets, Indian consumers, sustainability, price, distribution, and the economics of desirability.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-3/semester-5/1.webp',
            },
            portions: [
              {
                title: 'Luxury Brand Strategy',
                text: 'Moves from foundational positioning to advanced questions of global brand management, portfolio architecture, brand extensions, distribution and market entry.',
              },
              {
                title: 'The Indian Luxury Market',
                text: 'Examines India as both a luxury consumer market and a luxury-producing ecosystem, including regional differences, gifting, celebration, aspiration and Indian craft heritage.',
              },
              {
                title: 'Sustainable Luxury',
                text: 'Explores how luxury and sustainability can work together through responsible sourcing, circularity, craft revival, provenance and credible sustainability narratives.',
              },
              {
                title: 'Economics of Luxury',
                text: 'Develops understanding of luxury pricing, distribution, scarcity, exclusivity, mono-brand retail, e-commerce and margin architecture.',
              },
              {
                title: 'Brand Studio III — New Brand Strategy',
                text: 'Students build a complete new Luxury Brand Strategy integrating positioning, identity, consumer strategy, experience, market entry, sustainability and economics.',
              },
              {
                title: 'Key output',
                text: 'A board-level brand strategy recommendation for a fictional luxury brand, presented to faculty and external practitioners.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Semester 6 transitions students from simulated projects to professional practice. They create luxury communications and heritage strategies, handle real-world industry problems, and complete their first supervised industry internship.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Luxury Brand Communications',
                text: 'Explores advertising, editorial, social, events, cultural programming, PR and retail communication, with particular emphasis on restraint, tone, authority and aspiration.',
              },
              {
                title: 'Heritage & Cultural Strategy',
                text: 'Examines heritage as a source of luxury authority, focusing on provenance, mastery, craft, cultural rootedness and the development of authentic heritage narratives.',
              },
              {
                title: 'Brand Studio IV — Live Brief',
                text: 'A real consultancy project brought by an industry partner. Students work in teams to research, analyse and present a strategic recommendation under professional client conditions.',
              },
              {
                title: 'Industry Internship I',
                text: 'An 8–10 week supervised placement with a luxury brand, consultancy, retail group, hospitality company or related organisation. The placement is assessed through a project, reflective journal and final report.',
              },
              {
                title: 'Key output',
                text: 'A live industry recommendation plus documented professional experience through Internships.',
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
                title: 'Cross-Platform Storytelling',
                text: 'Courses encourage narrative expression across print, digital, and interactive media.',
              },
              {
                title: 'Technology as Design Partner',
                text: 'Courses fuse coding, AR/VR, and data into the creative process.',
              },
              {
                title: 'Experiential Thinking',
                text: 'Courses emphasize creating sensory, spatial, and brand-based experiences that engage audiences emotionally.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Medium-Specific Focus',
                text: 'Learning is often confined to one format — print, digital, or motion — limiting experimentation across platforms.',
              },
              {
                title: 'Technology as a Tool',
                text: 'Digital tools are taught for execution, not as part of design thinking or concept development.',
              },
              {
                title: 'Static Presentation Focus',
                text: 'Projects are rarely documented or presented publicly, reducing real-world presentation experience.',
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
            desc: 'Semester 7 is the primary specialization stage. Students select one of three professional tracks and gain advanced knowledge through specialized courses and a large, portfolio-defining capstone project.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Capstone Studio I: Smart Product Venture / Prototype Development',
                text: 'Initiates the final-year capstone project where students frame a complex problem and build a venture-ready functional prototype.',
              },
              {
                title: 'Professional Elective V (Track Course)',
                text: 'A high-level track elective to support capstone technical requirements or specialized study.',
              },
              {
                title: 'Research Methods & Thesis Proposal',
                text: 'Teaches research methodologies, risk assessment, and structured writing to prepare a rigorous capstone thesis proposal.',
              },
              {
                title: 'Industry Mentor Practicum',
                text: 'Pairs students with industry mentors for professional guidance and feedback on capstone development.',
              },
              {
                title: 'Seminar',
                text: 'A structured forum where students present capstone progress and defend their design decisions before faculty and peers.',
              },
              {
                title: 'Open Elective IV',
                text: 'A final interdisciplinary elective to support personal interests or complement the capstone project direction.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 8',
            desc: 'Semester 8 is the professional launchpad. Students develop their specialization through an extended internship, independent dissertation, professional portfolio, and public exhibition, transitioning from student work to professional identity and practice.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/luxury-brand-strategy/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/luxury-brand-strategy/curriculum/benchmarked-curriculum/year-4/semester-8/1.webp',
            },
            portions: [
              {
                title: 'Industry Internship II',
                text: 'A 14–16 week supervised placement in a luxury brand, consultancy, retail, hospitality or venture context, ideally aligned with the student\'s chosen track.',
              },
              {
                title: 'Graduate Dissertation',
                text: 'An independent 8,000–10,000-word research project in Luxury Brand Strategy, experience design or luxury market analysis, developing rigorous research and independent argumentation.',
              },
              {
                title: 'Graduate Portfolio',
                text: 'Students curate their strongest work from Semesters 3–8 and develop a clear professional identity, receiving feedback from faculty and industry practitioners.',
              },
              {
                title: 'Graduate Exhibition',
                text: 'A public-facing exhibition where students present their capstone and selected portfolio work, alongside a formal professional presentation to senior industry practitioners.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Core Track',
            desc: 'The curriculum includes a dedicated core track in Smart Hardware & IoT Product Engineering, as well as two shared optional pools in AI-Native and AI-Integrated Product Engineering. These paths enable students to develop technical expertise in hardware design, embedded systems, software development, and applied AI.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/accessory-design-craft/semester-8-1-173123.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/accessory-design-craft/semester-8-1-5a2f3d.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Smart Hardware & IoT Product Engineering',
                text: 'The primary, dedicated track focused on physical product engineering, covering electronics, PCB design, embedded intelligence, wireless protocols, and design-for-manufacture.',
              },
              {
                title: 'AI-Native Digital Product Engineering',
                text: 'An optional shared track focusing on software creation using AI coding assistants, cloud backend infrastructure, AI design systems, and product strategy.',
              },
              {
                title: 'AI-Integrated Product Engineering',
                text: 'An optional shared track emphasizing the embedding of AI capabilities into products, covering data quality pipelines, computer vision, AI ethics, and MLOps deployment.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Graduate Pathways',
            desc: 'Graduate pathways indicate the specialized profiles that students attain by combining core subjects with certain electives—for example, Hardware-First Engineers, AI-Software Hybrids, or Venture Founders. They train students for a variety of industry professions, including hardware R&D and smart product leadership positions, as well as research and entrepreneurial enterprises.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/accessory-design-craft/semester-8-1-173123.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/accessory-design-craft/semester-8-1-5a2f3d.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Hardware-First Smart Product Engineer',
                text: 'The default core pathway producing IoT/embedded product engineers who specialize in bringing connected hardware from circuit design to full field deployment alongside studio design skills.',
              },
              {
                title: 'Technical-Hybrid Engineer (Software & AI Integrated)',
                text: 'A customized pathway for students using shared electives to pair hardware engineering with skills in building companion apps, directing AI software tools, or integrating computer vision.',
              },
              {
                title: 'Honours-with-Research Pathway',
                text: 'A research-focused academic pathway satisfying UGC research credit requirements, preparing students for research labs or advanced postgraduate studies.',
              },
              {
                title: 'Entrepreneurial / Venture-Development Pathway',
                text: 'A startup-focused pathway leveraging capstone projects and venture development coursework to prepare graduates as technical co-founders or startup product leads.',
              },
              {
                title: 'Entrepreneurial / Venture-Development Pathway',
                text: 'A startup-focused pathway leveraging capstone projects and venture development coursework to prepare graduates as technical co-founders or startup product leads.',
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
