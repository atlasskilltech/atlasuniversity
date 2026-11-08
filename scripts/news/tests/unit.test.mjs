/**
 * ATLAS News — Stage 1 unit and security tests (no database, no network).
 *   npm run news:test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import sharp from 'sharp';
import { generatePassword, hashPassword, parseHash, verifyPassword } from '../../../lib/news/auth/password.js';
import { analyseStatement, assertStatementsSafe, checksum, validateMigrations } from '../../../lib/news/db/migrate.js';
import { onNewConnection } from '../../../lib/news/db/pool.js';
import { MIGRATIONS, MANAGED_TABLES } from '../../../lib/news/db/migrations.js';
import { NEWS_TABLE_PREFIX, T } from '../../../lib/news/config.js';
import { sanitizeArticleHtml, sanitizePlainText, slugify, validateSlug } from '../../../lib/news/content/sanitize.js';
import { ImageRejected, MAX_UPLOAD_BYTES, processImage, sniffMime } from '../../../lib/news/media/images.js';
import { assertNewsKey, objectKey, publicUrl, s3Config } from '../../../lib/news/storage/s3.js';
import { config as assetsConfig, publicUrl as assetsPublicUrl } from '../../assets/lib.mjs';
import { BodyError, readBodyLimited } from '../../../lib/news/http/body.js';
import { createLimiter, LimiterBusy } from '../../../lib/news/http/limiter.js';
import { newsClientIp } from '../../../lib/news/http/clientIp.js';

/* ------------------------------------------------------------------------------------ password */

