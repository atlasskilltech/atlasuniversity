import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import SmartLink from '@/components/SmartLink';
import Carousel from '@/components/Carousel/Carousel';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from './ui';

/**
 * "Think International. Opportunities Across Continents" — port of
 * reference/schools/isdi/index.php:3671-3733.
 *
 *   section.section > .container > .head-wrap (title block + "Explore More")
 *                                > .swiper.common-swiper-full > 5 x .square-card.isdi
 *
 * The ATLAS homepage has the same section on `.square-card.atlas` (`32px 0`
 * corners, title only), so `components/Home/ThinkInternational` is not reused:
 * the ISDI card has 16px corners and a pink circular arrow link beside the title.
 *
 * Measured:
 *                     >=768px                         568-767      <=568
 *   slider            pt56 (no `.mrgtp0`)             pt20         pt20
 *   card              612 wide, r16, clipped;         the photo's  the slider
 *                     photo at its own 611 x 486      611 x 486    width, photo
 *                                                                  scaled to fit
 *   overlay           bottom half, #fff0 -> #00000080, px32 pb40, title and
 *                     button on one row, bottom-aligned, space-between
 *   title             40px/1.2 white                  24px/1.2
 *   arrow button      48 round, #ec1376, 27px glyph   32 round
 *
 * The reference wraps each arrow link in an empty `<a>` to the same page; nested
 * anchors are split by the parser, leaving that outer one an empty inline box, so
 * only the button is rendered. Its `id="prevBtn"` is repeated on all five cards
 * and is not carried.
 */
function InternationalCard({ card, href, sizes }) {
  return (
    /* ref .square-card.isdi */
    <div className="relative w-[612px] overflow-hidden rounded-2xl max-md:w-auto max-mcm:w-[calc(100vw-44px)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes={sizes}
        width={card.image.width}
        height={card.image.height}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className="inline-block h-auto max-w-full align-middle"
      />
      {/* ref .sq-content */}
      <div className="absolute inset-x-0 bottom-0 flex h-1/2 w-full items-end justify-between bg-[linear-gradient(#fff0,#00000080)] px-8 pb-10">
        <div className="text-[40px] leading-[1.2] text-white max-md:text-[24px] max-md:leading-[1.2]">
          {withBreaks(card.title)}
        </div>
        {/* ref a.circular-button-prev (pink) */}
        <SmartLink
          href={href}
          aria-label={`${card.title.replace('\n', '')} — explore internationalisation`}
          className="flex h-12 w-12 max-w-full items-center justify-center rounded-3xl bg-[#ec1376] max-md:h-8 max-md:w-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/icons/arrow-downward.svg" width={27} height={27} alt="" loading="lazy" className="max-w-full align-middle" />
        </SmartLink>
      </div>
    </div>
  );
}

export default function International({ data }) {
  return (
    <section data-block="international" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
            <div className={SUB}>{data.sub}</div>
          </div>
          <ButtonRegular href={data.button.href} variant="pink-cta">
            {data.button.label}
          </ButtonRegular>
        </div>
      </div>

      {/* ref .swiper.common-swiper-full */}
      <div className="pt-14 max-md:pt-5">
        <Carousel autoplay={false} bullets="isdi-overlay">
          {data.cards.map((card) => (
            <InternationalCard key={card.title} card={card} href={data.cardHref} sizes={data.sizes} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
