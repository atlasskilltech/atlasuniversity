'use client';

import { useState } from 'react';
import { CONTAINER, SECTION, SUB_H2_MRGBTM32 } from '@/components/Home/SectionHead';
import SecondaryButton from '@/components/ui/SecondaryButton';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { H2_MRG16 } from '@/components/Schools/LawUgdx/Sections';

/**
 * uGDX "Our Programs" — `.primary-tabs` (Undergraduate / Integrated) over a wrapping
 * `.common-flex` grid of `.pg-card-ugdx` programme cards (reference/ugdx/index.php). Not ISME's
 * programme carousel: the same `.program-card-a` card, laid out as a grid. Values from the uGDX sheet,
 * measured on production at 1440 / 991 / 767 / 479 / 390:
 *
 *   .primary-tabs-menu          flex, 32px 500, z 1, scrolls; tab links pad 9 30 (Webflow's
 *                               `.w-tab-link`), #222 idle; current #eb1f3c with an 8px #eb1f3c bottom
 *                               rule. `.tab-text` drops to 16px at <=767.
 *   .primary-tabs-content       2px #1a1a1a top rule, padding-top 40 (20 at <=767), lifted 4px
 *   .common-flex                wrap, gap 24, start, centred; white text
 *   .pg-card-ugdx               100% wide up to 544, 745 tall (400 / 580-625 at <=767; 350 / 690 at
 *                               <=479), radius 32px 0, clipped
 *   .program-card-a             a full-size column (min-height 310 at <=767)
 *   .pg-image                   cover, 200 tall (150 at <=767)
 *   .pg-details-ugdx            #011627 under the uGDX card wash (cover, centred), padding 32 (24 <=767),
 *                               a start-aligned column, flex 1
 *   .pg-title-ugdx              24px/1.2 700 #eb1f3c, mb 32 (20px at <=767)
 *   .pg-cont                    mb 32: `.pg-title-sm.ugdx` 16px/1.2 600 #eb1f3c pb 14 (14px at <=767),
 *                               then `.pg-list-wrap` — an 8px-gap wrapping row of `.pg-list` items
 *                               (16px/1.5, 12px at <=767, 14 at <=479) split by 6px white squares
 *   .pg-el-wrap                 a 32px-gap row of `.pg-eligible` blocks, mb 46 (10 at <=767, 14 at <=479)
 *   .btn-wraper                 margin-top auto — every card's button sits on its bottom edge
 *
 * Only the current pane is mounted. Each card's list ends with three EMPTY `.pg-list`s in the
 * reference; they are rendered (zero-height, but still flex items of the 8px-gap row).
 */
function Card({ card }) {
  return (
    <div className="h-[745px] max-h-[745px] w-full max-w-[544px] overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:h-[625px] max-md:max-h-[580px] max-md:max-w-[400px] max-sm:h-[690px] max-sm:max-h-[692px] max-sm:max-w-[350px]">
      <div className="relative flex h-full w-full flex-none flex-col items-start justify-start overflow-hidden bg-[#2c57b7] p-0 text-white max-md:min-h-[310px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" className="h-full max-h-[200px] min-h-[200px] w-full object-cover align-baseline max-md:max-h-[150px] max-md:min-h-[150px]" />
        <div
          className="flex w-full flex-[1_1_0] flex-col items-start justify-start bg-[#011627] bg-cover bg-center bg-no-repeat p-8 max-md:p-6"
          style={{ backgroundImage: `url(${card.wash})` }}
        >
          <h3 className="mb-8 mt-0 w-auto flex-none text-2xl font-bold leading-[1.2] text-[#eb1f3c] max-md:text-[20px] max-md:leading-[1.2]">{withBreaks(card.title)}</h3>
          <div className="mb-8">
            <div className="block pb-[14px] text-base font-semibold leading-[1.2] text-[#eb1f3c] max-md:text-[14px] max-md:leading-[1.2]">{card.areasLabel}</div>
            <div className="flex flex-wrap items-center justify-start gap-2">
              {card.areas.flatMap((a, j) => [
                j > 0 && <div key={`r${j}`} className="h-1.5 w-1.5 bg-white" />,
                <div key={`a${j}`} className="text-base leading-[1.5] max-md:text-xs max-md:leading-[1.5] max-sm:text-[14px]">
                  {a.strong ? <>{a.text}<strong className="font-bold">{a.strong}</strong>{a.after}</> : a}
                </div>,
              ])}
              {Array.from({ length: card.emptyAreas ?? 0 }, (unused, j) => <div key={`e${j}`} />)}
            </div>
          </div>
          <div className="mb-[46px] flex items-start justify-start gap-8 max-md:mb-2.5 max-sm:mb-[14px]">
            {card.facts.map((f) => (
              <div key={f.label}>
                <div className="block pb-[14px] text-base font-semibold leading-[1.2] text-[#eb1f3c] max-md:text-[14px] max-md:leading-[1.2]">{f.label}</div>
                <div className="text-base leading-[1.5] max-md:text-xs max-md:leading-[1.5] max-sm:text-[14px]">{withBreaks(f.value)}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto inline-block">
            <SecondaryButton href={card.button.href} variant="ugdx-red">{card.button.label}</SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProgramGrid({ data, block = 'programs' }) {
  const [active, setActive] = useState(0);
  return (
    <div data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MRG16}>{withBreaks(data.heading)}</h2>
        <div className={SUB_H2_MRGBTM32}>{withBreaks(data.sub)}</div>
        <div role="tablist" aria-label={data.heading} className="relative z-[1] flex overflow-auto text-[32px] font-medium">
          {data.tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              id={`${block}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${block}-panel-${i}`}
              onClick={() => setActive(i)}
              className={cx(
                'flex-none bg-transparent px-[30px] py-[9px] text-left',
                i === active ? 'border-0 border-b-8 border-solid border-[#eb1f3c] text-[#eb1f3c]' : 'text-[#222]',
              )}
            >
              <div className="max-md:text-base">{t.label}</div>
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`${block}-panel-${active}`}
          aria-labelledby={`${block}-tab-${active}`}
          className="relative -top-1 overflow-visible border-0 border-t-2 border-solid border-[#1a1a1a] pt-10 max-md:pt-5"
        >
          <div className="flex w-full flex-wrap items-center justify-start gap-6 text-white">
            {data.tabs[active].cards.map((card) => <Card key={card.title} card={card} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
