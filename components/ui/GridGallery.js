import { cx } from '@/lib/cx';

/**
 * `.grid-gallery` — the reference's masonry photo wall, used three times on
 * /success-stories-atlas ("Startups founded by ATLAS ISME Alumni", "Students at
 * work", "Awards & Recognitions"). One component driven by card data; the
 * sections differ only in that data, the card class and the caption class.
 *
 * ── It is CSS multi-column, not a grid ────────────────────────────────────
 * `.grid-gallery` is `column-count: 4` with a 16px gap. Cards are ordinary
 * blocks with `margin-bottom: 24px` and a per-card height, so the column
 * balancer decides where each one lands — which is why the card order in the
 * markup does not read left-to-right.
 *
 * ── Three layouts, measured ───────────────────────────────────────────────
 *                     >=768px           541-767px          <=540px
 *   .grid-gallery     4 columns         2 columns          flex row,
 *                     margin-top 56     margin 40 -22 0      overflow auto
 *                                       padding 0 20
 *   .grid-card        per-card height   per-card height    250 x 350
 *                     margin-bottom 24  margin-bottom 16   margin-bottom 16
 *   .grid-card-atlas  per-card height   height auto,       300 x auto
 *                                       width 300            (unchanged)
 *   .grid-image-card  height 100%       100% x 300         100% x 300
 *   .grid-txt-wrapper inset auto 20 16  inset auto 24 24   same
 *
 * The 541px floor is `assets/include/header.php`'s inline
 * `@media (max-width: 540px)` — the project's `max-vsm`. That block is written
 * `.grid-gallery .grid-card`, so it reaches the plain card only: the awards
 * gallery keeps its 300px card and its centred crop, and only the plain one
 * shrinks to 250x350 and switches to `object-position: top`.
 *
 * ── `place-items: start` is load-bearing, twice ───────────────────────────
 * `.grid-gallery` also declares `place-items: start`, which looks inert on a
 * `display: block` box and is not. Chrome applies `justify-items` in block
 * layout, and `start` makes every block-level child **fit-content** instead of
 * filling its column: the reference's first card is 292px wide inside a 299px
 * column because that is its photograph's natural width, and the awards cards
 * come out 251-299px each for the same reason. Dropping it makes every card
 * fill the column — 7px wider, with the caption plate shifted to match — which
 * is how this port first rendered.
 *
 * Its `align-items` half matters at <=540px, where the gallery really is a
 * flex row: `start` keeps each card at its natural height, against the default
 * `stretch` that would pull every one of them up to the tallest. Hence
 * `place-items-start` rather than `justify-items-start`.
 */

/*
 * `.grid-card.<modifier>` vs `.grid-card-atlas.<modifier>` — the same eight
 * heights, but the atlas card loses them at 767px while the plain card keeps
 * them until 540px. Literal strings, one per modifier, because the Tailwind
 * scanner reads source text and cannot see a composed class name.
 */
const SIZE_PLAIN = {
  'g-card-1': 'h-[520px] max-vsm:h-[350px]',
  'g-card-2': 'h-[163px] max-vsm:h-[350px]',
  'grid-card-3': 'h-auto max-vsm:h-[350px]',
  'grid-card-4': 'h-auto max-vsm:h-[350px]',
  'grid-card-5': 'h-[163px] max-vsm:h-[350px]',
  'g-card-6': 'h-[520px] max-vsm:h-[350px]',
  'grid-card-7': 'h-[364px] max-vsm:h-[350px]',
  'grid-card-8': 'h-[319px] max-vsm:h-[350px]',
};

const SIZE_ATLAS = {
  'g-card-1': 'h-[520px] max-md:h-auto',
  'g-card-2': 'h-[163px] max-md:h-auto',
  'grid-card-3': 'h-auto',
  'grid-card-4': 'h-auto',
  'grid-card-5': 'h-[163px] max-md:h-auto',
  'g-card-6': 'h-[520px] max-md:h-auto',
  'grid-card-7': 'h-[364px] max-md:h-auto',
  'grid-card-8': 'h-[319px] max-md:h-auto',
};

/**
 * A caption half can be a string or a list of runs — /schools/isdi/success-stories/
 * success-snapshot authors three of its award names inside a `<strong>`, and
 * `.grid-card-name` is already 700, so Preflight's RELATIVE `bolder` would render
 * them 900 where the reference paints 700. The run carries an explicit `font-bold`.
 */
function Runs({ value }) {
  if (value == null) return null;
  if (!Array.isArray(value)) return value;
  return value.map((run, i) =>
    run && typeof run === 'object'
      ? <strong key={i} className="font-bold">{run.strong}</strong>
      : <span key={i}>{run}</span>
  );
}

