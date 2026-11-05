/**
 * Browser-side state for /search, exposed as `useSyncExternalStore` stores
 * (the pattern lib/useMediaQuery.js uses): the server and the hydration pass
 * see the empty server snapshot, then the client snapshot takes over — no
 * setState-in-effect, no hydration mismatch.
 *
 * What the legacy PHP page kept in `$_SESSION`, now in the visitor's browser,
 * so the server keeps no per-visitor state:
 *
 *  - HISTORY  the last 10 searches with their answers (legacy
 *             MAX_HISTORY_ITEMS = 10). A repeated question is answered from
 *             here without another API call, exactly as chat/search.php
 *             returned the cached answer for a case-insensitive repeat.
 *  - GATE     when the visitor last dismissed the Enquire popup, so it opens
 *             automatically at most once a day rather than on every visit.
 *
 * Every storage access is wrapped: storage can be disabled, full or throw in
 * private windows, and the page works without it (history then lasts as long
 * as the page, and the popup opens once per page load).
 */

const HISTORY_KEY = 'atlas-ai-search-history';
const GATE_KEY = 'atlas-ai-search-popup-dismissed';
export const MAX_HISTORY_ITEMS = 10;
export const GATE_TTL_MS = 24 * 60 * 60 * 1000;

const listeners = new Set();
function emit() {
  for (const fn of listeners) fn();
}

export function subscribe(fn) {
  listeners.add(fn);
  const onStorage = (event) => {
    if (event.key === HISTORY_KEY || event.key === GATE_KEY || event.key === null) {
      historyRaw = undefined; // re-read
      fn();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(fn);
    window.removeEventListener('storage', onStorage);
  };
}

/* ── history ───────────────────────────────────────────────────────────── */

export const EMPTY_HISTORY = Object.freeze([]);
let memoryHistory = EMPTY_HISTORY;
let historyRaw; // last raw string read, so the snapshot keeps its identity
let historySnapshot = EMPTY_HISTORY;

function parse(raw) {
  try {
    const parsed = JSON.parse(raw || '[]');
    if (!Array.isArray(parsed)) return EMPTY_HISTORY;
    return parsed
      .filter((i) => i && typeof i.query === 'string' && typeof i.response === 'string')
      .slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return EMPTY_HISTORY;
  }
}

export function getHistory() {
  let raw = null;
  try {
    raw = window.localStorage.getItem(HISTORY_KEY);
  } catch {
    return memoryHistory;
  }
  if (raw === null) return memoryHistory.length ? memoryHistory : EMPTY_HISTORY;
  if (raw !== historyRaw) {
    historyRaw = raw;
    historySnapshot = parse(raw);
  }
  return historySnapshot;
}

export const getServerHistory = () => EMPTY_HISTORY;

export function setHistory(items) {
  const next = items.slice(0, MAX_HISTORY_ITEMS);
  memoryHistory = next;
  try {
    if (next.length) window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(HISTORY_KEY);
  } catch {
    /* memory only */
  }
  emit();
}

export function addToHistory(entry) {
  const q = entry.query.toLowerCase();
  setHistory([entry, ...getHistory().filter((h) => h.query.toLowerCase() !== q)]);
}

export function findInHistory(query) {
  const q = query.toLowerCase();
  return getHistory().find((h) => h.query.toLowerCase() === q) || null;
}

/* ── gate ──────────────────────────────────────────────────────────────── */

let gateMemo = 0;

/** true when the popup was dismissed within GATE_TTL_MS. */
export function getGateDismissed() {
  let at = gateMemo;
  try {
    at = Math.max(at, Number(window.localStorage.getItem(GATE_KEY)) || 0);
  } catch {
    /* this page load's memory only */
  }
  return at > 0 && Date.now() - at < GATE_TTL_MS;
}

/* null = unknown (server render and hydration) */
export const getServerGateDismissed = () => null;

export function rememberGateDismissed() {
  gateMemo = Date.now();
  try {
    window.localStorage.setItem(GATE_KEY, String(gateMemo));
  } catch {
    /* memory only */
  }
  emit();
}

/* ── the ?query= the page was opened with ──────────────────────────────── */

export const subscribeNever = () => () => {};
export function getUrlQuery() {
  return new URLSearchParams(window.location.search).get('query') || '';
}
export const getServerUrlQuery = () => null;

/** The legacy timestamp format, PHP `date('g:i A')` -> "3:05 PM". */
export function timeLabel(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
