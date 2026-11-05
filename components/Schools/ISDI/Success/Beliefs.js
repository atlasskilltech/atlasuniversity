import Carousel from '@/components/Carousel/Carousel';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Beliefs that power our success" (`success-snapshot/index.php`, block 3).
 *
 *   div#our-beliefs.section > .container > (h2.h2-tag.isdi,
 *     .swiper.common-swiper-full.mrgtp0 > 8 x .core-cards.isdi)
 *
 * The card is the `.core-cards` shape `Advantages/CoreCardSlider` draws on
 * /advantages/atlas-advantages, in ISDI's skin and with a different anatomy — a
 * `.mint-number` over the title, and no description at all — so it is local:
 *
 *                            measured at 1440 / 768 / 390
 *   .core-cards.isdi         396 x 500 (346 at 390), column, justify-end,
 *                            items-start, #dc0b6b, r16, clipped, p 40/40/32,
 *                            `Vector.png` anchored 50% 100% at its own size
 *   .core-content            sticky, z1, column, justify-end, pl35 pr25 (pl20
 *                            at <=767)
 *   .mint-number.isdi        Poppins 52px / 64px line box, 400, white
 *   .card-title-big.isdi     Poppins 28px/1.2 400 white, pt20 pb0 — and it holds
 *                            28px at EVERY width: the `@media (max-width: 767px)`
 *                            rule that takes a plain `.card-title-big` to 34px/600
 *                            is (0,1,0) against this compound's (0,2,0)
 *   img.image-bg-core        absolute inset 0, 100% x 100%, z0
 *
 * ── The hover reveal is the page's own embedded `<style>` ──────────────────
 *     .core-cards:hover .image-bg-core { max-height: 0; opacity: 0;
 *                                        transition: max-height .4s ease,
 *                                                    opacity .4s ease }
 * so the photograph collapses on hover and leaves the pink card and its vector.
 * The same block also styles `.card-desc-big` / `.card-desc-h`, which no card on
 * this page authors — that half is inert here.
 */
export default function Beliefs({ data }) {
  return (
    <div id="our-beliefs" data-block="beliefs" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>
      </div>

      {/* ref .swiper.common-swiper-full.mrgtp0 — `.mrgtp0` zeroes the 56px top
          padding the class otherwise carries */}
      <Carousel autoplay={false} bullets="isdi-overlay">
        {data.cards.map((card, i) => (
          /* ref .swiper-slide — `.common-swiper-full .swiper-slide` is `width: 100%`
             of the slider from 568 down (header.php's own `max-mcm` block), and the
             CARD inside it keeps its 391 max-width. Hugging the card instead left the
             next slide 44px too far left and showed a sliver of it at 479. */
          <div key={`${i}-${card.num}`} className="max-mcm:w-[calc(100vw-44px)]">
          {/* ref .core-cards.isdi */}
          <div
            className="group relative flex h-[500px] max-h-[500px] min-h-[500px] w-[396px] max-w-[396px] flex-col
                       items-start justify-end overflow-hidden rounded-2xl bg-[#dc0b6b] bg-[length:auto]
                       bg-[position:50%_100%] bg-no-repeat px-10 pb-8 pt-10 max-sm:max-w-[391px]
                       max-mcm:w-full"
            style={{ backgroundImage: `url(${data.vector})` }}
          >
            {/* ref .core-content */}
            <div className="sticky z-[1] flex h-auto flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
              {/* ref .mint-number.isdi */}
              <div className="text-[52px] font-normal leading-[64px] text-white">
                {card.num}
              </div>
              {/* ref .card-title-big.isdi */}
              <div className="pt-5 text-[28px] font-normal leading-[1.2] text-white">
                {withBreaks(card.title)}
              </div>
            </div>

            {/* ref img.image-bg-core — collapses on hover, which is what the
                page's own `<style>` block does */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image.src}
              alt={card.image.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 z-0 h-full max-h-[500px] w-full overflow-hidden align-baseline
                         opacity-100 transition-[max-height,opacity] duration-[400ms] ease-[ease]
                         group-hover:max-h-0 group-hover:opacity-0"
            />
          </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
