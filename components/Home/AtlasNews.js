import { atlasNews } from '@/lib/homeContent';
import SmartLink from '@/components/SmartLink';
import Carousel from '@/components/Carousel/Carousel';
import SectionHead, { CONTAINER, SECTION } from '@/components/Home/SectionHead';

/**
 * "ATLAS News" — port of reference/index.php:2256-2469
 * (`section.section > .container > (.head-wrap.mrgbtm32, .swiper.common-swiper.mrgtp0)`).
 *
 * Eight `.card` slides. The card is 295px wide (at every width — its max-767
 * rule re-states 295px rather than going fluid), white on a `#d9d9d9` border
 * with a `32px 0` radius, holding:
 *   .c-image      298px tall, `#8facec` behind a cover image, plus an empty
 *                 `.card-a-gradient` overlaying its bottom 50%
 *   .content-box  16px padding
 *   .c-title      600 weight, **fixed 50px tall with overflow hidden** — so a
 *                 long title is clipped, and where a card's hard-coded <br />
 *                 falls decides what stays visible
 *   .c-date       calendar glyph + 12px date, 12px above / 44px below
 *   .button-tertiary  44px tall teal pill, "Read now" + an inverted arrow
 *
 * Every card also carries an inline `<script>` upstream that copies the card's
 * `BG-Color` attribute onto its background. Every card on this page has
 * `BG-Color=""`, so it sets nothing — not reproduced. (Thought Leadership uses
 * the same card with `#F2F2F2`, which is why the script exists.)
 *
 * This card component is shared with Thought Leadership, so it takes its
 * content and its background colour as props.
 */
export function NewsCard({ item, calendarIcon, arrowIcon, background }) {
  return (
    /* ref .card + its `1208fa47…` variant */
    <div
      className="w-[295px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] border border-solid border-[#d9d9d9] bg-white text-black"
      style={background ? { backgroundColor: background } : undefined}
    >
      {/* ref .c-image */}
      <div className="relative h-[298px] bg-[#8facec]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
        {/* ref .card-a-gradient — an empty element upstream, no paint of its own */}
        <div className="absolute inset-x-0 bottom-0 h-1/2" />
      </div>

      {/* ref .content-box */}
      <div className="p-4">
        {/* ref .c-title — the 50px clamp is the reference's, not a choice */}
        <div className="h-[50px] overflow-hidden text-ellipsis font-semibold [direction:ltr]">
          {item.title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>

        {/* ref .c-date */}
        <div className="flex items-center justify-start gap-1.5 pb-11 pt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={calendarIcon} alt="calendar icon" loading="lazy" decoding="async" />
          {/* ref .day */}
          <div className="text-xs">{item.date}</div>
        </div>

        {/* ref .button-tertiary + its `253dce77…` variant */}
        <SmartLink
          href={item.href}
          newTab={item.newTab}
          className="flex h-11 flex-row items-center justify-center gap-[5px] rounded-3xl bg-atlas-cyan px-6 text-left text-sm leading-[1.5] text-black no-underline"
        >
          {/* ref .text-t */}
          <div className="leading-[1.2]">Read now</div>
          {/* ref .icon-t + variant — `filter: invert()` on the dark arrow */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={arrowIcon}
            alt="arrow downward icon"
            loading="lazy"
            decoding="async"
            className="invert"
          />
        </SmartLink>
      </div>
    </div>
  );
}

export default function AtlasNews() {
  const { heading, subheading, items, calendarIcon, arrowIcon } = atlasNews;

  return (
    /* ref section.section */
    <section className={SECTION}>
      <div className={CONTAINER}>
        <SectionHead heading={heading} subheading={subheading} />
      </div>

      <Carousel>
        {items.map((item, i) => (
          <NewsCard
            key={`${item.title.join(' ')}-${i}`}
            item={item}
            calendarIcon={calendarIcon}
            arrowIcon={arrowIcon}
          />
        ))}
      </Carousel>
    </section>
  );
}
