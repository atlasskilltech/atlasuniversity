'use client';

import { useState } from 'react';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import TertiaryTabStrip from '@/components/ui/TertiaryTabStrip';

/**
 * `.tertiary-tabs` — the reference's second tab widget: an underlined text
 * strip rather than `.rounded-tabs-mint`'s pills, over a full-width photo panel
 * with the copy laid across its foot.
 *
 * Two instances, measured identical in every property of the strip, the panel,
 * the image and both text lines:
 *   /life-at-atlas         "Wellness is success"          (`life-at-atlas.php:672`)
 *   /advantages/atlas-…    "Supporting You Every Step …"  (`atlas-advantages.php:480`)
 *
 * The strip is `components/ui/TertiaryTabStrip`, which carries its
 * measurements; this component adds the photo panel.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                              >=768px                   <=767px
 *   .tertiary-tabs.mrgtp       margin-top 56             same
 *   .tertiary-tabs-content     top -4                    same
 *   .image-container           100% x 100%               aspect 2/3, height 450,
 *                                                        cover
 *   .content-container         pinned bottom-left,       padding 0 18 18
 *                              #fff0 -> #000,
 *                              padding 0 58 58
 *   .sw-title                  40px/1, 400, #fff         26px
 *   .sw-desc                   18px/1.5, pt 32           16px (pt 16 <=479)
 *
 * The menu's `border-bottom: 1px solid #fff` is white on a white page, so it
 * paints nothing; only the current tab's 8px indigo rule is visible.
 *
 * ── The one real difference ───────────────────────────────────────────────
 * `.tr-cont-wrapper` carries `.atlas` on /life-at-atlas (radius 32/0, clipped)
 * and nothing on /advantages (square, `overflow: visible`), so `rounded`
 * selects between them. Everything else is identical.
 *
 * Webflow's widget swaps `w--current` on click and shows one pane at a time;
 * that is reproduced with React state, and only the current pane is mounted —
 * matching `display: none` on the inactive `.w-tab-pane`s.
 */
export default function TertiaryTabs({ tabs, label, idPrefix, rounded = true }) {
  const [active, setActive] = useState(0);
  const pane = tabs[active];

  return (
    /* ref .tertiary-tabs.mrgtp */
    <div className="relative mt-14">
      <TertiaryTabStrip
        tabs={tabs}
        active={active}
        onSelect={setActive}
        label={label}
        idPrefix={idPrefix}
      />

      {/* ref .tertiary-tabs-content */}
      <div className="relative -top-1">
        <div
          role="tabpanel"
          id={`${idPrefix}-panel-${active}`}
          aria-labelledby={`${idPrefix}-tab-${active}`}
        >
          {/* ref .tr-cont-wrapper(.atlas) */}
          <div
            className={cx(
              'relative',
              rounded ? 'overflow-hidden rounded-tl-[32px] rounded-br-[32px]' : 'overflow-visible',
            )}
          >
            {/* ref img.image-container (+ .img-2) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pane.image.src}
              srcSet={pane.image.srcSet}
              sizes="(max-width: 1279px) 100vw, 1238px"
              alt={pane.image.alt}
              loading="lazy"
              className={cx(
                'relative block h-full w-full',
                'max-md:aspect-[2/3] max-md:h-[450px] max-md:object-cover',
                pane.wide ? 'max-md:object-[10%_50%]' : 'max-md:object-center',
              )}
            />

            {/* ref .content-container */}
            <div className="absolute bottom-0 left-0 bg-[linear-gradient(#fff0,#000)] px-[58px] pb-[58px] text-white max-md:px-[18px] max-md:pb-[18px]">
              {/* ref h4.sw-title */}
              <h4 className="m-0 text-[40px] font-normal leading-none text-white max-md:text-[26px]">
                {pane.title}
              </h4>
              {/* ref p.sw-desc */}
              <p className="mb-0 pt-8 text-[18px] leading-[1.5] max-md:text-[16px] max-sm:pt-4">
                {withBreaks(pane.text)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
