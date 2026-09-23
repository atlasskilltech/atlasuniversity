/*
 * The ATLAS Advisory Board (about-us/index.php:276-411) and The ISDI Advisory Board
 * (412-620), both `.swiper.marquee-swiper` strips of `.card-type-d`. Only the first
 * four ATLAS cards put the play icon inside their `a.play-icon`; every other anchor is
 * authored empty (a 0x0 box), so only those four carry `video`. The ISDI board
 * authors its eleven advisors twice; both passes are kept.
 */
export const isdiAboutAtlasAdvisory = {
  heading: 'The ATLAS Advisory Board',
  // the page authors the play icon with an empty alt
  playAlt: '',
  playLabel: 'Play video',
  people: [
    {
      name: 'Deepak Parekh',
      role: 'Chairman',
      logo: {
        src: '/assets/images/about/advisory/image-1052-2-copy.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/board-img-1.webp',
        width: 324,
        height: 399,
        alt: '',
      },
      video: {
        href: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
        url: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
      },
    },
    {
      name: 'Vivek Pandit',
      role: 'Senior Partner',
      logo: {
        src: '/assets/images/about/advisory/logo10.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/image-1053-copy-2.png',
        width: 324,
        height: 399,
        alt: '',
      },
      video: {
        href: 'https://youtu.be/p2zCVkQdMtM',
        url: 'https://youtu.be/p2zCVkQdMtM',
      },
    },
    {
      name: 'Ronnie Screwvala',
      role: 'Chairperson & Co-Founder',
      logo: {
        src: '/assets/images/advisory-board/logo/upgrad.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/advisory-board/advisor/ronnie-screwvala.png',
        width: 324,
        height: 400,
        alt: '',
      },
      video: {
        href: 'https://www.youtube.com/shorts/DRCPfJBynd4',
        url: 'https://www.youtube.com/embed/DRCPfJBynd4',
      },
    },
    {
      name: 'Anant Goenka',
      role: 'Vice Chairman',
      logo: {
        src: '/assets/images/about/advisory/image-1052-2-copy-2.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2.png',
        width: 324,
        height: 400,
        alt: '',
      },
      video: {
        href: 'https://www.youtube.com/shorts/5fCWecfDYWM',
        url: 'https://www.youtube.com/shorts/5fCWecfDYWM',
      },
    },
    {
      name: 'Keshav Murugesh',
      role: 'Group CEO',
      logo: {
        src: '/assets/images/about/advisory/image-1052-2.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/image-1053.png',
        width: 324,
        height: 399,
        alt: '',
      },
    },
    {
      name: 'Karan Singh',
      role: 'Chairman',
      logo: {
        src: '/assets/images/about/advisory/bain.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/image-1053-copy.png',
        width: 324,
        height: 399,
        alt: '',
      },
    },
    {
      name: 'Ram Raghavan',
      role: 'President',
      logo: {
        src: '/assets/images/about/advisory/colgate1.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2-copy.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Jamil Khatri',
      role: 'Co-Founder & CEO',
      logo: {
        src: '/assets/images/about/advisory/logo1.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2-copy-2.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Avani Davda',
      role: 'Stretegic Advisor',
      logo: {
        src: '/assets/images/about/advisory/bain.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2-copy-3.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Aryaman Birla',
      role: 'Director',
      logo: {
        src: '/assets/images/about/advisory/logo2.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2-copy-4.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Sanjay Gurbuxani',
      role: 'VP, IBS AMEA & Global Digital Innovation',
      logo: {
        src: '/assets/images/about/advisory/logo9.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-3.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Anita Dongre',
      role: null,
      logo: {
        src: '/assets/images/about/advisory/logo4.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/anita.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Dr. Indu Shahani',
      role: 'Founding President and Chancellor',
      logo: {
        src: '/assets/images/about/advisory/logo5.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/about/advisory/gradient-2-copy-8.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
    {
      name: 'Mayank Kumar',
      role: 'Co-Founder & MD',
      logo: {
        src: '/assets/images/advisory-board/logo/upgrad.png',
        width: 119,
        height: 41,
        alt: '',
      },
      photo: {
        src: '/assets/images/advisory-board/advisor/mayank-kumar.png',
        width: 324,
        height: 400,
        alt: '',
      },
    },
  ],
};

export const isdiAboutIsdiAdvisory = {
  heading: 'The ISDI Advisory Board',
  people: [
    {
      name: 'Amitesh Rao',
      role: 'CEO',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-8.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/amistesh-rao.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Lulu Raghavan',
      role: 'President APAC',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-2.png',
        width: 115,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/lulu-raghavan.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Ayan pal',
      role: 'Head of Experience & Design',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-1.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/ayan-pal.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Avnish Sabharwal',
      role: 'Managing Director',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-7.png',
        width: 81,
        height: 24,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/avnish-sabharwal.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Tanu Sinha',
      role: 'Head of Design',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo.png',
        width: 115,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/tanu-sinha.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Sonia Manchanda',
      role: 'Founding Partner',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-6.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/sonia-machanda.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'NEETA LULLA',
      role: 'Couturier | Designer | Stylist',
      logo: {
        src: '/assets/images/schools/isdi/about/advisory/image-5.png',
        width: 55,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/neeta-lulla.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Satyam Kantamneni',
      role: 'Managing Partner',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-2.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/satyam-kantamneni.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Alok (b.) Nandi',
      role: 'Founder & Creative Director',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-1.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/alok-nandi.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Tanay Kumar',
      role: 'Founder & CEO',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image.png',
        width: 35,
        height: 35,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/tanay-kumar.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Andrew Pendleton',
      role: 'Sr Director, Design Systems',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-3.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/bg-rect.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Amitesh Rao',
      role: 'CEO',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-8.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/amistesh-rao.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Lulu Raghavan',
      role: 'President APAC',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-2.png',
        width: 115,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/lulu-raghavan.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Ayan pal',
      role: 'Head of Experience & Design',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-1.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/ayan-pal.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Avnish Sabharwal',
      role: 'Managing Director',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-7.png',
        width: 81,
        height: 24,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/avnish-sabharwal.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Tanu Sinha',
      role: 'Head of Design',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/replace-logo.png',
        width: 115,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/tanu-sinha.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Sonia Manchanda',
      role: 'Founding Partner',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-6.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/sonia-machanda.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'NEETA LULLA',
      role: 'Couturier | Designer | Stylist',
      logo: {
        src: '/assets/images/schools/isdi/about/advisory/image-5.png',
        width: 55,
        height: 29,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/about/advisory/neeta-lulla.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Satyam Kantamneni',
      role: 'Managing Partner',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-2.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/satyam-kantamneni.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Alok (b.) Nandi',
      role: 'Founder & Creative Director',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-1.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/alok-nandi.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Tanay Kumar',
      role: 'Founder & CEO',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image.png',
        width: 35,
        height: 35,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/tanay-kumar.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
    {
      name: 'Andrew Pendleton',
      role: 'Sr Director, Design Systems',
      logo: {
        src: '/assets/images/schools/isdi/home/advisory-board/image-3.png',
        width: 115,
        height: 22,
        alt: '',
      },
      photo: {
        src: '/assets/images/schools/isdi/home/advisory-board/bg-rect.png',
        width: 272,
        height: 330,
        alt: '',
      },
    },
  ],
};
