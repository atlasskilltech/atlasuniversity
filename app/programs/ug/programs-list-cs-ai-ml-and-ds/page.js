import { hero, programList, search, faq } from '@/lib/csAiMlContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/programs-list-cs-ai-ml-and-ds — port of
 * `reference/programs/ug/programs-list-cs-ai-ml-and-ds.php`, the fourth of the
 * six children of /programs/ug-programs-atlas.
 * `$css = "…690c3a5b10605173246c8369-b041f4c74.css"`; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        13
 *    2  the three B.Tech entries                ProgramList        20
 *    3  the AI-search panel                     SearchQuestion    163
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * No new component. Two things it exercises that no earlier Programs page did:
 *
 *  - **An eligibility value carries an authored `<br /><br />`.** The A-Levels
 *    cell breaks its second value in two with a blank line between, so
 *    `ProgramList` runs values through `withBreaks` — a no-op on the pages
 *    before it. Every cell holds two values, as on the commerce page, but the
 *    entry bar is back to 50%.
 *  - **The brochure is a live NoPaperForms widget, not an iframe.** Its
 *    `.npf_wgts` div is really in the markup rather than commented out, so
 *    `emwgts.js` has something to fill. Verified on production: opening it
 *    loads a 760x700 form from four npfs.co / nopaperforms.com hosts. This is
 *    the second live `npf` popup in the port, after
 *    /programs/programs-list-integrated's B.Tech + MBA one.
 *
 * That second point is also what surfaced two misses in the already-shipped
 * /programs/programs-list-integrated — see `BrochureModal`: the npf popup's
 * panel is 90% wide / max 800 / 80% tall rather than the iframe popups' 580,
 * and the close button's `line-height` is not uniform across the five popups.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - All three brochure anchors carry `id="btech"` as well as the `data-id`
 *    the listener binds to. Only the `data-id` does any work; no id is emitted.
 *  - The FAQ include renders the **ISDI** set on this B.Tech page, by the same
 *    `else` fallback the other children take.
 *  - Each entry repeats the `.code-button` script inline; one behaviour,
 *    already folded into `ButtonRegular`'s measured 14px.
 *  - The last two "Explore Program" hrefs contain a literal `&`; the first
 *    does not. Transcribed as authored.
 */
export const metadata = {
  title: 'CS, AI, ML & Data Science Programs in Mumbai– ATLAS',
  description:
    'Explore B.Tech in AI, ML, robotics, IT, data science, cybersecurity, coding, engineering tools and future-tech career programs.',
};

export default function CsAiMlProgramsPage() {
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
