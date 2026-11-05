import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, SECTION, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Why Choose BBA / BBA (Hons.) at ATLAS ISME?" — `section.section > .container > h2.h2-tag` +
 * `.container > N x .card-ways` (Webflow's `content-card-a` component on its `mint` and
 * `mint-switch` variants, which alternate).
 *
 * Rules, from the page's sheet:
 *   .card-ways            flex, stretch, min-height 480; `mint-switch` is row-reverse;
 *                         every card `flex-wrap: wrap-reverse` from 991 down, which stacks the
 *                         photograph ABOVE the copy (the second child wraps onto the line that
 *                         wrap-reverse puts first)
 *   .cw-cont-wrap         50% (100% at <=991), #193e90 under the card's own wash
 *                         (`data-cardw-bg`, applied by a script) at 0 100% repeat-x;
 *                         pt64 px96 pb0 -> p48/48/32 (<=767)
 *     h3.h3-cw            32px/1.2 500 mint, mb24 -> 24px (<=767)
 *     .cw-text            18px white -> 16 (<=767)
 *     .num-box            56 x 56 mint, #193e90 24px/1 400, pinned top-left -> 40 x 40,
 *                         14px 500 (<=767)
 *   .cw-image-wrap        50% (100% at <=991); img cover 100% x 100% — at <=991 the image is
 *                         simply its own height, which is what makes the stacked card taller
 *                         than its 480 minimum
 */
export default function WhyCards({ data }) {
  return (
    <section data-block="why" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, 'mb-14 max-md:mb-8')}>{withBreaks(data.heading)}</h2>
        {data.sub && (
          /* ref .sub-heading.mrgbtm32 — the ACCA page's "Graduate Destinations": pb32 400, pb20 at
             <=767, pb16 at <=479, under the plain h2's own 56px */
          <div className={cx(SUB_INNER, 'pb-8 font-normal max-md:pb-5 max-sm:pb-4')}>{withBreaks(data.sub)}</div>
        )}
      </div>
      <div className={CONTAINER}>
        {data.cards.map((card, i) => (
          /* ref .card-ways */
          <div
            key={`${i}-${card.num}`}
            className={cx(
              'flex min-h-[480px] items-stretch justify-start max-lg:flex-row max-lg:flex-wrap-reverse',
              card.variant === 'mint-switch' ? 'flex-row-reverse' : 'flex-row'
            )}
          >
            {/* ref .cw-cont-wrap — its wash is the card's own `data-cardw-bg` */}
            <div
              className="relative w-1/2 flex-[0_1_auto] bg-[#193e90] bg-[position:0px_100%] bg-repeat-x px-24 pb-0 pt-16 max-lg:w-full max-md:px-12 max-md:pb-8 max-md:pt-12"
              style={card.bg ? { backgroundImage: `url(${card.bg})` } : undefined}
            >
              <h3 className="mb-6 mt-0 text-[32px] font-medium leading-[1.2] text-atlas-mint max-md:text-[24px]">
                {withBreaks(card.title)}
              </h3>
              {/* ref .cw-text — one per card on most pages, a bulleted run of them on the ACCA page */}
              {(card.texts ?? [card.text]).map((t, i) => (
                <div key={i} className="text-[18px] leading-[1.5] text-white max-md:text-[16px]">
                  {withBreaks(t)}
                </div>
              ))}
              {/* ref .num-box */}
              <div className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center bg-atlas-mint text-[24px] font-normal leading-none text-[#193e90] max-md:h-10 max-md:w-10 max-md:text-[14px] max-md:font-medium">
                {card.num}
              </div>
            </div>
            {/* ref .cw-image-wrap */}
            <div className="block w-1/2 flex-[0_1_auto] max-lg:w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image.src}
                srcSet={card.image.srcSet}
                sizes={card.image.sizes}
                alt={card.image.alt}
                loading="lazy"
                decoding="async"
                className="block h-full w-full max-w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
