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
export const isdiBdesAnimationProgram = {
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
      text: 'This program empowers students to create stunning digital animation and visual effects for entertainment, gaming, and immersive media. Students explore character design, 3D modeling, AR/VR environments, VFX, and procedural animation using AI and advanced software tools. Hands-on projects, industry collaborations, and live experiences develop technical expertise, storytelling, and creative problem-solving. Graduates are prepared for careers as character animators, 3D asset designers, VFX specialists, game animators, XR/mixed reality creators, and AI-assisted animation designers, emerging as future-ready professionals shaping the global animation and entertainment industries.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Classical Animation\nArts',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/classical-animation-arts-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/classical-animation-arts-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/classical-animation-arts/1.webp',
          },
        },
        {
          title: 'Stop Motion Studio\nPractice',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/stop-motion-studio-practice-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/stop-motion-studio-practice-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/stop-motion-studio-practice/1.png',
          },
        },
        {
          title: 'Digital Craft & Visual\nWorlds',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/digital-craft-visual-worlds-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/digital-craft-visual-worlds-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/digital-craft-visual-worlds/1.webp',
          },
        },
        {
          title: 'Narrative & Story\nArchitecture',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/narrative-story-architecture-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/narrative-story-architecture-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/narrative-story-architecture/1.webp',
          },
        },
        {
          title: 'AI-Driven Creative\nTechnologies',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/ai-driven-creative-technologies-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/ai-driven-creative-technologies-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/ai-driven-creative-technologies/1.webp',
          },
        },
        {
          title: 'Immersive & Interactive Media',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/immersive-interactive-media-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/immersive-interactive-media-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/immersive-interactive-media/1.webp',
          },
        },
        {
          title: 'Professional Animation Pipeline',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/professional-animation-pipeline-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/professional-animation-pipeline-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/curriculum-highlights/professional-animation-pipeline/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Character & AR/VR Animator',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: '3D Modeller & Asset Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Game & Interactive Environment Animator',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-3.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'VFX & Compositing Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-4.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'AI & Procedural Animation Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'XR / Mixed Reality Animator',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/vfx-cp-6.webp',
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
          title: 'Riddhesh Adarkar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-001.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Indraneel\nShelar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-012.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Agnijit\nTarafdar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-010.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rushikesh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-011.png',
            width: 259,
            height: 260,
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
          title: 'Omkar Mahashabde',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-007.png',
            width: 232,
            height: 232,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jayesh\nPanchal',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-008.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jay\nMehta',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-009.png',
            width: 255,
            height: 255,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rajendra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-003.png',
            width: 261,
            height: 261,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ravi\nRao',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-004.png',
            width: 269,
            height: 286,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Arpita Chikodikar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-005.webp',
            width: 269,
            height: 281,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Shantanu\nMishra',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/tabs/faculty-vfx-006.png',
            width: 257,
            height: 257,
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
          name: 'Bhadar Rangani',
          role: 'Junior Designer',
          logo: {
            src: '/assets/images/industry/projects/mondelez.png',
            width: 97,
            height: 37,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Geetika Sukhani',
          role: 'Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/bb.png',
            width: 64,
            height: 62,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-2.webp',
            width: 275,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Esha Shenoy',
          role: 'Inclusive Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/vsesh.png',
            width: 64,
            height: 36,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-3.png',
            width: 279,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Purvi Patni',
          role: 'Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/ankurandservesh.png',
            width: 140,
            height: 64,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-4.png',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Smruti Patel',
          role: 'Materials Librarian',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/foster-partner.png',
            width: 68,
            height: 36,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Alefiya Lakdawala',
          role: 'Interior Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/loop.png',
            width: 35,
            height: 35,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/success/id-ss-6.webp',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-1/semester-1/1.webp',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-1/semester-2/1.png',
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
            desc: 'Explore animation, storytelling, and visual expression. Apply concepts using digital tools, software, and emerging technologies.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-2/semester-3/1.png',
            },
            portions: [
              {
                title: 'Animation Film Studies',
                text: 'Explores animation’s narrative, social, and political dimensions, enabling students to critically analyze film and media for informed creative storytelling.',
              },
              {
                title: 'Introduction to Animation',
                text: 'Teaches illustration, storyboarding, and character design techniques, guiding students to plan and structure compelling animation narratives effectively.',
              },
              {
                title: 'Drawing for Animation',
                text: 'Develops foundational drawing and sculpting skills, enhancing students’ ability to create detailed, expressive, and production-ready animation assets.',
              },
              {
                title: 'Story and Narratives',
                text: 'Builds skills in screenwriting, character arcs, and visual composition, allowing students to craft coherent and captivating animation narratives.',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-2/semester-4/1.png',
            },
            portions: [
              {
                title: 'Advanced Animation',
                text: 'An extension of Introduction to Animation, this course explores advanced principles of motion, character performance, and storytelling. Students refine their technical and creative skills to produce expressive, high-quality animations across digital platforms.',
              },
              {
                title: '3D Sculpting',
                text: 'This course teaches digital sculpting techniques to create detailed 3D forms using industry tools, focusing on form, anatomy, and surface detail for animation and visualization.',
              },
              {
                title: 'Visual Development',
                text: 'Develops expressive characters through design, psychology, and storytelling exercises, enabling students to create compelling, relatable personalities for animation.',
              },
              {
                title: 'Storyboard and Animatics',
                text: 'Builds storytelling skills by guiding students through storyboard composition and animatic development, planning narrative flow a visual pacing effectively.',
              },
              {
                title: 'Modeling Studio',
                text: 'Teaches Maya 3D modeling for creating animation-ready characters and environments, emphasizing accuracy, topology, and production-ready asset creation.',
              },
              {
                title: 'Surfacing',
                text: 'Develops surfacing skills using digital tools, enabling students to texture characters and environments with realism and artistic expression.',
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
                title: 'Story-Centric Learning',
                text: 'Emphasizes narrative building, character psychology, and visual storytelling to create emotionally engaging animations.',
              },
              {
                title: 'Comprehensive Production Training',
                text: 'Covers every stage of animation—from drawing and storyboarding to 3D modeling',
              },
              {
                title: 'Industry & Research Integration',
                text: 'Combines film studies, critical analysis, and real-world exposure to develop industry-ready storytellers.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Technique-Focused',
                text: 'Center largely on software and execution with limited storytelling emphasis.',
              },
              {
                title: 'Fragmented Skill Development',
                text: 'Teach separate animation stages without connecting conceptual and production aspects.',
              },
              {
                title: 'Minimal Contextual Learning',
                text: 'Often overlook research, film theory, and cultural understanding in creative practice.',
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
            desc: 'Integrate animation, VFX, and immersive media in larger projects. Build experimentation and innovation skills using emerging technologies.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-3/semester-5/1.png',
            },
            portions: [
              {
                title: '3D Animation and Rigging',
                text: 'Builds skills in rigging and procedural animation, enabling dynamic, realistic movement for 3D characters and objects in animation and VFX projects.',
              },
              {
                title: 'Concept art',
                text: 'Develops immersive 3D environments using concept art and narrative-driven design, creating visually compelling and contextually rich spaces for animation and VFX.',
              },
              {
                title: 'Surfacing 2',
                text: 'Builds students’ 3D mEnhances surfacing skills, applying complex shaders and detailed textures to characters and environments for realistic, production-ready animation and visual effects.odeling skills using Rhino and Keyshot software, enhancing their ability to visualize, refine, and integrate complex design concepts with realistic renderings.',
              },
              {
                title: '3D Lighting',
                text: 'Teaches lighting and texturing techniques to enhance realism, mood, and atmosphere in 3D scenes for animation and VFX.',
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
            desc: 'Push creative and technical boundaries with complex projects. Develop future-ready skills in immersive storytelling and AI-assisted production.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Character Animation',
                text: 'Develops expressive character animation by combining acting techniques and psychological understanding, enabling students to create believable, emotionally engaging, and nuanced animated performances.',
              },
              {
                title: 'Collaborative Project',
                text: 'Builds teamwork and collaboration skills through cross-disciplinary project development, preparing students for professional studio environments.',
              },
              {
                title: 'Production management',
                text: 'Introduction to the Complete pipeline of Animation film making process. - divided into 2D and 3D animation - where students get mentors to help them execute the project from 2D and 3D domain.',
              },
              {
                title: 'Immersive Storytelling - Unreal Engine',
                text: 'Teaches creation of interactive VR experiences, emphasizing storytelling, user engagement, and optimized asset development for immersive environments.',
              },
              {
                title: 'VFX Production',
                text: 'Teaches creation of interactive VR experiences, emphasizing storytelling, user engagement, and optimized asset development foGuides students through complete VFX workflows, teaching professional tools, techniques, and project management for high-quality visual effects productionr immersive environments.',
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
                title: 'Advanced Production Mastery',
                text: 'Covers the full 3D and VFX pipeline with hands-on studio collaboration.',
              },
              {
                title: 'Expressive Storytelling',
                text: 'Merges character acting, psychology, and concept art for immersive worlds.',
              },
              {
                title: 'Future-Ready Technology',
                text: 'Integrates VR, Unreal Engine, and real-time workflows for innovative storytelling.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Tool-Focused Learning',
                text: 'Emphasize software skills without interdisciplinary depth.',
              },
              {
                title: 'Limited Character Development',
                text: 'Prioritize motion over emotional storytelling.',
              },
              {
                title: 'Outdated Techniques',
                text: 'Lack exposure to new technologies and immersive media.',
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
            desc: 'Engage in industry collaborations and live projects. Refine portfolio, professional skills, and technology-enabled project execution.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Graduation Project Pre Production / Industry Capstone',
                text: 'Develops narrative, scriptwriting, and storyboard skills, guiding students to plan and structure a cohesive, professional-quality final animation or VFX project.',
              },
              {
                title: 'Professional Practice and Portfolio Development',
                text: 'Builds professional skills through portfolio creation, collaboration, and workplace practices, preparing students for industry entry and career opportunities in animation and VFX.',
              },
              {
                title: 'Industry Internship',
                text: 'Students gain real-world experience by working with design studios or industry partners, applying their skills to professional projects and building industry readiness.',
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
            desc: 'Showcase mastery in a final animation or VFX project. Demonstrate creativity, technical expertise, and readiness for global, tech-driven opportunities.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/animation-vfx-gaming/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/animation-vfx-gaming/curriculum/benchmarked-curriculum/year-4/semester-8/1.png',
            },
            portions: [
              {
                title: 'Final Project Production Process',
                text: 'Applies full production workflows to complete capstone animation and VFX projects, integrating technical, creative, and collaborative skills for professional-quality outcomes.',
              },
              {
                title: 'Final Project Post Production',
                text: 'Teaches compositing, sound design, and finishing techniques, polishing final projects to achieve cinematic quality and cohesive storytelling.',
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
                title: 'Capstone & Ethical Practice',
                text: 'Concludes with self-driven projects emphasizing research, professionalism, and responsible design ethics.',
              },
              {
                title: 'Specialized & Future-Focused Learning',
                text: 'Offers advanced pathways in animation for additional proficiency',
              },
              {
                title: 'Human–Tech Fusion',
                text: 'Integrates ergonomics, coding, and electronics for smart, user-focused design solutions.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Weak Ethical Integration',
                text: 'Address professional ethics superficially, without linking them to real-world design practice.',
              },
              {
                title: 'Limited Specialization Options',
                text: 'Often provide generic final-year projects without advanced focus areas.',
              },
              {
                title: 'Basic Technical Training',
                text: 'Rarely combine coding, ergonomics, or smart product design.',
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
