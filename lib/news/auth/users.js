/**
 * ATLAS Admin — the people who may sign in (atlasnews_admin_users).
 *
 * Only an email listed here can sign in with Google. ADMIN_BOOTSTRAP_EMAIL (server setting) is the
 * owner: it is created as an admin the first time it is needed, is always an admin, and cannot be
 * demoted or deleted from the Users tab — so the admin can never be locked out. Everyone else is added,
 * changed and removed by an admin in the Users tab.
 *
 * Pure database logic, no `server-only`, so the tests can use it.
 */
import { T } from '../config.js';
import { query } from '../db/pool.js';
import { cleanTabs, emailAllowed, normalizeEmail, ROLES } from '../../admin/access.js';

export class UserError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export const ownerEmail = () => normalizeEmail(process.env.ADMIN_BOOTSTRAP_EMAIL);
export const isOwner = (email) => Boolean(ownerEmail()) && normalizeEmail(email) === ownerEmail();

function parseTabs(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) return cleanTabs(raw);
  try {
    return cleanTabs(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function rowToUser(r) {
  if (!r) return null;
  return {
    id: Number(r.id),
    email: r.email,
    name: r.name || null,
    role: r.role === 'admin' ? 'admin' : 'user',
    tabs: r.role === 'admin' ? [] : parseTabs(r.tabs),
    owner: isOwner(r.email),
    createdBy: r.created_by || null,
    lastLoginAt: r.last_login_at || null,
    createdAt: r.created_at || null,
  };
}

const COLS = 'id, email, name, role, tabs, created_by, last_login_at, created_at';

export async function listUsers() {
  await ensureOwner();
  const rows = await query(`SELECT ${COLS} FROM ${T.adminUsers} ORDER BY role = 'admin' DESC, email`);
  return rows.map(rowToUser);
}

export async function findUserByEmail(email) {
  const rows = await query(`SELECT ${COLS} FROM ${T.adminUsers} WHERE email = ?`, [normalizeEmail(email)]);
  return rowToUser(rows[0]);
}

export async function findUserById(id) {
  const rows = await query(`SELECT ${COLS} FROM ${T.adminUsers} WHERE id = ?`, [id]);
  return rowToUser(rows[0]);
}

/** Make sure the owner exists and is an admin. Safe to call often; a no-op without the setting. */
export async function ensureOwner() {
  const email = ownerEmail();
  if (!email || !emailAllowed(email)) return null;
  await query(
    `INSERT INTO ${T.adminUsers} (email, role, tabs, created_by) VALUES (?, 'admin', NULL, 'server setting')
     ON DUPLICATE KEY UPDATE role = 'admin'`,
    [email],
  );
  return findUserByEmail(email);
}

async function adminCount() {
  const r = await query(`SELECT COUNT(*) AS n FROM ${T.adminUsers} WHERE role = 'admin'`);
  return Number(r[0]?.n || 0);
}

function validate({ email, role, tabs }) {
  const e = normalizeEmail(email);
  if (!emailAllowed(e)) throw new UserError(422, 'invalid_email', `Enter a ${process.env.ADMIN_ALLOWED_DOMAIN || 'atlasuniversity.edu.in'} email address.`);
  if (!ROLES.includes(role)) throw new UserError(422, 'invalid_role', 'Choose Admin or Normal user.');
  const t = role === 'admin' ? [] : cleanTabs(tabs);
  return { email: e, role, tabs: t };
}

export async function addUser(input, actor) {
  const { email, role, tabs } = validate(input);
  if (await findUserByEmail(email)) throw new UserError(409, 'exists', 'That email is already a user.');
  await query(`INSERT INTO ${T.adminUsers} (email, role, tabs, created_by) VALUES (?, ?, ?, ?)`, [
    email, role, role === 'admin' ? null : JSON.stringify(tabs), normalizeEmail(actor?.email) || null,
  ]);
  return findUserByEmail(email);
}

export async function updateUser(id, input, actor) {
  const user = await findUserById(id);
  if (!user) throw new UserError(404, 'not_found', 'That user no longer exists.');
  const { role, tabs } = validate({ email: user.email, role: input.role, tabs: input.tabs });
  if (user.role === 'admin' && role !== 'admin') {
    if (user.owner) throw new UserError(422, 'owner', 'This is the main admin set in the server settings; it always stays an admin.');
    if (actor && Number(actor.id) === user.id) throw new UserError(422, 'self', 'You cannot remove your own admin role. Ask another admin.');
    if ((await adminCount()) <= 1) throw new UserError(422, 'last_admin', 'There must be at least one admin.');
  }
  await query(`UPDATE ${T.adminUsers} SET role = ?, tabs = ? WHERE id = ?`, [role, role === 'admin' ? null : JSON.stringify(tabs), id]);
  return findUserById(id);
}

export async function deleteUser(id, actor) {
  const user = await findUserById(id);
  if (!user) throw new UserError(404, 'not_found', 'That user no longer exists.');
  if (user.owner) throw new UserError(422, 'owner', 'This is the main admin set in the server settings and cannot be deleted.');
  if (actor && Number(actor.id) === user.id) throw new UserError(422, 'self', 'You cannot delete yourself. Ask another admin.');
  if (user.role === 'admin' && (await adminCount()) <= 1) throw new UserError(422, 'last_admin', 'There must be at least one admin.');
  /* their sessions go with them (ON DELETE CASCADE) */
  await query(`DELETE FROM ${T.adminUsers} WHERE id = ?`, [id]);
  return true;
}

/** At Google sign-in: the account for `email`, or null when it is not allowed in. */
export async function userForSignIn(email, name) {
  const e = normalizeEmail(email);
  if (!emailAllowed(e)) return null;
  if (isOwner(e)) await ensureOwner();
  const user = await findUserByEmail(e);
  if (!user) return null;
  await query(`UPDATE ${T.adminUsers} SET last_login_at = UTC_TIMESTAMP(3), name = ? WHERE id = ?`, [name ? String(name).slice(0, 191) : user.name, user.id]);
  return user;
}
