import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ButtonRegular from '@/components/ui/ButtonRegular';
import { CONTAINER } from '../Home/ui';

/**
 * Eligibility — `assets/include/ug-bdes-eligibility.php`, the blue band every B.Des
 * page carries (b-des/accessory-design-&-craft.php:2350-2353).
 *
 *   section.section.blue-bg > .container > .el-wrapper
 *     > .elig-cont  .el-title + 5 x .elig-point-wrap (.el-sub-title + ul.list)
 *     > .appl-cont  3 x .application-points (.el-title + .el-desc + .el-btn-wrap)
 *
 * ── Measured at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────────────────────
 *   section          #193e90, the ISDI 50px padding, and 60px of margin below it
 *                    (dropped at <=767) — the only section on the page with one
 *   .el-wrapper      row; a column at <=767
 *   .elig-cont       794 wide, flex-none, pr56 (dropped at <=479)
 *   .appl-cont       fills the rest behind a 1px #ffffff4d rule on its left and
 *                    56px of padding; at <=767 the rule moves to the top (solid
 *                    white there) and the padding becomes 40px above
 *   .el-title.isdi   24px/1.5 500, pb16 -> 18px/1 at <=767
 *   .el-sub-title    16px/1.5 500 -> 14px/1.5
 *   ul.list          a 5px-gap column, padding 12/56/0/40 -> 12/20/0/20 at <=479,
 *                    mb10; the markers are the browser's own discs
 *   .el-desc         16px/1.5 -> 14px/1.5
 *   .el-btn-wrap     row, gap 16, pt16; a 10px-gap column at <=479
 *
 * The list items carry authored `<br>`s — two blank lines inside the A-Levels
 * item — so every one runs through `withBreaks`.
 */
export default function Eligibility({ data }) {
  return (
    /* ref section.section.blue-bg */
    <section data-block="eligibility" className="block overflow-hidden bg-[#193e90] py-[50px] text-white mb-[60px] max-md:mb-0">
      <div className={CONTAINER}>
        {/* ref .el-wrapper */}
        <div className="flex max-md:flex-col">
          {/* ref .elig-cont — `flex: none` with no width, so the column is sized by its
              own longest line (794.4 at 1440); a fixed width rounds that off and rewraps */}
          <div className="flex-none pr-14 max-md:w-full max-sm:pr-0">
            <div className="pb-4 text-[24px] font-medium leading-6 max-md:text-[18px] max-md:leading-[18px]">
              {data.title}
            </div>

            {data.groups.map((group) => (
              /* ref .elig-point-wrap */
              <div key={group.title} className="mb-5">
                {/* ref .el-sub-title */}
                <div className="text-base font-medium leading-[1.5] max-md:text-[14px] max-md:leading-[1.5]">
                  {group.title}
                </div>
                {/* ref .el-subdesc — a second title line on the IB group. The B.Des pages
                    author one; the B.Tech pages author four with `<br>`s between them, and a
                    `<br>` between two block boxes is a real empty line. So `subdescs` is an
                    ordered run list (a string is a paragraph, null is that break) and
                    `subdesc` stays as the single-line shorthand. */}
                {(group.subdescs?.length ? group.subdescs : [group.subdesc].filter(Boolean)).map(
                  (run, i) =>
                    run === null ? (
                      <br key={`br-${i}`} />
                    ) : (
                      <div
                        key={`${i}-${run.slice(0, 24)}`}
                        className="text-base font-light leading-[1.5] max-md:text-[14px] max-md:leading-[1.5]"
                      >
                        {withBreaks(run)}
                      </div>
                    )
                )}
                {/* ref ul.list (+ .less-space) — Preflight zeroes the UA's 40px list
                    indent and the discs, both of which the reference keeps */}
                <ul
                  className={cx(
                    'mb-2.5 flex list-disc flex-col items-start gap-[5px] pb-0 pl-10 pr-14 max-sm:px-5',
                    group.lessSpace ? 'pt-2' : 'pt-3'
                  )}
                >
                  {group.items.map((item, i) => (
                    <li key={i} className="list-item">
                      {withBreaks(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ref .appl-cont */}
          <div className="border-0 border-l border-solid border-[#ffffff4d] pl-14 max-md:border-l-0 max-md:border-t max-md:border-white max-md:pl-0 max-md:pt-10">
            {data.application.map((block) => (
              /* ref .application-points(.mrgbt-32) */
              <div key={block.title} className={cx(block.spaced && 'mb-8')}>
                <div className="pb-4 text-[24px] font-medium leading-6 max-md:text-[18px] max-md:leading-[18px]">
                  {block.title}
                </div>
                {/* ref .el-desc */}
                <div className="text-base leading-[1.5] max-md:text-[14px] max-md:leading-[1.5]">{block.text}</div>

                {block.buttons.length > 0 && (
                  /* ref .el-btn-wrap */
                  <div className="flex items-start gap-4 pt-4 max-sm:flex-col max-sm:gap-2.5">
                    {block.buttons.map((button) => (
                      <ButtonRegular key={button.label} href={button.href} variant="isdi-outline-white">
                        {button.label}
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
