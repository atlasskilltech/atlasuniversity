/*
* "Ready to Build a Design Degree that's Built for the Real World?" — index.php:3174-3185
 * (`.info-banner-blue.bg1.isdi`), the band the ISDI homepage closes with. Its second button opens
 * the same brochure popup as the hero's.
 */
export const isdiBdesAccessoryBanner = {
  heading: 'Ready to Build a Design Degree\nthat’s Built for the Real World?',
  sub: null,
  image: {
    src: '/assets/images/schools/isdi/programs/b-des/accessory-design-craft/banner/students.webp',
    width: 679,
    height: 377,
    alt: '',
  },
  buttons: [
    {
      label: 'Book a Campus Visit',
      href: '/campusvisit',
      variant: 'blue',
    },
    {
      label: 'Download Brochure',
      href: '#',
      variant: 'outline-white',
      brochure: 'download-brochure',
    },
  ],
};
