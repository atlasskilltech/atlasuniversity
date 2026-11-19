#!/usr/bin/env node
/*
 * Upload the old PHP site's /wordpress-custom-image/ files to S3 under the SAME path, so the links
 * already circulating keep working (next.config.mjs rewrites /wordpress-custom-image/* to the bucket).
 *
 *   npm run legacy:upload -- alumni-connect/groupImage.png     one file
 *   npm run legacy:upload -- alumni-connect                    one folder
 *   npm run legacy:upload                                      everything
 *   npm run legacy:upload -- alumni-connect --dry-run          show what would upload
 *
 * Paths are relative to reference/wordpress-custom-image/ (override with --from=<folder>). The S3 key is
 * wordpress-custom-image/<same path>: names and folders are never changed. A file already in S3 with
 * the same size is skipped, so re-running is cheap. Nothing is ever deleted from S3, and these files are
 * NOT added to assets.manifest.json or git — this is a read-only archive of the old site.
 *
 * Uses the same .env / .env.local settings as `npm run assets:sync` (AWS_S3_BUCKET, AWS_S3_REGION,
 * AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
 */
import { createReadStream, existsSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { loadEnv, config, requireBucket, s3Client, contentTypeFor, ROOT, fmtBytes, fail } from './lib.mjs';

const PREFIX = 'wordpress-custom-image';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const fromArg = args.find((a) => a.startsWith('--from='));
const target = (args.find((a) => !a.startsWith('--')) || '').replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
const sourceRoot = path.resolve(ROOT, fromArg ? fromArg.slice(7) : path.join('reference', PREFIX));

loadEnv();
const cfg = config();
requireBucket(cfg, 'legacy:upload');

const start = path.join(sourceRoot, ...target.split('/').filter(Boolean));
if (!existsSync(start)) fail(`Not found: ${start}`);

/* every file under `start`, as paths relative to sourceRoot with forward slashes */
const files = [];
(function walk(p) {
  if (statSync(p).isDirectory()) {
    for (const name of readdirSync(p)) walk(path.join(p, name));
  } else {
    files.push(path.relative(sourceRoot, p).split(path.sep).join('/'));
  }
})(start);

const client = await s3Client(cfg);
const { ListObjectsV2Command } = await import('@aws-sdk/client-s3');
const { Upload } = await import('@aws-sdk/lib-storage');

/* sizes of what is already in S3 under this folder, to skip unchanged files */
const listPrefix = `${PREFIX}/${target && statSync(start).isDirectory() ? `${target}/` : target}`;
const existing = new Map();
let token;
do {
  const r = await client.send(new ListObjectsV2Command({ Bucket: cfg.bucket, Prefix: listPrefix, ContinuationToken: token }));
  for (const o of r.Contents || []) existing.set(o.Key, o.Size);
  token = r.IsTruncated ? r.NextContinuationToken : undefined;
} while (token);

const todo = files.filter((rel) => existing.get(`${PREFIX}/${rel}`) !== statSync(path.join(sourceRoot, rel)).size);
const total = todo.reduce((n, rel) => n + statSync(path.join(sourceRoot, rel)).size, 0);
console.log(`[legacy] ${files.length} file(s) found, ${files.length - todo.length} already in S3, ${todo.length} to upload (${fmtBytes(total)})`);

let done = 0;
let failed = 0;
const queue = [...todo];
async function worker() {
  while (queue.length) {
    const rel = queue.shift();
    const key = `${PREFIX}/${rel}`;
    if (dryRun) { console.log(`  would upload ${key}`); continue; }
    try {
      await new Upload({
        client,
        params: {
          Bucket: cfg.bucket,
          Key: key,
          Body: createReadStream(path.join(sourceRoot, rel)),
          ContentType: contentTypeFor(rel),
          CacheControl: cfg.cacheControl,
        },
        leavePartsOnError: false,
      }).done();
      done += 1;
      console.log(`  [${done}/${todo.length}] ${key}`);
    } catch (e) {
      failed += 1;
      console.error(`  FAILED ${key}: ${e.name || ''} ${e.message}`);
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));

if (!dryRun && todo.length) {
  const first = `${PREFIX}/${todo[0]}`.split('/').map(encodeURIComponent).join('/');
  console.log(`[legacy] uploaded ${done}, failed ${failed}`);
  console.log(`[legacy] check: https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com/${first}`);
}
if (failed) process.exit(1);
