import Carousel from '@/components/Carousel/Carousel';
import CardTypeF from '@/components/ui/CardTypeF';
import IconSection from '../About/IconSection';
import { CONTAINER } from '../Home/ui';
import { COMMON_WRAPPER, Runs, SUB_1 } from './ui';

/**
 * "Solve Real Problems. Build Real Solutions." (`industry-centric-approach.php`,
 * block 11).
 *
 *   section.section > (.icon-heading,
 *     .container > .common-wrapper > (.sub-heading-1, .swiper.common-swiper >
 *       7 x .card-type-f (base variant, each with a partner logo)))
 *
 * The carousel sits inside `.container`, so it does not bleed.
 */
export default function Projects({ data }) {
  return (
    <IconSection block="projects" icon={data.icon.image} title={data.icon.title} tone="none">
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <div className={SUB_1}>
            <Runs value={data.lead} />
          </div>

          {/* ref .swiper.common-swiper */}
          <Carousel autoplay={false} bleed={false} bullets="isdi" className="pt-14 max-md:pt-10">
            {data.cards.map((card, i) => (
              <CardTypeF key={`${i}-${card.image.src}`} card={card} variant="base" />
            ))}
          </Carousel>
        </div>
      </div>
    </IconSection>
  );
}
