'use client';

import { useEffect, useRef, useState } from 'react';
import { MAX_DIM, MAX_FILES, ACCEPT, effectiveFormat, extFor, loadImage, normalizeType, processImage, validateFile } from '@/lib/brand/image';
import { baseName, downloadBlob, fmtBytes, raf } from '@/lib/brand/utils';
import { useBrandToast } from '../../BrandToast';
import { BTN_OUTLINE, BTN_PRIMARY, BTN_SECONDARY, CHECKER } from '../../ui/styles';
import { XSmall } from '../../ui/icons';
import { DropZone, Status } from '../bits';
import { BgField, FormatSelect, NumberField, QualityField } from './FormatFields';

/*
 * ref setupBatch(): the Compressor and the Converter share one implementation. Files are queued,
 * validated and decoded on add; "Compress"/"Convert" processes them one per animation frame; any
 * option change clears the outputs (they no longer match). Per-file and "Download all" downloads
 * keep the original base name with the output extension.
 */
const CONFIG = {
  comp: { verbIng: 'Compressing', verbPast: 'Compressed', run: 'Compress', readyText: 'Ready to compress', empty: 'No images yet. Add images to compress them.', outThumb: false, defaultFormat: 'original', quality: 82 },
  conv: { verbIng: 'Converting', verbPast: 'Converted', run: 'Convert', readyText: 'Ready to convert', empty: 'No images yet. Add images to convert them.', outThumb: true, defaultFormat: 'image/jpeg', quality: 90 },
};

let seq = 0;
const outName = (it) => `${baseName(it.name)}.${extFor(it.outType)}`;

function Result({ it, readyText }) {
  if (it.loadError) return <p className="mt-1 text-xs font-semibold text-brand-ugdx">{it.loadError}</p>;
  if (it.procError) return <p className="mt-1 text-xs font-semibold text-brand-ugdx">Error: {it.procError}</p>;
  if (it.outBlob) {
    const diff = it.file.size - it.outBlob.size;
    const pct = it.file.size > 0 ? Math.round((diff / it.file.size) * 100) : 0;
    const tail = `${it.outW}×${it.outH} ${extFor(it.outType).toUpperCase()}`;
    return it.outBlob.size < it.file.size ? (
      <p className="mt-1 text-xs font-semibold text-brand-ok">
        {fmtBytes(it.file.size)} → {fmtBytes(it.outBlob.size)} · saved {pct}% · {tail}
      </p>
    ) : (
      <p className="mt-1 text-xs font-semibold text-brand-law">
        {fmtBytes(it.file.size)} → {fmtBytes(it.outBlob.size)} · no reduction ({pct <= 0 ? `+${Math.abs(pct)}` : pct}%) · {tail}
      </p>
    );
  }
  if (it.status === 'processing') return <p className="mt-1 text-xs font-semibold text-brand-teal">Processing…</p>;
  return <p className="mt-1 text-xs font-semibold text-brand-ink/70">{it.source ? readyText : 'Reading…'}</p>;
}

