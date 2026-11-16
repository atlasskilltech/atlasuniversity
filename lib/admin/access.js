/**
 * ATLAS Admin — who may open what. Plain data + pure functions, shared by the server guards
 * (lib/news/auth/admin.js), the admin chrome (components/Admin/AdminShell) and the Users tab.
 *
 * Two roles:
 *   admin  every tab, plus the Users tab (add, change and delete users)
 *   user   only the tabs listed on their account
 *
 * Add a new admin tool: add its key here, list it in AdminShell's TOOLS, and give its pages
 * `requireAdminPage({ tab: '<key>' })`. Its APIs are covered automatically when they live under
 * /admin/<key>/ (see tabForPath).
 */
export const TABS = Object.freeze([
  { key: 'news', label: 'News' },
  { key: 'keydates', label: 'Key Dates' },
  { key: 'hackathon', label: 'ATLAS Hackathon Registrations' },
]);

export const TAB_KEYS = TABS.map((t) => t.key);
export const ROLES = Object.freeze(['admin', 'user']);

/** The only Google Workspace domain allowed to sign in. */
export const ALLOWED_DOMAIN = (process.env.ADMIN_ALLOWED_DOMAIN || 'atlasuniversity.edu.in').toLowerCase();

export const normalizeEmail = (e) => String(e || '').trim().toLowerCase();

export function emailAllowed(email) {
  const e = normalizeEmail(email);
  return /^[^\s@]+@[^\s@]+$/.test(e) && e.endsWith(`@${ALLOWED_DOMAIN}`) && e.length <= 191;
}

/** Keep only known tab keys, once each, in TABS order. */
export function cleanTabs(tabs) {
  const set = new Set(Array.isArray(tabs) ? tabs : []);
  return TAB_KEYS.filter((k) => set.has(k));
}

/** Tabs only an admin can open, whatever a user's ticks say. */
export const ADMIN_ONLY_TABS = Object.freeze(['users', 'activity']);

/** May `user` open `tab`? ('users' and 'activity' are admin-only.) */
export function canOpen(user, tab) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (!tab || tab === 'home') return true;
  if (ADMIN_ONLY_TABS.includes(tab)) return false;
  return Array.isArray(user.tabs) && user.tabs.includes(tab);
}

/** The tab an /admin URL belongs to: '/admin/news/api/x' → 'news', '/admin/users/api' → 'users',
 *  '/admin/activity/export' → 'activity'.
 *  null for the hub itself and for sign-in / sign-out. */
export function tabForPath(pathname) {
  const m = /^\/admin\/([^/]+)/.exec(pathname || '');
  if (!m) return null;
  if (ADMIN_ONLY_TABS.includes(m[1])) return m[1];
  return TAB_KEYS.includes(m[1]) ? m[1] : null;
}
