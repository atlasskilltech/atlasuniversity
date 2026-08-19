import SectionHeadWithButton from '@/components/Advantages/SectionHeadWithButton';
import { CONTAINER, SECTION, SUB_INNER_MRGBTM } from '@/components/Home/SectionHead';
import { cx } from '@/lib/cx';

/**
 * `.head-wrap.top` + `.sub-heading.mrgbtm` + a full-width YouTube embed — the
 * shape two sections of /advantages/atlas-advantages share:
 *
 *   "Learning Without Borders"   `atlas-advantages.php:608`  .center-image-full-wrap
 *   "Entrepreneurship at ATLAS"  `atlas-advantages.php:950`  .center-image-full-wrap-atlas
 *
 * The two wrappers differ in one property: the `-atlas` one carries the 32px
 * corners and clips, the plain one is square — hence `rounded`.
 *
 * The embed's own aspect comes from the reference's inline
 * `padding-top: 56.17021276595745%` on `.w-embed-youtubevideo`, transcribed as
 * written rather than rounded to 16:9.
 *
 * Both iframes point at the same video, which is the reference's own doing.
 * `autoplay=1&mute=1` is kept: a muted autoplay is what the reference ships and
 * is what browsers permit.
 *
 * `children` render under the embed, which is where "Learning Without Borders"
 * puts its three cards.
 */
export default function VideoSection({ heading, subheading, button, embed, rounded, children }) {
  return (
    /* ref section.section */
    <section className={SECTION}>
      {/* ref .container */}
      <div className={CONTAINER}>
        {/* ref .head-wrap.top */}
        <SectionHeadWithButton heading={heading} button={button} />

        {/* ref .sub-heading.mrgbtm */}
        <div className={SUB_INNER_MRGBTM}>{subheading}</div>

        {/* ref .center-image-full-wrap(-atlas) > .w-embed-youtubevideo */}
        <div
          className={cx(
            'relative',
            rounded && 'overflow-hidden rounded-tl-[32px] rounded-br-[32px]',
          )}
        >
          <div className="relative pt-[56.17021276595745%]">
            <iframe
              src={embed}
              title={heading}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute left-0 top-0 h-full w-full"
            />
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}
