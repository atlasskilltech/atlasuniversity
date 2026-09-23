import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import MarqueeTrack from './MarqueeTrack';
import { CONTAINER, H2_MB, H2_PLAIN, SECTION } from './ui';

/**
 * "Beliefs that build changemakers" — port of
 * reference/schools/isdi/index.php:1541-1663.
 *
 *   div.section > .container > .head-wrap.mrgbtm > (h2.h2-tag, a.button-regular)
 *               > .swiper.marquee-swiper (full bleed) > 14 x .core-isdi-card
 *
 * Measured:
 *   head-wrap   row, bottom-aligned, 56px below; a stretched column with 20px
 *               below at <=767 (the button then spans the container)
 *   h2          `.h2-tag` (not `.isdi`): weight 500, 44px -> 36px at 767
 *   card        396 x >=200, radius 24, three colourways with a corner vector
 *               anchored bottom-right; title 24px/700 white, padded 28/0/16,
 *               left inset 35 -> 20 at <=767
 *
 * The strip is a `MarqueeTrack`; the reference authors the seven beliefs twice
 * in a shuffled order, and both passes are kept as written.
 */

/* ref .core-isdi-card (+ .bg-2 / .bg-3) */
const CARD =
  'min-h-[200px] w-[396px] rounded-3xl bg-no-repeat bg-contain bg-[position:100%_100%]';
const CARD_BG = {
  default: "bg-[#cd0e5d] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector-mid-flex.png')]",
  'bg-2': "bg-[#df287b] bg-[url('/assets/images/schools/isdi/home/beliefs/vector-midflex.png')]",
  'bg-3': "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector.png')]",
};

export default function Beliefs({ data }) {
  return (
    <div data-block="beliefs" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref .head-wrap.mrgbtm */}
        <div className="mb-14 flex items-end justify-between max-md:mb-5 max-md:flex-col max-md:items-stretch max-md:justify-start">
          <h2 className={cx(H2_PLAIN, H2_MB.base)}>{data.heading}</h2>
          <ButtonRegular href={data.button.href} variant="pink">
            {data.button.label}
          </ButtonRegular>
        </div>
      </div>

      <MarqueeTrack>
        {data.cards.map((card, i) => (
          <div key={`${i}-${card.title}`} className={cx(CARD, CARD_BG[card.bg || 'default'])}>
            {/* ref .core-content */}
            <div className="sticky z-[1] flex flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
              {/* ref .core-card-title-atlas */}
              <div className="pb-4 pt-7 text-2xl font-bold text-white">{withBreaks(card.title)}</div>
            </div>
          </div>
        ))}
      </MarqueeTrack>
    </div>
  );
}
