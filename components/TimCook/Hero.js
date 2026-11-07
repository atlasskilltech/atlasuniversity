/*
 * Hero — index.html:107-148, main.css "Hero".
 *
 * The photograph sits in a capsule window (`--cap` / `--cap-x`, mirrored in lib/timcook/motion.js)
 * that the pinned scroll timeline opens to full bleed while the two headline lines part like doors.
 * Reduced motion: no capsule, no zoom, a flat .55 shade and no caption (main.css's own fallback).
 */
import { EYEBROW, EYEBROW_HERO, MONO, SERIF } from './ui';

export default function Hero({ hero }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate z-[1] h-[100svh] min-h-[560px] overflow-hidden bg-[radial-gradient(120%_80%_at_50%_110%,rgba(244,207,74,.07),transparent_60%)] [--cap-x:36%] [--cap:34%] max-md:[--cap-x:12%] max-md:[--cap:36%]"
    >
      <div
        data-hero-media
        className="absolute inset-0 z-0 [clip-path:inset(var(--cap)_var(--cap-x)_var(--cap)_var(--cap-x)_round_400px)] [will-change:clip-path] motion-reduce:[clip-path:inset(0_0_0_0)]"
      >
        <picture className="contents">
          <source
            media={hero.portrait.media}
            width={hero.portrait.width}
            height={hero.portrait.height}
            sizes={hero.portrait.sizes}
            srcSet={hero.portrait.srcSet}
          />
          <img
            src={hero.image.src}
            srcSet={hero.image.srcSet}
            sizes={hero.image.sizes}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
            decoding="async"
            alt={hero.image.alt}
            className="block h-full w-full origin-[50%_40%] scale-[1.25] object-cover object-[50%_50%] [@media(orientation:portrait)]:origin-[50%_-48%] motion-reduce:scale-100"
          />
        </picture>
        <div
          data-hero-shade
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,10,.35)_0%,rgba(7,8,10,0)_30%,rgba(7,8,10,.1)_55%,rgba(7,8,10,.85)_100%)] opacity-0 motion-reduce:bg-[rgba(7,8,10,.55)] motion-reduce:bg-none motion-reduce:opacity-100"
        />
        <p
          data-hero-caption
          className="absolute bottom-[clamp(1.5rem,5vh,3.5rem)] left-[var(--gutter)] right-[var(--gutter)] grid max-w-[34rem] gap-3 [font-size:clamp(1.1rem,1.8vw,1.6rem)] font-medium leading-[1.35] tracking-[-0.01em] opacity-0 [text-shadow:0_2px_24px_rgba(0,0,0,.4)] max-md:[font-size:1.05rem] motion-reduce:hidden"
        >
          <span className={EYEBROW}>{hero.captionEyebrow}</span>{' '}
          {hero.caption}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[2] mx-auto max-w-[1440px]">
        <h1
          id="hero-title"
          data-hero-title
          className="absolute inset-0 m-0 [font-size:clamp(3rem,min(14vw,19vh),13.5rem)] font-bold leading-[.86] tracking-[-0.06em] text-[#f3f1ec] max-md:[font-size:clamp(3rem,17vw,6rem)]"
        >
          <span
            data-tc="hero-line"
            className="absolute bottom-[calc(100%_-_var(--cap)_+_1vh)] left-0 right-0 overflow-clip px-[.06em] pb-[.12em] text-center"
          >
            {hero.lines[0]}
          </span>
          <span
            data-tc="hero-line"
            className={`absolute left-0 right-0 top-[calc(100%_-_var(--cap)_+_.6vh)] overflow-clip px-[.06em] pb-[.12em] text-center ${SERIF} text-[1.08em] tracking-[-0.035em]`}
          >
            {hero.lines[1]}
          </span>
        </h1>
        <div
          data-hero-fade
          className="absolute left-[var(--gutter)] top-1/2 max-w-[calc(var(--cap-x)_-_var(--gutter)_-_1.5rem)] -translate-y-1/2 [@media(max-width:1023px)]:right-[var(--gutter)] [@media(max-width:1023px)]:top-[calc(4rem_+_3vh)] [@media(max-width:1023px)]:flex [@media(max-width:1023px)]:max-w-none [@media(max-width:1023px)]:translate-y-0 [@media(max-width:1023px)]:justify-center [@media(max-width:1023px)]:text-center"
        >
          <p className={EYEBROW_HERO}>
            <span aria-hidden="true" className="mt-[.55em] h-[6px] w-[6px] flex-none rounded-full bg-[#f4cf4a] shadow-[0_0_12px_#f4cf4a]" />
            <span>
              {hero.place[0]}
              <br />
              {hero.place[1]}
            </span>
          </p>
        </div>
        <div data-hero-fade className="absolute right-[var(--gutter)] top-1/2 -translate-y-1/2 [@media(max-width:1023px)]:hidden">
          <a
            href="#visit"
            aria-label={hero.scrollLabel}
            className={`pointer-events-auto inline-flex flex-none flex-col items-center gap-[.8rem] ${MONO} text-[.68rem] uppercase tracking-[.2em] text-[#a4a29d]`}
          >
            <span>{hero.scroll}</span>
            <span aria-hidden="true" className="relative h-[56px] w-px overflow-hidden bg-[rgba(243,241,236,.12)]">
              <span data-tc="cue-dash" className="absolute left-0 top-[-40%] h-[40%] w-px bg-[#f3f1ec]" />
            </span>
          </a>
        </div>
        <div data-hero-fade className="absolute bottom-[clamp(1.25rem,4vh,3rem)] left-[var(--gutter)] right-[var(--gutter)]">
          <p className="max-w-[25rem] [font-size:clamp(.95rem,1.2vw,1.1rem)] leading-[1.55] text-[rgba(243,241,236,.78)]">{hero.lede}</p>
        </div>
      </div>
    </section>
  );
}