test('password: hash verifies, wrong password fails, hash never contains the password', async () => {
  const pw = generatePassword();
  assert.equal(pw.length, 28);
  assert.match(pw, /[a-z]/);
  assert.match(pw, /[A-Z]/);
  assert.match(pw, /[2-9]/);
  assert.match(pw, /[-_.!@#%+=]/);
  const h = await hashPassword(pw);
  assert.match(h, /^scrypt\$15\$8\$1\$/);
  assert.ok(!h.includes(pw));
  assert.ok(parseHash(h));
  assert.equal(await verifyPassword(pw, h), true);
  assert.equal(await verifyPassword(`${pw}x`, h), false);
  assert.equal(await verifyPassword('', h), false);
});

test('password: malformed/missing hashes never verify, and still cost one scrypt', async () => {
  for (const bad of [null, '', 'plain', 'scrypt$15$8$1$$', 'scrypt$40$8$1$aaaaaaaaaaaaaaaaaaaaaa$' + 'a'.repeat(86), 'bcrypt$...']) {
    assert.equal(parseHash(bad), null);
    const t0 = process.hrtime.bigint();
    assert.equal(await verifyPassword('anything-at-all-long', bad), false);
    assert.ok(Number(process.hrtime.bigint() - t0) / 1e6 > 5, 'decoy scrypt ran');
  }
  await assert.rejects(hashPassword('short'));
});

test('password: generated passwords are unique', () => {
  const s = new Set(Array.from({ length: 200 }, () => generatePassword()));
  assert.equal(s.size, 200);
});

/* ------------------------------------------------------------------------------------ migrations */

test('schema: every table uses the atlasnews_ prefix and the shipped migrations pass the guard', () => {
  for (const name of Object.values(T)) assert.ok(name.startsWith(NEWS_TABLE_PREFIX), name);
  assert.equal(NEWS_TABLE_PREFIX, 'atlasnews_');
  assert.doesNotThrow(() => assertStatementsSafe());
  /* up creates exactly the managed tables; down drops exactly them */
  const created = MIGRATIONS.flatMap((m) => m.up).map((s) => s.match(/CREATE TABLE (\S+)/)[1]).sort();
  const dropped = MIGRATIONS.flatMap((m) => m.down).map((s) => s.match(/DROP TABLE IF EXISTS (\S+)/)[1]).sort();
  assert.deepEqual(created, [...MANAGED_TABLES].sort());
  assert.deepEqual(dropped, created);
  assert.match(checksum(MIGRATIONS[0]), /^[0-9a-f]{64}$/);
});

test('schema guard: rejects anything that could touch a non-News table', () => {
  const m = (up, down = []) => [{ id: '0099_test', description: 't', up, down }];
  const bad = [
    m(['CREATE TABLE survey_responses (id INT)']),
    m(['DROP TABLE survey_responses']),
    m(['ALTER TABLE survey_responses ADD x INT']),
    m(['CREATE TABLE atlasnews_x (id INT, CONSTRAINT f FOREIGN KEY (id) REFERENCES survey_responses (id))']),
    m(['TRUNCATE TABLE atlasnews_posts']),
    m(['CREATE TABLE atlasnews_x (id INT); DROP TABLE survey_responses']),
    m(['DELETE FROM survey_responses']),
    m(['UPDATE survey_responses SET a=1']),
    m(['RENAME TABLE survey_responses TO atlasnews_x']),
    m(['DROP DATABASE employment_survey']),
    m(['CREATE TABLE `survey_responses` (id INT)']),
  ];
  for (const b of bad) assert.throws(() => assertStatementsSafe(b), undefined, b[0].up[0]);
  /* ON UPDATE CASCADE / CURRENT_TIMESTAMP are legitimate and must not trip the guard */
  assert.doesNotThrow(() => assertStatementsSafe(m(['CREATE TABLE atlasnews_x (u DATETIME ON UPDATE CURRENT_TIMESTAMP, CONSTRAINT f FOREIGN KEY (u) REFERENCES atlasnews_y (u) ON UPDATE CASCADE)'], ['DROP TABLE IF EXISTS atlasnews_x'])));
});

/* Every bypass found in the Stage 1 review, plus the wider family each belongs to. Each must be
   rejected wherever it appears — in `up` or in `down`. */
const BYPASSES = {
  /* review finding 1: multi-table DROP */
  'multi-table DROP': 'DROP TABLE IF EXISTS atlasnews_x, survey_responses',
  'multi-table DROP, News second': 'DROP TABLE survey_responses, atlasnews_x',
  'multi-table DROP, spaced comma': 'DROP TABLE IF EXISTS atlasnews_x ,survey_responses',
  /* review finding 2: ALTER … RENAME */
  'ALTER RENAME TO': 'ALTER TABLE atlasnews_x RENAME TO survey_responses',
  'ALTER RENAME AS': 'ALTER TABLE atlasnews_x RENAME AS survey_responses',
  'ALTER RENAME (bare)': 'ALTER TABLE atlasnews_x RENAME survey_responses',
  'ALTER RENAME to a News name': 'ALTER TABLE atlasnews_x RENAME TO atlasnews_y',
  'RENAME TABLE': 'RENAME TABLE atlasnews_x TO survey_responses',
  /* review finding 3: database-qualified names */
  'db-qualified DROP': 'DROP TABLE atlasnews_x.survey_responses',
  'db-qualified backticks': 'DROP TABLE `employment_survey`.`atlasnews_x`',
  'db-qualified CREATE': 'CREATE TABLE employment_survey.atlasnews_x (id INT)',
  'db-qualified ALTER': 'ALTER TABLE other_db.atlasnews_x ADD c INT',
  'db-qualified REFERENCES': 'CREATE TABLE atlasnews_x (id INT, FOREIGN KEY (id) REFERENCES employment_survey.survey_responses (id))',
  'spaced qualifier': 'DROP TABLE atlasnews_x . survey_responses',
  /* review finding 4: CREATE … AS SELECT / reading other tables */
  'CREATE AS SELECT': 'CREATE TABLE atlasnews_x AS SELECT * FROM survey_responses',
  'CREATE (cols) SELECT': 'CREATE TABLE atlasnews_x (id INT) SELECT id FROM survey_responses',
  'CREATE … LIKE': 'CREATE TABLE atlasnews_x LIKE survey_responses',
  'CREATE … LIKE (parenthesised)': 'CREATE TABLE atlasnews_x (LIKE survey_responses)',
  'CREATE … UNION': 'CREATE TABLE atlasnews_x (id INT) ENGINE=MERGE UNION=(survey_responses)',
  /* other ways to reach or change another table */
  'EXCHANGE PARTITION': 'ALTER TABLE atlasnews_x EXCHANGE PARTITION p0 WITH TABLE survey_responses',
  'ALTER … PARTITION': 'ALTER TABLE atlasnews_x PARTITION BY HASH(id) PARTITIONS 2',
  'DISCARD TABLESPACE': 'ALTER TABLE atlasnews_x DISCARD TABLESPACE',
  'IMPORT TABLESPACE': 'ALTER TABLE atlasnews_x IMPORT TABLESPACE',
  'second statement': 'CREATE TABLE atlasnews_x (id INT); DROP TABLE survey_responses',
  'second statement after literal': "CREATE TABLE atlasnews_x (c INT COMMENT 'x'); DROP TABLE survey_responses",
  'comment hiding a statement': 'CREATE TABLE atlasnews_x (id INT) /*; DROP TABLE survey_responses */',
  'line comment': 'DROP TABLE atlasnews_x -- , survey_responses',
  'hash comment': 'DROP TABLE atlasnews_x # survey_responses',
  'INSERT … SELECT': 'INSERT INTO atlasnews_x SELECT * FROM survey_responses',
  'DELETE': 'DELETE FROM survey_responses',
  'UPDATE … SET': 'UPDATE survey_responses SET a = 1',
  'REPLACE INTO': 'REPLACE INTO atlasnews_x VALUES (1)',
  'TRUNCATE': 'TRUNCATE TABLE atlasnews_x',
  'LOAD DATA': "LOAD DATA INFILE '/etc/passwd' INTO TABLE atlasnews_x",
  'CREATE TRIGGER': 'CREATE TRIGGER t AFTER INSERT ON survey_responses FOR EACH ROW DELETE FROM survey_responses',
  'CREATE VIEW': 'CREATE VIEW atlasnews_v AS SELECT * FROM survey_responses',
  'DROP DATABASE': 'DROP DATABASE employment_survey',
  'DROP VIEW': 'DROP VIEW survey_responses',
  'GRANT': 'GRANT ALL ON *.* TO x',
  'CREATE non-prefixed': 'CREATE TABLE survey_responses2 (id INT)',
  'prefix as substring': 'CREATE TABLE xatlasnews_x (id INT)',
  'upper-case prefix lookalike': 'CREATE TABLE ATLASNEWS_X (id INT)',
  'ALTER adds FK to non-News': 'ALTER TABLE atlasnews_x ADD CONSTRAINT f FOREIGN KEY (id) REFERENCES survey_responses (id)',
  'ALTER drops a whole table-like word': 'ALTER TABLE atlasnews_x DROP survey_responses',
  'empty': '   ',
};

test('schema guard: every audited bypass and its family is rejected, in up and in down', () => {
  for (const [name, sql] of Object.entries(BYPASSES)) {
    /* rejected by the STATEMENT guard itself — not merely by the ownership rules */
    assert.throws(() => analyseStatement(sql), undefined, `statement: ${name}`);
    assert.throws(() => validateMigrations([{ id: '0099_probe', description: '', up: [sql], down: [] }]), undefined, `up: ${name}`);
    assert.throws(() => validateMigrations([{ id: '0099_probe', description: '', up: ['CREATE TABLE atlasnews_ok (id INT)'], down: [sql] }]), undefined, `down: ${name}`);
  }
});

test('schema guard: legitimate DDL forms still pass, and every table reference is reported', () => {
  const ok = [
    'CREATE TABLE atlasnews_a (id INT, d DECIMAL(5,2) DEFAULT 0.5, PRIMARY KEY (id))',
    "CREATE TABLE IF NOT EXISTS atlasnews_b (c VARCHAR(10) COMMENT 'not; a DROP TABLE survey_responses -- trick', u DATETIME ON UPDATE CURRENT_TIMESTAMP)",
    'CREATE TABLE atlasnews_c (a_id INT, CONSTRAINT f FOREIGN KEY (a_id) REFERENCES atlasnews_a (id) ON DELETE SET NULL ON UPDATE CASCADE) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci',
    'ALTER TABLE atlasnews_a ADD COLUMN note TEXT NULL, ADD INDEX idx_note (note(20)), DROP INDEX idx_old, DROP COLUMN legacy',
    'ALTER TABLE atlasnews_a DROP FOREIGN KEY fk_x, DROP PRIMARY KEY, DROP CONSTRAINT c1',
    'DROP TABLE IF EXISTS atlasnews_a',
    'DROP TABLE atlasnews_a',
  ];
  for (const sql of ok) assert.doesNotThrow(() => analyseStatement(sql), sql);
  assert.deepEqual(analyseStatement(ok[2]).refs.sort(), ['atlasnews_a', 'atlasnews_c']);
  /* a COMMENT literal can contain anything without affecting the analysis */
  assert.deepEqual(analyseStatement(ok[1]).refs, ['atlasnews_b']);
});

test('schema guard: ownership — down drops only its own tables; up drops only earlier migrations\' tables', () => {
  const create = (t) => `CREATE TABLE ${t} (id INT)`;
  assert.throws(() => validateMigrations([{ id: '0001_a', up: [create('atlasnews_a')], down: ['DROP TABLE IF EXISTS atlasnews_other'] }]), /may only drop tables its own up creates/);
  assert.throws(() => validateMigrations([{ id: '0001_a', up: [create('atlasnews_a'), 'DROP TABLE atlasnews_pre_existing'], down: [] }]), /may only drop a table an earlier migration created/);
  assert.throws(() => validateMigrations([{ id: '0001_a', up: [create('atlasnews_a')], down: [create('atlasnews_z')] }]), /must not create tables/);
  assert.throws(() => validateMigrations([{ id: '0001_a', up: [create('atlasnews_a')], down: [] }, { id: '0002_b', up: [create('atlasnews_a')], down: [] }]), /creates atlasnews_a twice/);
  const { created } = validateMigrations([
    { id: '0001_a', up: [create('atlasnews_a')], down: ['DROP TABLE IF EXISTS atlasnews_a'] },
    { id: '0002_b', up: [create('atlasnews_b'), 'DROP TABLE atlasnews_a'], down: ['DROP TABLE IF EXISTS atlasnews_b'] },
  ]);
  assert.deepEqual(created.get('0002_b'), ['atlasnews_b']);
  /* the shipped migration validates and owns exactly the managed tables */
  assert.deepEqual([...validateMigrations().created.get('0001_initial_schema')].sort(), [...MANAGED_TABLES].sort());
});

/* ------------------------------------------------------------------------------------ pool hook */

test('pool: the time-zone hook discards a connection whose SET fails, and never throws', () => {
  const fake = (behaviour) => {
    const c = { destroyed: false, sql: null, destroy() { this.destroyed = true; } };
    c.query = (sql, cb) => {
      c.sql = sql;
      if (behaviour === 'throw') throw Object.assign(new Error('boom'), { code: 'ER_X' });
      cb(behaviour === 'fail' ? Object.assign(new Error('nope'), { code: 'ER_UNKNOWN_TIME_ZONE', sqlMessage: 'secret detail' }) : null);
    };
    return c;
  };
  const logs = [];
  const ok = fake('ok');
  onNewConnection(ok, (m) => logs.push(m));
  assert.equal(ok.sql, "SET time_zone = '+00:00'");
  assert.equal(ok.destroyed, false);
  assert.equal(logs.length, 0);
  const bad = fake('fail');
  assert.doesNotThrow(() => onNewConnection(bad, (m) => logs.push(m)));
  assert.equal(bad.destroyed, true);
  assert.match(logs[0], /ER_UNKNOWN_TIME_ZONE/);
  assert.ok(!logs[0].includes('secret detail'), 'only the error code is logged');
  const boom = fake('throw');
  assert.doesNotThrow(() => onNewConnection(boom, (m) => logs.push(m)));
  assert.equal(boom.destroyed, true);
});

/* ------------------------------------------------------------------------------------ sanitiser */

test('sanitiser: removes scripts, handlers, javascript: and data: URLs, styles and foreign iframes', () => {
  const cases = [
    ['<p>ok</p><script>alert(1)</script>', '<p>ok</p>'],
    ['<img src="x" onerror="alert(1)">', ''],
    ['<img src="https://ex.com/a.jpg" onerror="alert(1)">', '<img src="https://ex.com/a.jpg" loading="lazy" decoding="async" alt="" />'],
    ['<a href="javascript:alert(1)">x</a>', '<a>x</a>'],
    ['<a href="JaVaScRiPt:alert(1)">x</a>', '<a>x</a>'],
    ['<a href="data:text/html,<script>alert(1)</script>">x</a>', '<a>x</a>'],
    ['<img src="data:image/png;base64,AAAA">', ''],
    ['<p style="background:url(javascript:x)">t</p>', '<p>t</p>'],
    ['<iframe src="https://evil.example/embed"></iframe>', ''],
    ['<svg><script>alert(1)</script></svg><p>a</p>', '<p>a</p>'],
    ['<form action="/x"><input name="a"></form><p>b</p>', '<p>b</p>'],
    ['<object data="x"></object><embed src="x"><p>c</p>', '<p>c</p>'],
    ['<p onclick="x()" class="bad">d</p>', '<p>d</p>'],
    ['<math><mtext><table><mglyph><style><img src=x onerror=alert(1)>', ''],
    ['<a href="//evil.example/">x</a>', '<a>x</a>'],
  ];
  for (const [input, expected] of cases) assert.equal(sanitizeArticleHtml(input), expected, input);
});

test('sanitiser: keeps the editorial vocabulary', () => {
  const ok = '<h2>Head</h2><p><strong>b</strong> <em>i</em> <a href="https://atlasuniversity.edu.in/news/x/">l</a></p>'
    + '<figure class="news-gallery"><img src="https://atlas-web-cdn.s3.ap-south-1.amazonaws.com/assets/news/a.webp" alt="A" /><figcaption>Cap</figcaption></figure>'
    + '<ul><li>one</li></ul><blockquote><p>q</p></blockquote>';
  const out = sanitizeArticleHtml(ok);
  for (const frag of ['<h2>Head</h2>', '<strong>b</strong>', '<em>i</em>', 'href="https://atlasuniversity.edu.in/news/x/"', 'class="news-gallery"', '<figcaption>Cap</figcaption>', '<li>one</li>', '<blockquote>']) {
    assert.ok(out.includes(frag), frag);
  }
  const yt = sanitizeArticleHtml('<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" onload="x"></iframe>');
  assert.match(yt, /^<iframe src="https:\/\/www\.youtube-nocookie\.com\/embed\/dQw4w9WgXcQ" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"><\/iframe>$/);
  assert.match(sanitizeArticleHtml('<a href="https://x.com" target="_blank">x</a>'), /rel="noopener noreferrer"/);
  assert.equal(sanitizeArticleHtml('<b>x</b>'), '<strong>x</strong>');
});

test('plain text + slugs', () => {
  assert.equal(sanitizePlainText('<b>Hi</b>  <script>x</script> &amp;lt;there&gt;'), 'Hi &lt;there>');
  assert.equal(sanitizePlainText('a\u0000b\u0007c'), 'abc');
  assert.equal(slugify('ATLAS & Bristol: MoU — 2022!'), 'atlas-and-bristol-mou-2022');
  assert.equal(slugify('Café déjà vu'), 'cafe-deja-vu');
  assert.deepEqual(validateSlug('valid-slug-1'), { ok: true });
  for (const s of ['', 'admin', 'Category', 'has space', 'UPPER', 'a--b', '-a', 'a/b', '../x', 'x%2F']) assert.equal(validateSlug(s).ok, false, s);
  /* legacy WordPress percent-encoded slugs are accepted only for the import */
  const legacy = '%f0%9d%97%94%f0%9d%97%a7-atlas';
  assert.equal(validateSlug(legacy).ok, false);
  assert.equal(validateSlug(legacy, { legacy: true }).ok, true);
});

/* ------------------------------------------------------------------------------------ images */

const jpegWithExif = () => sharp({ create: { width: 2200, height: 1400, channels: 3, background: { r: 30, g: 90, b: 160 } } })
  .withMetadata({ exif: { IFD0: { Copyright: 'SECRET-EXIF-MARKER', Artist: 'gps-test' } } })
  .jpeg({ quality: 90 })
  .toBuffer();

test('images: JPEG → WebP renditions, never upscaled, EXIF removed', async () => {
  const src = await jpegWithExif();
  assert.ok((await sharp(src).metadata()).exif, 'fixture carries EXIF');
  const out = await processImage(src, { declaredMime: 'image/jpeg' });
  assert.equal(out.sourceMime, 'image/jpeg');
  assert.match(out.sha256, /^[0-9a-f]{64}$/);
  assert.deepEqual(out.renditions.map((r) => [r.name, r.width]), [['thumb', 480], ['card', 960], ['article', 1600], ['full', 2200]]);
  for (const r of out.renditions) {
    const m = await sharp(r.buffer).metadata();
    assert.equal(m.format, 'webp');
    assert.equal(m.exif, undefined, `${r.name} has no EXIF`);
    assert.ok(!r.buffer.includes(Buffer.from('SECRET-EXIF-MARKER')));
  }
  /* a small image yields only what it can without upscaling */
  const small = await sharp({ create: { width: 600, height: 400, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0.5 } } }).png().toBuffer();
  const s = await processImage(small);
  assert.deepEqual(s.renditions.map((r) => [r.name, r.width]), [['thumb', 480], ['full', 600]]);
});

test('images: EXIF orientation is applied before metadata is dropped', async () => {
  const src = await sharp({ create: { width: 400, height: 200, channels: 3, background: '#888' } }).withMetadata({ orientation: 6 }).jpeg().toBuffer();
  const out = await processImage(src);
  const full = out.renditions.at(-1);
  assert.deepEqual([full.width, full.height], [200, 400]);
});

test('images: rejects SVG, HEIC, GIF, HTML, disguised and oversized files', async () => {
  const svg = Buffer.from('<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" onload="alert(1)"><rect/></svg>');
  const html = Buffer.from('<!DOCTYPE html><html><script>alert(1)</script></html>');
  const gif = await sharp({ create: { width: 10, height: 10, channels: 3, background: '#000' } }).gif().toBuffer();
  const heic = Buffer.concat([Buffer.from([0, 0, 0, 24]), Buffer.from('ftypheic'), Buffer.alloc(32)]);
  const png = await sharp({ create: { width: 10, height: 10, channels: 3, background: '#000' } }).png().toBuffer();
  const polyglot = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff, 0xe0]), Buffer.from('<script>alert(1)</script>'), Buffer.alloc(64)]);
  const expect = async (buf, code, opts) => {
    await assert.rejects(processImage(buf, opts), (e) => e instanceof ImageRejected && e.code === code, code);
  };
  await expect(svg, 'svg');
  await expect(html, 'unsupported');
  await expect(gif, 'gif');
  await expect(heic, 'heic');
  await expect(png, 'type_mismatch', { declaredMime: 'image/jpeg' });
  await expect(polyglot, 'corrupt');
  await expect(Buffer.alloc(0), 'empty');
  await expect(Buffer.alloc(MAX_UPLOAD_BYTES + 1, 0xff), 'too_large');
  /* decompression bomb: a VALID PNG header (correct CRC) claiming 60,000 × 60,000 pixels */
  const bomb = Buffer.from(png);
  bomb.writeUInt32BE(60000, 16);
  bomb.writeUInt32BE(60000, 20);
  bomb.writeUInt32BE(zlib.crc32(bomb.subarray(12, 29)), 29);
  await expect(bomb, 'too_many_pixels');
  /* and a header with a broken CRC is refused as corrupt */
  const broken = Buffer.from(png);
  broken.writeUInt32BE(60000, 16);
  await expect(broken, 'corrupt');
  assert.equal(sniffMime(svg), 'image/svg+xml');
});

