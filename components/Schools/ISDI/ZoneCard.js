import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';

/**
 * `.journey-card.isdi` — a coloured text panel over a photograph, three to a row.
 *
 * Extracted from `Industry/Conclave` (the ATLAS HR Conclave's three zones) when
 * /schools/isdi/success-stories/success-snapshot turned out to build "The 4-Year
 * Journey to Success" from the same card. Measured identical on both references at
 * 1440 / 768 / 390:
 *
 *   .journey-wrapper.mrgtp   flex, gap 32, mt56; a column at <=767
 *   .journey-card.isdi       390 wide, flex-none, r16, clipped; 100% at <=767
 *   .journey-content.isdi-N  261px tall, white, 16px top corners, on one of three
 *                            stylesheet-painted blues
 *   .journey-year            28px/1.2, pt32 px24; 22px and pt22 at <=767
 *   .green-bg-blue-txt2.isdi white on #df287b, 24px/32 500, inline-block, p 8/24,
 *                            mt18 mb10; 18px at <=767, and from 1440 up its
 *                            right-hand corners are squared (a `min-width` rule)
 *   .journey-desc.isdi       14px/1.4 400, px24
 *   .journey-image           243px tall; `img.journey-img` 100% x 100% cover
 *
 * **The year's weight is per page, not per card.** The base `.journey-year` is 700
 * and `.journey-year.isdi` is 500; the Conclave's three cards carry the bare class
 * (the `.isdi-N` modifier sits on the panel, not on the year) and all four on the
 * Success Snapshot page carry `.isdi`. Invisible in a height diff, because
 * `.journey-content` is a declared 261px — it was caught by walking the card child
 * by child. Hence `yearWeight`, which defaults to the Conclave's 700.
 */
export const ZONE_BG = {
  'isdi-1': 'bg-[#2a60d9]',
  'isdi-2': 'bg-[#0038b1]',
  'isdi-3': 'bg-[#173a87]',
};

/*
 * `skin="isme"` — the ISME Summer School's "What a Day at Summer School Looks Like": the bare
 * `.journey-card` (square, nothing clipped), `.journey-content` on #1e48a7, the chip mint with
 * #072058 600 text, the description 500, and a `.journey-duration-block` row the ISDI cards do not
 * author (a 25px clock and an 18px/1.2 time, gap 4.5, mb13, px24). Measured at 1440 / 390.
 */
const SKIN = {
  isdi: { card: 'overflow-hidden rounded-2xl', panel: 'rounded-t-2xl', chip: 'bg-[#df287b] font-medium text-white', desc: 'font-normal' },
  isme: { card: '', panel: 'bg-[#1e48a7]', chip: 'bg-atlas-mint font-semibold text-[#072058]', desc: 'font-medium' },
};

export default function ZoneCard({ zone, yearWeight = 'bold', skin = 'isdi' }) {
  const sk = SKIN[skin] ?? SKIN.isdi;
  return (
    /* ref .journey-card.isdi */
    <div className={cx('w-[390px] flex-none max-md:w-full', sk.card)}>
      {/* ref .journey-content.isdi-N */}
      <div
        className={cx('h-[261px] text-white', sk.panel, skin === 'isdi' && (ZONE_BG[zone.tone] ?? ZONE_BG['isdi-1']))}
        style={zone.background ? { backgroundColor: zone.background } : undefined}
      >
        {/* ref .journey-year(.isdi) */}
        <div
          className={cx(
            'px-6 pt-8 text-[28px] leading-[1.2] max-md:pt-[22px] max-md:text-[22px]',
            yearWeight === 'medium' ? 'font-medium' : 'font-bold'
          )}
        >
          {zone.year}
        </div>
        {/* ref .green-bg-blue-txt2.isdi */}
        <div className={cx('mb-2.5 mt-[18px] inline-block px-6 py-2 text-[24px] leading-8 max-md:text-[18px] 2xl:rounded-r-none', sk.chip)}>
          {zone.chip}
        </div>
        {zone.duration && (
          /* ref .journey-duration-block — its declared `line-height: 1.2px` collapses the row to its
             25px icon */
          <div className="mb-[13px] flex items-center justify-start gap-[4.5px] px-6 leading-[1.2px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zone.duration.icon.src} alt={zone.duration.icon.alt} width={25} height={25} loading="lazy" className="h-[25px] w-[25px]" />
            <div className="text-[18px] leading-[1.2]">{withBreaks(zone.duration.text)}</div>
          </div>
        )}
        {/* ref .journey-desc.isdi */}
        <div className={cx('mb-0 px-6 text-[14px] leading-[1.4]', sk.desc)}>
          {withBreaks(zone.desc)}
        </div>
      </div>
      {/* ref .journey-image */}
      <div className="relative h-[243px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={zone.image.src}
          alt={zone.image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover max-md:w-full"
        />
      </div>
    </div>
  );
}
