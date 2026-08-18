import { atlasSpotlight } from '@/lib/homeContent';
import { cx } from '@/lib/cx';
import { CONTAINER, SECTION, H2, SUB } from '@/components/Home/SectionHead';

/**
 * "ATLAS Spotlight" — port of reference/index.php:2904-2963
 * (`section.section > .container > (.head-wrap, .grid-gallery)`).
 *
 * **Not a slider and not a CSS grid.** `.grid-gallery` is `display: block` with
 * `column-count: 4` and `column-gap: 16px`, so its `grid-template-columns` /
 * `place-items` declarations are inert and the eight cards flow through four
 * masonry columns. Each `.grid-card-atlas` is auto-height with a 24px bottom
 * margin, a `32px 0` radius, clipped, and a caption block absolutely positioned
 * 20px from the sides and 16px from the bottom.
 *
 * Nothing here is interactive — no links, no hover, no JavaScript.
 *
 * ── Measured responsive cascade ───────────────────────────────────────────
 *                        >=768px                 <=767px
 *   .grid-gallery        4 columns, gap 16,      2 columns, margin-top 40,
 *                        margin-top 56           bleeds -22px each side with
 *                                                20px inner padding
 *   .grid-card-atlas     auto height, mb 24      width 300, mb 16
 *   .grid-image-card     cover, height 100%      width 100%, height 300
 *   .grid-txt-wrapper    inset auto 20 16        bottom/left/right 24
 *   .grid-card-name      24px/700 #5cbdca        20px/700
 *   .title-txt-grid      18px/500/32px #fff      16px/500/24px
 *
 * The fifth card carries `.op-top`, which only does anything at <=767 where it
 * pins the crop to the top of the image (`object-position: 50% 0%`).
 */
function SpotlightCard({ item }) {
  return (
    /* ref .grid-card-atlas */
    <div className="relative mb-6 h-auto overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mb-4 max-md:w-[300px] max-md:shrink-0">
      {/* ref .grid-image-card (+ .op-top on one card) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          'relative mb-0 block h-full overflow-hidden rounded-none object-cover max-md:h-[300px] max-md:w-full',
          item.opTop && 'max-md:object-[50%_0%]',
        )}
      />

      {/* ref .grid-txt-wrapper */}
      <div className="absolute inset-x-5 bottom-4 flex flex-col gap-1 max-md:inset-x-6 max-md:bottom-6">
        {/* ref .grid-card-name-atlas — wrapped in <strong> upstream */}
        <div className="z-[3] text-2xl font-bold leading-6 text-atlas-cyan max-md:text-xl max-md:leading-6">
          <strong>{item.name}</strong>
        </div>

        {/* ref .title-txt-grid (.title-txt-grid2 on /about-us — same size and
            leading, weight 400 instead of 500) */}
        <div className="z-[3] text-lg font-medium leading-8 text-white max-md:text-base max-md:leading-6">
          {item.title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * `data` lets /about-us reuse this section with its own eight achievements.
 * Styling is deliberately NOT a prop: the card is a shared design, so both
 * pages render identical type, colour and spacing.
 */
export default function AtlasSpotlight({ data = atlasSpotlight }) {
  const { heading, subheading, items } = data;

  return (
    /* ref section.section */
    <section className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap — no `mrgbtm32` */}
        <div className="flex items-end justify-between max-md:flex-col max-md:items-stretch">
          {/* ref .tt-wrap */}
          <div className="max-md:mb-5 max-sm:mr-5">
            <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{heading}</h2>
            <div className={SUB}>{subheading}</div>
          </div>
        </div>

        {/*
          ref .grid-gallery — a CSS multi-column, not a grid. `[column-fill:balance]`
          is the initial value and is left implicit; the negative margins at
          <=767 are the reference's own bleed.
        */}
        <div className="mt-14 block [column-count:4] [column-gap:16px] max-md:mt-10 max-md:[column-count:2] max-md:-mx-[22px] max-md:px-5 max-vsm:flex max-vsm:overflow-auto">
          {items.map((item) => (
            <SpotlightCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
