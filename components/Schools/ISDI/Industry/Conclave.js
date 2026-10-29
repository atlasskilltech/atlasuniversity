import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import PhotoGallery from '../PhotoGallery';
import ZoneCard from '../ZoneCard';
import { CONTAINER, H2, H2_MB, SUB_MRGBTM } from '../Home/ui';
import { COMMON_WRAPPER, COMMON_WRAPPER_LG, Runs, SUB_1 } from './ui';

/**
 * The events band (`industry-centric-approach.php`, block 8) — `div.white-wrapper
 * > .container > SEVEN sibling wrappers`, not one.
 *
 * **Reading only the first wrapper gets this block 6,487px short.** The block
 * opens with the ATLAS HR Conclave in a `.common-wrapper`, and six further events
 * follow it in `.common-wrapper-lg`s: Creative Catalyst, What Design Can Do, the
 * ATLAS International Design Conference, Creative Capital, Transforming Roles in
 * Design and ConServ. Each is the same head — `h2.h2-tag.mrg16.isdi`,
 * `.sub-heading.mrgbtm`, `.sub-heading-1` — over one of four bodies:
 *
 *   zones    the Conclave's three `.journey-card.isdi`s
 *   image    a single `.center-image-full-wrap.mrgtp`
 *   columns  a `.grid-gallery-flex` photo wall (`PhotoGallery`)
 *   none     ConServ closes the band with a heading and two paragraphs only
 *
 * `.white-wrapper` is `overflow: hidden; color: #000`, and there is no
 * `.icon-heading` above it, so it is rendered here rather than through
 * `About/IconSection`.
 *
 * ── Measured on production at 1440 / 1280 / 991 / 767 / 479 / 390 ─────────
 *   .common-wrapper          pt50 (the page's inline `<style>` beats the sheet)
 *   .common-wrapper-lg       pt100
 *   .journey-wrapper.mrgtp   flex, gap 32, mt56; a column at <=767
 *   .journey-card.isdi       390 wide, flex-none, r16, clipped; 100% at <=767
 *   .journey-content.isdi-N  261px tall, white on #2a60d9 / #0038b1 / #173a87,
 *                            16px top corners
 *   .journey-year            28px/1.2 **700**, pt32 px24; 22px and pt22 at <=767.
 *                            The sheet's `.journey-year.isdi` is the 500 one and
 *                            these are NOT on it — the `.isdi-N` modifier is on
 *                            the panel, not on the year. Invisible in a height
 *                            diff, because `.journey-content` is a fixed 261px.
 *   .green-bg-blue-txt2.isdi white on #df287b, 24px/32 500, inline-block, p 8/24,
 *                            mt18 mb10; 18px at <=767. From 1440 up its right-hand
 *                            corners are squared — a `min-width` rule
 *   .journey-desc.isdi       14px/1.4 400, px24
 *   .journey-image           243px tall; `img.journey-img` 100% x 100% cover
 *   .grid-gallery-flex.mrgtp mt56, 0 at <=767 — three of the four walls carry it,
 *                            the fourth is an `.instagram-wrapper` (mt56 / mt32)
 *                            with the gallery class on the SAME element
 *
 * The three zone colours are painted by the stylesheet, so each travels as its
 * measured tone.
 */
function Zones({ zones }) {
  return (
    /* ref .journey-wrapper.mrgtp */
    <div className="mt-14 flex gap-8 max-md:flex-col">
      {zones.map((zone) => (
        /* ref .journey-card.isdi — the shared card; these three carry the BARE
           `.journey-year`, which is 700 (`.journey-year.isdi` is the 500 one) */
        <ZoneCard key={zone.year} zone={zone} />
      ))}
    </div>
  );
}

export default function Conclave({ data }) {
  return (
    /* ref div.white-wrapper */
    <div data-block="conclave" className="overflow-hidden text-black">
      {/* ref .container */}
      <div className={CONTAINER}>
        {data.wrappers.map((w, i) => (
          /* ref .common-wrapper / .common-wrapper-lg */
          <div key={`${i}-${w.heading}`} className={w.lg ? COMMON_WRAPPER_LG : COMMON_WRAPPER}>
            <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(w.heading)}</h2>
            <div className={SUB_MRGBTM}>
              <Runs value={w.sub} />
            </div>
            <div className={SUB_1}>
              <Runs value={w.lead} />
            </div>

            {w.image && (
              /* ref .center-image-full-wrap.mrgtp */
              <div className="relative mb-[5px] mt-14 overflow-hidden max-md:mt-10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image.src}
                  srcSet={w.image.srcSet}
                  sizes={w.image.sizes}
                  alt={w.image.alt}
                  loading="lazy"
                  decoding="async"
                  /* the two conclave images carry NO class, so they paint at their
                     intrinsic width capped by Preflight's `max-width: 100%` — 1240
                     and 1239 inside a 1242 frame. Forcing `w-full` stretched them
                     by 0.8 and 1.3px of height. */
                  className="relative block max-w-full"
                />
              </div>
            )}

            {w.zones && <Zones zones={w.zones} />}

            {w.columns && (
              /* ref .grid-gallery-flex.mrgtp, or an `.instagram-wrapper` carrying
                 the gallery class itself */
              <PhotoGallery
                columns={w.columns}
                variant={w.galleryMerged ? 'merged' : 'nested'}
                className={w.galleryMrgtp ? 'mt-14 max-md:mt-0' : 'mt-14 max-md:mt-8'}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
