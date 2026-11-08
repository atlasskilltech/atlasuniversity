#!/usr/bin/env node
/**
 * ATLAS News — Stage 1 end-to-end + security suite (HTTP level, no extra dependencies).
 *
 *   npm run build            # or `npx next build`; the suite runs the PRODUCTION build
 *   NEWS_E2E_DB_NAME=atlasnews_e2e_test npm run news:e2e
 *
 * Fully self-contained and safe by construction:
 *   - DATABASE: creates a fresh LOCAL database (NEWS_E2E_DB_HOST must be localhost/127.0.0.1 and the name
 *     must end in `_test`; anything else is refused), applies the migrations to it and sets a RANDOM
 *     per-run admin password (the real one is never needed). It seeds an unrelated `survey_responses`
 *     table and checks it is untouched at the end.
 *   - S3: starts a local S3 stand-in (scripts/news/tests/s3-stub.mjs) and launches the app with dummy AWS
 *     credentials and its storage endpoint pointed ONLY at that stand-in. Before any upload, the suite
 *     reads the app's own health report and aborts unless storage is the stand-in — it can never write
 *     to the real bucket.
 *   - The app: `next start` on a free port with those overrides; stopped at the end.
 * Optional: NEWS_E2E_BROWSER=1 also runs the Playwright browser smoke test (scripts/news/tests/
 * browser.py — needs Python + `pip install playwright`) against the same server.
 *
 * Env: NEWS_E2E_DB_HOST (default 127.0.0.1), NEWS_E2E_DB_PORT (3306), NEWS_E2E_DB_USER (root),
 *      NEWS_E2E_DB_PASSWORD (''), NEWS_E2E_DB_NAME (required), NEWS_E2E_PORT (default 3399).
 */
import { spawn, spawnSync } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';
import sharp from 'sharp';
import { startS3Stub } from './s3-stub.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const E = process.env;
const DB = {
  host: E.NEWS_E2E_DB_HOST || '127.0.0.1',
  port: Number(E.NEWS_E2E_DB_PORT || 3306),
  user: E.NEWS_E2E_DB_USER || 'root',
  password: E.NEWS_E2E_DB_PASSWORD ?? '',
  name: E.NEWS_E2E_DB_NAME,
};
const PORT = Number(E.NEWS_E2E_PORT || 3399);
const BASE = `http://localhost:${PORT}`;

/* ------------------------------------------------------------------------------------ reporting */
const results = [];
function check(name, cond, detail = '') {
  results.push({ ok: Boolean(cond), name });
  console.log(`${cond ? 'PASS' : 'FAIL'} ${name}${!cond && detail !== '' ? `  [${typeof detail === 'string' ? detail : JSON.stringify(detail)}]` : ''}`);
}
const die = (msg) => {
  console.error(`[news:e2e] ${msg}`);
  process.exit(2);
};

/* ------------------------------------------------------------------------------------ preflight */
if (!DB.name) die('set NEWS_E2E_DB_NAME (a local database whose name ends in _test)');
if (!/_test$/.test(DB.name)) die('refusing: NEWS_E2E_DB_NAME must end in _test');
if (!/^(127\.0\.0\.1|localhost)$/.test(DB.host)) die('refusing: NEWS_E2E_DB_HOST must be local');
if (!fs.existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) die('no production build found — run `npx next build` first');

const admin = await mysql.createConnection({ host: DB.host, port: DB.port, user: DB.user, password: DB.password });
const q = async (sql, params) => (await admin.query(sql, params))[0];
await q(`DROP DATABASE IF EXISTS \`${DB.name}\``);
await q(`CREATE DATABASE \`${DB.name}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
await q(`USE \`${DB.name}\``);
await q('CREATE TABLE survey_responses (id INT PRIMARY KEY, v VARCHAR(10))');
await q("INSERT INTO survey_responses VALUES (1, 'keep'), (2, 'me')");
const surveyFingerprint = async () => JSON.stringify(await q('CHECKSUM TABLE survey_responses'));
const surveyBefore = await surveyFingerprint();

