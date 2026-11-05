#!/usr/bin/env node
/**
 * npm run assets:verify — check that the manifest matches what is in S3, and that the code references
 * nothing the manifest does not list. Read-only: it never writes files, objects or commits.
 *
 *   (default)          entries changed between the base revision and the working-tree manifest
 *   --full             every manifest entry (one HeadObject each)
 *   --base=<rev>       compare against this revision (default: merge-base with the upstream branch)
 *   --head=<rev>       verify the manifest and code committed at <rev> instead of the working tree
 *   --headers          also compare Content-Type / Cache-Control / Content-Disposition with the rules
 *   --public           also fetch a sample anonymously over the public HTTPS URL visitors use — the
 *                      direct S3 endpoint https://<bucket>.s3.<region>.amazonaws.com/assets/…, or
 *                      NEXT_PUBLIC_ASSET_BASE_URL when set — and check status, size, Content-Type,
 *                      Cache-Control and Content-Disposition (--cdn is an alias). Fonts and brand files
 *                      stay local (scripts/assets/local-only.cjs) and are not checked here.
 *   --origin=<url>     the Origin sent with the public check (default http://localhost:3000)
 *   --no-refs          skip the code-reference scan
 *
 * Exit code 1 on any problem. Needs read access to the bucket only when there are entries to check.
 */
import {
  config, requireBucket, parseArgs, log, fail, readManifest, manifestAt, changedEntries, defaultBase, s3Client,
  headersFor, publicUrl, MANIFEST_FILE, gitOk, isLocalOnly, pool,
} from './lib.mjs';
import { verifyRemote, scanRefs } from './check.mjs';

const args = parseArgs();
const cfg = config();
const headRev = typeof args.head === 'string' ? args.head : 'WORKTREE';
const manifest = headRev === 'WORKTREE' ? readManifest() : manifestAt(headRev);

if (!manifest) {
  log(`no ${MANIFEST_FILE} ${headRev === 'WORKTREE' ? 'in the working tree' : `at ${headRev}`} — S3 asset storage is not active here; nothing to verify.`);
  process.exit(0);
}

let problems = 0;

/* 1. code references must all be in the manifest (no network) */
if (!args['no-refs']) {
  const r = await scanRefs(manifest, headRev);
  log(`code references: ${r.total} distinct /assets/ paths (${r.local} local-only, checked on disk), ${r.missing.length} missing${r.dynamic.length ? `, ${r.dynamic.length} built dynamically (not checked)` : ''}`);
  for (const m of r.missing.slice(0, 50)) console.error(`  MISSING ${m} — ${isLocalOnly(m) ? 'not in public/' : 'not in the manifest'}`);
  if (r.missing.length > 50) console.error(`  … and ${r.missing.length - 50} more`);
  for (const d of r.dynamic.slice(0, 10)) log(`  dynamic: ${d}`);
  problems += r.missing.length;
}

/* 2. manifest entries must be in S3 with the same size and SHA-256 */
let rels;
let scope;
if (args.full) {
  rels = Object.keys(manifest);
  scope = 'all entries';
} else {
  const baseRev = typeof args.base === 'string' ? args.base : defaultBase(headRev);
  const base = baseRev ? manifestAt(baseRev) : null;
  rels = changedEntries(base, manifest);
  scope = baseRev ? `entries changed since ${gitOk(['rev-parse', '--short', baseRev]) || baseRev}` : 'all entries (no base revision found)';
}
log(`remote check: ${rels.length} ${scope}`);

let client = null;
const pub = Boolean(args.public || args.cdn);
if (rels.length) {
  requireBucket(cfg, 'assets:verify');
  client = await s3Client(cfg);
}
if (rels.length) {
  const found = await verifyRemote(client, cfg, manifest, rels, { headers: Boolean(args.headers) });
  for (const [rel, why] of found.slice(0, 50)) console.error(`  ${rel} — ${why}`);
  if (found.length > 50) console.error(`  … and ${found.length - 50} more`);
  log(`remote check: ${rels.length - new Set(found.map((f) => f[0])).size}/${rels.length} OK`);
  problems += found.length;
}

/* 3. what an anonymous visitor actually receives from the public URL (direct S3, no credentials) */
if (pub) {
  if (!cfg.publicBase) fail('--public needs ASSETS_S3_BUCKET + ASSETS_S3_REGION (or NEXT_PUBLIC_ASSET_BASE_URL)');
  log(`public check against ${cfg.publicBase}`);
  const all = Object.keys(manifest);
  const attach = all.filter((r) => headersFor(cfg, r).ContentDisposition);
  const step = Math.max(1, Math.floor(all.length / 25));
  /* --full: every entry; otherwise downloads + a spread sample */
  const sample = args.full ? all : [...new Set([...attach.slice(0, 10), ...all.filter((_, i) => i % step === 0).slice(0, 25)])];
  const origin = typeof args.origin === 'string' ? args.origin : 'http://localhost:3000';
  let bad = 0;
  await pool(sample, 16, async (rel) => {
    const url = publicUrl(cfg, rel);
    const w = headersFor(cfg, rel);
    const errs = [];
    try {
      /* no Authorization header: this is exactly what a browser gets */
      const res = await fetch(url, { method: 'HEAD', headers: { Origin: origin } });
      const h = (n) => res.headers.get(n);
      if (res.status !== 200) errs.push(`HTTP ${res.status}`);
      if (Number(h('content-length')) !== manifest[rel][0]) errs.push(`Content-Length ${h('content-length')}`);
      if (h('content-type') !== w.ContentType) errs.push(`Content-Type "${h('content-type')}"`);
      if (h('cache-control') !== w.CacheControl) errs.push(`Cache-Control "${h('cache-control')}"`);
      if ((h('content-disposition') || undefined) !== w.ContentDisposition) errs.push(`Content-Disposition "${h('content-disposition') || ''}"`);
    } catch (e) {
      errs.push(String(e.message || e));
    }
    if (errs.length) {
      bad += 1;
      console.error(`  public ${rel} — ${errs.join('; ')}`);
    }
  });
  log(`public check: ${sample.length - bad}/${sample.length} OK (${args.full ? 'every manifest entry' : `${Math.min(attach.length, 10)} downloads + a sample`})`);
  problems += bad;
}

if (problems) fail(`${problems} problem(s) found`);
log('verify OK');
