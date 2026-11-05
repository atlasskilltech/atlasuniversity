import PrimaryButton from '@/components/ui/PrimaryButton';
import { hero as homeHero } from '@/lib/homeContent';
import withBreaks from '@/lib/withBreaks';

/**
 * Homepage hero — port of reference/index.php:54-90 (`.main-cover-section-isme`).
 *
 * Structure (identical to the reference):
 *   section .main-cover-section-isme     full-viewport-height stage
 *     div   .hero-cont-wrapper-isme      bottom 75%, gradient scrim, holds the copy
 *       div .hero-text                   max-width 840px
 *         .h1-tag / .course-duration / .buttons-wrapper
 *     div   .backgorund-header           background video, painted behind (z -100)
 *
 * Height: the reference chains `html{height:100%}` -> `.body{height:100%}` ->
 * `.main-cover-section-isme{height:100%}`. `h-screen` resolves to the same used
 * value without needing global html/body rules.
 *
 * The fixed header deliberately overlays this section (its bars are translucent),
 * so the page must NOT render a header spacer above it.
 *
 * A server component — the video autoplays declaratively, nothing is interactive.
 *
 * `data` defaults to the homepage's export. The ISME homepage
 * (reference/schools/isme/index.php) is the same `.main-cover-section-isme`
 * with no `.course-duration` line, its own video and poster, and an
 * interactive "Explore Programs" dropdown in the button row — passed as
 * `extra`, so this component stays a server component.
 */

export default function Hero({ data = homeHero, extra = null }) {
  const hero = data;
  return (
    <section className="relative block w-full h-screen gap-16 justify-start items-end">
      {/* ── copy + gradient scrim (ref .hero-cont-wrapper-isme) ──────────── */}
      <div
        className="absolute inset-x-0 bottom-0 top-auto z-[1] flex flex-none items-end
                   w-full h-3/4 pb-16 pl-16
                   bg-[linear-gradient(#0000,#000c_84%)]
                   max-md:pb-10 max-md:pl-[22px] max-md:pr-[22px]"
      >
        {/* ref .hero-text */}
        <div className="static mb-0 ml-0 max-w-[840px] max-sm:max-w-[704px]">
          {/* ref .h1-tag — a <div> upstream; promoted to <h1>, the page had none */}
          <h1
            className="m-0 text-white text-[56px] font-normal leading-[1.2]
                       max-lg:text-[44px]
                       max-md:text-[28px] max-md:font-semibold max-md:leading-[1.5]"
          >
            {hero.heading}
          </h1>

          {/* ISME imarticus29012026 — `.course-duration-isme` (24px/36 300 #07f6a0, pt4) and
              `.course-desc-isme` (16px/24 300 white) under the heading; no other hero has them */}
          {hero.ismeDuration && <div className="pt-1 text-[24px] font-light leading-[36px] text-atlas-mint">{withBreaks(hero.ismeDuration)}</div>}
          {hero.ismeDesc && <div className="text-base font-light leading-6 text-white">{withBreaks(hero.ismeDesc)}</div>}

          {/* ref .course-duration */}
          {hero.subheading && (
            <div className="block pt-4 pb-2.5 text-2xl font-light text-white">
              {hero.subheading}
            </div>
          )}

          {/* ref .buttons-wrapper */}
          <div
            className="flex items-center gap-4 pt-[30px]
                       max-lg:gap-2
                       max-md:flex-col max-md:justify-start max-md:items-start max-md:pt-6
                       max-sm:gap-2 max-sm:pt-[14px]"
          >
            {hero.buttons.map((button) => (
              /* ref a.btn-primary — the shared button owns its own look */
              <PrimaryButton
                key={button.label}
                href={button.href}
                external={button.external}
                variant={button.variant}
              >
                {button.label}
              </PrimaryButton>
            ))}
            {extra}
          </div>
        </div>
      </div>

      {/* ── background video (ref .backgorund-header.w-background-video) ─── */}
      <div className="relative w-full h-full overflow-hidden text-white">
        {/*
          ref .w-background-video > video — the poster is applied as a CSS
          background (not the `poster` attribute) so it shows through until the
          first frame decodes, exactly as upstream.
        */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          style={data === homeHero ? undefined : { backgroundImage: `url('${hero.poster}')` }}
          className={
            data === homeHero
              ? "absolute -inset-full m-auto w-full h-full object-cover bg-center bg-cover -z-[100] bg-[url('/assets/images/hero-poster.jpg')]"
              : 'absolute -inset-full m-auto w-full h-full object-cover bg-center bg-cover -z-[100]'
          }
        >
          <source src={hero.video.mp4} type="video/mp4" />
          <source src={hero.video.webm} type="video/webm" />
        </video>
      </div>
    </section>
  );
}
