'use client';

import { useState } from 'react';
import { testimonials } from '@/lib/homeContent';
import { cx } from '@/lib/cx';
import Carousel from '@/components/Carousel/Carousel';
import { PillTabStrip } from '@/components/ui/PillTabs';
import { CONTAINER, SECTION, H2 } from '@/components/Home/SectionHead';

/**
 * "In their own words: Why ATLAS feels right" — port of index.php:3115-3532.
 *
 *   section.section > .container >
 *     h2.h2-tag.mrg16
 *     .sub-heading.mrgbtm32
 *     .rounded-tabs-mint (Webflow w-tabs)
 *       .tabs-menu-mint.less-space   — four tab links
 *       .tab-content-mint.atlas      — one .swiper.common-swiper-full per tab
 *
 * Four tabs (the reference's own ids skip "Tab 3"), 26 cards in total:
 * Parents 3, Students 10, Industry 4, Global 9. Parents are looping muted
 * background videos, the rest are photographs.
 *
 * `data` and `headingVariant` are the only things a page varies.
 * /admissions/integrated-admissions repeats this section with the same 26
 * cards — diffed quote by quote against index.php, one card differs — so it
 * derives its export from the homepage's rather than duplicating the copy.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   .tabs-menu-mint        gap 24, -61/60 bleed,      gap 8, same bleed,
 *   .less-space            overflow-x auto            overflow-x auto
 *   .tab-roundmint-tab-1   h40, px20, 18px/1.2        16px/1.2
 *     .w--current          bg #5cbdca, r20, 500       same
 *   .tab-content-mint      padding-top 42             padding-top 20
 *   .testimonial-card      620x440, row, r32 TL/BR    100% x auto, column
 *   .student-image         50% x 100%, cover          100% x 320
 *   .testimonial-video     see the deviation below    100% x 156
 *   .student-text          flex-1, padding 40/32      h280, padding 20/12
 *   .st-quote              padding 24                 padding 24, w100%
 *   .st-text               20px/1.5                   16px/1.5
 *   .st-details            padding-left 24            padding-left 24, w100%
 *   .stname                14px/600                   same
 *   .st-course.atlas       16px/700 #5cbdca           same
 *   .st-course.isdi        14px/400 #fff              same
 *   .st-at-pos             14px #5cbdca               same
 *   .bg-image              absolute, cover, z0        same
 *
 * ── Intentional deviation: the Parents video size ─────────────────────────
 * index.php:1774-1800 carries an inline <style> written for the campus-tour
 * video that also matches THIS section's `.testimonial-video`, forcing
 * `width: 100%; height: 700px` (156px below 992). In a 620x440 `overflow:
 * hidden` row-flex card that pushes `.student-text` completely outside the
 * card: measured, the text box starts at exactly the card's right edge, so on
 * desktop the reference shows the video only and the quote, the parent's name
 * and "Parent" are invisible — while the same markup renders them correctly on
 * mobile. This uses the section's own declared rule instead
 * (`.testimonial-video { width: 325px; height: 440px }`, page CSS L2300), which
 * makes the Parents card match the other three tabs. The 56px corner radius
 * from that inline block is kept, because it is what the reference paints.
 */

/*
 * ref h2.h2-tag.mrg16 vs `.h2-tag.mrg16.isdi`. The homepage authors the plain
 * class — Manrope 500, 44px dropping to 36 at 767. /admissions/integrated-
 * admissions authors `.isdi`, which is Poppins at weight 400 and drops to 36 a
 * breakpoint earlier, at 991. Same string ThoughtLeadership already uses.
 */
const HEADING = {
  default: '',
  isdi: 'font-poppins font-normal max-lg:text-5xl max-lg:leading-[1.2]',
};

/*
 * ref .testimonial-video, which the references disagree on in two ways — both
 * traceable to the same cause. index.php:1774 carries an inline `<style>`
 * written for the campus-tour video that also matches this section, forcing
 * `width: 100%; height: 700px` (156 below 992) and rounding it `56px 0`. None
 * of the three Admissions pages has that block, so all three take the sheet's
 * own `.testimonial-video { width: 325px; height: 440px }` with no radius —
 * measured 440px tall at every width on all three.
 */
const VIDEO = {
  home: 'rounded-tl-[56px] rounded-br-[56px] max-md:h-[156px]',
  plain: 'max-md:h-[440px]',
};

/* ref .testimonial-card.bgc1.atlas */
const CARD =
  'flex h-[440px] w-[620px] flex-none overflow-hidden rounded-tl-[32px] ' +
  'rounded-br-[32px] bg-atlas-footer max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col';

function CourseLine({ line }) {
  const text = line.strong ? <strong className="font-bold">{line.text}</strong> : line.text;
  /* a <strong class="st-at-pos"> inside .st-course drops to 14px cyan */
  return line.atPos ? <span className="text-sm text-atlas-cyan">{text}</span> : text;
}

