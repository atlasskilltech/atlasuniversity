/**
 * Key Dates — converters between the editor's table model (lib/keydates/table.js) and each of the five
 * shapes the site's key-date sections were built in:
 *
 *   atlasTable  components/Admissions/KeyDates  KeyDatesTable   (ATLAS UG / Integrated, Law)
 *   atlasStrip  components/Admissions/KeyDates  DateStrip       (ATLAS PG / UG / Integrated, uGDX)
 *   isdiTable   components/Schools/ISDI/Admission/KeyDates rows (ISDI B.Des / B.Tech, ISME BBA / B.Sc)
 *   isdiStrip   components/Schools/ISDI/Admission/KeyDates strip (ISDI M.Des / MBA)
 *   ismeStrip   ISME page JSON `keyStrip`                       (ISME MBA)
 *   ismeFees    ISME page JSON `fees`                           (ISME Scholarships)
 *
 * `toModel(shape, source)` turns the page's original data into an editable table.
 * `fromModel(shape, source, table)` turns an edited table back into the page's own data when the table
 * still fits that layout (so a changed date keeps the page's exact design), or into a `grid` — a plain
 * key-dates table drawn by components/KeyDates/Grid — when it does not (merged cells, extra columns…).
 *
 * Pure (no imports beyond the model), so it runs in the API, the admin and the public pages alike.
 */
import { groupsToText, plainText, runsToText, textToGroups, textToRuns } from './markup.js';
import { blankCell, isStripShaped } from './table.js';

/* ---------------------------------------------------------------------------- source → text */

/** An ATLAS date value ({ closed } | { day, suffix, rest } | { parts } | { text }) → editable text. */
function atlasValueText(v) {
  if (!v) return '';
  if (v.closed) return 'Closed';
  if (v.parts) return runsToText(v.parts);
  if (v.text != null) return String(v.text).trim();
  if (v.day != null) return `${v.day}${v.suffix ?? ''} ${v.rest ?? ''}`.trim();
  return '';
}

/** A label written as lines (["Result", "Announcement"]) → text with newlines. */
const linesText = (lines, sep = '\n') => (Array.isArray(lines) ? lines.join(sep) : String(lines ?? ''));

/** A run list or string from the ISDI / ISME data → editable text ({ bold: 'Closed' } → "Closed"). */
const runsText = (v) => (Array.isArray(v) ? runsToText(v.map((r) => (r && typeof r === 'object' && typeof r.bold === 'string' ? r.bold : r))) : String(v ?? ''));

/* ---------------------------------------------------------------------------- text → source */

/** Editable text → an ATLAS date value. */
function atlasValue(text) {
  const t = String(text ?? '').trim();
  if (/^closed$/i.test(t)) return { closed: true };
  return { parts: textToRuns(t) };
}

/** Editable text → an ISDI / ISME run list ("Closed" is the bold literal showDateCon() prints). */
function isdiValue(text) {
  const t = String(text ?? '').trim();
  if (/^closed$/i.test(t)) return [{ bold: 'Closed' }];
  return textToRuns(t);
}

/** Table model → the ISDI renderer's rows (`{ height, cells: [{ header | groups, colspan, rowspan }] }`). */
export function toIsdiRows(table) {
  return (table.rows || []).map((row) => ({
    ...(row.height ? { height: row.height } : {}),
    cells: row.cells.map((c) =>
      c.header
        ? { header: true, text: c.text, colspan: c.colspan, rowspan: c.rowspan, headerColor: c.headerColor || undefined, align: 'center' }
        : { groups: textToGroups(c.text, { bold: c.bold, green: c.green }), colspan: c.colspan, rowspan: c.rowspan, align: c.align }
    ),
  }));
}

/* ---------------------------------------------------------------------------- toModel */

const row2 = (label, value, { labelBold = false, valueBold = true, green = false, height } = {}) => ({
  ...(height ? { height } : {}),
  cells: [
    blankCell({ text: label, bold: labelBold }),
    blankCell({ text: value, bold: valueBold, green, align: 'center' }),
  ],
});

