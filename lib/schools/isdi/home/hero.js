import { IMG, VID } from './paths';

/* 1. Hero — index.php:35-460 (`.section.nopad > .swiper.swiper-30`) */
const BUTTONS = [
  { label: 'Become an ISDI-ian', href: '/applicationform', variant: 'pink' },
  { label: 'Explore our Programs', href: '#explore-program', variant: 'outline' },
  { label: 'Schedule a Visit', href: '/campusvisit', variant: 'outline' },
];

export const isdiHero = {
  buttons: BUTTONS,
  slides: [
    {
      // the only slide whose heading is an <h1>; the other three are <div>s
      heading: 'India’s leading design school meets America’s #1',
      headingTag: 'h1',
      video: `${VID}/hero-banner-1/Video-1-World-Class-Design-Education-transcode.mp4`,
      poster: `${IMG}/hero-banner/Video-1-World-Class-Design-Education-poster-00001.jpg`,
    },
    {
      heading: 'Future-ready design, \nworld-class spaces',
      video: `${VID}/hero-banner-2/Future-ready-design-world-class-spaces-transcode.mp4`,
      poster: `${IMG}/hero-banner/Future-ready-design-world-class-spaces-poster-00001.jpg`,
    },
    {
      heading: 'Industry-integrated learning for the innovators of tomorrow.',
      video: `${VID}/hero-banner-3/Video-3-Industry-integrated-learning-for-the-innovators-of-tomorrow-transcode.mp4`,
      poster: `${IMG}/hero-banner/Video-3-Industry-integrated-learning-for-the-innovators-of-tomorrow-poster-00001.jpg`,
    },
    {
      heading: 'In Mumbai’s business district, ideas transform into impact.',
      video: `${VID}/hero-banner-4/Video-4-In-Mumbais-business-district-ideas-transform-into-impact-transcode.mp4`,
      poster: `${IMG}/hero-banner/Video-4-In-Mumbais-business-district-ideas-transform-into-impact-poster-00001.jpg`,
    },
  ],
};
