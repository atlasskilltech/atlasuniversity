/**
 * ATLAS Admin — Google sign-in claim checks and per-tab access rules (no database, no network).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { canOpen, cleanTabs, emailAllowed, tabForPath } from '../../../lib/admin/access.js';
import { checkClaims, SignInError } from '../../../lib/news/auth/google.js';

test('access: admins open everything, users only their tabs, never Users', () => {
  const admin = { role: 'admin', tabs: [] };
  const kd = { role: 'user', tabs: ['keydates'] };
  for (const t of ['news', 'keydates', 'users']) assert.equal(canOpen(admin, t), true);
  assert.equal(canOpen(kd, 'keydates'), true);
  assert.equal(canOpen(kd, 'news'), false);
  assert.equal(canOpen(kd, 'users'), false);
  assert.equal(canOpen(kd, 'home'), true);
  assert.equal(canOpen(null, 'home'), false);
  assert.deepEqual(cleanTabs(['keydates', 'x', 'news', 'news']), ['news', 'keydates']);
});

test('access: the tab of an /admin URL', () => {
  assert.equal(tabForPath('/admin/news/api/articles/3'), 'news');
  assert.equal(tabForPath('/admin/keydates/api/atlas-ug'), 'keydates');
  assert.equal(tabForPath('/admin/users/api'), 'users');
  assert.equal(tabForPath('/admin/api/logout'), null);
  assert.equal(tabForPath('/admin'), null);
});

test('access: only university emails', () => {
  assert.equal(emailAllowed('A.B@atlasuniversity.edu.in'), true);
  assert.equal(emailAllowed('a@gmail.com'), false);
  assert.equal(emailAllowed('a@evil-atlasuniversity.edu.in'), false);
  assert.equal(emailAllowed('a@atlasuniversity.edu.in.evil.com'), false);
});

test('google: ID token claims', () => {
  const now = Date.now();
  const good = { iss: 'https://accounts.google.com', aud: 'cid', exp: now / 1000 + 600, nonce: 'n1', email: 'Faizan@atlasuniversity.edu.in', email_verified: true, hd: 'atlasuniversity.edu.in', name: 'F' };
  const ok = (c) => checkClaims(c, { clientId: 'cid', nonce: 'n1', now });
  assert.deepEqual(ok(good), { email: 'faizan@atlasuniversity.edu.in', name: 'F' });
  const bad = (patch, code) => assert.throws(() => ok({ ...good, ...patch }), (e) => e instanceof SignInError && e.code === code);
  bad({ iss: 'https://evil.example' }, 'bad_token');
  bad({ aud: 'other' }, 'bad_token');
  bad({ exp: now / 1000 - 3600 }, 'bad_token');
  bad({ nonce: 'n2' }, 'bad_token');
  bad({ email_verified: false }, 'wrong_domain');
  bad({ hd: undefined, email: 'f@gmail.com' }, 'wrong_domain');
  bad({ hd: 'atlasuniversity.edu.in', email: 'f@gmail.com' }, 'wrong_domain');
});

import { canOpen as canOpen2 } from '../../../lib/admin/access.js';
import { diffFields, showValue } from '../../../lib/admin/activity.js';
import { tableChanges } from '../../../lib/keydates/diff.js';

test('activity: Activity and Users are admin-only', () => {
  assert.equal(canOpen2({ role: 'user', tabs: ['news', 'keydates'] }, 'activity'), false);
  assert.equal(canOpen2({ role: 'admin', tabs: [] }, 'activity'), true);
  assert.equal(tabForPath('/admin/activity/export'), 'activity');
});

test('activity: field diff shows only what changed, in words', () => {
  const ch = diffFields({ title: 'A', status: 'draft', tags: ['x'] }, { title: 'B', status: 'draft', tags: [] }, [['title', 'Title'], ['status', 'Status'], ['tags', 'Tags']]);
  assert.deepEqual(ch, [{ field: 'Title', from: 'A', to: 'B' }, { field: 'Tags', from: 'x', to: '(none)' }]);
  assert.equal(showValue(''), '(empty)');
  assert.equal(showValue('x'.repeat(900)).length, 500);
});

test('activity: key dates diff names the row and shows both dates', () => {
  const t = (d) => ({ rows: [{ cells: [{ text: 'Cycle', header: true }, { text: 'Current Cycle', header: true }] }, { cells: [{ text: 'Applications Close' }, { text: d }] }] });
  assert.deepEqual(tableChanges(t('24<sup>th</sup> Oct 2026'), t('5th Nov 2026')).changes, [{ field: 'Applications Close', from: '24th Oct 2026', to: '5th Nov 2026' }]);
  const wider = { rows: [...t('x').rows, { cells: [{ text: 'Result' }, { text: '' }] }] };
  assert.match(tableChanges(t('x'), wider).note, /rows 2 → 3/);
  assert.deepEqual(tableChanges(t('x'), t('x')).changes, []);
});

import { cleanS3Folder, insideScope, s3Scope } from '../../../lib/admin/access.js';

test('S3 Drive: a normal user opens it only with the tab AND a folder, and is held to that folder', () => {
  const admin = { role: 'admin', tabs: [] };
  const withFolder = { role: 'user', tabs: ['s3drive'], s3Folder: 'events/2026/' };
  const noFolder = { role: 'user', tabs: ['s3drive'], s3Folder: null };
  const noTab = { role: 'user', tabs: ['news'], s3Folder: 'events/2026/' };
  assert.equal(canOpen2(admin, 's3drive'), true);
  assert.equal(canOpen2(withFolder, 's3drive'), true);
  assert.equal(canOpen2(noFolder, 's3drive'), false);
  assert.equal(canOpen2(noTab, 's3drive'), false);
  assert.equal(tabForPath('/admin/s3drive/api'), 's3drive');
  assert.equal(s3Scope(admin), '');
  assert.equal(s3Scope(withFolder), 'events/2026/');
  assert.equal(s3Scope(noTab), null);
  assert.equal(insideScope('events/2026/', 'events/2026/a.png'), true);
  assert.equal(insideScope('events/2026/', 'events/2026/sub/'), true);
  assert.equal(insideScope('events/2026/', 'events/2025/a.png'), false);
  assert.equal(insideScope('events/2026/', 'events/2026-old/a.png'), false);
  assert.equal(insideScope('', 'anything/x.png'), true);
  assert.equal(cleanS3Folder('/events//2026'), 'events/2026/');
  assert.equal(cleanS3Folder(''), null);
  assert.equal(cleanS3Folder('/'), null);
  assert.equal(cleanS3Folder('events/../assets'), null);
});
