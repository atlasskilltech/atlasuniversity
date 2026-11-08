/**
 * ATLAS News — provisioning the admin password hash (used by `npm run news:admin -- set-password-hash`,
 * which the deployment workflow runs on the server).
 *
 * Accepts ONLY a ready-made scrypt hash (lib/news/auth/password.js format), never a password: anything
 * else — including a plaintext password supplied by mistake — is rejected without being stored or
 * echoed. Idempotent: if the stored hash is already identical nothing is written and no session is
 * touched, so routine deployments do not sign the admin out. When the hash does change, every existing
 * session is revoked.
 *
 * Shared by the CLI and the tests (no `server-only`).
 */
import { timingSafeEqual } from 'node:crypto';
import { getSetting, setSetting, SETTING } from '../db/settings.js';
import { parseHash } from './password.js';
import { revokeAllSessions } from './sessions.js';

export class InvalidHashError extends Error {
  constructor() {
    super('the supplied value is not a valid scrypt password hash; nothing was stored');
    this.name = 'InvalidHashError';
    this.code = 'invalid_hash';
  }
}

const same = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

/** Store `hash` as the admin password hash. Returns { changed, revokedSessions }. */
export async function setAdminPasswordHash(hash) {
  const value = typeof hash === 'string' ? hash.trim() : '';
  if (!parseHash(value)) throw new InvalidHashError();
  const current = await getSetting(SETTING.adminPasswordHash, null);
  if (current && same(current, value)) return { changed: false, revokedSessions: 0 };
  await setSetting(SETTING.adminPasswordHash, value);
  await setSetting(SETTING.adminPasswordUpdatedAt, new Date().toISOString());
  const revokedSessions = await revokeAllSessions();
  return { changed: true, revokedSessions };
}
