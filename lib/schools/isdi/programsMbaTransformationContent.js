/*
 * Content for /schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation —
 * reference/schools/isdi/programs/postgraduate/mba/mba-design-led-strategy-&-transformation.php,
 * the MBA the header menu links as "Design Management and Strategy (2 Years)".
 *
 * ⚠ UPSTREAM DISCREPANCY (do NOT "fix" — flagged in MIGRATION-ISDI.md for confirmation): the
 * reference is a HALF-FINISHED copy of the B.Tech Design Engineering page. Diffed line-by-line
 * against `programs/undergraduate/btech/btech-design-engineering.php`, the two are 96% identical
 * (3296/3378 lines), and the page carries B.Tech content under an MBA title — its Duration reads
 * "4-Year Degree - B.Tech." (an MBA is two years), its curriculum is FOUR years / eight semesters,
 * its eligibility is Class-XII / Maths-based, its curriculum intro literally says "The B.Tech
 * Design Engineering program is a four-year degree…", and its "Why" heading reads "Why our Year 4
 * outpaces every other design school?". All of this is transcribed AS AUTHORED, not corrected or
 * invented, and verified against production (which serves exactly this).
 *
 * The page's genuinely own content (vs Design Engineering): the hero (title "Design Management
 * and Strategy", its own three photographs, a live deadline, and the Accessory brochure set), the
 * middle stats figure, the "Admissions — The Design Way" band, the (short-form) eligibility
 * groups, the "Why" stack copy + its default (un-pinned) heights, and the one-word curriculum
 * intro. Everything else is byte-identical to Design Engineering and is re-exported from it; the
 * brochures are the Accessory page's (CRM iframe 6a3e5980 + NoPaperForms 42f152a6).
 */
import { isdiBtechDesignEngProgram } from './programs-btech/design-engineering/program';

export { isdiMbaTransformationHero } from './programs-mba/transformation/hero';
export { isdiMbaTransformationStats } from './programs-mba/transformation/stats';
export { isdiMbaTransformationAdmissions } from './programs-mba/transformation/admissions';
export { isdiMbaTransformationEligibility } from './programs-mba/transformation/eligibility';
export { isdiMbaTransformationWhy } from './programs-mba/transformation/why';

/*
 * The programme tab set + curriculum, re-used from Design Engineering with ONE change: the
 * Overview pane's intro reads "The B.Tech Design Engineering program…" here (the upstream
 * copy-paste tell) where Design Engineering reads "The Design Engineering program…". Applied as a
 * transform of DE's own text so the rest of the (identical) curriculum cannot drift.
 */
export const isdiMbaTransformationProgram = {
  ...isdiBtechDesignEngProgram,
  panes: isdiBtechDesignEngProgram.panes.map((p, i) =>
    i === 0 && p.kind === 'text'
      ? { ...p, text: p.text.replace('The Design Engineering program', 'The B.Tech Design Engineering program') }
      : p
  ),
};

// re-exports — byte-identical to the B.Tech Design Engineering page (verified: no diff in these blocks)
export { isdiBtechDesignEngExecution as isdiMbaTransformationExecution } from './programs-btech/design-engineering/execution';
export { isdiBtechDesignEngProjects as isdiMbaTransformationProjects } from './programs-btech/design-engineering/projects';
export { isdiBtechDesignEngVoices as isdiMbaTransformationVoices } from './programs-btech/design-engineering/voices';
export { isdiBtechDesignEngBanner as isdiMbaTransformationBanner } from './programs-btech/design-engineering/banner';
export { isdiBtechDesignEngFaq as isdiMbaTransformationFaq } from './programs-btech/design-engineering/faq';

// the Accessory page's brochure set (CRM iframe 6a3e5980 + NoPaperForms 42f152a6), as this page authors
export { isdiBdesAccessoryBrochures as isdiMbaTransformationBrochures } from './programs-bdes/accessory/hero';

export { isdiAboutSearch } from './aboutContent';
