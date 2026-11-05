import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import { Runs } from './ui';

/**
 * "Built Around You — and the Industry You'll Lead"
 * (`atlas-isdi-advantage/industry-centric-approach.php`, block 3).
 *
 *   section.section > .container >
 *     (h2.h2-tag.mrg16.isdi, .sub-heading,
 *      .bl-card-wrapper-isme.isdi > .belief-cards-common >
 *        (.cards-cols-common > .inside-cards-common > 2 x .cards-inner-isme,
 *         .bl-cards-common.bg-5, .bl-cards-common.bg4))
 *
 * A four-cell indigo mosaic, each cell a number over a title. It shares
 * `.belief-cards-common` with /advantages/atlas-advantages' three-cell version but
 * not its grid, its children or its content, so it is this page's own.
 *
 * ── Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────
 *   .bl-card-wrapper-isme.isdi  mt56 (40 at <=767), r16, clipped
 *   .belief-cards-common        grid `828px 414px` at 1440 and `472px 236px` at 768
 *                               — i.e. a 2:1 split of the container — becoming a
 *                               `flex-wrap` row at <=479
 *   .cards-cols-common          col 1 row 1; holds a 2-column
 *                               `.inside-cards-common` of two 414px cells
 *   .bl-cards-common.bg-5       col 2, rows 1-2 -> 414 x 564
 *   .bl-cards-common.bg4        col 1, row 2  -> 828 x 263
 *   .number                     24px/1 600, pb8 pl24
 *   .card-title                 32px/1.2 500, px24 mb8; 16px/1.2 600 at <=767
 *
 * **A bare `1fr` is `minmax(auto, 1fr)`.** `.belief-cards-common` declares
 * `2fr minmax(200px, 1fr)`; with a plain `1fr` the second column's min-content
 * floor breaks the 2:1 split below about 1100px. The `minmax` is transcribed.
 *
 * Every cell's colour and vector wash come from the stylesheet, so all four
 * values travel as data.
 */
function Cell({ cell, className }) {
  return (
    /* ref .cards-inner-isme / .bl-cards-common */
    <div
      className={cx('relative flex flex-col justify-center text-white', className)}
      style={{
        backgroundColor: cell.background,
        backgroundImage: `url(${cell.image})`,
        backgroundSize: cell.size,
        backgroundPosition: cell.position,
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* ref .number */}
      <div className="pb-2 pl-6 text-[24px] font-semibold leading-none">{cell.num}</div>
      {/* ref .card-title */}
      <div className="mb-2 px-6 text-[32px] font-medium leading-[1.2] max-md:text-base max-md:font-semibold max-md:leading-[1.2]">
        {withBreaks(cell.title)}
      </div>
    </div>
  );
}

export default function BuiltAround({ data }) {
  const [first, second] = data.nested;
  const [tall, wide] = data.cells;

  return (
    /* ref section.section */
    <section data-block="built-around" className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>
          <Runs value={data.sub} />
        </div>

        {/* ref .bl-card-wrapper-isme.isdi */}
        <div className="mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          {/*
            * ref .belief-cards-common — a fixed **564px** grid of `2fr minmax(200px,
            * 1fr)` above 767, and a `flex-wrap` column of three full-width rows with
            * `height: auto` at and below it. A bare `1fr` would be
            * `minmax(auto, 1fr)` and the second column's min-content floor would
            * break the 2:1 split below about 1100px, so the `minmax` is transcribed.
            */}
          <div className="grid h-[564px] justify-center [grid-template-columns:2fr_minmax(200px,1fr)] max-md:flex max-md:h-auto max-md:flex-wrap">
            {/* ref .cards-cols-common — col 1 row 1; a 250px full-width ROW at <=767 */}
            <div className="max-md:h-[250px] max-md:w-full">
              {/* ref .inside-cards-common */}
              <div className="grid h-full [grid-template-columns:1fr_1fr]">
                <Cell cell={first} className="items-start" />
                <Cell cell={second} className="items-start" />
              </div>
            </div>
            {/* ref .bl-cards-common.bg-5 — col 2, rows 1-2; at <=767 it is the one
                cell with no declared height, taking `padding: 30px 0 40px` instead */}
            <div className="row-span-2 max-md:w-full">
              <Cell cell={tall} className="h-full items-stretch max-md:pb-10 max-md:pt-[30px]" />
            </div>
            {/* ref .bl-cards-common.bg4 — col 1, row 2; 250px at <=767 */}
            <div className="max-md:h-[250px] max-md:w-full">
              <Cell cell={wide} className="h-full items-stretch" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
