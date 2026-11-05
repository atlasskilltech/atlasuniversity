import { successContent } from '@/lib/successContent';
import { CONTAINER, SECTION, H2, SUB_INNER } from '@/components/Home/SectionHead';

/**
 * "Startups" — port of `success-stories-atlas.php:101-109`
 * (`div#our-beliefs.section > .container > (h1.h2-tag.mrg32, .sub-heading,
 *   .startup-bg-block.atlas > .startup-hd-text.atlas)`).
 *
 * A heading, a lead, and one full-width photograph with a mint caption plate
 * pinned to its lower-left corner.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                          >=768px                    <=767px
 *   .startup-bg-block      602 tall, margin-top 56,   400 tall, cover,
 *     .atlas               background at 0 0 at its   centred
 *                          natural size, radius
 *                          32px 0, clipped
 *   .startup-hd-text       absolute left 0 bottom 46, 18px/1.5
 *     .atlas               padding 16 26 18,
 *                          24px/32, 700, #000 on
 *                          #5cbdca
 *
 * The photograph is painted by the stylesheet (`.startup-bg-block`'s own
 * `background-image`), never by markup, so it travels as data and is applied
 * inline — Tailwind cannot emit a background-image utility it never sees.
 *
 * The reference gives this block `id="our-beliefs"`, the same id as the section
 * above it. Kept on the first only.
 */
export default function Startups() {
  const { startups } = successContent;

  return (
    /* ref div#our-beliefs.section — duplicate id dropped */
    <div className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h1.h2-tag.mrg32 — rendered as <h2>: the hero owns the page's h1 */}
        <h2 className={`mb-8 ${H2}`}>{startups.heading}</h2>

        {/* ref .sub-heading */}
        <div className={SUB_INNER}>{startups.subheading}</div>

        {/* ref .startup-bg-block.atlas */}
        <div
          className="relative mt-14 h-[602px] overflow-hidden rounded-tl-[32px] rounded-br-[32px]
                     bg-[length:auto] bg-left-top bg-no-repeat
                     max-md:h-[400px] max-md:bg-cover max-md:bg-center"
          style={{ backgroundImage: `url(${startups.blockImage})` }}
        >
          {/* ref .startup-hd-text.atlas */}
          <div className="absolute bottom-[46px] left-0 bg-atlas-cyan px-[26px] pb-[18px] pt-4 text-[24px] font-bold leading-8 text-black max-md:text-[18px] max-md:leading-[1.5]">
            {startups.blockText}
          </div>
        </div>
      </div>
    </div>
  );
}
