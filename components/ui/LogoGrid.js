import { cx } from '@/lib/cx';

/**
 * `.w-layout-layout.logos-grid` — a panel of company logos, one per white cell.
 * Both tab sets on /success-stories-atlas ("Our Recruitment Partners" and "Our
 * Global Partnerships") use it, so it is one component driven by a logo list.
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                        >=768px                     <=767px
 *   .logos-grid          grid, 4 x 1fr, gap 0,       2 x 1fr
 *                        justify-content center
 *   .cell-company        white, flex, centred        same
 *   .grid-img-wrap       215 x 85, margin 24 0,      150 wide, height auto
 *                        padding 0 24
 *   .grid-inner-img      intrinsic, align-self       same
 *                        centre
 *
 * ── Seven logos are deliberately out of aspect ─────────────────────────────
 * `.grid-inner-img` has no height of its own, but seven of these `<img>` tags
 * carry an HTML `height` attribute (`80`, `90`, `75`, `71`) while their width
 * is left to `max-width: 100%`. That stretches or squashes them — Nottingham's
 * 146x52 mark renders 102x90, and the Arts University's 74x74 is scaled up to
 * 90x90. It is the reference's own authoring, it changes the row heights of
 * the grid, and it is reproduced: `width` / `height` travel with the logo.
 * (`width="Auto"` and `height="Auto"` appear elsewhere on the page, are invalid
 * and are ignored by the browser, so they are not transcribed.)
 *
 * ── One page resizes the cell ─────────────────────────────────────────────
 * /advantages/atlas-internationalisation's inline `<style>` gives
 * `.grid-img-wrap` 265x100 (180 wide, height auto and `padding: 0 10px` below
 * 768px) rather than the 215x85 every other page renders. Hence `size="wide"`.
 *
 * ── One page turns the columns at a different width, and only on one tab ──
 * /schools/isdi/atlas-isdi-advantage/internationalisation gives each of its five
 * panes its own `#w-node-…` rule, and only the FIRST pane's drops to two columns —
 * at `max-width: 576px`, from the page's own `<style>`, not at 767. The other four
 * stay four-wide at every width and overflow their container below about 600px,
 * clipped by `.section { overflow: hidden }`. Measured on production at
 * 1440 / 768 / 700 / 576 / 479 / 390; reproduced as authored, so `cols` names the
 * rule rather than assuming the `md` one.
 *
 * ── An empty cell is still a white cell ───────────────────────────────────
 * Six of that page's cells hold no `<img>` at all (three in the UK pane, two in
 * the USA pane — one of them a commented-out logo — and one in Other Global
 * Partners). They are rendered: a `.cell-company` with nothing in it is a white
 * box in the grid and a row of them is visible. A `null` entry is that cell.
 *
 * The tracks are `1fr`, not `minmax(0, 1fr)`, so a track can never be narrower
 * than `.grid-img-wrap`'s fixed 215px: between 768 and about 900px the four
 * columns total more than the container and the row is centred, which clips
 * the outer logos against `.section`'s `overflow: hidden`. That is the
 * reference's own arithmetic and it is transcribed as written — hence the
 * explicit `[grid-template-columns:1fr_1fr_1fr_1fr]` rather than Tailwind's
 * `grid-cols-4`, which would silently substitute `minmax(0, 1fr)` and lay the
 * panel out differently from the reference at those widths.
 */
/* ref .grid-img-wrap — /advantages/atlas-internationalisation's own `<style>`
   block resizes it, which is a real measured difference between two references
   rather than a skin, so it selects on a named size. Whole literal strings,
   because the Tailwind scanner reads source text. */
const CELL = {
  default: 'my-6 flex h-[85px] w-[215px] items-center justify-center px-6 max-md:h-auto max-md:w-[150px]',
  wide: 'my-6 flex h-[100px] w-[265px] items-center justify-center px-6 max-md:h-auto max-md:w-[180px] max-md:px-2.5',
  /*
   * /schools/isdi/atlas-isdi-advantage/internationalisation keeps the 215x85 wrap down
   * to 577 and only drops it at <=576. **A media query adds no specificity**, so the
   * page's own inline `<style>` — which re-declares the plain `.grid-img-wrap` AFTER
   * the Webflow sheet, and carries its own `@media (max-width: 576px)` — beats the
   * sheet's `@media (max-width: 767px)` rule at every width above 576. Reading the
   * sheet alone put the cell at 150px from 767 down and cost 53px of panel height at
   * 700. Measured 215x85 at 700 and 150/auto at 576 on production.
   */
  sm576: 'my-6 flex h-[85px] w-[215px] items-center justify-center px-6 max-576:h-auto max-576:w-[150px]',
};

/*
 * ref .w-layout-layout.logos-grid / the page's own `#w-node-…` rule.
 *
 * `justify-content` travels with the column rule because it is the same per-page
 * difference: the ATLAS sheets give `.w-layout-layout` `justify-content: center`, so
 * an overflowing grid there hangs off both sides equally, while
 * /schools/isdi/atlas-isdi-advantage/internationalisation measures `normal` at every
 * width — its four 215px tracks overflow a 708px container to the RIGHT only.
 * Centring them put the first logo 76px left of the reference's at 768 and 102 at
 * 700; every block height still matched, so only the screenshot caught it.
 */
const COLS = {
  md: 'justify-center [grid-template-columns:1fr_1fr_1fr_1fr] max-md:[grid-template-columns:1fr_1fr]',
  sm576: '[grid-template-columns:1fr_1fr_1fr_1fr] max-576:[grid-template-columns:1fr_1fr]',
  fixed: '[grid-template-columns:1fr_1fr_1fr_1fr]',
};

/* ref img.grid-inner-img, in its `.grid-img-wrap` or straight in the cell */
function Mark({ logo, className }) {
  const mark = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={logo.src}
      srcSet={logo.srcSet}
      sizes={logo.sizes}
      width={logo.width}
      height={logo.height}
      alt={logo.alt}
      loading="lazy"
      /* the attribute alone cannot win: Tailwind's Preflight declares
         `img { height: auto }`, which beats a presentational hint, so
         the authored height is restated as an inline style */
      style={logo.height ? { height: `${logo.height}px` } : undefined}
      className="w-auto flex-none self-center"
    />
  );
  /* ref .grid-img-wrap */
  return className ? <div className={className}>{mark}</div> : mark;
}

export default function LogoGrid({ logos, size = 'default', cols = 'md' }) {
  return (
    /* ref .w-layout-layout.logos-grid */
    <div className={cx('grid bg-[#6886ca3d]', COLS[cols] ?? COLS.md)}>
      {logos.map((logo, index) => (
        /* ref .w-layout-cell.cell-company — the index is part of the key
           because a tab can list the same mark twice (the UK panel repeats
           the University of the Arts London logo); the list is static and
           never reordered, so the index is stable. */
        <div
          key={`${logo ? logo.src : 'empty'}-${index}`}
          className="flex flex-col items-center justify-center bg-white"
        >
          {/* a cell the reference authors empty paints a plain white box; `bare` is
              a cell whose mark sits straight in it with no `.grid-img-wrap`, which
              drops that grid row from the wrap's 85 + 48 to the image's own height */}
          {logo && <Mark logo={logo} className={logo.bare ? undefined : CELL[size]} />}
        </div>
      ))}
    </div>
  );
}
