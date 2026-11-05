#!/usr/bin/env node
/**
 * npm run assets:status — compare public/assets with assets.manifest.json, offline (no AWS access).
 * Shows what `assets:sync` would upload and drop from the manifest. Never writes anything but the
 * local hash cache.
 *
 *   --strict    exit 1 when anything differs (useful in a pre-commit check of your own)
 */
import {
  parseArgs, log, fmtBytes, walkAssets, loadCache, saveCache, hashAll, readManifest, changedEntries, MANIFEST_FILE,
} from './lib.mjs';

const args = parseArgs();
const manifest = readManifest();
const cache = loadCache();
const local = await hashAll(await walkAssets(), cache, { onProgress: (n, t) => log(`  hashed ${n}/${t}`) });
saveCache(cache);

if (!manifest) {
  const bytes = Object.values(local).reduce((n, v) => n + v[0], 0);
  log(`no ${MANIFEST_FILE} yet — ${Object.keys(local).length} local files (${fmtBytes(bytes)}) would be uploaded by the first assets:sync`);
  process.exit(args.strict ? 1 : 0);
}

const changed = changedEntries(manifest, local);
const added = changed.filter((r) => !manifest[r]);
const modified = changed.filter((r) => manifest[r]);
const removed = Object.keys(manifest).filter((r) => !local[r]);
log(`${Object.keys(local).length} local files, ${Object.keys(manifest).length} in the manifest`);
log(`new: ${added.length}, modified: ${modified.length}, removed locally: ${removed.length}`);
for (const [label, list] of [['new', added], ['modified', modified], ['removed', removed]]) {
  for (const r of list.slice(0, 20)) log(`  ${label.padEnd(8)} ${r}`);
  if (list.length > 20) log(`  … and ${list.length - 20} more ${label}`);
}
if (changed.length || removed.length) {
  log('run `npm run assets:sync`, then stage and commit assets.manifest.json');
  if (args.strict) process.exit(1);
} else log('in sync with the manifest');
