import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "Key Dates & Deadlines" — `.dates-fees-container-atlas > .df-container-atlas >
 * .table-responsive > table.table.table-bordered`, with a `.buttons-wrapper` under it.
 *
 * The ATLAS Admissions pages' `components/Admissions/KeyDates` renders the same Bootstrap
 * table, but it also models tabbed panes, stacked blocks, date strips and a "Closed" state,
 * and it is keyed on that page's own `.df-container-atlas` frame. Here there is one table and
 * no tabs, so this is the table alone.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   frame             `.table-responsive` radius `32px 0`, clipped
 *   table             100%, Bootstrap's `margin-bottom: 1rem`, #212529
 *   header row        `.header-table` #d20158, 24px/1.5 white, p 20/14; its
 *                     `<strong>` is a flat 700 (Preflight's relative `bolder`
 *                     would make it 900 inside a 700 parent)
 *   cell              p12, 1px #dee2e6 borders from `.table-bordered`
 *   row               an inline `height` — 33px on most rows (below their content height, so
 *                     inert) and 64px on the two that carry a `<sup>` ordinal
 *   button row        centred, pt30
 *
 * Reference note: the "Learn More" button's href repeats the site path —
 * `…/schools/isdi/schools/isdi/admissions/undergraduate/b-des`. Production answers 200 on it,
 * but with the ATLAS **homepage**, not this page — a catch-all soft-404 (verified: the body is
 * the homepage's apart from its echoed canonical, and holds no "Key Dates"). So the button
 * upstream promises B.Des admissions and delivers the homepage. The doubled prefix is an
 * authoring slip — an absolute URL typed into a field the template already prefixes with
 * `$domain` — and the authored intent is this page, which is what the port links to. The
 * destination is recorded in `lib/.../key-dates.js` beside the href.
 */
/* ref the include's trailing <script>, resolved at build time: grey for "Closed", green for
   "Applications Open" and for any `<day><suffix> <Month> <year>` */
const TONE = { green: 'text-[green]', grey: 'text-[grey]' };

/* a cell's inline content — plain text, and the `<sup>` ordinal markers ("11<sup>th</sup>") */
function Runs({ runs }) {
  return runs.map((run, i) =>
    typeof run === 'string' ? (
      <span key={`${i}-t`}>{withBreaks(run)}</span>
    ) : run.br ? (
      /* `<br class="br">` — the include's own `<style>` hides it above 1100 and shows it
         below, which is what makes those rows two lines tall once the table is at its
         900px scrolling width */
      <br key={`${i}-b`} className="hidden max-tbl:block" />
    ) : (
      /* Preflight neutralises `<sup>` (`line-height: 0; vertical-align: baseline;
         position: relative`), which keeps the line box at 24px where the reference's
         browser-default `super` raises it to 40 — 16px per row on the two rows that
         carry an ordinal */
      <sup key={`${i}-s`} className="static align-super text-[75%] [line-height:normal]">
        {run.sup}
      </sup>
    )
  );
}

export default function KeyDates({ data }) {
  return (
    <section data-block="key-dates" id="key-dates" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>

        {/* ref .dates-fees-container-atlas > .df-container-atlas */}
        <div>
          <div>
            {/* ref .table-responsive */}
            {/* ref .table-responsive — `overflow-x: auto` below 768, where the table holds
                a 900px minimum and scrolls inside it */}
            <div className="overflow-hidden rounded-[32px_0] max-md:overflow-x-auto">
              <table className="mb-4 w-full max-w-full border-collapse border border-solid border-[#dee2e6] text-[#212529] max-md:w-[900px] max-md:max-w-none">
                <tbody>
                  {data.rows.map((row, i) => (
                    /* the reference authors an inline `height` on every row; it is a MINIMUM,
                       and it is what makes the two rows carrying an ordinal 65px rather than
                       50 — nothing in their content does */
                    <tr key={`${i}-row`} style={row.height ? { height: row.height } : undefined}>
                      {row.cells.map((cell, j) =>
                        cell.header ? (
                          /* ref td > .header-table */
                          <td key={`${j}-cell`} colSpan={cell.colspan ?? undefined} className="bg-white text-black">
                            {/* `.header-table` drops to 16px at `max-width: 1100px` — the
                                project's `max-tbl` breakpoint, not a Webflow one */}
                            <div className="bg-atlas-cta px-3.5 py-5 text-center text-[24px] leading-[1.5] text-white max-tbl:text-base">
                              <strong className="font-bold">{cell.text}</strong>
                            </div>
                          </td>
                        ) : (
                          /* ref td — `.table-bordered` draws 1px #dee2e6 on every side */
                          <td
                            key={`${j}-cell`}
                            colSpan={cell.colspan ?? undefined}
                            className={cx(
                              'border border-solid border-[#dee2e6] bg-white p-3 text-black',
                              cell.align === 'center' && 'text-center',
                              cell.align === 'left' && 'text-left'
                            )}
                          >
                            {cell.bold ? (
                              /* Preflight's `b { font-weight: bolder }` is relative, so it is
                                 pinned to the flat 700 Webflow's normalize paints */
                              <b className={cx('font-bold', TONE[cell.tone])}>
                                <Runs runs={cell.runs} />
                              </b>
                            ) : (
                              <Runs runs={cell.runs} />
                            )}
                          </td>
                        )
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.buttons?.length > 0 && (
                /* ref .buttons-wrapper — inside `.table-responsive`, not beside it */
                <div className="flex items-center justify-center gap-4 pt-[30px]">
                  {data.buttons.map((button) => (
                    <PrimaryButton key={button.label} href={button.href} variant={button.variant ?? 'pink'}>
                      {button.label}
                    </PrimaryButton>
                  ))}
                </div>
              )}
              {/* ref the include's own `<br><br>` after the button row — 48px of real height */}
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
