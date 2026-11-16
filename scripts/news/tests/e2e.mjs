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
 *     per-run admin users and sessions (Google is never contacted). It seeds an unrelated `survey_responses`
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

/* migrations + two admin users with sessions, through the module's own code, against the test database
   (Google itself cannot be reached from a test: the sign-in start and the callback's refusals are
   tested over HTTP below; a full Google round trip is covered by the browser test) */
Object.assign(process.env, { DB_HOST: DB.host, DB_PORT: String(DB.port), DB_USER: DB.user, DB_PASSWORD: DB.password, DB_NAME: DB.name });
const { migrateUp } = await import('../../../lib/news/db/migrate.js');
const { generatePassword } = await import('../../../lib/news/auth/password.js');
const { closePool } = await import('../../../lib/news/db/pool.js');
const { addUser } = await import('../../../lib/news/auth/users.js');
const { createSession } = await import('../../../lib/news/auth/sessions.js');
await migrateUp();
/* a random string that must never appear in any page (kept from the password era as a leak canary) */
const PW = generatePassword();
const OWNER = 'owner.e2e@atlasuniversity.edu.in';
const ownerUser = await addUser({ email: OWNER, role: 'admin' });
const limitedUser = await addUser({ email: 'keydates.e2e@atlasuniversity.edu.in', role: 'user', tabs: ['keydates'] });
const OWNER_TOKEN = (await createSession({ userId: ownerUser.id })).token;
const LIMITED_TOKEN = (await createSession({ userId: limitedUser.id })).token;
const ORPHAN_TOKEN = (await createSession({})).token; /* an old password-era session: no user */
await closePool();

