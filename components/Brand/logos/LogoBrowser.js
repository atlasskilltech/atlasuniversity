'use client';

import { useEffect, useMemo, useState } from 'react';
import Tabs, { panelId, tabId } from '../ui/Tabs';
import { SearchIcon } from '../ui/icons';
import LogoCard from './LogoCard';
import LogoDialog from './LogoDialog';

/*
 * One logo collection — the school logos (#logos) or the teams & products (#products) — as the
 * reference renders it (renderTabset): a sticky tab strip with one tab per brand and its logo
 * count, the selected brand's title and subtitle, and a grid of LogoCards. One shared preview
 * dialog serves every card.
 *
 *   search      added for the Next.js page: matches brand, school and logo names across every
 *               tab of this collection; while a query is typed the matches replace the tab panel
 *   previewBg   the school section's "Preview background" switch (light / Indigo / transparency);
 *               product stages are fixed per logo, so the products section has no switch
 *   deep links  `#logos-<brand>` / `#products-<brand>` select that tab and scroll to the section
 *               (the "One university, four schools" cards link this way)
 */
const BG_OPTIONS = [
  ['light', 'Light'],
  ['dark', 'Indigo'],
  ['checker', 'Transparency'],
];

export default function LogoBrowser({ groups, sectionId, product = false, stickyClass, searchLabel }) {
  const [tab, setTab] = useState(groups[0].id);
  const [previewBg, setPreviewBg] = useState('light');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null); // { groupId, logoId }

  /* deep links: #<section>-<brand> */
  useEffect(() => {
    const sync = () => {
      const m = new RegExp(`^#${sectionId}-([\\w-]+)$`).exec(window.location.hash);
      if (!m || !groups.some((g) => g.id === m[1])) return;
      setTab(m[1]);
      setQuery('');
      document.getElementById(sectionId)?.scrollIntoView({ block: 'start' });
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [groups, sectionId]);

  const items = groups.map((g) => ({
    id: g.id,
    label: product ? g.title.replace(/^ATLAS\s+/, '') : g.id === 'atlas' ? 'ATLAS' : g.title,
    count: g.logos.length,
  }));

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return null;
    const out = [];
    for (const g of groups) {
      for (const l of g.logos) {
        const hay = `${g.title} ${g.subtitle} ${l.name} ${l.note} ${l.id}`.toLowerCase();
        if (hay.includes(q)) out.push({ g, l });
      }
    }
    return out;
  }, [q, groups]);

  const current = groups.find((g) => g.id === tab) || groups[0];
  const openGroup = open && groups.find((g) => g.id === open.groupId);
  const openLogo = openGroup && openGroup.logos.find((l) => l.id === open.logoId);

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 n1024:flex-row n1024:items-end n1024:justify-between">
        <div className="relative w-full max-w-md">
          <label htmlFor={`${sectionId}-search`} className="sr-only">
            {searchLabel}
          </label>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-indigo/60" />
          <input
            id={`${sectionId}-search`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchLabel}
            autoComplete="off"
            className="block w-full rounded-full border-0 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line placeholder:font-medium placeholder:text-brand-ink/60 focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
        {!product && (
          <fieldset className="m-0 shrink-0 border-0 p-0">
            <legend className="mb-2 text-sm font-semibold text-brand-indigo">Preview background</legend>
            <div className="inline-flex rounded-lg bg-brand-paper p-1 ring-1 ring-brand-line">
              {BG_OPTIONS.map(([v, label]) => (
                <label key={v} className="cursor-pointer">
                  <input type="radio" name={`${sectionId}-bg`} value={v} checked={previewBg === v} onChange={() => setPreviewBg(v)} className="peer sr-only" />
                  <span
                    className={`block rounded-md px-3 py-1.5 text-sm font-semibold text-brand-ink peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-brand-teal ${
                      v === 'dark' ? 'peer-checked:bg-brand-indigo peer-checked:text-white' : 'peer-checked:bg-white peer-checked:text-brand-indigo'
                    }`}
                  >
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}
      </div>

      {matches ? (
        <div className="pt-10" aria-live="polite">
          <h3 className="text-xl font-bold text-brand-indigo">
            {matches.length} {matches.length === 1 ? 'logo matches' : 'logos match'} “{query.trim()}”
          </h3>
          {matches.length ? (
            <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 n640:grid-cols-2 xl:grid-cols-3">
              {matches.map(({ g, l }) => (
                <LogoCard key={`${g.id}/${l.id}`} group={g} logo={l} product={product} previewBg={previewBg} onOpen={() => setOpen({ groupId: g.id, logoId: l.id })} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-2xl border-2 border-dashed border-brand-line p-10 text-center text-sm">
              No logos match. Try a brand (ISDI, Edge, CRM) or a format name (stacked, circle, banner), or{' '}
              <button type="button" onClick={() => setQuery('')} className="border-0 bg-transparent p-0 font-semibold text-brand-teal underline">
                clear the search
              </button>
              .
            </p>
          )}
        </div>
      ) : (
        <>
          <div className={`sticky z-30 -mx-4 mt-8 border-0 border-b border-solid border-brand-line px-4 backdrop-blur n640:-mx-6 n640:px-6 n1024:-mx-10 n1024:px-10 ${stickyClass}`}>
            <Tabs items={items} value={tab} onChange={setTab} idPrefix={sectionId} label={product ? 'Team and product logo sets' : 'Logo sets'} />
          </div>
          <div role="tabpanel" id={panelId(sectionId, current.id)} aria-labelledby={tabId(sectionId, current.id)} className="pt-10">
            <h3 className="text-xl font-bold text-brand-indigo">{current.title}</h3>
            <p className="mt-1 text-sm">{current.subtitle}</p>
            <ul className="mt-6 grid list-none grid-cols-1 gap-5 p-0 n640:grid-cols-2 xl:grid-cols-3">
              {current.logos.map((l) => (
                <LogoCard key={l.id} group={current} logo={l} product={product} previewBg={previewBg} onOpen={() => setOpen({ groupId: current.id, logoId: l.id })} />
              ))}
            </ul>
          </div>
        </>
      )}

      <LogoDialog open={Boolean(openLogo)} group={openGroup} logo={openLogo} previewBg={product ? 'light' : previewBg} onClose={() => setOpen(null)} />
    </>
  );
}
