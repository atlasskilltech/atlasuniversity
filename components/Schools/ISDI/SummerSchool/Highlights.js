import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Highlights of Your Summer School Journey" —
 *
 *   section.section > .container > (h2.h2-tag.mrg16.isdi, .sub-heading,
 *     .coll-fest-cards-wrap > 3 x .port-card-el-wrap.isdi > (img.port-card-el-image,
 *       .port-card-el-txt-wrap.<tone> > (.port-card-el-text.isdi, .port-card-el-desc)))
 *
 * A fixed row of three, not a carousel — the cards simply stack below 768.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   row               flex, gap 24, stretched, pt56        column, pt40
 *   card              398 x 622, r16, column, clipped      w 100%, h auto
 *   image             cover, w 100% h auto
 *   caption panel     flex 1, p 22/32, its own colour      —
 *                     under a wash: `.sdi-bg-1` the FAQ
 *                     vector at 100%, `.isdi-2.isdi-bg-2`
 *                     Vector.png at 50% 100%
 *   title             32px/1.2 300 white                   24px
 *   description       18px/1.6 400 white, pt14             16px
 *
 * The panel's colour and wash travel as data because the reference selects them with
 * modifier classes (`.isdi-blue`, `.isdi-2.isdi-bg-2`, and the bare `.sdi-bg-1` over the
 * base `#193e90`) rather than by position.
 */
export default function Highlights({ data }) {
  return (
    <section data-block="highlights" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.mrg16)}>{data.heading}</h2>
        <div className={SUB}>{data.sub}</div>

        {/* ref .coll-fest-cards-wrap */}
        <div className="flex items-stretch gap-6 pt-14 max-md:flex-col max-md:pt-10">
          {data.cards.map((card) => (
            /* ref .port-card-el-wrap.isdi */
            <div
              key={card.title}
              className="relative flex h-[622px] w-[398px] flex-col items-stretch justify-start overflow-hidden rounded-2xl text-white max-md:h-auto max-md:w-full"
            >
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
                className="mx-auto block h-auto w-full max-w-full object-cover"
              />
              {/* ref .port-card-el-txt-wrap */}
              <div
                className="relative w-full flex-1 bg-no-repeat px-8 py-[22px]"
                style={{
                  backgroundColor: card.panel.background,
                  backgroundImage: `url(${card.panel.image})`,
                  backgroundPosition: card.panel.position,
                }}
              >
                {/* ref .port-card-el-text.isdi */}
                <div className="text-[32px] font-light leading-[1.2] text-white max-md:text-[24px]">
                  {withBreaks(card.title)}
                </div>
                {/* ref .port-card-el-desc */}
                {/* `text-base` in this config sets `line-height: 1.5` as well as the size,
                    which would cancel the 1.6 — so the ratio is restated at the breakpoint */}
                <div className="pt-3.5 text-[18px] leading-[1.6] text-white max-md:text-base max-md:leading-[1.6]">
                  {withBreaks(card.text)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
