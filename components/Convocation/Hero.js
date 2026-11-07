/* eslint-disable @next/next/no-img-element -- the reference's own WebP renditions + srcset. */
/*
 * Hero — index.html:155-202, css/styles.css "Hero window".
 *
 * The photograph sits in a "doorway" window (clip-path insets by breakpoint as a pre-JS
 * approximation; lib/convocation/motion.js fits the window to the text block below 1024px). On load
 * the doors open and "Convocation" rises; on scroll the hero pins and the window expands to full
 * bleed. Gold confetti is a Three.js layer (lib/convocation/heroScene.js) with a static image
 * fallback for reduced motion / no WebGL. `.hero-title`'s 16.5vw is refined by motion.js's fitText.
 */
import { BTN, BTN_GOLD, BTN_LINE, DISPLAY, PlayGlyph, TEXT_SM, WRAP } from './ui';

export default function Hero({ hero }) {
  return (
    <section
      id="top"
      data-hero
      aria-labelledby="hero-title"
      className="relative isolate h-[100svh] min-h-[36rem] overflow-hidden bg-[#0e0e33]"
    >
      <div
        data-hero-media
        className="absolute inset-0 -z-10 [clip-path:inset(11%_4%_42%_4%_round_6px)] n640:[clip-path:inset(10%_6%_40%_6%_round_6px)] [@media(min-width:1024px)_and_(orientation:landscape)]:[clip-path:inset(12%_30%_40%_30%_round_6px)]"
      >
        <div data-hero-door className="absolute inset-0">
          <img
            data-hero-img
            src={hero.image.src}
            srcSet={hero.image.srcSet}
            sizes={hero.image.sizes}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
            decoding="async"
            alt={hero.image.alt}
            className="block h-full w-full scale-110 object-cover object-[50%_30%]"
          />
          <div data-hero-shade className="absolute inset-0 bg-[linear-gradient(to_top_in_oklab,rgb(14_14_51/0.7)_0%,rgb(14_14_51/0)_50%,rgb(14_14_51/0.25)_100%)]" />
        </div>
      </div>

      <canvas data-confetti aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] block h-full w-full" />
      <img
        data-confetti-fallback
        src={hero.confetti.src}
        alt=""
        aria-hidden="true"
        width={hero.confetti.width}
        height={hero.confetti.height}
        className="pointer-events-none absolute inset-x-0 top-0 -z-[5] hidden w-full opacity-70"
      />

      <div className={`${WRAP} relative flex h-full flex-col justify-end pb-6 pt-24 n640:pb-8`}>
        <div data-hero-ui className="flex items-end justify-between gap-8 pb-3 n640:pb-5">
          <p data-hero-fade className={`max-w-[19ch] ${DISPLAY} [font-size:clamp(1.25rem,2.1vw,2rem)] leading-[1.15] [text-wrap:balance]`}>
            {hero.tagline}
          </p>
          <p data-hero-fade className="hidden text-right text-[0.875rem] leading-[1.625] text-[#f5f6fc]/70 md:block">
            {hero.meta[0]}
            <br />
            {hero.meta[1]}
          </p>
        </div>

        <h1
          id="hero-title"
          data-hero-title
          className={`whitespace-nowrap ${DISPLAY} [font-size:16.5vw] font-medium leading-[0.8] tracking-[-0.03em]`}
        >
          <span className="sr-only">{hero.srOnly} </span>
          <span data-hero-word className="inline-block">
            {hero.word}
          </span>
        </h1>

        <div data-hero-ui className="mt-6 flex items-center justify-between gap-4 n640:mt-8">
          <div className="flex flex-wrap gap-2 n640:gap-3">
            <a href="#gallery" data-magnetic data-hero-fade className={`inline-flex ${BTN} ${BTN_GOLD}`}>
              {hero.cta[0]}
            </a>
            <a href="#films" data-magnetic data-hero-fade className={`inline-flex ${BTN} ${BTN_LINE}`}>
              <PlayGlyph className="!h-3 !w-3" />
              {hero.cta[1]}
            </a>
          </div>
          <a
            href="#ceremony"
            data-hero-fade
            className={`hidden shrink-0 items-center gap-4 ${TEXT_SM} text-[#f5f6fc]/70 transition-colors hover:text-[#f5f6fc] n640:flex`}
          >
            {hero.scroll}{' '}
            <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-[rgb(245_246_252/0.2)]">
              <span data-cue-dash className="absolute inset-0 bg-[#d6ae55]" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
