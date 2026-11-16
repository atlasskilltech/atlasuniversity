import { textToGroups } from '@/lib/keydates/markup';
import { cx } from '@/lib/cx';

/**
 * A key-dates table edited in the admin (/admin/keydates) whose shape no longer fits the layout the
 * page was built in — merged cells, extra columns, a table added from scratch. Drawn in the site's own
 * key-dates table design (the Bootstrap `.table.table-bordered` of the `keydates/*` includes, the same
 * values components/Schools/ISDI/Admission/KeyDates documents): 2px rgba(0,0,0,.15) frame, 1px #dee2e6
 * cells padded .75rem, a coloured caption row, bold cells and green dates, and a horizontal scroller
 * with a 900px floor at <=1100px.
 *
 * A table the page CAN still draw in its own layout (a changed date, a renamed row) never comes here —
 * lib/keydates/convert.js hands it back to the page's original renderer.
 */
const CELL =
  'border border-solid border-[#dee2e6] bg-white align-middle text-black ' +
  'overflow-hidden text-ellipsis whitespace-nowrap max-tbl:min-w-[150px] max-tbl:whitespace-normal';
const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' };

function Runs({ runs }) {
  return runs.map((r, i) =>
    typeof r === 'string' ? (
      <span key={i}>{r}</span>
    ) : r.br ? (
      /* a line break that only shows at <=1100px (the tables' own `<br class="br">`); the space keeps
         the two words apart where it is hidden */
      <span key={i}>
        {' '}
        <br className="hidden max-tbl:block" />
      </span>
    ) : r.sup != null ? (
      <sup key={i}>{r.sup}</sup>
    ) : null
  );
}

function CellText({ cell }) {
  return textToGroups(cell.text, { bold: cell.bold, green: cell.green }).map((g, i) =>
    g.bold ? (
      <b key={i} className={cx('font-bold', g.tone === 'green' && 'text-[green]')}>
        <Runs runs={g.runs} />
      </b>
    ) : (
      <span key={i} className={cx(g.tone === 'green' && 'text-[green]')}>
        <Runs runs={g.runs} />
      </span>
    )
  );
}

export default function KeyDatesGrid({ table, className }) {
  if (!table?.rows?.length) return null;
  return (
    <div className={cx('relative block w-full overflow-x-auto rounded-[32px_0]', className)}>
      <table className="mb-4 w-full border-collapse border-2 border-solid border-black/15 text-[#212529] max-tbl:min-w-[900px] max-tbl:border-separate max-tbl:border-spacing-0">
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} style={row.height ? { height: row.height } : undefined}>
              {row.cells.map((cell, j) =>
                cell.header ? (
                  <td key={j} colSpan={cell.colspan > 1 ? cell.colspan : undefined} rowSpan={cell.rowspan > 1 ? cell.rowspan : undefined} className={cx(CELL, 'p-0 text-center')}>
                    <div
                      className="bg-atlas-cta px-3.5 py-5 text-center text-[24px] leading-[1.5] text-white max-tbl:text-base"
                      style={cell.headerColor ? { backgroundColor: cell.headerColor } : undefined}
                    >
                      <strong className="font-bold">{cell.text.replace(/<\/?(b|g|sup)>/g, '')}</strong>
                    </div>
                  </td>
                ) : (
                  <td key={j} colSpan={cell.colspan > 1 ? cell.colspan : undefined} rowSpan={cell.rowspan > 1 ? cell.rowspan : undefined} className={cx(CELL, 'p-3', ALIGN[cell.align] ?? 'text-left')}>
                    <CellText cell={cell} />
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
