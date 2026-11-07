'use client';

/* Scroll-triggered reveal used by the Eona port.
 *   Appear      - .qodef-custom-appear-left/right (eona-core elementor.js): opacity 0 + translateX(-/+10%)
 *                 until the element is 200px inside the viewport, then .8s cubic-bezier(.59,.02,.17,.95).
 *   SectionTitle - .qodef-section-title.qodef-separator-animation: the 100x3 black separator scales in
 *                 (left alignment, origin right) or unclips from the middle (centre) over .6s once seen.
 * Server-rendered content is fully present; only the transform/opacity wait for the observer, and a
 * no-JS / reduced-motion visitor gets the final state. */
import { useEffect, useRef, useState } from 'react';
import { H1 } from '@/lib/sensorium/ui';

function useSeen(margin = '0px 0px -200px 0px') {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, seen];
}

export function Appear({ from = 'left', className = '', children }) {
  const [ref, seen] = useSeen();
  const hidden = from === 'left' ? '-translate-x-[10%]' : 'translate-x-[10%]';
  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform,visibility] duration-[800ms] ease-[cubic-bezier(.59,.02,.17,.95)] ${
        seen ? 'visible translate-x-0 opacity-100' : `invisible opacity-0 ${hidden}`
      }`}
    >
      {children}
    </div>
  );
}

/* Eona section title: h1 (48px; 35/40 <=768) + separator. align: 'left' | 'center' */
export function SectionTitle({ title, align = 'center', className = '' }) {
  const [ref, seen] = useSeen('0px');
  const sep =
    align === 'left'
      ? `origin-right ${seen ? 'scale-x-100' : 'scale-x-0'}`
      : seen
        ? '[clip-path:inset(0_0_0_0)]'
        : '[clip-path:inset(0_100%_0_100%)]';
  return (
    <div ref={ref} className={`relative inline-block w-full align-top ${align === 'left' ? 'text-left' : 'text-center'} ${className}`}>
      <h1 className={`${H1} relative z-[2] mb-[9px] mt-0`}>{title}</h1>
      <div className={`mb-4 mt-[14px] inline-block h-[3px] w-[100px] bg-black transition-[transform,clip-path] duration-[600ms] ease-[cubic-bezier(.59,.02,.17,.95)] ${sep}`} />
    </div>
  );
}
