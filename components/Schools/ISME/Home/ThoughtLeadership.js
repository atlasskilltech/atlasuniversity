import Carousel from '@/components/Carousel/Carousel';
import CardA from '@/components/Schools/ISDI/CardA';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "Thought Leadership" — `section.section > .container > (.head-wrap, .swiper.common-swiper)`
 * in reference/schools/isme/index.php. The card is the ISDI `CardA` on its `isme` variant; the
 * slider pads 56 above (40 at <=767) and shows Swiper's default dots in flow at <=568.
 */
export default function ThoughtLeadership({ data, block = 'thought-leadership' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="base" />
      </div>
      <Carousel autoplay={false} arrowStyle="isme" bullets="inline" className="pt-14 max-md:pt-10">
        {data.cards.map((card) => (
          <CardA key={card.href} card={card} cta={data.cta} variant="isme" sizes={data.sizes} />
        ))}
      </Carousel>
    </section>
  );
}
