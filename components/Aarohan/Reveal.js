'use client';

/* AOS, as the template initialises it in main.js: `AOS.init({ duration: 1200, once: true })`,
   default easing `ease`, default offset 120px, attribute `data-aos` + `data-aos-delay`.

   aos.css sets the start transform with an attribute selector (0,1,0); the template's own rules
   for `.hero-content-shape-03/-05` set `transform: rotate()/skew` at (0,3,0) and load later, so on
   those elements AOS only ever animates opacity - `keepTransform` reproduces exactly that. */
import { useEffect, useRef, useState } from 'react';

const FROM = {
  'fade-up': 'translate3d(0,100px,0)',
  'fade-right': 'translate3d(-100px,0,0)',
  'fade-left': 'translate3d(100px,0,0)',
  'zoom-in': 'translate3d(0,0,0) scale(.6)',
};

export default function Reveal({ as: Tag = 'div', anim = 'fade-up', delay = 0, keepTransform = false, className, style, children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -120px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const s = {
    ...style,
    opacity: on ? 1 : 0,
    transitionProperty: keepTransform ? 'opacity' : 'opacity, transform',
    transitionDuration: '1200ms',
    transitionTimingFunction: 'ease',
    transitionDelay: `${delay}ms`,
  };
  if (!keepTransform) s.transform = on ? (anim === 'zoom-in' ? 'translate3d(0,0,0) scale(1)' : 'translate3d(0,0,0)') : FROM[anim];
  return (
    <Tag ref={ref} className={className} style={s} {...rest}>
      {children}
    </Tag>
  );
}
