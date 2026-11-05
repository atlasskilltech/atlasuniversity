'use client';

import { useState } from 'react';
import { SCHOOL, DATE_STATUS, VERIFY, fmtDate } from './theme';

const CATEGORIES = [
  ['crm', 'CRM widget pages'],
  ['dates', 'Key dates'],
  ['fees', 'Fee information'],
  ['docs', 'Fee structure documents'],
];

const CRM_STATUS = {
  integrated: { label: 'Integrated here', cls: 'bg-[#e6f6ec] text-[#14632f]' },
  partial: { label: 'Partly integrated', cls: 'bg-[#fff6d6] text-[#7a5a00]' },
  missing: { label: 'Not integrated', cls: 'bg-[#fdecec] text-[#9b1c1c]' },
  'not-built': { label: 'Page not built here', cls: 'bg-[#f1f1f4] text-[#5a5a66]' },
};

const pill = 'inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11.5px] font-semibold';
const th = 'px-3 py-2 text-left text-[11.5px] font-bold uppercase tracking-[0.05em] text-[#6b6b7b]';
const td = 'px-3 py-2 align-top';

function School({ s }) {
  if (!s || !SCHOOL[s]) return <span className="text-[12px] text-[#6b6b7b]">University</span>;
  return <span className={`text-[12px] font-bold ${SCHOOL[s].text}`}>{SCHOOL[s].short}</span>;
}

/* a page link: this site, or the live site when the page is not built here */
function PageLink({ label, path, href, onGoPath }) {
  const live = /^https?:/.test(href);
  return (
    <span className="block min-w-0">
      <a href={href} className="font-semibold text-atlas-ink underline decoration-[#c9cbe3] underline-offset-2 hover:decoration-atlas-teal" {...(live ? { target: '_blank', rel: 'noopener' } : {})}>
        {label}
      </a>
      <span className="block truncate text-[11.5px] text-[#6b6b7b]">
        {path}
        {live ? ' · on the live site' : ''}
        {onGoPath && !live && (
          <>
            {' · '}
            <button type="button" onClick={() => onGoPath(path)} className="underline decoration-dotted underline-offset-2">
              show on map
            </button>
          </>
        )}
      </span>
    </span>
  );
}

function Verify({ v }) {
  const x = VERIFY[v?.state] || VERIFY.unverified;
  return <span className={`${pill} ${x.cls}`}>{x.label}</span>;
}

/**
 * "Key information": four searchable lists built from the discovery snapshot — every page carrying
 * the ATLAS CRM widget, every published admission date, every page publishing fee amounts or a fee
 * structure link, and every distinct fee document. Each row names its page, route and source section
 * and links to the page (or document) itself. Nothing here is computed beyond the snapshot: a value
 * is shown exactly as its page publishes it.
 */
