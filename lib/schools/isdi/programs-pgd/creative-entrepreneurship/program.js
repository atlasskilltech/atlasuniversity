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
export const isdiPgdCreativeEntProgram = {
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
      text: 'The B.Tech Design Engineering program is a four-year degree aimed at cultivating product engineers who design, build, prototype, and deploy smart products. It combines a solid foundation in mathematics, electronics, embedded systems, software, and applied AI with a focus on human-centered design and system-level integration. Graduates are trained for all stages of the smart product lifecycle, ensuring ethical usability and responsible engineering. The program integrates engineering rigor with design practice, addressing crucial challenges such as manufacturability and user-focused product behavior.',
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
            desc: 'Find, Frame and Validate',
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
            image: null,
            portions: [
              {
                title: 'DE101 Founder Mindset and Entrepreneurial Leadership',
                text: 'Develops founder judgement, self-awareness, resilience and team leadership for uncertain, resource-constrained environments.',
              },
              {
                title: 'DE102 Opportunity Discovery and Market Intelligence',
                text: 'Combines cultural observation, market analysis and entrepreneurial search to identify commercially meaningful opportunity spaces.',
              },
              {
                title: 'DE103 Customer Research and Behaviour',
                text: 'Uses qualitative and quantitative inquiry to understand jobs, behaviours, frictions and willingness to adopt or pay.',
              },
              {
                title: 'DE104 Venture Proposition and Business Model Design',
                text: 'Turns insight into differentiated value propositions and coherent business models, tested through prototypes and experiments.',
              },
              {
                title: 'DE105 Brand Creation and Strategic Storytelling',
                text: 'Builds a distinctive, credible brand system that clarifies meaning, trust and choice in the market.',
              },
              {
                title: 'DE106 Entrepreneurial Finance and Unit Economics',
                text: 'Provides financial control for early ventures through pricing, contribution, cash flow, break-even and scenario analysis.',
              },
              {
                title: 'DE107 Venture Validation Studio',
                text: 'Integrates semester learning in a governed sequence of customer, proposition, channel and commercial experiments.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 2',
            desc: 'Build, Launch and Scale',
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
            image: null,
            portions: [
              {
                title: 'DE201 Product and Service Commercialisation',
                text: 'Develops the pathway from prototype to a reliable, deliverable and supportable market offering.',
              },
              {
                title: 'DE202 Go-to-Market, Sales and Growth',
                text: 'Builds acquisition, conversion, retention and partnership systems appropriate to early-stage ventures.',
              },
              {
                title: 'DE203 AI and Digital Infrastructure for Start-ups',
                text: 'Applies AI and no-code systems to research, content, customer operations, analytics and workflow automation.',
              },
              {
                title: 'DE204 Operations, Supply Networks and Scale',
                text: 'Designs repeatable operating systems, partners, capacity and risk controls for venture growth.',
              },
              {
                title: 'DE205 Intellectual Property, Contracts and Venture Governance',
                text: 'Develops practical literacy in entity choices, ownership, contracts, compliance, IP and responsible governance.',
              },
              {
                title: 'DE206 Funding, Valuation and Investor Readiness',
                text: 'Examines bootstrapping and external capital, valuation logic, investor fit and fundraising readiness.',
              },
              {
                title: 'DE207 Venture Launch Accelerator',
                text: 'A supervised launch environment in which students take a venture to market and defend traction, economics, operations and growth decisions.',
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
    ],
    button: {
      label: 'Download Curriculum',
      href: '#',
      brochure: 'download-brochure',
    },
  },
};
