/* eslint-disable @next/next/no-img-element -- logo artwork at its natural proportions (SVG / PNG originals) */
'use client';

import { fmtKitSize } from '@/lib/brand/utils';
import { FORMAT_HELP } from '@/lib/brand/data';
import DownloadPill from '../ui/DownloadPill';
import { GREEN_STAGE, STAGE_BG } from '../ui/styles';

/*
 * ref logoCard(): a preview stage (a button that opens the full-size dialog) over the logo's name,
 * note and one download pill per format. School cards follow the section's Preview-background
 * switch; product cards have a fixed stage per logo — the green tile on paper, the reversed (white)
 * artwork on the brand green — so no logo is ever shown on a clashing or invisible background.
 */
export function stageFor(logo, product, previewBg) {
  if (product) return logo.bg === 'dark' ? { className: '', style: GREEN_STAGE } : { className: STAGE_BG.light, style: undefined };
  return { className: STAGE_BG[previewBg], style: undefined };
}

export default function LogoCard({ group, logo, product, previewBg, onOpen }) {
  const stage = stageFor(logo, product, previewBg);
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-brand-line">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Preview ${group.title}, ${logo.name}`}
        style={stage.style}
        /* min-h-0: an aspect-ratio box keeps a content-based minimum height, so in the reference a
           tall logo (the stacked product marks) stretched its 16:10 stage from 289 to 462px when
           it loaded — shifting everything below and throwing anchor jumps off. Held at 16:10. */
        className={`flex aspect-[16/10] min-h-0 w-full items-center justify-center border-0 p-6 transition-colors n640:p-8 ${stage.className}`}
      >
        <img
          src={logo.preview}
          alt={`${group.title} logo, ${logo.name}`}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </button>
      <div className="flex flex-1 flex-col border-0 border-t border-solid border-brand-line p-4 n640:p-5">
        <h4 className="font-bold text-brand-indigo">{logo.name}</h4>
        <p className="mt-1 text-sm leading-snug">{logo.note}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {logo.files.map((f) => {
            const EXT = f.ext.toUpperCase();
            return (
              <DownloadPill
                key={f.ext}
                href={f.href}
                filename={f.filename}
                label={EXT}
                title={`${FORMAT_HELP[f.ext]}, ${fmtKitSize(f.size)}`}
                dlLabel={`Download ${logo.name} as ${EXT}, ${fmtKitSize(f.size)}`}
                copyLabel={`Copy ${logo.name} ${EXT} URL`}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}
