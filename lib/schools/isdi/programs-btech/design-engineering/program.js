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
export const isdiBtechDesignEngProgram = {
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
      text: 'The Design Engineering program is a four-year degree aimed at cultivating product engineers who design, build, prototype, and deploy smart products. It combines a solid foundation in mathematics, electronics, embedded systems, software, and applied AI with a focus on human-centered design and system-level integration. Graduates are trained for all stages of the smart product lifecycle, ensuring ethical usability and responsible engineering. The program integrates engineering rigor with design practice, addressing crucial challenges such as manufacturability and user-focused product behavior.',
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
            desc: 'Develops fundamental skills in calculus, physics, computational Python programming, and quick physical-digital prototyping to transform unstructured problems into functioning concepts.',
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
                title: 'Design, Systems & Visualisation Studio 1',
                text: 'Introduces design thinking, observation, problem framing, visualization, and systems representation through hands-on, iterative projects.',
              },
              {
                title: 'Engineering Mathematics I Calculus & Linear Algebra',
                text: 'Covers differential and integral calculus, vectors, matrices, and linear algebra as a practical mathematical toolkit applied to real engineering problems.',
              },
              {
                title: 'Physics of Engineered Systems',
                text: 'Explores fundamental physical principles—including mechanics, electricity, and magnetism—underlying sensors, actuators, and electromechanical hardware.',
              },
              {
                title: 'Computational Thinking & Programming 1',
                text: 'Teaches algorithmic problem-solving and programming fundamentals using Python through writing, testing, and debugging code from scratch.',
              },
              {
                title: 'Making & Prototyping Lab 1',
                text: 'Provides hands-on experience with physical tools, digital 3D modeling, rapid prototyping, and electronics to build testable physical artifacts.',
              },
              {
                title: 'Communication for Technology & Design',
                text: 'Develops technical writing, presentation skills, documentation standards, and professional feedback habits tailored for engineering and design contexts.',
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
            desc: 'Moves from concept to proof via user research, statistical reasoning, fundamental electronic circuits/sensors, materials science, and introductory AI.',
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
                title: 'Design, Systems & Human-Centred Studio II',
                text: 'Focuses on moving from problem framing to evidence-led intervention using user research, system mapping, iterative prototyping, and integrating physical, digital, or intelligent elements into a prototype.',
              },
              {
                title: 'Engineering Mathematics II — Probability, Statistics & Modelling',
                text: 'Introduces probability, statistics, uncertainty, basic differential-equation reasoning, and mathematical modelling applied to engineering datasets and quantitative decision-making.',
              },
              {
                title: 'Computational Thinking & Programming II',
                text: 'Covers object-oriented programming, core data structures, modular software design, and the responsible, critical use and ownership of AI-assisted development tools.',
              },
              {
                title: 'Electronics, Sensors & Intelligent Systems',
                text: 'Introduces basic electronic circuits, analog/digital concepts, sensor and actuator interfacing, and microcontroller-level interaction to make physical systems sense and respond.',
              },
              {
                title: 'Data, AI & Emerging Technology Foundations',
                text: 'Provides a programme-neutral introduction to data representation, basic machine learning, generative AI, evaluation of AI reliability, and associated ethical and safety considerations.',
              },
              {
                title: 'Materials Science & Engineering',
                text: 'Explores the relationship between material structure, properties, processing, and performance across metals, polymers, composites, ceramics, and semiconductors with a focus on sustainable selection.',
              },
              {
                title: 'Technology, Society & Sustainability',
                text: 'Integrates professional ethics, safety obligations, intellectual property, environmental responsibility, and societal impacts into technology choices and engineering decisions.',
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
            desc: 'Combines physical form with digital interfaces and fundamental AI/ML, establishing design principles in structural mechanics, material selection, and user data analysis.',
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
                title: 'Smart Product Design Studio I: Connected Devices & Digital Interfaces',
                text: 'Focuses on designing products that integrate physical form, digital interfaces, and connected device behaviour.',
              },
              {
                title: 'Engineering Mechanics & Materials Science',
                text: 'Introduces fundamental mechanics and material selection principles to ensure product durability, structural integrity, and manufacturability.',
              },
              {
                title: 'Introduction to AI & Machine Learning',
                text: 'Covers foundational AI and machine learning concepts to help evaluate and implement basic ML models in product design.',
              },
              {
                title: 'Statistics for Designers',
                text: 'Teaches applied statistical methods and data analysis to validate user research and support evidence-based design decisions.',
              },
              {
                title: 'Open Elective I',
                text: 'Offers interdisciplinary learning outside the core curriculum to broaden problem-solving perspectives in product design.',
              },
              {
                title: 'Design Communication & Sketching',
                text: 'Builds visual communication and rapid sketching skills tailored for ideating, rendering, and presenting product concepts.',
              },
              {
                title: 'Concepts and Sketches - Conceptual Visualization',
                text: 'Trains students in conceptual sketching to visualize ideas, explore symbolism, and create identity-driven logos and graphic marks that communicate values and brand personality effectively.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'Involves creating fully intelligent, connected goods by combining embedded microcontrollers, IoT connection, on-device ML models, and full-stack mobile/web applications.',
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
                title: 'Smart Product Design Studio II: Intelligent & Connected Products',
                text: 'Focuses on designing and prototyping products that integrate embedded behavior, connectivity, and AI/ML capability for data-responsive behavior.',
              },
              {
                title: 'Embedded Systems & IoT',
                text: 'Teaches microcontroller programming, embedded architecture, and IoT connectivity for building smart hardware with sensing, actuation, and wireless data transfer.',
              },
              {
                title: 'Applied Machine Learning for Smart Products',
                text: 'Covers applying and integrating trained machine learning models into functional prototypes for prediction, personalization, and sensor-data interpretation.',
              },
              {
                title: 'Mobile & Web Application Development',
                text: 'Introduces front-end development, API integration, and deployment to create digital interface layers for smart products.',
              },
              {
                title: 'Design Research Methods',
                text: 'Teaches qualitative and quantitative research methods—such as interviews, surveys, and observational studies—to translate user insights into actionable design decisions.',
              },
              {
                title: 'Open Elective II',
                text: 'Enables interdisciplinary exploration beyond the core curriculum to foster broader problem-solving perspectives.',
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
            desc: 'Addresses real-world restrictions through an industry-sponsored product brief, while also studying human factors, cloud backends, IP legislation, and basic hardware electives.',
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
                title: 'Applied Studio I: Industry-Sponsored Smart Product Brief',
                text: 'Students work on a live industry brief to frame a problem, engineer a smart product solution, and build a functional prototype.',
              },
              {
                title: 'Human Factors & Ergonomics',
                text: 'Covers physical and cognitive usability principles, anthropometrics, and ergonomic guidelines to ensure product safety and comfort.',
              },
              {
                title: 'Cloud, APIs & Backend Systems for Connected Products',
                text: 'Focuses on backend infrastructure, cloud architecture, and API design to enable seamless data flows for smart product ecosystems.',
              },
              {
                title: 'Professional Elective I (Track Course)',
                text: 'A specialized elective selected from the Smart Hardware & IoT Core Track or the Shared ISDI Elective Pool.',
              },
              {
                title: 'Professional Elective II (Track Course)',
                text: 'A second specialised elective to deepen technical competency within the chosen track or elective pool.',
              },
              {
                title: 'Design Ethics, IP & Law',
                text: 'Addresses data privacy, legal regulations, and intellectual property rights required when commercializing connected products.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Fine-tunes and launches the industry project, expands hardware track specialization, explores venture entrepreneurship, and completes a credit-bearing summer internship.',
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
                title: 'Applied Studio II: Industry-Sponsored Smart Product Brief (cont.)',
                text: 'Continues the industry brief from Semester 5, focusing on refining, testing, and presenting the final product to stakeholders.',
              },
              {
                title: 'Entrepreneurship & New Product Development',
                text: 'Teaches business model validation, market feasibility, and commercialization strategies for taking smart products to market.',
              },
              {
                title: 'Professional Elective III (Track Course)',
                text: 'An advanced track course focusing on hardware engineering or shared AI-integrated product domains.',
              },
              {
                title: 'Professional Elective IV (Track Course)',
                text: 'Further deepens technical focus through specialized track or shared elective options.',
              },
              {
                title: 'Summer Internship (Credit-Bearing, Assessed)',
                text: 'A supervised industry placement providing practical experience on real-world engineering and product development workflows.',
              },
              {
                title: 'Open Elective III',
                text: 'An interdisciplinary course designed to broaden academic scope outside the core engineering curriculum.',
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
            desc: 'Begin a self-directed, venture-ready capstone project with structured research methodology, seminars, and regular feedback from a designated industry mentor.',
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
            desc: 'Completes a fully built, end-to-end smart product capstone, followed by a second industry practicum and a final portfolio defense in front of an expert panel.',
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
                title: 'Capstone Studio II: Major Project / Thesis with Research',
                text: 'The culminating studio where students deliver a fully built, end-to-end smart product and research thesis.',
              },
              {
                title: 'Professional Elective VI (Track Course)',
                text: 'The final track course completing the student\'s technical specialization requirements.',
              },
              {
                title: 'Industry Internship II / Practicum',
                text: 'An advanced professional practicum to support capstone execution and deepen industry readiness.',
              },
              {
                title: 'Comprehensive Portfolio Defense / Viva',
                text: 'A final formal examination where students present and defend their complete multi-year design-engineering portfolio to external reviewers.',
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
