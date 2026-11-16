import 'server-only';

/**
 * ATLAS Hackathon 2026 — registrations in `atlasnews_hackathon_registrations` (migration 0007), and the
 * one switch the admin controls: whether the public form accepts registrations
 * (`atlasnews_settings.hackathon_registration_open`, absent = open).
 *
 * Every value is bound (`?`); every timestamp is UTC (the pool runs with timezone 'Z') and shown in IST.
 */
import { randomBytes } from 'node:crypto';
import { T } from '@/lib/news/config';
import { query } from '@/lib/news/db/pool';
import { getSetting, setSetting } from '@/lib/news/db/settings';
import { COLUMN, FIELDS, normaliseMobile, cleanText } from './validate.js';

export const OPEN_SETTING = 'hackathon_registration_open';

/** httpOnly cookie, path /atlas-hackathon-2026: "<id>.<token>" of the registration this browser just made. */
export const CONFIRM_COOKIE = 'hk_reg';

export class DuplicateTeamError extends Error {
  constructor() {
    super('This team appears to be already registered.');
    this.name = 'DuplicateTeamError';
  }
}

const isDup = (e) => e?.errno === 1062 || e?.code === 'ER_DUP_ENTRY';

const LIST_COLUMNS = `id, ${Object.values(COLUMN).join(', ')}, source, legacy_id, mail_status, mail_error, mailed_at, created_at, updated_at`;

/** Is the public form open? Never throws: if the setting cannot be read, the form stays open. */
export async function isRegistrationOpen() {
  try {
    return (await getSetting(OPEN_SETTING, true)) !== false;
  } catch {
    return true;
  }
}

export async function setRegistrationOpen(open) {
  await setSetting(OPEN_SETTING, Boolean(open));
}

/** Clean form data (validateRegistration().data) -> column values in COLUMN order. */
const values = (data) => FIELDS.map((k) => data[k]);
const COLS = FIELDS.map((k) => COLUMN[k]);

export async function findDuplicate(teamName, leadEmail, exceptId = 0) {
  const rows = await query(`SELECT id FROM ${T.hackathon} WHERE team_name = ? AND team_lead_email = ? AND id <> ? LIMIT 1`, [teamName, leadEmail, exceptId]);
  return rows.length ? rows[0].id : null;
}

/**
 * Insert a registration from the form or the admin. Returns { id, token }. Throws DuplicateTeamError
 * when team name + lead email is taken (checked first, and again by the UNIQUE index if two
 * submissions race).
 */
export async function createRegistration(data, { source = 'form' } = {}) {
  if (await findDuplicate(data.team_name, data.lead_email)) throw new DuplicateTeamError();
  const token = randomBytes(16).toString('hex');
  try {
    const res = await query(
      `INSERT INTO ${T.hackathon} (${COLS.join(', ')}, source, confirm_token) VALUES (${COLS.map(() => '?').join(', ')}, ?, ?)`,
      [...values(data), source, token],
    );
    return { id: Number(res.insertId), token };
  } catch (e) {
    if (isDup(e)) throw new DuplicateTeamError();
    throw e;
  }
}

export async function updateRegistration(id, data) {
  if (await findDuplicate(data.team_name, data.lead_email, id)) throw new DuplicateTeamError();
  try {
    const res = await query(`UPDATE ${T.hackathon} SET ${COLS.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`, [...values(data), id]);
    return res.affectedRows > 0;
  } catch (e) {
    if (isDup(e)) throw new DuplicateTeamError();
    throw e;
  }
}

export async function deleteRegistration(id) {
  const res = await query(`DELETE FROM ${T.hackathon} WHERE id = ?`, [id]);
  return res.affectedRows > 0;
}

export async function getRegistration(id) {
  const rows = await query(`SELECT ${LIST_COLUMNS} FROM ${T.hackathon} WHERE id = ?`, [id]);
  return rows[0] || null;
}

/** The success page: the row this browser just created (id + its private token), within 2 hours. */
export async function getConfirmation(id, token) {
  if (!Number.isInteger(id) || id <= 0 || !/^[0-9a-f]{32}$/.test(String(token || ''))) return null;
  const rows = await query(
    `SELECT ${LIST_COLUMNS} FROM ${T.hackathon} WHERE id = ? AND confirm_token = ? AND created_at > (UTC_TIMESTAMP(3) - INTERVAL 2 HOUR)`,
    [id, token],
  );
  return rows[0] || null;
}

