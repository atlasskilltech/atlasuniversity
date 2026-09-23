/*
 * Leadership Team — about-us/index.php:210-275. Each portrait is a Webflow background
 * video (muted, looping, poster first). Only the first person carries "Read More".
 */
export const isdiAboutLeadership = {
  icon: '/assets/images/schools/isdi/about/leadership/content.png',
  title: 'Leadership Team',
  quoteIcon: '/assets/images/leadership-team/quote-icon.svg',
  people: [
    {
      id: null,
      quote:
        'ATLAS is building a future-ready education model to equip young people in India with the skills and tech they need.',
      video: {
        poster: '/assets/images/about/chancellor/dr-shahani-video-poster.jpg',
        sources: [
          {
            src: '/assets/videos/about/dr-shahani-video.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/about/dr-shahani-video.webm',
            type: 'video/webm',
          },
        ],
      },
      name: 'Dr. Indu Shahani',
      post: 'President',
      paragraphs: [
        'Dr. Indu Shahani is a renowned academic leader and institution builder with over four decades of experience in education and public service. Formerly the Sheriff of Mumbai, Principal of H.R. College, and Member of the University Grants Commission, she was also the first Indian to serve as Vice-Chair of the International Baccalaureate Board of Governors.',
        'At ATLAS SkillTech University, Dr. Shahani is pioneering a future-focused, interdisciplinary model that bridges academics with industry. She serves on the boards of leading corporations including Colgate Palmolive, Diageo, HSBC AMC, Bajaj Electricals, and Eureka Forbes, driving her mission of creating responsible leaders and entrepreneurs for the new economy.',
      ],
      more: {
        label: 'Read More',
        href: '/isme/dr-indu-shahani',
      },
    },
    {
      id: 'executive-president',
      quote:
        'ATLAS is building a future-ready education model to equip young people in India with the skills and tech they need.',
      video: {
        poster: '/assets/images/schools/isdi/about/leadership/sid-about-us-poster.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isdi/about/sid-about-us.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isdi/about/sid-about-us.webm',
            type: 'video/webm',
          },
        ],
      },
      name: 'Mr. Siddharth Shahani',
      post: 'Executive President',
      paragraphs: [
        'Siddharth Shahani, a global education leader, is the Co-founder and Executive President of ATLAS SkillTech University. With academic roots at University College London, a Master’s from the London School of Economics, and further specialization at London Business School, he brings a rich global perspective to higher education. Professionally, he honed his expertise at McKinsey & Company, London, where he advised global corporations on strategy and transformation.',
        'At ATLAS, he is driving the vision of building India’s first urban, innovation university—an institution that combines cutting-edge global practices with the cultural depth of Indian values. His focus is on creating future-ready leaders equipped with interdisciplinary skills and entrepreneurial mindsets.',
      ],
      more: null,
    },
    {
      id: 'vice-chancellor',
      quote: 'Education must go beyond degrees it should shape individuals into responsible, innovative leaders.',
      video: {
        poster: '/assets/images/schools/isdi/about/leadership/dr-raja-welukar-poster.jpg',
        sources: [
          {
            src: '/assets/videos/schools/isdi/about/dr-raja-welukar.mp4',
            type: 'video/mp4',
          },
          {
            src: '/assets/videos/schools/isdi/about/dr-raja-welukar.webm',
            type: 'video/webm',
          },
        ],
      },
      name: 'Dr. Rajan Welukar',
      post: 'Vice Chancellor',
      paragraphs: [
        'Dr. Rajan Welukar, Vice Chancellor of ATLAS SkillTech University, is a distinguished academic leader with over 36 years in Indian higher education. A former Vice Chancellor of the University of Mumbai, he has also led institutions such as AURO University and Yashwantrao Chavan Maharashtra Open University.',
        'With a strong background as a teacher, policy advisor, and administrator, Dr. Welukar has served on key national and international education committees and continues to drive innovation, quality, and global best practices at ATLAS.',
      ],
      more: null,
    },
  ],
};
