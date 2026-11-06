'use client';

/* =====================================================================
   The studio header.

   Interface furniture, not part of any document. It carries the official
   ATLAS SkillTech University logo (the site header's own files, see
   lib/pdf-studio/product.js) at a size that leaves the artwork untouched -
   fixed height, width free - the line describing the collection beside
   it, and the one action that applies to the whole collection.

   The product's name is kept in the <h1> for structure and read by
   screen readers.
   ===================================================================== */
import { PRODUCT } from '@/lib/pdf-studio/product';

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 2a1 1 0 011 1v8.59l2.3-2.3a1 1 0 111.4 1.42l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.42l2.3 2.3V3a1 1 0 011-1zM3 15a1 1 0 011 1v1h12v-1a1 1 0 112 0v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 011-1z" />
    </svg>
  );
}

export default function StudioHeader({ onDownloadAll, busy }) {
  return (
    <header className="bg-[#342B7C] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 n640:gap-4 n640:px-6">
        <h1 className="flex-none">
          <span className="sr-only">{PRODUCT.name}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PRODUCT.logo.src}
            srcSet={PRODUCT.logo.srcSet}
            width={PRODUCT.logo.width}
            height={PRODUCT.logo.height}
            alt={PRODUCT.logo.alt}
            className="block h-10 w-auto n640:h-12"
          />
        </h1>
        <p className="mr-auto min-w-0 text-[0.7rem] leading-snug text-white/75 n640:text-xs n1024:text-sm n640:leading-snug n1024:leading-snug">
         Create · Manage · Preview & Share Professional PDFs
        </p>
        <button
          type="button"
          onClick={onDownloadAll}
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#342B7C] shadow transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3CA7B6] disabled:cursor-not-allowed disabled:opacity-60 n640:w-auto leading-5"
        >
          <DownloadIcon />
          <span className="n640:hidden">Download all</span>
          <span className="hidden n640:inline">Download All Fee Structures</span>
        </button>
      </div>
    </header>
  );
}
