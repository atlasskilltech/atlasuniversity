import { Fragment } from 'react';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import RingSwiper from '../RingSwiper';

/**
 * The ISDI campus hero — four `.inner-header-wrapper.under-grad` slides in the page's
 * own `.swiperprogress.swiper-30` carousel (the shared `../RingSwiper`), each a
 * BACKGROUND VIDEO under the same `.inner-header-cover.padd` scrim the Events hero
 * uses, with an `.h2-tag.isdi.white` heading and a pink "Schedule a Visit" button.
 *
 * Differences from `Events/Hero`, all measured on production:
 *   - the rings are **56px** (`.isdi-page .progress-circle`), not 68, and their mobile
 *     row sits at **bottom 5%**, not 2% — hence RingSwiper's `ringSize` / `mobileBottom`;
 *   - the autoplay delay is **30s** (`swiper-30`), not 10;
 *   - each slide is a `.swiper-bg-video` (`autoplay loop muted playsinline`, poster +
 *     mp4/webm) filling the stage, not a photograph;
 *   - the copy is a `div.h2-tag.mrg16.isdi.white` (44/1.2 400 white, 36 at <=991) over a
 *     `.buttons-wrapper > .btn-primary` (pink) rather than an eyebrow/lead.
 */
export default function Hero({ data }) {
  const slides = data.slides.map((slide, i) => (
    /* ref .inner-header-wrapper.under-grad */
    <Fragment key={slide.poster}>
      {/* ref .inner-header-cover.padd */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] px-[62px] pb-14 max-lg:h-[85%] max-768:pb-[40%]">
        {/* ref .hero-text */}
        <div className="mb-0 ml-0 max-w-[840px] max-sm:max-w-[704px]">
          {/* ref div.h2-tag.mrg16.isdi.white */}
          <div className="mb-4 text-[44px] font-normal leading-[1.2] text-white max-lg:text-[36px] max-md:mb-2">
            {withBreaks(slide.heading)}
          </div>
          {/* ref .buttons-wrapper > a.btn-primary (pink) */}
          <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:pt-[30px]">
            <PrimaryButton href={data.button.href} variant="pink">
              {data.button.label}
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* ref .swiper-bg-video > video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload={i === 0 ? 'auto' : 'none'}
        poster={slide.poster}
      >
        {slide.sources.map((src) => (
          <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        ))}
      </video>
    </Fragment>
  ));

  return (
    /* ref .section.nopad > .swiper.swiperprogress.swiper-30 */
    <div data-block="hero" className="block overflow-hidden">
      <RingSwiper
        slides={slides}
        delay={30000}
        ringSize={56}
        mobileBottom="[@media(max-width:768px)]:bottom-[5%]"
        label={data.slides[0]?.heading}
      />
    </div>
  );
}
