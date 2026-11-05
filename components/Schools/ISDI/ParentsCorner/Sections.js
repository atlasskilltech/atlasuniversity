'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ZoomSlider from '@/components/Life/ZoomSlider';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import CardTypeE from '../CardTypeE';
import MotionCard from '../MotionCard';
import LogoStrip from '../LogoStrip';
import PlacementCard from '../Success/PlacementCard';
import MintTabStrip from '../Home/MintTabStrip';
import { CONTAINER, H2, H2_MB, SECTION, SUB, SUB_1, SUB_1_MRGBTM } from '../Home/ui';
import PortCardJ from './PortCardJ';
import SliderCardA2 from './SliderCardA2';

/* ref .sub-heading.mrgbtm — 24px/1.4 300 (16px/1.5 <=767), pr50 (0 <=767); and the
   bottom gap is pb56 -> pb20 at <=991 -> pb0+mb20 at <=767 -> pb20+mb20 at <=479.
   Written standalone (not `pb-14 + SUB`) so the two padding-bottom utilities do not
   collide in one class list. */
const SUB_MB =
  'pr-[50px] text-[24px] font-light leading-[1.4] pb-14 max-lg:pb-5 max-md:pb-0 max-md:mb-5 max-md:pr-0 max-md:text-[16px] max-md:leading-[1.5] max-sm:pb-5';
/* ref .sub-heading-3 — 24px/1.4 300 (16px/1.5 <=767), pr50, pb0 (pb20 <=767) */
const SUB_3 =
  'pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:pb-5 max-md:text-[16px] max-md:leading-[1.5]';
/* ref .sub-heading-3.mrgbtm32 — pb32 at every width (compound beats the <=767 pb20) */
const SUB_3_MB32 =
  'pb-8 pr-[50px] text-[24px] font-light leading-[1.4] max-md:pr-0 max-md:text-[16px] max-md:leading-[1.5]';

/* ref .social-act-wrapper — flex, gap 24, items-start, pt56; column at <=767 */
const SOCIAL_WRAP = 'flex items-start justify-start gap-6 pt-14 max-md:flex-col';

/*
 * ref `.container-15.w-container` — Webflow's `.w-container` max-width (940, then
 * 728 at <=991, 100% at <=767) wins over `.container-15`'s 1366, so the two
 * sections that carry it ("Meet your campus family" and "Cost of living") render
 * their heading and carousel in a 940px centred column. The carousel is
 * CONTAINED in it (first card at the column's left inset, bleeding right into the
 * section's `overflow: hidden`), not a full-bleed sibling of `.container`.
 */
const CONTAINER_W =
  'relative z-[1] mx-auto w-full max-w-[940px] px-[62px] max-lg:max-w-[728px] max-lg:px-[30px] max-md:max-w-none max-md:px-[22px]';

