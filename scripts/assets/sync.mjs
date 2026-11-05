#!/usr/bin/env node
/**
 * npm run assets:sync — upload new and changed files under public/assets to S3, confirm every upload
 * with HeadObject, then (and only then) rewrite assets.manifest.json. Run it BEFORE committing; stage
 * and commit the updated manifest together with the code that uses the assets. See docs/assets-s3.md.
 *
 *   --dry-run            list what would be uploaded; no AWS writes, manifest untouched
 *   --only=<subdir>      limit to public/assets/<subdir> (the rest of the manifest is kept as it is)
 *   --full               HeadObject-check every file in scope, not only files changed since the manifest
 *   --refresh-headers    with --full: re-upload objects whose Content-Type / Cache-Control /
 *                        Content-Disposition differ from the current rules
 *   --concurrency=<n>    parallel uploads (default 6)
 *
 * Safety:
 *   - never deletes, never overwrites anything outside the asset prefix; files removed locally are only
 *     dropped from the manifest (and listed) — the remote objects stay
 *   - every upload is retried (3 attempts, exponential back-off) and then confirmed by HeadObject
 *     (size + full-file SHA-256 in x-amz-meta-sha256)
 *   - any failure -> exit code 1 and the manifest is NOT written, so it can never name a file that
 *     is not in S3; re-running uploads only what is still missing
 */
