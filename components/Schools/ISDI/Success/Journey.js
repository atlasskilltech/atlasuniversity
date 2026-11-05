import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import ZoneCard from '../ZoneCard';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "The 4-Year Journey to Success" (`success-snapshot/index.php`, block 4).
 *
 *   section.section > .container > (h2.h2-tag.isdi,
 *     .journey-wrapper.mrgtp > 3 x .journey-card.isdi,
 *     .jpurney-card-large.isdi-2 > (.journey-year.isdi, .green-bg-blue-txt-long.isdi,
 *       .journey-desc-large, .journey-card-large > 3 x .journey-card-lg-img),
 *     .center-image-full-wrap.mrgtp.isdi > .w-embed-youtubevideo)
 *
 * The three year cards are the shared `../ZoneCard` — the ATLAS HR Conclave's shape
 * — but these carry `.journey-year.isdi`, which is **weight 500** where the bare
 * class the Conclave uses is 700. `.journey-content` is a declared 261px, so that
 * difference costs no height and shows only in a per-element compare.
 *
 * ── The fourth year is its own card, measured at 1440 / 768 / 390 ─────────
 *   .jpurney-card-large.isdi-2    block, #0038b1, r16, clipped, mt32
 *   .journey-year.isdi            28px/1.2 500, pt32 px24; 22px and pt22 at <=767
 *   .green-bg-blue-txt-long.isdi  inline-block, white on #ec1376, 24px/32 500,
 *                                 p 8/24, mt18 mb10; 18px at <=767
 *   .journey-desc-large           14px/1.5 500, pt8 px24
 *   .journey-card-large           flex, mt48; a CENTRED COLUMN at <=767
 *   .journey-card-lg-img          `flex: 0 auto` — no width of its own, so the
 *                                 three photographs shrink to share the row
 *                                 (413px each at 1440, 236 at 768)
 *
 * The closing frame is the same `.center-image-full-wrap.mrgtp.isdi` The ISDI
 * Advantage carries: only the `.isdi` instance is rounded, and the embed's height
 * is an inline `padding-top` percentage — 56.17%, not 16:9, as authored.
 */
export default function Journey({ data }) {
  return (
    <section data-block="journey" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>

        {/* ref .journey-wrapper.mrgtp */}
        <div className="mt-14 flex gap-8 max-md:flex-col">
          {data.zones.map((zone) => (
            <ZoneCard key={zone.year} zone={zone} yearWeight="medium" />
          ))}
        </div>

        {/* ref .jpurney-card-large.isdi-2 */}
        <div
          className="mt-8 overflow-hidden rounded-2xl text-white"
          style={{ backgroundColor: data.large.tone }}
        >
          {/* ref .journey-year.isdi */}
          <div className="px-6 pt-8 text-[28px] font-medium leading-[1.2] max-md:pt-[22px] max-md:text-[22px]">
            {data.large.year}
          </div>
          {/* ref .green-bg-blue-txt-long.isdi */}
          <div className="mb-2.5 mt-[18px] inline-block bg-[#ec1376] px-6 py-2 text-[24px] font-medium leading-8 text-white max-md:text-[18px]">
            {data.large.chip}
          </div>
          {/* ref .journey-desc-large */}
          <div className="px-6 pt-2 text-[14px] font-medium leading-[1.5]">
            {withBreaks(data.large.desc)}
          </div>
          {/* ref .journey-card-large */}
          <div className="mt-12 flex max-md:flex-col max-md:items-center max-md:justify-center">
            {data.large.images.map((image, i) => (
              /* ref .journey-card-lg-img — `flex: 0 auto`, so the photograph's own
                 width is the basis and the three shrink to share the row */
              <div key={`${i}-${image.src}`} className="flex-initial">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="block max-w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ref .center-image-full-wrap.mrgtp.isdi — mt56 / mb5, and mt40 at <=767;
            only the `.isdi` instance is rounded */}
        <div className="relative mb-[5px] mt-14 overflow-hidden rounded-2xl max-md:mt-10">
          {/* ref .w-embed-youtubevideo — its height is the authored padding-top */}
          <div className="relative w-full" style={{ paddingTop: data.video.padTop }}>
            <iframe
              src={data.video.src}
              title={data.video.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
