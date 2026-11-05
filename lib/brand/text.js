/*
 * Text Converter logic — ported 1:1 from reference/brand/text-converter.html (its two scripts:
 * the twelve case conversions and the Excel/CSV, Text Cleaner, Find & Replace, Lines & Lists and
 * Developer Tools toolkit). Pure functions, no DOM: the React components only hold state.
 */

/* ================= Case transforms ================= */
const words = (text) => text.split(/[^A-Za-z0-9]+/).filter(Boolean);
const mapWords = (text, fn) => text.replace(/[A-Za-z0-9]+(?:['’][A-Za-z0-9]+)*/g, fn);

const titleCase = (t) => mapWords(t, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
const capitalizeWords = (t) => mapWords(t, (w) => w.charAt(0).toUpperCase() + w.slice(1));
const sentenceCase = (t) => t.toLowerCase().replace(/(^|[.!?]\s+|\n\s*)([a-z])/g, (m, pre, ch) => pre + ch.toUpperCase());
function alternatingCase(text) {
  let i = 0;
  return text.replace(/[A-Za-z]/g, (ch) => {
    const out = i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
    i++;
    return out;
  });
}
const inverseCase = (t) => t.replace(/[A-Za-z]/g, (ch) => (ch === ch.toUpperCase() ? ch.toLowerCase() : ch.toUpperCase()));
const camelCase = (t) =>
  words(t)
    .map((w, i) => {
      w = w.toLowerCase();
      return i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join('');
const pascalCase = (t) =>
  words(t)
    .map((w) => {
      w = w.toLowerCase();
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join('');
const joinWords = (t, sep, upper) => words(t).map((w) => (upper ? w.toUpperCase() : w.toLowerCase())).join(sep);

export const CONVERSIONS = [
  { id: 'upper', name: 'UPPERCASE', hint: 'ATLAS SKILLTECH UNIVERSITY', fn: (t) => t.toUpperCase() },
  { id: 'lower', name: 'lowercase', hint: 'atlas skilltech university', fn: (t) => t.toLowerCase() },
  { id: 'title', name: 'Title Case', hint: 'Atlas Skilltech University', fn: titleCase },
  { id: 'sentence', name: 'Sentence case', hint: 'Atlas skilltech university.', fn: sentenceCase },
  { id: 'capitalize', name: 'Capitalize Each Word', hint: 'Capitalize Each Word', fn: capitalizeWords },
  { id: 'alternating', name: 'aLtErNaTiNg CaSe', hint: 'aLtErNaTiNg CaSe', fn: alternatingCase },
  { id: 'inverse', name: 'InVeRsE cAsE', hint: "invert each letter's case", fn: inverseCase },
  { id: 'camel', name: 'camelCase', hint: 'atlasSkilltechUniversity', fn: camelCase },
  { id: 'pascal', name: 'PascalCase', hint: 'AtlasSkilltechUniversity', fn: pascalCase },
  { id: 'snake', name: 'snake_case', hint: 'atlas_skilltech_university', fn: (t) => joinWords(t, '_', false) },
  { id: 'kebab', name: 'kebab-case', hint: 'atlas-skilltech-university', fn: (t) => joinWords(t, '-', false) },
  { id: 'constant', name: 'CONSTANT_CASE', hint: 'ATLAS_SKILLTECH_UNIVERSITY', fn: (t) => joinWords(t, '_', true) },
];

export function countWords(text) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}
export const countLines = (text) => (text === '' ? 0 : text.split('\n').length);

/* ================= Delimited (CSV/TSV) — RFC-4180-style ================= */
export function parseDelimited(text, delim) {
  const rows = [];
  let row = [];
  let field = '';
  let i = 0;
  let inQ = false;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQ = false;
        i++;
        continue;
      }
      field += c;
      i++;
      continue;
    }
    if (c === '"') {
      inQ = true;
      i++;
      continue;
    }
    if (c === delim) {
      row.push(field);
      field = '';
      i++;
      continue;
    }
    if (c === '\r') {
      i++;
      continue;
    }
    if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      i++;
      continue;
    }
    field += c;
    i++;
  }
  row.push(field);
  rows.push(row);
  if (rows.length > 1 && rows[rows.length - 1].length === 1 && rows[rows.length - 1][0] === '') rows.pop();
  return rows;
}
export function detectFormat(text) {
  if (text.indexOf('\t') >= 0) return 'tsv';
  if (text.indexOf(',') >= 0) return 'csv';
  return 'single';
}

export const EXCEL_DEFAULTS = { infmt: 'auto', outfmt: 'csv', custom: ',', rowmode: 'preserve', rowsep: 'space', firstRow: true, trim: true, emptyRows: false, emptyCells: false };

/** ref Excel & CSV run(): { result, csv, detect, status } */
export function convertSheet(text, o) {
  if (!text) return { result: '', csv: '', detect: 'Waiting for input…', status: '' };
  const fmt = o.infmt === 'auto' ? detectFormat(text) : o.infmt;
  const delim = fmt === 'tsv' ? '\t' : fmt === 'csv' ? ',' : '\t';
  const parsed = parseDelimited(text, delim);
  const maxCols = parsed.reduce((m, r) => Math.max(m, r.length), 0);
  const label = fmt === 'tsv' ? 'tab-separated' : fmt === 'csv' ? 'CSV' : 'single column';
  let rows = parsed.map((r) => r.slice());
  if (o.trim) rows = rows.map((r) => r.map((c) => c.trim()));
  if (!o.firstRow && rows.length) rows = rows.slice(1);
  if (o.emptyRows) rows = rows.filter((r) => r.some((c) => c !== ''));
  if (o.emptyCells) rows = rows.map((r) => r.filter((c) => c !== ''));
  const d = o.outfmt === 'csv' ? ',' : o.outfmt === 'tsv' ? '\t' : o.outfmt === 'pipe' ? '|' : o.outfmt === 'semicolon' ? ';' : o.custom || ',';
  const tsv = o.outfmt === 'tsv';
  const qField = (s, delimiter, isTsv) => {
    if (isTsv) return s.replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
    if (s.indexOf(delimiter) >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0 || s.indexOf('\r') >= 0) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const rowSep = { space: ' ', comma: ', ', semicolon: '; ', pipe: ' | ', newline: '\n' }[o.rowsep] || ' ';
  let result;
  if (o.rowmode === 'joinall') result = rows.map((r) => r.map((c) => qField(c, d, tsv)).join(d)).join(rowSep);
  else if (o.rowmode === 'rowline') result = rows.map((r) => r.map((c) => qField(c.replace(/\r?\n/g, ' '), d, tsv)).join(d)).join('\n');
  else result = rows.map((r) => r.map((c) => qField(c, d, tsv)).join(d)).join('\n');
  const csv = rows.map((r) => r.map((c) => qField(c, ',', false)).join(',')).join('\r\n');
  return { result, csv, detect: `Detected ${parsed.length} row(s) × ${maxCols} column(s) · ${label}`, status: `${rows.length} row(s) in output.` };
}

/* ================= Text Cleaner ================= */
export const CLEAN_OPTIONS = [
  ['extraSpace', 'Remove extra spaces'],
  ['trimLines', 'Trim each line'],
  ['blank', 'Remove blank lines'],
  ['dupes', 'Remove duplicate lines'],
  ['dupeCsv', 'Dedupe comma values', '(one line)'],
  ['normalize', 'Normalize line endings'],
  ['trimSep', 'Trim leading/trailing separators'],
  ['reverse', 'Reverse line order'],
];
export function cleanText(text, o, sort, dupeKeep, ci) {
  let t = text;
  if (o.normalize) t = t.replace(/\r\n?/g, '\n');
  let lines = t.split('\n');
  if (o.trimLines) lines = lines.map((l) => l.replace(/^\s+|\s+$/g, ''));
  if (o.extraSpace) lines = lines.map((l) => l.replace(/[ \t]{2,}/g, ' '));
  if (o.trimSep) lines = lines.map((l) => l.replace(/^[,;|\t ]+|[,;|\t ]+$/g, ''));
  if (o.blank) lines = lines.filter((l) => l.trim() !== '');
  if (o.dupes) {
    const seen = {};
    const out = [];
    const arr = dupeKeep === 'last' ? lines.slice().reverse() : lines;
    arr.forEach((l) => {
      const key = ci ? l.toLowerCase() : l;
      if (!seen[key]) {
        seen[key] = 1;
        out.push(l);
      }
    });
    if (dupeKeep === 'last') out.reverse();
    lines = out;
  }
  if (sort === 'az') lines = lines.slice().sort((a, b) => a.localeCompare(b));
  else if (sort === 'za') lines = lines.slice().sort((a, b) => b.localeCompare(a));
  if (o.reverse) lines = lines.slice().reverse();
  t = lines.join('\n');
  if (o.dupeCsv) {
    const seen2 = {};
    const o2 = [];
    t.split(',').forEach((p) => {
      const v = p.trim();
      const key = ci ? v.toLowerCase() : v;
      if (v === '') return;
      if (!seen2[key]) {
        seen2[key] = 1;
        o2.push(v);
      }
    });
    t = o2.join(', ');
  }
  return t;
}

/* ================= Find & Replace ================= */
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** { result, status, kind } */
export function findReplace(text, term, repl, { matchCase, wholeWord, regex }) {
  if (term === '') return { result: text, status: text ? 'Enter a term to find.' : '', kind: '' };
  const flags = `g${matchCase ? '' : 'i'}`;
  let re;
  try {
    let pattern;
    if (regex) pattern = term;
    else {
      pattern = escapeRegExp(term);
      if (wholeWord) pattern = `\\b${pattern}\\b`;
    }
    re = new RegExp(pattern, flags);
  } catch (e) {
    return { result: null, status: `Invalid regular expression: ${e.message}`, kind: 'err' };
  }
  const matches = text.match(re);
  const count = matches ? matches.length : 0;
  const replacement = regex ? repl : repl.replace(/\$/g, '$$$$');
  let out;
  try {
    out = text.replace(re, replacement);
  } catch (e) {
    return { result: null, status: `Replacement failed: ${e.message}`, kind: 'err' };
  }
  return { result: out, status: `${count} match${count === 1 ? '' : 'es'}${regex ? ' (regex)' : ''}`, kind: count ? 'ok' : '' };
}

/* ================= Lines & Lists ================= */
export const LINE_ACTIONS = [
  ['number', 'Number lines'],
  ['unnumber', 'Remove numbering'],
  ['bullet', 'Add bullets'],
  ['unbullet', 'Remove bullets'],
  ['prefix', 'Add prefix'],
  ['suffix', 'Add suffix'],
  ['sortaz', 'Sort A→Z'],
  ['reverse', 'Reverse order'],
  ['dedupe', 'Remove duplicates'],
  ['tocsv', 'Lines → list'],
  ['tolines', 'List → lines'],
  ['toarray', '→ JS array'],
  ['tojson', '→ JSON array'],
];
export function lineAction(action, input, { delim, affix, ignoreBlank }) {
  const raw = () => input.split(/\r?\n/);
  const items = () => (ignoreBlank ? raw().filter((l) => l.trim() !== '') : raw());
  switch (action) {
    case 'number':
      return raw().map((l, i) => `${i + 1}. ${l}`).join('\n');
    case 'unnumber':
      return raw().map((l) => l.replace(/^\s*\d+[.)\]]\s*/, '')).join('\n');
    case 'bullet':
      return raw().map((l) => (l.trim() === '' ? l : `- ${l}`)).join('\n');
    case 'unbullet':
      return raw().map((l) => l.replace(/^\s*[-*•]\s+/, '')).join('\n');
    case 'prefix':
      return raw().map((l) => affix + l).join('\n');
    case 'suffix':
      return raw().map((l) => l + affix).join('\n');
    case 'sortaz':
      return raw().slice().sort((a, b) => a.localeCompare(b)).join('\n');
    case 'reverse':
      return raw().slice().reverse().join('\n');
    case 'dedupe': {
      const seen = {};
      return raw()
        .filter((l) => (seen[l] ? false : (seen[l] = 1)))
        .join('\n');
    }
    case 'tocsv':
      return items().join(delim);
    case 'tolines': {
      const d = delim.trim() || ',';
      return input.split(d).map((s) => s.trim()).join('\n');
    }
    case 'toarray':
      return `[${items().map((s) => JSON.stringify(s)).join(', ')}]`;
    case 'tojson':
      return JSON.stringify(items(), null, 2);
    default:
      return input;
  }
}

/* ================= Developer tools ================= */
export const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
/* decoded through a detached <textarea> (RCDATA): tags never become elements, scripts never run */
export function unescapeHtml(s) {
  const ta = document.createElement('textarea');
  ta.innerHTML = s;
  return ta.value;
}
export function sqlIn(input, quoted) {
  const vals = input.split(/\r?\n/).map((s) => s.trim()).filter((s) => s !== '');
  if (!vals.length) return null;
  return `(${quoted ? vals.map((v) => `'${v.replace(/'/g, "''")}'`).join(', ') : vals.join(', ')})`;
}
export function toArray(input, mode, fmt, dropEmpty) {
  let parts = (mode === 'comma' ? input.split(',') : input.split(/\r?\n/)).map((s) => s.trim());
  if (dropEmpty) parts = parts.filter((s) => s !== '');
  if (!parts.length) return null;
  return { out: fmt === 'json' ? JSON.stringify(parts, null, 2) : `[${parts.map((s) => JSON.stringify(s)).join(', ')}]`, n: parts.length };
}
