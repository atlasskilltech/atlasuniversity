import { hero, programList, search, faq } from '@/lib/aiTechnologyContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/programs-list-design-ai-and-technology — port of
 * `reference/programs/ug/programs-list-design-ai-and-technology.php`, the last
 * of the six children of /programs/ug-programs-atlas.
 * `$css = "…690c3aa511a0eea4dff18991-b041f4c74.css"`; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        13
 *    2  two entries                             ProgramList        20
 *    3  the AI-search panel                     SearchQuestion    126
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * ── Its two entries differ in both halves ─────────────────────────────────
 * No earlier Programs page does this. Each entry carries its own brochure
 * popup *and* its own eligibility strip:
 *
 *   B.Tech (IT, AI & Cybersecurity)   `[data-id="btech"]`, a live NoPaperForms
 *                                     widget (the same `1dd30518…` the CS/AI
 *                                     page uses), and a strip with two values
 *                                     in every cell
 *   BBA (Hons) in AI & Emerging Tech  `[data-id="bba-brochure"]`, a 580px CRM
 *                                     iframe (the same `6a3e788e…` the
 *                                     management page uses), and a strip with
 *                                     one value per cell
 *
 * `ProgramList` already took a per-entry `brochure`; it now also takes a
 * per-entry `eligibilityRows`, falling back to the section's. Every earlier
 * page repeats one strip verbatim under every entry, so nothing changed there.
 *
 * ── One more thing every `npf` popup declares ─────────────────────────────
 * `.npf_wgts { height: 700px }` and `#npf-popup-btech iframe { height: 100% }`
 * are on this page, the CS/AI page and /programs/programs-list-integrated
 * alike. `BrochureModal` now pins both, so the container holds its height
 * before the widget script arrives rather than collapsing to zero.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - Both brochure anchors carry an `id` duplicating their `data-id`. Only the
 *    `data-id` does any work; no id is emitted.
 *  - The page's own heading is "AI & Technology", while the card linking here
 *    from /programs/ug-programs-atlas reads "Design, AI & Technology" and the
 *    file is named for the longer form. Transcribed as the page renders it.
 *  - The FAQ include renders the **ISDI** set, by the same `else` fallback the
 *    other children take.
 *  - The first "Explore Program" href contains a literal `&`.
 */
export const metadata = {
  title: 'Design AI Technology Programs in Mumbai – ATLAS',
  description:
    'Looking for design, AI and tech programs? Explore future-ready courses, skills, careers and apply now for top industry‑driven learning.',
};

export default function AiTechnologyProgramsPage() {
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
