import { hero, programList, search, faq } from '@/lib/pgBusinessContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/pg/pg-business-and-management — port of
 * `reference/programs/pg/pg-business-and-management.php`, the first of the
 * three children of /programs/pg-programs-atlas.
 * `$css = "…690ca5981a1c3e64264150c0-dc966e54d.css"`; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        13
 *    2  the three MBA entries                   ProgramList        20
 *    3  the AI-search panel                     SearchQuestion    138
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * The same four blocks as the six UG children, so nothing was written for it
 * and no capability was added. Two things are its own:
 *
 *  - **The eligibility strip is a single row.** No A-Levels or IB cell and no
 *    `.df-card.top` anywhere on the page — just one long postgraduate
 *    criterion, which stretches the value cell to 972px at 1440.
 *  - **The hero is byte-identical to the UG management page's** (SHA-1 equal;
 *    the CDN serves it as `designnnn.png` here and `heeeroooo.png` there), so
 *    it is reused rather than downloaded a second time. **This page adds no new
 *    asset at all.**
 *
 * It also loads a different webflow bundle (`webflow.8ad64a2e…`) from the six
 * UG children's `webflow.ee913841…`. Nothing depends on it — the page uses no
 * IX2 interaction.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - All three brochure anchors carry `id="mba-brochure"` as well as the
 *    `data-id` the listener binds to. Only the `data-id` does any work; no id
 *    is emitted.
 *  - The FAQ include renders the **ISDI** set on this MBA page, by the same
 *    `else` fallback every /programs/ page takes.
 *  - Each entry repeats the `.code-button` script inline; one behaviour,
 *    already folded into `ButtonRegular`'s measured 14px.
 */
export const metadata = {
  title: 'Postgraduate Business & Management Programs in Mumbai – ATLAS ISME',
  description:
    'Explore postgraduate programs in business and management covering finance, marketing, analytics, entrepreneurship and leadership tracks for career growth.',
};

export default function PgBusinessProgramsPage() {
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
