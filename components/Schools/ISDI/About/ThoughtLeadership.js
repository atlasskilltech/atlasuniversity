import Carousel from '@/components/Carousel/Carousel';
import CardA from '../CardA';
import { CONTAINER, SECTION } from '../Home/ui';
import IconSection from './IconSection';

/**
 * Thought Leadership — port of about-us/index.php:770-988.
 *
 *   section#thought-leadership.section > (.icon-heading,
 *     .white-wrapper > .container (empty),
 *     section.section > .container > .swiper.common-swiper > 8 x .card (isdi))
 *
 * The white wrapper is authored empty, so the cards live in a second, nested
 * `.section` with its own 50px top and bottom padding. The card is `../CardA`
 * (the ISDI homepage's Research card, 295 x 500); the slider is `.common-swiper`
 * (pt56 / 40 at <=767, no autoplay, dots below 569).
 */
export default function ThoughtLeadership({ data }) {
  return (
    <IconSection
      id="thought-leadership"
      block="thought"
      icon={data.icon}
      title={data.title}
      tone="white"
      after={
        <section className={SECTION}>
          {/* ref .swiper.common-swiper */}
          <div className="pt-14 max-md:pt-10">
            <Carousel autoplay={false} bullets="isdi">
              {data.cards.map((card, i) => (
                <CardA key={`${i}-${card.title}`} card={card} />
              ))}
            </Carousel>
          </div>
        </section>
      }
    >
      <div className={CONTAINER} />
    </IconSection>
  );
}
