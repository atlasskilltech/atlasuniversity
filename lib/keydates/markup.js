/**
 * Key Dates — the cell text format the admin edits, and its conversion to and from the "run" format
 * every key-dates renderer on the site already draws (components/Schools/ISDI/Admission/KeyDates).
 *
 * A cell's text is plain text with three optional tags, so an editor never needs to know HTML:
 *   <b>…</b>    bold (most cells are bold as a whole — use the cell's "Bold" switch for that)
 *   <g>…</g>    green (the colour the site paints open dates in — or the cell's "Green" switch)
 *   <sup>…</sup> superscript; "11th", "22nd", "1st" and "3rd" are superscripted automatically
 *   a new line  a line break (in a table it shows on screens up to 1100px wide, as the current
 *               tables do; in a date strip it is always a new line)
 *
 * Pure: shared by the admin editor (browser), the API (validation) and the public pages (server).
 */

const ORDINAL = /(\d)(st|nd|rd|th)\b/g;

/** "11th Sep" → ["11", { sup: 'th' }, " Sep"]; newlines → { br: true }. */
export function textToRuns(text, { autoSup = true } = {}) {
  const runs = [];
  const parts = String(text ?? '').split(/(<sup>[\s\S]*?<\/sup>|\n)/);
  for (const p of parts) {
    if (!p) continue;
    if (p === '\n') runs.push({ br: true });
    else if (p.startsWith('<sup>')) runs.push({ sup: p.slice(5, -6) });
    else if (autoSup) {
      let last = 0;
      for (const m of p.matchAll(ORDINAL)) {
        const end = m.index + 1;
        if (end > last) runs.push(p.slice(last, end));
        runs.push({ sup: m[2] });
        last = m.index + m[0].length;
      }
      if (last < p.length) runs.push(p.slice(last));
    } else runs.push(p);
  }
  return runs;
}

/** Inverse of textToRuns: runs → editable text. A `{ sup }` after a digit is written back as plain
 *  text ("11th"), because it is re-superscripted automatically; anything else keeps its tag. */
export function runsToText(runs) {
  if (typeof runs === 'string') return runs;
  if (!Array.isArray(runs)) return '';
  let out = '';
  for (const r of runs) {
    if (typeof r === 'string') out += r;
    else if (r?.br) out += '\n';
    else if (r?.sup != null) out += /\d$/.test(out) && /^(st|nd|rd|th)$/.test(r.sup) ? r.sup : `<sup>${r.sup}</sup>`;
    else if (typeof r?.bold === 'string') out += `<b>${r.bold}</b>`;
  }
  return out;
}

/**
 * Cell text + the cell's own switches → the `groups` an ISDI-style cell renders:
 * [{ runs, bold, tone }]. `<b>` and `<g>` split the text into groups; the cell switches set the default.
 */
export function textToGroups(text, { bold = false, green = false } = {}) {
  const groups = [];
  let b = bold;
  let g = green;
  const tokens = String(text ?? '').split(/(<\/?b>|<\/?g>)/);
  for (const t of tokens) {
    if (t === '<b>') b = true;
    else if (t === '</b>') b = bold;
    else if (t === '<g>') g = true;
    else if (t === '</g>') g = green;
    else if (t) {
      const runs = textToRuns(t);
      if (runs.length) groups.push({ runs, bold: b, tone: g ? 'green' : null });
    }
  }
  return groups.length ? groups : [{ runs: [''], bold, tone: green ? 'green' : null }];
}

/** ISDI-style cell groups → { text, bold, green } for the editor; shared styling becomes the switch. */
export function groupsToText(groups) {
  const gs = groups || [];
  const allBold = gs.length > 0 && gs.every((g) => g.bold || !runsToText(g.runs).trim());
  const allGreen = gs.length > 0 && gs.filter((g) => runsToText(g.runs).trim()).every((g) => g.tone === 'green');
  let text = '';
  for (const g of gs) {
    let t = runsToText(g.runs);
    if (!t.trim()) {
      text += t;
      continue;
    }
    if (g.tone === 'green' && !allGreen) t = `<g>${t}</g>`;
    if (g.bold && !allBold) t = `<b>${t}</b>`;
    text += t;
  }
  return { text, bold: allBold, green: allGreen && gs.some((g) => runsToText(g.runs).trim()) };
}

/** Plain text of a cell (no tags), for counting, search and labels. */
export function plainText(text) {
  return String(text ?? '')
    .replace(/<\/?(b|g|sup)>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const MONTH = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i;

/** A cell counts as a key date when it holds a month name or a status word ("Closed", "Open"). */
export function isDateText(text) {
  const t = plainText(text);
  if (!t) return false;
  if (/^(closed|applications? open|open|to be announced|tba)$/i.test(t)) return true;
  return MONTH.test(t) && /\d/.test(t);
}
