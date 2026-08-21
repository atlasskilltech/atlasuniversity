import { hero, programs, search, faq } from '@/lib/ugProgramsContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramCards from '@/components/Programs/ProgramCards';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug-programs-atlas — port of
 * `reference/programs/ug-programs-atlas.php`, the first real page of the
 * Programs section. `$css = "…690c385d74f21f5b886067df-b6470bca6.css"` — the
 * same sheet /advantages/atlas-advantages uses, not a new one; `$body =
 * "body atlas-page"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero       60
 *    2  Find the Program That Fits Your         ProgramCards      78
 *       Ambition — six discipline cards
 *    3  the AI-search panel                     SearchQuestion   224
 *       (assets/include/more-questions.php)
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * **This reference renders end to end** — it opens no database connection, so
 * unlike the three Admissions pages `curl` returns the whole document. It was
 * still measured against production, because the local mirror is in quirks mode
 * (`assets/include/dynamic.php` emits a PHP warning before `<!doctype>`) and
 * this hero is built out of percentage offsets that quirks mode resolves
 * differently.
 *
 * ── What is new and what is shared ────────────────────────────────────────
 * Two components are new, both in `components/Programs/` and both `data`-driven
 * because `pg-programs-atlas.php` and `programs-list-integrated.php` carry the
 * same two blocks with their own copy:
 *
 *   ProgramHero    `.inner-header-wrapper.full-ht`. Deliberately *not* a
 *                  variant of `ui/InnerPageHero` — the scrim covers half the
 *                  frame rather than three quarters, its gradient, padding and
 *                  content box all differ, and it holds a bare `.container`
 *                  rather than an 840px text column.
 *   ProgramCards   `.common-flex-16-wrap` over six `.pg-card-ugdx`.
 *
 * Everything else is reuse: `SecondaryButton` (`atlas`, the 12px/700 pill),
 * `PrimaryButton`'s `atlas-576` — the `.btn-ca` shape this page declares in its
 * own `<style>` exactly as /admissions/ug-admissions does — `SearchQuestion`,
 * which is the same `more-questions.php` include with the same variant and the
 * same text, and `FAQ`.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - The sixth card, "Design, AI & Technology", repeats the Law & Policy card's
 *    entire description and its third key area verbatim, and its button reads
 *    "AI & Technology" while its heading reads "Design, AI & Technology".
 *    Upstream copy-paste; transcribed as authored.
 *  - Every card's key-area list ends with three empty `<div class="pg-list">`
 *    elements. They are rendered: zero-height, but still flex children of a
 *    `gap: 8px` row.
 *  - The card links are authored relative (`ug/ug-design-and-innovation`), so
 *    they resolve against `/programs/`. They are written absolute here.
 *  - `$arrow = "law-down-arrow.svg"` is assigned before the FAQ include for the
 *    fourth time in this rebuild and is never read — the include hard-codes
 *    `atlas-down-arrow.svg` in its own `<style>`.
 */
export const metadata = {
  title: 'Admissions & Program List – ATLAS SkillTech University',
  description:
    'Find program overviews, eligibility, application instructions and intake dates for undergraduate and postgraduate admissions across schools.',
};

export default function UgProgramsPage() {
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
