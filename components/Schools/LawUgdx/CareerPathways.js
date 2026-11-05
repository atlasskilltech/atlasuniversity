'use client';

import { useState } from 'react';
import { CONTAINER, SECTION, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';
import { PillTabStrip } from '@/components/ui/PillTabs';
import Carousel from '@/components/Carousel/Carousel';
import withBreaks from '@/lib/withBreaks';
import { H2_MRG16 } from './Sections';

/**
 * "Career Pathways" (School of Law and uGDX homepages): `h2.h2-tag.mrg16` + `h2.sub-heading.mrgbtm32`
 * over a Webflow pill-tab set whose panes are each a `.swiper.common-swiper.mrgtp0` of
 * `.card-type-el-ugdx` cards. Measured on production /schools/law at 1440 / 991 / 767 / 479 / 390:
 *
 *   .tabs-menu-mint.less-space   `ui/PillTabs` `less` spacing; the current pill is `tone`'s colour
 *   .tab-content-mint.atlas      padding-top 42 (20 at <=767)
 *   .card-type-el-ugdx           298 x 232 at EVERY width (`.law` restores 298 where the sheet would
 *                                take the plain card to 100% at <=767), radius 32px 0, clipped
 *   .cd-ty-el-cont               lower half, `#fff0 -> #000`, padding 0 32 32, text bottom-left
 *   .cd-ty-el-text.isdi          20px/1.2 500 white
 *
 * The carousel is a sibling of `.container`, as everywhere in the rebuild (Carousel pads its own track
 * by the container inset). Only the current pane is mounted — Webflow's `display: none` on the rest.
 */
function ElectiveCard({ card }) {
  return (
    <div className="relative h-[232px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end justify-start bg-[linear-gradient(#fff0,#000)] px-8 pb-8">
        <div className="text-[20px] font-medium leading-[1.2] text-white">{withBreaks(card.title)}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt="" loading="lazy" className="block h-full w-full object-cover" />
    </div>
  );
}

/* `data.cards` (no tabs) — the uGDX programme pages' "Career Pathways": the same cards in one
   `.swiper.common-swiper.mrgtp0` directly under the heading pair, no tab strip and no top padding */
export default function CareerPathways({ data, tone = 'lawOrange', block = 'careers' }) {
  const [active, setActive] = useState(0);
  if (data.cards) {
    return (
      <div data-block={block} className={SECTION}>
        <div className={CONTAINER}>
          <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
          {/* the uGDX summer school comments its lead out (`sub: null`) */}
          {data.sub !== null && <div className={SUB_H2_MRGBTM32}>{withBreaks(data.sub)}</div>}
        </div>
        <Carousel bullets="inline">
          {data.cards.map((card, i) => (
            <ElectiveCard key={`${i}-${card.title}`} card={card} />
          ))}
        </Carousel>
      </div>
    );
  }
  const tab = data.tabs[active];
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
        <div className={SUB_H2_MRGBTM32}>{withBreaks(data.sub)}</div>
        <PillTabStrip
          tabs={data.tabs.map((t) => t.label)}
          active={active}
          onChange={setActive}
          label={data.heading}
          idPrefix={block}
          tone={tone}
        />
      </div>
      <div
        role="tabpanel"
        id={`${block}-panel-${active}`}
        aria-labelledby={`${block}-tab-${active}`}
        className="pt-[42px] max-md:pt-5"
      >
        <Carousel key={active} bullets="inline">
          {tab.cards.map((card, i) => (
            <ElectiveCard key={`${i}-${card.title}`} card={card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}
