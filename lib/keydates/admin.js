import 'server-only';

/**
 * Key Dates — what the admin pages show. Reads the database live (never the public cache), so the admin
 * always sees what was just saved. If the database cannot be read, the pages still list every page and
 * table as the site was built, with a warning, and saving is what fails (with a clear message).
 */
import { NewsDbConfigError } from '@/lib/news/db/pool';
import { countDates, dateSignature } from './table.js';
import { addTargetsOf, CALENDARS, calendarById, calendarOf, originalTable, pageById, PAGES, slotsOf, summarize } from './registry.js';
import { readEdits } from './store.js';

const EMPTY = { byId: {}, custom: [] };

async function editsOrEmpty(pageId) {
  try {
    return { edits: await readEdits(pageId), dbError: null };
  } catch (e) {
    return { edits: EMPTY, dbError: e instanceof NewsDbConfigError ? 'not_configured' : e?.code || 'error' };
  }
}

const iso = (d) => (d ? new Date(d).toISOString() : null);

/** Every key-dates page with its numbers, for /admin/keydates. */
export async function loadOverview() {
  let dbError = null;
  const pages = [];
  for (const page of PAGES) {
    const slots = await slotsOf(page);
    const r = await editsOrEmpty(page.id);
    dbError = dbError || r.dbError;
    const lastEdit = [...Object.values(r.edits.byId), ...r.edits.custom].map((e) => iso(e.updatedAt)).filter(Boolean).sort().pop() || null;
    pages.push({ id: page.id, school: page.school, title: page.title, route: page.route, ...summarize(slots, r.edits), originalTables: slots.length, lastEdit });
  }
  const totals = pages.reduce(
    (t, p) => ({ pages: t.pages + 1, tables: t.tables + p.tables, dates: t.dates + p.dates, edited: t.edited + p.edited + p.hidden + p.added }),
    { pages: 0, tables: 0, dates: 0, edited: 0 }
  );
  return { pages, totals, dbError };
}

/** One page's tables for /admin/keydates/<page>: the page's own blocks (as built / edited / hidden) and
 *  the tables added to it. */
export async function loadPageDetail(pageId) {
  const page = pageById(pageId);
  if (!page) return null;
  const slots = await slotsOf(page);
  const { edits, dbError } = await editsOrEmpty(page.id);
  const tabs = page.kind === 'atlasTabs' ? page.data.tabs.map((t) => t.label) : null;
  const tables = slots.map((s) => {
    const original = originalTable(s);
    const e = edits.byId[s.id];
    const current = e?.table || original;
    const cal = calendarOf(page.id, s.id);
    return {
      slot: s.id,
      calendar: cal ? { id: cal.id, title: cal.title, pages: cal.copies.length } : null,
      label: s.label,
      tab: s.tab ?? null,
      status: e ? (e.status === 'hide' ? 'hidden' : 'edited') : 'original',
      original,
      table: current,
      dates: e?.status === 'hide' ? 0 : countDates(current),
      updatedAt: iso(e?.updatedAt),
    };
  });
  for (const c of edits.custom) {
    tables.push({ slot: c.id, label: 'Added table', tab: c.tab, status: 'added', original: null, table: c.table, dates: countDates(c.table), updatedAt: iso(c.updatedAt) });
  }
  return {
    page: { id: page.id, school: page.school, title: page.title, route: page.route },
    tabs,
    addTargets: page.id === 'isme-scholarships' ? [] : addTargetsOf(page),
    tables,
    dbError,
  };
}

/* ------------------------------------------------------------------------------------- shared calendars */

/** Every copy of one calendar as it stands now. */
async function calendarCopies(cal, cache) {
  const out = [];
  for (const [pageId, slotId] of cal.copies) {
    const page = pageById(pageId);
    if (!cache.has(pageId)) cache.set(pageId, { slots: await slotsOf(page), ...(await editsOrEmpty(pageId)) });
    const { slots, edits, dbError } = cache.get(pageId);
    const slot = slots.find((x) => x.id === slotId);
    const e = edits.byId[slotId];
    const table = e?.table || originalTable(slot);
    out.push({
      page: { id: page.id, school: page.school, title: page.title, route: page.route },
      slot: slotId,
      label: slot.label,
      status: e ? (e.status === 'hide' ? 'hidden' : 'edited') : 'original',
      table,
      original: originalTable(slot),
      dates: countDates(table),
      updatedAt: iso(e?.updatedAt),
      dbError,
    });
  }
  return out;
}

function syncState(copies) {
  const shown = copies.filter((c) => c.status !== 'hidden');
  if (!shown.length) return 'hidden';
  const sigs = new Set(shown.map((c) => dateSignature(c.table)));
  return sigs.size === 1 ? 'in-sync' : 'differ';
}

/** Every calendar with where it is shown and whether its copies agree — for /admin/keydates. */
export async function loadCalendars() {
  const cache = new Map();
  const out = [];
  for (const cal of CALENDARS) {
    const copies = await calendarCopies(cal, cache);
    out.push({
      id: cal.id,
      school: cal.school,
      title: cal.title,
      pages: copies.map((c) => ({ id: c.page.id, title: `${c.page.school} · ${c.page.title}`, route: c.page.route, status: c.status })),
      dates: Math.max(...copies.map((c) => c.dates)),
      sync: syncState(copies),
    });
  }
  return out;
}

/** One calendar for /admin/keydates/calendar/<id>. */
export async function loadCalendarDetail(id) {
  const cal = calendarById(id);
  if (!cal) return null;
  const copies = await calendarCopies(cal, new Map());
  return { calendar: { id: cal.id, school: cal.school, title: cal.title }, copies, sync: syncState(copies), dbError: copies.find((c) => c.dbError)?.dbError || null };
}
