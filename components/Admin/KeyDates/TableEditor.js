'use client';

import { useMemo, useState } from 'react';
import KeyDatesGrid from '@/components/KeyDates/Grid';
import { BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, HINT, INPUT, LABEL, cx } from '@/components/News/Admin/ui';
import {
  LIMITS,
  cellAt,
  countDates,
  deleteCol,
  deleteRow,
  fromRows,
  insertCol,
  insertRow,
  mergeDown,
  mergeRight,
  splitCell,
  toRows,
} from '@/lib/keydates/table';

/**
 * The Key Dates table editor — an HTML table you edit like a spreadsheet:
 *   rows        add above / below, delete
 *   columns     add left / right, delete
 *   cells       merge right (colspan), merge down (rowspan), split
 *   a cell      text, caption/header row (with its colour), bold, green, alignment
 *   button      the "Learn more" button under the table, where the page has one
 * with a live preview drawn by the same component the website uses for an edited table.
 */
const ALIGNS = [
  ['left', 'Left'],
  ['center', 'Centre'],
  ['right', 'Right'],
];

export default function TableEditor({ initial, original, allowButton, saving, onSave, onCancel }) {
  const [flat, setFlat] = useState(() => fromRows(initial.rows));
  const [button, setButton] = useState(initial.button || (allowButton ? { label: '', href: '' } : null));
  const [sel, setSel] = useState({ r: 0, c: 0 });
  const [notice, setNotice] = useState('');

  const rows = useMemo(() => toRows(flat), [flat]);
  const byRow = useMemo(() => {
    const out = Array.from({ length: flat.R }, () => []);
    [...flat.cells].sort((a, b) => a.r - b.r || a.c - b.c).forEach((y) => out[y.r]?.push(y));
    return out;
  }, [flat]);
  const current = cellAt(flat, sel.r, sel.c) || flat.cells[0];
  const table = useMemo(() => ({ rows, ...(button && (button.label || button.href) ? { button } : {}) }), [rows, button]);

  const apply = (next, keep = sel) => {
    setNotice('');
    setFlat(next);
    const r = Math.min(keep.r, next.R - 1);
    const c = Math.min(keep.c, next.C - 1);
    const x = cellAt(next, r, c);
    setSel(x ? { r: x.r, c: x.c } : { r: 0, c: 0 });
  };
  const op = (res) => {
    if (res.error) return setNotice(res.error);
    return apply(res.flat);
  };
  const setCell = (patch) =>
    setFlat((f) => {
      const t = cellAt(f, sel.r, sel.c);
      return { ...f, cells: f.cells.map((y) => (t && y.r === t.r && y.c === t.c ? { ...y, cell: { ...y.cell, ...patch } } : y)) };
    });

  const x = current;
  const canRowAdd = flat.R < LIMITS.rows;
  const canColAdd = flat.C < LIMITS.cols;

  return (
    <div className="space-y-4">
      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#e3e5ea] bg-[#fafbfc] p-2 text-[13px]">
        <span className="px-1 font-semibold text-[#5b6170]">Row</span>
        <button type="button" className={BTN_GHOST} disabled={!canRowAdd} onClick={() => apply(insertRow(flat, x.r), { r: x.r, c: sel.c })}>+ Above</button>
        <button type="button" className={BTN_GHOST} disabled={!canRowAdd} onClick={() => apply(insertRow(flat, x.r + x.rs), { r: x.r + x.rs, c: sel.c })}>+ Below</button>
        <button type="button" className={BTN_GHOST} disabled={flat.R <= 1} onClick={() => apply(deleteRow(flat, sel.r))}>Delete row</button>
        <span className="mx-1 h-5 w-px bg-[#d6d9e0]" />
        <span className="px-1 font-semibold text-[#5b6170]">Column</span>
        <button type="button" className={BTN_GHOST} disabled={!canColAdd} onClick={() => apply(insertCol(flat, x.c), { r: sel.r, c: x.c })}>+ Left</button>
        <button type="button" className={BTN_GHOST} disabled={!canColAdd} onClick={() => apply(insertCol(flat, x.c + x.cs), { r: sel.r, c: x.c + x.cs })}>+ Right</button>
        <button type="button" className={BTN_GHOST} disabled={flat.C <= 1} onClick={() => apply(deleteCol(flat, sel.c))}>Delete column</button>
        <span className="mx-1 h-5 w-px bg-[#d6d9e0]" />
        <span className="px-1 font-semibold text-[#5b6170]">Cells</span>
        <button type="button" className={BTN_GHOST} onClick={() => op(mergeRight(flat, sel.r, sel.c))}>Merge →</button>
        <button type="button" className={BTN_GHOST} onClick={() => op(mergeDown(flat, sel.r, sel.c))}>Merge ↓</button>
        <button type="button" className={BTN_GHOST} disabled={x.rs === 1 && x.cs === 1} onClick={() => apply(splitCell(flat, sel.r, sel.c))}>Split</button>
      </div>
      {notice ? <p className="text-[13px] font-medium text-[#b42318]">{notice}</p> : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* the editable grid */}
        <div className="overflow-x-auto rounded-xl border border-[#e3e5ea] bg-white">
          <table className="w-full border-collapse text-[13px]">
            <tbody>
              {byRow.map((cells, r) => (
                <tr key={r}>
                  {cells.map((y) => {
                    const { cell } = y;
                    const pos = { r: y.r, c: y.c };
                    const active = x && y.r === x.r && y.c === x.c;
                    return (
                      <td
                        key={`${y.r}:${y.c}`}
                        colSpan={y.cs > 1 ? y.cs : undefined}
                        rowSpan={y.rs > 1 ? y.rs : undefined}
                        className={cx('border border-[#d6d9e0] p-0 align-top', active && 'outline outline-2 -outline-offset-2 outline-[#3b5bdb]')}
                        style={cell.header ? { backgroundColor: cell.headerColor || '#d20158' } : undefined}
                      >
                        <textarea
                          aria-label={`Row ${y.r + 1}, column ${y.c + 1}`}
                          value={cell.text}
                          rows={Math.min(5, Math.max(cell.text.split('\n').length, Math.ceil(cell.text.length / 22), 1))}
                          maxLength={LIMITS.text}
                          onFocus={() => setSel(pos)}
                          onChange={(e) => {
                            setSel(pos);
                            const v = e.target.value;
                            setFlat((f) => ({ ...f, cells: f.cells.map((z) => (z.r === pos.r && z.c === pos.c ? { ...z, cell: { ...z.cell, text: v } } : z)) }));
                          }}
                          className={cx(
                            'block min-w-[140px] w-full resize-y bg-transparent px-2 py-1.5 outline-none',
                            cell.header && 'font-bold text-white placeholder:text-white/60',
                            !cell.header && cell.bold && 'font-semibold',
                            !cell.header && cell.green && 'text-[green]',
                            cell.align === 'center' && 'text-center',
                            cell.align === 'right' && 'text-right'
                          )}
                          placeholder={cell.header ? 'Caption' : ''}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* the selected cell */}
        <div className="space-y-3 rounded-xl border border-[#e3e5ea] bg-white p-4 text-[14px]">
          <p className="font-semibold">
            Selected cell <span className="font-normal text-[#5b6170]">· row {x.r + 1}, column {x.c + 1}{x.cs > 1 || x.rs > 1 ? ` · spans ${x.cs}×${x.rs}` : ''}</span>
          </p>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={x.cell.header} onChange={(e) => setCell({ header: e.target.checked, headerColor: x.cell.headerColor || '#d20158', align: e.target.checked ? 'center' : x.cell.align })} />
            Caption / header cell (white text on colour)
          </label>
          {x.cell.header ? (
            <label className="flex items-center gap-2">
              Colour
              <input type="color" value={x.cell.headerColor || '#d20158'} onChange={(e) => setCell({ headerColor: e.target.value })} className="h-8 w-12 cursor-pointer rounded border border-[#d6d9e0]" />
              <span className="text-[12.5px] text-[#5b6170]">{x.cell.headerColor || '#d20158'}</span>
            </label>
          ) : (
            <>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={x.cell.bold} onChange={(e) => setCell({ bold: e.target.checked })} /> Bold
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={x.cell.green} onChange={(e) => setCell({ green: e.target.checked })} /> Green (open dates)
              </label>
              <div>
                <span className={LABEL}>Alignment</span>
                <div className="flex gap-1">
                  {ALIGNS.map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setCell({ align: v })} className={cx(BTN_SECONDARY, x.cell.align === v && 'border-[#14161a] bg-[#f4f5f7]')}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <p className={HINT}>
            “11th”, “22nd” and “1st” are superscripted automatically. A new line breaks the text. Mark part of a cell with
            <code className="mx-1 rounded bg-[#f1f2f4] px-1">&lt;b&gt;bold&lt;/b&gt;</code> or
            <code className="mx-1 rounded bg-[#f1f2f4] px-1">&lt;g&gt;green&lt;/g&gt;</code>. Write “Closed” for a closed date.
          </p>
        </div>
      </div>

      {button ? (
        <div className="grid gap-3 rounded-xl border border-[#e3e5ea] bg-white p-4 sm:grid-cols-2">
          <label>
            <span className={LABEL}>Button text</span>
            <input className={INPUT} value={button.label} maxLength={LIMITS.label} onChange={(e) => setButton({ ...button, label: e.target.value })} placeholder="Learn More About Admissions" />
          </label>
          <label>
            <span className={LABEL}>Button link</span>
            <input className={INPUT} value={button.href} maxLength={500} onChange={(e) => setButton({ ...button, href: e.target.value })} placeholder="/admissions/..." />
            <span className={HINT}>Starts with / (this website) or https://. Leave both empty for no button.</span>
          </label>
        </div>
      ) : null}

      <div>
        <p className="mb-2 text-[13px] font-semibold text-[#5b6170]">
          Preview <span className="font-normal">· {countDates(table)} key dates · {flat.R} rows × {flat.C} columns</span>
        </p>
        <div className="rounded-xl bg-white p-4 text-[18px]">
          <KeyDatesGrid table={table} />
        </div>
        <p className={`${HINT} mt-2`}>
          The website keeps this page’s own design (date cards or table) whenever the table still fits it — every row a label and a date, no merged
          cells. Otherwise it shows the table exactly as in this preview.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={BTN_PRIMARY} disabled={saving} onClick={() => onSave(table)}>
          {saving ? 'Saving…' : 'Save and publish'}
        </button>
        <button type="button" className={BTN_SECONDARY} disabled={saving} onClick={onCancel}>
          Cancel
        </button>
        {original ? (
          <button type="button" className={BTN_GHOST} disabled={saving} onClick={() => apply(fromRows(original.rows), { r: 0, c: 0 })}>
            Load the original into the editor
          </button>
        ) : null}
      </div>
    </div>
  );
}
