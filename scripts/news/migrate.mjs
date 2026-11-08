#!/usr/bin/env node
/**
 * npm run news:migrate -- [status|up|down] [--dry-run] [--confirm]
 *
 *   status (default)   read-only: database name, server version, News tables present, applied and
 *                      pending migrations, and anything that would stop `up`
 *   up                 apply pending migrations (creates only `atlasnews_*` tables)
 *   up --dry-run       show what `up` would run; changes nothing
 *   down --confirm     revert the most recent migration — drops its `atlasnews_*` tables AND THEIR ROWS;
 *                      for a fresh install only
 *
 * Connection: the DB_* variables from the environment, or from the git-ignored .env.local / .env (never
 * overriding a value already set in the shell). The host, user and password are never printed.
 * Must run where the database accepts connections (the production database only allows its own
 * application servers).
 */
import { loadEnv, parseArgs } from '../assets/lib.mjs';
import { closePool, dbConfig } from '../../lib/news/db/pool.js';
import { migrateDown, migrateUp, migrationStatus } from '../../lib/news/db/migrate.js';

loadEnv();
const args = parseArgs();
const cmd = args._[0] || 'status';
const log = (m) => console.log(`[news] ${m}`);

async function main() {
  try {
    dbConfig();
  } catch (e) {
    log(`ERROR: ${e.message}`);
    process.exitCode = 1;
    return;
  }
  if (cmd === 'status') {
    const s = await migrationStatus();
    log(`database: ${s.database}   server: ${s.serverVersion}`);
    log(`News tables present (${s.tables.length}): ${s.tables.join(', ') || 'none'}`);
    log(`applied: ${s.applied.map((a) => a.id).join(', ') || 'none'}`);
    log(`pending: ${s.pending.join(', ') || 'none'}`);
    if (s.problems.length) {
      for (const p of s.problems) log(`PROBLEM: ${p}`);
      process.exitCode = 1;
    }
    return;
  }
  if (cmd === 'up') {
    const r = await migrateUp({ dryRun: Boolean(args['dry-run']), log });
    if (!r.dryRun) log(r.applied.length ? `applied ${r.applied.join(', ')}` : 'up to date');
    return;
  }
  if (cmd === 'down') {
    await migrateDown({ confirm: Boolean(args.confirm), log });
    return;
  }
  log(`unknown command "${cmd}" — use status, up or down`);
  process.exitCode = 1;
}

main()
  .catch((e) => {
    console.error(`[news] ERROR: ${e.message}`);
    process.exitCode = 1;
  })
  .finally(() => closePool());
