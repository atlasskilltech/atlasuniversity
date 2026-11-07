'use client';
/* eslint-disable @next/next/no-img-element -- static WebP exports with their own srcSet; next/image is not used for this standalone port */

/* Portfolio item media, one component per Eona single layout (body class qodef-porfolio-single-layout--*):
 *   images-small / images-big  images stacked, 10px apart, each a Magnific Popup link
 *   gallery-small              2 columns (1 at <=680), 10px gutter
 *   gallery-big                3 columns (2 at <=768, 1 at <=680), 10px gutter
 *   masonry-big                Isotope "fixed" masonry, 3 columns (2 / 1 as above), square items with
 *                              "landscape" ones two columns wide, images covering
 *   slider                     Swiper, slidesPerView auto, loop, white chevron arrows inside - not linked
 * All but the slider open the shared Magnific-style lightbox on the item's full images.
 *
 * Deviation: on phones production's slider keeps each 1300x700 photograph at its natural size inside the
 * 320px frame (a 320px-wide crop, 700px tall); here every slide is scaled to the frame width. */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox';

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const GAL2 = 'grid grid-cols-2 gap-[10px] [@media(max-width:680px)]:grid-cols-1';
const GAL3 =
  'grid grid-cols-3 gap-[10px] [@media(min-width:681px)_and_(max-width:768px)]:grid-cols-2 [@media(max-width:680px)]:grid-cols-1';

function Img({ m, cover, sizes }) {
  return (
    <img
      src={m.img.src}
      srcSet={m.img.srcSet}
      sizes={sizes}
      width={m.img.w}
      height={m.img.h}
      alt={m.alt}
      className={`block ${cover ? 'h-full w-full object-fill' : 'h-auto w-full'}`}
    />
  );
}

function Masonry({ media, open }) {
  const ref = useRef(null);
  const [lay, setLay] = useState(null);
  useIso(() => {
    const el = ref.current;
    const run = () => {
      const vw = window.innerWidth;
      const n = vw <= 680 ? 1 : vw <= 768 ? 2 : 3;
      const colW = el.getBoundingClientRect().width / n;
      const colY = new Array(n).fill(0);
      const pos = media.map((m) => {
        const span = m.size === 'landscape' ? Math.min(2, n) : 1;
        let best = 0;
        let bestY = Infinity;
        for (let j = 0; j + span <= n; j++) {
          const y = Math.max(...colY.slice(j, j + span));
          if (y < bestY - 0.5) {
            bestY = y;
            best = j;
          }
        }
        for (let j = best; j < best + span; j++) colY[j] = bestY + colW;
        return { x: best * colW, y: bestY, w: colW * span, h: colW };
      });
      setLay({ pos, height: Math.max(...colY) });
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(el);
    return () => ro.disconnect();
  }, [media]);
  return (
    <div className="-mb-[10px]">
      <div ref={ref} className={`relative -mx-[5px] ${lay ? '' : 'flex flex-wrap'}`} style={lay ? { height: lay.height } : undefined}>
        {media.map((m, i) => {
          const p = lay?.pos[i];
          return (
            <button
              key={m.img.src + i}
              type="button"
              onClick={() => open(i)}
              aria-label={`Open image ${i + 1} of ${media.length}`}
              className="block px-[5px] pb-[10px]"
              style={p ? { position: 'absolute', left: p.x, top: p.y, width: p.w, height: p.h } : { width: m.size === 'landscape' ? '66.666%' : '33.333%' }}
            >
              <span className="block h-full overflow-hidden">
                <Img m={m} cover sizes="(max-width: 680px) 100vw, 66vw" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 22 41" aria-hidden className="h-[41px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left' ? <path d="M21 1 1 20.5 21 40" /> : <path d="M1 1l20 19.5L1 40" />}
  </svg>
);

function Slider({ media }) {
  const n = media.length;
  const [i, setI] = useState(0);
  const touch = useRef(null);
  return (
    <div
      className="relative overflow-hidden"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 40) setI((v) => (v + (dx > 0 ? -1 : 1) + n) % n);
      }}
    >
      <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(${-i * 100}%)` }}>
        {media.map((m) => (
          <div key={m.img.src} title={m.title || undefined} className="w-full shrink-0">
            <Img m={m} sizes="(max-width: 1100px) 100vw, 1100px" />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Previous" onClick={() => setI((v) => (v - 1 + n) % n)} className="absolute left-[27px] top-1/2 z-[2] -translate-y-1/2 text-white">
        <Arrow dir="left" />
      </button>
      <button type="button" aria-label="Next" onClick={() => setI((v) => (v + 1) % n)} className="absolute right-[27px] top-1/2 z-[2] -translate-y-1/2 text-white">
        <Arrow dir="right" />
      </button>
    </div>
  );
}

export default function SingleMedia({ layout, media }) {
  const [box, setBox] = useState(null);
  const lightbox = media.map((m) => ({ ...(m.full || m.img), title: m.title, alt: m.alt }));
  const link = (m, i, children, extra = '') => (
    <button key={m.img.src + i} type="button" onClick={() => setBox(i)} aria-label={`Open image ${i + 1} of ${media.length}`} className={`relative block w-full ${extra}`}>
      {children}
    </button>
  );

  let body;
  if (layout === 'slider') body = <Slider media={media} />;
  else if (layout === 'masonry-big') body = <Masonry media={media} open={setBox} />;
  else if (layout === 'gallery-small' || layout === 'gallery-big')
    body = <div className={layout === 'gallery-small' ? GAL2 : GAL3}>{media.map((m, i) => link(m, i, <Img m={m} sizes="(max-width: 680px) 100vw, 33vw" />))}</div>;
  else body = <div>{media.map((m, i) => link(m, i, <Img m={m} sizes="(max-width: 1100px) 100vw, 1100px" />, 'mb-[10px] last:mb-0'))}</div>;

  return (
    <>
      {body}
      {box !== null && <Lightbox skin="mfp" images={lightbox} index={box} onClose={() => setBox(null)} />}
    </>
  );
}
