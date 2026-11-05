/**
 * Shared plumbing for the asset scripts (sync / verify / download / status / pre-push).
 * See docs/assets-s3.md for the workflow.
 *
 * The MANIFEST (`assets.manifest.json`, tracked in git) records every file under `public/assets/`:
 *   "assets/images/x.png": [size, "sha256-hex"]
 * Paths are relative to `public/` with `/` separators — the same string as the URL path and the S3 key
 * (plus an optional ASSETS_S3_PREFIX). It is written ONLY by `assets:sync`, and only after every changed
 * file has been uploaded and confirmed with HeadObject, so a committed manifest never names a file
 * that is not in S3.
 *
 * Identity of a remote object is its full-file SHA-256, stored as user metadata `x-amz-meta-sha256`
 * at upload. It is read back with HeadObject — never inferred from ListObjectsV2, which returns no
 * user metadata, and never from the ETag, which is not a SHA-256 (and not an MD5 for multipart uploads).
 */
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readFileSync, writeFileSync, renameSync, statSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

/* fonts and brand stay in public/ and in git — never uploaded, downloaded or verified (local-only.cjs) */
export const { LOCAL_ONLY, isLocalOnly } = createRequire(import.meta.url)('./local-only.cjs');

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PUBLIC_DIR = path.join(ROOT, 'public');
export const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');
export const MANIFEST_FILE = 'assets.manifest.json';
export const MANIFEST_PATH = path.join(ROOT, MANIFEST_FILE);
export const CACHE_PATH = path.join(ROOT, '.assets-cache.json');

/* files that are never assets */
const IGNORED_NAMES = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini', '.gitkeep']);

// ---------------------------------------------------------------------------------------- env/config

/** Load `.env` then `.env.local` into process.env without overriding values already set. Values are
 *  never printed. A minimal KEY=VALUE parser — the same subset Next.js reads. */
export function loadEnv() {
  for (const name of ['.env.local', '.env']) {
    const file = path.join(ROOT, name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!m || line.trimStart().startsWith('#')) continue;
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (process.env[m[1]] === undefined) process.env[m[1]] = v;
    }
  }
}

export function config() {
  loadEnv();
  const prefix = (process.env.ASSETS_S3_PREFIX || '').trim().replace(/^\/+|\/+$/g, '');
  const cfg = {
    /* ASSETS_S3_* is the project's own name; AWS_S3_* is the name DevOps hands over — accepted as a
       fallback so either spelling works without renaming anything */
    bucket: (process.env.ASSETS_S3_BUCKET || process.env.AWS_S3_BUCKET || '').trim(),
    region: (process.env.ASSETS_S3_REGION || process.env.AWS_S3_REGION || process.env.AWS_REGION || '').trim(),
    prefix,
    /* S3-compatible endpoint (LocalStack/MinIO or a test server). Unset for real AWS. */
    endpoint: (process.env.ASSETS_S3_ENDPOINT || '').trim(),
    cdnBase: (process.env.NEXT_PUBLIC_ASSET_BASE_URL || '').trim().replace(/\/+$/, ''),
    cacheControl: (process.env.ASSETS_CACHE_CONTROL || 'public, max-age=604800').trim(),
  };
  /* Where visitors fetch an asset: NEXT_PUBLIC_ASSET_BASE_URL when set, otherwise the bucket's own public
     virtual-hosted HTTPS endpoint (https://<bucket>.s3.<region>.amazonaws.com) — assets are served
     straight from S3, with no CDN in front. Used only by the public-URL checks in verify/download. */
  cfg.publicBase = cfg.cdnBase || (cfg.bucket && cfg.region && !cfg.endpoint
    ? `https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com` : '');
  return cfg;
}

/** The public HTTPS URL of one asset, every path segment percent-encoded. */
export const publicUrl = (cfg, rel) => `${cfg.publicBase}/${keyFor(cfg, rel).split('/').map(encodeURIComponent).join('/')}`;

