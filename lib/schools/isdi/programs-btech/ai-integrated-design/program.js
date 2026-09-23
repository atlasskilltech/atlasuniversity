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
export const isdiBtechAiDesignProgram = {
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
      text: 'The AI Engineering & Intelligent products programme is a four-year undergraduate engineering degree designed to develop technically rigorous AI engineers who are also capable of designing, governing, and being accountable for the intelligent systems they build. The program integrates a strong foundation in mathematics, computing, data science, and artificial intelligence with a distinctive design overlay that emphasises human-centred thinking, explainability, ethics, and system-level impact - graduating engineers who can work across the full AI lifecycle from problem framing and data engineering to model development, deployment, evaluation, and governance.',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/digital-3d-modelling/1.webp',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/edge-computing/1.webp',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/ergonomics-engineering/1.webp',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/human-factors---ergonomics-engineering/1.webp',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/product-innovation/1.webp',
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
            poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/curriculum-highlights/smart-product-prototypes/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'AI Design Engineer AI Product Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/career-pathways/ai-product-designer.webp',
            width: 354,
            height: 237,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Generative & Creative AI Director',
          image: {
            src: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/career-pathways/generative-creative-ai-director.webp',
            width: 354,
            height: 237,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Human AI Interaction Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/career-pathways/human–ai-interaction-designer.webp',
            width: 354,
            height: 237,
            alt: '',
          },
          video: null,
        },
        {
          title: 'ML Systems MLops Engineer AI Venture Founder',
          image: {
            src: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/career-pathways/ml-systems-mlops-engineer-ai-venture-founder.webp',
            width: 354,
            height: 237,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Responsible AI Safety & Governance Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/tabs/career-pathways/responsible-ai-safety-governance-specialist.webp',
            width: 354,
            height: 193,
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
            desc: 'Think, represent, compute, and make.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-1/semester-1/1.webp',
            },
            portions: [
              {
                title: 'Design, Systems & Visualisation Studio I',
                text: 'This studio introduces design thinking, observation, problem framing, visualisation, and basic systems representation through hands-on iterative projects.',
              },
              {
                title: 'Engineering Mathematics I - Calculus & Linear Algebra',
                text: 'This course introduces differential and integral calculus, vectors, matrices, systems of linear equations, and basic linear transformations as a working mathematical toolkit.',
              },
              {
                title: 'Physics of Engineered Systems',
                text: 'This course introduces mechanics, electricity, magnetism, energy, and basic physical principles underlying sensors, actuators, electromechanical devices, and the hardware intelligent systems run on.',
              },
              {
                title: 'Computational Thinking & Programming I',
                text: 'This course introduces programming fundamentals and computational thinking using Python. Students learn algorithmic problem-solving, control structures, functions, data structures, and file handling.',
              },
              {
                title: 'Making & Prototyping Lab I',
                text: 'This hands-on lab introduces physical and digital prototyping through materials, hand tools, basic fabrication, digital 3D modelling, rapid prototyping, and basic electronics.',
              },
              {
                title: 'Communication for Technology & Design',
                text: 'This course develops written, oral, visual, and professional communication for engineering and design contexts.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 2',
            desc: 'From concept to evidence and intelligent response.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-1/semester-2/1.webp',
            },
            portions: [
              {
                title: 'Design, Systems & Human-Centred Studio II',
                text: 'This studio builds on Semester 1 by moving from problem framing to evidence-led intervention.',
              },
              {
                title: 'Engineering Mathematics II - Probability, Statistics & Modelling',
                text: 'This course introduces probability, statistics, uncertainty, basic differential-equation reasoning, and mathematical modelling for data-driven and engineering contexts.',
              },
              {
                title: 'Computational Thinking & Programming II',
                text: 'This course builds on Programming I through object-oriented programming, core data structures, file and data handling, modular software design, and documentation standards.',
              },
              {
                title: 'Electronics, Sensors & Intelligent Systems',
                text: 'This course introduces basic electronic circuits, analog and digital concepts, sensors, actuators, microcontroller-level interaction, and the role of electronics in intelligent physical systems.',
              },
              {
                title: 'Data, AI & Emerging Technology Foundations',
                text: 'This course provides a programme-neutral introduction to data and artificial intelligence.',
              },
              {
                title: 'Materials Science & Engineering',
                text: 'This course introduces the science of engineering materials - metals, alloys, polymers, composites, ceramics, and semiconductors - with emphasis on the relationship between material structure, properties, processing, and engineering performance.',
              },
              {
                title: 'Technology, Society & Sustainability',
                text: 'This course integrates professional values, environmental responsibility, sustainability, and societal impact in technology and engineering practice.',
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
            desc: 'From code to systems, with design as the integration discipline.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-2/semester-3/1.webp',
            },
            portions: [
              {
                title: 'Data Structures & Algorithms',
                text: 'This course introduces fundamental data structures and algorithms underpinning efficient software and AI systems: arrays, linked lists, stacks, queues, trees, graphs, hashing, sorting, and searching.',
              },
              {
                title: 'Software Engineering with AI-Assisted Development',
                text: 'This course covers software engineering principles and system design for reliable, scalable systems: requirements analysis, architecture, version control, testing, and documentation.',
              },
              {
                title: 'Linear Models & Optimisation for AI',
                text: 'This course introduces linear models and optimisation techniques used in machine learning: linear regression, classification, least squares, gradient-based optimisation, and constrained optimisation.',
              },
              {
                title: 'Narrative & Content Design for AI Systems',
                text: 'This is a mandatory core course, not an elective. It teaches the craft of writing and structuring the content an AI system uses to explain itself to a real person.',
              },
              {
                title: 'Design Studio - Designing Intelligent Systems',
                text: 'This studio focuses on the design of intelligent systems combining computation, data, and human needs.',
              },
              {
                title: 'Open Elective I',
                text: 'This elective allows students to explore a topic of their choosing outside the core curriculum.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'The first real machine learning, designed as something a person can actually use.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-2/semester-4/1.webp',
            },
            portions: [
              {
                title: 'Machine Learning I',
                text: 'This course introduces foundational machine learning concepts and algorithms: supervised and unsupervised learning, regression, classification, clustering, feature engineering, model evaluation, and overfitting.',
              },
              {
                title: 'Human–Computer Interaction for AI Systems',
                text: 'This course examines principles and practices of human-computer interaction for AI-driven systems: interaction models, usability engineering, accessibility, interface evaluation, and user-centred design.',
              },
              {
                title: 'Data Engineering & Pipelines',
                text: 'This course introduces data engineering concepts for building scalable data pipelines for AI systems: data ingestion, preprocessing, storage, transformation, and basic workflow orchestration.',
              },
              {
                title: 'Visual & Motion Design for AI Interfaces',
                text: 'This is a mandatory core course, not an elective. It covers visual and motion design specifically for interfaces whose behaviour is probabilistic.',
              },
              {
                title: 'Design Studio - Human–AI Interaction & UX',
                text: 'This studio focuses on designing meaningful interactions between humans and AI-driven systems, exploring explainability, trust, feedback, and transparency.',
              },
              {
                title: 'Open Elective II',
                text: 'This elective allows students to continue exploring a topic of their choosing outside the core curriculum.',
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
            desc: 'Going deep on models, while the studio stays in charge.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-3/semester-5/1.webp',
            },
            portions: [
              {
                title: 'Machine Learning II - Advanced Methods',
                text: 'This course builds on foundational machine learning, introducing advanced methods used in real-world AI systems: ensemble learning, kernel methods, dimensionality reduction, probabilistic models, and model selection.',
              },
              {
                title: 'Deep Learning',
                text: 'This course introduces deep learning architectures and techniques powering modern AI applications: neural networks, backpropagation, convolutional and recurrent networks, transformers, and training strategies.',
              },
              {
                title: 'AI Systems Engineering & MLOps',
                text: 'This course focuses on engineering practices for building, deploying, and maintaining AI systems at scale: model versioning, data pipelines, continuous integration for ML, monitoring, and lifecycle management.',
              },
              {
                title: 'Responsible, Explainable & Ethical AI',
                text: 'This course examines ethical, social, and regulatory considerations in AI design and deployment: bias, fairness, transparency, explainability, accountability, and governance frameworks.',
              },
              {
                title: 'Applied AI Design Studio',
                text: 'This studio is the anchor course of the semester - the heaviest credit load - applying advanced AI techniques to real-world, human-centred problems under design leadership.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Making AI work at scale - and proving the design holds up.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Natural Language Processing or Computer Vision',
                text: 'This course introduces one major AI application domain - NLP or Computer Vision. Students study domain-specific representations, models, and evaluation techniques, applying deep learning methods to real-world datasets.',
              },
              {
                title: 'AI Product Management & Systems Thinking',
                text: 'This course introduces product management and systems thinking for AI-driven products: problem discovery, requirement definition, stakeholder analysis, system boundaries, and lifecycle considerations.',
              },
              {
                title: 'AI Evaluation, Testing & Validation',
                text: 'This course focuses on evaluating, testing, and validating AI systems beyond accuracy metrics: robustness testing, bias assessment, stress testing, monitoring, and post-deployment evaluation.',
              },
              {
                title: 'Advanced AI Studio - Systems Integration',
                text: 'This studio is the anchor course of the semester - again the heaviest credit load in the term - emphasising end-to-end integration of AI systems, combining data pipelines, models, interfaces, and deployment considerations.',
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
            desc: 'Owning a real AI system in a real organisation.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Industry Internship (AI & Data Systems)',
                text: 'This internship provides immersive, supervised exposure to professional environments where AI, data engineering, or intelligent software systems are developed and deployed.',
              },
              {
                title: 'Capstone Preparation Studio - AI Systems',
                text: 'This studio prepares students for the capstone through structured problem identification, data assessment, system scoping, and solution conceptualisation.',
              },
              {
                title: 'Track Elective III (Creative & Communication AI Systems)',
                text: '▸ 6 Track Options',
              },
              {
                title: 'Track Elective IV (Creative & Communication AI Systems)',
                text: '▸ 6 Track Options',
              },
              {
                title: 'Professional Practice - AI Leadership & Portfolio',
                text: 'This course focuses on professional readiness for AI engineers and designers: developing technical portfolios, documenting projects, and building leadership, ethics, collaboration, and career-preparation skills.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 8',
            desc: 'Shipping a complete, defensible AI system.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/btech/ai-integrated-design/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/btech/ai-integrated-design/curriculum/benchmarked-curriculum/year-4/semester-8/1.webp',
            },
            portions: [
              {
                title: 'Industry Capstone Project - AI Systems',
                text: 'This capstone is the culminating industry-engaged project of the program. Students work individually or in small teams within an industry, startup, research lab, or approved innovation setting.',
              },
              {
                title: 'Capstone Review & Technical Defense',
                text: 'This course provides the structured academic framework for periodic review, technical evaluation, and final defense of the capstone project.',
              },
              {
                title: 'AI Deployment, MLOps & Monitoring (Applied Module)',
                text: 'This applied module supports capstone execution by reinforcing best practices for AI deployment, monitoring, and lifecycle management.',
              },
              {
                title: 'Professional Ethics, IP & Compliance (Applied Module)',
                text: 'This applied module addresses professional, legal, and ethical responsibilities in AI system development and deployment: intellectual property, data protection, regulatory compliance, contracts, and responsible innovation.',
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