/* ------------------------------------------------------------------------------------ S3 stub + app */
/* a fresh data cache: entries from another run (another database) must never be served here */
fs.rmSync(path.join(ROOT, '.next', 'cache', 'fetch-cache'), { recursive: true, force: true });
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
  GOOGLE_CLIENT_ID: 'e2e-client.apps.googleusercontent.com', GOOGLE_CLIENT_SECRET: 'e2e-google-secret',
  ADMIN_BOOTSTRAP_EMAIL: OWNER,
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
    if ((await fetch(`${BASE}/admin/login`)).status === 200) break;
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
  let r = await req('GET', '/admin/news', { origin: null });
  check('GET /admin/news without session → redirect to login', isRedirect(r.status) && (r.headers.get('location') || '').includes('/admin/login'), r.status);
  r = await req('GET', '/admin/login', { origin: null });
  check('login page 200', r.status === 200);
  check('admin headers: X-Frame-Options DENY', r.headers.get('x-frame-options') === 'DENY');
  check("admin headers: CSP frame-ancestors 'none'", (r.headers.get('content-security-policy') || '').includes("frame-ancestors 'none'"));
  check('admin headers: noindex + no-store', (r.headers.get('x-robots-tag') || '').includes('noindex') && (r.headers.get('cache-control') || '').includes('no-store'));
  check('login page HTML has no password or hash', !r.text.includes(PW) && !r.text.includes('scrypt$'));
  r = await req('GET', '/admin/news/api/health', { origin: null });
  check('health without session → 401', r.status === 401 && r.json.code === 'unauthorized', r.status);
  r = await req('GET', '/', { origin: null });
  check('site homepage unaffected (200, no admin headers)', r.status === 200 && !r.headers.get('x-frame-options'), r.status);

  /* 2. Google sign-in: start + the callback's refusals (no network needed) */
  r = await req('GET', '/admin/api/auth/google', { origin: null });
  const loc = r.headers.get('location') || '';
  check('sign-in start → 302 to Google with PKCE, state, nonce and hd', r.status === 302 && loc.startsWith('https://accounts.google.com/') && /code_challenge_method=S256/.test(loc) && /[?&]state=/.test(loc) && /[?&]nonce=/.test(loc) && /hd=atlasuniversity\.edu\.in/.test(loc), loc);
  check('sign-in start: redirect_uri is /auth/callback', loc.includes(encodeURIComponent(`${BASE}/auth/callback`)), loc);
  const oc = r.cookies.find((c) => c.startsWith('atlas_admin_oauth=')) || '';
  check('oauth cookie: HttpOnly; SameSite=Lax; Path=/auth/callback; short-lived', oc.includes('HttpOnly') && oc.includes('SameSite=Lax') && oc.includes('Path=/auth/callback') && /Max-Age=600/.test(oc), oc);
  check('Google client secret never leaves the server', !loc.includes('e2e-google-secret') && !oc.includes('e2e-google-secret'));
  r = await req('GET', '/auth/callback?error=access_denied', { origin: null });
  check('callback: user cancelled → login with error=cancelled', r.status === 303 && (r.headers.get('location') || '').endsWith('/admin/login?error=cancelled'), r.status);
  check('callback headers: noindex + no-store', (r.headers.get('cache-control') || '').includes('no-store'));
  r = await req('GET', '/auth/callback?code=x&state=y', { origin: null, headers: { 'X-Forwarded-For': '203.0.113.60' } });
  check('callback without the state cookie → error=expired, no session', r.status === 303 && (r.headers.get('location') || '').endsWith('error=expired') && !r.cookies.some((c) => c.startsWith('atlasnews_admin=')), r.status);
  r = await req('GET', '/auth/callback?code=x&state=y', { origin: null, headers: { 'X-Forwarded-For': '203.0.113.61', Cookie: 'atlas_admin_oauth=z.n.v' } });
  check('callback with a mismatched state → error=expired', r.status === 303 && (r.headers.get('location') || '').endsWith('error=expired'), r.status);
  r = await req('GET', '/admin/login?error=not_allowed', { origin: null });
  check('login page explains a refused account', r.status === 200 && r.text.includes('has not been given access'));

  /* 3. rate limit (isolated IP): five failed callbacks lock that IP */
  const ip = '198.51.100.77';
  for (let i = 0; i < 5; i++) await req('GET', '/auth/callback?code=x&state=y', { origin: null, headers: { 'X-Forwarded-For': ip } });
  r = await req('GET', '/auth/callback?code=x&state=y', { origin: null, headers: { 'X-Forwarded-For': ip } });
  check('6th failed sign-in from one IP → error=rate_limited', (r.headers.get('location') || '').endsWith('error=rate_limited'), r.headers.get('location'));
  r = await req('GET', '/auth/callback?code=x&state=y', { origin: null, headers: { 'X-Forwarded-For': `forged-${ip}, 198.51.100.77` } });
  check('rate limit keys on the rightmost X-Forwarded-For hop (forged left entry does not reset it)', (r.headers.get('location') || '').endsWith('error=rate_limited'), r.headers.get('location'));
  r = await req('POST', '/admin/api/login', { body: '{"password":"x"}', headers: { 'Content-Type': 'application/json' } });
  check('password sign-in is gone (404)', r.status === 404, r.status);

  /* 4. sessions, roles and tabs */
  const CK = `atlasnews_admin=${OWNER_TOKEN}`;
  const LK = `atlasnews_admin=${LIMITED_TOKEN}`;
  r = await req('GET', '/admin/news', { cookie: `atlasnews_admin=${ORPHAN_TOKEN}`, origin: null });
  check('a session with no user (password era) is refused', isRedirect(r.status) && (r.headers.get('location') || '').includes('/admin/login'), r.status);
  r = await req('GET', '/admin/news', { cookie: LK, origin: null });
  check('Key-Dates-only user: /admin/news → /admin?denied=news', isRedirect(r.status) && (r.headers.get('location') || '').includes('/admin?denied=news'), r.status);
  r = await req('GET', '/admin/keydates', { cookie: LK, origin: null });
  check('Key-Dates-only user: /admin/keydates → 200', r.status === 200, r.status);
  r = await req('GET', '/admin/news/api/health', { cookie: LK, origin: null });
  check('Key-Dates-only user: News API → 403 forbidden_tab', r.status === 403 && r.json?.code === 'forbidden_tab', r.status);
  r = await req('POST', '/admin/users/api', { cookie: LK, body: JSON.stringify({ action: 'add', email: 'x@atlasuniversity.edu.in', role: 'admin' }), headers: { 'Content-Type': 'application/json' } });
  check('normal user: Users API → 403', r.status === 403, r.status);
  r = await req('POST', '/admin/users/api', { cookie: CK, body: JSON.stringify({ action: 'add', email: 'x@gmail.com', role: 'user', tabs: [] }), headers: { 'Content-Type': 'application/json' } });
  check('admin: adding a non-university email → 422', r.status === 422, r.status);
  r = await req('POST', '/admin/users/api', { cookie: CK, body: JSON.stringify({ action: 'delete', id: ownerUser.id }), headers: { 'Content-Type': 'application/json' } });
  check('admin: the owner cannot be deleted → 422', r.status === 422, r.status);
  r = await req('POST', '/admin/users/api', { cookie: CK, origin: 'https://evil.example', body: JSON.stringify({ action: 'delete', id: limitedUser.id }), headers: { 'Content-Type': 'application/json' } });
  check('Users API from another origin → 403', r.status === 403, r.status);
  r = await req('GET', '/admin/news', { cookie: CK, origin: null });
  check('dashboard with session → 200 with real counts', r.status === 200 && r.text.includes('>Dashboard</h1>') && r.text.includes('Live articles'), r.status);
  check('dashboard HTML has no password/hash/credential', !r.text.includes(PW) && !r.text.includes('scrypt$') && !r.text.includes('stub-secret'));
  r = await req('GET', '/admin/news/system', { cookie: CK, origin: null });
  check('system page with session → 200 with data', r.status === 200 && r.text.includes('>Foundation status</h1>') && r.text.includes(DB.name), r.status);
  check('system page HTML has no password/hash/credential', !r.text.includes(PW) && !r.text.includes('scrypt$') && !r.text.includes('stub-secret'));
  r = await req('GET', '/admin/login', { cookie: CK, origin: null });
  check('login page with session → redirect to dashboard', isRedirect(r.status), r.status);
  r = await req('GET', '/admin/news/api/health', { cookie: CK, origin: null });
  const hb = r.json;
  check('health with session → 200, schema applied, Google sign-in configured', r.status === 200 && hb.database?.ok && hb.database.pending.length === 0 && hb.signIn === 'google', JSON.stringify(hb).slice(0, 200));
  check('health exposes no secret', !r.text.includes(PW) && !r.text.includes('scrypt$') && !r.text.includes('stub-secret'));

  /* 5. uploads — only ever against the stand-in */
  if (hb.storage?.publicHost !== `127.0.0.1:${stub.port}`) die(`ABORT: the app's storage is not the local stand-in (${hb.storage?.publicHost}); refusing to upload anything`);
  check('storage points at the local S3 stand-in only', true);

  const jpg = await noise(2000, 1300).withMetadata({ exif: { IFD0: { Copyright: 'SECRET-COPYRIGHT-E2E' } } }).jpeg({ quality: 90 }).toBuffer();
  const up = multipart({ alt: 'E2E test image', caption: 'Stage 1 verification' }, { file: ['test.jpg', 'image/jpeg', jpg] });
  r = await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK, origin: null });
  check('upload without Origin → 403', r.status === 403, r.status);
  r = await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type } });
  check('upload without session → 401', r.status === 401, r.status);
  const svg = multipart({}, { file: ['evil.jpg', 'image/jpeg', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"/>')] });
  r = await req('POST', '/admin/news/api/media', { body: svg.body, headers: { 'Content-Type': svg.type }, cookie: CK });
  check('SVG disguised as .jpg → 422 svg', r.status === 422 && r.json.code === 'svg', r.status);
  const mism = multipart({}, { file: ['x.png', 'image/png', jpg] });
  r = await req('POST', '/admin/news/api/media', { body: mism.body, headers: { 'Content-Type': mism.type }, cookie: CK });
  check('JPEG declared as PNG → 422 type_mismatch', r.status === 422 && r.json.code === 'type_mismatch', r.status);
  const big = new ReadableStream({
    start(c) {
      c.enqueue(new Uint8Array(1024));
      c.close();
    },
  });
  r = await req('POST', '/admin/news/api/media', { body: big, headers: { 'Content-Type': up.type }, cookie: CK });
  check('upload without Content-Length (chunked) → 411', r.status === 411, r.status);
  const declaredHuge = await new Promise((resolve) => {
    const rq = http.request(`${BASE}/admin/news/api/media`, { method: 'POST', headers: { Origin: BASE, Cookie: CK, 'Content-Type': up.type, 'Content-Length': String(200 * 1024 * 1024) } }, (res) => {
      res.resume();
      resolve(res.statusCode);
      rq.destroy();
    });
    rq.on('error', () => resolve('error'));
    rq.write('x'); /* the body is never sent — the server must answer from the header alone */
  });
  check('declared 200 MB upload → 413 before the body is read', declaredHuge === 413, declaredHuge);

  r = await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
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
  r = await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
  check('same image again → 200 deduplicated, same id', r.status === 200 && r.json.deduplicated && r.json.media?.id === media.id, r.status);

  /* 6. S3 conditional writes: existing key (412) and conflicting content */
  const n0 = stub.log.length;
  await q('DELETE FROM atlasnews_media WHERE id = ?', [media.id]);
  r = await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: CK });
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
  r = await req('POST', '/admin/news/api/media', { body: conflict.body, headers: { 'Content-Type': conflict.type }, cookie: CK });
  check('different content already at the key → 502 storage_error', r.status === 502 && r.json.code === 'storage_error', r.status);
  check('the existing object was NOT overwritten', (await (await fetch(STUB + thumbKey)).text()) === 'SOMEONE-ELSES-OBJECT');
  const [[{ n: rowsAfter }]] = await admin.query('SELECT COUNT(*) AS n FROM atlasnews_media');
  check('no media row recorded for the refused upload', Number(rowsAfter) === Number(rowsBefore));

  /* 7. concurrency limit: a burst of uploads never crashes the server or errors other than "busy" */
  const burst = await Promise.all(Array.from({ length: 9 }, async (_, i) => {
    const img = await noise(3000, 2000).jpeg({ quality: 92 }).toBuffer();
    const m = multipart({}, { file: [`burst-${i}.jpg`, 'image/jpeg', img] });
    const x = await req('POST', '/admin/news/api/media', { body: m.body, headers: { 'Content-Type': m.type }, cookie: CK });
    return { status: x.status, retry: x.headers.get('retry-after') };
  }));
  const statuses = burst.map((b) => b.status);
  check('burst of 9 parallel uploads: only 201 or 503 busy (with Retry-After)', burst.every((b) => b.status === 201 || (b.status === 503 && Number(b.retry) > 0)), statuses);
  check('burst: at least the 2 running + 4 queued slots succeeded', statuses.filter((s) => s === 201).length >= 6, statuses);
  check('server healthy after the burst', (await req('GET', '/admin/news/api/health', { cookie: CK, origin: null })).status === 200);
  console.log(`     burst statuses: ${statuses.join(' ')}`);

  r = await req('POST', '/admin/news/api/storage-check', { body: '', cookie: CK });
  check('storage-check: write + public read + checksum', r.status === 200 && r.json.ok === true, r.text.slice(0, 200));

  /* 7b. Stage 3 CMS over HTTP */
  const J = (body) => ({ body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, cookie: CK });
  r = await req('GET', '/admin/news/api/articles', { origin: null });
  check('CMS: articles API without session → 401', r.status === 401);
  r = await req('POST', '/admin/news/api/categories', { ...J({ name: 'E2E' }), origin: 'https://evil.example' });
  check('CMS: cross-origin write refused (403)', r.status === 403 && r.json.code === 'forbidden_origin', r.status);
  r = await req('POST', '/admin/news/api/categories', { ...J({ name: 'E2E' }), origin: null });
  check('CMS: write without Origin refused (403)', r.status === 403, r.status);
  r = await req('POST', '/admin/news/api/categories', { body: 'name=x', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, cookie: CK });
  check('CMS: non-JSON body → 415', r.status === 415, r.status);
  r = await req('POST', '/admin/news/api/categories', { body: '{bad', headers: { 'Content-Type': 'application/json' }, cookie: CK });
  check('CMS: malformed JSON → 400, no stack or SQL in the body', r.status === 400 && !/at |SELECT|INSERT|sql/i.test(r.text), r.text.slice(0, 120));
  r = await req('POST', '/admin/news/api/categories', J({ name: 'E2E Campus', showInMenu: true, menuOrder: 1 }));
  const catId = r.json.id;
  check('CMS: create category → 201', r.status === 201 && catId > 0, r.text.slice(0, 160));
  r = await req('POST', '/admin/news/api/articles', J({ title: '', status: 'published' }));
  check('CMS: invalid article → 400 with field errors', r.status === 400 && r.json.fields?.title && r.json.fields?.categoryIds, r.text.slice(0, 200));
  r = await req('POST', '/admin/news/api/articles', J({ title: 'E2E story', status: 'published', contentHtml: '<h1>Pasted</h1><p>Hello<script>alert(1)</script></p><h5>five</h5>', categoryIds: [catId] }));
  const artId = r.json.id;
  check('CMS: publish article → 201', r.status === 201 && r.json.slug === 'e2e-story', r.text.slice(0, 160));
  r = await req('GET', `/admin/news/api/articles/${artId}`, { cookie: CK, origin: null });
  const art = r.json.article;
  check('CMS: stored body sanitised — H1→H2, script gone, H5 kept', art?.contentHtml === '<h2>Pasted</h2><p>Hello</p><h5>five</h5>' && art.state === 'live', art?.contentHtml);
  r = await req('PUT', `/admin/news/api/articles/${artId}`, J({ article: { ...art, status: 'published', categoryIds: [catId] }, updatedAt: '2020-01-01T00:00:00.000Z' }));
  check('CMS: stale save → 409 edit_conflict', r.status === 409 && r.json.code === 'edit_conflict', r.status);
  r = await req('PUT', `/admin/news/api/articles/${artId}`, J({ article: { ...art, slug: 'e2e-story-renamed', status: 'published', categoryIds: [catId] }, updatedAt: art.updatedAt }));
  check('CMS: slug change on a live article → redirect recorded', r.status === 200 && r.json.redirectFrom === '/news/e2e-story', r.text.slice(0, 200));
  r = await req('PUT', '/admin/news/api/homepage', J({ zones: { hero_centre: [artId], picks: [artId] } }));
  check('CMS: same article in two homepage slots → 400 naming the article', r.status === 400 && /“E2E story” is already placed in Hero — centre/.test(r.json.fields?.picks || ''), r.text.slice(0, 240));
  r = await req('PUT', '/admin/news/api/homepage', J({ zones: { sidebar: [artId] } }));
  check('CMS: unknown homepage zone → 400 (validated in code)', r.status === 400 && r.json.fields?.sidebar, r.status);
  r = await req('PUT', '/admin/news/api/homepage', J({ zones: { hero_centre: [artId] } }));
  check('CMS: homepage saved', r.status === 200 && r.json.zones[0].items[0]?.id === artId, r.text.slice(0, 160));
  r = await req('GET', `/admin/news/preview/${artId}`, { cookie: CK, origin: null });
  check('CMS: preview renders the article with the public layout', r.status === 200 && r.text.includes('E2E story') && r.text.includes('Pasted</h2>') && !r.text.includes('<script>alert'), r.status);
  r = await req('GET', `/admin/news/preview/${artId}`, { origin: null });
  check('CMS: preview without session → redirect, no content', isRedirect(r.status) && !r.text.includes('E2E story'), r.status);
  const [mrow] = await q('SELECT id FROM atlasnews_media ORDER BY id LIMIT 1');
  if (mrow) {
    const cur = (await req('GET', `/admin/news/api/articles/${artId}`, { cookie: CK, origin: null })).json.article;
    await req('PUT', `/admin/news/api/articles/${artId}`, J({ article: { ...cur, status: 'published', featuredMediaId: mrow.id }, updatedAt: cur.updatedAt }));
    r = await req('DELETE', `/admin/news/api/media/${mrow.id}`, { cookie: CK });
    check('CMS: deleting an image in use → 409 with its usage', r.status === 409 && r.json.usage?.featured?.[0]?.id === artId, r.text.slice(0, 200));
  }
  r = await req('DELETE', `/admin/news/api/categories/${catId}`, { cookie: CK });
  check('CMS: deleting a category in use → 409', r.status === 409 && r.json.code === 'category_in_use', r.status);
  r = await req('DELETE', `/admin/news/api/articles/${artId}`, { cookie: CK });
  check('CMS: trash → off the homepage', r.status === 200 && r.json.removedFromHomepage === true, r.text.slice(0, 160));
  r = await req('GET', '/admin/news/api/articles/abc', { cookie: CK, origin: null });
  check('CMS: non-numeric id → 404', r.status === 404, r.status);
  for (const [pagePath, needle] of [['/admin/news', '>Dashboard</h1>'], ['/admin/news/articles', '>Articles</h1>'], ['/admin/news/categories', '>Categories</h1>'], ['/admin/news/homepage', '>Homepage</h1>'], ['/admin/news/media', '>Media library</h1>'], ['/admin/news/articles/new', 'New article']]) {
    r = await req('GET', pagePath, { cookie: CK, origin: null });
    check(`CMS page ${pagePath} → 200`, r.status === 200 && r.text.includes(needle) && !r.text.includes(PW), r.status);
  }

  /* 7c. Public pages from MySQL: privacy, immediate cache invalidation, redirects, curation, robots */
  const pub = (p) => req('GET', p, { origin: null });
  const noindexMeta = (html) => /<meta name="robots" content="noindex, nofollow"/.test(html);
  r = await pub('/news');
  check('public: empty publication (only a trashed story) → 200, a quiet notice, no sample stories', r.status === 200 && r.text.includes('will appear here soon') && !r.text.includes('A graduating class'), r.status);
  check('public: homepage is noindex by default (indexing_enabled unset)', noindexMeta(r.text));
  check('public: no Editor’s Picks or Featured block when none are set', !r.text.includes('Editor’s Picks') && !r.text.includes('The big read'));
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Public Desk', showInMenu: true, menuOrder: 2 }));
  const pubCat = r.json.id;
  const T1 = 'Public visibility check';
  r = await req('POST', '/admin/news/api/articles', J({ title: T1, status: 'draft', contentHtml: '<p>Draft body</p>', excerpt: 'An excerpt', categoryIds: [pubCat] }));
  const pid = r.json.id;
  const getArt = async () => (await req('GET', `/admin/news/api/articles/${pid}`, { cookie: CK, origin: null })).json.article;
  const put = async (patch) => {
    const a = await getArt();
    return req('PUT', `/admin/news/api/articles/${pid}`, J({ article: { ...a, ...patch }, updatedAt: a.updatedAt }));
  };
  r = await pub('/news/public-visibility-check');
  check('public: a DRAFT is a 404 and its content never appears', r.status === 404 && !r.text.includes('Draft body') && !r.text.includes(T1), r.status);
  r = await put({ status: 'published', publishedAt: null });
  check('public: publish via the CMS', r.status === 200, r.text.slice(0, 120));
  r = await pub('/news/public-visibility-check');
  check('public: published → visible IMMEDIATELY (cache invalidated), noindex, canonical', r.status === 200 && r.text.includes(T1) && r.text.includes('Draft body') && noindexMeta(r.text) && r.text.includes('rel="canonical" href="https://atlasuniversity.edu.in/news/public-visibility-check"'), r.status);
  check('public: article JSON-LD present', r.text.includes('"@type":"NewsArticle"'));
  await pub('/news'); /* warm the homepage cache, then change it */
  r = await put({ title: `${T1} (edited)` });
  r = await pub('/news/public-visibility-check');
  check('public: an edit shows on the next request', r.text.includes(`${T1} (edited)`), r.status);
  r = await pub('/news');
  check('public: the homepage leads with the new story (lead = newest when no curation)', r.text.includes(`${T1} (edited)`), r.status);
  r = await req('PUT', '/admin/news/api/homepage', J({ zones: { picks: [pid] } }));
  r = await pub('/news');
  check('public: Editor’s Picks shows once a pick is set', r.text.includes('Editor’s Picks'), r.status);
  r = await req('PUT', '/admin/news/api/homepage', J({ zones: { featured: [pid] } }));
  r = await pub('/news');
  check('public: Featured ("The big read") shows once set, and Picks disappears when cleared', r.text.includes('The big read') && !r.text.includes('Editor’s Picks'), r.status);
  r = await pub('/news/category/public-desk');
  check('public: category page lists the story; in the navigation', r.status === 200 && r.text.includes(`${T1} (edited)`) && r.text.includes('href="/news/category/public-desk"'), r.status);
  check('public: category page 2 of 1 → 404; /page/1 → permanent redirect', (await pub('/news/category/public-desk/page/2')).status === 404 && [301, 308].includes((await pub('/news/category/public-desk/page/1')).status));
  r = await put({ status: 'scheduled', publishedAt: new Date(Date.now() + 3600_000).toISOString() });
  check('public: rescheduled for later → 404 IMMEDIATELY, gone from the homepage', (await pub('/news/public-visibility-check')).status === 404 && !(await pub('/news')).text.includes(T1), r.status);
  r = await put({ status: 'published', publishedAt: null });
  r = await put({ slug: 'public-visibility-renamed' });
  check('public: slug renamed → redirect recorded', r.json.redirectFrom === '/news/public-visibility-check', r.text.slice(0, 160));
  r = await pub('/news/public-visibility-check');
  check('public: old URL → permanent redirect to the new one', [301, 308].includes(r.status) && (r.headers.get('location') || '').endsWith('/news/public-visibility-renamed'), `${r.status} ${r.headers.get('location')}`);
  check('public: new URL → 200', (await pub('/news/public-visibility-renamed')).status === 200);
  r = await req('PUT', `/admin/news/api/categories/${pubCat}`, J({ name: 'Public Desk', slug: 'public-desk-2', showInMenu: true }));
  r = await pub('/news/category/public-desk');
  check('public: renamed category → old URL redirects', [301, 308].includes(r.status) && (r.headers.get('location') || '').endsWith('/news/category/public-desk-2'), r.status);
  r = await req('DELETE', `/admin/news/api/articles/${pid}`, { cookie: CK });
  check('public: trashed → 404 IMMEDIATELY and off the homepage', (await pub('/news/public-visibility-renamed')).status === 404 && !(await pub('/news')).text.includes(T1));
  r = await pub('/news/no-such-story');
  check('public: unknown slug → the News 404 page', r.status === 404 && r.text.includes('This story isn’t here'), r.status);
  r = await pub('/admin/news/api/articles');
  check('public: CMS APIs are not public', r.status === 401);

  /* 7d. Category hierarchy over HTTP: API, parent archive, breadcrumbs, legacy nested URLs */
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Hier Root' }));
  const hRoot = r.json.id;
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Hier Child', parentId: hRoot }));
  const hChild = r.json.id;
  check('hierarchy: child created through the API', r.status === 201 && hChild > 0, r.text.slice(0, 160));
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Hier Grand', parentId: hChild }));
  const hGrand = r.json.id;
  r = await req('PUT', `/admin/news/api/categories/${hRoot}`, J({ name: 'Hier Root', parentId: hGrand }));
  check('hierarchy: a cycle through the API → 409 with a field message', r.status === 409 && r.json.code === 'category_cycle' && r.json.fields?.parentId, r.text.slice(0, 200));
  r = await req('DELETE', `/admin/news/api/categories/${hChild}`, { cookie: CK });
  check('hierarchy: deleting a parent with children → 409 category_has_children', r.status === 409 && r.json.code === 'category_has_children', r.status);
  r = await req('POST', '/admin/news/api/articles', J({ title: 'Hierarchy story', status: 'published', contentHtml: '<p>Deep</p>', categoryIds: [hGrand] }));
  const hArt = r.json.id;
  check('hierarchy: article published in the grandchild', r.status === 201, r.text.slice(0, 160));
  r = await pub('/news/category/hier-root');
  check('hierarchy: the ROOT archive lists the grandchild’s article', r.status === 200 && r.text.includes('Hierarchy story'), r.status);
  r = await pub('/news/hierarchy-story');
  const crumbs = [...r.text.matchAll(/aria-label="Breadcrumb"[\s\S]*?<\/nav>/g)][0]?.[0] || '';
  const order = ['>News<', '>Hier Root<', '>Hier Child<', '>Hier Grand<'].map((s) => crumbs.indexOf(s));
  check('hierarchy: the article breadcrumb shows the full path, root first', order.every((i) => i >= 0) && order.every((v, i) => i === 0 || v > order[i - 1]), order);
  const ld = [...r.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])).flat().find((x) => x['@type'] === 'BreadcrumbList');
  check('hierarchy: BreadcrumbList structured data = News › Root › Child › Grand › article, positions 1..5',
    ld && ld.itemListElement.map((e) => e.name).join('|') === 'ATLAS News|Hier Root|Hier Child|Hier Grand|Hierarchy story' && ld.itemListElement.every((e, i) => e.position === i + 1),
    JSON.stringify(ld?.itemListElement?.map((e) => [e.position, e.name])));
  check('hierarchy: canonical unchanged (the article’s own flat URL)', r.text.includes('rel="canonical" href="https://atlasuniversity.edu.in/news/hierarchy-story"'));
  r = await pub('/news/category/hier-root/hier-child/hier-grand');
  check('legacy URL: complete chain → permanent redirect to the flat category URL', [301, 308].includes(r.status) && (r.headers.get('location') || '').endsWith('/news/category/hier-grand'), `${r.status} ${r.headers.get('location')}`);
  r = await pub('/news/category/hier-root/hier-child/page/2');
  check('legacy URL: pagination kept', [301, 308].includes(r.status) && (r.headers.get('location') || '').endsWith('/news/category/hier-child/page/2'), `${r.status} ${r.headers.get('location')}`);
  r = await pub('/news/category/hier-child/hier-grand');
  check('legacy URL: partial chain → 404', r.status === 404, r.status);
  r = await pub('/news/category/public-desk-2/hier-grand');
  check('legacy URL: wrong ancestor → 404', r.status === 404, r.status);
  r = await pub('/news/category/hier-root/nope');
  check('legacy URL: unknown slug → 404', r.status === 404, r.status);
  r = await pub('/news/category/hier-grand');
  check('flat category URL still 200 (no redirect loop)', r.status === 200, r.status);
  r = await pub('/news/category/hier-root/page/1');
  check('existing /page/1 route unchanged (redirect to the base URL)', [301, 308].includes(r.status) && (r.headers.get('location') || '').endsWith('/news/category/hier-root'), r.status);
  r = await pub('/news/hierarchy-story/extra');
  check('article routes untouched: /news/<slug>/<extra> → 404', r.status === 404, r.status);
  await req('DELETE', `/admin/news/api/articles/${hArt}`, { cookie: CK });

  /* 7e. Navigation dropdowns and homepage sections (the old WordPress structure, as CMS data) */
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Nav Root', showInMenu: true, menuOrder: 3 }));
  const navRoot = r.json.id;
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Nav Child', showInMenu: true, menuOrder: 10, parentId: navRoot }));
  const navChild = r.json.id;
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Nav Grandchild', showInMenu: true, menuOrder: 10, parentId: navChild }));
  r = await req('POST', '/admin/news/api/categories', J({ name: 'Nav Hidden Child', showInMenu: false, parentId: navRoot }));
  r = await req('POST', '/admin/news/api/articles', J({ title: 'Section story one', status: 'published', contentHtml: '<p>One</p>', categoryIds: [navChild] }));
  const secArt = r.json.id;
  r = await pub('/news');
  const navHtml = (r.text.match(/<nav aria-label="Sections"[\s\S]*?<\/nav>/) || [''])[0];
  check('nav: a menu category with sub-categories gets a dropdown toggle', r.text.includes('aria-label="Nav Root: show sections"'), r.status);
  check('nav: the dropdown lists sub-categories in the menu, any depth', navHtml.includes('href="/news/category/nav-child"') && navHtml.includes('href="/news/category/nav-grandchild"'));
  check('nav: a sub-category NOT in the menu is not listed', !navHtml.includes('nav-hidden-child'));
  const footer = (r.text.match(/<footer[\s\S]*?<\/footer>/) || [''])[0];
  check('footer: top-level sections only', footer.includes('href="/news/category/nav-root"') && !footer.includes('href="/news/category/nav-child"'));
  for (const slug of ['nav-root', 'nav-child', 'nav-grandchild']) check(`nav link /news/category/${slug} → 200`, (await pub(`/news/category/${slug}`)).status === 200);

  r = await req('GET', '/admin/news/api/homepage/sections', { cookie: CK });
  check('sections API: readable by the admin; none configured yet', r.status === 200 && Array.isArray(r.json.sections) && r.json.sections.length === 0 && r.json.configured === false, r.text.slice(0, 160));
  check('sections API: not public', (await pub('/admin/news/api/homepage/sections')).status === 401);
  r = await req('PUT', '/admin/news/api/homepage/sections', J({ sections: [{ layout: 'grid', title: 'X', categoryIds: [999999], count: 40 }] }));
  check('sections API: invalid → 400 with field messages, nothing saved', r.status === 400 && r.json.fields?.['sections.0.categoryIds'] && r.json.fields?.['sections.0.count'], r.text.slice(0, 200));
  r = await req('PUT', '/admin/news/api/homepage/sections', J({ sections: [
    { layout: 'heading', title: 'Restored Group' },
    { layout: 'headlines', title: 'Restored Headlines', categoryIds: [navRoot], count: 4, width: 'half' },
    { layout: 'grid', title: 'Restored Grid', categoryIds: [navChild], count: 3, width: 'half' },
  ] }));
  check('sections API: saved', r.status === 200 && r.json.sections.length === 3, r.text.slice(0, 200));
  r = await pub('/news');
  check('homepage: configured sections render in order, with their titles', ['Restored Group', 'Restored Headlines', 'Restored Grid'].map((t) => r.text.indexOf(`>${t}<`)).every((v, i, a) => v > 0 && (i === 0 || v > a[i - 1])), r.status);
  check('homepage: a section reads its category AND sub-categories', r.text.includes('Section story one'));
  check('homepage: the section title links to its single category', r.text.includes('href="/news/category/nav-root"'));
  r = await req('GET', '/admin/news/homepage', { cookie: CK, origin: null });
  check('admin Homepage page shows the Sections editor', r.status === 200 && r.text.includes('Save sections') && r.text.includes('Restored Headlines'), r.status);
  r = await req('PUT', '/admin/news/api/homepage/sections', J({ sections: [] }));
  r = await pub('/news');
  check('homepage: an empty section list falls back to the automatic category sections', !r.text.includes('Restored Headlines'), r.status);
  await req('DELETE', `/admin/news/api/articles/${secArt}`, { cookie: CK });

  /* 8. page authentication: direct, RSC, expired — on the dashboard AND the system page */
  const DATA = [DB.name, 'Migrations applied', 'Table prefix', '>Foundation status</h1>', `127.0.0.1:${stub.port}`, '>Dashboard</h1>', 'Live articles', 'Recently edited'];
  const treeFor = (leaf) => encodeURIComponent(JSON.stringify(['', { children: ['news', { children: ['admin', { children: ['(panel)', { children: leaf }, null, null] }, null, null] }, null, null] }, null, null, true]));
  const tree = treeFor(['__PAGE__', {}, null, null]);
  for (const [pagePath, t] of [['/admin/news', tree], ['/admin/news/system', treeFor(['system', { children: ['__PAGE__', {}, null, null] }, null, null])]]) {
    for (const [label, hdrs] of [['plain GET', {}], ['RSC request', { RSC: '1' }], ['RSC with a crafted router-state header (Next itself rejects it: 500)', { RSC: '1', 'Next-Router-State-Tree': t, 'Next-Url': pagePath }]]) {
      r = await req('GET', pagePath, { headers: hdrs, origin: null });
      check(`no session, ${pagePath} ${label} → no admin data (${r.status})`, !DATA.some((d) => r.text.includes(d)));
    }
  }
  /* a fresh session for the owner, written straight to the database (sign-in itself needs Google) */
  const session = async () => {
    const token = randomBytes(32).toString('base64url');
    await q('INSERT INTO atlasnews_admin_sessions (user_id, token_hash, expires_at) VALUES (?, SHA2(?, 256), UTC_TIMESTAMP(3) + INTERVAL 7 DAY)', [ownerUser.id, token]);
    return `atlasnews_admin=${token}`;
  };
  const ck2 = await session('203.0.113.21');
  await q("UPDATE atlasnews_admin_sessions SET last_seen_at = UTC_TIMESTAMP(3) - INTERVAL 13 HOUR WHERE token_hash = SHA2(?, 256)", [ck2.split('=')[1]]);
  r = await req('GET', '/admin/news', { cookie: ck2, origin: null });
  check('idle-expired session → redirect, no data', isRedirect(r.status) && !DATA.some((d) => r.text.includes(d)), r.status);
  r = await req('GET', '/admin/news', { headers: { RSC: '1', 'Next-Router-State-Tree': tree }, cookie: ck2, origin: null });
  check('idle-expired session, crafted RSC → no data', !DATA.some((d) => r.text.includes(d)));
  check('idle-expired session → health 401', (await req('GET', '/admin/news/api/health', { cookie: ck2, origin: null })).status === 401);
  const ck3 = await session('203.0.113.22');
  await q("UPDATE atlasnews_admin_sessions SET expires_at = UTC_TIMESTAMP(3) - INTERVAL 1 SECOND WHERE token_hash = SHA2(?, 256)", [ck3.split('=')[1]]);
  r = await req('GET', '/admin/news', { cookie: ck3, origin: null });
  check('absolute-expired session → redirect, no data', isRedirect(r.status) && !DATA.some((d) => r.text.includes(d)), r.status);
  check('absolute-expired session → upload 401', (await req('POST', '/admin/news/api/media', { body: up.body, headers: { 'Content-Type': up.type }, cookie: ck3 })).status === 401);

  /* 9. optional browser smoke test (Python Playwright) */
  if (E.NEWS_E2E_BROWSER === '1') {
    await q('DELETE FROM atlasnews_login_attempts');
    /* async: the S3 stand-in runs in THIS process, so the event loop must stay free while the browser
       test (which triggers S3 writes through the app) runs */
    const runPy = (script) => new Promise((resolve) => {
      const child = spawn(E.PYTHON || 'python', [path.join(ROOT, 'scripts', 'news', 'tests', script), BASE, PW], { stdio: ['ignore', 'pipe', 'pipe'] });
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
    /* the Stage 2 sample content (test database only), curated through the CMS API so the public cache
       is invalidated the way an editor's save does it */
    await q('DELETE FROM atlasnews_homepage_slots');
    const { seedSample } = await import('./seed-sample.mjs');
    const seeded = await seedSample((sql, params) => q(sql, params), { slots: false });
    r = await req('PUT', '/admin/news/api/homepage', { body: JSON.stringify({ zones: seeded.zones }), headers: { 'Content-Type': 'application/json' }, cookie: CK });
    check('sample content seeded; homepage curated through the CMS API', r.status === 200, r.text.slice(0, 160));
    const pubPy = await runPy('browser_public.py');
    process.stdout.write(pubPy.stdout || '');
    check('browser public test: hero, sections, Featured, Editor’s Picks, article, category, light/dark (390 + 1440)', pubPy.status === 0, (pubPy.stderr || '').slice(-600));
    /* browser.py and browser_cms.py drove the old password form; sign-in is Google now, so they are not
       run here until they are rewritten to start from a session cookie. */
  }

  /* 10. logout */
  check('logout without Origin → 403', (await req('POST', '/admin/api/logout', { body: '', cookie: CK, origin: null })).status === 403);
  r = await req('POST', '/admin/api/logout', { body: '', cookie: CK });
  check('logout → 200 and cookie cleared', r.status === 200 && r.cookies.some((c) => c.includes('Max-Age=0')), r.status);
  check('old token rejected after logout → 401', (await req('GET', '/admin/news/api/health', { cookie: CK, origin: null })).status === 401);
  check('forged token → 401', (await req('GET', '/admin/news/api/health', { cookie: `atlasnews_admin=${'A'.repeat(43)}`, origin: null })).status === 401);

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
