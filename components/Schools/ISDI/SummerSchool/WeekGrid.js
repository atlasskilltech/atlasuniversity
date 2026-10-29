import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB_1_MRGBTM } from '../Home/ui';

/**
 * "A Day in the Life at ISDI Summer School" — `.main-week-wrapper > 7 x .week-grid-main`
 * on `reference/schools/isdi/admissions/pre-university-summer-school.php`.
 *
 * The programme page ships the identical markup commented out line by line, so this block
 * exists on the Admissions page only. It is a seven-column strip of fixed-height cells,
 * each named by its own stylesheet rule rather than sharing a card shape — so the cells
 * travel as a `kind` and this component holds one measured class string per kind. Reading
 * the sheet alone is not enough: several cells carry a `background-blend-mode`, and the
 * `.isdi` modifiers cancel two of the base background images.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   wrapper           flex row, gap 15                      + margin 0 -21, padding 0 20,
 *     (`.main-week-wrapper`)                                `overflow: auto` — it becomes
 *                                                           a horizontal scroller
 *   column            flex column, gap 16, space-between, centred, width 100% /
 *     (`.week-grid-main`)  max-width 164, Manrope. 725px tall at 1440, set by the
 *                     tallest column (Sunday's 24 + 241 + 407 + two 16px gaps + ...)
 *   day label         16px/24 700 #333, `order: -9999` so it always leads the column
 *     (`.week-block`)
 *   class cell        164 x 73 (big) / 52 (small), #193e90, r16, p 8/12 and 4/12
 *     `.class-txt`    12px/18 400 #8c9fc7       `.class-cell-txt` 14px/21 700 white
 *   every other cell  164 wide, its own height, r16 (the generic `.isdi` radius), its own
 *                     colour, artwork and blend mode
 *
 * The copy is 18px/27 700 white almost everywhere; the two bottom-anchored Monday labels
 * inherit the column's 16px/24 instead, which is why they are not given a size here.
 */

/* ref `.class-cell-big` / `.class-cell-small` — the only cell shape that repeats */
const CLASS_CELL = {
  big: 'h-[73px] px-3 py-2',
  small: 'h-[52px] px-3 py-1',
};
/* ref `.text-head-grid` / `.text-head-grid2` / `.grid-com-txt` / `.thu-text-last` / … */
const COPY = 'text-[18px] font-bold leading-[1.5] text-white';

/*
 * A cell's artwork. `background-size`, `-position`, `-repeat` and `-blend-mode` all differ
 * per cell and several are the whole reason a cell reads as it does (Tuesday's
 * `screen`, Monday's `overlay`, Friday's `soft-light`), so each travels with the data.
 * They are inline because the values are data, not a fixed set of variants.
 */
function paint(cell) {
  const style = {};
  if (cell.bg) style.backgroundColor = cell.bg;
  if (cell.image) {
    style.backgroundImage = `url(${cell.image})`;
    style.backgroundSize = cell.size ?? 'auto';
    style.backgroundPosition = cell.position ?? '0 0';
    style.backgroundRepeat = cell.repeat === false ? 'no-repeat' : 'repeat';
    if (cell.blend) style.backgroundBlendMode = cell.blend;
  }
  if (cell.h) style.height = `${cell.h}px`;
  /* five cells on /schools/isdi/life@atlas-isdi set their own type ON THE CELL —
     Thursday's and Saturday's are 18px/27 where the column is 16/24, and two of
     them are white — and the copy inside them inherits it. The same class names
     carry different values on the Summer School sheet, so it travels as data. */
  if (cell.fontSize) {
    style.fontSize = cell.fontSize;
    style.lineHeight = cell.lineHeight ?? 'normal';
  }
  if (cell.color) style.color = cell.color;
  return style;
}

/* every cell is 164 wide and takes the generic `.isdi { border-radius: 16px }`.
   It does NOT get `shrink-0`: the reference's cells are ordinary flex items with
   `flex-shrink: 1`, and the column is auto-height so nothing ever shrinks. */
const BOX = 'w-[164px] rounded-2xl';

