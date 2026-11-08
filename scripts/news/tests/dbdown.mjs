#!/usr/bin/env node
/**
 * ATLAS News — database outage behaviour, against the production build (`npx next build` first).
 *
 *   npm run news:dbdown        (a local MySQL is needed for the recovery half; NEWS_E2E_DB_* as for e2e)
 *
 * The app reaches MySQL only through a TCP forwarder this script controls, so an outage is simulated
 * without touching the real server.
 *   A. cold start with the database DOWN: every public page → HTTP 503 + Retry-After, a server-rendered
 *      News page (readable with JavaScript disabled), noindex, nothing about the cause; admin sign-in
 *      still renders; the university site is unaffected.
 *   B. database restored → the same pages recover by themselves (200).
 *   C. database cut again: pages served before keep working from the data cache (last-known-good, 200) —
 *      even after their 30 s refresh window has passed — while a never-served page answers 503.
 *   D. restored → everything 200 again.
 */
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { clearDataCache, counter, get, makeSampleDb, ROOT, sleep, startApp, startForwarder } from './harness.mjs';

const DB_NAME = process.env.NEWS_DBDOWN_DB_NAME || 'atlasnews_dbdown_test';
const PORT = Number(process.env.NEWS_DBDOWN_PORT || 3398);
const { check, summary } = counter();
const LEAKS = ['ECONNREFUSED', 'ECONNRESET', '127.0.0.1:', 'NewsDbError', DB_NAME, 'at async', 'node_modules', 'mysql', 'DB_'];
const leaksIn = (t) => LEAKS.filter((s) => t.includes(s));

const STORY = '/news/a-graduating-class-steps-into-a-world-still-being-written';
const COLD_STORY = '/news/placement-season-decoded';
const db = await makeSampleDb(DB_NAME);
const fw = await startForwarder();
await fw.cut(); /* A starts with the database unreachable */
clearDataCache(); /* and nothing cached */
const app = await startApp(PORT, { dbName: DB_NAME, dbPort: fw.port });
const g = (p, init) => get(app.base, p, init);

try {
  /* ---------------- A. cold, database down */
  for (const p of ['/news', STORY, '/news/category/student-life', '/news/category/student-life/page/2']) {
    const r = await g(p);
    check(`A ${p} → 503`, r.status === 503, r.status);
    check(`A ${p} → Retry-After + no-store + noindex header`, Number(r.headers.get('retry-after')) > 0 && /no-store/.test(r.headers.get('cache-control') || '') && /noindex/.test(r.headers.get('x-robots-tag') || ''));
    check(`A ${p} → server-rendered message in the HTML itself (no JavaScript needed)`, r.text.includes('<h1>ATLAS News will be back in a moment.</h1>') && !/<script/i.test(r.text));
    check(`A ${p} → noindex meta`, r.text.includes('<meta name="robots" content="noindex, nofollow">'));
    check(`A ${p} → nothing about the cause`, !leaksIn(r.text).length, leaksIn(r.text));
  }
  const head = await g('/news', { method: 'HEAD' });
  check('A HEAD /news → 503, no body', head.status === 503 && head.text === '');
  let r = await g('/news/admin/login');
  check('A admin sign-in still renders (the proxy never touches /news/admin)', r.status === 200 && r.text.includes('news-admin-password'));
  r = await g('/news/admin/api/articles');
  check('A admin API refuses without leaking', [401, 503].includes(r.status) && !leaksIn(r.text).length, r.status);
  for (const p of ['/', '/about-us', '/campus-atlas', '/schools/isdi']) {
    r = await g(p);
    check(`A university route ${p} unaffected (200)`, r.status === 200, r.status);
  }
  const py = spawnSync(process.env.PYTHON || 'python', [path.join(ROOT, 'scripts', 'news', 'tests', 'browser_dbdown.py'), app.base], { encoding: 'utf8', timeout: 180_000 });
  process.stdout.write(py.stdout || '');
  check('A browser, JavaScript DISABLED and enabled, 390 + 1440: the message is shown', py.status === 0, (py.stderr || '').slice(-300));

  /* ---------------- B. restored → recovers by itself */
  await fw.restore();
  await sleep(4000); /* > the 3 s re-check interval while down */
  for (const p of ['/news', STORY, '/news/category/student-life']) {
    r = await g(p);
    check(`B ${p} → recovered (200, real content)`, r.status === 200 && r.text.includes('data-news-root') && !r.text.includes('will be back in a moment'), r.status);
  }

  /* ---------------- C. cut again: last-known-good vs never served */
  await fw.cut();
  await sleep(500);
  for (const p of ['/news', STORY, '/news/category/student-life']) {
    r = await g(p);
    check(`C ${p} (served before) → still 200 from the data cache`, r.status === 200 && r.text.includes('data-news-root') && !r.text.includes('will be back in a moment'), r.status);
  }
  r = await g(COLD_STORY);
  check(`C ${COLD_STORY} (never served) → 503 server-rendered`, r.status === 503 && r.text.includes('<h1>ATLAS News will be back in a moment.</h1>'), r.status);
  console.log('     waiting 35 s: past the 30 s refresh window, with the database still down …');
  await sleep(35_000);
  r = await g(STORY);
  check('C after the refresh window, a served page is STILL served (stale-while-down, 200)', r.status === 200 && r.text.includes('A graduating class'), r.status);
  check('C …and nothing about the cause in it', !leaksIn(r.text).length, leaksIn(r.text));

  /* ---------------- D. restored */
  await fw.restore();
  await sleep(4000);
  r = await g(COLD_STORY);
  check(`D ${COLD_STORY} → 200 once the database is back`, r.status === 200 && r.text.includes('Placement season'), r.status);
} catch (e) {
  check(`suite crashed: ${e.message}`, false);
}
app.stop();
await fw.cut().catch(() => {});
await db.close();
const { pass, fail } = summary();
console.log(`\n${pass}/${pass + fail} passed  (app log: ${app.log})`);
process.exit(fail ? 1 : 0);
