import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB } from '../Home/ui';

/**
 * "Why Accessory Design & Craft at ISDI x Parsons" —
 * b-des/accessory-design-&-craft.php:2354-2630, a `div.common-wrapper` holding the
 * heading and then the Webflow stack scaffold:
 *
 *   .page-wrapper-stack > main.main-wrapper-stack > .section_stack > .container
 *     > .container-large > .stack_component > 5 x .stack_card.<pos>.isdi-programs
 *
 * Pure CSS, as on the ISDI homepage's Outcomes stack (`Home/Outcomes`): every card
 * is `position: sticky` with its own `top` and a large bottom margin on top of the
 * component's 14rem row gap, so they pile up as the page scrolls. This page's cards
 * are the short `isdi-programs` ones (330px, a photograph beside a coloured panel)
 * rather than that section's 540px figure cards, and there are five.
 *
 * ── Measured at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────────────────────
 *   wrapper            50px of top padding only (not the ISDI 50/50 section)
 *   .stack_component   column, space-between, 14rem gap — 0 at <=479, and
 *                      top-aligned at <=767
 *   card               h330, r24, clipped, `0 -12px 16px -4px #0000000d`, mr5;
 *                      a 600px column from 991 down, and content-height at <=479
 *     sticky           top 3 / 10 / 17 / 24 / 13rem, margin-bottom
 *                      18.8 / 6 / 17 / 10 / 3rem  (the fifth really does sit
 *                      above the fourth — authored, and reproduced)
 *   .outcome-img       max-width 759, cover; max-height 300 at <=767 with
 *                      `object-position: 63% 50%`, 200 at <=479 (card 1: 225,
 *                      top-anchored)
 *   .outcome-content   max-width 478 (100% from 991 down on `.pro-bg-4`, and from
 *                      767 down on every one), a space-between column, p40 -> 20
 *                      at <=479, gap 40 (21 on `.pro-bg-4`)
 *     colour + wash    pro-bg-1 #1a53ef · pro-bg-2 #0038b1 · pro-bg-3 #ec1376 ·
 *                      pro-bg-4 #1a53ef, each with a stylesheet-painted vector
 *                      anchored bottom-right — both travel as data
 *   .outcome-title     pb10
 *   .outcome-header    24px/1.1 500 white, mb8 (Poppins, via `.isdi`)
 *   .why-content-…     max-width 324, mt24 (14 at <=479), 16px/2 -> 14px/1.86
 *
 * The SECTION heading is run through `withBreaks` too — the Product Design page authors a
 * `<br>` after "Creative", which is four lines on the reference at 479 and three without it.
 * The headers are run through `withBreaks`: the Animation page breaks all five of its
 * titles and the Accessory page breaks none, the same trap `Advantages/Electives` and
 * `ProgramCards` already record.
 *
 * The second card's header is wrapped in `<strong>`; the parent is already 500, so
 * Preflight's relative `bolder` would render it 700 where the reference paints
 * Webflow's flat `bold` — hence the explicit `font-bold`.
 *
 * Deviation: the descriptions are Manrope, and production declares Manrope without
 * loading it, so there it falls back to the system sans-serif. This port uses the
 * self-hosted face, as every other Manrope run on /schools/isdi does, which costs one
 * wrapped line on the first card at 479px.
 */

/* ref .stack_card.{first,second,third,forth,fifth}.isdi-programs */
const CARD_BASE =
  'sticky mr-[5px] flex overflow-hidden rounded-3xl shadow-[0_-12px_16px_-4px_#0000000d] '
  + 'max-lg:flex-col';
/* the normal ladder: 330 above 991, 600 below it, content-height below 480 */
const CARD = `${CARD_BASE} h-[330px] max-lg:h-[600px] max-sm:h-auto`;
const CARD_POSITION = {
  first: 'top-12 mb-[18.8rem]',
  second: 'top-40 mb-24',
  third: 'top-[17rem] mb-[17rem]',
  forth: 'top-96 mb-40',
  fifth: 'top-52 mb-12',
};

/*
 * ref .outcome-content.<variant> — the panel beside the photograph. Two palettes run
 * across the B.Des pages and they differ in more than colour:
 *
 *              colour     wash   gap            padding            max-width
 *   pro        data       data   40             40 -> 20 at <=479  478 -> 100% at <=767
 *   pro-4      #1a53ef    data   21             40 -> 20           478 -> 100% at <=991
 *   isdi-1     #d20158    none   21             40 -> 26/25 <=767  478 -> 100% at <=991
 *   isdi-2     #0038b1    none   40             40 -> 26/20        478 -> 100% at <=991
 *   isdi-3     #ec1376    none   30 (40 >=1440) 40 -> 26/20        478 -> 100% at <=991
 *
 * `.isdi-1` also zeroes its own right corners, which the card's `overflow: hidden` and
 * 24px radius already clip — no class for it.
 */
