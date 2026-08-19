import { collaborate } from '@/lib/multidisciplinaryContent';
import { CONTAINER, SECTION, H2, SUB_H2 } from '@/components/Home/SectionHead';

/**
 * "Collaborate. Co-Create. Cross Boundaries" — port of
 * `atlas-multidisciplinary.php:311-328`
 * (`section.section > .container > (h2.h2-tag.mrg16, h2.sub-heading,
 *   2 x .common-wrapper > (h2.h3-tag.black,
 *     .center-image-full-wrap-atlas > .w-embed-youtubevideo > iframe))`).
 *
 * A heading and a lead over two titled YouTube embeds stacked one above the
 * other. `components/Advantages/VideoSection` is the same idea with a button
 * and a single embed, and it puts its heading in a `SectionHeadWithButton`;
 * this shape — a titled `.common-wrapper` per video, repeated — is its own.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                                >=768px             <=767px
 *   .common-wrapper              padding-top 56      40
 *   h2.h3-tag.black              32px/1.2, 500,      22px
 *                                #2b2b2b, mb 32
 *   .center-image-full-wrap-…    radius 32/0, clipped
 *   .w-embed-youtubevideo        56.17021276595745% padding-top, transcribed
 *                                as written rather than rounded to 16:9
 *
 * `autoplay=1&mute=1` is what the reference ships on both embeds, and a muted
 * autoplay is what browsers permit — kept as authored.
 */
export default function Collaborate() {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16 */}
        <h2 className={`mb-4 max-md:mb-2 ${H2}`}>{collaborate.heading}</h2>

        {/* ref h2.sub-heading — a lead, not a heading, but an <h2> upstream, so
            Webflow's base `margin: 20px 0 10px` applies */}
        <div className={SUB_H2}>{collaborate.subheading}</div>

        {collaborate.videos.map((video) => (
          /* ref .common-wrapper */
          <div key={video.embed} className="pt-14 max-md:pt-10">
            {/* ref h2.h3-tag.black */}
            <h3 className="mb-8 mt-0 text-[32px] font-medium leading-[1.2] text-[#2b2b2b] max-md:text-[22px]">
              {video.title}
            </h3>

            {/* ref .center-image-full-wrap-atlas > .w-embed-youtubevideo */}
            <div className="relative overflow-hidden rounded-tl-[32px] rounded-br-[32px]">
              <div className="relative pt-[56.17021276595745%]">
                <iframe
                  src={video.embed}
                  title={video.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute left-0 top-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