function Card({ item, icons, watermark, watermarkAlt, videoVariant }) {
  return (
    /* ref .testimonial-card */
    <article className={CARD}>
      {item.video ? (
        /* ref .testimonial-video — `position: relative; z-index: 10`, and the
           box the optional play button is positioned against. The video itself
           is muted, looping and controlless, like Webflow's background video;
           the poster carries the first frame. */
        <div
          className={cx(
            'relative z-10 h-full w-[325px] max-w-full flex-none overflow-clip max-md:w-full',
            VIDEO[videoVariant],
          )}
        >
          <video
            className="h-full w-full object-cover"
            poster={item.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-label={item.quote}
          >
            <source src={item.video} type={item.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
          </video>

          {/* ref a.play-icon > img — opens the shared VideoModal, which listens
              for `[data-video]` on document */}
          {item.playIcon && (
            <a
              href="#"
              data-video={item.playIcon.video}
              aria-label="Play video"
              className="absolute right-6 top-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.playIcon.src}
                alt={item.playIcon.alt}
                width={56}
                height={56}
                loading="lazy"
                className="block"
              />
            </a>
          )}
        </div>
      ) : (
        /* ref .student-image */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="h-full w-1/2 flex-none object-cover object-center max-md:h-[320px] max-md:w-full"
        />
      )}

      {/* ref .student-text — `flex: 1` beats the declared `height: 280px`
          until `@media (max-width: 479px)` turns it off, so between 480 and
          767 the box is content-height and only below 480 does the 280 stand */}
      <div className="relative block flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:px-3 max-md:py-5 max-sm:flex-none">
        {/* ref .st-quote */}
        <div className="relative z-[1] p-6 max-md:w-full">
          {/* ref .st-text */}
          <div className="text-xl leading-[1.5] max-md:text-base">{item.quote}</div>
          {/* ref .quote */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icons[item.quoteIcon] || icons.plain}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            className="absolute left-[5px] top-[5px]"
          />
        </div>

        {/* ref .st-details */}
        <div className="relative z-[1] pl-6 max-md:w-full">
          {/*
            ref .stname.isdi — empty on most cards, but still a box: it carries
            `padding-bottom: 5px`, and between 480 and 767 the card is
            content-height, so omitting it made the card exactly 5px short.
            Rendered always, the same call `GridGallery` and `CardTypeF` make.
          */}
          <div className="pb-[5px] text-sm font-semibold leading-[1.5]">{item.name}</div>

          {/* ref .st-course.st-name.(isdi|atlas) */}
          {item.course.length > 0 && (
            <div
              className={cx(
                'leading-[1.5]',
                item.courseVariant === 'atlas'
                  ? 'text-base font-bold text-atlas-cyan'
                  : 'text-sm text-white',
              )}
            >
              {item.course.map((line, i) => (
                <span key={line.text}>
                  {i > 0 && <br />}
                  <CourseLine line={line} />
                </span>
              ))}
            </div>
          )}

          {/* ref .st-at-pos */}
          {item.atPos.length > 0 && (
            <div className="text-sm leading-[1.5] text-atlas-cyan">
              {item.atPos.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ref .bg-image — the watermark sits under the copy at z-0 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={watermark}
          alt={watermarkAlt}
          loading="lazy"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      </div>
    </article>
  );
}

export default function Testimonials({
  data = testimonials,
  headingVariant = 'default',
  videoVariant = 'home',
}) {
  const [active, setActive] = useState(0);
  const { heading, subheading, tabs, quoteIcons, watermark, watermarkAlt } = data;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16, or `.h2-tag.mrg16.isdi` on the Admissions pages */}
        <h2 className={cx('mb-4 max-md:mb-2', HEADING[headingVariant], H2)}>{heading}</h2>

        {/* ref .sub-heading.mrgbtm32 — the <br> is in the reference copy */}
        <div className="pb-8 pr-[50px] text-2xl font-light leading-[1.4] text-[#333] max-md:pb-4 max-md:pr-0 max-md:text-base max-md:leading-[1.5]">
          {subheading.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>

        {/*
          ref .rounded-tabs-mint > .tabs-menu-mint.less-space — the same strip
          the About page's Recognition section uses, so it lives in
          components/ui/PillTabs. Only the strip is shared: the panel below has
          to sit outside `.container` here (see the comment on it), while
          Recognition's panels sit inside one.
        */}
        <PillTabStrip
          tabs={tabs}
          active={active}
          onChange={setActive}
          label={heading}
          idPrefix="testimonial"
        />
      </div>

      {/*
        ref .tab-content-mint.atlas — a sibling of `.container`, not a child.
        The reference's `.swiper` is `overflow: visible`, so the slide track
        bleeds past the centred container to the viewport edge; Carousel
        reproduces that by spanning the full section width and padding its track
        by the container's own inset. Nesting it inside `.container` would apply
        that inset twice and push the first card 62px too far right.
      */}
      {/* `.tab-content-mint` is `font-size: 18px`, which every unsized box
          inside the card inherits */}
      <div className="pt-[42px] text-lg max-md:pt-5">
        {tabs.map((tab, i) =>
          i === active ? (
            <div
              key={tab.label}
              /* ref `class="tab-pane-tab-N w-tab-pane"` on the first two panes
                 only — the numbered ones take `font-size: 16px` at <=767. Every
                 page's markup numbers Tab 1 and Tab 2 and leaves Tab 4 and Tab 5
                 bare, the homepage included. */
              className={cx(i < 2 && 'max-md:text-base')}
              role="tabpanel"
              id={`testimonial-panel-${i}`}
              aria-labelledby={`testimonial-tab-${i}`}
            >
              {/* ref .swiper.common-swiper-full.mrgtp0 */}
              <Carousel>
                {tab.items.map((item) => (
                  <Card
                    key={item.quote}
                    item={item}
                    icons={quoteIcons}
                    /* ref img.bg-image — /admissions/pg-admissions uses a
                       different watermark on three of its four tabs */
                    watermark={tab.watermark ?? watermark}
                    watermarkAlt={watermarkAlt}
                    videoVariant={videoVariant}
                  />
                ))}
              </Carousel>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
}
