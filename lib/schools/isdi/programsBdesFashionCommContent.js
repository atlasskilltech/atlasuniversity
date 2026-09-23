/*
 * Content for /schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling —
 * reference/schools/isdi/programs/undergraduate/b-des/b-des-in-fashion-communication-&-styling.php, transcribed
 * from the page production renders, one module per block under ./programs-bdes/fashion-communication. The
 * same twelve blocks as the other four B.Des pages, so every component is reused and only the
 * data differs.
 *
 * Every asset path is local; the only remote URLs are the reference's own integrations (the two
 * brochure widgets — the same pair the other B.Des pages open — the four Student Voices YouTube
 * links and the fee-structure flipbook). The Student Voices clips really are the Accessory page's
 * files: both pages cite the same `b-des-communication-design/student-voices/` URLs.
 *
 * Its "More questions?" block carries the `h2` heading above the panel, as the Animation page's
 * does.
 */
export { isdiBdesFashionCommHero, isdiBdesFashionCommBrochures } from './programs-bdes/fashion-communication/hero';
export { isdiBdesFashionCommStats } from './programs-bdes/fashion-communication/stats';
export { isdiBdesFashionCommProgram } from './programs-bdes/fashion-communication/program';
export { isdiBdesFashionCommAdmissions } from './programs-bdes/fashion-communication/admissions';
export { isdiBdesFashionCommEligibility } from './programs-bdes/fashion-communication/eligibility';
export { isdiBdesFashionCommWhy } from './programs-bdes/fashion-communication/why';
export { isdiBdesFashionCommExecution } from './programs-bdes/fashion-communication/execution';
export { isdiBdesFashionCommProjects } from './programs-bdes/fashion-communication/projects';
export { isdiBdesFashionCommVoices } from './programs-bdes/fashion-communication/voices';
export { isdiBdesFashionCommBanner } from './programs-bdes/fashion-communication/banner';
export { isdiBdesFashionCommFaq } from './programs-bdes/fashion-communication/faq';
import { isdiAboutSearch } from './aboutContent';

/*
 * The same `more-questions.php` include, with the `h2.h2-tag.mrg16.isdi` this page puts above it
 * — the FAQ's heading, repeated, exactly as on the Animation page.
 */
export const isdiBdesFashionCommSearch = {
  ...isdiAboutSearch,
  heading: 'Questions? We can read your mind',
};