export default function GridGallery({
  cards, variant = 'plain', className, name, caption, wrap = 'column', round16 = false,
  /*
   * The gallery's own margins, so a page that overrides them does not end up with
   * two `mt-*` utilities in one class list — those are resolved by STYLESHEET order,
   * not by the order they are written. /schools/isdi/success-stories/success-snapshot
   * carries `.h2-tag` on one of its three walls, which zeroes the top margin and adds
   * a 56px bottom one.
   */
  margin = 'mt-14 max-md:mt-10',
}) {
  const atlas = variant === 'atlas';

  return (
    /* ref .grid-gallery */
    <div
      className={cx(
        'place-items-start [column-count:4] [column-gap:16px] [row-gap:16px]',
        'max-md:-mx-[22px] max-md:px-5 max-md:[column-count:2]',
        margin,
        'max-vsm:flex max-vsm:overflow-auto',
        className,
      )}
    >
      {cards.map((card, index) => (
        /* ref .grid-card / .grid-card-atlas */
        <div
          /* the index is part of the key because the reference repeats an
             image within one gallery — "Students at work" uses the same
             pattern tile for two of its eight cards, both with an empty
             `.grid-txt-wrapper`, so src+name is not unique. The list is
             static and never reordered, so the index is stable. */
          key={`${card.image.src}-${index}`}
          className={cx(
            'relative mb-6 overflow-hidden max-md:mb-4',
            atlas
              ? cx(
                  'rounded-tl-[32px] rounded-br-[32px] max-md:w-[300px] max-md:flex-shrink-0',
                  SIZE_ATLAS[card.size] ?? 'h-auto',
                )
              : cx(
                  'max-vsm:w-[250px] max-vsm:flex-shrink-0',
                  SIZE_PLAIN[card.size] ?? 'h-auto max-vsm:h-[350px]',
                ),
          )}
        >
          {/* ref img.grid-image-card(.round) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.image.src}
            srcSet={card.image.srcSet}
            alt={card.image.alt}
            loading="lazy"
            className={cx(
              /* `.grid-image-card` declares `overflow: hidden`, where Chrome's own
                 UA sheet gives a replaced element `overflow: clip`. Inert — an
                 `<img>` cannot overflow itself — but it was the wrong computed
                 value on every page that renders this gallery. */
              'relative block h-full overflow-hidden object-cover max-md:h-[300px] max-md:w-full',
              !atlas && 'max-vsm:object-top',
              card.rounded && 'rounded-tl-[32px] rounded-br-[32px]',
              /* ref .grid-image-card.isdi */
              round16 && 'rounded-2xl',
            )}
          />

          {/* ref .grid-txt-wrapper — absent on the pattern tiles, which is why
              both halves are conditional.

              `caption` is tested against `undefined`, not for truthiness: on
              /advantages every card authors an *empty* `.title-txt-grid`, and
              although it paints nothing it is still a flex child, so the
              wrapper's 4px gap applies and the name sits 4px higher. Cards
              with no caption element at all omit it. */}
          {/* `.grid-txt-wrapper` is the column; `.grid-txt-wrapper2` is a ROW with
              a location pin beside the caption, 8px apart, 16px in on both sides and
              10px of right padding — and it has no `align-items`, so the pin is
              STRETCHED to the wrapper's height (19 x 54 at 1440). That is the
              reference's own paint and it travels as the `row` wrap. */}
          <div
            className={cx(
              'absolute flex',
              /* `.grid-txt-wrapper` declares `font-family: Manrope, sans-serif`,
                 which is why BOTH wraps carry `font-sans`. It is a no-op on the
                 five ATLAS pages, whose `<body>` is already Manrope — and it is
                 not on an ISDI page, where the body is Poppins: without it the
                 ISDI card names and captions rendered in the wrong family, and a
                 long name wrapped to a second line that the reference keeps on
                 one. Found on /schools/isdi/success-stories/startups; the Success
                 Snapshot's alumni wall had been carrying it too. */
              'font-sans',
              wrap === 'row'
                ? 'inset-x-4 bottom-4 flex-row gap-2 pr-2.5'
                : 'inset-x-5 bottom-4 flex-col gap-1 max-md:inset-x-6 max-md:bottom-6',
            )}
          >
            {card.icon && (
              /* ref img.location-img */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={card.icon.src} alt={card.icon.alt} loading="lazy" className="block max-w-full" />
            )}
            {card.name && <div className={name}><Runs value={card.name} /></div>}
            {(card.caption !== undefined || card.captionImage) && (
              /* `.title-txt-grid` holds a line of text on every page but
                 /schools/isdi/success-stories/startups, where each card closes with
                 the founder's company MARK instead. It carries no class and no
                 width/height attribute, so it paints at its intrinsic size (50x50 /
                 104x50 / 175x50 measured) and the caption's line box grows to it. */
              <div className={caption}>
                <Runs value={card.caption} />
                {card.captionImage && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={card.captionImage.src}
                    alt={card.captionImage.alt}
                    loading="lazy"
                    decoding="async"
                    className="inline-block max-w-full align-middle"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
