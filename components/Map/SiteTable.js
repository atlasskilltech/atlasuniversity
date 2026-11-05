'use client';

import { useMemo, useState } from 'react';
import { SCHOOL, TYPE_LABEL, fmtDate } from './theme';

const STATUS_FILTERS = [
  ['all', 'All pages'],
  ['ok', 'OK (200)'],
  ['redirect', 'Redirects'],
  ['missing', '4xx / not found'],
  ['error', '5xx / unreachable'],
  ['soft404', 'Soft 404'],
  ['broken', 'Has broken links'],
  ['live', 'Live site only'],
  ['unchecked', 'Not checked'],
];

function statusClass(h, n) {
  if (!h) return n.opensLive ? 'live' : 'unchecked';
  if (h.reason || (h.finalStatus ?? 0) >= 500) return 'error';
  if ((h.finalStatus ?? 0) >= 400) return 'missing';
  if (h.soft404) return 'soft404';
  if (h.redirects.length) return 'redirect';
  return 'ok';
}

const PILL = {
  ok: 'bg-[#e6f6ec] text-[#14632f]',
  redirect: 'bg-[#e8eef9] text-atlas-deep',
  missing: 'bg-[#fdecec] text-[#9b1c1c]',
  error: 'bg-[#fdecec] text-[#9b1c1c]',
  soft404: 'bg-[#fff6d6] text-[#7a5a00]',
  live: 'bg-[#f1f1f4] text-[#5a5a66]',
  unchecked: 'bg-[#f1f1f4] text-[#5a5a66]',
};

