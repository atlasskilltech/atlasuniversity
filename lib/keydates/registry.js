import 'server-only';

/**
 * Key Dates — every page on the site that shows key dates, and every key-dates block on it.
 *
 * Found by reading the site's own content (and cross-checked against the website map's date facts,
 * data/map/facts.json): 13 pages. The ~95 ISME BBA programme pages only carry a "Key Dates" BUTTON that
 * links to the BBA Admissions page below, so they hold no dates of their own and are not listed.
 *
 * Each page names the content its key-dates section is drawn from, and how that content is laid out:
 *   atlasTabs    { tabs: [{ label, blocks: [table | strip] }] }   components/Admissions/KeyDates
 *   atlasBlocks  { blocks: [table | strip] }                      components/Schools/LawUgdx/Admission
 *   isdi         one or more { rows } | { strip } objects         components/Schools/ISDI/Admission/KeyDates
 *   isme         an ISME page JSON (keyTable / keyStrip / fees)   components/Schools/ISME/Sections/IsmePage
 *
 * A block's id is its position in that content ("t0b1" = tab 1, block 2), so it stays stable as long as
 * the page's content keeps its blocks in the same order — which is how every edit finds its block again.
 */
import { keyDates as ugKeyDates } from '@/lib/ugAdmissionsContent';
import { keyDates as pgKeyDates } from '@/lib/pgAdmissionsContent';
import { keyDates as integratedKeyDates } from '@/lib/integratedAdmissionsContent';
import { isdiAdmBdesKeyDates } from '@/lib/schools/isdi/admissionsBdesContent';
import { isdiAdmBtechKeyDates } from '@/lib/schools/isdi/admissionsBtechContent';
import { isdiAdmMdesKeyDates } from '@/lib/schools/isdi/admissionsMdesContent';
import { isdiAdmMbaKeyDates, isdiAdmMbaSecondStrip } from '@/lib/schools/isdi/admissionsMbaContent';
import { keyDates as ugdxKeyDates } from '@/lib/schools/ugdx/admissionsContent';
import { keyDates as lawKeyDates } from '@/lib/schools/law/admissionsContent';
import { loadIsmePage } from '@/lib/schools/isme/pages/load';
import { toModel } from './convert.js';
import { countDates } from './table.js';

export const PAGES = [
  { id: 'atlas-ug', school: 'ATLAS', title: 'UG Admissions', route: '/admissions/ug-admissions', kind: 'atlasTabs', data: ugKeyDates },
  { id: 'atlas-pg', school: 'ATLAS', title: 'PG Admissions', route: '/admissions/pg-admissions', kind: 'atlasTabs', data: pgKeyDates },
  { id: 'atlas-integrated', school: 'ATLAS', title: 'Integrated Admissions', route: '/admissions/integrated-admissions', kind: 'atlasTabs', data: integratedKeyDates },
  { id: 'isdi-bdes', school: 'ISDI', title: 'B.Des Admissions', route: '/schools/isdi/admissions/undergraduate/b-des', kind: 'isdi', sources: { main: isdiAdmBdesKeyDates } },
  { id: 'isdi-btech', school: 'ISDI', title: 'B.Tech Admissions', route: '/schools/isdi/admissions/undergraduate/b-tech', kind: 'isdi', sources: { main: isdiAdmBtechKeyDates } },
  { id: 'isdi-mdes', school: 'ISDI', title: 'M.Des Admissions', route: '/schools/isdi/admissions/postgraduate/m-des', kind: 'isdi', sources: { main: isdiAdmMdesKeyDates } },
  { id: 'isdi-mba', school: 'ISDI', title: 'MBA Admissions', route: '/schools/isdi/admissions/postgraduate/mba', kind: 'isdi', sources: { main: isdiAdmMbaKeyDates, second: isdiAdmMbaSecondStrip } },
  { id: 'isme-bba', school: 'ISME', title: 'BBA Admissions', route: '/schools/isme/admissions/undergraduate/admissions-bba-bachelor-of-business-administration', kind: 'isme' },
  { id: 'isme-bsc', school: 'ISME', title: 'B.Sc Admissions', route: '/schools/isme/admissions/undergraduate/bsc-admissions', kind: 'isme' },
  { id: 'isme-mba', school: 'ISME', title: 'MBA Admissions', route: '/schools/isme/admissions/postgraduate/admissions-mba-master-of-business-administration', kind: 'isme' },
  { id: 'isme-scholarships', school: 'ISME', title: 'Scholarships', route: '/schools/isme/scholarshipsv2', kind: 'isme' },
  { id: 'ugdx-admissions', school: 'uGDX', title: 'uGDX Admissions', route: '/schools/ugdx/admissions/ugdx-admissions', kind: 'atlasBlocks', data: ugdxKeyDates },
  { id: 'law-admissions', school: 'Law', title: 'Law Admissions', route: '/schools/law/law-admissions', kind: 'atlasBlocks', data: lawKeyDates },
];

