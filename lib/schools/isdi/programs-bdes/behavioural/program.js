/*
 * The programme tab set and the curriculum — behavioural-design-&-ai.php. Five `.rounded-tabs-mint`
 * panes (Overview text, Curriculum Highlights video cards, Career Pathways and Faculty image cards,
 * Success Stories `.card-type-d` people), then "Our Globally Benchmarked Curriculum": four year tabs,
 * each with its two semesters (desc, clip, course portions and the ATLAS-Elective dropdown) and the
 * two-panel per-year comparison card. Semester / curriculum-highlights posters are soft-404s on
 * production, so the clips ship without one (exactly as the reference paints them).
 */
export const isdiBdesBehaviouralProgram = {
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
      text: 'The B.Des. in Behavioural Design & AI prepares students to design products, services, and experiences that understand, work with, and responsibly shape how people think, feel, and act. The program runs two parallel studio disciplines every semester from Year 2 - a Behavioural Design Studio and an AI Design Studio - treating both as equally central to a graduate\'s professional identity. Students apply evidence about real human behaviour to design decisions, and direct AI tools with the creative and ethical judgment that distinguishes a designer from a tool operator. From foundational psychology and cognitive bias in Year 2, through applied research with real external partners in Year 3, to an independently authored dual-studio Capstone in Year 4, graduates leave equipped to hold both identities - behavioural designer and AI designer - simultaneously, and to exercise real power over human minds responsibly.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Dual Studio Spine',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/dual-studio-spine/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/dual-studio-spine/1.webm',
                type: 'video/webm',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/dual-studio-spine/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/dual-studio-spine/1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Applied Behavioural Research Lab',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/applied-behavioural-research-lab/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/applied-behavioural-research-lab/1.webm',
                type: 'video/webm',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/applied-behavioural-research-lab/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/applied-behavioural-research-lab/1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Agentic AI & Conversational Interface Design',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/agentic-ai-&-conversational-interface-design/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/agentic-ai-&-conversational-interface-design/1.webm',
                type: 'video/webm',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/agentic-ai-&-conversational-interface-design/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/agentic-ai-&-conversational-interface-design/1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Designing for Trust, Safety & Privacy',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/designing-for-trust-safety-&-privacy/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/designing-for-trust-safety-&-privacy/1.webm',
                type: 'video/webm',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/designing-for-trust-safety-&-privacy/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/designing-for-trust-safety-&-privacy/1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
        {
          title: 'Speculative & Anticipatory Design',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/speculative-&-anticipatory-design/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/speculative-&-anticipatory-design/1.webm',
                type: 'video/webm',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/speculative-&-anticipatory-design/1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/curriculum-highlights/speculative-&-anticipatory-design/1.webm',
                type: 'video/webm',
              },
            ],
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'AI Product Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/career-pathways/ai-product-designer.webp',
            width: 354,
            height: 193,
            alt: '',
          },
          video: null,
        },
        {
          title: 'UX Researcher (Behavioural Specialist)',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/career-pathways/ux-researcher-behavioural-specialist.webp',
            width: 354,
            height: 193,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Nudge Unit / Behavioural Insights Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/career-pathways/nudge-unit-behavioural-insights-designer.webp',
            width: 354,
            height: 193,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Responsible AI & Ethical Design Consultant',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/career-pathways/responsible-ai-&-ethical-design-consultant.webp',
            width: 354,
            height: 193,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Behaviour Change Strategist / Venture Founder',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/career-pathways/behaviour-change-strategist-venture-founder.webp',
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
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/cdn/68dd576fbbda3c82cf9422ba-career-20pathway-20-20card.webp',
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
            src: '/assets/images/schools/isdi/programs/b-des/behavioural-design-ai/cdn/68ece6907c5393c876785378-bdes-faculty-20-10-.webp',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aashi-lath.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aastha-malhotra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/abha-mehra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/akanksha-srivastav.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ananya-gupta.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/aveera-juss.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ayushi-jhaveri.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/chiraj-rajdeo.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/dhruvi-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/ishani-kulkarni.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/jena-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/shreya-shivakumar.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/vadanya-shrotriya.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/success/success-stories/student/vani-chandra.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
          video: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-1/semester-1/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-1/semester-1/1.webm',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-1/semester-2/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-1/semester-2/1.webm',
                  type: 'video/webm',
                },
              ],
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
            desc: 'See the behaviour before you design the change. Understand the AI before you direct it.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-2/semester-3/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-2/semester-3/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Behavioural Design Studio I: Human Behaviour & Motivation',
                text: 'This studio establishes the foundational discipline of the program: start from what people actually do, not what you assume they want or intend.',
              },
              {
                title: 'AI Design Studio I: AI as a Design Medium',
                text: 'This studio introduces AI not as a subject to study but as a medium to work in.',
              },
              {
                title: 'Foundations of Behavioural Design',
                text: 'This course provides the intellectual foundations of behavioural design as a discipline: where it comes from, what its core claims are, what evidence they rest on, and what it means to design from a behavioural rather than a purely aesthetic or functional standpoint.',
              },
              {
                title: 'Psychology of Behaviour & Decision-Making',
                text: 'This course introduces the psychological principles that explain why people do what they do: dual-process theory (System 1 and System 2 thinking), perception and attention, memory and learning, motivation and goal pursuit, emotion and its influence on judgment, and the social and environmental forces that...',
              },
              {
                title: 'Behavioural Research Methods: Qualitative & Quantitative',
                text: 'This course builds the research toolkit that a behavioural designer uses to investigate why people behave the way they do and whether an intervention is actually changing that behaviour.',
              },
              {
                title: 'Cognitive Biases, Mental Models & Heuristics',
                text: 'This course provides a rigorous, evidence-grounded introduction to the cognitive biases and mental shortcuts that systematically shape human judgment and decision-making.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 4',
            desc: 'Apply the science to the design.Direct the AI with intent.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-2/semester-4/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-2/semester-4/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Behavioural Design Studio II: Nudge Design & Habit Formation',
                text: 'This studio makes the move from observation to intervention. Students take a genuine behavioural gap - documented in their own fieldwork - and design a testable intervention using specific behavioural mechanisms: defaults, commitment devices, social norms, friction reduction, feedback loops, or habit formation cues.',
              },
              {
                title: 'AI Design Studio II: Generative AI for Design Practice',
                text: 'This studio develops AI-directed design practice from individual tool use toward a coherent generative design workflow.',
              },
              {
                title: 'Social & Cultural Influences on Behaviour',
                text: 'This course examines how the social and cultural environments people live within shape their behaviour, often more powerfully than individual psychology.',
              },
              {
                title: 'Behavioural Design Ethics: Influence, Autonomy & Responsibility',
                text: 'This course is mandatory and treated as foundational. Behavioural designers work at the boundary between helping people and manipulating them, and this course establishes the ethical framework the program expects students to apply consistently from this semester forward.',
              },
              {
                title: 'Interaction Design for Behaviour Change',
                text: 'This course develops the craft skills of interaction design specifically as a vehicle for behaviour change: how information architecture, micro-interactions, friction design, feedback loops, progress indicators, reminders and cues, and commitment devices can be designed to support long-term behavioural goals rather than just immediate task...',
              },
              {
                title: 'AI Literacy for Designers: Tools, Systems & Critical Evaluation',
                text: 'This course builds the AI literacy that a designer needs to work credibly with AI-mediated products, evaluate claims about AI capabilities, and make responsible decisions about when and how to use AI in design practice.',
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
            desc: 'Designing behaviour in digital products, AI systems, and at scale.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-3/semester-5/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-3/semester-5/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Behavioural Design Studio III: Digital Products, Habits & Trust',
                text: 'This studio focuses on the design of digital products that work with human behaviour over time - building habits, sustaining engagement ethically, and earning trust rather than exploiting attention.',
              },
              {
                title: 'AI Design Studio III: Personalisation, Recommendation & Intelligent Interfaces',
                text: 'This studio engages with the design of AI-mediated product experiences: recommendation systems, personalised content feeds, adaptive interfaces, and the algorithmic choices that determine what people see and are offered.',
              },
              {
                title: 'Behaviour Change Frameworks & Strategies',
                text: 'This course provides a rigorous, comparative review of the major behaviour change frameworks used in design practice.',
              },
              {
                title: 'Designing for Trust, Safety & Privacy',
                text: 'This course examines trust, safety, and privacy as design responsibilities rather than compliance requirements.',
              },
              {
                title: 'Applied Statistics & Behavioural Data Analysis',
                text: 'This course develops working analytical competence in the methods behavioural designers use to measure, test, and evaluate their interventions.',
              },
              {
                title: 'Speculative & Critical Design for Behaviour',
                text: 'This course introduces speculative and critical design as methods for questioning the assumptions that behavioural design practice takes for granted.',
              },
            ],
            dropdowns: [],
          },
          {
            title: 'Semester 6',
            desc: 'Original research, public systems, and real external briefs.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-3/semester-6/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-3/semester-6/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Behavioural Design Studio IV: Public Systems, Health & Civic Behaviour',
                text: 'This studio extends behavioural design into the public domain: health systems, civic participation, environmental behaviour, financial decision-making, and institutional contexts where people have less choice about the system they interact with.',
              },
              {
                title: 'AI Design Studio IV: Agentic AI, Conversational Interfaces & Future Behaviours',
                text: 'This studio engages with the design frontier of agentic AI: systems that take sequences of actions on behalf of users over time, make decisions with real consequences, and interact through natural language.',
              },
              {
                title: 'Design for Public Good: Health, Policy & Social Systems',
                text: 'This course applies behavioural design thinking to population-level challenges in health, public policy, and social change.',
              },
              {
                title: 'Designing Responsible AI Experiences',
                text: 'This course examines the design of AI systems and AI-mediated experiences from a responsibility perspective.',
              },
              {
                title: 'Applied Behavioural Research Lab',
                text: 'This lab is mandatory and is the most rigorous piece of individual academic work in the first three years of the program.',
              },
              {
                title: 'Industry-Responsive Design Project',
                text: 'This course provides the Year 3 industry engagement that sits alongside the Research Lab, working on a real brief from an industry, public-sector, or social enterprise partner.',
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
            desc: 'Advanced research studios, speculative futures, and Capstone preparation.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-4/semester-7/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-4/semester-7/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Advanced Behavioural Design Studio V: Complex Systems & Behaviour',
                text: 'This advanced studio engages students with behavioural design challenges at genuine complexity: multi-stakeholder systems and intervention challenges that sit at the intersection of design, public policy, and technology.',
              },
              {
                title: 'Advanced AI Design Studio V: Experimental AI Design Research',
                text: 'This advanced studio positions students as AI design researchers rather than AI design practitioners, engaging with emerging AI capabilities and experimental interaction paradigms.',
              },
              {
                title: 'Design Research Seminar: Behaviour, AI & Society',
                text: 'This seminar develops the theoretical and methodological foundations for the Capstone research.',
              },
              {
                title: 'Futures of Human Behaviour: Speculative & Anticipatory Design',
                text: 'This course uses speculative and anticipatory design methods to investigate the longer-term futures of human behaviour and behavioural design practice itself.',
              },
              {
                title: 'Capstone Preparation Lab: Research, Framing & Methods',
                text: 'This lab structures the development of the Capstone project in its critical early stages: articulating a research question, reviewing evidence, and selecting appropriate methodologies.',
              },
              {
                title: 'Professional Elective - Core Track',
                text: 'One course drawn from the Behavioural Design & AI Core Track, chosen in consultation with faculty to deepen the specialisation most relevant to the student\'s Capstone.',
              },
            ],
            dropdowns: [
              {
                title: '',
                items: [
                  {
                    title: 'Choice Architecture & Nudge Design',
                    text: '',
                  },
                  {
                    title: 'Behaviour Change Intervention Design',
                    text: '',
                  },
                  {
                    title: 'AI Ethics in Behavioural Design',
                    text: '',
                  },
                  {
                    title: 'Human-AI Interaction Design for Behaviour',
                    text: '',
                  },
                  {
                    title: 'Behavioural Experiment Design & Field Testing',
                    text: '',
                  },
                  {
                    title: 'Generative AI as Design Medium: Advanced Practice',
                    text: '',
                  },
                ],
              },
            ],
          },
          {
            title: 'Semester 8',
            desc: 'An independently authored behavioural design and AI project.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-4/semester-8/1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/behavioural-design-ai/benchmarked-curriculum/year-4/semester-8/1.webm',
                  type: 'video/webm',
                },
              ],
            },
            portions: [
              {
                title: 'Capstone Behavioural Design Studio',
                text: 'The Capstone Behavioural Design Studio supports the execution and development of the behavioural design dimension of the student\'s independently authored Capstone project.',
              },
              {
                title: 'Capstone AI Design Studio',
                text: 'The Capstone AI Design Studio supports the execution and development of the AI design dimension of the student\'s Capstone project.',
              },
              {
                title: 'Capstone Seminar: Design Thesis & Argumentation',
                text: 'The Capstone Seminar develops the written and argumentative dimension of the Capstone, documenting the research and design process.',
              },
              {
                title: 'Ethics, Responsibility & Design Leadership',
                text: 'This course brings the program\'s ethical commitments to their conclusion.',
              },
              {
                title: 'Professional Portfolio, Evaluation & Reflection',
                text: 'This is the culminating course of the program and the largest single credit-bearing outcome of the degree.',
              },
            ],
            dropdowns: [],
          },
        ],
        comparison: {
          heading: 'Why our Year 4 outpaces every\nother design\nschool?',
          headingTag: 'comp-header',
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
