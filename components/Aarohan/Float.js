'use client';

/* The template's two decorative loops, run with the Web Animations API (no new keyframes):
   bounce-animate 3s linear infinite: translateY -20px -> -10px -> -20px
   round-01 5s linear infinite:       rotate 15deg -> 0 -> 15deg */
import { useEffect, useRef } from 'react';

const KF = {
  bounce: { frames: [{ transform: 'translateY(-20px)' }, { transform: 'translateY(-10px)' }, { transform: 'translateY(-20px)' }], duration: 3000 },
  round: { frames: [{ transform: 'rotate(15deg)' }, { transform: 'rotate(0deg)' }, { transform: 'rotate(15deg)' }], duration: 5000 },
};

export default function Float({ as: Tag = 'div', kind, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el?.animate) return undefined;
    const k = KF[kind];
    const a = el.animate(k.frames, { duration: k.duration, iterations: Infinity, easing: 'linear' });
    return () => a.cancel();
  }, [kind]);
  return <Tag ref={ref} {...rest} />;
}
