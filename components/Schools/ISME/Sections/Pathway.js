'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { PillTabStrip } from '@/components/ui/PillTabs';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Runs from '@/components/Schools/ISME/Bba/Runs';
import { CONTAINER, H2, SECTION, SUB_INNER_MRGBTM32 } from '@/components/Home/SectionHead';

/**
 * Shapes the ISME pathway pages (Global Business Pathway, Northeastern, LSE) add to the generic
 * sections, each measured on production at 1440 / 768 / 390.
 */

const H2_MB = { mrg16: 'mb-4 max-md:mb-2', mrg32: 'mb-8', mrgtbm0: 'mb-0' };
const h2mb = (mods) => H2_MB[(mods ?? []).find((m) => H2_MB[m])] ?? 'mb-14 max-md:mb-8';

/* copy that may hold `<ul>`s — preflight wins on these pages: no indent, no markers, no margins */
function Copy({ blocks }) {
  return blocks.map((b, i) =>
    b && typeof b === 'object' && !Array.isArray(b) && b.list ? (
      <ul key={i} className="m-0 list-none p-0">
        {b.items.map((li, j) => (
          <li key={j}>
            <Runs runs={li} />
          </li>
        ))}
      </ul>
    ) : (
      <div key={i}>
        <Runs runs={b} />
      </div>
    )
  );
}

/*
 * `.about-story-wrapper` — the 30% copy column beside a calc(70% - 40px) photograph, in the variants
 * these pages author:
 *   heading     h2 above the row (`headingOutside`) or inside `.abt-cont`
 *   order       image first (`imageFirst`) or copy first
 *   frame       `.about-image-wrap-atlas` (`32px 0`, clipped) around `img.about-image-atlas`
 *               (cover, filling the row's height); or a bare `img.about-image-rect` (`object-fit: fill`)
 *   row         flex, gap 32, stretch. The sheet makes it wrap at <=767, but the copy column keeps
 *               its 30% (and the gap its 32) until the page's own <=568 rule: between 569 and 767
 *               only a bare photograph — `width: auto` and 40px down from 767 — is too wide to stay
 *               on the row; the framed one still fits beside the copy. At <=568 everything is full
 *               width with no gap
 */
export function StoryX({ data, block = 'story' }) {
  const img = data.image;
  const md = data.turn === 'md';
  /* `turn: '768'` — imarticus29012026 restates the row's mobile rules under `@media (max-width: 768px)` */
  const t768 = data.turn === '768';
  const photo = data.video && data.frame === 'wrap' ? (
    /* `.about-image-wrap > .w-embed-youtubevideo` (9 Core Advantages' International Faculty Week): the
       same column holding a ratio frame */
    <div key="img" className="w-[calc(70%-40px)] flex-none max-md:mt-10 max-md:w-full">
      <div className="relative w-full" style={{ paddingTop: `${data.video.ratio}%` }}>
        <iframe src={data.video.src} title="Video" allow="autoplay; encrypted-media" allowFullScreen loading="lazy" className="absolute left-0 top-0 h-full w-full border-0" />
      </div>
    </div>
  ) : data.video ? (
    /*
     * `.w-embed-youtubevideo.about-video-rect` (About's "Our Story"): the calc(70% - 40px) column,
     * its height from an inline `padding-top: 56.17%` — a percentage of the ROW's width, so the box
     * is 649px tall at 1440 — stretched with the row, clipped. Upstream it goes `width: auto` at
     * <=767 and, holding only an absolutely positioned iframe, collapses to 0 wide: the film simply
     * vanishes on phones. That is a layout bug, not reproduced — at <=767 the frame runs the row's
     * full width under the copy, 40px down, at the same 56.17% ratio.
     */
    <div key="img" className="relative w-[calc(70%-40px)] flex-none overflow-hidden bg-cover bg-center max-md:mt-10 max-md:w-full" style={{ paddingTop: `${data.video.ratio}%` }}>
      <iframe src={data.video.src} title="Video" allow="autoplay; encrypted-media" allowFullScreen loading="lazy" className="absolute left-0 top-0 h-full w-full border-0" />
    </div>
  ) : data.frame === 'wrap' ? (
    /* `.about-image-wrap > img.inner-image-rect` (9 Core Advantages): the calc(70% - 40px) column holding
       a cover photograph that fills the row's height */
    <div key="img" className="w-[calc(70%-40px)] flex-none max-md:mt-10 max-md:w-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img.src} srcSet={img.srcSet} sizes={img.sizes} alt={img.alt} loading="lazy" decoding="async" className="inline-block h-full w-full max-w-full object-cover align-middle" />
    </div>
  ) : data.frame === 'atlas' ? (
      <div key="img" className={cx('relative w-[calc(70%-40px)] flex-none overflow-hidden rounded-[32px_0]', md ? 'max-md:w-full' : 'max-mcm:w-full')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img.src} srcSet={img.srcSet} sizes={img.sizes} alt={img.alt} loading="lazy" decoding="async"
          className="inline-block h-full w-full max-w-full flex-none overflow-visible rounded-none object-cover align-super max-md:mt-10 max-md:w-auto max-md:rounded-[32px_0]" />
      </div>
    ) : (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img key="img" src={img.src} srcSet={img.srcSet} sizes={img.sizes} alt={img.alt} loading="lazy" decoding="async"
        className={cx(
          t768 ? 'max-w-full object-fill align-middle max-768:mt-10 max-768:w-auto' : 'max-w-full object-fill align-middle max-md:mt-10 max-md:w-auto',
          /* `rectWidth: 'auto'` — a sheet with no base rule at all: the photograph keeps its natural
             width and can overflow the row (a default `0 1 auto` item whose automatic minimum is its
             own width — no `overflow: hidden`, which would let it shrink) */
          data.rectWidth === 'auto' ? 'flex-[0_1_auto]' : 'w-[calc(70%-40px)] flex-none overflow-hidden'
        )} />
    );
  const copy = (
    /* `turn: 'md'` — the sheet's own 767 rule (About): the copy goes full width and 16px there, and the
       row drops its gap; the pathway pages hold both to 568 with a <style> of their own */
    <div key="copy" className={cx('w-[30%] flex-none text-left text-[18px] leading-[1.5]', t768 ? 'max-768:w-full max-768:text-base' : md ? 'max-md:w-full max-md:text-base' : 'max-mcm:w-full max-mcm:text-base')}>
      {!data.headingOutside && data.heading && <h2 className={cx(H2, h2mb(data.headingMods))}>{withBreaks(data.heading)}</h2>}
      {/* `.about-title` (About's location row) — 24px/1.5 400 #07f6a0, pb32, at every width */}
      {data.aboutTitle && <div className="pb-8 text-[24px] font-normal leading-[1.5] text-atlas-mint">{withBreaks(data.aboutTitle)}</div>}
      <div>
        <Copy blocks={data.text} />
      </div>
      {data.button && (
        /* ref a.secondary-btn — straight after the copy, no gap (measured: text + button = column) */
        <SecondaryButton href={data.button.href} variant={data.button.variant}>
          {data.button.label}
        </SecondaryButton>
      )}
    </div>
  );
  const row = (
    <div className={cx('flex items-stretch justify-between gap-8 overflow-visible', t768 ? 'max-768:flex-wrap max-768:gap-0 max-768:text-[18px]' : cx('max-md:flex-wrap', md ? 'max-md:gap-0 max-md:text-[18px]' : 'max-mcm:gap-0 max-mcm:text-[18px]'))}>
      {data.imageFirst ? [photo, copy] : [copy, photo]}
    </div>
  );
  /* `.about-story-wrapper.mrgbtm` — 56px below (Student Welfare's YourDOST row) */
  if (data.bare) return data.mrgbtm ? <div className="mb-14">{row}</div> : row;
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        {data.headingOutside && data.heading && <h2 className={cx(H2, h2mb(data.headingMods))}>{withBreaks(data.heading)}</h2>}
        {row}
      </div>
    </section>
  );
}

