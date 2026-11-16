'use client';
/* eslint-disable @next/next/no-img-element -- plain <img>: /assets/ paths are rewritten to S3 at build time */

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

/**
 * The landing hero's image slider — the reference index.html's inline script, as React state:
 * auto-advances every 5s, pauses on mouse hover / keyboard focus / a hidden tab / a touch, swipes
 * on touch, and cross-fades instead of sliding under prefers-reduced-motion. Each slide sits at one
 * of three positions (-1 parked left, 0 visible, 1 parked right); a slide entering from the other
 * side is first parked there without a transition, exactly like the script's `place(…, false)`.
 *
 * The reference animates the CSS `translate` property; Tailwind v3's translate utilities write
 * `transform`, so the position is an inline `transform` here and the transition lists `transform`.
 */
const SLIDES = [
  { src: '/assets/atlas-hackathon-2026/hero-1.webp', w: 1366, h: 655, pos: 'object-[55%_center]', alt: 'A team of students smiling and working together on laptops during a hackathon session' },
  { src: '/assets/atlas-hackathon-2026/hero-2.webp', w: 683, h: 480, pos: 'object-[85%_center]', alt: 'Students building digital projects on pen displays and laptops in the uGDX technology lab' },
  { src: '/assets/atlas-hackathon-2026/hero-3.webp', w: 683, h: 480, pos: 'object-[70%_center]', alt: 'Student sketching a prototype on a tablet beside a pen display while classmates code in the lab' },
  { src: '/assets/atlas-hackathon-2026/hero-4.webp', w: 683, h: 480, pos: 'object-[90%_center]', alt: 'Student testing an immersive virtual reality prototype with a headset and motion controllers' },
];
const DELAY = 5000;

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';
const subscribeReduce = (cb) => {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};
const noopSubscribe = () => () => {};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  /* per-slide position and whether its next move animates */
  const [pos, setPos] = useState(() => SLIDES.map((_, i) => (i === 0 ? 0 : 1)));
  const [animate, setAnimate] = useState(() => SLIDES.map(() => false));
  /* false on the server and during hydration, true once running in the browser (the script's start) */
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduce = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE_QUERY).matches, () => false);
  const holds = useRef(new Set());
  const [holdCount, setHoldCount] = useState(0);
  const currentRef = useRef(0);
  const touch = useRef(null);

  const show = useCallback((target, dirIn) => {
    const from = currentRef.current;
    const next = (target + SLIDES.length) % SLIDES.length;
    if (next === from) return;
    const dir = dirIn || (next > from ? 1 : -1);
    /* 1. park the incoming slide on the side it enters from, without a transition */
    setAnimate((a) => a.map((_, i) => (i === next ? false : a[i])));
    setPos((p) => p.map((v, i) => (i === next ? dir : v)));
    /* 2. on the next frame, move both slides with the transition on */
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate((a) => a.map((v, i) => (i === next || i === from ? true : v)));
        setPos((p) => p.map((v, i) => (i === next ? 0 : i === from ? -dir : v)));
      })
    );
    currentRef.current = next;
    setCurrent(next);
  }, []);

  const hold = useCallback((reason, on) => {
    if (on) holds.current.add(reason);
    else holds.current.delete(reason);
    setHoldCount(holds.current.size);
  }, []);

  /* the timer restarts whenever the slide changes or a hold is added/removed (the script's restart()) */
  useEffect(() => {
    if (!ready || holdCount) return undefined;
    const t = setInterval(() => show(currentRef.current + 1, 1), DELAY);
    return () => clearInterval(t);
  }, [ready, holdCount, current, show]);

  useEffect(() => {
    const onVis = () => hold('hidden', document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [hold]);

  return (
    <figure
      aria-roledescription="carousel"
      aria-label="Hackathon highlights"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-hk-panel"
      onPointerEnter={(e) => e.pointerType === 'mouse' && hold('hover', true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && hold('hover', false)}
      onFocus={(e) => e.target.matches(':focus-visible') && hold('focus', true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && hold('focus', false)}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        hold('touch', true);
      }}
      onTouchEnd={(e) => {
        if (touch.current) {
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(currentRef.current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
        }
        touch.current = null;
        hold('touch', false);
      }}
      onTouchCancel={() => {
        touch.current = null;
        hold('touch', false);
      }}
    >
      {/* slides share one fixed-ratio box, so changing images never shifts the layout */}
      <div className="relative aspect-[16/11] w-full touch-pan-y n1024:aspect-[4/5]">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            width={s.w}
            height={s.h}
            fetchPriority={i === 0 ? 'high' : undefined}
            decoding={i === 0 ? undefined : 'async'}
            aria-hidden={i === current ? undefined : 'true'}
            alt={s.alt}
            style={{
              transform: reduce ? 'none' : `translateX(${pos[i] * 100}%)`,
              opacity: reduce && pos[i] !== 0 ? 0 : 1,
              transition: animate[i] ? undefined : 'none',
            }}
            className={`absolute inset-0 block size-full object-cover ${s.pos} transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]`}
          />
        ))}
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hk-night via-hk-night/10 to-transparent" />

      {/* Ideate / Build / Launch chips */}
      <ul className="absolute inset-x-4 top-4 flex flex-wrap gap-2 font-hk-display text-[14px]/[20px] font-bold uppercase tracking-wider">
        <li className="flex items-center gap-1.5 rounded-full border border-yellow-300/40 bg-hk-night/70 px-3 py-1.5 text-yellow-300 backdrop-blur">
          <svg className="size-4" aria-hidden="true"><use href="#i-bulb" /></svg>
          Ideate
        </li>
        <li className="flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-hk-night/70 px-3 py-1.5 text-cyan-300 backdrop-blur">
          <svg className="size-4" aria-hidden="true"><use href="#i-code" /></svg>
          Build
        </li>
        <li className="flex items-center gap-1.5 rounded-full border border-fuchsia-400/40 bg-hk-night/70 px-3 py-1.5 text-fuchsia-300 backdrop-blur">
          <svg className="size-4" aria-hidden="true"><use href="#i-rocket" /></svg>
          Launch
        </li>
      </ul>

      {/* slide indicators — hidden until the slider is running, as in the reference */}
      <div
        role="group"
        aria-label="Choose hero image"
        className={`absolute right-3 top-1/2 -translate-y-1/2 flex-col rounded-full border border-white/10 bg-hk-night/55 py-1 backdrop-blur ${ready ? 'flex' : 'hidden'}`}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-current={String(i === current)}
            aria-label={`Show image ${i + 1} of ${SLIDES.length}`}
            onClick={() => show(i)}
            className="group/dot flex w-7 cursor-pointer items-center justify-center py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            <span className="h-2 w-2 rounded-full bg-white/45 transition-all duration-500 group-hover/dot:bg-white group-aria-[current=true]/dot:h-5 group-aria-[current=true]/dot:bg-cyan-300" />
          </button>
        ))}
      </div>
    </figure>
  );
}