const PANEL = {
  pro: 'max-w-[478px] gap-10 p-10 max-md:max-w-full max-sm:p-5',
  'pro-4': 'max-w-[478px] gap-[21px] p-10 max-lg:max-w-full max-sm:p-5',
  'isdi-1': 'max-w-[478px] gap-[21px] p-10 max-lg:max-w-full max-md:px-[25px] max-md:py-[26px]',
  'isdi-2': 'max-w-[478px] gap-10 p-10 max-lg:max-w-full max-md:px-5 max-md:py-[26px]',
  'isdi-3': 'max-w-[478px] gap-[30px] p-10 2xl:gap-10 max-lg:max-w-full max-md:px-5 max-md:py-[26px]',
};

/* ref .outcome-img (+ .set-img-oc on card 1) */
const IMAGE =
  'block h-full w-full max-w-[759px] object-cover '
  + 'max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] max-sm:max-h-[200px]';
const IMAGE_FIRST = 'max-sm:max-h-[225px] max-sm:object-[50%_0%]';

export default function WhyStack({ data }) {
  /*
   * The Webflow stack scaffold: `.page-wrapper-stack > main > .section_stack > .container >
   * .container-large > .stack_component`. Some pages author it as a **sibling** of the
   * heading's `.container` and some **inside** it — and that is not cosmetic: nested, the
   * cards take the container inset twice (297px rather than 341 at 390).
   */
  const stack = (
    <div>
      <div>
        <div className={CONTAINER}>
          <div className="max-w-[1280px] max-md:max-w-none">
            {/* ref .stack_component — it declares Manrope, so the descriptions are
                Manrope while the `.isdi` headers stay Poppins */}
            <div className="flex flex-col justify-between gap-y-[14rem] font-sans max-md:justify-start max-sm:gap-y-0">
              {data.cards.map((card) => (
                /* `card.height` is set only where the reference PINS a card's height — the
                   B.Tech sheet declares `.stack_card.first.isdi-programs { height: 400px }` a
                   second time, after its own `max-width: 991px` rule, and equal specificity plus
                   later source order means that 400 wins at every width. So the height goes
                   inline (beating the ladder) exactly as the reference's own rule does, and the
                   ladder classes are left off rather than fighting it — two heights in one class
                   list would be resolved by stylesheet order, not authoring order. */
                <div
                  key={card.title}
                  style={card.height ? { height: card.height } : undefined}
                  className={cx(
                    card.height ? CARD_BASE : CARD,
                    CARD_POSITION[card.position] ?? CARD_POSITION.first
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image.src}
                    width={card.image.width}
                    height={card.image.height}
                    alt={card.image.alt}
                    loading="lazy"
                    decoding="async"
                    className={cx(IMAGE, card.position === 'first' && IMAGE_FIRST)}
                  />

                  {/* ref .outcome-content.<variant> */}
                  <div
                    className={cx(
                      'flex w-full flex-col items-stretch justify-between bg-[position:100%_100%] bg-no-repeat',
                      PANEL[card.panel.variant] ?? PANEL.pro
                    )}
                    style={{
                      backgroundColor: card.panel.background,
                      /* the `isdi-*` palette is flat — it paints no vector at all */
                      ...(card.panel.image ? { backgroundImage: `url(${card.panel.image})` } : null),
                    }}
                  >
                    {/* ref .outcome-title */}
                    <div className="pb-2.5">
                      {/* ref .outcome-header.isdi */}
                      <div className="mb-2 font-poppins-isdi text-[24px] font-medium leading-[1.1] text-white">
                        {card.titleStrong ? (
                          <strong className="font-bold">{withBreaks(card.title)}</strong>
                        ) : (
                          withBreaks(card.title)
                        )}
                      </div>
                      {/* ref .why-content-wrapper > .why-content-desc */}
                      <div className="mt-6 max-w-[324px] text-white max-sm:mt-3.5">
                        <div className="text-base leading-[32px] max-sm:text-[14px] max-sm:leading-[26px]">
                          {card.body.map((paragraph, i) => (
                            <span key={i}>{paragraph}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    /* ref div.common-wrapper */
    <div data-block="why" className="pt-[50px]">
      {data.nested ? (
        <div className={CONTAINER}>
          <div className={cx(H2, H2_MB.base)}>{withBreaks(data.heading)}</div>
          {stack}
        </div>
      ) : (
        <>
          <div className={CONTAINER}>
            <div className={cx(H2, H2_MB.base)}>{withBreaks(data.heading)}</div>
          </div>
          {stack}
        </>
      )}
    </div>
  );
}
