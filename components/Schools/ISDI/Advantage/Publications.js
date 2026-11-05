import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';
import CardA from '../CardA';
import { HEAD_WRAP, TT_WRAP } from './ui';

/**
 * "Publications & Research Papers" — the last content block, and the only one on
 * the page with neither an id nor an `.icon-heading`
 * (`atlas-isdi-advantage/the-isdi-advantage/index.php:1468-1681`).
 *
 *   div.section > (.container > .head-wrap > .tt-wrap >
 *                    (h2.h2-tag.mrg16.isdi, .sub-heading),
 *                  .swiper.common-swiper > 8 x .card (card-a, `isdi` variant))
 *
 * The card is `../CardA` unchanged — the same `.card` the ISDI homepage's
 * "Research & Reflections" and the About page's "Thought Leadership" render, on the
 * `isdi` variant (white, 1px #d9d9d9). Each one links out to the published paper.
 *
 * Every card also carries a `.card-embed-code` script that reads its own
 * `bg-color` attribute and writes it to `style.backgroundColor`. All eight author
 * `bg-color=""`, so the script sets the empty string and nothing changes — dead,
 * and not reproduced.
 */
export default function Publications({ data }) {
  return (
    /* ref div.section */
    <div data-block="publications" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap > .tt-wrap */}
        <div className={HEAD_WRAP}>
          <div className={TT_WRAP}>
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
            <div className={SUB}>{withBreaks(data.sub)}</div>
          </div>
        </div>
      </div>

      {/* ref .swiper.common-swiper */}
      <Carousel autoplay={false} bullets="isdi" className="pt-14 max-md:pt-10">
        {data.cards.map((card, i) => (
          <CardA
            key={`${i}-${card.title}`}
            variant="isdi"
            cta={card.link.label}
            card={{
              title: card.title,
              date: card.date,
              href: card.link.href,
              image: card.image,
            }}
          />
        ))}
      </Carousel>
    </div>
  );
}
