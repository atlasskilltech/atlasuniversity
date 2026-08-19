import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/**
 * `.bl-card-wrapper-isme > (.belief-cards-camp, .belief-cards-1-camp)` — the
 * eight-cell photo mosaic, two staggered grid bands of four cells each.
 *
 * Two instances, measured identical in every grid property:
 *   /campus-atlas          "Live Where You Learn"        (`campus-atlas.php:250`)
 *   /life-at-atlas         the same section, verbatim    (`life-at-atlas.php:878`)
 *   /advantages/atlas-…    "A Place to Learn, Grow, …"   (`atlas-advantages.php:193`)
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                    <=767px
 *   .bl-card-wrapper-isme    margin-top 56              margin-top 40
 *   .belief-cards-camp       grid 2fr/1fr x 312/252,    flex wrap, height
 *                            height 564                 auto, cells full
 *                                                       width x 250
 *   .belief-cards-1-camp     grid 1fr/2fr x 252/312     grid 1fr/1fr x 250/250
 *   .cards-cols-camp         column, centre             block, width 100%
 *   .inside-cards-camp       2 cells side by side       same
 *   .card-title.sp-1         32px/1.2, 500,             16px/1.2, 600
 *                            padding 0 24, mb 32
 *
 * ── The two roundings ─────────────────────────────────────────────────────
 * `rounded` picks which box carries the reference's 32px corners, because the
 * two pages put them in different places and it is visible at the seams:
 *   'wrapper'  /campus-atlas + /life-at-atlas — `.bl-card-wrapper-isme.atlas`
 *              rounds the whole eight-cell block, cells square.
 *   'cell'     /advantages — each `.cards-inner-camp.img-N.atlas` and
 *              `.bl-cards-camp.img-N.atlas` rounds itself, wrapper square.
 *
 * Every photograph is painted by the stylesheet, never by markup, so the cells
 * travel as data. `background-size` is per-cell AND per-breakpoint (`img-3` is
 * `auto` above 768px and `cover` below), and an inline style would outlive the
 * media query — so the value travels as a custom property that a class reads,
 * and `max-md:bg-cover` overrides it where the reference does.
 */
export default function PhotoMosaic({ cells, rounded = 'wrapper', className }) {
  const [ac, security, meals, lounges, gym, study, coffee, housekeeping] = cells;
  const cell = rounded === 'cell' ? 'rounded-tl-[32px] rounded-br-[32px]' : '';

  return (
    /* ref .bl-card-wrapper-isme(.atlas) */
    <div
      className={cx(
        'mt-14 overflow-hidden max-md:mt-10',
        rounded === 'wrapper' && 'rounded-tl-[32px] rounded-br-[32px]',
        className,
      )}
    >
      {/* ref .belief-cards-camp — 2fr/1fr, rows 312/252 */}
      <div
        className="grid h-[564px] grid-cols-[2fr_1fr] grid-rows-[312px_252px] justify-center text-white
                   max-md:flex max-md:h-auto max-md:w-full max-md:flex-wrap"
      >
        {/* ref .cards-cols-camp > .inside-cards-camp */}
        <PairColumn cells={[ac, security]} cellClass={cell} className="col-start-1 row-start-1" />
        <MosaicCell cell={meals} className={cx('col-start-2 row-start-1 row-span-2', cell)} />
        <MosaicCell cell={lounges} className={cx('col-start-1 row-start-2', cell)} />
      </div>

      {/* ref .belief-cards-1-camp — 1fr/2fr, rows 252/312 */}
      <div
        className="grid h-[564px] grid-cols-[1fr_2fr] grid-rows-[252px_312px] justify-center text-white
                   max-md:h-auto max-md:grid-cols-[1fr_1fr] max-md:grid-rows-[250px_250px]"
      >
        <MosaicCell
          cell={gym}
          /* the one cell the reference leaves at `align-items: stretch` —
             `.bl-cards-camp.img-5` is the only `.img-N` that does not declare
             `flex-start`, so its caption fills the cell instead of shrinking to
             its text. Measured on /campus-atlas and /advantages alike. */
          className={cx('col-start-1 row-start-1 row-span-2 items-stretch max-md:row-span-1', cell)}
        />
        <MosaicCell cell={study} className={cx('col-start-2 row-start-1', cell)} />
        <PairColumn
          cells={[coffee, housekeeping]}
          cellClass={cell}
          className="col-start-2 row-start-2 max-md:col-span-2 max-md:col-start-1"
        />
      </div>
    </div>
  );
}

/* ref .cards-cols-camp > .inside-cards-camp — two square cells side by side */
function PairColumn({ cells, cellClass, className }) {
  return (
    <div
      className={`flex flex-col items-start justify-center max-md:block max-md:h-[250px] max-md:w-full ${className}`}
    >
      <div className="grid h-full w-full grid-cols-2 grid-rows-1 justify-center max-md:grid-rows-[250px]">
        {cells.map((cell) => (
          <MosaicCell key={cell.label} cell={cell} className={cellClass} />
        ))}
      </div>
    </div>
  );
}

/* ref .cards-inner-camp.img-N / .bl-cards-camp.img-N */
function MosaicCell({ cell, className = '' }) {
  return (
    <div
      className={`flex flex-col items-start justify-end bg-[length:var(--cell-size)] bg-[position:0_0] bg-no-repeat text-white max-md:h-[250px] max-md:w-full max-md:bg-cover ${className}`}
      style={{
        backgroundImage: `url(${cell.image})`,
        '--cell-size': cell.bgSize ?? 'cover',
      }}
    >
      {/* ref .card-title.sp-1 */}
      <div className="mb-8 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px] max-md:font-semibold">
        {withBreaks(cell.label)}
      </div>
    </div>
  );
}