/* migrations + a random admin password, through the module's own code, against the test database */
Object.assign(process.env, { DB_HOST: DB.host, DB_PORT: String(DB.port), DB_USER: DB.user, DB_PASSWORD: DB.password, DB_NAME: DB.name });
const { migrateUp } = await import('../../../lib/news/db/migrate.js');
const { setSetting, SETTING } = await import('../../../lib/news/db/settings.js');
const { hashPassword, generatePassword } = await import('../../../lib/news/auth/password.js');
const { closePool } = await import('../../../lib/news/db/pool.js');
await migrateUp();
const PW = generatePassword();
await setSetting(SETTING.adminPasswordHash, await hashPassword(PW));
await closePool();

/* ------------------------------------------------------------------------------------ S3 stub + app */
const stub = await startS3Stub();
const STUB = `http://127.0.0.1:${stub.port}`;
const STUB_BUCKET = `${STUB}/stub-bucket`;
const logFile = path.join(os.tmpdir(), `atlasnews-e2e-${Date.now()}.log`);
const appEnv = {
  ...process.env,
  NODE_ENV: 'production',
  DB_HOST: DB.host, DB_PORT: String(DB.port), DB_USER: DB.user, DB_PASSWORD: DB.password, DB_NAME: DB.name,
  ASSETS_S3_BUCKET: 'stub-bucket', AWS_S3_BUCKET: 'stub-bucket',
  ASSETS_S3_REGION: 'us-east-1', AWS_S3_REGION: 'us-east-1', AWS_REGION: 'us-east-1',
  ASSETS_S3_PREFIX: '', ASSETS_S3_ENDPOINT: STUB, NEXT_PUBLIC_ASSET_BASE_URL: STUB_BUCKET,
  AWS_ACCESS_KEY_ID: 'stub-key', AWS_SECRET_ACCESS_KEY: 'stub-secret', AWS_SESSION_TOKEN: '', AWS_PROFILE: '',
  NEWS_ADMIN_PASSWORD_HASH: '',
};
const app = spawn(process.execPath, [path.join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next'), 'start', '-p', String(PORT)], {
  cwd: ROOT, env: appEnv, stdio: ['ignore', fs.openSync(logFile, 'a'), fs.openSync(logFile, 'a')],
});
function stopApp() {
  if (app.exitCode !== null) return;
  if (process.platform === 'win32') spawnSync('taskkill', ['/pid', String(app.pid), '/T', '/F'], { stdio: 'ignore' });
  else app.kill('SIGTERM');
}
process.on('exit', stopApp);

for (let i = 0; ; i++) {
  try {
    if ((await fetch(`${BASE}/news/admin/login`)).status === 200) break;
  } catch {
    /* not up yet */
  }
  if (i > 60) die(`the app did not start (log: ${logFile})`);
  await new Promise((r) => setTimeout(r, 1000));
}

/* ------------------------------------------------------------------------------------ helpers */
async function req(method, p, { body, headers = {}, cookie, origin = 'same' } = {}) {
  const h = { ...headers };
  if (origin === 'same') h.Origin = BASE;
  else if (origin) h.Origin = origin;
  if (cookie) h.Cookie = cookie;
  const init = { method, headers: h, redirect: 'manual' };
  if (body !== undefined) {
    init.body = body;
    if (typeof body?.getReader === 'function') init.duplex = 'half';
  }
  const res = await fetch(BASE + p, init);
  const buf = Buffer.from(await res.arrayBuffer());
  let json = {};
  try {
    json = JSON.parse(buf.toString('utf8'));
  } catch {
    /* not JSON */
  }
  return { status: res.status, headers: res.headers, buf, text: buf.toString('utf8'), json, cookies: res.headers.getSetCookie?.() || [] };
}
const login = (pw, ip, origin = 'same') => req('POST', '/news/admin/api/login', { body: JSON.stringify({ password: pw }), headers: { 'Content-Type': 'application/json', 'X-Forwarded-For': ip }, origin });
function multipart(fields, files) {
  const b = `----atlasnews${randomBytes(8).toString('hex')}`;
  const parts = [];
  for (const [k, v] of Object.entries(fields)) parts.push(Buffer.from(`--${b}\r\nContent-Disposition: form-data; name="${k}"\r\n\r\n${v}\r\n`));
  for (const [k, [fn, ct, data]] of Object.entries(files)) {
    parts.push(Buffer.from(`--${b}\r\nContent-Disposition: form-data; name="${k}"; filename="${fn}"\r\nContent-Type: ${ct}\r\n\r\n`), data, Buffer.from('\r\n'));
  }
  parts.push(Buffer.from(`--${b}--\r\n`));
  return { body: Buffer.concat(parts), type: `multipart/form-data; boundary=${b}` };
}
const isRedirect = (s) => [302, 303, 307, 308].includes(s);
const noise = (w, h) => sharp({ create: { width: w, height: h, channels: 3, noise: { type: 'gaussian', mean: 128, sigma: 40 } } });

