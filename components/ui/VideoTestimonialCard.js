'use client';

import { useRef } from 'react';
import { cx } from '@/lib/cx';

/**
 * `.testimonial-video-wrapper-unique` — a looping testimonial video behind a
 * round play/pause button, inside a clipped `32px 0` card.
 *
 * Two instances on /advantages/atlas-internationalisation, both defined by that
 * page's own inline `<style>` block rather than by the Webflow sheet:
 *
 *   "Voices Around the World"   `.testimonial-card.bgc1.atlas`   8 cards
 *                               `width: 100%; height: auto`, #41418e
 *   "Our Student Experiences"   `.testimonial-custom-card.bgc1.atlas`  9 cards
 *                               `flex: none; width: 320px; height: 500px`,
 *                               #ffffff
 *
 * ── Measured cascade ──────────────────────────────────────────────────────
 *                                >=768px                 <=767px
 *   .testimonial-card.bgc1.atlas 373 x 560 (the slide's  full slide width,
 *                                own width), radius      height auto
 *                                32/0, clipped
 *   .testimonial-custom-card     320 x 500, radius 32/0, same
 *                                clipped, #fff
 *   video                        100% wide, max-height   height auto,
 *                                560, object-fit cover,  object-fit contain
 *                                background #000
 *   button                       55px circle, #000b,     same
 *                                bottom 20 right 20,
 *                                22px glyph
 *
 * The `.testimonial-card` variant has no fixed width upstream: `width: 100%`
 * against a `slidesPerView: 'auto'` slide resolves to the video's own intrinsic
 * width capped by `max-height: 560px`, which comes out at 373px for every one
 * of the eight. That number is passed in rather than recomputed, because a
 * `width: 100%` inside an auto-width slide is the same construction that blows
 * the shared `TestimonialCard` up between 568 and 767px elsewhere in this
 * rebuild.
 *
 * ── The page's own script, reproduced ─────────────────────────────────────
 * Only one video plays at a time: starting one pauses, rewinds and reloads
 * every other on the page, and each slider's `slideChange` does the same. Here
 * that is a `pause` event listener plus a `data-il-video` query, which is the
 * same behaviour without a global click handler.
 */
export default function VideoTestimonialCard({ card, variant = 'card', width }) {
  const videoRef = useRef(null);
  const btnRef = useRef(null);

  /* ref the page's inline script: play one, reset all the others */
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      document.querySelectorAll('[data-il-video]').forEach((other) => {
        if (other === video) return;
        other.pause();
        other.currentTime = 0;
      });
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  const sync = () => {
    const video = videoRef.current;
    const btn = btnRef.current;
    if (video && btn) btn.textContent = video.paused ? '▶' : '❚❚';
  };

  return (
    /* ref .testimonial-card.bgc1.atlas / .testimonial-custom-card.bgc1.atlas */
    <div
      style={variant === 'card' && width ? { width } : undefined}
      className={cx(
        'flex overflow-hidden rounded-tl-[32px] rounded-br-[32px]',
        variant === 'card'
          ? 'bg-[#41418e] max-md:h-auto max-md:w-full'
          : 'h-[500px] w-[320px] flex-none bg-white',
      )}
    >
      {/* ref .testimonial-video-wrapper-unique */}
      <div className="relative w-full">
        {/* ref video.testimonial-video-element-multi */}
        <video
          ref={videoRef}
          data-il-video=""
          loop
          playsInline
          preload="none"
          poster={card.poster}
          onPlay={sync}
          onPause={sync}
          className="block max-h-[560px] w-full bg-black object-cover object-center max-md:h-auto max-md:object-contain"
        >
          {card.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>

        {/* ref button.video-toggle-btn-unique(new) */}
        <button
          ref={btnRef}
          type="button"
          onClick={toggle}
          aria-label="Play video"
          className="absolute bottom-5 right-5 flex h-[55px] w-[55px] items-center justify-center rounded-full border-0 bg-black/70 px-1.5 py-px text-center text-[22px] leading-none text-white"
        >
          {'▶'}
        </button>
      </div>
    </div>
  );
}
