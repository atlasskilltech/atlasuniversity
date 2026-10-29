import Carousel from '@/components/Carousel/Carousel';
import IconSection from '../About/IconSection';
import PlacementCard from './PlacementCard';
import { BLUE_DESC_TEXT, CONTAINER, SUB_MRG_TP_34 } from './ui';

/**
 * "Placements & Internships" (`success-snapshot/index.php`, block 5).
 *
 *   section#placement.section > (.icon-heading,
 *     .container > (div > .sub-heading.mrg-tp-34 > .blue-desc-text,
 *                   .swiper.common-swiper > 6 x .placement-card.isdi))
 *
 * There is no `.blue-wrapper` on this one — the lead sits on white — so the section
 * takes `tone="none"`. The lead is a `.blue-desc-text` nested inside a
 * `.sub-heading.mrg-tp-34`: the inner class sets the 24px size and `flex: 1`, the
 * outer the 34px of top padding that survives every breakpoint.
 */
export default function Placement({ data }) {
  return (
    <IconSection
      id="placement"
      block="placement"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref div > .sub-heading.mrg-tp-34 > .blue-desc-text */}
        <div>
          <div className={SUB_MRG_TP_34}>
            <div className={BLUE_DESC_TEXT}>{data.lead}</div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper — a sibling of `.container` so the track bleeds */}
      <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
        {data.cards.map((card, i) => (
          <PlacementCard key={`${i}-${card.name}`} card={card} />
        ))}
      </Carousel>
    </IconSection>
  );
}
