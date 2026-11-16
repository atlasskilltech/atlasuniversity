import 'server-only';

/**
 * Key Dates — storage (the `atlasnews_keydates` table, migration 0004) and the step every key-dates page
 * runs before it renders: "take my content, apply what the admin changed".
 *
 * Public reads are cached for 60 s and tagged `keydates`; every admin save expires the tag and the page's
 * route, so a change shows on the next visit. If the database cannot be read, a page shows the last
 * edits this server process read successfully, or — if it never read any — the content as built, so a
 * database outage never breaks or empties a key-dates section. Where the database is not configured at
 * all (a local checkout, CI), nothing is ever read and every page shows its content as built.
 */
import { unstable_cache } from 'next/cache';
import { T } from '@/lib/news/config';
import { NewsDbConfigError, query } from '@/lib/news/db/pool';
import { fromModel } from './convert.js';
import { cleanTable, propagate } from './table.js';
import { calendarById, originalTable, pageById, pageByRoute, slotsOf } from './registry.js';

export const KEYDATES_TAG = 'keydates';
export const KEYDATES_REVALIDATE_S = 60;

const EMPTY = Object.freeze({ byId: Object.freeze({}), custom: Object.freeze([]) });

const parse = (v) => {
  if (v == null) return null;
  if (typeof v === 'object') return v;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
};

/** Every saved change for one page, straight from the database: { byId: { slot: {status, table} }, custom: [...] }. */
export async function readEdits(pageId) {
  const rows = await query(
    `SELECT slot_id, kind, tab_index, position, data, updated_at FROM ${T.keydates} WHERE page_id = ? ORDER BY position, created_at`,
    [pageId]
  );
  const byId = {};
  const custom = [];
  for (const r of rows) {
    const table = parse(r.data);
    if (r.kind === 'custom') {
      if (table) custom.push({ id: r.slot_id, tab: r.tab_index, position: r.position, table, updatedAt: r.updated_at });
    } else byId[r.slot_id] = { status: r.kind, table, updatedAt: r.updated_at };
  }
  return { byId, custom };
}

/* last edits read successfully, per page — the fallback during a database outage */
const LAST_GOOD = new Map();

const cachedRead = unstable_cache(async (pageId) => readEdits(pageId), ['keydates-edits'], {
  tags: [KEYDATES_TAG],
  revalidate: KEYDATES_REVALIDATE_S,
});

/** Edits for a public page (cached). Never throws. */
export async function getEdits(pageId) {
  try {
    const edits = await cachedRead(pageId);
    LAST_GOOD.set(pageId, edits);
    return edits;
  } catch (e) {
    if (!(e instanceof NewsDbConfigError)) console.error(`[keydates] ${pageId}: edits unavailable (${e?.code || e?.name || 'error'}); showing ${LAST_GOOD.has(pageId) ? 'last read' : 'built'} dates`);
    return LAST_GOOD.get(pageId) ?? EMPTY;
  }
}

/* ------------------------------------------------------------------------------------- apply */

/** Apply edits to one block's data. Returns the data to render, or null when the block is hidden. */
function applySlot(slot, edits) {
  const e = edits.byId[slot.id];
  if (!e) return slot.source;
  if (e.status === 'hide') return null;
  return e.table ? fromModel(slot.shape, slot.source, e.table) : slot.source;
}

/**
 * The key-dates data a page should render, with the admin's changes applied.
 *   atlasTabs / atlasBlocks pages:  withKeyDates(pageId, data)          → data
 *   ISDI pages:                     withKeyDates(pageId, data, 'main')  → data | null (hidden)
 * Custom tables are appended as `grid` blocks (tabbed / block pages) or as `extras` (ISDI / ISME).
 */
export async function withKeyDates(pageId, data, sourceKey = 'main') {
  const page = pageById(pageId);
  if (!page) return data;
  const edits = await getEdits(pageId);
  if (!Object.keys(edits.byId).length && !edits.custom.length) return data;
  const slots = await slotsOf(page);
  const grid = (c) => ({ kind: 'grid', table: c.table, button: c.table.button });

  if (page.kind === 'atlasTabs') {
    return {
      ...data,
      tabs: data.tabs.map((tab, ti) => ({
        ...tab,
        blocks: [
          ...tab.blocks.map((_, bi) => applySlot(slots.find((s) => s.id === `t${ti}b${bi}`), edits)).filter(Boolean),
          ...edits.custom.filter((c) => (c.tab ?? 0) === ti).map(grid),
        ],
      })),
    };
  }
  if (page.kind === 'atlasBlocks') {
    return {
      ...data,
      blocks: [...data.blocks.map((_, bi) => applySlot(slots.find((s) => s.id === `b${bi}`), edits)).filter(Boolean), ...edits.custom.map(grid)],
    };
  }
  if (page.kind === 'isdi') {
    const out = applySlot(slots.find((s) => s.id === sourceKey), edits);
    if (sourceKey !== 'main' || !edits.custom.length) return out;
    return { ...(out ?? { ...data, hiddenBody: true }), extras: edits.custom.map((c) => c.table) };
  }
  return data;
}