export function toModel(shape, src) {
  switch (shape) {
    case 'atlasTable': {
      const t = src.table;
      const C = t.columns.length;
      return {
        rows: [
          { ...(t.rowHeights?.caption ? { height: t.rowHeights.caption } : {}), cells: [blankCell({ text: String(t.caption).trim(), colspan: C, header: true, headerColor: t.headerColor, align: 'center' })] },
          { ...(t.rowHeights?.columns ? { height: t.rowHeights.columns } : {}), cells: t.columns.map((col, i) => blankCell({ text: col, bold: true, align: i ? 'center' : 'left' })) },
          ...t.rows.map((r) => {
            /* lines kept exactly as authored ("Applications " + "Opened") so a save round-trips them */
            const label = (r.label || []).map(String).join(r.br ? '\n' : '');
            const note = r.note ? ` <g>${atlasValueText(r.note)}</g>` : '';
            return {
              ...(r.height ? { height: r.height } : {}),
              cells: [blankCell({ text: label + note, bold: true }), blankCell({ text: atlasValueText(r.value), bold: true, green: Boolean(r.value?.green), align: 'center' })],
            };
          }),
        ],
        ...(src.button ? { button: { ...src.button } } : {}),
      };
    }
    case 'atlasStrip':
      return {
        rows: [
          row2(linesText(src.lead.title), atlasValueText(src.lead.value), { labelBold: true, valueBold: false }),
          ...src.cards.map((c) => row2(linesText(c.label), atlasValueText(c.value))),
        ],
        ...(src.button ? { button: { ...src.button } } : {}),
      };
    case 'isdiTable':
      return {
        rows: src.rows.map((row) => ({
          ...(row.height ? { height: row.height } : {}),
          cells: row.cells.map((c) => {
            if (c.header) return blankCell({ text: c.text, colspan: c.colspan || 1, rowspan: c.rowspan || 1, header: true, headerColor: c.headerColor || '#d20158', align: 'center' });
            const { text, bold, green } = groupsToText(c.groups ?? [{ runs: c.runs, bold: c.bold, tone: c.tone }]);
            return blankCell({ text: text.replace(/^ +| +$/g, ''), bold, green, colspan: c.colspan || 1, rowspan: c.rowspan || 1, align: c.align || 'left' });
          }),
        })),
      };
    case 'isdiStrip':
      return {
        rows: [
          row2(runsText(src.strip.lead.title), runsText(src.strip.lead.value), { labelBold: true, valueBold: false }),
          ...src.strip.cards.map((c) => row2(runsText(c.label), runsText(c.value))),
        ],
      };
    case 'ismeStrip': {
      const lead = src.cards.find((c) => c.lead);
      return {
        rows: [
          row2(runsText(lead.title).trim(), runsText(lead.value).trim(), { labelBold: true, valueBold: false }),
          ...src.cards.filter((c) => !c.lead).map((c) => row2(runsText(c.label), runsText(c.value))),
        ],
      };
    }
    case 'ismeFees':
      return {
        rows: src.cards.map((c) => row2(runsText(c.label).replace(/\u2028/g, '\n'), runsText(c.value || ''), { labelBold: Boolean(c.blue), valueBold: true })),
        ...(src.button ? { button: { ...src.button } } : {}),
      };
    default:
      throw new Error(`Unknown key-dates shape: ${shape}`);
  }
}

/* ---------------------------------------------------------------------------- fromModel */

/** A `grid` stand-in for a block whose edited table no longer fits its original layout. */
const grid = (src, table) => ({ kind: 'grid', table, button: table.button ?? src.button, spaced: src.spaced, borderless: src.borderless });

/**
 * Apply an edited table to the original data of one block. Returns the data the page's own renderer
 * draws; see the header for when that is the original layout and when it is a `grid`.
 */
