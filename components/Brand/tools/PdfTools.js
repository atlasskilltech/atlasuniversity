'use client';

import { useEffect, useRef, useState } from 'react';
import { IC, TOOLS, setToast } from '@/lib/brand/pdf/engine';
import { useBrandToast } from '../BrandToast';
import { SearchIcon } from '../ui/icons';

/*
 * ref pdf-tools.html: a dashboard of 25 tools (search, category chips, status legend, cards) and a
 * single-tool workspace. The tools themselves are the reference's own implementations
 * (lib/brand/pdf/engine.js), mounted into the workspace body exactly as the reference mounts them
 * into #ws-body, with their cleanups run on close. A tool is deep-linkable as `#pdf-<id>` (the
 * reference used `#tool-<id>` on its own page).
 */
const CATS = [
  { id: 'all', label: 'All Tools' },
  { id: 'organize', label: 'Organize PDF' },
  { id: 'optimize', label: 'Compress & Repair' },
  { id: 'toPdf', label: 'Convert to PDF' },
  { id: 'fromPdf', label: 'Convert from PDF' },
  { id: 'edit', label: 'Edit PDF' },
  { id: 'security', label: 'Security' },
  { id: 'utility', label: 'Utilities' },
];
const DOT = { local: 'bg-brand-teal', limited: 'bg-brand-law', unavailable: 'bg-brand-ugdx' };
const LABEL = { local: 'In browser', limited: 'Limited', unavailable: 'Unavailable' };
const TONE = { local: 'text-brand-teal', limited: 'text-brand-law', unavailable: 'text-brand-ugdx' };
export const PDF_HASH = 'pdf-';

function ToolIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-full w-full"
      /* static path data from the reference's icon table — never user input */
      dangerouslySetInnerHTML={{ __html: IC[name] || IC.info }}
    />
  );
}

function Workspace({ tool, onBack }) {
  const { notify } = useBrandToast();
  const bodyRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const body = bodyRef.current;
    const cleanups = [];
    setToast(notify);
    body.innerHTML = '';
    try {
      tool.build({ body, tool, onCleanup: (fn) => cleanups.push(fn) });
    } catch (e) {
      const p = document.createElement('p');
      p.className = 'rounded-xl bg-brand-ugdx/10 p-4 text-sm font-semibold text-brand-ugdx ring-1 ring-brand-ugdx/30';
      p.textContent = `This tool failed to start: ${e?.message || String(e)}`;
      body.appendChild(p);
    }
    const r = headRef.current?.getBoundingClientRect();
    if (r && (r.top < 0 || r.top > window.innerHeight * 0.6)) headRef.current.scrollIntoView({ block: 'start' });
    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {
          /* ignore */
        }
      });
      body.innerHTML = '';
    };
  }, [tool, notify]);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-lg border-0 bg-transparent px-3 py-2 text-sm font-bold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo hover:text-white focus-visible:ring-4 focus-visible:ring-brand-teal/40"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        All PDF tools
      </button>
      <div ref={headRef} className="mt-5 flex scroll-mt-20 items-start gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-indigo/5 text-brand-indigo ring-1 ring-inset ring-brand-indigo/10">
          <span className="h-7 w-7">
            <ToolIcon name={tool.icon} />
          </span>
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-extrabold tracking-tight text-brand-indigo n640:text-2xl">{tool.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-brand-ink">
            {tool.desc}{' '}
            <span className={`ml-1 inline-flex items-center gap-1 align-middle text-xs font-bold ${TONE[tool.status]}`}>
              <span className={`inline-block h-2 w-2 rounded-full ${DOT[tool.status]}`} />
              {LABEL[tool.status]}
            </span>
          </p>
        </div>
      </div>
      {/* the tool's own DOM; .pg-drag / .pg-over are its drag-state markers (ref <style>) */}
      <div
        ref={bodyRef}
        className="mt-7 [&_.pg-drag]:opacity-40 [&_.pg-over]:outline [&_.pg-over]:outline-[3px] [&_.pg-over]:outline-offset-2 [&_.pg-over]:outline-brand-teal [&_.pg-over]:[outline-style:dashed]"
      />
    </div>
  );
}

