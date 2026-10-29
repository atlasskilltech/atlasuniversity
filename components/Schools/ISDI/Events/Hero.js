import { Fragment } from 'react';
import withBreaks from '@/lib/withBreaks';
import RingSwiper from '../RingSwiper';

/**
 * The Events hero — four `.inner-header-wrapper.under-grad` photographs in the
 * page's own `.swiperprogress` carousel, which is the shared `../RingSwiper`
 * (the widget, its 10s autoplay and the 68px progress rings are documented
 * there; this page ships the embed byte-identically).
 *
 * It is NOT `ProgramsUg/Hero`, though it uses the same widget and the same
 * `.under-grad` stage. Three things differ, and all three are measurable:
 *   - the cover carries `.padd`, which pads it 62px either side AND makes it
 *     **85% tall from 991 down** where the Undergraduate Overview's stays 50%;
 *   - its inner box is `.hero-text` (max-width 840, 704 at <=479), not the
 *     `.container.grow` that page centres;
 *   - the copy is a `div.h1-tag` over a `.course-desc-isme.big-txt` LEAD, where
 *     that page has an eyebrow over an `h1`.
 *
 * Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   stage      100vh (`.under-grad`)
 *   cover      bottom 50% (85% from 991), #0000 -> #000000e6, items-end, px62,
 *              pb56 — and `padding-bottom: 40%` from the page's own inline
 *              `@media (max-width: 768px)`, which is 768-INCLUSIVE, so it is
 *              `max-768:` and not `max-md:`
 *   title      56px/1.2 400 -> 44 at 991 -> 28/1.5/600 at 767
 *   lead       24px/1.5 300 white, pt16 -> 20px at 767 -> 16px at 479
 *   photo      fills the stage, cover
 *
 * Every slide carries the SAME title and lead; only the photograph changes.
 * Transcribed as authored.
 */
export default function Hero({ data, label }) {
  const slides = data.slides.map((slide, i) => (
    /* ref .inner-header-wrapper.under-grad */
    <Fragment key={slide.image.src}>
      {/* ref .inner-header-cover.padd */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] px-[62px] pb-14 max-lg:h-[85%] max-768:pb-[40%]">
        {/* ref .hero-text */}
        <div className="mb-0 ml-0 max-w-[840px] max-sm:max-w-[704px]">
          {/* ref .h1-tag — a <div> here, not an <h1> */}
          <div className="text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(slide.title)}
          </div>
          {/* ref .course-desc-isme.big-txt */}
          <div className="block pt-4 text-2xl font-light text-white max-md:text-[20px] max-sm:text-base">
            {withBreaks(slide.lead)}
          </div>
        </div>
      </div>

      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image.src}
        srcSet={slide.image.srcSet}
        sizes={slide.image.sizes}
        alt={slide.image.alt}
        loading={i === 0 ? 'eager' : 'lazy'}
        fetchPriority={i === 0 ? 'high' : undefined}
        decoding="async"
        draggable={false}
        className="h-full w-full max-w-full object-cover align-middle"
      />
    </Fragment>
  ));

  return (
    /* ref .section.nopad — `position: static`, unlike the Undergraduate
       Overview's wrapper; `RingSwiper` positions its own stage */
    <div data-block="hero" className="block overflow-hidden">
      {/* `label` defaults to the hero's own title so immersions is unchanged
          (its first slide's title is "Immersions & Experiences") and
          skill-&-tech passes its own */}
      <RingSwiper slides={slides} label={label || data.slides[0]?.title} />
    </div>
  );
}