function Cell({ cell }) {
  switch (cell.kind) {
    /* ref .class-cell-big.isdi / .class-cell-small.isdi */
    case 'class': {
      const node = (
        <div className={cx(BOX, 'bg-[#193e90]', CLASS_CELL[cell.size])}>
          {/* ref .class-txt */}
          <div className="text-[12px] font-normal leading-[1.5] text-[#8c9fc7]">CLASS</div>
          {/* ref .class-cell-txt */}
          <div className="text-[14px] font-bold leading-[1.5] text-white">
            {withBreaks(cell.title)}
          </div>
        </div>
      );
      /* Tuesday's class cell is the one wrapped in a plain `<div>`; it is not inert,
         because that wrapper is the flex child and the cell inside it is not */
      return cell.wrapped ? <div>{node}</div> : node;
    }

    /* ref .mon-cell-1.isdi-1 — artwork with no copy */
    case 'art':
      return <div className={cx(BOX, 'relative')} style={paint(cell)} />;

    /* ref .mon-cell-3.isdi / .mon-cell-last.isdi — the label is pinned to the bottom-left
       and inherits the column's 16px/24 rather than setting its own size */
    case 'bottom-label':
      return (
        <div className={cx(BOX, 'relative')} style={paint(cell)}>
          <div
            className={cx(
              'absolute bottom-0 left-0 pb-4 pl-4 leading-[1.5] text-white no-underline',
              cell.bold && 'font-bold'
            )}
          >
            {withBreaks(cell.text)}
          </div>
        </div>
      );

    /* ref .tue-decor-div — a 15px two-tone strip whose left half is rounded `16px 5px 0 0`,
       over a 127px panel rounded `0 16px 16px`. `flex: none` on the wrapper. */
    case 'tue-head':
      return (
        <div className="w-[164px] flex-none shrink-0">
          {/* ref .div-block-18 */}
          <div className="flex h-[15px] w-[164px]">
            {/* ref .tue-decor.isdi */}
            <div className="flex-auto rounded-[16px_5px_0_0] bg-[#645d93]" />
            {/* ref .tue-empty */}
            <div className="flex-auto bg-white" />
          </div>
          {/* ref .tue-big-head.isdi */}
          <div className="relative z-[2] h-[127px] overflow-hidden rounded-[0_16px_16px] bg-[#193e90]">
            {/* ref .text-head-grid */}
            <div className={cx('absolute left-4 right-4 top-[45px]', COPY)}>
              {withBreaks(cell.text)}
            </div>
          </div>
        </div>
      );

    /* ref .tue-cell-2.isdi / .fri-cell-1.isdi — `.text-head-grid2`, pinned at top 20 */
    case 'top-label':
      return (
        <div className={cx(BOX, 'relative')} style={paint(cell)}>
          <div className={cx('absolute left-4 right-4 top-5', COPY)}>
            {withBreaks(cell.text)}
          </div>
        </div>
      );

    /* ref .tue-cell-3.isdi > .div-block-24 > .green-sec-text-b */
    case 'centre-block':
      return (
        <div className={cx(BOX, 'relative')} style={paint(cell)}>
          <div className="mx-[22px] mt-[72px] w-[119px]">
            <div className={cx('mt-0 text-center', COPY)}>{withBreaks(cell.text)}</div>
          </div>
        </div>
      );

    /* ref .wed-cell-3.isdi > .wed-cell-3-txt */
    case 'wed-ai':
      return (
        <div className={BOX} style={paint(cell)}>
          <div className={cx('mx-4 mt-[13px] text-center', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .greencard-2.isdi > .green-sec-text-wed */
    case 'greencard':
      return (
        <div className={cx(BOX, 'relative')} style={paint(cell)}>
          <div className={cx('m-[22px] text-center', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .thu-cell-1.isdi — the only cell that pads itself and stacks two lines */
    case 'thu-1':
      return (
        <div className={cx(BOX, 'relative px-[17px] pb-[39px] pt-[47px]')} style={paint(cell)}>
          {/* ref .thus-cell-1-head */}
          <div className={cx('text-left', COPY)}>{withBreaks(cell.head)}</div>
          {/* ref .thu-cell-1-txt — the same size, weight 400 */}
          <div className="text-[18px] font-normal leading-[1.5] text-white">
            {withBreaks(cell.text)}
          </div>
        </div>
      );

    /* ref .thu-cell-last-2.isdi(.bg) > .thu-text-last */
    case 'thu-last':
      return (
        <div className={BOX} style={paint(cell)}>
          <div className={cx('px-[25px] pt-[31px] text-center', COPY)}>
            {withBreaks(cell.text)}
          </div>
        </div>
      );

    /* ref .fri-cell-last.isdi > .grid-com-txt */
    case 'fri-last':
      return (
        <div className={cx(BOX, 'px-[14px] pt-[119px]')} style={paint(cell)}>
          <div className={cx('text-center', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .sat-cell-first.isdi > .sat-cell-1-txt — the cell is 18px/400 and the label
       only adds the weight, so the size is inherited rather than restated */
    case 'sat-first':
      return (
        <div className={cx(BOX, 'text-[18px] font-normal leading-[1.5]')} style={paint(cell)}>
          <div className="mx-[25px] mt-[118px] px-0 text-center font-bold text-white">
            {withBreaks(cell.text)}
          </div>
        </div>
      );

    /* ref .sat-cell-2.isdi > .sat-cell-2-txt — `.isdi` cancels the base artwork */
    case 'sat-2':
      return (
        <div
          className={cx(BOX, 'relative px-5 pt-[52px] text-[18px] leading-[1.5] text-white')}
          style={paint(cell)}
        >
          <div className="text-center font-bold">{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .sat-cell-last.isdi > .grid-com-txt */
    case 'sat-last':
      return (
        <div className={cx(BOX, 'px-5 pt-[97px] text-[18px] leading-[1.5]')} style={paint(cell)}>
          <div className={cx('text-center', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .sun-cell-1.isdi > .grid-com-txt */
    case 'sun-1':
      return (
        <div className={cx(BOX, 'relative pt-[100px]')} style={paint(cell)}>
          <div className={cx('text-center', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    /* ref .sun-cell-2.isdi > .last-cell-txt — artwork only, no background COLOUR */
    case 'sun-2':
      return (
        <div className={cx(BOX, 'relative px-[18px] pt-[312px]')} style={paint(cell)}>
          <div className={cx('pl-px text-left', COPY)}>{withBreaks(cell.text)}</div>
        </div>
      );

    default:
      return null;
  }
}

/**
 * The seven-column strip on its own, without the section or the heading above it.
 *
 * Exported because /schools/isdi/life@atlas-isdi renders the SAME grid — same cell
 * classes, same heights, same artwork, same blend modes, different copy — under an
 * `.icon-heading` rather than this page's `h2` + `.sub-heading-1`. The strip is the
 * shared part; the furniture above it is not.
 */
export function WeekStrip({ days }) {
  return (
    <>
      {/*
          ref .main-week-wrapper — a flex row with a 15px gap that turns into a horizontal
          scroller at <=767 by bleeding 21px either side and padding 20px back in. The
          columns keep their 164px there, so the strip really does scroll.
        */}
      <div className="flex gap-[15px] max-md:-mx-[21px] max-md:overflow-auto max-md:px-5">
        {days.map((col) => (
            /* ref .week-grid-main */
            <div
              key={col.day}
              /* ref .week-grid-main — Manrope is declared HERE, on the column, not
                 on `.main-week-wrapper`, which inherits the page's own family */
              className="flex w-full max-w-[164px] flex-col items-center justify-between gap-4 font-sans"
            >
              {/*
                ref the Monday column's `.w-embed`, which holds only the page's inline
                `<style>`. It is 0x0 and paints nothing — but it is still a FLEX CHILD of a
                `justify-content: space-between` column with a 16px gap, so it consumes a
                gap and a distribution slot. Leaving it out moved every Monday cell up to
                13.5px. An empty element is still a box; here it is still a flex child.
                It is authored BEFORE the day label, which `order: -9999` then pulls back
                to the top — so the DOM order is embed first, exactly as upstream.
              */}
              {col.embed && <div />}
              {/* ref .week-block — `order: -9999`, so it leads whatever the source order */}
              <div className="order-[-9999] text-base font-bold leading-[1.5] text-[#333]">
                {col.day}
              </div>
              {col.cells.map((cell, i) => (
                <Cell key={`${i}-${cell.kind}`} cell={cell} />
              ))}
            </div>
        ))}
      </div>
    </>
  );
}

export default function WeekGrid({ data }) {
  return (
    <section data-block="week" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB_1_MRGBTM}>{data.sub}</div>
        <WeekStrip days={data.days} />
      </div>
    </section>
  );
}
