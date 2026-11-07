'use client';
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Homepage hero - a Revolution Slider 6 (rev_slider_9_1) equivalent, shown from 768px up
 * (the Elementor section is elementor-hidden-mobile; phones get MobileSlider instead).
 *
 * Production config (index snapshot): layout "fullscreen" (100vh - its offset container selector,
 * ".qodef-page-header", matches nothing, so the height is the full viewport), slide delay 3000ms, a
 * plain fade between three photographs (bg "center top", cover), parallax level 35 on scroll.
 * Responsive levels 1240 / 1024 / 778 / 480 with grid widths 1240 / 1024 / 778 / 480: a viewport
 * above 1024 uses level 0 scaled by min(1, vw/1240); 779-1024 level 1 scaled by vw/1024; <=778 level 2
 * scaled by vw/778. Every slide carries the same four layers (basealign "slide", y "middle"):
 *   "Welcome to"     Playfair italic 21/19/19 on 33/27/20, x 230/125/55, y -6/-105/-133, in at 70ms
 *   "sensorium"      Montserrat 700 uppercase 80/60/60 on 80/80/80, x 230/125/55, y 61/-46/-74, 180ms
 *   strapline        Playfair italic 26/23/23 on 33/25/25 on #000, x 355/220/150, y 126/12/-16, 250ms
 *   rule             100 x 3px white, x 230/125/55, y 172/60/32, revealed from the right at 370ms
 * Each text layer comes in from x+50 with opacity (power2.inOut, 1000ms) and fades out as the slide
 * ends. Arrows (eona-light chevrons, left 30 / right 13, 64px below centre) only above 1024 and only
 * while hovered; bullets (10px black dots at .25) only at 1024 and below, 35px off the bottom. */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MONT, PLAY } from '@/lib/sensorium/ui';

/* level 0 scales by min(1, vw/1240): min() for a positive value, max() for a negative one */
const L = (v0, v1, v2) => ({ 0: `${v0 < 0 ? 'max' : 'min'}(${v0}px, ${(v0 / 12.4).toFixed(4)}vw)`, 1: `${(v1 / 10.24).toFixed(4)}vw`, 2: `${(v2 / 7.78).toFixed(4)}vw` });
const vars = (name, v) => ({ [`--${name}0`]: v[0], [`--${name}1`]: v[1], [`--${name}2`]: v[2] });

/* literal class strings so Tailwind sees them; values come from the custom properties above */
const POS =
  'absolute -translate-y-1/2 left-[var(--x0)] top-[calc(50%+var(--y0))] [@media(min-width:779px)_and_(max-width:1024px)]:left-[var(--x1)] [@media(min-width:779px)_and_(max-width:1024px)]:top-[calc(50%+var(--y1))] [@media(max-width:778px)]:left-[var(--x2)] [@media(max-width:778px)]:top-[calc(50%+var(--y2))]';
const TYPE =
  'text-[length:var(--f0)] leading-[var(--l0)] [@media(min-width:779px)_and_(max-width:1024px)]:text-[length:var(--f1)] [@media(min-width:779px)_and_(max-width:1024px)]:leading-[var(--l1)] [@media(max-width:778px)]:text-[length:var(--f2)] [@media(max-width:778px)]:leading-[var(--l2)]';

const LAYERS = [
  { key: 'welcome', idx: 3, st: 0.07, x: L(230, 125, 55), y: L(-6, -105, -133), f: L(21, 19, 19), l: L(33, 27, 20), cls: `${PLAY} italic` },
  { key: 'title', idx: 0, st: 0.18, x: L(230, 125, 55), y: L(61, -46, -74), f: L(80, 60, 60), l: L(80, 80, 80), cls: `${MONT} font-bold uppercase` },
  { key: 'strap', idx: 1, st: 0.25, x: L(355, 220, 150), y: L(126, 12, -16), f: L(26, 23, 23), l: L(33, 25, 25), cls: `${PLAY} italic bg-black` },
];
const RULE = { x: L(230, 125, 55), y: L(172, 60, 32) };

