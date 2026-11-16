/**
 * Key Dates — what changed between two versions of a table, for the activity log.
 * Returns { changes: [{ field, from, to }], note }: one change per cell whose text differs, named by
 * its row's first cell ("Applications Close") and, on tables wider than label | value, its column's
 * header; plus the button, and a note when rows or columns were added or removed.
 */
import { plainText } from './markup.js';
import { fromRows } from './table.js';

function grid(table) {
  const flat = fromRows(table?.rows || []);
  const at = (r, c) => flat.cells.find((x) => r >= x.r && r < x.r + x.rs && c >= x.c && c < x.c + x.cs);
  const text = (r, c) => {
    const x = at(r, c);
    return x && x.r === r && x.c === c ? plainText(x.cell.text) : null; // null = covered by a merge
  };
  return { R: flat.R, C: flat.C, text, at };
}

export function tableChanges(before, after) {
  const a = grid(before);
  const b = grid(after);
  const changes = [];
  const R = Math.max(a.R, b.R);
  const C = Math.max(a.C, b.C);
  /* header row = the first row whose cells span single columns (below a merged caption, if any) */
  const headerRow = (g) => {
    for (let r = 0; r < Math.min(g.R, 3); r += 1) {
      const cells = Array.from({ length: g.C }, (_, c) => g.at(r, c));
      if (cells.every((x) => x && x.cs === 1 && x.cell.header)) return r;
    }
    return -1;
  };
  const hr = headerRow(b) >= 0 ? headerRow(b) : headerRow(a);
  const colName = (c) => (hr >= 0 ? b.text(hr, c) || a.text(hr, c) : null) || `column ${c + 1}`;
  for (let r = 0; r < R; r += 1) {
    const rowName = b.text(r, 0) || a.text(r, 0) || `row ${r + 1}`;
    for (let c = 0; c < C; c += 1) {
      const x = r < a.R && c < a.C ? a.text(r, c) : null;
      const y = r < b.R && c < b.C ? b.text(r, c) : null;
      if ((x ?? '') === (y ?? '')) continue;
      const spanAll = (b.at(r, c)?.cs || 1) >= b.C || (a.at(r, c)?.cs || 1) >= a.C;
      let field;
      if (spanAll) field = r === 0 ? 'Caption' : `Row ${r + 1}`;
      else if (c === 0) field = `Row ${r + 1} label`;
      else field = C <= 2 ? rowName : `${rowName} / ${colName(c)}`;
      changes.push({ field, from: x || '(empty)', to: y || '(empty)' });
    }
  }
  const notes = [];
  if (a.R !== b.R) notes.push(`rows ${a.R} → ${b.R}`);
  if (a.C !== b.C) notes.push(`columns ${a.C} → ${b.C}`);
  const btn = (t) => (t?.button ? `${t.button.label || ''} (${t.button.href || ''})` : '(none)');
  if (btn(before) !== btn(after)) changes.push({ field: 'Button', from: btn(before), to: btn(after) });
  return { changes, note: notes.length ? `Table size changed: ${notes.join(', ')}` : null };
}
