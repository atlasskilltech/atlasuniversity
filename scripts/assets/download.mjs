#!/usr/bin/env node
/**
 * npm run assets:download — fill public/assets from S3 (or its public HTTPS URL) according to the committed
 * assets.manifest.json, for a fresh clone or after pulling someone else's asset changes.
 *
 *   (default)         S3 API (GetObject) with your AWS profile — read access is enough
 *   --from-public     plain anonymous HTTPS from the direct S3 URL (or NEXT_PUBLIC_ASSET_BASE_URL when
 *                     set), no AWS account needed; --from-cdn is an alias
 *   --only=<subdir>   limit to public/assets/<subdir>
 *   --concurrency=<n> parallel downloads (default 8)
 *
 * Every file is written to a temporary name, its size and SHA-256 are checked against the manifest,
 * and only then is it moved into place — an interrupted or corrupt download never replaces a file.
 * Files already present with the right SHA-256 are skipped. Local files that are not in the manifest
 * are left alone (listed, never deleted).
 */
import { createWriteStream, existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { Readable, Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import {
  config, requireBucket, parseArgs, log, fail, fmtBytes, readManifest, walkAssets, loadCache, saveCache, hashAll,
  localPath, keyFor, publicUrl, s3Client, loadS3, pool, retry, reason, MANIFEST_FILE,
} from './lib.mjs';

const args = parseArgs();
const cfg = config();
const fromCdn = Boolean(args['from-public'] || args['from-cdn']);
const only = typeof args.only === 'string' ? args.only.replace(/^\/+|\/+$/g, '') : '';
const scopePrefix = only ? `assets/${only}/` : 'assets/';
const concurrency = Math.max(1, Number(args.concurrency) || 8);

const manifest = readManifest();
if (!manifest) fail(`no ${MANIFEST_FILE} in the working tree — nothing to download.`);
const wanted = Object.keys(manifest).filter((r) => r.startsWith(scopePrefix));

const cache = loadCache();
const present = await hashAll(wanted.filter((r) => existsSync(localPath(r))), cache);
const todo = wanted.filter((r) => !present[r] || present[r][0] !== manifest[r][0] || present[r][1] !== manifest[r][1]);
const bytes = todo.reduce((n, r) => n + manifest[r][0], 0);
log(`${wanted.length} files in the manifest${only ? ` under ${scopePrefix}` : ''}; ${wanted.length - todo.length} already correct; ${todo.length} to download (${fmtBytes(bytes)})`);

let client = null;
let GetObjectCommand = null;
if (todo.length) {
  if (fromCdn) {
    if (!cfg.publicBase) fail('--from-public needs ASSETS_S3_BUCKET + ASSETS_S3_REGION (or NEXT_PUBLIC_ASSET_BASE_URL)');
  } else {
    requireBucket(cfg, 'assets:download (or use --from-public)');
    client = await s3Client(cfg);
    ({ GetObjectCommand } = await loadS3());
  }
}

async function bodyFor(rel) {
  if (fromCdn) {
    const url = publicUrl(cfg, rel);
    const res = await fetch(url);
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status} for ${url}`), { $metadata: { httpStatusCode: res.status } });
    return Readable.fromWeb(res.body);
  }
  const r = await client.send(new GetObjectCommand({ Bucket: cfg.bucket, Key: keyFor(cfg, rel) }));
  return r.Body;
}

async function download(rel) {
  const [size, sha] = manifest[rel];
  const dest = localPath(rel);
  mkdirSync(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.download-${process.pid}`;
  const hash = createHash('sha256');
  let got = 0;
  try {
    const counter = new Transform({
      transform(chunk, _enc, cb) {
        hash.update(chunk);
        got += chunk.length;
        cb(null, chunk);
      },
    });
    await pipeline(await bodyFor(rel), counter, createWriteStream(tmp));
    const digest = hash.digest('hex');
    if (got !== size) throw new Error(`size ${got}, manifest says ${size}`);
    if (digest !== sha) throw new Error('SHA-256 does not match the manifest');
    renameSync(tmp, dest);
  } catch (e) {
    rmSync(tmp, { force: true });
    throw e;
  }
}

const failed = [];
let n = 0;
await pool(todo, concurrency, async (rel) => {
  try {
    await retry(() => download(rel), { label: 'download' });
  } catch (e) {
    failed.push([rel, reason(e)]);
  }
  n += 1;
  if (n % 200 === 0) log(`  ${n}/${todo.length}`);
});

/* refresh the hash cache for what was written, so the next sync/status does not re-hash it */
await hashAll(todo.filter((r) => !failed.some(([f]) => f === r)), cache);
saveCache(cache);

const extra = (await walkAssets(only)).filter((r) => !manifest[r]);
if (extra.length) log(`${extra.length} local file(s) are not in the manifest (kept; run assets:sync if they are new assets)`);

if (failed.length) {
  for (const [rel, why] of failed.slice(0, 50)) console.error(`  FAILED ${rel} — ${why}`);
  fail(`${failed.length} file(s) could not be downloaded; existing local files were left untouched.`);
}
log(`downloaded ${todo.length - failed.length} file(s); public/assets matches ${MANIFEST_FILE}`);
