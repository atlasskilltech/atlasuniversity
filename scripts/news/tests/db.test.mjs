/**
 * ATLAS News — Stage 1 database tests. Runs ONLY against a disposable local database:
 *
 *   NEWS_TEST_DB_HOST=127.0.0.1 NEWS_TEST_DB_USER=root NEWS_TEST_DB_PASSWORD= NEWS_TEST_DB_NAME=atlasnews_stage1_test \
 *     npm run news:test
 *
 * Skipped unless NEWS_TEST_DB_NAME is set. Refuses to run unless the database name ends in `_test` and
 * the host is local — it drops and recreates that database, so it must never point at a real one.
 * It seeds an unrelated `survey_responses` table (standing in for the Employee Survey tables that share
 * the production database) and proves the migrations never touch it.
 */
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mysql from 'mysql2/promise';

const E = process.env;
const NAME = E.NEWS_TEST_DB_NAME;
const enabled = Boolean(NAME);
const skip = enabled ? false : 'set NEWS_TEST_DB_NAME (a local *_test database) to run the database tests';

let admin; // a raw connection without a database, for setup only
let mod = {};

before(async () => {
  if (!enabled) return;
  if (!/_test$/.test(NAME) || !/^(127\.0\.0\.1|localhost)$/.test(E.NEWS_TEST_DB_HOST || '')) {
    throw new Error('refusing: NEWS_TEST_DB_NAME must end in _test and NEWS_TEST_DB_HOST must be local');
  }
  admin = await mysql.createConnection({ host: E.NEWS_TEST_DB_HOST, port: Number(E.NEWS_TEST_DB_PORT || 3306), user: E.NEWS_TEST_DB_USER, password: E.NEWS_TEST_DB_PASSWORD ?? '' });
  await admin.query(`DROP DATABASE IF EXISTS \`${NAME}\``);
  await admin.query(`CREATE DATABASE \`${NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await admin.query(`CREATE TABLE \`${NAME}\`.survey_responses (id INT PRIMARY KEY AUTO_INCREMENT, answer VARCHAR(50)) ENGINE=InnoDB`);
  await admin.query(`INSERT INTO \`${NAME}\`.survey_responses (answer) VALUES ('a'), ('b'), ('c')`);
  /* point the News pool at the test database (the pool reads env lazily on first use) */
  Object.assign(process.env, { DB_HOST: E.NEWS_TEST_DB_HOST, DB_PORT: E.NEWS_TEST_DB_PORT || '3306', DB_USER: E.NEWS_TEST_DB_USER, DB_PASSWORD: E.NEWS_TEST_DB_PASSWORD ?? '', DB_NAME: NAME });
  mod = {
    ...(await import('../../../lib/news/db/migrate.js')),
    ...(await import('../../../lib/news/db/pool.js')),
    ...(await import('../../../lib/news/db/settings.js')),
    ...(await import('../../../lib/news/auth/sessions.js')),
    rl: await import('../../../lib/news/auth/rateLimit.js'),
    cfg: await import('../../../lib/news/config.js'),
  };
});

after(async () => {
  if (!enabled) return;
  await mod.closePool?.();
  await admin?.end();
});

const surveyFingerprint = async () => {
  const [rows] = await admin.query(`CHECKSUM TABLE \`${NAME}\`.survey_responses`);
  const [[c]] = await admin.query(`SELECT COUNT(*) AS n FROM \`${NAME}\`.survey_responses`);
  return `${rows[0].Checksum}:${c.n}`;
};
const tablesLike = async (like) => {
  const [rows] = await admin.query('SELECT table_name AS t FROM information_schema.tables WHERE table_schema = ? AND table_name LIKE ? ORDER BY 1', [NAME, like]);
  return rows.map((r) => r.t ?? r.TABLE_NAME);
};

test('migrations: refuse to adopt pre-existing atlasnews_ tables', { skip }, async () => {
  const before = await surveyFingerprint();
  await admin.query(`CREATE TABLE \`${NAME}\`.atlasnews_posts (id INT PRIMARY KEY, keep_me VARCHAR(10))`);
  await admin.query(`INSERT INTO \`${NAME}\`.atlasnews_posts VALUES (1, 'precious')`);
  const s = await mod.migrationStatus();
  /* two independent guards fire: no bookkeeping, and 0001 would create a table that already exists */
  assert.equal(s.problems.length, 2);
  assert.match(s.problems[0], /already exist without migration bookkeeping: atlasnews_posts/);
  assert.match(s.problems[1], /0001_initial_schema would create tables that already exist.*atlasnews_posts/);
  await assert.rejects(mod.migrateUp(), /refusing to migrate/);
  /* nothing created, nothing changed */
  assert.deepEqual(await tablesLike('atlasnews\\_%'), ['atlasnews_posts']);
  const [[row]] = await admin.query(`SELECT keep_me FROM \`${NAME}\`.atlasnews_posts WHERE id = 1`);
  assert.equal(row.keep_me, 'precious');
  assert.equal(await surveyFingerprint(), before);
  await admin.query(`DROP TABLE \`${NAME}\`.atlasnews_posts`);
});

