#!/usr/bin/env node
/**
 * Called by .githooks/pre-push with git's pre-push stdin:
 *   <local ref> <local sha> <remote ref> <remote sha>   (one line per ref being pushed)
 *
 * For each pushed commit it checks the manifest COMMITTED in that commit — it never runs a sync,
 * never edits assets.manifest.json, never stages or commits anything:
 *   1. every /assets/ path in that commit's code is listed in its manifest   (offline)
 *   2. every manifest entry changed by the push is in S3 with the same size and SHA-256 (HeadObject)
 * A push whose manifest did not change needs no AWS access and takes about a second.
 * Revisions without a manifest are skipped (S3 storage not active there yet).
 *
 * It also WARNS (does not block) when public/assets has local changes that are not in the working-
 * tree manifest — those files are not part of the push, but probably should be synced and committed.
 *
 * Bypassing the hook (`git push --no-verify`) is possible, which is why the GitHub Actions workflow
 * runs the same checks with a read-only role; that check is the authoritative one.
 */
import { readFileSync } from 'node:fs';
import {
  config, log, readManifest, manifestAt, changedEntries, defaultBase, s3Client, gitOk, walkAssets, loadCache,
  statChanged, MANIFEST_FILE,
} from './lib.mjs';
import { verifyRemote, scanRefs } from './check.mjs';

const ZERO = /^0+$/;
let input = '';
try {
  input = readFileSync(0, 'utf8');
} catch {
  input = '';
}
const updates = input.split('\n').map((l) => l.trim().split(/\s+/)).filter((p) => p.length === 4);

const cfg = config();
let client = null;
let blocked = false;
const block = (msg) => {
  blocked = true;
  console.error(`[assets] PUSH BLOCKED: ${msg}`);
};

for (const [localRef, localSha, , remoteSha] of updates) {
  if (ZERO.test(localSha)) continue; // deleting a remote ref
  const head = manifestAt(localSha);
  if (!head) continue; // no manifest in this commit: S3 storage not active for it

  let baseRev = null;
  if (!ZERO.test(remoteSha) && gitOk(['cat-file', '-e', `${remoteSha}^{commit}`]) !== null) baseRev = remoteSha;
  else baseRev = defaultBase(localSha);
  const changed = changedEntries(baseRev ? manifestAt(baseRev) : null, head);

  const refs = await scanRefs(head, localSha);
  if (refs.missing.length) {
    block(`${localRef}: ${refs.missing.length} /assets/ path(s) in the code are not in ${MANIFEST_FILE}:`);
    for (const m of refs.missing.slice(0, 20)) console.error(`    ${m}`);
    console.error('  Add the files under public/assets, run `npm run assets:sync`, commit the manifest, push again.');
  }

  if (!changed.length) continue;
  log(`${localRef}: ${changed.length} manifest entr${changed.length === 1 ? 'y' : 'ies'} changed — checking S3 …`);
  if (!cfg.bucket || !cfg.region) {
    block(`${changed.length} changed asset(s) cannot be checked: set ASSETS_S3_BUCKET and ASSETS_S3_REGION in .env.local and use an AWS profile with read access (see docs/assets-s3.md).`);
    continue;
  }
  try {
    client = client || (await s3Client(cfg));
    const problems = await verifyRemote(client, cfg, head, changed);
    if (problems.length) {
      block(`${localRef}: ${problems.length} asset(s) in the committed manifest are not correctly in S3:`);
      for (const [rel, why] of problems.slice(0, 20)) console.error(`    ${rel} — ${why}`);
      console.error('  Run `npm run assets:sync` (it uploads and re-verifies), commit the manifest if it changed, push again.');
    } else log(`${localRef}: all ${changed.length} changed asset(s) verified in S3`);
  } catch (e) {
    block(`could not reach S3 to verify assets — ${e.message}`);
  }
}

/* non-blocking reminder about unsynced local asset changes (stat check against the hash cache) */
try {
  const manifest = readManifest();
  const cache = loadCache();
  if (manifest && Object.keys(cache).length) {
    const rels = await walkAssets();
    const pending = rels.filter((r) => !manifest[r]).length + statChanged(rels.filter((r) => manifest[r]), cache).length;
    if (pending) log(`note: ${pending} file(s) under public/assets changed locally since the last sync — run \`npm run assets:status\` (not part of this push).`);
  }
} catch {
  /* reminder only */
}

process.exit(blocked ? 1 : 0);
