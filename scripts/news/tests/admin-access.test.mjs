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
