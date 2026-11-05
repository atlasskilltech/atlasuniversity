import { advantagesContent } from '@/lib/advantagesContent';
import SectionHeadWithButton from '@/components/Advantages/SectionHeadWithButton';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Learn Across Disciplines. Lead Across Industries." — port of
 * `atlas-advantages.php:237-278` (`section.section > .container >
 * (.head-wrap.top, .sub-heading, .bl-card-wrapper-isme.atlas >
 *  .belief-cards-common > 3 cells)`).
 *
 * A three-cell indigo mosaic, each cell a title over a paragraph, sharing the
 * eight-cell mosaic's wrapper but not its grid.
 *
 * ── Measured layout ───────────────────────────────────────────────────────
 * `.belief-cards-common` is `grid-template-columns: 828px 414px` with two
 * 282px rows, and holds three children:
 *
 *   .cards-cols-common      col 1, row 1 -> 828 x 282   "Interdisciplinary"
 *     .inside-cards-common  a nested 2-col grid whose single card spans both
 *                           columns, so it fills the 828
 *   .bl-cards-common        col 2, rows 1-2 -> 414 x 564  "Multidisciplinary"
 *     .atlas-bg-3
 *   .bl-cards-common        col 1, row 2 -> 828 x 282     "Modular"
 *     .atlas-bg-2
 *
 * Below 768px the grid becomes `flex-wrap` and every cell goes full width: the
 * first keeps a 250px height from `.cards-cols-common`, the other two shrink to
 * their content with `padding: 24 0`.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                  <=767px
 *   .bl-card-wrapper-isme    margin-top 56, radius    margin-top 40
 *     .atlas                 32/0, clipped
 *   .card-title              32px/1.2, 500,           16px/1.2, 600
 *                            padding 0 24, mb 8
 *     .atlas-bold            weight 500 (the same;    same
 *                            the modifier is inert)
 *   .card-sub-text-atlas     18px/1.2, 300,           same
 *                            padding 14 24 0
 *
 * Each cell's indigo and vector wash are painted by the stylesheet, so all
 * four values travel as data.
 */
export default function Multidisciplinary() {
  const { multidisciplinary } = advantagesContent;
  const [interdisciplinary, multi, modular] = multidisciplinary.cells;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <SectionHeadWithButton
          heading={multidisciplinary.heading}
          button={multidisciplinary.button}
        />

        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{multidisciplinary.subheading}</div>

        {/* ref .bl-card-wrapper-isme.atlas */}
        <div className="mt-14 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mt-10">
          {/* ref .belief-cards-common */}
          <div
            /* `minmax(200px, 1fr)`, not `1fr`: a bare `1fr` is
               `minmax(auto, 1fr)`, whose min-content floor pins this column at
               ~294px and stops the 2:1 split below 1100px. The reference
               declares the explicit 200px minimum. */
            className="grid h-[564px] grid-cols-[2fr_minmax(200px,1fr)] grid-rows-[282px_282px] justify-center gap-0 text-white
                       max-md:flex max-md:h-auto max-md:flex-wrap"
          >
            {/* ref .cards-cols-common > .inside-cards-common > .cards-inner-isme
                — the nested 2-col grid holds one card that spans both columns,
                so it simply fills the 828 */}
            <Cell
              cell={interdisciplinary}
              /* `align-items: flex-start` here, not `stretch`: the title and
                 paragraph shrink to their own width rather than filling */
              className="col-start-1 row-start-1 items-start max-md:h-[250px] max-md:w-full"
            />

            {/* ref .bl-cards-common.atlas-bg-3 */}
            <Cell
              cell={multi}
              /* the wash moves to the right edge below 768; an inline style
                 would outlive the media query, so the breakpoint rewrites the
                 custom property the inline style reads */
              className="col-start-2 row-start-1 row-span-2 items-stretch
                         max-md:w-full max-md:bg-[position:100%_50%] max-md:py-6"
            />

            {/* ref .bl-cards-common.atlas-bg-2 */}
            <Cell
              cell={modular}
              className="col-start-1 row-start-2 items-stretch max-md:w-full max-md:py-6"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ref .cards-inner-isme.atlas-bg / .bl-cards-common.atlas-bg-N — all three are
   `flex-direction: column; justify-content: center`, so the pair sits centred
   in whatever height the cell gets */
function Cell({ cell, className = '' }) {
  return (
    <div
      /*
       * `background-position` and `-size` are set by CLASSES that read a custom
       * property, not by the inline style: an inline declaration beats every
       * class, including at a breakpoint, and one of these cells moves its wash
       * to the right edge below 768px. Only the values travel inline.
       */
      className={`relative flex flex-col justify-center bg-[position:var(--cell-pos)]
                  bg-[length:var(--cell-size)] bg-no-repeat text-white ${className}`}
      style={{
        backgroundColor: cell.background,
        backgroundImage: `url(${cell.image})`,
        '--cell-pos': cell.imagePosition,
        '--cell-size': cell.imageSize,
      }}
    >
      {/* ref .card-title(.atlas-bold) */}
      {/* `.atlas-bold` pins the weight at 500 through every breakpoint — it is
          a compound selector, so the `@media` rule's 600 never applies */}
      <div className="mb-2 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px]">
        {cell.title}
      </div>
      {/* ref .card-sub-text-atlas */}
      <div className="px-6 pt-[14px] text-[18px] font-light leading-[1.2]">
        {withBreaks(cell.text)}
      </div>
    </div>
  );
}
