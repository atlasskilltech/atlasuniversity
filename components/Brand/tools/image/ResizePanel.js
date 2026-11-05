'use client';

import { useEffect, useRef, useState } from 'react';
import { ACCEPT, MAX_DIM, effectiveFormat, extFor, loadImage, processImage, validateFile } from '@/lib/brand/image';
import { baseName, downloadBlob, fmtBytes, raf } from '@/lib/brand/utils';
import { useBrandToast } from '../../BrandToast';
import { BTN_OUTLINE, BTN_PRIMARY, BTN_SECONDARY, CHECKER } from '../../ui/styles';
import { Check, DropZone, Status } from '../bits';
import { BgField, FormatSelect, NumberField, QualityField } from './FormatFields';

/*
 * ref setupResize(): one image at a time. Drag on the image to draw a crop (a drag under 4px is a
 * click and clears it), or type the crop in natural pixels; changing the crop resets the target
 * size to the crop's own. Width/height stay aspect-locked to the crop (or source) when "Maintain
 * aspect ratio" is on. "Generate preview" renders the result; any change clears it again.
 * Downloads as `<name>-<w>x<h>.<ext>`.
 */
const crop4 = (c) => (c ? { x: Math.round(c.x), y: Math.round(c.y), w: Math.round(c.w), h: Math.round(c.h) } : null);

