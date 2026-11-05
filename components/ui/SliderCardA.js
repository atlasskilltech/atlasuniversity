import withBreaks from '@/lib/withBreaks';

/**
 * `.slider-card-wrapper` (Webflow `slider-card-a`, atlas variant `w-variant-0dc06d74…`) — an 800 x 475
 * photograph under a full-card scrim, a 32px title on a 12px #5cbdca underline and a 70%-wide lead,
 * carried by `ZoomSliderLg`.
 *
 * Two instances, the same variant class on both references:
 *   /life-at-atlas               "Student Welfare"                          3 cards
 *   /atlas-industry-partnership  "Driving India's Vision of Viksit Bharat"   5 cards
 * Extracted from `Life/StudentWelfare` unchanged.
 *
 *   .slider-card-wrapper   h 475, full width, radius 32px 0, clipped
 *   .slide-content-a       full-card #00263700 → #040404cc scrim, flex column end,
 *                          padding 0 0 50 40 → 0 20 20 at <=767
 *   .slide-title-a         32px/0.5 500 white over a 12px #5cbdca bottom border → 24px
 *   .slide-description-a   18px/1.5, max-width 70%, padding-top 16 → 14px, pt 8
 */
export default function SliderCardA({ card }) {
  return (
    /* ref .slider-card-wrapper (atlas variant) */
    <div className="relative block h-[475px] w-full items-end overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      {/* ref img.slide-image-a */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={card.image.sizes ?? '(max-width: 767px) 100vw, 800px'}
        alt={card.image.alt}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      {/* ref .slide-content-a */}
      <div className="absolute inset-0 z-[1] flex flex-col items-start justify-end bg-[linear-gradient(#00263700,#040404cc)] pb-[50px] pl-10 max-md:px-5 max-md:pb-5">
        {/* ref .slide-title-a (atlas variant) */}
        <div className="border-b-[12px] border-atlas-cyan text-[32px] font-medium leading-[0.5] text-white max-md:text-[24px]">
          {withBreaks(card.title)}
        </div>
        {/* ref .slide-description-a */}
        <div className="max-w-[70%] pt-4 text-[18px] leading-[1.5] text-white max-md:pt-2 max-md:text-[14px]">
          {card.text}
        </div>
      </div>
    </div>
  );
}
