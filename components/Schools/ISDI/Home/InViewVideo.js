'use client';

import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/cx';

/**
 * A Webflow background video (`.w-background-video > video[autoplay loop muted
 * playsinline]`) that only runs while it is on screen.
 *
 * The reference autoplays every one of these at once — including the cards in
 * tab panes that are `display: none` — so the page downloads every clip on load.
 * Visibly the behaviour is the same here (a muted loop that is already playing
 * whenever you look at it); it simply starts when the card scrolls or tabs into
 * view and pauses when it leaves. `preload="none"` keeps the off-screen clips
 * from downloading at all. The poster is painted as the video's own background,
 * which is how Webflow shows it (`style="background-image: url(...)"`).
 *
 * `loop` follows the markup: the minor cards author `loop`, the testimonial
 * videos do not, so those play through once and hold their last frame.
 *
 * `sources` ([{ src, type }], optional) renders several `<source>`s in authored
 * order where the markup offers more than one encoding (the About page's
 * mp4 + webm pairs); otherwise `src` / `type` is the single source.
 *
 * `controls` ({ pauseIcon, playIcon }, optional) adds Webflow's own background-video
 * play/pause button — a 44px control 16px from the video's bottom-right corner,
 * which ships both icons with the inactive one hidden. Only the B.Des programme
 * pages' Student Voices cards author it; without it this renders the bare `<video>`
 * it always has.
 */
export default function InViewVideo({ src, type = 'video/mp4', sources, poster, loop = true, controls, className }) {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  /* the control mirrors the element's own state, so the icon is right however the
     clip got there (the observer pausing it off screen included) */
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    const next = !video.paused;
    pausedRef.current = next;
    if (next) video.pause();
    else video.play().catch(() => {});
    setPaused(next);
  };

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // a non-looping clip that has finished stays on its last frame, and a clip
          // the visitor paused with the control stays paused
          if (!video.ended && !pausedRef.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '100px' }
    );
    io.observe(video);

    const sync = () => setPaused(video.paused);
    video.addEventListener('play', sync);
    video.addEventListener('pause', sync);
    return () => {
      io.disconnect();
      video.removeEventListener('play', sync);
      video.removeEventListener('pause', sync);
    };
  }, []);

  const video = (
    <video
      ref={ref}
      muted
      loop={loop}
      playsInline
      preload="none"
      aria-hidden="true"
      className={cx('bg-cover bg-center object-cover', className)}
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      {sources ? (
        sources.map((source) => <source key={source.src} src={source.src} type={source.type} />)
      ) : (
        <source src={src} type={type} />
      )}
    </video>
  );

  if (!controls) return video;

  return (
    <>
      {video}
      {/* ref button.w-backgroundvideo-backgroundvideoplaypausebutton */}
      <button
        type="button"
        onClick={toggle}
        aria-label={paused ? 'Play video' : 'Pause video'}
        className="absolute bottom-4 right-4 z-[1] h-11 w-11 cursor-pointer border-0 bg-transparent p-0 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={paused ? controls.playIcon : controls.pauseIcon}
          width={44}
          height={44}
          alt=""
          loading="lazy"
          className="max-w-full align-middle"
        />
      </button>
    </>
  );
}
