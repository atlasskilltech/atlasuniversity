'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { api } from './api';
import { BTN_GHOST, BTN_PRIMARY, BTN_SECONDARY, cx, ERR, INPUT, LABEL } from './ui';

export const thumbOf = (m) => m?.variants?.find((v) => v.name === 'thumb')?.url || m?.url || '';
export const articleSrcOf = (m) => m?.variants?.find((v) => v.name === 'article')?.url || m?.variants?.find((v) => v.name === 'full')?.url || m?.url || '';

/** Upload form used by the picker and the media library. onUploaded(media). */
export function UploadForm({ onUploaded, compact = false }) {
  const [file, setFile] = useState(null);
  const [alt, setAlt] = useState('');
  const [caption, setCaption] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function submit(e) {
    e.preventDefault();
    if (!file) return setError('Choose an image first.');
    setBusy(true);
    setError('');
    const fd = new FormData();
    fd.set('file', file);
    if (alt.trim()) fd.set('alt', alt.trim());
    if (caption.trim()) fd.set('caption', caption.trim());
    const r = await api('POST', '/media', fd);
    setBusy(false);
    if (!r.ok) return setError(r.data.error || 'Upload failed.');
    setFile(null);
    setAlt('');
    setCaption('');
    if (inputRef.current) inputRef.current.value = '';
    onUploaded(r.data.media, r.data.deduplicated);
  }

  return (
    <form onSubmit={submit} className={cx('grid gap-3', compact ? 'sm:grid-cols-[1fr_1fr_auto] sm:items-end' : '')}>
      <div>
        <label className={LABEL} htmlFor="upload-file">Image (JPEG, PNG, WebP or AVIF, up to 15 MB)</label>
        <input id="upload-file" ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full text-[13px]" />
      </div>
      <div>
        <label className={LABEL} htmlFor="upload-alt">Alt text</label>
        <input id="upload-alt" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Describe the image for screen readers" className={INPUT} maxLength={500} />
      </div>
      {!compact ? (
        <div>
          <label className={LABEL} htmlFor="upload-caption">Caption</label>
          <input id="upload-caption" value={caption} onChange={(e) => setCaption(e.target.value)} className={INPUT} maxLength={2000} />
        </div>
      ) : null}
      <div>
        <button type="submit" disabled={busy} className={BTN_PRIMARY}>
          {busy ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {error ? <p role="alert" className={cx(ERR, 'sm:col-span-full')}>{error}</p> : null}
    </form>
  );
}

/**
 * Modal media picker. open, onClose(), onSelect(media).
 * Lists the library (newest first) with search and "Load more"; uploading selects the new image.
 * The dialog is a separate component mounted on each opening, so it always starts fresh.
 */
export default function MediaPicker({ open, ...props }) {
  if (!open) return null;
  return createPortal(<PickerDialog {...props} />, document.body);
}

function PickerDialog({ onClose, onSelect, title = 'Choose an image' }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const dialogRef = useRef(null);
  /* the parent usually passes an inline onClose: read the latest through a ref so the mount effect runs once */
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  const apply = useCallback((r, append) => {
    setLoading(false);
    if (!r.ok) return setError(r.data.error || 'Could not load the media library.');
    setError('');
    setItems((prev) => (append ? [...prev, ...r.data.items] : r.data.items));
    setPage(r.data.page);
    setTotalPages(r.data.totalPages);
    return undefined;
  }, []);
  const fetchPage = (p, query) => api('GET', `/media?page=${p}&pageSize=30&q=${encodeURIComponent(query)}`);
  const load = async (p, query, append) => {
    setLoading(true);
    apply(await fetchPage(p, query), append);
  };

  useEffect(() => {
    let live = true;
    fetchPage(1, '').then((r) => live && apply(r, false));
    const onKey = (e) => e.key === 'Escape' && closeRef.current();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector('input')?.focus();
    return () => {
      live = false;
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [apply]);

  const choose = (m) => {
    onSelect(m);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} className="flex max-h-[92dvh] w-full max-w-[960px] flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#eef0f3] px-5 py-3.5">
          <h2 className="text-[16px] font-semibold">{title}</h2>
          <div className="flex gap-2">
            <button type="button" className={BTN_SECONDARY} onClick={() => setShowUpload((v) => !v)}>
              {showUpload ? 'Hide upload' : 'Upload new'}
            </button>
            <button type="button" className={BTN_GHOST} onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
        {showUpload ? (
          <div className="border-b border-[#eef0f3] bg-[#fafbfc] px-5 py-4">
            <UploadForm compact onUploaded={choose} />
          </div>
        ) : null}
        <form
          className="flex gap-2 px-5 pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            load(1, q, false);
          }}
        >
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search file name, alt text or caption…" className={INPUT} aria-label="Search the media library" />
          <button type="submit" className={BTN_SECONDARY}>
            Search
          </button>
        </form>
        <div className="min-h-[200px] flex-1 overflow-y-auto px-5 py-4">
          {error ? <p role="alert" className={ERR}>{error}</p> : null}
          {loading && !items.length ? <p className="text-[14px] text-[#5b6170]">Loading…</p> : null}
          {!items.length && !loading && !error ? <p className="text-[14px] text-[#5b6170]">No images{q ? ' match' : ' yet — upload one'}.</p> : null}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
            {items.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => choose(m)}
                  className="group block w-full overflow-hidden rounded-lg border border-[#e3e5ea] text-left transition hover:border-[#14161a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b5bdb]"
                >
                  <span className="block aspect-[4/3] bg-[#eef0f3]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail (480px rendition) */}
                    <img src={thumbOf(m)} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </span>
                  <span className="block truncate px-2 py-1.5 text-[12px] text-[#5b6170]">{m.alt || m.filename || `Image #${m.id}`}</span>
                </button>
              </li>
            ))}
          </ul>
          {page < totalPages ? (
            <div className="mt-4 text-center">
              <button type="button" disabled={loading} className={BTN_SECONDARY} onClick={() => load(page + 1, q, true)}>
                {loading ? 'Loading…' : 'Load more'}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
