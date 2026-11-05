/*
* The four figures under the hero — `.top-cards-wrapper.padbtm0`, the same band
 * `components/Schools/ISDI/SummerSchool/Stats` renders on the programme page.
 *
 * Four plain `.sm-text-isme-2.isdi` lines; no "Next Batch" eyebrow and no batch dates,
 * which is what the programme page's first card carries instead. Colour and artwork come
 * from `.head-top-card.bgN` + `.isdi-blue-N`, measured on this reference:
 *
 *   bg6 isdi-blue-1  #0038b1  pro-bg-1.png   no right padding
 *   bg7 isdi-blue-2  #0a46ca  Vector--0.png  padding-right 40
 *   bg8 isdi-blue-3  #0038b1  pro-bg-1.png   no right padding  (paints as `bg6` does)
 *
 * Both images were already on disk.
 */
export const isdiAdmSummerSchoolStats = [
  {
    /* ref .head-top-card.bg6.isdi-blue-1 */
    lines: [{ text: '2-Week Program', variant: 'line' }],
    background: '#0038b1',
    image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
    padRight: false,
  },
  {
    /* ref .head-top-card.bg7.isdi-blue-2 */
    lines: [{ text: 'Certified by Parsons The New School', variant: 'line' }],
    background: '#0a46ca',
    image: '/assets/images/schools/isdi/about/stats/vector-0.png',
    padRight: true,
  },
  {
    /* ref .head-top-card.bg8.isdi-blue-3 — a third modifier that measures identical to
       `.bg6.isdi-blue-1` */
    lines: [{ text: 'Grades 8-12', variant: 'line' }],
    background: '#0038b1',
    image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
    padRight: false,
  },
  {
    /* ref .head-top-card.bg7.isdi-blue-2 */
    lines: [{ text: 'On-Campus Experience', variant: 'line' }],
    background: '#0a46ca',
    image: '/assets/images/schools/isdi/about/stats/vector-0.png',
    padRight: true,
  },
];
