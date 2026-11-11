#!/usr/bin/env node
/**
 * npm run news:import-upload -- --store=<dir> --state=<dir> [--verify-only] [--concurrency=6]
 *
 * Uploads the media of a verified LOCAL WordPress import (lib/news/import) to the News S3 storage.
 *
 *   manifest   every object the local import database references (atlasnews_media.storage_key and every
 *              rendition key) — nothing else is ever uploaded. Written to <state>/manifest.json with each
 *              file's size and SHA-256.
 *   files      read from --store, the local stand-in the import wrote to (<store>/<bucket>/<key>).
 *   upload     lib/news/storage/s3.js putIfAbsent: a conditional PUT (If-None-Match: *) that NEVER overwrites;
 *              an object that already exists is compared by its recorded SHA-256 and counted as skipped when
 *              identical, or reported as a conflict (and left alone) when not. Nothing is ever deleted.
 *   resume     every result is appended to <state>/upload-log.jsonl; a rerun skips what is already done.
 *   verify     a HEAD of every object: size and x-amz-meta-sha256 must equal the local file; then a sample is
 *              downloaded over its PUBLIC URL and checksummed.
 *
 * Source database: DB_* must point at a LOCAL database (the import's test database). Target storage: the
 * ASSETS_S3_* settings from the environment / .env.local. Credentials are never printed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import mysql from 'mysql2/promise';
import { loadEnv, parseArgs } from '../assets/lib.mjs';
import { objectKey, publicUrl, putIfAbsent, s3Config } from '../../lib/news/storage/s3.js';

loadEnv();
const args = parseArgs();
const log = (m) => console.log(`[news-upload] ${m}`);
const TYPES = { '.webp': 'image/webp', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime' };

const sha256File = (file) =>
  new Promise((resolve, reject) => {
    const h = createHash('sha256');
    fs.createReadStream(file).on('data', (c) => h.update(c)).on('error', reject).on('end', () => resolve(h.digest('hex')));
  });

async function pool(items, n, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (i < items.length) {
      const k = i++;
      await fn(items[k], k);
    }
  }));
}

async function main() {
  const store = args.store && path.resolve(args.store);
  const stateDir = args.state && path.resolve(args.state);
  if (!store || !fs.existsSync(store)) throw new Error('--store=<local stand-in directory> is required');
  if (!stateDir) throw new Error('--state=<directory for the manifest and log> is required');
  fs.mkdirSync(stateDir, { recursive: true });
  const concurrency = Math.max(1, Math.min(16, Number(args.concurrency || 6)));

  const host = (process.env.DB_HOST || '').trim();
  if (!/^(127\.0\.0\.1|localhost|::1)$/i.test(host)) throw new Error('the manifest must come from a LOCAL import database (DB_HOST=127.0.0.1)');
  const cfg = s3Config();
  if (!cfg.configured) throw new Error('target S3 is not configured');
  log(`target: bucket ${cfg.bucket} (${cfg.region})${cfg.prefix ? `, prefix ${cfg.prefix}/` : ''}${cfg.endpoint ? `, endpoint ${new URL(cfg.endpoint).host}` : ''}; public base ${cfg.publicBase ? new URL(cfg.publicBase).host : '(none)'}`);

  /* ---- manifest: exactly the keys the import database references */
  const db = await mysql.createConnection({ host, port: Number(process.env.DB_PORT || 3306), user: process.env.DB_USER, password: process.env.DB_PASSWORD ?? '', database: process.env.DB_NAME });
  const [rows] = await db.query('SELECT kind, storage_key, mime_type, variants FROM atlasnews_media WHERE deleted_at IS NULL ORDER BY id');
  await db.end();
  const keys = new Map();
  for (const r of rows) {
    const variants = typeof r.variants === 'string' ? JSON.parse(r.variants) : r.variants || [];
    for (const k of [r.storage_key, ...variants.map((v) => v.key)]) if (!keys.has(k)) keys.set(k, r.kind);
  }
  const bucketDir = fs.readdirSync(store).find((d) => fs.statSync(path.join(store, d)).isDirectory());
  const manifestFile = path.join(stateDir, 'manifest.json');
  let manifest;
  if (fs.existsSync(manifestFile)) {
    manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
    if (manifest.length !== keys.size || manifest.some((m) => !keys.has(m.key))) throw new Error('manifest.json does not match the import database — remove it to rebuild');
  } else {
    manifest = [];
    for (const [key, kind] of keys) {
      if (!key.startsWith('assets/news/media/')) throw new Error(`unexpected key outside assets/news/media/: ${key}`);
      const file = path.join(store, bucketDir, ...key.split('/'));
      if (!fs.existsSync(file)) throw new Error(`local file missing for ${key}`);
      const type = TYPES[path.extname(key).toLowerCase()];
      if (!type) throw new Error(`unexpected file type: ${key}`);
      manifest.push({ key, kind, type, bytes: fs.statSync(file).size, sha256: await sha256File(file) });
    }
    fs.writeFileSync(manifestFile, JSON.stringify(manifest));
  }
  const totalBytes = manifest.reduce((a, m) => a + m.bytes, 0);
  log(`manifest: ${manifest.length} objects, ${(totalBytes / 1048576).toFixed(0)} MB (${manifest.filter((m) => m.kind === 'video').length} video files)`);

  /* ---- upload (resumable) */
  const logFile = path.join(stateDir, 'upload-log.jsonl');
  const done = new Map();
  if (fs.existsSync(logFile)) {
    for (const line of fs.readFileSync(logFile, 'utf8').split('\n')) {
      if (!line.trim()) continue;
      const e = JSON.parse(line);
      if (e.result === 'uploaded' || e.result === 'skipped-identical') done.set(e.key, e.result);
    }
  }
  const counts = { uploaded: 0, 'skipped-identical': 0, conflict: 0, failed: 0, alreadyDoneEarlier: done.size };
  if (!args['verify-only']) {
    const todo = manifest.filter((m) => !done.has(m.key));
    log(`upload: ${todo.length} to send, ${done.size} done in an earlier run`);
    const append = (e) => fs.appendFileSync(logFile, `${JSON.stringify({ at: new Date().toISOString(), ...e })}\n`);
    let n = 0;
    /* videos one at a time (large), images in parallel */
    const run = async (m) => {
      const file = path.join(store, bucketDir, ...m.key.split('/'));
      try {
        const buf = fs.readFileSync(file);
        const r = await putIfAbsent(m.key, buf, { contentType: m.type });
        const result = r.created ? 'uploaded' : 'skipped-identical';
        if (r.sha256 !== m.sha256) throw new Error('local file changed since the manifest was built');
        counts[result] += 1;
        append({ key: m.key, result, bytes: m.bytes });
      } catch (e) {
        const result = e.code === 'KeyConflict' ? 'conflict' : 'failed';
        counts[result] += 1;
        append({ key: m.key, result, error: `${e.code || e.name}: ${String(e.message).slice(0, 200)}` });
      }
      n += 1;
      if (n % 500 === 0) log(`… ${n}/${todo.length}`);
    };
    await pool(todo.filter((m) => m.kind !== 'video'), concurrency, run);
    await pool(todo.filter((m) => m.kind === 'video'), 1, run);
    log(`upload: ${JSON.stringify(counts)}`);
  }

  /* ---- verify every object (HEAD: size + recorded sha256), then a public-URL sample */
  const { S3Client, HeadObjectCommand } = await import('@aws-sdk/client-s3');
  const s3 = new S3Client({ region: cfg.region, ...(cfg.endpoint ? { endpoint: cfg.endpoint, forcePathStyle: true } : {}) });
  const v = { verified: 0, missing: 0, sizeMismatch: 0, checksumMismatch: 0, errors: 0 };
  const bad = [];
  await pool(manifest, concurrency * 2, async (m) => {
    try {
      const h = await s3.send(new HeadObjectCommand({ Bucket: cfg.bucket, Key: objectKey(cfg, m.key) }));
      if (Number(h.ContentLength) !== m.bytes) {
        v.sizeMismatch += 1;
        bad.push({ key: m.key, issue: 'size', remote: Number(h.ContentLength), local: m.bytes });
      } else if (h.Metadata?.sha256 !== m.sha256) {
        v.checksumMismatch += 1;
        bad.push({ key: m.key, issue: 'sha256' });
      } else v.verified += 1;
    } catch (e) {
      const status = e?.$metadata?.httpStatusCode;
      if (status === 404) {
        v.missing += 1;
        bad.push({ key: m.key, issue: 'missing' });
      } else {
        v.errors += 1;
        bad.push({ key: m.key, issue: `${e.name} ${status || ''}` });
      }
    }
  });
  /* public URL: every 100th image object + 3 videos, full download and checksum */
  const sample = [...manifest.filter((m) => m.kind !== 'video').filter((_, i) => i % 100 === 0), ...manifest.filter((m) => m.kind === 'video').slice(0, 3)];
  const pub = { checked: 0, ok: 0, failed: [] };
  for (const m of sample) {
    pub.checked += 1;
    try {
      const res = await fetch(publicUrl(cfg, m.key), { cache: 'no-store' });
      const buf = Buffer.from(await res.arrayBuffer());
      const sha = createHash('sha256').update(buf).digest('hex');
      if (res.ok && sha === m.sha256 && (res.headers.get('content-type') || '').startsWith(m.type.split('/')[0])) pub.ok += 1;
      else pub.failed.push({ key: m.key, status: res.status });
    } catch (e) {
      pub.failed.push({ key: m.key, error: e.message });
    }
  }
  const summary = { at: new Date().toISOString(), objects: manifest.length, bytes: totalBytes, upload: args['verify-only'] ? null : counts, verify: v, publicSample: pub, problems: bad.slice(0, 50) };
  fs.writeFileSync(path.join(stateDir, `verify-${Date.now()}.json`), JSON.stringify(summary, null, 2));
  log(`verify: ${JSON.stringify(v)}`);
  log(`public URL sample: ${pub.ok}/${pub.checked} downloaded with the right checksum${pub.failed.length ? ` — failures ${JSON.stringify(pub.failed.slice(0, 5))}` : ''}`);
  if (bad.length || pub.failed.length || counts.conflict || counts.failed) process.exitCode = 2;
}

main().catch((e) => {
  log(`ERROR: ${e.message}`);
  process.exitCode = 1;
});
