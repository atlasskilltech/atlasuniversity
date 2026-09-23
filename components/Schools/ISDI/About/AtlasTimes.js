import Carousel from '@/components/Carousel/Carousel';
import CardA from '../CardA';
import IconSection from './IconSection';

/**
 * ATLAS Times — port of about-us/index.php:989-1304
 * (`section#atlas-times.section > (.icon-heading, .blue-wrapper > .container >
 *   .swiper.common-swiper.w-dyn-list > 12 x .card (type-a))`).
 *
 * No `.common-wrapper` here: the slider's own pt56 (40 at <=767) is the gap under
 * the band's top edge, and the blue wrapper's pb56 / pb40 closes it. The cards are
 * `../CardA` on `type-a` (#f2f2f2, no border, 295 x 498). Below 569 the dot row is
 * white — header.php's `.blue-wrapper .swiper-pagination-bullet` rule.
 *
 * The reference asks for each photo at `sizes="100vw"`, so a 1440px window pulls
 * the 1600w file for a 295 x 298 cover frame. Only the <=1080w candidates ship and
 * `sizes` states what the frame really needs — cover on a ~3:2 photo in a 298px
 * tall box is ~450 CSS px wide — which picks 500w at 1x and 1080w at 2x.
 */
export default function AtlasTimes({ data }) {
  return (
    <IconSection id="atlas-times" block="times" icon={data.icon} title={data.title}>
      {/* ref .swiper.common-swiper */}
      <div className="pt-14 max-md:pt-10">
        <Carousel autoplay={false} bullets="isdi-light">
          {data.cards.map((card) => (
            <CardA key={card.href} card={card} variant="type-a" sizes="450px" />
          ))}
        </Carousel>
      </div>
    </IconSection>
  );
}