export function requireBucket(cfg, what) {
  if (!cfg.bucket || !cfg.region) {
    fail(`${what} needs ASSETS_S3_BUCKET and ASSETS_S3_REGION (or AWS_S3_BUCKET / AWS_S3_REGION), in .env.local ` +
      'or your shell. AWS credentials come from the SDK\'s default chain: AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY ' +
      'in the git-ignored .env.local or your shell, or an AWS profile (AWS_PROFILE) — never from a committed file.');
  }
}

export const keyFor = (cfg, rel) => (cfg.prefix ? `${cfg.prefix}/${rel}` : rel);

// ---------------------------------------------------------------------------------------- output

export function fail(msg, code = 1) {
  console.error(`\n[assets] ERROR: ${msg}\n`);
  process.exit(code);
}
export const log = (...a) => console.log('[assets]', ...a);
export const fmtBytes = (n) => (n >= 1 << 30 ? `${(n / (1 << 30)).toFixed(2)} GB` : n >= 1 << 20 ? `${(n / (1 << 20)).toFixed(1)} MB` : n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`);

export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (const a of argv) {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    if (m) out[m[1]] = m[2] === undefined ? true : m[2];
    else out._.push(a);
  }
  return out;
}

// ---------------------------------------------------------------------------------------- files

/** Every file under public/assets as `assets/...` relative paths (sorted, `/` separators). */
export async function walkAssets(sub = '') {
  const start = path.join(ASSETS_DIR, sub);
  const out = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch (e) {
      if (e.code === 'ENOENT') return;
      throw e;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && !IGNORED_NAMES.has(e.name)) {
        const rel = path.relative(PUBLIC_DIR, full).split(path.sep).join('/');
        if (!isLocalOnly(rel)) out.push(rel);
      }
    }
  }
  await walk(start);
  return out.sort();
}

export const localPath = (rel) => path.join(PUBLIC_DIR, ...rel.split('/'));

export function sha256File(file) {
  return new Promise((resolve, reject) => {
    const h = createHash('sha256');
    createReadStream(file).on('error', reject).on('data', (d) => h.update(d)).on('end', () => resolve(h.digest('hex')));
  });
}

/** Local hash cache keyed by path -> [size, mtimeMs, sha256]. Local-only (gitignored); it only saves
 *  re-hashing unchanged files, it is never trusted for anything remote. */
export function loadCache() {
  try {
    return JSON.parse(readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}
export function saveCache(cache) {
  atomicWrite(CACHE_PATH, JSON.stringify(cache));
}

/** Hash every path (stat-checked against the cache), `concurrency` at a time.
 *  Returns { rel: [size, sha] }. Missing files are skipped. */
export async function hashAll(rels, cache, { concurrency = 8, onProgress } = {}) {
  const result = {};
  let done = 0;
  await pool(rels, concurrency, async (rel) => {
    const file = localPath(rel);
    let st;
    try {
      st = await stat(file);
    } catch {
      return;
    }
    const c = cache[rel];
    let sha;
    if (c && c[0] === st.size && c[1] === st.mtimeMs) sha = c[2];
    else {
      sha = await sha256File(file);
      cache[rel] = [st.size, st.mtimeMs, sha];
    }
    result[rel] = [st.size, sha];
    done += 1;
    if (onProgress && done % 500 === 0) onProgress(done, rels.length);
  });
  return result;
}

/** Fast change detection without hashing: paths whose size/mtime differ from the cache. */
export function statChanged(rels, cache) {
  const out = [];
  for (const rel of rels) {
    const c = cache[rel];
    try {
      const st = statSync(localPath(rel));
      if (!c || c[0] !== st.size || c[1] !== st.mtimeMs) out.push(rel);
    } catch {
      /* deleted */
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------- manifest

export function parseManifest(text) {
  if (text == null) return null;
  const json = JSON.parse(text);
  if (!json || json.version !== 1 || typeof json.files !== 'object') throw new Error(`${MANIFEST_FILE} is not a version-1 manifest`);
  /* a manifest written before a folder became local-only may still list it — never treat those as S3 objects */
  const files = {};
  for (const [rel, v] of Object.entries(json.files)) if (!isLocalOnly(rel)) files[rel] = v;
  return files;
}

export function readManifest() {
  if (!existsSync(MANIFEST_PATH)) return null;
  return parseManifest(readFileSync(MANIFEST_PATH, 'utf8'));
}

/** The manifest as committed at a git revision (null when that revision has none). */
export function manifestAt(rev) {
  try {
    const text = execFileSync('git', ['show', `${rev}:${MANIFEST_FILE}`], { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    return parseManifest(text);
  } catch {
    return null;
  }
}

/** One entry per line, sorted — so a changed asset is a one-line diff in review. No timestamp. */
export function writeManifest(files) {
  const keys = Object.keys(files).sort();
  const body = keys.map((k) => `    ${JSON.stringify(k)}: [${files[k][0]}, ${JSON.stringify(files[k][1])}]`).join(',\n');
  atomicWrite(MANIFEST_PATH, `{\n  "version": 1,\n  "files": {\n${body}\n  }\n}\n`);
}

/** Entries of `next` that are new or differ (size or sha) from `prev`. */
export function changedEntries(prev, next) {
  const out = [];
  for (const [rel, v] of Object.entries(next || {})) {
    const p = prev?.[rel];
    if (!p || p[0] !== v[0] || p[1] !== v[1]) out.push(rel);
  }
  return out.sort();
}

function atomicWrite(file, text) {
  const tmp = `${file}.tmp-${process.pid}`;
  writeFileSync(tmp, text);
  renameSync(tmp, file);
}

// ---------------------------------------------------------------------------------------- headers

const TYPES = {
  png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', avif: 'image/avif', gif: 'image/gif',
  svg: 'image/svg+xml', ico: 'image/x-icon', mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime',
  pdf: 'application/pdf', woff2: 'font/woff2', woff: 'font/woff', ttf: 'font/ttf', otf: 'font/otf',
  js: 'text/javascript; charset=utf-8', mjs: 'text/javascript; charset=utf-8', css: 'text/css; charset=utf-8',
  json: 'application/json', txt: 'text/plain; charset=utf-8', xml: 'application/xml',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ai: 'application/postscript',
  eps: 'application/postscript', zip: 'application/zip',
};
export const contentTypeFor = (rel) => TYPES[rel.split('.').pop().toLowerCase()] || 'application/octet-stream';

/**
 * Files the site offers as downloads get `Content-Disposition: attachment` — a browser ignores the
 * `download` attribute on a cross-origin link, so the header has to come from the object itself.
 * Source formats that browsers cannot display are always attachments. More rules are added here when
 * the download links are switched over (Batch 4); changing a rule re-uploads only the affected files
 * on the next sync with `--refresh-headers`.
 */
const ATTACHMENT_EXT = new Set(['ai', 'eps', 'xlsx', 'zip']);
export function dispositionFor(rel) {
  const ext = rel.split('.').pop().toLowerCase();
  if (!ATTACHMENT_EXT.has(ext)) return undefined;
  const name = rel.split('/').pop();
  const ascii = name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
  return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
}

/** The headers an object for `rel` must carry (compared by `assets:verify --headers` / `--cdn`). */
export const headersFor = (cfg, rel) => ({
  ContentType: contentTypeFor(rel),
  CacheControl: cfg.cacheControl,
  ContentDisposition: dispositionFor(rel),
});

// ---------------------------------------------------------------------------------------- S3

let s3mod;
export async function s3Client(cfg) {
  s3mod = s3mod || (await import('@aws-sdk/client-s3'));
  return new s3mod.S3Client({
    region: cfg.region,
    ...(cfg.endpoint ? { endpoint: cfg.endpoint, forcePathStyle: true } : {}),
    /* one attempt per call: `retry()` below is the only retry layer (3 attempts, exponential
       back-off) — stacking it on the SDK's own retries would multiply into ~9 attempts per file */
    maxAttempts: 1,
  });
}
export const S3 = () => s3mod;
export async function loadS3() {
  s3mod = s3mod || (await import('@aws-sdk/client-s3'));
  return s3mod;
}

/** HeadObject -> { size, sha, contentType, cacheControl, contentDisposition } or null when absent. */
export async function headObject(client, cfg, rel) {
  const { HeadObjectCommand } = await loadS3();
  try {
    const r = await client.send(new HeadObjectCommand({ Bucket: cfg.bucket, Key: keyFor(cfg, rel) }));
    return {
      size: r.ContentLength,
      sha: r.Metadata?.sha256 || null,
      contentType: r.ContentType,
      cacheControl: r.CacheControl,
      contentDisposition: r.ContentDisposition,
    };
  } catch (e) {
    if (e?.$metadata?.httpStatusCode === 404 || e?.name === 'NotFound' || e?.name === 'NoSuchKey') return null;
    throw e;
  }
}

/** Existing keys and sizes under the prefix (ListObjectsV2). Used ONLY to skip HeadObject for keys
 *  that do not exist yet — never as checksum evidence. */
export async function listKeys(client, cfg) {
  const { ListObjectsV2Command } = await loadS3();
  const out = new Map();
  let token;
  const Prefix = keyFor(cfg, 'assets/');
  do {
    const r = await client.send(new ListObjectsV2Command({ Bucket: cfg.bucket, Prefix, ContinuationToken: token }));
    for (const o of r.Contents || []) out.set(cfg.prefix ? o.Key.slice(cfg.prefix.length + 1) : o.Key, o.Size);
    token = r.IsTruncated ? r.NextContinuationToken : undefined;
  } while (token);
  return out;
}

// ---------------------------------------------------------------------------------------- async

export async function pool(items, concurrency, fn) {
  let i = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (i < items.length) {
      const item = items[i++];
      await fn(item);
    }
  });
  await Promise.all(workers);
}

export async function retry(fn, { attempts = 3, baseMs = 500, label = '' } = {}) {
  let last;
  for (let n = 0; n < attempts; n += 1) {
    try {
      return await fn(n);
    } catch (e) {
      last = e;
      /* credentials / permission problems will not fix themselves — stop at once */
      const status = e?.$metadata?.httpStatusCode;
      if (status === 403 || status === 401 || /credential/i.test(e?.name || '') || /credential/i.test(e?.message || '')) break;
      if (n < attempts - 1) await new Promise((r) => setTimeout(r, baseMs * 2 ** n));
    }
  }
  if (label && last) last.message = `${label}: ${last.message}`;
  throw last;
}

/** A readable one-line reason for an AWS error, without request ids or credentials. */
export function reason(e) {
  const status = e?.$metadata?.httpStatusCode;
  return `${e?.name || 'Error'}${status ? ` (HTTP ${status})` : ''}: ${String(e?.message || e).split('\n')[0]}`;
}

// ---------------------------------------------------------------------------------------- git

export function git(args, opts = {}) {
  return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 256 * 1024 * 1024, ...opts }).trim();
}
export function gitOk(args) {
  try {
    return git(args);
  } catch {
    return null;
  }
}

/** Where "changed" is measured from: the upstream branch, else origin/HEAD, else origin/main. */
export function defaultBase(head = 'HEAD') {
  for (const ref of ['@{upstream}', 'origin/HEAD', 'origin/main', 'origin/master']) {
    const sha = gitOk(['rev-parse', '--verify', '--quiet', ref]);
    if (sha) return gitOk(['merge-base', head === 'WORKTREE' ? 'HEAD' : head, sha]) || sha;
  }
  return null;
}
