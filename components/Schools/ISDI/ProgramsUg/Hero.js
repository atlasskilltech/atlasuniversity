import { Fragment } from 'react';
import withBreaks from '@/lib/withBreaks';
import RingSwiper from '../RingSwiper';

/**
 * Undergraduate-programmes hero — port of
 * reference/schools/isdi/programs/undergraduate/index.php:12-189.
 *
 * Four `.inner-header-wrapper.under-grad` photographs in the page's own
 * `.swiperprogress` carousel, which is `../RingSwiper` — the widget, its 10s
 * autoplay and the progress rings are documented there, and the B.Des programme
 * pages ship the same embed with their own slides.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *   stage        100vh
 *   scrim        bottom 50%, #0000 -> #000000e6; the whole frame below 768 with
 *                `padding-bottom: 40%` (of the cover's own width — the page's
 *                own inline `@media (max-width: 768px)` rule)
 *   eyebrow      18px/1.5 white, pb12
 *   heading      56px/1.2 -> 44px at 991 -> 28px/1.5/600 at 767
 *   photo        fills the stage, cover
 */
export default function Hero({ data }) {
  const slides = data.slides.map((slide, i) => (
    /* ref .inner-header-wrapper.under-grad */
    <Fragment key={slide.image.src}>
      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] pb-14 max-md:h-full max-md:pb-[40%]">
        {/* ref .container.grow */}
        <div className="relative z-[1] mx-auto w-full max-w-[1366px] flex-1 px-[62px] max-lg:px-[30px] max-md:px-[22px]">
          {/* ref .top-sub-text-big */}
          <div className="pb-3 text-[18px] leading-[1.5] text-white">{slide.eyebrow}</div>
          {/* ref h1.h1-tag */}
          <h1 className="m-0 text-[56px] font-normal leading-[1.2] text-white max-lg:text-[44px] max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
            {withBreaks(slide.title)}
          </h1>
        </div>
      </div>

      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={slide.image.src}
        srcSet={slide.image.srcSet}
        sizes={slide.image.sizes}
        width={slide.image.width}
        height={slide.image.height}
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
    /* ref .section.nopad > .swiper.swiperprogress */
    <div data-block="hero" className="relative block overflow-hidden">
      <RingSwiper slides={slides} label="Undergraduate programmes" />
    </div>
  );
}
