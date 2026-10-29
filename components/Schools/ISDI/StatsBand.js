import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * The three figures under an ISDI page's hero — `.top-cards-wrapper > 3 x
 * .head-top-card.bgN.isdi-blue-N`. Two pages render it: /about-us (`.mrgbtm0`, no
 * note) and the B.Des programme pages (`.padbtm0`, whose last two cards carry a
 * `.s-text` note under the figure).
 *
 * The same band as `components/ui/StatBand`, but ISDI's `.isdi-blue-*` modifiers
 * size the artwork `contain` (StatBand's pages all use `auto`), the middle card
 * adds `padding-right: 40px` at every width (a compound selector, so it survives
 * the <=767 padding), and the label is plain white — so it is not that component.
 *
 * Measured at 1440 / 1280 / 991 / 767 / 479 / 390:
 *                     >=768px                            <=767px
 *   band              row, top-aligned                   column, stretched
 *   card              flex 1 1 0, h208, pl64, centred    h112, p 24/24/24/22
 *                     column; artwork contain at 100% 50%
 *   label             24px/1.2 white, pb16               18px
 *   value             32px/1.2 500 white                 22px
 *   note (`.s-text`)  16px/1.2 300 white, pt16           14px/1.2
 *
 * ── Three props, all added for /atlas-isdi-advantage/internationalisation ──
 * That page renders the band twice and neither instance is quite this one:
 *
 *   label="isme-2"         its label is `.sm-text-isme-2.isdi`, which stays **24px at
 *                          every width** where `.sm-text-isme.isdi` drops to 18 at 767
 *   label="isme-2-center"  the Summer School band's `.sm-text-isme-2.isdi-center`,
 *                          the same line centred, with no figure under it
 *   value="normal"         `.large-text.isdi` is `font-weight: 400`, not the plain
 *                          `.large-text`'s 500. /about-us authors the plain class, so
 *                          500 stays the default
 *   padBottom              the Summer School band is a bare `.top-cards-wrapper`
 *                          (`padding-bottom: 60px`); every other instance carries
 *                          `.padbtm0` / `.mrgbtm0`, which zero it
 *   block                  that band is nested inside `#summer-school`, so it is not a
 *                          top-level block and carries no `data-block`
 *
 * NO `min-w-0`. `.head-top-card` is `flex: 1 1 0` with the default `min-width: auto`,
 * so a card whose longest word needs more than its equal share takes it and the rest
 * shrink — which is exactly what /atlas-isdi-advantage's three Parsons cards do
 * (466.66 / 506.67 / 466.67 at 1440). It had been copied from `ui/StatBand`, which
 * genuinely needs it because ITS six-card band overflows 768; here it was a no-op on
 * all four pages that already render this band (verified against production at every
 * width) and wrong on the fifth. Same trap as `SummerSchool/Stats`.
 */
/* ref .sm-text-isme.isdi / .sm-text-isme-2.isdi / .sm-text-isme-2.isdi-center */
const LABEL = {
  isme: 'pb-4 text-[24px] leading-[1.2] text-white max-md:text-[18px]',
  'isme-2': 'pb-4 text-[24px] leading-[1.2] text-white',
  'isme-2-center': 'pb-4 text-center text-[24px] leading-[1.2] text-white',
};

/* ref .large-text / .large-text.isdi */
const VALUE = {
  medium: 'text-[32px] font-medium leading-[1.2] max-md:text-[22px]',
  normal: 'text-[32px] font-normal leading-[1.2] max-md:text-[22px]',
};

export default function StatsBand({
  data, block = 'stats', label = 'isme', value = 'medium', padBottom = false,
}) {
  return (
    /* ref .top-cards-wrapper(.mrgbtm0 | .padbtm0) */
    <div
      data-block={block || undefined}
      className={cx(
        'flex items-start justify-between max-md:flex-col max-md:items-stretch',
        padBottom && 'pb-[60px]'
      )}
    >
      {data.map((stat, i) => (
        /* ref .head-top-card */
        <div
          key={`${i}-${stat.label}`}
          className={cx(
            'flex h-52 flex-1 basis-0 flex-col items-start justify-center bg-contain bg-[position:100%_50%] bg-no-repeat pl-16 text-white',
            'max-md:h-auto max-md:flex-none max-md:py-6 max-md:pl-[22px]',
            /*
             * `.head-top-card.bg7.isdi-blue-2`'s `padding-right: 40px` is a compound
             * selector, so it survives the `@media (max-width: 767px)` rule that gives
             * every card `padding: 24px 24px 24px 22px` — the card keeps 40 at every
             * width. Both `max-md:pr-6` and `max-md:pr-10` in one class list are
             * resolved by **stylesheet order**, and `max-md:pr-6` is the one that wins,
             * so the right padding is kept out of the shared string and applied per
             * card. With them together the middle card measured 24px below 768, which
             * is 20px of lost text width and a rewrapped line.
             */
            stat.padRight ? 'pr-10 max-md:pr-10' : 'max-md:pr-6'
          )}
          style={{ backgroundColor: stat.background, backgroundImage: `url(${stat.image})` }}
        >
          {/* ref .sm-text-isme.isdi / .sm-text-isme-2(.isdi | .isdi-center) */}
          <div className={LABEL[label] ?? LABEL.isme}>{withBreaks(stat.label)}</div>
          {stat.value !== undefined && (
            /* ref .large-text — /atlas-isdi-advantage's Parsons band authors no
               `.large-text` child at all, so there is no empty box to render */
            <div className={VALUE[value] ?? VALUE.medium}>{withBreaks(stat.value)}</div>
          )}
          {stat.note && (
            /* ref .s-text */
            <div className="pt-4 text-base font-light leading-[1.2] max-md:text-[14px] max-md:leading-[1.2]">
              {withBreaks(stat.note)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
