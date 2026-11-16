import 'server-only';

/**
 * Key Dates — what the admin pages show. Reads the database live (never the public cache), so the admin
 * always sees what was just saved. If the database cannot be read, the pages still list every page and
 * table as the site was built, with a warning, and saving is what fails (with a clear message).
 */
import { NewsDbConfigError } from '@/lib/news/db/pool';
import { countDates } from './table.js';
import { addTargetsOf, originalTable, pageById, PAGES, slotsOf, summarize } from './registry.js';
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
    return {
      slot: s.id,
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
