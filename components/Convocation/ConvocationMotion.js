'use client';

import { useLayoutEffect, useRef } from 'react';
import { initConvocation } from '@/lib/convocation/motion';

/**
 * The page root for /convocation. Server-rendered markup arrives as children; this component only owns
 * the root element and runs the reference's interaction & motion script (lib/convocation/motion.js)
 * against it once mounted.
 *
 * useLayoutEffect on purpose: its cleanup runs before React detaches the subtree, so GSAP can revert
 * its pin spacers and SplitText wrappers while the nodes are still in the document — leaving the
 * route on a client navigation leaves nothing behind (no ScrollTriggers, Lenis ticker, confetti WebGL
 * context or listeners).
 */
export default function ConvocationMotion({ className, children }) {
  const ref = useRef(null);
  useLayoutEffect(() => initConvocation(ref.current), []);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
