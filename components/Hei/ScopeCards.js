import PrimaryButton from '@/components/ui/PrimaryButton';
import withBreaks from '@/lib/withBreaks';

/**
 * "Scope of Partnerships" cards — `atlas-hei-relationship.php` and `atlas-industry-partnership.php`:
 * `.common-flex-row-42 > 7 x .partnership-card > .container.blue-3 >
 *   (h2.partnership-card-title, .partnership-subtext, .info-banner-btns > a.btn-primary)`.
 *
 * The `.info-banner-atlas` band's type and button row on a bordered, transparent card, so it is
 * not `ui/InfoBanner` (indigo fill, white type, 65% / 55% measures, a bled photograph).
 *
 * Measured on production at 1440 / 991 / 767 / 390:
 *   .common-flex-row-42      column, gap 42
 *   .partnership-card        1px solid #41418e, radius 32px 0, padding 46 0
 *   .container.blue-3        Webflow's container inside it (max 1366, padding 62 / 30 / 22)
 *   .partnership-card-title  40px/1.2 500 #000, full width → 22px/1.2, margin-bottom 32 at <=767
 *   .partnership-subtext     24px/1.4 300 #000, padding-top 12, full width
 *                            → 18px/1.4, no padding, width 75% at <=767
 *   .info-banner-btns        row, gap 16, padding-top 24, items centre
 *                            → column, start, gap 8, padding-top 16 at <=767; gap / pt 10 at <=479
 *   a.btn-primary            the atlas pill (h56 → h40 at <=767)
 */
const BTNS = 'flex items-center gap-4 pt-6 max-md:flex-col max-md:items-start max-md:gap-2 max-md:pt-4 max-sm:gap-2.5 max-sm:pt-2.5';

export default function ScopeCards({ cards }) {
  return (
    <div className="flex flex-col gap-[42px]">
      {cards.map((card) => (
        /* ref .partnership-card */
        <div
          key={card.title}
          className="rounded-tl-[32px] rounded-br-[32px] border border-solid border-[#41418e] py-[46px]"
        >
          {/* ref .container.blue-3 */}
          <div className="relative mx-auto max-w-[1366px] px-[62px] max-lg:px-[30px] max-md:px-[22px]">
            {/* ref h2.partnership-card-title */}
            <h3 className="m-0 text-[40px] font-medium leading-[1.2] text-black max-md:mb-8 max-md:text-[22px]">
              {card.title}
            </h3>
            {/* ref .partnership-subtext */}
            <div className="pt-3 text-[24px] font-light leading-[1.4] text-black max-md:w-3/4 max-md:pt-0 max-md:text-[18px]">
              {withBreaks(card.text)}
            </div>
            {/* ref .info-banner-btns — /atlas-industry-partnership nests a second `.info-banner-btns`
                inside the first on five of its six cards (`card.nested`), so that button row carries
                the wrapper's top padding twice */}
            <div className={BTNS}>
              {card.nested ? (
                <div className={BTNS}>
                  <PrimaryButton href={card.button.href}>{card.button.label}</PrimaryButton>
                </div>
              ) : (
                <PrimaryButton href={card.button.href}>{card.button.label}</PrimaryButton>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
