'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { BTN_GHOST, BTN_SECONDARY, INPUT, MUTED, cx } from '@/components/News/Admin/ui';

/*
 * S3 Drive — a file browser over the atlas-web-cdn bucket (/admin/s3drive), laid out like cPanel's File
 * Manager: an icon toolbar, a path bar, a folder tree on the left, a selectable file table and a status bar.
 * Everyone with the tab: open folders, search the current folder, preview images, copy the S3 link and
 * (where the site serves the folder) the website link. Admins also: upload (drag and drop or the
 * button; any size — the browser PUTs straight to S3 with a presigned URL), new folder, delete file,
 * delete folder. The API enforces the same split.
 */

const API = '/admin/s3drive/api';
const IMG = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const CONCURRENCY = 3;

function fmtSize(n) {
  if (n == null) return '';
  if (n >= 1 << 30) return `${(n / (1 << 30)).toFixed(2)} GB`;
  if (n >= 1 << 20) return `${(n / (1 << 20)).toFixed(1)} MB`;
  if (n >= 1024) return `${Math.ceil(n / 1024)} KB`;
  return `${n} B`;
}
const fmtDate = (iso) => (iso ? new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '');
const enc = (key) => key.split('/').map(encodeURIComponent).join('/');
const baseName = (key) => key.replace(/\/$/, '').split('/').pop();
const noSubscribe = () => () => {};

