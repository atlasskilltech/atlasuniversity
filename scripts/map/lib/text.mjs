/*
 * Deterministic text helpers for the map discovery engine. No guessing: every function either
 * recognises a pattern exactly or returns null.
 */

const INVISIBLE = /[​‌‍﻿]/g;

/**
 * Flatten any value the content modules use for text into one plain string:
 *   'text' · ['run', { sup: 'th' }, ' Nov 2026'] · ['Application', 'Deadline'] ·
 *   { day: '20', suffix: 'th', rest: 'Aug 2026' } · { text } · { strong } · { bold } · { sup }
 * A list of plain strings is a list of lines (joined by a space); a list that mixes in run
 * objects is one line of runs (joined as-is).
 */
export function flat(v) {
  if (v == null || v === false) return '';
  if (typeof v === 'string') return clean(v);
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) {
    const lines = v.every((x) => typeof x === 'string');
    return clean(v.map((x) => (typeof x === 'string' ? x : flat(x))).join(lines ? ' ' : ''));
  }
  if (typeof v === 'object') {
    if ('day' in v || 'rest' in v) return clean(`${v.day ?? ''}${v.suffix ?? ''} ${v.rest ?? ''}`);
    for (const k of ['text', 'strong', 'bold', 'b', 'sup', 'value', 'label', 'title']) {
      if (typeof v[k] === 'string' || Array.isArray(v[k])) return flat(v[k]);
    }
  }
  return '';
}

export function clean(s) {
  return String(s).replace(INVISIBLE, '').replace(/\s+/g, ' ').trim();
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
function month(word) {
  const i = MONTHS.indexOf(String(word).slice(0, 3).toLowerCase());
  return i < 0 ? null : i + 1;
}
const pad = (n) => String(n).padStart(2, '0');

/**
 * Parse a published date string. Returns
 *   { iso: 'YYYY-MM-DD', precision: 'day' } · { iso: 'YYYY-MM', precision: 'month' } ·
 *   { state: 'closed' | 'tba' } · null when the text is not a date at all.
 * Only explicit day/month/year text is recognised; nothing is inferred.
 */
export function parseDate(text) {
  const t = clean(text);
  if (!t) return null;
  if (/^closed$/i.test(t)) return { state: 'closed' };
  if (/^applications? (are )?open$/i.test(t)) return { state: 'open' };
  if (/to be announced|tba\b/i.test(t)) return { state: 'tba' };
  let m = t.match(/\b(\d{1,2})\s*(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\.?,?\s+(\d{4})\b/);
  if (m && month(m[2])) {
    const d = Number(m[1]);
    if (d >= 1 && d <= 31) return { iso: `${m[3]}-${pad(month(m[2]))}-${pad(d)}`, precision: 'day' };
  }
  m = t.match(/\b([A-Za-z]{3,9})\.?,?\s+(\d{4})\b/);
  if (m && month(m[1])) return { iso: `${m[2]}-${pad(month(m[1]))}`, precision: 'month' };
  return null;
}

/** '7,35,000' / '₹3,500' / '3500' -> 735000 / 3500 / 3500; null when no amount is present */
export function parseAmount(text) {
  const m = clean(text).match(/(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{2,3})+|\d+)(?:\.\d+)?/i);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
}

/** Degree named in a programme title or URL — recognised, never guessed. */
const DEGREES = [
  [/b\.?\s?tech\s*\+\s*mba|integrated-b-tech/i, 'B.Tech + MBA'],
  [/bba\s*ll\.?b|program-page-law/i, 'BBA LL.B. (Hons.)'],
  [/\bb\.?\s?des\b|\/b-des(\/|$)/i, 'B.Des'],
  [/\bb\.?\s?tech\b|\/btech\/|b-tech-in|\/b-tech(\/|$)/i, 'B.Tech'],
  [/\bbba\b|bba-hons/i, 'BBA (Hons.)'],
  [/\bb\.?\s?sc\b|bsc-/i, 'B.Sc. (Hons.)'],
  [/\bm\.?\s?des\b|\/mdes\/|\/m-des(\/|$)|m-des-in/i, 'M.Des'],
  [/\bmba\b|\/mba\b|mba-/i, 'MBA'],
  [/postgraduate-diploma/i, 'Postgraduate Diploma'],
  [/summer\s?school|summerschool|summertech/i, 'Summer School'],
];
export function degreeOf(...texts) {
  for (const t of texts) {
    if (!t) continue;
    for (const [re, name] of DEGREES) if (re.test(t)) return name;
  }
  return null;
}

/** The school a site path belongs to, from its URL alone */
export const SCHOOLS = {
  isdi: { id: 'isdi', name: 'ISDI – School of Design & Innovation', short: 'ISDI' },
  isme: { id: 'isme', name: 'ISME – School of Management & Entrepreneurship', short: 'ISME' },
  ugdx: { id: 'ugdx', name: 'uGDX – School of Technology', short: 'uGDX' },
  law: { id: 'law', name: 'School of Law', short: 'Law' },
};
export function schoolOfPath(p) {
  const m = String(p || '').match(/^\/schools\/(isdi|isme|ugdx|law)(\/|$)/);
  return m ? m[1] : null;
}
/** A key-dates tab label such as 'uGDX School of Technology' / 'ATLAS School of Law' */
export function schoolOfLabel(label) {
  const t = String(label || '');
  if (/isdi|design/i.test(t)) return 'isdi';
  if (/isme|management/i.test(t)) return 'isme';
  if (/ugdx|technology/i.test(t)) return 'ugdx';
  if (/law/i.test(t)) return 'law';
  return null;
}

/** '/a/b/' -> '/a/b'; decodes %xx so `&` routes compare equal; keeps case */
export function normPath(href) {
  if (!href || typeof href !== 'string') return null;
  let h = href.trim();
  const abs = h.match(/^https?:\/\/(?:www\.)?atlasuniversity\.edu\.in(\/.*)?$/i);
  if (abs) h = abs[1] || '/';
  if (!h.startsWith('/')) return null;
  h = h.split('#')[0].split('?')[0];
  try {
    h = decodeURI(h);
  } catch {
    /* keep as authored */
  }
  if (h.length > 1) h = h.replace(/\/+$/, '');
  return h || '/';
}

export function hashOf(s) {
  let h = 2166136261;
  for (const ch of String(s)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}
