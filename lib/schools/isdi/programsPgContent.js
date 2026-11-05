/*
 * Content for /schools/isdi/programs/postgraduate —
 * reference/schools/isdi/programs/postgraduate/index.php, transcribed from the page
 * production renders, one module per section under ./programs-pg. Every asset path is
 * local.
 *
 * The page is the Undergraduate Overview's shape with one block swapped: where that page
 * includes the PathFinder quiz, this one carries "Our Programs — Designed by Parsons,
 * Delivered by ISDI.", which is the ISDI homepage's Postgraduate tab. Its two
 * `.program-card`s are that tab's cards field for field — same titles, durations, career
 * pathways (the homepage's own "System DesignerDesign Researcher" run-on included),
 * images, colours and hrefs — so they are re-exported rather than transcribed twice.
 *
 * The only difference is the `aria-label`: the homepage authors "ISDI Home" on the M.Des
 * card's icon button and this page authors none, so it is dropped here and `ProgramCard`
 * names the link from the card's own title instead.
 *
 * `$title` and `$description` are the site defaults, as on the Undergraduate Overview.
 */
import { isdiPrograms } from './homeContent';

export { isdiPgHero } from './programs-pg/hero';
export { isdiPgWhy } from './programs-pg/why';
export { isdiPgLocation } from './programs-pg/location';
export { isdiPgLaunch } from './programs-pg/launch';
export { isdiPgLogos } from './programs-pg/logos';
export { isdiPgWorld } from './programs-pg/world';
export { isdiPgMinors } from './programs-pg/minors';
export { isdiPgFaq } from './programs-pg/faq';
export { isdiAboutSearch } from './aboutContent';

/* ref .head-wrap > .container > .t-title (.sub-heading + h2.h2-tag.mrg24.isdi) */
export const isdiPgProgramsSection = {
  sub: 'Our Programs',
  heading: 'Designed by Parsons, Delivered by ISDI.',
  cards: isdiPrograms.pg.map(({ ariaLabel, ...card }) => card),
};
