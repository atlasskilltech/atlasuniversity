/*
 * Fact extraction — rule-based walkers over the site's own content modules.
 *
 * Each walker recognises one shape the content modules already use and reads it as-is. Nothing is
 * inferred: a value is only ever text the page itself renders. Every fact keeps the page that
 * renders it (`route`), so its source can be opened and checked.
 *
 *   stats band      [{ label: 'Duration' | 'Eligibility Criteria' | 'Next Intake', value, note }]
 *   fee cards       { heading: /fee structure/, cards: [{ lead, lines } | { label|title, value }] , button: { href } }
 *   fee lines       { title: 'Application Fee: ₹3,500' } / { text: '… enrolment fee of ₹50,000 … Nonrefundable' }
 *   eligibility     eligibilityRows: [{ label, value | values }]
 *   key dates       { heading: /key dates/, tabs | strip | blocks } -> strips (lead + cards) and tables (rows)
 *   scholarships    { heading: /scholarship/ } -> one item, its card titles
 *   documents       { label, href } where href is a fee structure, a PDF or a brochure page
 */
import { flat, clean, parseDate, parseAmount, schoolOfLabel, hashOf } from './text.mjs';

const STAT_KEYS = [
  [/^(program(me)?\s+)?duration$/i, 'duration'],
  [/^eligibility( criteria)?$/i, 'eligibilitySummary'],
  [/^next intake$/i, 'nextIntake'],
];

function statKey(label) {
  for (const [re, k] of STAT_KEYS) if (re.test(clean(label))) return k;
  return null;
}

function feeKey(label) {
  const l = clean(label);
  if (/^total duration$/i.test(l)) return 'duration';
  if (/application fee/i.test(l)) return 'applicationFee';
  if (/enrol+ment fee/i.test(l)) return 'enrolmentFee';
  const y = l.match(/^year\s*(\d)$/i);
  if (y) return `yearFee${y[1]}`;
  const s = l.match(/^sem(ester)?\s*(\d+)$/i);
  if (s) return `semesterFee${s[2]}`;
  if (/registration/i.test(l)) return 'registrationFee';
  return null;
}

