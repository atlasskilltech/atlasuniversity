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
 *   provision-password         read the admin PASSWORD from STDIN (exact bytes — nothing trimmed) and
 *                              hash it HERE with scrypt; only the hash is stored. Used by the deployment
 *                              workflow with the NEWS_ADMIN_PASSWORD GitHub secret. If the stored hash
 *                              already verifies this password nothing is written and no session is touched;
 *                              otherwise the new hash is stored and every session signed out. 16–256
 *                              characters, no control characters / line breaks. Prints only "unchanged" /
 *                              "updated" — never the password or the hash.
 *                                  printf '%s' "$PW" | npm run news:admin -- provision-password
 *   indexing                   read-only: is search-engine indexing of the public News pages enabled?
 *   indexing --off             noindex every public News page (the default).
 *   indexing --on --confirm    allow indexing. Deliberately needs --confirm: only once real content is
 *                              migrated, verified and indexing has been approved. Takes effect within 60 s.
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
import { provisionAdminPassword } from '../../lib/news/auth/adminSetup.js';

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
  if (cmd === 'provision-password') {
    if (process.stdin.isTTY) throw new Error('pipe the password on stdin: printf \'%s\' "$PW" | npm run news:admin -- provision-password');
    const chunks = [];
    for await (const c of process.stdin) chunks.push(c);
    /* exact bytes: no trimming, so a stray newline is rejected rather than silently changing the password */
    const r = await provisionAdminPassword(Buffer.concat(chunks).toString('utf8'));
    log(r.changed ? `admin password updated; ${r.revokedSessions} session(s) signed out` : 'admin password unchanged');
    return;
  }
  if (cmd === 'status') {
    const hash = await getSetting(SETTING.adminPasswordHash, null);
    const when = await getSetting(SETTING.adminPasswordUpdatedAt, null);
    log(`password: ${hash ? `set in database${when ? ` (${when})` : ''}${parseHash(hash) ? '' : ' — INVALID'}` : 'NOT SET'}`);
    /* presence only, never the value: a leftover variable is ignored by sign-in, and worth knowing about */
    if (process.env.NEWS_ADMIN_PASSWORD_HASH !== undefined) log('note: NEWS_ADMIN_PASSWORD_HASH is present in this environment and is IGNORED');
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
  if (cmd === 'indexing') {
    if (args.on && args.off) throw new Error('choose --on or --off, not both');
    if (args.on) {
      if (!args.confirm) throw new Error('enabling indexing needs --confirm (only after real content is migrated and indexing is approved)');
      await setSetting(SETTING.indexingEnabled, true);
    } else if (args.off) {
      await setSetting(SETTING.indexingEnabled, false);
    }
    const on = (await getSetting(SETTING.indexingEnabled, false)) === true;
    log(`search-engine indexing of public News pages: ${on ? 'ENABLED' : 'disabled (noindex)'}${args.on || args.off ? ' — takes effect within 60 seconds' : ''}`);
    return;
  }
  if (cmd === 'revoke-sessions') {
    log(`${await revokeAllSessions()} session(s) signed out`);
    return;
  }
  log(`unknown command "${cmd}" — use status, provision-password, set-password, revoke-sessions or indexing`);
  process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error(`[news] ERROR: ${e.message}`);
    process.exitCode = 1;
  })
  .finally(() => closePool());