import { createReadStream, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import {
  config, requireBucket, parseArgs, log, fail, fmtBytes, walkAssets, loadCache, saveCache, hashAll, readManifest,
  writeManifest, changedEntries, localPath, keyFor, headersFor, s3Client, loadS3, headObject, listKeys, pool, retry,
  reason, MANIFEST_FILE,
} from './lib.mjs';

const MULTIPART_THRESHOLD = 64 * 1024 * 1024;
const PART_SIZE = 16 * 1024 * 1024;

const args = parseArgs();
const cfg = config();
const dryRun = Boolean(args['dry-run']);
const concurrency = Math.max(1, Number(args.concurrency) || 6);
const only = typeof args.only === 'string' ? args.only.replace(/^\/+|\/+$/g, '') : '';
const scopePrefix = only ? `assets/${only}/` : 'assets/';

log(`scanning public/${scopePrefix} …`);
const cache = loadCache();
const rels = await walkAssets(only);
const local = await hashAll(rels, cache, { onProgress: (n, t) => log(`  hashed ${n}/${t}`) });
saveCache(cache);

const prev = readManifest() || {};
const inScope = (rel) => rel.startsWith(scopePrefix);
const changed = changedEntries(prev, local);
const removed = Object.keys(prev).filter((rel) => inScope(rel) && !local[rel]);
const candidates = args.full ? Object.keys(local) : changed;
const bytes = candidates.reduce((n, rel) => n + local[rel][0], 0);

log(`${Object.keys(local).length} local files in scope; ${changed.length} new/changed vs ${MANIFEST_FILE}; ${removed.length} removed locally`);
log(`${candidates.length} to check (${fmtBytes(bytes)})${args.full ? ' [--full]' : ''}`);

if (dryRun && (!cfg.bucket || !cfg.region)) {
  log('dry run without ASSETS_S3_BUCKET / ASSETS_S3_REGION: remote state unknown — every candidate listed as "would upload"');
  for (const rel of candidates.slice(0, 40)) log(`  would upload ${rel} (${fmtBytes(local[rel][0])})`);
  if (candidates.length > 40) log(`  … and ${candidates.length - 40} more`);
  process.exit(0);
}
requireBucket(cfg, 'assets:sync');

const client = await s3Client(cfg);
const { PutObjectCommand } = await loadS3();

/* ListObjectsV2 once, only to know which keys do not exist yet (no HeadObject needed for those).
   It is never used as checksum evidence: it carries no user metadata. */
let existing = null;
if (candidates.length > 20) {
  try {
    existing = await retry(() => listKeys(client, cfg), { label: 'ListObjectsV2' });
    log(`remote: ${existing.size} objects under ${keyFor(cfg, 'assets/')}`);
  } catch (e) {
    fail(`could not list the bucket — ${reason(e)}`);
  }
}

const want = (rel) => headersFor(cfg, rel);
const headersMatch = (h, rel) => {
  const w = want(rel);
  return h.contentType === w.ContentType && h.cacheControl === w.CacheControl && (h.contentDisposition || undefined) === w.ContentDisposition;
};

const stats = { uploaded: [], replaced: [], present: [], failed: [] };

async function upload(rel) {
  const [size, sha] = local[rel];
  const file = localPath(rel);
  const h = want(rel);
  const common = {
    Bucket: cfg.bucket,
    Key: keyFor(cfg, rel),
    ContentType: h.ContentType,
    CacheControl: h.CacheControl,
    ...(h.ContentDisposition ? { ContentDisposition: h.ContentDisposition } : {}),
    Metadata: { sha256: sha },
  };
  if (size < MULTIPART_THRESHOLD) {
    const body = readFileSync(file);
    /* the file may have changed since it was hashed */
    if (createHash('sha256').update(body).digest('hex') !== sha) throw new Error('file changed while syncing — run again');
    /* S3 recomputes the SHA-256 of the body and rejects the request if it differs */
    await client.send(new PutObjectCommand({
      ...common, Body: body, ContentLength: size, ChecksumSHA256: Buffer.from(sha, 'hex').toString('base64'),
    }));
  } else {
    const { Upload } = await import('@aws-sdk/lib-storage');
    /* multipart: S3 verifies each part's SHA-256; the whole-file SHA-256 travels as metadata and is
       re-checked below with HeadObject. A failed upload is aborted (no orphaned parts). */
    const up = new Upload({
      client,
      params: { ...common, Body: createReadStream(file), ChecksumAlgorithm: 'SHA256' },
      partSize: PART_SIZE,
      queueSize: 4,
      leavePartsOnError: false,
    });
    await up.done();
  }
}

let n = 0;
await pool(candidates, concurrency, async (rel) => {
  const [size, sha] = local[rel];
  try {
    let remote = null;
    if (!existing || existing.has(rel)) remote = await retry(() => headObject(client, cfg, rel), { label: 'HeadObject' });
    if (remote && remote.size === size && remote.sha === sha && (!args['refresh-headers'] || headersMatch(remote, rel))) {
      stats.present.push(rel);
    } else if (dryRun) {
      (remote ? stats.replaced : stats.uploaded).push(rel);
    } else {
      await retry(() => upload(rel), { label: 'upload' });
      const after = await retry(() => headObject(client, cfg, rel), { label: 'verify' });
      if (!after || after.size !== size || after.sha !== sha) throw new Error(`verification failed after upload (remote size ${after?.size}, sha ${after?.sha})`);
      (remote ? stats.replaced : stats.uploaded).push(rel);
    }
  } catch (e) {
    stats.failed.push([rel, reason(e)]);
  }
  n += 1;
  if (n % 200 === 0) log(`  ${n}/${candidates.length} checked`);
});

const verb = dryRun ? 'would upload' : 'uploaded';
log(`${verb}: ${stats.uploaded.length} new, ${stats.replaced.length} replaced; already in S3: ${stats.present.length}; failed: ${stats.failed.length}`);
if (stats.replaced.length) {
  log(`${dryRun ? 'would replace' : 'replaced'} existing objects (served straight from S3 with no CDN, so there is nothing to invalidate — browsers that cached the old bytes keep them until Cache-Control max-age expires):`);
  for (const rel of stats.replaced) log(`  /${keyFor(cfg, rel)}`);
}
if (removed.length) {
  log(`${removed.length} file(s) were removed locally — dropped from the manifest, NOT deleted from S3:`);
  for (const rel of removed.slice(0, 30)) log(`  ${rel}`);
}

if (stats.failed.length) {
  for (const [rel, why] of stats.failed.slice(0, 50)) console.error(`  FAILED ${rel} — ${why}`);
  fail(`${stats.failed.length} file(s) failed. ${MANIFEST_FILE} was NOT updated. Fix the cause and run assets:sync again (only the failures are retried).`);
}
if (dryRun) {
  log(`dry run: ${MANIFEST_FILE} not changed`);
  process.exit(0);
}

/* every file in scope is now confirmed in S3: write the manifest (entries outside --only are kept) */
const next = {};
for (const [rel, v] of Object.entries(prev)) if (!inScope(rel)) next[rel] = v;
for (const [rel, v] of Object.entries(local)) next[rel] = v;
writeManifest(next);
const delta = changedEntries(prev, next).length + removed.length;
log(delta
  ? `${MANIFEST_FILE} updated (${delta} entr${delta === 1 ? 'y' : 'ies'} changed) — stage and commit it with your change: git add ${MANIFEST_FILE}`
  : `${MANIFEST_FILE} already up to date`);
