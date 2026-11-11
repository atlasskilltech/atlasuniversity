#!/usr/bin/env node
/**
 * npm run news:import-bundle -- <command> [options]
 *
 *   export --out=<file.enc> --key-file=<file>
 *        Read the imported rows from the LOCAL import database (DB_HOST must be local) and write the encrypted
 *        bundle (lib/news/import/bundle.js). The key file is created when missing (32 random bytes, base64,
 *        owner-only) and reused when present. Prints the fingerprint and counts — never the key.
 *
 *   apply --bundle=<file.enc> [--execute --confirm=<first 16 hex of the fingerprint>] [--allow-remote-db]
 *         [--report=<file.json>]
 *        Decrypt and apply to the configured database. DRY RUN unless --execute; --execute also requires
 *        --confirm to match the bundle's fingerprint, so a real import is always a deliberate second step.
 *        The key is read from NEWS_IMPORT_BUNDLE_KEY or, when that is unset, from stdin. It is never printed.
 *
 *   backup --out=<file.sql.gz>
 *        Data of every atlasnews_* table as SQL (per table: DELETE, then INSERTs), gzip-compressed. Restore:
 *        `gunzip -c file.sql.gz | mysql <db>` restores the News tables exactly as they were.
 *
 * Connection: DB_* from the environment, else the git-ignored .env.local / .env. Storage: ASSETS_S3_*.
 */
import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { createGzip } from 'node:zlib';
import mysql from 'mysql2/promise';
import { loadEnv, parseArgs } from '../assets/lib.mjs';
import { closePool, dbConfig } from '../../lib/news/db/pool.js';
import { applyBundle, decryptBundle, encryptBundle, exportBundle, fingerprint } from '../../lib/news/import/bundle.js';

loadEnv();
const args = parseArgs();
const cmd = args._[0];
const log = (m) => console.log(`[news-bundle] ${m}`);
const isLocal = (h) => /^(127\.0\.0\.1|localhost|::1)$/i.test(h);

async function readKey() {
  let raw = process.env.NEWS_IMPORT_BUNDLE_KEY;
  if (!raw && !process.stdin.isTTY) {
    const chunks = [];
    for await (const c of process.stdin) chunks.push(c);
    raw = Buffer.concat(chunks).toString('utf8');
  }
  const key = Buffer.from(String(raw || '').trim(), 'base64');
  if (key.length !== 32) throw new Error('NEWS_IMPORT_BUNDLE_KEY (or stdin) must hold the base64 bundle key');
  return key;
}

async function doExport() {
  const db = dbConfig();
  if (!isLocal(db.host)) throw new Error('export reads the LOCAL import database only');
  if (!args.out || !args['key-file']) throw new Error('--out=<file.enc> and --key-file=<file> are required');
  let key;
  if (fs.existsSync(args['key-file'])) key = Buffer.from(fs.readFileSync(args['key-file'], 'utf8').trim(), 'base64');
  else {
    key = randomBytes(32);
    fs.writeFileSync(args['key-file'], `${key.toString('base64')}\n`, { mode: 0o600, flag: 'wx' });
    log(`new key written to ${path.resolve(args['key-file'])} (owner-only; it is not printed)`);
  }
  const bundle = await exportBundle({ source: { dump: args.source || null } });
  const enc = encryptBundle(bundle, key);
  fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
  fs.writeFileSync(args.out, enc);
  /* prove the file round-trips before anyone ships it */
  const back = decryptBundle(fs.readFileSync(args.out), key);
  if (JSON.stringify(back.counts) !== JSON.stringify(bundle.counts)) throw new Error('round-trip check failed');
  const fp = fingerprint(enc);
  log(`bundle: ${path.resolve(args.out)} (${(enc.length / 1048576).toFixed(2)} MB)`);
  log(`counts: ${JSON.stringify(bundle.counts)}`);
  log(`fingerprint: ${fp}   (confirm code: ${fp.slice(0, 16)})`);
}

