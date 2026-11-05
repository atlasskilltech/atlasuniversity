import { cx } from '@/lib/cx';
import MarqueeTrack from './MarqueeTrack';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "ATLAS Outcomes: Measurable Impact, Proven ROI" — port of
 * reference/schools/isdi/index.php:501-1502, two top-level blocks:
 *
 *   div.section.extraspace > section.blueprints > .container > h2  (+ a hidden
 *       `.outcome-wrap` of legacy cards, `display: none` in the sheet)
 *   div.page-wrapper-stack > main > .section_stack > .container > .container-large
 *       > .stack_component > 3 x .stack_card.{first,second,third}.isdi
 *
 * ── The stack ───────────────────────────────────────────────────────────────
 * Pure CSS: each card is `position: sticky` with a rising `top` (3rem / 12rem /
 * 17rem) and a large bottom margin (18.8rem / 12rem / 60px) on top of the
 * component's 14rem row gap, so the cards pile up as the page scrolls.
 *
 *                     >=992              768-991           <=767            <=479
 *   card              row, h540          column, h auto    column           gap 0
 *   image             w100 / max 759     same              h auto, max 300  max 200 (card 1: 225, top-anchored)
 *   panel max-width   478                100%              100%
 *   panel padding     40                 40                26/25 (1), 26/20 (2, 3)
 *   number            24px, lh .5        24px              20px
 *   subtext           16px               16px              14px
 *   marquee viewport  100% (inline)      100%              max 200 / 250
 *
 * `.stack_component` sets Manrope, so the badges and the plain `.stack-subtext`
 * lines are Manrope while `.isdi` elements are Poppins — reproduced.
 *
 * ── The marquees ────────────────────────────────────────────────────────────
 * Each `.marquee-swiper` is a `MarqueeTrack` (constant speed, one slide per 4s,
 * paused on hover).
 */

/* ref .stack_card + .{first,second,third}.isdi */
const CARD =
  'sticky mr-[5px] flex overflow-hidden rounded-3xl shadow-[0_-12px_16px_-4px_#0000000d] ' +
  'max-lg:h-auto max-lg:flex-col';
const CARD_VARIANT = {
  first: 'top-12 mb-[18.8rem] h-[540px]',
  second: 'top-48 mb-48 h-[540px]',
  third: 'top-[17rem] mb-[60px] h-[540px]',
};

/* ref .outcome-img (+ .set-img-oc on card 1) */
const IMAGE =
  'block h-full w-full max-w-[759px] object-cover ' +
  'max-md:h-auto max-md:max-h-[300px] max-md:object-[63%_50%] ' +
  'max-sm:max-h-[200px] max-sm:object-[50%_50%]';
const IMAGE_FIRST = 'max-sm:max-h-[225px] max-sm:object-[50%_0%]';

/* ref .outcome-content.isdi-{1,2,3} */
const PANEL =
  'flex w-full max-w-[478px] flex-col items-stretch justify-between p-10 max-lg:max-w-full';
const PANEL_VARIANT = {
  first: 'gap-[21px] bg-[#d20158] max-md:px-[25px] max-md:py-[26px]',
  second: 'gap-10 bg-[#0038b1] max-md:px-5 max-md:py-[26px]',
  third: 'gap-[30px] bg-[#ec1376] 2xl:gap-10 max-md:px-5 max-md:py-[26px]',
};

/* ref .mid-flex-stack (+ .bg-2 / .bg-3 / .bg-4) */
const STAT =
  'flex flex-col items-start gap-[15px] rounded-2xl border-[0.25px] border-solid border-[#ffffff40] px-6 py-[18px] ' +
  'bg-no-repeat bg-contain bg-[position:100%_50%]';
const STAT_BG = {
  default: "bg-[#ec1376] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector.png')]",
  'bg-2': "bg-[#ec1376] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector-1.png')]",
  'bg-3': "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector-1.png')]",
  'bg-4': "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector-mid-flex.png')]",
};

/* ref .swiper-in-stack (a sibling of the figures) / .stack-swip-wrap (inside them) */
const VIEWPORT = {
  aside: 'w-full min-w-[200px] overflow-hidden max-md:max-w-[200px]',
  inside: 'mt-3 w-[200px] min-w-[200px] overflow-hidden max-md:w-auto max-md:max-w-[250px]',
};

