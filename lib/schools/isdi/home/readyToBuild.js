import { IMG } from './paths';

/* 18. Ready to Build What’s Next? — index.php:3734-3748 */
export const isdiReadyToBuild = {
  heading: 'Ready to Build What’s Next?\nLet’s Get Started.',
  sub: 'Get a glimpse - where future business leaders are shaped through innovation, industry, and inspiration.',
  buttons: [
    { label: 'Apply Now', href: '/applicationform', variant: 'blue' },
    { label: 'Explore Programs', href: '#explore-program', variant: 'outline' },
    { label: 'Schedule a visit', href: '/campusvisit', variant: 'outline' },
  ],
  image: {
    src: `${IMG}/ready-to-build/girlboy.png`,
    srcSet: `${IMG}/ready-to-build/girlboy-p-500.png 500w, ${IMG}/ready-to-build/girlboy.png 635w`,
    alt: 'Atlas University student and faculty discussing academics — business management programs in Mumbai',
  },
};