function StatusPill({ h, n }) {
  const c = statusClass(h, n);
  const text =
    c === 'unchecked' ? 'Not checked' : c === 'live' && !h ? 'Live site' : h?.reason ? 'Unreachable' : `${h.status}${h.redirects.length ? ` → ${h.finalStatus}` : ''}${h.soft404 ? ' (soft 404)' : ''}`;
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${PILL[c]}`}>{text}</span>;
}

/**
 * "Website information": every page the map knows about, with its safe page-health indicators —
 * HTTP status, redirect target, canonical, indexability, broken internal links, content
 * completeness and when it was last checked. A table from 768px, cards below.
 */
export default function SiteTable({ nodes, byId, onSelect, audit, changes }) {
  const [status, setStatus] = useState('all');
  const [school, setSchool] = useState('all');
  const [q, setQ] = useState('');

  const pages = useMemo(() => nodes.filter((n) => n.path && n.type !== 'section' && n.type !== 'ref'), [nodes]);
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return pages.filter((n) => {
      const c = statusClass(n.health, n);
      if (status === 'broken' ? !n.health?.brokenLinks.length : status !== 'all' && c !== status) return false;
      if (school !== 'all' && (school === 'none' ? n.school : n.school !== school)) return false;
      if (t && !`${n.label} ${n.path}`.toLowerCase().includes(t)) return false;
      return true;
    });
  }, [pages, status, school, q]);

  const counts = useMemo(() => {
    const c = {};
    for (const n of pages) {
      const k = statusClass(n.health, n);
      c[k] = (c[k] || 0) + 1;
      if (n.health?.brokenLinks.length) c.broken = (c.broken || 0) + 1;
    }
    c.all = pages.length;
    return c;
  }, [pages]);

  const parentLabel = (n) => {
    let p = byId.get(n.parent);
    while (p && p.type === 'group' && byId.get(p.parent)) p = byId.get(p.parent);
    return p ? p.label : '—';
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex flex-wrap items-end gap-3 border-b border-[#ececf2] p-3">
        <label className="flex min-w-[200px] flex-1 flex-col text-[12px] font-semibold text-[#6b6b7b]">
          Find a page
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title or URL" className="mt-1 h-10 rounded-lg border border-[#cfd0d8] px-3 text-[14px] font-normal text-atlas-ink focus:border-atlas-teal focus:outline-none" />
        </label>
        <label className="flex flex-col text-[12px] font-semibold text-[#6b6b7b]">
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 h-10 rounded-lg border border-[#cfd0d8] bg-white px-2 text-[14px] font-normal text-atlas-ink">
            {STATUS_FILTERS.map(([k, l]) => (
              <option key={k} value={k}>{l} ({counts[k] || 0})</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col text-[12px] font-semibold text-[#6b6b7b]">
          School
          <select value={school} onChange={(e) => setSchool(e.target.value)} className="mt-1 h-10 rounded-lg border border-[#cfd0d8] bg-white px-2 text-[14px] font-normal text-atlas-ink">
            <option value="all">All</option>
            {Object.entries(SCHOOL).map(([k, s]) => <option key={k} value={k}>{s.short}</option>)}
            <option value="none">University-wide</option>
          </select>
        </label>
        {changes && (changes.pagesAdded || changes.pagesRemoved || changes.valuesChanged.length > 0) && (
          <details className="w-full rounded-lg border border-[#e9c46a] bg-[#fff6d6] px-3 py-2 text-[12.5px] text-[#5c4300]">
            <summary className="cursor-pointer font-semibold">
              Since the previous snapshot ({fmtDate(changes.at)}): {changes.pagesAdded} page{changes.pagesAdded === 1 ? '' : 's'} added, {changes.pagesRemoved} removed,{' '}
              {changes.valuesChanged.length} published value{changes.valuesChanged.length === 1 ? '' : 's'} changed
            </summary>
            {changes.valuesChanged.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {changes.valuesChanged.map((c, i) => (
                  <li key={i}>
                    <strong className="font-semibold">{c.label}</strong>{c.group ? ` (${c.group})` : ''}: {c.from} → <strong className="font-semibold">{c.to}</strong>{' '}
                    <span className="font-mono text-[11px]">{c.route}</span>
                  </li>
                ))}
              </ul>
            )}
          </details>
        )}
        <p className="w-full text-[12px] text-[#6b6b7b]" aria-live="polite">
          {rows.length} of {pages.length} pages ·{' '}
          {audit.checkedAt ? `last audit ${fmtDate(audit.checkedAt)} (${audit.environment === 'production' ? 'live website' : 'this site’s build'}${audit.capped ? ', capped' : ''})` : 'page health has not been audited yet'}
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="hidden w-full border-collapse text-left text-[13px] md:table">
          <thead className="sticky top-0 z-[1] bg-[#f7f7fb] text-[11.5px] uppercase tracking-[0.05em] text-[#6b6b7b]">
            <tr>
              {['Page', 'Parent', 'School', 'Status', 'Canonical', 'Indexable', 'Broken links', 'Content', 'Checked'].map((h) => (
                <th key={h} scope="col" className="whitespace-nowrap border-b border-[#ececf2] px-3 py-2 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => {
              const h = n.health;
              return (
                <tr key={n.id} className="border-b border-[#f0f0f5] align-top hover:bg-[#fafafd]">
                  <td className="max-w-[340px] px-3 py-2">
                    <button type="button" onClick={() => onSelect(n.id)} className="text-left font-semibold text-atlas-footer underline-offset-2 hover:underline">{n.label}</button>
                    <span className="block break-all font-mono text-[11px] text-[#8a8a96]">{n.path}</span>
                    <span className="text-[11px] text-[#8a8a96]">{TYPE_LABEL[n.type]}</span>
                  </td>
                  <td className="max-w-[180px] px-3 py-2 text-[#3c3c4a]">{parentLabel(n)}</td>
                  <td className="px-3 py-2">{n.school ? SCHOOL[n.school]?.short : 'University'}</td>
                  <td className="px-3 py-2">
                    <StatusPill h={h} n={n} />
                    {h?.redirects.length > 0 && <span className="mt-1 block break-all text-[11px] text-[#6b6b7b]">→ {h.redirects[h.redirects.length - 1].to}</span>}
                  </td>
                  <td className="max-w-[180px] break-all px-3 py-2 text-[12px]">{!h ? '—' : !h.canonical ? 'Missing' : h.canonicalMatches ? 'Self' : h.canonical}</td>
                  <td className="px-3 py-2">{!h ? '—' : h.indexable ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2">{!h ? '—' : h.brokenLinks.length ? <span className="font-semibold text-[#9b1c1c]">{h.brokenLinks.length}</span> : '0'}</td>
                  <td className="px-3 py-2 capitalize">{h?.completeness || '—'}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-[12px] text-[#6b6b7b]">{h ? fmtDate(h.checkedAt) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <ul className="md:hidden">
          {rows.map((n) => {
            const h = n.health;
            return (
              <li key={n.id} className="border-b border-[#f0f0f5] px-3 py-3">
                <button type="button" onClick={() => onSelect(n.id)} className="text-left text-[14px] font-semibold text-atlas-footer">{n.label}</button>
                <span className="block break-all font-mono text-[11px] text-[#8a8a96]">{n.path}</span>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[12px] text-[#3c3c4a]">
                  <StatusPill h={h} n={n} />
                  {h && <span>{h.indexable ? 'Indexable' : 'Not indexable'}</span>}
                  {h?.brokenLinks.length > 0 && <span className="font-semibold text-[#9b1c1c]">{h.brokenLinks.length} broken links</span>}
                  {h && <span className="capitalize">{h.completeness}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        {!rows.length && <p className="p-6 text-center text-[14px] text-[#6b6b7b]">No pages match these filters.</p>}
      </div>
    </div>
  );
}
