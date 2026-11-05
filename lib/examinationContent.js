/* /examination — transcribed 1:1 from reference/examination.php. The three hrefs are written through
   `<?php $domain ?>` (no `echo`, so nothing is printed) and resolve against the site root: the
   guidelines PDF is this site's own copy (byte-identical to production's), the other two are
   production routes this rebuild has no reference for. Trailing spaces in two hrefs are dropped,
   as URL parsing drops them. */
const IMG = '/assets/images/examination';

export const hero = {
  title: 'Examination',
  image: {
    src: `${IMG}/mandatory-disclosure-1.png`,
    srcSet: `${IMG}/mandatory-disclosure-1-p-500.png 500w, ${IMG}/mandatory-disclosure-1-p-800.png 800w, ${IMG}/mandatory-disclosure-1-p-1080.png 1080w, ${IMG}/mandatory-disclosure-1.png 1366w`,
    sizes: '(max-width: 1366px) 100vw, 1366px',
    alt: '',
  },
};

export const links = [
  { label: 'Guidelines', href: `${IMG}/1.pdf` },
  { label: 'Timetable', href: 'https://atlasuniversity.edu.in/exam-time-table' },
  { label: 'Results', href: 'https://atlasuniversity.edu.in/result' },
];
