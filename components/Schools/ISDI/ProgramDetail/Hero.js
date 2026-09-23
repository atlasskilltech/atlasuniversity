import { Fragment } from 'react';
import withBreaks from '@/lib/withBreaks';
import PrimaryButton from '@/components/ui/PrimaryButton';
import RingSwiper from '../RingSwiper';
import BrochureButton from './BrochureButton';

/**
 * B.Des programme hero — port of
 * reference/schools/isdi/programs/undergraduate/b-des/accessory-design-&-craft.php:41-291.
 *
 * Three `.inner-header-wrapper.under-grad` photographs in the page's own
 * `.swiperprogress` carousel (`../RingSwiper` — the widget, its 10s autoplay and
 * the rings are documented there). Every slide repeats the same three buttons.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                        >=992px                    <=991px            <=767px
 *   stage                100vh
 *   .inner-header-cover  bottom 50%, #0000 ->       bottom 85%
 *     .padd              #000e, p 0/62/56/62                           p 0/20/95/20
 *   .hero-text           max-width 840                                 704 at <=479
 *   .h3-tag.marg-bt-0    32px/1.2 500 white                            22px
 *   .course-desc-isme    24px/1.5 300 white, pt16                      20px/1.5
 *     .big-txt
 *   .buttons-wrapper     row, centred, gap 16,      gap 8              column,
 *                        pt30                                          top-aligned,
 *                                                                      pt24 (14 <=479)
 *   .btn-primary         h56, r36, px24, 18px/1                        h40
 *
 * Two of the three buttons are `href="#"` with a `data-id` that opens one of the
 * page's two brochure popups, so they are rendered as `BrochureButton`.
 */
export default function Hero({ data, brochures }) {
  const slides = data.slides.map((slide, i) => (
    <Fragment key={slide.image.src}>
      {/* ref .inner-header-cover.padd */}
      <div className="absolute inset-x-0 bottom-0 z-[1] flex h-1/2 items-end bg-[linear-gradient(#0000,#000000e6)] px-[62px] pb-14 max-lg:h-[85%] max-md:px-5 max-md:pb-[95px]">
        {/* ref .hero-text */}
        <div className="max-w-[840px] max-sm:max-w-[704px]">
          {/* ref .h3-tag.marg-bt-0 */}
          <div className="m-0 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px] max-md:leading-[1.2]">
            {withBreaks(slide.title)}
          </div>
          {/* ref .course-desc-isme.big-txt */}
          <div className="pt-4 text-[24px] font-light leading-[1.5] text-white max-md:text-[20px] max-md:leading-[1.5]">
            {slide.text}
          </div>
          {/* ref .wrap-btns > .buttons-wrapper */}
          <div className="flex items-center gap-4 pt-[30px] max-lg:gap-2 max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6 max-sm:pt-3.5">
            {slide.buttons.map((button) =>
              button.brochure ? (
                <BrochureButton
                  key={button.label}
                  brochure={brochures[button.brochure]}
                  label={button.label}
                  variant={button.variant}
                />
              ) : (
                <PrimaryButton key={button.label} href={button.href} variant={button.variant}>
                  {button.label}
                </PrimaryButton>
              )
            )}
          </div>
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
      <RingSwiper slides={slides} label="Programme highlights" />
    </div>
  );
}
