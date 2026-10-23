import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The figures band under the hero — `.top-cards-wrapper.padbtm0 > 4 x
 * .head-top-card.bgN.isdi-blue-N` (index.php's Summer School page).
 *
 * This is NOT `../StatsBand`, even though the wrapper and card classes are the same. That
 * component renders a 24px `.sm-text-isme` label over a 32px/500 `.large-text` figure, which
 * is the shape every other ISDI page uses. Here there is no figure at all: each card is one
 * `.sm-text-isme-2.isdi` line, and the first adds a coloured `.sm-text-isme.orange` eyebrow
 * above a `.sm-text-isme-3` variant of that line. Generalising `StatsBand` would have meant
 * rewriting the data of seventeen finished pages for one page's benefit, so this band is
 * local — the same call `components/Industry/PartnerCardSection` records.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                              <=767px
 *   band              row, space-between, top-aligned      column, stretched
 *   card              flex 1 1 0, h208, centred column,    h auto, p 24/24/24/22
 *                     pl64; pr40 except the `.bg6` one;
 *                     artwork contain at 100% 50%
 *   eyebrow           24px/1.2 #eb1f3c, pb16               18px
 *     (`.sm-text-isme.orange`)
 *   line              24px/1.2 white, pb16                 (unchanged — 24px)
 *     (`.sm-text-isme-2.isdi`)
 *   small line        16px/1.2 white, pb6                  (unchanged)
 *     (`+ .sm-text-isme-3`)
 */
export default function Stats({ data }) {
  return (
    /* ref .top-cards-wrapper.padbtm0 */
    <div data-block="stats" className="flex items-start justify-between max-md:flex-col max-md:items-stretch">
      {data.map((card) => (
        /* ref .head-top-card */
        <div
          key={card.lines.map((l) => l.text).join('|')}
          className={cx(
            'flex h-52 min-w-0 flex-1 basis-0 flex-col items-start justify-center bg-contain bg-[position:100%_50%] bg-no-repeat pl-16 text-white',
            'max-md:h-auto max-md:flex-none max-md:py-6 max-md:pl-[22px] max-md:pr-6',
            card.padRight && 'pr-10 max-md:pr-10'
          )}
          style={{ backgroundColor: card.background, backgroundImage: `url(${card.image})` }}
        >
          {card.lines.map((line) => (
            <div
              key={line.text}
              className={cx(
                'leading-[1.2]',
                /* ref .sm-text-isme.orange */
                line.variant === 'eyebrow' && 'pb-4 text-[24px] text-[#eb1f3c] max-md:text-[18px]',
                /* ref .sm-text-isme-2.isdi — 24px at EVERY width; only the `.sm-text-isme`
                   eyebrow above it drops to 18, which is why the other ISDI bands' mobile
                   override does not apply here */
                line.variant === 'line' && 'pb-4 text-[24px] text-white',
                /* ref .sm-text-isme-2.sm-text-isme-3.isdi */
                line.variant === 'small' && 'pb-1.5 text-base text-white'
              )}
            >
              {withBreaks(line.text)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
