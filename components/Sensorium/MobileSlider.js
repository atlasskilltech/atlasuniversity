'use client';
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Phone hero - the Qi Addons image slider (qi_addons_for_elementor_image_slider), which production shows
 * only below 768px (elementor-hidden-desktop + elementor-hidden-tablet) in place of the Revolution
 * slider. Swiper options on production: 1 per view, loop, autoplay, 30px between slides, navigation and
 * pagination inside; each slide is an fslightbox link to the full image. The three images carry their
 * own "Welcome to SENSORIUM" artwork, so there is no text layer. */
import { useCallback, useEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox';

const ArrowSvg = ({ left }) => (
  <svg viewBox="0 0 34.2 32.3" aria-hidden className={`h-[32px] w-[34px] ${left ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="0.5" y1="16.1" x2="33.5" y2="16.1" />
    <line x1="0.3" y1="16.5" x2="16.2" y2="0.7" />
    <line x1="0" y1="15.7" x2="16.2" y2="31.6" />
  </svg>
);

export default function MobileSlider({ slides }) {
  const n = slides.length;
  const [i, setI] = useState(0);
  const [box, setBox] = useState(null);
  const [paused, setPaused] = useState(false);
  const touch = useRef(null);
  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n]);

  useEffect(() => {
    if (paused || box !== null) return undefined;
    const t = setTimeout(() => go(1), 3500);
    return () => clearTimeout(t);
  }, [i, paused, box, go]);

  return (
    <div
      className="group relative overflow-hidden"
      onTouchStart={(e) => {
        touch.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
        touch.current = null;
        setPaused(false);
      }}
    >
      <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translateX(calc(${-i * 100}% - ${i * 30}px))`, gap: 30 }}>
        {slides.map((s, k) => (
          <button key={s.img.src} type="button" onClick={() => setBox(k)} aria-label={`Open image ${k + 1} of ${n}`} className="block w-full shrink-0">
            <img src={s.img.src} srcSet={s.img.srcSet} sizes="100vw" width={s.img.w} height={s.img.h} alt="" loading={k ? 'lazy' : 'eager'} className="block h-auto w-full" />
          </button>
        ))}
      </div>
      <button type="button" aria-label="Previous" onClick={() => go(-1)} className="absolute left-[20px] top-1/2 z-[2] -translate-y-1/2 text-white opacity-0 transition-[opacity,transform] duration-300 hover:-translate-x-[5px] group-hover:opacity-100 focus-visible:opacity-100">
        <ArrowSvg left />
      </button>
      <button type="button" aria-label="Next" onClick={() => go(1)} className="absolute right-[20px] top-1/2 z-[2] -translate-y-1/2 text-white opacity-0 transition-[opacity,transform] duration-300 hover:translate-x-[5px] group-hover:opacity-100 focus-visible:opacity-100">
        <ArrowSvg />
      </button>
      <div className="absolute bottom-[20px] left-0 z-[2] flex w-full justify-center gap-[8px]">
        {slides.map((s, k) => (
          <button key={s.img.src} type="button" aria-label={`Go to slide ${k + 1}`} onClick={() => setI(k)} className={`size-[6px] rounded-full ${k === i ? 'bg-black' : 'bg-[#c4c4c4]'}`} />
        ))}
      </div>
      {box !== null && <Lightbox skin="fs" images={slides.map((s) => s.full)} index={box} onClose={() => setBox(null)} />}
    </div>
  );
}