function Arrow({ left }) {
  return (
    <svg width="21.688" height="40.875" viewBox="0 0 21.688 40.875" aria-hidden className={`transition-transform duration-[400ms] ease-[cubic-bezier(.59,.02,.17,.95)] ${left ? 'rotate-180 group-hover/a:[transform:rotate(180deg)_translateX(5px)]' : 'group-hover/a:translate-x-[5px]'}`}>
      <path fill="none" stroke="#FFF" strokeWidth=".75" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M.408 40.47l20.871-20L.408.47" />
    </svg>
  );
}

export default function Hero({ slides, text }) {
  const [cur, setCur] = useState(0);
  const root = useRef(null);
  const bgs = useRef([]);
  const n = slides.length;

  /* slide delay 3000ms after the layers have settled */
  useEffect(() => {
    const t = setTimeout(() => setCur((c) => (c + 1) % n), 3000 + 1370);
    return () => clearTimeout(t);
  }, [cur, n]);

  /* layer in-animations for the current slide */
  useEffect(() => {
    const el = root.current?.querySelector(`[data-slide="${cur}"]`);
    if (!el) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-layer]').forEach((ly) => {
        gsap.fromTo(ly, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: reduce ? 0 : 1, ease: 'power2.inOut', delay: reduce ? 0 : +ly.dataset.st });
      });
      const rule = el.querySelector('[data-rule]');
      if (rule) gsap.fromTo(rule, { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: reduce ? 0 : 1, ease: 'power2.inOut', delay: reduce ? 0 : 0.37 });
    }, el);
    return () => ctx.revert();
  }, [cur]);

  /* scroll parallax on the backgrounds (rev parallax level 35) */
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = root.current?.getBoundingClientRect();
        if (!r || r.bottom < 0) return;
        const off = Math.max(0, -r.top) * 0.35;
        bgs.current.forEach((b) => b && (b.style.transform = `translate3d(0,${off}px,0)`));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="group/h relative h-screen w-full overflow-hidden bg-black">
      {slides.map((s, i) => (
        <div
          key={s.src}
          data-slide={i}
          aria-hidden={i !== cur}
          className={`absolute inset-0 transition-opacity duration-1000 ease-linear ${i === cur ? 'z-[2] opacity-100' : 'z-[1] opacity-0'}`}
        >
          <div ref={(b) => (bgs.current[i] = b)} className="absolute inset-0 will-change-transform">
            <img
              src={s.src}
              srcSet={s.srcSet}
              sizes="100vw"
              alt=""
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="block h-full w-full object-cover object-[center_top]"
            />
          </div>
          {LAYERS.map((ly) => (
            <div key={ly.key} className={`${POS} z-[13]`} style={{ ...vars('x', ly.x), ...vars('y', ly.y) }}>
              <div
                data-layer
                data-st={ly.st}
                className={`whitespace-nowrap text-white opacity-0 ${ly.cls} ${TYPE}`}
                style={{ ...vars('f', ly.f), ...vars('l', ly.l) }}
              >
                {text[ly.idx]}
              </div>
            </div>
          ))}
          <div className={`${POS} z-[11]`} style={{ ...vars('x', RULE.x), ...vars('y', RULE.y) }}>
            <div data-rule className="h-[3px] w-[100px] bg-white [clip-path:inset(0_0_0_100%)]" />
          </div>
        </div>
      ))}

      {/* arrows: above 1024, while hovered */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => setCur((c) => (c - 1 + n) % n)}
        className="group/a absolute left-[30px] top-[calc(50%+64px)] z-[20] hidden -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover/h:opacity-100 [@media(min-width:1025px)]:block"
      >
        <Arrow left />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => setCur((c) => (c + 1) % n)}
        className="group/a absolute right-[13px] top-[calc(50%+64px)] z-[20] hidden -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover/h:opacity-100 [@media(min-width:1025px)]:block"
      >
        <Arrow />
      </button>
      {/* bullets: 1024 and below */}
      <div className="absolute bottom-[35px] left-1/2 z-[20] flex -translate-x-1/2 [@media(min-width:1025px)]:hidden">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Slide ${i + 1}`}
            aria-current={i === cur}
            onClick={() => setCur(i)}
            className={`mr-[9px] size-[10px] rounded-full bg-black transition-opacity duration-200 ease-out hover:opacity-100 ${i === cur ? 'opacity-100' : 'opacity-25'}`}
          />
        ))}
      </div>
    </div>
  );
}