/* ------------------------------------------------------------------------------------ storage */

test('storage: News S3 config resolves exactly like scripts/assets/lib.mjs', () => {
  const env = { ASSETS_S3_BUCKET: 'b', AWS_S3_REGION: 'ap-south-1', ASSETS_S3_PREFIX: '/pfx/', NEXT_PUBLIC_ASSET_BASE_URL: '' };
  const saved = { ...process.env };
  try {
    for (const k of ['ASSETS_S3_BUCKET', 'AWS_S3_BUCKET', 'ASSETS_S3_REGION', 'AWS_S3_REGION', 'AWS_REGION', 'ASSETS_S3_PREFIX', 'ASSETS_S3_ENDPOINT', 'NEXT_PUBLIC_ASSET_BASE_URL']) delete process.env[k];
    Object.assign(process.env, env);
    const a = assetsConfig();
    const n = s3Config(process.env);
    for (const k of ['bucket', 'region', 'prefix', 'endpoint', 'cdnBase', 'publicBase']) assert.equal(n[k], a[k], k);
    assert.equal(publicUrl(n, 'assets/news/a&b(1)é.webp'), assetsPublicUrl(a, 'assets/news/a&b(1)é.webp'));
  } finally {
    for (const k of Object.keys(process.env)) if (!(k in saved)) delete process.env[k];
    Object.assign(process.env, saved);
  }
});

