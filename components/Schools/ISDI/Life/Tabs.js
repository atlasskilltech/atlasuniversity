'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import TertiaryTabs from '@/components/ui/TertiaryTabs';
import MintTabStrip from '../Home/MintTabStrip';
import IconSection from '../About/IconSection';
import StoryPair from '../StoryPair';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import { BLACK_DESC, WHITE_DESC_WRAP_MB } from './ui';

/**
 * Block 11 — "Wellness is success". One `.section` holding THREE things, which is
 * why it is one component: the tertiary tab set, the YourDOST story pair, and the
 * three process cards. /life-at-atlas splits the same content across two sections;
 * this page runs them together under one heading.
 *
 *   .tertiary-tabs.mrgtp        the shared `ui/TertiaryTabs` — margin-top 56
 *   .common-wrapper             padding-top 50 (ISDI's header.php again), and the
 *                               story pair is INSIDE the same `.container` as the
 *                               tabs, not a full-bleed row beside it
 *   .about-story-wrapper.mrgbtm the shared `../StoryPair`, with `.mrgbtm` (mb56)
 *                               and an `img.about-image-rect` carrying NO `.isdi`,
 *                               so it takes no 16px radius — the only StoryPair in
 *                               the port whose photograph is square
 *   .process-wrap               the three numbered cards over a `.top-line` rule
 *     .process-card             gap 36, `align-items: stretch`, min-height 252;
 *                               a column at <=767
 *     .pro-card.isdi            a declared 390px (100% at <=767), padding
 *                               32/42/64/24, r16, WHITE on #193e90 under its own
 *                               stylesheet-painted wash; `.sel-bg-2` / `.sel-bg-3`
 *                               swap the wash, not the colour
 *     .proc-no.isdi             24px/24px 700 — WHITE, where the base class is the
 *                               mint `--primary-color-isme`
 *     .proc-ttile               24px (20 at <=479), mt24 pb16, inheriting the
 *                               card's weight and colour
 *     .proc-desc                declares nothing but its <=479 size, so it is the
 *                               page's own 16px/1.5 in the card's white
 *     .top-line                 a 20px #193e90 rule BEHIND the cards (z-index -2),
 *                               absolute at `top: 10%`; a 20px vertical rule at
 *                               `left: 49%` below 768
 */

/* ref `.pro-card(.sel-bg-N)` — the wash each card is painted with. Named only in
   the stylesheet, so these three came off the live DOM through the manifest. */
const PRO_BG = [
  "bg-[url('/assets/images/schools/isdi/life-at-isdi/wellness/selection-bg-1.png')]",
  "bg-[url('/assets/images/schools/isdi/life-at-isdi/wellness/sel-bg-2.png')]",
  "bg-[url('/assets/images/schools/isdi/life-at-isdi/wellness/sel-bg-3.png')]",
];

export function Wellness({ data }) {
  return (
    <div data-block="wellness" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB}>{withBreaks(data.lead)}</div>

        {/* ref .tertiary-tabs.mrgtp — `TertiaryTabs` carries the mt-14 itself.
            `rounded={false}`: this page's `.tr-cont-wrapper` has no `.atlas`, so it
            is square and `overflow: visible`, as /advantages' is. */}
        <TertiaryTabs
          tabs={data.tabs}
          label={data.heading}
          idPrefix="isdi-life-wellness"
          rounded={false}
        />

        {/* ref .common-wrapper > .about-story-wrapper.mrgbtm */}
        <div className="pt-[50px]">
          <StoryPair data={data.story} bare marginBottom imageRounded={false} />
        </div>

        {/* ref .process-wrap */}
        <div className="relative">
          {/* ref .process-card */}
          <div className="flex min-h-[252px] items-stretch justify-start gap-9 max-md:min-h-0 max-md:flex-col">
            {data.steps.map((step, i) => (
              /* ref .pro-card.isdi(.sel-bg-N) */
              <div
                key={`${i}-${step.num}`}
                className={cx(
                  'w-[390px] rounded-2xl bg-[#193e90] bg-auto bg-[position:100%_100%] bg-no-repeat',
                  'pb-16 pl-6 pr-[42px] pt-8 text-white max-md:w-full',
                  PRO_BG[i] ?? PRO_BG[0],
                )}
              >
                {/* ref .proc-no.isdi */}
                <div className="text-2xl font-bold leading-[24px] text-white">
                  {step.num}
                </div>
                {/* ref .proc-ttile */}
                <div className="mt-6 pb-4 text-2xl leading-[1.5] max-sm:text-[20px]">
                  {withBreaks(step.title)}
                </div>
                {/* ref .proc-desc */}
                <div className="text-base leading-[1.5] max-sm:text-sm">
                  {withBreaks(step.text)}
                </div>
              </div>
            ))}
          </div>
          {/* ref .top-line — behind the cards, and vertical below 768 */}
          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 top-[10%] z-[-2] h-5 max-w-none bg-[#193e90] max-md:bottom-auto max-md:left-[49%] max-md:right-auto max-md:top-0 max-md:h-full max-md:w-5"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Block 15 — "Beyond campus, within reach". The eight-tab map set.
 *
 *   .rounded-tabs-mint          the shared `Home/MintTabStrip` on its `isdi` skin
 *     .tabs-menu-mint.less-space  gap 24 / bleed -61 / padding 60
 *   .tab-content-mint.padtp32   INSIDE `.container`, padding-top 32 rather than the
 *                               56 the bare class takes — so the panel does not
 *                               bleed, unlike the UG Overview's
 *
 * Each pane holds one map photograph and nothing else.
 */
export function Mumbai({ data }) {
  const [active, setActive] = useState(0);
  const tab = data.tabs[active];
  return (
    <IconSection id="life-in-mumbai" block="mumbai" icon={data.icon.image.src}
      title={data.icon.title} tone="white">
      <div className={CONTAINER}>
        <div className={WHITE_DESC_WRAP_MB}>
          <div className={BLACK_DESC}>{withBreaks(data.lead)}</div>
        </div>
        <MintTabStrip
          tabs={data.tabs.map((t) => t.label)}
          active={active}
          onChange={setActive}
          label={data.icon.title}
          idPrefix="isdi-life-mumbai"
        />
        {/* ref .tab-content-mint.padtp32 */}
        <div
          role="tabpanel"
          id={`isdi-life-mumbai-panel-${active}`}
          aria-labelledby={`isdi-life-mumbai-tab-${active}`}
          className="pt-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.image.src}
            srcSet={tab.image.srcSet}
            sizes={tab.image.sizes}
            alt={tab.image.alt}
            loading="lazy"
            decoding="async"
            className="block w-full align-middle"
          />
        </div>
      </div>
    </IconSection>
  );
}
