/**
 * ATLAS News — database-outage handling (pure; no database): the health flag, last-known-good paths,
 * and the 503 document the proxy serves.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOWN_TTL, isConnectionError, isGood, markDbDown, markDbUp, normalisePath, rememberGood, resetHealth, UP_TTL, dbAvailable } from '../../../lib/news/public/health.js';
import { OUTAGE_HTML, outageResponseInit, OUTAGE_RETRY_AFTER_SECONDS } from '../../../lib/news/public/outage.js';
import { NewsDbConfigError, NewsDbError } from '../../../lib/news/db/pool.js';

test('outage page: a complete server-rendered document, noindex, no JavaScript, no cause disclosed', () => {
  assert.match(OUTAGE_HTML, /^<!doctype html>/);
  assert.match(OUTAGE_HTML, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(OUTAGE_HTML, /<h1>ATLAS News will be back in a moment\.<\/h1>/);
  assert.match(OUTAGE_HTML, /Temporarily unavailable/);
  assert.doesNotMatch(OUTAGE_HTML, /<script/i, 'works with scripts disabled');
  assert.doesNotMatch(OUTAGE_HTML, /\bon[a-z]+=/i);
  assert.doesNotMatch(OUTAGE_HTML, /DB_|mysql|ECONN|127\.0\.0\.1|password|error code/i);
  assert.match(OUTAGE_HTML, /prefers-color-scheme:dark/, 'light and dark');
  const init = outageResponseInit();
  assert.equal(init.status, 503);
  assert.equal(init.headers['Retry-After'], String(OUTAGE_RETRY_AFTER_SECONDS));
  assert.match(init.headers['Cache-Control'], /no-store/);
  assert.match(init.headers['X-Robots-Tag'], /noindex/);
  assert.match(init.headers['Content-Type'], /^text\/html/);
});

test('health: only connection-class failures mean "database unavailable"', () => {
  for (const code of ['ECONNREFUSED', 'ETIMEDOUT', 'PROTOCOL_CONNECTION_LOST', 'ER_ACCESS_DENIED_ERROR', 'ER_BAD_DB_ERROR']) {
    assert.equal(isConnectionError(new NewsDbError({ code })), true, code);
  }
  assert.equal(isConnectionError(new NewsDbConfigError(['DB_HOST'])), true);
  for (const code of ['ER_PARSE_ERROR', 'ER_DUP_ENTRY', 'ER_NO_SUCH_TABLE', undefined]) {
    assert.equal(isConnectionError(new NewsDbError({ code })), false, String(code));
  }
});

test('health: the flag follows real query outcomes and is cached between checks', async () => {
  resetHealth();
  const t0 = Date.now();
  markDbDown(t0);
  assert.equal(await dbAvailable(t0 + 10), false, 'down, within the re-check interval');
  markDbUp(t0);
  assert.equal(await dbAvailable(t0 + 10), true, 'up, within the re-check interval');
  assert.ok(UP_TTL <= 10_000 && DOWN_TTL <= 5_000, 'an outage is re-checked within seconds');
  resetHealth();
});

test('health: last-known-good paths are remembered exactly (decoded, no trailing slash)', () => {
  resetHealth();
  rememberGood('/news/some-story');
  assert.equal(isGood('/news/some-story'), true);
  assert.equal(isGood('/news/some-story/'), true);
  assert.equal(isGood('/news/other-story'), false);
  rememberGood('/news/मराठी-news');
  assert.equal(isGood(`/news/${encodeURIComponent('मराठी-news')}`), true, 'the proxy sees the encoded form');
  assert.equal(normalisePath('/news/%E0%A4'), '/news/%E0%A4', 'a malformed escape is kept, not thrown');
  assert.equal(normalisePath('/news'), '/news');
  resetHealth();
});
