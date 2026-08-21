import { hero, programList, search, faq } from '@/lib/integratedProgramsContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/programs-list-integrated — port of
 * `reference/programs/programs-list-integrated.php`, the third and last
 * top-level Programs page. `$css = "…6915c922306a4c1a22aed039-b041f4c74.css"`,
 * its own sheet; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero       59
 *    2  the two integrated programmes           ProgramList       76
 *    3  the AI-search panel                     SearchQuestion   174
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * The hero is the same component the other two Programs pages use, with its own
 * photograph. Everything below it is a shape neither of them has: a stacked
 * list rather than a card grid, each entry pairing a programme name with a row
 * of three buttons and an "Eligibility Criteria" strip.
 *
 * ── The two brochure modals are real, and they are third-party ────────────
 * Each "Download Brochure" is authored `href="#"` with a `data-id`, and the foot
 * of the page carries a hidden overlay plus a listener bound to it. Both fire:
 * verified on production, clicking the Law button sets its overlay to
 * `display: flex` and reveals a 580x667 panel holding the form.
 *
 * They are reproduced rather than flattened, because a dead "Download Brochure"
 * button is not the page. That means the port carries the reference's own two
 * form providers — an `<iframe>` to `crm.atlasskilltech.app` and a NoPaperForms
 * widget whose script is injected on first open. Those are the **only** remote
 * URLs in the whole Programs port; no image, font or media travels over them,
 * and nothing loads until a visitor opens a modal. See `ProgramCards`'
 * sibling `BrochureModal` for the detail. **If that integration is not wanted in
 * the rebuild, deleting `BrochureModal` and rendering a plain button in its
 * place is the whole change** — nothing else depends on it.
 *
 * A third overlay, `#btechint-popup-overlay`, is bound to
 * `[data-id="btech-integrated"]`, which matches no element on the page —
 * confirmed on production. Not ported.
 *
 * ── Reference notes ───────────────────────────────────────────────────────
 *  - Both `.btn-primary`s carry the same variant class
 *    (`w-variant-6b63810f…`) even though one's
 *    `data-wf--button-primary--variant` reads "law" and the others read
 *    "outline-medium". The attribute is inert; the class is what the sheet keys
 *    off, so all four render identically.
 *  - "Apply Now" is authored with a trailing space, and its `.button-text`
 *    carries `data-font-size="14"` — which the `.code-button` script really does
 *    apply here, unlike /life-at-atlas where the same attribute is empty.
 *  - The second entry's "Explore Program" href contains a literal `&`
 *    (`…integrated-b-tech-in-cs-ai-ml-&-mba`); transcribed as authored.
 *  - Both entries' eligibility strips are word-for-word identical, so the rows
 *    are hoisted into `programList.eligibilityRows`.
 */
export const metadata = {
  title: 'Integrated Programmes & Pathways in Mumbai  – ATLAS SkillTech University',
  description:
    'Browse integrated program listings, degree options and combined curriculum structures that offer accelerated pathways from undergraduate to postgraduate levels.',
};

export default function IntegratedProgramsPage() {
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
