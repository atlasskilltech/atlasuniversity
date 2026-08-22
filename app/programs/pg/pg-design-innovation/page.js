import { hero, programList, search, faq } from '@/lib/pgDesignInnovationContent';

import ProgramHero from '@/components/Programs/ProgramHero';
import ProgramList from '@/components/Programs/ProgramList';
import SearchQuestion from '@/components/About/SearchQuestion';
import FAQ from '@/components/Home/FAQ';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * /programs/pg/pg-design-innovation — port of
 * `reference/programs/pg/pg-design-innovation.php`, the third of the three
 * children of /programs/pg-programs-atlas and the **last page of the Programs
 * section**. `$css = "…690ca68dfe1f53093ba2c9b1-b041f4c74.css"`;
 * `$body = "body-isme"`.
 *
 * Four blocks, in the reference's order:
 *    1  hero .inner-header-wrapper.full-ht      ProgramHero        14
 *    2  one M.Des entry                         ProgramList        21
 *    3  the AI-search panel                     SearchQuestion     69
 *    4  Questions? We can read your mind        FAQ      faq include
 *
 * Nothing here is new: one entry, a two-row strip and a single NoPaperForms
 * popup, all of which `ProgramList` and `BrochureModal` already handle. Two
 * things it shares with pages already built, both proven rather than assumed:
 *
 *  - its hero is byte-identical to /programs/ug/programs-list-cs-ai-ml-and-ds's
 *    (all four sizes SHA-1 equal, served as `designnnandinnovation.png` here
 *    and `aimlatlasss.png` there), so the file is stored under a neutral name
 *    and both pages point at it — **this page adds no new asset**;
 *  - its brochure widget (`425806c8…`) is the one
 *    /programs/pg/pg-digital-and-emerging-technologies-in-business's MBA DMST
 *    entry uses, and its "Undergraduate Qualification" row is that page's copy
 *    word for word.
 *
 * ── Reference notes, none reproduced ──────────────────────────────────────
 *  - The brochure anchor carries `id="mdes-brochure"` as well as the `data-id`
 *    the listener binds to. Only the `data-id` does any work.
 *  - The heading authors a space before its `<br />`; kept in the transcription
 *    so the data reads as the source does, though HTML collapses it.
 *  - The entry title uses an en dash ("M.Des – Design Futures"), not a hyphen.
 *  - `faq.php` would have chosen master 1 for an ISDI page through its
 *    `$domain` branch anyway, but `$domain` is the site root here, so it
 *    arrives at the same set through the `else` fallback every /programs/ page
 *    takes.
 */
export const metadata = {
  title: 'Postgraduate Design & Innovation Programs in Mumbai  – ATLAS ISDI',
  description:
    'Study postgraduate design programs focusing on innovation, strategic design, research and creative leadership for advanced design careers.',
};

export default function PgDesignInnovationProgramsPage() {
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
