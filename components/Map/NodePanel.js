'use client';

import { TYPE_LABEL, SCHOOL, DATE_STATUS, VERIFY, LEVEL_LABEL, fmtDate } from './theme';

const FEE_ORDER = ['applicationFee', 'enrolmentFee', 'registrationFee', 'yearFee1', 'yearFee2', 'yearFee3', 'yearFee4', 'feeOther'];
/* standard fee fields a family asks about; shown as "Not Available" when no page publishes them */
const FEE_EXPECTED = [
  ['totalFee', 'Total programme fee'],
  ['yearFees', 'Year-wise fees'],
  ['semesterFees', 'Semester-wise fees'],
];
const DOC_LABEL = {
  feeStructure: 'Fee structure',
  admissionsPolicy: 'Admissions policy',
  scholarships: 'Scholarships & financial aid',
  educationLoan: 'Education loans',
  pdf: 'PDF document',
  brochure: 'Brochure',
  document: 'Document',
};

function Badge({ cls, children }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold leading-4 ${cls}`}>{children}</span>;
}

function Source({ fact, onGo }) {
  const v = VERIFY[fact.verification.state];
  return (
    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] leading-4 text-[#6b6b7b]">
      <span>
        Source:{' '}
        <button type="button" onClick={() => onGo(fact.source.path)} className="font-semibold text-atlas-footer underline decoration-dotted underline-offset-2">
          {fact.source.label}
        </button>
      </span>
      <span>· checked {fmtDate(fact.verification.at || fact.checkedAt)}</span>
      <Badge cls={v.cls}>{v.label}</Badge>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-t border-[#ececf2] px-5 py-4">
      <h3 className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-[#6b6b7b]">{title}</h3>
      {children}
    </section>
  );
}

export default function NodePanel({ node, byId, crumbs, onSelect, onToggle, expanded, onClose, onGoPath, mode }) {
  if (!node) return null;
  const school = node.school && SCHOOL[node.school];
  const facts = node.facts || [];
  /* a programme's own page wins over its admissions page for the same field */
  const programme = Object.fromEntries(
    facts
      .filter((f) => f.kind === 'programme')
      .sort((a, b) => (b.source.path === node.path) - (a.source.path === node.path))
      .reverse()
      .map((f) => [f.key, f]),
  );
  const fees = facts.filter((f) => f.kind === 'fee').sort((a, b) => FEE_ORDER.indexOf(a.key) - FEE_ORDER.indexOf(b.key));
  const dates = facts.filter((f) => f.kind === 'date');
  const elig = facts.filter((f) => f.kind === 'eligibility');
  const docs = facts.filter((f) => f.kind === 'document');
  const scholar = facts.filter((f) => f.kind === 'scholarship');
  const kids = node.children.filter((c) => byId.has(c));
  const target = node.type === 'ref' ? byId.get(node.target) : null;
  const h = node.health;
  const showMoney = node.type === 'programme';

  const dateGroups = dates.reduce((acc, f) => {
    const k = f.group || 'Dates';
    (acc[k] ||= []).push(f);
    return acc;
  }, {});

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-3 border-b border-[#ececf2] px-5 pb-4 pt-5">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap gap-1.5">
            <Badge cls="bg-[#ececf6] text-atlas-footer">{TYPE_LABEL[node.type] || node.type}</Badge>
            {school && <Badge cls={`${school.soft} ${school.text}`}>{school.short}</Badge>}
            {node.level && <Badge cls="bg-[#f1f1f4] text-[#3c3c4a]">{LEVEL_LABEL[node.level]}</Badge>}
          </div>
          <h2 className="text-[19px] font-bold leading-[24px] text-atlas-ink">{node.label}</h2>
          {crumbs.length > 0 && (
            <nav aria-label="Location in the map" className="mt-1.5 text-[11.5px] leading-4 text-[#6b6b7b]">
              {crumbs.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && ' › '}
                  <button type="button" onClick={() => onSelect(c.id)} className="underline decoration-dotted underline-offset-2 hover:text-atlas-footer">
                    {c.label}
                  </button>
                </span>
              ))}
            </nav>
          )}
        </div>
        <button type="button" onClick={onClose} aria-label="Close details" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[20px] text-[#6b6b7b] hover:bg-[#f1f1f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal">
          ×
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="flex flex-wrap gap-2 px-5 py-4">
          {node.href && (
            <a
              href={node.href}
              {...(node.opensLive || node.type === 'external' ? { target: '_blank', rel: 'noopener' } : {})}
              className="inline-flex h-10 items-center rounded-full bg-atlas-footer px-4 text-[13px] font-semibold text-white hover:bg-[#33337a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal focus-visible:ring-offset-2"
            >
              {node.type === 'external' ? 'Open website ↗' : node.opensLive ? 'Open on live site ↗' : 'Open page'}
            </a>
          )}
          {target && (
            <button type="button" onClick={() => onSelect(target.id)} className="inline-flex h-10 items-center rounded-full border border-atlas-footer px-4 text-[13px] font-semibold text-atlas-footer hover:bg-[#f4f4fa]">
              Go to “{target.label}” in the map
            </button>
          )}
          {kids.length > 0 && (
            <button type="button" onClick={() => onToggle(node.id)} aria-expanded={expanded.has(node.id)} className="inline-flex h-10 items-center rounded-full border border-[#cfd0d8] px-4 text-[13px] font-semibold text-atlas-ink hover:bg-[#f4f4fa]">
              {expanded.has(node.id) ? 'Collapse' : 'Expand'} {kids.length} item{kids.length > 1 ? 's' : ''}
            </button>
          )}
        </div>
        {node.opensLive && (
          <p className="-mt-2 px-5 pb-3 text-[12px] leading-4 text-[#6b6b7b]">This page is on the live ATLAS website; it is not part of this site build yet.</p>
        )}
        {node.path && <p className="-mt-1 break-all px-5 pb-3 font-mono text-[11.5px] text-[#6b6b7b]">{node.path}{node.hash ? `#${node.hash}` : ''}</p>}

        {node.conflicts.length > 0 && (
          <div role="note" className="mx-5 mb-3 rounded-lg border border-[#e9c46a] bg-[#fff6d6] p-3 text-[12.5px] leading-[18px] text-[#5c4300]">
            <strong className="font-bold">Sources disagree.</strong> Two pages publish different values; neither is chosen here.
            {node.conflicts.map((c) => (
              <ul key={c.key} className="mt-1.5 list-disc pl-5">
                {c.values.map((v) => (
                  <li key={v.source.path}>
                    <strong className="font-semibold">{v.value}</strong> on{' '}
                    <button type="button" onClick={() => onGoPath(v.source.path)} className="underline">{v.source.label}</button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}

        {node.type === 'programme' && (
          <Section title="Programme">
            <dl className="grid grid-cols-[minmax(0,110px)_1fr] gap-x-3 gap-y-2 text-[13.5px] leading-[19px]">
              <dt className="text-[#6b6b7b]">Degree</dt>
              <dd className="font-semibold">{node.degree || <span className="font-normal text-[#8a8a96]">Not Available</span>}</dd>
              <dt className="text-[#6b6b7b]">School</dt>
              <dd>{school ? school.short : <span className="text-[#8a8a96]">Not Available</span>}</dd>
              {['duration', 'nextIntake', 'eligibilitySummary'].map((k) => (
                <div key={k} className="contents">
                  <dt className="text-[#6b6b7b]">{{ duration: 'Duration', nextIntake: 'Next intake', eligibilitySummary: 'Eligibility' }[k]}</dt>
                  <dd>
                    {programme[k] ? (
                      <>
                        <span className="font-semibold">{programme[k].value}</span>
                        {programme[k].note && <span className="block text-[12px] text-[#6b6b7b]">{programme[k].note}</span>}
                        <Source fact={programme[k]} onGo={onGoPath} />
                      </>
                    ) : (
                      <span className="text-[#8a8a96]">Not Available</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {(showMoney || fees.length > 0) && (
          <Section title="Fees">
            {fees.length === 0 && <p className="text-[13px] text-[#8a8a96]">Not Available — no fee is published on this page or its admissions page.</p>}
            <ul className="space-y-3">
              {fees.map((f) => (
                <li key={f.id} className="text-[13.5px] leading-[19px]">
                  <div className="flex flex-wrap justify-between gap-x-3">
                    <span className="text-[#3c3c4a]">{f.label}</span>
                    <span className="font-bold">{/^\d/.test(f.value) ? `₹${f.value}` : f.value}</span>
                  </div>
                  {f.refundable === false && <span className="text-[12px] text-[#9b1c1c]">Non-refundable</span>}
                  {f.refundable === true && <span className="text-[12px] text-[#14632f]">Refundable</span>}
                  <Source fact={f} onGo={onGoPath} />
                </li>
              ))}
            </ul>
            {showMoney && (
              <ul className="mt-3 space-y-1 text-[12.5px] text-[#6b6b7b]">
                {FEE_EXPECTED.filter(([k]) => !(k === 'yearFees' && fees.some((f) => f.key.startsWith('yearFee')))).map(([k, l]) => (
                  <li key={k}>
                    {l}: <span className="text-[#8a8a96]">Not Available on this site — see the fee structure document</span>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        {elig.length > 0 && (
          <Section title="Eligibility">
            <ul className="space-y-2.5">
              {elig.map((f) => (
                <li key={f.id} className="text-[13.5px] leading-[19px]">
                  <span className="block text-[#3c3c4a]">{f.label}</span>
                  <span className="font-semibold">{f.value}</span>
                  <Source fact={f} onGo={onGoPath} />
                </li>
              ))}
            </ul>
          </Section>
        )}

        {dates.length > 0 && (
          <Section title="Important dates">
            {Object.entries(dateGroups).map(([g, list]) => (
              <div key={g} className="mb-3 last:mb-0">
                <p className="mb-1.5 text-[12.5px] font-semibold text-atlas-footer">{g}</p>
                <ul className="space-y-2">
                  {list.map((f) => {
                    const s = DATE_STATUS[f.status] || DATE_STATUS.text;
                    return (
                      <li key={f.id} className="text-[13.5px] leading-[19px]">
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                          <span className="text-[#3c3c4a]">{f.label}</span>
                          <span className="flex items-center gap-2">
                            <span className="font-semibold">{f.value}</span>
                            <Badge cls={s.cls}>{s.label}</Badge>
                          </span>
                        </div>
                        <Source fact={f} onGo={onGoPath} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {(docs.length > 0 || scholar.length > 0) && (
          <Section title="Documents & financial help">
            <ul className="space-y-2 text-[13.5px] leading-[19px]">
              {scholar.map((f) => (
                <li key={f.id}>
                  <span className="font-semibold">{f.label}</span>
                  {f.value !== f.label && <span className="block text-[12.5px] text-[#3c3c4a]">{f.value}</span>}
                  <Source fact={f} onGo={onGoPath} />
                </li>
              ))}
              {docs.map((f) => {
                const live = f.href.startsWith('http');
                return (
                  <li key={f.id}>
                    <a href={f.href} {...(live ? { target: '_blank', rel: 'noopener' } : {})} className="font-semibold text-atlas-footer underline underline-offset-2">
                      {DOC_LABEL[f.key] || f.label}
                      {live ? ' ↗' : ''}
                    </a>
                    <span className="block text-[12px] text-[#6b6b7b]">“{f.label}” on {f.source.label}</span>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {node.listedOn.length > 0 && (
          <Section title="Listed on">
            <ul className="space-y-1 text-[13.5px]">
              {node.listedOn.map((l) => (
                <li key={l.path}>
                  <button type="button" onClick={() => onGoPath(l.path)} className="text-atlas-footer underline underline-offset-2">{l.label}</button>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(h || node.path) && node.type !== 'group' && (
          <Section title={mode === 'site' ? 'Page health' : 'Page status'}>
            {!h ? (
              <p className="text-[13px] text-[#8a8a96]">Not checked yet — page health is filled in by the scheduled audit.</p>
            ) : (
              <dl className="grid grid-cols-[minmax(0,120px)_1fr] gap-x-3 gap-y-1.5 text-[13px] leading-[18px]">
                <dt className="text-[#6b6b7b]">HTTP status</dt>
                <dd className="font-semibold">
                  {h.reason ? 'Unreachable' : h.status}
                  {h.redirects.length > 0 && ` → ${h.finalStatus}`}
                  {h.soft404 && <span className="ml-1 text-[#9b1c1c]">(looks like a “not found” page)</span>}
                </dd>
                {h.redirects.length > 0 && (
                  <>
                    <dt className="text-[#6b6b7b]">Redirects to</dt>
                    <dd className="break-all">{h.redirects.map((r) => r.to).join(' → ')}</dd>
                  </>
                )}
                <dt className="text-[#6b6b7b]">Canonical</dt>
                <dd className="break-all">{h.canonical ? `${h.canonical}${h.canonicalMatches ? '' : ' (points elsewhere)'}` : 'Missing'}</dd>
                <dt className="text-[#6b6b7b]">Search engines</dt>
                <dd>{h.indexable ? 'Indexable' : h.noindex ? 'Not indexed (noindex)' : 'Not indexable'}</dd>
                <dt className="text-[#6b6b7b]">Broken links</dt>
                <dd>{h.brokenLinks.length ? <span className="text-[#9b1c1c]">{h.brokenLinks.length}: {h.brokenLinks.slice(0, 6).join(', ')}{h.brokenLinks.length > 6 ? '…' : ''}</span> : 'None found'}</dd>
                <dt className="text-[#6b6b7b]">Content</dt>
                <dd>{h.completeness === 'complete' ? 'Complete' : h.completeness === 'partial' ? `Partial — missing ${h.missing.join(', ') || 'nothing'}` : h.completeness === 'empty' ? 'Empty / not found' : 'Unavailable'}</dd>
                <dt className="text-[#6b6b7b]">Last checked</dt>
                <dd>{fmtDate(h.checkedAt)}</dd>
              </dl>
            )}
          </Section>
        )}

        {node.refs.length > 0 && (
          <Section title="Also listed under">
            <ul className="space-y-1 text-[13.5px]">
              {node.refs.map((r) => byId.get(r)).filter(Boolean).map((r) => (
                <li key={r.id}>
                  <button type="button" onClick={() => onSelect(r.id)} className="text-atlas-footer underline underline-offset-2">{r.label}</button>
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </div>
  );
}
