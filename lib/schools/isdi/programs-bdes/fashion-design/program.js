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
export const isdiBdesFashionDesignProgram = {
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
      text: 'This program equips students to lead in a rapidly evolving fashion industry by blending creativity, sustainability, and emerging technologies. Students explore garment design, styling, fashion production, and digital innovation while experimenting with smart wearables, AI-driven forecasting, and Metaverse-ready fashion experiences. Hands-on studios, industry collaborations, and live projects build future-ready skills in entrepreneurship, brand strategy, and sustainable design practices. Graduates are prepared for careers as fashion entrepreneurs, consultants, costume designers, sustainable fashion specialists, digital fashion innovators, and AI-driven forecasters, emerging as creative leaders shaping the fashion industry of tomorrow.',
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Technical\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/technical-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/technical-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/technical-design/1.webp',
          },
        },
        {
          title: 'Surface\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/surface-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/surface-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/surface-design/1.webp',
          },
        },
        {
          title: 'AI and\nFashion',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/ai-and-fashion-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/ai-and-fashion-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/ai-and-fashion/1.png',
          },
        },
        {
          title: 'Accessory\nDesign',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/accessory-design-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/accessory-design-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/accessory-design/1.webp',
          },
        },
        {
          title: 'Fashion\nBusiness',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/fashion-business-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/fashion-business-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/fashion-business/1.webp',
          },
        },
        {
          title: 'Sustainable\nFashion',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/sustainable-fashion-1.mp4',
                type: 'video/mp4',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/sustainable-fashion/1.webp',
          },
        },
        {
          title: 'Digital\nFashion',
          image: null,
          video: {
            sources: [
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/digital-fashion-1.mp4',
                type: 'video/mp4',
              },
              {
                src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/digital-fashion-1.webm',
                type: 'video/webm',
              },
            ],
            poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/curriculum-highlights/digital-fashion/1.webp',
          },
        },
      ],
    },
    {
      kind: 'cards',
      cards: [
        {
          title: 'Fashion Entrepreneur & Brand Founder',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cd-rev-1.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Consultant & Image Strategist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cd-rev-2.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Costume & Entertainment Fashion Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cd-rev-3.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Production, Supply Chain & Merchandising Specialist',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cd-rev-4.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sustainable & Circular Fashion Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cp-5.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Fashion Tech & Smart Wearables Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cp-6.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'AI Fashion Forecaster & Data Analyst',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cp-7.webp',
            width: 269,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Digital Fashion & Metaverse Designer',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-cp-8.webp',
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
          title: 'Program Director - Solange Suri',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-026.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Divya\nJaitly',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculty-rev-3.png',
            width: 204,
            height: 210,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Anwar\nKhan',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-002.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Heena Sachdeva',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-012.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gaura Srivastava',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-003.png',
            width: 263,
            height: 263,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ishita\nKulkarni',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-004.png',
            width: 285,
            height: 285,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Priti\nDoshi',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/image-111.png',
            width: 236,
            height: 257,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sakshma\nShetty',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/faculty-resvised-s-shetty.png',
            width: 332,
            height: 258,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prachi\nGarge',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-015.png',
            width: 294,
            height: 294,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Karishma\nGupta',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-016.png',
            width: 265,
            height: 265,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rucha Suryavanshi',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-005.png',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Harroop\nGrang',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-017.png',
            width: 280,
            height: 280,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Seema\nHiwrale',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-018.png',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prakshi\nJain',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-001.png',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Namrata Momaya',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-019.png',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Shivani\nSaraf',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-006.png',
            width: 278,
            height: 278,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Prunal\nKhawani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-020.png',
            width: 276,
            height: 276,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Karan\nBerry',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-021.png',
            width: 269,
            height: 269,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sulbha\nJagat',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-022.png',
            width: 276,
            height: 276,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Shirali\nTyabji',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-007.png',
            width: 276,
            height: 276,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Sonam\nParvani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-008.png',
            width: 274,
            height: 274,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Jaljit\nAjani',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-024.png',
            width: 296,
            height: 296,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Gavin\nRemedios',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-009.png',
            width: 293,
            height: 293,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Harshal Shanwar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-025.png',
            width: 301,
            height: 301,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Ekta\nGhosh',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-010.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Nikita\nSutar',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-028.png',
            width: 277,
            height: 277,
            alt: '',
          },
          video: null,
        },
        {
          title: 'Rashmi\nSathe',
          image: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/tabs/fd-faculties-2025-027.png',
            width: 277,
            height: 277,
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
          name: 'Ananya Agarwal',
          role: 'Senior Executive Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/firstcry-logo.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/ananya-agarwal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Dhrumi Shah',
          role: 'Fashion Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/faigum-shahab-peacock-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/dhrumi-shah.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Divya Makhija',
          role: 'Talent Development Executive',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/toi-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/divya-makhija.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Garima Grover',
          role: 'Production Merchandiser',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/faigum-shahab-peacock-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/garima-grover.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Hirina Moolchandani',
          role: 'Visual Merchandiser',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/h-and-m-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/hirina-moolchandani.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Jahnavi Kothari',
          role: 'Sr. Associate Fashion Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/ghost-icon.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/jahnavi-kothari.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Lavanya Gulati',
          role: 'Senior Marketing Communications Executive',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/nykaa-logo.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/lavanya-gulati.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Nidhi Chavan',
          role: 'BESTSELLERBESTSELLER1 yr 1 mo1 yr 1 moMumbai, Maharashtra, India · On-siteMumbai, Maharashtra, India · On-site',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/bestseller.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/nidhi-chavan.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Niharika Aggarwal',
          role: 'General Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/golden-letter-m.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/niharika-aggarwal.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Rakshada Shaikh',
          role: 'Digital Strategist',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/magnanimous-group.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/rakshada-shaikh.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Roshani Sahu',
          role: 'Product Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/info-icon.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/roshani-sahu.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Rugved Deshpande',
          role: 'Senior Experience Designer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/tata-elxsi-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/rugved-deshpande.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Rutvi Patel',
          role: 'UX Designer- Product Development',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/the-pant-project.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/rutvi-patel.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Sakina Adamji',
          role: 'Graphic & Apparel',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/superkicks-logo.jpg',
            width: 104,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/sakina-adamji.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Shrushti Jadhav',
          role: 'Buyer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/inditex-logo.jpg',
            width: 175,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/shrushti-jadhav.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Simran Khabrani',
          role: 'Assistant Manager',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/cover-story.jpg',
            width: 175,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/simran-khabrani.jpg',
            width: 269,
            height: 285,
            alt: '',
          },
        },
        {
          name: 'Vidhi Dhanuka',
          role: 'Product Developer',
          logo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/logo/jade-logo.jpg',
            width: 50,
            height: 50,
            alt: '',
          },
          photo: {
            src: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/success/success-stories/student/vidhi-dhanuka.jpg',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-1-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-1-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-1/semester-1/1.webp',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-2-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-2-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-1/semester-2/1.webp',
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
            desc: 'Explore garments, materials, and creative concepts. Apply foundational skills enhanced by digital design tools and emerging tech.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-3-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-3-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-2/semester-3/1.png',
            },
            portions: [
              {
                title: 'Fashion Design Studio 3: Creative Process',
                text: 'Introduces textile fundamentals, research methodologies, and collaborative practices, enabling students to develop innovative fashion design concepts through experimentation, creative exploration, and structured design processes.',
              },
              {
                title: 'Fashion Technical Studio 1',
                text: 'Builds essential garment-making skills, including pattern making, draping, and sewing techniques, allowing students to translate fashion concepts into accurately constructed, wearable designs.',
              },
              {
                title: 'Fashion Drawing Studio',
                text: 'Develops fashion illustration skills by emphasizing figure drawing, rendering, and personal style, enabling students to communicate design ideas visually with precision and creativity.',
              },
              {
                title: 'Introduction to Fashion History',
                text: 'Explores modern fashion history from couture to ready-to-wear, examining cultural, social, and economic influences on fashion evolution and contemporary design practices.',
              },
              {
                title: 'Textile History of India',
                text: 'Studies India’s rich textile heritage, historical trade routes, and foundational textile terminology, fostering an understanding of cultural context, traditional techniques, and design inspiration.',
              },
              {
                title: 'Form and Material Studies',
                text: 'Teaches accessory and product design through material experimentation, 3D form exploration, and innovative prototyping, encouraging tactile, aesthetic, and functional understanding of design objects.',
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
            desc: 'Translate ideas into wearable designs. Strengthen construction, styling, and experimentation skills using tech-assisted techniques.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-4-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-4-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-2/semester-4/1.png',
            },
            portions: [
              {
                title: 'Fashion Technical Lab 2',
                text: 'Advances garment-making skills through hands-on making and exploration of technical concepts, enhancing technical proficiency, precision and creativity in executing creative fashion concepts.',
              },
              {
                title: 'Textile Print Design',
                text: 'Teaches innovative textile print techniques, enabling students to create visually appealing, market-relevant patterns and prints for fashion applications with practical experimentation and design thinking.',
              },
              {
                title: 'Fabric Formation Techniques',
                text: 'Explores fabric identification, construction methods, and structural properties through practical experimentation, fostering understanding of material behavior for informed fashion and textile design decisions.',
              },
              {
                title: 'Lifestyle Accessories',
                text: 'Designs functional and aesthetic lifestyle accessories, emphasizing form, construction techniques, and user-centered approaches to create innovative and wearable products.',
              },
              {
                title: 'Graphic Design Studio',
                text: 'Explores fabric formation techniques such as knitting, crochet and weaving through practical experimentation and direction of creative concepts to appropriate end uses.',
              },
              {
                title: 'Visual Arts',
                text: 'Explores key twentieth century art movements as a way to understanding the evolution and growth of visual arts and how artistic process can inform the creative process of the designer.',
              },
              {
                title: 'Textile Design (Study of Textile Culture)',
                text: 'Explores textile culture and heritage to understand the traditions and conventions practised in developing distinctive textile designs',
              },
              {
                title: 'Fashion & Lifestyle Design Headgear Design',
                text: 'Develops headgear design skills through concept generation, prototyping, and accessory-making techniques, balancing aesthetics, functionality, and cultural relevance in fashion projects.',
              },
              {
                title: 'Craft Documentation',
                text: 'Teaches systematic documentation of craft techniques, cultural practices, and design processes, producing professional records for research, preservation, and creative application in fashion design.',
              },
              {
                title: 'Fashion Semantics Studio: Visual Communication 1',
                text: 'Builds visual communication proficiency to express fashion identity and concepts through illustration, digital media, typography, and creative storytelling strategies.',
              },
              {
                title: 'Fashion Design Studio 4: Creative Process',
                text: 'Enhances creative exploration and design execution through hands-on fashion projects, studio practice, and iterative experimentation, fostering innovation and personal design expression.',
              },
              {
                title: 'Minor Track',
                text: 'Builds visual communication proficiency to express fashion identity and concepts through illustration, digital media and creative storytelling strategies.',
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
                title: 'Creative Studio Immersion',
                text: 'Hands-on studios foster collaboration, experimentation, and innovation.',
              },
              {
                title: 'Material-Driven Learning',
                text: 'Labs blend making, testing, and real-world application.',
              },
              {
                title: 'Cultural & Visual Context',
                text: 'Courses link heritage and storytelling to design practice.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Exploration',
                text: 'Focus on fixed briefs with minimal creative freedom.',
              },
              {
                title: 'Technique Over Innovation',
                text: 'Skills taught in isolation, little experimentation.',
              },
              {
                title: 'Disconnected Theory',
                text: 'Theory detached from real-world design context.',
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
            desc: 'Develop larger collections integrating aesthetics, functionality, innovation, and digital/AI tools. Build iterative and critical thinking skills.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-5-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-5-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-3/semester-5/1.webp',
            },
            portions: [
              {
                title: 'Fashion Design Studio 5',
                text: 'Explores the development of fashion design concepts in the context of society, culture and markets. Students develop a more comprehensive approach to design development backed by research.',
              },
              {
                title: 'Visual Communication Studio 2 - FD',
                text: 'Advances projects in Illustration, use of digital media, and storytelling equipping students with a range of storytelling devices.',
              },
              {
                title: 'Introduction to Fashion Studies',
                text: 'Exposes the students to different theoretical perspectives used to study fashion as a modern and global phenomenon.',
              },
              {
                title: 'Specialized Studio 1',
                text: 'Guides development of personalized fashion collections tailored to specific market needs, emphasizing concept development, design execution, and professional portfolio-quality outputs.',
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
                    title: 'Fashion Retail Technology',
                    text: 'Explores the integration of technology in fashion retail, including digital tools, innovative platforms, and interactive experiences to enhance consumer engagement and retail efficiency.',
                  },
                  {
                    title: 'Fashion Innovation',
                    text: 'Focuses on creative application of emerging technologies, materials, and processes in fashion design, encouraging experimentation, problem-solving, and forward-thinking approaches to innovative fashion solutions.',
                  },
                  {
                    title: 'Couture in Fashion',
                    text: 'Examines couture design processes, craftsmanship, and luxury consumer behavior, providing insight into high-end fashion creation and market expectations within exclusive fashion segments.',
                  },
                ],
              },
            ],
          },
          {
            title: 'Semester 6',
            desc: 'Push boundaries with advanced garment design, styling, and tech-enabled experimentation. Focus on sustainable and innovative solutions.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-6-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-6-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-3/semester-6/1.webp',
            },
            portions: [
              {
                title: 'Fashion Design Studio 6',
                text: 'Advances design processes to include personal inspirations and individually developed techniques of ideation and design development incorporating a breadth of design visualization skills.',
              },
              {
                title: 'Research Methodology',
                text: 'Teaches structured research methods using visual, narrative, and analytical tools, supporting critical design thinking and evidence-based decision-making for impactful fashion and lifestyle design projects.',
              },
              {
                title: 'Fashion design (Crafts and Textiles After 1970)',
                text: 'Develops sustainable fashion practices aligned with brand identity, emphasizing post-1970 textile and craft e volution through industry collaborations and practical design experimentation.',
              },
              {
                title: 'Fashion & Lifestyle Design (Jewelry)',
                text: 'Explores experimental jewelry design by integrating traditional craft techniques, textiles, and innovative materials, producing wearable, culturally informed, and visually striking fashion accessories.',
              },
              {
                title: 'Industry Live Project',
                text: 'Provides immersive, hands-on experience in fashion retail, merchandising, and product design enabling students to apply theoretical knowledge to real-world industry challenges.',
              },
              {
                title: 'Fashion Retail Dynamics',
                text: 'Examines how fashion concepts are brought to the path of consumption in the highly dynamic and competitive fashion retail industry.',
              },
              {
                title: 'Traditional Textile Crafts of India',
                text: 'Examines India’s rich textile traditions, their cultural heritage, craftsmanship, and community relevance, fostering awareness of sustainable practices and design inspiration from historical techniques.',
              },
              {
                title: 'Specialized Studio 2',
                text: 'Applies user-centered design principles to develop practical fashion solutions, emphasizing industrial relevance, functionality, and professional execution for market-ready apparel and lifestyle products.',
              },
              {
                title: 'Digital Fashion',
                text: 'Explores human-centered digital innovation in fashion design, combining technology, creativity, and visualization tools to produce interactive, forward-thinking, and experiential digital fashion solutions.',
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
                title: 'Industry-Connected Studios',
                text: 'Live projects and specialized studios bridge classroom learning with real-world fashion markets.',
              },
              {
                title: 'Technology & Innovation Focus',
                text: 'Courses like Digital Fashion and Fashion Innovation integrate emerging tools and tech-driven creativity.',
              },
              {
                title: 'Cultural & Sustainable Perspective',
                text: 'Blend of traditional textile heritage and modern sustainability practices.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Limited Industry Exposure',
                text: 'Projects often remain academic with minimal professional engagement.',
              },
              {
                title: 'Traditional Methods',
                text: 'Conventional craft focus with slow adaptation to digital trends.',
              },
              {
                title: 'Global Over Local',
                text: 'Less emphasis on regional crafts and sustainable design thinking.',
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
            desc: 'Engage in live projects, shows, and collaborations. Develop professional skills, presentation, and tech-enhanced industry readiness.',
            video: {
              sources: [
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-7-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-7-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-4/semester-7/1.webp',
            },
            portions: [
              {
                title: 'Design Resolution Studio',
                text: 'Develops advanced technical design and prototyping skills, guiding students to create a cohesive three-look fashion collection that demonstrates creativity, craftsmanship, and market awareness.',
              },
              {
                title: 'Professional Practice and Ethics',
                text: 'Builds a strong professional identity through business communication, networking, ethical practices, and confident presentation skills, preparing students for successful careers in the fashion industry.',
              },
              {
                title: 'Fashion Design Innovation Studio 7',
                text: 'Encourages personal expression and innovation by guiding students in developing fashion collections that reflect individual identity, creativity, and forward-thinking design approaches.',
              },
              {
                title: 'Fabric Styling Lab',
                text: 'Explores fabric properties, draping, and styling techniques to support creative fashion collection development, emphasizing material experimentation and aesthetic refinement for innovative design outcomes.',
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
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-8-1.mp4',
                  type: 'video/mp4',
                },
                {
                  src: '/assets/videos/schools/isdi/programs/b-des/fashion-design-technology/semester-8-1.webm',
                  type: 'video/webm',
                },
              ],
              poster: '/assets/images/schools/isdi/programs/b-des/fashion-design-technology/curriculum/benchmarked-curriculum/year-4/semester-8/1.webp',
            },
            portions: [
              {
                title: 'Thesis Research and Writing',
                text: 'Advances creative signatures developed in earlier stages of the progarm towards innovative design strategies and documents the development through practice-based thesis research and writing.',
              },
              {
                title: 'Fashion Styling Studio',
                text: 'Explores creative approaches to presentation of fashion concepts through effective styling and visual communication strategies.',
              },
              {
                title: 'Design Thesis Technical Lab',
                text: 'Supports the development of innovative and market-ready products as part of students\' final year thesis through strategic collaborations with artisans and/ or manufacturers.',
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
                    title: 'Fashion and UX Design',
                    text: 'Empowers final year students with the knowledge, skills and ethical understanding necessary to create impactful and considerate user experiences that transcend conventional design boundaries.',
                  },
                  {
                    title: 'Digital Media Marketing',
                    text: 'Students gain a comprehensive understanding of how to approach marketing for their product or brand by deep-diving into foundational marketing concepts, consumer behaviour, marketing tools and workflows.',
                  },
                ],
              },
            ],
          },
        ],
        comparison: {
          heading: 'Why our Year 4 outpaces every\nother design\nschool?',
          headingTag: 'h2-tag',
          isdi: {
            title: 'ISDI School of Design',
            points: [
              {
                title: 'Industry-Ready Thesis Projects',
                text: 'Combines research, making, and real-world collaborations.',
              },
              {
                title: 'Creative Identity',
                text: 'Encourages personal style and innovation.',
              },
              {
                title: 'Career-Focused Learning',
                text: 'Prepares students for fashion business and branding.',
              },
            ],
          },
          others: {
            title: 'Other Design Schools',
            points: [
              {
                title: 'Academic-Only Theses',
                text: 'Graduation projects often remain conceptual with limited industry engagement.',
              },
              {
                title: 'Uniform Outcomes',
                text: 'Emphasis on standard techniques.',
              },
              {
                title: 'Limited Market Exposure',
                text: 'Minimal focus on professional practice.',
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
