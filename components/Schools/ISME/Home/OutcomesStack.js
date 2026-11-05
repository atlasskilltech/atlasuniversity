import { cx } from '@/lib/cx';
import MarqueeTrack from '@/components/Schools/ISDI/Home/MarqueeTrack';
import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * ISME "Outcomes" sticky stack — port of reference/schools/isme/index.php
 * `div.page-wrapper-stack > main > .section_stack > .container > .container-large >
 * .stack_component > 3 x .stack_card-isme`. The ATLAS (`components/Impact/AtlasImpact`) and
 * ISDI (`Home/Outcomes`) stacks are the same mechanism with different cards; this is ISME's own
 * card shape (`-isme` / `-2` classes), measured on production at 1440 / 991 / 767 / 390:
 *
 *   card        sticky, top 7 / 10 / 13rem, mb 9 / 6 / 3rem, 622px, row, clipped;
 *               a column and content-height at <=767
 *   image       w 100% / max 759 / h 100%, cover; h auto max 300 at <=767 (63% 50%),
 *               max 200 at <=479 (card 1: 225, top-anchored)
 *   panel       397 wide (the image takes the rest), pad 40, gap 52, #18429f / #0b2b73 /
 *               #03144b over the same `Vector.png` wash; card 1 centres its content, cards 2-3
 *               `space-around`; pad 20 + gap 20 + full width at <=767
 *   title       Manrope 40/56 700 white, 32 at <=767
 *   block       column, gap 16, 24/36 white; pb 25 at <=767, 20 at <=479
 *   number      32/32 700 #07f6a0 (24 at <=767)   subtext 20/32 (18 at <=767)
 *   marquees    circles 64px (2px #009fe0 ring, 60px photo) in a 200px window (auto at <=767);
 *               logos at their own size in a 300px window (min 280; auto at <=767)
 *
 * Between 768 and 991 the 759px image and the panel share a 708px card, so the panel is pushed
 * past the card's clipped edge — that is what production paints (verified at 991) and the port
 * keeps the same flex sizing rather than inventing a tablet layout.
 */

const CARD = 'sticky flex overflow-hidden h-[622px] max-md:h-auto max-md:flex-col';
const CARD_VARIANT = {
  first: 'top-28 mb-36',
  second: 'top-40 mb-24',
  third: 'top-52 mb-12',
};

const IMAGE =
  'block h-full w-full max-w-[759px] object-cover ' +
  'max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] ' +
  'max-sm:max-h-[200px] max-sm:object-[50%_50%]';
const IMAGE_FIRST = 'max-sm:max-h-[225px] max-sm:object-[50%_0%]';

const PANEL =
  'flex flex-col items-stretch gap-[52px] p-10 bg-no-repeat bg-cover bg-center ' +
  "bg-[url('/assets/images/schools/isme/home/outcomes/vector.png')] " +
  'max-md:max-w-full max-md:gap-5 max-md:p-5';
const PANEL_VARIANT = {
  'bg-1': 'justify-center bg-[#18429f]',
  'bg-2': 'justify-around bg-[#0b2b73]',
  'bg-3': 'justify-around bg-[#03144b]',
};

const BLOCK = 'flex flex-col gap-4 text-2xl leading-9 text-white max-md:pb-[25px] max-sm:pb-5';
const NUMBER = 'text-[32px] font-bold leading-8 text-atlas-mint max-md:text-2xl max-md:leading-8';
const SUBTEXT = 'mb-0 text-[20px] leading-8 max-md:text-[18px] max-md:leading-8';

function Marquee({ marquee }) {
  if (marquee.kind === 'circle') {
    return (
      /* ref .swiper-in-stack-2 */
      <div className="w-[200px] min-w-[200px] overflow-hidden max-md:w-auto max-md:min-w-0">
        <MarqueeTrack>
          {marquee.items.map((it, i) => (
            /* ref .stack-img-circle-2 > img.stack-circle-img */
            <div
              key={i}
              className="flex h-16 w-16 flex-none items-center justify-center overflow-hidden rounded-full border-2 border-solid border-[#009fe0]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- 64px marquee photograph */}
              <img src={it.src} alt="" width={60} height={60} loading="lazy" className="block h-[60px] w-[60px] max-w-full" />
            </div>
          ))}
        </MarqueeTrack>
      </div>
    );
  }
  return (
    /* ref .stack-swip-wrap-2 */
    <div className="w-[300px] min-w-[280px] overflow-hidden max-md:w-auto max-md:min-w-0">
      <MarqueeTrack>
        {marquee.items.map((it, i) =>
          it.extra ? (
            /* imarticus29012026 authors one slide holding two logos: they stack, so that slide (and the
               strip) is twice as tall */
            <div key={i} className="flex-none">
              {[it, ...it.extra].map((x, j) => (
                // eslint-disable-next-line @next/next/no-img-element -- small logo at its natural size
                <img key={j} src={x.src} alt="" width={x.width} height={x.height} loading="lazy" className="block max-w-full" />
              ))}
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- small logo at its natural size
            <img key={i} src={it.src} alt="" width={it.width} height={it.height} loading="lazy" className="block max-w-full" />
          ),
        )}
      </MarqueeTrack>
    </div>
  );
}

function Block({ block }) {
  const body = (
    <>
      <div className={NUMBER}>{block.number}</div>
      <div className={SUBTEXT}>{block.text}</div>
    </>
  );
  return (
    /* ref .content-block-outcome-isme */
    <div className={BLOCK}>
      {block.mid ? (
        /* ref .mid-flex-stack-2 > .mid-content-stack + .swiper-in-stack-2 */
        <div className="flex flex-col items-start gap-4">
          {/* ref .mid-content-stack — its number and subtext keep the block's 16px gap */}
          <div className="flex flex-col gap-4">{body}</div>
          {block.marquees.map((m, i) => (
            <Marquee key={i} marquee={m} />
          ))}
        </div>
      ) : (
        <>
          {body}
          {block.marquees.map((m, i) => (
            <Marquee key={i} marquee={m} />
          ))}
        </>
      )}
    </div>
  );
}

export default function OutcomesStack({ cards, block = 'outcomes-stack' }) {
  return (
    /* ref div.page-wrapper-stack > main.main-wrapper-stack > .section_stack */
    <div data-block={block}>
      <div className={CONTAINER}>
        {/* ref .container-large */}
        <div className="mx-auto w-full max-w-[1280px] max-md:max-w-none">
          {/* ref .stack_component */}
          <ul className="m-0 flex list-none flex-col justify-between gap-y-56 p-0 max-md:justify-start max-sm:gap-y-0">
            {cards.map((card) => (
              <li key={card.id} className={cx(CARD, CARD_VARIANT[card.id])}>
                {/* eslint-disable-next-line @next/next/no-img-element -- the reference's own srcset */}
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes={card.image.sizes}
                  alt={card.image.alt}
                  width={759}
                  height={622}
                  loading="lazy"
                  className={cx(IMAGE, card.image.first && IMAGE_FIRST)}
                />
                <div className={cx(PANEL, PANEL_VARIANT[card.panel])}>
                  {/* ref .outcome-header-isme */}
                  <div className="text-[40px] font-bold leading-[56px] text-white max-md:text-[32px] max-md:leading-[56px]">
                    {card.title}
                  </div>
                  {card.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
