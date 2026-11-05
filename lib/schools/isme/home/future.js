/**
 * ISME homepage — "Your Future, In Action" (reference/schools/isme/index.php,
 * `.instagram-wrapper.mrgtp0.mobile-vert-scroll`): four columns of two photographs, in authored
 * order; `
` is an authored <br>. `topSet` / `centerSet` are the photos authored `.top-set` /
 * `.center-set`; `bottom16` is the caption authored `.mrgbt16`. The `width="Auto"` attributes two
 * images carry are invalid and ignored, as upstream.
 */
export const ismeFuture = {
  heading: 'Your Future, In Action',
  sub: 'From Campus to Corporate in 4 Years ',
  button: {
    label: 'View More Student Outcomes',
    href: '/schools/isme/success-stories/success-snapshot/success-stories',
    variant: 'mint',
  },
  columns: [
    [
      {
        text: 'Durva Pawaskar @Dentsu',
        image: {
          src: '/assets/images/schools/isme/home/future/durva-pawaskar-dentsu-1.png',
          width: 299,
          height: 331,
          alt: '',
        },
      },
      {
        text: 'Yashvi Shah\n@Columbia',
        image: {
          src: '/assets/images/schools/isme/home/future/yashvi-shaha-small.png',
          width: 299,
          height: 323,
          alt: '',
        },
        topSet: true,
      },
    ],
    [
      {
        text: 'Vansh Mehta @\nJP Morgan',
        image: {
          src: '/assets/images/schools/isme/home/future/grid-image-3.png',
          width: 293,
          height: 292,
          alt: '',
        },
      },
      {
        text: 'Mannat Sharma @EY',
        image: {
          src: '/assets/images/schools/isme/home/future/grid-image-4.png',
          width: 293,
          height: 371,
          alt: '',
        },
      },
    ],
    [
      {
        text: 'Kanak Suri @BCG',
        image: {
          src: '/assets/images/schools/isme/home/future/grid-image-5.png',
          width: 295,
          height: 201,
          alt: '',
        },
        centerSet: true,
        bottom16: true,
      },
      {
        text: 'Aryan Gandhi,\nFounder @drnk',
        image: {
          src: '/assets/images/schools/isme/home/future/aryan-gandhio-420.png',
          width: 295,
          height: 460,
          alt: '',
        },
      },
    ],
    [
      {
        text: 'Briana Chandiramni, Founder @Go-To-Co',
        image: {
          src: '/assets/images/schools/isme/home/future/grid-image-7.png',
          width: 279,
          height: 366,
          alt: '',
        },
      },
      {
        text: 'Anik Jain,\nFounder @DZINR!',
        image: {
          src: '/assets/images/schools/isme/home/future/grid-image-8.png',
          width: 279,
          height: 297,
          alt: '',
        },
      },
    ],
  ],
};
