import Carousel from '@/components/Carousel/Carousel';
import PatentCard from '@/components/ui/PatentCard';
import { cx } from '@/lib/cx';
import CardA from '../CardA';
import IconSection from '../About/IconSection';
import StatsBand from '../StatsBand';
import {
  BLUE_DESC_TEXT, BLUE_DESC_WRAP, BLUE_WRAPPER, COMMON_WRAPPER, CONTAINER, H2, H2_MB, SUB,
} from './ui';

/**
 * "Impact Driven Research & Innovation" (`success-snapshot/index.php`, block 13).
 *
 *   section#research-driven.section > (
 *     .icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap > .blue-desc-text,
 *                                               .swiper.common-swiper > 5 x .patent-card.isdi),
 *     .top-cards-wrapper > 2 x .head-top-card,
 *     .container > .common-wrapper > (.head-wrap.mrgbtm > .tt-wrap > (h2, .sub-heading),
 *                                     .swiper.common-swiper.mrgtp0 > 8 x .card))
 *
 * **The blue wrapper closes after the patents.** The two figures and the whole
 * publications carousel are its SIBLINGS, not its children — which is why the
 * publications heading is `#1a1a1a` on white and not the band's white on #173a87.
 * Rendering them inside it recolours both and is 1,100px of band that does not
 * belong there; the same "check every sibling" lesson section 8 of the ATLAS
 * homepage records. Hence `tone="none"` and the wrapper applied by hand.
 *
 * The patents are `ui/PatentCard` on its `isdi` variant (#00277d, r16, the base
 * class's `vector-patent.png` wash at `soft-light`), the figures the shared
 * `../StatsBand` — a bare `.top-cards-wrapper`, so it keeps its 60px of bottom
 * padding and carries no `data-block` — and the papers the shared `../CardA`.
 */
export default function Research({ data }) {
  return (
    <IconSection
      id="research-driven"
      block="research"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
    >
      {/* ref .blue-wrapper.isdi-blue-5 — the patents alone */}
      <div className={BLUE_WRAPPER}>
        <div className={CONTAINER}>
          <div className={BLUE_DESC_WRAP}>
            <div className={BLUE_DESC_TEXT}>{data.lead}</div>
          </div>
        </div>

        <Carousel autoplay={false} bullets="isdi-light" className="pt-14 max-md:pt-10">
          {data.patents.map((card, i) => (
            <PatentCard key={`${i}-${card.title}`} card={card} variant="isdi" wash={data.wash} />
          ))}
        </Carousel>
      </div>

      {/* ref .top-cards-wrapper — the bare class, so `padding-bottom: 60px` */}
      <StatsBand data={data.stats} label="isme-2" padBottom block={null} />

      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          {/* ref .head-wrap.mrgbtm > .tt-wrap */}
          <div className="mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start">
            <div className="flex-initial max-md:mb-5 max-sm:mr-5">
              <h2 className={cx(H2, H2_MB.mrg16)}>{data.pub.heading}</h2>
              <div className={SUB}>{data.pub.lead}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper.mrgtp0 — inside `.common-wrapper` upstream, and
          its track still starts at the container inset; `.mrgtp0` zeroes the 56px */}
      <Carousel autoplay={false} bullets="isdi">
        {data.pub.cards.map((card, i) => (
          <CardA key={`${i}-${card.title}`} card={card} />
        ))}
      </Carousel>
    </IconSection>
  );
}
