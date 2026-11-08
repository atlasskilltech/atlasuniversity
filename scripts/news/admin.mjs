#!/usr/bin/env node
/**
 * npm run news:admin -- <command>
 *
 *   status                     read-only: is a password set (and where), active sessions, failed logins
 *                              in the last 15 minutes. Never prints a hash or a password.
 *   set-password               read a new password from STDIN (never from the command line, which would
 *                              leave it in shell history and the process list), store its scrypt hash
 *                              in atlasnews_settings, and sign out every session.
 *                                  printf '%s' 'the-password' | npm run news:admin -- set-password
 *   set-password --generate    generate a strong random password, store its hash, sign out every
 *                              session, and print the password ONCE so it can be handed over privately.
 *   revoke-sessions            sign out every admin session.
 *   set-password-hash          read a ready-made scrypt HASH (never a password) from STDIN and store it.
 *                              Used by the deployment workflow with the NEWS_ADMIN_PASSWORD_HASH GitHub
 *                              secret. Rejects anything that is not a valid hash (so a plaintext password
 *                              is never stored), is a no-op when the stored hash is identical (routine
 *                              deploys do not sign the admin out), and signs every session out when it
 *                              changes. Prints only "unchanged" / "updated" — never the value.
 *                                  printf '%s' "$HASH" | npm run news:admin -- set-password-hash
 *
 * Needs the migrations applied (`npm run news:migrate -- up`) and the same DB_* connection as that tool.
 */
import { loadEnv, parseArgs } from '../assets/lib.mjs';
import { T } from '../../lib/news/config.js';
import { closePool, query } from '../../lib/news/db/pool.js';
import { getSetting, setSetting, SETTING } from '../../lib/news/db/settings.js';
import { generatePassword, hashPassword, MIN_PASSWORD_LENGTH, parseHash } from '../../lib/news/auth/password.js';
import { revokeAllSessions } from '../../lib/news/auth/sessions.js';
import { WINDOW_SECONDS } from '../../lib/news/auth/rateLimit.js';
import { setAdminPasswordHash } from '../../lib/news/auth/adminSetup.js';

loadEnv();
const args = parseArgs();
const cmd = args._[0] || 'status';
const log = (m) => console.log(`[news] ${m}`);

async function readStdin() {
  if (process.stdin.isTTY) {
    throw new Error('pipe the password on stdin (e.g. printf \'%s\' "$PW" | npm run news:admin -- set-password), or use --generate');
  }
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '');
}

async function main() {
  if (cmd === 'set-password-hash') {
    if (process.stdin.isTTY) throw new Error('pipe the hash on stdin: printf \'%s\' "$HASH" | npm run news:admin -- set-password-hash');
    const chunks = [];
    for await (const c of process.stdin) chunks.push(c);
    const r = await setAdminPasswordHash(Buffer.concat(chunks).toString('utf8'));
    log(r.changed ? `admin password hash updated; ${r.revokedSessions} session(s) signed out` : 'admin password hash unchanged');
    return;
  }
  if (cmd === 'status') {
    const hash = await getSetting(SETTING.adminPasswordHash, null);
    const when = await getSetting(SETTING.adminPasswordUpdatedAt, null);
    const env = (process.env.NEWS_ADMIN_PASSWORD_HASH || '').trim();
    log(`password: ${env ? `from NEWS_ADMIN_PASSWORD_HASH (${parseHash(env) ? 'valid' : 'INVALID'})` : hash ? `set in database${when ? ` (${when})` : ''}${parseHash(hash) ? '' : ' — INVALID'}` : 'NOT SET'}`);
    const [{ n }] = await query(`SELECT COUNT(*) AS n FROM ${T.sessions} WHERE revoked_at IS NULL AND expires_at > UTC_TIMESTAMP(3)`);
    const [{ f }] = await query(`SELECT COUNT(*) AS f FROM ${T.loginAttempts} WHERE succeeded = 0 AND attempted_at > (UTC_TIMESTAMP(3) - INTERVAL ? SECOND)`, [WINDOW_SECONDS]);
    log(`active sessions: ${n}   failed logins (last 15 min): ${f}`);
    return;
  }
  if (cmd === 'set-password') {
    const generated = Boolean(args.generate);
    const password = generated ? generatePassword() : await readStdin();
    if (password.length < MIN_PASSWORD_LENGTH) throw new Error(`password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    await setSetting(SETTING.adminPasswordHash, await hashPassword(password));
    await setSetting(SETTING.adminPasswordUpdatedAt, new Date().toISOString());
    const revoked = await revokeAllSessions();
    log(`admin password updated; ${revoked} session(s) signed out`);
    if (generated) {
      /* the only place a password is ever printed: the operator asked for a generated one */
      console.log(`\n  NEW ADMIN PASSWORD (shown once): ${password}\n`);
    }
    return;
  }
  if (cmd === 'revoke-sessions') {
    log(`${await revokeAllSessions()} session(s) signed out`);
    return;
  }
  log(`unknown command "${cmd}" — use status, set-password or revoke-sessions`);
  process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error(`[news] ERROR: ${e.message}`);
    process.exitCode = 1;
  })
  .finally(() => closePool());
