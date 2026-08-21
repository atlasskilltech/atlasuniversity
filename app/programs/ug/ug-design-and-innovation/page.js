import { hero, programList, search, faq } from '@/lib/designInnovationContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/ug-design-and-innovation — port of
 * `reference/programs/ug/ug-design-and-innovation.php`, the first of the six
 * children of /programs/ug-programs-atlas.
 * `$css = "…690be2baaa3f88fcc6816657-bac7acda2.css"`, a sheet of its own;
 * `$body = "body atlas-page"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        12
 *    2  the seven B.Des entries                 ProgramList        19
 *    3  the AI-search panel                     SearchQuestion    340
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * Nothing on this page is a new shape: it is /programs/programs-list-integrated
 * with seven entries instead of two and no hero buttons. Every measured value
 * of `.program-list` — the 32px heading, the auto-margin button row, the
 * `.df-card` strip and all of its breakpoints — is identical on the two
 * references, so `ProgramList` is reused verbatim and only its data differs.
 *
 * ── Two things this page does that its siblings do not ────────────────────
 * The heading carries an authored `<br>`; `ProgramHero` runs the title through
 * `withBreaks`, which is a no-op on the three pages above it.
 *
 * All seven "Download Brochure" buttons share **one** popup rather than owning
 * one each, so the brochure travels on the section. It is the same live
 * third-party CRM embed the integrated page carries, at `height="650"` and
 * with no `utm_*` forwarding — and its NoPaperForms half is commented out
 * upstream, so the `emwgts.js` the reference still fetches is not reproduced.
 * See `BrochureModal` for the reasoning and for how to remove the integration.
 *
 * ── The FAQ is database-driven ────────────────────────────────────────────
 * This page's include is `assets/include/faq.php`, not a page-specific file:
 * it queries `z_atlas_faq_master` and this page falls through to the `else`
 * branch, so it renders master 1 — the ISDI set, 24 questions. The local mirror
 * has no database handle, so the include fatals there and the copy is
 * transcribed from production instead.
 *
 * Its answers are the first on the site with real structure — bulleted and
 * numbered lists, and every text node wrapped in `<strong>`. `FAQ` grew a block
 * renderer for that; a plain string is still a paragraph, so no earlier page
 * changed. Two of the 24 questions are the same sentence with different
 * answers, which is the database's own duplication and is transcribed as
 * authored.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - All seven brochure anchors carry `id="download-brochure"` as well as the
 *    `data-id` the listener binds to, so the page authors the same DOM id seven
 *    times. Only the `data-id` does any work; no id is emitted here.
 *  - Each entry repeats the `.code-button` script inline. It is a single
 *    behaviour (`.button-text` takes its `data-font-size`), already folded into
 *    `ButtonRegular`'s measured 14px.
 *  - The `<h1>` is the page's only one, and no stylesheet rule keys off the tag.
 */
export const metadata = {
  title: 'Design & Innovation Programs in Mumbai – ATLAS',
  description:
    'Looking for creative PG courses? Explore design innovation, communication design, fashion, interior, UX, projects and industry-focused learning.',
};

export default function DesignInnovationProgramsPage() {
  return (
    <>
      <ProgramHero hero={hero} />
      <ProgramList data={programList} />

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
