const IMG = '/assets/images/examination';

/* the same cover /examination and /nirf use — `.inner-cover-image`, sizes as authored */
export const hero = (title) => ({
  title,
  image: {
    src: `${IMG}/mandatory-disclosure-1.png`,
    srcSet: `${IMG}/mandatory-disclosure-1-p-500.png 500w, ${IMG}/mandatory-disclosure-1-p-800.png 800w, ${IMG}/mandatory-disclosure-1-p-1080.png 1080w, ${IMG}/mandatory-disclosure-1.png 1366w`,
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
});
