'use client';
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Image lightbox for the Sensorium port, in the two skins production uses:
 *   skin="mfp" - Magnific Popup (eona/assets/plugins/magnific-popup): #0b0b0b at .8, image centred with
 *                40px vertical padding, the image title bottom-left and "N of M" bottom-right, a 44px ×
 *                top-right of the image and chevron arrows at the screen edges. Used by portfolio items.
 *   skin="fs"  - fslightbox (Qi Addons image slider): rgba(30,30,30,.9), "N/M" top-left, a close button
 *                in a rgba(35,35,35,.65) toolbar top-right and boxed arrows at the edges. Used by the
 *                homepage's mobile slider.
 * Both close on Escape / backdrop click, page with arrow keys and a horizontal swipe, and lock body scroll.
 * Rendered through a portal so no section's stacking context can sit above it. */
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Chevron = ({ dir, className = '' }) => (
  <svg viewBox="0 0 22 41" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left' ? <path d="M21 1 1 20.5 21 40" /> : <path d="M1 1l20 19.5L1 40" />}
  </svg>
);

export default function Lightbox({ images, index, onClose, skin = 'mfp' }) {
  const [i, setI] = useState(index);
  const n = images.length;
  const prev = useCallback(() => setI((v) => (v - 1 + n) % n), [n]);
  const next = useCallback(() => setI((v) => (v + 1) % n), [n]);
  const touch = useRef(null);

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', key);
    const o = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', key);
      document.body.style.overflow = o;
    };
  }, [onClose, prev, next]);

  const img = images[i];
  const swipe = {
    onTouchStart: (e) => (touch.current = e.touches[0].clientX),
    onTouchEnd: (e) => {
      if (touch.current == null) return;
      const dx = e.changedTouches[0].clientX - touch.current;
      if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
      touch.current = null;
    },
  };

  const body =
    skin === 'fs' ? (
      <div role="dialog" aria-modal="true" aria-label="Image gallery" className="fixed inset-0 z-[2000] bg-[rgba(30,30,30,0.9)] text-[#eee]" onClick={onClose} {...swipe}>
        <div className="absolute left-0 top-0 z-10 p-[12px_14px] text-[15px] leading-none [font-family:sans-serif]">
          {i + 1}/{n}
        </div>
        <div className="absolute right-0 top-0 z-10 flex bg-[rgba(35,35,35,0.65)]">
          <button type="button" aria-label="Close" onClick={onClose} className="flex size-[45px] items-center justify-center hover:text-white">
            <svg viewBox="0 0 24 24" className="size-[20px]" fill="currentColor" aria-hidden>
              <path d="M18.3 5.71 12 12.01l-6.3-6.3-1.41 1.41 6.3 6.3-6.3 6.3 1.41 1.41 6.3-6.3 6.3 6.3 1.41-1.41-6.3-6.3 6.3-6.3z" />
            </svg>
          </button>
        </div>
        {n > 1 && (
          <>
            <button type="button" aria-label="Previous" onClick={(e) => (e.stopPropagation(), prev())} className="absolute left-0 top-1/2 z-10 flex h-[54px] w-[45px] -translate-y-1/2 items-center justify-center bg-[rgba(35,35,35,0.65)]">
              <Chevron dir="left" className="h-[20px] w-[11px]" />
            </button>
            <button type="button" aria-label="Next" onClick={(e) => (e.stopPropagation(), next())} className="absolute right-0 top-1/2 z-10 flex h-[54px] w-[45px] -translate-y-1/2 items-center justify-center bg-[rgba(35,35,35,0.65)]">
              <Chevron dir="right" className="h-[20px] w-[11px]" />
            </button>
          </>
        )}
        <div className="flex h-full items-center justify-center p-[45px_0]">
          <img key={img.src} src={img.src} srcSet={img.srcSet} sizes="100vw" alt={img.alt || ''} onClick={(e) => e.stopPropagation()} className="block max-h-full max-w-full object-contain" />
        </div>
      </div>
    ) : (
      <div role="dialog" aria-modal="true" aria-label="Image gallery" className="fixed inset-0 z-[2000]" {...swipe}>
        <div className="absolute inset-0 bg-[#0b0b0b] opacity-80" onClick={onClose} />
        <div className="absolute inset-0 flex items-center justify-center px-2 py-[40px]" onClick={onClose}>
          <figure className="relative m-0 max-h-full" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close (Esc)" onClick={onClose} className="absolute -top-[40px] right-[-6px] h-[44px] w-[44px] text-center text-[28px] leading-[44px] text-white opacity-65 [font-family:Arial,sans-serif] hover:opacity-100">
              ×
            </button>
            <img key={img.src} src={img.src} srcSet={img.srcSet} sizes="100vw" alt={img.alt || ''} className="block h-auto max-h-[calc(100vh-80px)] w-auto max-w-full" />
            <figcaption className="absolute left-0 right-0 top-full mt-0 flex justify-between pt-[5px] text-[12px] leading-[18px] text-[#f3f3f3] [font-family:Arial,sans-serif]">
              <span className="pr-[36px]">{img.title || ''}</span>
              {n > 1 && <span className="whitespace-nowrap text-[#ccc]">{i + 1} of {n}</span>}
            </figcaption>
          </figure>
        </div>
        {n > 1 && (
          <>
            <button type="button" aria-label="Previous (Left arrow key)" onClick={prev} className="absolute left-[30px] top-1/2 z-10 -translate-y-1/2 p-2 text-white opacity-65 hover:opacity-100">
              <Chevron dir="left" className="h-[41px] w-[22px]" />
            </button>
            <button type="button" aria-label="Next (Right arrow key)" onClick={next} className="absolute right-[30px] top-1/2 z-10 -translate-y-1/2 p-2 text-white opacity-65 hover:opacity-100">
              <Chevron dir="right" className="h-[41px] w-[22px]" />
            </button>
          </>
        )}
      </div>
    );
  return createPortal(body, document.body);
}
