import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import IconSection from '../About/IconSection';
import SliderCardD from '../SliderCardD';
import { CONTAINER } from '../Home/ui';
import { COMMON_WRAPPER, Runs, SUB_1 } from './ui';

/**
 * "See It. Walk It. Understand It." (`industry-centric-approach.php`, block 12).
 *
 *   section.section > (.icon-heading,
 *     .container > .common-wrapper > (.sub-heading-1,
 *       .swiper.zoom-slider-lg.mrgtp > 3 x .slider-card-d))
 *
 * `.slider-card-d.isdi` is the bare form of the zoom card: 800 x 478, radius 16,
 * clipped, holding only `img.slider-card-d-image.isdi` at 100% x 100% cover and no
 * caption at all. It moved to `components/Schools/ISDI/SliderCardD` when the Success
 * Snapshot page turned out to render the same card WITH its caption.
 *
 * `.mrgtp` is 56px of top margin on the slider.
 */
export default function Visits({ data }) {
  return (
    <IconSection block="visits" icon={data.icon.image} title={data.icon.title} tone="none">
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <div className={SUB_1}>
            <Runs value={data.lead} />
          </div>

          {/* ref .swiper.zoom-slider-lg.mrgtp — INSIDE `.common-wrapper`, so the
              track is the container's 1242/346 rather than the viewport */}
          {/* `.mrgtp` is mt56, and **mt20 from 991 down** */}
          <div className="mt-14 max-lg:mt-5">
            <ZoomSliderLg>
              {data.slides.map((slide, i) => (
                /* ref .slider-card-d.isdi — the shared card, image only */
                <SliderCardD key={`${i}-${slide.image.src}`} slide={slide} />
              ))}
            </ZoomSliderLg>
          </div>
        </div>
      </div>
    </IconSection>
  );
}
