'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ButtonRegular from '@/components/ui/ButtonRegular';
import PrimaryButton from '@/components/ui/PrimaryButton';
import IconSection from '@/components/Schools/ISDI/About/IconSection';
import Runs from '@/components/Schools/ISME/Bba/Runs';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * The ISME partner-pathway landing pages — reference/schools/isme/northeastern-university-london-
 * global-business-pathway/index.php and atlas-isme-advantage/internationalisation/
 * london-school-of-economics.php. Both are one template: every class is shared and most of the
 * design sits in a ~20KB inline <style> that each page carries, with a handful of different values
 * (`variant`: 'ne' | 'lse'). Measured on production at 1440 / 768 / 700 / 390.
 *
 * The page's own breakpoint is 576 (its `f-size*` / `mg-*` helpers and the column-reverse story
 * rows), on top of Webflow's 991 / 767 / 479.
 */

/* `.h2-tag` + this template's helpers: `mrg16` 16 (8 at <=767), otherwise 56 (32 at <=767);
   `mg-bottom20` 20 / `mg-top15` 15 / `f-size20` 20px/1.2 600 / `f-weight600`, all at <=576 */
function h2cls(mods = []) {
  const has = (m) => mods.includes(m);
  return cx(
    H2,
    has('mrg16') ? 'mb-4 max-md:mb-2' : has('mrg32') ? 'mb-8' : 'mb-14 max-md:mb-8',
    has('mg-bottom20') && 'max-lp:mb-5',
    has('mg-top15') && 'max-lp:mt-[15px]',
    has('f-size20') && 'max-lp:text-[20px] max-lp:font-semibold max-lp:leading-[1.2]',
    has('f-weight600') && 'max-lp:font-semibold'
  );
}

/* the page's `.sub-heading { font-size: 16px }` over the sheet's 300 / 1.4 / pr50; at <=767 the
   sheet's own 20px vertical padding and 16/1.5; at <=576 14px and 10px vertical padding */
const SUB_NE = 'pr-[50px] text-base font-light leading-[1.4] max-md:py-5 max-md:pr-0 max-md:leading-[1.5] max-lp:py-2.5 max-lp:text-sm';
/* lse overrides nothing: the sheet's own 24px sub-heading */
const subOf = (variant) => (variant === 'lse' ? SUB_INNER : SUB_NE);

/* ---------------------------------------------------------------------------------------------
 * hero — `.inner-header-wrapper.full-ht`: 100vh, the photograph `cover`, the scrim over the lower
 * half ending #000000e6 with the copy anchored 190px (ne) / 117px (lse) above the bottom, and the
 * red `.band-para` pinned across the frame. At <=767 the frame is content-height (ne: the mobile
 * photograph's own height) / 80vh (lse) under a full-height scrim; at <=576 the band moves into
 * the copy column as `.band-mob` and the title drops to 29px/1 600 with an 18px line.
 * ------------------------------------------------------------------------------------------- */
const HERO = {
  ne: {
    frame: 'max-md:h-auto',
    cover: 'pb-[190px]',
    band: 'bottom-[50px] bg-[linear-gradient(to_right,#C8102E,#7A0A1C)] leading-[1.8] [text-shadow:0_1px_3px_rgba(0,0,0,0.3)] max-lg:bottom-[60px] max-lg:py-0.5 max-lg:text-[13px]',
  },
  lse: {
    frame: 'max-md:h-[80vh]',
    cover: 'pb-[117px]',
    band: 'bottom-[30px] bg-[#C8102E] leading-[1.4] max-lg:bottom-10 max-lg:py-[3px] max-lg:text-[14px]',
  },
};