/* ── "Guiding Growth through Personalised Support" (parents-corner.php:73-103) ── */
export function GuidingGrowth({ data }) {
  return (
    <div data-block="guiding" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrgtbm0.isdi */}
        <h2 className={cx(H2, H2_MB.mrgtbm0)}>{withBreaks(data.heading)}</h2>
        <div className={SOCIAL_WRAP}>
          {data.cards.map((card, i) => (
            <PortCardJ key={i} card={card} variant="isdi" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── "Meet your campus family" / "Plan Your Move: Cost of living" (card-type-e) ── */
export function CardTypeECarousel({ data }) {
  return (
    <div data-block={data.block} className={SECTION}>
      {/* the heading AND the carousel sit inside the 940px `.w-container` */}
      <div className={CONTAINER_W}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={data.subVariant === 'sub1' ? SUB_1 : SUB}>{withBreaks(data.sub)}</div>
        {/* ref .swiper.common-swiper — contained (bleed right only), first card at
            the column's left inset */}
        <div className="pt-14 max-md:pt-10">
          <Carousel autoplay={false} bleed={false} bullets="isdi">
            {data.cards.map((person, i) => (
              <CardTypeE key={i} person={person} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

/* ── zoom-slider-lg sections: Culture & Heritage, Connected & Convenient ── */
export function SliderSection({ data }) {
  return (
    <section data-block={data.block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_3}>{withBreaks(data.sub)}</div>
      </div>
      {/* ref .swiper.zoom-slider-lg.mrgtp — mt56, dropping to 20 from 991 down */}
      <div className="mt-14 max-lg:mt-5">
        <ZoomSliderLg label={data.heading}>
          {data.cards.map((card, i) => (
            <SliderCardA2 key={i} card={card} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}

/* ── zoom-slider (motion) sections: Eats & Hangouts, Leisure & Lifestyle ── */
export function MotionSection({ data }) {
  return (
    <section data-block={data.block} className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={data.subMb32 ? SUB_3_MB32 : SUB_3}>{withBreaks(data.sub)}</div>
      </div>
      {/* ref .swiper.zoom-slider — NO `.mrg56` here, so no top margin; the gap is
          the sub's own padding-bottom plus the slider's internal spacing */}
      <div>
        <ZoomSlider label={data.heading}>
          {data.cards.map((card, i) => (
            <MotionCard key={i} card={card} />
          ))}
        </ZoomSlider>
      </div>
    </section>
  );
}

/* ── "Right in the heart of the action" — map tabs + Corporate & Design District ── */
export function HeartOfAction({ data }) {
  const [active, setActive] = useState(0);
  return (
    <section data-block="heart" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        <div className={SUB_MB}>{withBreaks(data.sub)}</div>

        {/* ref .rounded-tabs-mint > .tabs-menu-mint.less-space + .tab-content-mint.padtp32 */}
        <div className="relative">
          <MintTabStrip
            tabs={data.tabs.map((t) => t.label)}
            active={active}
            onChange={setActive}
            label={data.heading}
            idPrefix="heart-map"
            skin="white"
          />
          {/* ref .tab-content-mint.padtp32 — pt32 */}
          <div className="relative pt-8">
            {data.tabs.map((tab, i) => (
              <div
                key={tab.label}
                role="tabpanel"
                id={`heart-map-panel-${i}`}
                aria-labelledby={`heart-map-tab-${i}`}
                hidden={i !== active}
              >
                {/* ref img.image-24 — width 100% at <=767 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tab.image.src}
                  srcSet={tab.image.srcSet}
                  sizes={tab.image.sizes}
                  alt=""
                  loading="lazy"
                  className="inline-block max-w-full align-middle max-md:w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ref .common-wrapper — "Corporate & Design District" */}
        <div className="pt-[50px]">
          <h2 id="corporate" className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.corporate.heading)}</h2>
          <div className={SUB_3}>{withBreaks(data.corporate.sub)}</div>
        </div>
      </div>
      {/* ref .swiper.zoom-slider-lg.mrgtp — mt56, dropping to 20 from 991 down */}
      <div className="mt-14 max-lg:mt-5">
        <ZoomSliderLg label={data.corporate.heading}>
          {data.corporate.cards.map((card, i) => (
            <SliderCardA2 key={i} card={card} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}

/* ── "Upgrad Spaces, Student-Centric Living" ── */
export function Upgrad({ data }) {
  return (
    <section data-block="upgrad" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap.top — row/space-between/items-start above 768; at <=767 it
            inherits `flex-flow: column` from the base `.head-wrap` and adds
            align-items: stretch + a 16px gap (space-around at <=479) */}
        <div className="flex items-start justify-between gap-4 max-md:flex-col max-md:items-stretch max-sm:justify-around">
          {/* ref .tt-wrap — flex 0 auto; margin-bottom 20 at <=767, margin-right 20
              at <=479 (so it is 20px narrower than the stretched column there) */}
          <div className="grow-0 max-md:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
            <div className={SUB_1}>{withBreaks(data.sub)}</div>
          </div>
          {/* ref a.button-regular-2.small-icon — #d20158, h54 (44 <=767), r27 */}
          <a
            href={data.button.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[54px] flex-none items-center justify-center gap-2.5 rounded-[27px] bg-[#d20158] px-5 text-white no-underline max-md:h-11"
          >
            <div className="text-[18px] max-md:text-[14px]">{data.button.label}</div>
          </a>
        </div>

        {/* ref .center-image-full-wrap.mrgtp.isdi — the YouTube embed, r16, mt56 (40 <=767), mb5 */}
        <div className="relative mb-[5px] mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          <div className="relative" style={{ paddingTop: '56.17021276595745%' }}>
            <iframe
              src={data.videoSrc}
              title="YouTube"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>

        {/* ref .social-act-wrapper — overlay-gradient cards with the extra subtitle line */}
        <div className={SOCIAL_WRAP}>
          {data.cards.map((card, i) => (
            <PortCardJ key={i} card={card} variant="overlay" />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── "Strong Careers. Stronger Packages." (placement-card.isdi) ── */
export function Careers({ data }) {
  return (
    <div data-block="careers" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrgtbm0)}>{withBreaks(data.heading)}</h2>
      </div>
      {/* ref .swiper.common-swiper */}
      <div className="pt-14 max-md:pt-10">
        <Carousel autoplay={false} bullets="isdi">
          {data.cards.map((card, i) => (
            <PlacementCard key={i} card={card} />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

/* ── the recruiter logo marquee (`.section.nopad > .slide-wrap`) ── */
export function Recruiters({ data }) {
  return (
    <div data-block="recruiters" className="block overflow-hidden">
      <LogoStrip logos={data.logos} />
    </div>
  );
}
