import { hero, programList, search, faq } from '@/lib/lawPolicyContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/ug/programs-list-law-and-policy — port of
 * `reference/programs/ug/programs-list-law-and-policy.php`, the fifth of the
 * six children of /programs/ug-programs-atlas.
 * `$css = "…690c3a7d32aa2b65c20f8a60-b041f4c74.css"`; `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        13
 *    2  one BBA LL.B. (Hons.) entry             ProgramList        20
 *    3  the AI-search panel                     SearchQuestion     76
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * The smallest page in the set — a single entry — and the first with **no new
 * assets at all**: its hero is the same CDN file
 * /programs/programs-list-integrated uses (SHA-1 equal), so that file now lives
 * under a neutral name and both pages point at it. No new component and no new
 * capability either; `withBreaks` on the eligibility value, added for
 * /programs/ug/programs-list-cs-ai-ml-and-ds, covers the `<br />` in
 * "Minimum 50% in<br />Class XII".
 *
 * ── This page and the integrated page overlap almost completely ───────────
 * Same programme (BBA LL.B. (Hons.)), same "Explore Program" href, same hero
 * photograph, and the same brochure: `[data-id="law"]` over a 580px iframe
 * popup on CRM widget `6a3e7d3ba1fd0680c6c1ba90` at `height="621"`, with the
 * same `utm_*` forwarding script. Only the eligibility strip differs — this one
 * is a single-value strip with much longer copy.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - The brochure anchor carries `id="law"` as well as the `data-id` the
 *    listener binds to. Only the `data-id` does any work; no id is emitted.
 *  - `faq.php` has a branch for `https://atlasuniversity.edu.in/schools/law/`
 *    (master 4), but it tests `$fullUrl`, which here is a `/programs/` URL — so
 *    even the law page falls through to `else` and renders master 1, the ISDI
 *    set. Transcribed as the reference renders it.
 *  - The entry repeats the `.code-button` script inline; one behaviour, already
 *    folded into `ButtonRegular`'s measured 14px.
 */
export const metadata = {
  title: 'Law and Policy Programs in Mumbai',
  description:
    'Want to study law and policy? Explore legal careers, specializations, course options and apply now for admissions.',
};

export default function LawPolicyProgramsPage() {
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