/*
 * "Academic Progression Pathway" — `.journey-wrapper` (flex, gap 32; a column at <=767) of
 * `.journey-card`s (390, flex none; full width at <=767) whose `.journey-content-small` is #1e48a7,
 * 399 tall, pb22, over a 243px `.journey-image`; then `.jpurney-card-large` (#072058, mt32) with a
 * title, a line, paragraphs and a list, closing on `.journey-card-large` (flex, mt48 — mt28 with
 * `.less-space` from 1440 up; a centred column at <=767) holding `img.jc-image`.
 *   .journey-year-small   28px/1.2 700, pt32 px24 (22px, pt22 at <=568)
 *   .succes-title         24px/1.2 500 mint, pt8 px24 mb14
 *   .succes-titlev2       16px/24, pt8 px24 (a `<p>` or an `<i>` set to block)
 *   ul / li               preflight: no indent, no markers
 *   .journey-title-bottom 24px/1.2 500 mint, pt32 px24 mb14; `.journey-yr-title` px24
 */
export function Journeys({ data, block = 'journeys' }) {
  return (
    <section data-block={block} id={data.id || undefined} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, h2mb(data.headingMods))}>{withBreaks(data.heading)}</h2>
        <div className="flex gap-8 pb-0 max-md:flex-col">
          {data.cards.map((c, i) => (
            /* `smallH` / `smallH1440` / `cardTurn` — the Entrepreneurship sheet's `.journey-content-small` is 150
               tall (160 from 1440) and its card goes full width at 767, where the pathway pages' is 399 and 568 */
            <div key={i} className={cx('w-[390px] flex-none', data.cardTurn === 'md' ? 'max-md:w-full' : 'max-mcm:w-full')}>
              <div
                className="h-[var(--jh)] bg-[#1e48a7] pb-[22px] text-white 2xl:h-[var(--jh14)]"
                style={{ '--jh': `${data.smallH ?? 399}px`, '--jh14': `${data.smallH1440 ?? data.smallH ?? 399}px` }}
              >
                <div className="px-6 pt-8 text-[28px] font-bold leading-[1.2] max-mcm:pt-[22px] max-mcm:text-[22px]">{withBreaks(c.year)}</div>
                <div className="mb-3.5 px-6 pt-2 text-[24px] font-medium leading-[1.2] text-atlas-mint">{withBreaks(c.title)}</div>
                {c.body.map((x, j) =>
                  x.list ? (
                    <ul key={j} className="m-0 list-none p-0">
                      {x.items.map((li, k) => (
                        <li key={k}>
                          <Runs runs={li} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j} className={cx('m-0 block w-full px-6 pt-2', x.italic && 'italic')}>
                      <Runs runs={x.text} />
                    </p>
                  )
                )}
              </div>
              <div className="relative h-[243px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image.src} srcSet={c.image.srcSet} sizes={c.image.sizes} alt={c.image.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
              </div>
            </div>
          ))}
        </div>
        {data.large && (
          <div className="mt-8 bg-[#072058] text-white max-md:pb-0">
            <div className="mb-3.5 px-6 pt-8 text-[24px] font-medium leading-[1.2] text-atlas-mint">{withBreaks(data.large.title)}</div>
            {data.large.line && <div className="px-6">{withBreaks(data.large.line)}</div>}
            {data.large.body.map((x, j) =>
              x.list ? (
                <ul key={j} className="m-0 list-none p-0">
                  {x.items.map((li, k) => (
                    <li key={k}>
                      <Runs runs={li} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={j} className="m-0 px-6 pt-2">
                  <Runs runs={x.text} />
                </p>
              )
            )}
            {data.large.image && (
              <div className={cx('mt-12 flex max-md:flex-col max-md:items-center max-md:justify-center', data.large.lessSpace && '2xl:mt-7')}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={data.large.image.src} srcSet={data.large.image.srcSet} sizes={data.large.image.sizes} alt={data.large.image.alt} loading="lazy" decoding="async" className="block max-w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/*
 * "Your Path to Graduation & Masters" — `h2.h2-tag.mrg16`, `h2.sub-heading.mrgbtm32`, then
 * `.rounded-tabs-mint` with the `.less-space` strip of `.law` pills (#072058 / white 600 when current)
 * over `.tab-content-mint.atlas` (pt42, 20 at <=767) holding a `.swiper.common-swiper.mrgtp0` of
 * `.card-type-el-ugdx.law` cards: 298 x 232 at every width, `32px 0`, the title over the lower half's
 * #fff0 -> #000 scrim at p 0/32/32, 20px/1.2 500 white. The carousel bleeds past the container.
 */
export function ElectiveTabs({ data, block = 'electives' }) {
  const [active, setActive] = useState(0);
  const pane = data.tabs[active];
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, h2mb(data.headingMods))}>{withBreaks(data.heading)}</h2>
        {/* ref h2.sub-heading.mrgbtm32 — preflight zeroes the h2 margins on the ISME pages, so it is the div form */}
        {data.sub && (
          <div
            className={
              data.subFlat
                ? /* department-of-finance: no bottom padding above 767 (its sheet has only the <=767 / <=479
                     `.mrgbtm32` rules) and the page's own 300 weight */
                  'pr-[50px] text-2xl font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:text-base max-md:leading-[1.5] max-sm:pb-4'
                : SUB_INNER_MRGBTM32
            }
          >
            {withBreaks(data.sub)}
          </div>
        )}
        {!data.noMenu && (
          <PillTabStrip tabs={data.tabs.map((t) => t.label)} active={active} onChange={setActive} label={data.heading} idPrefix={`${block}-tabs`} tone="law" />
        )}
      </div>
      {/* department-of-finance's Career Pathways (`data.noMenu`): no strip — only the active pane shows — and
          `.tab-content-mint.atlas` keeps its 42px at every width */}
      <div
        {...(data.noMenu ? {} : { role: 'tabpanel', id: `${block}-tabs-panel-${active}`, 'aria-labelledby': `${block}-tabs-tab-${active}` })}
        className={data.noMenu ? 'pt-[42px] text-lg max-md:text-[16px]' : 'pt-[42px] text-lg max-md:pt-5 max-md:text-[16px]'}
      >
        <Carousel key={active} autoplay={false} arrowStyle="isme" bullets="inline">
          {pane.cards.map((card, i) =>
            !card.image ? (
              /* a card whose image is commented out upstream: 298 x 120 #193e90, radius 32 / 0, the label
                 centred (px32) over the card's #fff0 -> #000 gradient, 20px/24 500 white */
              <div key={`${i}-${card.title}`} className="relative h-[120px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] bg-[#193e90]">
                <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(#fff0,#000)] px-8">
                  <div className="text-[20px] font-medium leading-[1.2] text-white">{withBreaks(card.title)}</div>
                </div>
              </div>
            ) : (
            <div key={`${i}-${card.title}`} className="relative h-[232px] w-[298px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image.src} srcSet={card.image.srcSet} sizes={card.image.sizes} alt={card.image.alt} loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-start bg-[linear-gradient(#ffffff00,#000000)] px-8 pb-8">
                <div className="text-[20px] font-medium leading-[1.2] text-white">{withBreaks(card.title)}</div>
              </div>
            </div>
            ),
          )}
        </Carousel>
      </div>
    </section>
  );
}