/** ISME pages are drawn from their page JSON: apply edits to its key-dates blocks. */
export async function withIsmeKeyDates(ismePage) {
  const page = pageByRoute(ismePage?.path);
  if (!page) return ismePage;
  const edits = await getEdits(page.id);
  if (!Object.keys(edits.byId).length && !edits.custom.length) return ismePage;
  const slots = await slotsOf(page);
  let extrasPlaced = false;
  const blocks = [];
  ismePage.blocks.forEach((b, i) => {
    const slot = slots.find((s) => s.id === `j${i}`);
    if (!slot) return blocks.push(b);
    let out = applySlot(slot, edits);
    if (!out) return undefined;
    if (!extrasPlaced && edits.custom.length && (out.kind === 'keyTable' || out.kind === 'keyStrip')) {
      out = { ...out, extras: edits.custom.map((c) => c.table) };
      extrasPlaced = true;
    }
    return blocks.push(out);
  });
  return { ...ismePage, blocks };
}

/* ------------------------------------------------------------------------------------- admin writes */

export class KeyDatesError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function requireSlot(pageId, slotId) {
  const page = pageById(pageId);
  if (!page) throw new KeyDatesError(404, 'Unknown page.');
  if (slotId.startsWith('c-')) {
    const rows = await query(`SELECT id FROM ${T.keydates} WHERE id = ? AND kind = 'custom'`, [`${pageId}:${slotId}`]);
    if (!rows.length) throw new KeyDatesError(404, 'That table no longer exists.');
    return { page, custom: true };
  }
  const slot = (await slotsOf(page)).find((s) => s.id === slotId);
  if (!slot) throw new KeyDatesError(404, 'Unknown key-dates table.');
  return { page, slot, custom: false };
}

function validTable(input) {
  const { table, error } = cleanTable(input);
  if (error) throw new KeyDatesError(422, error);
  return table;
}

/** Save an edited table (an existing block or an added one). */
export async function saveTable(pageId, slotId, input) {
  const table = validTable(input);
  const { page, custom } = await requireSlot(pageId, slotId);
  if (custom) {
    await query(`UPDATE ${T.keydates} SET data = ? WHERE id = ?`, [JSON.stringify(table), `${pageId}:${slotId}`]);
  } else {
    await query(
      `INSERT INTO ${T.keydates} (id, page_id, slot_id, kind, data) VALUES (?, ?, ?, 'edit', ?)
       ON DUPLICATE KEY UPDATE kind = 'edit', data = VALUES(data)`,
      [`${pageId}:${slotId}`, pageId, slotId, JSON.stringify(table)]
    );
  }
  return page;
}

/** Hide a block that exists in the page's content. */
export async function hideTable(pageId, slotId) {
  const { page, custom } = await requireSlot(pageId, slotId);
  if (custom) throw new KeyDatesError(400, 'An added table is deleted, not hidden.');
  await query(
    `INSERT INTO ${T.keydates} (id, page_id, slot_id, kind, data) VALUES (?, ?, ?, 'hide', NULL)
     ON DUPLICATE KEY UPDATE kind = 'hide'`,
    [`${pageId}:${slotId}`, pageId, slotId]
  );
  return page;
}

/** Reset a content block to how the page was built (undo edit / unhide), or delete an added table. */
export async function resetTable(pageId, slotId) {
  const { page } = await requireSlot(pageId, slotId);
  await query(`DELETE FROM ${T.keydates} WHERE id = ?`, [`${pageId}:${slotId}`]);
  return page;
}

/** Restore a hidden block, keeping its edit if it had one (an un-hide that loses the edit would surprise). */
export async function showTable(pageId, slotId) {
  const { page } = await requireSlot(pageId, slotId);
  await query(`UPDATE ${T.keydates} SET kind = 'edit' WHERE id = ? AND kind = 'hide' AND data IS NOT NULL`, [`${pageId}:${slotId}`]);
  await query(`DELETE FROM ${T.keydates} WHERE id = ? AND kind = 'hide'`, [`${pageId}:${slotId}`]);
  return page;
}

