import { campusContent } from '@/lib/campusContent';
import PrimaryButton from '@/components/ui/PrimaryButton';

/**
 * /campus-atlas hero — port of `campus-atlas.php:25-36`
 * (`.inner-header-wrapper.full-ht > (.inner-hero-wrapper > .hero-text,
 *   img.header-image-inner)`).
 *
 * A full-viewport photograph with a scrim over its lower 60%, carrying the
 * title and one call-to-action, flush left rather than in a container — the
 * reference pads the scrim itself instead of nesting a `.container`.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=992px                >=768px      <=767px
 *   .inner-header-wrapper  100vh, clipped         same         same
 *   .header-image-inner    100% x 100%, cover     same         same
 *   .inner-hero-wrapper    top 40%, height 60%,   same         padding-left 22
 *                          padding 0 0 64 64,
 *                          #0000 -> #000000fc 92% -> #000 99%
 *   .hero-text             max-width 840          same         704 (<=479)
 *   .h1-tag                56px/1.2, 400          44px         28px/1.5, 600
 *   .buttons-wrapper       row, gap 16, pt 30     gap 8        column, gap 8,
 *                                                              pt 24 (14 <=479)
 *
 * The fixed header overlays this section — its bars are translucent — so the
 * page renders no header spacer above it, exactly as the homepage hero does.
 */
export default function CampusHero() {
  const { hero } = campusContent;

  return (
    /* ref .inner-header-wrapper.full-ht */
    <div className="relative h-screen w-full overflow-hidden">
      {/* ref img.header-image-inner */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.image.src}
        srcSet={hero.image.srcSet}
        sizes="(max-width: 1366px) 100vw, 1366px"
        alt={hero.image.alt}
        className="block h-full w-full object-cover"
      />

      {/* ref .inner-hero-wrapper */}
      <div
        className="absolute inset-x-0 top-[40%] z-[1] flex h-[60%] items-end pb-16 pl-16
                   bg-[linear-gradient(#0000,#000000fc_92%,#000_99%)]
                   max-md:pl-[22px]"
      >
        {/* ref .hero-text */}
        <div className="max-w-[840px] max-sm:max-w-[704px]">
          {/* ref h1.h1-tag */}
          <h1
            className="m-0 text-[56px] font-normal leading-[1.2] text-white
                       max-lg:text-[44px]
                       max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]"
          >
            {hero.title.map((line, i) => (
              <span key={line}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>

          {/* ref .buttons-wrapper */}
          <div
            className="flex items-center gap-4 pt-[30px]
                       max-lg:gap-2
                       max-md:flex-col max-md:items-start max-md:justify-start max-md:pt-6
                       max-sm:pt-[14px]"
          >
            <PrimaryButton href={hero.button.href}>{hero.button.label}</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