const fromHash = () => {
  const h = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
  return h.startsWith(PDF_HASH) && TOOLS.some((t) => t.id === h.slice(PDF_HASH.length)) ? h.slice(PDF_HASH.length) : null;
};

export default function PdfTools() {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');
  const [toolId, setToolId] = useState(fromHash);
  const searchRef = useRef(null);

  useEffect(() => {
    const onHash = () => {
      const id = fromHash();
      if (id) setToolId(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = (id) => {
    setToolId(id);
    history.replaceState(null, '', `#${PDF_HASH}${id}`);
  };
  const close = () => {
    setToolId(null);
    history.replaceState(null, '', '#tools-pdf');
  };

  const tool = TOOLS.find((t) => t.id === toolId);
  if (tool) return <Workspace key={tool.id} tool={tool} onBack={close} />;

  const q = query.trim().toLowerCase();
  const list = TOOLS.filter((t) => (cat === 'all' || t.cat === cat) && (!q || `${t.name} ${t.desc} ${t.kw || ''}`.toLowerCase().includes(q)));

  return (
    <div>
      <p className="max-w-2xl leading-relaxed">
        Merge, split, compress, convert and organize your PDFs with simple browser-based tools. Files are processed on your device — nothing is uploaded to any server.
      </p>
      <div className="mt-6 max-w-xl">
        <label htmlFor="pdf-search" className="sr-only">Search PDF tools</label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-indigo/60" />
          <input
            ref={searchRef}
            id="pdf-search"
            type="search"
            autoComplete="off"
            placeholder="Search PDF tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-full border-0 bg-white py-3.5 pl-12 pr-4 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line placeholder:font-medium placeholder:text-brand-ink/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-teal"
          />
        </div>
      </div>

      <div role="tablist" aria-label="Tool categories" className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATS.map((c) => {
          const on = c.id === cat;
          const count = c.id === 'all' ? TOOLS.length : TOOLS.filter((t) => t.cat === c.id).length;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setCat(c.id)}
              className={`shrink-0 rounded-full border-0 px-4 py-2 text-sm font-semibold transition ${on ? 'bg-brand-indigo text-white' : 'bg-white text-brand-indigo ring-1 ring-inset ring-brand-line hover:bg-brand-indigo/5'}`}
            >
              {c.label} <span className={on ? 'text-white/70' : 'text-brand-ink/50'}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-brand-ink">
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-teal" />Runs in your browser</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-law" />Works with limits</span>
        <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-ugdx" />Not available in-browser</span>
      </div>

      {list.length ? (
        <div className="mt-6 grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 n1024:grid-cols-3 xl:grid-cols-4">
          {list.map((t) => (
            <button
              key={t.id}
              type="button"
              data-tool={t.id}
              onClick={() => open(t.id)}
              className="group flex h-full flex-col rounded-2xl border-0 bg-white p-5 text-left ring-1 ring-brand-line transition hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand-indigo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
            >
              <span className="flex w-full items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-indigo/5 text-brand-indigo ring-1 ring-inset ring-brand-indigo/10 transition group-hover:bg-brand-indigo group-hover:text-white">
                  <span className="h-6 w-6">
                    <ToolIcon name={t.icon} />
                  </span>
                </span>
                <span className="flex items-center gap-1.5 rounded-full bg-brand-paper px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-ink ring-1 ring-inset ring-brand-line">
                  <span className={`inline-block h-2 w-2 rounded-full ${DOT[t.status]}`} />
                  {LABEL[t.status]}
                </span>
              </span>
              <span className="mt-4 text-sm font-extrabold text-brand-indigo">{t.name}</span>
              <span className="mt-1 flex-1 text-xs leading-relaxed text-brand-ink">{t.desc}</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand-teal">
                Open tool
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border-2 border-dashed border-brand-line p-12 text-center">
          <p className="text-sm font-semibold text-brand-indigo">No tools match your search.</p>
          <p className="mt-1 text-sm text-brand-ink/70">
            Try a different term, or{' '}
            <button
              type="button"
              onClick={() => {
                setQuery('');
                searchRef.current?.focus();
              }}
              className="border-0 bg-transparent p-0 font-semibold text-brand-teal underline"
            >
              clear the search
            </button>
            .
          </p>
        </div>
      )}
    </div>
  );
}
