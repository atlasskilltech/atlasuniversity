/*
 * The three figures under the hero (`.top-cards-wrapper.padbtm0`). Identical to the B.Tech
 * Design Engineering page EXCEPT the middle (Eligibility) card — see the diff recorded in the
 * content barrel. The "Duration" card reads "4-Year Degree - B.Tech." verbatim: that is the
 * upstream curriculum/duration discrepancy on this MBA page, transcribed as authored and
 * flagged for confirmation (see MIGRATION-ISDI.md), NOT silently corrected.
 */
export const isdiMbaTransformationStats = [
  {
    label: 'Duration',
    value: '4-Year Degree - B.Tech.', // upstream discrepancy (an MBA is 2 years) — see barrel + tracker
    note: null,
    background: '#0038b1',
    image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
    padRight: false,
  },
  {
    label: 'Eligibility Criteria',
    value: '60% in Class XII', // ref `.large-text.isdi` (differs from Design Engineering's "50% …")
    note: '((Any Stream) or equivalent IB / A-Levels with Maths', // ref `.s-text`, unbalanced "((" as authored
    background: '#0a46ca',
    image: '/assets/images/schools/isdi/about/stats/vector-0.png',
    padRight: true,
  },
  {
    label: 'Next Intake',
    value: 'July 2027',
    note: 'Session begins from 17th July 2027',
    background: '#0038b1',
    image: '/assets/images/schools/isdi/about/stats/pro-bg-1.png',
    padRight: false,
  },
];
