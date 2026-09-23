import { cx } from '@/lib/cx';

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
 */
export default function StatsBand({ data }) {
  return (
    /* ref .top-cards-wrapper.mrgbtm0 */
    <div data-block="stats" className="flex items-start justify-between max-md:flex-col max-md:items-stretch">
      {data.map((stat) => (
        /* ref .head-top-card */
        <div
          key={stat.label}
          className={cx(
            'flex h-52 min-w-0 flex-1 basis-0 flex-col items-start justify-center bg-contain bg-[position:100%_50%] bg-no-repeat pl-16 text-white',
            'max-md:h-auto max-md:flex-none max-md:py-6 max-md:pl-[22px] max-md:pr-6',
            stat.padRight && 'pr-10 max-md:pr-10'
          )}
          style={{ backgroundColor: stat.background, backgroundImage: `url(${stat.image})` }}
        >
          {/* ref .sm-text-isme.isdi */}
          <div className="pb-4 text-[24px] leading-[1.2] text-white max-md:text-[18px]">{stat.label}</div>
          {/* ref .large-text */}
          <div className="text-[32px] font-medium leading-[1.2] max-md:text-[22px]">{stat.value}</div>
          {stat.note && (
            /* ref .s-text */
            <div className="pt-4 text-base font-light leading-[1.2] max-md:text-[14px] max-md:leading-[1.2]">
              {stat.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
