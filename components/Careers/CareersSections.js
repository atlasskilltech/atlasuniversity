import { CONTAINER, H2, SECTION } from '@/components/Home/SectionHead';
import ZoomSliderLg from '@/components/ui/ZoomSliderLg';
import withBreaks from '@/lib/withBreaks';
import { cx } from '@/lib/cx';

/*
 * The four middle sections of /job-openings (`job-openings.php`). All are `section.section >
 * .container` with an `h2.h2-tag` (44px/1.2 500 #1a1a1a, mb 56; 36px, mb 32 at <=767) — except
 * "Perks & Benefits", whose `.h2-tag.mrgtbm0` carries no margin. Measured on production at
 * 1440 / 991 / 767 / 479 / 390.
 *
 * Deliberately ATLAS-local. /schools/isme/job-openings renders the same Webflow template through
 * the ISME section renderer, but the ATLAS sheet differs in the details (white numbers rather than
 * mint, rounded cards and mosaic, the slider's scrim), and an ATLAS page does not import ISME code.
 */
const H2_MB = `mb-14 max-md:mb-8 ${H2}`;

/* ---- "The Atlas Faculty Advantage – 3 Things That Set Us Apart" ------------------------------
 * `.things-card-wrapper` — a 24px-gap row, a column at <=767. `.th-card`: 564 tall, up to 396 wide
 * (full width at <=767), padding 56 40 0, #41418e under the stylesheet's own artwork at 50% 100%.
 * The radius is per card: `.bg1.atlas` 32px 0, `.bg2.atlas` 32px 0 0 (top-left only), `.bg3` none.
 * `.th-number` 32px/1.5 500, mb 16; `.th-title` 32px/1.4 500, mb 15; both white. */
export function ThingsCards({ data }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MB}>{data.heading}</h2>
        <div className="flex gap-6 max-md:flex-col">
          {data.cards.map((card) => (
            <div
              key={card.num}
              className="h-[564px] w-full max-w-[396px] bg-[#41418e] bg-[length:auto] bg-[position:50%_100%] bg-no-repeat px-10 pt-14 text-white max-md:max-w-none"
              style={{ backgroundImage: `url(${card.image})`, borderRadius: card.radius }}
            >
              <div className="mb-4 text-[32px] font-medium leading-[1.5]">{card.num}</div>
              <div className="mb-[15px] text-[32px] font-medium leading-[1.4]">{withBreaks(card.title)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- "Faculty Life@ISME" (the reference's own heading, on the ATLAS page) ----------------------
 * A `.swiper.zoom-slider-lg` INSIDE the container — so it does not bleed — of three
 * `.slider-card-c-atlas`: 478 tall, `32px 0`, clipped, the photograph cover, under the empty
 * `.slider-card-e-atlas-2` scrim (absolute from 50% down, `transparent 14% -> #040404e6`). There is
 * no chip: unlike every other `.slider-card-c-atlas` on the site, these carry no caption. */
function LifeCard({ slide }) {
  return (
    <div className="relative h-[478px] w-full overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={slide.src} srcSet={slide.srcSet} sizes={slide.sizes} alt="" loading="lazy" className="inline-block h-full w-full max-w-full object-cover" />
      {/* ref .slider-card-e-atlas-2 — empty */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 z-[1] bg-[linear-gradient(#00263700_14%,#040404e6)]" />
    </div>
  );
}

export function FacultyLife({ data }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MB}>{data.heading}</h2>
        <ZoomSliderLg label={data.heading} dots="swiper">
          {data.slides.map((slide) => (
            <LifeCard key={slide.src} slide={slide} />
          ))}
        </ZoomSliderLg>
      </div>
    </section>
  );
}

/* ---- "Perks & Benefits" ------------------------------------------------------------------------
 * `.bl-card-wrapper-isme.atlas` — mt 56 (40 at <=767), `32px 0`, clipped — around the eight-cell
 * Webflow quick-stack mosaic: grid 1 is `2fr minmax(200px, 1fr)` over two 282px rows (cells 01+02
 * side by side, 03 spanning both rows, 04 under 01+02); grid 2 is `2fr 3fr` (05 spanning both rows,
 * 06, then 07+08 side by side). At <=767 grid 1 becomes a wrapping flex row of 250px rows and grid 2
 * `1fr 1fr` with 05 back to one row (padding 30 0 40). A bare `1fr` would be `minmax(auto, 1fr)`,
 * so the `minmax` is transcribed. Each cell is a centred flex column painted from data (colour,
 * artwork, size, position — cell 03 turns #0b2b73 at <=479); `.number` 24px/1 600 white, padding
 * 0 0 8 24; `.card-title` 32px/1.2 500 white, padding 0 24, mb 8 — 16px 600 at <=767. */
function Cell({ cell, className }) {
  return (
    <div
      className={cx(
        'relative flex flex-col justify-center bg-no-repeat text-white bg-[color:var(--pc-bg)] max-sm:bg-[color:var(--pc-bg-sm)]',
        className,
      )}
      style={{
        '--pc-bg': cell.bg,
        '--pc-bg-sm': cell.bgSm ?? cell.bg,
        backgroundImage: `url(${cell.image})`,
        backgroundSize: cell.size,
        backgroundPosition: cell.position,
      }}
    >
      <div className="pb-2 pl-6 text-[24px] font-semibold leading-none">{cell.num}</div>
      <div className="mb-2 px-6 text-[32px] font-medium leading-[1.2] max-md:text-[16px] max-md:font-semibold">{withBreaks(cell.title)}</div>
    </div>
  );
}

export function PerksMosaic({ data }) {
  const [a, b, c, d, e, f, g, h] = data.cells;
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2}>{data.heading}</h2>
        <div className="mt-14 overflow-hidden rounded-tl-[32px] rounded-br-[32px] max-md:mt-10">
          <div className="grid h-[564px] grid-rows-[282px_282px] justify-center [grid-template-columns:2fr_minmax(200px,1fr)] max-md:flex max-md:h-auto max-md:flex-wrap">
            <div className="grid grid-cols-2 max-md:h-[250px] max-md:w-full">
              <Cell cell={a} className="items-start" />
              <Cell cell={b} className="items-start" />
            </div>
            <Cell cell={c} className="row-span-2 items-start max-md:h-[250px] max-md:w-full" />
            <Cell cell={d} className="items-stretch max-md:h-[250px] max-md:w-full" />
          </div>
          <div className="grid h-[564px] grid-rows-[282px_282px] justify-center [grid-template-columns:2fr_3fr] max-md:grid-cols-2">
            <Cell cell={e} className="row-span-2 items-stretch max-md:row-span-1 max-md:pb-10 max-md:pt-[30px]" />
            <Cell cell={f} className="items-stretch" />
            <div className="grid grid-cols-2 max-md:col-span-2">
              <Cell cell={g} className="items-start" />
              <Cell cell={h} className="items-start" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- "What it's like being at ATLAS" -----------------------------------------------------------
 * The heading in `.container`, then `.career-video` full-bleed: the reference authors TWO iframes of
 * the same YouTube video, `.desktop-video` 640px tall and `.mobile-video` 150px, and its own
 * `<style>` swaps them at `max-width: 992px` (inclusive). One player whose height changes at the same
 * breakpoint paints the same thing and loads the player once. */
export function CareerVideo({ data }) {
  return (
    <section className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={H2_MB}>{withBreaks(data.heading)}</h2>
      </div>
      <div>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${data.youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
          className="block h-[640px] w-full border-0 [@media(max-width:992px)]:h-[150px]"
        />
      </div>
    </section>
  );
}