export default function KeyInfo({ keyInfo, onGoPath }) {
  const [cat, setCat] = useState('crm');
  const [school, setSchool] = useState('all');
  const [q, setQ] = useState('');
  const [sub, setSub] = useState('all');

  const t = q.trim().toLowerCase();
  const hit = (...parts) => !t || parts.join(' ').toLowerCase().includes(t);
  const inSchool = (s) => school === 'all' || (school === 'none' ? !s : s === school);

  const rows = (() => {
    if (cat === 'crm') return keyInfo.crm.filter((r) => inSchool(r.school) && (sub === 'all' || r.status === sub) && hit(r.label, r.path, r.referencePath || ''));
    if (cat === 'dates') return keyInfo.dates.filter((r) => inSchool(r.school) && (sub === 'all' || r.status === sub) && hit(r.label, r.value, r.group || '', r.section || '', r.source.label, r.source.path));
    if (cat === 'fees') return keyInfo.fees.filter((r) => inSchool(r.school) && (sub === 'all' || r.contains === sub) && hit(r.label, r.path, ...r.amounts.map((a) => `${a.label} ${a.value}`), ...r.documents.map((d) => d.label)));
    return keyInfo.feeDocs.filter((r) => r.pages.some((p) => inSchool(p.school)) && (sub === 'all' || (sub === 'pdf' ? r.pdf : !r.pdf)) && hit(r.label, r.href, ...r.pages.map((p) => `${p.label} ${p.path}`)));
  })();

  const SUB = {
    crm: [['all', 'Any status'], ...Object.entries(CRM_STATUS).map(([k, v]) => [k, v.label])],
    dates: [['all', 'Any date'], ...['upcoming', 'passed', 'closed', 'open', 'tba', 'text'].map((k) => [k, DATE_STATUS[k].label])],
    fees: [['all', 'Any'], ['both', 'Amounts and a fee document'], ['amount', 'Amounts only'], ['document', 'Fee document only']],
    docs: [['all', 'Any document'], ['pdf', 'PDF files'], ['page', 'Web pages / flipbooks']],
  }[cat];

  const selectCls = 'h-9 rounded-lg border border-[#cfd0d8] bg-white px-2 text-[13.5px] text-atlas-ink focus:border-atlas-teal focus:outline-none';
  const count = { crm: keyInfo.crm.length, dates: keyInfo.dates.length, fees: keyInfo.fees.length, docs: keyInfo.feeDocs.length };

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 border-b border-[#e2e2ee] bg-white px-3 py-2 md:px-4">
        <div role="tablist" aria-label="Key information categories" className="flex flex-wrap gap-1.5">
          {CATEGORIES.map(([k, l]) => (
            <button
              key={k}
              role="tab"
              type="button"
              aria-selected={cat === k}
              onClick={() => {
                setCat(k);
                setSub('all');
              }}
              className={`h-8 rounded-full border px-3 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal ${cat === k ? 'border-atlas-footer bg-atlas-footer text-white' : 'border-[#cfd0d8] bg-white text-atlas-ink hover:bg-[#f4f4fa]'}`}
            >
              {l} <span className={cat === k ? 'text-white/75' : 'text-[#6b6b7b]'}>({count[k]})</span>
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <label htmlFor="keyinfo-search" className="sr-only">Search key information</label>
          <input
            id="keyinfo-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search a page, programme, date or fee"
            autoComplete="off"
            className="h-9 min-w-0 flex-[1_1_220px] rounded-lg border border-[#cfd0d8] bg-[#fbfbfd] px-3 text-[14px] text-atlas-ink focus:border-atlas-teal focus:bg-white focus:outline-none md:max-w-[420px]"
          />
          <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b7b]">
            <span>School</span>
            <select value={school} onChange={(e) => setSchool(e.target.value)} className={selectCls}>
              <option value="all">All</option>
              {Object.entries(SCHOOL).map(([k, s]) => <option key={k} value={k}>{s.short}</option>)}
              <option value="none">University-wide</option>
            </select>
          </label>
          <label className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b7b]">
            <span>Show</span>
            <select value={sub} onChange={(e) => setSub(e.target.value)} className={selectCls}>
              {SUB.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </label>
          <span className="ml-auto text-[12px] text-[#6b6b7b]" aria-live="polite">
            {rows.length} shown · from the website snapshot of {fmtDate(keyInfo.checkedAt)}
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto overscroll-contain">
        {!rows.length ? (
          <p className="p-6 text-[14px] text-[#6b6b7b]">Nothing matches these filters.</p>
        ) : cat === 'crm' ? (
          <table className="w-full min-w-[640px] border-collapse text-[13.5px]">
            <thead className="sticky top-0 bg-[#f7f7fb]"><tr><th className={th}>Page</th><th className={th}>School</th><th className={th}>Widget</th><th className={th}>In original site</th><th className={th}>Status</th></tr></thead>
            <tbody className="divide-y divide-[#f0f0f5]">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className={td}>
                    <PageLink label={r.label} path={r.path} href={r.href} onGoPath={onGoPath} />
                    {r.referencePath && <span className="block text-[11.5px] text-[#6b6b7b]">also answers for {r.referencePath}</span>}
                  </td>
                  <td className={td}><School s={r.school} /></td>
                  <td className={td}>{r.forms.length ? r.forms.map((f) => (f === 'script' ? 'Script embed' : 'Iframe embed')).join(' + ') : 'Iframe embed'}{r.widgets > 1 ? ` · ${r.widgets} widgets` : ''}</td>
                  <td className={td}>{r.inReference ? 'Yes' : 'Live page only'}</td>
                  <td className={td}><span className={`${pill} ${(CRM_STATUS[r.status] || CRM_STATUS.missing).cls}`}>{(CRM_STATUS[r.status] || CRM_STATUS.missing).label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : cat === 'dates' ? (
          <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
            <thead className="sticky top-0 bg-[#f7f7fb]"><tr><th className={th}>Milestone</th><th className={th}>Date</th><th className={th}>Page · section</th><th className={th}>Status</th><th className={th}>Verification</th></tr></thead>
            <tbody className="divide-y divide-[#f0f0f5]">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className={td}>
                    <span className="font-semibold">{r.label}</span>
                    {r.group && <span className="block text-[11.5px] text-[#6b6b7b]">{r.group}</span>}
                  </td>
                  <td className={`${td} whitespace-nowrap font-semibold`}>{r.value}</td>
                  <td className={td}>
                    <PageLink label={r.source.label} path={r.source.path} href={r.href} onGoPath={onGoPath} />
                    <span className="block text-[11.5px] text-[#6b6b7b]">{r.section || 'Page content'}</span>
                  </td>
                  <td className={td}><span className={`${pill} ${(DATE_STATUS[r.status] || DATE_STATUS.text).cls}`}>{(DATE_STATUS[r.status] || DATE_STATUS.text).label}</span></td>
                  <td className={td}><Verify v={r.verification} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : cat === 'fees' ? (
          <table className="w-full min-w-[760px] border-collapse text-[13.5px]">
            <thead className="sticky top-0 bg-[#f7f7fb]"><tr><th className={th}>Page</th><th className={th}>School</th><th className={th}>Published fees</th><th className={th}>Fee document</th></tr></thead>
            <tbody className="divide-y divide-[#f0f0f5]">
              {rows.map((r) => (
                <tr key={r.path}>
                  <td className={td}><PageLink label={r.label} path={r.path} href={r.href} onGoPath={onGoPath} /></td>
                  <td className={td}><School s={r.school} /></td>
                  <td className={td}>
                    {r.amounts.length ? (
                      <ul className="space-y-1">
                        {r.amounts.map((a) => (
                          <li key={a.id} className="flex flex-wrap items-baseline gap-x-2">
                            <span>{a.label}:</span>
                            <span className="font-semibold">{a.value}</span>
                            <Verify v={a.verification} />
                          </li>
                        ))}
                        <li className="text-[11.5px] text-[#6b6b7b]">{r.amounts[0].section || 'Page content'}</li>
                      </ul>
                    ) : (
                      <span className="text-[#6b6b7b]">No amount published on this page</span>
                    )}
                  </td>
                  <td className={td}>
                    {r.documents.length ? (
                      <ul className="space-y-1">
                        {r.documents.map((d) => (
                          <li key={d.href}>
                            <a href={d.href} target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">{d.label}</a>
                            <span className="block truncate text-[11.5px] text-[#6b6b7b]">{d.pdf ? 'PDF' : 'Web page'} · {d.href.replace(/^https?:\/\//, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[#6b6b7b]">None linked</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full min-w-[640px] border-collapse text-[13.5px]">
            <thead className="sticky top-0 bg-[#f7f7fb]"><tr><th className={th}>Document</th><th className={th}>Type</th><th className={th}>Linked from</th></tr></thead>
            <tbody className="divide-y divide-[#f0f0f5]">
              {rows.map((r) => (
                <tr key={r.href}>
                  <td className={td}>
                    <a href={r.href} target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">{r.label}</a>
                    <span className="block truncate text-[11.5px] text-[#6b6b7b]">{r.href.replace(/^https?:\/\//, '')}</span>
                  </td>
                  <td className={td}>{r.pdf ? 'PDF file' : r.onLive ? 'Page on the live site' : 'Web page / flipbook'}</td>
                  <td className={td}>
                    <span className="font-semibold">{r.pages.length} page{r.pages.length === 1 ? '' : 's'}</span>
                    <details className="mt-1">
                      <summary className="cursor-pointer text-[12px] text-atlas-footer underline decoration-dotted underline-offset-2">List them</summary>
                      <ul className="mt-1 space-y-1">
                        {r.pages.map((p) => (
                          <li key={p.path}><PageLink label={p.label} path={p.path} href={p.href} onGoPath={onGoPath} /></li>
                        ))}
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
