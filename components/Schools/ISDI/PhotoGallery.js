import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.instagram-wrapper.mobile-vert-scroll > .grid-gallery-flex` — the four-column
 * photo wall ISDI repeats across pages:
 *
 *   homepage                        "Your Future, In Action"  badge + caption
 *   /programs/undergraduate  #3     "…Launch Before They Graduate"  caption only
 *   /programs/undergraduate  #4     "…The World at their Fingertips"  logo only
 *
 * Three layouts, measured identical on both pages:
 *   >=768px    a row of four columns (gap 24, top-aligned); each column stacks its
 *              two photos (gap 24). The columns have no width — they are sized by
 *              their photographs' intrinsic widths and shrunk to fit — so the
 *              browser arrives at the reference's column widths from the same files.
 *   541-767    the columns wrap two to a row (48% each, space-between), photos
 *              300px wide, pinned top-left.
 *   <=540      header.php turns it into one horizontal scroller: no wrap, columns
 *              become rows, every card 320 x 400 around a 300px photo, and each
 *              column gets 24px on top below 480.
 *
 * Card: photo r16, cover (`.top-set`: fill, pinned top). `badge` is the homepage's
 * `.grid-badge` (6% down / 20px in, `#0000004d` under a 54px blur). `text` is
 * `.insta-text.isdi` — #d20158, white, 18px/500, p8/16, 32px up (16px with
 * `bottom16`), 14px/1.2 p4/16 8px up below 768 — and is authored in `<strong>` on
 * the programmes page (`strong`). `logo` is `.grid-logo`, pinned 20px from the
 * card's bottom-left corner.
 */
function Card({ card }) {
  return (
    /* ref .img-wrap */
    <div className="relative max-vsm:h-[400px] max-vsm:min-w-[320px] max-sm:w-[320px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={card.image.src}
        width={card.image.width}
        height={card.image.height}
        alt={card.image.alt}
        loading="lazy"
        decoding="async"
        className={cx(
          'inline-block max-w-full overflow-hidden rounded-2xl align-middle max-md:h-full max-md:w-[300px]',
          card.topSet ? 'object-fill object-[50%_0%]' : 'object-cover max-md:object-left-top'
        )}
      />

      {card.badge && (
        /* ref .grid-badge > .badge-text */
        <div className="absolute left-5 right-0 top-[6%] 2xl:top-[5%]">
          <div className="inline-block rounded-[20px] bg-[#0000004d] px-4 py-2.5 text-[14px] leading-[1.5] text-white backdrop-blur-[54px] 2xl:align-middle 2xl:text-[12px] 2xl:leading-[1.5]">
            {card.badge}
          </div>
        </div>
      )}

      {card.text && (
        /* ref .insta-text.isdi / .insta-text.isdi-2 */
        <div
          className={cx(
            'absolute left-0 inline-block text-white',
            card.captionVariant === 'isdi-2'
              ? /* the B.Des pages' caption: no plate, a 6px #ec1376 rule under the
                   text, 20px in from both edges, and `line-height: .6` — the base's
                   700 weight, not `.isdi`'s 500. `.more-line-height` relaxes that to .9
                   and `.mrgbt16` lifts it to 16px off the bottom (the Interior Design
                   page authors both). */
                cx(
                  'mx-5 border-0 border-b-[6px] border-solid border-[#ec1376] bg-transparent px-0 pb-0 pt-2 '
                    + 'text-[18px] font-bold max-md:pt-1 max-md:text-[14px]',
                  card.bottom16 ? 'bottom-4' : 'bottom-5',
                  card.looseCaption ? 'leading-[.9] max-md:leading-[.9]' : 'leading-[.6] max-md:leading-[.6]'
                )
              : cx(
                  'bg-atlas-cta px-4 py-2 text-[18px] font-medium leading-[1.5] max-md:py-1 max-md:text-[14px] max-md:leading-[1.2]',
                  card.bottom16 ? 'bottom-4' : 'bottom-8 max-md:bottom-2'
                )
          )}
        >
          {card.strong || card.captionVariant === 'isdi-2' ? (
            /* the parent is already 700, and Preflight's `strong { bolder }` would
               resolve that to 900 */
            <strong className="font-bold">{withBreaks(card.text)}</strong>
          ) : (
            withBreaks(card.text)
          )}
        </div>
      )}

      {card.logo && (
        /* ref img.grid-logo */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={card.logo.src}
          width={card.logo.width}
          height={card.logo.height}
          alt={card.logo.alt}
          loading="lazy"
          decoding="async"
          className="absolute bottom-5 left-5 max-w-full align-middle"
        />
      )}
    </div>
  );
}

export default function PhotoGallery({ columns, className }) {
  return (
    /* ref .instagram-wrapper.mobile-vert-scroll — `overflow: scroll` upstream; it
       only has anything to scroll at <=540, so (as in Campus/HangoutZones) it
       scrolls there and paints no idle scrollbars above it */
    <div className={cx('max-vsm:overflow-x-auto', className)}>
      {/* ref .grid-gallery-flex */}
      <div className="flex items-start gap-6 max-md:flex-wrap max-md:justify-between max-md:gap-0 max-vsm:flex-nowrap max-vsm:items-stretch max-vsm:gap-x-6">
        {columns.map((column, i) => (
          /* ref .grid-column */
          <div
            key={column[0]?.image.src ?? i}
            className="flex flex-col items-start justify-between gap-6 max-md:w-[48%] max-md:gap-x-0 max-vsm:w-auto max-vsm:flex-row max-sm:mt-6"
          >
            {column.map((card) => (
              <Card key={card.image.src} card={card} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
