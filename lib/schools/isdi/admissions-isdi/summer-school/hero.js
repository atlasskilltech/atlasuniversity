/*
* Hero — `.inner-header-wrapper` over a `.w-background-video`, with the heading,
 * TWO `.btn-primary`s in a `.hd-wrap > .buttons-wrapper`, and `.inner-cover-text` beside
 * them. 658px tall: `.full-ht` (100vh) is the modifier the About page carries and this
 * page does not.
 *
 * Two differences from /schools/isdi/programs/pre-university-summer-school's hero, which
 * is otherwise the same markup and the same video file:
 *
 *   - the lead reads **Grades 8-12** here and "Grades 9-12" there;
 *   - the second button, "Download Brochure", is LIVE here and commented out line by line
 *     there. It is `href="#"` with `data-id="download-brochure"`, so it is a popup trigger
 *     rather than a link — see `./brochure.js`.
 *
 * The video and its poster are the programme page's files, already on disk.
 */
export const isdiAdmSummerSchoolHero = {
  title: 'Design Your Summer. Discover Your Future.',
  text: 'A two-week immersive design experience for Grades 8–12 - guided by ISDI mentors and co-certified by Parsons School of Design, The New School, New York.',
  fullHeight: false,
  buttons: [
    {
      label: 'Apply Now',
      href: '/summerdesign',
      variant: 'pink',
    },
    {
      /* ref `href="#"` + `data-id="download-brochure"` — a dialog trigger, not a link */
      label: 'Download Brochure',
      variant: 'outline-white',
      brochureKey: 'download-brochure',
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