export default function ResizePanel({ support }) {
  const { notify } = useBrandToast();
  const [src, setSrc] = useState(null); // { img, url, width, height, type, file }
  const [crop, setCrop] = useState(null);
  const [cropIn, setCropIn] = useState({ x: '', y: '', w: '', h: '' });
  const [size, setSize] = useState({ w: '', h: '' });
  const [aspect, setAspect] = useState(true);
  const [format, setFormat] = useState('original');
  const [quality, setQuality] = useState(90);
  const [bg, setBg] = useState('#FFFFFF');
  const [out, setOut] = useState(null); // { blob, url, width, height, type, name }
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ msg: '', kind: '' });
  const imgRef = useRef(null);
  const drag = useRef(null);

  /* revoke on unmount */
  const live = useRef({});
  useEffect(() => {
    live.current = { src, out };
  }, [src, out]);
  useEffect(
    () => () => {
      if (live.current.src?.url) URL.revokeObjectURL(live.current.src.url);
      if (live.current.out?.url) URL.revokeObjectURL(live.current.out.url);
    },
    [],
  );

  const clearOutput = () =>
    setOut((o) => {
      if (o?.url) URL.revokeObjectURL(o.url);
      return null;
    });

  const applyCrop = (c, source = src) => {
    const next = crop4(c);
    setCrop(next);
    setCropIn(next ? { x: next.x, y: next.y, w: next.w, h: next.h } : { x: '', y: '', w: '', h: '' });
    if (source) setSize({ w: Math.round(next ? next.w : source.width), h: Math.round(next ? next.h : source.height) });
    clearOutput();
  };

  const baseAspect = () => (crop && crop.w > 0 && crop.h > 0 ? crop.w / crop.h : src ? src.width / src.height : 1);
  const fmt = effectiveFormat(format, src?.type);

  const load = (file) => {
    const err = validateFile(file);
    if (err) {
      notify(err, { error: true });
      setStatus({ msg: err, kind: 'err' });
      return;
    }
    loadImage(file).then(
      (source) => {
        if (src?.url) URL.revokeObjectURL(src.url);
        const s = { ...source, file };
        setSrc(s);
        applyCrop(null, s);
        setStatus({ msg: 'Loaded. Set a crop and size, then generate the preview.', kind: '' });
      },
      (e) => notify(e.message || 'Could not read this image.', { error: true }),
    );
  };

  const reset = () => {
    if (src?.url) URL.revokeObjectURL(src.url);
    clearOutput();
    setSrc(null);
    setCrop(null);
    setCropIn({ x: '', y: '', w: '', h: '' });
    setStatus({ msg: '', kind: '' });
  };

  /* ---- drag-to-crop ---- */
  const toNatural = (e) => {
    const r = imgRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) * (src.width / r.width);
    const y = (e.clientY - r.top) * (src.height / r.height);
    return { x: Math.max(0, Math.min(x, src.width)), y: Math.max(0, Math.min(y, src.height)) };
  };
  const onDown = (e) => {
    if (!src) return;
    e.preventDefault();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    drag.current = toNatural(e);
  };
  const onMove = (e) => {
    if (!drag.current || !src) return;
    const p = toNatural(e);
    const s = drag.current;
    const c = { x: Math.min(s.x, p.x), y: Math.min(s.y, p.y), w: Math.max(1, Math.abs(p.x - s.x)), h: Math.max(1, Math.abs(p.y - s.y)) };
    setCrop(c);
    setCropIn(crop4(c));
  };
  const onUp = (e) => {
    if (!drag.current) return;
    drag.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    applyCrop(crop && (crop.w < 4 || crop.h < 4) ? null : crop);
  };

  const commitCropInputs = () => {
    if (!src) return;
    let x = parseInt(cropIn.x, 10) || 0;
    let y = parseInt(cropIn.y, 10) || 0;
    let w = parseInt(cropIn.w, 10) || 0;
    let h = parseInt(cropIn.h, 10) || 0;
    if (w <= 0 || h <= 0) return applyCrop(null);
    x = Math.max(0, Math.min(x, src.width - 1));
    y = Math.max(0, Math.min(y, src.height - 1));
    w = Math.max(1, Math.min(w, src.width - x));
    h = Math.max(1, Math.min(h, src.height - y));
    applyCrop({ x, y, w, h });
  };

  const setW = (v) => {
    const w = parseInt(v, 10);
    setSize((s) => ({ w: v, h: aspect && w > 0 ? Math.max(1, Math.round(w / baseAspect())) : s.h }));
    clearOutput();
  };
  const setH = (v) => {
    const h = parseInt(v, 10);
    setSize((s) => ({ h: v, w: aspect && h > 0 ? Math.max(1, Math.round(h * baseAspect())) : s.w }));
    clearOutput();
  };
  const toggleAspect = (on) => {
    setAspect(on);
    const w = parseInt(size.w, 10);
    if (on && w > 0) setSize({ w: size.w, h: Math.max(1, Math.round(w / baseAspect())) });
    clearOutput();
  };

  const generate = async () => {
    if (!src) return;
    const tw = parseInt(size.w, 10);
    const th = parseInt(size.h, 10);
    if (!(tw > 0) || !(th > 0)) return notify('Enter a valid width and height.', { error: true });
    if (tw > MAX_DIM || th > MAX_DIM) return notify(`Maximum dimension is ${MAX_DIM} px.`, { error: true });
    const opts = { format: fmt, targetW: tw, targetH: th };
    if (crop) opts.crop = crop;
    if (fmt !== 'image/png') opts.quality = (quality || 90) / 100;
    if (fmt === 'image/jpeg') opts.bg = bg;
    setBusy(true);
    setStatus({ msg: 'Generating…', kind: 'ok' });
    await raf();
    try {
      const r = await processImage(src, opts);
      clearOutput();
      setOut({ ...r, url: URL.createObjectURL(r.blob), name: `${baseName(src.file.name)}-${r.width}x${r.height}.${extFor(r.type)}` });
      setStatus({ msg: "Preview ready. Download when you're happy with it.", kind: 'ok' });
    } catch (e) {
      setStatus({ msg: `Error: ${e.message || 'Could not generate the image.'}`, kind: 'err' });
      notify('Could not generate the image.', { error: true });
    }
    setBusy(false);
  };

  if (!src) {
    return (
      <div>
        <DropZone accept={ACCEPT} onFiles={(files) => files[0] && load(files[0])} title="Drop an image here" hint="one image at a time" big className="mx-auto max-w-xl" />
        <Status msg={status.msg} kind={status.kind} className="mt-3 text-center" />
      </div>
    );
  }

  const pct = (v, of) => `${(v / of) * 100}%`;
  return (
    <div className="grid grid-cols-1 gap-8 n1024:grid-cols-[1fr_22rem]">
      <div className="flex min-w-0 flex-col gap-5">
        <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-line">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-brand-indigo">Source</p>
            <p className="text-xs text-brand-ink">
              {src.width} × {src.height} px · {fmtBytes(src.file.size)}
            </p>
          </div>
          <div className={`mt-3 flex justify-center overflow-hidden rounded-xl p-2 ${CHECKER}`}>
            <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className="relative inline-block max-w-full cursor-crosshair touch-none select-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img ref={imgRef} src={src.url} alt="Image to resize" draggable={false} className="block max-h-[52vh] w-auto max-w-full" />
              {crop && (
                <div
                  className="pointer-events-none absolute border-2 border-solid border-brand-teal bg-brand-teal/10"
                  style={{ left: pct(crop.x, src.width), top: pct(crop.y, src.height), width: pct(crop.w, src.width), height: pct(crop.h, src.height) }}
                />
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-brand-ink/70">Drag on the image to select a crop area. Use “Clear crop” to remove it.</p>
        </div>
        {out && (
          <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-line">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-brand-indigo">Result preview</p>
              <p className="text-xs text-brand-ink">
                {out.width} × {out.height} px · {fmtBytes(out.blob.size)} · {extFor(out.type).toUpperCase()}
              </p>
            </div>
            <div className={`mt-3 flex justify-center overflow-hidden rounded-xl p-2 ${CHECKER}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={out.url} alt="Resized result preview" className="block max-h-[40vh] w-auto max-w-full" />
            </div>
          </div>
        )}
      </div>

      <div className="h-fit rounded-2xl bg-white p-5 ring-1 ring-brand-line">
        <h3 className="text-sm font-bold text-brand-indigo">Crop (optional)</h3>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {[
            ['x', 'Left (px)', 0],
            ['y', 'Top (px)', 0],
            ['w', 'Width (px)', 1],
            ['h', 'Height (px)', 1],
          ].map(([k, label, min]) => (
            <NumberField key={k} id={`rz-c${k}`} label={label} min={min} value={cropIn[k]} onChange={(v) => setCropIn((c) => ({ ...c, [k]: v }))} onBlur={commitCropInputs} />
          ))}
        </div>
        <button type="button" onClick={() => applyCrop(null)} className="mt-2 border-0 bg-transparent p-0 text-xs font-semibold text-brand-indigo underline underline-offset-2 hover:text-brand-teal">
          Clear crop
        </button>

        <h3 className="mt-6 text-sm font-bold text-brand-indigo">Resize</h3>
        <div className="mt-3">
          <Check checked={aspect} onChange={toggleAspect}>Maintain aspect ratio</Check>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <NumberField id="rz-w" label="Width (px)" max={MAX_DIM} value={size.w} onChange={setW} />
          <NumberField id="rz-h" label="Height (px)" max={MAX_DIM} value={size.h} onChange={setH} />
        </div>

        <h3 className="mt-6 text-sm font-bold text-brand-indigo">Output</h3>
        <div className="mt-3 space-y-4">
          <FormatSelect
            id="rz-format"
            label="Format"
            value={format}
            onChange={(v) => {
              setFormat(v);
              clearOutput();
            }}
            keepOriginal
            webp={support.webp}
          />
          {fmt !== 'image/png' && (
            <QualityField
              id="rz-quality"
              value={quality}
              onInput={(v) => {
                setQuality(v);
                clearOutput();
              }}
            />
          )}
          {fmt === 'image/jpeg' && (
            <BgField
              id="rz-bg"
              label="Background color (JPEG)"
              value={bg}
              onChange={(v) => {
                setBg(v);
                clearOutput();
              }}
              note="Used for transparent areas."
            />
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={generate} disabled={busy || !support.canvas} className={BTN_PRIMARY}>Generate preview</button>
          <button type="button" disabled={!out} onClick={() => out && downloadBlob(out.blob, out.name)} className={BTN_SECONDARY}>Download</button>
          <button type="button" onClick={reset} className={BTN_OUTLINE}>Reset</button>
        </div>
        <Status msg={status.msg} kind={status.kind} />
      </div>
    </div>
  );
}