test('storage: keys are confined to assets/news/', () => {
  const cfg = { prefix: '' };
  assert.equal(objectKey(cfg, 'assets/news/media/a.webp'), 'assets/news/media/a.webp');
  for (const bad of ['assets/images/logo.png', 'assets/news/../images/x.png', 'assets/newsx/a', '/assets/news/a', 'assets/news/a b', 'assets/news', 'other']) {
    assert.throws(() => assertNewsKey(bad), undefined, bad);
  }
});

/* ------------------------------------------------------------------------------------ resource limits */

const streamOf = (chunks) => new ReadableStream({
  start(c) {
    for (const ch of chunks) c.enqueue(ch);
    c.close();
  },
});
const fakeRequest = (headers, chunks) => ({ headers: new Headers(headers), body: chunks ? streamOf(chunks) : null });

test('body: declared length over the limit is refused before reading', async () => {
  let pulled = false;
  /* highWaterMark 0: the stream pulls only when something actually reads (no eager pre-fill) */
  const body = new ReadableStream({ pull() { pulled = true; } }, { highWaterMark: 0 });
  await assert.rejects(readBodyLimited({ headers: new Headers({ 'content-length': '5000' }), body }, 1000), (e) => e instanceof BodyError && e.status === 413);
  assert.equal(pulled, false, 'not a byte was read');
});

