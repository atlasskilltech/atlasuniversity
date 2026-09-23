import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { SECTION } from './ui';

/**
 * The pink figures band and the recruiter logo strip under it — port of
 * reference/schools/isdi/index.php:3233-3259.
 *
 *   div.section > .strip-container-isdi > .strip-content > 5 x .strip-text-isdi
 *               > .slide-wrap.extra-padding > 12 x img.logo-img
 *
 * Measured:
 *                     >=992px                    <=991px            <=767px
 *   band              #df287b, two building      py40               py20; both
 *                     photos multiplied in,                         photos cover,
 *                     right / left, py82                            centred
 *   figures           a centred row              a centred column,  + mb32 each
 *                                                gap 20
 *   figure            px50, centred; value       same               21px/1.5;
 *                     44px/700, label 18px/400                      label 16px
 *   logo strip        5000px row, p40/40/20, logos 200px apart     80px apart
 *
 * The strip is Webflow interaction `a-22` fired on PAGE_START — 2184px of
 * linear travel over 30s that snaps back and repeats (sampled on the live page
 * at ~73px/s) — the project's existing `animate-slide-wrap` keyframe, first
 * ported for /success-stories-atlas. The last three logos carry no
 * `._50-r-m`, so they sit flush against each other, as authored.
 */

/* ref .strip-container-isdi */
const BAND =
  "flex items-center justify-center bg-[#df287b] bg-blend-multiply bg-no-repeat py-[82px] " +
  "bg-[url('/assets/images/schools/isdi/home/stats/building-bg-2.png'),url('/assets/images/schools/isdi/home/stats/building-bg.png')] " +
  'bg-[position:100%_100%,0px_100%] max-lg:py-10 max-md:bg-cover max-md:bg-center max-md:py-5';

export default function StatsStrip({ data }) {
  return (
    <div data-block="stats" className={SECTION}>
      <div className={BAND}>
        {/* ref .strip-content */}
        <div className="flex items-center justify-center max-lg:flex-col max-lg:gap-5">
          {data.stats.map((stat) => (
            /* ref .strip-text-isdi */
            <div
              key={stat.label}
              className="px-[50px] text-center text-[24px] font-medium leading-[1.5] max-md:mb-8"
            >
              <div className="text-[44px] font-bold leading-[1.5] text-white max-md:text-[21px] max-md:leading-[1.5]">
                {stat.value}
              </div>
              <div className="text-[18px] font-normal leading-[1.5] text-white max-md:text-base">
                {withBreaks(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ref .slide-wrap.extra-padding */}
      <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
        {data.logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={logo.src}
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className={cx('max-w-full align-middle', logo.spaced && 'mr-[200px] max-md:mr-20')}
          />
        ))}
      </div>
    </div>
  );
}
