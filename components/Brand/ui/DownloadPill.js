'use client';

import { useBrandToast } from '../BrandToast';
import { CopyIcon } from './icons';

/*
 * ref dlCopyPill(): one compact pill — the format label downloads the ORIGINAL file (under its
 * brand-kit filename), and the copy glyph beside it copies that file's absolute URL.
 */
export function absUrl(path) {
  try {
    return new URL(path, window.location.href).href;
  } catch {
    return path;
  }
}

export default function DownloadPill({ href, filename, label, title, dlLabel, copyLabel }) {
  const { copy } = useBrandToast();
  return (
    <span className="inline-flex overflow-hidden rounded-md ring-1 ring-brand-line">
      <a
        href={href}
        download={filename}
        title={title}
        aria-label={dlLabel}
        className="px-2.5 py-1.5 text-xs font-bold text-brand-indigo no-underline transition hover:bg-brand-indigo hover:text-white"
      >
        {label}
      </a>
      <button
        type="button"
        onClick={() => copy(absUrl(href), { label: `${label} URL` })}
        title={`Copy ${label} URL`}
        aria-label={copyLabel}
        className="flex items-center border-0 border-l border-solid border-brand-line bg-transparent px-1.5 text-brand-indigo transition hover:bg-brand-indigo hover:text-white focus-visible:bg-brand-indigo focus-visible:text-white"
      >
        <CopyIcon className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}