export function fromModel(shape, src, table) {
  const strip = isStripShaped(table);
  const [lead, ...rest] = table.rows;
  const T = (row, i) => row.cells[i].text;
  switch (shape) {
    case 'atlasTable': {
      /* still the ATLAS table's own shape — a caption across both columns, a heading row, then
         label | date rows with nothing merged — so it keeps its exact design */
      const [cap, cols, ...body] = table.rows;
      const plain = (row) => row.cells.length === 2 && row.cells.every((c) => !c.header && (c.colspan || 1) === 1 && (c.rowspan || 1) === 1);
      const fits = cap && cols && cap.cells.length === 1 && cap.cells[0].header && (cap.cells[0].colspan || 1) === 2 && plain(cols) && body.every(plain);
      if (!fits) return grid(src, table);
      const clean = (t) => String(t).replace(/<\/?(b|g)>/g, '');
      return {
        ...src,
        ...(table.button ? { button: table.button } : {}),
        table: {
          ...src.table,
          caption: clean(cap.cells[0].text),
          headerColor: cap.cells[0].headerColor || src.table.headerColor,
          colSpan: src.table.colSpan,
          rowHeights: { caption: cap.height ?? src.table.rowHeights?.caption, columns: cols.height ?? src.table.rowHeights?.columns },
          columns: cols.cells.map((c) => clean(c.text)),
          rows: body.map((row) => {
            /* a trailing <g>…</g> on the label is the green "(11th Sep 2026)" note */
            const m = /^([\s\S]*?)\s*<g>([\s\S]*)<\/g>\s*$/.exec(row.cells[0].text);
            const label = clean(m ? m[1] : row.cells[0].text);
            return {
              label: label.split('\n'),
              br: label.includes('\n'),
              ...(m ? { note: { parts: textToRuns(clean(m[2])) } } : {}),
              value: { parts: textToRuns(clean(row.cells[1].text)), green: Boolean(row.cells[1].green) },
              ...(row.height ? { height: row.height } : {}),
            };
          }),
        },
      };
    }
    case 'atlasStrip':
      if (!strip || !lead) return grid(src, table);
      return {
        ...src,
        ...(table.button ? { button: table.button } : {}),
        lead: { ...src.lead, title: T(lead, 0).split('\n'), value: atlasValue(T(lead, 1)) },
        cards: rest.map((r) => ({ label: T(r, 0).split('\n'), value: atlasValue(T(r, 1)) })),
      };
    case 'isdiTable':
      return { ...src, strip: undefined, grid: undefined, rows: toIsdiRows(table) };
    case 'isdiStrip':
      if (!strip || !lead) return { ...src, strip: undefined, grid: table };
      return {
        ...src,
        strip: {
          ...src.strip,
          lead: { ...src.strip.lead, title: T(lead, 0), value: isdiValue(T(lead, 1)) },
          cards: rest.map((r) => ({ label: T(r, 0), value: isdiValue(T(r, 1)) })),
        },
      };
    case 'ismeStrip': {
      const l = src.cards.find((c) => c.lead);
      if (!strip || !lead) return { kind: 'keyTable', id: src.id, heading: src.heading, headingMods: src.headingMods, rows: toIsdiRows(table) };
      return {
        ...src,
        cards: [{ ...l, title: [T(lead, 0)], value: isdiValue(T(lead, 1)) }, ...rest.map((r) => ({ label: [T(r, 0)], value: isdiValue(T(r, 1)) }))],
      };
    }
    case 'ismeFees': {
      if (!strip || !lead) return { kind: 'keyTable', id: src.id, heading: src.heading, headingMods: src.headingMods, rows: toIsdiRows(table) };
      const first = src.cards[0];
      return {
        ...src,
        ...(table.button ? { button: table.button } : {}),
        cards: [
          { ...first, label: [plainText(T(lead, 0))] },
          ...rest.map((r) => ({ label: [T(r, 0).replace(/<\/?(b|g|sup)>/g, '')], value: [plainText(T(r, 1))] })),
        ],
      };
    }
    default:
      return src;
  }
}