test('body: a lying Content-Length cannot get more than the limit buffered', async () => {
  const chunks = Array.from({ length: 50 }, () => new Uint8Array(1024));
  await assert.rejects(readBodyLimited(fakeRequest({ 'content-length': '10' }, chunks), 4096), (e) => e instanceof BodyError && e.status === 413);
  await assert.rejects(readBodyLimited(fakeRequest({}, chunks), 4096), (e) => e instanceof BodyError && e.status === 413, 'chunked too');
});

test('body: length can be required, and in-limit bodies come back intact', async () => {
  await assert.rejects(readBodyLimited(fakeRequest({}, [new Uint8Array(3)]), 100, { requireLength: true }), (e) => e.status === 411);
  await assert.rejects(readBodyLimited(fakeRequest({ 'content-length': 'abc' }, []), 100), (e) => e.status === 400);
  const ok = await readBodyLimited(fakeRequest({ 'content-length': '6' }, [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])]), 100);
  assert.deepEqual([...ok], [1, 2, 3, 4, 5, 6]);
});

test('limiter: at most `max` run, `queue` wait, the rest are refused at once; slots always released', async () => {
  const lim = createLimiter({ max: 2, queue: 2, waitMs: 2000 });
  let running = 0;
  let peak = 0;
  const gates = [];
  const job = () => lim.run(async () => {
    running += 1;
    peak = Math.max(peak, running);
    await new Promise((r) => gates.push(r));
    running -= 1;
    return 'done';
  });
  const jobs = Array.from({ length: 6 }, job);
  const settled = jobs.map((p) => p.then((v) => v, (e) => e));
  await new Promise((r) => setTimeout(r, 20));
  assert.deepEqual(lim.stats(), { active: 2, waiting: 2, max: 2, queue: 2 });
  const results = [];
  /* two over capacity are rejected immediately */
  const r4 = await settled[4];
  const r5 = await settled[5];
  assert.ok(r4 instanceof LimiterBusy && r5 instanceof LimiterBusy);
  /* release everything in turn; the queued ones run */
  while (results.length < 4) {
    const g = gates.shift();
    if (g) g();
    await new Promise((r) => setTimeout(r, 5));
    for (const i of [0, 1, 2, 3]) if (!results.includes(i) && (await Promise.race([settled[i], Promise.resolve('pending')])) === 'done') results.push(i);
  }
  assert.equal(peak, 2, 'never more than 2 at once');
  assert.deepEqual(lim.stats(), { active: 0, waiting: 0, max: 2, queue: 2 });
  /* a failing job still releases its slot */
  await assert.rejects(lim.run(async () => { throw new Error('x'); }));
  assert.equal(lim.stats().active, 0);
});

