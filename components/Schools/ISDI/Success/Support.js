import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import { cx } from '@/lib/cx';
import IconSection from '../About/IconSection';
import SliderCardD from '../SliderCardD';
import { COMMON_WRAPPER, CONTAINER, H2, H2_MB, SUB } from './ui';

/**
 * "Our Support System" (`success-snapshot/index.php`, block 15).
 *
 *   section.section > (.icon-heading,
 *     .common-wrapper > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *       .swiper.zoom-slider-lg.mrgtp > 3 x .slider-card-d))
 *
 * `.common-wrapper` wraps the container here rather than sitting inside it, which
 * changes nothing measurable — both are block boxes and the 56px of top padding
 * lands in the same place.
 *
 * The card is the shared `../SliderCardD` with its caption. These three carry the
 * BARE `.slider-card-d` (`border-radius: 0`) and only the image carries `.isdi`,
 * where Industry Visits' three carry it on the card — so `rounded={false}`.
 */
export default function Support({ data }) {
  return (
    <IconSection block="support" icon={data.icon.image} title={data.icon.title} tone="none">
      {/* ref .common-wrapper */}
      <div className={COMMON_WRAPPER}>
        <div className={CONTAINER}>
          <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
          <div className={SUB}>{data.lead}</div>

          {/* ref .swiper.zoom-slider-lg.mrgtp — mt56, and mt20 from 991 down */}
          <div className="mt-14 max-lg:mt-5">
            <ZoomSliderLg>
              {data.slides.map((slide, i) => (
                <SliderCardD key={`${i}-${slide.name}`} slide={slide} rounded={false} />
              ))}
            </ZoomSliderLg>
          </div>
        </div>
      </div>
    </IconSection>
  );
}
