'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * The reference's `.rounded-tabs-mint` tab set, shared by the homepage
 * testimonials (`index.php:3119`) and the About page's "Recognition that
 * Reflects Our Commitment" (`about-us.php:357`). Both use the same Webflow
 * widget with the same `.tabs-menu-mint.less-space` modifier, so the strip is
 * pixel-identical on both pages; only what sits under it differs.
 *
 * ── Measured (identical on both pages) ────────────────────────────────────
 *                          >=768px                    <=767px
 *   .tabs-menu-mint        gap 24, margin -61,        gap 8, same bleed,
 *   .less-space            padding 0 60,              overflow-x auto
 *                          overflow-x auto
 *   .tab-roundmint-tab-1   h40, px20, 18px/1.2, 400   16px/1.2 — an arbitrary
 *                                                     size, because `text-base`
 *                                                     would drag 1.5 with it
 *     .w--current          bg #5cbdca, r20, 500       same (only the current
 *                                                     pill is rounded)
 *   .tab-content-mint      padding-top 42, 18px       padding-top 20
 *
 * The strip bleeds 61px past the container with 60px of inner padding, which
 * leaves the first tab sitting exactly 1px left of the container edge — that is
 * the reference's own arithmetic, not a rounding error.
 *
 * Two exports, because the two pages put the panel in different places: the
 * testimonials panel is a carousel that has to bleed to the viewport edge and so
 * lives *outside* `.container`, while Recognition's panels sit inside it.
 * `PillTabStrip` is the strip alone (caller owns the state and the panel);
 * `PillTabs` is the whole widget for the simple in-container case.
 */

/* ref .tabs-menu-mint.less-space */
export function PillTabStrip({ tabs, active, onChange, label, idPrefix }) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="relative -mx-[61px] flex items-center gap-6 overflow-x-auto px-[60px] max-md:gap-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((tab, i) => (
        /* ref a.tab-roundmint-tab-1.atlas (+ .w--current) */
        <button
          key={tab.label ?? tab}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${idPrefix}-panel-${i}`}
          onClick={() => onChange(i)}
          className={cx(
            'relative flex h-10 max-w-full flex-none items-center justify-start px-5 text-center text-lg leading-[1.2] text-black transition-colors max-md:text-[16px]',
            i === active
              ? 'rounded-[20px] bg-atlas-cyan font-medium'
              : 'bg-transparent font-normal',
          )}
        >
          <div>{tab.label ?? tab}</div>
        </button>
      ))}
    </div>
  );
}

/**
 * Strip + panel. `tabs` is `[{ label, render() }]`; only the active panel is
 * mounted, matching Webflow's `display: none` on the inactive `.w-tab-pane`s.
 */
export default function PillTabs({ tabs, label, idPrefix, contentClassName }) {
  const [active, setActive] = useState(0);

  return (
    /* ref .rounded-tabs-mint */
    <div className="relative">
      <PillTabStrip
        tabs={tabs}
        active={active}
        onChange={setActive}
        label={label}
        idPrefix={idPrefix}
      />

      {/* ref .tab-content-mint.atlas */}
      <div className={contentClassName ?? 'relative pt-[42px] text-lg max-md:pt-5'}>
        {tabs.map((tab, i) =>
          i === active ? (
            <div
              key={tab.label}
              role="tabpanel"
              id={`${idPrefix}-panel-${i}`}
              aria-labelledby={`${idPrefix}-tab-${i}`}
            >
              {tab.render()}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
}
