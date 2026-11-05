import { atlasImpact } from '@/lib/homeContent';
import { cx } from '@/lib/cx';
import StackMarquee from '@/components/Impact/StackMarquee';

/**
 * "From Campus to Career & Beyond: The ATLAS Impact" — port of
 * reference/index.php:1499-1968, which is two top-level blocks:
 *
 *   div.section > section.blueprints > .container
 *     > h2.h2-tag.mrgtbm0                            <- the heading
 *     > .outcome-wrap                                <- `display: none`, dropped
 *   div.page-wrapper-stack > main.main-wrapper-stack
 *     > .section_stack > .container > .container-large
 *       > .stack_component > 3 x .stack_card.atlas
 *
 * The `.outcome-wrap` the heading sits above holds three legacy `.outc-card`s,
 * but the page stylesheet sets `display: none` on it, so they never render. The
 * `.stack_component` below is what the section actually shows, and it carries
 * different copy and different figures — see `atlasImpact` in lib/homeContent.
 *
 * ── The stacking effect ───────────────────────────────────────────────────
 * Pure CSS, no JavaScript: each card is `position: sticky` with a rising `top`
 * (4rem / 10rem / 13rem) and a large bottom margin (15rem / 10rem / 5rem) on
 * top of the component's own 14rem row-gap, so as the page scrolls each card
 * pins a little lower than the one before and they pile up. `.section_stack`,
 * `.page-wrapper-stack`, `.main-wrapper-stack` and `.outcome-bottom-atlas`
 * carry no CSS at all upstream, so only `.container`/`.container-large` are
 * reproduced as real elements.
 *
 * ── The responsive cascade, measured off the reference ────────────────────
 *                        >=992px            768-991px          <=767px
 *   container inset      62px               30px (<=991)       22px
 *   container-large      max-w 1280         max-w 1280         max-w none
 *   stack_component gap  224px              224px              224px, 0 <=479
 *   card 1 / 3           row, h 540         column, h 100%     column, h auto
 *   card 2               row, h 540         row, h 540         column, h auto
 *   image                w 100/max 759,     same               h auto,
 *                        h 100%                                max-h 300 (200 <=479)
 *                                                              object-pos 63%/50%
 *   panel max-width      478px              100%               100%
 *   title                40px/1.1           40px               24px
 *   stat block padding   pb 24              pb 24              pb 25 (20 <=479)
 *   mid-flex             row, centred       row                column, start
 *
 * Card 2 keeping its row layout between 768 and 991 while cards 1 and 3 have
 * already gone column is the reference's own cascade — the max-991 block lists
 * `.stack_card.first.atlas` and `.stack_card.third.atlas` but not `.second`,
 * which only turns at max-767. It is reproduced rather than tidied up.
 */

/* ref .container */
const CONTAINER =
  'relative z-[1] mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]';

/* ref .stack_card — the shared half; per-card offsets live in CARD_VARIANT */
const CARD_BASE =
  'sticky mr-[5px] flex overflow-hidden rounded-t-[32px] ' +
  'shadow-[0_-12px_16px_-4px_#0000000d] max-md:h-auto';

/*
 * ref .stack_card.{first,second,third}.atlas plus their max-991 / max-767 /
 * max-479 / min-1920 overrides. Written out in full because the Tailwind
 * scanner only sees literal strings.
 */
const CARD_VARIANT = {
  startup: 'top-16 mb-60 h-[540px] flex-row max-lg:h-full max-lg:flex-col',
  masters: 'top-40 mb-40 h-[540px] flex-row max-md:flex-col',
  career:
    'top-52 mb-20 h-[540px] flex-row 3xl:mb-[76.8px] ' +
    'max-lg:h-full max-lg:flex-col max-sm:mb-4',
};

/* ref .outcome-img (+ its max-767 and max-479 overrides) */
const IMAGE =
  'h-full w-full max-w-[759px] object-cover ' +
  'max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] ' +
  'max-sm:max-h-[200px] max-sm:object-[50%_50%]';