function MarqueeItem({ item, kind }) {
  if (kind === 'circle') {
    return (
      /* ref .stack-img-circle > img.stack-circle-img — a 64px image clamped to the 41px content box */
      <div className="flex h-[45px] w-[45px] flex-none items-center justify-center overflow-hidden rounded-full border-2 border-solid border-[#009fe0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.src} alt={item.alt} width={64} height={64} loading="lazy" decoding="async" className="w-16 max-w-full" />
      </div>
    );
  }
  /* ref img.uni-image — `width: 100%` of a content-sized slide, i.e. its natural size */
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={item.src} alt={item.alt} loading="lazy" decoding="async" className="inline-block w-full" />;
}

function Marquee({ marquee }) {
  const { items, kind, placement } = marquee;
  return (
    <div className={VIEWPORT[placement]}>
      <MarqueeTrack>
        {items.map((item) => (
          <MarqueeItem key={item.src} item={item} kind={kind} />
        ))}
      </MarqueeTrack>
    </div>
  );
}

function Stat({ stat }) {
  const numbers = stat.numbers.map((n) => (
    /* ref .stack-number.isdi */
    <div key={n} className="inline-block font-poppins-isdi text-2xl font-medium leading-[.5] text-white max-md:text-xl max-md:leading-[.5]">
      {n}
    </div>
  ));
  const subtext = (
    /* ref .stack-subtext(.isdi) — rendered even when empty: it still takes a flex gap */
    <div
      className={cx(
        'text-base font-normal leading-[1.5] max-md:text-sm max-md:leading-[1.5]',
        stat.subtextIsdi ? 'font-poppins-isdi text-white' : 'font-sans',
      )}
    >
      {stat.subtext}
    </div>
  );

  return (
    <div className={cx(STAT, STAT_BG[stat.bg || 'default'])}>
      {/* ref .mid-content-stack */}
      <div className="flex flex-col gap-4">
        {numbers}
        {subtext}
        {stat.marquee.placement === 'inside' && <Marquee marquee={stat.marquee} />}
      </div>
      {stat.marquee.placement === 'aside' && <Marquee marquee={stat.marquee} />}
    </div>
  );
}

function Card({ card }) {
  const [first, second] = card.stats;
  const Title = card.titleStrong ? 'strong' : 'div';
  return (
    <div className={cx(CARD, CARD_VARIANT[card.id])}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        srcSet={card.image.srcSet}
        sizes="(max-width: 773px) 100vw, 773px"
        alt={card.image.alt}
        width={773}
        height={540}
        loading="lazy"
        decoding="async"
        className={cx(IMAGE, card.id === 'first' && IMAGE_FIRST)}
      />

      <div className={cx(PANEL, PANEL_VARIANT[card.id])}>
        {/* ref .outcome-title */}
        <div className="pb-2.5">
          {/* ref .outcome-header.isdi */}
          <div className="mb-2 font-poppins-isdi text-2xl font-medium leading-[1.1] text-white">
            {card.titleStrong ? <Title className="mb-2 font-medium">{card.title}</Title> : card.title}
          </div>
          {/* ref .title-badge */}
          <div className="inline-block rounded-3xl bg-black/30 px-4 py-2.5 text-xs text-white 3xl:text-sm max-md:text-[10px]">
            {card.badge}
          </div>
        </div>

        {/* ref .outcome-bottom */}
        <div>
          {/* ref .content-block-outcome */}
          <div className="flex flex-col gap-[15px] pb-6 text-2xl text-white max-md:pb-[25px] max-sm:pb-5">
            <Stat stat={first} />
          </div>
          <Stat stat={second} />
        </div>
      </div>
    </div>
  );
}

export default function Outcomes({ data }) {
  return (
    <>
      {/* ref .section.extraspace */}
      <div data-block="outcomes-heading" className={SECTION}>
        {/* ref section.blueprints */}
        <section>
          <div className={CONTAINER}>
            <h2 className={cx(H2, H2_MB.mrgtbm0)}>{data.heading}</h2>
          </div>
        </section>
      </div>

      {/* ref .page-wrapper-stack > main.main-wrapper-stack > .section_stack */}
      <div data-block="outcomes-stack">
        <div>
          <div>
            <div className={CONTAINER}>
              {/* ref .container-large */}
              <div className="mx-auto w-full max-w-[80rem] max-md:max-w-none">
                {/* ref .stack_component */}
                <div className="flex flex-col justify-between gap-y-56 font-sans max-md:justify-start max-sm:gap-y-0">
                  {data.cards.map((card) => (
                    <Card key={card.id} card={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