/** Add a new table to a page (to tab `tab` on a tabbed page). */
export async function addTable(pageId, tab, input) {
  const page = pageById(pageId);
  if (!page) throw new KeyDatesError(404, 'Unknown page.');
  if (page.id === 'isme-scholarships') throw new KeyDatesError(400, 'Tables cannot be added to this page.');
  const table = validTable(input);
  let tabIndex = null;
  if (page.kind === 'atlasTabs') {
    tabIndex = Number.isInteger(tab) && tab >= 0 && tab < page.data.tabs.length ? tab : 0;
  }
  const slotId = `c-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.keydates} WHERE page_id = ? AND kind = 'custom'`, [pageId]);
  if (Number(n) >= 20) throw new KeyDatesError(400, 'A page can have at most 20 added tables.');
  await query(`INSERT INTO ${T.keydates} (id, page_id, slot_id, kind, tab_index, position, data) VALUES (?, ?, ?, 'custom', ?, ?, ?)`, [
    `${pageId}:${slotId}`,
    pageId,
    slotId,
    tabIndex,
    Number(n) + 1,
    JSON.stringify(table),
  ]);
  return { page, slotId };
}

/* ------------------------------------------------------------------------------------- shared calendars */

/** One copy of a calendar as it stands now: its slot, its current table and whether it is hidden. */
async function copyNow(pageId, slotId) {
  const page = pageById(pageId);
  const slot = (await slotsOf(page)).find((x) => x.id === slotId);
  if (!slot) throw new KeyDatesError(500, `Calendar copy ${pageId}:${slotId} no longer exists.`);
  const e = (await readEdits(pageId)).byId[slotId];
  return { page, slot, hidden: e?.status === 'hide', table: e?.table || originalTable(slot) };
}

function requireCalendar(calendarId) {
  const cal = calendarById(calendarId);
  if (!cal) throw new KeyDatesError(404, 'Unknown calendar.');
  return cal;
}

/* store a copy's table without changing whether it is hidden */
async function writeCopy(pageId, slotId, table) {
  const { table: clean, error } = cleanTable(table);
  if (error) throw new KeyDatesError(422, `${pageById(pageId).title}: ${error}`);
  await query(
    `INSERT INTO ${T.keydates} (id, page_id, slot_id, kind, data) VALUES (?, ?, ?, 'edit', ?)
     ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [`${pageId}:${slotId}`, pageId, slotId, JSON.stringify(clean)]
  );
}

/**
 * Save a change to a shared calendar on every page that shows it. The edit was made starting from the
 * first copy (the school's own admissions page); each other copy takes the changed cells and keeps its own
 * wording where it reads differently (lib/keydates/table.js propagate). Returns the pages changed.
 */
export async function saveCalendar(calendarId, input) {
  const cal = requireCalendar(calendarId);
  const next = validTable(input);
  const [primary, ...others] = cal.copies;
  const base = (await copyNow(...primary)).table;
  await writeCopy(primary[0], primary[1], next);
  for (const [p, sl] of others) await writeCopy(p, sl, propagate(base, next, (await copyNow(p, sl)).table));
  return cal.copies.map(([p]) => pageById(p));
}

/** Make every copy carry the dates of one copy (resolving "Dates differ"). */
export async function adoptCalendarVersion(calendarId, fromPage, fromSlot) {
  const cal = requireCalendar(calendarId);
  if (!cal.copies.some(([p, sl]) => p === fromPage && sl === fromSlot)) throw new KeyDatesError(400, 'That page is not part of this calendar.');
  const src = (await copyNow(fromPage, fromSlot)).table;
  for (const [p, sl] of cal.copies) {
    if (p === fromPage && sl === fromSlot) continue;
    await writeCopy(p, sl, propagate(null, src, (await copyNow(p, sl)).table));
  }
  return cal.copies.map(([p]) => pageById(p));
}

/** Hide / show / reset a calendar on every page that shows it. */
export async function calendarAction(calendarId, action) {
  const cal = requireCalendar(calendarId);
  const fn = { hide: hideTable, show: showTable, reset: resetTable }[action];
  if (!fn) throw new KeyDatesError(400, 'Unknown action.');
  for (const [p, sl] of cal.copies) await fn(p, sl);
  return cal.copies.map(([p]) => pageById(p));
}
