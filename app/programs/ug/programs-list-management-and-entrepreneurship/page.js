import { hero, programList, search, faq } from '@/lib/managementContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/programs-list-management-and-entrepreneurship — port of
 * `reference/programs/ug/programs-list-management-and-entrepreneurship.php`,
 * the second of the six children of /programs/ug-programs-atlas.
 * `$css = "…690c3a1211f795498409636b-f36eae935.css"`; `$body = "body body-ugdx"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        12
 *    2  the four BBA Hons. entries              ProgramList        19
 *    3  the AI-search panel                     SearchQuestion    206
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * Structurally this is /programs/ug/ug-design-and-innovation with four entries
 * instead of seven, so nothing was written for it: every component took it as
 * data. The page declares a different `$css` and a different `$body`
 * (`body body-ugdx` against `body atlas-page`) and neither changes a single
 * measured value — the hero, the entries, the strip and the search panel are
 * identical on the two references at 1440 / 768 / 390.
 *
 * The one capability it added is `withBreaks` on the entry title: the first
 * entry breaks after "Marketing/Finance". A no-op on the pages that came
 * before it, which author no `<br>` in a `.h3-tag-bold`.
 *
 * ── The brochure popup ────────────────────────────────────────────────────
 * All four buttons carry `[data-id="bba-brochure"]` and open one shared
 * overlay holding a CRM iframe at `height="650"`, with no `utm_*` forwarding —
 * the same shape as the design page's, a different widget id. Its `.npf_wgts`
 * div is commented out upstream too, so the `emwgts.js` the reference still
 * fetches on click is again not reproduced. See `BrochureModal`.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - All four brochure anchors carry `id="bba-brochure"` as well as the
 *    `data-id` the listener binds to — the same DOM id four times. Only the
 *    `data-id` does any work; no id is emitted.
 *  - The FAQ include renders the **ISDI** set on this management page, because
 *    its `$domain`/`$fullUrl` test never matches a /programs/ URL and it falls
 *    through to `else`. Transcribed as the reference renders it.
 *  - Each entry repeats the `.code-button` script inline; one behaviour,
 *    already folded into `ButtonRegular`'s measured 14px.
 */
export const metadata = {
  title: 'Management Entrepreneurship Programs in Mumbai',
  description:
    'Searching for management or entrepreneurship courses? Build business skills, leadership mindset, career growth. Apply today.',
};

export default function ManagementProgramsPage() {
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