export async function listRegistrations() {
  return query(`SELECT ${LIST_COLUMNS} FROM ${T.hackathon} ORDER BY created_at DESC, id DESC`);
}

export async function setMailStatus(id, ok, error = null) {
  await query(
    `UPDATE ${T.hackathon} SET mail_status = ?, mail_error = ?, mailed_at = ${ok ? 'UTC_TIMESTAMP(3)' : 'mailed_at'} WHERE id = ?`,
    [ok ? 'sent' : 'failed', ok ? null : String(error || 'error').slice(0, 255), id],
  );
}

/* ----------------------------------------------------------------------------- import (old PHP site) */

/** The old site's export columns (registrations.csv). */
export const LEGACY_HEADER = Object.freeze([
  'id', 'team_name', 'school_college_name', 'school_college_location',
  'team_lead_name', 'team_lead_stream', 'team_lead_mobile', 'team_lead_email', 'team_lead_grade',
  'member2_name', 'member2_stream', 'member2_mobile', 'member2_email', 'member2_grade', 'created_at',
]);

/** "2026-10-26 12:33:30" in IST (the old site ran Asia/Kolkata) -> a UTC Date. */
export function istToUtc(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(String(s || '').trim());
  if (!m) return null;
  const utc = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0)) - 330 * 60 * 1000;
  return new Date(utc);
}

/**
 * Import the old site's rows (arrays of strings, header first). Values are taken as the old site
 * stored them — it had already validated them — only cleaned and length-checked so they fit the
 * columns. A row already imported (same old id) or already registered (same team name + lead email)
 * is skipped, so the import can be run again safely. Returns { inserted, skipped: [...], errors: [...] }.
 */
export async function importLegacyRows(rows) {
  const header = (rows[0] || []).map((h) => cleanText(h).toLowerCase());
  const missing = LEGACY_HEADER.filter((h) => !header.includes(h));
  if (missing.length) return { inserted: 0, skipped: [], errors: [`This is not the old site's export: missing column(s) ${missing.join(', ')}.`] };
  const at = (r, h) => r[header.indexOf(h)] ?? '';
  const MAX = { team_name: 60, school_college_name: 120, school_college_location: 100, team_lead_name: 80, team_lead_stream: 60, team_lead_email: 150, member2_name: 80, member2_stream: 60, member2_email: 150 };

  const out = { inserted: 0, skipped: [], errors: [] };
  for (const [n, r] of rows.slice(1).entries()) {
    const line = n + 2;
    const legacyId = Number.parseInt(at(r, 'id'), 10);
    const v = {};
    for (const col of Object.values(COLUMN)) v[col] = cleanText(at(r, col));
    for (const col of ['team_lead_email', 'member2_email']) v[col] = v[col].toLowerCase();
    for (const col of ['team_lead_mobile', 'member2_mobile']) v[col] = normaliseMobile(v[col]) || v[col].replace(/\D+/g, '').slice(-10);
    const created = istToUtc(at(r, 'created_at'));
    const problems = [];
    if (!Number.isInteger(legacyId) || legacyId <= 0) problems.push('no id');
    if (!v.team_name || !v.team_lead_email) problems.push('no team name or lead email');
    for (const [col, max] of Object.entries(MAX)) if ([...v[col]].length > max) problems.push(`${col} is longer than ${max}`);
    if (!created) problems.push('unreadable created_at');
    if (problems.length) {
      out.errors.push(`Row ${line}: ${problems.join(', ')}`);
      continue;
    }
    try {
      await query(
        `INSERT INTO ${T.hackathon} (${COLS.join(', ')}, source, legacy_id, mail_status, created_at) VALUES (${COLS.map(() => '?').join(', ')}, 'import', ?, 'not_sent', ?)`,
        [...COLS.map((c) => v[c]), legacyId, created],
      );
      out.inserted += 1;
    } catch (e) {
      if (isDup(e)) out.skipped.push(`Row ${line}: ${v.team_name} (already in the list)`);
      else throw e;
    }
  }
  return out;
}
