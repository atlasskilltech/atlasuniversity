import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import Carousel from '@/components/Carousel/Carousel';
import QuoteCard from './QuoteCard';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Why the industry can’t get enough of our students" — port of
 * reference/schools/isdi/index.php:3128-3232.
 *
 *   di2v.section > .testimonial-wrap > .container > h2.h2-tag.isdi
 *     > .swiper.common-swiper-full.mrgtp0 > 4 x .testimonial-card.bgc1.isdi
 *
 * The wrapper really is authored `<di2v class="section">`; an unknown element is
 * inline by default, but `.section` makes it a block, so it lays out like every
 * other section.
 *
 * The card is `QuoteCard` with a photo: `img.student-image`, 50% x 100% cover
 * beside the quote, 100% x 320 above it below 768.
 */
export default function IndustryVoices({ data }) {
  return (
    <div data-block="industry" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{withBreaks(data.heading)}</h2>
      </div>
      {/* ref .swiper.common-swiper-full.mrgtp0 */}
      <Carousel autoplay={false} bullets="isdi-overlay">
        {data.cards.map((card) => (
          <QuoteCard key={card.name} card={card} quoteIcon={data.quoteIcon} bgImage={data.bgImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              width={324}
              height={400}
              alt={card.image.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-1/2 max-w-full object-cover align-middle max-md:h-[320px] max-md:w-full max-md:max-w-none"
            />
          </QuoteCard>
        ))}
      </Carousel>
    </div>
  );
}
