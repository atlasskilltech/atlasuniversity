import { cx } from '@/lib/cx';

/**
 * The partner logo marquee — `.logos-swipers > .slide-wrap > 10 x img.logo-img`
 * (`atlas-isdi-advantage/internationalisation/index.php:1014-1016`).
 *
 * `.logos-swipers` is `padding-bottom: 56px; overflow: hidden` and nothing else; it
 * is a top-level block, not a `.section`, so it carries none of the 50px padding.
 *
 * `.slide-wrap` is the bare class here (no `.extra-padding` / `.custom-paddning`
 * modifier), so it takes the base `padding: 40px 40px 20px`, and it is Webflow
 * interaction `a-22` — 2184px of linear travel over 30s that snaps back and repeats
 * — which is the project's existing `animate-slide-wrap` keyframe, first ported for
 * /success-stories-atlas.
 *
 * Nine of the ten marks carry `._50-r-m` (200px of right margin, 80px at <=767) and
 * the tenth does not, so the last sits flush — the same authoring the ISDI
 * homepage's strip has.
 */
export default function LogoBand({ logos }) {
  return (
    /* ref .logos-swipers */
    <div data-block="logos" className="overflow-hidden pb-14">
      {/* ref .slide-wrap */}
      <div className="flex w-[5000px] animate-slide-wrap items-center px-10 pb-5 pt-10 will-change-transform motion-reduce:animate-none">
        {logos.map((logo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${i}-${logo.src}`}
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            decoding="async"
            className={cx('max-w-full align-middle', logo.spaced && 'mr-[200px] max-md:mr-20')}
          />
        ))}
      </div>
    </div>
  );
}
