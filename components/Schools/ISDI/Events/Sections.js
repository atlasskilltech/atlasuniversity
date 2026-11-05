'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import ZoomSlider from '@/components/Life/ZoomSlider';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import MinorCard from '../MinorCard';
import MotionCard from '../MotionCard';
import PersonCard from '../PersonCard';
import PhotoGallery from '../PhotoGallery';
import SliderCardD from '../SliderCardD';
import MarqueeTrack from '../Home/MarqueeTrack';
import MintTabStrip from '../Home/MintTabStrip';
import {
  H2, H2_MB, SUB, SUB_MRGBTM, SUB_MRGBTM32,
} from '../Home/ui';

/*
 * The five sections of /schools/isdi/events/immersions-&-experiences, in the
 * reference's order. All five are `.common-wrapper-lg` children of ONE
 * `.white-wrapper > .container`, so none of them is a `.section` of its own —
 * which is why this file exports the sections rather than whole blocks.
 *
 * `.common-wrapper-lg` is `padding-top: 120px` (80 at <=767) in the sheet and
 * **100px at every width** on an ISDI page: `.isdi-page .common-wrapper-lg` in
 * header.php is (0,2,0) and beats both. The same trap `.common-wrapper`'s 50px
 * already records.
 */
const WRAP = 'pt-[100px]';

/* ---- 1  Global Immersions ------------------------------------------------ */
/**
 *   #global-immersions.common-wrapper-lg >
 *     (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm32,
 *      .rounded-tabs-mint > (.tabs-menu-mint.less-space > 5 x
 *        a.tab-roundmint-tab-1.isdi,
 *        .tab-content-mint.mrgtp32 > 5 x .w-tab-pane > .swiper.common-swiper.mrgtp0))
 *
 * The same composition /atlas-isdi-advantage/internationalisation's "Global
 * Immersion" uses, down to the Shenzhen tab's imageless third card — but on the
 * `isdi` skin (#d20158 current on a white page) rather than that page's `white`
 * one, and over `bullets="isdi"` rather than the light pair a blue band needs.
 *
 * The panes are numbered **Tab 1, 2, 4, 5, 6** — Webflow's own ids skip "Tab 3",
 * exactly as the homepage testimonials do. Only the first two carry
 * `.tab-pane-tab-N`, which is 16px at <=767 where the bare panes keep
 * `.tab-content-mint`'s 18px.
 */
