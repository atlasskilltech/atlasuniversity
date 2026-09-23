/*
 * 15. Steering Excellence, Guiding ISDI - Our Advisory Board — index.php:3260-3586,
 * in authored order (the ten advisors, then all ten again). Every card authors an
 * `a.play-icon[data-video]`, but only four put the play button inside it; the rest
 * are empty 0x0 anchors that cannot be seen or clicked, so only those four carry
 * `video`. Copy and alt text as authored, except one href: Amitesh Rao's is
 * authored `#https://www.youtube.com/watch?v=…`, a fragment that is not a valid
 * selector (the shared sticky-header hook runs `querySelector` on in-page hrefs)
 * and not a place — it is the video URL, which the click opens anyway.
 */
export const isdiAdvisory = {
  heading: 'Steering Excellence, Guiding ISDI -\nOur Advisory Board',
  people: [
    {
      name: 'Amitesh Rao',
      role: 'CEO',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-8.png', width: 115, height: 22, alt: 'Leo Burnett Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/amistesh-rao.png', width: 272, height: 330, alt: 'Picture of CEO of Leo Burnett South Asia Amitesh Rao' },
    },
    {
      name: 'Lulu Raghavan',
      role: 'President APAC',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-2.png', width: 115, height: 29, alt: 'Landor Signature Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/lulu-raghavan.webp', width: 272, height: 330, alt: 'Picture of president APAC Lulu Raghvan from Landor' },
    },
    {
      name: 'Ayan pal',
      role: 'Head of Experience & Design',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-1.png', width: 115, height: 22, alt: 'Logo of Deloitte' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/ayan-pal.png', width: 272, height: 330, alt: 'Picture of head of experience and design Ayan Pal from Deloittte' },
    },
    {
      name: 'Avnish Sabharwal',
      role: 'Managing Director',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-7.png', width: 81, height: 24, alt: 'Accenture Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/avnish-sabharwal.png', width: 272, height: 330, alt: 'Picture of managing director Avinash Sabarwal from Accenture' },
    },
    {
      name: 'Tanu Sinha',
      role: 'Head of Design',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo.png', width: 115, height: 29, alt: 'Pepsico Signature Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/tanu-sinha.png', width: 272, height: 330, alt: 'Head of Design of Pepsico Tanu Sinha' },
    },
    {
      name: 'Sonia Manchanda',
      role: 'Founding Partner',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-6.png', width: 115, height: 22, alt: 'Infinity Spread Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/sonia-machanda.webp', width: 272, height: 330, alt: 'Picture of founding partner Sonia Machanda from Infinity spread' },
    },
    {
      name: 'Satyam Kantamneni',
      role: 'Managing Partner',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-2.png', width: 115, height: 22, alt: 'Ux Reactor Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/satyam-kantamneni.png', width: 272, height: 330, alt: 'Picture of managing partner Satyam Kantamneni from ux reactors' },
    },
    {
      name: 'Alok (b.) Nandi',
      role: 'Founder & Creative Director',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-1.png', width: 115, height: 22, alt: 'Nandi Mobi Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/alok-nandi.png', width: 272, height: 330, alt: 'Picture of founder,creator Alok Nandi from nandi.mobi' },
    },
    {
      name: 'Tanay Kumar',
      role: 'Founder & CEO',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image.png', width: 35, height: 35, alt: '' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/tanay-kumar.png', width: 272, height: 330, alt: 'CEO of Fractal Ink Design Studio Tanay Kumar' },
    },
    {
      name: 'Andrew Pendleton',
      role: 'Sr Director, Design Systems',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-3.png', width: 115, height: 22, alt: 'Verizon Signature logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/bg-rect.png', width: 272, height: 330, alt: '' },
    },
    {
      name: 'Amitesh Rao',
      role: 'CEO',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-8.png', width: 115, height: 22, alt: 'Leo Burnett Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/amistesh-rao.png', width: 272, height: 330, alt: 'Picture of CEO of Leo Burnett South Asia Amitesh Rao' },
      video: { url: 'https://www.youtube.com/watch?v=nko8PuMgnT8', href: 'https://www.youtube.com/watch?v=nko8PuMgnT8' },
    },
    {
      name: 'Lulu Raghavan',
      role: 'President APAC',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-2.png', width: 115, height: 29, alt: 'Landor Signature Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/lulu-raghavan.webp', width: 272, height: 330, alt: 'Picture of president APAC Lulu Raghvan from Landor' },
      video: { url: 'https://youtu.be/p2zCVkQdMtM', href: 'https://youtu.be/p2zCVkQdMtM' },
    },
    {
      name: 'Ayan pal',
      role: 'Head of Experience & Design',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo-1.png', width: 115, height: 22, alt: 'Logo of Deloitte' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/ayan-pal.png', width: 272, height: 330, alt: 'Picture of head of experience and design Ayan Pal from Deloittte' },
      video: { url: 'https://www.youtube.com/embed/DRCPfJBynd4', href: 'https://www.youtube.com/shorts/DRCPfJBynd4' },
    },
    {
      name: 'Avnish Sabharwal',
      role: 'Managing Director',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-7.png', width: 81, height: 24, alt: 'Accenture Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/avnish-sabharwal.png', width: 272, height: 330, alt: 'Picture of managing director Avinash Sabarwal from Accenture' },
      video: { url: 'https://www.youtube.com/shorts/5fCWecfDYWM', href: 'https://www.youtube.com/shorts/5fCWecfDYWM' },
    },
    {
      name: 'Tanu Sinha',
      role: 'Head of Design',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/replace-logo.png', width: 115, height: 29, alt: 'Pepsico Signature Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/tanu-sinha.png', width: 272, height: 330, alt: 'Head of Design of Pepsico Tanu Sinha' },
    },
    {
      name: 'Sonia Manchanda',
      role: 'Founding Partner',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-6.png', width: 115, height: 22, alt: 'Infinity Spread Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/sonia-machanda.webp', width: 272, height: 330, alt: 'Picture of founding partner Sonia Machanda from Infinity spread' },
    },
    {
      name: 'Satyam Kantamneni',
      role: 'Managing Partner',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-2.png', width: 115, height: 22, alt: 'Ux Reactor Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/satyam-kantamneni.png', width: 272, height: 330, alt: 'Picture of managing partner Satyam Kantamneni from ux reactors' },
    },
    {
      name: 'Alok (b.) Nandi',
      role: 'Founder & Creative Director',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-1.png', width: 115, height: 22, alt: 'Nandi Mobi Logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/alok-nandi.png', width: 272, height: 330, alt: 'Picture of founder,creator Alok Nandi from nandi.mobi' },
    },
    {
      name: 'Tanay Kumar',
      role: 'Founder & CEO',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image.png', width: 35, height: 35, alt: '' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/tanay-kumar.png', width: 272, height: 330, alt: 'CEO of Fractal Ink Design Studio Tanay Kumar' },
    },
    {
      name: 'Andrew Pendleton',
      role: 'Sr Director, Design Systems',
      logo: { src: '/assets/images/schools/isdi/home/advisory-board/image-3.png', width: 115, height: 22, alt: 'Verizon Signature logo' },
      photo: { src: '/assets/images/schools/isdi/home/advisory-board/bg-rect.png', width: 272, height: 330, alt: '' },
    },
  ],
};
