'use client';

import { STATUS } from '../ui/styles';
import { TrashIcon, UploadIcon } from '../ui/icons';
import { useState } from 'react';

/* Small pieces every tool shares (ref status lines, clear buttons, counts, drop zones). */

export function Status({ msg, kind = '', className = 'mt-3' }) {
  return (
    <p role="status" aria-live="polite" className={`${className} text-xs font-semibold ${STATUS[kind] || STATUS['']}`}>
      {msg}
    </p>
  );
}

export function ClearButton({ onClick, label = 'Clear', icon = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg border-0 bg-transparent px-3 py-1.5 text-xs font-bold text-brand-indigo ring-1 ring-brand-line transition hover:bg-brand-indigo hover:text-white"
    >
      {icon && <TrashIcon />}
      {label}
    </button>
  );
}

export function Counts({ items }) {
  return (
    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-ink">
      {items.map(([n, label]) => (
        <span key={label}>
          <span className="font-bold text-brand-indigo">{n}</span> {label}
        </span>
      ))}
    </div>
  );
}

export function Check({ checked, onChange, children }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-brand-ink">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-brand-teal" />
      {children}
    </label>
  );
}

/*
 * ref wireDrop(): a dashed drop zone wrapping a hidden file input — click to browse, or drop files.
 * The border turns ATLAS Teal while files are dragged over it.
 */
export function DropZone({ accept, multiple, onFiles, title, hint, className = '', big = false }) {
  const [over, setOver] = useState(false);
  return (
    <label
      onDragEnter={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        if (!e.currentTarget.contains(e.relatedTarget)) setOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (e.dataTransfer?.files?.length) onFiles(e.dataTransfer.files);
      }}
      className={`group block cursor-pointer rounded-2xl border-2 border-dashed bg-white text-center transition hover:border-brand-teal focus-within:border-brand-teal ${big ? 'p-10 n640:p-14' : 'p-6'} ${over ? 'border-brand-teal bg-brand-teal/5' : 'border-brand-line'} ${className}`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <UploadIcon />
      <p className="mt-2 text-sm font-bold text-brand-indigo">{title}</p>
      <p className="mt-0.5 text-xs text-brand-ink">
        or <span className="font-semibold text-brand-teal underline">browse files</span> · {hint}
      </p>
    </label>
  );
}
