import { cx } from '@/lib/cx';

/**
 * `.slide-wrap` — the logo marquee Webflow interaction `a-22` drives: 2184px of
 * linear travel over 30s that snaps back and repeats, which is the project's
 * existing `animate-slide-wrap` keyframe.
 *
 * Moved here out of `Industry/ui` when /schools/isdi/success-stories/success-snapshot
 * turned out to render the same strip twice ("Top Recruiters @ ATLAS ISDI" and the
 * alumni startups' logos). `Industry/ui` re-exports it, so that page is unchanged.
 *
 * The base class is `padding: 40px 40px 20px` over a **5000px** track — and the track
 * is a flex row, so where the marks and their margins total more than 5000 every one
 * of them shrinks proportionally: the measured logos are 186x43 against their own
 * intrinsic size. That arithmetic falls out of the same files and the same width, so
 * nothing here pins a size.
 *
 * Nine of ten marks on the ISDI homepage's strip carry `._50-r-m` (200px of right
 * margin, 80 at <=767) and the tenth does not; on this page all 26 and all 8 do, and
 * one of the 26 also carries `.sm` — `.logo-img._50-r-m.sm { width: 14% }`, a flex
 * basis of 14% of the 4920px content box that then shrinks to the measured 302px.
 */
export default function LogoStrip({ logos }) {
  return (
    /* ref .slide-wrap (+ .extra-padding, whose padding-top is the same 40px) */
    <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
      {logos.map((logo, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${i}-${logo.src}`}
          src={logo.src}
          alt={logo.alt}
          loading="lazy"
          decoding="async"
          className={cx(
            'max-w-full align-middle',
            logo.spaced && 'mr-[200px] max-md:mr-20',
            /* ref .logo-img._50-r-m.sm */
            logo.sm && 'w-[14%]'
          )}
        />
      ))}
    </div>
  );
}
