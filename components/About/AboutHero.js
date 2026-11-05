import { aboutContent } from '@/lib/aboutContent';

/**
 * About Us hero — port of `about-us.php:48-61`
 * (`.inner-header-wrapper.full-ht > (.inner-header-cover > .container, img.inner-cover-image)`).
 *
 * A full-viewport-height photograph with a bottom-anchored scrim carrying the
 * title block on the left and a paragraph on the right.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                            >=768px                     <=767px
 *   .inner-header-wrapper    height 100vh, clipped       same
 *   .inner-cover-image       100% x 100%, cover          same
 *   .inner-header-cover      bottom half only (500px     full height, so the
 *                            of a 1000px hero),          gradient runs the
 *                            transparent -> rgba(0,0,0,  whole hero
 *                            .9), padding-bottom 56
 *   .container               row, space-between,         column, gap 22,
 *                            align-end, gap 100          align-start
 *   .h1-tag                  56px/1.2, 400               28px/1.5, 600
 *   .h3-sub-header           32px/1.2, 500, mt 16        22px/1.2, mt 16
 *   .inner-cover-text        430px wide, 18px/1.6, 300   full width, 18px/1.6
 *
 * The cover is `position: absolute; top: 500px; height: 500px` on desktop —
 * i.e. exactly the lower half — and `inset: 0` below 768px. `top-1/2 h-1/2`
 * reproduces the desktop half without hard-coding the 1000px viewport it was
 * measured at.
 */
export default function AboutHero() {
  const { hero } = aboutContent;

  return (
    /* ref .inner-header-wrapper.full-ht */
    <div className="relative h-screen w-full overflow-hidden">
      {/* ref img.inner-cover-image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes="(max-width: 1366px) 100vw, 1366px"
        alt={hero.image.alt}
        className="h-full w-full object-cover"
      />

      {/* ref .inner-header-cover */}
      <div className="absolute inset-x-0 top-1/2 z-[1] flex h-1/2 items-end bg-gradient-to-b from-transparent to-black/90 pb-14 max-md:inset-0 max-md:h-auto">
        {/* ref .container */}
        <div className="relative z-[1] mx-auto flex w-full max-w-[1366px] items-end justify-between gap-[100px] px-[62px] max-lg:px-[30px] max-md:flex-col max-md:items-start max-md:gap-[22px] max-md:px-[22px]">
          <div>
            {/* ref h1.h1-tag */}
            <h1 className="text-[56px] font-normal leading-[1.2] text-white max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]">
              {hero.title}
            </h1>
            {/* ref h1.h3-sub-header — a second <h1> in the reference; rendered
                here as the <p> it actually is, so the page keeps one <h1> */}
            <p className="mt-4 text-[32px] font-medium leading-[1.2] text-white max-md:text-[22px]">
              {hero.subtitle.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* ref .inner-cover-text */}
          <div className="w-[430px] flex-none text-lg font-light leading-[1.6] text-white max-md:w-full">
            {hero.text}
          </div>
        </div>
      </div>
    </div>
  );
}
