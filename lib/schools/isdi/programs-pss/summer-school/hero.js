/*
* Hero — pre-university-summer-school.php: `.inner-header-wrapper` over a
 * `.w-background-video`, with the heading and one `.btn-primary` in a `.hd-wrap` beside
 * `.inner-cover-text`. `fullHeight: false` is the reference's own default — the About page
 * carries `.full-ht` (100vh) and this one does not, so it is 658px.
 */
export const isdiSummerSchoolHero = {
  title: 'Design Your Summer. Discover Your Future.',
  text: 'A two-week immersive design experience for Grades 9–12 - guided by ISDI mentors and co-certified by Parsons School of Design, The New School, New York.',
  fullHeight: false,
  buttons: [
    {
      label: 'Apply Now',
      href: '/summerdesign',
      variant: 'pink',
    },
  ],
  video: {
    sources: [
      {
        src: '/assets/videos/schools/isdi/programs/pss/summer-school/summer-school-isdi-1-_mp4.mp4',
        type: 'video/mp4',
      },
      {
        src: '/assets/videos/schools/isdi/programs/pss/summer-school/summer-school-isdi-1-_webm.webm',
        type: 'video/webm',
      },
    ],
    poster: '/assets/images/schools/isdi/programs/pss/summer-school/hero/summer-school-isdi-1-_poster.0000000.jpg',
  },
};
