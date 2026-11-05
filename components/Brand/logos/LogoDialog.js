/* eslint-disable @next/next/no-img-element -- the full-quality logo at its natural proportions */
'use client';

import { useEffect, useRef, useState } from 'react';
import { fmtKitSize } from '@/lib/brand/utils';
import { FORMAT_HELP } from '@/lib/brand/data';
import { useBrandToast } from '../BrandToast';
import { absUrl } from '../ui/DownloadPill';
import { CloseIcon, CopyIcon } from '../ui/icons';
import { CHECKER, STAGE_BG } from '../ui/styles';

/*
 * ref #logo-dialog: a native <dialog> opened with showModal(), so focus moves into it, Escape and
 * the backdrop close it and focus returns to the card that opened it. The stage shows the
 * full-quality preview (`object-contain`, never stretched) on a choice of three backgrounds; the
 * side panel lists every format with its size, pixel size, an Open link, a Download of the original
 * file and a Copy URL.
 *
 * Default background (ref openDialog): Indigo when the section switch is on Indigo or the artwork
 * is reversed; the transparency grid for transparent artwork; white otherwise.
 */
const BG_BUTTONS = [
  ['light', 'White background', 'bg-white'],
  ['dark', 'Indigo background', 'bg-brand-indigo'],
  ['checker', 'Transparency grid', CHECKER],
];

function defaultBg(previewBg, logo) {
  if (previewBg === 'dark' || logo.bg === 'dark') return 'dark';
  return logo.bg === 'light' ? 'checker' : 'light';
}

export default function LogoDialog({ open, group, logo, previewBg, onClose }) {
  const ref = useRef(null);
  const { copy } = useBrandToast();
  const [bg, setBg] = useState('light');

  /* reset the stage background whenever another logo is opened (adjusting state during render,
     React's documented pattern for state derived from a changed prop) */
  const [shownId, setShownId] = useState(null);
  if (open && logo && shownId !== logo.id + previewBg) {
    setShownId(logo.id + previewBg);
    setBg(defaultBg(previewBg, logo));
  }

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="brand-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[min(64rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl border-0 bg-white p-0 text-brand-ink shadow-2xl backdrop:bg-[rgb(52_43_124/0.72)] backdrop:backdrop-blur-[3px]"
    >
      {group && logo && (
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col md:flex-row">
          <div className={`flex min-h-[14rem] flex-1 items-center justify-center p-6 n640:p-10 md:min-h-[26rem] ${STAGE_BG[bg]}`}>
            <img src={logo.preview} alt={`${group.title} logo, ${logo.name}`} className="max-h-[40vh] w-auto max-w-full object-contain md:max-h-[60vh]" />
          </div>
          <div className="flex w-full shrink-0 flex-col overflow-y-auto border-0 border-t border-solid border-brand-line md:w-80 md:border-l md:border-t-0">
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="text-sm font-semibold text-brand-teal">{group.title}</p>
                <h2 id="brand-dialog-title" className="mt-1 text-lg font-bold leading-snug text-brand-indigo">
                  {logo.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="-mr-2 -mt-1 rounded-lg border-0 bg-transparent p-2 text-brand-indigo hover:bg-brand-paper"
              >
                <CloseIcon />
              </button>
            </div>
            <p className="px-5 text-sm leading-relaxed">{logo.note}</p>
            <div className="px-5 pt-5">
              <p className="text-sm font-semibold text-brand-indigo">Background</p>
              <div className="mt-2 flex gap-2">
                {BG_BUTTONS.map(([k, label, cls]) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={label}
                    aria-pressed={bg === k}
                    onClick={() => setBg(k)}
                    className={`h-9 w-9 rounded-full border-0 ring-1 ring-brand-line aria-pressed:ring-2 aria-pressed:ring-brand-teal aria-pressed:ring-offset-2 ${cls}`}
                  />
                ))}
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm font-semibold text-brand-indigo">Download</p>
              <ul className="mt-2 divide-x-0 divide-y divide-solid divide-brand-line rounded-xl ring-1 ring-brand-line">
                {logo.files.map((f) => {
                  const EXT = f.ext.toUpperCase();
                  const meta = fmtKitSize(f.size) + (f.px ? `, ${f.px[0]} × ${f.px[1]} px` : '');
                  return (
                    <li key={f.ext} className="flex items-center gap-2 px-3 py-2.5">
                      <span className="w-10 text-sm font-extrabold text-brand-indigo">{EXT}</span>
                      <span className="min-w-0 flex-1 text-xs leading-snug">
                        <span className="block">{FORMAT_HELP[f.ext]}</span>
                        <span className="block opacity-75">{meta}</span>
                      </span>
                      {f.ext !== 'ai' && (
                        <a
                          href={f.href}
                          target="_blank"
                          rel="noopener"
                          aria-label={`Open ${EXT} in a new tab`}
                          className="rounded-md px-2 py-1.5 text-xs font-semibold text-brand-indigo no-underline hover:bg-brand-paper"
                        >
                          Open
                        </a>
                      )}
                      <a
                        href={f.href}
                        download={f.filename}
                        aria-label={`Download ${EXT}`}
                        className="rounded-md bg-brand-indigo px-2.5 py-1.5 text-xs font-bold text-white no-underline hover:bg-brand-teal"
                      >
                        Download
                      </a>
                      <button
                        type="button"
                        title={`Copy ${EXT} URL`}
                        aria-label={`Copy ${EXT} URL`}
                        onClick={() => copy(absUrl(f.href), { label: `${EXT} URL` })}
                        className="rounded-md border-0 bg-transparent p-1.5 text-brand-indigo ring-1 ring-brand-line hover:bg-brand-indigo hover:text-white focus-visible:bg-brand-indigo focus-visible:text-white"
                      >
                        <CopyIcon className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
