/**
 * ISME homepage — the advisory board marquee (reference/schools/isme/index.php `.testimonial-wrap`).
 * Twelve cards in authored order; a thirteenth (Ronnie Screwvala) is commented out upstream. Only
 * the first three put the play icon inside their `a.play-icon`; Keshav Murugesh's anchor carries a
 * `data-video` but no image, so it is a 0x0 box and renders nothing — the rule
 * /advantages/atlas-industry-centric-approach records. "Stretegic Advisor" and Anita Dongre's
 * missing role line are authored that way. Every portrait and logo is the ATLAS board's file.
 */
export const ismeAdvisory = {
  heading: 'Steering Excellence, Guiding ATLAS --\nOur Advisory ATLAS Board',
  playLabel: 'Play video',
  playAlt: '',
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
        href: '#',
        url: 'https://www.youtube.com/watch?v=nko8PuMgnT8',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
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
        href: '#',
        url: 'https://youtu.be/p2zCVkQdMtM',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
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
        href: '#',
        url: 'https://www.youtube.com/shorts/5fCWecfDYWM',
        icon: '/assets/images/schools/isme/home/advisory/play-button-isme.png',
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
  ],
};
