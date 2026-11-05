/*
 * Hero — about-us/index.php:12-22. `.inner-header-wrapper.full-ht` over a Webflow
 * background video (autoplay, loop, muted; poster painted until it plays).
 */
export const isdiAboutHero = {
  title: 'About Us',
  text: 'What began as a vision to disrupt conventional business education has evolved into a thriving ecosystem of entrepreneurs, changemakers, and future-ready leaders at ISDI.',
  video: {
    poster: '/assets/images/schools/isdi/about/hero/hero-video-poster.jpg',
    sources: [
      {
        src: '/assets/videos/schools/isdi/about/hero-video.mp4',
        type: 'video/mp4',
      },
      {
        src: '/assets/videos/schools/isdi/about/hero-video.webm',
        type: 'video/webm',
      },
    ],
  },
};
