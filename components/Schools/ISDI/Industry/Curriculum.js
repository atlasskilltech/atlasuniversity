import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ZoomSlider from '@/components/Life/ZoomSlider';
import IconSection from '../About/IconSection';
import { CONTAINER, H2, H2_MB, SUB } from '../Home/ui';
import { COMMON_WRAPPER, Runs, SUB_1_MRGBTM } from './ui';

/**
 * "Deeply Industry-Centric Curriculum" (`industry-centric-approach.php`, block 9).
 *
 *   section.section > (.icon-heading,
 *     .container > (.common-wrapper > (.sub-heading-1.mrgbtm, .sub-inner-header),
 *                   .common-wrapper > (h2, .sub-heading, .swiper.zoom-slider.mrg56)))
 *
 * ── `.sub-inner-header` is a banner, not a hero ───────────────────────────
 * 446px tall at every width, with `.sub-inner-content` absolutely placed over its
 * bottom half (`height: 50%`, pb56, `align-items: flex-end`, z10) and
 * `img.sub-inner-image` filling the frame. It carries **no** gradient: the
 * `.g1` modifier that paints one is not authored here, so the copy sits straight
 * on the photograph.
 *   .sub-inner-hd    an UNSTYLED wrapper around two elements, not one string:
 *                    `.sub-inner-num.isdi` 56px/1 500 white over
 *                    `.sub-hd-text` 44px/1.2 400 white, 28px/1.5 at <=767
 *   .sub-inner-desc  430 wide, 18px/1.6 300 white; full width at <=767
 *
 * **The banner's own height hides a defect here.** `.sub-inner-header` is a fixed
 * 446px, so flattening the heading to one 44px string — which is what the first
 * port of it did — changes nothing a block-height diff can see; it was found by
 * the text diff and confirmed by measuring the two children (56 + 52.8 = 108.8 at
 * 1440 against the flattened 105.6).
 *
 * ── The card is a `.graduate-card` in a `.zoom-slider` ────────────────────
 * 340 x 480, radius 24, clipped, holding only `img.gd-image` — its
 * `.gd-text-wrap > .gd-card-text` is authored EMPTY on all ten cards and is still
 * rendered, the "an empty element is still a box" rule. `.zoom-slider` is the
 * 0.8 / 0.88 / 1 ladder `Life/ZoomSlider` already owns, which turns at 568.
 */
export default function Curriculum({ data }) {
  return (
    <IconSection
      block="curriculum"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <div className={SUB_1_MRGBTM}>
            <Runs value={data.lead} />
          </div>

          {/* ref .sub-inner-header */}
          <div className="relative h-[446px] w-full">
            {/* ref img.sub-inner-image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.banner.image.src}
              srcSet={data.banner.image.srcSet}
              sizes={data.banner.image.sizes}
              alt={data.banner.image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            {/* ref .sub-inner-content — no `.g1`, so no gradient */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex h-1/2 w-full items-end pb-14">
              {/* ref .container.btm-flext */}
              <div className={`${CONTAINER} flex w-full flex-1 items-end justify-between gap-[100px] max-md:flex-col max-md:items-start max-md:justify-start max-md:gap-[22px]`}>
                {/* ref .sub-inner-hd — an unstyled wrapper */}
                <div>
                  {/* ref .sub-inner-num.isdi */}
                  <div className="text-[56px] font-medium leading-none text-white">
                    {data.banner.figure}
                  </div>
                  {/* ref .sub-hd-text */}
                  <div className="text-[44px] font-normal leading-[1.2] text-white max-md:text-[28px] max-md:leading-[1.5]">
                    {withBreaks(data.banner.caption)}
                  </div>
                </div>
                {/* ref .sub-inner-desc */}
                <div className="w-[430px] text-[18px] font-light leading-[1.6] text-white max-md:w-full">
                  {data.banner.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
          <div className={SUB}>
            <Runs value={data.sub} />
          </div>

          {/* ref .swiper.zoom-slider.mrg56 — INSIDE `.common-wrapper` */}
          {/* `.mrg56` is mt56, and mt40 at <=767 */}
          <div className="mt-14 max-md:mt-10">
            <ZoomSlider>
              {data.cards.map((card, i) => (
            /* ref .graduate-card */
            <div key={`${i}-${card.image.src}`} className="relative h-[480px] w-[340px] overflow-hidden rounded-3xl leading-none">
              {/* ref img.gd-image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover align-middle"
              />
              {/* ref .gd-text-wrap > .gd-card-text — authored empty on all ten */}
              <div>
                <div />
              </div>
            </div>
              ))}
            </ZoomSlider>
          </div>
        </div>
      </div>
    </IconSection>
  );
}
