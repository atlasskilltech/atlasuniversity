import GridGallery from '@/components/ui/GridGallery';
import { cx } from '@/lib/cx';
import withBreaks from '@/lib/withBreaks';
import { CONTAINER, H2, H2_MB, SECTION, SUB } from '../Home/ui';

/**
 * "Spotlighting student startups" (`success-stories/startups.php:44-219`).
 *
 *   div.section > .w-layout-blockcontainer.container >
 *     (h2.h2-tag.mrg16.isdi, .sub-heading, .grid-gallery > 18 x .grid-card >
 *       (img.grid-image-card.isdi, .grid-txt-wrapper >
 *         (.grid-card-name.isdi, .title-txt-grid > img)))
 *
 * The shared `ui/GridGallery` on its plain card, with no wrapper around it — the
 * Success Snapshot's alumni wall nests the same gallery in an
 * `.instagram-wrapper.mobile-vert-scroll.mar-0`; this one does not, so the gallery
 * keeps its own `margin-top: 56px` (40 at <=767) and nothing scrolls above 540px.
 *
 *   .grid-card-name.isdi   20px/24 700 white (the base is the mint #07f6a0)
 *   .title-txt-grid        18px/32 500 white; 16px/24 at <=767
 *   .grid-image-card.isdi  border-radius 16 — `round16`
 *
 * ── Only TWO of this page's six size modifiers are declared ───────────────
 * The cards are authored `g-card-1` / `g-card-3` .. `g-card-8`, but this page's
 * three sheets declare `.grid-card.g-card-1` and `.grid-card.g-card-6` (both
 * `height: 520px`) and nothing else — the 163 / 364 / 319px rules are on
 * `.grid-card-3` .. `-8`, a different set of class names. So the other twelve cards
 * are `height: auto`, and `place-items: start` then sizes each to its own
 * photograph: every one is authored at exactly **282 x 388**, which is what they
 * measure. The two 520px cards are clamped to the 298.5px column instead, because
 * `fit-content` cannot exceed the space available. `GridGallery`'s size map already
 * falls back to `h-auto` for a modifier it does not know, so no entry was added for
 * the five that paint nothing.
 *
 * ── `.title-txt-grid` holds a MARK, not a line ────────────────────────────
 * Every other page that renders this gallery puts text in that box; here each card
 * closes with the founder's company logo, authored as a bare `<img>` with no class
 * and no width/height attribute. It paints at its intrinsic size — 50x50, 104x50 or
 * 175x50, measured — and the caption's line box grows from 32px to the mark's 50.
 * That is `GridGallery`'s `card.captionImage`, added here and a no-op everywhere
 * else.
 */
export default function Spotlight({ data }) {
  return (
    /* ref div.section */
    <div data-block="spotlight" className={SECTION}>
      <div className={CONTAINER}>
        {/* ref h2.h2-tag.mrg16.isdi */}
        <h2 className={cx(H2, H2_MB.mrg16)}>{withBreaks(data.heading)}</h2>
        {/* ref .sub-heading */}
        <div className={SUB}>{withBreaks(data.lead)}</div>

        <GridGallery
          cards={data.cards}
          round16
          name="z-[3] text-[20px] font-bold leading-6 text-white"
          caption="z-[3] text-[18px] font-medium leading-8 text-white max-md:text-base max-md:leading-6"
        />
      </div>
    </div>
  );
}
