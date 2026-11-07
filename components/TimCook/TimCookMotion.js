'use client';

import { useLayoutEffect, useRef } from 'react';
import { initTimCook } from '@/lib/timcook/motion';

/**
 * The page root for /timcook. Server-rendered markup arrives as children; this component only owns
 * the root element and runs the reference's interaction & motion script (lib/timcook/motion.js)
 * against it once mounted.
 *
 * useLayoutEffect on purpose: its cleanup runs before React detaches the subtree, so GSAP can revert
 * its pin spacers and SplitText wrappers while the nodes are still in the document — leaving the
 * route on a client navigation leaves nothing behind (no ScrollTriggers, Lenis ticker, WebGL
 * context or listeners).
 */
export default function TimCookMotion({ className, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => initTimCook(ref.current), []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
