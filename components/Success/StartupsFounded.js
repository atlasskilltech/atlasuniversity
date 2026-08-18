import { successContent } from '@/lib/successContent';
import GridGallery from '@/components/ui/GridGallery';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Startups founded by ATLAS ISME Alumni" — port of
 * `success-stories-atlas.php:110-166` (`.section > .container >
 * (h2.h2-tag.mrg16, .sub-heading, .grid-gallery > 8 x .grid-card,
 *  .slide-wrap > 8 x img.logo-img._50-r-m)`).
 *
 * The masonry wall is the shared `GridGallery`; below it runs the founders'
 * company logos.
 *
 * ── The logo strip is an animation, not a static row ───────────────────────
 * `.slide-wrap` is a 5000px flex row of 149x59 logos spaced 200px apart (80px
 * below 768px) with `padding: 40px 40px 20px`. Webflow drives it from IX2
 * action list `a-22` ("marquee-swiper"), fired on this page's `PAGE_START`:
 * `TRANSFORM_MOVE x -2184px over 30000ms` with an empty easing (linear),
 * followed by `x 0 over 0ms` — a 30s constant-velocity travel that snaps back
 * and repeats. It is transcribed as the `animate-slide-wrap` keyframe.
 *
 * The travel distance is the designer's own number rather than the track's
 * content width, so the loop visibly restarts; that is the reference's
 * behaviour and it is reproduced rather than smoothed.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   .grid-card-name.atlas  20px/24, 700, #5cbdca      same
 *   .title-txt-grid        18px/32, 500, #fff         16px/24
 *   .logo-img._50-r-m      margin-right 200           80
 */
export default function StartupsFounded() {
  const { startupGrid } = successContent;

  return (
    /* ref .section */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{startupGrid.heading}</h2>

        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{startupGrid.subheading}</div>

        {/* ref .grid-gallery */}
        <GridGallery
          cards={startupGrid.cards}
          name="z-[3] text-xl font-bold leading-6 text-atlas-cyan"
          caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-[16px] max-md:leading-6"
        />

        {/* ref .slide-wrap */}
        <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
          {startupGrid.logos.map((logo) => (
            /* ref img.logo-img._50-r-m */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="mr-[200px] max-md:mr-20 max-md:max-w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
