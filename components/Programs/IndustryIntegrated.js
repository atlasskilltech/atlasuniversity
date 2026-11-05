import { industryIntegrated } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';
import SmartLink from '@/components/SmartLink';

/**
 * "Industry-Integrated" / "Postgraduate Programs for Real Careers" —
 * reference/assets/include/home-card.php:1601-2449 (included at index.php:248).
 *
 * The only one of the four carousels that deviates from the shared pattern:
 *
 *   - no school modifier on `.port-card-m-txt-wrap-atlas`, so the bar keeps
 *     its base #41418e and the notch its `currentColor` indigo
 *   - buttons stay on the base `.custombtnv2` teal (#5cbdca) — the white
 *     `.custombtnv3` the other three add is absent here
 *   - it closes with two banners (BBA LL.B. (Hons.), then the ATLAS Hackathon
 *     2026 strip), shown at every width.
 *
 * Each banner sits inside the section, after the slider, in its own
 * `.container.px-0.py-5.pb-0`: same 1366px max-width and centring as the
 * heading's container, but Bootstrap's `px-0` cancels the side inset at every
 * width (so below 1366 the banner runs edge to edge) and `py-5 pb-0` leaves
 * 48px above it and none below (the section's own bottom padding closes it
 * out). Measured on the reference: 1366x228 at 1440, 1100x184 at 1100,
 * 768x768 at 768, 390x390 at 390, each with 48px of top padding.
 *
 * The `<picture>` keeps the reference's own four media queries. Every
 * `<source>` carries its file's intrinsic width/height, so the browser reserves
 * a 6:1 box above 768px and a square one below it before the bytes arrive — no
 * layout shift when the art direction switches shape.
 */
export default function IndustryIntegrated() {
  const { banners } = industryIntegrated;

  return (
    <ProgramsSection section={industryIntegrated}>
      {banners.map((banner) => (
        /* ref .container.px-0.py-5.pb-0 */
        <div key={banner.href} className="relative z-[1] mx-auto max-w-[1366px] pt-12">
          <SmartLink href={banner.href} className="block">
            {/*
              Plain <picture>/<img>, not next/image: these are the reference's
              own pre-sized WebP renditions, chosen by media query, and
              `w-100 img-fluid` upstream is just width:100% / height:auto.
            */}
            <picture>
              {banner.sources.map((source) => (
                <source
                  key={source.media}
                  media={source.media}
                  srcSet={source.src}
                  width={source.width}
                  height={source.height}
                />
              ))}
              <img
                src={banner.fallback.src}
                width={banner.fallback.width}
                height={banner.fallback.height}
                alt={banner.alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </picture>
          </SmartLink>
        </div>
      ))}
    </ProgramsSection>
  );
}
