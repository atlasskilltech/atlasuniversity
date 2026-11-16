/**
 * Key Dates — the table model and its editing operations (add / delete rows and columns, merge and
 * split cells), shared by the admin editor and the API's validation. Pure, no imports beyond markup.
 *
 * Stored / exchanged shape (an HTML table, row by row, with only the cells that start in that row):
 *   { rows: [ { height?, cells: [ { text, colspan, rowspan, header, headerColor, align, bold, green } ] } ],
 *     button?: { label, href } }
 *
 * The operations work on a flat list of cells with absolute positions ({ r, c, rs, cs }), which makes
 * spans easy to keep consistent; `toRows` / `fromRows` convert between the two.
 */
import { isDateText } from './markup.js';

export const LIMITS = Object.freeze({ rows: 60, cols: 12, text: 600, label: 160 });

export const blankCell = (over = {}) => ({ text: '', colspan: 1, rowspan: 1, header: false, headerColor: null, align: 'left', bold: false, green: false, ...over });

/** rows → { R, C, cells: [{ r, c, rs, cs, cell }], heights } — positions resolved like a browser does. */
export function fromRows(rows) {
  const taken = new Set();
  const cells = [];
  const heights = [];
  let C = 0;
  (rows || []).forEach((row, r) => {
    heights[r] = row?.height ?? null;
    let c = 0;
    for (const raw of row?.cells || []) {
      while (taken.has(`${r}:${c}`)) c += 1;
      const cell = blankCell(raw);
      const rs = Math.max(1, Math.min(LIMITS.rows, Number(cell.rowspan) || 1));
      const cs = Math.max(1, Math.min(LIMITS.cols, Number(cell.colspan) || 1));
      for (let i = 0; i < rs; i += 1) for (let j = 0; j < cs; j += 1) taken.add(`${r + i}:${c + j}`);
      cells.push({ r, c, rs, cs, cell });
      c += cs;
      C = Math.max(C, c);
    }
  });
  const R = Math.max(rows?.length || 0, ...cells.map((x) => x.r + x.rs));
  return fill({ R, C, cells, heights });
}

/** flat → rows (cells in column order, spans written back). Heights are kept per row index. */
export function toRows(flat) {
  const rows = Array.from({ length: flat.R }, (_, r) => ({ ...(flat.heights?.[r] ? { height: flat.heights[r] } : {}), cells: [] }));
  [...flat.cells]
    .sort((a, b) => a.r - b.r || a.c - b.c)
    .forEach((x) => {
      if (rows[x.r]) rows[x.r].cells.push({ ...x.cell, rowspan: x.rs, colspan: x.cs });
    });
  return rows;
}

/** Drop cells that fall outside the grid, clamp spans to it, and fill every uncovered slot with a blank
 *  cell, so the table is always rectangular. */
export function fill(flat) {
  const { R, C } = flat;
  const kept = [];
  const taken = new Set();
  for (const x of [...flat.cells].sort((a, b) => a.r - b.r || a.c - b.c)) {
    if (x.r >= R || x.c >= C) continue;
    const rs = Math.min(x.rs, R - x.r);
    const cs = Math.min(x.cs, C - x.c);
    let clash = false;
    for (let i = 0; i < rs && !clash; i += 1) for (let j = 0; j < cs; j += 1) if (taken.has(`${x.r + i}:${x.c + j}`)) clash = true;
    if (clash) continue;
    for (let i = 0; i < rs; i += 1) for (let j = 0; j < cs; j += 1) taken.add(`${x.r + i}:${x.c + j}`);
    kept.push({ ...x, rs, cs });
  }
  for (let r = 0; r < R; r += 1) for (let c = 0; c < C; c += 1) if (!taken.has(`${r}:${c}`)) kept.push({ r, c, rs: 1, cs: 1, cell: blankCell() });
  return { ...flat, cells: kept };
}

/** The cell covering (r, c). */
export const cellAt = (flat, r, c) => flat.cells.find((x) => r >= x.r && r < x.r + x.rs && c >= x.c && c < x.c + x.cs);

export function insertRow(flat, at) {
  const cells = flat.cells.map((x) => (x.r >= at ? { ...x, r: x.r + 1 } : x.r < at && at < x.r + x.rs ? { ...x, rs: x.rs + 1 } : x));
  const heights = [...(flat.heights || [])];
  heights.splice(at, 0, null);
  return fill({ ...flat, R: flat.R + 1, cells, heights });
}

