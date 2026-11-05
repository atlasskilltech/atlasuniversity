/*
 * Content for /schools/isdi/success-stories/success-snapshot —
 * reference/schools/isdi/success-stories/success-snapshot/index.php, one module per
 * block under ./success-snapshot.
 *
 * `$css = "…68e8b62472359d9d1380fd5f-e1d906893.css"` (its own sheet) and
 * `$body = "body isdi-page"`, so the 50px ISDI section padding applies throughout.
 *
 * **It opens no database connection**, so nothing here is a snapshot — and the
 * mirrored PHP is current: its rendered text and its media urls were diffed node by
 * node against production and are identical apart from the commented-out popup
 * markup. It was still measured against production, because the local mirror renders
 * in quirks mode and its ISDI `$domain` is broken.
 *
 * It is a directory with an `index.php`, so production answers **301** on the
 * slashless path and serves the page at the trailing slash. The header menu links the
 * slashless form and Next normalises the other way; both resolve.
 *
 * Nineteen blocks: a photographic hero, a three-figure band, the six-link sticky
 * menu, "Beliefs that power our success", "The 4-Year Journey to Success",
 * "Placements & Internships", "Industry Internships", "Top Recruiters @ ATLAS ISDI",
 * "Master's Progressions", "Our students at universities around the world", "Global
 * University Collaborations" (five logo tabs), "Startups", "Startups founded by ATLAS
 * ISDI Alumni", "Impact Driven Research & Innovation", "Awards & Recognitions", "Our
 * Support System", "Our Career Support Services", "More questions?" and the FAQ.
 *
 * "More questions?" is included with byte-identical `$chatBxVariant` / `$chatBxText`
 * to the other ISDI pages', so that export is re-used.
 *
 * Two upstream slips are transcribed as authored: the hero lead runs three words
 * together ("shape industries andinspirechange") and the 4th-year card's does the
 * same ("ventures acrossindustries").
 */
export { hero } from './success-snapshot/hero';
export { stats } from './success-snapshot/stats';
export { menu } from './success-snapshot/menu';
export { beliefs } from './success-snapshot/beliefs';
export { journey } from './success-snapshot/journey';
export { placement } from './success-snapshot/placement';
export { internships } from './success-snapshot/internships';
export { recruiters } from './success-snapshot/recruiters';
export { masters } from './success-snapshot/masters';
export { universities } from './success-snapshot/universities';
export { collaborations } from './success-snapshot/collaborations';
export { startups } from './success-snapshot/startups';
export { alumni } from './success-snapshot/alumni';
export { research } from './success-snapshot/research';
export { awards } from './success-snapshot/awards';
export { support } from './success-snapshot/support';
export { career } from './success-snapshot/career';
export { faq } from './success-snapshot/faq';

/* `assets/include/more-questions.php` with byte-identical `$chatBxVariant` /
 * `$chatBxText` to every other ISDI page's, so that export is re-used. */
export { isdiAboutSearch as search } from './aboutContent';
