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
  /* a normal user with S3 Drive sees ONLY their own folder (s3Folder) and can manage everything inside it */
  { key: 's3drive', label: 'S3 Drive (one folder)' },
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

/** Tabs only an admin can open, whatever a user's ticks say (never offered in the Users tab). */
export const ADMIN_ONLY_TABS = Object.freeze(['users', 'activity', 'map', 'pdf-studio']);

/** May `user` open `tab`? ('users', 'activity', 'map' and 'pdf-studio' are admin-only; a normal user
 *  opens S3 Drive only with the tab ticked AND a folder assigned.) */
export function canOpen(user, tab) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (!tab || tab === 'home') return true;
  if (ADMIN_ONLY_TABS.includes(tab)) return false;
  if (tab === 's3drive' && !user.s3Folder) return false;
  return Array.isArray(user.tabs) && user.tabs.includes(tab);
}

/**
 * The S3 folder a user is given ('a/b/'), normalised, or null when the value is not a usable folder.
 * Never the bucket root: giving a normal user '' would be the whole bucket.
 */
export function cleanS3Folder(raw) {
  let k = String(raw ?? '').trim().replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/{2,}/g, '/');
  if (!k) return null;
  if (!k.endsWith('/')) k += '/';
  if (k.length > 1024) return null;
  const parts = k.split('/').slice(0, -1);
  for (const p of parts) {
    if (!p || p === '.' || p === '..' || /[\x00-\x1f\x7f]/.test(p)) return null;
  }
  return k;
}

/**
 * Where `user` may work in S3 Drive: '' (the whole bucket) for an admin, their folder for a normal user,
 * null when they have no S3 access at all.
 */
export function s3Scope(user) {
  if (!user) return null;
  if (user.role === 'admin') return '';
  return canOpen(user, 's3drive') ? user.s3Folder : null;
}

/** Is the (already cleaned) key or prefix inside `scope`? '' is the whole bucket. */
export const insideScope = (scope, key) => scope === '' || (typeof key === 'string' && key.startsWith(scope));

/** The tab an /admin URL belongs to: '/admin/news/api/x' → 'news', '/admin/users/api' → 'users',
 *  '/admin/activity/export' → 'activity'.
 *  null for the hub itself and for sign-in / sign-out. */
export function tabForPath(pathname) {
  const m = /^\/admin\/([^/]+)/.exec(pathname || '');
  if (!m) return null;
  if (ADMIN_ONLY_TABS.includes(m[1])) return m[1];
  return TAB_KEYS.includes(m[1]) ? m[1] : null;
}
