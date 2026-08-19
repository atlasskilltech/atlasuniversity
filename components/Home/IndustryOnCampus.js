import { industryOnCampus } from '@/lib/homeContent';
import Carousel from '@/components/Carousel/Carousel';
import PortCardM from '@/components/ui/PortCardM';
import SectionHead, { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "Industry on Campus" — port of reference/index.php:2641-2835
 * (`section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`).
 *
 * Ten cards on `components/ui/PortCardM` — `.port-card-m-wrap-atlas` in its
 * base form, **without** the `…v2` modifier index.php's inline <style> adds
 * to the programme carousels. That single difference changes a lot:
 *
 *                        programmes (…v2)        here (base class)
 *   card height          367px                  520px
 *   image                object-contain,         object-cover, height 100%
 *                        height auto (295x295)   (fills the whole card)
 *   bar accent           school colour           default #41418e
 *
 * So the photo fills the card and the indigo bar sits over its lower edge,
 * rather than the bar sitting below a square image. These are the only
 * instances that carry a company logo, which the shared card renders only
 * when one is given.
 */
export default function IndustryOnCampus() {
  const { heading, subheading, items } = industryOnCampus;

  return (
    /* ref section.section */
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHead heading={heading} subheading={subheading} />
      </div>

      <Carousel>
        {items.map((item) => (
          <PortCardM key={`${item.name}-${item.position}`} item={item} />
        ))}
      </Carousel>
    </section>
  );
}