export function GlobalImmersions({ data }) {
  const [active, setActive] = useState(0);

  return (
    <div id="global-immersions" className={WRAP}>
      <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      <div className={SUB_MRGBTM32}>{withBreaks(data.sub)}</div>

      {/* ref .rounded-tabs-mint */}
      <div className="relative">
        <MintTabStrip
          tabs={data.tabs.map((tab) => tab.label)}
          active={active}
          onChange={setActive}
          label={data.heading}
          idPrefix="isdi-events-global"
        />

        {/* ref .tab-content-mint.mrgtp32 — pt32 (16 at <=479), 18px/1.5 */}
        <div className="relative pt-8 text-[18px] leading-[1.5] max-sm:pt-4">
          {data.tabs.map((tab, i) => (
            /* ref .w-tab-pane */
            <div
              key={tab.label}
              role="tabpanel"
              id={`isdi-events-global-panel-${i}`}
              aria-labelledby={`isdi-events-global-tab-${i}`}
              hidden={i !== active}
              className={i < 2 ? 'max-md:text-base max-md:leading-[1.5]' : undefined}
            >
              {/* ref .swiper.common-swiper.mrgtp0 — `padding-top: 0`, and the
                  compound beats the <=767 rule that gives the bare class 40 */}
              <Carousel autoplay={false} bleed={false} bullets="isdi">
                {tab.cards.map((card, j) => (
                  <MinorCard key={`${j}-${card.image ? card.image.src : 'empty'}`} card={card} />
                ))}
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- 2 & 4  the two `.zoom-slider` walls --------------------------------- */
/**
 *   .common-wrapper-lg > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *                         .swiper.zoom-slider.mrg56 > N x .motion-card)
 *
 * `.mrg56` is margin-top 56, 40 at <=767. Every card is a bare photograph: the
 * `.mc-text-wrap` is authored EMPTY, so `MotionCard` renders the wrap and no
 * plate.
 */
export function MotionWall({ data, id }) {
  return (
    <div id={id} className={WRAP}>
      <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      <div className={SUB}>{withBreaks(data.sub)}</div>
      {/* ref .swiper.zoom-slider.mrg56 */}
      <div className="mt-14 max-md:mt-10">
        <ZoomSlider label={data.heading}>
          {data.cards.map((card, i) => (
            <MotionCard key={`${i}-${card.image.src}`} card={card} />
          ))}
        </ZoomSlider>
      </div>
    </div>
  );
}

/* ---- the photo wall ------------------------------------------------------ */
/**
 *   .common-wrapper-lg > (h2, .sub-heading,
 *     .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery-flex.mrgtp)
 *
 * `.mar-0` zeroes the wrapper's own top margin (56 above 768, 32 below) and
 * `.mrgtp` puts 56 on the ROW instead — so the gap is the same and the two boxes
 * are not. **And `.grid-gallery-flex.mrgtp` is `margin-top: 0` at <=767**, so the
 * wall sits straight under the lead there: 56px at every width was 56px too tall
 * on all five widths below 768.
 *
 * Immersions & Experiences uses it once ("Local Immersions"); Skill & Tech
 * Innovations three times.
 *
 * `headingId` is for the one section whose anchor id the reference authors on the
 * H2 rather than on the wrapper — Industry & Mentorship's "Creative Catalyst", the
 * same split WideSlider's `headingId` already handles.
 */
export function PhotoWall({ data, id, headingId, galleryVariant = 'nested' }) {
  return (
    <div id={id} className={WRAP}>
      <h2 id={headingId} className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      <div className={SUB}>{withBreaks(data.sub)}</div>
      {/* immersions / skill-tech author `.instagram-wrapper.mobile-vert-scroll`
          (nested); creative-showcases authors the bare `.duplicate-grid-wrapper`
          (plain) — see PhotoGallery's ROW map */}
      <PhotoGallery columns={data.columns} rowClassName="mt-14 max-md:mt-0" variant={galleryVariant} />
    </div>
  );
}

/* ---- the wide `.zoom-slider-lg` ------------------------------------------- */
/**
 *   .common-wrapper-lg > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *                         .swiper.zoom-slider-lg.mrgtp > N x .slider-card-b.isdi)
 *
 * `.mrgtp` is margin-top 56, 20 from 991 down.
 *
 * **The id the sticky menu points at is not always on the same element.**
 * Immersions & Experiences puts `#animate` on the H2 — the authoring
 * the-isdi-advantage's three title ids already record — while Skill & Tech
 * Innovations puts `#tech-exploratorium` on the SECTION like every other block.
 * `headingId` renders the first form, `id` the second.
 *
 * `.slider-card-b.isdi` is `SliderCardD`'s box under another name: 800 x 478,
 * clipped, fluid at <=767, with the 16px radius on the CARD and none on the
 * image, and no caption at all.
 */
export function WideSlider({ data, id, headingId }) {
  return (
    <div id={id} className={WRAP}>
      <h2 id={headingId} className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      <div className={SUB}>{withBreaks(data.sub)}</div>
      <ZoomSliderLg label={data.heading} className="mt-14 max-lg:mt-5">
        {data.cards.map((card, i) => (
          <SliderCardD key={`${i}-${card.image.src}`} slide={card} imageRounded={false} />
        ))}
      </ZoomSliderLg>
    </div>
  );
}

/* ---- a bare heading + lead ----------------------------------------------- */
/**
 *   .common-wrapper-lg > .container > (h2.h2-tag.mrg16.isdi, .sub-heading.mrgbtm)
 *
 * /schools/isdi/events/industry-and-mentorship's "AIDC" block is a heading and a
 * lead with no body of its own — its content is the mentor marquee that follows it
 * (a bleed sibling, so it cannot live inside this section's container). `.mrgbtm`
 * is the sub's bottom margin, the gap down to that marquee.
 */
export function Heading({ data, id }) {
  return (
    <div id={id} className={WRAP}>
      <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      <div className={SUB_MRGBTM}>{withBreaks(data.sub)}</div>
    </div>
  );
}

/* ---- the AIDC mentors marquee -------------------------------------------- */
/**
 *   .swiper.marquee-swiper > N x .card-type-d (a DIRECT child of `.white-wrapper`,
 *   so it bleeds full width — it is NOT inside a `.container`)
 *
 * The same `.marquee-swiper` of `.card-type-d` cards the ISDI homepage and About
 * advisory boards run, so it renders through the shared `MarqueeTrack` +
 * `PersonCard` (its measurements live there). Here EVERY `a.play-icon` is authored
 * empty — a 0x0 box that paints and clicks nothing — so no card carries a `video`
 * and no play button renders, the rule /atlas-isdi-advantage/industry-centric-
 * approach's ten empty advisors already record. The ten reused logos are the
 * homepage board's files (byte-identical); only Neeta Lulla's (image-5) is new.
 */
export function MentorMarquee({ people }) {
  return (
    <MarqueeTrack>
      {people.map((person, i) => (
        <PersonCard key={`${i}-${person.name}`} person={person} />
      ))}
    </MarqueeTrack>
  );
}