test('migrations: dry run changes nothing; up creates exactly the News schema', { skip }, async () => {
  const before = await surveyFingerprint();
  const dry = await mod.migrateUp({ dryRun: true });
  assert.deepEqual(dry.pending, ['0001_initial_schema']);
  assert.deepEqual(await tablesLike('atlasnews\\_%'), []);
  const r = await mod.migrateUp();
  assert.deepEqual(r.applied, ['0001_initial_schema']);
  const tables = await tablesLike('atlasnews\\_%');
  assert.deepEqual([...tables].sort(), Object.values(mod.cfg.T).sort());
  assert.equal(tables.length, 12);
  assert.deepEqual((await mod.migrateUp()).applied, [], 'second run is a no-op');
  assert.equal(await surveyFingerprint(), before, 'survey_responses untouched');
  /* engine + collation */
  const [opts] = await admin.query('SELECT engine, table_collation AS c FROM information_schema.tables WHERE table_schema = ? AND table_name LIKE ?', [NAME, 'atlasnews\\_%']);
  for (const o of opts) {
    assert.equal(o.engine ?? o.ENGINE, 'InnoDB');
    assert.equal(o.c, 'utf8mb4_unicode_ci');
  }
  /* foreign keys only between News tables */
  const [fks] = await admin.query('SELECT table_name AS t, referenced_table_name AS r FROM information_schema.referential_constraints WHERE constraint_schema = ?', [NAME]);
  /* posts: featured, og, primary category · post_categories: 2 · post_tags: 2 · homepage_slots: 1 */
  assert.equal(fks.length, 8);
  for (const f of fks) assert.ok(f.t.startsWith('atlasnews_') && f.r.startsWith('atlasnews_'));
});

test('migrations: an edited applied migration stops the runner', { skip }, async () => {
  await mod.rawQuery(`UPDATE ${mod.cfg.T.migrations} SET checksum = REPEAT('0', 64) WHERE id = '0001_initial_schema'`);
  const s = await mod.migrationStatus();
  assert.match(s.problems.join(' '), /checksum mismatch/);
  await assert.rejects(mod.migrateUp(), /refusing to migrate/);
  await mod.rawQuery(`UPDATE ${mod.cfg.T.migrations} SET checksum = ? WHERE id = '0001_initial_schema'`, [mod.checksum((await import('../../../lib/news/db/migrations.js')).MIGRATIONS[0])]);
  assert.equal((await mod.migrationStatus()).problems.length, 0);
});

test('constraints: slug uniqueness, FK actions, redirect status check', { skip }, async () => {
  const T = mod.cfg.T;
  const [m] = await Promise.all([mod.query(`INSERT INTO ${T.media} (storage_key, sha256, mime_type) VALUES ('assets/news/t.webp', REPEAT('a', 64), 'image/webp')`)]);
  const c = await mod.query(`INSERT INTO ${T.categories} (slug, name) VALUES ('academic', 'Academic')`);
  const p = await mod.query(`INSERT INTO ${T.posts} (slug, title, content_html, featured_media_id, primary_category_id) VALUES ('hello', 'Hello', '<p>x</p>', ?, ?)`, [m.insertId, c.insertId]);
  await mod.query(`INSERT INTO ${T.postCategories} (post_id, category_id) VALUES (?, ?)`, [p.insertId, c.insertId]);
  await assert.rejects(mod.query(`INSERT INTO ${T.posts} (slug, title, content_html) VALUES ('hello', 'Dup', '')`), /ER_DUP_ENTRY/);
  await assert.rejects(mod.query(`INSERT INTO ${T.redirects} (from_path, to_path, status_code) VALUES ('/a', '/b', 200)`));
  const [[post]] = [await mod.query(`SELECT author_name, status FROM ${T.posts} WHERE id = ?`, [p.insertId])];
  assert.equal(post.author_name, 'ATLAS News Desk');
  assert.equal(post.status, 'draft');
  await mod.query(`DELETE FROM ${T.media} WHERE id = ?`, [m.insertId]);
  const [[after1]] = [await mod.query(`SELECT featured_media_id FROM ${T.posts} WHERE id = ?`, [p.insertId])];
  assert.equal(after1.featured_media_id, null, 'ON DELETE SET NULL');
  await mod.query(`DELETE FROM ${T.posts} WHERE id = ?`, [p.insertId]);
  const rel = await mod.query(`SELECT COUNT(*) AS n FROM ${T.postCategories}`);
  assert.equal(Number(rel[0].n), 0, 'ON DELETE CASCADE');
  await mod.query(`DELETE FROM ${T.categories}`);
});

