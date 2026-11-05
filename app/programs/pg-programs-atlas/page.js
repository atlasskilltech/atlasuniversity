import { hero, programs, search, faq } from '@/lib/pgProgramsContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramCards from '@/components/Programs/ProgramCards';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/pg-programs-atlas — port of
 * `reference/programs/pg-programs-atlas.php`, the second Programs page.
 * `$css = "…690c40856b095376f162c1b1-10a901f9d.css"`, its own sheet;
 * `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order, and structurally identical to
 * /programs/ug-programs-atlas:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero       60
 *    2  Find the Program That Fits Your         ProgramCards      77
 *       Ambition — three discipline cards
 *    3  the AI-search panel                     SearchQuestion   154
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * **Nothing new was written for this page.** Every component, including the two
 * added for /programs/ug-programs-atlas, took it as data. The page's own
 * `<style>` block is byte-identical to that page's, and the hero photograph is
 * byte-identical too — which is why it now lives at
 * `/assets/images/programs/hero/programs-hero.png` rather than under a
 * UG-specific name.
 *
 * ── What differs from /programs/ug-programs-atlas ────────────────────────
 *   hero          the title only; same image, same single `.btn-ca`.
 *   cards         three rather than six, and two of them needed component
 *                 work that the UG page never exercised:
 *                   - "Business & Management" wraps its title in a `<strong>`.
 *                     The heading is already `font-weight: 700` and Webflow's
 *                     normalize gives `strong` a flat `bold`, so the reference
 *                     paints 700 — but Preflight's `strong { font-weight:
 *                     bolder }` resolves against the 700 parent and would render
 *                     **900**. Measured on the reference: 700. Hence
 *                     `card.titleStrong` and an explicit `font-bold`.
 *                   - "Digital & Emerging Technologies in Business" carries an
 *                     authored `<br />` in **both** its title and its lead, so
 *                     `ProgramCards` now runs both through `withBreaks`. That is
 *                     a no-op on the UG page, none of whose copy is broken —
 *                     the same trap `Advantages/Electives` already records.
 *   `$body`       `body-isme` rather than `body atlas-page`, which measures
 *                 identically (16px/24 Manrope, #333), as /life-at-atlas
 *                 already found.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - The card links are authored relative (`pg/pg-business-and-management`), so
 *    they resolve against `/programs/`; written absolute here.
 *  - `$arrow = "law-down-arrow.svg"` is assigned before the FAQ include for the
 *    fifth time in this rebuild and is never read.
 */
export const metadata = {
  title: 'Postgraduate Admissions & Programs in Mumbai – ATLAS ISME',
  description:
    'Find postgraduate admission details, course lists, eligibility, application process and career outcomes for masters and specialized programs.',
};

export default function PgProgramsPage() {
  return (
    <>
      <ProgramHero hero={hero} />
      <ProgramCards data={programs} />

      {/* ref div.section > .container > more-questions.php */}
      <div className={SECTION}>
        <div className={CONTAINER}>
          <SearchQuestion data={search} />
        </div>
      </div>

      <FAQ data={faq} />
    </>
  );
}