function docKind(label, href) {
  const l = clean(label);
  const h = String(href || '');
  if (!h || h.startsWith('#')) return null; // an in-page anchor is not a document
  if (/crm\.|widgets?\//i.test(h)) return null; // lead-capture widgets are forms, not documents
  /* the label decides first: a flipbook can be a policy as well as a fee structure */
  if (/admissions?\s+policy/i.test(l) || /admissions-policy/i.test(h)) return 'admissionsPolicy';
  if (/scholarship/i.test(l) || /scholarship/i.test(h)) return 'scholarships';
  if (/education loan/i.test(l) || /education-loan/i.test(h)) return 'educationLoan';
  if (/fee structure/i.test(l) || /fee-structure/i.test(h)) return 'feeStructure';
  if (/\.pdf(\?|$)/i.test(h)) return 'pdf';
  if (/brochure/i.test(l) && /^(https?:|\/)/.test(h)) return 'brochure';
  if (/fliphtml5/i.test(h)) return 'document';
  return null;
}

export function extractFacts(route, modules) {
  const facts = [];
  const seen = new WeakSet();
  /* the heading of the block a fact was read from ("Key Dates & Deadlines", "Fee Structure", …) */
  let section = null;
  const add = (f) => {
    const fact = { route, section, ...f };
    fact.id = hashOf([route, f.kind, f.key, f.group || '', f.label || '', f.value || '', f.href || ''].join('|'));
    if (!facts.some((x) => x.id === fact.id)) facts.push(fact);
  };

  function dateItem(label, value, group, school) {
    const text = flat(value);
    if (!text) return;
    add({ kind: 'date', key: 'date', label: flat(label), value: text, group, school, date: parseDate(text) });
  }

  function strip(s, group, school) {
    if (!s) return;
    const lead = s.lead || {};
    const leadTitle = flat(lead.title);
    if (lead.value != null) dateItem(leadTitle, lead.value, group, school);
    for (const c of s.cards || []) dateItem(c.label, c.value, group ? `${group} · ${leadTitle}` : leadTitle, school);
  }

  function table(t, group, school) {
    if (!t) return;
    const caption = flat(t.caption);
    for (const r of t.rows || []) {
      dateItem(r.label, r.value, [group, caption].filter(Boolean).join(' · '), school);
      if (r.note) dateItem(`${flat(r.label)} (note)`, r.note, [group, caption].filter(Boolean).join(' · '), school);
    }
  }

  /* ISDI admissions calendars: rows of cells — a header row (the caption), a "Cycle" row naming
     the columns, then one row per milestone with a value per cycle */
  function cellTable(rows) {
    let caption = '';
    let cols = [];
    for (const r of rows) {
      /* a cell is `text`, a run list, or (ISME calendars) `groups` of runs */
      const cells = (r.cells || []).map((c) => (c.groups ? clean(c.groups.map((g) => flat(g.runs)).join(' ')) : flat(c.text ?? c.runs)));
      if (!cells.length) continue;
      if (r.cells.length === 1 && r.cells[0].header) {
        caption = cells[0];
        continue;
      }
      if (/^cycle$/i.test(cells[0])) {
        cols = cells;
        continue;
      }
      for (let i = 1; i < cells.length; i++) {
        const label = cols.length > 2 && cols[i] ? `${cells[0]} (${cols[i]})` : cells[0];
        dateItem(label, cells[i], caption, schoolOfLabel(caption) || (route.startsWith('/schools/isdi') ? 'isdi' : null));
      }
    }
  }

  function keyDates(obj) {
    if (Array.isArray(obj.rows) && obj.rows.some((r) => Array.isArray(r.cells))) {
      cellTable(obj.rows);
      return;
    }
    /* ISME strip: one card list whose first card is the lead (`lead: true`) */
    if (Array.isArray(obj.cards) && !obj.tabs && !obj.blocks && !obj.strip) {
      const lead = obj.cards.find((c) => c.lead === true);
      strip({ lead: lead ? { title: lead.title, value: lead.value } : {}, cards: obj.cards.filter((c) => c !== lead) }, '', null);
      return;
    }
    const tabs = Array.isArray(obj.tabs) ? obj.tabs : [{ label: '', blocks: obj.blocks, strip: obj.strip }];
    for (const tab of tabs) {
      const group = flat(tab.label);
      const school = schoolOfLabel(group);
      if (tab.strip) strip(tab.strip, group, school);
      for (const b of tab.blocks || []) {
        if (b.kind === 'table' || b.table) table(b.table || b, group, school);
        else strip(b, group, school);
      }
    }
    if (obj.strip && !obj.tabs) {
      /* handled above through the synthetic tab */
    }
  }

  function visit(v, depth, keyName) {
    if (v == null || typeof v !== 'object' || depth > 14) return;
    if (seen.has(v)) return;
    seen.add(v);

    if (Array.isArray(v)) {
      /* stats band */
      if (v.length && v.every((x) => x && typeof x === 'object' && 'label' in x && 'value' in x)) {
        const keyed = v.filter((x) => statKey(flat(x.label)));
        if (keyed.length) {
          for (const x of keyed) {
            add({ kind: 'programme', key: statKey(flat(x.label)), label: flat(x.label), value: flat(x.value), note: flat(x.note) || null });
          }
        }
      }
      if (keyName === 'eligibilityRows') {
        for (const r of v) {
          const val = Array.isArray(r.values) ? r.values.map(flat).join(' · ') : flat(r.value);
          if (flat(r.label) && val) add({ kind: 'eligibility', key: 'eligibility', label: flat(r.label), value: val });
        }
      }
      v.forEach((x) => visit(x, depth + 1, keyName));
      return;
    }

    const heading = flat(v.heading);
    /* every fact read inside this block carries its heading as its source section */
    const outer = section;
    if (heading) section = heading;
    if (heading && /key dates/i.test(heading)) {
      keyDates(v);
      section = outer;
      return;
    }
    if (heading && /fee structure/i.test(heading) && Array.isArray(v.cards)) {
      for (const c of v.cards) {
        /* ISDI cards: { lead: label, lines: value }; ISME cards: { label | title, value }, where
           `lead: true` only flags the first card */
        const label = flat(typeof c.lead === 'boolean' ? c.label ?? c.title : c.lead ?? c.label ?? c.title);
        const value = flat(c.lines ?? c.value);
        const key = feeKey(label);
        if (!value) continue;
        add({ kind: key === 'duration' ? 'programme' : 'fee', key: key || 'feeOther', label, value, amount: key && key !== 'duration' ? parseAmount(value) : null, note: flat(c.note) || null });
      }
    }
    if (heading && /scholarship/i.test(heading)) {
      const titles = (v.cards || v.items || []).map((c) => flat(c.title || c.heading)).filter(Boolean);
      add({ kind: 'scholarship', key: 'scholarships', label: heading, value: titles.join(' · ') || heading });
    }

    /* ISDI programme eligibility block: fee lines */
    const title = typeof v.title === 'string' ? clean(v.title) : '';
    const appFee = title.match(/application fee\s*[:\-]?\s*(₹\s*[\d,]+)/i);
    if (appFee) add({ kind: 'fee', key: 'applicationFee', label: 'Application Fee', value: clean(appFee[1]), amount: parseAmount(appFee[1]) });
    const text = typeof v.text === 'string' ? clean(v.text) : '';
    const enrol = text.match(/enrol+ment fee of\s*(₹\s*[\d,]+)/i);
    if (enrol) {
      const refundable = /non-?\s?refundable/i.test(text) ? false : /refundable/i.test(text) ? true : null;
      add({ kind: 'fee', key: 'enrolmentFee', label: 'Enrolment Fee', value: clean(enrol[1]), amount: parseAmount(enrol[1]), refundable, note: text });
    }

    /* documents */
    if (typeof v.href === 'string') {
      const label = flat(v.label) || title;
      const kind = docKind(label, v.href);
      if (kind) add({ kind: 'document', key: kind, label: label || kind, value: v.href, href: v.href });
    }

    for (const [k, x] of Object.entries(v)) visit(x, depth + 1, k);
    section = outer;
  }

  for (const mod of modules) for (const [k, v] of Object.entries(mod)) visit(v, 0, k);
  return facts;
}