export function deleteRow(flat, at) {
  if (flat.R <= 1) return flat;
  const cells = [];
  for (const x of flat.cells) {
    if (x.r === at) {
      if (x.rs > 1) cells.push({ ...x, rs: x.rs - 1 });
    } else if (x.r < at && at < x.r + x.rs) cells.push({ ...x, rs: x.rs - 1 });
    else if (x.r > at) cells.push({ ...x, r: x.r - 1 });
    else cells.push(x);
  }
  const heights = [...(flat.heights || [])];
  heights.splice(at, 1);
  return fill({ ...flat, R: flat.R - 1, cells, heights });
}

export function insertCol(flat, at) {
  const cells = flat.cells.map((x) => (x.c >= at ? { ...x, c: x.c + 1 } : x.c < at && at < x.c + x.cs ? { ...x, cs: x.cs + 1 } : x));
  return fill({ ...flat, C: flat.C + 1, cells });
}

export function deleteCol(flat, at) {
  if (flat.C <= 1) return flat;
  const cells = [];
  for (const x of flat.cells) {
    if (x.c === at) {
      if (x.cs > 1) cells.push({ ...x, cs: x.cs - 1 });
    } else if (x.c < at && at < x.c + x.cs) cells.push({ ...x, cs: x.cs - 1 });
    else if (x.c > at) cells.push({ ...x, c: x.c - 1 });
    else cells.push(x);
  }
  return fill({ ...flat, C: flat.C - 1, cells });
}

const join = (a, b) => [a, b].filter((t) => String(t || '').trim()).join(' ');

/** Merge the cell at (r, c) with its right neighbour (which must be exactly as tall). */
export function mergeRight(flat, r, c) {
  const t = cellAt(flat, r, c);
  const n = t && cellAt(flat, t.r, t.c + t.cs);
  if (!t || !n || n.r !== t.r || n.rs !== t.rs) return { flat, error: 'The cell on the right must start on the same row and be exactly as tall.' };
  const cells = flat.cells.filter((x) => x !== n).map((x) => (x === t ? { ...x, cs: x.cs + n.cs, cell: { ...x.cell, text: join(x.cell.text, n.cell.text) } } : x));
  return { flat: { ...flat, cells } };
}

/** Merge the cell at (r, c) with the cell below it (which must be exactly as wide). */
export function mergeDown(flat, r, c) {
  const t = cellAt(flat, r, c);
  const n = t && cellAt(flat, t.r + t.rs, t.c);
  if (!t || !n || n.c !== t.c || n.cs !== t.cs) return { flat, error: 'The cell below must start in the same column and be exactly as wide.' };
  const cells = flat.cells.filter((x) => x !== n).map((x) => (x === t ? { ...x, rs: x.rs + n.rs, cell: { ...x.cell, text: join(x.cell.text, n.cell.text) } } : x));
  return { flat: { ...flat, cells } };
}

/** Undo a merge: the cell keeps its text and the slots it covered become blank cells. */
export function splitCell(flat, r, c) {
  const t = cellAt(flat, r, c);
  if (!t || (t.rs === 1 && t.cs === 1)) return flat;
  return fill({ ...flat, cells: flat.cells.map((x) => (x === t ? { ...x, rs: 1, cs: 1 } : x)) });
}

/** A brand-new table: a caption row across the full width, a header row and three empty rows. */
export function newTable({ caption = 'Admissions Calendar', columns = ['Cycle', 'Current Cycle'], headerColor = '#d20158' } = {}) {
  const C = columns.length;
  return {
    rows: [
      { cells: [blankCell({ text: caption, colspan: C, header: true, headerColor, align: 'center' })] },
      { cells: columns.map((t, i) => blankCell({ text: t, bold: true, align: i ? 'center' : 'left' })) },
      ...[0, 1, 2].map(() => ({ cells: columns.map((_, i) => blankCell({ bold: true, green: i > 0, align: i ? 'center' : 'left' })) })),
    ],
  };
}

const COLOR = /^#[0-9a-f]{3,8}$/i;
const str = (v, max) => String(v ?? '').replace(/\r\n?/g, '\n').slice(0, max);

/**
 * Validate and normalise a table coming from the browser. Returns { table } or { error }.
 * Unknown keys are dropped; every string is capped; spans are re-resolved so overlaps cannot be stored.
 */
