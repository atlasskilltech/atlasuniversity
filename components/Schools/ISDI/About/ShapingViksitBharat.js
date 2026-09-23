import { cx } from '@/lib/cx';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Shaping a Viksit Bharat, Together" — port of about-us/index.php:77-160
 * (`section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *   .shaping-wrapper > 4 x .card-content-b)`).
 *
 * The same `.card-content-b` as `components/ui/ContentCardB`, but on four ISDI
 * Webflow variants that change the corners, direction and heading weight — and
 * `ContentCardB` takes content, not skins — so the card lives here.
 *
 *   variant        card                         text half           image
 *   pink-top       r 16 16 0 0, clipped         h3 400
 *   switch-isdi    row-reverse                  h3 400
 *   default        —                            h3 500
 *   bottom-switch  r16 (not clipped),           r 0 0 16 0, clipped  r 0 0 0 16
 *                  row-reverse                  h3 400
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                            <=767px       <=479px
 *   .shaping-wrapper  pt56                               pt40          pt20
 *   card              min-h 480, stretch                 wrap-reverse (text under
 *                                                        the photo, row not reversed)
 *   text half         50%, column centred, px96, its     100%, p 22/32
 *                     `card-cnt-bgcolor`
 *   h3                32px/1.2 white, mb24               20px          18px
 *   text              18px/1.5 white                     16px          14px
 *   image             cover, fills its half              full width at its own ratio
 *
 * Each card's inline script also paints `url(null)` over the text half (its
 * `data-card-cint-b-bg` is never set), which hides the variants' `moon.png`; only
 * the colour shows, so no artwork is shipped. The pink-top card's Webflow
 * placeholder background sits under both halves and never shows.
 */
const CARD = {
  'pink-top': 'overflow-hidden rounded-t-2xl',
  'switch-isdi': 'flex-row-reverse max-md:flex-row',
  default: '',
  'bottom-switch': 'rounded-2xl flex-row-reverse max-md:flex-row',
};

export default function ShapingViksitBharat({ data }) {
  return (
    <section data-block="shaping" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.sub}</div>

        {/* ref .shaping-wrapper */}
        <div className="pt-14 max-md:pt-10 max-sm:pt-5">
          {data.cards.map((card) => (
            /* ref .card-content-b */
            <div
              key={card.title}
              className={cx(
                'flex min-h-[480px] items-stretch justify-start max-md:flex-wrap-reverse',
                CARD[card.variant]
              )}
            >
              {/* ref .cd-cont-b-wrap */}
              <div
                className={cx(
                  'relative flex w-1/2 flex-none flex-col items-start justify-center px-24 max-md:w-full max-md:px-8 max-md:py-[22px]',
                  card.variant === 'bottom-switch' && 'overflow-hidden rounded-br-2xl'
                )}
                style={{ backgroundColor: card.background }}
              >
                <h3
                  className={cx(
                    'mb-6 mt-0 text-[32px] leading-[1.2] text-white max-md:text-[20px] max-md:leading-[1.2] max-sm:text-[18px] max-sm:leading-[1.2]',
                    card.variant === 'default' ? 'font-medium' : 'font-normal'
                  )}
                >
                  {card.title}
                </h3>
                <div className="text-[18px] leading-[1.5] text-white max-md:text-base max-sm:text-[14px] max-sm:leading-[1.5]">
                  {card.text}
                </div>
              </div>

              {/* ref .cd-cont-b-imgwrap */}
              <div className="w-1/2 max-md:w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes={card.image.sizes}
                  width={card.image.width}
                  height={card.image.height}
                  alt={card.image.alt}
                  loading="lazy"
                  decoding="async"
                  className={cx(
                    'inline-block h-full w-full max-w-full object-cover align-middle',
                    card.variant === 'bottom-switch' && 'rounded-bl-2xl'
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