async function doApply() {
  if (!args.bundle) throw new Error('--bundle=<file.enc> is required');
  const db = dbConfig();
  const execute = Boolean(args.execute);
  if (execute && !isLocal(db.host) && !args['allow-remote-db']) throw new Error('refusing to write to a remote database without --allow-remote-db');
  const buf = fs.readFileSync(args.bundle);
  const fp = fingerprint(buf);
  log(`bundle fingerprint: ${fp}`);
  if (execute && args.confirm !== fp.slice(0, 16)) throw new Error(`--execute needs --confirm=${'<first 16 hex of the fingerprint>'}; it did not match this bundle`);
  const bundle = decryptBundle(buf, await readKey());
  log(`bundle: created ${bundle.createdAt}; ${JSON.stringify(bundle.counts)}`);
  log(`database: ${db.database} (${isLocal(db.host) ? 'local' : 'remote'})   mode: ${execute ? 'EXECUTE' : 'DRY RUN (nothing is written)'}`);
  const report = await applyBundle(bundle, { dryRun: !execute, log, checkObjects: args['skip-storage-check'] ? false : true });
  const P = report.posts;
  log(`categories: +${report.categories.created} new, ${report.categories.existing} existing, ${report.categories.adopted} linked to a CMS category, ${report.categories.errors.length} errors`);
  log(`tags:       +${report.tags.created} new, ${report.tags.existing} existing, ${report.tags.adopted} linked, ${report.tags.errors.length} errors`);
  log(`media rows: +${report.media.created} new, ${report.media.existing} existing, ${report.media.linked} linked`);
  log(`storage:    ${report.storage.present}/${report.storage.checked} objects present, ${report.storage.missing.length} missing`);
  log(`published:  +${P.published.created} insert, ${P.published.updated} update, ${P.published.unchanged} unchanged, ${P.published.protected} protected (edited in the CMS), ${P.published.skipped} skipped`);
  log(`drafts:     +${P.draft.created} insert, ${P.draft.updated} update, ${P.draft.unchanged} unchanged, ${P.draft.protected} protected, ${P.draft.skipped} skipped`);
  log(`redirects:  +${report.redirects.created} new, ${report.redirects.existing} existing, ${report.redirects.skipped.length} skipped`);
  log(`menu:       ${report.menu.set} categories into the navigation, ${report.menu.unchanged} unchanged, ${report.menu.protected.length} protected (edited in the CMS)${report.menu.topLevel !== null ? `; top-level entries now ${report.menu.topLevel}` : ''}`);
  log(`homepage:   ${report.homepage.count} sections — ${report.homepage.result || 'none in the bundle'}`);
  for (const s of report.menu.protected.slice(0, 20)) log(`  menu protected term#${s.termId}: ${s.reason}`);
  for (const s of report.skippedPosts.slice(0, 20)) log(`  skipped wp#${s.wpId} ${s.slug}: ${s.reason}`);
  for (const s of report.protectedPosts.slice(0, 20)) log(`  protected wp#${s.wpId} ${s.slug}: ${s.reason}`);
  if (report.duplicates) log(`duplicates by WordPress id: ${JSON.stringify(report.duplicates)}`);
  if (args.report) fs.writeFileSync(args.report, JSON.stringify(report, null, 2));
  if (!execute) log(`DRY RUN complete. To import, re-run with --execute --confirm=${fp.slice(0, 16)}`);
}

async function doBackup() {
  if (!args.out) throw new Error('--out=<file.sql.gz> is required');
  const db = dbConfig();
  const conn = await mysql.createConnection({ host: db.host, port: db.port, user: db.user, password: db.password, database: db.database, timezone: 'Z', dateStrings: true, supportBigNumbers: true, bigNumberStrings: true });
  try {
    await conn.query("SET time_zone = '+00:00'");
    const [tables] = await conn.query("SELECT table_name t FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name LIKE 'atlasnews\\_%' ORDER BY table_name");
    fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
    const gz = createGzip();
    const out = fs.createWriteStream(args.out, { mode: 0o600 });
    gz.pipe(out);
    const w = (s) => new Promise((r) => (gz.write(s) ? r() : gz.once('drain', r)));
    await w(`-- ATLAS News tables backup ${new Date().toISOString()} database ${db.database}\nSET NAMES utf8mb4;\nSET time_zone = '+00:00';\nSET FOREIGN_KEY_CHECKS = 0;\nSTART TRANSACTION;\n`);
    const counts = {};
    for (const { t } of tables) {
      const [rows] = await conn.query(`SELECT * FROM \`${t}\``);
      counts[t] = rows.length;
      await w(`DELETE FROM \`${t}\`;\n`);
      for (const r of rows) await w(`${mysql.format('INSERT INTO ?? SET ?', [t, r])};\n`);
    }
    await w('COMMIT;\nSET FOREIGN_KEY_CHECKS = 1;\n');
    gz.end();
    await new Promise((r) => out.on('close', r));
    log(`backup: ${path.resolve(args.out)} (${fs.statSync(args.out).size} bytes) rows ${JSON.stringify(counts)}`);
  } finally {
    await conn.end();
  }
}

const run = { export: doExport, apply: doApply, backup: doBackup }[cmd];
if (!run) {
  log('usage: news:import-bundle -- export|apply|backup [options] (see the header of scripts/news/import-bundle.mjs)');
  process.exitCode = 1;
} else {
  run()
    .catch((e) => {
      log(`ERROR: ${e.message}`);
      process.exitCode = 1;
    })
    .finally(() => closePool().catch(() => {}));
}
