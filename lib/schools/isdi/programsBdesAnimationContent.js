/*
 * Content for /schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming —
 * reference/schools/isdi/programs/undergraduate/b-des/b-des-in-animation-&-vfx-&-gaming.php,
 * transcribed from the page production renders, one module per block under
 * ./programs-bdes/animation. The same twelve blocks as the Accessory Design & Craft page, so
 * every component is reused and only the data differs.
 *
 * Every asset path is local; the only remote URLs are the reference's own integrations (the two
 * brochure widgets, the Student Voices YouTube link and the fee-structure flipbook).
 *
 * The page ships its own copy of the two brochure popups, and they carry the same CRM and
 * NoPaperForms widget ids the Accessory page's do. The "More questions?" panel is the same
 * include the About page carries.
 */
export { isdiBdesAnimationHero, isdiBdesAnimationBrochures } from './programs-bdes/animation/hero';
export { isdiBdesAnimationStats } from './programs-bdes/animation/stats';
export { isdiBdesAnimationProgram } from './programs-bdes/animation/program';
export { isdiBdesAnimationAdmissions } from './programs-bdes/animation/admissions';
export { isdiBdesAnimationEligibility } from './programs-bdes/animation/eligibility';
export { isdiBdesAnimationWhy } from './programs-bdes/animation/why';
export { isdiBdesAnimationExecution } from './programs-bdes/animation/execution';
export { isdiBdesAnimationProjects } from './programs-bdes/animation/projects';
export { isdiBdesAnimationVoices } from './programs-bdes/animation/voices';
export { isdiBdesAnimationBanner } from './programs-bdes/animation/banner';
export { isdiBdesAnimationFaq } from './programs-bdes/animation/faq';
import { isdiAboutSearch } from './aboutContent';

/*
 * The same `more-questions.php` include every ISDI page carries, but this page puts an
 * `h2.h2-tag.mrg16.isdi` above it — the FAQ's heading, repeated. The panel itself is
 * byte-identical to the About page's, so only the heading is added here.
 */
export const isdiBdesAnimationSearch = {
  ...isdiAboutSearch,
  heading: 'Questions? We can read your mind',
};