export function cleanTable(input) {
  if (!input || !Array.isArray(input.rows)) return { error: 'The table has no rows.' };
  if (input.rows.length > LIMITS.rows) return { error: `A table can have at most ${LIMITS.rows} rows.` };
  const rows = input.rows.map((row) => ({
    ...(Number(row?.height) > 0 ? { height: Math.min(400, Math.round(Number(row.height))) } : {}),
    cells: (Array.isArray(row?.cells) ? row.cells : []).slice(0, LIMITS.cols).map((c) => ({
      text: str(c?.text, LIMITS.text),
      colspan: Math.max(1, Math.min(LIMITS.cols, Math.round(Number(c?.colspan) || 1))),
      rowspan: Math.max(1, Math.min(LIMITS.rows, Math.round(Number(c?.rowspan) || 1))),
      header: Boolean(c?.header),
      headerColor: COLOR.test(String(c?.headerColor || '')) ? c.headerColor : null,
      align: ['left', 'center', 'right'].includes(c?.align) ? c.align : 'left',
      bold: Boolean(c?.bold),
      green: Boolean(c?.green),
    })),
  }));
  const flat = fromRows(rows);
  if (flat.C > LIMITS.cols) return { error: `A table can have at most ${LIMITS.cols} columns.` };
  if (!flat.R || !flat.C) return { error: 'The table is empty.' };
  const table = { rows: toRows(flat) };
  if (input.button && (input.button.label || input.button.href)) {
    const href = str(input.button.href, 500).trim();
    if (href && !/^(#|\/(?!\/)|https?:\/\/)/i.test(href)) return { error: 'The button link must start with / or https:// (or be #).' };
    table.button = { label: str(input.button.label, LIMITS.label).trim(), href };
  }
  return { table };
}

/** Number of key-date cells in a table (cells holding a date or a status such as "Closed"). */
export function countDates(table) {
  return (table?.rows || []).reduce((n, row) => n + (row.cells || []).filter((c) => !c.header && isDateText(c.text)).length, 0);
}

/** A table is "strip-shaped" when it can be drawn back as the date cards it came from: every row is
 *  exactly two plain cells (label, date) — no header cells, no merged cells. */
export function isStripShaped(table) {
  return (table?.rows || []).length > 0 && table.rows.every((row) => row.cells.length === 2 && row.cells.every((c) => !c.header && (c.colspan || 1) === 1 && (c.rowspan || 1) === 1));
}

/* --------------------------------------------------------------------------- shared calendars */

const shapeKey = (table) => JSON.stringify((table?.rows || []).map((r) => r.cells.map((c) => `${c.colspan || 1}x${c.rowspan || 1}`)));
const sameShape = (a, b) => shapeKey(a) === shapeKey(b);
const norm = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();
const FIELDS = ['text', 'header', 'headerColor', 'align', 'bold', 'green'];
const cellChanged = (a, b) => FIELDS.some((f) => (f === 'text' ? a.text !== b.text : (a[f] ?? null) !== (b[f] ?? null)));

/**
 * One copy of a shared calendar, updated with a change made to another copy.
 *   base   the edited copy's table BEFORE the edit (null when a whole version is being adopted)
 *   next   the edited table
 *   copy   this copy's current table
 * Where all three have the same rows and cells, a cell is taken from `next` only if this copy read the
 * same as `base` there — so a date change reaches every page while a page's own wording ("Cycle 1" here,
 * "Current Cycle" there) is kept. Adopting a version (no base) copies only the date cells. If the shapes
 * differ (rows or columns added, cells merged) the copy simply becomes `next`.
 */
export function propagate(base, next, copy) {
  if (!copy) return next;
  if (base && sameShape(base, next) && sameShape(base, copy)) {
    return {
      ...next,
      rows: next.rows.map((row, r) => ({
        ...copy.rows[r],
        cells: row.cells.map((cell, c) => {
          const was = base.rows[r].cells[c];
          const mine = copy.rows[r].cells[c];
          /* a cell the edit did not touch keeps this page's own version exactly (its spacing and
             line breaks included); a changed cell reaches this page if the page read the same before */
          return !cellChanged(was, cell) || norm(mine.text) !== norm(was.text) ? mine : cell;
        }),
      })),
    };
  }
  if (sameShape(next, copy)) {
    return {
      ...copy,
      ...(next.button ? { button: next.button } : {}),
      rows: next.rows.map((row, r) => ({
        ...copy.rows[r],
        cells: row.cells.map((cell, c) => {
          const mine = copy.rows[r].cells[c];
          return !cell.header && (isDateText(cell.text) || isDateText(mine.text)) ? { ...mine, text: cell.text, green: cell.green } : mine;
        }),
      })),
    };
  }
  return next;
}

/** The plain text of every date cell, in order — what "in sync" compares between copies. */
export const dateSignature = (table) =>
  (table?.rows || []).flatMap((r) => r.cells).filter((c) => !c.header && isDateText(c.text)).map((c) => norm(c.text.replace(/<\/?(b|g|sup)>/g, '').replace(/[()]/g, ''))).join(' | ');
