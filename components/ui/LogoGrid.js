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
};

export default function LogoGrid({ logos, size = 'default' }) {
  return (
    /* ref .w-layout-layout.logos-grid */
    <div
      className="grid justify-center bg-[#6886ca3d] [grid-template-columns:1fr_1fr_1fr_1fr]
                 max-md:[grid-template-columns:1fr_1fr]"
    >
      {logos.map((logo, index) => (
        /* ref .w-layout-cell.cell-company — the index is part of the key
           because a tab can list the same mark twice (the UK panel repeats
           the University of the Arts London logo); the list is static and
           never reordered, so the index is stable. */
        <div
          key={`${logo.src}-${index}`}
          className="flex flex-col items-center justify-center bg-white"
        >
          {/* ref .grid-img-wrap */}
          <div className={CELL[size]}>
            {/* ref img.grid-inner-img */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              srcSet={logo.srcSet}
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
          </div>
        </div>
      ))}
    </div>
  );
}
