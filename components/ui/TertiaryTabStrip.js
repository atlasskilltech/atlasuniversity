'use client';

import { cx } from '@/lib/cx';

/**
 * `.tertiary-tabs-menu.mrg-tab` — the strip half of the reference's underlined
 * tab widget, with the caller owning the state and the panel.
 *
 * The same split `PillTabs` / `PillTabStrip` already makes: `TertiaryTabs`
 * (strip + photo panel) serves /life-at-atlas and
 * /advantages/atlas-advantages, whose panes are `.tr-cont-wrapper` images;
 * this strip serves /advantages/atlas-industry-centric-approach "Industry Led
 * Events on Campus", whose panes are bleeding carousels that have to sit
 * outside `.container`.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .tertiary-tabs-menu        row, space-between,       margin 0 -21,
 *     .mrg-tab                 align-start, mb 4,        padding 0 20
 *                              overflow auto,
 *                              border-bottom 1px
 *   .tertiary-tabs-link-tab-1  flex, padding 9 30,       height 52
 *     .atlas                   24px/400, #000, h 56
 *     .w--current              #41418e, 600, and an      same
 *                              8px #41418e bottom rule
 *   .tr-tab-text               600, line-height 1,       20px
 *                              pb 10, mb -4, 24px
 *
 * ── The bar colour is a real modifier ─────────────────────────────────────
 * The menu's rule is `border-bottom: 1px solid #fff`, which paints nothing on
 * a white page — that is what /life-at-atlas and /advantages/atlas-advantages
 * render. This page adds `.black-bar`, which sets `border-bottom-color: #000`
 * and makes the rule visible, so `bar` selects between them.
 */
export default function TertiaryTabStrip({ tabs, active, onSelect, label, idPrefix, bar = 'white' }) {
  return (
    /* ref .tertiary-tabs-menu.mrg-tab(.black-bar) */
    <div
      role="tablist"
      aria-label={label}
      className={cx(
        'relative z-[1] mb-1 flex items-start justify-between overflow-x-auto',
        'border-b text-[32px] font-medium leading-[48px]',
        bar === 'black' ? 'border-black' : 'border-white',
        'max-md:-mx-[21px] max-md:px-5',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      )}
    >
      {tabs.map((tab, i) => (
        /* ref a.tertiary-tabs-link-tab-1.atlas (+ .w--current) */
        <button
          key={tab.label}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${idPrefix}-panel-${i}`}
          onClick={() => onSelect(i)}
          className={cx(
            'relative z-10 flex max-w-full flex-none bg-transparent px-[30px] py-[9px] text-left',
            'text-[24px] leading-[1.5] transition-colors',
            /* `align-items: flex-start` is on `.w--current` only, not on the
               base rule; with one child of its own height it paints the same
               either way, but the tabs are otherwise identical so it stays
               where the reference puts it */
            i === active
              ? 'items-start border-b-8 border-[#41418e] font-semibold text-[#41418e]'
              : 'font-normal text-black',
          )}
        >
          {/* ref .tr-tab-text */}
          <div className="-mb-1 block pb-2.5 text-[24px] font-semibold leading-none max-md:text-[20px]">
            {tab.label}
          </div>
        </button>
      ))}
    </div>
  );
}
