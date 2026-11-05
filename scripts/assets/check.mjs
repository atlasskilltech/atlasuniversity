/**
 * Verification shared by `assets:verify`, the pre-push hook and the GitHub Actions workflow.
 *
 *   verifyRemote()  HeadObject per manifest entry: present, same size, same x-amz-meta-sha256
 *                   (optionally the same Content-Type / Cache-Control / Content-Disposition)
 *   scanRefs()      every `/assets/…` path written in app/, components/ and lib/ (at a revision or
 *                   in the working tree) must be listed in the manifest
 */
import { readdir, readFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';
import { existsSync } from 'node:fs';
import {
  ROOT, keyFor, headersFor, headObject, pool, retry, reason, isLocalOnly, LOCAL_ONLY,
} from './lib.mjs';

/* Local-only files (fonts, brand) are not in the manifest: a reference to one must exist in public/
   instead — on disk for the working tree, in git for a revision. */
function localFilesAt(rev) {
  if (rev === 'WORKTREE') return null;
  try {
    const out = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', rev, '--', ...LOCAL_ONLY.map((p) => `public/${p}`)],
      { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
    return new Set(out.split('\0').filter(Boolean).map((f) => f.slice('public/'.length)));
  } catch {
    return new Set();
  }
}

const CODE_DIRS = ['app', 'components', 'lib'];
const CODE_EXT = /\.(?:m?js|jsx|css)$/;

// ------------------------------------------------------------------------------------------ remote

export async function verifyRemote(client, cfg, manifest, rels, { headers = false, concurrency = 16 } = {}) {
  const problems = [];
  await pool(rels, concurrency, async (rel) => {
    const [size, sha] = manifest[rel];
    try {
      const h = await retry(() => headObject(client, cfg, rel), { label: 'HeadObject' });
      if (!h) return problems.push([rel, 'missing in S3']);
      if (h.size !== size) return problems.push([rel, `size ${h.size} in S3, ${size} in manifest`]);
      if (!h.sha) return problems.push([rel, 'no x-amz-meta-sha256 on the object (not uploaded by assets:sync)']);
      if (h.sha !== sha) return problems.push([rel, 'SHA-256 in S3 differs from the manifest']);
      if (headers) {
        const w = headersFor(cfg, rel);
        if (h.contentType !== w.ContentType) problems.push([rel, `Content-Type "${h.contentType}", expected "${w.ContentType}"`]);
        if (h.cacheControl !== w.CacheControl) problems.push([rel, `Cache-Control "${h.cacheControl}", expected "${w.CacheControl}"`]);
        if ((h.contentDisposition || undefined) !== w.ContentDisposition) problems.push([rel, `Content-Disposition "${h.contentDisposition || ''}", expected "${w.ContentDisposition || ''}"`]);
      }
    } catch (e) {
      problems.push([rel, reason(e)]);
    }
    return undefined;
  });
  return problems.sort((a, b) => a[0].localeCompare(b[0]));
}

// ------------------------------------------------------------------------------------------ refs

const LITERAL = /(["'`])((?:(?!\1)[^\\\n]|\\.)*?\/assets\/(?:(?!\1)[^\\\n]|\\.)*?)\1/g;
const CSS_URL = /url\(\s*(\/assets\/[^)'"\s]+)\s*\)/g;
const CUT = /[\s'"`)\]]/;

/**
 * Source text with comments removed (strings and template literals kept), so paths quoted inside a
 * comment — e.g. notes about the PHP reference — are not mistaken for references. A small scanner
 * rather than a regex: it follows quotes so `//` inside a URL string is not taken as a comment.
 */
export function stripComments(text) {
  const NL = '\n';
  const BS = String.fromCharCode(92); // backslash
  let out = '';
  let i = 0;
  const n = text.length;
  while (i < n) {
    const c = text[i];
    const d = text[i + 1];
    if (c === '/' && d === '/') {
      while (i < n && text[i] !== NL) i += 1;
    } else if (c === '/' && d === '*') {
      i += 2;
      while (i < n && !(text[i] === '*' && text[i + 1] === '/')) {
        if (text[i] === NL) out += NL;
        i += 1;
      }
      i += 2;
    } else if (c === '"' || c === "'" || c === '`') {
      const q = c;
      out += c;
      i += 1;
      while (i < n && text[i] !== q) {
        if (text[i] === BS) {
          out += text[i] + (text[i + 1] ?? '');
          i += 2;
        } else {
          if (q !== '`' && text[i] === NL) break; // unterminated: stop at the end of the line
          out += text[i];
          i += 1;
        }
      }
      if (i < n && text[i] === q) {
        out += q;
        i += 1;
      }
    } else {
      out += c;
      i += 1;
    }
  }
  return out;
}

/* a `/assets/` occurrence preceded by one of these is part of another URL or path, not a site path */
const URL_CHAR_BEFORE = /[\w.~%:/@-]/;

/** Asset paths written in one source text. `${…}` templates are reported as dynamic, not guessed. */
export function extractRefs(text, manifest, out, dynamic) {
  const consider = (literal) => {
    if (literal.includes('${')) {
      if (/\/assets\/[^$]*\$\{/.test(literal)) dynamic.add(literal);
      return;
    }
    /* a srcset is split into candidates first; a className string may hold several url(/assets/…) */
    for (const part of literal.split(/,\s+(?=\/assets\/)/)) {
      let from = 0;
      for (;;) {
        const i = part.indexOf('/assets/', from);
        if (i === -1) break;
        if (i > 0 && URL_CHAR_BEFORE.test(part[i - 1])) {
          from = i + 1;
          continue;
        }
        const rest = part.slice(i);
        /* a whole value with a space in its filename: accept it when it is exactly a manifest entry */
        const whole = rest.replace(/\s+\d+(?:\.\d+)?[wx]\s*$/, '').trim();
        let ref;
        if (manifest && manifest[whole.slice(1)]) ref = whole;
        else {
          const cut = rest.search(CUT);
          ref = cut === -1 ? rest : rest.slice(0, cut);
        }
        from = i + Math.max(ref.length, 1);
        ref = ref.replace(/[?#].*$/, '');
        if (ref.length > '/assets/'.length && !ref.endsWith('/')) out.add(ref);
      }
    }
  };
  for (const m of text.matchAll(LITERAL)) consider(m[2]);
  for (const m of text.matchAll(CSS_URL)) consider(m[1]);
}

async function worktreeFiles() {
  const out = [];
  async function walk(dir) {
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (CODE_EXT.test(e.name)) out.push(full);
    }
  }
  for (const d of CODE_DIRS) await walk(path.join(ROOT, d));
  return out;
}

/* `git grep -l <pattern> <rev> -- app components lib` -> "<rev>:<path>" lines ('' when none) */
function grepAt(rev, pattern) {
  try {
    return execFileSync('git', ['grep', '-I', '-l', '-F', pattern, rev, '--', ...CODE_DIRS], {
      cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch (e) {
    if (e.status === 1) return ''; // no matches
    throw e;
  }
}

/* contents of <rev>:<path> for each path, through one `git cat-file --batch` process */
function catFiles(rev, files) {
  if (!files.length) return [];
  const r = spawnSync('git', ['cat-file', '--batch'], {
    cwd: ROOT, input: `${files.map((f) => `${rev}:${f}`).join('\n')}\n`, maxBuffer: 1024 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`git cat-file failed (${r.status})`);
  const buf = r.stdout;
  const out = [];
  let pos = 0;
  while (pos < buf.length) {
    const nl = buf.indexOf(10, pos);
    if (nl === -1) break;
    const header = buf.subarray(pos, nl).toString('utf8').split(' ');
    pos = nl + 1;
    if (header[1] === 'missing') continue;
    const size = Number(header[2]);
    out.push(buf.subarray(pos, pos + size).toString('utf8'));
    pos += size + 1; // content + trailing newline
  }
  return out;
}

/** Referenced paths at `rev` ('WORKTREE' = files on disk) that are not in `manifest`. */
export async function scanRefs(manifest, rev = 'WORKTREE') {
  const refs = new Set();
  const dynamic = new Set();
  if (rev === 'WORKTREE') {
    for (const f of await worktreeFiles()) {
      if (path.relative(ROOT, f).split(path.sep).join('/') === 'lib/asset.js') continue;
      extractRefs(stripComments(await readFile(f, 'utf8')), manifest, refs, dynamic);
    }
  } else {
    /* the files at <rev> that mention /assets/, read whole through ONE `git cat-file --batch`
       process, so comments are stripped exactly as in the working-tree scan */
    const files = grepAt(rev, '/assets/').split('\n').map((l) => l.trim()).filter(Boolean)
      .map((l) => l.slice(l.indexOf(':') + 1))
      .filter((f) => CODE_EXT.test(f) && f !== 'lib/asset.js');
    for (const text of catFiles(rev, files)) extractRefs(stripComments(text), manifest, refs, dynamic);
  }
  const keys = Object.keys(manifest);
  const isFolder = (rel) => keys.some((k) => k.startsWith(`${rel}/`));
  const missing = [];
  const bases = [];
  const localAtRev = localFilesAt(rev);
  const localExists = (rel) => {
    const names = [rel];
    try { names.push(decodeURI(rel)); } catch { /* keep the raw name */ }
    return names.some((n) => (localAtRev ? localAtRev.has(n) : existsSync(path.join(ROOT, 'public', ...n.split('/')))));
  };
  const localFolder = (rel) => (localAtRev
    ? [...localAtRev].some((f) => f.startsWith(`${rel}/`))
    : existsSync(path.join(ROOT, 'public', ...rel.split('/'))));
  let local = 0;
  for (const r of [...refs].sort()) {
    const rel = r.slice(1);
    if (isLocalOnly(rel)) {
      local += 1;
      if (localExists(rel)) continue;
      if (localFolder(rel)) bases.push(r);
      else missing.push(r);
      continue;
    }
    let found = Boolean(manifest[rel]);
    if (!found) {
      try {
        found = Boolean(manifest[decodeURI(rel)]);
      } catch {
        found = false;
      }
    }
    if (found) continue;
    /* a folder written as a base that the component extends (`${base}/file.png`) — not a file */
    if (isFolder(rel)) bases.push(r);
    else missing.push(r);
  }
  return { total: refs.size, local, missing, bases, dynamic: [...dynamic] };
}

export { keyFor };