test('settings + sessions: create, validate, idle and absolute expiry, revoke', { skip }, async () => {
  const T = mod.cfg.T;
  await mod.setSetting('admin_password_hash', 'scrypt$15$8$1$x$y');
  assert.equal(await mod.getSetting('admin_password_hash'), 'scrypt$15$8$1$x$y');
  await mod.query(`DELETE FROM ${T.settings}`);

  const { token } = await mod.createSession({ ip: '203.0.113.9', userAgent: 'test' });
  assert.match(token, /^[A-Za-z0-9_-]{43}$/);
  const [row] = await mod.query(`SELECT token_hash FROM ${T.sessions}`);
  assert.equal(row.token_hash, mod.hashToken(token));
  assert.notEqual(row.token_hash, token, 'only the hash is stored');
  assert.ok(await mod.validateSession(token));
  assert.equal(await mod.validateSession(`${token.slice(0, -1)}A`), null);
  assert.equal(await mod.validateSession('not-a-token'), null);

  await mod.query(`UPDATE ${T.sessions} SET last_seen_at = UTC_TIMESTAMP(3) - INTERVAL 13 HOUR`);
  assert.equal(await mod.validateSession(token), null, 'idle expiry');
  await mod.query(`UPDATE ${T.sessions} SET last_seen_at = UTC_TIMESTAMP(3), expires_at = UTC_TIMESTAMP(3) - INTERVAL 1 SECOND`);
  assert.equal(await mod.validateSession(token), null, 'absolute expiry');

  const s2 = await mod.createSession({});
  assert.ok(await mod.validateSession(s2.token));
  await mod.revokeSession(s2.token);
  assert.equal(await mod.validateSession(s2.token), null, 'revoked');
  const s3 = await mod.createSession({});
  /* the first session (expired, never explicitly revoked) and s3 */
  assert.equal(await mod.revokeAllSessions(), 2);
  assert.equal(await mod.validateSession(s3.token), null);
  await mod.pruneSessions();
});

test('rate limit: 5 failures per IP lock that IP only; successes do not count', { skip }, async () => {
  const { rl } = mod;
  const a = '198.51.100.1';
  const b = '198.51.100.2';
  for (let i = 0; i < 4; i++) await rl.recordLoginAttempt(a, false);
  await rl.recordLoginAttempt(a, true);
  assert.equal((await rl.checkLoginAllowed(a)).allowed, true);
  await rl.recordLoginAttempt(a, false);
  const blocked = await rl.checkLoginAllowed(a);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.scope, 'ip');
  assert.ok(blocked.retryAfter > 0 && blocked.retryAfter <= 900);
  assert.equal((await rl.checkLoginAllowed(b)).allowed, true);
  /* failures age out of the window */
  await mod.query(`UPDATE ${mod.cfg.T.loginAttempts} SET attempted_at = UTC_TIMESTAMP(3) - INTERVAL 16 MINUTE WHERE ip = ?`, [a]);
  assert.equal((await rl.checkLoginAllowed(a)).allowed, true);
  /* global ceiling across many IPs */
  for (let i = 0; i < rl.GLOBAL; i++) await rl.recordLoginAttempt(`10.0.${Math.floor(i / 4)}.${i % 4}`, false);
  const g = await rl.checkLoginAllowed('192.0.2.200');
  assert.equal(g.allowed, false);
  assert.equal(g.scope, 'global');
  await mod.query(`DELETE FROM ${mod.cfg.T.loginAttempts}`);
});

test('pool: every connection runs in UTC (time-zone hook applied)', { skip }, async () => {
  const rows = await Promise.all(Array.from({ length: 4 }, () => mod.rawQuery('SELECT @@session.time_zone AS tz')));
  for (const r of rows) assert.equal(r[0].tz, '+00:00');
});

