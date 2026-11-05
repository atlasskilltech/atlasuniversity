import GridGallery from '@/components/ui/GridGallery';
import IconSection from '../About/IconSection';
import { BLUE_DESC_TEXT, BLUE_DESC_WRAP, CONTAINER } from './ui';

/**
 * "Awards & Recognitions" (`success-snapshot/index.php`, block 14).
 *
 *   section#awards.section > (.icon-heading,
 *     .blue-wrapper.isdi-blue-5 > .container > (.blue-desc-wrap > .blue-desc-text,
 *       .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery > 8 x .grid-card))
 *
 * The wall is the shared `ui/GridGallery`; its caption is `.title-txt-grid2`
 * (weight 400) where the alumni wall's is `.title-txt-grid` (500).
 *
 * Three of the eight names are authored inside a `<strong>`, and `.grid-card-name`
 * is already 700 — so the run carries an explicit `font-bold`, because Preflight's
 * `bolder` would resolve against that parent and render 900 where the reference
 * paints 700.
 *
 * Two cards author a SECOND, empty `.grid-txt-wrapper`. It is absolutely positioned
 * and holds nothing, so it paints nothing and moves nothing; not rendered.
 */
export default function Awards({ data }) {
  return (
    <IconSection id="awards" block="awards" icon={data.icon.image} title={data.icon.title}>
      <div className={CONTAINER}>
        <div className={BLUE_DESC_WRAP}>
          <div className={BLUE_DESC_TEXT}>{data.lead}</div>
        </div>

        {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 */}
        <div className="h-full w-auto overflow-scroll">
          <GridGallery
            cards={data.cards}
            /* ref img.grid-image-card.isdi — `border-radius: 16px`. All 24 of this
               page's gallery images carry `.isdi` and only `./Universities` was
               passing it, so these eight rendered square corners. The card is a
               declared height, so the gap moved nothing and no height diff, text
               diff or screenshot mean could see it; it was found by the shared
               `GridGallery` check once that started reporting each image's radius.
               Fixed 2026-10-27. */
            round16
            name="z-[3] text-[20px] font-bold leading-6 text-white"
            caption="z-[3] text-[18px] font-normal leading-8 text-white"
          />
        </div>
      </div>
    </IconSection>
  );
}
