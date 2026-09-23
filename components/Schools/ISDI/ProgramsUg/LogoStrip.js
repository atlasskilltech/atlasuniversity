import { cx } from '@/lib/cx';

/**
 * The startup logo strip between #3 and #4 — port of
 * reference/schools/isdi/programs/undergraduate/index.php:456-459
 * (`.scroll-overflow-hidden > .slide-wrap > 14 x img.logo-img._50-r-m`).
 *
 * `.slide-wrap` is a fixed 5000px row (p 40/40/20/40) moved by Webflow's IX2
 * action list `a-22`: `TRANSFORM_MOVE x -2184px over 30000ms`, then back to 0 —
 * the project's `animate-slide-wrap` keyframe, as on the ISDI homepage's figures
 * band and the About page's MoU tab. Each logo carries `margin-right: 200px`
 * (80px at <=767). Two of them carry an authored `height` (50 and 150) — Preflight's
 * `img { height: auto }` cancels the attribute, so those are restated inline, which is
 * what makes the strip 210px tall rather than 119.
 */
export default function LogoStrip({ logos }) {
  return (
    /* ref .scroll-overflow-hidden */
    <div data-block="logos" className="overflow-hidden">
      {/* ref .slide-wrap */}
      <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
        {/* the strip authors its seven logos twice, so the key carries the index */}
        {logos.map((logo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${i}-${logo.src}`}
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            style={logo.authoredHeight ? { height: logo.authoredHeight, width: 'auto' } : undefined}
            className={cx('max-w-full align-middle', logo.small && 'mr-[200px] max-md:mr-20')}
          />
        ))}
      </div>
    </div>
  );
}