export default function BatchPanel({ kind, support }) {
  const cfg = CONFIG[kind];
  const { notify } = useBrandToast();
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [format, setFormat] = useState(cfg.defaultFormat);
  const [quality, setQuality] = useState(cfg.quality);
  const [maxW, setMaxW] = useState('');
  const [maxH, setMaxH] = useState('');
  const [bg, setBg] = useState('#FFFFFF');
  const p = `img-${kind}`;

  /* revoke every object URL this panel created when it unmounts */
  const live = useRef([]);
  useEffect(() => {
    live.current = items;
  }, [items]);
  useEffect(
    () => () =>
      live.current.forEach((it) => {
        if (it.source?.url) URL.revokeObjectURL(it.source.url);
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
      }),
    [],
  );

  const patch = (id, fn) => setItems((list) => list.map((it) => (it.id === id ? { ...it, ...fn(it) } : it)));

  const stale = () => {
    setItems((list) =>
      list.map((it) => {
        if (it.outUrl) URL.revokeObjectURL(it.outUrl);
        return { ...it, outUrl: null, outBlob: null, procError: null, status: 'ready' };
      }),
    );
    setStatus('');
  };

  const addFiles = (fileList) => {
    let files = Array.from(fileList);
    if (items.length + files.length > MAX_FILES) {
      notify(`You can process up to ${MAX_FILES} images at once.`, { error: true });
      files = files.slice(0, Math.max(0, MAX_FILES - items.length));
    }
    let skipped = 0;
    const added = files.map((file) => {
      const err = validateFile(file);
      if (err) skipped++;
      return { id: `it${++seq}`, file, name: file.name, status: 'ready', loadError: err };
    });
    setItems((list) => [...list, ...added]);
    added
      .filter((it) => !it.loadError)
      .forEach((it) =>
        loadImage(it.file).then(
          (source) => patch(it.id, () => ({ source })),
          (e) => patch(it.id, () => ({ loadError: e.message || 'Could not read this image.' })),
        ),
      );
    if (skipped) notify(`${skipped} file${skipped > 1 ? 's were' : ' was'} skipped. See the list for details.`, { error: true });
  };

  const remove = (id) =>
    setItems((list) => {
      const it = list.find((x) => x.id === id);
      if (it?.source?.url) URL.revokeObjectURL(it.source.url);
      if (it?.outUrl) URL.revokeObjectURL(it.outUrl);
      return list.filter((x) => x.id !== id);
    });

  const reset = () => {
    items.forEach((it) => {
      if (it.source?.url) URL.revokeObjectURL(it.source.url);
      if (it.outUrl) URL.revokeObjectURL(it.outUrl);
    });
    setItems([]);
    setStatus('');
  };

  const buildOpts = (source) => {
    const fmt = effectiveFormat(format, source.type);
    const opts = { format: fmt };
    if (fmt !== 'image/png') opts.quality = (quality || 85) / 100;
    if (fmt === 'image/jpeg') opts.bg = bg;
    if (kind === 'comp') {
      const mw = parseInt(maxW, 10);
      const mh = parseInt(maxH, 10);
      if (mw > 0) opts.maxW = Math.min(MAX_DIM, mw);
      if (mh > 0) opts.maxH = Math.min(MAX_DIM, mh);
    }
    return opts;
  };

  const run = async () => {
    const ready = items.filter((it) => !it.loadError && it.source);
    if (!ready.length) return notify('Add at least one valid image first.', { error: true });
    setBusy(true);
    let ok = 0;
    for (let i = 0; i < ready.length; i++) {
      const it = ready[i];
      patch(it.id, () => ({ status: 'processing', procError: null }));
      setStatus(`${cfg.verbIng} ${i + 1} of ${ready.length}…`);
      await raf();
      try {
        const out = await processImage(it.source, buildOpts(it.source));
        const outUrl = URL.createObjectURL(out.blob);
        patch(it.id, (cur) => {
          if (cur.outUrl) URL.revokeObjectURL(cur.outUrl);
          return { outBlob: out.blob, outUrl, outW: out.width, outH: out.height, outType: out.type, status: 'done' };
        });
        ok++;
      } catch (e) {
        patch(it.id, () => ({ status: 'error', procError: e.message || 'Processing failed.', outBlob: null }));
      }
    }
    setBusy(false);
    const total = ready.length;
    setStatus(`${cfg.verbPast} ${ok} of ${total} image${total > 1 ? 's' : ''}.`);
    notify(ok > 0 ? `${cfg.verbPast} ${ok} image${ok > 1 ? 's' : ''}.` : 'No images could be processed.', { error: ok === 0 });
  };

  const done = items.filter((it) => it.outBlob);
  const downloadAll = () => {
    if (!done.length) return;
    done.forEach((it, k) => setTimeout(() => downloadBlob(it.outBlob, outName(it)), k * 350));
    notify(`Downloading ${done.length} file${done.length > 1 ? 's' : ''}…`);
  };

  const anyReady = items.some((it) => !it.loadError && it.source);
  const showQuality = format !== 'image/png';
  const showBg = format === 'image/jpeg';
  const setOpt = (setter) => (v) => {
    setter(v);
    stale();
  };

  return (
    <div className="grid grid-cols-1 gap-8 n1024:grid-cols-[22rem_1fr]">
      <div className="flex flex-col gap-5">
        <DropZone accept={ACCEPT} multiple onFiles={addFiles} title="Drop images here" hint="JPG, PNG, WebP" />
        <div className="rounded-2xl bg-white p-5 ring-1 ring-brand-line">
          <h3 className="text-sm font-bold text-brand-indigo">Options</h3>
          <div className="mt-4 space-y-4">
            <FormatSelect id={`${p}-format`} label={kind === 'comp' ? 'Output format' : 'Convert to'} value={format} onChange={setOpt(setFormat)} keepOriginal={kind === 'comp'} webp={support.webp} />
            {showQuality && (
              <QualityField
                id={`${p}-quality`}
                value={quality}
                onInput={setQuality}
                onCommit={stale}
                note={kind === 'comp' ? 'Applies to JPEG and WebP. PNG is lossless and ignores this.' : 'Applies to JPEG and WebP only.'}
              />
            )}
            {kind === 'comp' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <NumberField id={`${p}-maxw`} label="Max width (px)" max={MAX_DIM} placeholder="auto" value={maxW} onChange={setMaxW} onBlur={stale} />
                  <NumberField id={`${p}-maxh`} label="Max height (px)" max={MAX_DIM} placeholder="auto" value={maxH} onChange={setMaxH} onBlur={stale} />
                </div>
                <p className="text-[11px] text-brand-ink/70">Images larger than the limits are scaled down, keeping their aspect ratio. Leave blank to keep the original size.</p>
              </>
            )}
            {showBg && (
              <BgField
                id={`${p}-bg`}
                label={kind === 'comp' ? 'Background for transparent areas (JPEG)' : 'Background color (JPEG)'}
                value={bg}
                onChange={setOpt(setBg)}
                note={kind === 'comp' ? 'JPEG has no transparency, so transparent pixels are filled with this color.' : 'JPEG has no transparency, so transparent areas use this color.'}
              />
            )}
            {kind === 'conv' && <p className="text-[11px] text-brand-ink/70">Image dimensions are preserved. Use the Resize tab to change size.</p>}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={run} disabled={busy || !anyReady || !support.canvas} className={BTN_PRIMARY}>{cfg.run}</button>
            <button type="button" onClick={downloadAll} disabled={busy || !done.length} className={BTN_SECONDARY}>Download all</button>
            <button type="button" onClick={reset} disabled={busy || !items.length} className={BTN_OUTLINE}>Reset</button>
          </div>
          <Status msg={status} />
        </div>
      </div>

      <div>
        {items.length ? (
          <ul className="m-0 list-none space-y-3 p-0">
            {items.map((it) => (
              <li key={it.id} className="flex gap-3 rounded-xl bg-white p-3 ring-1 ring-brand-line n640:gap-4">
                <div className="flex flex-none gap-2">
                  {it.source ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={it.source.url} alt="" className={`h-16 w-16 rounded-lg object-contain ring-1 ring-brand-line ${CHECKER}`} />
                  ) : (
                    <span className={`block h-16 w-16 rounded-lg ring-1 ring-brand-line ${CHECKER}`} />
                  )}
                  {cfg.outThumb && it.outUrl && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={it.outUrl} alt="" className={`h-16 w-16 rounded-lg object-contain ring-1 ring-brand-line ${CHECKER}`} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-indigo" title={it.name}>{it.name}</p>
                  {it.source && !it.loadError && (
                    <p className="mt-0.5 text-xs text-brand-ink">
                      {it.source.width} × {it.source.height} px · {fmtBytes(it.file.size)} · {(extFor(normalizeType(it.source.type)) || 'image').toUpperCase()}
                    </p>
                  )}
                  <Result it={it} readyText={cfg.readyText} />
                </div>
                <div className="flex flex-none flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => remove(it.id)}
                    aria-label={`Remove ${it.name}`}
                    className="rounded-md border-0 bg-transparent p-1 text-brand-ink/60 ring-1 ring-brand-line hover:bg-brand-ugdx hover:text-white hover:ring-brand-ugdx"
                  >
                    <XSmall />
                  </button>
                  <button
                    type="button"
                    disabled={!it.outBlob}
                    onClick={() => downloadBlob(it.outBlob, outName(it))}
                    className="rounded-md border-0 bg-brand-indigo px-2.5 py-1.5 text-xs font-bold text-white hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-brand-indigo"
                  >
                    Download
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-brand-line p-10 text-center text-sm text-brand-ink/70">{cfg.empty}</div>
        )}
      </div>
    </div>
  );
}