/** One page of a folder listing from the API. */
async function getFolder(prefix, token = null) {
  const qs = new URLSearchParams({ prefix });
  if (token) qs.set('token', token);
  const r = await fetch(`${API}?${qs}`);
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Could not open this folder (${r.status}).`);
  return data;
}

async function api(body) {
  const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || `Request failed (${r.status}).`);
  return data;
}

/** PUT one file to a presigned URL, reporting progress (0..1). */
function putFile(url, headers, file, onProgress) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('PUT', url);
    Object.entries(headers || {}).forEach(([k, v]) => x.setRequestHeader(k, v));
    x.upload.onprogress = (e) => e.lengthComputable && onProgress(e.loaded / e.total);
    x.onload = () => (x.status >= 200 && x.status < 300 ? resolve() : reject(new Error(`S3 answered ${x.status}.`)));
    x.onerror = () => reject(new Error('The upload was blocked. The bucket needs a CORS rule allowing PUT from this website (see the S3 Drive setup note).'));
    x.send(file);
  });
}

function CopyButton({ text, label }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={cx(BTN_GHOST, 'h-8 px-2.5 text-[12.5px]')}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          window.prompt('Copy this link:', text);
        }
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      title={text}
    >
      {done ? 'Copied ✓' : label}
    </button>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-[#e0a106]" fill="currentColor" aria-hidden="true">
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h3.6c.6 0 1.2.25 1.6.7L12 6h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5v-11Z" />
    </svg>
  );
}
function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-none text-[#8a90a0]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" />
    </svg>
  );
}

const TB = {
  home: 'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
  up: 'M12 19V5M5 12l7-7 7 7',
  refresh: 'M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7ZM12 10v6M9 13h6',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z',
  view: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  open: 'M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
};

/* One cPanel-style toolbar button: an icon over a short label. */
function ToolBtn({ icon, label, onClick, disabled, title, done }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title || label}
      className="flex min-w-[64px] flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[12px] font-medium text-[#2b2f38] transition hover:bg-[#eef0f3] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={TB[icon]} />
      </svg>
      <span className="whitespace-nowrap">{done || label}</span>
    </button>
  );
}

/** Copy `text`, with a prompt() fallback where the clipboard API is not allowed. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    window.prompt('Copy this link:', text);
  }
}

const typeOf = (key) => {
  const m = /\.([a-z0-9]+)$/i.exec(key);
  return m ? `${m[1].toUpperCase()} file` : 'File';
};

export default function S3Drive({ isAdmin, canWrite = isAdmin, canDelete = false, root = '', bucket, s3Base, domainPrefixes, initialPrefix }) {
  /* `root` is where this person may go: '' (the whole bucket) for an admin, their own folder otherwise */
  const [prefix, setPrefix] = useState(() => {
    const p = (initialPrefix || '').replace(/^\/+/, '');
    return p && !p.endsWith('/') ? `${p}/` : p;
  });
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState([]); // [{ id, name, size, progress, state: 'waiting'|'uploading'|'done'|'error', error }]
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState(null); // a file key or a folder prefix
  const [copied, setCopied] = useState('');
  const [tree, setTree] = useState({}); // { prefix: [child folder prefixes] } for the left-hand tree
  const [openNodes, setOpenNodes] = useState(() => new Set());
  const [pathText, setPathText] = useState(null); // the path bar while it is being edited
  /* the site's own origin, for "website" links ('' while rendering on the server) */
  const origin = useSyncExternalStore(noSubscribe, () => window.location.origin, () => '');
  const inputRef = useRef(null);
  const seq = useRef(0);

  /* apply one fetched page (or its error) to the listing */
  const applyPage = useCallback((token, data, err) => {
    if (err) {
      setError(err.message);
      if (!token) { setFolders([]); setFiles([]); setNext(null); }
    } else {
      setFolders((prev) => (token ? [...prev, ...data.folders] : data.folders));
      if (!token) setTree((t) => ({ ...t, [data.prefix]: data.folders }));
      setFiles((prev) => (token ? [...prev, ...data.files] : data.files));
      setNext(data.next);
      setError('');
    }
    setLoading(false);
  }, []);

  const load = (p, token = null) => {
    setLoading(true);
    setError('');
    return getFolder(p, token).then((d) => applyPage(token, d), (e) => applyPage(token, null, e));
  };

  useEffect(() => {
    let current = true; // ignore a slow answer for a folder the user has already left
    getFolder(prefix).then((d) => current && applyPage(null, d), (e) => current && applyPage(null, null, e));
    const url = new URL(window.location.href);
    if (prefix) url.searchParams.set('prefix', prefix);
    else url.searchParams.delete('prefix');
    window.history.replaceState(null, '', url);
    return () => { current = false; };
  }, [prefix, applyPage]);

  const open = (p) => {
    setSearch('');
    setNotice('');
    setSelected(null);
    setPathText(null);
    if (p === prefix) { load(p); return; }
    setLoading(true);
    setError('');
    setFolders([]);
    setFiles([]);
    setNext(null);
    setPrefix(p);
  };

  const crumbs = useMemo(() => {
    const parts = prefix.split('/').filter(Boolean);
    return parts.map((name, i) => ({ name, prefix: `${parts.slice(0, i + 1).join('/')}/` }));
  }, [prefix]);

  /* the tree shows the bucket root and every folder on the way to the open one, plus any the user expands */
  const ancestors = useMemo(() => [root, ...crumbs.map((c) => c.prefix).filter((c) => c.length > root.length && c.startsWith(root))], [crumbs, root]);
  useEffect(() => {
    let live = true;
    for (const a of ancestors) {
      if (tree[a] === undefined) {
        getFolder(a).then((d) => live && setTree((t) => ({ ...t, [a]: d.folders })), () => {});
      }
    }
    return () => { live = false; };
  }, [ancestors, tree]);
  const isOpenNode = (p) => p === root || ancestors.includes(p) || openNodes.has(p);
  const toggleNode = (p) => {
    setOpenNodes((s0) => {
      const s1 = new Set(s0);
      if (s1.has(p)) s1.delete(p); else s1.add(p);
      return s1;
    });
    if (tree[p] === undefined) getFolder(p).then((d) => setTree((t) => ({ ...t, [p]: d.folders })), () => {});
  };

  const q = search.trim().toLowerCase();
  const shownFolders = q ? folders.filter((f) => baseName(f).toLowerCase().includes(q)) : folders;
  const shownFiles = q ? files.filter((f) => baseName(f.key).toLowerCase().includes(q)) : files;

  const s3Link = (key) => `${s3Base}/${enc(key)}`;
  const siteLink = (key) => (origin && domainPrefixes.some((p) => key.startsWith(p)) ? `${origin}/${enc(key)}` : null);

  /* ---------------------------------------------------------------- uploads (admin) */

  async function upload(list) {
    let chosen = Array.from(list || []).filter((f) => f && f.name);
    if (!chosen.length) return;
    const existing = new Set(files.map((f) => baseName(f.key)));
    let clash = chosen.filter((f) => existing.has(f.name));
    let skipped = '';
    if (clash.length && !canDelete) {
      /* replacing a file deletes its old version, and deleting is off: skip those, upload the rest */
      skipped = `${clash.length} file(s) not uploaded because a file with the same name is already in this folder (replacing is turned off). Rename them and upload again: ${clash.slice(0, 10).map((f) => f.name).join(', ')}${clash.length > 10 ? ', …' : ''}`;
      chosen = chosen.filter((f) => !existing.has(f.name));
      clash = [];
      if (!chosen.length) { setError(skipped); return; }
    }
    if (clash.length && !window.confirm(`${clash.length} file(s) already exist in this folder and will be replaced:\n\n${clash.slice(0, 10).map((f) => f.name).join('\n')}${clash.length > 10 ? '\n…' : ''}\n\nContinue?`)) return;
    const folderAtStart = prefix;
    const jobs = chosen.map((file) => ({ id: (seq.current += 1), name: file.name, size: file.size, progress: 0, state: 'waiting', file }));
    setQueue((qq) => [...qq.filter((j) => j.state !== 'done'), ...jobs.map((j) => ({ ...j, file: undefined }))]);
    const set = (id, patch) => setQueue((qq) => qq.map((j) => (j.id === id ? { ...j, ...patch } : j)));
    let i = 0;
    let ok = 0;
    async function worker() {
      while (i < jobs.length) {
        const job = jobs[i++];
        set(job.id, { state: 'uploading' });
        try {
          const key = `${folderAtStart}${job.file.name}`;
          const signed = await api({ action: 'presign', key, type: job.file.type || 'application/octet-stream', size: job.file.size });
          await putFile(signed.url, signed.headers, job.file, (p) => set(job.id, { progress: p }));
          await api({ action: 'uploaded', key: signed.key });
          set(job.id, { state: 'done', progress: 1 });
          ok += 1;
        } catch (e) {
          set(job.id, { state: 'error', error: e.message });
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, worker));
    /* refresh first, so the "already exists" check sees these files straight away */
    await load(folderAtStart);
    if (ok) setNotice(`Uploaded ${ok} file${ok === 1 ? '' : 's'}.`);
    if (skipped) setError(skipped);
  }

  async function newFolder() {
    const name = window.prompt('New folder name:');
    if (!name || !name.trim()) return;
    if (name.includes('/')) { setError('A folder name cannot contain "/". Create one folder at a time.'); return; }
    try {
      const r = await api({ action: 'mkdir', prefix: `${prefix}${name.trim()}/` });
      open(r.prefix);
      setNotice(`Created folder ${baseName(r.prefix)}.`);
    } catch (e) {
      setError(e.message);
    }
  }

  async function removeFile(key) {
    if (!window.confirm(`Delete this file? This cannot be undone.\n\n${key}`)) return;
    try {
      await api({ action: 'delete', key });
      setFiles((ff) => ff.filter((f) => f.key !== key));
      setNotice(`Deleted ${baseName(key)}.`);
    } catch (e) {
      setError(e.message);
    }
  }

  async function removeFolder(p) {
    try {
      setNotice('Counting files…');
      const s = await api({ action: 'stats', prefix: p });
      setNotice('');
      const typed = window.prompt(
        `Delete the folder "${baseName(p)}" and EVERYTHING inside it?\n\n${s.files} file(s), ${fmtSize(s.bytes)}\n${p}\n\nThis cannot be undone. Type DELETE to confirm.`,
      );
      if (typed !== 'DELETE') return;
      setNotice('Deleting…');
      const r = await api({ action: 'rmdir', prefix: p });
      setFolders((ff) => ff.filter((f) => f !== p));
      setNotice(`Deleted folder ${baseName(p)} (${r.removed} object${r.removed === 1 ? '' : 's'}).`);
    } catch (e) {
      setNotice('');
      setError(e.message);
    }
  }

  const busy = queue.some((j) => j.state === 'uploading' || j.state === 'waiting');

  /* ---------------------------------------------------------------- render */

  const selFile = files.find((f) => f.key === selected) || null;
  const selFolder = folders.includes(selected) ? selected : null;
  const flash = (what) => { setCopied(what); setTimeout(() => setCopied(''), 1500); };
  const parentRaw = crumbs.length > 1 ? crumbs[crumbs.length - 2].prefix : '';
  const parent = parentRaw.length < root.length ? root : parentRaw;
  const atRoot = prefix === root;

  const goPath = (raw) => {
    const t = String(raw || '').trim().replace(/^\/+/, '').replace(new RegExp(`^${bucket.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?`), '');
    const p = t && !t.endsWith('/') ? `${t}/` : t;
    if (!p.startsWith(root)) { setPathText(null); setError(`You can only open folders inside /${root}.`); return; }
    open(p);
  };

  const treeNode = (p, depth) => {
    const kids = tree[p];
    const isOpen = isOpenNode(p);
    const here = p === prefix;
    return (
      <li key={p}>
        <div className={cx('flex items-center rounded', here ? 'bg-[#e8ebf0] font-semibold text-[#14161a]' : 'hover:bg-[#f4f5f7]')} style={{ paddingLeft: depth * 12 }}>
          <button type="button" onClick={() => p !== root && toggleNode(p)} className={cx('flex h-6 w-5 flex-none items-center justify-center text-[#8a8f9b]', p === root && 'invisible')} aria-label={isOpen ? 'Collapse' : 'Expand'}>
            <svg viewBox="0 0 24 24" className={cx('h-3 w-3 transition', isOpen && 'rotate-90')} fill="currentColor" aria-hidden="true"><path d="M9 6l6 6-6 6z" /></svg>
          </button>
          <button type="button" onClick={() => open(p)} className="flex min-w-0 flex-1 items-center gap-1.5 py-1 pr-2 text-left text-[13px]">
            {p === root ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4 flex-none text-[#5b6170]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={TB.home} /></svg>
            ) : <FolderIcon />}
            <span className="truncate">{p === '' ? bucket : p === root ? p.replace(/\/$/, '') : baseName(p)}</span>
          </button>
        </div>
        {isOpen && kids?.length ? (
          <ul>{kids.map((k) => treeNode(k, depth + 1))}</ul>
        ) : null}
      </li>
    );
  };

  return (
    <div
      className={cx('relative overflow-hidden rounded-md bg-white ring-1 ring-[#e3e5ea]', dragging && 'ring-2 ring-[#14161a]')}
      onDragOver={canWrite ? (e) => { e.preventDefault(); setDragging(true); } : undefined}
      onDragLeave={canWrite ? (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); } : undefined}
      onDrop={canWrite ? (e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files); } : undefined}
    >
      {/* toolbar — the actions act on the current folder or on the selected row */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#e3e5ea] bg-[#fafbfc] px-2 py-1">
        {canWrite ? (
          <>
            <ToolBtn icon="folder" label="+ Folder" onClick={newFolder} />
            <ToolBtn icon="upload" label="Upload" onClick={() => inputRef.current?.click()} />
            <input ref={inputRef} type="file" multiple hidden onChange={(e) => { upload(e.target.files); e.target.value = ''; }} />
            <span className="mx-1 h-8 w-px bg-[#e3e5ea]" aria-hidden="true" />
          </>
        ) : null}
        <ToolBtn icon="view" label="View" disabled={!selFile} title={selFile ? `View ${baseName(selFile.key)}` : 'Select a file first'}
          onClick={() => selFile && (IMG.test(selFile.key) ? setPreview(selFile.key) : window.open(s3Link(selFile.key), '_blank', 'noopener'))} />
        <ToolBtn icon="link" label="S3 link" done={copied === 's3' ? 'Copied ✓' : ''} disabled={!selFile} title={selFile ? 'Copy S3 link' : 'Select a file first'}
          onClick={async () => { if (selFile) { await copyText(s3Link(selFile.key)); flash('s3'); } }} />
        <ToolBtn icon="globe" label="Website link" done={copied === 'site' ? 'Copied ✓' : ''} disabled={!selFile || !siteLink(selFile.key)}
          title={!selFile ? 'Select a file first' : siteLink(selFile.key) ? 'Copy website link' : 'This folder is not served on the website domain'}
          onClick={async () => { const l = selFile && siteLink(selFile.key); if (l) { await copyText(l); flash('site'); } }} />
        <ToolBtn icon="open" label="Open" disabled={!selFile && !selFolder} title="Open the selected folder or file"
          onClick={() => (selFolder ? open(selFolder) : selFile && window.open(s3Link(selFile.key), '_blank', 'noopener'))} />
        {canWrite && canDelete ? (
          <ToolBtn icon="trash" label="Delete" disabled={!selFile && !selFolder} onClick={() => (selFolder ? removeFolder(selFolder) : selFile && removeFile(selFile.key))} />
        ) : null}
        <div className="ml-auto flex items-center gap-2 py-1">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search this folder"
            aria-label="Search this folder"
            className={cx(INPUT, 'h-8 w-[200px] py-1 text-[13px] sm:w-[240px]')}
          />
        </div>
      </div>

      {/* path bar — Home / Up One Level / Refresh, and the path itself (type a path and press Go) */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#e3e5ea] px-2 py-1.5">
        <button type="button" className={cx(BTN_GHOST, 'h-8 px-2 text-[13px]')} onClick={() => open(root)} title={root ? 'Go to your folder' : 'Go to the bucket root'}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={TB.home} /></svg>Home
        </button>
        <button type="button" className={cx(BTN_GHOST, 'h-8 px-2 text-[13px]')} onClick={() => open(parent)} disabled={atRoot} title="Up one level">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={TB.up} /></svg>Up One Level
        </button>
        <button type="button" className={cx(BTN_GHOST, 'h-8 px-2 text-[13px]')} onClick={() => load(prefix)} disabled={loading} title="Reload this folder">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={TB.refresh} /></svg>Reload
        </button>
        <form
          className="flex min-w-[220px] flex-1 items-center gap-1"
          onSubmit={(e) => { e.preventDefault(); goPath(pathText ?? prefix); }}
        >
          <label className="sr-only" htmlFor="s3drive-path">Folder path</label>
          <div className="flex h-8 min-w-0 flex-1 items-center rounded-md border border-[#d6d9e0] bg-white pl-2 text-[13px] focus-within:border-[#14161a]">
            <span className="flex-none text-[#8a8f9b]">/{bucket}/</span>
            <input
              id="s3drive-path"
              value={pathText ?? prefix}
              onChange={(e) => setPathText(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setPathText(null)}
              className="h-full min-w-0 flex-1 bg-transparent px-1 outline-none"
              spellCheck={false}
            />
          </div>
          <button type="submit" className={cx(BTN_SECONDARY, 'h-8 px-3 text-[13px]')}>Go</button>
        </form>
      </div>

      {notice ? <p role="status" className="border-b border-[#e3e5ea] bg-[#eef8f0] px-3 py-1.5 text-[13.5px] text-[#1f6b35]">{notice}</p> : null}
      {error ? (
        <p role="alert" className="flex items-start justify-between gap-3 border-b border-[#e3e5ea] bg-[#fdecea] px-3 py-1.5 text-[13.5px] text-[#b42318]">
          <span>{error}</span>
          <button type="button" className="font-semibold" onClick={() => setError('')} aria-label="Dismiss">×</button>
        </p>
      ) : null}

      {/* upload queue */}
      {queue.length ? (
        <div className="border-b border-[#e3e5ea] px-3 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.05em] text-[#5b6170]">Uploads</p>
            {!busy ? <button type="button" className="text-[13px] text-[#5b6170] hover:underline" onClick={() => setQueue([])}>Clear</button> : null}
          </div>
          <ul className="grid gap-1.5 lg:grid-cols-2">
            {queue.map((j) => (
              <li key={j.id} className="text-[13px]">
                <div className="flex justify-between gap-3">
                  <span className="truncate">{j.name}</span>
                  <span className={cx('flex-none', j.state === 'error' ? 'text-[#b42318]' : j.state === 'done' ? 'text-[#1f6b35]' : 'text-[#5b6170]')}>
                    {j.state === 'done' ? 'Done ✓' : j.state === 'error' ? 'Failed' : j.state === 'waiting' ? 'Waiting' : `${Math.round(j.progress * 100)}%`} · {fmtSize(j.size)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#eef0f3]">
                  <div className={cx('h-full transition-[width]', j.state === 'error' ? 'bg-[#e5484d]' : 'bg-[#14161a]')} style={{ width: `${Math.round(j.progress * 100)}%` }} />
                </div>
                {j.error ? <p className="mt-1 text-[12.5px] text-[#b42318]">{j.error}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex min-h-[420px]">
        {/* folder tree */}
        <aside className="hidden w-[240px] flex-none overflow-y-auto border-r border-[#e3e5ea] bg-[#fafbfc] p-2 lg:block lg:max-h-[calc(100dvh-260px)]" aria-label="Folder tree">
          <ul>{treeNode(root, 0)}</ul>
        </aside>

        {/* file table */}
        <div className="min-w-0 flex-1 overflow-x-auto">
          <table className="w-full border-collapse text-[13.5px] sm:min-w-[560px]">
            <thead>
              <tr className="sticky top-0 border-b border-[#e3e5ea] bg-[#f4f5f7] text-left text-[12.5px] font-semibold text-[#5b6170]">
                <th className="px-3 py-1.5 font-semibold">Name</th>
                <th className="w-[100px] px-3 py-1.5 text-right font-semibold">Size</th>
                <th className="hidden w-[170px] px-3 py-1.5 font-semibold sm:table-cell">Last Modified</th>
                <th className="hidden w-[110px] px-3 py-1.5 font-semibold sm:table-cell">Type</th>
              </tr>
            </thead>
            <tbody>
              {!atRoot ? (
                <tr className="cursor-pointer border-b border-[#eef0f3] hover:bg-[#f4f5f7]" onClick={() => open(parent)}>
                  <td className="px-3 py-1.5" colSpan={4}>
                    <span className="flex items-center gap-2 text-[#5b6170]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d={TB.up} /></svg>
                      Up One Level
                    </span>
                  </td>
                </tr>
              ) : null}
              {loading && !folders.length && !files.length ? (
                <tr><td colSpan={4} className={cx(MUTED, 'px-3 py-6')}>Loading…</td></tr>
              ) : null}
              {!loading && !error && !shownFolders.length && !shownFiles.length ? (
                <tr><td colSpan={4} className={cx(MUTED, 'px-3 py-6')}>{q ? 'Nothing in this folder matches your search.' : canWrite ? 'This folder is empty. Upload files or drop them here.' : 'This folder is empty.'}</td></tr>
              ) : null}
              {shownFolders.map((f) => (
                <tr
                  key={f}
                  aria-selected={selected === f}
                  onClick={() => setSelected(f)}
                  onDoubleClick={() => open(f)}
                  className={cx('cursor-pointer border-b border-[#eef0f3]', selected === f ? 'bg-[#e8ebf0]' : 'hover:bg-[#f7f8fa]')}
                >
                  <td className="px-3 py-1.5">
                    <button type="button" onClick={(e) => { e.stopPropagation(); open(f); }} className="flex min-w-0 items-center gap-2 text-left font-medium hover:underline">
                      <FolderIcon /><span className="truncate">{baseName(f)}</span>
                    </button>
                  </td>
                  <td className="px-3 py-1.5 text-right text-[#8a8f9b]">—</td>
                  <td className="hidden px-3 py-1.5 text-[#8a8f9b] sm:table-cell">—</td>
                  <td className="hidden px-3 py-1.5 text-[#5b6170] sm:table-cell">Folder</td>
                </tr>
              ))}
              {shownFiles.map((f) => {
                const isImg = IMG.test(f.key);
                return (
                  <tr
                    key={f.key}
                    aria-selected={selected === f.key}
                    onClick={() => setSelected(f.key)}
                    onDoubleClick={() => (isImg ? setPreview(f.key) : window.open(s3Link(f.key), '_blank', 'noopener'))}
                    className={cx('cursor-pointer border-b border-[#eef0f3]', selected === f.key ? 'bg-[#e8ebf0]' : 'hover:bg-[#f7f8fa]')}
                  >
                    <td className="px-3 py-1.5">
                      <span className="flex min-w-0 items-center gap-2">
                        {isImg ? (
                          <button type="button" onClick={(e) => { e.stopPropagation(); setPreview(f.key); }} className="h-6 w-6 flex-none overflow-hidden rounded border border-[#e3e5ea] bg-[#f4f5f7]" aria-label={`Preview ${baseName(f.key)}`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={s3Link(f.key)} alt="" loading="lazy" className="h-full w-full object-cover" />
                          </button>
                        ) : <FileIcon />}
                        <span className="truncate">{baseName(f.key)}</span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-1.5 text-right text-[#5b6170]">{fmtSize(f.size)}</td>
                    <td className="hidden whitespace-nowrap px-3 py-1.5 text-[#5b6170] sm:table-cell">{fmtDate(f.modified)}</td>
                    <td className="hidden px-3 py-1.5 text-[#5b6170] sm:table-cell">{typeOf(f.key)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {next ? (
            <div className="border-t border-[#eef0f3] py-2 text-center">
              <button type="button" className={cx(BTN_SECONDARY, 'h-8 text-[13px]')} onClick={() => load(prefix, next)} disabled={loading}>{loading ? 'Loading…' : 'Load more'}</button>
            </div>
          ) : null}
        </div>
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e3e5ea] bg-[#fafbfc] px-3 py-1.5 text-[12.5px] text-[#5b6170]">
        <span>
          {shownFolders.length} folder{shownFolders.length === 1 ? '' : 's'}, {shownFiles.length} file{shownFiles.length === 1 ? '' : 's'}
          {next ? ' (more to load)' : ''}
          {selFile ? ` · Selected: ${baseName(selFile.key)} (${fmtSize(selFile.size)})` : selFolder ? ` · Selected: ${baseName(selFolder)}/` : ''}
        </span>
        {canWrite ? <span>Tip: drag files here to upload into <b>/{prefix}</b>. Double-click to open.</span> : <span>Double-click to open.</span>}
      </div>

      {dragging ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-white/85 text-[16px] font-semibold">
          Drop to upload into {prefix || 'the bucket root'}
        </div>
      ) : null}

      {preview ? (
        <div role="dialog" aria-modal="true" aria-label="Image preview" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreview(null)}>
          <div className="max-h-full max-w-[900px] rounded-md bg-white p-3" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s3Link(preview)} alt={baseName(preview)} className="max-h-[70vh] w-auto rounded" />
            <p className="mt-2 break-all text-[13px]">{preview}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <CopyButton text={s3Link(preview)} label="Copy S3 link" />
              {siteLink(preview) ? <CopyButton text={siteLink(preview)} label="Copy website link" /> : null}
              <button type="button" className={cx(BTN_SECONDARY, 'ml-auto h-8')} onClick={() => setPreview(null)}>Close</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
