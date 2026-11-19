'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { BTN_DANGER, BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, CARD, INPUT, MUTED, cx } from '@/components/News/Admin/ui';

/*
 * S3 Drive — a file browser over the atlas-web-cdn bucket (/admin/s3drive).
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

export default function S3Drive({ isAdmin, bucket, s3Base, domainPrefixes, initialPrefix }) {
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

  const q = search.trim().toLowerCase();
  const shownFolders = q ? folders.filter((f) => baseName(f).toLowerCase().includes(q)) : folders;
  const shownFiles = q ? files.filter((f) => baseName(f.key).toLowerCase().includes(q)) : files;

  const s3Link = (key) => `${s3Base}/${enc(key)}`;
  const siteLink = (key) => (origin && domainPrefixes.some((p) => key.startsWith(p)) ? `${origin}/${enc(key)}` : null);

  /* ---------------------------------------------------------------- uploads (admin) */

  async function upload(list) {
    const chosen = Array.from(list || []).filter((f) => f && f.name);
    if (!chosen.length) return;
    const existing = new Set(files.map((f) => baseName(f.key)));
    const clash = chosen.filter((f) => existing.has(f.name));
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

  return (
    <div
      className={cx(CARD, 'relative', dragging && 'ring-2 ring-[#14161a]')}
      onDragOver={isAdmin ? (e) => { e.preventDefault(); setDragging(true); } : undefined}
      onDragLeave={isAdmin ? (e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragging(false); } : undefined}
      onDrop={isAdmin ? (e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files); } : undefined}
    >
      {/* breadcrumbs */}
      <nav aria-label="Folder" className="mb-4 flex flex-wrap items-center gap-1 text-[14px]">
        <button type="button" onClick={() => open('')} className={cx('rounded px-1.5 py-0.5 font-semibold hover:bg-[#f4f5f7]', !prefix && 'text-[#14161a]')}>
          {bucket}
        </button>
        {crumbs.map((c) => (
          <span key={c.prefix} className="flex items-center gap-1">
            <span className="text-[#a0a5b1]">/</span>
            <button type="button" onClick={() => open(c.prefix)} className="rounded px-1.5 py-0.5 hover:bg-[#f4f5f7]">{c.name}</button>
          </span>
        ))}
      </nav>

      {/* toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search this folder"
          aria-label="Search this folder"
          className={cx(INPUT, 'h-10 max-w-[280px] flex-1')}
        />
        <div className="ml-auto flex flex-wrap gap-2">
          {prefix ? (
            <button type="button" className={BTN_SECONDARY} onClick={() => open(crumbs.length > 1 ? crumbs[crumbs.length - 2].prefix : '')}>↑ Up</button>
          ) : null}
          <button type="button" className={BTN_SECONDARY} onClick={() => load(prefix)} disabled={loading}>Refresh</button>
          {isAdmin ? (
            <>
              <button type="button" className={BTN_SECONDARY} onClick={newFolder}>New folder</button>
              <button type="button" className={BTN_PRIMARY} onClick={() => inputRef.current?.click()}>Upload files</button>
              <input ref={inputRef} type="file" multiple hidden onChange={(e) => { upload(e.target.files); e.target.value = ''; }} />
            </>
          ) : null}
        </div>
      </div>

      {isAdmin ? <p className={cx(MUTED, 'mb-3 text-[13px]')}>Tip: drag files from your computer onto this box to upload them into <b>{prefix || 'the bucket root'}</b>.</p> : null}

      {notice ? <p role="status" className="mb-3 rounded-lg bg-[#eef8f0] px-3 py-2 text-[14px] text-[#1f6b35]">{notice}</p> : null}
      {error ? (
        <p role="alert" className="mb-3 flex items-start justify-between gap-3 rounded-lg bg-[#fdecea] px-3 py-2 text-[14px] text-[#b42318]">
          <span>{error}</span>
          <button type="button" className="font-semibold" onClick={() => setError('')} aria-label="Dismiss">×</button>
        </p>
      ) : null}

      {/* upload queue */}
      {queue.length ? (
        <div className="mb-4 rounded-xl border border-[#e3e5ea] p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[13px] font-semibold">Uploads</p>
            {!busy ? <button type="button" className="text-[13px] text-[#5b6170] hover:underline" onClick={() => setQueue([])}>Clear</button> : null}
          </div>
          <ul className="space-y-2">
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

      {/* listing */}
      <div className="overflow-hidden rounded-xl border border-[#e3e5ea]">
        <div className="hidden grid-cols-[1fr_110px_170px] gap-3 border-b border-[#e3e5ea] bg-[#f8f9fb] px-4 py-2 text-[12.5px] font-semibold text-[#5b6170] md:grid">
          <span>Name</span><span className="text-right">Size</span><span>Last modified</span>
        </div>
        {loading && !folders.length && !files.length ? <p className={cx(MUTED, 'px-4 py-6')}>Loading…</p> : null}
        {!loading && !error && !shownFolders.length && !shownFiles.length ? (
          <p className={cx(MUTED, 'px-4 py-6')}>{q ? 'Nothing in this folder matches your search.' : isAdmin ? 'This folder is empty. Upload files or drop them here.' : 'This folder is empty.'}</p>
        ) : null}
        <ul>
          {shownFolders.map((f) => (
            <li key={f} className="flex items-center gap-3 border-b border-[#eef0f3] px-4 py-2.5 last:border-0 hover:bg-[#fafbfc]">
              <button type="button" onClick={() => open(f)} className="flex min-w-0 flex-1 items-center gap-2.5 text-left text-[14px] font-medium">
                <FolderIcon /><span className="truncate">{baseName(f)}</span>
              </button>
              {isAdmin ? <button type="button" className={cx(BTN_DANGER, 'h-8 px-2.5 text-[12.5px]')} onClick={() => removeFolder(f)}>Delete</button> : null}
            </li>
          ))}
          {shownFiles.map((f) => {
            const site = siteLink(f.key);
            const isImg = IMG.test(f.key);
            return (
              <li key={f.key} className="border-b border-[#eef0f3] px-4 py-2.5 last:border-0 hover:bg-[#fafbfc]">
                <div className="grid grid-cols-1 gap-1 md:grid-cols-[1fr_110px_170px] md:items-center md:gap-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    {isImg ? (
                      <button type="button" onClick={() => setPreview(f.key)} className="h-9 w-9 flex-none overflow-hidden rounded border border-[#e3e5ea] bg-[#f4f5f7]" aria-label={`Preview ${baseName(f.key)}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s3Link(f.key)} alt="" loading="lazy" className="h-full w-full object-cover" />
                      </button>
                    ) : <FileIcon />}
                    <a href={s3Link(f.key)} target="_blank" rel="noopener noreferrer" className="truncate text-[14px] hover:underline">{baseName(f.key)}</a>
                  </div>
                  <span className="text-[13px] text-[#5b6170] md:text-right">{fmtSize(f.size)}</span>
                  <span className="text-[13px] text-[#5b6170]">{fmtDate(f.modified)}</span>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-1 md:pl-[46px]">
                  <CopyButton text={s3Link(f.key)} label="Copy S3 link" />
                  {site ? <CopyButton text={site} label="Copy website link" /> : null}
                  {isAdmin ? <button type="button" className={cx(BTN_GHOST, 'h-8 px-2.5 text-[12.5px] text-[#b42318] hover:bg-[#fdecea]')} onClick={() => removeFile(f.key)}>Delete</button> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {next ? (
        <div className="mt-3 text-center">
          <button type="button" className={BTN_SECONDARY} onClick={() => load(prefix, next)} disabled={loading}>{loading ? 'Loading…' : 'Load more'}</button>
        </div>
      ) : null}

      {dragging ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-white/85 text-[16px] font-semibold">
          Drop to upload into {prefix || 'the bucket root'}
        </div>
      ) : null}

      {preview ? (
        <div role="dialog" aria-modal="true" aria-label="Image preview" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setPreview(null)}>
          <div className="max-h-full max-w-[900px] rounded-xl bg-white p-3" onClick={(e) => e.stopPropagation()}>
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
