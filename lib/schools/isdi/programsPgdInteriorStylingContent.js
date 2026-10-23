/*
 * Content for /schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation —
 * reference/schools/isdi/programs/postgraduate-diploma/pg-interior-styling-&-space-curation.php,
 * transcribed from the page production renders, one module per block under
 * ./programs-pgd/interior-styling. The second and last Postgraduate Diploma page. The same
 * twelve-block template, so every component is reused and only the data differs — a single year
 * of two semesters, with electives in the first.
 *
 * Every asset path is local; the only remote URLs are the reference's own integrations (the two
 * brochure popups — the same CRM iframe and NoPaperForms widget its sibling opens). Only 12 of
 * its 168 references are new and it downloads no video of its own: like the Creative
 * Entrepreneurship page it borrows the B.Tech Design Engineering programme's curriculum media and
 * the B.Des Communication Design page's Faculty, Success Stories and Student Voices.
 *
 * Its FAQ is the page's own static include, and all seven of its questions are written for
 * COMMUNICATION DESIGN rather than for this programme — byte-identical to
 * `programs-bdes/communication/faq`, so that transcription is re-exported rather than duplicated.
 *
 * The "More questions?" panel is the bare include, as on the Accessory page (the Animation page is
 * the one that puts a heading above it).
 */
export { isdiPgdInteriorStylingHero, isdiPgdInteriorStylingBrochures } from './programs-pgd/interior-styling/hero';
export { isdiPgdInteriorStylingStats } from './programs-pgd/interior-styling/stats';
export { isdiPgdInteriorStylingProgram } from './programs-pgd/interior-styling/program';
export { isdiPgdInteriorStylingAdmissions } from './programs-pgd/interior-styling/admissions';
export { isdiPgdInteriorStylingEligibility } from './programs-pgd/interior-styling/eligibility';
export { isdiPgdInteriorStylingWhy } from './programs-pgd/interior-styling/why';
export { isdiPgdInteriorStylingExecution } from './programs-pgd/interior-styling/execution';
export { isdiPgdInteriorStylingProjects } from './programs-pgd/interior-styling/projects';
export { isdiPgdInteriorStylingVoices } from './programs-pgd/interior-styling/voices';
export { isdiPgdInteriorStylingBanner } from './programs-pgd/interior-styling/banner';
export { isdiBdesCommunicationFaq as isdiPgdInteriorStylingFaq } from './programs-bdes/communication/faq';
export { isdiAboutSearch } from './aboutContent';
