import SmartLink from '@/components/SmartLink';

/**
 * One programme card — port of `.port-card-m-wrap-atlas.port-card-m-wrap-atlasv2`
 * (reference/index.php:259-301 + the page's inline <style> at index.php:12-42).
 *
 * ── Geometry, measured off the reference ──────────────────────────────────
 *   card   295 x 367, `border-radius: 32px 0` -> top-left + bottom-right only
 *   image  295 x 295  (`object-fit: contain; height: auto` on a square source)
 *   bar     295 x 72  (24px padding + a 24px line box), pinned to the bottom
 *   arrow  29 x 21 triangle at top:-19px / left:30px, scaled to 0.8
 *
 * 295 + 72 = 367 exactly, so the bar sits flush under the image with no gap —
 * the card height in the reference was picked to make that true, at every
 * breakpoint (the card never resizes; only the number of visible cards does).
 *
 * The programme name lives in the artwork upstream, not in the markup, so the
 * card carries no title element. `program.name` only feeds the key/aria label.
 *
 * `accent` is a per-school colour (#009fe0 ISME / #e12a7b ISDI / #ed1a3b uGDX),
 * so it is an inline style rather than a Tailwind class — the JIT compiler
 * cannot emit a class it never sees as a literal.
 */

/* ref `.custombtnv2` (index.php:13-24). The anchors stay `inline`, exactly as
 * upstream: the 10px vertical padding therefore paints outside the line box
 * instead of growing it, which is what keeps the bar 72px tall.
 *
 * The base class paints `#5cbdca`; three of the four carousels also add
 * `.custombtnv3`, which overrides it to white. The industry-integrated one
 * does not, so it keeps the teal. */
const BUTTON = 'rounded-3xl px-4 py-2.5 text-xs text-black no-underline';

const BUTTON_FILL = {
  white: 'bg-white', // ref .custombtnv3
  teal: 'bg-atlas-cyan', // ref .custombtnv2 base, #5cbdca
};

export default function ProgramCard({
  program,
  applyHref,
  accent,
  buttons = 'white',
}) {
  const button = `${BUTTON} ${BUTTON_FILL[buttons]}`;

  return (
    <div className="relative block h-[367px] w-[295px] flex-none overflow-hidden rounded-tl-[32px] rounded-br-[32px] text-white">
      {/* ref .port-card-m-txt-wrap-atlas — out of flow, so it overlays the image */}
      <div
        className="absolute inset-x-0 bottom-0 flex w-full flex-row items-end p-6"
        style={{ backgroundColor: accent }}
      >
        {/* ref .port-card-m-detail-atlas */}
        <div className="relative w-full flex-none">
          <div>
            <SmartLink href={applyHref} className={button}>
              Apply Now
            </SmartLink>{' '}
            <SmartLink
              href={program.href}
              className={button}
              aria-label={`Know more about ${program.name}`}
            >
              Know More
            </SmartLink>
          </div>
        </div>

        {/* ref .port-card-m-arrow-atlas > .svg-icon-triangle */}
        <div className="absolute -top-[19px] left-[30px] h-[21px] w-[29px] scale-[0.8]">
          <svg
            width="29"
            height="21"
            viewBox="0 0 29 21"
            fill="none"
            aria-hidden="true"
            className="block"
          >
            <path
              d="M14.5 6.65187e-07L29 21L-1.90735e-06 21L14.5 6.65187e-07Z"
              fill={accent}
            />
          </svg>
        </div>
      </div>

      {/*
        A plain <img>, not next/image, and deliberately so: the reference ships
        three hand-authored WebP renditions per programme (300 / 600 / 1000) and
        the `srcset` + `sizes` pair below is copied from it verbatim, so the
        browser downloads exactly the same file the reference does. Routing them
        through the optimiser would re-encode already-optimised art for no gain.
        `width`/`height` keep the intrinsic ratio, so `h-auto` reserves the
        295px box before the bytes arrive — no layout shift.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${program.image}/600.webp`}
        srcSet={`${program.image}/300.webp 300w, ${program.image}/600.webp 600w, ${program.image}/1000.webp 1000w`}
        sizes="(max-width: 576px) 295px, (max-width: 768px) 400px, 516px"
        width={516}
        height={516}
        loading="lazy"
        decoding="async"
        alt={program.alt}
        className="mx-auto block h-auto w-full object-contain"
      />
    </div>
  );
}
