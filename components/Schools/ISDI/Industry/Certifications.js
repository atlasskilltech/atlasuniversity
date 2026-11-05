import IconSection from '../About/IconSection';
import { CONTAINER } from '../Home/ui';
import { COMMON_WRAPPER, LogoStrip, Runs, SUB_1 } from './ui';

/**
 * "Industry Certifications" (`industry-centric-approach.php`, block 14).
 *
 *   section.section > (.icon-heading > (plate, title, a.button-regular),
 *     .container > .common-wrapper > .sub-heading-1,
 *     .slide-wrap.extra-padding > 12 x img.logo-img)
 *
 * The marquee is a direct sibling of `.container`, so it runs the full width —
 * the same `animate-slide-wrap` row the figures band above it uses.
 */
export default function Certifications({ data, button }) {
  return (
    <IconSection
      block="certifications"
      icon={data.icon.image}
      title={data.icon.title}
      tone="none"
      headingAfter={button}
    >
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .common-wrapper */}
        <div className={COMMON_WRAPPER}>
          <div className={SUB_1}>
            <Runs value={data.lead} />
          </div>
        </div>
      </div>

      {/* ref .slide-wrap.extra-padding */}
      <div className="overflow-hidden">
        <LogoStrip logos={data.logos} />
      </div>
    </IconSection>
  );
}
