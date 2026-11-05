'use client';

import { SCHOOL, TYPE_LABEL } from './theme';

/**
 * The same tree as the canvas, as an indented list — the comfortable view on a phone and a fully
 * linear one for keyboard and screen-reader users. Expand state is shared with the canvas.
 */
function Item({ id, byId, expanded, onToggle, onSelect, selected, dimmed, depth }) {
  const n = byId.get(id);
  const kids = n.children.filter((c) => byId.has(c));
  const open = expanded.has(id);
  const school = n.school && SCHOOL[n.school];
  return (
    <li className={dimmed && dimmed.has(id) ? 'opacity-40' : ''}>
      <div className={`flex min-h-[44px] items-center gap-1 border-b border-[#f0f0f5] pr-2 ${selected === id ? 'bg-[#eef9fb]' : ''}`} style={{ paddingLeft: 8 + depth * 16 }}>
        {kids.length > 0 ? (
          <button
            type="button"
            onClick={() => onToggle(id)}
            aria-expanded={open}
            aria-label={`${open ? 'Collapse' : 'Expand'} ${n.label}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-[16px] font-bold text-atlas-footer hover:bg-[#f1f1f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal"
          >
            {open ? '−' : '+'}
          </button>
        ) : (
          <span className="w-8 shrink-0" aria-hidden="true" />
        )}
        {school && (n.type === 'programme' || n.type === 'school') && <span className={`h-4 w-1.5 shrink-0 rounded ${school.band}`} aria-hidden="true" />}
        <button
          type="button"
          onClick={() => onSelect(id)}
          className="min-w-0 flex-1 py-2 text-left text-[14px] leading-[19px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-teal"
        >
          <span className={n.type === 'group' || n.type === 'school' || n.type === 'university' ? 'font-bold' : ''}>
            {n.type === 'ref' && '↪ '}
            {n.label}
            {n.type === 'external' && ' ↗'}
          </span>
          <span className="ml-2 text-[11.5px] text-[#8a8a96]">
            {[TYPE_LABEL[n.type], n.degree, kids.length ? `${kids.length}` : null].filter(Boolean).join(' · ')}
          </span>
        </button>
      </div>
      {open && kids.length > 0 && (
        <ul>
          {kids.map((c) => (
            <Item key={c} id={c} byId={byId} expanded={expanded} onToggle={onToggle} onSelect={onSelect} selected={selected} dimmed={dimmed} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function OutlineList({ rootId, ...rest }) {
  return (
    <ul aria-label="ATLAS University map as a list" className="h-full overflow-y-auto bg-white">
      <Item id={rootId} depth={0} {...rest} />
    </ul>
  );
}