test('ownership: a pending migration whose table already exists is refused before anything runs', { skip }, async () => {
  const { MIGRATIONS } = await import('../../../lib/news/db/migrations.js');
  const before = await surveyFingerprint();
  /* someone else's table, with data, inside the News namespace */
  await admin.query(`CREATE TABLE \`${NAME}\`.atlasnews_extra (id INT PRIMARY KEY, v VARCHAR(20))`);
  await admin.query(`INSERT INTO \`${NAME}\`.atlasnews_extra VALUES (1, 'not ours')`);
  const migrations = [...MIGRATIONS, {
    id: '0002_test_extra', description: 'test',
    up: ['CREATE TABLE atlasnews_extra (id INT PRIMARY KEY)'],
    down: ['DROP TABLE IF EXISTS atlasnews_extra'],
  }];
  const s = await mod.migrationStatus({ migrations });
  assert.match(s.problems.join(' '), /0002_test_extra would create tables that already exist.*atlasnews_extra/);
  await assert.rejects(mod.migrateUp({ migrations }), /refusing to migrate/);
  const [[row]] = await admin.query(`SELECT v FROM \`${NAME}\`.atlasnews_extra WHERE id = 1`);
  assert.equal(row.v, 'not ours', 'pre-existing table and its data untouched');
  assert.equal(await surveyFingerprint(), before);
  const [[b]] = await admin.query(`SELECT COUNT(*) AS n FROM \`${NAME}\`.atlasnews_schema_migrations WHERE id = '0002_test_extra'`);
  assert.equal(Number(b.n), 0, 'not recorded as applied');
  /* rollback is also refused to touch it: 0002 is not applied, so down reverts 0001 only — checked below */
});

test('ownership: a migration that fails part-way drops ONLY the tables this run created', { skip }, async () => {
  const { MIGRATIONS } = await import('../../../lib/news/db/migrations.js');
  const before = await surveyFingerprint();
  const migrations = [...MIGRATIONS, {
    id: '0002_test_partial', description: 'fails on its second statement',
    up: [
      'CREATE TABLE atlasnews_partial_a (id INT PRIMARY KEY)',
      /* valid for the validator, rejected by the server: an unknown column type */
      'CREATE TABLE atlasnews_partial_b (id NOT_A_REAL_TYPE)',
    ],
    down: ['DROP TABLE IF EXISTS atlasnews_partial_b', 'DROP TABLE IF EXISTS atlasnews_partial_a'],
  }];
  const logs = [];
  await assert.rejects(mod.migrateUp({ migrations, log: (m) => logs.push(m) }));
  assert.match(logs.join('\n'), /removing only the tables this run created: atlasnews_partial_a/);
  assert.deepEqual(await tablesLike('atlasnews\\_partial%'), [], 'the table it created was removed');
  /* the pre-existing News-namespace table from the previous test, and the survey table, survive */
  assert.deepEqual(await tablesLike('atlasnews\\_extra'), ['atlasnews_extra']);
  const [[row]] = await admin.query(`SELECT v FROM \`${NAME}\`.atlasnews_extra WHERE id = 1`);
  assert.equal(row.v, 'not ours');
  assert.equal(await surveyFingerprint(), before);
  assert.equal((await tablesLike('atlasnews\\_%')).length, 13, '12 News tables + the foreign atlasnews_extra');
  const [[b]] = await admin.query(`SELECT COUNT(*) AS n FROM \`${NAME}\`.atlasnews_schema_migrations WHERE id = '0002_test_partial'`);
  assert.equal(Number(b.n), 0);
});

