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
export const isdiBdesProductProgram = {
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
      text: 'This program equips students to design products that combine creativity, usability, and emerging technologies. Explore materiality, interaction design, user experience, and sustainable solutions while working on hands-on projects and industry collaborations. With AI, digital tools, and tech-enabled experimentation at its core, graduates are prepared for careers as product designers, UX strategists, CMF specialists, and innovators who can shape the products and experiences of tomorrow.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Simple Mechanics & Moving Systems',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/simple-mechanics-moving-systems-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/simple-mechanics-moving-systems-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/simple-mechanics-moving-systems/1.png',
          },
        },
        {
          title: 'Physical Product Design',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/physical-product-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/physical-product-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/physical-product-design/1.webp',
          },
        },
        {
          title: 'Digital Product Design',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/digital-product-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/digital-product-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/digital-product-design/1.webp',
          },
        },
        {
          title: 'AI-Integrated Product Innovation',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/ai-integrated-product-innovation-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/ai-integrated-product-innovation-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/ai-integrated-product-innovation/1.webp',
          },
        },
        {
          title: 'IoT & Embedded Systems',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/iot-embedded-systems-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/iot-embedded-systems-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/iot-embedded-systems/1.webp',
          },
        },
        {
          title: 'Additive Manufacturing & 3D Printing',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/additive-manufacturing-3d-printing-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/additive-manufacturing-3d-printing-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/additive-manufacturing-3d-printing/1.webp',
          },
        },
        {
          title: 'Material Exploration & Fabrication Labs',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/material-exploration-fabrication-labs-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/material-exploration-fabrication-labs-1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Sustainable & Circular Product Systems',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/sustainable-circular-product-systems-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/product-design/sustainable-circular-product-systems-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/curriculum-highlights/sustainable-circular-product-systems/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Product & Industrial Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/cp-brand-and-communication-strategist.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'UX & Product Experience Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/communication-design-new-media/tabs/cp-2.webp',
            width: 269,
            height: 370,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Digital Product & Interaction Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/cp-revised.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Design Innovation Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-cp-revised-2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sustainable Product Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/cp-motion-graphics-artist-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'CMF (Color, Material & Finish) Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/cp-revised-3.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Experience Prototyper',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/cp-rev-5.webp',
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
          title: 'Vaibhav\nMohite',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/faculty/vaibhav-mohite.jpg',
            width: 500,
            height: 500,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Harsh\nMohanty',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/faculty/harsh-mohanty.jpg',
            width: 1200,
            height: 1600,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gourav\nKeswani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/faculty/gourav-keswani.jpg',
            width: 3648,
            height: 5472,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Harminder\nSingh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-f.png',
            width: 263,
            height: 267,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Dr Shreya\nMaulik',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-g.png',
            width: 256,
            height: 259,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Dr Peeyush Gupta',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-h.png',
            width: 276,
            height: 279,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sagar\nModh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-i.png',
            width: 257,
            height: 261,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sujeet\nKohok',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-j.png',
            width: 269,
            height: 280,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Dr Jyoti\nSaini',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-k.png',
            width: 266,
            height: 266,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Kushal\nJadhav',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-l.webp',
            width: 260,
            height: 260,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prakash Sonkamble',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-m.png',
            width: 267,
            height: 267,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Purushottam\nSawaran',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-n.png',
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
          title: 'Anupriya\nBose',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-p.png',
            width: 264,
            height: 267,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ashutosh Deshmukh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-q.png',
            width: 261,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gaurav\nShergill',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/pd-faculty-r.png',
            width: 258,
            height: 261,
            alt: '',
          },
          video: null,
        },
        {
          title: null,
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/tabs/image-111-4.png',
            width: 264,
            height: 264,
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
      ],
    },
    {
      kind: 'people',
      people: [
        {
          name: 'Tanvi Dalvi',
          role: 'Senior Consultant (UI/UX)',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/blue-hexagon-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/tanvi-dalvi.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Vidhi Jain',
          role: 'Product Developer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/parksons-cartamundi-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/vidhi-jain.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Vipasha Deo',
          role: 'UI/UX Designer Trainee',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/thyssenkrupp-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/vipasha-deo.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Aastha Kabra',
          role: 'Senior User Experience Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/red-v-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/aastha-kabra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Abhishek Dhake',
          role: 'User Experience Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/phillip-capital.jpg',
            width: 175,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/abhishek-dhake.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Aditya Arjugade',
          role: 'User Experience Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/godrej.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/aditya-arjugade.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Affan Umar',
          role: 'Communication Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/ikea.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/affan-umar.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Anurag Maheshwari',
          role: 'UI / UX Designer Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/house-u-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/anurag-maheshwari.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Ashlesha Desai',
          role: 'Strategy Consultant',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/ibm.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/ashlesha-desai.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jasmine Madhok',
          role: 'Key Account Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/district-by-edward.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/jasmine-madhok.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jehaana Tayaria',
          role: 'Executive Graphic deisgner and visual communicator for marketing',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/spykar.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/jehaana-tavaria.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jinam Dedhia',
          role: 'Product Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/shell-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/jinam-dedhia.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Kanam Lathia',
          role: 'Senior Executive - 3D Artist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/samsung.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/kanam-lathia.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Madhura Chalke',
          role: 'UX Specialist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/gradient-a-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/madhura-chalke.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Rajvi Parikh',
          role: 'Project Research Scientist 1',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/aiims-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/rajvi-parikh.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Riddhi Mehta',
          role: 'Marketing Design',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/cursor-ide-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/riddhi-mehta.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Rutvi Shah',
          role: 'UX Designer- Product Development',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/blue-s-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/rutvi-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Sahiti Agarwal',
          role: 'Lead UX Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/att-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/sahiti-agarwal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shaurya Mehta',
          role: 'Design Manager - UI/UX',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/schneider-electric.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/shaurya-mehta.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shrishti Sirsalewala',
          role: 'Product Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/s-star-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/shrishti-sirsalewala.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Srishti Deb',
          role: 'Manager - UI/UX Design',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/logo/vastrakala-fabric-designs.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/product-design/success/success-stories/student/srishti-deb.jpg',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-1-1.webm',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-2-1.webm',
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
            desc: 'Explore product concepts, materials, usability, and digital prototyping tools. Apply design thinking to small projects, integrating tech where relevant.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Product Design Studio 3 : Creative Process',
                text: 'Encourages exploration of form and meaning through sketching, mockups, copywriting, and prototypes, while promoting copyrighting and design registration for final submissions.',
              },
              {
                title: 'Product Prototyping : Concept to Creation',
                text: 'Teaches students safe and effective tool use while developing foundational making skills through hands-on modeling, material exploration, and iterative experimentation to build confidence and craftsmanship.',
              },
              {
                title: 'Process and Digital Representation',
                text: 'Develops students\' drawing abilities to effectively visualize and communicate design ideas, using a blend of traditional sketching methods and contemporary digital illustration techniques.',
              },
              {
                title: 'History of Product Design',
                text: 'Encourages students to critically examine historical design movements and their influence on contemporary practices, fostering a deeper understanding of design’s cultural, social, and aesthetic evolution over time.',
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
            desc: 'Translate concepts into engaging digital experiences. Projects strengthen design thinking, technical skills, and tech-enabled problem-solving.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Product Design Studio 4: Creative Process',
                text: 'Introduces product design fundamentals through empathy, creativity, and real-world problem-solving, encouraging design registration and patent filing for innovative ideas.',
              },
              {
                title: 'Material Fabrication Processes',
                text: 'Builds understanding of materials, safety, and sustainability through hands-on assignments that emphasize responsible use, environmental impact, and informed decision-making in product design and fabrication processes.',
              },
              {
                title: 'Digitalized Industrial Design',
                text: 'Teaches essential 2D and 3D CAD tools for digital sketching, modeling, rendering, and precise design control, enabling students to develop and communicate complex design concepts.',
              },
              {
                title: 'Introduction to Product Design Studies',
                text: 'Explores design ethics, influential manifestos, and the social impact of design through thoughtful discussion and critical reflection, encouraging responsible and meaningful creative practices among students.',
              },
              {
                title: 'Research and Development Methods',
                text: 'Equips students with essential research tools to uncover user insights and improve product experiences, while encouraging academic research and paper publishing.',
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
                title: 'Innovation & Intellectual Property Focus',
                text: 'Encourages copyrighting, design registration, and patent filing to protect student innovation.',
              },
              {
                title: 'Technology–Driven Practice',
                text: 'Integrates digital tools and prototyping, to bridge design and advanced manufacturing.',
              },
              {
                title: 'Research & Industry Integration',
                text: 'Emphasizes user research, academic publishing, and real-world product development for market-ready outcomes.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited IP Awareness',
                text: 'Seldom include copyrighting or patent processes in the curriculum.',
              },
              {
                title: 'Traditional Methods',
                text: 'Rely heavily on manual techniques with minimal exposure to digital or smart technologies.',
              },
              {
                title: 'Academic Focus Over Application',
                text: 'Prioritize theoretical learning over research-led, industry-relevant design practice.',
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
            desc: 'Develop complex products integrating aesthetics, usability, innovation, and tech-enabled solutions. Strengthen iterative and future-ready design skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Product Design Studio 5',
                text: 'Simulates real industry environments to teach students product planning, development processes, and new product delivery, preparing them for professional challenges and collaborative teamwork in the design field.',
              },
              {
                title: 'Human Factors, Ergonomics And Interfaces',
                text: 'Introduces cognitive ergonomics by engaging students in modeling and testing processes, fostering innovative product design that enhances usability, user comfort, and overall interaction efficiency.',
              },
              {
                title: 'Innovative Design Technology',
                text: 'Immerses students in designing and prototyping home appliances using electronics and coding, blending creativity with technical skills for careers in product design and engineering.',
              },
              {
                title: 'User Research',
                text: 'Equips students with skills to conduct ethnographic research, perform usability testing, and apply scientific analysis, fostering data-driven, user-centered approaches in product design and development.',
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
            desc: 'Push boundaries with advanced prototyping, AI-assisted ideation, and experimentation. Focus on sustainable and innovative solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/product-design/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Contextual Design',
                text: 'Trains students to design products deeply rooted in user context, behaviour, and real-world needs, ensuring solutions are practical, relevant, and effectively address everyday challenges.',
              },
              {
                title: 'Design for Production',
                text: 'Guides students to refine product ideas by emphasizing efficient manufacturing processes and sustainable practices, ensuring designs are both feasible to produce and environmentally responsible.',
              },
              {
                title: 'Digital Portfolio Design',
                text: 'Helps students build personal portfolios that showcase their unique design identity, skills, and strengths, effectively communicating their creative vision and professional capabilities to future opportunities.',
              },
              {
                title: 'End - User Experience Design',
                text: 'Introduces students to fundamental UX principles through hands-on digital product design and usability testing, fostering user-focused skills essential for creating intuitive and effective interfaces.',
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
                title: 'Industry-Ready Learning',
                text: 'Simulates real-world projects, preparing students for professional teamwork and product delivery.',
              },
              {
                title: 'Human–Tech Fusion',
                text: 'Integrates ergonomics, coding, and electronics for smart, user-focused design solutions.',
              },
              {
                title: 'Portfolio & Professional Growth',
                text: 'Develops strong digital portfolios that highlight design identity and technical skill.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Real-World Exposure',
                text: 'Offer minimal industry simulation or collaborative practice.',
              },
              {
                title: 'Basic Technical Training',
                text: 'Rarely combine coding, ergonomics, or smart product design.',
              },
              {
                title: 'Academic Over Professional Focus',
                text: 'Emphasize theory over portfolio or career readiness.',
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
            desc: 'Work on live projects and industry collaborations. Refine professional skills, teamwork, and technology-driven project execution.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Product Design Studio 7',
                text: 'Offers specializations in CMF and Data Visualization & Smart Products, focusing on designing intelligent, tech-driven, and visually refined solutions.',
              },
              {
                title: 'Digital Interaction Design',
                text: 'Teaches students to design human-centered digital and physical experiences, integrating UX research, HMI, and UI design.',
              },
              {
                title: 'Incubation & Entrepreneurship',
                text: 'Introduces entrepreneurship and incubation, helping students turn ideas into startups through expert guidance, practical exercises, and the Lean Canvas framework.',
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
            desc: 'Present a final product portfolio demonstrating innovation, creativity, and readiness to lead in a tech-enabled industry.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/product-design/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Product Design Studio 8 - Capstone (Explore)',
                text: 'Enables students to lead self-driven projects with personalized mentorship, applying comprehensive design knowledge and skills gained throughout their learning journey to create impactful solutions.',
              },
              {
                title: 'Product Design Studio 8 - Capstone (Execution)',
                text: 'Prepares students to navigate ethical challenges by exploring theory, analyzing case studies, and engaging in critical reflection to promote responsible and thoughtful design practices.',
              },
              {
                title: 'Research Writing and Capstone Documentation',
                text: 'Encourages students to undertake a self-led or industry project, synthesizing their learning into a cohesive final design vision that demonstrates creativity, skill, and professional readiness.',
              },
              {
                title: 'Professional Practice and Ethics',
                text: 'Prepares students to navigate ethical challenges by studying theory, analyzing real-world case studies, and engaging in reflection, fostering responsible and thoughtful decision-making in design practice.',
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
                title: 'Specialized & Future-Focused Learning',
                text: 'Offers advanced pathways in CMF and Smart Products, blending technology, aesthetics, and innovation.',
              },
              {
                title: 'Entrepreneurial Mindset',
                text: 'Integrates incubation and startup development, guiding students from concept to venture creation.',
              },
              {
                title: 'Capstone & Ethical Practice',
                text: 'Concludes with self-driven projects emphasizing research, professionalism, and responsible design ethics.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Specialization Options',
                text: 'Often provide generic final-year projects without advanced focus areas.',
              },
              {
                title: 'Minimal Entrepreneurial Exposure',
                text: 'Seldom include incubation or startup-based learning experiences.',
              },
              {
                title: 'Weak Ethical Integration',
                text: 'Address professional ethics superficially, without linking them to real-world design practice.',
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
