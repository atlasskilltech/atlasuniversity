'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import MapCanvas from './MapCanvas';
import NodePanel from './NodePanel';
import OutlineList from './OutlineList';
import SiteTable from './SiteTable';
import KeyInfo from './KeyInfo';
import { SCHOOL, LEVEL_LABEL, DATE_STATUS, fmtDate } from './theme';
import { ancestorsOf } from '@/lib/map/layout';
import { useMediaQuery } from '@/lib/useMediaQuery';

const ROOT = 'p:/';
const SHOW = [
  ['all', 'Everything'],
  ['programme', 'Programmes'],
  ['school', 'Schools'],
  ['page', 'Pages'],
  ['post', 'Articles'],
  ['document', 'Documents'],
  /* pages by what they publish (data/map facts + CRM inventory) */
  ['flag:crm', 'Pages with the CRM widget'],
  ['flag:dates', 'Pages with key dates'],
  ['flag:fees', 'Pages with fee information'],
];

/**
 * /map — the interactive ATLAS University map, a standalone full-viewport application. The site
 * header and footer step aside on this route (components/Schools/MainSiteOnly); the app bar,
 * toolbar and stage below are the only chrome. One snapshot, two ways in:
 *   Explore University     the roadmap (or its list view) + a details panel per node
 *   Website information    every known page with its safe page-health indicators
 *   Key information        CRM widget pages, key dates, fee information and fee documents
 * The Guide drawer holds the introduction, the key and the upcoming admission dates.
 */
