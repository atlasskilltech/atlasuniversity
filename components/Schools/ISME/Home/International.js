import Carousel from '@/components/Carousel/Carousel';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { InternationalCard } from '@/components/Schools/ISDI/Home/International';
import { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * ISME "Think International. Learn International." — `section.section > .container > (.head-wrap,
 * .swiper.common-swiper-full)` in reference/schools/isme/index.php. The card is the ISDI
 * homepage's `InternationalCard` on its `isme` variant; the slider pads 56 above (20 at <=767) and
 * its bullets are Swiper's default dots 30px under it at <=568.
 */
export default function International({ data, block = 'international' }) {
  return (
    <section data-block={block} className={SECTION}>
      <div className={CONTAINER}>
        <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="base" margin="mobileGap" />
      </div>
      <Carousel autoplay={false} arrowStyle="isme" bullets="inline-overlay" className="pt-14 max-md:pt-5">
        {data.cards.map((card) => (
          <InternationalCard key={card.title} card={card} href={data.cardHref} sizes={data.sizes} variant="isme" />
        ))}
      </Carousel>
    </section>
  );
}
