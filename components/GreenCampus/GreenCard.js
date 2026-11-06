import { cx } from '@/lib/cx';
import { PANEL_NAVY } from '@/lib/greenCampusContent';

/**
 * `.card-content-b` as /green-campus skins it — the same 50/50 copy-beside-photograph row as
 * `components/ui/ContentCardB`, but this page's own `<style>` re-declares four of its rules for every
 * card on the page, so it cannot take the shared card's values:
 *
 *                       shared ContentCardB             /green-campus
 *   .cd-cont-b-wrap     centred, padding 0 96           top-aligned (`justify-content: unset`),
 *                                                       padding 48 96 0 (48 32 22 at <=767)
 *   .cd-b-text          18px, 16 / 14 below 768 / 480   20px/1.5 at every width, margin-bottom 24
 *                                                       (the page rule has no media query and comes
 *                                                       after the sheet, so it wins everywhere)
 *   .cd-cont-b-imgwrap  transparent                     #1E226B
 *   .map-header-title   —                               60px/1.2, 45px at <=767 (Strategic Location)
 *
 * Everything else is the shared card's measured cascade: min-height 480, a 50/50 row (`switch`
 * reverses it), `flex-wrap: wrap-reverse` at <=767 so the photograph sits ABOVE the copy, the h3 at
 * 32px/1.2 500 (20 at <=767, 18 at <=479) and an image that keeps its own ratio and is stretched by
 * the row — which is why a tall copy column crops it at 768.
 */
export default function GreenCard({ item, map = false }) {
  return (
    /* ref .card-content-b (+ .w-variant-345ca80e-… for `switch`) */
    <div
      className={cx(
        'flex min-h-[480px] items-stretch justify-start max-md:flex-wrap-reverse',
        item.variant === 'switch' && 'flex-row-reverse',
      )}
    >
      {/* ref .cd-cont-b-wrap */}
      <div
        className="flex w-1/2 flex-none flex-col items-start px-24 pt-12 max-md:w-full max-md:px-8 max-md:pb-[22px]"
        style={{ backgroundColor: item.background }}
      >
        {/* ref h3.h3-cd-b(.map-header-title) */}
        <h3
          className={cx(
            'mb-6 font-medium leading-[1.2] text-white',
            map ? 'text-[60px] max-md:text-[45px]' : 'text-[32px] max-md:text-[20px] max-sm:text-[18px]',
          )}
        >
          {item.title}
        </h3>
        {/* ref .cd-b-text — one per paragraph */}
        {[].concat(item.text).map((paragraph, i) => (
          <div key={i} className="mb-6 text-[20px] leading-[1.5] text-white">
            {paragraph}
          </div>
        ))}
      </div>

      {/* ref .cd-cont-b-imgwrap */}
      <div className="w-1/2 overflow-hidden max-md:w-full" style={{ backgroundColor: PANEL_NAVY }}>
        {/* ref img.cd-b-image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image.src}
          srcSet={item.image.srcSet}
          sizes={item.image.srcSet ? '100vw' : undefined}
          alt={item.image.alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
