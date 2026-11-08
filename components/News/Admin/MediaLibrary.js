'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import { api } from './api';
import { thumbOf, UploadForm } from './MediaPicker';
import { BTN_DANGER, BTN_PRIMARY, BTN_SECONDARY, CARD, cx, ERR, formatDateTime, HINT, INPUT, LABEL } from './ui';

const kb = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

function Usage({ usage }) {
  if (!usage) return null;
  if (!usage.total) return <p className="text-[13px] text-[#11733b]">Not used anywhere.</p>;
  const groups = [['Featured image of', usage.featured, 'a'], ['Social image of', usage.social, 'a'], ['Image of category', usage.categories, 'c'], ['Inside the body of', usage.inBody, 'a']];
  return (
    <div className="text-[13px]">
      <p className="font-semibold">Used in {usage.total} {usage.total === 1 ? 'place' : 'places'}:</p>
      <ul className="mt-1 space-y-1">
        {groups.flatMap(([label, list, kind]) =>
          list.map((x) => (
            <li key={`${label}-${x.id}`}>
              {label}{' '}
              {kind === 'a' ? <Link className="underline" href={`/news/admin/articles/${x.id}`}>{x.title}</Link> : <Link className="underline" href="/news/admin/categories">{x.title}</Link>}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default function MediaLibrary({ initial }) {
  const [items, setItems] = useState(initial.items);
  const [total, setTotal] = useState(initial.total);
  const [page, setPage] = useState(initial.page);
  const [totalPages, setTotalPages] = useState(initial.totalPages);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [sel, setSel] = useState(null); // { media, usage, alt, caption }
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const load = useCallback(async (p, query) => {
    setError('');
    const r = await api('GET', `/media?page=${p}&pageSize=36&q=${encodeURIComponent(query)}`);
    if (!r.ok) return setError(r.data.error || 'Could not load the library.');
    setItems(r.data.items);
    setTotal(r.data.total);
    setPage(r.data.page);
    setTotalPages(r.data.totalPages);
    return undefined;
  }, []);

  async function select(m) {
    setMessage(null);
    setSel({ media: m, usage: null, alt: m.alt || '', caption: m.caption || '' });
    const r = await api('GET', `/media/${m.id}`);
    if (r.ok) setSel((s) => (s && s.media.id === m.id ? { ...s, media: r.data.media, usage: r.data.usage } : s));
  }

  async function saveMeta(e) {
    e.preventDefault();
    setBusy(true);
    const r = await api('PATCH', `/media/${sel.media.id}`, { alt: sel.alt, caption: sel.caption });
    setBusy(false);
    if (!r.ok) return setMessage({ ok: false, text: r.data.error || 'Could not save.' });
    setSel((s) => ({ ...s, media: r.data.media }));
    setItems((list) => list.map((x) => (x.id === r.data.media.id ? r.data.media : x)));
    setMessage({ ok: true, text: 'Saved.' });
    return undefined;
  }

  async function remove() {
    if (!window.confirm('Remove this image from the media library? It is not used anywhere. (The stored file is kept.)')) return;
    setBusy(true);
    const r = await api('DELETE', `/media/${sel.media.id}`);
    setBusy(false);
    if (!r.ok) {
      if (r.data.usage) setSel((s) => ({ ...s, usage: r.data.usage }));
      return setMessage({ ok: false, text: r.data.error || 'Could not remove.' });
    }
    setSel(null);
    setMessage({ ok: true, text: 'Removed from the library.' });
    load(page, q);
    return undefined;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <form className="flex flex-1 gap-2" onSubmit={(e) => { e.preventDefault(); load(1, q); }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search file name, alt text or caption…" className={INPUT} aria-label="Search the media library" />
            <button type="submit" className={BTN_SECONDARY}>Search</button>
          </form>
          <button type="button" className={BTN_PRIMARY} onClick={() => setShowUpload((v) => !v)}>{showUpload ? 'Close upload' : 'Upload'}</button>
        </div>
        {showUpload ? (
          <div className={cx(CARD, 'mb-4')}>
            <UploadForm
              onUploaded={(m, dedup) => {
                setMessage({ ok: true, text: dedup ? 'That image was already in the library — selected it.' : 'Uploaded.' });
                load(1, '');
                setQ('');
                select(m);
              }}
            />
            <p className={HINT}>Images are converted to WebP in several sizes; location and camera data (EXIF/GPS) are removed.</p>
          </div>
        ) : null}
        {error ? <p className={ERR} role="alert">{error}</p> : null}
        <p className="mb-2 text-[13px] text-[#5b6170]">{total} {total === 1 ? 'image' : 'images'}</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((m) => (
            <li key={m.id}>
              <button type="button" onClick={() => select(m)} aria-pressed={sel?.media.id === m.id} className={cx('block w-full overflow-hidden rounded-lg border bg-white text-left transition', sel?.media.id === m.id ? 'border-[#14161a] ring-2 ring-[#14161a]/20' : 'border-[#e3e5ea] hover:border-[#9aa0ac]')}>
                <span className="block aspect-[4/3] bg-[#eef0f3]">
                  {/* eslint-disable-next-line @next/next/no-img-element -- admin thumbnail (480px rendition) */}
                  <img src={thumbOf(m)} alt="" loading="lazy" className="h-full w-full object-cover" />
                </span>
                <span className="block truncate px-2 py-1.5 text-[12px] text-[#5b6170]">{m.alt || m.filename || `Image #${m.id}`}</span>
              </button>
            </li>
          ))}
        </ul>
        {totalPages > 1 ? (
          <div className="mt-4 flex items-center justify-between">
            <button type="button" className={BTN_SECONDARY} disabled={page <= 1} onClick={() => load(page - 1, q)}>← Previous</button>
            <span className="text-[13px] text-[#5b6170]">Page {page} of {totalPages}</span>
            <button type="button" className={BTN_SECONDARY} disabled={page >= totalPages} onClick={() => load(page + 1, q)}>Next →</button>
          </div>
        ) : null}
      </div>

      <aside className="lg:sticky lg:top-[120px] lg:self-start">
        {message ? (
          <div role={message.ok ? 'status' : 'alert'} className={cx('mb-3 rounded-lg border px-3.5 py-2.5 text-[13.5px] font-medium', message.ok ? 'border-[#b7e4c7] bg-[#e7f6ec] text-[#11733b]' : 'border-[#f1c0bc] bg-[#fdecea] text-[#b42318]')}>
            {message.text}
          </div>
        ) : null}
        {sel ? (
          <form onSubmit={saveMeta} className={cx(CARD, 'flex flex-col gap-3')}>
            {/* eslint-disable-next-line @next/next/no-img-element -- admin preview */}
            <img src={sel.media.variants.find((v) => v.name === 'card')?.url || thumbOf(sel.media)} alt="" className="w-full rounded-lg bg-[#eef0f3]" />
            <p className="text-[12.5px] text-[#6b7180]">
              {sel.media.width}×{sel.media.height} · {kb(sel.media.bytes)} · {sel.media.filename || 'no file name'} · added {formatDateTime(sel.media.createdAt)}
            </p>
            <div>
              <label className={LABEL} htmlFor="m-alt">Alt text</label>
              <input id="m-alt" value={sel.alt} maxLength={500} onChange={(e) => setSel((s) => ({ ...s, alt: e.target.value }))} className={INPUT} />
            </div>
            <div>
              <label className={LABEL} htmlFor="m-cap">Caption</label>
              <textarea id="m-cap" rows={2} value={sel.caption} maxLength={2000} onChange={(e) => setSel((s) => ({ ...s, caption: e.target.value }))} className={INPUT} />
            </div>
            <button type="submit" disabled={busy} className={BTN_PRIMARY}>Save</button>
            <div className="border-t border-[#eef0f3] pt-3">
              {sel.usage ? <Usage usage={sel.usage} /> : <p className="text-[13px] text-[#6b7180]">Checking where it is used…</p>}
            </div>
            <button type="button" className={BTN_DANGER} disabled={busy || !sel.usage || sel.usage.total > 0} onClick={remove} title={sel.usage?.total ? 'Remove it from the places listed above first' : undefined}>
              Remove from library
            </button>
          </form>
        ) : (
          <div className={CARD}>
            <p className="text-[14px] text-[#5b6170]">Select an image to edit its alt text and caption or see where it is used.</p>
            <p className={HINT}>An image can be removed only when no article or category uses it.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