test('provision-password: first, unchanged, changed, corrupt stored hash, invalid input', { skip }, async () => {
  const { provisionAdminPassword, InvalidPasswordError } = await import('../../../lib/news/auth/adminSetup.js');
  const { verifyPassword, parseHash } = await import('../../../lib/news/auth/password.js');
  const T = mod.cfg.T;
  await mod.query(`DELETE FROM ${T.settings}`);
  await mod.query(`DELETE FROM ${T.sessions}`);
  const PW1 = 'TestOnly-Provision-Pass-0001-abcdefgh';
  const PW2 = 'TestOnly-Provision-Pass-0002-ijklmnop';

  /* invalid input: rejected, nothing stored, the input never appears in the error */
  const bad = [['', 'empty'], ['short-15-chars!', 'shorter'], ['x'.repeat(257), 'longer'], [`${PW1}\n`, 'control'], [`a\u0007${PW1}`, 'control'], [null, 'empty'], [12345678901234567, 'empty']];
  for (const [input, rule] of bad) {
    await assert.rejects(provisionAdminPassword(input), (e) => e instanceof InvalidPasswordError && e.message.includes(rule) && !(typeof input === 'string' && input && e.message.includes(input)), String(rule));
  }
  assert.equal(await mod.getSetting('admin_password_hash'), null, 'nothing stored by invalid input');

  /* 1. first provisioning: hashed here, only the hash stored */
  const first = await provisionAdminPassword(PW1);
  assert.deepEqual(first, { changed: true, revokedSessions: 0 });
  const h1 = await mod.getSetting('admin_password_hash');
  assert.ok(parseHash(h1), 'a scrypt hash is stored');
  assert.ok(!h1.includes(PW1), 'never the password');
  assert.equal(await verifyPassword(PW1, h1), true);
  const [{ n }] = await mod.query(`SELECT COUNT(*) AS n FROM ${T.settings} WHERE setting_value LIKE ?`, [`%${PW1}%`]);
  assert.equal(Number(n), 0, 'the plaintext is nowhere in the settings table');
  const stamp1 = await mod.getSetting('admin_password_updated_at');

  /* 2. unchanged password (every routine deploy): no write, session kept */
  const { token } = await mod.createSession({});
  assert.deepEqual(await provisionAdminPassword(PW1), { changed: false, revokedSessions: 0 });
  assert.equal(await mod.getSetting('admin_password_hash'), h1, 'not re-hashed (salt unchanged)');
  assert.equal(await mod.getSetting('admin_password_updated_at'), stamp1);
  assert.ok(await mod.validateSession(token), 'the admin stays signed in');

  /* 3. changed password: new hash, old password stops working, every session revoked */
  const changed = await provisionAdminPassword(PW2);
  assert.deepEqual(changed, { changed: true, revokedSessions: 1 });
  const h2 = await mod.getSetting('admin_password_hash');
  assert.notEqual(h2, h1);
  assert.equal(await verifyPassword(PW2, h2), true);
  assert.equal(await verifyPassword(PW1, h2), false, 'old password no longer valid');
  assert.equal(await mod.validateSession(token), null, 'existing session revoked');

  /* 4. a corrupt stored value is replaced by a valid hash rather than trusted */
  await mod.setSetting('admin_password_hash', 'not-a-hash');
  assert.equal((await provisionAdminPassword(PW2)).changed, true);
  assert.equal(await verifyPassword(PW2, await mod.getSetting('admin_password_hash')), true);

  await mod.query(`DELETE FROM ${T.settings}`);
  await mod.query(`DELETE FROM ${T.sessions}`);
});

test('migrations: down needs --confirm, drops only News tables, then up again', { skip }, async () => {
  const before = await surveyFingerprint();
  await assert.rejects(mod.migrateDown(), /explicit confirmation/);
  /* 12 News tables + the foreign atlasnews_extra the ownership tests created */
  assert.equal((await tablesLike('atlasnews\\_%')).length, 13);
  const r = await mod.migrateDown({ confirm: true });
  assert.equal(r.reverted, '0001_initial_schema');
  /* rollback removed exactly its own 12 tables (bookkeeping included) — NOT the foreign atlasnews_extra,
     even though it carries the News prefix, and not survey_responses */
  assert.deepEqual(await tablesLike('atlasnews\\_%'), ['atlasnews_extra']);
  const [[row]] = await admin.query(`SELECT v FROM \`${NAME}\`.atlasnews_extra WHERE id = 1`);
  assert.equal(row.v, 'not ours');
  assert.deepEqual([...(await tablesLike('%'))].sort(), ['atlasnews_extra', 'survey_responses']);
  assert.equal(await surveyFingerprint(), before);
  /* with a foreign atlasnews_ table present and no bookkeeping, up refuses (foreign-table guard) */
  await assert.rejects(mod.migrateUp(), /already exist without migration bookkeeping: atlasnews_extra/);
  /* test cleanup of the fixture table (the test's own admin connection, never the runner) */
  await admin.query(`DROP TABLE \`${NAME}\`.atlasnews_extra`);
  assert.deepEqual((await mod.migrateUp()).applied, ['0001_initial_schema']);
  assert.equal((await tablesLike('atlasnews\\_%')).length, 12);
});
