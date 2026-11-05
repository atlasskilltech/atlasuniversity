'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';

/**
 * The ISME heading marker — reference/schools/isme/assets/include/footer.php
 * `createAndPositionBars()`, styled by header.php's `.left-bar-element`:
 *
 *   on every ISME page, at window widths of 1200px and up, one bar per `.h2-tag:not(.no-bar)`:
 *   position absolute, left 0, top = the heading's document top - 70px, 94 x 50, #009FE0,
 *   z-index 1, pointer-events none — appended to <body>; recomputed on load, resize and scroll
 *
 * The port's section headings are not `.h2-tag`s, so they are found by what that class renders:
 * an <h2> in the page's <main> at the sheet's 44px heading size. The two banner headings the
 * reference marks `.no-bar` (40px) and the FAQ's accordion headers are excluded by the same test,
 * which on the ISME homepage selects exactly the reference's 13 headings. A heading can also opt
 * out explicitly with `data-no-bar`.
 *
 * Bars are recomputed when the document's size changes rather than on every scroll event: the
 * reference re-runs on scroll only to catch layout that moved, which a ResizeObserver on <body>
 * sees directly.
 */
const MIN_WIDTH = 1200;

function measure() {
  if (window.innerWidth < MIN_WIDTH) return [];
  const tops = [];
  document.querySelectorAll('main h2:not([data-no-bar])').forEach((h2) => {
    if (parseFloat(getComputedStyle(h2).fontSize) !== 44) return;
    const r = h2.getBoundingClientRect();
    if (!r.height) return;
    tops.push(Math.round((r.top + window.scrollY - 70) * 100) / 100);
  });
  return tops;
}

export default function HeadingBars() {
  const pathname = usePathname();
  const [tops, setTops] = useState([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTops(measure()));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    };
  }, [pathname]);

  if (!tops.length) return null;
  return createPortal(
    tops.map((top, i) => (
      /* ref .left-bar-element */
      <div
        key={i}
        aria-hidden="true"
        data-isme-bar=""
        className="pointer-events-none absolute left-0 z-[1] h-[50px] w-[94px] bg-atlas-blue"
        style={{ top }}
      />
    )),
    document.body,
  );
}
