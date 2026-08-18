import { cx } from '@/lib/cx';

/**
 * The reference's `.card-content-b` — a full-width 50/50 row of copy beside a
 * piece of media, used on /about-us ("Shaping a Viksit Bharat, Together",
 * `about-us.php:461-544`) and four times on /campus-atlas
 * (`campus-atlas.php:118-221, 329-393, 617-714`).
 *
 * ── Measured cascade — identical on both pages ────────────────────────────
 *                        >=768px                    <=767px
 *   .card-content-b      row, min-height 480        min-height 480 still,
 *                                                   `flex-wrap: wrap-reverse`,
 *     (switch variant)   row-reverse                so the media ends up ABOVE
 *                                                   the copy — the variant no
 *                                                   longer changes anything
 *   .cd-cont-b-wrap      50%, column, centred,      100%, padding 22 32
 *                        padding 0 96
 *   .h3-cd-b             32px/1.2, 500, mb 24       20px, then 18px <=479
 *   .cd-b-text           18px/1.5                   16px, then 14px <=479
 *   .cd-cont-b-imgwrap   50%                        100%
 *   .cd-b-image          100% x 100%, object-cover  same
 *
 * `.cd-cont-b-wrap` ships an inline script that assigns
 * `background-image: url(<data-card-cint-b-bg>)`. That attribute exists on no
 * card on either page, so the reference paints `url(null)` — an invalid URL
 * that cancels the `purple-square.png` the stylesheet would otherwise show,
 * leaving the flat `card-cnt-bgcolor`. The flat colour is what both pages
 * actually render and what is reproduced here.
 *
 * ── The two things a page may vary ────────────────────────────────────────
 * Structure only, never appearance:
 *   `mediaClassName`  /campus-atlas adds `@media (max-width:767px){
 *                     .cd-cont-b-imgwrap{height:220px} }` in its own page-level
 *                     <style>; /about-us lets the media size itself.
 * The section wrapper (`.shaping-wrapper` / `.common-wrapper`) stays with the
 * caller because /about-us renders these rows full-bleed while /campus-atlas
 * renders them inside `.container`.
 */

/*
 * The two section wrappers these rows sit in. Both are padding-top only and
 * agree down to 480px; below it `.shaping-wrapper` drops to 20 and
 * `.common-wrapper` stays at 40.
 */
export const SHAPING_WRAPPER = 'pt-14 max-md:pt-10 max-sm:pt-5';   // ref .shaping-wrapper
export const COMMON_WRAPPER = 'pt-14 max-md:pt-10';                // ref .common-wrapper

export default function ContentCardB({ item, mediaClassName }) {
  const { variant, title, text, background } = item;

  return (
    /* ref .card-content-b (+ .w-variant-345ca80e-… for `switch`) */
    <div
      className={cx(
        'flex min-h-[480px] items-stretch justify-start max-md:flex-wrap-reverse',
        variant === 'switch' && 'flex-row-reverse',
      )}
    >
      {/* ref .cd-cont-b-wrap */}
      <div
        className="relative flex w-1/2 flex-none flex-col items-start justify-center px-24 max-md:w-full max-md:px-8 max-md:py-[22px]"
        style={{ backgroundColor: background }}
      >
        {/* ref h3.h3-cd-b */}
        <h3 className="mb-6 text-[32px] font-medium leading-[1.2] text-white max-md:text-[20px] max-sm:text-[18px]">
          {title}
        </h3>
        {/* ref .cd-b-text */}
        <div className="text-lg leading-[1.5] text-white max-md:text-base max-sm:text-sm">{text}</div>
      </div>

      {/* ref .cd-cont-b-imgwrap */}
      <div
        className={cx(
          'w-1/2 overflow-hidden max-md:w-full',
          (item.embed || item.video) && 'relative',
          mediaClassName,
        )}
      >
        <CardMedia item={item} />
      </div>
    </div>
  );
}

/**
 * ref .cd-b-image — one of three things depending on the card:
 *   an <img>, a muted looping <video>, or a YouTube <iframe>.
 *
 * The iframe carries the reference's own inline geometry: centred, 100% x 100%,
 * `scale(1.4)` so the player's letterboxing is cropped away, under a
 * transparent shield that swallows clicks (the reference paints one too, so the
 * card is decoration, not a player).
 */
function CardMedia({ item }) {
  if (item.embed) {
    return (
      <>
        <div className="absolute inset-0 z-[2]" aria-hidden="true" />
        <iframe
          src={item.embed}
          title={item.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          tabIndex={-1}
          className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 scale-[1.4] object-cover"
        />
      </>
    );
  }

  if (item.video) {
    return (
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {item.video.map((src) => (
          <source key={src} src={src} type={src.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
        ))}
      </video>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={item.image.src}
      srcSet={item.image.srcSet}
      sizes="(max-width: 767px) 100vw, 50vw"
      alt={item.image.alt}
      loading="lazy"
      className="h-full w-full object-cover"
    />
  );
}
