import { cx } from '@/lib/cx';

/**
 * `.career-sup-card.ugdx` — a photograph over an indigo copy panel. Four uses:
 * /campus-atlas "Startup Incubators" (`campus-atlas.php:222-249`) and its
 * "Live Where You Learn" residences (`campus-atlas.php:261-288`), and
 * /life-at-atlas "Events organized by the Student Council"
 * (`life-at-atlas.php:545-573`) and its own "Live Where You Learn"
 * (`life-at-atlas.php:885-912`). Measured identical on both pages.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                    <=767px
 *   .common-flex-26-wrap     wrap, centred, gap 24,     same
 *                            align-start
 *   .career-sup-card.ugdx    398 x 622, column,         width 100%, height auto
 *                            border-top-left-radius 36,
 *                            clipped
 *   .career-sup-img          height 340                 240
 *   .csservice-card-main-img 100% x 101%, cover         object-position 50% 76%
 *   .css-content-wrapper     flex 1, padding 20 35 8    padding-bottom 20
 *                            #41418e + vector at
 *                            50% 100%, radius
 *                            bottom-right 36
 *   .cr-title.atlas          32px/1.3, 500, #fff        24px
 *   .cr-sub-desc.atlas       18px/1.5, 600, #5cbdca,    same
 *                            margin-top 16
 *   .cr-sub-desc.mt16        16px/1.3, margin-top 16    14px at 768-991,
 *                                                        16px/1.4 <=767
 *
 * The panel's vector artwork comes from `.css-content-wrapper.atlas-bg-1/-2`
 * in the stylesheet, so it travels as data — Tailwind cannot emit an arbitrary
 * background-image utility it never sees as a literal.
 */

/* the reference breaks some of this copy with <br>; the content keeps
   those as newlines */
const NEWLINE = '\n';

/* ref .common-flex-26-wrap */
export const SUPPORT_CARD_ROW = 'flex flex-wrap items-start justify-center gap-6';

const PANEL_BG = {
  'atlas-bg-1': '/assets/images/campus/cards/incub-bg-1.png',
  'atlas-bg-2': '/assets/images/campus/cards/vector-2-.png',
};

export default function SupportCard({ item }) {
  return (
    /* ref .career-sup-card.ugdx */
    <div className="flex h-[622px] w-[398px] flex-none flex-col items-stretch overflow-hidden rounded-tl-[36px] max-md:h-auto max-md:w-full">
      {/* ref .career-sup-img.atlas-link */}
      <div className="relative h-[340px] max-md:h-[240px]">
        {/* ref img.csservice-card-main-img */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image.src}
          alt={item.image.alt}
          loading="lazy"
          className="block h-[101%] w-full max-w-none object-cover max-md:object-[50%_76%]"
        />
      </div>

      {/* ref .css-content-wrapper.atlas-bg-* */}
      <div
        className="flex-1 rounded-br-[36px] bg-[#41418e] px-[35px] pb-2 pt-5 max-md:pb-5"
        style={{
          backgroundImage: `url(${PANEL_BG[item.variant]})`,
          backgroundPosition: '50% 100%',
        }}
      >
        {/* ref .cr-title.atlas */}
        <div className={cx('text-[32px] font-medium leading-[1.3] text-white max-md:text-[24px]')}>
          {item.title.map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>

        {/* ref .cr-sub-desc.atlas */}
        {item.lead && (
          <div className="mt-4 text-[18px] font-semibold leading-[1.5] text-atlas-cyan">
            {item.lead.split('\n').map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </div>
        )}

        {/* ref .cr-sub-desc.mt16 */}
        <div className="mt-4 text-[16px] leading-[1.3] text-white max-lg:text-[14px] max-md:text-[16px] max-md:leading-[1.4]">
          {item.text.split(NEWLINE).map((line, i) => (
            <span key={line}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