export function LpHero({ data, variant = 'ne' }) {
  const v = HERO[variant] ?? HERO.ne;
  const mods = data.titleMods ?? [];
  return (
    <div data-block="hero" className={cx('relative h-screen overflow-hidden', v.frame)}>
      <div className={cx('absolute inset-x-0 bottom-0 flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] max-md:h-full max-lp:pb-[50px]', v.cover)}>
        <div className={cx(CONTAINER, 'flex flex-1 items-end justify-between gap-[100px] max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[22px]')}>
          <h1 className={cx('text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[36px]', mods.includes('f-size29') && 'max-lp:text-[29px] max-lp:font-semibold', mods.includes('l-height1') && 'max-lp:leading-none')}>
            {withBreaks(data.title)}
            {data.sub && (
              <>
                <br />
                <span className="max-lp:text-[18px]">{data.sub}</span>
              </>
            )}
          </h1>
          {data.bandMob && (
            <p className="hidden bg-[rgba(200,16,46,0.8)] px-2.5 py-[5px] text-[12px] leading-5 tracking-[0.13px] text-white max-lp:block">
              <Runs runs={data.bandMob} />
            </p>
          )}
        </div>
        {data.band && (
          <p className={cx('absolute left-0 w-full px-[60px] py-3 text-[22px] text-white max-lg:px-[22px] max-lp:hidden', v.band)}>
            <Runs runs={data.band} />
          </p>
        )}
      </div>
      <picture>
        {data.mobileImage && <source media="(max-width: 767px)" srcSet={data.mobileImage} />}
        <img src={data.image.src} srcSet={data.image.srcSet} sizes={data.image.sizes} alt={data.image.alt} className="h-full w-full object-cover" />
      </picture>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * story — `.about-story-wrapper-ugdx`: a 50% copy column beside the photograph's own frame
 * (`flex: 0 auto`, clipped), centred, gap 32. At <=767 the row wraps (the 32px gap kept) and the
 * photograph sits centred under the copy, 40px down, with `32px 0` corners; at <=576 the row turns
 * `column-reverse` with no gap (photograph above the copy, square) and the copy drops to 12px.
 * ------------------------------------------------------------------------------------------- */
export function LpStory({ data }) {
  const small = data.textMods?.includes('f-size12');
  return (
    <section data-block="story" className={SECTION}>
      <div className={CONTAINER}>
        {/* `wrapMd` — department-of-finance's own <style>: the row wraps at 767 with no gap and the copy
            drops to 16px there; the image frame is rounded 32 / 0 at every width */}
        <div
          className={
            data.wrapMd
              ? 'flex items-center justify-between gap-8 max-md:flex-wrap max-md:gap-0'
              : 'flex items-center justify-between gap-8 max-md:flex-wrap max-lp:flex-col-reverse max-lp:gap-0 max-lp:text-[18px]'
          }
        >
          <div className={cx('w-1/2 flex-none text-[18px] leading-[1.5] max-md:w-full', data.wrapMd && 'max-md:text-[16px]')}>
            <h2 className={h2cls(data.headingMods)}>{withBreaks(data.heading)}</h2>
            <div className={cx(small && 'max-lp:text-[12px]')}>
              <Runs runs={data.text} />
            </div>
          </div>
          <div className={cx('relative flex-[0_1_auto] overflow-hidden max-md:flex max-md:items-center max-md:justify-center', data.wrapMd && 'rounded-[32px_0]')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.src} srcSet={data.image.srcSet} sizes={data.image.sizes} alt={data.image.alt} loading="lazy"
              className="block w-full max-w-full object-cover max-md:mt-10 max-md:w-auto max-md:rounded-[32px_0] max-lp:rounded-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------
 * stack — `.stack_component` of sticky `.stack_card-isme`s (top 7rem, mb 9rem, 622 tall, gap
 * 14rem), each a 759px photograph beside a 478px panel: #18429f (bg-1, gap 52) or #193e90 (gap
 * 40), centred, pad 40. bg-1's wash URL is authored with literal `…` characters upstream and
 * 404s, so no image paints there and none is reproduced. At <=767 a content-height column, the
 * photograph capped at 300 (200 at <=479; 225 top-anchored on the first), panel pad/gap 20; the
 * gap between cards is 0 at <=479.
 * ------------------------------------------------------------------------------------------- */
export function LpStack({ data, variant = 'ne' }) {
  return (
    <div data-block="stack">
      <div className={CONTAINER}>
        <h2 className={h2cls(data.headingMods)}>{withBreaks(data.heading)}</h2>
        <div className="mx-auto w-full max-w-[80rem]">
          <div className="flex flex-col justify-between gap-56 max-md:justify-start max-sm:gap-0">
            {data.cards.map((c, i) => (
              <div key={i} className="sticky top-28 mb-36 flex h-[622px] overflow-hidden shadow-[0_-12px_16px_-4px_#0000000d] max-md:h-auto max-md:flex-col">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image.src} srcSet={c.image.srcSet} sizes={c.image.sizes} alt={c.image.alt} loading="lazy"
                  className={cx(
                    'block h-full w-full max-w-[759px] object-cover max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] max-sm:max-h-[200px] max-sm:object-[50%_50%]',
                    c.imageFirst && 'max-sm:max-h-[225px] max-sm:object-[50%_0%]'
                  )} />
                <div className={cx('flex w-full max-w-[478px] flex-col items-stretch justify-center p-10 max-md:max-w-full max-md:gap-5 max-md:p-5',
                  c.tone === 'bg-1' ? 'gap-[52px] bg-[#18429f]' : 'gap-10 bg-[#193e90]')}>
                  <div className={cx('text-[40px] font-bold leading-[56px] text-white max-md:text-[32px]', variant !== 'lse' && 'max-lp:text-[20px]')}>{withBreaks(c.title)}</div>
                  {c.body.map((x, j) =>
                    x.list ? (
                      <ul key={j} className="list-disc text-white max-md:pl-5">
                        {x.list.map((li, k) => (
                          <li key={k}>
                            <Runs runs={li} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={j} className="text-white">
                        <Runs runs={x.p} />
                      </p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------------------------
 * learn more — `.blue-wrapper` (#011136, pb 56 / 40): a `.blue-desc-wrap.bottom` row (44px/1.5
 * copy capped at 80%, a mint `.button-regular`), then the photograph. At <=576 the row is a
 * column (pt20 pb15 gap 15), the copy 19px, and the desktop button gives way to the one authored
 * under the photograph (`mob-button-view`, 30px below it).
 * ------------------------------------------------------------------------------------------- */
export function LpLearn({ data, variant = 'ne' }) {
  const b = data.button;
  const lse = variant === 'lse';
  return (
    <section data-block="learn" id={data.id || undefined} className={SECTION}>
      <div className="bg-[#011136] pb-14 text-white max-md:pb-10">
        <div className={CONTAINER}>
          <div className={cx('flex items-center justify-between py-14', lse
            ? 'max-sm:flex-col max-sm:gap-2'
            : 'max-lp:flex-col max-lp:items-start max-lp:gap-x-2 max-lp:gap-y-[15px] max-lp:pb-[15px] max-lp:pt-5')}>
            {data.sub ? (
              /* lse: the title and a lead (with its inline link) wrapped in one plain <div>; the
                 lead's `mt-3` is Bootstrap's (1rem), which loads after the Tailwind CDN */
              <div className="w-full">
                <div className="max-w-[80%] text-[44px] leading-[1.5] max-md:text-[28px] max-sm:max-w-full">{withBreaks(data.text)}</div>
                <div className={cx(SUB_INNER, 'mt-4')}>
                  <Runs runs={data.sub} />
                </div>
              </div>
            ) : (
              <div className="max-w-[80%] flex-[1_1_0%] text-[44px] leading-[1.5] max-md:text-[28px] max-lp:max-w-full max-lp:text-[19px]">{withBreaks(data.text)}</div>
            )}
            {b && (
              <ButtonRegular href={b.href} variant="mint" className="max-lp:hidden">
                {b.label}
              </ButtonRegular>
            )}
          </div>
        </div>
        <div className={CONTAINER}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image.src} srcSet={data.image.srcSet} sizes={data.image.sizes} alt={data.image.alt} loading="lazy" className="block h-full w-full max-w-full object-cover max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] max-sm:max-h-[200px] max-sm:object-[50%_50%]" />
          {b && (
            <ButtonRegular href={b.href} variant="mint" className="hidden max-lp:mt-[30px] max-lp:flex">
              {b.label}
            </ButtonRegular>
          )}
        </div>
      </div>
    </section>
  );
}

/* the `.custom-block-none` desktop row / `.common-swiper-full` phone carousel pair both pages use:
   the row shows from 768 up, the carousel (slides at the container width, Swiper's own blue
   bullets 30px under it) at <=767 */
function DeskOrSwiper({ desk, cards, render }) {
  return (
    <>
      <div className="max-md:hidden">{desk}</div>
      <div className="hidden pt-5 max-md:block">
        <Carousel autoplay={false} bleed={false} bullets="inline-overlay" align="center" endSnapTolerance={24}>
          {cards.map((c, i) => (
            <div key={i} className="w-[calc(100vw-44px)] flex-none">
              {render(c, true)}
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------------------------------------
 * programme tabs — `.skills-electives-wrapper` (pt 56 / 24) of `.tab-roundmint-tab-1-3` pills
 * (40 tall, 18px/1.2, mint and 500 when current; 16px at <=767 and 14px for the others at <=479)
 * in a bleeding `.less-space` strip (gap 24, 8 at <=767), over `.card-type-electives.isme-136`
 * cards: 298 wide, 20px corners, the title (20px; 18 / 12 at <=767 / 479) in the lower half's
 * #002637 scrim at pad 24 (12 at <=767).
 * ------------------------------------------------------------------------------------------- */
function ElectiveCard({ card, fluid }) {
  return (
    <div className={cx('relative overflow-hidden rounded-[20px] text-white', fluid ? 'w-full' : 'w-[298px] flex-[0_1_auto]')}>
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 w-full items-end bg-[linear-gradient(#00263700,#002637e6)] p-6 max-md:p-3">
        <div className="text-[20px] leading-[1.5] max-md:text-[18px] max-sm:text-[12px]">{withBreaks(card.title)}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={card.image.src} alt={card.image.alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );
}

export function LpTabs({ data, variant = 'ne' }) {
  const [active, setActive] = useState(0);
  const tab = data.tabs[active];
  return (
    <section data-block="tabs" className={cx(SECTION, data.sectionMods?.includes('mr-top0') && 'max-lp:pt-0')}>
      <div className={CONTAINER}>
        <h2 className={h2cls(data.headingMods)}>{withBreaks(data.heading)}</h2>
        {data.sub && <div className={subOf(variant)}>{withBreaks(data.sub)}</div>}
        <div className="pt-14 max-md:pt-6">
          <div role="tablist" aria-label={data.heading} className="relative -mx-[61px] flex items-center gap-6 overflow-auto px-[60px] max-md:gap-2">
            {data.tabs.map((t, i) => (
              <button key={i} type="button" role="tab" id={`lp-tab-${i}`} aria-selected={i === active} aria-controls={`lp-panel-${i}`} onClick={() => setActive(i)}
                className={cx('flex h-10 flex-none items-center justify-start px-5 text-left text-[18px] leading-[1.2] text-black max-md:text-[16px]',
                  i === active ? 'rounded-[20px] bg-atlas-mint font-medium' : 'max-sm:text-[14px]')}>
                {t.label}
              </button>
            ))}
          </div>
          <div role="tabpanel" id={`lp-panel-${active}`} aria-labelledby={`lp-tab-${active}`} className="pt-8 text-[18px]">
            <DeskOrSwiper
              key={active}
              cards={tab.cards}
              desk={
                <div className="flex flex-wrap gap-4">
                  {tab.cards.map((c, i) => (
                    <ElectiveCard key={i} card={c} />
                  ))}
                </div>
              }
              render={(c) => <ElectiveCard card={c} fluid />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------
 * audience cards — `.career-sup-wrapper` (centred, gap 22, pt 56 / 40) of 330 x 500
 * `.career-sup-card`s: a 340px photograph (240 ne / 370 lse at <=767) over a #0b2b73 panel (pad
 * 20/35) holding `.cr-sub-desc.mt16` — 16px/1.3 white, 16px above (1.4 at <=767). The lse row
 * does not wrap.
 * ------------------------------------------------------------------------------------------- */
function AudienceCard({ card, variant, fluid }) {
  return (
    <div className={cx('flex flex-col items-stretch', fluid ? 'w-full' : 'h-[500px] w-[330px] flex-[0_1_auto]')}>
      <div className={cx('h-[340px]', variant === 'lse' ? 'max-md:h-[370px]' : 'max-md:h-[240px]')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={card.image.src} alt={card.image.alt} loading="lazy" className="block h-[101%] w-full max-w-none object-cover max-md:object-[50%_76%]" />
      </div>
      <div className="flex-1 bg-[#0b2b73] px-[35px] py-5">
        {card.title && <div className="text-[32px] font-medium leading-[1.3] text-atlas-mint max-md:text-[24px]">{withBreaks(card.title)}</div>}
        <div className="mt-4 text-base leading-[1.3] text-white max-md:leading-[1.4]">
          <Runs runs={card.text} />
        </div>
      </div>
    </div>
  );
}

export function LpCards({ data, variant = 'ne' }) {
  return (
    <section data-block="cards" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={h2cls(data.headingMods)}>{withBreaks(data.heading)}</h2>
        {data.sub && <div className={subOf(variant)}>{withBreaks(data.sub)}</div>}
        <DeskOrSwiper
          cards={data.cards}
          desk={
            <div className={cx('flex items-start justify-center gap-[22px] pt-14', variant !== 'lse' && 'flex-wrap')}>
              {data.cards.map((c, i) => (
                <AudienceCard key={i} card={c} variant={variant} />
              ))}
            </div>
          }
          render={(c) => <AudienceCard card={c} variant={variant} fluid />}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------------------------
 * about — the ISME icon heading over a `.blue-wrapper` holding `.about-story-wrapper`: a 40% copy
 * column (18px; 16 at <=767; `mg-top15` 15px above it at <=576) with its outline-white buttons,
 * beside a calc(60% - 40px) photograph filling the row's height. Wraps at <=767 (photograph full
 * width, 40px above it) and reverses at <=576.
 * ------------------------------------------------------------------------------------------- */
export function LpAbout({ data }) {
  return (
    <IconSection id={data.id || undefined} block="about" icon={data.icon?.src} title={data.title} tone="blue" skin="isme">
      <div className={CONTAINER}>
        <div className="pt-14 max-md:pt-10">
          <div className="flex items-stretch justify-between gap-8 max-md:flex-wrap max-md:gap-0 max-md:text-[18px] max-lp:flex-col-reverse">
            <div className="w-[40%] flex-none text-left text-[18px] leading-[1.5] max-md:w-full max-md:text-base">
              <div className={cx(data.textMods?.includes('mg-top15') && 'max-lp:mt-[15px]')}>
                <Runs runs={data.text} />
              </div>
              {data.buttons?.length > 0 && (
                <div className="flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5">
                  {data.buttons.map((b, i) => (
                    <PrimaryButton key={i} href={b.href} variant={b.variant === 'outline-white' ? 'outline' : b.variant} icon={b.icon} textSize="inherit">
                      {b.label}
                    </PrimaryButton>
                  ))}
                </div>
              )}
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image.src} alt={data.image.alt} loading="lazy" className="w-[calc(60%-40px)] flex-none overflow-hidden rounded-none object-cover max-md:mt-10 max-md:w-auto" />
          </div>
        </div>
      </div>
    </IconSection>
  );
}

/* ---------------------------------------------------------------------------------------------
 * disclaimer — a bare <section> (no padding): `.sub-heading.custom-margin-bt` (18px, mb 16; at
 * <=767 no margin, at <=576 16px) holding a <b> that Preflight's relative `bolder` takes from the
 * sub-heading's 300 to 400 — what production paints — then the copy as a `.sub-heading`.
 * ------------------------------------------------------------------------------------------- */
export function LpDisclaimer({ data, variant = 'ne' }) {
  const lse = variant === 'lse';
  return (
    <section data-block="disclaimer">
      <div className={CONTAINER}>
        <div className={lse ? 'mb-4 pr-[50px] text-2xl font-light leading-[1.4] max-md:mb-0 max-md:pr-0 max-md:text-base max-md:leading-[1.5]' : 'mb-4 pr-[50px] text-[18px] font-light leading-[1.4] max-md:mb-0 max-md:pr-0 max-md:leading-[1.5] max-lp:py-2.5 max-lp:text-base'}>
          <b className="font-normal">{data.label}</b>
        </div>
        <div className={subOf(variant)}>
          <Runs runs={data.text} />
        </div>
      </div>
    </section>
  );
}
