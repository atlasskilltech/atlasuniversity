/**
 * ATLAS Hackathon 2026 — CSV in and out, for the admin's Export and "Import from old site".
 * RFC 4180: comma-separated, fields optionally in double quotes, "" for a quote inside one, line breaks
 * inside quoted fields. No library: the format is small and fixed.
 */

/** Parse CSV text into an array of rows (arrays of strings). A leading BOM is ignored. */
export function parseCsv(text) {
  const s = String(text ?? '').replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (quoted) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i += 2; continue; }
        quoted = false; i += 1; continue;
      }
      field += c; i += 1; continue;
    }
    if (c === '"' && field === '') { quoted = true; i += 1; continue; }
    if (c === ',') { row.push(field); field = ''; i += 1; continue; }
    if (c === '\r' || c === '\n') {
      row.push(field); field = '';
      if (row.some((f) => f !== '') || row.length > 1) rows.push(row);
      row = [];
      i += c === '\r' && s[i + 1] === '\n' ? 2 : 1;
      continue;
    }
    field += c; i += 1;
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((f) => f !== '')) rows.push(row); }
  return rows;
}

/** Rows (arrays) -> CSV text. Every field quoted; a leading "=", "+", "-" or "@" is prefixed with ' so
 *  a spreadsheet never runs a typed value as a formula. */
export function toCsv(rows) {
  const cell = (v) => {
    let t = v == null ? '' : String(v);
    if (/^[=+\-@\t\r]/.test(t)) t = `'${t}`;
    return `"${t.replace(/"/g, '""')}"`;
  };
  return rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}
