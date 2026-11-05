'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * The reference's `.rounded-tabs-mint` tab set, shared by the homepage
 * testimonials (`index.php:3119`), the About page's "Recognition that Reflects
 * Our Commitment" (`about-us.php:357`), /campus-atlas, /life-at-atlas and the
 * two logo tab sets on /success-stories-atlas. Same Webflow widget everywhere;
 * only what sits under it — and the strip's own spacing modifier — differs.
 *
 * ── The two spacings ──────────────────────────────────────────────────────
 * `.tabs-menu-mint` carries an optional `.less-space`, and the two are
 * genuinely different strips, so `spacing` selects between them. Every page
 * built before /success-stories-atlas uses `less`, which stays the default.
 *
 *                     >=768px              480-767px            <=479px
 *   less  gap          24                   8                    8
 *         bleed        -61 / padding 60     same                 same
 *   wide  gap          48                   24                   24
 *         bleed        -73 / padding 70     -41 left, -73 right, -41 both,
 *                                           padding 40           padding 30
 *
 * ── Measured, identical for both spacings ─────────────────────────────────
 *                          >=768px                    <=767px
 *   .tab-roundmint-tab-1   h40, px20, 18px/1.2, 400   16px/1.2 — an arbitrary
 *                                                     size, because `text-base`
 *                                                     would drag 1.5 with it
 *     .w--current          bg #5cbdca, r20, 500       same (only the current
 *                                                     pill is rounded)
 *   .tab-content-mint      padding-top 56, 18px       padding-top 40
 *     .atlas               padding-top 42             padding-top 20
 *
 * The `less` strip bleeds 61px past the container with 60px of inner padding,
 * which leaves the first tab sitting exactly 1px left of the container edge —
 * that is the reference's own arithmetic, not a rounding error. `wide` does the
 * same thing 3px out.
 *
 * Two exports, because the two pages put the panel in different places: the
 * testimonials panel is a carousel that has to bleed to the viewport edge and so
 * lives *outside* `.container`, while Recognition's panels sit inside it.
 * `PillTabStrip` is the strip alone (caller owns the state and the panel);
 * `PillTabs` is the whole widget for the simple in-container case.
 */

/* ref .tabs-menu-mint / .tabs-menu-mint.less-space — whole literal strings,
   because the Tailwind scanner only reads source text. */
const SPACING = {
  less: '-mx-[61px] gap-6 px-[60px] max-md:gap-2',
  /* /advantages/partnership/international-summerschool: `less` from 768 up, but its own <style>
     zeroes the strip's margins and padding below 768, so the first pill sits on the container edge */
  lessFlushMd: '-mx-[61px] gap-6 px-[60px] max-md:mx-0 max-md:gap-2 max-md:px-0',
  wide:
    '-mx-[73px] gap-12 px-[70px] ' +
    'max-md:-ml-[41px] max-md:gap-6 max-md:px-10 ' +
    'max-sm:-mr-[41px] max-sm:px-[30px]',
};

/* `tone="law"` — `.tab-roundmint-tab-1.law` (ISME Global Business Pathway): the current pill is
   #072058 with white 600 text instead of #5cbdca / black 500. The colour stays out of the shared
   string so two text-colour utilities never meet in one class list. */
const TONE = {
  atlas: { on: 'rounded-[20px] bg-atlas-cyan font-medium text-black', off: 'bg-transparent font-normal text-black' },
  law: { on: 'rounded-[20px] bg-[#072058] font-semibold text-white', off: 'bg-transparent font-normal text-black' },
  /* `tone="mint"` — the bare `.tab-roundmint-tab-1` on the ISME sheet (industry-centric recruiters): #07f6a0 */
  mint: { on: 'rounded-[20px] bg-atlas-mint font-medium text-black', off: 'bg-transparent font-normal text-black' },
  /* `tone="mintWhite"` — `.tab-roundmint-tab-1.white` on the ISME sheet (Campus' map tabs, on a blue
     band): idle white 400, current #07f6a0 with black 500 text */
  mintWhite: { on: 'rounded-[20px] bg-atlas-mint font-medium text-black', off: 'bg-transparent font-normal text-white' },
  /* `tone="lawOrange"` — `.tab-roundmint-tab-1.law.w--current` on the School of Law's own sheet: #cb5827
     with white 600 text (the ISME sheet paints the same class #072058 — that is `law` above) */
  lawOrange: { on: 'rounded-[20px] bg-[#cb5827] font-semibold text-white', off: 'bg-transparent font-normal text-black' },
  /* `tone="ugdx"` — `.tab-roundmint-tab-1.ugdx.w--current`: #eb1f3c with white 500 text */
  ugdx: { on: 'rounded-[20px] bg-[#eb1f3c] font-medium text-white', off: 'bg-transparent font-normal text-black' },
};

export function PillTabStrip({ tabs, active, onChange, label, idPrefix, spacing = 'less', tone = 'atlas' }) {
  const t = TONE[tone] ?? TONE.atlas;
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx(
        'relative flex items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        SPACING[spacing],
      )}
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
            'relative flex h-10 max-w-full flex-none items-center justify-start px-5 text-center text-lg leading-[1.2] transition-colors max-md:text-[16px]',
            i === active ? t.on : t.off,
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
export default function PillTabs({ tabs, label, idPrefix, contentClassName, spacing, tone }) {
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
        spacing={spacing}
        tone={tone}
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
