'use client';

import { useState, useSyncExternalStore } from 'react';
import { detectSupport } from '@/lib/brand/image';
import Tabs, { panelId, tabId } from '../ui/Tabs';
import BatchPanel from './image/BatchPanel';
import ResizePanel from './image/ResizePanel';

/*
 * ref image-tools.html: Compressor, Converter and Resize & crop, all on-device through the Canvas
 * API. Panels stay mounted (hidden) so switching tabs keeps each tool's queue, as the reference does.
 */
const TABS = [
  { id: 'compress', label: 'Compressor' },
  { id: 'convert', label: 'Converter' },
  { id: 'resize', label: 'Resize & crop' },
];

let cached;
const getSupport = () => (cached ??= detectSupport());
const SERVER = { canvas: true, webp: true };
const subscribe = () => () => {};

export default function ImageTools() {
  const [tab, setTab] = useState('compress');
  const support = useSyncExternalStore(subscribe, getSupport, () => SERVER);
  return (
    <div>
      <p className="max-w-2xl leading-relaxed">
        Compress, convert and resize images — right in your browser. Everything runs on your device with the Canvas API. Nothing is uploaded to any server.
      </p>
      {!support.canvas && (
        <p className="mt-6 rounded-xl bg-brand-ugdx/10 p-4 text-sm font-semibold text-brand-ugdx ring-1 ring-brand-ugdx/30">
          This browser can&apos;t generate image files with the Canvas API, so the tools below won&apos;t work here. Please try a current version of Chrome, Edge, Firefox or Safari.
        </p>
      )}
      <div className="mt-6 border-0 border-b border-solid border-brand-line">
        <Tabs items={TABS} value={tab} onChange={setTab} idPrefix="img" label="Image tools" />
      </div>
      <p className="mt-5 rounded-xl bg-brand-paper p-4 text-xs leading-relaxed text-brand-ink ring-1 ring-brand-line">
        <span className="font-semibold text-brand-indigo">Supported:</span> JPG/JPEG, PNG and WebP, processed on your device. <span className="font-semibold text-brand-indigo">Limitations:</span>{' '}
        animated GIFs aren&apos;t supported (only a single still frame could be produced and the animation would be lost), and SVG vector files aren&apos;t accepted — export them to PNG first. PNG is
        lossless, so re-compressing a PNG may not shrink it; the real result is always shown.
      </p>
      {TABS.map((t) => (
        <div key={t.id} role="tabpanel" id={panelId('img', t.id)} aria-labelledby={tabId('img', t.id)} hidden={tab !== t.id} className="pt-8">
          {t.id === 'resize' ? <ResizePanel support={support} /> : <BatchPanel kind={t.id === 'compress' ? 'comp' : 'conv'} support={support} />}
        </div>
      ))}
    </div>
  );
}
