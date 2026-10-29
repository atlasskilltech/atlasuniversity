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

export default function ZoneCard({ zone, yearWeight = 'bold' }) {
  return (
    /* ref .journey-card.isdi */
    <div className="w-[390px] flex-none overflow-hidden rounded-2xl max-md:w-full">
      {/* ref .journey-content.isdi-N */}
      <div
        className={cx('h-[261px] rounded-t-2xl text-white', ZONE_BG[zone.tone] ?? ZONE_BG['isdi-1'])}
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
        <div className="mb-2.5 mt-[18px] inline-block bg-[#df287b] px-6 py-2 text-[24px] font-medium leading-8 text-white max-md:text-[18px] 2xl:rounded-r-none">
          {zone.chip}
        </div>
        {/* ref .journey-desc.isdi */}
        <div className="mb-0 px-6 text-[14px] font-normal leading-[1.4]">
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
