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
export const isdiBdesServiceProgram = {
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
      text: 'The B.Des. in Service & Experience Design prepares students to design complex services and meaningful experiences in a rapidly changing, service-led and technology-mediated world. The program integrates service systems thinking, experience design, strategy, and emerging technologies, with a strong emphasis on ethics, inclusion, and societal impact. As economies shift toward services, platforms, and experience-based value creation, designers are required to work beyond isolated artefacts or interfaces - understanding and intervening in complex systems involving people, processes, institutions, technologies, and environments. From Semester 3 onward, students undertake integrated studios each semester that blend service systems and experience design, moving from foundational practice in Year 2, through strategic and complex service challenges in Year 3, to advanced futures practice and an independently authored Capstone in Year 4.',
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
            desc: 'Learning to see, make, and question.',
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
                text: 'Use design thinking and visual methods to explore, research, observe patterns, reflect on insights, and craft compelling stories that communicate ideas, inspire action, and create meaningful impact.',
              },
              {
                title: 'Design Studio 1',
                text: 'Design Studio 1 introduces creative exploration through design thinking, observation, research, and storytelling. Students develop problem-solving, visual communication, and reflective practice skills to address real-world challenges.',
              },
              {
                title: 'Drawing Fundamentals 1',
                text: 'Drawing Fundamentals 1 builds core visual skills through observation, sketching, composition, and form. Students explore line, shape, proportion, and perspective to strengthen creative expression and design communication.',
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
            desc: 'History, systems, and the sense of time.',
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
                title: 'Design Research 2',
                text: 'Design Research 2 advances research skills, emphasizing observation, data analysis, and user insights. Students apply design thinking to identify problems, generate solutions, and inform creative strategies.',
              },
              {
                title: 'Design Studio 2',
                text: 'Design Studio 2 builds on creative practice, guiding students to apply research, experimentation, and design thinking in real-world projects, developing problem-solving, collaboration, and visual storytelling skills.',
              },
              {
                title: 'Drawing Fundamentals 2',
                text: 'Drawing Fundamentals 2 deepens observational and technical drawing skills, exploring perspective, proportion, texture, and composition. Students refine visual communication and expressive techniques for creative design solutions.',
              },
              {
                title: 'Imaging 2',
                text: 'Imaging 2 advances digital and analog imaging techniques, focusing on composition, storytelling, and post-processing. Students create visually compelling narratives and enhance design communication through images.',
              },
              {
                title: 'Sustainable System',
                text: 'Sustainable System explores eco-friendly design principles, material choices, and systemic thinking. Students analyze environmental impact, develop sustainable solutions, and integrate responsible practices into design processes.',
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
            desc: 'Foundations of Service & Experience Design',
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
                title: 'Experience & Service Systems Studio I: Human-Centred Services, Digital Journeys & Touchpoints',
                text: 'This studio establishes the foundations of service and experience design through applied learning, moving between service blueprinting and journey mapping to develop propositions that work at both system and touchpoint level.',
              },
              {
                title: 'Service & Experience Design Foundations',
                text: 'This course introduces the theoretical foundations of service and experience design, exploring the evolution of services and the frameworks that differentiate service systems, experience design, UX, and CX.',
              },
              {
                title: 'Behaviour, Psychology & Experience',
                text: 'This course explores psychological and behavioural principles relevant to service and experience design, including perception, emotion, decision-making, and habit formation.',
              },
              {
                title: 'Visualising Services & Experiences',
                text: 'This course develops skills for visualising complex services through journey maps, service blueprints, ecosystem diagrams, and narratives.',
              },
              {
                title: 'Minor Elective',
                text: 'A minor elective drawn from an approved list of courses outside the core programme, enabling students to develop interdisciplinary competencies relevant to their design interests and intended professional trajectory.',
              },
              {
                title: 'Internship I',
                text: 'This supervised internship provides students with immersive professional experience in a service design, experience design, or closely related organisational context.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'Service Operations, Scale & Spatial Experiences',
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
                title: 'Service Systems Studio II: Operations & Scale, Spatial & Physical Experiences',
                text: 'This studio develops the ability to design services at operational scale while simultaneously exploring the spatial and physical dimensions of experience.',
              },
              {
                title: 'Service Operations & Management for Designers',
                text: 'This course introduces service operations literacy for designers, covering capacity, queuing, variability, and quality, and designing feasible services that can function at scale.',
              },
              {
                title: 'Experience, Culture & Context',
                text: 'This course examines how cultural, social, and contextual factors shape service experiences, teaching students to design inclusive, ethical, and context-sensitive services.',
              },
              {
                title: 'Digital Physical Integration (Phygital Services)',
                text: 'This course focuses on integrating digital and physical touchpoints in service ecosystems, designing seamless omnichannel journeys across platforms and spaces.',
              },
              {
                title: 'Prototyping Spatial & Service Experiences',
                text: 'This lab-based course develops hands-on prototyping skills using role-play, walkthroughs, and mock-ups to test service and spatial experiences.',
              },
              {
                title: 'Minor Elective',
                text: 'A minor elective drawn from an approved list of courses outside the core programme, enabling students to develop interdisciplinary competencies relevant to their design interests and intended professional trajectory.',
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
            desc: 'Service Strategy, Platforms & AI-Enabled Experiences',
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
                title: 'Service Systems Studio III: Strategy & Innovation, Platform & AI Mediated Experience',
                text: 'This studio advances students into strategic and platform-level service design, exploring how platforms and AI mediate service experiences and evaluating their ethical and experiential implications.',
              },
              {
                title: 'Service Strategy & Value Creation',
                text: 'This course introduces strategic thinking in service design, focusing on how organisations create and sustain value through services, including competitive positioning and service innovation strategy.',
              },
              {
                title: 'Designing Behaviour Change & Trust in Services',
                text: 'This course deepens students\' understanding of how services influence behaviour, decision-making, and trust over time, particularly in digital and AI-enabled services.',
              },
              {
                title: 'AI, Data & Automation for Service Designers',
                text: 'This course builds practical literacy in AI, data, and automation for service designers without requiring coding, including decision automation and recommendation systems.',
              },
              {
                title: 'Minor Elective',
                text: 'A minor elective drawn from an approved list of courses outside the core programme, enabling students to develop interdisciplinary competencies relevant to their design interests and intended professional trajectory.',
              },
              {
                title: 'Internship II',
                text: 'This supervised internship provides students with immersive professional experience in a service design, experience design, or closely related organisational context.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Public Systems, Complexity & Hybrid Service Experiences',
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
                title: 'Experience & Service Systems Studio IV: Public & Complex Systems; Hybrid & Omnichannel Experiences',
                text: 'This studio positions students within complex public and institutional contexts, designing services that address policy, governance, and systemic constraints while maintaining experiential coherence across channels.',
              },
              {
                title: 'Policy, Governance & Design for Public Services',
                text: 'This course introduces how public systems function and how policy and governance shape service design possibilities, treating policy as a design material.',
              },
              {
                title: 'Systems Modelling & Complexity for Designers',
                text: 'This course equips students to model complex adaptive systems using feedback loops, interdependencies, leverage points, and emergent behaviour.',
              },
              {
                title: 'Service Evaluation, Impact & Measurement Lab',
                text: 'This lab focuses on evaluating services and experiences using qualitative and quantitative methods, defining meaningful metrics beyond satisfaction.',
              },
              {
                title: 'Service Prototyping & Piloting Lab',
                text: 'This lab course develops students\' ability to prototype, pilot, and evaluate service concepts in realistic conditions with real-world stakeholders.',
              },
              {
                title: 'Minor Elective',
                text: 'A minor elective drawn from an approved list of courses outside the core programme, enabling students to develop interdisciplinary competencies relevant to their design interests and intended professional trajectory.',
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
            desc: 'Advanced Service-Experience Design: Futures & Transformation',
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
                title: 'Advanced Service Systems Studio V: Futures & Transformation',
                text: 'This advanced studio prepares students for the capstone by engaging with futures, transformation, and complex long-term service challenges using speculative and systems-transformation methods.',
              },
              {
                title: 'Critical Perspectives on Services, Technology & Society',
                text: 'This course examines the societal, political, and ethical dimensions of services and technologies, including platforms and AI, analysing labour, power, access, and inequality.',
              },
              {
                title: 'Futures Thinking & Speculative Design for Services',
                text: 'This course introduces futures thinking and speculative design as methods for exploring uncertainty and long-term change in services.',
              },
              {
                title: 'Entrepreneurship',
                text: 'This course equips students with entrepreneurial thinking and venture design skills relevant to service and experience design, and how designers contribute to innovation ecosystems.',
              },
              {
                title: 'Minor Elective',
                text: 'A minor elective drawn from an approved list of courses outside the core programme, enabling students to develop interdisciplinary competencies relevant to their design interests and intended professional trajectory.',
              },
              {
                title: 'Internship III',
                text: 'This supervised internship provides students with immersive professional experience in a service design, experience design, or closely related organisational context.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 8',
            desc: 'Integrated Service & Experience Design Capstone',
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
                title: 'Capstone Service Systems Studio',
                text: 'This studio focuses on the system-level design of the capstone project: scope, stakeholders, operations, and rigorous service blueprints addressing feasibility, governance, and impact.',
              },
              {
                title: 'Capstone Experience Design Studio',
                text: 'This studio develops the experiential dimension of the capstone project, designing end-to-end experiences across digital, physical, and human touchpoints.',
              },
              {
                title: 'Capstone Seminar: Design Thesis & Argumentation',
                text: 'This seminar supports students in articulating their capstone as a design thesis through structured writing, argumentation, and oral defence, preparing for final juries.',
              },
              {
                title: 'Ethics, Responsibility & Design Leadership',
                text: 'This course strengthens ethical judgment and leadership in complex service contexts, framing leadership as stewardship and responsibility.',
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
