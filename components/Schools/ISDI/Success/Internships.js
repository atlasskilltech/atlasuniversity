import Carousel from '@/components/Carousel/Carousel';
import { cx } from '@/lib/cx';
import TransferCard from '../TransferCard';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Industry Internships" (`success-snapshot/index.php`, block 6).
 *
 *   div.section > .w-layout-blockcontainer.container > (h2.h2-tag.mrgtbm0.isdi,
 *     .swiper.common-swiper > 7 x .transfer-card.isdi)
 *
 * `.h2-tag.mrgtbm0` is `margin-bottom: 0` — the carousel's own 56px of top padding
 * is the whole gap. The card is the shared `../TransferCard`; six of the seven
 * author `img.big-logo` (`width: 100%; max-width: 60%`) and the seventh an `<img>`
 * with no class at all, so the logo kind travels per card.
 */
export default function Internships({ data }) {
  return (
    <div data-block="internships" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrgtbm0)}>{data.heading}</h2>
      </div>

      <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
        {data.cards.map((person, i) => (
          <TransferCard key={`${i}-${person.name}`} person={person} logoKind={person.logoKind} />
        ))}
      </Carousel>
    </div>
  );
}
