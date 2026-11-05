'use client';

import { useState } from 'react';
import { events } from '@/lib/industryContent';
import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import TertiaryTabStrip from '@/components/ui/TertiaryTabStrip';
import { CONTAINER, SECTION, H2, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';

/**
 * "Industry Led Events on Campus" — port of
 * `atlas-industry-centric-approach.php:675-837`
 * (`section.section > .container > (h2.h2-tag.mrg24, h2.h3-tag.black.mrgbm-16,
 *   .sub-heading.mrgbtm, .center-image-full-wrap-atlas > img.about-image-atlas,
 *   .tertiary-tabs.mrgtp > (.tertiary-tabs-menu.mrg-tab.black-bar > 3 tabs,
 *    .tertiary-tabs-content > 3 x .w-tab-pane >
 *      .swiper.common-swiper.mrgtp-32 > 6 x .card-type-f))`).
 *
 * A two-level heading over a full-width photograph, then three year tabs each
 * holding a strip of six event cards.
 *
 * ── Why the strip and the panes are split ─────────────────────────────────
 * `components/ui/TertiaryTabs` pairs the strip with a `.tr-cont-wrapper` photo
 * panel, which is not what this section shows. The strip alone is
 * `components/ui/TertiaryTabStrip`; it sits inside `.container` while each
 * pane's carousel has to be a sibling of it, because `.common-swiper` is
 * `overflow: visible` and its track bleeds to the viewport edge. Same split
 * `PillTabStrip` / `PillTabs` already makes for the homepage testimonials.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                                >=768px                  <=767px
 *   h2.h2-tag.mrg24              44px/1.2, mb 24          36px
 *   h2.h3-tag.black.mrgbm-16     32px/1.2, 500, #2b2b2b,  22px
 *                                mb 16
 *   .sub-heading.mrgbtm          24px/300, pb 56 (20      16px
 *                                <=991), pr 50
 *   .center-image-full-wrap-…    radius 32/0, clipped
 *   .about-image-atlas           100% wide, natural       margin-top 40,
 *                                ratio                    width auto
 *   .tertiary-tabs.mrgtp         margin-top 56
 *   .tertiary-tabs-content       top -4
 *   .common-swiper.mrgtp-32      padding-top 32
 *
 * ── The photograph is not 100vh ───────────────────────────────────────────
 * `.about-image-atlas` declares `width: 100%; height: 100%` inside an
 * auto-height wrapper, so its height computes `auto` and it keeps its 3:2
 * ratio — 1242x828 at 1920, verified against the live site. The local
 * reference reads 1242x1000 only because a stray PHP warning ahead of its
 * doctype puts it in quirks mode, where a percentage height resolves against
 * an auto-height ancestor.
 *
 * The image is an `inline-block` with `vertical-align: super`, so the wrapper
 * is ~12px taller than the image — a transparent strip below it, reproduced
 * rather than collapsed because it is 12px of real vertical rhythm.
 *
 * The tab strip's bottom rule is `.black-bar`, the one place on the site where
 * `.tertiary-tabs-menu`'s `border-bottom` is not white-on-white.
 */
export default function IndustryEvents() {
  const [active, setActive] = useState(0);
  const pane = events.tabs[active];

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg24 — a compound selector, so its 24px survives the
            `@media … .h2-tag { margin-bottom: 32px }` below 768px */}
        <h2 className={`mb-6 ${H2}`}>{events.heading}</h2>

        {/* ref h2.h3-tag.black.mrgbm-16 */}
        <h3 className="mb-4 mt-0 text-[32px] font-medium leading-[1.2] text-[#2b2b2b] max-md:text-[22px]">
          {events.subheading2}
        </h3>

        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{events.subheading}</div>

        {/* ref .center-image-full-wrap-atlas */}
        <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
          {/* ref img.about-image-atlas */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={events.image.src}
            srcSet={events.image.srcSet}
            sizes={events.image.sizes}
            alt={events.image.alt}
            loading="lazy"
            className="inline-block h-auto w-full overflow-visible align-super object-cover max-md:mt-10 max-md:w-auto max-md:max-w-full max-md:overflow-hidden max-md:rounded-tl-[32px] max-md:rounded-br-[32px]"
          />
        </div>

        {/* ref .tertiary-tabs.mrgtp */}
        <div className="relative mt-14">
          <TertiaryTabStrip
            tabs={events.tabs}
            active={active}
            onSelect={setActive}
            label={events.heading}
            idPrefix="industry-events"
            bar="black"
          />
        </div>
      </div>

      {/* ref .tertiary-tabs-content > .w-tab-pane >
          .swiper.common-swiper.mrgtp-32 — a sibling of .container so the track
          bleeds to the viewport edge */}
      <div
        className="relative -top-1"
        role="tabpanel"
        id={`industry-events-panel-${active}`}
        aria-labelledby={`industry-events-tab-${active}`}
      >
        <Carousel className="pt-8">
          {pane.cards.map((card, index) => (
            <CardTypeF key={`${card.image.src}-${index}`} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
