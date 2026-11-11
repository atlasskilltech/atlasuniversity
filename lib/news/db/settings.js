/**
 * ATLAS News — key/value settings in `atlasnews_settings`. Values are JSON-encoded.
 * Shared by the app and the CLI (no `server-only`).
 */
import { T } from '../config.js';
import { query } from './pool.js';

export const SETTING = Object.freeze({
  /* scrypt hash of the temporary admin password (lib/news/auth/password.js). Set with
     `npm run news:admin -- set-password`; never exposed by any route. */
  adminPasswordHash: 'admin_password_hash',
  adminPasswordUpdatedAt: 'admin_password_updated_at',
  /* public News pages are noindex unless this is exactly true (default: absent = false). Changed only with
     `npm run news:admin -- indexing --on --confirm`; nothing turns it on automatically. */
  indexingEnabled: 'indexing_enabled',
  /* the homepage's category sections (lib/news/cms/homepageSections.js) — seeded by the WordPress import */
  homepageSections: 'homepage_sections',
});

export async function getSetting(key, fallback = null) {
  const rows = await query(`SELECT setting_value FROM ${T.settings} WHERE setting_key = ?`, [key]);
  if (!rows.length) return fallback;
  try {
    return JSON.parse(rows[0].setting_value);
  } catch {
    return fallback;
  }
}

export async function setSetting(key, value) {
  await query(
    `INSERT INTO ${T.settings} (setting_key, setting_value) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
    [key, JSON.stringify(value)],
  );
}
