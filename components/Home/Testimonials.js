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

/* ref .testimonial-card.bgc1.atlas */
const CARD =
  'flex h-[440px] w-[620px] flex-none overflow-hidden rounded-tl-[32px] ' +
  'rounded-br-[32px] bg-atlas-footer max-md:h-auto max-md:w-[calc(100vw-44px)] max-md:flex-col';

function CourseLine({ line }) {
  const text = line.strong ? <strong className="font-bold">{line.text}</strong> : line.text;
  /* a <strong class="st-at-pos"> inside .st-course drops to 14px cyan */
  return line.atPos ? <span className="text-sm text-atlas-cyan">{text}</span> : text;
}

function Card({ item, icons, watermark, watermarkAlt }) {
  return (
    /* ref .testimonial-card */
    <article className={CARD}>
      {item.video ? (
        /* ref .testimonial-video — muted, looping, controlless, like Webflow's
           background video; the poster carries the first frame */
        <video
          className="h-full w-[325px] flex-none rounded-tl-[56px] rounded-br-[56px] object-cover max-md:h-[156px] max-md:w-full"
          poster={item.poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-label={item.quote}
        >
          <source src={item.video} type="video/mp4" />
        </video>
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

      {/* ref .student-text */}
      <div className="relative block flex-1 px-8 py-10 text-white max-md:h-[280px] max-md:flex-none max-md:px-3 max-md:py-5">
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
          {/* ref .stname.isdi — often empty in the markup, and then not painted */}
          {item.name && (
            <div className="pb-[5px] text-sm font-semibold leading-[1.5]">{item.name}</div>
          )}

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

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const { heading, subheading, tabs, quoteIcons, watermark, watermarkAlt } = testimonials;

  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>

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
      <div className="pt-[42px] max-md:pt-5">
        {tabs.map((tab, i) =>
          i === active ? (
            <div
              key={tab.label}
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
                    watermark={watermark}
                    watermarkAlt={watermarkAlt}
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
