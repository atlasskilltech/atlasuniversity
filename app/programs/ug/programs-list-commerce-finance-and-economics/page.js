import { hero, programList, search, faq } from '@/lib/commerceFinanceContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/programs-list-commerce-finance-and-economics — port of
 * `reference/programs/ug/programs-list-commerce-finance-and-economics.php`, the
 * third of the six children of /programs/ug-programs-atlas.
 * `$css = "…690c3a30f41551ec9be9a6ec-b041f4c74.css"`; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        12
 *    2  the two B.Sc. (Hons.) entries           ProgramList        19
 *    3  the AI-search panel                     SearchQuestion    124
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * The same four blocks as the two UG children before it, so no component was
 * written for it. One capability was added: **an eligibility cell may hold more
 * than one value.** Every criterion here carries a second `.df-text-1.f18` line
 * with a mathematics requirement, and the entry bar is 60% rather than the 50%
 * every other Programs page asks for. `ProgramList` takes `values[]`, with
 * `value` kept as the single-line shorthand the earlier pages use.
 *
 * ── The brochure popup ────────────────────────────────────────────────────
 * Both buttons carry `[data-id="bba-brochure"]` — the same `data-id` the
 * management page uses, pointing at a different widget — and open one shared
 * overlay holding a CRM iframe at `height="650"`, with no `utm_*` forwarding.
 *
 * This popup has **no `.npf_wgts` div at all**, not even a commented-out one,
 * and no `#npf-container` wrapper: it is the iframe alone. Its script still
 * injects `emwgts.js` on click, which therefore still has nothing to fill, so
 * that injection is again not reproduced. See `BrochureModal`.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - Both brochure anchors carry `id="bba-brochure"` as well as the `data-id`
 *    the listener binds to. Only the `data-id` does any work; no id is emitted.
 *  - The FAQ include renders the **ISDI** set on this commerce page, by the
 *    same `else` fallback the other children take.
 *  - Each entry repeats the `.code-button` script inline; one behaviour,
 *    already folded into `ButtonRegular`'s measured 14px.
 *  - The second entry's href drops "hons" (`bsc-in-economics-and-data-analytics`)
 *    where the first keeps it. Transcribed as authored.
 */
export const metadata = {
  title: 'Commerce, Finance & Economics Programs in Mumbai – ATLAS',
  description:
    'Want to study commerce, finance or economics? Explore BBA, B.Sc Finance, business analytics, markets, accounting, strategy and career pathways.',
};

export default function CommerceFinanceProgramsPage() {
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
