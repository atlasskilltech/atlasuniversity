import GridGallery from '@/components/ui/GridGallery';
import { cx } from '@/lib/cx';
import { CONTAINER, H2, H2_MB, SECTION } from './ui';

/**
 * "Our students at universities around the world" (`success-snapshot/index.php`,
 * block 9).
 *
 *   div.section > .w-layout-blockcontainer.container > (h2.h2-tag.isdi,
 *     .instagram-wrapper.mobile-vert-scroll.mar-0 > .grid-gallery.h2-tag >
 *       8 x .grid-card > (img.grid-image-card.isdi,
 *         .grid-txt-wrapper2 > (img.location-img, .title-txt-grid3)))
 *
 * ── `.h2-tag` on the GALLERY is not decorative ────────────────────────────
 * The wall carries the heading class as well as `.grid-gallery`, and the two are
 * both (0,1,0), so source order decides each property:
 *   margin-top     `.h2-tag`'s 0 wins above 768; the gallery's 40 wins below
 *   margin-bottom  `.h2-tag`'s 56 wins (32 below 768) — the gallery declares 0
 *   column-count   the gallery's 4 / 2 wins over `.h2-tag`'s `auto` at <=767
 * Measured on production: mt0 / mb56 at 1440 and 768, mt40 / mb32 at 390. Reading
 * it as a plain gallery is 112px out at 1440.
 *
 * `.instagram-wrapper.mobile-vert-scroll.mar-0` is `margin-top: 0` (the bare class
 * is 56 / 32) over `height: 100%; overflow: scroll`.
 *
 * `.grid-txt-wrapper2` is a ROW — pin, 8px, caption — inset 16 on three sides with
 * 10px of right padding, and it declares no `align-items`, so the 19px pin is
 * STRETCHED to the wrapper's height. That is the reference's own paint.
 *
 * Card 2 nests a second `.title-txt-grid3` holding a `<strong>` inside the first.
 * Both are inert: the class is already 700 and the nested div is a block in a
 * block — and reproducing the `<strong>` would render 900, because Preflight's
 * `bolder` resolves against the parent. The caption is transcribed as plain text.
 */
export default function Universities({ data }) {
  return (
    <div data-block="universities" className={SECTION}>
      <div className={CONTAINER}>
        <h2 className={cx(H2, H2_MB.base)}>{data.heading}</h2>

        {/* ref .instagram-wrapper.mobile-vert-scroll.mar-0 */}
        <div className="h-full w-auto overflow-scroll">
          <GridGallery
            cards={data.cards}
            wrap="row"
            round16
            margin="mt-0 mb-14 max-md:mt-10 max-md:mb-8"
            name="z-[3] max-w-full text-[18px] font-bold leading-[1.5] text-white"
          />
        </div>
      </div>
    </div>
  );
}
