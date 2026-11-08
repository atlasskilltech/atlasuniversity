/**
 * ATLAS News — provisioning the admin password on the server.
 *
 * `provisionAdminPassword` backs `npm run news:admin -- provision-password`, which the deployment
 * workflow runs with the NEWS_ADMIN_PASSWORD GitHub secret on stdin. The scrypt hash is computed here and
 * written to atlasnews_settings — the ONLY place sign-in reads it from (lib/news/auth/admin.js).
 *
 * Shared by the CLI and the tests (no `server-only`).
 */
import { getSetting, setSetting, SETTING } from '../db/settings.js';
import { hashPassword, MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH, parseHash, verifyPassword } from './password.js';
import { revokeAllSessions } from './sessions.js';

export class InvalidPasswordError extends Error {
  /* the message names the rule, never the input */
  constructor(rule) {
    super(`the supplied admin password was rejected (${rule}); nothing was stored`);
    this.name = 'InvalidPasswordError';
    this.code = 'invalid_password';
  }
}

/**
 * Provision the admin password from its PLAINTEXT (used by `npm run news:admin -- provision-password`,
 * which the deployment workflow feeds from the NEWS_ADMIN_PASSWORD GitHub secret on stdin).
 *
 * The scrypt hash is computed HERE, on the server, with a fresh random salt; only that hash is stored.
 *   - unchanged: if the stored hash already verifies `password`, nothing is written and no session is
 *     touched — routine deploys keep the admin signed in (a re-hash would change the salt, so the hash
 *     itself cannot be compared; verification is the only correct test);
 *   - first provisioning or a different password: the new hash is stored and every session revoked.
 * Returns { changed, revokedSessions }. The password is never logged, returned or put in an error.
 */
export async function provisionAdminPassword(password) {
  if (typeof password !== 'string' || !password) throw new InvalidPasswordError('empty');
  if (password.length < MIN_PASSWORD_LENGTH) throw new InvalidPasswordError(`shorter than ${MIN_PASSWORD_LENGTH} characters`);
  if (password.length > MAX_PASSWORD_LENGTH) throw new InvalidPasswordError(`longer than ${MAX_PASSWORD_LENGTH} characters`);
  if (/[\u0000-\u001f\u007f]/.test(password)) throw new InvalidPasswordError('contains control characters or a line break');

  const current = await getSetting(SETTING.adminPasswordHash, null);
  if (current && parseHash(current) && (await verifyPassword(password, current))) {
    return { changed: false, revokedSessions: 0 };
  }
  await setSetting(SETTING.adminPasswordHash, await hashPassword(password));
  await setSetting(SETTING.adminPasswordUpdatedAt, new Date().toISOString());
  const revokedSessions = await revokeAllSessions();
  return { changed: true, revokedSessions };
}
