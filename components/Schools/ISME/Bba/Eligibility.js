import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import Runs from './Runs';
import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * The blue eligibility band — `section.section.blue-bg > .container > .el-wrapper > (.elig-cont,
 * .appl-cont)`. The ISDI programme pages' `ProgramDetail/Eligibility` is the same markup on the
 * ISDI sheet; the ISME sheet differs in the section rhythm, the mint 700 titles, the column split
 * and the square outline buttons, so it is drawn here.
 *
 * Rules, from the page's sheet:
 *   section.blue-bg     #193e90 white, py60 (40 at <=767), mb60 (0 at <=767)
 *   .el-wrapper         row; column at <=767
 *   .elig-cont          flex none, pr56 (0 at <=479). 40% wide (100% at <=768 — inclusive, a
 *                       plain `max-width` query) only where the page's own <style> says so (the
 *                       major/minor pages, `data.split`); elsewhere it is content-width, and a full-
 *                       width row below 768 once the band stacks
 *   .el-title           24px/1 700 mint, pb16 -> 18px (<=767)
 *   .elig-point-wrap    mb20
 *   .el-sub-title       700 (the later declaration), 14px at <=767
 *   ul.list             flex column, gap 5, pt5 pr56 pl20 at EVERY width (the later `.list` and
 *                       `.list-bullet-padding` beat the <=479 px20); discs (computed) everywhere
 *   .appl-cont          1px rgba(255,255,255,.3) rule on the left, pl56; at <=767 a solid
 *                       white rule on top, pt40, pl0
 *   .application-points mb32 where `.mrgbt-32`
 *   .el-desc            16px/1.5 -> 14 (<=767)
 *   .el-btn-wrap        row, gap 16, pt16, start; a 10px-gap column at <=479
 */

const TITLE = 'pb-4 text-[24px] font-bold leading-none text-atlas-mint max-md:text-[18px]';

export default function Eligibility({ data }) {
  const mba = data.sheet === 'mba' || data.sheet === 'bsc';
  /* the B.Sc pages load a Webflow `ul, ol { padding-left: 40px; margin-bottom: 10px }` AFTER Tailwind's
     preflight, so their lists are indented 40 (px20 at <=479, `.list`'s own rule) with a 10px bottom
     margin and discs at every width — measured at 1440 / 768 / 390 */
  const bsc = data.sheet === 'bsc';
  return (
    /* ref section.section.blue-bg */
    <section data-block="eligibility" className="mb-[60px] block overflow-hidden bg-[#193e90] py-[60px] text-white max-md:mb-0 max-md:py-10">
      <div className={CONTAINER}>
        {/* ref .el-wrapper */}
        <div className="flex max-md:flex-col">
          {/* ref .elig-cont */}
          <div
            className={cx(
              'flex-none pr-14 max-sm:pr-0',
              data.split === 767
                ? 'w-[40%] max-md:w-full' /* B.Sc Finance: a bare `.elig-cont` rule, full width at <=767 */
                : data.split !== false
                  ? 'w-[40%] [@media(max-width:768px)]:w-full'
                  : 'w-auto max-md:w-full'
            )}
          >
            <div className={TITLE}>{data.title}</div>
            {data.groups.map((g, gi) => (
              /* ref .elig-point-wrap(.max-wdth) — `.max-wdth` is 400 wide (the MBA pages) */
              <div key={`${gi}-${g.title}`} className={cx('mb-5', g.narrow && 'w-[400px] max-w-full')}>
                {g.title != null && (
                  /* ref .el-sub-title(.bold) — the BBA sheet's later rule makes every one 700; the MBA
                     sheet stops at 500 and only `.bold` is 700 */
                  <div
                    className={cx(
                      'max-md:text-[14px] max-md:leading-[1.5]',
                      mba && !g.titleBold ? 'font-medium' : 'font-bold'
                    )}
                  >
                    {withBreaks(g.title)}
                  </div>
                )}
                {g.subText != null && (
                  /* ref .el-sub-text — line-height 2 */
                  <div className="leading-[2]">{withBreaks(g.subText)}</div>
                )}
                {/* ref ul.list(.list-bullet-padding) — the BBA sheet's later `.list` is pt5 pr56 at every
                    width with discs; the MBA sheet's is pt12 pr56 (px20 at <=479), discs from 1440 up */}
                <ul
                  className={cx(
                    'mt-0 flex flex-col items-start gap-[5px] pb-0 pr-14',
                    bsc
                      ? 'mb-2.5 list-disc pl-10 pt-3 max-sm:px-5'
                      : mba
                      ? 'mb-0 list-none pl-0 pt-3 2xl:list-disc max-sm:px-5'
                      : cx('mb-0 list-disc pt-[5px]', g.bulletPadding !== false ? 'pl-5' : 'pl-0')
                  )}
                >
                  {g.items.map((item, i) => (
                    /* ref li(.gap-list) — mb24 */
                    <li key={i} className={cx(g.itemGap?.[i] && 'mb-6')}>
                      <Runs runs={item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ref .appl-cont */}
          <div className="border-0 border-l border-solid border-[rgba(255,255,255,0.3)] pl-14 max-md:border-l-0 max-md:border-t max-md:border-white max-md:pl-0 max-md:pt-10">
            {data.application.map((ap) => (
              /* ref .application-points(.mrgbt-32) */
              <div key={ap.title} className={cx(ap.spaced && 'mb-8')}>
                <div className={TITLE}>{ap.title}</div>
                <div className="text-base leading-[1.5] max-md:text-[14px]">{withBreaks(ap.text)}</div>
                {ap.buttons.length > 0 && (
                  /* ref .el-btn-wrap */
                  <div className="flex items-start gap-4 pt-4 max-sm:flex-col max-sm:gap-2.5">
                    {ap.buttons.map((b) => (
                      <ButtonRegular key={b.label} href={b.href} variant="isme-outline-square" newTab={b.target === '_blank'} labelSize={b.fontSize}>
                        {b.label}
                      </ButtonRegular>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