test('limiter: a queued job gives up after waitMs', async () => {
  const lim = createLimiter({ max: 1, queue: 1, waitMs: 30 });
  const hold = await lim.acquire();
  await assert.rejects(lim.acquire(), (e) => e instanceof LimiterBusy);
  hold();
  assert.equal(lim.stats().active, 0);
});

test('client IP: the rightmost trusted hop is used; forged left-hand entries are ignored', () => {
  const r = (h) => ({ headers: new Headers(h) });
  assert.equal(newsClientIp(r({ 'x-forwarded-for': '1.1.1.1, 203.0.113.9' }), {}), '203.0.113.9');
  assert.equal(newsClientIp(r({ 'x-forwarded-for': 'forged, 1.1.1.1, 198.51.100.4' }), { NEWS_TRUSTED_PROXY_HOPS: '2' }), '1.1.1.1');
  assert.equal(newsClientIp(r({ 'x-forwarded-for': '198.51.100.4' }), { NEWS_TRUSTED_PROXY_HOPS: '3' }), '198.51.100.4');
  assert.equal(newsClientIp(r({ 'x-forwarded-for': '1.1.1.1, <script>' }), {}), 'invalid');
  assert.equal(newsClientIp(r({ 'x-real-ip': '192.0.2.7' }), {}), '192.0.2.7');
  assert.equal(newsClientIp(r({}), {}), 'unknown');
  assert.equal(newsClientIp(r({ 'x-forwarded-for': '2001:db8::1' }), { NEWS_TRUSTED_PROXY_HOPS: 'x' }), '2001:db8::1');
});

test('password: the 16-character minimum stays, and a 256-character maximum keeps every stored password verifiable', async () => {
  const { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } = await import('../../../lib/news/auth/password.js');
  assert.equal(MIN_PASSWORD_LENGTH, 16);
  assert.equal(MAX_PASSWORD_LENGTH, 256);
  await assert.rejects(hashPassword('x'.repeat(15)), /at least 16/);
  await assert.rejects(hashPassword('x'.repeat(257)), /at most 256/);
  for (const len of [16, 32, 256]) {
    const pw = generatePassword(len);
    assert.equal(await verifyPassword(pw, await hashPassword(pw)), true, `${len} chars round-trips`);
  }
});
