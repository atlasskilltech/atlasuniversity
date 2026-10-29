import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import SpeakerSlideCard from '@/components/ui/SpeakerSlideCard';
import IconSection from '../About/IconSection';
import { CONTAINER } from '../Home/ui';
import { COMMON_WRAPPER, Runs, SUB_1_MRGBTM } from './ui';

/**
 * "Learn From the Leaders Who Run the Show" (`industry-centric-approach.php`,
 * block 10).
 *
 *   section.section > (.icon-heading,
 *                      .container > .common-wrapper >
 *                        (.sub-heading-1.mrgbtm, .swiper.zoom-slider-lg > 3 slides))
 *
 * The card is `.slider-card-e.isdi`, which is `ui/SpeakerSlideCard`'s
 * `.slider-card-e-ugdx` in every measured value except the radius — 16px here
 * against the ATLAS pages' `32px 0` — so the component takes a `radius` variant.
 * Its `.slide-cd-e-flex` / `.slide-cd-e-lt` wrappers hold one child each and are
 * inert.
 */
export default function Masterclasses({ data }) {
  return (
    <IconSection
      block="masterclasses"
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

          {/* ref .swiper.zoom-slider-lg — INSIDE `.common-wrapper` */}
          <ZoomSliderLg>
            {data.slides.map((slide, i) => (
              <SpeakerSlideCard key={`${i}-${slide.title}`} slide={slide} radius="isdi" />
            ))}
          </ZoomSliderLg>
        </div>
      </div>
    </IconSection>
  );
}
