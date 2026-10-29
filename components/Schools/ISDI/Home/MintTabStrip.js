'use client';

import { cx } from '@/lib/cx';

/**
 * `.tabs-menu-mint` with ISDI's `a.tab-roundmint-tab-1.isdi` links — the pill tab
 * strip used by the ISDI homepage's tab sets and by the B.Des programme pages.
 * The strip is the same widget as `components/ui/PillTabs`' `less` strip; only the
 * link skin differs, and the ATLAS one is left untouched:
 *
 *                     >=768px                         <=767px
 *   link              h40, px20, Manrope 18px/1.2,    16px/1.2
 *                     #000 on transparent, r16
 *                     (the generic `.isdi` radius)
 *     current         #d20158, white, 500, r20
 *
 * `skin` is the link's own modifier, and /atlas-isdi-advantage/internationalisation
 * is the page that needed both of the others — the two strips on it carry neither
 * the `.isdi` the rest of the ISDI port uses:
 *
 *   skin      selector                              idle        current
 *   isdi      `.tab-roundmint-tab-1.isdi`           #000        #fff on #d20158
 *   atlas     `.tab-roundmint-tab-1.atlas`          #000        #000 on #5cbdca
 *   white     `.tab-roundmint-tab-1.white.isdi`     #fff        #000 on #d20158
 *
 * The last one is a source-order result, not a guess: `.isdi.w--current` (white on
 * #d20158) and `.white.w--current` (#000) are both (0,3,0) and the `.white` rule comes
 * later, so the text is black on the pink pill. Measured on production.
 *
 * `spacing` is the strip's own two skins, and they are two different rules rather
 * than one with a modifier — hence the measured asymmetry at 767 on the wide one,
 * where the sheet moves `margin-left` and both paddings but leaves `margin-right`:
 *
 *                     >=768px                    <=767px            <=479px
 *   less (default)    gap 24, -61 bleed, px60    gap 8, unchanged
 *   wide              gap 48, -73 bleed, px70    gap 24, ml -41,    ml/mr -41,
 *   (`.tabs-menu-mint`                           mr -73, px40       px30
 *   with no modifier)
 *
 * The strip only renders the links; the caller owns the state and the panel
 * (a carousel that has to bleed past `.container`, so it cannot live in here).
 */

/* ref .tabs-menu-mint / .tabs-menu-mint.less-space */
const SPACING = {
  less: '-mx-[61px] gap-6 px-[60px] max-md:gap-2',
  wide:
    '-mx-[73px] gap-12 px-[70px] '
    + 'max-md:-ml-[41px] max-md:mr-[-73px] max-md:gap-6 max-md:px-10 '
    + 'max-sm:-mx-[41px] max-sm:px-[30px]',
};

/* ref a.tab-roundmint-tab-1(.isdi | .atlas | .white.isdi) */
const SKIN = {
  isdi: { idle: 'text-black', current: 'bg-[#d20158] text-white' },
  atlas: { idle: 'text-black', current: 'bg-[#5cbdca] text-black' },
  white: { idle: 'text-white', current: 'bg-[#d20158] text-black' },
};

export default function MintTabStrip({
  tabs, active, onChange, label, idPrefix, spacing = 'less', skin = 'isdi',
}) {
  const tone = SKIN[skin] ?? SKIN.isdi;
  return (
    <div
      role="tablist"
      aria-label={label}
      className={cx(
        'relative flex items-center overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        SPACING[spacing] ?? SPACING.less
      )}
    >
      {tabs.map((tab, i) => (
        <button
          key={tab}
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${i}`}
          aria-selected={i === active}
          aria-controls={`${idPrefix}-panel-${i}`}
          onClick={() => onChange(i)}
          className={cx(
            'relative flex h-10 max-w-full flex-none items-center justify-start px-5 text-left align-top font-sans text-[18px] leading-[1.2] max-md:text-[16px] max-md:leading-[1.2]',
            i === active
              ? cx('rounded-[20px] font-medium', tone.current)
              : cx('rounded-2xl bg-transparent font-normal', tone.idle)
          )}
        >
          <div>{tab}</div>
        </button>
      ))}
    </div>
  );
}
