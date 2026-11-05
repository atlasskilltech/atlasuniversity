import { hero, programList, search, faq } from '@/lib/pgDigitalTechContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/pg/pg-digital-and-emerging-technologies-in-business — port of
 * `reference/programs/pg/pg-digital-and-emerging-technologies-in-business.php`,
 * the second of the three children of /programs/pg-programs-atlas and the
 * longest file in the Programs set at 451 lines — almost all of it the three
 * popups. `$css = "…690ca661e0ef9a16af2bdaf2-b041f4c74.css"`;
 * `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        12
 *    2  three entries                           ProgramList        19
 *    3  the AI-search panel                     SearchQuestion    154
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * ── Every entry has its own popup and its own strip ───────────────────────
 * Three separate NoPaperForms widgets and strips of three, one and three rows.
 * Two of the widgets are shared with other pages (`20bba9a4…` with
 * /programs/pg/pg-business-and-management, `1dd30518…` with the CS/AI and
 * AI & Technology pages); `425806c8…` is this page's own. `ProgramList` already
 * took both per-entry, so no new capability was needed for that.
 *
 * ── One value is rich, and it is the fifth `<strong>` trap ────────────────
 * "Entrance Exams (MBA)" authors text, `<br>`, `<strong>`, `<br>`, `<strong>`,
 * text in a single `.df-text-1.f18`. `ProgramList` gained a value form that is
 * an array of runs — a string is text, `{strong}` is bold — and renders the
 * `<strong>` with an explicit `font-bold`: the cell is already
 * `font-weight: 700`, Webflow's normalize gives `strong` a flat `bold` so the
 * reference paints 700 (measured), and Preflight's relative `bolder` would
 * resolve that to **900**.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - Each brochure anchor carries an `id` duplicating its `data-id`.
 *  - The second entry's Undergraduate Qualification cell ends with an authored
 *    `<br /><br />` the other two copies of the same row do not have.
 *    Transcribed, because it is two real empty lines of card height.
 *  - The FAQ include renders the **ISDI** set, by the same `else` fallback
 *    every /programs/ page takes.
 *  - The third "Explore Program" href contains a literal `&`.
 *  - The hero's `sizes` attribute is `(max-width: 1439px) 100vw,
 *    1365.9896240234375px`, unlike every other Programs hero's 1366/1366.
 */
export const metadata = {
  title: 'Postgraduate Digital & Emerging Tech Programs in Mumbai – ATLAS ISME',
  description:
    'Discover postgraduate programs focused on AI, ML, data science and emerging technologies that equip students with advanced technical and analytical skills.',
};

export default function PgDigitalTechProgramsPage() {
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
