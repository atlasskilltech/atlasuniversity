/* eslint-disable @next/next/no-img-element -- 1600x400 form headers, original files */
'use client';

import { useState } from 'react';
import { FORM_HEADERS } from '@/lib/brand/data';
import DownloadPill from '../ui/DownloadPill';
import { CHECKER } from '../ui/styles';

/*
 * ref "Google Form headers": a mock form showing the selected header, beside the on-colour (JPG)
 * and transparent (PNG) headers. Selecting a header shows it in the mock; each pill downloads the
 * original file and copies its URL.
 *
 * Layout, reworked from the reference for a compact section:
 *   - the reference's option grid used `min-[480px]:grid-cols-2`, an arbitrary variant this
 *     project's Tailwind does not compile (its screens mix min- and max-width), so all ten options
 *     stacked as full-width 194px cards and the grey preview stretched to the same 2,122px. The
 *     breakpoints below use the project's own screens (`n640` / `n1024` / `xl`) and a full
 *     `[@media(min-width:…)]` form, both of which compile;
 *   - the preview no longer stretches to the list: it sizes to its content (a 4:1 header over a
 *     short form stub) and, beside the list on desktop, stays in view while the list scrolls;
 *   - each option is a compact row — a fixed-width 4:1 thumbnail, the name and the download / copy
 *     pill — in one column on phones and on the narrower desktop column, two columns otherwise.
 */
const LIST = 'm-0 mt-3 grid list-none grid-cols-1 gap-2.5 p-0 [@media(min-width:560px)_and_(max-width:1023px)]:grid-cols-2 xl:grid-cols-2';

function Option({ h, selected, onSelect }) {
  return (
    <li
      className={`flex items-center gap-3 rounded-xl bg-white p-2 pr-2.5 transition ${selected ? 'ring-2 ring-brand-teal' : 'ring-1 ring-brand-line hover:ring-brand-indigo/40'}`}
    >
      <button
        type="button"
        onClick={() => onSelect(h)}
        aria-label={`Show ${h.name} header in the form preview`}
        aria-pressed={selected}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
      >
        <img
          src={h.src}
          alt=""
          width="1600"
          height="400"
          loading="lazy"
          decoding="async"
          className={`aspect-[4/1] w-24 shrink-0 rounded-md object-contain ring-1 ring-brand-line n640:w-28 ${h.transparent ? CHECKER : 'bg-white'}`}
        />
        <span className="line-clamp-2 min-w-0 text-xs font-semibold leading-snug text-brand-indigo">{h.name}</span>
      </button>
      <span className="shrink-0">
        <DownloadPill
          href={h.src}
          filename={h.src.split('/').pop()}
          label={h.ext}
          dlLabel={`Download ${h.name} form header`}
          copyLabel={`Copy ${h.name} form header URL`}
        />
      </span>
    </li>
  );
}

export default function FormHeaders() {
  const [cur, setCur] = useState(FORM_HEADERS.solid[0]);
  const groups = [
    ['On color', FORM_HEADERS.solid],
    ['Transparent', FORM_HEADERS.transparent],
  ];
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 n1024:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] n1024:items-start xl:gap-8">
      <figure className="m-0 rounded-2xl bg-[#DFDFDF]/60 p-4 n640:p-6 n1024:sticky n1024:top-20">
        <div className="mx-auto w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-[0_10px_30px_-12px_rgb(52_43_124/0.35)]">
          <img
            src={cur.src}
            alt={`${cur.name} form header on a sample form`}
            width="1600"
            height="400"
            className={`block aspect-[4/1] w-full object-contain ${cur.transparent ? CHECKER : 'bg-white'}`}
          />
          <div className="border-0 border-t-8 border-solid border-brand-indigo p-4 n640:p-5" aria-hidden="true">
            <div className="h-3.5 w-2/3 rounded bg-brand-indigo/80" />
            <div className="mt-3 h-2 w-full rounded bg-brand-line" />
            <div className="mt-2 h-2 w-4/5 rounded bg-brand-line" />
            <div className="mt-4 flex items-center gap-3">
              <div className="h-8 flex-1 rounded-md ring-1 ring-brand-line" />
              <div className="h-8 w-20 rounded-md bg-brand-teal" />
            </div>
          </div>
        </div>
        <figcaption className="mt-3 text-center text-sm" aria-live="polite">
          Preview: <span className="font-semibold text-brand-indigo">{cur.name}</span>
          <span className="text-brand-ink/70"> · {cur.ext}</span>
        </figcaption>
      </figure>

      <div>
        {groups.map(([title, list], i) => (
          <div key={title} className={i ? 'mt-5' : ''}>
            <h4 className="text-sm font-bold text-brand-indigo">
              {title} <span className="font-semibold text-brand-ink/60">{list.length}</span>
            </h4>
            <ul className={LIST}>
              {list.map((h) => (
                <Option key={h.src} h={h} selected={cur.src === h.src} onSelect={setCur} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
