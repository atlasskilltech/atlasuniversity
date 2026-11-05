'use client';

import { useRef } from 'react';

/*
 * The brand kit's tab strip (ref `role=tablist` + its keydown handler): ArrowLeft / ArrowRight /
 * Home / End move between tabs and select them, only the current tab is in the tab order, and the
 * selected tab scrolls into view in a narrow strip. Two looks from the reference:
 *   underline  a 3px ATLAS Teal underline (the logo, product, image-tool and text-tool tabs)
 *   pill       a filled ATLAS Indigo pill (the PDF category chips, the developer sub-tabs)
 *
 * items: [{ id, label, count? }] · value / onChange: the selected id · idPrefix: element ids
 * (`${idPrefix}-tab-${id}` / `${idPrefix}-panel-${id}`) so panels can reference their tab.
 */
const LOOK = {
  underline: {
    list: 'no-scrollbar -mb-px flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    tab: 'shrink-0 border-0 border-b-[3px] border-solid border-transparent bg-transparent px-3 py-3.5 text-sm font-semibold text-brand-ink transition hover:text-brand-indigo aria-selected:border-brand-teal aria-selected:text-brand-indigo n640:px-4',
    count: 'ml-1 text-xs font-medium opacity-60',
  },
  pill: {
    list: '-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    tab: 'shrink-0 rounded-full border-0 bg-white px-4 py-2 text-sm font-semibold text-brand-indigo ring-1 ring-inset ring-brand-line transition hover:bg-brand-indigo/5 aria-selected:bg-brand-indigo aria-selected:text-white aria-selected:ring-brand-indigo',
    count: 'ml-1 opacity-60',
  },
};

export function tabId(prefix, id) {
  return `${prefix}-tab-${id}`;
}
export function panelId(prefix, id) {
  return `${prefix}-panel-${id}`;
}

export default function Tabs({ items, value, onChange, idPrefix, label, look = 'underline', className = '' }) {
  const ref = useRef(null);
  const L = LOOK[look];
  const onKeyDown = (e) => {
    const i = items.findIndex((t) => t.id === value);
    const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: items.length - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const t = items[(next + items.length) % items.length];
    onChange(t.id);
    const el = ref.current?.querySelector(`#${CSS.escape(tabId(idPrefix, t.id))}`);
    el?.focus();
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };
  return (
    <div ref={ref} role="tablist" aria-label={label} onKeyDown={onKeyDown} className={`${L.list} ${className}`}>
      {items.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={tabId(idPrefix, t.id)}
            aria-controls={panelId(idPrefix, t.id)}
            aria-selected={on}
            tabIndex={on ? 0 : -1}
            onClick={(e) => {
              onChange(t.id);
              e.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }}
            className={L.tab}
          >
            {t.label}
            {t.count != null && <span className={L.count}>{t.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