export default function MapExplorer({ data }) {
  const byId = useMemo(() => new Map(data.nodes.map((n) => [n.id, n])), [data.nodes]);
  const byPath = useMemo(() => {
    const m = new Map();
    for (const n of data.nodes) if (n.path && !n.hash && n.type !== 'ref' && !m.has(n.path)) m.set(n.path, n.id);
    return m;
  }, [data.nodes]);

  const schoolsGroup = useMemo(() => byId.get(ROOT).children.find((c) => byId.get(c)?.label === 'Schools'), [byId]);
  const [mode, setMode] = useState('explore');
  /* phones open on the list view; the canvas is one tap away */
  const narrow = useMediaQuery('(max-width: 639px)');
  const [viewChoice, setView] = useState(null);
  const view = viewChoice ?? (narrow ? 'list' : 'map');
  const [expanded, setExpanded] = useState(() => new Set([ROOT, schoolsGroup].filter(Boolean)));
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filter, setFilter] = useState({ school: 'all', show: 'all', level: 'all' });
  const canvas = useRef(null);
  const pendingCenter = useRef(null);

  const toggle = useCallback((id) => {
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const reveal = useCallback(
    (id, center = true) => {
      setExpanded((s) => {
        const next = new Set(s);
        ancestorsOf(byId, id).forEach((a) => next.add(a));
        return next;
      });
      setGuideOpen(false);
      setSelected(id);
      if (center) pendingCenter.current = id;
    },
    [byId],
  );

  /* centre after the layout that contains the node has rendered */
  useEffect(() => {
    if (pendingCenter.current && canvas.current) {
      canvas.current.centerOn(pendingCenter.current);
      pendingCenter.current = null;
    }
  }, [expanded, selected]);

  const select = useCallback((id) => reveal(id, false), [reveal]);
  const goPath = useCallback(
    (p) => {
      const id = byPath.get(p);
      if (id) {
        setMode('explore');
        reveal(id);
      }
    },
    [byPath, reveal],
  );

  /* ---- filters: dim what does not match, open every branch that holds a match --------------- */
  const filterActive = filter.school !== 'all' || filter.show !== 'all' || filter.level !== 'all';
  const matchesFor = useCallback(
    (f) =>
      f.school === 'all' && f.show === 'all' && f.level === 'all'
        ? null
        : data.nodes.filter(
            (n) =>
              n.type !== 'group' && n.type !== 'ref' && n.type !== 'section' &&
              (f.school === 'all' || (f.school === 'none' ? !n.school : n.school === f.school)) &&
              (f.show === 'all' || (f.show.startsWith('flag:') ? Boolean(n.flags?.[f.show.slice(5)]) : n.type === f.show)) &&
              (f.level === 'all' || n.level === f.level),
          ),
    [data.nodes],
  );
  const matches = useMemo(() => matchesFor(filter), [matchesFor, filter]);
  const dimmed = useMemo(() => {
    if (!matches) return null;
    const keep = new Set();
    for (const n of matches) {
      keep.add(n.id);
      ancestorsOf(byId, n.id).forEach((a) => keep.add(a));
    }
    return new Set(data.nodes.filter((n) => !keep.has(n.id)).map((n) => n.id));
  }, [matches, byId, data.nodes]);
  /* changing a filter opens every branch that holds a match */
  const changeFilter = (patch) => {
    const next = { ...filter, ...patch };
    setFilter(next);
    const m = matchesFor(next);
    if (m) {
      setExpanded((s) => {
        const e = new Set(s);
        for (const n of m) ancestorsOf(byId, n.id).forEach((a) => e.add(a));
        return e;
      });
    }
  };

  /* ---- search -------------------------------------------------------------------------------- */
  const results = useMemo(() => {
    const t = query.trim().toLowerCase();
    if (t.length < 2) return [];
    const scored = [];
    for (const n of data.nodes) {
      if (n.type === 'ref') continue;
      const hay = [n.label, ...(n.aliases || []), n.degree || '', n.path || ''].join(' ').toLowerCase();
      if (!hay.includes(t)) continue;
      const lbl = n.label.toLowerCase();
      const score = (lbl.startsWith(t) ? 0 : lbl.includes(t) ? 1 : 2) + (n.type === 'programme' || n.type === 'school' ? -0.5 : 0) + (n.type === 'post' ? 1 : 0);
      scored.push([score, n]);
    }
    return scored.sort((a, b) => a[0] - b[0] || a[1].label.localeCompare(b[1].label)).slice(0, 12).map((x) => x[1]);
  }, [query, data.nodes]);

  const expandAll = () => setExpanded(new Set(data.nodes.filter((n) => n.children.length && n.type !== 'page' && n.type !== 'post').map((n) => n.id)));
  const collapseAll = () => setExpanded(new Set([ROOT]));

  const node = selected ? byId.get(selected) : null;
  const crumbs = node ? ancestorsOf(byId, node.id).map((id) => byId.get(id)) : [];
  const counts = useMemo(() => {
    const c = (t) => data.nodes.filter((n) => n.type === t).length;
    return { schools: c('school'), programmes: c('programme'), pages: data.nodes.filter((n) => n.path && n.type !== 'section').length };
  }, [data.nodes]);

  const selectCls = 'h-9 rounded-lg border border-[#cfd0d8] bg-white px-2 text-[13.5px] text-atlas-ink focus:border-atlas-teal focus:outline-none';
  const btnCls =
    'h-9 rounded-lg border border-[#cfd0d8] bg-white px-3 text-[13px] font-semibold text-atlas-ink hover:bg-[#f4f4fa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal';
  const panelOpen = Boolean(node) || guideOpen;

  return (
    /* A standalone, full-viewport application: the site header and footer step aside on /map, so
       nothing here makes room for them. Only the stage scrolls or pans; the page itself never does. */
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-[#fbfbfd] text-atlas-ink">
      {/* ---- app bar --------------------------------------------------------------------------- */}
      <header className="flex h-14 shrink-0 items-center gap-2 bg-atlas-footer px-3 text-white md:gap-3 md:px-4">
        <Link href="/" prefetch={false} aria-label="ATLAS SkillTech University — website home" className="shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/atlas-logo-102x45.svg"
            srcSet="/assets/logos/atlas-logo-102x45.svg 1x, /assets/logos/atlas-logo-204x91.svg 2x"
            width={82}
            height={36}
            alt="ATLAS SkillTech University"
            className="block h-9 w-auto"
          />
        </Link>
        <span className="hidden h-6 w-px bg-white/25 sm:block" aria-hidden="true" />
        <h1 className="hidden truncate text-[15px] font-bold sm:block">University Map</h1>

        <div role="tablist" aria-label="Map views" className="ml-auto flex rounded-full bg-white/10 p-1">
          {[
            ['explore', 'Explore University', 'Explore'],
            ['site', 'Website information', 'Website'],
            ['info', 'Key information', 'Key info'],
          ].map(([k, l, shortL]) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={mode === k}
              aria-label={l}
              onClick={() => setMode(k)}
              className={`h-8 rounded-full px-3 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal ${mode === k ? 'bg-white text-atlas-footer' : 'text-white/85 hover:text-white'}`}
            >
              <span className="md:hidden">{shortL}</span>
              <span className="hidden md:inline">{l}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setSelected(null);
            setGuideOpen((g) => !g);
          }}
          aria-pressed={guideOpen}
          aria-label="Guide: how to read the map and upcoming dates"
          className={`h-8 shrink-0 rounded-full border border-white/40 px-3 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal ${guideOpen ? 'bg-white text-atlas-footer' : 'text-white hover:bg-white/10'}`}
        >
          Guide
        </button>
      </header>

      {/* ---- toolbar (Explore only) -------------------------------------------------------------- */}
      {mode === 'explore' && (
        <div className="shrink-0 border-b border-[#e2e2ee] bg-white px-3 py-2 md:px-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-0 flex-[1_1_220px] md:max-w-[440px]">
              <label htmlFor="map-search" className="sr-only">Search the map</label>
              <input
                id="map-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && results[0]) {
                    reveal(results[0].id);
                    setSearchOpen(false);
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
                placeholder="Search a programme, school or page"
                autoComplete="off"
                aria-controls="map-search-results"
                className="h-9 w-full rounded-lg border border-[#cfd0d8] bg-[#fbfbfd] px-3 text-[14px] text-atlas-ink focus:border-atlas-teal focus:bg-white focus:outline-none"
              />
              {searchOpen && results.length > 0 && (
                <ul id="map-search-results" role="listbox" aria-label="Search results" className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[min(340px,60dvh)] overflow-y-auto rounded-lg border border-[#cfd0d8] bg-white shadow-lg">
                  {results.map((n) => {
                    const where = ancestorsOf(byId, n.id).map((a) => byId.get(a).label).slice(1).slice(-2).join(' › ');
                    return (
                      <li key={n.id} role="option" aria-selected="false">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            reveal(n.id);
                            setSearchOpen(false);
                          }}
                          className="block w-full px-3 py-2 text-left hover:bg-[#f4f4fa] focus-visible:bg-[#f4f4fa] focus-visible:outline-none"
                        >
                          <span className="block text-[14px] font-semibold text-atlas-ink">{n.label}</span>
                          <span className="block truncate text-[11.5px] text-[#6b6b7b]">{[n.degree, where].filter(Boolean).join(' · ')}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {searchOpen && query.trim().length >= 2 && !results.length && (
                <p className="absolute left-0 right-0 top-full z-30 mt-1 rounded-lg border border-[#cfd0d8] bg-white p-3 text-[13px] text-[#6b6b7b] shadow-lg">Nothing on the map matches “{query}”.</p>
              )}
            </div>

            <button type="button" onClick={() => setFiltersOpen((f) => !f)} aria-expanded={filtersOpen} aria-controls="map-filters" className={`${btnCls} md:hidden`}>
              Filters{filterActive ? ' •' : ''}
            </button>
            <div id="map-filters" className={`${filtersOpen ? 'flex' : 'hidden'} order-last w-full flex-wrap items-center gap-2 md:order-none md:flex md:w-auto`}>
              <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b7b]">
                <span>School</span>
                <select value={filter.school} onChange={(e) => changeFilter({ school: e.target.value })} className={selectCls}>
                  <option value="all">All</option>
                  {Object.entries(SCHOOL).map(([k, s]) => <option key={k} value={k}>{s.short}</option>)}
                  <option value="none">University-wide</option>
                </select>
              </label>
              <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b7b]">
                <span>Show</span>
                <select value={filter.show} onChange={(e) => changeFilter({ show: e.target.value })} className={selectCls}>
                  {SHOW.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b7b]">
                <span>Level</span>
                <select value={filter.level} onChange={(e) => changeFilter({ level: e.target.value })} className={selectCls}>
                  <option value="all">All</option>
                  {Object.entries(LEVEL_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </label>
              {filterActive && (
                <button type="button" onClick={() => setFilter({ school: 'all', show: 'all', level: 'all' })} className="h-9 rounded-lg px-2 text-[13px] font-semibold text-atlas-footer underline underline-offset-2">
                  Clear filters ({matches.length})
                </button>
              )}
            </div>

            <div className="ml-auto flex gap-2">
              <div className="flex overflow-hidden rounded-lg border border-[#cfd0d8]" role="group" aria-label="Display">
                {[
                  ['map', 'Map'],
                  ['list', 'List'],
                ].map(([k, l]) => (
                  <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)} className={`h-9 px-3 text-[13px] font-semibold ${view === k ? 'bg-atlas-footer text-white' : 'bg-white text-atlas-ink hover:bg-[#f4f4fa]'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <button type="button" onClick={expandAll} className={btnCls}>Expand all</button>
              <button type="button" onClick={collapseAll} className={btnCls}>Collapse</button>
            </div>
          </div>
        </div>
      )}

      {/* ---- stage: everything below the bars ------------------------------------------------------ */}
      <div className="relative min-h-0 flex-1">
        {mode === 'explore' ? (
          view === 'map' ? (
            <MapCanvas ref={canvas} byId={byId} rootId={ROOT} expanded={expanded} onToggle={toggle} selected={selected} onSelect={select} dimmed={dimmed} />
          ) : (
            <OutlineList rootId={ROOT} byId={byId} expanded={expanded} onToggle={toggle} onSelect={select} selected={selected} dimmed={dimmed} />
          )
        ) : mode === 'info' ? (
          <KeyInfo keyInfo={data.keyInfo} onGoPath={goPath} />
        ) : (
          <SiteTable
            nodes={data.nodes}
            byId={byId}
            onSelect={(id) => {
              setGuideOpen(false);
              setSelected(id);
            }}
            audit={data.audit}
            changes={data.changes}
          />
        )}

        {panelOpen && (
          <aside
            aria-label={node ? `Details: ${node.label}` : 'Guide'}
            className="absolute inset-x-0 bottom-0 z-20 h-[78%] rounded-t-2xl border-t border-[#e2e2ee] bg-white shadow-[0_-8px_30px_rgba(20,20,60,0.18)] lg:inset-x-auto lg:right-0 lg:top-0 lg:h-auto lg:w-[420px] lg:rounded-none lg:border-l lg:border-t-0 lg:shadow-[-8px_0_24px_rgba(20,20,60,0.10)]"
          >
            {node ? (
              <NodePanel node={node} byId={byId} crumbs={crumbs} onSelect={select} onToggle={toggle} expanded={expanded} onClose={() => setSelected(null)} onGoPath={goPath} mode={mode} />
            ) : (
              <Guide data={data} counts={counts} onClose={() => setGuideOpen(false)} onGoPath={goPath} />
            )}
          </aside>
        )}
      </div>
    </div>
  );
}

function Guide({ data, counts, onClose, onGoPath }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-3 border-b border-[#ececf2] px-5 pb-4 pt-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-[19px] font-bold leading-[24px]">Explore ATLAS University</h2>
          <p className="mt-1 text-[12.5px] text-[#6b6b7b]">
            {counts.schools} schools · {counts.programmes} programmes · {counts.pages} pages · built from the website on {fmtDate(data.snapshotAt)}
          </p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close guide" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[20px] text-[#6b6b7b] hover:bg-[#f1f1f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal">
          ×
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 text-[13.5px] leading-[20px] text-[#3c3c4a]">
        <p>
          Every school, programme and page of this website as one map. Open a branch with its <strong className="font-bold">+</strong>, pick a programme to see its fees, eligibility and admission dates with the page each value comes from, and go straight to the page itself.
        </p>
        <h3 className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6b6b7b]">How to read the map</h3>
        <ul className="space-y-2 text-[13px] leading-[18px]">
          <li><span className="mr-2 inline-block h-3 w-5 rounded bg-atlas-footer align-middle" aria-hidden="true" />The university</li>
          <li><span className="mr-2 inline-block h-3 w-5 rounded border-2 border-[#e9c46a] bg-[#fff6d6] align-middle" aria-hidden="true" />A section of the website</li>
          <li><span className="mr-2 inline-block h-3 w-5 rounded border border-[#c9cbe3] bg-white align-middle" aria-hidden="true" /><span className="mr-1 inline-block h-3 w-1.5 rounded bg-[#d20158] align-middle" aria-hidden="true" />A school or programme (colour = school)</li>
          <li><span className="mr-2 inline-block h-3 w-5 rounded border border-dashed border-[#9a9ab8] bg-[#f4f4fa] align-middle" aria-hidden="true" />↪ A shortcut to an item placed elsewhere</li>
          <li><strong className="font-bold">“on the live site”</strong> — the page exists on atlasuniversity.edu.in but is not part of this site yet.</li>
          <li>Drag to move, scroll or pinch to zoom; on the keyboard, arrows move and <strong className="font-bold">+ − 0</strong> zoom and fit.</li>
        </ul>
        <p className="mt-3 text-[12px] leading-[17px] text-[#6b6b7b]">
          Fees, dates and eligibility are shown exactly as the website publishes them, each with its source page. Anything a page does not publish is marked “Not Available”; two pages that disagree are flagged instead of one being picked.
        </p>
        <h3 className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6b6b7b]">Upcoming admission dates</h3>
        {data.upcoming.length ? (
          <ul className="divide-y divide-[#f0f0f5]">
            {data.upcoming.slice(0, 10).map((f) => (
              <li key={f.id} className="py-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="font-semibold text-atlas-ink">{f.label}</span>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="font-semibold">{f.value}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${DATE_STATUS.upcoming.cls}`}>Upcoming</span>
                  </span>
                </div>
                <span className="block text-[12px] text-[#6b6b7b]">
                  {f.group} ·{' '}
                  <button type="button" onClick={() => onGoPath(f.source.path)} className="underline decoration-dotted underline-offset-2">{f.source.label}</button>
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#6b6b7b]">No upcoming dates are published on the website right now.</p>
        )}
      </div>
    </div>
  );
}