export const SCHOOLS = ['ATLAS', 'ISDI', 'ISME', 'uGDX', 'Law'];

export const pageById = (id) => PAGES.find((p) => p.id === id) || null;
export const pageByRoute = (route) => PAGES.find((p) => p.route === route) || null;

const atlasShape = (b) => (b.kind === 'table' ? 'atlasTable' : 'atlasStrip');
const atlasName = (b) => (b.kind === 'table' ? String(b.table.caption).trim() : b.lead.title.filter((l) => l && l.trim() && l !== '\u200d').join(' — '));
const ISME_SHAPE = { keyTable: 'isdiTable', keyStrip: 'ismeStrip', fees: 'ismeFees' };

function isdiName(src) {
  if (src.rows) return String(src.rows[0]?.cells?.[0]?.text || src.heading || 'Key dates table').trim();
  return String(src.strip?.lead?.title || src.heading || 'Key dates').replace(/\s*\n+\s*/g, ' — ').trim();
}

/**
 * The page's key-dates blocks, in page order: [{ id, label, shape, source, tab }] — `source` is the data
 * the block is drawn from today, `tab` the tab index it sits in (atlasTabs only).
 */
export async function slotsOf(page) {
  switch (page.kind) {
    case 'atlasTabs':
      return page.data.tabs.flatMap((tab, ti) =>
        tab.blocks.map((b, bi) => ({ id: `t${ti}b${bi}`, label: `${tab.label} · ${atlasName(b)}`, shape: atlasShape(b), source: b, tab: ti }))
      );
    case 'atlasBlocks':
      return page.data.blocks.map((b, bi) => ({ id: `b${bi}`, label: atlasName(b), shape: atlasShape(b), source: b }));
    case 'isdi':
      return Object.entries(page.sources).map(([key, src]) => ({
        id: key,
        label: isdiName(src) + (key === 'second' ? ' (second strip)' : ''),
        shape: src.rows ? 'isdiTable' : 'isdiStrip',
        source: src,
      }));
    case 'isme': {
      const json = await loadIsmePage(page.route);
      return (json?.blocks || []).flatMap((b, i) => {
        const shape = ISME_SHAPE[b.kind];
        if (!shape) return [];
        if (b.kind === 'fees' && !/key\s*dates/i.test(String(b.heading || ''))) return [];
        const lead = b.kind === 'keyStrip' ? b.cards.find((c) => c.lead) : null;
        const label =
          b.kind === 'keyTable'
            ? String(b.rows?.[0]?.cells?.[0]?.text || b.heading).trim()
            : lead
              ? [].concat(lead.title).join(' ').replace(/\s*\n+\s*/g, ' — ').trim()
              : `${b.heading}`;
        return [{ id: `j${i}`, label, shape, source: b }];
      });
    }
    default:
      return [];
  }
}

/** Where a new table can be added on this page: tab labels for a tabbed page, otherwise one place. */
export function addTargetsOf(page) {
  if (page.kind === 'atlasTabs') return page.data.tabs.map((t, i) => ({ tab: i, label: t.label }));
  return [{ tab: null, label: 'After the existing key dates' }];
}

/** The original (unedited) table for a block — what the editor opens with and what "Reset" restores. */
export function originalTable(slot) {
  return toModel(slot.shape, slot.source);
}

/** Overview numbers for one page from its blocks and its saved edits. */
export function summarize(slots, edits) {
  let dates = 0;
  let tables = 0;
  for (const s of slots) {
    const e = edits.byId[s.id];
    if (e?.status === 'hide') continue;
    tables += 1;
    dates += countDates(e?.status === 'edit' ? e.table : originalTable(s));
  }
  for (const c of edits.custom) {
    tables += 1;
    dates += countDates(c.table);
  }
  return {
    tables,
    dates,
    edited: Object.values(edits.byId).filter((e) => e.status === 'edit').length,
    hidden: Object.values(edits.byId).filter((e) => e.status === 'hide').length,
    added: edits.custom.length,
  };
}
