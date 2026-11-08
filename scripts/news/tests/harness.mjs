/**
 * Test-only helpers for the process-level News tests (dbdown.mjs, multiproc.mjs):
 *   - a disposable LOCAL `*_test` database, migrated and seeded with the Stage 2 sample content;
 *   - `next start` instances of the existing production build;
 *   - a TCP forwarder in front of MySQL that can be cut and restored, which is how a database outage is
 *     simulated WITHOUT touching the real MySQL server (other local work shares it).
 * Loading the fixtures needs the alias hook: node --import ./scripts/news/tests/register.mjs
 */
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const E = process.env;
export const DB = { host: E.NEWS_E2E_DB_HOST || '127.0.0.1', port: Number(E.NEWS_E2E_DB_PORT || 3306), user: E.NEWS_E2E_DB_USER || 'root', password: E.NEWS_E2E_DB_PASSWORD || '' };

export function die(msg) {
  console.error(msg);
  process.exit(1);
}

export function counter() {
  let pass = 0;
  let fail = 0;
  const check = (name, ok, detail = '') => {
    if (ok) pass++;
    else fail++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${ok || detail === '' ? '' : `  [${String(typeof detail === 'string' ? detail : JSON.stringify(detail)).slice(0, 220)}]`}`);
  };
  return { check, summary: () => ({ pass, fail }) };
}

/** Create, migrate and seed `name` (must end in _test, local host only). Returns { run, close }. */
export async function makeSampleDb(name, { password } = {}) {
  if (!/_test$/.test(name) || !/^(127\.0\.0\.1|localhost)$/.test(DB.host)) die('refusing: the database must be a local *_test database');
  const admin = await mysql.createConnection({ ...DB, timezone: 'Z' });
  await admin.query("SET time_zone = '+00:00'");
  await admin.query(`DROP DATABASE IF EXISTS \`${name}\``);
  await admin.query(`CREATE DATABASE \`${name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.query(`USE \`${name}\``);
  Object.assign(process.env, { DB_HOST: DB.host, DB_PORT: String(DB.port), DB_USER: DB.user, DB_PASSWORD: DB.password, DB_NAME: name });
  const { migrateUp } = await import('../../../lib/news/db/migrate.js');
  const { closePool } = await import('../../../lib/news/db/pool.js');
  await migrateUp();
  if (password) {
    const { setSetting, SETTING } = await import('../../../lib/news/db/settings.js');
    const { hashPassword } = await import('../../../lib/news/auth/password.js');
    await setSetting(SETTING.adminPasswordHash, await hashPassword(password));
  }
  await closePool();
  const run = async (sql, params) => (await admin.query(sql, params))[0];
  const { seedSample } = await import('./seed-sample.mjs');
  const seeded = await seedSample(run);
  return {
    run,
    seeded,
    close: async () => {
      await admin.query(`DROP DATABASE IF EXISTS \`${name}\``);
      await admin.end();
    },
  };
}

/** A TCP forwarder listenPort → MySQL. cut() refuses new connections AND kills open ones; restore(). */
export async function startForwarder() {
  const sockets = new Set();
  let server = null;
  const listen = () =>
    new Promise((resolve) => {
      server = net.createServer((client) => {
        const upstream = net.connect(DB.port, DB.host);
        sockets.add(client);
        sockets.add(upstream);
        client.pipe(upstream).pipe(client);
        const end = () => {
          client.destroy();
          upstream.destroy();
          sockets.delete(client);
          sockets.delete(upstream);
        };
        client.on('error', end).on('close', end);
        upstream.on('error', end).on('close', end);
      });
      server.listen(fw.port || 0, '127.0.0.1', () => {
        fw.port = server.address().port;
        resolve();
      });
    });
  const fw = {
    port: 0,
    async cut() {
      /* stop accepting, kill every open connection (close() alone would wait for them), then wait */
      const closed = new Promise((r) => server.close(() => r()));
      for (const s of sockets) s.destroy();
      sockets.clear();
      await closed;
    },
    restore: listen,
  };
  await listen();
  return fw;
}

/** `next start` on `port` with the News DB pointing at `dbPort`. Returns { base, stop, log }. */
export async function startApp(port, { dbName, dbPort, extraEnv = {} }) {
  if (!fs.existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) die('no production build — run `npx next build` first');
  const log = path.join(os.tmpdir(), `atlasnews-proc-${port}-${Date.now()}.log`);
  const env = {
    ...process.env, NODE_ENV: 'production', DB_HOST: '127.0.0.1', DB_PORT: String(dbPort), DB_USER: DB.user, DB_PASSWORD: DB.password, DB_NAME: dbName,
    ASSETS_S3_BUCKET: 'test-bucket', ASSETS_S3_REGION: 'ap-south-1', ASSETS_S3_PREFIX: '', ASSETS_S3_ENDPOINT: '', NEXT_PUBLIC_ASSET_BASE_URL: '',
    ...extraEnv,
  };
  const child = spawn(process.execPath, [path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next'), 'start', '-p', String(port)], {
    cwd: ROOT, env, stdio: ['ignore', fs.openSync(log, 'a'), fs.openSync(log, 'a')],
  });
  const base = `http://127.0.0.1:${port}`;
  const stop = () => {
    if (child.exitCode !== null) return;
    if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' });
    else child.kill('SIGTERM');
  };
  process.on('exit', stop);
  for (let i = 0; ; i++) {
    try {
      if ((await fetch(`${base}/news/admin/login`)).status === 200) break;
    } catch {
      /* starting */
    }
    if (i > 60) die(`app on ${port} did not start (log: ${log})`);
    await new Promise((r) => setTimeout(r, 1000));
  }
  return { base, stop, log };
}

/** GET with one retry on a socket-level failure (a reset local connection, not an HTTP answer). */
export async function get(base, p, init = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(base + p, { redirect: 'manual', ...init });
      return { status: res.status, text: await res.text(), headers: res.headers };
    } catch (e) {
      if (attempt >= 1) throw e;
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const clearDataCache = () => fs.rmSync(path.join(ROOT, '.next', 'cache', 'fetch-cache'), { recursive: true, force: true });