/* ref .outcome-content.atlas-rt.bg1 (+ max-991 `max-width: 100%`) */
const PANEL =
  'flex w-full max-w-[478px] flex-col items-stretch justify-between gap-y-[21px] ' +
  'bg-[#41418e] bg-[url(/assets/images/impact/panel-bg.png)] bg-cover bg-center bg-no-repeat ' +
  'p-10 text-white max-lg:max-w-full';

/* ref .content-block-outcome-atlas */
const BLOCK =
  'flex flex-col gap-y-[15px] pb-6 text-2xl text-white max-md:pb-[25px] max-sm:pb-5';

/* ref .mid-flex-stack-atlas */
const MID =
  'flex flex-row items-center justify-start gap-5 max-md:flex-col max-md:items-start';

function lines(parts) {
  return parts.map((line, i) => (
    <span key={line}>
      {i > 0 && <br />}
      {line}
    </span>
  ));
}

function StackCard({ card }) {
  return (
    /* ref .stack_card.<n>.atlas */
    <li className={cx(CARD_BASE, CARD_VARIANT[card.id])}>
      {/*
        ref .outcome-img. Plain <img> with the reference's own srcset/sizes so
        the browser resolves to the same file at the same widths — `mob.webp`
        below 569px, `desk.webp` above. The "500w" descriptor on a 390px-wide
        file is upstream's, kept verbatim.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${card.image}/desk.webp`}
        srcSet={`${card.image}/mob.webp 500w, ${card.image}/desk.webp 759w`}
        sizes="(max-width: 759px) 100vw, 759px"
        alt={card.alt}
        width={759}
        height={622}
        loading="lazy"
        decoding="async"
        className={IMAGE}
      />

      {/* ref .outcome-content.atlas-rt.bg1 */}
      <div className={PANEL}>
        {/* ref .outcome-title > .outcome-header.atlas-hd */}
        <div className="pb-[10px]">
          {/* `leading-[1.1]` is repeated at max-md because `text-2xl` carries
              its own 1.5 line-height and is emitted after the base utility. */}
          <h3 className="mb-2 text-[40px] font-medium leading-[1.1] 3xl:mb-[10px] max-md:text-2xl max-md:leading-[1.1]">
            {card.title}
          </h3>
        </div>

        {/* ref .outcome-bottom-atlas — an unstyled block upstream */}
        <div>
          {card.stats.map((stat) => (
            <div key={stat.count} className={BLOCK}>
              <div className={MID}>
                {/* ref .st-text-wrap */}
                <div>
                  {/* ref .count-text-atlas */}
                  <div className="text-[32px] font-semibold">{stat.count}</div>
                  {/* ref .count-text-desc — unstyled, inherits the 24px block */}
                  <div>{lines(stat.desc)}</div>
                </div>

                {stat.marquee && <StackMarquee marquee={stat.marquee} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function AtlasImpact() {
  const { heading, cards } = atlasImpact;

  return (
    <>
      {/* ref div.section > section.blueprints > .container */}
      <section className="block overflow-hidden py-[60px] max-md:py-10">
        <div className={CONTAINER}>
          {/* ref .h2-tag.mrgtbm0 */}
          <h2 className="text-6xl font-medium text-[#1a1a1a] max-md:text-5xl max-md:leading-[1.2]">
            {heading}
          </h2>
        </div>
      </section>

      {/* ref div.page-wrapper-stack > main.main-wrapper-stack > .section_stack */}
      <div className={CONTAINER}>
        {/* ref .container-large */}
        <div className="mx-auto w-full max-w-[1280px] max-md:max-w-none">
          {/* ref .stack_component */}
          <ul className="flex list-none flex-col justify-between gap-y-56 max-md:justify-start max-sm:gap-y-0">
            {cards.map((card) => (
              <StackCard key={card.id} card={card} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
