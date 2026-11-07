import { CONTAINER } from '@/components/Home/SectionHead';

/**
 * `.container > .section.extraspace > .links-wrapper.no-mar` — the body shell of /terms-and-conditions
 * and /privacy-policy, under the /examination cover (components/ui/InnerPageHero).
 *
 * Measured on production at 1440 / 768 / 390:
 *   .section.extraspace   padding 120 0 60 → 40 0 at <=767, clipped (the box DocumentLinks uses)
 *   .links-wrapper        16px/24 Manrope #333 — the body's own type, so it needs no class
 */
export default function LegalSection({ children }) {
  return (
    <div className={CONTAINER}>
      {/* ref .section.extraspace > .links-wrapper.no-mar */}
      <div className="block overflow-hidden pb-[60px] pt-[120px] max-md:py-10">
        <div>{children}</div>
      </div>
    </div>
  );
}
