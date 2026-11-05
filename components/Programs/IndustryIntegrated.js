import { industryIntegrated } from '@/lib/homeContent';
import ProgramsSection from '@/components/Programs/ProgramsSection';
import SmartLink from '@/components/SmartLink';

/**
 * "Industry-Integrated" / "Postgraduate Programs for Real Careers" —
 * reference/index.php:1146-1495.
 *
 * The only one of the four carousels that deviates from the shared pattern:
 *
 *   - no school modifier on `.port-card-m-txt-wrap-atlas`, so the bar keeps
 *     its base #41418e and the notch its `currentColor` indigo
 *   - buttons stay on the base `.custombtnv2` teal (#5cbdca) — the white
 *     `.custombtnv3` the other three add is absent here
 *   - the AI-Driven Digital Branding programme appears twice, and the two
 *     halves swap at Bootstrap's `lg` (992px, which is also this project's):
 *     as a seventh card below it (`.d-block.d-lg-none`, handled by the card's
 *     `belowDesktopOnly` flag) and as the wide banner below, above it
 *     (`.d-none.d-lg-block`).
 *
 * The banner sits inside the section, after the slider, in its own
 * `.container.px-0.py-5.pb-0`: same 1366px max-width and centring as the
 * heading's container, but Bootstrap's `px-0` cancels the 62px side inset and
 * `py-5 pb-0` leaves 48px of space above it and none below (the section's own
 * 60px bottom padding closes it out).
 */
export default function IndustryIntegrated() {
  const { banner } = industryIntegrated;

  return (
    <ProgramsSection section={industryIntegrated}>
      {/* ref .container.px-0.py-5.pb-0.d-none.d-lg-block */}
      <div className="relative z-[1] mx-auto hidden max-w-[1366px] pt-12 lg:block">
        <SmartLink href={banner.href}>
          {/*
            Plain <img> for the same reason as ProgramCard: this is the
            reference's own single 1920x320 WebP, already sized for the slot,
            and `w-100 img-fluid` upstream is just width:100% / height:auto.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={banner.src}
            width={banner.width}
            height={banner.height}
            alt={banner.alt}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </SmartLink>
      </div>
    </ProgramsSection>
  );
}
