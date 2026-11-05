import Carousel from '@/components/Carousel/Carousel';
import IconSection from '../About/IconSection';
import TransferCard from '../TransferCard';
import { BLUE_DESC_TEXT, BLUE_DESC_WRAP, CONTAINER } from './ui';

/**
 * "Master's Progressions" (`success-snapshot/index.php`, block 8).
 *
 *   section#master-progressions.section > (.icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap > .blue-desc-text,
 *       .swiper.common-swiper > 5 x .transfer-card.isdi))
 *
 * **These five author `img.transf-un-logo`, and this page's sheets never declare
 * that class** — /atlas-isdi-advantage/internationalisation's do, at 140x36. So the
 * same markup paints at the logo's intrinsic size here (58x56 on the first), which
 * is why the cards take `logoKind="bare"` rather than the component's default.
 */
export default function Masters({ data }) {
  return (
    <IconSection
      id="master-progressions"
      block="masters"
      icon={data.icon.image}
      title={data.icon.title}
    >
      <div className={CONTAINER}>
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC_TEXT}>{data.lead}</div>
        </div>
      </div>

      <Carousel autoplay={false} bullets="isdi-light" className="pt-14 max-md:pt-10">
        {data.cards.map((person, i) => (
          <TransferCard key={`${i}-${person.name}`} person={person} logoKind={person.logoKind} />
        ))}
      </Carousel>
    </IconSection>
  );
}