/* ------------------------------------------------------------------------------------ 1. access */
try {
  let r = await req('GET', '/news/admin', { origin: null });
  check('GET /news/admin without session → redirect to login', isRedirect(r.status) && (r.headers.get('location') || '').includes('/news/admin/login'), r.status);
  r = await req('GET', '/news/admin/login', { origin: null });
  check('login page 200', r.status === 200);
  check('admin headers: X-Frame-Options DENY', r.headers.get('x-frame-options') === 'DENY');
  check("admin headers: CSP frame-ancestors 'none'", (r.headers.get('content-security-policy') || '').includes("frame-ancestors 'none'"));
  check('admin headers: noindex + no-store', (r.headers.get('x-robots-tag') || '').includes('noindex') && (r.headers.get('cache-control') || '').includes('no-store'));
  check('login page HTML has no password or hash', !r.text.includes(PW) && !r.text.includes('scrypt$'));
  r = await req('GET', '/news/admin/api/health', { origin: null });
  check('health without session → 401', r.status === 401 && r.json.code === 'unauthorized', r.status);
  r = await req('GET', '/', { origin: null });
  check('site homepage unaffected (200, no admin headers)', r.status === 200 && !r.headers.get('x-frame-options'), r.status);

  /* 2. CSRF / input */
  check('login without Origin → 403', (await login(PW, '203.0.113.50', null)).status === 403);
  check('login from another origin → 403', (await login(PW, '203.0.113.50', 'https://evil.example')).status === 403);
  r = await req('POST', '/news/admin/api/login', { body: '{"password": 123}', headers: { 'Content-Type': 'application/json' } });
  check('non-string password → 400', r.status === 400, r.status);
  r = await req('POST', '/news/admin/api/login', { body: 'x'.repeat(5000), headers: { 'Content-Type': 'application/json' } });
  check('oversized login body (declared) → 413', r.status === 413, r.status);
  const chunked = new ReadableStream({
    start(c) {
      for (let i = 0; i < 10; i++) c.enqueue(new TextEncoder().encode('x'.repeat(1024)));
      c.close();
    },
  });
  r = await req('POST', '/news/admin/api/login', { body: chunked, headers: { 'Content-Type': 'application/json' } });
  check('oversized CHUNKED login body (no Content-Length) → 413 by the streaming cap', r.status === 413, r.status);

  /* 3. rate limit (isolated IP) */
  const ip = '198.51.100.77';
  const codes = [];
  for (let i = 0; i < 5; i++) codes.push((await login('wrong-password-attempt-1234', ip)).status);
  check('5 wrong passwords → 401 each', codes.every((c) => c === 401), codes);
  r = await login(PW, ip);
  check('6th attempt (even correct) → 429 with Retry-After', r.status === 429 && Number(r.headers.get('retry-after')) > 0, r.status);
  r = await login('wrong-password-attempt-1234', `forged-${ip}, 198.51.100.77`);
  check('rate limit keys on the rightmost X-Forwarded-For hop (forged left entry does not reset it)', r.status === 429, r.status);

  /* 4. login + session cookie */
  r = await login(PW, '203.0.113.10');
  check('correct password → 200', r.status === 200, r.status);
  const sc = r.cookies[0] || '';
  check('cookie: HttpOnly; SameSite=Strict; Path=/news/admin', sc.includes('HttpOnly') && sc.includes('SameSite=Strict') && sc.includes('Path=/news/admin'), sc);
  check('cookie: plain name, not Secure, over http://localhost', sc.startsWith('atlasnews_admin=') && !/;\s*Secure/i.test(sc), sc);
  const CK = sc.split(';')[0];
  check('cookie value is a 43-char random token', CK.split('=')[1]?.length === 43 && !sc.includes(PW));
  r = await req('GET', '/news/admin', { cookie: CK, origin: null });
  check('dashboard with session → 200 with data', r.status === 200 && r.text.includes('>Foundation status</h1>') && r.text.includes(DB.name), r.status);
  check('dashboard HTML has no password/hash/credential', !r.text.includes(PW) && !r.text.includes('scrypt$') && !r.text.includes('stub-secret'));
  r = await req('GET', '/news/admin/login', { cookie: CK, origin: null });
  check('login page with session → redirect to dashboard', isRedirect(r.status), r.status);
  r = await req('GET', '/news/admin/api/health', { cookie: CK, origin: null });
  const hb = r.json;
  check('health with session → 200, schema applied, password from database', r.status === 200 && hb.database?.ok && hb.database.pending.length === 0 && hb.password === 'database', JSON.stringify(hb).slice(0, 200));
  check('health exposes no secret', !r.text.includes(PW) && !r.text.includes('scrypt$') && !r.text.includes('stub-secret'));

  /* 5. uploads — only ever against the stand-in */
  if (hb.storage?.publicHost !== `127.0.0.1:${stub.port}`) die(`ABORT: the app's storage is not the local stand-in (${hb.storage?.publicHost}); refusing to upload anything`);
  check('storage points at the local S3 stand-in only', true);

  const jpg = await noise(2000, 1300).withMetadata({ exif: { IFD0: { Copyright: 'SECRET-COPYRIGHT-E2E' } } }).jpeg({ quality: 90 }).toBuffer();
  const up = multipart({ alt: 'E2E test image', caption: 'Stage 1 verification' }, { file: ['test.jpg', 'image/jpeg', jpg] });
  r = await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK, origin: null });
  check('upload without Origin → 403', r.status === 403, r.status);
  r = await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type } });
  check('upload without session → 401', r.status === 401, r.status);
  const svg = multipart({}, { file: ['evil.jpg', 'image/jpeg', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>')] });
  r = await req('POST', '/news/admin/api/media', { body: svg.body, headers: { 'Content-Type': svg.type }, cookie: CK });
  check('SVG disguised as .jpg → 422 svg', r.status === 422 && r.json.code === 'svg', r.status);
  const mism = multipart({}, { file: ['x.png', 'image/png', jpg] });
  r = await req('POST', '/news/admin/api/media', { body: mism.body, headers: { 'Content-Type': mism.type }, cookie: CK });
  check('JPEG declared as PNG → 422 type_mismatch', r.status === 422 && r.json.code === 'type_mismatch', r.status);
  const big = new ReadableStream({
    start(c) {
      c.enqueue(new Uint8Array(1024));
      c.close();
    },
  });
  r = await req('POST', '/news/admin/api/media', { body: big, headers: { 'Content-Type': up.type }, cookie: CK });
  check('upload without Content-Length (chunked) → 411', r.status === 411, r.status);
  const declaredHuge = await new Promise((resolve) => {
    const rq = http.request(`${BASE}/news/admin/api/media`, { method: 'POST', headers: { Origin: BASE, Cookie: CK, 'Content-Type': up.type, 'Content-Length': String(200 * 1024 * 1024) } }, (res) => {
      res.resume();
      resolve(res.statusCode);
      rq.destroy();
    });
    rq.on('error', () => resolve('error'));
    rq.write('x'); /* the body is never sent — the server must answer from the header alone */
  });
  check('declared 200 MB upload → 413 before the body is read', declaredHuge === 413, declaredHuge);

  r = await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
  const media = r.json.media || {};
  check('valid JPEG upload → 201', r.status === 201 && media.id, `${r.status} ${r.text.slice(0, 200)}`);
  check('renditions thumb/card/article/full', JSON.stringify((media.variants || []).map((v) => v.name)) === '["thumb","card","article","full"]');
  let allOk = true;
  for (const v of media.variants || []) {
    const g = await fetch(v.url);
    const d = Buffer.from(await g.arrayBuffer());
    allOk &&= g.status === 200 && g.headers.get('content-type') === 'image/webp' && d.subarray(8, 12).toString() === 'WEBP' && !d.includes('SECRET-COPYRIGHT-E2E') && d.length === v.bytes;
  }
  check('every rendition retrievable as WebP, exact size, EXIF gone', allOk);
  check('stored under assets/news/media/', (media.url || '').includes('/assets/news/media/'));
  r = await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
  check('same image again → 200 deduplicated, same id', r.status === 200 && r.json.deduplicated && r.json.media?.id === media.id, r.status);

  /* 6. S3 conditional writes: existing key (412) and conflicting content */
  const n0 = stub.log.length;
  await q('DELETE FROM atlasnews_media WHERE id = ?', [media.id]);
  r = await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
  check('DB row gone, same bytes → 201 with the SAME S3 keys', r.status === 201 && r.json.media?.url === media.url, r.status);
  const fresh = stub.log.slice(n0);
  const puts = fresh.filter((e) => e.method === 'PUT');
  check('each rendition PUT was conditional and answered 412 (already present)', puts.length === 4 && puts.every((e) => e.ifNoneMatch === '*' && e.exists), puts.length);
  check('…confirmed by HEAD, nothing overwritten', fresh.filter((e) => e.method === 'HEAD').length === 4);

  const jpg2 = await noise(1200, 800).jpeg({ quality: 90 }).toBuffer();
  const now = new Date();
  const thumbKey = `/stub-bucket/assets/news/media/${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, '0')}/${createHash('sha256').update(jpg2).digest('hex').slice(0, 20)}-thumb.webp`;
  await fetch(STUB + thumbKey, { method: 'PUT', body: 'SOMEONE-ELSES-OBJECT', headers: { 'X-Stub-Seed': '1', 'Content-Type': 'text/plain' } });
  const [[{ n: rowsBefore }]] = await admin.query('SELECT COUNT(*) AS n FROM atlasnews_media');
  const conflict = multipart({}, { file: ['other.jpg', 'image/jpeg', jpg2] });
  r = await req('POST', '/news/admin/api/media', { body: conflict.body, headers: { 'Content-Type': conflict.type }, cookie: CK });
  check('different content already at the key → 502 storage_error', r.status === 502 && r.json.code === 'storage_error', r.status);
  check('the existing object was NOT overwritten', (await (await fetch(STUB + thumbKey)).text()) === 'SOMEONE-ELSES-OBJECT');
  const [[{ n: rowsAfter }]] = await admin.query('SELECT COUNT(*) AS n FROM atlasnews_media');
  check('no media row recorded for the refused upload', Number(rowsAfter) === Number(rowsBefore));

  /* 7. concurrency limit: a burst of uploads never crashes the server or errors other than "busy" */
  const burst = await Promise.all(Array.from({ length: 9 }, async (_, i) => {
    const img = await noise(3000, 2000).jpeg({ quality: 92 }).toBuffer();
    const m = multipart({}, { file: [`burst-${i}.jpg`, 'image/jpeg', img] });
    const x = await req('POST', '/news/admin/api/media', { body: m.body, headers: { 'Content-Type': m.type }, cookie: CK });
    return { status: x.status, retry: x.headers.get('retry-after') };
  }));
  const statuses = burst.map((b) => b.status);
  check('burst of 9 parallel uploads: only 201 or 503 busy (with Retry-After)', burst.every((b) => b.status === 201 || (b.status === 503 && Number(b.retry) > 0)), statuses);
  check('burst: at least the 2 running + 4 queued slots succeeded', statuses.filter((s) => s === 201).length >= 6, statuses);
  check('server healthy after the burst', (await req('GET', '/news/admin/api/health', { cookie: CK, origin: null })).status === 200);
  console.log(`     burst statuses: ${statuses.join(' ')}`);

  r = await req('POST', '/news/admin/api/storage-check', { body: '', cookie: CK });
  check('storage-check: write + public read + checksum', r.status === 200 && r.json.ok === true, r.text.slice(0, 200));

  /* 8. page authentication: direct, RSC, expired */
  const DATA = [DB.name, 'Migrations applied', 'Table prefix', '>Foundation status</h1>', `127.0.0.1:${stub.port}`];
  const tree = encodeURIComponent(JSON.stringify(['', { children: ['news', { children: ['admin', { children: ['(panel)', { children: ['__PAGE__', {}, null, null] }, null, null] }, null, null] }, null, null] }, null, null, true]));
  for (const [label, hdrs] of [['plain GET', {}], ['RSC request', { RSC: '1' }], ['RSC with a crafted router-state header (Next itself rejects it: 500)', { RSC: '1', 'Next-Router-State-Tree': tree, 'Next-Url': '/news/admin' }]]) {
    r = await req('GET', '/news/admin', { headers: hdrs, origin: null });
    check(`no session, ${label} → no dashboard data (${r.status})`, !DATA.some((d) => r.text.includes(d)));
  }
  const session = async (ipAddr) => (await login(PW, ipAddr)).cookies[0].split(';')[0];
  const ck2 = await session('203.0.113.21');
  await q("UPDATE atlasnews_admin_sessions SET last_seen_at = UTC_TIMESTAMP(3) - INTERVAL 13 HOUR WHERE token_hash = SHA2(?, 256)", [ck2.split('=')[1]]);
  r = await req('GET', '/news/admin', { cookie: ck2, origin: null });
  check('idle-expired session → redirect, no data', isRedirect(r.status) && !DATA.some((d) => r.text.includes(d)), r.status);
  r = await req('GET', '/news/admin', { headers: { RSC: '1', 'Next-Router-State-Tree': tree }, cookie: ck2, origin: null });
  check('idle-expired session, crafted RSC → no data', !DATA.some((d) => r.text.includes(d)));
  check('idle-expired session → health 401', (await req('GET', '/news/admin/api/health', { cookie: ck2, origin: null })).status === 401);
  const ck3 = await session('203.0.113.22');
  await q("UPDATE atlasnews_admin_sessions SET expires_at = UTC_TIMESTAMP(3) - INTERVAL 1 SECOND WHERE token_hash = SHA2(?, 256)", [ck3.split('=')[1]]);
  r = await req('GET', '/news/admin', { cookie: ck3, origin: null });
  check('absolute-expired session → redirect, no data', isRedirect(r.status) && !DATA.some((d) => r.text.includes(d)), r.status);
  check('absolute-expired session → upload 401', (await req('POST', '/news/admin/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: ck3 })).status === 401);

  /* 9. optional browser smoke test (Python Playwright) */
  if (E.NEWS_E2E_BROWSER === '1') {
    await q('DELETE FROM atlasnews_login_attempts');
    /* async: the S3 stand-in runs in THIS process, so the event loop must stay free while the browser
       test (which triggers S3 writes through the app) runs */
    const py = await new Promise((resolve) => {
      const child = spawn(E.PYTHON || 'python', [path.join(ROOT, 'scripts', 'news', 'tests', 'browser.py'), BASE, PW], { stdio: ['ignore', 'pipe', 'pipe'] });
      let out = '';
      let err = '';
      child.stdout.on('data', (d) => { out += d; });
      child.stderr.on('data', (d) => { err += d; });
      const timer = setTimeout(() => child.kill(), 600_000);
      child.on('close', (code) => {
        clearTimeout(timer);
        resolve({ status: code, stdout: out, stderr: err });
      });
      child.on('error', (e) => resolve({ status: -1, stdout: '', stderr: String(e.message) }));
    });
    process.stdout.write(py.stdout || '');
    check('browser smoke test (390 + 1440)', py.status === 0, (py.stderr || '').slice(-300));
  }

  /* 10. logout */
  check('logout without Origin → 403', (await req('POST', '/news/admin/api/logout', { body: '', cookie: CK, origin: null })).status === 403);
  r = await req('POST', '/news/admin/api/logout', { body: '', cookie: CK });
  check('logout → 200 and cookie cleared', r.status === 200 && r.cookies.some((c) => c.includes('Max-Age=0')), r.status);
  check('old token rejected after logout → 401', (await req('GET', '/news/admin/api/health', { cookie: CK, origin: null })).status === 401);
  check('forged token → 401', (await req('GET', '/news/admin/api/health', { cookie: `atlasnews_admin=${'A'.repeat(43)}`, origin: null })).status === 401);

  /* 11. S3 + database invariants */
  check('S3 stand-in saw no DELETE/POST at all', !stub.log.some((e) => e.method === 'DELETE' || e.method === 'POST'));
  check('every S3 write stayed under assets/news/', stub.log.filter((e) => e.method === 'PUT' && !e.seed).every((e) => e.key.startsWith('/stub-bucket/assets/news/')));
  check('no PUT ever overwrote an existing key', !stub.log.some((e) => e.method === 'PUT' && !e.seed && e.exists && e.ifNoneMatch !== '*'));
  check('unrelated survey_responses table untouched', (await surveyFingerprint()) === surveyBefore);
} catch (e) {
  check(`suite crashed: ${e.message}`, false);
} finally {
  stopApp();
  await stub.close();
  await admin.end();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed${failed.length ? '' : ''}  (app log: ${logFile})`);
process.exit(failed.length ? 1 : 0);
