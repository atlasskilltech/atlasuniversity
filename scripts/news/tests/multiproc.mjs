#!/usr/bin/env node
/**
 * ATLAS News — cache consistency across several app processes (as under PM2), against the production
 * build (`npx next build` first).
 *
 *   npm run news:multiproc
 *
 * Two `next start` processes, A and B, share one build and one on-disk data cache, like PM2 cluster
 * processes. Every change is made through A's admin API, so A's cache tag is expired at once while B
 * learns nothing directly. Verified:
 *   1. an edit is visible on A immediately and on B within 60 s — and stays visible (B never reverts);
 *   2. unpublishing (back to draft) disappears from A immediately and from B within 60 s;
 *   3. a SCHEDULED article is invisible everywhere before its time and visible on both within 60 s after;
 *   4. the homepage follows on both processes within 60 s.
 * Timings are printed so the actual delays are on record.
 */
import { clearDataCache, counter, get, makeSampleDb, sleep, startApp } from './harness.mjs';

const DB_NAME = process.env.NEWS_MULTIPROC_DB_NAME || 'atlasnews_multiproc_test';
const PW = `Multiproc-Test-Password-${Date.now()}`;
const LIMIT = 60_000;
const { check, summary } = counter();

const db = await makeSampleDb(DB_NAME, { password: PW });
clearDataCache();
const A = await startApp(Number(process.env.NEWS_MULTIPROC_PORT_A || 3401), { dbName: DB_NAME, dbPort: 3306 });
const B = await startApp(Number(process.env.NEWS_MULTIPROC_PORT_B || 3402), { dbName: DB_NAME, dbPort: 3306 });

/* sign in on A */
const login = await fetch(`${A.base}/news/admin/api/login`, {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: A.base }, body: JSON.stringify({ password: PW }),
});
const CK = (login.headers.getSetCookie?.()[0] || '').split(';')[0];
const api = async (method, path, body) => {
  const res = await fetch(`${A.base}/news/admin/api${path}`, {
    method, headers: { Cookie: CK, Origin: A.base, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, json: await res.json().catch(() => ({})) };
};

/** poll `fn` every 2 s until it returns true or `limit` passes; returns elapsed ms or null */
async function within(fn, limit = LIMIT) {
  const t0 = Date.now();
  while (Date.now() - t0 <= limit + 5_000) {
    if (await fn()) return Date.now() - t0;
    await sleep(2_000);
  }
  return null;
}
const has = async (app, path, text) => {
  const r = await get(app.base, path);
  return r.status === 200 && r.text.includes(text);
};
const status = async (app, path) => (await get(app.base, path)).status;

try {
  check('signed in on process A', login.status === 200 && CK.length > 10, login.status);
  const SLUG = 'placement-season-decoded';
  const PATH = `/news/${SLUG}`;
  const id = (await db.run('SELECT id FROM atlasnews_posts WHERE slug = ?', [SLUG]))[0].id;
  /* warm BOTH processes' caches */
  for (const app of [A, B]) {
    check(`${app === A ? 'A' : 'B'} warm: article 200`, await has(app, PATH, 'Placement season'));
    await get(app.base, '/news');
  }

  /* 1. edit */
  const cur = (await api('GET', `/articles/${id}`)).json.article;
  const NEW = `Placement season, edited ${Date.now()}`;
  const upd = await api('PUT', `/articles/${id}`, { article: { ...cur, title: NEW }, updatedAt: cur.updatedAt });
  check('edit saved through A', upd.status === 200, upd.status);
  check('1 edit visible on A immediately', await has(A, PATH, NEW));
  const tB = await within(() => has(B, PATH, NEW));
  console.log(`     process B showed the edit after ${tB === null ? 'NEVER' : `${(tB / 1000).toFixed(1)} s`}`);
  check('1 edit visible on B within 60 s', tB !== null && tB <= LIMIT, tB);
  let stays = true;
  for (let i = 0; i < 5; i++) {
    stays &&= await has(B, PATH, NEW);
    await sleep(1_000);
  }
  check('1 B keeps serving the edit (no reversion to stale)', stays);

  /* 2. unpublish */
  const cur2 = (await api('GET', `/articles/${id}`)).json.article;
  const un = await api('PUT', `/articles/${id}`, { article: { ...cur2, status: 'draft' }, updatedAt: cur2.updatedAt });
  check('unpublished through A', un.status === 200, un.status);
  check('2 gone from A immediately (404)', (await status(A, PATH)) === 404);
  const tGone = await within(async () => (await status(B, PATH)) === 404);
  console.log(`     process B stopped serving it after ${tGone === null ? 'NEVER' : `${(tGone / 1000).toFixed(1)} s`}`);
  check('2 gone from B within 60 s', tGone !== null && tGone <= LIMIT, tGone);

  /* 3. scheduled */
  const cats = (await api('GET', '/categories')).json.items;
  const publishAt = Date.now() + 25_000;
  const sch = await api('POST', '/articles', {
    title: 'Scheduled across processes', status: 'scheduled', publishedAt: new Date(publishAt).toISOString(),
    contentHtml: '<p>Appears on its own.</p>', categoryIds: [cats[0].id],
  });
  check('scheduled article created through A', sch.status === 201, sch.status);
  const SP = `/news/${sch.json.slug}`;
  check('3 before its time: 404 on A and B', (await status(A, SP)) === 404 && (await status(B, SP)) === 404);
  while (Date.now() < publishAt) await sleep(500);
  const [ta, tb] = await Promise.all([within(async () => (await status(A, SP)) === 200), within(async () => (await status(B, SP)) === 200)]);
  console.log(`     after its publication time: A ${ta === null ? 'NEVER' : `${(ta / 1000).toFixed(1)} s`}, B ${tb === null ? 'NEVER' : `${(tb / 1000).toFixed(1)} s`}`);
  check('3 visible on A within 60 s of its time (no cron)', ta !== null && ta <= LIMIT, ta);
  check('3 visible on B within 60 s of its time (no cron)', tb !== null && tb <= LIMIT, tb);

  /* 4. homepage on both */
  const [ha, hb] = await Promise.all([within(() => has(A, '/news', 'Scheduled across processes')), within(() => has(B, '/news', 'Scheduled across processes'))]);
  console.log(`     homepage lead updated: A ${ha === null ? 'NEVER' : `${(ha / 1000).toFixed(1)} s`}, B ${hb === null ? 'NEVER' : `${(hb / 1000).toFixed(1)} s`}`);
  check('4 homepage shows it on both processes within 60 s', ha !== null && hb !== null && Math.max(ha, hb) <= LIMIT, { ha, hb });
} catch (e) {
  check(`suite crashed: ${e.message}`, false);
}
A.stop();
B.stop();
await db.close();
const { pass, fail } = summary();
console.log(`\n${pass}/${pass + fail} passed  (logs: ${A.log} ${B.log})`);
process.exit(fail ? 1 : 0);
