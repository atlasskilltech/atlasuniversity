import { Fragment } from 'react';
import Carousel from '@/components/Carousel/Carousel';
import HeadWrap from '@/components/Schools/ISME/HeadWrap';
import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * ISME "What Makes ATLAS ISME Different? Everything." — `div.section > .container >
 * (.head-wrap.top, .swiper.common-swiper-full > 9 x .core-cards)` in
 * reference/schools/isme/index.php. The heading row is the shared `HeadWrap` (`.top`, mint
 * `.button-regular`). The card is ISME's bare `.core-cards`, NOT the `.core-cards.atlas` of
 * `Advantages/CoreCardSlider` — measured on production at 1440 / 767 / 390 it differs in shape:
 *
 *   card      content-height (not 500), `max-width: 396px` with width from its content, #193e90
 *             under the cool-shape vector at 50% 0, square corners, column / justify-end,
 *             padding 46 0 14; a full slide at <=568 (header.php's `.common-swiper-full`)
 *   number    `.mint-number` 72/64 500 #07f6a0, sticky
 *   title     36/1.2 500, pt 20 pb 24; 34 600 at <=767; 28 at <=479
 *   desc      16/24 400 (600 at <=767, 14/21 at <=479), hidden until hover (max-height 0 ->
 *             300, opacity 0 -> 1, pb 20 — the page's own embedded <style>, 0.4s ease)
 *   rows      `.green-num-wrap` gap 10: a 16/16 700 mint figure beside a 16/24 white label;
 *             14px / 1.3 at <=767
 *   photo     absolute top-left, full width at its own 396:500 ratio, cover; collapses on hover
 *
 * The track centres slides of different heights (`.swiper-wrapper { align-items: center }`),
 * hence `align="center"`; the slider pads 56 above (20 at <=767) and its bullets are Swiper's
 * default dots 30px below the slider at <=568 (`inline-overlay`).
 */

function Runs({ runs }) {
  return runs.map((r, i) =>
    typeof r === 'string' ? (
      <Fragment key={i}>{withBreaks(r)}</Fragment>
    ) : (
      /* No explicit weight: the ISME reference loads Tailwind's Play CDN preflight AFTER
         Webflow's normalize, so its relative `bolder` wins there — 700 over the 400 parent,
         900 over the 600 parent at <=767 (measured on production). Our Preflight is the same. */
      <strong key={i}>
        {withBreaks(r.strong)}
      </strong>
    ),
  );
}

const REVEAL =
  'max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-[400ms] ease-[ease] ' +
  'group-hover:max-h-[300px] group-hover:opacity-100';

/*
 * The 9 Core Advantages page carries the same cards under a bare `h2.h2-tag` (mb56 / 32), inside a
 * `.common-wrapper` (pt56 / 40), on a `.mrgtp0` slider (no top padding) — `data.common`,
 * `data.sliderMods`; with no lead and no button the homepage's `HeadWrap` row is not used.
 */
export default function CoreCards({ data, block = 'different' }) {
  const bare = !data.sub && !data.button;
  const body = (
    <>
      <div className={CONTAINER}>
        {/* Success Snapshot authors the slider with no heading at all */}
        {bare ? (
          data.heading && <h2 className={cx(H2, data.headingMods?.includes('mrg16') ? 'mb-4 max-md:mb-2' : 'mb-14 max-md:mb-8')}>{withBreaks(data.heading)}</h2>
        ) : (
          <HeadWrap heading={data.heading} sub={data.sub} button={data.button} align="top" />
        )}
      </div>
      <Carousel
        autoplay={false}
        arrowStyle="isme"
        align="center"
        bullets="inline-overlay"
        className={(data.sliderMods || []).includes('mrgtp0') ? undefined : 'pt-14 max-md:pt-5'}
      >
        {data.cards.map((card) => (
          /* ref .swiper-slide — the full slider width at <=568 (header.php), while the card
             inside keeps its 396px cap */
          <div key={card.number} className="max-mcm:w-[calc(100vw-44px)]">
            {/* ref .core-cards */}
            <div
              className="group relative flex max-w-[396px] flex-col items-start justify-end overflow-hidden bg-[#193e90] bg-[position:50%_0] bg-no-repeat pb-[14px] pt-[46px]"
              /* `cardMinH` — the 9 Core Advantages sheet gives `.core-cards` a 500px floor the homepage's lacks */
              style={{ backgroundImage: `url(${data.background})`, ...(data.cardMinH ? { minHeight: data.cardMinH } : {}) }}
            >
              {/* ref .core-content */}
              <div className="sticky z-[1] flex flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
                {/* ref .mint-number */}
                <div className="sticky z-[1] text-[72px] font-medium leading-[64px] text-atlas-mint">
                  {card.number}
                </div>
                {/* ref .card-title-big */}
                <div className="pb-6 pt-5 text-[36px] font-medium leading-[1.2] text-white max-md:text-[34px] max-md:font-semibold max-sm:text-[28px]">
                  {withBreaks(card.title)}
                </div>
                {card.text && (
                  /* ref .card-desc-big */
                  <div
                    className={`${REVEAL} text-base leading-6 text-white group-hover:pb-5 max-md:font-semibold max-sm:text-[14px] max-sm:leading-[21px]`}
                  >
                    <Runs runs={card.text} />
                  </div>
                )}
                {card.rows && (
                  /* ref .card-desc-h */
                  <div className={`${REVEAL} block text-left text-base leading-6 text-white`}>
                    {card.rows.map((row, i) => (
                      /* ref .green-num-wrap */
                      <div key={i} className="flex items-center justify-start gap-2.5">
                        {row.value && (
                          /* ref .card-desc-green */
                          <div className="text-right font-bold leading-4 text-atlas-mint max-md:text-[14px] max-md:leading-[1.3]">
                            {row.value}
                          </div>
                        )}
                        {/* ref .card-desc-white */}
                        <div className="text-left leading-6 max-md:text-[14px] max-md:leading-[1.3]">
                          <Runs runs={row.label} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* ref img.image-bg-core — collapses away on hover. Only where the card authors one: the
                  Success Stories beliefs cards carry no photograph, and an <img> with no src is a broken image */}
              {card.image && (
                // eslint-disable-next-line @next/next/no-img-element -- a full-bleed card photograph
                <img
                  src={card.image}
                  alt=""
                  width={396}
                  height={500}
                  loading="lazy"
                  className="absolute left-0 top-0 z-0 h-auto w-full max-w-full object-cover transition-[max-height,opacity] duration-[400ms] ease-[ease] group-hover:max-h-0 group-hover:opacity-0"
                />
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
  return (
    <div data-block={block} className={SECTION}>
      {data.common ? <div className="pt-14 max-md:pt-10">{body}</div> : body}
    </div>
  );
}
