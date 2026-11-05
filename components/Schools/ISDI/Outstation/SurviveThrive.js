import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import MarqueeTrack from '../Home/MarqueeTrack';
import { CONTAINER, H2, H2_MB, SECTION } from '../Home/ui';

/**
 * "Survive and Thrive: Mumbai hacks every student should know" —
 * reference/schools/isdi/isdi-for-outstation.php:529-593.
 *
 *   section.section > .container-15 > h2.h2-tag.mrg16.isdi
 *                   > .swiper.marquee-swiper.mrg-tp (full bleed) > 8 x .core-isdi-card
 *
 * The same `.core-isdi-card` marquee as the homepage "Beliefs" section (same three
 * colourways and corner vectors), but with no section button and a title that is a
 * bold line over a regular-weight description — both at 24px/700, so the whole thing
 * is `.core-card-title-atlas`'s own weight. The `<strong>` in the source is NOT
 * reproduced: Preflight's relative `strong { font-weight: bolder }` would resolve a
 * 700 parent to 900, and production paints a flat 700.
 */
const CARD = 'min-h-[200px] w-[396px] flex-none rounded-3xl bg-contain bg-[position:100%_100%] bg-no-repeat';
const CARD_BG = {
  default: "bg-[#cd0e5d] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector-mid-flex.png')]",
  'bg-2': "bg-[#df287b] bg-[url('/assets/images/schools/isdi/home/beliefs/vector-midflex.png')]",
  'bg-3': "bg-[#0a46ca] bg-[url('/assets/images/schools/isdi/home/outcomes/Vector.png')]",
};

export default function SurviveThrive({ data }) {
  return (
    <div data-block="survive" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi */}
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
      </div>
      {/* ref .swiper.marquee-swiper.mrg-tp — margin-top 54 */}
      <div className="mt-[54px]">
        <MarqueeTrack>
          {data.cards.map((card, i) => (
            <div key={`${i}-${card.title}`} className={cx(CARD, CARD_BG[card.bg || 'default'])}>
              {/* ref .core-content — sticky flex column, items-start, justify-end, pl35/pr25 (pl20 <=767) */}
              <div className="sticky z-[1] flex flex-col items-start justify-end pl-[35px] pr-[25px] max-md:pl-5">
                {/* ref .core-card-title-atlas — 24px/700 white, pad 28/0/16; title line + desc */}
                <div className="pb-4 pt-7 text-[24px] font-bold leading-[1.5] text-white">
                  {withBreaks(card.desc ? `${card.title}\n${card.desc}` : card.title)}
                </div>
              </div>
            </div>
          ))}
        </MarqueeTrack>
      </div>
    </div>
  );
}
